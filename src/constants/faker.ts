import { Faker, allLocales } from "@faker-js/faker";

export const FAKER = new Faker({ locale: [allLocales.en_US, allLocales.en] });
