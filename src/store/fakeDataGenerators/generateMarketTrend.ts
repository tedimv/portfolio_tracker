import { generateRandomInt } from "./generateRandomInt";

export type VariationRange = {
    minPercent: number;
    maxPercent: number;
};

export function generateMarketTrend(nEntries: number, tickVariantionRange: VariationRange, init: number, stable = false): number[] {
    const results: number[] = [];

    let prev = init;
    for (let i = 0; i < nEntries; i++) {
        const extremeEvent = Math.random() <= 0.05;
        const { minPercent, maxPercent } = tickVariantionRange;
        const minFluctuation = (!extremeEvent ? minPercent : minPercent * 10) / (stable ? 1 : 2);
        const maxFluctuation = (!extremeEvent ? maxPercent : maxPercent * 10) / (stable ? 1 : 2);
        const intervalVariation = generateRandomInt(minFluctuation, maxFluctuation);
        const movement = Math.random() > 0.5 ? 1 + intervalVariation / 100 : 1 - intervalVariation / 100;
        const newResult = prev * movement;
        results.push(newResult);
        prev = newResult;
    }

    return results;
}
