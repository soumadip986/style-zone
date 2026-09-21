import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { MessageCircle } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { buildGeneralWhatsAppUrl } from '../../lib/whatsapp';

export function Layout({ children }) {
  const { shop } = useShop();

  const floatingWhatsAppUrl = buildGeneralWhatsAppUrl({
    whatsappNumber: shop.whatsapp,
    message: `Hello ${shop.name}! I am browsing your online catalogue and would like some assistance.`
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />

      {/* Persistent Floating WhatsApp Concierge Button */}
      <a
        href={floatingWhatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp"
        aria-label="Enquire on WhatsApp"
      >
        <MessageCircle size={28} />
        <span className="floating-whatsapp-tooltip">Chat with Stylist</span>
      </a>
    </div>
  );
}
