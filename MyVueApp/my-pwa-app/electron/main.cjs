const { app, BrowserWindow, ipcMain } = require('electron');

let win;
const isDev = !app.isPackaged;

// ✅ 서버 주소 관리
const backendUrl = isDev
  ? 'http://localhost:8080'
  : 'https://justsaying.co.kr';


const csp = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval'
    https://developers.kakao.com
    https://kauth.kakao.com
    https://accounts.kakao.com
    https://t1.kakaocdn.net
    https://accounts.kakaocdn.net
    https://t1.daumcdn.net
    https://mk.kakaocdn.net;
  style-src 'self' 'unsafe-inline'
    https://t1.kakaocdn.net
    https://accounts.kakaocdn.net;
  font-src 'self'
    https://accounts.kakaocdn.net
    https://t1.kakaocdn.net;
  img-src 'self'
    https://stat.tiara.kakao.com
    https://webid.ad.daum.net
    https://t1.kakaocdn.net
    https://accounts.kakaocdn.net;
  connect-src 'self'
    ${backendUrl}
    https://kauth.kakao.com
    https://accounts.kakao.com
    https://developers.kakao.com
    https://t1.kakaocdn.net
    https://logins.daum.net;
  frame-src
    https://kauth.kakao.com
    https://accounts.kakao.com;
`;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  // 개발 모드일 때랑 배포(EXE)일 때 구분!
  const isDev = !app.isPackaged;

  if (isDev) {
    // ✅ 개발 중에는 4000 포트 사용! 최초 로딩 
    win.loadURL('http://localhost:4000');
  } else {
    // ✅ 배포(EXE)에서는 dist 폴더 열기!
    win.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  // 창이 닫히기 전에 localStorage 삭제
  win.on('close', () => {
    if (win && !win.isDestroyed()) {
      win.webContents.executeJavaScript(`localStorage.clear();`);
    }
  });

  // CSP 설정 (보안 설정)
  win.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        "Content-Security-Policy": [csp],
      }
    });
  });
}

app.whenReady().then(() => {
  createWindow();
});

// 로그인 성공 신호 받으면 페이지 변경
ipcMain.on('login-success', () => {
  console.log("Electron: 로그인 성공 신호 받음!");
  if (win && !win.isDestroyed()) {
    const frontUrl = isDev
      ? 'http://localhost:4000/main'
      : 'https://justsaying.co.kr/main';
    win.loadURL(frontUrl);
  }
});

// 모든 창 닫혔을 때 앱 종료
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
