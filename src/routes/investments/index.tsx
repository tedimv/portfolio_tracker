import { useMemo, createContext } from "react";
import numeral from "numeral";

import Layout from "@/components/Layout";
import LayoutHeader from "@/components/Layout/LayoutHeader";
import LayoutBody from "@/components/Layout/LayoutBody";
import { useAppSelector } from "@/stores";
import { FORMAT_AMOUNT } from "@/constants/formats";
import AssetsDistribution from "./components/AssetsDistribution";
import AssetsControl from "./components/AssetsControl";

type ComputedAssetValue = { clean: number; formatted: string };
export const InvestmentsContext = createContext<{
    totalCryptoValue: ComputedAssetValue;
    totalStocksValue: ComputedAssetValue;
    totalGoldValue: ComputedAssetValue;
    totalPropertiesValue: ComputedAssetValue;
    totalAssetsValue: ComputedAssetValue;
}>({
    totalCryptoValue: { clean: 0, formatted: "$0" },
    totalStocksValue: { clean: 0, formatted: "$0" },
    totalGoldValue: { clean: 0, formatted: "$0" },
    totalPropertiesValue: { clean: 0, formatted: "$0" },
    totalAssetsValue: { clean: 0, formatted: "$0" },
});

const Investments = () => {
    const crypto = useAppSelector((state) => state.investments.crypto);
    const stocks = useAppSelector((state) => state.investments.stocks);
    const gold = useAppSelector((state) => state.investments.rareMetals);
    const properties = useAppSelector((state) => state.investments.property);

    const totalCryptoValue = useMemo(() => {
        let total = 0;

        crypto.walletBalance.forEach(({ transactions, name }) => {
            const blockchainTrends = crypto.marketPrices.find((blockchain) => blockchain.name === name);
            const latestPrice = blockchainTrends?.seriesPrice.at(-1);
            total += (transactions.at(-1)?.balance ?? 0) * (latestPrice?.value ?? 0);
        });

        return { clean: total, formatted: numeral(total).format(FORMAT_AMOUNT) };
    }, [crypto.marketPrices, crypto.walletBalance]);

    const totalStocksValue = useMemo(() => {
        let total = 0;

        stocks.walletBalance.forEach(({ transactions, name }) => {
            const stocksTrends = stocks.marketPrices.find((stock) => stock.name === name);
            const latestPrice = stocksTrends?.seriesPrice.at(-1);
            total += (transactions.at(-1)?.balance ?? 0) * (latestPrice?.value ?? 0);
        });

        return { clean: total, formatted: numeral(total).format(FORMAT_AMOUNT) };
    }, [stocks.marketPrices, stocks.walletBalance]);

    const totalGoldValue = useMemo(() => {
        let total = 0;

        gold.walletBalance.forEach(({ transactions, name }) => {
            const goldTrends = gold.marketPrices.find((goldType) => goldType.name === name);
            const latestPrice = goldTrends?.seriesPrice.at(-1);
            total += (transactions.at(-1)?.balance ?? 0) * (latestPrice?.value ?? 0);
        });

        return { clean: total, formatted: numeral(total).format(FORMAT_AMOUNT) };
    }, [gold.marketPrices, gold.walletBalance]);

    const totalPropertiesValue = useMemo(() => {
        let total = 0;

        properties.walletBalance.forEach(({ address, city }) => {
            const propertiesTrends = properties.marketPrices.find(
                (property) => property.city === city && property.address === address
            );
            const latestPrice = propertiesTrends?.seriesPrice.at(-1);
            total += 1 * (latestPrice?.value ?? 0);
        });

        return { clean: total, formatted: numeral(total).format(FORMAT_AMOUNT) };
    }, [properties.marketPrices, properties.walletBalance]);

    const totalAssetsValue = useMemo(() => {
        const total =
            totalCryptoValue.clean + totalStocksValue.clean + totalGoldValue.clean + totalPropertiesValue.clean;
        return { clean: total, formatted: numeral(total).format(FORMAT_AMOUNT) };
    }, [totalCryptoValue.clean, totalGoldValue.clean, totalPropertiesValue.clean, totalStocksValue.clean]);

    return (
        <InvestmentsContext.Provider
            value={{
                totalCryptoValue,
                totalStocksValue,
                totalGoldValue,
                totalPropertiesValue,
                totalAssetsValue,
            }}
        >
            <Layout>
                <LayoutHeader title="Investments" />

                <LayoutBody>
                    <AssetsDistribution />
                    <AssetsControl />
                </LayoutBody>
            </Layout>
        </InvestmentsContext.Provider>
    );
};

export default Investments;
