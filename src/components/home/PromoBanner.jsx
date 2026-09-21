import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, MessageCircle } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { buildGeneralWhatsAppUrl } from '../../lib/whatsapp';

export function PromoBanner() {
  const { shop } = useShop();
  const promo = shop.homepage?.promo || {};

  const generalWhatsAppUrl = buildGeneralWhatsAppUrl({
    whatsappNumber: shop.whatsapp,
    message: `Hello ${shop.name}! I am interested in the ${promo.title || 'Royal Festive Edit'} collection.`
  });

  const bgImage =
    promo.image_url ||
    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1887&auto=format&fit=crop';

  return (
    <section className="section-spacing" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
      <div className="container">
        <div
          style={{
            position: 'relative',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            minHeight: '420px',
            display: 'flex',
            alignItems: 'center',
            backgroundImage: `linear-gradient(to right, rgba(15, 15, 17, 0.95) 0%, rgba(15, 15, 17, 0.7) 50%, rgba(15, 15, 17, 0.2) 100%), url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            padding: 'clamp(2rem, 5vw, 4rem)',
            color: '#fff',
            boxShadow: 'var(--shadow-xl)'
          }}
        >
          <div style={{ maxWidth: '560px', position: 'relative', zIndex: 2 }}>
            <span
              style={{
                display: 'inline-block',
                fontSize: '0.75rem',
                fontWeight: 800,
                letterSpacing: '0.15em',
                color: 'var(--accent)',
                textTransform: 'uppercase',
                marginBottom: '1rem',
                background: 'rgba(197, 157, 95, 0.15)',
                padding: '0.35rem 0.85rem',
                borderRadius: '9999px',
                border: '1px solid rgba(197, 157, 95, 0.4)'
              }}
            >
              {promo.tag || 'EXCLUSIVE FESTIVE EDIT'}
            </span>

            <h2
              style={{
                color: '#fff',
                fontSize: 'clamp(1.8rem, 3vw + 0.5rem, 2.8rem)',
                lineHeight: 1.2,
                marginBottom: '1rem'
              }}
            >
              {promo.title || 'Royal Heritage Sarees & Artisanal Menswear'}
            </h2>

            <p
              style={{
                color: '#e2e2ea',
                fontSize: '0.98rem',
                lineHeight: 1.6,
                marginBottom: '2rem'
              }}
            >
              {promo.description ||
                'Experience handloom craftsmanship woven by master artisans. Available for in-store preview or doorstep reservation via WhatsApp.'}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <Link to={promo.button_link || '/department/women'} className="btn btn-accent">
                <span>{promo.button_text || 'Browse Royal Edit'}</span>
                <ArrowRight size={16} />
              </Link>
              <a
                href={generalWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
              >
                <MessageCircle size={18} />
                <span>Reserve on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
