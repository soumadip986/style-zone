import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  Navigation,
  Sparkles
} from 'lucide-react';

const InstagramIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const FacebookIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const YoutubeIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
    <polygon points="10 15 15 12 10 9 10 15"/>
  </svg>
);
import { useShop } from '../../context/ShopContext';
import { buildGeneralWhatsAppUrl } from '../../lib/whatsapp';

export function Footer() {
  const { shop } = useShop();

  const generalWhatsAppUrl = buildGeneralWhatsAppUrl({
    whatsappNumber: shop.whatsapp,
    message: `Hello ${shop.name}! I would like to enquire about visiting your boutique.`
  });

  const getDirectionsUrl = shop.maps_url || `https://maps.google.com/?q=${encodeURIComponent(shop.address || 'Park Street Kolkata')}`;

  return (
    <footer className="luxury-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Col 1: Brand Story */}
          <div>
            <div style={{ marginBottom: '1.25rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.8rem',
                  fontWeight: 700,
                  color: '#fff',
                  letterSpacing: '0.08em'
                }}
              >
                {shop.name || 'STYLE ZONE'}
              </span>
              <p
                style={{
                  fontSize: '0.7rem',
                  color: 'var(--accent)',
                  fontWeight: 600,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  marginTop: '0.2rem'
                }}
              >
                HAUTE COUTURE & BOUTIQUE
              </p>
            </div>
            <p style={{ fontSize: '0.88rem', color: '#9ba1b0', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              {shop.description ||
                'A premier physical fashion boutique catering to bespoke menswear, royal bridal silks, western silhouettes, and organic kidswear.'}
            </p>
            <div className="footer-social-icons">
              {shop.social?.instagram && (
                <a
                  href={shop.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-btn"
                  aria-label="Instagram"
                >
                  <InstagramIcon size={16} />
                </a>
              )}
              {shop.social?.facebook && (
                <a
                  href={shop.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-btn"
                  aria-label="Facebook"
                >
                  <FacebookIcon size={16} />
                </a>
              )}
              {shop.social?.youtube && (
                <a
                  href={shop.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-btn"
                  aria-label="YouTube"
                >
                  <YoutubeIcon size={16} />
                </a>
              )}
            </div>
          </div>

          {/* Col 2: Shop 5 Main Sections */}
          <div>
            <h4 className="footer-col-title">Shop Catalogue</h4>
            <ul className="footer-links">
              <li><Link to="/department/kids">Kids (0–16Y)</Link></li>
              <li><Link to="/department/boys">Boys Collection</Link></li>
              <li><Link to="/department/girls">Girls Collection</Link></li>
              <li><Link to="/department/men">Men’s Apparel</Link></li>
              <li><Link to="/department/women">Women’s Sarees & Western</Link></li>
            </ul>
          </div>

          {/* Col 3: Collections & Edits */}
          <div>
            <h4 className="footer-col-title">Curated Edits</h4>
            <ul className="footer-links">
              <li><Link to="/collections">New Arrivals 2026</Link></li>
              <li><Link to="/department/women?category=Sarees">Royal Silk Sarees</Link></li>
              <li><Link to="/department/men?category=Shirts">Linen & Oxford Shirts</Link></li>
              <li><Link to="/department/kids?age=0–3+Months">Newborn Organic Sets</Link></li>
              <li><Link to="/contact">Book In-Store Trial</Link></li>
            </ul>
          </div>

          {/* Col 4: Timings & Contact */}
          <div>
            <h4 className="footer-col-title">Store Hours</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.88rem' }}>
              <div style={{ display: 'flex', gap: '0.6rem', color: '#c5c8d0' }}>
                <Clock size={18} color="var(--accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <p style={{ color: '#fff', fontWeight: 600, margin: 0 }}>Mon – Sat:</p>
                  <p style={{ margin: 0, color: '#9ba1b0' }}>{shop.opening_hours?.weekdays || '10:30 AM – 9:00 PM'}</p>
                  <p style={{ color: '#fff', fontWeight: 600, marginTop: '0.4rem', marginBottom: 0 }}>Sunday:</p>
                  <p style={{ margin: 0, color: '#9ba1b0' }}>{shop.opening_hours?.sunday || '11:00 AM – 8:00 PM'}</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.6rem', color: '#c5c8d0', marginTop: '0.5rem' }}>
                <Phone size={18} color="var(--accent)" style={{ flexShrink: 0 }} />
                <div>
                  <a href={`tel:${shop.phone}`} style={{ color: '#fff', fontWeight: 600 }}>
                    {shop.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Col 5: Store Location & Maps Preview */}
          <div>
            <h4 className="footer-col-title">Physical Boutique</h4>
            <div className="footer-store-card">
              <div style={{ display: 'flex', gap: '0.6rem' }}>
                <MapPin size={20} color="var(--accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <p style={{ fontSize: '0.85rem', color: '#d0d2d8', margin: 0, lineHeight: 1.4 }}>
                  {shop.address || 'Plot 42, Haute Couture Boulevard, Park Street, Kolkata'}
                </p>
              </div>

              {shop.embed_maps_url ? (
                <iframe
                  title="Store Location Map Preview"
                  src={shop.embed_maps_url}
                  className="footer-map-preview"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <div style={{ height: '90px', background: '#222', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#777', fontSize: '0.8rem' }}>
                  Interactive Google Map
                </div>
              )}

              <div className="footer-store-actions">
                <a
                  href={getDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-accent btn-sm"
                  style={{ flex: 1, fontSize: '0.8rem' }}
                >
                  <Navigation size={14} />
                  <span>Get Directions</span>
                </a>
                <a
                  href={generalWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp btn-sm"
                  style={{ padding: '0.5rem 0.75rem' }}
                  title="WhatsApp Concierge"
                >
                  <MessageCircle size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} {shop.name || 'STYLE ZONE'}. All Rights Reserved. Luxury Digital Catalogue.</p>
          <p style={{ color: '#6d6d78', fontSize: '0.78rem' }}>
            Flagship Store Experience & WhatsApp Ordering
          </p>
        </div>
      </div>
    </footer>
  );
}
