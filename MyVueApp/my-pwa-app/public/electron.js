const { app, BrowserWindow } = require('electron');
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


app.whenReady().then(() => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        "Content-Security-Policy": [csp],
      }
    });
  });

  mainWindow.loadURL('http://localhost:5173');
});
