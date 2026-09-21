import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  MessageCircle,
  MapPin,
  ShieldCheck,
  Ruler,
  Clock,
  Sparkles,
  Share2,
  ChevronRight,
  ArrowLeft,
  Check
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { formatCurrency, calculateDiscountPercent } from '../lib/formatters';
import { buildProductWhatsAppUrl, buildGeneralWhatsAppUrl } from '../lib/whatsapp';
import { ProductCard } from '../components/product/ProductCard';

export function ProductDetails() {
  const { slug } = useParams();
  const { products, shop, isLoading } = useShop();
  const navigate = useNavigate();

  const product = products.find((p) => p.slug === slug || p.id === slug);

  // Variant selection states
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColour, setSelectedColour] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copiedToast, setCopiedToast] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (product) {
      // Set initial defaults
      const firstAvailableSize = product.sizes?.find((s) => s.available)?.name || product.sizes?.[0]?.name || '';
      const firstAvailableColour = product.colours?.find((c) => c.available)?.name || product.colours?.[0]?.name || '';
      setSelectedSize(firstAvailableSize);
      setSelectedColour(firstAvailableColour);
      setActiveImageIndex(0);
    }
  }, [slug, product]);

  if (isLoading) {
    return (
      <div className="container section-spacing">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
          <div className="skeleton" style={{ aspectRatio: '3/4', width: '100%', borderRadius: '12px' }} />
          <div>
            <div className="skeleton" style={{ height: '24px', width: '40%', marginBottom: '1rem' }} />
            <div className="skeleton" style={{ height: '36px', width: '90%', marginBottom: '1.5rem' }} />
            <div className="skeleton" style={{ height: '30px', width: '50%', marginBottom: '2rem' }} />
            <div className="skeleton" style={{ height: '120px', width: '100%' }} />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container section-spacing" style={{ textAlign: 'center', padding: '5rem 1rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Product Not Found</h2>
        <p style={{ marginBottom: '2rem' }}>The fashion piece you are looking for might have been updated or moved.</p>
        <Link to="/" className="btn btn-primary">
          Back to Catalogue
        </Link>
      </div>
    );
  }

  const images = product.images?.length > 0 ? product.images : [
    { image_url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop', alt_text: product.name }
  ];

  const currentPrice = product.discount_price || product.price;
  const discountPercent = calculateDiscountPercent(product.price, product.discount_price);
  const isGlobalAvailable = product.availability !== 'out_of_stock';

  // Check specific Size + Colour combination in variants matrix
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

  // Build the WhatsApp direct link
  const handleWhatsAppEnquiry = () => {
    const productUrl = window.location.href;
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

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name} at Style Zone!`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 2500);
    }
  };

  // Related products from same department
  const relatedProducts = products
    .filter((p) => p.department === product.department && p.id !== product.id && p.is_published !== false)
    .slice(0, 4);

  return (
    <div className="container section-spacing" style={{ paddingTop: '2rem' }}>
      {/* Breadcrumbs */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#888', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <Link to="/" style={{ color: 'var(--text-muted)' }}>Home</Link>
        <ChevronRight size={14} />
        <Link to={`/department/${product.department}`} style={{ color: 'var(--text-muted)', textTransform: 'capitalize' }}>
          {product.department}
        </Link>
        {product.category_name && (
          <>
            <ChevronRight size={14} />
            <Link to={`/department/${product.department}?category=${encodeURIComponent(product.category_name)}`} style={{ color: 'var(--text-muted)' }}>
              {product.category_name}
            </Link>
          </>
        )}
        <ChevronRight size={14} />
        <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{product.name}</span>
      </nav>

      {/* Main 2-Column Product Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'clamp(2rem, 5vw, 4rem)', marginBottom: '5rem' }}>
        {/* Left: Interactive Multi-Image Gallery */}
        <div>
          <div
            style={{
              position: 'relative',
              aspectRatio: '3/4',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-light)',
              marginBottom: '1rem'
            }}
          >
            <img
              src={images[activeImageIndex]?.image_url || images[0]?.image_url}
              alt={images[activeImageIndex]?.alt_text || product.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />

            <div style={{ position: 'absolute', top: '1rem', left: '1rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {product.is_featured && <span className="badge badge-gold">Featured Boutique Piece</span>}
              {discountPercent && <span className="badge badge-discount">-{discountPercent}% OFF</span>}
            </div>

            <button
              onClick={handleShare}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'rgba(255, 255, 255, 0.9)',
                border: 'none',
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-sm)'
              }}
              title="Share or Copy Link"
            >
              <Share2 size={16} />
            </button>
          </div>

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
              {images.map((img, idx) => (
                <button
                  key={img.id || idx}
                  onClick={() => setActiveImageIndex(idx)}
                  style={{
                    width: '75px',
                    height: '95px',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    border: activeImageIndex === idx ? '2px solid var(--accent)' : '1px solid var(--border-medium)',
                    cursor: 'pointer',
                    flexShrink: 0
                  }}
                >
                  <img src={img.image_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Specifications, Variant Pickers & WhatsApp CTA */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent)', fontWeight: 800 }}>
              {product.brand || 'Style Zone Exclusive'}
            </span>
            {product.sku && <span style={{ fontSize: '0.75rem', color: '#999' }}>• SKU: {product.sku}</span>}
          </div>

          <h1 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', lineHeight: 1.25, marginBottom: '1rem' }}>
            {product.name}
          </h1>

          {/* Pricing */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '1.5rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--border-light)' }}>
            <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)' }}>
              {formatCurrency(currentPrice)}
            </span>
            {product.discount_price && (
              <span style={{ fontSize: '1.2rem', color: 'var(--text-light)', textDecoration: 'line-through' }}>
                {formatCurrency(product.price)}
              </span>
            )}
            {discountPercent && (
              <span className="badge badge-discount" style={{ fontSize: '0.82rem' }}>
                SAVE {discountPercent}%
              </span>
            )}
            <span style={{ marginLeft: 'auto', fontSize: '0.85rem', color: isVariantAvailable ? 'var(--status-success)' : 'var(--status-danger)', fontWeight: 600 }}>
              {isVariantAvailable ? `✓ In Stock (${selectedSize || 'Standard'} • ${selectedColour || 'Standard'})` : '✕ Selected Variant Unavailable'}
            </span>
          </div>

          {/* Size Selector */}
          {product.sizes?.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem', fontSize: '0.88rem', fontWeight: 600 }}>
                <span>Select Size: <strong style={{ color: 'var(--accent)' }}>{selectedSize || 'Choose Size'}</strong></span>
                <span style={{ color: '#888', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <Ruler size={13} /> Size Guide Available
                </span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                {product.sizes.map((s) => {
                  const isSizeAvail = isSizeAvailableForColour(s.name);
                  return (
                    <button
                      key={s.name}
                      type="button"
                      disabled={!isSizeAvail}
                      onClick={() => setSelectedSize(s.name)}
                      className={`size-pill-btn ${selectedSize === s.name ? 'selected' : ''}`}
                      style={{ minWidth: '46px', textAlign: 'center', opacity: isSizeAvail ? 1 : 0.4 }}
                      title={isSizeAvail ? `Size ${s.name}` : `Size ${s.name} unavailable in ${selectedColour}`}
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
            <div style={{ marginBottom: '1.75rem' }}>
              <div style={{ fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.6rem' }}>
                Select Colour: <strong style={{ color: 'var(--accent)' }}>{selectedColour || 'Choose Colour'}</strong>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                {product.colours.map((col) => {
                  const isColAvail = isColourAvailableForSize(col.name);
                  return (
                    <button
                      key={col.name}
                      type="button"
                      title={isColAvail ? col.name : `${col.name} unavailable in size ${selectedSize}`}
                      className={`colour-swatch-btn ${selectedColour === col.name ? 'selected' : ''}`}
                      style={{
                        backgroundColor: col.hex || '#333',
                        width: '32px',
                        height: '32px',
                        opacity: isColAvail ? 1 : 0.35
                      }}
                      onClick={() => setSelectedColour(col.name)}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity Stepper */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>Quantity:</span>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-medium)', borderRadius: '6px' }}>
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                style={{ padding: '0.5rem 0.9rem', fontSize: '1.1rem', fontWeight: 700 }}
              >
                -
              </button>
              <span style={{ padding: '0.5rem 1rem', fontWeight: 700, minWidth: '40px', textAlign: 'center' }}>
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                style={{ padding: '0.5rem 0.9rem', fontSize: '1.1rem', fontWeight: 700 }}
              >
                +
              </button>
            </div>
          </div>

          {/* Primary Action: Direct WhatsApp Conversion Button */}
          <div style={{ marginBottom: '2rem' }}>
            <button
              onClick={handleWhatsAppEnquiry}
              disabled={!isVariantAvailable}
              className="btn btn-whatsapp btn-lg btn-block"
              style={{ fontSize: '1.1rem', padding: '1.25rem', opacity: isVariantAvailable ? 1 : 0.5 }}
            >
              <MessageCircle size={24} />
              <span>
                {isVariantAvailable ? 'Enquire & Reserve on WhatsApp' : 'Selected Variant Currently Unavailable'}
              </span>
            </button>
            <p style={{ fontSize: '0.8rem', color: '#777', textAlign: 'center', marginTop: '0.6rem' }}>
              💬 Generates pre-filled message with your selected size, colour & quantity for instant assistance.
            </p>
          </div>

          {/* In-Store Trial Assistance Banner */}
          <div
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              marginBottom: '2rem'
            }}
          >
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <MapPin size={20} color="var(--accent)" style={{ flexShrink: 0 }} />
              <div>
                <strong style={{ fontSize: '0.88rem', color: 'var(--primary)' }}>Prefer In-Store Trial & Fitting?</strong>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>
                  Visit our flagship store at {shop.address}. Walk-in trial rooms and on-spot master tailoring available.
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '0.6rem' }}>Product Details</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, fontSize: '0.95rem' }}>
              {product.description}
            </p>
          </div>

          {/* Attributes Table */}
          {product.attributes_json && Object.keys(product.attributes_json).length > 0 && (
            <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1.5rem' }}>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem' }}>Garment Specifications</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.85rem' }}>
                {Object.entries(product.attributes_json).map(([key, val]) => (
                  <div key={key} style={{ background: '#faf9f7', padding: '0.75rem', borderRadius: '6px', border: '1px solid #edeae4' }}>
                    <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#888', display: 'block' }}>
                      {key.replace('_', ' ')}
                    </span>
                    <strong style={{ fontSize: '0.88rem', color: 'var(--primary)' }}>
                      {val}
                    </strong>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section style={{ borderTop: '1px solid var(--border-light)', paddingTop: '4rem' }}>
          <div className="section-header" style={{ textAlign: 'left', margin: '0 0 2rem 0' }}>
            <span className="section-badge">YOU MAY ALSO ADORE</span>
            <h2 className="section-title">More from {product.department.toUpperCase()}</h2>
          </div>
          <div className="products-grid">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Copied Toast */}
      {copiedToast && (
        <div className="toast" style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 100 }}>
          <Check size={16} color="#25d366" />
          <span>Product link copied to clipboard!</span>
        </div>
      )}
    </div>
  );
}
