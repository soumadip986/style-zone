import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Search, MessageCircle, Menu, X, Sparkles } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { useLogoTap } from '../../hooks/useLogoTap';
import { buildGeneralWhatsAppUrl } from '../../lib/whatsapp';
import { MobileMenu } from '../navigation/MobileMenu';

export function Header() {
  const { shop } = useShop();
  const { handleLogoTap, tapCount } = useLogoTap();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const generalWhatsAppUrl = buildGeneralWhatsAppUrl({
    whatsappNumber: shop.whatsapp,
    message: `Hello ${shop.name}! I would like to enquire about your fashion collections and visiting your boutique.`
  });

  const departments = [
    { name: 'Kids', path: '/department/kids' },
    { name: 'Boys', path: '/department/boys' },
    { name: 'Girls', path: '/department/girls' },
    { name: 'Men', path: '/department/men' },
    { name: 'Women', path: '/department/women' }
  ];

  return (
    <>
      {/* Top Luxury Announcement Bar */}
      <div className="announcement-bar">
        <span>
          ✨ <span className="announcement-highlight">STYLE ZONE BOUTIQUE</span> — Visit our store or enquire via WhatsApp for custom tailoring & fitting.
        </span>
      </div>

      {/* Main Luxury Header */}
      <header className="main-header">
        <div className="container header-container">
          {/* Logo with 7-Tap Hidden Admin Entry */}
          <div
            className="brand-logo-btn"
            onClick={handleLogoTap}
            title={tapCount > 0 ? `Tap ${tapCount}/7 for admin login` : shop.name}
          >
            <div>
              <span className="brand-logo-title">{shop.name || 'STYLE ZONE'}</span>
              <span className="brand-logo-subtitle">HAUTE COUTURE</span>
            </div>
            {tapCount > 3 && (
              <span style={{ fontSize: '0.65rem', color: '#c59d5f', fontWeight: 'bold' }}>
                ({tapCount}/7)
              </span>
            )}
          </div>

          {/* Desktop 5-Department Navigation */}
          <nav className="desktop-nav" aria-label="Primary Navigation">
            {departments.map((dept) => (
              <NavLink
                key={dept.name}
                to={dept.path}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                {dept.name}
              </NavLink>
            ))}
            <NavLink
              to="/collections"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Collections
            </NavLink>
          </nav>

          {/* Header Action Tools */}
          <div className="header-actions">
            {/* Search Button */}
            <button
              className="header-icon-btn"
              onClick={() => navigate('/search')}
              aria-label="Search Catalog"
              title="Search catalogue"
            >
              <Search size={18} />
            </button>

            {/* Direct WhatsApp Concierge CTA */}
            <a
              href={generalWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="header-whatsapp-btn"
              title="Contact on WhatsApp"
            >
              <MessageCircle size={18} />
              <span>WhatsApp</span>
            </a>

            {/* Mobile Hamburger Menu Trigger */}
            <button
              className="header-icon-btn mobile-menu-trigger"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open Mobile Menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Out Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        departments={departments}
        shop={shop}
        generalWhatsAppUrl={generalWhatsAppUrl}
        onLogoTap={handleLogoTap}
        tapCount={tapCount}
      />
    </>
  );
}
