import { MarketTrendPoint, Transaction } from "./base";

export type MarketProperty = { city: string; address: string; seriesPrice: MarketTrendPoint[] };
export type WalletProperty = { city: string; address: string; transactions: Transaction[] };
