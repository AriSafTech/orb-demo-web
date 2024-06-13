"use client";
import { v4 as uuid } from "uuid";

const CONVERSION_RATES = {
  "1": 100,
  "2": 110,
  "event-coin1": 120,
  "event-coin2": 130,
} as const;

export type SettlementsData = {
  id: string;
  coinId: keyof typeof CONVERSION_RATES;
  currencyCode: "usd" | "bdt" | "jpy";
  coinAmount: number;
  currencyAmount: number;
  status: "settled" | "pending";
  createdAt: number;
  settledAt: number | null;
};

const STARTING_TS = Date.parse("2024-01-01");
const ENDING_TS = Date.parse("2024-05-31");

const getRandomTimestamp = (after = STARTING_TS) => {
  const rand = Math.random();
  return after + (ENDING_TS - after) * rand;
};

const getTimeAndStatusFields = () => {
  const createdAt = getRandomTimestamp();
  const status: SettlementsData["status"] =
    Math.random() > 0.5 ? "settled" : "pending";
  const settledAt = status === "settled" ? getRandomTimestamp(createdAt) : null;
  return { createdAt, settledAt, status };
};

const getConversionFields = (rates = CONVERSION_RATES) => {
  const coinId = Object.keys(rates)[
    Math.floor(Math.random() * 4)
  ] as keyof typeof rates;
  const coinAmount = Math.floor(10 + Math.random() * (1000 - 10));
  const currencyCode = "jpy" as SettlementsData["currencyCode"];
  const currencyAmount = coinAmount * rates[coinId];
  return { coinId, coinAmount, currencyCode, currencyAmount };
};

export const DUMMY_SETTLEMENTS_DATA: SettlementsData[] = new Array(10)
  .fill(0)
  .map(() => ({
    id: uuid(),
    ...getConversionFields(),
    ...getTimeAndStatusFields(),
  }));

export const getDummySettlementsData = (rates: Record<string, number>) => {
  const res = new Array(40).fill(0).map(() => ({
    id: uuid(),
    ...getConversionFields(rates as typeof CONVERSION_RATES),
    ...getTimeAndStatusFields(),
  }));
  res.sort((a, b) => b.createdAt - a.createdAt);
  return res;
};
