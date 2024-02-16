import { parse } from "date-fns/parse";
import { generateRandomInt } from "./generateRandomInt";
import { subYears } from "date-fns/subYears";
import { addDays } from "date-fns/addDays";
import { FORMAT_DATE } from "@/constants/formats";
import { MarketTrendPoint } from "../investments/dtos/base";

export type VariationRange = {
    minPercent: number;
    maxPercent: number;
};

export function generateMarketTrend(
    nEntries: number,
    tickVariantionRange: VariationRange,
    init: number,
    stable = false
): MarketTrendPoint[] {
    const results: MarketTrendPoint[] = [];

    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth() + 1;
    const todayDate = today.getDate();
    let dateStep = subYears(parse(`${todayDate}-${todayMonth}-${todayYear}`, FORMAT_DATE, new Date()), 1);

    let prev = init;
    for (let i = 0; i < nEntries; i++) {
        const extremeEvent = Math.random() <= 0.05;
        const { minPercent, maxPercent } = tickVariantionRange;
        const minFluctuation = (!extremeEvent ? minPercent : minPercent * 10) / (stable ? 1 : 2);
        const maxFluctuation = (!extremeEvent ? maxPercent : maxPercent * 10) / (stable ? 1 : 2);
        const intervalVariation = generateRandomInt(minFluctuation, maxFluctuation);
        const movement = Math.random() > 0.5 ? 1 + intervalVariation / 100 : 1 - intervalVariation / 100;
        const newResult = prev * movement;
        const date = addDays(dateStep, 1);
        results.push({ date, value: newResult });
        dateStep = date;
        prev = newResult;
    }

    return results;
}
