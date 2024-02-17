export type MarketAsset = {
    name: string;
    iconUrl: string;
    seriesPrice: MarketTrendPoint[];
};

export type WalletAsset = {
    name: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    iconUrl: any;
    amount: number;
    closed: boolean;
};


type DateISO = string;
export type Transaction = {
    date: DateISO;
    amount: number;
    balance: number;
    open: boolean;
};

export type MarketTrendPoint = {
    value: number;
    date: DateISO;
};
