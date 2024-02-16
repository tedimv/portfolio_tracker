import { MarketTrendPoint, Transaction } from './base';

export type WalletCryptoAsset = {
    transactions: Transaction[];
    name: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    iconUrl: any;
};

export type MarketCryptoAsset = {
    name: string;
    seriesPrice: MarketTrendPoint[];
};
