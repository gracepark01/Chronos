"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
// import { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
// const { default: installExtension } = require('electron-devtools-installer');
var path_1 = __importDefault(require("path"));
require("./routes/dashboard");
require("./routes/data");
// require('./routes/dashboard');
// require('./routes/data');
// Install React Dev Tools
// app.whenReady().then(() => {
//   installExtension(REACT_DEVELOPER_TOOLS)
//     .then((name: string) => console.log(`Added Extension:  ${name}`))
//     .catch((err: Error) => console.log('An error occurred: ', err));
// });
// Declare variable to be used as the application window
var win;
/**
 * @desc createWindow sets up the environment of the window (dimensions, port, initial settings)
 */
var createWindow = function () {
    win = new electron_1.BrowserWindow({
        width: 1920,
        height: 1080,
        icon: path_1.default.join(__dirname, 'app/assets/icons/icon.png'),
        // Node integration allows node.js to run
        webPreferences: {
            nodeIntegration: true,
        },
    });
    // Development: load the application window to port 8080
    win.loadURL('http://localhost:8080/');
    // Production
    // win.loadURL(`file://${path.join(__dirname, './dist/index.html')}`);
};
// Invoke the createWindow function when Electron application loads
electron_1.app.on('ready', createWindow);
// Quits application when all windows are closed
electron_1.app.on('window-all-closed', function () {
    electron_1.app.quit();
});
// Event 'activate' emmitted upon application starting
electron_1.app.on('activate', function () {
    // If there is no window present invoke the create window function
    if (win === null) {
        createWindow();
    }
});
//# sourceMappingURL=Main.js.map