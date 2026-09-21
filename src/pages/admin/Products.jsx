import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  PlusCircle,
  Search,
  Edit,
  Copy,
  Trash2,
  ExternalLink,
  Star,
  CheckCircle2,
  XCircle,
  Filter
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { formatCurrency } from '../../lib/formatters';

export function Products() {
  const { products, deleteProduct, duplicateProduct, updateProduct } = useShop();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Department
      if (selectedDept !== 'all' && p.department !== selectedDept) return false;

      // Status
      if (statusFilter === 'published' && p.is_published === false) return false;
      if (statusFilter === 'draft' && p.is_published !== false) return false;
      if (statusFilter === 'featured' && !p.is_featured) return false;
      if (statusFilter === 'out_of_stock' && p.availability !== 'out_of_stock') return false;

      // Search
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        const inName = p.name?.toLowerCase().includes(term);
        const inSku = p.sku?.toLowerCase().includes(term);
        const inCat = p.category_name?.toLowerCase().includes(term);
        if (!inName && !inSku && !inCat) return false;
      }

      return true;
    });
  }, [products, selectedDept, statusFilter, searchTerm]);

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      deleteProduct(id);
    }
  };

  const handleTogglePublish = (p) => {
    updateProduct(p.id, { is_published: !p.is_published });
  };

  const handleToggleFeatured = (p) => {
    updateProduct(p.id, { is_featured: !p.is_featured });
  };

  const departments = [
    { key: 'all', label: 'All' },
    { key: 'kids', label: 'Kids' },
    { key: 'boys', label: 'Boys' },
    { key: 'girls', label: 'Girls' },
    { key: 'men', label: 'Men' },
    { key: 'women', label: 'Women' }
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Products Management</h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
            Manage garment catalogue, pricing, sizes, inventory availability and images.
          </p>
        </div>

        <Link to="/admin/products/new" className="btn btn-primary">
          <PlusCircle size={16} />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
        <div className="admin-card-body" style={{ padding: '1rem 1.25rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Department Tabs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {departments.map((d) => (
              <button
                key={d.key}
                type="button"
                onClick={() => setSelectedDept(d.key)}
                className={`size-pill-btn ${selectedDept === d.key ? 'selected' : ''}`}
                style={{ fontSize: '0.82rem', padding: '0.35rem 0.85rem' }}
              >
                {d.label}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flex: 1, maxWidth: '500px' }}>
            {/* Status Select */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="form-select"
              style={{ padding: '0.5rem', fontSize: '0.85rem', width: 'auto' }}
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Drafts</option>
              <option value="featured">Featured Only</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>

            {/* Search Input */}
            <div style={{ position: 'relative', flex: 1 }}>
              <Search size={16} color="#888" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search name, SKU, category..."
                className="form-input"
                style={{ paddingLeft: '2.25rem', paddingRight: '1rem', height: '38px', fontSize: '0.85rem' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="admin-card">
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product Item</th>
                <th>Department</th>
                <th>Category</th>
                <th>Price / Discount</th>
                <th>Stock Availability</th>
                <th>Featured</th>
                <th>Published</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '3rem', color: '#888' }}>
                    No products match the selected criteria.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => {
                  const thumb = p.images?.[0]?.image_url || 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=100';
                  return (
                    <tr key={p.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                          <img src={thumb} alt="" className="admin-product-row-thumb" />
                          <div>
                            <strong style={{ display: 'block', fontSize: '0.9rem' }}>{p.name}</strong>
                            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                              SKU: {p.sku || 'N/A'} • {p.sizes?.length || 0} sizes • {p.colours?.length || 0} colours
                            </span>
                          </div>
                        </div>
                      </td>
                      <td style={{ textTransform: 'capitalize' }}>
                        <span style={{ background: '#f1f5f9', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.78rem', fontWeight: 600 }}>
                          {p.department}
                        </span>
                      </td>
                      <td>
                        <span style={{ fontSize: '0.85rem' }}>{p.category_name}</span>
                        {p.subcategory_name && (
                          <span style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8' }}>
                            {p.subcategory_name}
                          </span>
                        )}
                      </td>
                      <td>
                        <strong style={{ color: '#0f172a' }}>{formatCurrency(p.discount_price || p.price)}</strong>
                        {p.discount_price && (
                          <div style={{ fontSize: '0.75rem', color: '#94a3b8', textDecoration: 'line-through' }}>
                            {formatCurrency(p.price)}
                          </div>
                        )}
                      </td>
                      <td>
                        <span className={`badge ${p.availability === 'in_stock' ? 'badge-stock-in' : 'badge-stock-out'}`}>
                          {p.availability === 'in_stock' ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </td>
                      <td>
                        <button
                          onClick={() => handleToggleFeatured(p)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: p.is_featured ? '#d4af37' : '#cbd5e1' }}
                          title="Toggle Featured on homepage"
                        >
                          <Star size={18} fill={p.is_featured ? '#d4af37' : 'none'} />
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => handleTogglePublish(p)}
                          className={`badge ${p.is_published !== false ? 'badge-stock-in' : 'badge-dark'}`}
                          style={{ cursor: 'pointer', border: 'none' }}
                          title="Toggle published / draft"
                        >
                          {p.is_published !== false ? 'Live' : 'Draft'}
                        </button>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'flex-end' }}>
                          <Link
                            to={`/product/${p.slug}`}
                            target="_blank"
                            className="btn btn-outline btn-sm"
                            title="Preview customer product page"
                          >
                            <ExternalLink size={14} />
                          </Link>
                          <Link
                            to={`/admin/products/${p.id}/edit`}
                            className="btn btn-outline btn-sm"
                            title="Edit product"
                          >
                            <Edit size={14} />
                          </Link>
                          <button
                            onClick={() => duplicateProduct(p.id)}
                            className="btn btn-outline btn-sm"
                            title="Duplicate product"
                          >
                            <Copy size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(p.id, p.name)}
                            className="btn btn-outline btn-sm"
                            style={{ color: '#ef4444' }}
                            title="Delete product"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
