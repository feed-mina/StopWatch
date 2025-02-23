const { app, BrowserWindow } = require('electron');
const { exec } = require('child_process');

let mainWindow;

// Vue 서버가 실행될 때까지 대기하는 함수
function waitForVueServer(url, callback) {
    const http = require('http');
    let attempts = 0;
    const maxAttempts = 30; // 30초 동안 대기

    function checkServer() {
        http.get(url, () => {
            console.log("✅ Vue 서버가 실행됨! Electron을 실행합니다.");
            callback();
        }).on('error', () => {
            attempts++;
            if (attempts < maxAttempts) {
                console.log(`⏳ Vue 서버 대기 중... (${attempts}/${maxAttempts})`);
                setTimeout(checkServer, 1000);
            } else {
                console.log("❌ Vue 서버 실행 실패! Electron 종료.");
                app.quit();
            }
        });
    }

    checkServer();
}

app.whenReady().then(() => {
    console.log("🚀 Vue 서버 실행 중...");
    exec("npm run dev"); // Vue 개발 서버 실행

    waitForVueServer("http://localhost:5173", () => {
        mainWindow = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                nodeIntegration: true
            }
        });

        mainWindow.loadURL("http://localhost:5173");

        mainWindow.on("closed", () => {
            mainWindow = null;
        });
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
