import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Sparkles, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { buildGeneralWhatsAppUrl } from '../../lib/whatsapp';

export function HeroBanner() {
  const { shop } = useShop();
  const hero = shop.homepage?.hero || {};

  const generalWhatsAppUrl = buildGeneralWhatsAppUrl({
    whatsappNumber: shop.whatsapp,
    message: `Hello ${shop.name}! I would like to enquire about your newest fashion collection.`
  });

  const bgImage =
    hero.image_url ||
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop';

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '75vh',
        display: 'flex',
        alignItems: 'center',
        color: '#ffffff',
        backgroundImage: `linear-gradient(to right, rgba(13, 13, 15, 0.92) 0%, rgba(13, 13, 15, 0.6) 60%, rgba(13, 13, 15, 0.3) 100%), url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '4rem 0'
      }}
    >
      <div className="container">
        <div style={{ maxWidth: '680px' }}>
          {hero.badge && (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: 'rgba(197, 157, 95, 0.2)',
                border: '1px solid rgba(197, 157, 95, 0.5)',
                color: '#e5c48b',
                padding: '0.4rem 1rem',
                borderRadius: '9999px',
                fontSize: '0.78rem',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '1.5rem'
              }}
            >
              <Sparkles size={14} color="#d4af37" />
              <span>{hero.badge}</span>
            </div>
          )}

          <h1
            style={{
              color: '#ffffff',
              fontSize: 'clamp(2.5rem, 5vw + 1rem, 4.2rem)',
              lineHeight: 1.15,
              marginBottom: '1.25rem',
              letterSpacing: '-0.02em'
            }}
          >
            {hero.heading || 'STYLE FOR EVERY STORY'}
          </h1>

          <p
            style={{
              fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
              color: '#e0e0e8',
              lineHeight: 1.6,
              marginBottom: '2.25rem'
            }}
          >
            {hero.subheading ||
              'Discover our latest festive handloom silks, tailored executive menswear, and delightful kidswear at our flagship boutique.'}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            <Link to={hero.cta_link || '/department/men'} className="btn btn-accent btn-lg">
              <span>{hero.cta_text || 'Explore Collection'}</span>
              <ArrowRight size={18} />
            </Link>

            <a
              href={generalWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-lg"
            >
              <MessageCircle size={20} />
              <span>{hero.secondary_cta_text || 'WhatsApp Stylist'}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
