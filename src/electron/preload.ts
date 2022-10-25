import {contextBridge, ipcRenderer, IpcRendererEvent} from "electron";

window.addEventListener("DOMContentLoaded", () => {
});

// 渲染进程（html）给主进程发送消息
contextBridge.exposeInMainWorld('ipcRenderer', {
    // 需要使用：ipcRenderer.on(channel, listener)，才可以拿到返回值
    send(channel: TElectronChannel, data?: any) {
        ipcRenderer.send(channel, data)
    },
    // 使用：.then，即可拿到返回值
    invoke(channel: TElectronChannel, data?: any) {
        return ipcRenderer.invoke(channel, data)
    },
    on(channel: TElectronChannel, listener: (event: IpcRendererEvent, data?: any) => void) {
        ipcRenderer.on(channel, listener)
    },
})

// electron 通道 type
type TElectronChannel =
    'electron:minimize'
    | 'electron:unmaximize'
    | 'electron:isMaximized'
    | 'electron:maximize'
    | 'electron:close' | 'socket:connect'