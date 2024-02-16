// import numeral from "numeral";
// import { Options } from "highcharts";
// import HighchartsReact from "highcharts-react-official";
// import Highcharts from "highcharts";
// import { formatDate } from "date-fns/format";
// import { subYears } from "date-fns/subYears";

// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { FORMAT_AMOUNT, FORMAT_DATE } from "@/constants/formats";
// import { useAppSelector } from "@/stores";

const TabContentStocks = () => {
    return "asd";
    // const crypto = useAppSelector((state) => state.investments.crypto);

    // const startDate = subYears(new Date(), 1);
    // const endDate = new Date();
    // const formattedStartDate = formatDate(startDate, FORMAT_DATE);
    // const formattedEndDate = formatDate(endDate, FORMAT_DATE);

    // return (
    //     <div className="flex flex-row flex-wrap gap-3">
    //         {crypto.walletBalance.map((asset, i) => {
    //             const marketPriceData = crypto.marketPrices.find((marketAsset) => marketAsset.name === asset.name) ?? {
    //                 seriesPrice: [],
    //             };
    //             const marketPriceCurrent = marketPriceData?.seriesPrice?.at(-1) ?? 0;

    //             const total = asset.amount * marketPriceCurrent;
    //             const formattedMarketPrice = numeral(marketPriceCurrent).format(FORMAT_AMOUNT);
    //             const formattedValue = numeral(total).format(FORMAT_AMOUNT);

    //             const priceMovement: Options = {
    //                 title: {
    //                     text: `${formattedStartDate} / ${formattedEndDate}`,
    //                 },
    //                 xAxis: {
    //                     type: "datetime",
    //                     tickLength: 1,
    //                 },
    //                 series: [
    //                     {
    //                         pointInterval: 1,
    //                         pointStart: startDate.valueOf(),
    //                         pointIntervalUnit: "day",
    //                         name: asset.name,
    //                         type: "line",
    //                         data: structuredClone(marketPriceData?.seriesPrice) ?? [],
    //                     },
    //                 ],
    //             };

    //             return (
    //                 <Card key={`crypto-row-${i}`} className="flex-grow basis-1 min-w-[30%]">
    //                     <CardHeader>
    //                         <CardTitle className="flex flex-row gap-4">
    //                             <div className="flex flex-row align-bottom gap-4">
    //                                 <img src={asset.iconUrl} style={{ height: "40px", width: "40px" }} />
    //                                 {asset.name}
    //                             </div>
    //                         </CardTitle>
    //                         <div className="flex flex-row gap-3">
    //                             <CardDescription className="flex-grow">
    //                                 <p className="leading-7 [&:not(:first-child)]:mt-6">Market Price</p>
    //                                 <h4 className="scroll-m-20 text-2xl font-semibold tracking-tight">
    //                                     {formattedMarketPrice}
    //                                 </h4>
    //                             </CardDescription>

    //                             <CardDescription className="flex-grow">
    //                                 <p className="leading-7 [&:not(:first-child)]:mt-6">Wallet Amount</p>
    //                                 <h4 className="scroll-m-20 text-2xl font-semibold tracking-tight">
    //                                     {/* {asset.amount} = {formattedValue} */}
    //                                 </h4>
    //                             </CardDescription>
    //                         </div>
    //                     </CardHeader>
    //                     <CardContent>
    //                         <CardDescription className="mb-3">Price movement</CardDescription>
    //                         {marketPriceData?.seriesPrice?.length && (
    //                             <HighchartsReact highcharts={Highcharts} options={priceMovement} />
    //                         )}
    //                     </CardContent>
    //                 </Card>
    //             );
    //         })}

    //     </div>
    // );
};

export default TabContentStocks;
