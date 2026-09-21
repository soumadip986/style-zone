import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { X, MessageCircle, MapPin, Phone, Search, ChevronRight } from 'lucide-react';

export function MobileMenu({
  isOpen,
  onClose,
  departments,
  shop,
  generalWhatsAppUrl,
  onLogoTap,
  tapCount
}) {
  if (!isOpen) return null;

  return (
    <div className="mobile-filter-drawer" onClick={onClose} style={{ zIndex: 110 }}>
      <div
        className="mobile-filter-content"
        onClick={(e) => e.stopPropagation()}
        style={{ height: '90vh', background: '#0f0f11', color: '#fff' }}
      >
        {/* Drawer Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid #222',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div onClick={onLogoTap} style={{ cursor: 'pointer' }}>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 'bold' }}>
              {shop.name}
            </span>
            {tapCount > 2 && (
              <span style={{ fontSize: '0.7rem', color: '#c59d5f', marginLeft: '0.5rem' }}>
                ({tapCount}/7)
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            style={{
              background: '#222',
              color: '#fff',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Drawer Body Navigation */}
        <div style={{ padding: '1.5rem', flex: 1, overflowY: 'auto' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <Link
              to="/search"
              onClick={onClose}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                background: '#1c1c22',
                padding: '0.85rem 1rem',
                borderRadius: '8px',
                color: '#aaa',
                fontSize: '0.9rem'
              }}
            >
              <Search size={16} />
              <span>Search products, shirts, sarees...</span>
            </Link>
          </div>

          <p
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#c59d5f',
              marginBottom: '1rem'
            }}
          >
            Shop Departments
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {departments.map((dept) => (
              <NavLink
                key={dept.name}
                to={dept.path}
                onClick={onClose}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.85rem 1rem',
                  borderRadius: '8px',
                  background: isActive ? '#c59d5f' : '#18181f',
                  color: isActive ? '#0f0f11' : '#fff',
                  fontWeight: 600,
                  fontSize: '1.05rem',
                  textDecoration: 'none'
                })}
              >
                <span>{dept.name}</span>
                <ChevronRight size={18} />
              </NavLink>
            ))}
          </div>

          <div style={{ marginTop: '2rem' }}>
            <p
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#c59d5f',
                marginBottom: '0.75rem'
              }}
            >
              Explore & Visit
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <Link
                to="/collections"
                onClick={onClose}
                style={{
                  padding: '0.75rem 1rem',
                  color: '#ccc',
                  fontSize: '0.95rem',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <span>All Collections</span>
                <ChevronRight size={16} />
              </Link>
              <Link
                to="/contact"
                onClick={onClose}
                style={{
                  padding: '0.75rem 1rem',
                  color: '#ccc',
                  fontSize: '0.95rem',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <span>Store Location & Directions</span>
                <MapPin size={16} />
              </Link>
            </div>
          </div>
        </div>

        {/* Drawer Footer Actions */}
        <div style={{ padding: '1.25rem 1.5rem', borderTop: '1px solid #222', background: '#141418' }}>
          <a
            href={generalWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp btn-block"
            style={{ marginBottom: '0.75rem' }}
          >
            <MessageCircle size={18} />
            <span>Chat on WhatsApp</span>
          </a>
          <a
            href={`tel:${shop.phone || '+919830012345'}`}
            className="btn btn-outline btn-block"
            style={{ color: '#fff', borderColor: '#444' }}
          >
            <Phone size={16} />
            <span>Call {shop.phone}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
