const { app, BrowserWindow, ipcMain } = require('electron');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  // 최초 로딩
  win.loadURL('http://localhost:5173');

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
        "Content-Security-Policy": [
          "default-src 'self'; " +
          "script-src 'self' 'unsafe-inline' 'unsafe-eval' " +
          "https://developers.kakao.com " +
          "https://kauth.kakao.com " +
          "https://accounts.kakao.com " +
          "https://t1.kakaocdn.net " +
          "https://accounts.kakaocdn.net " +
          "https://t1.daumcdn.net " +
          "https://mk.kakaocdn.net; " +
          "style-src 'self' 'unsafe-inline' " +
          "https://t1.kakaocdn.net " +
          "https://accounts.kakaocdn.net; " +
          "font-src 'self' https://accounts.kakaocdn.net https://t1.kakaocdn.net; " +
          "img-src 'self' https://stat.tiara.kakao.com https://webid.ad.daum.net " +
          "https://t1.kakaocdn.net https://accounts.kakaocdn.net; " +
          "connect-src 'self' http://localhost:8080 " +
          "https://kauth.kakao.com " +
          "https://accounts.kakao.com " +
          "https://developers.kakao.com " +
          "https://t1.kakaocdn.net " +
          "https://logins.daum.net; " +
          "frame-src https://kauth.kakao.com https://accounts.kakao.com;"
        ]
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
    win.loadURL('http://localhost:5173/main');
  }
});

// 모든 창 닫혔을 때 앱 종료
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
