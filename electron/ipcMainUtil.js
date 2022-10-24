// 初始化 ipcMain
exports.init = ({ipcMain, mainWindow}) => {

    mainWindow.on('resize', () => {
        mainWindow.webContents.send('isMaximized', mainWindow.isMaximized()) // 发送：是否是最大化
    })

    // 发送：是否是最大化
    ipcMain.on('isMaximized', (event, data) => {
        event.reply('isMaximized', mainWindow.isMaximized()) // 发送：是否是最大化
    })

    // 最小化
    ipcMain.on('minimize', (event, data) => {
        mainWindow.minimize()
    })

    // 最大化
    ipcMain.on('maximize', (event, data) => {
        mainWindow.maximize()
    })

    // 取消最大化
    ipcMain.on('unmaximize', (event, data) => {
        mainWindow.unmaximize()
    })

    // 关闭
    ipcMain.on('close', (event, data) => {
        mainWindow.close()
    })

    // 异步，需要添加 listener：
    //      ipcRenderer.on('async-reply', (event, data) => {
    //          console.log('args', data)
    //      })
    // ipcMain.on('async-message', (event, data) => {
    //     event.reply('async-reply', 'pong')
    // })

    // 同步：ipcRenderer.sendSync('sync-message')，结果为：'pong'
    // ipcMain.on('sync-message', (event, data) => {
    //     event.returnValue = 'pong'
    // })

}
