/**
 * Entry point of the Electron app.
 */
import { app, BrowserWindow, Event, ipcMain, IpcMessageEvent } from 'electron';
import * as os from 'os';
import * as path from 'path';
import * as url from 'url';

import { data } from '@/classes/data';
import { SaleInfo, Settings } from '@/common/types';
import { Goat } from '../classes/goat';

const goat: Goat = new Goat();
const devtools: boolean = false;
let mainWindow: Electron.BrowserWindow | null;

data.loadMemory();

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
    if (devtools === true) {
      BrowserWindow.addDevToolsExtension(
        path.join(os.homedir(), '/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/3.6.0_0')
      );
    }
  }

  mainWindow.webContents.on('did-finish-load', (): void => {
    const settings: Settings = data.getSettings();
    mainWindow!.webContents.send('loadSettings', settings);
    mainWindow!.webContents.send('getSales', data.getSales());
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

ipcMain.on('requestSettings', async () => {
  const settings: Settings = data.getSettings();
  mainWindow!.webContents.send('loadSettings', settings);
});

ipcMain.on('goatLogin', async (event: IpcMessageEvent, arg: { username: string; password: string }) => {
  // tslint:disable: possible-timing-attack
  const token: string = await goat.logIn(arg.username, arg.password);
  if (token) {
    data.setSetting('goatUsername', arg.username);
    data.setSetting('goatPassword', arg.password);
    data.setSetting('goatAuthToken', token);
    mainWindow!.webContents.send('goatLoginResponse', true);
  } else {
    mainWindow!.webContents.send('goatLoginResponse', false);
  }
});

ipcMain.on('createSale', async (event: IpcMessageEvent, arg: { sale: SaleInfo }) => {
  await data.createSale(arg.sale);
  mainWindow!.webContents.send('getSales', data.getSales());
});

ipcMain.on('deleteSale', async (event: IpcMessageEvent, sale: SaleInfo) => {
  const sales: SaleInfo[] = data.getSales();
  const index: number = sales.indexOf(sale);
  await data.deleteSale(index);
  mainWindow!.webContents.send('getSales', data.getSales());
});

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
