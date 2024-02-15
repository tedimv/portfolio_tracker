import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

function getRandomInt(min: number, max: number) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

/**
 * Prices at the time of developing
 * BTC - $51,817.70
 * ETH - $2,816.17
 * SOL - $113.28
 * ADA - $0.5971
 * DOGE - $0.08509
 * DOT - $7.71
 *
 * Apple - $182.0526
 * Microsoft - $405.02
 * Alphabet - $143.41
 * CocaCola - $59.37
 * IBM - $185.80
 */

type VariationRange = {
    minPercent: number;
    maxPercent: number;
};

function generateMarketTrend(nEntries: number, tickVariantionRange: VariationRange, init: number): number[] {
    const results: number[] = [];

    let prev = init;
    for (let i = 0; i < nEntries; i++) {
        const extremeEvent = Math.random() <= 0.05;
        const { minPercent, maxPercent } = tickVariantionRange;
        const minFluctuation = !extremeEvent ? minPercent : minPercent * 10;
        const maxFluctuation = !extremeEvent ? maxPercent : maxPercent * 10;
        const intervalVariation = getRandomInt(minFluctuation, maxFluctuation);
        const movement = Math.random() > 0.5 ? 1 + intervalVariation / 100 : 1 - intervalVariation / 100;
        const newResult = prev * movement;
        results.push(newResult);
        prev = newResult;
    }

    return results;
}

function createFakeAmount(min = 1, max = 200, whole = false) {
    const multiplier = getRandomInt(min, max);
    const snipped = (multiplier * Math.random()).toFixed(6);
    return whole ? parseInt(snipped) : Number(snipped);
}

type MarketAsset = {
    name: string;
    iconUrl: string;
    seriesPrice: number[];
};

type WalletAsset = {
    name: string;
    iconUrl: string;
    amount: number;
};

export const fetchCryptoInvestments = createAsyncThunk("investments/crypto", async () => {
    const marketPrices: MarketAsset[] = [
        {
            name: "BTC",
            iconUrl: "@/icons/crypto/btc.png",
            seriesPrice: generateMarketTrend(365, { minPercent: 1, maxPercent: 7 }, 51_817),
        },
        {
            name: "ETH",
            iconUrl: "@/icons/crypto/ethereum.png",
            seriesPrice: generateMarketTrend(365, { minPercent: 1, maxPercent: 4 }, 2_816.17),
        },
        {
            name: "ADA",
            iconUrl: "@/icons/crypto/cardano.png",
            seriesPrice: generateMarketTrend(365, { minPercent: 1, maxPercent: 3 }, 0.5971),
        },
        {
            name: "DOGE",
            iconUrl: "@/icons/crypto/dogecoin.png",
            seriesPrice: generateMarketTrend(365, { minPercent: 4, maxPercent: 10 }, 0.08509),
        },
        {
            name: "DOT",
            iconUrl: "@/icons/crypto/polkadot.png",
            seriesPrice: generateMarketTrend(365, { minPercent: 3, maxPercent: 9 }, 7.71),
        },
        {
            name: "SOL",
            iconUrl: "@/icons/crypto/solana.png",
            seriesPrice: generateMarketTrend(365, { minPercent: 2, maxPercent: 8 }, 113.28),
        },
    ];

    const walletBalance: WalletAsset[] = [
        {
            name: "BTC",
            iconUrl: "@/icons/crypto/btc.png",
            amount: createFakeAmount(1, 4),
        },
        {
            name: "ETH",
            iconUrl: "@/icons/crypto/ethereum.png",
            amount: createFakeAmount(5, 20),
        },
        {
            name: "ADA",
            iconUrl: "@/icons/crypto/cardano.png",
            amount: createFakeAmount(500, 2000),
        },
        {
            name: "DOGE",
            iconUrl: "@/icons/crypto/dogecoin.png",
            amount: createFakeAmount(20_000, 100_000),
        },
        {
            name: "DOT",
            iconUrl: "@/icons/crypto/polkadot.png",
            amount: createFakeAmount(200, 400),
        },
        {
            name: "SOL",
            iconUrl: "@/icons/crypto/solana.png",
            amount: createFakeAmount(30, 99),
        },
    ];

    // Simulate delay
    await new Promise((res) => setTimeout(res, 2000));

    return { marketPrices, walletBalance };
});

