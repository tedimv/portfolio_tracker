import { useEffect } from "react";

import Layout from "@/components/Layout";
import LayoutHeader from "@/components/Layout/LayoutHeader";
import LayoutBody from "@/components/Layout/LayoutBody";
import { store } from "@/store";
import {
    fetchCryptoInvestments,
    fetchGoldInvestments,
    fetchPropertiesInvestments,
    fetchStocksInvestments,
} from "@/store/investments";
import AssetsDistribution from "./components/AssetsDistribution";

const Investments = () => {
    useEffect(() => {
        store.dispatch(fetchCryptoInvestments());
        store.dispatch(fetchStocksInvestments());
        store.dispatch(fetchGoldInvestments());
        store.dispatch(fetchPropertiesInvestments());
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
            <LayoutHeader title="Investments" />

            <LayoutBody>
                <AssetsDistribution />
                {/* <HighchartsReact highcharts={Highcharts} options={cryptoChardData} /> */}
            </LayoutBody>
        </Layout>
    );
};

export default Investments;
