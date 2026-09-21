import React, { useState } from 'react';
import { Save, Check, RotateCcw, MessageCircle, MapPin, Store, Sparkles } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export function StoreSettings() {
  const { shop, updateShopSettings, resetToFactoryDefaults } = useShop();

  const [form, setForm] = useState({
    name: shop.name || '',
    tagline: shop.tagline || '',
    description: shop.description || '',
    phone: shop.phone || '',
    whatsapp: shop.whatsapp || '',
    email: shop.email || '',
    address: shop.address || '',
    maps_url: shop.maps_url || '',
    embed_maps_url: shop.embed_maps_url || '',
    latitude: shop.latitude || '',
    longitude: shop.longitude || '',
    opening_hours: shop.opening_hours || {
      weekdays: '10:30 AM – 9:00 PM (Mon – Sat)',
      sunday: '11:00 AM – 8:00 PM (Sunday)'
    },
    social: shop.social || {
      instagram: '',
      facebook: '',
      youtube: ''
    }
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (field, val) => {
    setForm((prev) => ({ ...prev, [field]: val }));
  };

  const handleNestedChange = (parent, field, val) => {
    setForm((prev) => ({
      ...prev,
      [parent]: {
        ...(prev[parent] || {}),
        [field]: val
      }
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    await updateShopSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleResetFactory = () => {
    if (
      window.confirm(
        'Are you sure you want to reset all products, categories, and settings to factory default boutique data? This will replace your local demo changes.'
      )
    ) {
      resetToFactoryDefaults();
      window.location.reload();
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Store Identity & Location Settings</h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
            Configure WhatsApp enquiry number, physical store coordinates, Google Maps, and contact details.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button type="button" onClick={handleResetFactory} className="btn btn-outline btn-sm" style={{ color: '#ef4444' }}>
            <RotateCcw size={14} />
            <span>Reset Demo Data</span>
          </button>
          <button onClick={handleSave} className="btn btn-primary">
            <Save size={16} />
            <span>Save Store Settings</span>
          </button>
        </div>
      </div>

      {saved && (
        <div className="toast" style={{ position: 'fixed', top: '2rem', right: '2rem', zIndex: 100 }}>
          <Check size={18} color="#25d366" />
          <span>Store settings saved successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave}>
        {/* 1. Brand Identity */}
        <div className="admin-card">
          <div className="admin-card-header">
            <span className="admin-card-title">1. Boutique Brand Information</span>
          </div>
          <div className="admin-card-body">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Store Name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Tagline</label>
                <input
                  type="text"
                  value={form.tagline}
                  onChange={(e) => handleChange('tagline', e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Boutique Description (Displayed in Footer & About)</label>
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) => handleChange('description', e.target.value)}
                className="form-textarea"
              />
            </div>
          </div>
        </div>

        {/* 2. Contact & WhatsApp Integration */}
        <div className="admin-card">
          <div className="admin-card-header" style={{ background: '#f0fdf4' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#15803d' }}>
              <MessageCircle size={18} />
              <span className="admin-card-title" style={{ color: '#15803d' }}>
                2. WhatsApp Concierge & Phone Desk (CRITICAL)
              </span>
            </div>
          </div>
          <div className="admin-card-body">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  WhatsApp Number (with Country Code, digits only) *
                </label>
                <input
                  type="text"
                  required
                  value={form.whatsapp}
                  onChange={(e) => handleChange('whatsapp', e.target.value)}
                  placeholder="919830012345 (e.g. 91 for India)"
                  className="form-input"
                  style={{ fontWeight: 700, borderColor: '#86efac' }}
                />
                <div className="form-hint">
                  All catalogue product enquiries and WhatsApp chats will open directly with this number.
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Showroom Phone (Display & Call action)</label>
                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="+91 98300 12345"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Store Support Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="concierge@stylezonefashion.com"
                  className="form-input"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 3. Physical Store Location & Google Maps */}
        <div className="admin-card">
          <div className="admin-card-header">
            <span className="admin-card-title">3. Physical Store Address & Maps</span>
          </div>
          <div className="admin-card-body">
            <div className="form-group">
              <label className="form-label">Full Physical Address *</label>
              <textarea
                rows={2}
                required
                value={form.address}
                onChange={(e) => handleChange('address', e.target.value)}
                placeholder="Plot 42, Haute Couture Boulevard, Park Street, Kolkata, West Bengal 700016"
                className="form-textarea"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Google Maps Direct Navigation URL</label>
                <input
                  type="url"
                  value={form.maps_url}
                  onChange={(e) => handleChange('maps_url', e.target.value)}
                  placeholder="https://maps.google.com/?q=Park+Street+Kolkata"
                  className="form-input"
                />
                <div className="form-hint">Used for the "Get Directions" button.</div>
              </div>

              <div className="form-group">
                <label className="form-label">Embedded Map iframe URL</label>
                <input
                  type="url"
                  value={form.embed_maps_url}
                  onChange={(e) => handleChange('embed_maps_url', e.target.value)}
                  placeholder="https://www.google.com/maps/embed?pb=..."
                  className="form-input"
                />
                <div className="form-hint">Provides live embedded map on homepage & footer.</div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Weekdays Working Hours</label>
                <input
                  type="text"
                  value={form.opening_hours?.weekdays || ''}
                  onChange={(e) => handleNestedChange('opening_hours', 'weekdays', e.target.value)}
                  placeholder="10:30 AM – 9:00 PM (Mon – Sat)"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Sunday Working Hours</label>
                <input
                  type="text"
                  value={form.opening_hours?.sunday || ''}
                  onChange={(e) => handleNestedChange('opening_hours', 'sunday', e.target.value)}
                  placeholder="11:00 AM – 8:00 PM (Sunday)"
                  className="form-input"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 4. Social Media Links */}
        <div className="admin-card">
          <div className="admin-card-header">
            <span className="admin-card-title">4. Social Media Profiles</span>
          </div>
          <div className="admin-card-body">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Instagram Profile URL</label>
                <input
                  type="url"
                  value={form.social?.instagram || ''}
                  onChange={(e) => handleNestedChange('social', 'instagram', e.target.value)}
                  placeholder="https://instagram.com/..."
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Facebook Page URL</label>
                <input
                  type="url"
                  value={form.social?.facebook || ''}
                  onChange={(e) => handleNestedChange('social', 'facebook', e.target.value)}
                  placeholder="https://facebook.com/..."
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">YouTube Channel URL</label>
                <input
                  type="url"
                  value={form.social?.youtube || ''}
                  onChange={(e) => handleNestedChange('social', 'youtube', e.target.value)}
                  placeholder="https://youtube.com/@..."
                  className="form-input"
                />
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginBottom: '4rem' }}>
          <button type="submit" className="btn btn-primary btn-lg">
            <Save size={18} />
            <span>Save Store Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}
