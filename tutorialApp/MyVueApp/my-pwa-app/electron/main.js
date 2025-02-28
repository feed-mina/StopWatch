const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 400,
        height: 500,
        webPreferences: {
            nodeIntegration: true
        }
    });

    // 🚀 절대경로를 사용해 index.html 불러오기
    mainWindow.loadFile(path.join(__dirname, 'index.html'));

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
