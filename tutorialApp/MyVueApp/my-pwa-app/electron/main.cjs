const { app, BrowserWindow, session } = require('electron');

let mainWindow;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,  // Node.js를 같이 사용하게 해요.
      contextIsolation: false // 격리하지 않고 같이 돌아가게 해요.
    }
  });

  // 🛡️ Electron 창에 보안 규칙 넣기
  mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        "Content-Security-Policy": [
          "default-src 'self'; script-src 'self' 'unsafe-inline' https://developers.kakao.com https://t1.kakaocdn.net https://accounts.kakao.com; style-src 'self' 'unsafe-inline' https://accounts.kakao.com https://t1.kakaocdn.net; connect-src 'self' http://localhost:8080 https://kauth.kakao.com https://accounts.kakao.com; frame-src https://kauth.kakao.com https://accounts.kakao.com;"
        ]
      }
    });
  });

  mainWindow.loadURL('http://localhost:5173');
});
