import { createAsyncThunk } from "@reduxjs/toolkit";
// import { generateMarketTrend } from "../fakeDataGenerators/generateMarketTrend";
// import { MarketCryptoAsset, WalletCryptoAsset } from "./dtos/crypto";
// import { generateRandomInt } from "../fakeDataGenerators/generateRandomInt";
// import { FAKER } from "@/constants/faker";

// import IconBtc from "../../assets/icons/crypto/btc.png";
// import IconAda from "../../assets/icons/crypto/cardano.png";
// import IconDoge from "../../assets/icons/crypto/dogecoin.png";
// import IconEth from "../../assets/icons/crypto/ethereum.png";
// import IconPolkadot from "../../assets/icons/crypto/polkadot.png";
// import IconSolana from "../../assets/icons/crypto/solana.png";

// import IconApple from "../../assets/icons/companies/apple.png";
// import IconCocaCola from "../../assets/icons/companies/coca_cola.png";
// import IconGoogle from "../../assets/icons/companies/google.png";
// import IconIbm from "../../assets/icons/companies/ibm.png";
// import IconMicrosoft from "../../assets/icons/companies/microsoft.png";
// import { generateTransactions } from "../fakeDataGenerators/generateTransaction";
// import { MarketProperty, WalletProperty } from "./dtos/property";
// import { MarketAsset, WalletAsset } from "./dtos/base";
import { AssetPredicate, KeyofStoreAssets } from "../forms/utilTypes";
import mockCryptoData from "./mock/crypto.json";
import mockStocksData from "./mock/stocks.json";
import mockGoldData from "./mock/gold.json";
import mockPropertiesData from "./mock/properties.json";
// import { MarketProperty, WalletProperty } from "./dtos/property";
// import { generateRandomInt } from "../fakeDataGenerators/generateRandomInt";
// import { generateMarketTrend } from "../fakeDataGenerators/generateMarketTrend";
// import { FAKER } from "@/constants/faker";
// import { generateTransactions } from "../fakeDataGenerators/generateTransaction";

export type OptionsCrypto = "BTC" | "ETH" | "ADA" | "DOGE" | "SOL";

export const fetchCryptoInvestments = createAsyncThunk("investments/crypto", async () => {
    // const marketPrices: MarketCryptoAsset[] = [
    //     {
    //         name: "BTC",
    //         seriesPrice: generateMarketTrend(365, { minPercent: 1, maxPercent: 7 }, 51_817),
    //     },
    //     {
    //         name: "ETH",
    //         seriesPrice: generateMarketTrend(365, { minPercent: 1, maxPercent: 4 }, 2_816.17),
    //     },
    //     {
    //         name: "ADA",
    //         seriesPrice: generateMarketTrend(365, { minPercent: 1, maxPercent: 3 }, 0.5971),
    //     },
    //     {
    //         name: "DOGE",
    //         seriesPrice: generateMarketTrend(365, { minPercent: 4, maxPercent: 10 }, 0.08509),
    //     },
    //     {
    //         name: "DOT",
    //         seriesPrice: generateMarketTrend(365, { minPercent: 3, maxPercent: 9 }, 7.71),
    //     },
    //     {
    //         name: "SOL",
    //         seriesPrice: generateMarketTrend(365, { minPercent: 2, maxPercent: 8 }, 113.28),
    //     },
    // ];

    // const walletBalance: WalletCryptoAsset[] = [
    //     {
    //         name: "BTC",
    //         iconUrl: IconBtc,
    //         transactions: generateTransactions(
    //             10,
    //             () => FAKER.number.float({ min: 0.2, max: 2 }),
    //             (balance) => FAKER.number.float({ min: 0.05, max: Math.min(balance - 0.5, balance) })
    //         ),
    //     },
    //     {
    //         name: "ETH",
    //         iconUrl: IconEth,
    //         transactions: generateTransactions(
    //             20,
    //             () => FAKER.number.float({ min: 0.5, max: 8 }),
    //             (balance) => FAKER.number.float({ min: 0.05, max: balance })
    //         ),
    //     },
    //     {
    //         name: "ADA",
    //         iconUrl: IconAda,
    //         transactions: generateTransactions(
    //             40,
    //             () => FAKER.number.float({ min: 10, max: 1000 }),
    //             (balance) => FAKER.number.float({ min: 1, max: balance })
    //         ),
    //     },
    //     {
    //         name: "DOGE",
    //         iconUrl: IconDoge,
    //         transactions: generateTransactions(
    //             20,
    //             () => FAKER.number.float({ min: 1000, max: 10000 }),
    //             (balance) => FAKER.number.float({ min: 1, max: balance })
    //         ),
    //     },
    //     {
    //         name: "DOT",
    //         iconUrl: IconPolkadot,
    //         transactions: generateTransactions(
    //             20,
    //             () => FAKER.number.float({ min: 1, max: 8 }),
    //             (balance) => FAKER.number.float({ min: 0.05, max: balance })
    //         ),
    //     },
    //     {
    //         name: "SOL",
    //         iconUrl: IconSolana,
    //         transactions: generateTransactions(
    //             0,
    //             () => FAKER.number.float({ min: 10, max: 30 }),
    //             (balance) => FAKER.number.float({ min: 3, max: balance })
    //         ),
    //     },
    // ];

    // Simulate delay
    // await new Promise((res) => setTimeout(res, 2000));
    // return { marketPrices, walletBalance };
    return mockCryptoData;
});

