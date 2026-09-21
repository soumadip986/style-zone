/**
 * WhatsApp Message Generator & Deep-Link Utility for STYLE ZONE
 */

export function cleanWhatsAppNumber(phone) {
  if (!phone) return '919830012345';
  return phone.replace(/[^0-9]/g, '');
}

/**
 * Generates an enquiry WhatsApp link for a specific product and variant
 */
export function buildProductWhatsAppUrl({
  whatsappNumber,
  product,
  selectedSize,
  selectedColour,
  quantity = 1,
  currentUrl
}) {
  const cleanPhone = cleanWhatsAppNumber(whatsappNumber);
  const formattedPrice = `₹${(product.discount_price || product.price || 0).toLocaleString('en-IN')}`;
  const urlToShare = currentUrl || (typeof window !== 'undefined' ? window.location.href : '');

  const message = [
    '👋 *Hello Style Zone Boutique,*',
    'I would like to enquire about the following piece from your catalogue:',
    '',
    `🏷️ *Product:* ${product.name}`,
    `💰 *Price:* ${formattedPrice}`,
    `📏 *Size:* ${selectedSize || 'Standard / Unspecified'}`,
    `🎨 *Colour:* ${selectedColour || 'Standard / Shown in Photo'}`,
    `🔢 *Quantity:* ${quantity}`,
    product.sku ? `🔖 *SKU:* ${product.sku}` : null,
    '',
    `🔗 *Product Link:*`,
    urlToShare,
    '',
    '✨ _Is this item available in stock for trial / booking?_'
  ]
    .filter((line) => line !== null)
    .join('\n');

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

/**
 * Generates a general enquiry WhatsApp link
 */
export function buildGeneralWhatsAppUrl({ whatsappNumber, message = 'Hello Style Zone! I would like to enquire about your latest fashion collections & store timings.' }) {
  const cleanPhone = cleanWhatsAppNumber(whatsappNumber);
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
