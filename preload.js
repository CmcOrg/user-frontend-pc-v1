// preload.js
const {contextBridge, ipcRenderer} = require('electron')

// 向渲染进程传递参数
contextBridge.exposeInMainWorld('ipcRenderer', {
    send(channel, data) {
        ipcRenderer.send(channel, data)
    },
    // 同步发送消息：通过：ipcMain.event.returnValue传递返回值
    sendSync(channel, data) {
        return ipcRenderer.sendSync(channel, data)
    },
    on(channel, callback) {
        ipcRenderer.on(channel, callback)
    }
})

// 所有Node.js API都可以在预加载过程中使用。
// 它拥有与Chrome扩展一样的沙盒。
window.addEventListener('DOMContentLoaded', () => {

    window.localStorage.setItem('showTitleBar', true)

})
