/**
 * Helper formatters for Style Zone
 */

export function formatCurrency(amount) {
  if (amount === undefined || amount === null || isNaN(amount)) return '₹0';
  return `₹${Number(amount).toLocaleString('en-IN')}`;
}

export function calculateDiscountPercent(price, discountPrice) {
  if (!price || !discountPrice || Number(discountPrice) >= Number(price)) return null;
  const saving = ((Number(price) - Number(discountPrice)) / Number(price)) * 100;
  return Math.round(saving);
}

export function slugify(text) {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}
