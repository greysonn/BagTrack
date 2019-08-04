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
import { Stockx } from '../classes/stockx';

const goat: Goat = new Goat();
const stockx: Stockx = new Stockx();
const devtools: boolean = false;
let mainWindow: Electron.BrowserWindow | null;

data.loadMemory();

const {
  goatUsername,
  goatPassword,
  stockxEmail,
  stockxPassword
} = data.getSettings();
if (goatUsername && goatPassword) {
  // tslint:disable-next-line: no-floating-promises
  (async (): Promise<void> => {
    try {
      const token: string = await goat.logIn(goatUsername, goatPassword);
      data.setSetting('goatUsername', goatUsername);
      data.setSetting('goatPassword', goatPassword);
      data.setSetting('goatAuthToken', token);
    } catch (e) {
      console.error(e);
    }
  })();
}
if (stockxEmail && stockxPassword) {
  // tslint:disable-next-line: no-floating-promises
  (async (): Promise<void> => {
    try {
      const token: string = await stockx.logIn(stockxEmail, stockxPassword);
      data.setSetting('stockxEmail', stockxEmail);
      data.setSetting('stockxPassword', stockxPassword);
      data.setSetting('stockxJwtToken', token);
    } catch (e) {
      console.error(e);
    }
  })();
}

function createWindow(): void {
  mainWindow = new BrowserWindow({
    height: 950,
    width: 1400,
    title: 'BagTrack',
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      webSecurity: true
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

ipcMain.on('stockxLogin', async (event: IpcMessageEvent, arg: { email: string; password: string }) => {
  // tslint:disable: possible-timing-attack
  const token: string = await stockx.logIn(arg.email, arg.password);
  if (token) {
    data.setSetting('stockxEmail', arg.email);
    data.setSetting('stockxPassword', arg.password);
    data.setSetting('stockxJwtToken', token);
    mainWindow!.webContents.send('stockxLoginResponse', true);
  } else {
    mainWindow!.webContents.send('stockxLoginResponse', false);
  }
});

ipcMain.on('syncGoatSales', async (event: IpcMessageEvent) => {
  await goat.getSales();
  mainWindow!.webContents.send('getSales', data.getSales());
});

ipcMain.on('syncStockxSales', async (event: IpcMessageEvent) => {
  await stockx.getSales();
  mainWindow!.webContents.send('getSales', data.getSales());
});

ipcMain.on('createSale', async (event: IpcMessageEvent, arg: { sale: SaleInfo }) => {
  await data.createSale(arg.sale);
  mainWindow!.webContents.send('getSales', data.getSales());
});

ipcMain.on('deleteSale', async (event: IpcMessageEvent, index: number) => {
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
