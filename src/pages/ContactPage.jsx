import React, { useEffect } from 'react';
import { MapPin, Phone, MessageCircle, Clock, Mail, Navigation, Sparkles, Store } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { buildGeneralWhatsAppUrl } from '../lib/whatsapp';

export function ContactPage() {
  const { shop } = useShop();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const generalWhatsAppUrl = buildGeneralWhatsAppUrl({
    whatsappNumber: shop.whatsapp,
    message: `Hello ${shop.name}! I would like to schedule an in-store trial and personal styling session.`
  });

  const getDirectionsUrl =
    shop.maps_url ||
    `https://maps.google.com/?q=${encodeURIComponent(shop.address || 'Park Street Kolkata')}`;

  return (
    <div className="container section-spacing" style={{ paddingTop: '2.5rem' }}>
      <div className="section-header">
        <span className="section-badge">CONCIERGE & BOUTIQUE LOCATION</span>
        <h1 className="section-title">Visit Our Flagship Store</h1>
        <p className="section-subtitle">
          Experience our garments in person, consult with master tailors, or reach out directly to our concierge team.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3rem',
          marginBottom: '4rem'
        }}
      >
        {/* Left: Contact Info Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Address Card */}
          <div style={{ background: 'var(--bg-surface)', padding: '1.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <MapPin size={22} color="var(--accent)" />
              </div>
              <div>
                <h4 style={{ marginBottom: '0.4rem', fontSize: '1.1rem' }}>Store Address</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.5, marginBottom: '1rem' }}>
                  {shop.address}
                </p>
                <a href={getDirectionsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-accent btn-sm">
                  <Navigation size={14} />
                  <span>Get Directions in Google Maps</span>
                </a>
              </div>
            </div>
          </div>

          {/* Timings Card */}
          <div style={{ background: 'var(--bg-surface)', padding: '1.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Clock size={22} color="var(--accent)" />
              </div>
              <div>
                <h4 style={{ marginBottom: '0.4rem', fontSize: '1.1rem' }}>Store Working Hours</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                  <strong>Monday – Saturday:</strong> {shop.opening_hours?.weekdays || '10:30 AM – 9:00 PM'}
                </p>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>
                  <strong>Sunday:</strong> {shop.opening_hours?.sunday || '11:00 AM – 8:00 PM'}
                </p>
              </div>
            </div>
          </div>

          {/* Phone & WhatsApp Card */}
          <div style={{ background: 'var(--bg-surface)', padding: '1.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: 'var(--whatsapp-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <MessageCircle size={22} color="var(--whatsapp)" />
              </div>
              <div>
                <h4 style={{ marginBottom: '0.4rem', fontSize: '1.1rem' }}>Instant WhatsApp & Phone</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                  Connect directly with our showroom executives for custom sizing, real-time stock video calls, or fitting bookings.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <a href={generalWhatsAppUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-sm">
                    <MessageCircle size={15} />
                    <span>WhatsApp Concierge</span>
                  </a>
                  <a href={`tel:${shop.phone}`} className="btn btn-outline btn-sm">
                    <Phone size={14} />
                    <span>Call {shop.phone}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Full Embedded Interactive Google Map */}
        <div
          style={{
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            border: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-md)',
            minHeight: '480px',
            background: '#eee'
          }}
        >
          {shop.embed_maps_url ? (
            <iframe
              title="Style Zone Boutique Location"
              src={shop.embed_maps_url}
              style={{ width: '100%', height: '100%', minHeight: '480px', border: 'none' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center' }}>
              <p>Map Preview</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
