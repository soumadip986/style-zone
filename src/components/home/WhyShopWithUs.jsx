import React from 'react';
import { Sparkles, Ruler, MessageCircle, MapPin, ShieldCheck, HeartHandshake } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export function WhyShopWithUs() {
  const { shop } = useShop();
  const features = shop.homepage?.why_us || [];

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles size={28} color="var(--accent)" />;
      case 'Ruler':
        return <Ruler size={28} color="var(--accent)" />;
      case 'MessageCircle':
        return <MessageCircle size={28} color="var(--accent)" />;
      case 'MapPin':
        return <MapPin size={28} color="var(--accent)" />;
      default:
        return <ShieldCheck size={28} color="var(--accent)" />;
    }
  };

  return (
    <section className="section-spacing" style={{ background: '#faf9f7', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-badge">THE BOUTIQUE STANDARD</span>
          <h2 className="section-title">Why Shop at {shop.name || 'Style Zone'}</h2>
          <p className="section-subtitle">
            We blend traditional garment craftsmanship with modern digital convenience.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem'
          }}
        >
          {features.map((item, idx) => (
            <div
              key={idx}
              style={{
                background: '#ffffff',
                padding: '2rem 1.5rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-light)',
                boxShadow: 'var(--shadow-sm)',
                transition: 'transform var(--transition-base), box-shadow var(--transition-base)',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'var(--accent-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem'
                }}
              >
                {getIcon(item.icon)}
              </div>

              <h4 style={{ fontSize: '1.15rem', marginBottom: '0.6rem', color: 'var(--primary)' }}>
                {item.title}
              </h4>

              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
