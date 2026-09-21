import React, { useState } from 'react';
import { MessageCircle, Save, Check, Send, Sparkles, Phone, ExternalLink } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { buildGeneralWhatsAppUrl } from '../../lib/whatsapp';

export function WhatsAppSettings() {
  const { shop, updateShopSettings } = useShop();

  const [whatsappNumber, setWhatsappNumber] = useState(shop.whatsapp || '919830012345');
  const [greetingMessage, setGreetingMessage] = useState(
    shop.whatsapp_greeting || 'Hello Style Zone Boutique! I would like to enquire about your latest couture collections and in-store fitting availability.'
  );
  const [enableFloatingWidget, setEnableFloatingWidget] = useState(
    shop.enable_floating_whatsapp !== false
  );
  const [widgetTooltip, setWidgetTooltip] = useState(
    shop.whatsapp_tooltip || 'Chat with Stylist'
  );
  const [saved, setSaved] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    await updateShopSettings({
      whatsapp: whatsappNumber.replace(/[^0-9]/g, ''),
      whatsapp_greeting: greetingMessage,
      enable_floating_whatsapp: enableFloatingWidget,
      whatsapp_tooltip: widgetTooltip
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const testUrl = buildGeneralWhatsAppUrl({
    whatsappNumber,
    message: greetingMessage
  });

  return (
    <div style={{ maxWidth: '850px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>WhatsApp Conversion Desk</h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
            Configure the boutique WhatsApp enquiry hotline, automated greeting templates, and interactive triggers.
          </p>
        </div>

        <button onClick={handleSave} className="btn btn-primary">
          <Save size={16} />
          <span>Save WhatsApp Config</span>
        </button>
      </div>

      {saved && (
        <div className="toast" style={{ position: 'fixed', top: '2rem', right: '2rem', zIndex: 100 }}>
          <Check size={18} color="#25d366" />
          <span>WhatsApp settings updated successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave}>
        {/* Card 1: WhatsApp Hotline Number */}
        <div className="admin-card">
          <div className="admin-card-header" style={{ background: 'var(--whatsapp-bg)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#15803d' }}>
              <MessageCircle size={20} />
              <span className="admin-card-title" style={{ color: '#15803d' }}>
                Primary WhatsApp Boutique Number (CRITICAL)
              </span>
            </div>
          </div>
          <div className="admin-card-body">
            <div className="form-group">
              <label className="form-label">
                WhatsApp Number (Include Country Code, digits only without + or spaces) *
              </label>
              <input
                type="text"
                required
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                placeholder="919830012345 (e.g. 91 for India + 10 digits mobile)"
                className="form-input"
                style={{ fontSize: '1.1rem', fontWeight: 700, borderColor: '#86efac', maxWidth: '400px' }}
              />
              <div className="form-hint">
                All customer enquiry buttons across the website (Header, Product Cards, Product Pages, Footer, and Floating Widget) automatically direct messages to this phone number.
              </div>
            </div>

            <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <a
                href={testUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-sm"
              >
                <Send size={14} />
                <span>Test WhatsApp Link in New Tab</span>
              </a>
              <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                Click to verify that WhatsApp web/app opens with your phone number correctly.
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: General Greeting Message Template */}
        <div className="admin-card">
          <div className="admin-card-header">
            <span className="admin-card-title">Default General Enquiries Template</span>
          </div>
          <div className="admin-card-body">
            <div className="form-group">
              <label className="form-label">Pre-filled Message for Header, Contact & Floating CTA</label>
              <textarea
                rows={3}
                value={greetingMessage}
                onChange={(e) => setGreetingMessage(e.target.value)}
                className="form-textarea"
                placeholder="Hello Style Zone Boutique! I would like to enquire about your..."
              />
              <div className="form-hint">
                This text will be pre-filled automatically when a customer clicks any general WhatsApp button.
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Floating WhatsApp Widget */}
        <div className="admin-card">
          <div className="admin-card-header">
            <span className="admin-card-title">Floating WhatsApp Widget Settings</span>
          </div>
          <div className="admin-card-body">
            <div style={{ marginBottom: '1.25rem' }}>
              <label className="switch-label">
                <input
                  type="checkbox"
                  checked={enableFloatingWidget}
                  onChange={(e) => setEnableFloatingWidget(e.target.checked)}
                  className="switch-input"
                />
                <div className="switch-track">
                  <div className="switch-thumb" />
                </div>
                <div>
                  <strong>Enable Sticky Floating WhatsApp Button</strong>
                  <div className="form-hint">Shows a persistent green WhatsApp icon in the bottom-right corner.</div>
                </div>
              </label>
            </div>

            <div className="form-group" style={{ maxWidth: '350px' }}>
              <label className="form-label">Hover Tooltip Text</label>
              <input
                type="text"
                value={widgetTooltip}
                onChange={(e) => setWidgetTooltip(e.target.value)}
                placeholder="Chat with Stylist"
                className="form-input"
              />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '4rem' }}>
          <button type="submit" className="btn btn-primary btn-lg">
            <Save size={18} />
            <span>Save All WhatsApp Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}
