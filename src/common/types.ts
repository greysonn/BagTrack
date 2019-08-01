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
};