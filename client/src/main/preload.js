// 此文件执行在 Node.js 环境中
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  toggleDevTools: () => ipcRenderer.send("toggle-devtools"),

  versions: {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
  },

  async readDatabase() {
    return await ipcRenderer.invoke("read-database");
  },

  async writeDatabase(data) {
    return await ipcRenderer.invoke("write-database", data);
  },
});
