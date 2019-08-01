/**
 * Entry point of the Election app.
 */
import { app, BrowserWindow } from 'electron';
import * as os from 'os';
import * as path from 'path';
import * as url from 'url';

let mainWindow: Electron.BrowserWindow | null;

function createWindow(): void {
  mainWindow = new BrowserWindow({
    height: 950,
    width: 1400,
    title: 'BagTrack',
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      webSecurity: false
    }
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, './index.html'),
      protocol: 'file:',
      slashes: true
    })
  );

  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();

    // Load the react devtools
    BrowserWindow.addDevToolsExtension(
      path.join(os.homedir(), '/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/3.6.0_0')
    );
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.env.NODE_ENV === 'development' || process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
