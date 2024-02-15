import HighchartsReact from "highcharts-react-official";
import Highcharts, { Options, GradientColorObject } from "highcharts";
import { subYears } from "date-fns/subYears";

import Layout from "@/components/Layout";
import LayoutHeader from "@/components/Layout/LayoutHeader";
import LayoutBody from "@/components/Layout/LayoutBody";
import { store, useAppSelector } from "@/store";
import { useEffect, useMemo } from "react";
import { fetchCryptoInvestments } from "@/store/investments";

// const data = generateBelievableTrend(365, { minPercent: 1, maxPercent: 5 }, 350);

// console.log(generateBelievableTrend);

const options: Options = {
    title: {
        text: "Portfolio overview",
    },
    series: [
        {
            type: "line",
            dashStyle: "Solid",
            data: [],
            pointStart: subYears(new Date(), 1).getFullYear(),
            pointIntervalUnit: "month",
            pointInterval: 1,
        },
    ],
};

const Investments = () => {
    const crypto = useAppSelector((state) => state.investments.crypto);

    useEffect(() => {
        store.dispatch(fetchCryptoInvestments());
    }, []);
    console.log(crypto);

    const cryptoChardData: Options = useMemo(() => {
        if (crypto.loading || !crypto.marketPrices.length) return [];
        const chartOptions: Options = {
            title: {
                text: "Portfolio overview",
            },
            xAxis: {
                type: "datetime",
                tickLength: 1,
            },
            series: [
                {
                    data: [],
                    dataLabels: {
                        backgroundColor: "blue",
                    },
                    type: "line",
                    color: "gold",
                    name: "BTC",
                    pointStart: subYears(new Date(), 1).valueOf(),
                    pointIntervalUnit: "day",
                    pointInterval: 1,
                    pointDescriptionFormat: (val: number, ...restShit) => {
                        console.log({ val, restShit });
                        return `$${val.toFixed(2)}`;
                    },
                },
            ],
        };

        crypto.marketPrices[0].seriesPrice.forEach((dataPoint) =>
            chartOptions.series?.[0]?.data?.push?.({
                y: dataPoint,
            })
        );

        return chartOptions;
    }, [crypto]);
    console.log(cryptoChardData);

    return (
        <Layout>
            <LayoutHeader title="Investments">
                <div>Investments</div>
            </LayoutHeader>

            <LayoutBody>
                <HighchartsReact highcharts={Highcharts} options={cryptoChardData} />
            </LayoutBody>
        </Layout>
    );
};

export default Investments;
