const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    send: (channel, data) => {
        let validChannels = ['branches', 'chapters', 'sections', 'sectionContent'];
        if (validChannels.includes(channel)) {
            ipcRenderer.send(channel, data);
        }
    },
    on: (channel, func) => {
        let validChannels = ['complete'];
        if (validChannels.includes(channel)) {
            ipcRenderer.on(channel, (event, ...args) => func(event, ...args));
        }
    },
    once: (channel, func) => {
        let validChannels = ['complete'];
        if (validChannels.includes(channel)) {
            ipcRenderer.once(channel, (event, ...args) => func(event, ...args));
        }
    }
});
