// 初始化 ipcMain
exports.init = ({ipcMain, mainWindow}) => {

    mainWindow.on('resize', () => {
        mainWindow.webContents.send('isMaximized', mainWindow.isMaximized()) // 发送：是否是最大化
    })

    // 发送：是否是最大化
    ipcMain.on('isMaximized', (event, arg) => {
        event.reply('isMaximized', mainWindow.isMaximized()) // 发送：是否是最大化
    })

    // 最小化
    ipcMain.on('minimize', (event, arg) => {
        mainWindow.minimize()
    })

    // 最大化
    ipcMain.on('maximize', (event, arg) => {
        mainWindow.maximize()
    })

    // 取消最大化
    ipcMain.on('unmaximize', (event, arg) => {
        mainWindow.unmaximize()
    })

    // 关闭
    ipcMain.on('close', (event, arg) => {
        mainWindow.close()
    })

    // 异步，需要添加 listener：
    //      ipcRenderer.on('async-reply', (event, args) => {
    //          console.log('args', args)
    //      })
    // ipcMain.on('async-message', (event, arg) => {
    //     event.reply('async-reply', 'pong')
    // })

    // 同步：ipcRenderer.sendSync('sync-message')，结果为：'pong'
    // ipcMain.on('sync-message', (event, arg) => {
    //     event.returnValue = 'pong'
    // })

}
