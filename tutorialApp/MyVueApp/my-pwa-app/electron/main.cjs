const { app, BrowserWindow } = require('electron');

app.whenReady().then(() => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
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
          "https://mk.kakaocdn.net; " + // 
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

  mainWindow.loadURL('http://localhost:5173');
});
