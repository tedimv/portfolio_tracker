import { createSlice } from "@reduxjs/toolkit";

import { toast } from "sonner";

import { MarketAsset, WalletAsset } from "./dtos/base";
import {
    fetchCryptoInvestments,
    fetchGoldInvestments,
    fetchPropertiesInvestments,
    fetchStocksInvestments,
} from "./thunks";
import { MarketCryptoAsset, WalletCryptoAsset } from "./dtos/crypto";
import { MarketProperty, WalletProperty } from "./dtos/property";

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

type StoreAssetGroup<TMarketDto = MarketAsset, TWalletDto = WalletAsset> = {
    marketPrices: TMarketDto[];
    walletBalance: TWalletDto[];
    loading: boolean;
};

const initState: {
    crypto: StoreAssetGroup<MarketCryptoAsset, WalletCryptoAsset>;
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
    reducers: {
        closeCryptoInvestment: function (state, action: { payload: string }) {
            state.crypto.walletBalance.find((asset) => {
                if (asset.name === action.payload) {
                    // asset.closed = true;
                    toast.success(`Asset ${asset.name} closed successfully!`);
                }
            });
        },
    },
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

export const { closeCryptoInvestment } = investmentsSlice.actions;
