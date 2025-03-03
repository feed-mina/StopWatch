const { app, BrowserWindow, session } = require('electron');
const { autoUpdater } = require('electron-updater');

const path = require('path')

let mainWindow;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
          webSecurity: false  // 보안주의
      }
  });

  mainWindow.loadURL('http://localhost:5173');

    //  devtools 관련 예외처리 추가 열지 못하게 막기
    // try {
    //     session.defaultSession.webRequest.onBeforeRequest((details, callback) => {
    //         if (details.url.startsWith("devtools://")) {
    //             return callback({ cancel: true }); // DevTools 차단
    //         }
    //         return callback({});
    //     });
    // } catch (error) {
    //     console.error("onBeforeRequest Error:", error);
    // }

    //  Electron 실행 중 Promise 오류 방지
    mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
      callback({
        responseHeaders: {
          ...details.responseHeaders,
          "Content-Security-Policy": [
            "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://developers.kakao.com https://t1.kakaocdn.net https://accounts.kakao.com; style-src 'self' 'unsafe-inline' https://accounts.kakao.com https://t1.kakaocdn.net; connect-src 'self' http://localhost:8080 https://kauth.kakao.com https://accounts.kakao.com; frame-src https://kauth.kakao.com https://accounts.kakao.com;"
          ]
        }
      });
    });
    
});
