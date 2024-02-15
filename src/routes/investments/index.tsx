import Highcharts, { Options } from "highcharts";
import { subYears } from "date-fns/subYears";

import Layout from "@/components/Layout";
import LayoutHeader from "@/components/Layout/LayoutHeader";
import LayoutBody from "@/components/Layout/LayoutBody";
import { store, useAppSelector } from "@/store";
import { useEffect, useMemo } from "react";
import { fetchCryptoInvestments, fetchStocksInvestments } from "@/store/investments";
import SummaryCards from "./SummaryCards";

const Investments = () => {
    useEffect(() => {
        store.dispatch(fetchCryptoInvestments());
        store.dispatch(fetchStocksInvestments());
    }, []);

    // const cryptoChardData: Options | null = useMemo(() => {
    //     const chartOptions: Options = {
    //         title: {
    //             text: "",
    //         },
    //         loading: crypto.loading || !crypto.marketPrices.length,
    //         xAxis: {
    //             type: "datetime",
    //             tickLength: 1,
    //         },
    //         series: crypto.marketPrices.map((blockchain) => {
    //             const data = blockchain.seriesPrice.map((dataPoint) => ({
    //                 y: Number(dataPoint.toFixed(6)),
    //             }));

    //             return {
    //                 data,
    //                 type: "line",
    //                 name: `${blockchain.name}/USD`,
    //                 pointStart: subYears(new Date(), 1).valueOf(),
    //                 pointIntervalUnit: "day",
    //                 pointInterval: 1,
    //             };
    //         }),
    //     };

    //     return chartOptions;
    // }, [crypto]);
    // console.log(cryptoChardData);

    return (
        <Layout>
            <LayoutHeader title="Investments">
                <div>Investments</div>
            </LayoutHeader>

            <LayoutBody>
                <SummaryCards />
                {/* <HighchartsReact highcharts={Highcharts} options={cryptoChardData} /> */}
            </LayoutBody>
        </Layout>
    );
};

export default Investments;
