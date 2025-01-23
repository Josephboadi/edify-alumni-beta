import CurrencyData from "@/data/currency.json";

export const currency = async () => {
  const currencyData = await CurrencyData;

  return currencyData;
};
