export function formatNumber(x, precision) {
  if (x === null) {
    return '-';
  }
  if (isNaN(+x)) {
    return 'NaN';
  }

  const convertToNumber = +x;

  return convertToNumber.toFixed(precision);
}