export const fetchStocksInvestments = createAsyncThunk("investments/stocks", async () => {
    // const marketPrices: MarketAsset[] = [
    //     {
    //         name: "Apple",
    //         iconUrl: IconApple,
    //         seriesPrice: generateMarketTrend(365, { minPercent: 10, maxPercent: 40 }, 182.0526),
    //     },
    //     {
    //         name: "CocaCola",
    //         iconUrl: IconCocaCola,
    //         seriesPrice: generateMarketTrend(365, { minPercent: 1, maxPercent: 3 }, 59.37),
    //     },
    //     {
    //         name: "Google",
    //         iconUrl: IconGoogle,
    //         seriesPrice: generateMarketTrend(365, { minPercent: 1, maxPercent: 3 }, 182.0526),
    //     },
    //     {
    //         name: "IBM",
    //         iconUrl: IconIbm,
    //         seriesPrice: generateMarketTrend(365, { minPercent: 4, maxPercent: 10 }, 185.8),
    //     },
    //     {
    //         name: "Microsoft",
    //         iconUrl: IconMicrosoft,
    //         seriesPrice: generateMarketTrend(365, { minPercent: 3, maxPercent: 9 }, 405.02),
    //     },
    // ];

    // const walletBalance: WalletAsset[] = [
    //     {
    //         name: "Apple",
    //         iconUrl: IconApple,
    //         transactions: generateTransactions(
    //             10,
    //             () => FAKER.number.int({ min: 2, max: 4 }),
    //             (balance) => FAKER.number.int({ min: 1, max: balance })
    //         ),
    //         closed: false,
    //     },
    //     {
    //         name: "CocaCola",
    //         iconUrl: IconCocaCola,
    //         transactions: generateTransactions(
    //             25,
    //             () => FAKER.number.int({ min: 10, max: 30 }),
    //             (balance) => FAKER.number.int({ min: 3, max: balance })
    //         ),
    //         closed: false,
    //     },
    //     {
    //         name: "Google",
    //         iconUrl: IconGoogle,
    //         transactions: generateTransactions(
    //             23,
    //             () => FAKER.number.int({ min: 13, max: 20 }),
    //             (balance) => FAKER.number.int({ min: 3, max: balance })
    //         ),
    //         closed: false,
    //     },
    //     {
    //         name: "IBM",
    //         iconUrl: IconIbm,
    //         transactions: generateTransactions(
    //             40,
    //             () => FAKER.number.int({ min: 10, max: 30 }),
    //             (balance) => FAKER.number.int({ min: 3, max: balance })
    //         ),
    //         closed: false,
    //     },
    //     {
    //         name: "Microsoft",
    //         iconUrl: IconMicrosoft,
    //         transactions: generateTransactions(
    //             40,
    //             () => FAKER.number.float({ min: 10, max: 30 }),
    //             (balance) => FAKER.number.float({ min: 3, max: balance })
    //         ),
    //         closed: false,
    //     },
    // ];
    // console.log({ marketPrices, walletBalance });

    // // Simulate delay
    // await new Promise((res) => setTimeout(res, 1500));

    // return { marketPrices, walletBalance };
    return mockStocksData;
});

export const fetchGoldInvestments = createAsyncThunk("investments/gold", async () => {
    // const marketPrices: MarketAsset[] = [
    //     {
    //         name: "Gold",
    //         iconUrl: "",
    //         seriesPrice: generateMarketTrend(365, { minPercent: 1, maxPercent: 2 }, 2003.92, true),
    //     },
    // ];

    // const walletBalance: WalletAsset[] = [
    //     {
    //         name: "Gold",
    //         iconUrl: "",
    //         transactions: generateTransactions(
    //             11,
    //             () => FAKER.number.float({ min: 10, max: 30 }),
    //             (balance) => FAKER.number.float({ min: 3, max: balance })
    //         ),
    //         closed: false,
    //     },
    // ];

    // await new Promise((res) => setTimeout(res, 2100));

    // return { marketPrices, walletBalance };
    return mockGoldData;
});

export const fetchPropertiesInvestments = createAsyncThunk("investments/properties", async () => {
    // const nProperties = generateRandomInt(2, 5);
    // const marketPrices: Array<MarketProperty> = new Array(nProperties).fill("").map(() => ({
    //     address: FAKER.location.streetAddress(),
    //     city: FAKER.location.city(),
    //     iconUrl: "",
    //     seriesPrice: generateMarketTrend(
    //         365,
    //         { minPercent: 1, maxPercent: 2 },
    //         generateRandomInt(100_000, 200_000),
    //         true
    //     ),
    // }));

    // const walletBalance: WalletProperty[] = marketPrices.map((property) => ({
    //     amount: 1,
    //     address: property.address,
    //     city: property.city,
    //     closed: false,
    //     transactions: generateTransactions(
    //         1,
    //         () => 1,
    //         (balance) => FAKER.number.float({ min: 3, max: balance })
    //     ),
    // }));

    // await new Promise((res) => setTimeout(res, 1200));

    // return { marketPrices, walletBalance };
    return mockPropertiesData;
});

type BuyAssetArgs<TAssetType extends KeyofStoreAssets> = {
    payload: {
        assetType: TAssetType;
        amount: number;
        predicate: AssetPredicate<TAssetType>;
    };
};
export const thunkBuyAsset = createAsyncThunk(
    "investments/buyAsset",
    async (action: BuyAssetArgs<KeyofStoreAssets>) => {
        /**
         * API call goes here
         * Return the payload for the builder to handle
         */
        return action.payload;
    }
);

type SellAssetArgs<TAssetType extends KeyofStoreAssets> = {
    payload: {
        assetType: TAssetType;
        amount: number;
        predicate: AssetPredicate<TAssetType>;
    };
};
export const thunkSellAsset = createAsyncThunk(
    "investments/sellAsset",
    async (action: SellAssetArgs<KeyofStoreAssets>) => {
        /**
         * API call goes here
         * Return the payload for the builder to handle
         */
        return action.payload;
    }
);
