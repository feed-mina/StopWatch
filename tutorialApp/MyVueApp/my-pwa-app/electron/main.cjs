const { app, BrowserWindow, session } = require('electron');
const { autoUpdater } = require('electron-updater');

const path = require('path')

let mainWindow;

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true, // Node.js 사용
            contextIsolation: false // Node.js랑 같이 동작
        }
       // autoUpdater.checkForUpdatesAndNotify();
    });

    //  devtools 관련 예외처리 추가 열지 못하게 막기
    try {
        session.defaultSession.webRequest.onBeforeRequest((details, callback) => {
            if (details.url.startsWith("devtools://")) {
                return callback({ cancel: true }); // DevTools 차단
            }
            return callback({});
        });
    } catch (error) {
        console.error("onBeforeRequest Error:", error);
    }

    //  Electron 실행 중 Promise 오류 방지
    mainWindow.loadURL('http://localhost:5173')
        .catch((err) => console.error("Electron Load URL Error:", err));
});
