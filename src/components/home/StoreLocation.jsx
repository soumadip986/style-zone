import React from 'react';
import { MapPin, Phone, MessageCircle, Clock, Navigation, Compass, Store } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { buildGeneralWhatsAppUrl } from '../../lib/whatsapp';

export function StoreLocation() {
  const { shop } = useShop();

  const generalWhatsAppUrl = buildGeneralWhatsAppUrl({
    whatsappNumber: shop.whatsapp,
    message: `Hello ${shop.name}! I would like to visit your boutique. Please share current landmark directions and parking info.`
  });

  const getDirectionsUrl =
    shop.maps_url ||
    `https://maps.google.com/?q=${encodeURIComponent(shop.address || 'Park Street Kolkata')}`;

  return (
    <section className="section-spacing" id="store-location" style={{ background: '#ffffff' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-badge">VISIT OUR PHYSICAL STORE</span>
          <h2 className="section-title">Flagship Boutique & Fitting Lounge</h2>
          <p className="section-subtitle">
            Walk into our flagship store to touch luxury fabrics, try personalized fits, or book a bridal consultation.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            alignItems: 'stretch',
            background: 'var(--bg-surface)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-light)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-md)'
          }}
        >
          {/* Left Column: Interactive Google Maps Embed */}
          <div style={{ position: 'relative', minHeight: '380px', width: '100%', background: '#eaeaea' }}>
            {shop.embed_maps_url ? (
              <iframe
                title="Store Location Map"
                src={shop.embed_maps_url}
                style={{ width: '100%', height: '100%', minHeight: '380px', border: 'none' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  padding: '2rem',
                  textAlign: 'center'
                }}
              >
                <Compass size={48} color="var(--accent)" style={{ marginBottom: '1rem' }} />
                <h4 style={{ marginBottom: '0.5rem' }}>Interactive Google Map</h4>
                <p style={{ fontSize: '0.85rem', color: '#666', maxWidth: '300px' }}>
                  {shop.address}
                </p>
              </div>
            )}
          </div>

          {/* Right Column: Store Details & Actions */}
          <div style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)', fontWeight: 700, fontSize: '0.82rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              <Store size={18} />
              <span>{shop.name || 'STYLE ZONE'} FLAGSHIP</span>
            </div>

            <h3 style={{ fontSize: '1.75rem', marginBottom: '1.25rem', color: 'var(--primary)' }}>
              Visit Us in Person
            </h3>

            {/* Address */}
            <div style={{ display: 'flex', gap: '0.85rem', marginBottom: '1.25rem' }}>
              <MapPin size={22} color="var(--accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ display: 'block', fontSize: '0.9rem', color: 'var(--primary)', marginBottom: '0.2rem' }}>
                  Store Address:
                </strong>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  {shop.address || 'Plot 42, Haute Couture Boulevard, Park Street, Kolkata, West Bengal 700016'}
                </p>
              </div>
            </div>

            {/* Timings */}
            <div style={{ display: 'flex', gap: '0.85rem', marginBottom: '1.25rem' }}>
              <Clock size={22} color="var(--accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ display: 'block', fontSize: '0.9rem', color: 'var(--primary)', marginBottom: '0.2rem' }}>
                  Opening Hours:
                </strong>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0 }}>
                  Mon – Sat: <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{shop.opening_hours?.weekdays || '10:30 AM – 9:00 PM'}</span>
                </p>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0 }}>
                  Sunday: <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{shop.opening_hours?.sunday || '11:00 AM – 8:00 PM'}</span>
                </p>
              </div>
            </div>

            {/* Phone & WhatsApp */}
            <div style={{ display: 'flex', gap: '0.85rem', marginBottom: '2rem' }}>
              <Phone size={22} color="var(--accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ display: 'block', fontSize: '0.9rem', color: 'var(--primary)', marginBottom: '0.2rem' }}>
                  Concierge Desk:
                </strong>
                <a href={`tel:${shop.phone}`} style={{ fontSize: '0.9rem', color: 'var(--primary)', fontWeight: 600 }}>
                  {shop.phone}
                </a>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <a
                href={getDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-accent btn-lg"
                style={{ flex: 1, minWidth: '180px' }}
              >
                <Navigation size={18} />
                <span>Get Directions</span>
              </a>

              <a
                href={generalWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-lg"
                style={{ flex: 1, minWidth: '180px' }}
              >
                <MessageCircle size={20} />
                <span>WhatsApp Desk</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
