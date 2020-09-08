"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var moment_1 = __importDefault(require("moment"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
/**
 * @event   addApp
 * @desc    Adds an application to the user's list in the settings.json with the provided fields
 * @return  New list of applications
 */
// Loads existing settings JSON and update settings to include new services entered by the user on 'submit' request
electron_1.ipcMain.on('addApp', function (message, application) {
    // Retrives file contents from settings.json
    var state = JSON.parse(fs_1.default.readFileSync(path_1.default.resolve(__dirname, '../user/settings.json')).toString('utf8'));
    // Add new applicaiton to list
    var newApp = JSON.parse(application);
    // Add a creation date to the application
    var createdOn = moment_1.default().format('lll');
    newApp.push(createdOn);
    // Add app to list of applications
    state.services.push(newApp);
    // Update settings.json with new list
    fs_1.default.writeFileSync(path_1.default.resolve(__dirname, '../user/settings.json'), JSON.stringify(state));
    // Sync event - return new applications list
    message.returnValue = state.services.map(function (arr) { return [arr[0], arr[3], arr[4]]; });
});
/**
 * @event   getApps
 * @desc    Retrieves the existing list of applications belonging to the user
 * @return  Returns the list of applications
 */
// Load settings.json and returns updated state back to the render process on ipc 'dashboard' request
electron_1.ipcMain.on('getApps', function (message) {
    // Retrives file contents from settings.json
    var state = JSON.parse(fs_1.default.readFileSync(path_1.default.resolve(__dirname, '../user/settings.json')).toString('utf8'));
    // Destructure list of services from state to be rendered on the dashboard
    var dashboardList = state.services.map(function (arr) { return [arr[0], arr[3], arr[4]]; });
    // Sync event - return new applications list
    message.returnValue = dashboardList;
});
/**
 * @event   deleteApp
 * @desc    Deletes the desired application from settings.json which is located with the provided index
 * @return  Returns the new list of applications
 */
electron_1.ipcMain.on('deleteApp', function (message, index) {
    // Retrives file contents from settings.json
    var state = JSON.parse(fs_1.default.readFileSync(path_1.default.resolve(__dirname, '../user/settings.json')).toString('utf8'));
    // Remove application from settings.json
    state.services.splice(index, 1);
    // Update settings.json with new list
    fs_1.default.writeFileSync(path_1.default.resolve(__dirname, '../user/settings.json'), JSON.stringify(state), {
        encoding: 'utf8',
    });
    // Sync event - return new applications list
    message.returnValue = state.services.map(function (arr) { return [arr[0], arr[3], arr[4]]; });
});
// module.exports = dashboard;
//# sourceMappingURL=dashboard.js.map