import {app, BrowserWindow, ipcMain} from "electron";
import * as path from "path";
import ipcMainUtil from "./electron/ipcMainUtil";

function createWindow() {
    const mainWindow = new BrowserWindow({
        minWidth: 800,
        minHeight: 600,
        webPreferences: {
            preload: path.join(__dirname, "./electron/preload.js"),
        },
        frame: false, // 去掉默认的标题栏
        titleBarStyle: 'customButtonsOnHover', // 隐藏mac左上角的红绿灯
    });

    if (app.isPackaged) {
        mainWindow.loadURL('https://cmc6.vip/')
    } else {
        // 打开开发工具
        mainWindow.webContents.openDevTools()
        mainWindow.loadURL('http://localhost:15173/')
    }

    ipcMainUtil(ipcMain, mainWindow); // 初始化：ipcMain

}

app.whenReady().then(() => {
    createWindow();
    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
