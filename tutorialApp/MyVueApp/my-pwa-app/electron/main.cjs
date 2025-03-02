const { app, BrowserWindow, session } = require('electron');

let mainWindow;

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    //  devtools 관련 예외처리 추가
    try {
        session.defaultSession.webRequest.onBeforeRequest((details, callback) => {
            if (details.url.startsWith("devtools://")) {
                return callback({ cancel: true });
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
