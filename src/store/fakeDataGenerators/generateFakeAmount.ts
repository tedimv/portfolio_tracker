import { generateRandomInt } from "./generateRandomInt";

export function generateFakeAmount(min = 1, max = 200, whole = false) {
    const multiplier = generateRandomInt(min, max);
    const snipped = (multiplier * Math.random()).toFixed(6);
    return whole ? parseInt(snipped) : Number(snipped);
}
