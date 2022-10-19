const {app, BrowserWindow} = require('electron')
const path = require('path')

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 900,
        minWidth: 1200,
        minHeight: 900,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        },
        frame: false, // 去掉默认的标题栏
        titleBarStyle: 'customButtonsOnHover', // 隐藏mac左上角的红绿灯
    })

    if (app.isPackaged) {
        mainWindow.loadURL('http://42.192.38.156/suancai-boot')
    } else {
        // 打开开发工具
        mainWindow.webContents.openDevTools()
        mainWindow.loadURL('http://localhost:7555')
    }

    ipcMainUtil.init({ipcMain, mainWindow}) // 初始化 ipcMain

}

// 这段程序将会在 Electron 结束初始化和创建浏览器窗口的时候调用，部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {

    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

})

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。
app.on('window-all-closed', () => {

    if (process.platform !== 'darwin') app.quit()

})