export const fetchStocksInvestments = createAsyncThunk("investments/stocks", async () => {
    const marketPrices: MarketAsset[] = [
        {
            name: "Apple",
            iconUrl: "@/icons/companies/apple.png",
            seriesPrice: generateMarketTrend(365, { minPercent: 10, maxPercent: 40 }, 182.0526),
        },
        {
            name: "CocaCola",
            iconUrl: "@/icons/companies/coca_cola.png",
            seriesPrice: generateMarketTrend(365, { minPercent: 1, maxPercent: 3 }, 59.37),
        },
        {
            name: "Google",
            iconUrl: "@/icons/companies/google.png",
            seriesPrice: generateMarketTrend(365, { minPercent: 1, maxPercent: 3 }, 182.0526),
        },
        {
            name: "IBM",
            iconUrl: "@/icons/companies/ibm.png",
            seriesPrice: generateMarketTrend(365, { minPercent: 4, maxPercent: 10 }, 185.8),
        },
        {
            name: "Microsoft",
            iconUrl: "@/icons/companies/microsoft.png",
            seriesPrice: generateMarketTrend(365, { minPercent: 3, maxPercent: 9 }, 405.02),
        },
    ];

    const walletBalance: WalletAsset[] = [
        {
            name: "Apple",
            iconUrl: "@/icons/companies/apple.png",
            amount: createFakeAmount(0, 50, true),
        },
        {
            name: "CocaCola",
            iconUrl: "@/icons/companies/coca_cola.png",
            amount: createFakeAmount(50, 100, true),
        },
        {
            name: "Google",
            iconUrl: "@/icons/companies/google.png",
            amount: createFakeAmount(50, 100, true),
        },
        {
            name: "IBM",
            iconUrl: "@/icons/companies/ibm.png",
            amount: createFakeAmount(300, 500, true),
        },
        {
            name: "Microsoft",
            iconUrl: "@/icons/companies/microsoft.png",
            amount: createFakeAmount(300, 500, true),
        },
    ];

    // Simulate delay
    await new Promise((res) => setTimeout(res, 1500));

    return { marketPrices, walletBalance };
});

type StoreAssetGroup = {
    walletBalance: WalletAsset[];
    marketPrices: MarketAsset[];
    loading: boolean;
};

const initState: {
    crypto: StoreAssetGroup;
    stocks: StoreAssetGroup;
    gold: StoreAssetGroup;
    property: StoreAssetGroup;
    land: StoreAssetGroup;
} = {
    crypto: {
        walletBalance: [],
        marketPrices: [],
        loading: false,
    },
    stocks: {
        walletBalance: [],
        marketPrices: [],
        loading: false,
    },
    gold: {
        walletBalance: [],
        marketPrices: [],
        loading: false,
    },
    property: {
        walletBalance: [],
        marketPrices: [],
        loading: false,
    },
    land: {
        walletBalance: [],
        marketPrices: [],
        loading: false,
    },
};

const mutatePending = (state: StoreAssetGroup) => {
    state.loading = true;
    state.marketPrices = [];
    state.walletBalance = [];
};
const mutateFulfilled = (
    state: StoreAssetGroup,
    payload: { marketPrices: MarketAsset[]; walletBalance: WalletAsset[] }
) => {
    state.walletBalance = payload.walletBalance;
    state.marketPrices = payload.marketPrices;
    state.loading = false;
};
const mutateRejected = (state: StoreAssetGroup) => {
    state.loading = false;
};

export const investmentsSlice = createSlice({
    name: "investments",
    initialState: initState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCryptoInvestments.pending, (state) => mutatePending(state.crypto));
        builder.addCase(fetchCryptoInvestments.fulfilled, (state, { payload }) =>
            mutateFulfilled(state.crypto, payload)
        );
        builder.addCase(fetchCryptoInvestments.rejected, (state) => mutateRejected(state.crypto));
        builder.addCase(fetchStocksInvestments.pending, (state) => mutatePending(state.stocks));
        builder.addCase(fetchStocksInvestments.fulfilled, (state, { payload }) =>
            mutateFulfilled(state.stocks, payload)
        );
        builder.addCase(fetchStocksInvestments.rejected, (state) => mutateRejected(state.stocks));
    },
});
