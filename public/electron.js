const { app, BrowserWindow } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 1000,
        icon: __dirname + "/icon.ico",
    });
    const startUrl = isDev
        ? "http://localhost:3000"
        : `file://${path.join(__dirname, "../build/index.html")}`;

    mainWindow.loadURL(startUrl);
    mainWindow.on("closed", function () {
        mainWindow = null;
    });
}
app.on("ready", createWindow);

app.on("activate", function () {
    if (mainWindow === null) {
        createWindow();
    }
});
