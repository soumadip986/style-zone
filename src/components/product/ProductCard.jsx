import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MessageCircle, Eye, Check } from 'lucide-react';
import { formatCurrency, calculateDiscountPercent } from '../../lib/formatters';
import { buildProductWhatsAppUrl } from '../../lib/whatsapp';
import { useShop } from '../../context/ShopContext';
import { QuickViewModal } from './QuickViewModal';

export function ProductCard({ product }) {
  const { shop } = useShop();
  const [showQuickView, setShowQuickView] = useState(false);
  const navigate = useNavigate();

  const primaryImage =
    product.images?.find((img) => img.is_primary)?.image_url ||
    product.images?.[0]?.image_url ||
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=600&auto=format&fit=crop';

  const discountPercent = calculateDiscountPercent(product.price, product.discount_price);
  const currentPrice = product.discount_price || product.price;

  const handleQuickWhatsApp = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const productUrl = `${window.location.origin}/product/${product.slug}`;
    const defaultSize = product.sizes?.[0]?.name || 'Standard';
    const defaultColour = product.colours?.[0]?.name || 'Standard';

    const url = buildProductWhatsAppUrl({
      whatsappNumber: shop.whatsapp,
      product,
      selectedSize: defaultSize,
      selectedColour: defaultColour,
      quantity: 1,
      currentUrl: productUrl
    });

    window.open(url, '_blank');
  };

  const handleOpenQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowQuickView(true);
  };

  const isAvailable = product.availability !== 'out_of_stock';

  return (
    <>
      <div className="product-card">
        {/* Media Container */}
        <div className="product-card-media">
          <Link to={`/product/${product.slug}`} aria-label={product.name}>
            <img
              src={primaryImage}
              alt={product.name}
              className="product-card-img"
              loading="lazy"
            />
          </Link>

          {/* Badges */}
          <div className="product-card-badges">
            {product.is_featured && <span className="badge badge-gold">Featured</span>}
            {discountPercent && (
              <span className="badge badge-discount">-{discountPercent}% OFF</span>
            )}
            {!isAvailable && <span className="badge badge-stock-out">Sold Out</span>}
          </div>

          {/* Quick Hover Actions (Desktop) */}
          <div className="product-card-quick-actions">
            <button
              className="product-card-quick-btn"
              onClick={handleOpenQuickView}
              title="Quick Preview"
            >
              <Eye size={15} />
              <span>Quick View</span>
            </button>
            <button
              className="product-card-wa-btn"
              onClick={handleQuickWhatsApp}
              title="Enquire on WhatsApp"
            >
              <MessageCircle size={17} />
            </button>
          </div>
        </div>

        {/* Card Body */}
        <div className="product-card-body">
          <div className="product-card-category">
            {product.category_name || product.department}
            {product.age_group ? ` • ${product.age_group}` : ''}
          </div>

          <Link to={`/product/${product.slug}`}>
            <h3 className="product-card-title">{product.name}</h3>
          </Link>

          <div className="product-card-pricing">
            <span className="product-price-current">{formatCurrency(currentPrice)}</span>
            {product.discount_price && (
              <span className="product-price-original">{formatCurrency(product.price)}</span>
            )}
            {discountPercent && (
              <span className="product-price-discount">{discountPercent}% OFF</span>
            )}
          </div>

          <div className="product-card-footer">
            <span>{product.brand || 'Style Zone Exclusive'}</span>
            <span style={{ color: isAvailable ? 'var(--status-success)' : 'var(--status-danger)' }}>
              {isAvailable ? '• In Stock' : '• Unavailable'}
            </span>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {showQuickView && (
        <QuickViewModal product={product} onClose={() => setShowQuickView(false)} />
      )}
    </>
  );
}
