export const formatNumberInput = (value) => {
  if (!value) return "";

  const number = value.toString().replace(/\D/g, "");

  return new Intl.NumberFormat("id-ID").format(number);
};