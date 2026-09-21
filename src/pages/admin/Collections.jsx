import React, { useState } from 'react';
import { Plus, Edit, Trash2, Sparkles, Check, Image as ImageIcon } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { slugify } from '../../lib/formatters';

export function Collections() {
  const { collections, products, addCollection, updateCollection, deleteCollection } = useShop();
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);

  const [colForm, setColForm] = useState({
    name: '',
    slug: '',
    badge_tag: '',
    description: '',
    image_url: '',
    product_ids: [],
    is_visible: true
  });

  const handleOpenAdd = () => {
    setIsEditing(true);
    setCurrentEditId(null);
    setColForm({
      name: '',
      slug: '',
      badge_tag: 'EXCLUSIVE EDIT',
      description: '',
      image_url: '',
      product_ids: [],
      is_visible: true
    });
  };

  const handleOpenEdit = (col) => {
    setIsEditing(true);
    setCurrentEditId(col.id);
    setColForm({
      name: col.name,
      slug: col.slug,
      badge_tag: col.badge_tag || '',
      description: col.description || '',
      image_url: col.image_url || '',
      product_ids: col.product_ids || [],
      is_visible: col.is_visible !== false
    });
  };

  const handleToggleProductInCol = (productId) => {
    setColForm((prev) => {
      const current = prev.product_ids || [];
      const updated = current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId];
      return { ...prev, product_ids: updated };
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    const payload = {
      ...colForm,
      slug: colForm.slug || slugify(colForm.name)
    };

    if (currentEditId) {
      updateCollection(currentEditId, payload);
    } else {
      addCollection(payload);
    }

    setIsEditing(false);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete collection "${name}"?`)) {
      deleteCollection(id);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Curated Collections</h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
            Group garments into seasonal lookbooks, wedding edits and featured campaigns.
          </p>
        </div>

        <button onClick={handleOpenAdd} className="btn btn-primary">
          <Plus size={16} />
          <span>+ Create Collection</span>
        </button>
      </div>

      {/* Collections Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        {collections.map((col) => {
          const assignedCount = col.product_ids?.length || 0;
          return (
            <div key={col.id} className="admin-card" style={{ marginBottom: 0 }}>
              <div style={{ position: 'relative', height: '160px', background: '#0f0f11', overflow: 'hidden' }}>
                <img
                  src={col.image_url || 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800'}
                  alt=""
                  style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
                />
                {col.badge_tag && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '0.75rem',
                      left: '0.75rem',
                      background: 'var(--accent)',
                      color: '#000',
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      padding: '0.2rem 0.6rem',
                      borderRadius: '4px'
                    }}
                  >
                    {col.badge_tag}
                  </span>
                )}
                <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', display: 'flex', gap: '0.4rem' }}>
                  <button onClick={() => handleOpenEdit(col)} className="admin-image-btn" style={{ background: '#fff', color: '#000' }}>
                    <Edit size={14} />
                  </button>
                  <button onClick={() => handleDelete(col.id, col.name)} className="admin-image-btn">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <div className="admin-card-body">
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.4rem' }}>{col.name}</h3>
                <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.4, marginBottom: '1rem' }}>
                  {col.description}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: '0.75rem' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--primary)' }}>
                    {assignedCount} Assigned Garments
                  </span>
                  <span className={`badge ${col.is_visible !== false ? 'badge-stock-in' : 'badge-dark'}`}>
                    {col.is_visible !== false ? 'Visible' : 'Hidden'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Add/Edit Collection */}
      {isEditing && (
        <div className="modal-overlay" onClick={() => setIsEditing(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '750px', padding: '2rem' }}>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '1.5rem' }}>
              {currentEditId ? 'Edit Collection' : 'Create New Collection'}
            </h2>

            <form onSubmit={handleSave}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Collection Name *</label>
                  <input
                    type="text"
                    required
                    value={colForm.name}
                    onChange={(e) => setColForm({ ...colForm, name: e.target.value, slug: slugify(e.target.value) })}
                    placeholder="e.g. Royal Heritage Wedding Edit"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Badge Tag</label>
                  <input
                    type="text"
                    value={colForm.badge_tag}
                    onChange={(e) => setColForm({ ...colForm, badge_tag: e.target.value })}
                    placeholder="e.g. BRIDAL & GROOM, JUST IN"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Banner Image URL</label>
                <input
                  type="url"
                  value={colForm.image_url}
                  onChange={(e) => setColForm({ ...colForm, image_url: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Collection Description</label>
                <textarea
                  rows={2}
                  value={colForm.description}
                  onChange={(e) => setColForm({ ...colForm, description: e.target.value })}
                  placeholder="Short tagline explaining this curated look..."
                  className="form-textarea"
                />
              </div>

              {/* Assign Products Picker */}
              <div className="form-group">
                <label className="form-label">
                  Assign Products to this Collection ({colForm.product_ids.length} selected)
                </label>
                <div style={{ maxHeight: '220px', overflowY: 'auto', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '0.75rem', background: '#fafafa' }}>
                  {products.map((p) => {
                    const isChecked = colForm.product_ids.includes(p.id);
                    return (
                      <label
                        key={p.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          padding: '0.4rem 0.5rem',
                          borderRadius: '4px',
                          background: isChecked ? '#e2e8f0' : 'transparent',
                          cursor: 'pointer',
                          marginBottom: '2px'
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleProductInCol(p.id)}
                        />
                        <span style={{ fontSize: '0.85rem', fontWeight: isChecked ? 600 : 400 }}>
                          [{p.department.toUpperCase()}] {p.name} — ₹{p.price}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button type="button" onClick={() => setIsEditing(false)} className="btn btn-outline">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Collection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
