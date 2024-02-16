import { useMemo } from "react";
import numeral from "numeral";

import { useAppSelector } from "@/store";
import { FORMAT_AMOUNT } from "@/constants/formats";
import SummaryCards from "./SummaryCards";
import ChartCard from "./ChartCard";

const AssetsDistribution = () => {
    const crypto = useAppSelector((state) => state.investments.crypto);
    const stocks = useAppSelector((state) => state.investments.stocks);
    const gold = useAppSelector((state) => state.investments.gold);
    const properties = useAppSelector((state) => state.investments.property);

    const totalCryptoValue = useMemo(() => {
        let total = 0;

        crypto.walletBalance.forEach(({ amount, name }) => {
            const blockchainTrends = crypto.marketPrices.find((blockchain) => blockchain.name === name);
            const latestPrice = blockchainTrends?.seriesPrice.at(-1);
            total += amount * (latestPrice ?? 0);
        });

        return { clean: total, formatted: numeral(total).format(FORMAT_AMOUNT) };
    }, [crypto.marketPrices, crypto.walletBalance]);

    const totalStocksValue = useMemo(() => {
        let total = 0;

        stocks.walletBalance.forEach(({ amount, name }) => {
            const stocksTrends = stocks.marketPrices.find((stock) => stock.name === name);
            const latestPrice = stocksTrends?.seriesPrice.at(-1);
            total += amount * (latestPrice ?? 0);
        });

        return { clean: total, formatted: numeral(total).format(FORMAT_AMOUNT) };
    }, [stocks.marketPrices, stocks.walletBalance]);

    const totalGoldValue = useMemo(() => {
        let total = 0;

        gold.walletBalance.forEach(({ amount, name }) => {
            const goldTrends = gold.marketPrices.find((goldType) => goldType.name === name);
            const latestPrice = goldTrends?.seriesPrice.at(-1);
            total += amount * (latestPrice ?? 0);
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
            total += 1 * (latestPrice ?? 0);
        });

        return { clean: total, formatted: numeral(total).format(FORMAT_AMOUNT) };
    }, [properties.marketPrices, properties.walletBalance]);

    const totalAssetsValue = useMemo(() => {
        const total =
            totalCryptoValue.clean + totalStocksValue.clean + totalGoldValue.clean + totalPropertiesValue.clean;
        return { clean: total, formatted: numeral(total).format(FORMAT_AMOUNT) };
    }, [totalCryptoValue.clean, totalGoldValue.clean, totalPropertiesValue.clean, totalStocksValue.clean]);

    return (
        <div className="flex flex-col w-full gap-3">
            <SummaryCards
                totalCryptoValue={totalCryptoValue.formatted}
                totalStocksValue={totalStocksValue.formatted}
                totalGoldValue={totalGoldValue.formatted}
                totalPropertiesValue={totalPropertiesValue.formatted}
                totalAssetsValue={totalAssetsValue.formatted}
            />

            <ChartCard
                totalCryptoValue={totalCryptoValue.clean}
                totalStocksValue={totalStocksValue.clean}
                totalGoldValue={totalGoldValue.clean}
                totalPropertiesValue={totalPropertiesValue.clean}
                totalAssetsValue={totalAssetsValue.clean}
            />
        </div>
    );
};

export default AssetsDistribution;
