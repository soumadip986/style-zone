import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Ruler, MessageCircle, MapPin, ShieldCheck, HeartHandshake, Store, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { buildGeneralWhatsAppUrl } from '../lib/whatsapp';

export function AboutPage() {
  const { shop } = useShop();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const generalWhatsAppUrl = buildGeneralWhatsAppUrl({
    whatsappNumber: shop.whatsapp,
    message: `Hello ${shop.name}! I would like to learn more about your bespoke tailoring and in-store fitting consultations.`
  });

  return (
    <div>
      {/* Hero Banner */}
      <section
        style={{
          position: 'relative',
          padding: 'clamp(4rem, 8vw, 6rem) 0',
          backgroundImage: 'linear-gradient(to right, rgba(13, 13, 15, 0.94) 0%, rgba(13, 13, 15, 0.65) 100%), url(https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#ffffff'
        }}
      >
        <div className="container">
          <div style={{ maxWidth: '680px' }}>
            <span className="section-badge" style={{ marginBottom: '1rem' }}>
              HAUTE COUTURE & BOUTIQUE HERITAGE
            </span>
            <h1 style={{ color: '#ffffff', fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)', marginBottom: '1.25rem', lineHeight: 1.15 }}>
              The Story of {shop.name || 'STYLE ZONE'}
            </h1>
            <p style={{ color: '#e0e0e8', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
              {shop.tagline || 'Exclusive Haute Couture & Premium Ready-to-Wear'}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <a
                href={generalWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
              >
                <MessageCircle size={18} />
                <span>Enquire via WhatsApp</span>
              </a>
              <Link to="/contact" className="btn btn-outline-gold">
                <span>Visit Our Boutique</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Story & Heritage */}
      <section className="section-spacing">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem', alignItems: 'center' }}>
            <div>
              <span className="section-badge">ARTISANAL EXCELLENCE</span>
              <h2 className="section-title">Where Tradition Meets Contemporary Silhouette</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                Founded with a passion for exquisite textiles and immaculate tailoring, Style Zone represents the pinnacle of Indian luxury fashion and bespoke craftsmanship.
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                From authentic handloom Kanchipuram and Banarasi brocades to crisp Italian-cut linen shirts and hypoallergenic organic kidswear, every garment in our boutique is chosen for longevity, tactile luxury, and effortless elegance.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '2rem' }}>
                <div style={{ background: 'var(--bg-surface)', padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
                  <strong style={{ fontSize: '1.8rem', color: 'var(--accent)', display: 'block' }}>100%</strong>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Pure Handloom & Organic Certified Silks</span>
                </div>
                <div style={{ background: 'var(--bg-surface)', padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
                  <strong style={{ fontSize: '1.8rem', color: 'var(--accent)', display: 'block' }}>In-Store</strong>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Master Alterations & Bespoke Sizing</span>
                </div>
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              <div style={{ aspectRatio: '4/5', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-xl)' }}>
                <img
                  src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1000&auto=format&fit=crop"
                  alt="Style Zone Saree Weaving Craftsmanship"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Boutique Values */}
      <section className="section-spacing" style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border-light)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge">OUR COMMITMENT</span>
            <h2 className="section-title">The Style Zone Standard</h2>
            <p className="section-subtitle">
              We bridge physical boutique luxury with instant digital WhatsApp reservations.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
            <div style={{ background: '#fff', padding: '2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', textAlign: 'center' }}>
              <Sparkles size={32} color="var(--accent)" style={{ margin: '0 auto 1rem' }} />
              <h4 style={{ marginBottom: '0.5rem' }}>Curated Editions</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                Limited seasonal runs ensure exclusivity for every wedding, gala, and festive occasion.
              </p>
            </div>

            <div style={{ background: '#fff', padding: '2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', textAlign: 'center' }}>
              <Ruler size={32} color="var(--accent)" style={{ margin: '0 auto 1rem' }} />
              <h4 style={{ marginBottom: '0.5rem' }}>Custom Sizing & Trial</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                Experience our private fitting lounges and customized sleeve & hem alterations.
              </p>
            </div>

            <div style={{ background: '#fff', padding: '2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', textAlign: 'center' }}>
              <MessageCircle size={32} color="var(--whatsapp)" style={{ margin: '0 auto 1rem' }} />
              <h4 style={{ marginBottom: '0.5rem' }}>Instant WhatsApp Concierge</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                Ask questions, request live video previews, and reserve garments directly via WhatsApp.
              </p>
            </div>

            <div style={{ background: '#fff', padding: '2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', textAlign: 'center' }}>
              <Store size={32} color="var(--accent)" style={{ margin: '0 auto 1rem' }} />
              <h4 style={{ marginBottom: '0.5rem' }}>Flagship Showroom</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                Spacious trial suites and valet parking at our flagship boutique in Kolkata.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
