import React, { useState } from 'react';
import { Plus, Edit, Trash2, Check, FolderPlus, Sparkles, Eye, EyeOff } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { slugify } from '../../lib/formatters';

export function Categories() {
  const { categories, addCategory, updateCategory, deleteCategory } = useShop();
  const [selectedDept, setSelectedDept] = useState('men');
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);

  const [catForm, setCatForm] = useState({
    name: '',
    slug: '',
    department: 'men',
    description: '',
    image_url: '',
    subcategories: '',
    is_visible: true
  });

  const deptCategories = categories.filter((c) => c.department === selectedDept);

  const handleOpenAdd = () => {
    setIsEditing(true);
    setCurrentEditId(null);
    setCatForm({
      name: '',
      slug: '',
      department: selectedDept,
      description: '',
      image_url: '',
      subcategories: '',
      is_visible: true
    });
  };

  const handleOpenEdit = (cat) => {
    setIsEditing(true);
    setCurrentEditId(cat.id);
    setCatForm({
      name: cat.name,
      slug: cat.slug,
      department: cat.department,
      description: cat.description || '',
      image_url: cat.image_url || '',
      subcategories: (cat.subcategories || []).join(', '),
      is_visible: cat.is_visible !== false
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    const subcatsArray = catForm.subcategories
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      ...catForm,
      slug: catForm.slug || slugify(catForm.name),
      subcategories: subcatsArray
    };

    if (currentEditId) {
      updateCategory(currentEditId, payload);
    } else {
      addCategory(payload);
    }

    setIsEditing(false);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete category "${name}"? Products under this category will need re-assignment.`)) {
      deleteCategory(id);
    }
  };

  const departments = ['kids', 'boys', 'girls', 'men', 'women'];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Category & Subcategory Hierarchy</h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
            Configure department classifications, saree styles, shirt cuts and filters dynamically.
          </p>
        </div>

        <button onClick={handleOpenAdd} className="btn btn-primary">
          <FolderPlus size={16} />
          <span>+ Add New Category</span>
        </button>
      </div>

      {/* Department Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {departments.map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => setSelectedDept(d)}
            className={`size-pill-btn ${selectedDept === d ? 'selected' : ''}`}
            style={{ textTransform: 'capitalize', padding: '0.5rem 1.25rem', fontSize: '0.9rem' }}
          >
            {d} ({categories.filter((c) => c.department === d).length})
          </button>
        ))}
      </div>

      {/* Categories Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        {deptCategories.map((cat) => (
          <div key={cat.id} className="admin-card" style={{ marginBottom: 0 }}>
            <div style={{ position: 'relative', height: '140px', background: '#e2e8f0', overflow: 'hidden' }}>
              {cat.image_url && (
                <img src={cat.image_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              )}
              <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', display: 'flex', gap: '0.4rem' }}>
                <button
                  onClick={() => handleOpenEdit(cat)}
                  className="admin-image-btn"
                  style={{ background: 'white', color: '#000' }}
                  title="Edit category"
                >
                  <Edit size={14} />
                </button>
                <button
                  onClick={() => handleDelete(cat.id, cat.name)}
                  className="admin-image-btn"
                  title="Delete category"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            <div className="admin-card-body" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <h3 style={{ fontSize: '1.15rem', margin: 0 }}>{cat.name}</h3>
                <span className={`badge ${cat.is_visible !== false ? 'badge-stock-in' : 'badge-dark'}`}>
                  {cat.is_visible !== false ? 'Visible' : 'Hidden'}
                </span>
              </div>

              <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '1rem', lineHeight: 1.4 }}>
                {cat.description || 'No description provided.'}
              </p>

              <div>
                <strong style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>
                  Subcategories & Styles ({cat.subcategories?.length || 0}):
                </strong>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  {cat.subcategories?.map((sub, i) => (
                    <span
                      key={i}
                      style={{
                        background: '#f1f5f9',
                        fontSize: '0.75rem',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '4px',
                        color: '#334155'
                      }}
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Add/Edit Category */}
      {isEditing && (
        <div className="modal-overlay" onClick={() => setIsEditing(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px', padding: '2rem' }}>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '1.5rem' }}>
              {currentEditId ? 'Edit Category' : 'Add New Category'}
            </h2>

            <form onSubmit={handleSave}>
              <div className="form-group">
                <label className="form-label">Department *</label>
                <select
                  value={catForm.department}
                  onChange={(e) => setCatForm({ ...catForm, department: e.target.value })}
                  className="form-select"
                >
                  <option value="kids">Kids</option>
                  <option value="boys">Boys</option>
                  <option value="girls">Girls</option>
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Category Name *</label>
                <input
                  type="text"
                  required
                  value={catForm.name}
                  onChange={(e) => setCatForm({ ...catForm, name: e.target.value, slug: slugify(e.target.value) })}
                  placeholder="e.g. Sarees, Shirts, Party Wear"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Cover Image URL</label>
                <input
                  type="url"
                  value={catForm.image_url}
                  onChange={(e) => setCatForm({ ...catForm, image_url: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Category Description</label>
                <textarea
                  rows={2}
                  value={catForm.description}
                  onChange={(e) => setCatForm({ ...catForm, description: e.target.value })}
                  className="form-textarea"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Subcategories / Styles (Comma-separated)</label>
                <textarea
                  rows={3}
                  value={catForm.subcategories}
                  onChange={(e) => setCatForm({ ...catForm, subcategories: e.target.value })}
                  placeholder="e.g. Kanchipuram, Banarasi, Cotton, Silk, Georgette"
                  className="form-textarea"
                />
                <div className="form-hint">
                  These subcategories will appear in dynamic filter drawers and product forms.
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button type="button" onClick={() => setIsEditing(false)} className="btn btn-outline">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
