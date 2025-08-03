export const formatNumberWithCommas = (input: string | number): string => {
  if (!input) return '0.00';

  const num = parseFloat(input.toString().replace(/,/g, ''));

  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
  }).format(num);

  return formatted;
};
