import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, MessageCircle, Check, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { formatCurrency, calculateDiscountPercent } from '../../lib/formatters';
import { buildProductWhatsAppUrl } from '../../lib/whatsapp';
import { useShop } from '../../context/ShopContext';

export function QuickViewModal({ product, onClose }) {
  const { shop } = useShop();
  const [selectedSize, setSelectedSize] = useState(
    product.sizes?.find((s) => s.available)?.name || product.sizes?.[0]?.name || ''
  );
  const [selectedColour, setSelectedColour] = useState(
    product.colours?.find((c) => c.available)?.name || product.colours?.[0]?.name || ''
  );
  const [quantity, setQuantity] = useState(1);
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  const images = product.images?.length > 0 ? product.images : [
    { image_url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop', alt_text: product.name }
  ];

  const currentPrice = product.discount_price || product.price;
  const discountPercent = calculateDiscountPercent(product.price, product.discount_price);
  const isGlobalAvailable = product.availability !== 'out_of_stock';

  const currentVariant = (product.variants || []).find(
    (v) => v.size === selectedSize && v.colour === selectedColour
  );

  const isVariantAvailable = currentVariant !== undefined
    ? currentVariant.available && isGlobalAvailable
    : isGlobalAvailable &&
      (product.sizes?.find((s) => s.name === selectedSize)?.available !== false) &&
      (product.colours?.find((c) => c.name === selectedColour)?.available !== false);

  const isSizeAvailableForColour = (sizeName) => {
    if (!product.variants || product.variants.length === 0) {
      return product.sizes?.find((s) => s.name === sizeName)?.available !== false;
    }
    const match = product.variants.find((v) => v.size === sizeName && (!selectedColour || v.colour === selectedColour));
    return match ? match.available : true;
  };

  const isColourAvailableForSize = (colourName) => {
    if (!product.variants || product.variants.length === 0) {
      return product.colours?.find((c) => c.name === colourName)?.available !== false;
    }
    const match = product.variants.find((v) => (!selectedSize || v.size === selectedSize) && v.colour === colourName);
    return match ? match.available : true;
  };

  const handleWhatsAppEnquiry = () => {
    const productUrl = `${window.location.origin}/product/${product.slug}`;
    const url = buildProductWhatsAppUrl({
      whatsappNumber: shop.whatsapp,
      product,
      selectedSize,
      selectedColour,
      quantity,
      currentUrl: productUrl
    });
    window.open(url, '_blank');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {/* Left: Product Images */}
          <div style={{ padding: '1.5rem', background: '#faf9f7' }}>
            <div style={{ aspectRatio: '3/4', borderRadius: '8px', overflow: 'hidden', marginBottom: '1rem', background: '#fff' }}>
              <img
                src={images[activeImgIndex]?.image_url || images[0]?.image_url}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            {images.length > 1 && (
              <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                {images.map((img, idx) => (
                  <button
                    key={img.id || idx}
                    onClick={() => setActiveImgIndex(idx)}
                    style={{
                      width: '60px',
                      height: '75px',
                      borderRadius: '4px',
                      overflow: 'hidden',
                      border: activeImgIndex === idx ? '2px solid var(--accent)' : '1px solid #ddd',
                      flexShrink: 0
                    }}
                  >
                    <img src={img.image_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details & WhatsApp CTA */}
          <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent)', fontWeight: 700, marginBottom: '0.4rem' }}>
              {product.department} • {product.category_name}
            </div>

            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>{product.name}</h2>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.8rem', marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>
                {formatCurrency(currentPrice)}
              </span>
              {product.discount_price && (
                <span style={{ fontSize: '1rem', color: '#999', textDecoration: 'line-through' }}>
                  {formatCurrency(product.price)}
                </span>
              )}
              {discountPercent && (
                <span className="badge badge-discount">SAVE {discountPercent}%</span>
              )}
            </div>

            {/* Size Selector */}
            {product.sizes?.length > 0 && (
              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                  <span>Select Size: <strong style={{ color: 'var(--accent)' }}>{selectedSize}</strong></span>
                  <span style={{ fontSize: '0.75rem', color: isVariantAvailable ? 'var(--status-success)' : 'var(--status-danger)', fontWeight: 600 }}>
                    {isVariantAvailable ? '• In Stock' : '• Variant Out of Stock'}
                  </span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {product.sizes.map((s) => {
                    const isSizeAvail = isSizeAvailableForColour(s.name);
                    return (
                      <button
                        key={s.name}
                        type="button"
                        disabled={!isSizeAvail}
                        className={`size-pill-btn ${selectedSize === s.name ? 'selected' : ''}`}
                        style={{ opacity: isSizeAvail ? 1 : 0.4 }}
                        onClick={() => setSelectedSize(s.name)}
                      >
                        {s.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Colour Selector */}
            {product.colours?.length > 0 && (
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                  Select Colour: <strong style={{ color: 'var(--accent)' }}>{selectedColour}</strong>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                  {product.colours.map((col) => {
                    const isColAvail = isColourAvailableForSize(col.name);
                    return (
                      <button
                        key={col.name}
                        type="button"
                        title={col.name}
                        className={`colour-swatch-btn ${selectedColour === col.name ? 'selected' : ''}`}
                        style={{ backgroundColor: col.hex || '#333', opacity: isColAvail ? 1 : 0.35 }}
                        onClick={() => setSelectedColour(col.name)}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Quantity:</span>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', borderRadius: '4px' }}>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  style={{ padding: '0.35rem 0.75rem', fontWeight: 'bold' }}
                >
                  -
                </button>
                <span style={{ padding: '0.35rem 0.75rem', fontWeight: 600, minWidth: '32px', textAlign: 'center' }}>
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  style={{ padding: '0.35rem 0.75rem', fontWeight: 'bold' }}
                >
                  +
                </button>
              </div>
            </div>

            {/* Main Action: WhatsApp Enquiry */}
            <button
              onClick={handleWhatsAppEnquiry}
              disabled={!isVariantAvailable}
              className="btn btn-whatsapp btn-block btn-lg"
              style={{ marginBottom: '0.75rem', opacity: isVariantAvailable ? 1 : 0.5 }}
            >
              <MessageCircle size={20} />
              <span>{isVariantAvailable ? 'Enquire & Reserve on WhatsApp' : 'Selected Variant Currently Unavailable'}</span>
            </button>

            <Link
              to={`/product/${product.slug}`}
              onClick={onClose}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                fontSize: '0.88rem',
                color: 'var(--primary)',
                fontWeight: 600,
                marginTop: '0.5rem'
              }}
            >
              <span>View Full Product Specifications</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
