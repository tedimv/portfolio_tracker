import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Faker, allLocales } from "@faker-js/faker";

import { generateMarketTrend } from "./fakeDataGenerators/generateMarketTrend";
import { generateFakeAmount } from "./fakeDataGenerators/generateFakeAmount";
import { generateRandomInt } from "./fakeDataGenerators/generateRandomInt";

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
 *
 * Gold - $2,003.92 / oz
 */

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

    const walletBalance: TWalletDto[] = [
        {
            name: "BTC",
            iconUrl: "@/icons/crypto/btc.png",
            amount: generateFakeAmount(1, 4),
        },
        {
            name: "ETH",
            iconUrl: "@/icons/crypto/ethereum.png",
            amount: generateFakeAmount(5, 20),
        },
        {
            name: "ADA",
            iconUrl: "@/icons/crypto/cardano.png",
            amount: generateFakeAmount(500, 2000),
        },
        {
            name: "DOGE",
            iconUrl: "@/icons/crypto/dogecoin.png",
            amount: generateFakeAmount(20_000, 100_000),
        },
        {
            name: "DOT",
            iconUrl: "@/icons/crypto/polkadot.png",
            amount: generateFakeAmount(200, 400),
        },
        {
            name: "SOL",
            iconUrl: "@/icons/crypto/solana.png",
            amount: generateFakeAmount(30, 99),
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

    const walletBalance: TWalletDto[] = [
        {
            name: "Apple",
            iconUrl: "@/icons/companies/apple.png",
            amount: generateFakeAmount(0, 50, true),
        },
        {
            name: "CocaCola",
            iconUrl: "@/icons/companies/coca_cola.png",
            amount: generateFakeAmount(50, 100, true),
        },
        {
            name: "Google",
            iconUrl: "@/icons/companies/google.png",
            amount: generateFakeAmount(50, 100, true),
        },
        {
            name: "IBM",
            iconUrl: "@/icons/companies/ibm.png",
            amount: generateFakeAmount(300, 500, true),
        },
        {
            name: "Microsoft",
            iconUrl: "@/icons/companies/microsoft.png",
            amount: generateFakeAmount(300, 500, true),
        },
    ];

    // Simulate delay
    await new Promise((res) => setTimeout(res, 1500));

    return { marketPrices, walletBalance };
});

export const fetchGoldInvestments = createAsyncThunk("investments/gold", async () => {
    const marketPrices: MarketAsset[] = [
        {
            name: "Gold",
            iconUrl: "",
            seriesPrice: generateMarketTrend(365, { minPercent: 1, maxPercent: 2 }, 2003.92, true),
        },
    ];

    const walletBalance: WalletAsset[] = [
        {
            name: "Gold",
            iconUrl: "",
            amount: generateFakeAmount(0, 50),
        },
    ];

    await new Promise((res) => setTimeout(res, 2100));

    return { marketPrices, walletBalance };
});

export const fetchPropertiesInvestments = createAsyncThunk("investments/properties", async () => {
    const nProperties = generateRandomInt(2, 5);
    const f = new Faker({ locale: [allLocales.en_US, allLocales.en] });
    const marketPrices: Array<MarketProperty> = new Array(nProperties).fill("").map(() => ({
        address: f.location.streetAddress(),
        city: f.location.city(),
        iconUrl: "",
        seriesPrice: generateMarketTrend(
            365,
            { minPercent: 1, maxPercent: 2 },
            generateRandomInt(100_000, 200_000),
            true
        ),
    }));

    const walletBalance: WalletProperty[] = marketPrices.map((property) => ({
        amount: 1,
        address: property.address,
        city: property.city,
    }));

    await new Promise((res) => setTimeout(res, 1200));

    return { marketPrices, walletBalance };
});

type MarketProperty = { city: string; address: string; seriesPrice: number[] };
type WalletProperty = { city: string; address: string };

type StoreAssetGroup<TMarketDto = MarketAsset, TWalletDto = WalletAsset> = {
    marketPrices: TMarketDto[];
    walletBalance: TWalletDto[];
    loading: boolean;
};

const initState: {
    crypto: StoreAssetGroup;
    stocks: StoreAssetGroup;
    gold: StoreAssetGroup;
    property: StoreAssetGroup<MarketProperty, WalletProperty>;
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

function mutatePending<TMarketDto, TWalletDto>(state: StoreAssetGroup<TMarketDto, TWalletDto>) {
    state.loading = true;
    state.marketPrices = [];
    state.walletBalance = [];
}
function mutateFulfilled<TMarketDto, TWalletDto>(
    state: StoreAssetGroup<TMarketDto, TWalletDto>,
    payload: { marketPrices: TMarketDto[]; walletBalance: TWalletDto[] }
) {
    state.walletBalance = payload.walletBalance;
    state.marketPrices = payload.marketPrices;
    state.loading = false;
}
function mutateRejected<TMarketDto, TWalletDto>(state: StoreAssetGroup<TMarketDto, TWalletDto>) {
    state.loading = false;
}

export const investmentsSlice = createSlice({
    name: "investments",
    initialState: initState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCryptoInvestments.pending, (state) => mutatePending(state.crypto));
        builder.addCase(fetchCryptoInvestments.rejected, (state) => mutateRejected(state.crypto));
        builder.addCase(fetchCryptoInvestments.fulfilled, (state, { payload }) =>
            mutateFulfilled(state.crypto, payload)
        );

        builder.addCase(fetchStocksInvestments.pending, (state) => mutatePending(state.stocks));
        builder.addCase(fetchStocksInvestments.rejected, (state) => mutateRejected(state.stocks));
        builder.addCase(fetchStocksInvestments.fulfilled, (state, { payload }) =>
            mutateFulfilled(state.stocks, payload)
        );

        builder.addCase(fetchGoldInvestments.pending, (state) => mutatePending(state.gold));
        builder.addCase(fetchGoldInvestments.rejected, (state) => mutateRejected(state.gold));
        builder.addCase(fetchGoldInvestments.fulfilled, (state, { payload }) => mutateFulfilled(state.gold, payload));

        builder.addCase(fetchPropertiesInvestments.pending, (state) => mutatePending(state.property));
        builder.addCase(fetchPropertiesInvestments.rejected, (state) => mutateRejected(state.property));
        builder.addCase(fetchPropertiesInvestments.fulfilled, (state, { payload }) =>
            mutateFulfilled(state.property, payload)
        );
    },
});
