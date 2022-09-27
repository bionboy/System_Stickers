const { app, BrowserWindow, remote, ipcMain } = require("electron");

let window;

const imageURL = process.argv[2];

ipcMain.on("loaded", function (event, _) {
  if (imageURL) event.sender.send("setImgSrc", imageURL);
});

function createWindow() {
  window = new BrowserWindow({
    width: 300,
    height: 300,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  window.loadFile("index.html");

  window.on("closed", function () {
    window = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", function () {
  if (window === null) createWindow();
});
