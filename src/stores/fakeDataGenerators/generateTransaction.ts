import { isAfter } from "date-fns/isAfter";
import { addDays } from "date-fns/addDays";
import { subYears } from "date-fns/subYears";
import { parse } from "date-fns/parse";
import { format } from "date-fns/format";

import { FAKER } from "@/constants/faker";
import { Transaction } from "../investments/dtos/base";
import { FORMAT_DATE } from "@/constants/formats";

export function generateTransactions(
    n: number,
    genBuy: () => number,
    genSell: (maxSell: number) => number
): Transaction[] {
    const results: Transaction[] = [];

    let balance = 0;

    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth() + 1;
    const todayDate = today.getDate();
    let dateStep = subYears(parse(`${todayDate}-${todayMonth}-${todayYear}`, FORMAT_DATE, new Date()), 1);

    for (let i = 0; i < n; i++) {
        const newDate = addDays(dateStep, FAKER.number.int({ min: 15, max: 45 }));
        dateStep = newDate;
        if (isAfter(newDate, today)) continue;

        const buySellMultiplier = !balance || Math.random() > 0.4 ? 1 : -1;
        const transactionAmount = buySellMultiplier > 0 ? genBuy() : genSell(balance) * buySellMultiplier;
        balance += transactionAmount;

        results.push({
            date: format(newDate, FORMAT_DATE),
            balance,
            amount: transactionAmount,
            open: transactionAmount > 0,
        });
    }

    return results;
}
