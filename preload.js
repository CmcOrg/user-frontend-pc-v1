const {contextBridge, ipcRenderer} = require('electron')

// 渲染进程（html）给主进程发送消息
contextBridge.exposeInMainWorld('ipcRenderer', {
    send(channel, data) {
        ipcRenderer.send(channel, data)
    },
    // 同步发送消息给主进程：主进程通过：ipcMain.event.returnValue 传递返回值
    sendSync(channel, data) {
        return ipcRenderer.sendSync(channel, data)
    },
    on(channel, listener) {
        ipcRenderer.on(channel, listener) // listener 是一个 Function：( event IpcRendererEvent, ...args any[] )
    }
})

// 所有Node.js API都可以在预加载过程中使用。
// 它拥有与Chrome扩展一样的沙盒。
window.addEventListener('DOMContentLoaded', () => {

    // ipcRenderer.on('async-reply', (event, args) => {
    //     console.log('args', args)
    // })

})
