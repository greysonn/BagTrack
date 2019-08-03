/**
 * Globally-used types
 */

export type SaleInfo = {
  product: string;
  category: 'Nike' | 'Adidas' | 'Jordan' | 'Bape' | 'Supreme' | 'Palace' | 'Yeezy' | 'Off-White Nike' | 'Converse' | 'Kith' | 'Digital Goods' | 'Other';
  size: string;
  purchaseDate: string;
  purchasePrice: number;
  sellPrice: number;
  netProfit: number;
  grossProfit: number;
};

export type Settings = {
  goatUsername: string;
  goatPassword: string;
  goatAuthToken: string;
};

export type DataManager = {
  loadMemory(): void;
  updateMemory(): void;
  createSale(sale: SaleInfo): Promise<void>;
  deleteSale(index: number): Promise<void>;
  getSales(): SaleInfo[];
  setSetting(key: string, value: string): void;
  getSettings(): Settings;
};
