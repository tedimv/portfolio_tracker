import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

function getRandomInt(min: number, max: number) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

type VariationRange = {
    minPercent: number;
    maxPercent: number;
};

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

// function generateTransactionHistory(nEntries: number, init: number) {
//     const results: number[] = [];

//     let prev = init;
//     for (let i = 0; i < nEntries; i++) {
//         // prev = 1;
//     }

//     return results;
// }

type MarketAsset = {
    name: string;
    iconUrl: string;
    seriesPrice: number[];
};

type WalletAsset = {
    name: string;
    iconUrl: string;
    seriesTransactions: number[];
};

export const fetchCryptoInvestments = createAsyncThunk("investments/crypto", async () => {
    const marketPrices: MarketAsset[] = [
        {
            name: "BTC",
            iconUrl: "@/icons/crypto/btc.png",
            seriesPrice: generateMarketTrend(365, { minPercent: 1, maxPercent: 5 }, 51_817),
        },
    ];

    const walletBalance: WalletAsset[] = [
        {
            name: "BTC",
            iconUrl: "@/icons/crypto/btc.png",
            seriesTransactions: generateMarketTrend(365, { minPercent: 1, maxPercent: 5 }, 51_817),
        },
    ];

    // Simulate delay
    await new Promise((res) => setTimeout(res, 2000));

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
    fiat: StoreAssetGroup;
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
    fiat: {
        walletBalance: [],
        marketPrices: [],
        loading: false,
    },
};

export const investmentsSlice = createSlice({
    name: "investments",
    initialState: initState,
    reducers: {
        shit: () => {},
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCryptoInvestments.pending, (state) => {
            state.crypto.loading = true;
            state.crypto.walletBalance = [];
            state.crypto.marketPrices = [];
        });
        builder.addCase(fetchCryptoInvestments.fulfilled, (state, { payload }) => {
            state.crypto.walletBalance = payload.walletBalance;
            state.crypto.marketPrices = payload.marketPrices;
            state.crypto.loading = false;
        });
        builder.addCase(fetchCryptoInvestments.rejected, (state) => {
            state.crypto.loading = false;
        });
    },
});
