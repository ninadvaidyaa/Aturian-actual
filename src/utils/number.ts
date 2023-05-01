const USDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
export const getUSCurrency = (amount: number) => USDollar.format(amount);
