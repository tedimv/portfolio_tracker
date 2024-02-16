import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FC } from "react";

const SummaryCards: FC<{
    totalCryptoValue: string;
    totalStocksValue: string;
    totalGoldValue: string;
    totalPropertiesValue: string;
    totalAssetsValue: string;
}> = ({ totalAssetsValue, totalCryptoValue, totalGoldValue, totalPropertiesValue, totalStocksValue }) => {
    return (
        <div className="flex flex-row w-full gap-3 justify-around">
            <Card className="flex-grow basis-1">
                <CardHeader>
                    <CardTitle>{totalCryptoValue}</CardTitle>
                    <CardDescription>Crypto</CardDescription>
                </CardHeader>
            </Card>
            <Card className="flex-grow basis-1">
                <CardHeader>
                    <CardTitle>{totalStocksValue}</CardTitle>
                    <CardDescription>Stocks</CardDescription>
                </CardHeader>
            </Card>
            <Card className="flex-grow basis-1">
                <CardHeader>
                    <CardTitle>{totalGoldValue}</CardTitle>
                    <CardDescription>Gold</CardDescription>
                </CardHeader>
            </Card>
            <Card className="flex-grow basis-1">
                <CardHeader>
                    <CardTitle>{totalPropertiesValue}</CardTitle>
                    <CardDescription>Properties</CardDescription>
                </CardHeader>
            </Card>

            <Card className="flex-grow basis-1">
                <CardHeader className="bg-accent">
                    <CardTitle>{totalAssetsValue}</CardTitle>
                    <CardDescription>Total assets value</CardDescription>
                </CardHeader>
            </Card>
        </div>
    );
};

export default SummaryCards;
