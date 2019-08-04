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
  goatSale?: boolean;
  stockxSale?: boolean;
};

export type Settings = {
  goatUsername: string;
  goatPassword: string;
  goatAuthToken: string;
  stockxEmail: string;
  stockxPassword: string;
  stockxJwtToken: string;
  stockxUserId: string;
};

export type DataManager = {
  loadMemory(): void;
  updateMemory(): void;
  createSale(sale: SaleInfo | SaleInfo[]): Promise<void>;
  deleteSale(index: number): Promise<void>;
  getSales(): SaleInfo[];
  clearGoatSales(): void;
  clearStockxSales(): void;
  setSetting(key: string, value: string): void;
  getSettings(): Settings;
};
