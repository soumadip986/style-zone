import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  FolderTree,
  Sparkles,
  EyeOff,
  Star,
  PlusCircle,
  ExternalLink,
  Settings,
  Home as HomeIcon,
  CheckCircle2,
  Copy,
  Edit,
  ArrowRight
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { formatCurrency } from '../../lib/formatters';

export function Dashboard() {
  const { products, categories, collections, duplicateProduct, deleteProduct } = useShop();

  const totalProducts = products.length;
  const publishedProducts = products.filter((p) => p.is_published !== false).length;
  const draftProducts = totalProducts - publishedProducts;
  const featuredProducts = products.filter((p) => p.is_featured).length;
  const unavailableProducts = products.filter((p) => p.availability === 'out_of_stock').length;
  const totalCategories = categories.length;

  const stats = [
    { label: 'Total Products', val: totalProducts, icon: <ShoppingBag size={20} color="#0f172a" /> },
    { label: 'Published & Live', val: publishedProducts, icon: <CheckCircle2 size={20} color="#15803d" /> },
    { label: 'Draft Products', val: draftProducts, icon: <EyeOff size={20} color="#64748b" /> },
    { label: 'Featured on Homepage', val: featuredProducts, icon: <Star size={20} color="#d4af37" /> },
    { label: 'Out of Stock', val: unavailableProducts, icon: <ShoppingBag size={20} color="#b91c1c" /> },
    { label: 'Total Categories', val: totalCategories, icon: <FolderTree size={20} color="#0284c7" /> }
  ];

  const recentProducts = [...products]
    .sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0))
    .slice(0, 5);

  return (
    <div>
      {/* Welcome Banner */}
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Boutique Overview</h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
            Live metrics, catalogue health and quick management shortcuts.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link to="/admin/products/new" className="btn btn-primary btn-sm">
            <PlusCircle size={15} />
            <span>Add New Garment</span>
          </Link>
          <Link to="/" target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
            <ExternalLink size={14} />
            <span>View Front Store</span>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="admin-stats-grid">
        {stats.map((st, idx) => (
          <div key={idx} className="admin-stat-card">
            <div className="admin-stat-header">
              <span>{st.label}</span>
              {st.icon}
            </div>
            <div className="admin-stat-number">{st.val}</div>
          </div>
        ))}
      </div>

      {/* Quick Action Shortcuts Grid */}
      <div className="admin-card">
        <div className="admin-card-header">
          <span className="admin-card-title">Quick Action Hub</span>
        </div>
        <div className="admin-card-body" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <Link to="/admin/products/new" className="btn btn-outline" style={{ justifyContent: 'flex-start', padding: '1rem' }}>
            <PlusCircle size={18} color="var(--accent)" />
            <span>+ Add New Product</span>
          </Link>
          <Link to="/admin/products" className="btn btn-outline" style={{ justifyContent: 'flex-start', padding: '1rem' }}>
            <ShoppingBag size={18} color="#0f172a" />
            <span>Manage Products</span>
          </Link>
          <Link to="/admin/categories" className="btn btn-outline" style={{ justifyContent: 'flex-start', padding: '1rem' }}>
            <FolderTree size={18} color="#0284c7" />
            <span>Manage Categories</span>
          </Link>
          <Link to="/admin/collections" className="btn btn-outline" style={{ justifyContent: 'flex-start', padding: '1rem' }}>
            <Sparkles size={18} color="#d4af37" />
            <span>Manage Collections</span>
          </Link>
          <Link to="/admin/homepage" className="btn btn-outline" style={{ justifyContent: 'flex-start', padding: '1rem' }}>
            <HomeIcon size={18} color="#15803d" />
            <span>Homepage Content</span>
          </Link>
          <Link to="/admin/settings" className="btn btn-outline" style={{ justifyContent: 'flex-start', padding: '1rem' }}>
            <Settings size={18} color="#64748b" />
            <span>Store & WhatsApp Settings</span>
          </Link>
        </div>
      </div>

      {/* Recent Products Table */}
      <div className="admin-card">
        <div className="admin-card-header">
          <span className="admin-card-title">Recently Added Items</span>
          <Link to="/admin/products" style={{ fontSize: '0.85rem', color: 'var(--accent)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>View All ({products.length})</span>
            <ArrowRight size={14} />
          </Link>
        </div>
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Department</th>
                <th>Category</th>
                <th>Price</th>
                <th>Availability</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentProducts.map((p) => {
                const thumb = p.images?.[0]?.image_url || 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=100';
                return (
                  <tr key={p.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <img src={thumb} alt="" className="admin-product-row-thumb" />
                        <div>
                          <strong style={{ display: 'block', fontSize: '0.9rem' }}>{p.name}</strong>
                          <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{p.sku || 'No SKU'}</span>
                        </div>
                      </div>
                    </td>
                    <td style={{ textTransform: 'capitalize' }}>{p.department}</td>
                    <td>{p.category_name}</td>
                    <td>
                      <strong>{formatCurrency(p.discount_price || p.price)}</strong>
                      {p.discount_price && (
                        <span style={{ fontSize: '0.75rem', color: '#94a3b8', textDecoration: 'line-through', marginLeft: '4px' }}>
                          {formatCurrency(p.price)}
                        </span>
                      )}
                    </td>
                    <td>
                      <span className={`badge ${p.availability === 'in_stock' ? 'badge-stock-in' : 'badge-stock-out'}`}>
                        {p.availability === 'in_stock' ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${p.is_published !== false ? 'badge-stock-in' : 'badge-dark'}`}>
                        {p.is_published !== false ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                        <Link to={`/admin/products/${p.id}/edit`} className="btn btn-outline btn-sm" title="Edit product">
                          <Edit size={14} />
                        </Link>
                        <button
                          onClick={() => duplicateProduct(p.id)}
                          className="btn btn-outline btn-sm"
                          title="Duplicate item"
                        >
                          <Copy size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
