import { app, BrowserWindow, session, Menu, ipcMain } from "electron";
import { join } from "path";
import fs from "fs";

const DATABASE_PATH = join(
  app.getPath("userData"),
  "/ability-arena-database.json"
);

function createWindow() {
  const mainWindow = new BrowserWindow({
    icon: join(app.getAppPath(), "static/logo.png"),
    fullscreen: true,
    resizable: false,
    webPreferences: {
      preload: join(app.getAppPath(), "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
  });

  if (process.env.NODE_ENV === "development") {
    const rendererPort = process.argv[2];
    mainWindow.loadURL(`http://localhost:${rendererPort}`);
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(join(app.getAppPath(), "renderer", "index.html"));
  }

  // 取消菜单栏
  Menu.setApplicationMenu(null);

  // 开发者工具
  ipcMain.on("toggle-devtools", () => {
    mainWindow.webContents.toggleDevTools();
  });

  // 读取数据库
  ipcMain.handle("read-database", () => {
    if (!fs.existsSync(DATABASE_PATH)) {
      return null;
    }
    return JSON.parse(fs.readFileSync(DATABASE_PATH, "utf8"));
  });

  // 操作数据库
  ipcMain.handle("write-database", (_, data) => {
    fs.writeFileSync(DATABASE_PATH, JSON.stringify(data), "utf8");
  });
}

app.whenReady().then(() => {
  createWindow();

  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        "Content-Security-Policy": [
          "default-src 'self'; style-src 'self' 'unsafe-inline'; connect-src *; script-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; frame-src 'self';",
        ],
      },
    });
  });

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", function () {
  // 取消所有监听
  ipcMain.removeAllListeners();
  if (process.platform !== "darwin") app.quit();
});
