import { FC, useMemo } from "react";
import { Options } from "highcharts";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { Card, CardContent } from "@/components/ui/card";

const ChartCard: FC<{
    totalCryptoValue: number;
    totalStocksValue: number;
    totalGoldValue: number;
    totalPropertiesValue: number;
    totalAssetsValue: number;
}> = ({ totalAssetsValue, totalCryptoValue, totalGoldValue, totalPropertiesValue, totalStocksValue }) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const options: Options = useMemo(() => {
        const opt = {
            chart: {
                marginBottom: 100,
                type: "pie",
            },
            plotOptions: {
                pie: {
                    showInLegend: true,
                    innerSize: "60%",
                    dataLabels: {
                        enabled: false,
                        distance: -14,
                        color: "white",
                        style: {
                            fontweight: "bold",
                            fontsize: 50,
                        },
                    },
                },
            },
            title: {
                text: "Assets distribution",
            },
            legend: {
                labelFormatter: function (this: { name: string; y: number }) {
                    const percent = Math.round((this.y / (totalAssetsValue || 1)) * 100);
                    return this.name + ` <b>${percent}%<b>`;
                },
            },
            tooltip: {
                pointFormat: "<b>{point.y} USD</b>",
            },
            series: [
                {
                    type: "pie",
                    data: [
                        {
                            name: "Crypto",
                            y: Number(totalCryptoValue.toFixed(2)),
                        },
                        {
                            name: "Stock",
                            y: Number(totalStocksValue.toFixed(2)),
                        },
                        {
                            name: "Gold",
                            y: Number(totalGoldValue.toFixed(2)),
                        },
                        {
                            name: "Properties",
                            y: Number(totalPropertiesValue.toFixed(2)),
                        },
                    ],
                },
            ],
        };

        return opt;
    }, [totalAssetsValue, totalCryptoValue, totalGoldValue, totalPropertiesValue, totalStocksValue]);

    return (
        <div className="flex flex-row justify-between gap-3">
            <Card className="flex flex-col pt-6 flex-grow min-h-[20rem]">
                <CardContent>
                    <HighchartsReact highcharts={Highcharts} options={options} />
                </CardContent>
            </Card>
        </div>
    );
};

export default ChartCard;
