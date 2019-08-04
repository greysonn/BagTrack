import * as electron from 'electron';
import * as fs from 'fs';
import * as path from 'path';

import { DataManager, SaleInfo, Settings } from '@/common/types';

let dataPath: string;
let salesPath: string;
let settingsPath: string;
let saleStorage: SaleInfo[];
let settingStorage: Settings;

/**
 * Data class to handle all user-stored data.
 */
export const data: DataManager = {
  loadMemory: (): void => {
    dataPath = (electron.app || electron.remote.app).getPath('userData');
    salesPath = path.join(dataPath, 'sales.json');
    settingsPath = path.join(dataPath, 'settings.json');
    if (!fs.existsSync(salesPath)) {
      fs.writeFileSync(salesPath, '[]');
    }
    if (!fs.existsSync(settingsPath)) {
      fs.writeFileSync(settingsPath, JSON.stringify({
        goatUsername: '',
        goatPassword: '',
        goatAuthToken: '',
        stockxEmail: '',
        stockxPassword: '',
        stockxJwtToken: '',
        stockxUserId: '',
      }));
    }
    saleStorage = JSON.parse(fs.readFileSync(salesPath).toString());
    settingStorage = JSON.parse(fs.readFileSync(settingsPath).toString());
  },

  /**
   * updateMemory
   * updates the vars used to store data.
   * this would be done whenever a change is made to a storage file.
   */
  updateMemory: (): void => {
    saleStorage = JSON.parse(fs.readFileSync(salesPath).toString());
    settingStorage = JSON.parse(fs.readFileSync(settingsPath).toString());
  },

  /**
   * createSale
   * adds a sale or sales to the sales.json path
   */
  createSale: async (sale: SaleInfo | SaleInfo[]): Promise<void> => {
    if (Array.isArray(sale)) {
      saleStorage = saleStorage.concat(sale);
    } else {
      saleStorage.push(sale);
    }
    fs.writeFileSync(salesPath, JSON.stringify(saleStorage));
  },

  /**
   * deleteSale
   * removes a sale from the sales.json path
   */
  deleteSale: async (index: number): Promise<void> => {
    saleStorage.splice(index, 1);
    fs.writeFileSync(salesPath, JSON.stringify(saleStorage));
  },

  /**
   * getSales
   * returns all sales from memory.
   */
  getSales: (): SaleInfo[] => {
    return saleStorage;
  },

  clearGoatSales: (): void => {
    saleStorage = saleStorage.filter((s: SaleInfo) => !s.goatSale);
    fs.writeFileSync(salesPath, JSON.stringify(saleStorage));
  },

  clearStockxSales: (): void => {
    saleStorage = saleStorage.filter((s: SaleInfo) => !s.stockxSale);
    fs.writeFileSync(salesPath, JSON.stringify(saleStorage));
  },

  setSetting: (key: keyof Settings, value: string): void => {
    settingStorage[key] = value;
    fs.writeFileSync(settingsPath, JSON.stringify(settingStorage));
  },

  /**
   * getSettings
   * returns the settings from memory.
   */
  getSettings: (): Settings => {
    return settingStorage;
  }
};
