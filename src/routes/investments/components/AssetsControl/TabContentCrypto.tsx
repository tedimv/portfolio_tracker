import numeral from "numeral";
import HighchartsReact from "highcharts-react-official";
import Highcharts, { Options } from "highcharts";
import { formatDate } from "date-fns/format";
import { subYears } from "date-fns/subYears";
import { parse } from "date-fns/parse";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FORMAT_AMOUNT, FORMAT_DATE } from "@/constants/formats";
import { useAppSelector } from "@/stores";

const TabContentCrypto = () => {
    const crypto = useAppSelector((state) => state.investments.crypto);

    const startDate = subYears(new Date(), 1);
    const endDate = new Date();
    const formattedStartDate = formatDate(startDate, FORMAT_DATE);
    const formattedEndDate = formatDate(endDate, FORMAT_DATE);

    return (
        <div className="flex flex-row flex-wrap gap-3">
            {crypto.walletBalance.map((asset, i) => {
                const marketPriceData = crypto.marketPrices.find((marketAsset) => marketAsset.name === asset.name) ?? {
                    seriesPrice: [],
                };
                const marketPriceCurrent = marketPriceData?.seriesPrice?.at(-1)?.value ?? 0;

                const balance = asset.transactions.at(-1)?.balance ?? 0;
                const total = balance * marketPriceCurrent;
                const formattedMarketPrice = numeral(marketPriceCurrent).format(FORMAT_AMOUNT);
                const formattedValue = numeral(total).format(FORMAT_AMOUNT);

                const priceMovement: Options = {
                    title: {
                        text: `${formattedStartDate} / ${formattedEndDate}`,
                    },
                    xAxis: {
                        type: "datetime",
                        tickLength: 1,
                        alignTicks: true,
                    },
                    yAxis: [
                        {
                            title: { text: "Price" },
                        },
                        {
                            title: { text: "Wallet Amount" },
                            opposite: true,
                        },
                    ],
                    series: [
                        {
                            pointInterval: 1,
                            pointStart: startDate.valueOf(),
                            pointIntervalUnit: "day",
                            name: asset.name,
                            type: "line",
                            data:
                                marketPriceData?.seriesPrice?.map?.((item) => ({
                                    x: parse(item.date, FORMAT_DATE, new Date()).valueOf(),
                                    y: item.value,
                                })) ?? [],
                            yAxis: 0,
                        },
                    ],
                };

                if (asset.transactions.length) {
                    priceMovement?.series?.push({
                        tooltip: {
                            pointFormatter: function () {
                                let tooltip = "<b>" + this.series.name + "</b><br/>" + "Value: " + this.y + "<br/>";
                                const pointIndex = this.index;
                                const prevBalance: number = this.series.chart.series[1].data[pointIndex - 1]?.y ?? 0;
                                const currentBalance = this.y as number;
                                const transactionLabel = (prevBalance ?? 0) < (this.y as number) ? "Bought" : "Sold";
                                const amountDifference =
                                    transactionLabel === "Bought"
                                        ? currentBalance - prevBalance
                                        : prevBalance - currentBalance;

                                const priceValue =
                                    this.series.chart.series[0].data.find((p) => p.x === this.x)?.y ?? 123;
                                return (tooltip += `<b>${transactionLabel} ${amountDifference}</b> coins at <b>${numeral(
                                    priceValue
                                ).format(FORMAT_AMOUNT)}</b><br/>`);
                            },
                        },
                        type: "line",
                        pointInterval: 1,
                        pointIntervalUnit: "day",
                        name: "Balance",
                        yAxis: 1,
                        data: structuredClone(
                            asset.transactions.map((tr) => ({
                                x: parse(tr.date, FORMAT_DATE, new Date()).valueOf(),
                                y: tr.balance,
                            }))
                        ),
                    });
                }

                return (
                    <Card key={`crypto-row-${i}`} className="flex-grow basis-1 min-w-[40%]">
                        <CardHeader className="relative">
                            <CardTitle className="flex flex-row gap-4">
                                <div className="flex flex-row align-bottom gap-4">
                                    <img src={asset.iconUrl} style={{ height: "40px", width: "40px" }} />
                                    {asset.name}
                                </div>
                            </CardTitle>
                            <div className="flex flex-row gap-3">
                                <CardDescription className="flex-grow">
                                    <p className="leading-7 [&:not(:first-child)]:mt-6">Market Price</p>
                                    <h4 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                                        {formattedMarketPrice}
                                    </h4>
                                </CardDescription>

                                <CardDescription className="flex-grow">
                                    <p className="leading-7 [&:not(:first-child)]:mt-6">Wallet Amount</p>
                                    <h4 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                                        {balance.toFixed(4)} = {formattedValue}
                                    </h4>
                                </CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="mb-3">Price movement</CardDescription>
                            {marketPriceData?.seriesPrice?.length && (
                                <HighchartsReact highcharts={Highcharts} options={priceMovement} />
                            )}
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
};

export default TabContentCrypto;
