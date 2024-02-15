import { useMemo } from "react";
import numeral from "numeral";
import LoadingBar from "react-top-loading-bar";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppSelector } from "@/store";

const SummaryCards = () => {
    const crypto = useAppSelector((state) => state.investments.crypto);
    const stocks = useAppSelector((state) => state.investments.stocks);
    const format = "$0,000.00";

    const totalCryptoValue = useMemo(() => {
        let total = 0;

        crypto.walletBalance.forEach(({ amount, name }) => {
            const blockchainTrends = crypto.marketPrices.find((blockchain) => blockchain.name === name);
            const latestPrice = blockchainTrends?.seriesPrice.at(-1);
            total += amount * (latestPrice ?? 0);
        });

        return { clean: total, formatted: numeral(total).format(format) };
    }, [crypto.marketPrices, crypto.walletBalance]);

    const totalStocksValue = useMemo(() => {
        let total = 0;

        stocks.walletBalance.forEach(({ amount, name }) => {
            const blockchainTrends = stocks.marketPrices.find((blockchain) => blockchain.name === name);
            const latestPrice = blockchainTrends?.seriesPrice.at(-1);
            total += amount * (latestPrice ?? 0);
        });

        return { clean: total, formatted: numeral(total).format(format) };
    }, [stocks.marketPrices, stocks.walletBalance]);

    console.log({ totalStocksValue, stocks });
    const totalAssetsValue = useMemo(() => {
        const total = totalCryptoValue.clean + totalStocksValue.clean;
        return { clean: total, formatted: numeral(total).format(format) };
    }, [totalCryptoValue.clean, totalStocksValue.clean]);

    //   <button onClick={() => ref.current.continuousStart()}>
    //   Start Continuous Loading Bar
    // </button>
    // <button onClick={() => ref.current.staticStart()}>
    //   Start Static Loading Bar
    // </button>
    // <button onClick={() => }>Complete</button>

    return (
        <div className="flex flex-row gap-3 justify-around">
            <Card className="flex-grow basis-1">
                <CardHeader>
                    <CardTitle>{totalCryptoValue.formatted}</CardTitle>
                    <CardDescription>Crypto</CardDescription>
                </CardHeader>
            </Card>
            <Card className="flex-grow basis-1">
                <CardHeader>
                    <CardTitle>{totalStocksValue.formatted}</CardTitle>
                    <CardDescription>Stocks</CardDescription>
                </CardHeader>
            </Card>
            <Card className="flex-grow basis-1">
                <CardHeader>
                    <CardTitle>{totalCryptoValue.formatted}</CardTitle>
                    <CardDescription>Gold</CardDescription>
                </CardHeader>
            </Card>
            <Card className="flex-grow basis-1">
                <CardHeader className="bg-accent">
                    <CardTitle>{totalAssetsValue.formatted}</CardTitle>
                    <CardDescription>Total assets value</CardDescription>
                </CardHeader>
            </Card>
        </div>
    );
};

export default SummaryCards;
