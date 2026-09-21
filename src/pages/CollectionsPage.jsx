import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/product/ProductCard';
import { Sparkles, MessageCircle, ArrowRight, Filter } from 'lucide-react';
import { buildGeneralWhatsAppUrl } from '../lib/whatsapp';

export function CollectionsPage() {
  const { category } = useParams();
  const { collections, products, shop, isLoading } = useShop();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [category]);

  const generalWhatsAppUrl = buildGeneralWhatsAppUrl({
    whatsappNumber: shop.whatsapp,
    message: `Hello ${shop.name}! I would like to enquire about your special seasonal collections.`
  });

  const activeCollections = collections.filter((c) => {
    if (c.is_visible === false) return false;
    if (category) {
      return c.slug === category || c.id === category;
    }
    return true;
  });

  return (
    <div className="container section-spacing" style={{ paddingTop: '2rem' }}>
      <div className="section-header">
        <span className="section-badge">CURATED EDITIONS</span>
        <h1 className="section-title">Exclusive Collections</h1>
        <p className="section-subtitle">
          Thematic edits designed for weddings, festive ceremonies, summer getaways, and seasonal wardrobe updates.
        </p>
      </div>

      {/* Collection Quick Tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '3rem' }}>
        <Link
          to="/collections"
          className={`size-pill-btn ${!category ? 'selected' : ''}`}
          style={{ borderRadius: '9999px', padding: '0.45rem 1.25rem', fontSize: '0.9rem' }}
        >
          All Collections
        </Link>
        {collections
          .filter((c) => c.is_visible !== false)
          .map((col) => (
            <Link
              key={col.id}
              to={`/collections/${col.slug}`}
              className={`size-pill-btn ${category === col.slug ? 'selected' : ''}`}
              style={{ borderRadius: '9999px', padding: '0.45rem 1.25rem', fontSize: '0.9rem' }}
            >
              {col.name}
            </Link>
          ))}
      </div>

      {activeCollections.map((col) => {
        const colProducts = products.filter((p) =>
          col.product_ids?.includes(p.id)
        );

        return (
          <div
            key={col.id}
            style={{
              marginBottom: '4.5rem',
              paddingBottom: '3.5rem',
              borderBottom: '1px solid var(--border-light)'
            }}
          >
            {/* Collection Banner Card */}
            <div
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                minHeight: '260px',
                display: 'flex',
                alignItems: 'center',
                padding: 'clamp(1.5rem, 4vw, 3rem)',
                backgroundImage: `linear-gradient(to right, rgba(13, 13, 15, 0.92) 0%, rgba(13, 13, 15, 0.6) 60%, rgba(13, 13, 15, 0.2) 100%), url(${col.image_url || 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop'})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: '#fff',
                marginBottom: '2rem'
              }}
            >
              <div style={{ maxWidth: '600px' }}>
                {col.badge_tag && (
                  <span
                    style={{
                      display: 'inline-block',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      letterSpacing: '0.15em',
                      color: 'var(--accent)',
                      textTransform: 'uppercase',
                      marginBottom: '0.6rem'
                    }}
                  >
                    {col.badge_tag}
                  </span>
                )}
                <h2 style={{ color: '#fff', fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', marginBottom: '0.6rem' }}>
                  {col.name}
                </h2>
                <p style={{ color: '#e0e0e8', fontSize: '0.95rem', marginBottom: '1.25rem' }}>
                  {col.description}
                </p>
                <a
                  href={generalWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp btn-sm"
                >
                  <MessageCircle size={16} />
                  <span>Enquire About {col.name}</span>
                </a>
              </div>
            </div>

            {/* Collection Products Grid */}
            {colProducts.length > 0 ? (
              <div className="products-grid">
                {colProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <p style={{ color: '#888', fontStyle: 'italic' }}>
                New items are being curated for this collection.
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
