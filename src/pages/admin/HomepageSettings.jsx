import React, { useState } from 'react';
import { Save, Check, Sparkles, Image as ImageIcon } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export function HomepageSettings() {
  const { shop, updateShopSettings } = useShop();
  const [homepageData, setHomepageData] = useState(shop.homepage || {});
  const [saved, setSaved] = useState(false);

  const handleHeroChange = (field, val) => {
    setHomepageData((prev) => ({
      ...prev,
      hero: {
        ...(prev.hero || {}),
        [field]: val
      }
    }));
  };

  const handlePromoChange = (field, val) => {
    setHomepageData((prev) => ({
      ...prev,
      promo: {
        ...(prev.promo || {}),
        [field]: val
      }
    }));
  };

  const handleWhyUsChange = (index, field, val) => {
    setHomepageData((prev) => {
      const whyUsList = [...(prev.why_us || [])];
      if (whyUsList[index]) {
        whyUsList[index] = { ...whyUsList[index], [field]: val };
      }
      return { ...prev, why_us: whyUsList };
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    await updateShopSettings({ homepage: homepageData });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const hero = homepageData.hero || {};
  const promo = homepageData.promo || {};
  const whyUs = homepageData.why_us || [];

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Homepage Visual Content</h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
            Customize Hero banners, seasonal campaigns, and boutique trust highlights.
          </p>
        </div>

        <button onClick={handleSave} className="btn btn-primary">
          <Save size={16} />
          <span>Save Homepage Content</span>
        </button>
      </div>

      {saved && (
        <div className="toast" style={{ position: 'fixed', top: '2rem', right: '2rem', zIndex: 100 }}>
          <Check size={18} color="#25d366" />
          <span>Homepage content updated successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave}>
        {/* Section 1: Hero Banner */}
        <div className="admin-card">
          <div className="admin-card-header">
            <span className="admin-card-title">1. Luxury Hero Banner</span>
          </div>
          <div className="admin-card-body">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Seasonal Tag / Badge</label>
                <input
                  type="text"
                  value={hero.badge || ''}
                  onChange={(e) => handleHeroChange('badge', e.target.value)}
                  placeholder="e.g. NEW SEASON 2026"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Hero Headline *</label>
                <input
                  type="text"
                  required
                  value={hero.heading || ''}
                  onChange={(e) => handleHeroChange('heading', e.target.value)}
                  placeholder="e.g. STYLE FOR EVERY STORY"
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Hero Subtitle</label>
              <textarea
                rows={2}
                value={hero.subheading || ''}
                onChange={(e) => handleHeroChange('subheading', e.target.value)}
                placeholder="Discover our latest festive silks, bespoke menswear..."
                className="form-textarea"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Primary Button Text</label>
                <input
                  type="text"
                  value={hero.cta_text || ''}
                  onChange={(e) => handleHeroChange('cta_text', e.target.value)}
                  placeholder="Explore Collection"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Primary Button Target Link</label>
                <input
                  type="text"
                  value={hero.cta_link || ''}
                  onChange={(e) => handleHeroChange('cta_link', e.target.value)}
                  placeholder="/department/men"
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Hero Background Image URL</label>
              <input
                type="url"
                value={hero.image_url || ''}
                onChange={(e) => handleHeroChange('image_url', e.target.value)}
                placeholder="https://images.unsplash.com/photo-..."
                className="form-input"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Promotional Campaign Banner */}
        <div className="admin-card">
          <div className="admin-card-header">
            <span className="admin-card-title">2. Seasonal Campaign Banner</span>
          </div>
          <div className="admin-card-body">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Campaign Tag</label>
                <input
                  type="text"
                  value={promo.tag || ''}
                  onChange={(e) => handlePromoChange('tag', e.target.value)}
                  placeholder="e.g. LIMITED FESTIVE EDIT"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Campaign Title</label>
                <input
                  type="text"
                  value={promo.title || ''}
                  onChange={(e) => handlePromoChange('title', e.target.value)}
                  placeholder="Royal Heritage Sarees & Artisanal Kurtas"
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Campaign Description</label>
              <textarea
                rows={2}
                value={promo.description || ''}
                onChange={(e) => handlePromoChange('description', e.target.value)}
                className="form-textarea"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Button Text</label>
                <input
                  type="text"
                  value={promo.button_text || ''}
                  onChange={(e) => handlePromoChange('button_text', e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Campaign Background Image URL</label>
                <input
                  type="url"
                  value={promo.image_url || ''}
                  onChange={(e) => handlePromoChange('image_url', e.target.value)}
                  className="form-input"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Why Shop With Us Feature Cards */}
        <div className="admin-card">
          <div className="admin-card-header">
            <span className="admin-card-title">3. Boutique Standards & Trust USPs</span>
          </div>
          <div className="admin-card-body">
            {whyUs.map((item, idx) => (
              <div key={idx} style={{ padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '8px', marginBottom: '1rem', background: '#f8fafc' }}>
                <div className="form-row">
                  <div className="form-group" style={{ marginBottom: '0.5rem' }}>
                    <label className="form-label">Feature {idx + 1} Title</label>
                    <input
                      type="text"
                      value={item.title || ''}
                      onChange={(e) => handleWhyUsChange(idx, 'title', e.target.value)}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: '0.5rem' }}>
                    <label className="form-label">Feature Description</label>
                    <input
                      type="text"
                      value={item.description || ''}
                      onChange={(e) => handleWhyUsChange(idx, 'description', e.target.value)}
                      className="form-input"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginBottom: '4rem' }}>
          <button type="submit" className="btn btn-primary btn-lg">
            <Save size={18} />
            <span>Save All Homepage Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}
