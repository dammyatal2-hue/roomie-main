// Currency formatting utility
export const formatPrice = (price) => {
  if (typeof price === 'string') {
    // Extract number from string like "$450" or "450"
    const numPrice = parseInt(price.replace(/[^0-9]/g, ''));
    return `${numPrice.toLocaleString()} RWF`;
  }
  return `${price.toLocaleString()} RWF`;
};

export const formatPriceWithPeriod = (price, period = 'month') => {
  return `${formatPrice(price)}/${period}`;
};
