import numeral from "numeral";
import HighchartsReact from "highcharts-react-official";
import Highcharts, { Options } from "highcharts";
import { formatDate } from "date-fns/format";
import { subYears } from "date-fns/subYears";
import { parse } from "date-fns/parse";
import { IoAddCircleOutline } from "react-icons/io5";
import { LuMinusCircle } from "react-icons/lu";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FORMAT_AMOUNT, FORMAT_DATE } from "@/constants/formats";
import { useAppSelector } from "@/stores";
import Button from "@/components/ui/button";
import { useState } from "react";
import { OptionsCrypto } from "@/stores/investments/thunks";
import ModalBuyAsset from "../ModalBuyAsset";
import { ModalOption } from "@/stores/investments/typesTroublesome";
import ModalSellAsset from "../ModalSellAsset";

const TabContentProperties = () => {
    const properties = useAppSelector((state) => state.investments.property);
    const [showModal, setShowModal] = useState<ModalOption | null>(null);

    const startDate = subYears(new Date(), 1);
    const endDate = new Date();
    const formattedStartDate = formatDate(startDate, FORMAT_DATE);
    const formattedEndDate = formatDate(endDate, FORMAT_DATE);

    return (
        <div className="flex flex-row flex-wrap gap-3">
            {properties.walletBalance.map((asset, i) => {
                const marketPriceData = properties.marketPrices.find(
                    (marketAsset) => marketAsset.city === asset.city && marketAsset.address === asset.address
                ) ?? {
                    seriesPrice: [],
                };
                const marketPriceCurrent = marketPriceData?.seriesPrice?.at(-1)?.value ?? 0;

                const balance = asset.transactions.at(-1)?.balance ? 1 : 0;
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
                            name: `${asset.city} \\ ${asset.address}`,
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

                const id = `${asset.city} \\ ${asset.address}`;

                return (
                    <Card key={`crypto-row-${i}`} className="flex-grow basis-1 min-w-[40%]">
                        <CardHeader className="relative">
                            <CardTitle className="flex flex-row gap-4">
                                <div className="flex flex-row align-bottom gap-4">{id}</div>
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
                                        {balance} = {formattedValue}
                                    </h4>
                                </CardDescription>
                            </div>

                            <div className="absolute top-5 right-8 flex flex-row items-center gap-3">
                                <h4 className="font-mono relative" style={{ fontWeight: 500 }}>
                                    STATUS |
                                </h4>
                                {asset.transactions.at(-1)?.balance ?? 0 > 0 ? (
                                    <span className="flex justify-center items-center px-3 py-1 font-medium rounded-none bg-blue-700 text-white">
                                        Open
                                    </span>
                                ) : (
                                    <span className="flex justify-center items-center px-3 py-1 font-medium rounded-none bg-amber-700 text-white">
                                        Closed
                                    </span>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="relative">
                            <CardDescription className="mb-3">Price movement</CardDescription>
                            <div className="flex flex-row pl-1 mb-4 divide-x-2">
                                <Button
                                    className="rounded-r-none bg-green-600 flex flex-row items-center gap-2 px-5"
                                    onClick={() => setShowModal(`buy-${id as OptionsCrypto}`)}
                                    disabled={(asset.transactions.at(-1)?.balance ?? 0) > 0}
                                >
                                    <IoAddCircleOutline />
                                    <span>Buy</span>
                                </Button>

                                <Button
                                    className="rounded-l-none bg-red-600 flex flex-row items-center gap-2 px-5"
                                    onClick={() => setShowModal(`sell-${id as OptionsCrypto}`)}
                                    disabled={!asset.transactions.at(-1)?.balance}
                                >
                                    <LuMinusCircle />
                                    <span>Sell</span>
                                </Button>
                            </div>
                            {marketPriceData?.seriesPrice?.length && (
                                <HighchartsReact highcharts={Highcharts} options={priceMovement} />
                            )}
                        </CardContent>

                        {showModal === `buy-${id}` && (
                            <ModalBuyAsset
                                assetType="property"
                                assetName={id}
                                validateRange={{
                                    min: 1,
                                    max: 1,
                                    errorMessage: 'Properties are sold 1 at a time'
                                }}
                                findAssetPredicate={(_asset) =>
                                    _asset.city === asset.city && asset.address === asset.address
                                }
                                onClose={() => setShowModal(null)}
                            />
                        )}

                        {showModal === `sell-${id}` && (
                            <ModalSellAsset
                                assetType="property"
                                amountMeta={{ label: "Amount" }}
                                maxSell={asset.transactions.at(-1)?.balance ?? 0}
                                assetName={id.toUpperCase()}
                                findAssetPredicate={(_asset) =>
                                    _asset.city === asset.city && asset.address === asset.address
                                }
                                onClose={() => setShowModal(null)}
                            />
                        )}
                    </Card>
                );
            })}
        </div>
    );
};

export default TabContentProperties;
