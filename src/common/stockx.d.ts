export interface StockxUser {
  Customer: Customer;
}

export interface SalesResponse {
  PortfolioItems: StockxSale[],
  Pagination: Pagination
}
interface Pagination {
  limit: number;
  page: number;
  total: number;
  lastPage: number;
  currentPage: string;
  nextPage?: null;
  prevPage?: null;
  sort?: (string)[] | null;
  order?: (string)[] | null;
}
interface StockxSale {
  chainId: string;
  customerId: number;
  userUuid: string;
  inventoryId: string;
  productId: string;
  skuUuid: string;
  merchantId: number;
  condition: number;
  action: number;
  actionBy: number;
  amount: number;
  localCurrency: string;
  localAmount: number;
  localExchangeRate: number;
  bidAskSpread: number;
  expiresAt: string;
  expiresAtTime: number;
  faqLink?: null;
  gainLossDollars: number;
  gainLossPercentage: number;
  marketValue: string;
  matchedWith: string;
  matchedState: number;
  matchedWithDate: string;
  owner?: null;
  userFullname?: null;
  purchasePrice: string;
  purchaseDate: string;
  purchaseDateTime: number;
  shipByDate?: null;
  state: number;
  statusMessage?: null;
  text: string;
  notes: string;
  countryCode?: null;
  createdAt: string;
  createdAtTime: number;
  url?: null;
  referUrl?: null;
  canEdit: boolean;
  canDelete: boolean;
  Tracking: Tracking;
  meta: Meta;
  orderNumber: string;
  total?: null;
  localTotal: number;
  product: Product;
  Merchant: Merchant;
  Customer: Customer;
  localMarketValue: number;
  localGainLoss: number;
}
interface Tracking {
  number: string;
  status: string;
  labelUrl?: null;
  formUrl?: null;
  trackUrl: string;
  deliveryDate: string;
  deliveryDateTime: number;
}
interface Meta {
  merchantSku?: null;
  discountCode?: null;
  sizePreferences?: null;
}
interface Product {
  id: string;
  uuid: string;
  brand: string;
  breadcrumbs?: (BreadcrumbsEntity)[] | null;
  category: string;
  charityCondition: number;
  colorway: string;
  condition: string;
  countryOfManufacture?: null;
  description?: null;
  gender: string;
  contentGroup: string;
  ipoDate?: null;
  minimumBid: number;
  Doppelgangers?: (null)[] | null;
  media: Media;
  name: string;
  isLithiumIonBattery: boolean;
  traits?: (TraitsEntity)[] | null;
  PortfolioItems?: (null)[] | null;
  primaryCategory: string;
  secondaryCategory: string;
  usHtsCode: string;
  usHtsDescription: string;
  productCategory: string;
  releaseDate: string;
  retailPrice: number;
  shoe: string;
  shortDescription: string;
  styleId?: null;
  tickerSymbol: string;
  title: string;
  dataType: string;
  type: number;
  sizeTitle: string;
  sizeDescriptor: string;
  sizeAllDescriptor: string;
  url?: null;
  urlKey: string;
  year: string;
  shippingGroup: string;
  hold: boolean;
  aLim: number;
  meta: Meta1;
  shipping: Shipping;
  enhancedImage: EnhancedImageOrChildren;
  children: EnhancedImageOrChildren;
  parentId: string;
  parentUuid: string;
  sizeSortOrder: number;
  shoeSize: string;
  market: Market;
  upc: string;
}
interface BreadcrumbsEntity {
  level: number;
  name: string;
  url: string;
  isBrand: string;
}
interface Media {
  imageUrl: string;
  smallImageUrl: string;
  thumbUrl: string;
  gallery?: (string)[] | null;
  hidden: boolean;
  has360: boolean;
}
interface TraitsEntity {
  name: string;
  value: string | number;
  filterable: boolean;
  visible: boolean;
  highlight: boolean;
  format?: string | null;
}
interface Meta1 {
  charity: boolean;
  raffle: boolean;
  mobile_only: boolean;
  restock: boolean;
  deleted: boolean;
  hidden: boolean;
  lock_buying: boolean;
  lock_selling: boolean;
  redirected: boolean;
}
interface Shipping {
  totalDaysToShip: number;
  hasAdditionalDaysToShip: boolean;
  deliveryDaysLowerBound: number;
  deliveryDaysUpperBound: number;
}
interface EnhancedImageOrChildren {
}
interface Market {
  productId: number;
  skuUuid: string;
  productUuid: string;
  lowestAsk: number;
  lowestAskFloat: number;
  lowestAskSize: string;
  parentLowestAsk: number;
  numberOfAsks: number;
  salesThisPeriod: number;
  salesLastPeriod: number;
  highestBid: number;
  highestBidFloat: number;
  highestBidSize: string;
  numberOfBids: number;
  annualHigh: number;
  annualLow: number;
  deadstockRangeLow: number;
  deadstockRangeHigh: number;
  volatility: number;
  deadstockSold: number;
  pricePremium: number;
  averageDeadstockPrice: number;
  lastSale: number;
  lastSaleSize: string;
  salesLast72Hours: number;
  changeValue: number;
  changePercentage: number;
  absChangePercentage: number;
  totalDollars: number;
  updatedAt: number;
  lastLowestAskTime: number;
  lastHighestBidTime: number;
  lastSaleDate: string;
  createdAt: string;
  deadstockSoldRank: number;
  pricePremiumRank: number;
  averageDeadstockPriceRank: number;
  featured?: null;
}
interface Merchant {
  id: number;
  customerId: number;
  isRobot: number;
  name: string;
  paypalEmail: string;
  preferredPayout: string;
  accountName: string;
  take: number;
  createdAt: string;
  createdAtTime: number;
  updatedAt: string;
  updatedAtTime: number;
}
interface Customer {
  id: string;
  uuid: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  username: string;
  emailVerified: boolean;
  defaultSize: string;
  defaultCategory: string;
  defaultCurrency: string;
  language: string;
  categories?: (string)[] | null;
  vacationDate?: null;
  isActive: boolean;
  flagged: boolean;
  hidePortfolioBanner: boolean;
  referUrl?: null;
  createdAt: string;
  createdAtTime: number;
  isTrader: boolean;
  hasBuyerReward: boolean;
  gdprStatus?: null;
}
