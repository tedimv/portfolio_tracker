import { createSlice } from "@reduxjs/toolkit";

import { toast } from "sonner";

import { MarketAsset, WalletAsset } from "./dtos/base";
import {
    fetchCryptoInvestments,
    fetchGoldInvestments,
    fetchPropertiesInvestments,
    fetchStocksInvestments,
    thunkBuyAsset,
    thunkSellAsset,
} from "./thunks";
import { MarketCryptoAsset, WalletCryptoAsset } from "./dtos/crypto";
import { MarketProperty, WalletProperty } from "./dtos/property";
import { AssetPredicate, KeyofStoreAssets } from "../forms/utilTypes";
import { formatDate } from "date-fns/format";
import { FORMAT_DATE } from "@/constants/formats";

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

type ActionBuyAsset<TAssetType extends KeyofStoreAssets> = {
    payload: {
        assetType: TAssetType;
        assetPredicate: AssetPredicate<TAssetType>;
    };
};

export type StoreAssetGroup<TMarketDto = MarketAsset, TWalletDto = WalletAsset> = {
    marketPrices: TMarketDto[];
    walletBalance: TWalletDto[];
    loading: boolean;
};

export const initState: {
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
                    toast.success(`Asset ${asset.name} closed successfully!`);
                }
            });
        },
        buyAsset: function <TAssetType extends KeyofStoreAssets>(
            state: typeof initState,
            action: ActionBuyAsset<TAssetType>
        ) {
            const { assetPredicate, assetType } = action.payload;
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const assetIndex = state[assetType].walletBalance.findIndex(assetPredicate);
            console.log({ assetIndex });
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
        builder.addCase(fetchStocksInvestments.fulfilled, (state, { payload }) => {
            mutateFulfilled(state.stocks, payload);
        });

        builder.addCase(fetchGoldInvestments.pending, (state) => mutatePending(state.gold));
        builder.addCase(fetchGoldInvestments.rejected, (state) => mutateRejected(state.gold));
        builder.addCase(fetchGoldInvestments.fulfilled, (state, { payload }) => mutateFulfilled(state.gold, payload));

        builder.addCase(fetchPropertiesInvestments.pending, (state) => mutatePending(state.property));
        builder.addCase(fetchPropertiesInvestments.rejected, (state) => mutateRejected(state.property));
        builder.addCase(fetchPropertiesInvestments.fulfilled, (state, { payload }) => {
            state.property.marketPrices = payload.marketPrices;
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            state.property.walletBalance = payload.walletBalance;
            state.property.loading = false;
        });

        builder.addCase(thunkBuyAsset.fulfilled, (state, action) => {
            const { amount, assetType, predicate } = action.payload;
            const found = state[assetType].walletBalance.find(predicate);

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const newBalance = found.transactions[found.transactions.length - 1]?.balance + amount;

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            found.transactions.push({
                amount,
                balance: newBalance,
                date: formatDate(new Date(), FORMAT_DATE),
                open: true,
            });
        });

        builder.addCase(thunkSellAsset.fulfilled, (state, action) => {
            const { amount, assetType, predicate } = action.payload;
            const found = state[assetType].walletBalance.find(predicate);

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const newBalance = found.transactions[found.transactions.length - 1]?.balance - amount;

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            found.transactions.push({
                amount,
                balance: newBalance,
                date: formatDate(new Date(), FORMAT_DATE),
                open: true,
            });
        });
    },
});

export const { closeCryptoInvestment, buyAsset } = investmentsSlice.actions;
