import { FC, useContext } from "react";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InvestmentsContext } from "../..";

const SummaryCards: FC = () => {
    const { totalAssetsValue, totalCryptoValue, totalGoldValue, totalPropertiesValue, totalStocksValue } = useContext(
        InvestmentsContext
    );

    return (
        <div className="flex flex-row w-full gap-3 justify-around overflow-auto">
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
                    <CardTitle>{totalGoldValue.formatted}</CardTitle>
                    <CardDescription>Gold</CardDescription>
                </CardHeader>
            </Card>
            <Card className="flex-grow basis-1">
                <CardHeader>
                    <CardTitle>{totalPropertiesValue.formatted}</CardTitle>
                    <CardDescription>Properties</CardDescription>
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
