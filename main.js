const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const dbLogic = require('./db-logic');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 800,
        backgroundColor: '#f5f5f5',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    if (process.platform === 'win32' && typeof mainWindow.setBackgroundMaterial === 'function') {
        mainWindow.setBackgroundMaterial('mica');
    }

    mainWindow.loadFile(path.join(__dirname, 'public/index.html'));

    // Automatically open DevTools for debugging
    mainWindow.webContents.openDevTools();

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

// IPC Handlers
ipcMain.on('branches', (event) => {
    dbLogic.retrieveBranches(event);
});

ipcMain.on('chapters', (event, brId) => {
    dbLogic.retrieveChapters(event, brId);
});

ipcMain.on('sections', (event, chId) => {
    dbLogic.retrieveSections(event, chId);
});

ipcMain.on('sectionContent', (event, secId) => {
    dbLogic.retrieveSectionContent(event, secId);
});

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
