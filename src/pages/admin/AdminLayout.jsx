import React, { useState } from 'react';
import { NavLink, Link, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingBag,
  FolderTree,
  Sparkles,
  Home as HomeIcon,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Store,
  ShieldCheck,
  MessageCircle,
  Image as ImageIcon,
  Phone
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useShop } from '../../context/ShopContext';

export function AdminLayout() {
  const { user, logout } = useAuth();
  const { shop } = useShop();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={18} /> },
    { name: 'Products', path: '/admin/products', icon: <ShoppingBag size={18} /> },
    { name: 'Categories', path: '/admin/categories', icon: <FolderTree size={18} /> },
    { name: 'Collections', path: '/admin/collections', icon: <Sparkles size={18} /> },
    { name: 'Customer Enquiries', path: '/admin/enquiries', icon: <MessageCircle size={18} /> },
    { name: 'Homepage Content', path: '/admin/homepage', icon: <HomeIcon size={18} /> },
    { name: 'Media Library', path: '/admin/media', icon: <ImageIcon size={18} /> },
    { name: 'Store Settings', path: '/admin/settings', icon: <Settings size={18} /> },
    { name: 'WhatsApp Hotline', path: '/admin/whatsapp', icon: <Phone size={18} /> },
    { name: 'Admin Profile', path: '/admin/profile', icon: <ShieldCheck size={18} /> }
  ];

  return (
    <div className="admin-layout">
      {/* Desktop Admin Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '0.05em' }}>
                {shop.name || 'STYLE ZONE'}
              </span>
              <span className="admin-brand-tag">CMS</span>
            </div>
            <p style={{ fontSize: '0.72rem', color: '#71788e', marginTop: '2px' }}>
              Store Management Console
            </p>
          </div>
        </div>

        <nav className="admin-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/admin'}
              className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'var(--accent)',
                color: '#000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '0.8rem'
              }}
            >
              {user?.email ? user.email.charAt(0).toUpperCase() : 'A'}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <p style={{ fontSize: '0.82rem', fontWeight: 600, color: '#fff', margin: 0, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                {user?.email || 'Admin'}
              </p>
              <span style={{ fontSize: '0.7rem', color: '#71788e' }}>Authenticated</span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            title="Log out"
            style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <LogOut size={16} />
          </button>
        </div>
      </aside>

      {/* Main Admin Area */}
      <div className="admin-main">
        {/* Topbar */}
        <header className="admin-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              className="mobile-menu-trigger"
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              {isMobileNavOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            <span className="admin-topbar-title">Boutique Control Center</span>
          </div>

          <div className="admin-topbar-actions">
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-sm"
              style={{ display: 'inline-flex', gap: '0.4rem' }}
            >
              <span>View Live Store</span>
              <ExternalLink size={14} />
            </Link>
          </div>
        </header>

        {/* Mobile Nav Dropdown if opened */}
        {isMobileNavOpen && (
          <div style={{ background: '#0f1117', padding: '1rem', borderBottom: '1px solid #222' }}>
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/admin'}
                onClick={() => setIsMobileNavOpen(false)}
                className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
                style={{ marginBottom: '0.4rem' }}
              >
                {item.icon}
                <span>{item.name}</span>
              </NavLink>
            ))}
            <button
              onClick={handleLogout}
              className="btn btn-outline btn-sm btn-block"
              style={{ marginTop: '1rem', color: '#ef4444', borderColor: '#ef4444' }}
            >
              <LogOut size={14} />
              <span>Log out</span>
            </button>
          </div>
        )}

        {/* Content View */}
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
