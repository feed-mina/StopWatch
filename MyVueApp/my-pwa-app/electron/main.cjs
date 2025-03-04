const { app, BrowserWindow, ipcMain } = require('electron');

let win;

let mainWindow; // 사용 안 함 
let loginWindow;
function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });
  win.loadURL('http://localhost:5173');
}

// loginWindow.loadURL('http://localhost:5173'); // 처음엔 로그인 화면
// loginWindow.on('closed', () => {
//   loginWindow = null;
// });


app.whenReady().then(() => {
  createWindow() 

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

  win.loadURL('http://localhost:5173');
});


ipcMain.on('login-success', () => {
  console.log(" Electron: 로그인 성공 신호 받음!");
  if (win) {
    win.loadURL('http://localhost:5173/main');
  }
});
app.on('before-quit', () => {
  // 윈도우에 이벤트 전달
  win.webContents.executeJavaScript(`localStorage.clear();`);
});
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
// localStorage 지움
// app.on('before-quit', () => {
//   if (loginWindow) {
//     loginWindow.webContents.executeJavaScript(`localStorage.clear();`);
//   }
// });

// Workbox가 캐시를 들고 있어서 /main으로 이동을 방해, 캐시 지우기 코드

// if ('serviceWorker' in navigator) {
//   caches.keys().then(names => {
//     for (let name of names) caches.delete(name);
//   });
// }
