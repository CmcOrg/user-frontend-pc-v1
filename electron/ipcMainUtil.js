// 初始化 ipcMain
exports.init = ({ipcMain, mainWindow}) => {

    mainWindow.on('electron:resize', () => {
        mainWindow.webContents.send('electron:isMaximized', mainWindow.isMaximized()) // 发送：是否是最大化
    })

    // 发送：是否是最大化
    ipcMain.on('electron:isMaximized', (event, data) => {
        event.reply('electron:isMaximized', mainWindow.isMaximized()) // 发送：是否是最大化
    })

    // 最小化
    ipcMain.on('electron:minimize', (event, data) => {
        mainWindow.minimize()
    })

    // 最大化
    ipcMain.on('electron:maximize', (event, data) => {
        mainWindow.maximize()
    })

    // 取消最大化
    ipcMain.on('electron:unmaximize', (event, data) => {
        mainWindow.unmaximize()
    })

    // 关闭
    ipcMain.on('electron:close', (event, data) => {
        mainWindow.close()
    })

    // 异步，需要添加 listener：
    //      ipcRenderer.on('electron:async-reply', (event, data) => {
    //          console.log('data', data)
    //      })
    // ipcMain.on('electron:async-message', (event, data) => {
    //     event.reply('electron:async-reply', 'pong')
    // })

    // 同步：ipcRenderer.sendSync('electron:sync-message')，结果为：'pong'
    // ipcMain.on('electron:sync-message', (event, data) => {
    //     event.returnValue = 'pong'
    // })

}
