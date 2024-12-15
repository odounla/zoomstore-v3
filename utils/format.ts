export const formatCurrency = (
  amount: number | null,
  currency: "USD" | "CFA" = "USD"
) => {
  const value = amount || 0;
  const options = {
    style: "currency",
    currency: currency === "USD" ? "USD" : "XAF", // 'XAF' is the ISO code for CFA Francs
  };

  const locale = currency === "USD" ? "en-US" : "fr-FR"; // Use locale for correct formatting

  return new Intl.NumberFormat(locale, options).format(value);
};
