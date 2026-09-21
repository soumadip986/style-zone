import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  Star,
  Upload,
  Image as ImageIcon,
  Check,
  Sparkles
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { StorageService } from '../../lib/storage';
import { slugify } from '../../lib/formatters';

export function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, categories, ageRanges, addProduct, updateProduct } = useShop();

  const isEditMode = Boolean(id);
  const existingProduct = products.find((p) => p.id === id);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    sku: '',
    brand: 'Style Zone Exclusive',
    department: 'men',
    category_name: '',
    subcategory_name: '',
    age_group: '',
    price: '',
    discount_price: '',
    availability: 'in_stock',
    description: '',
    is_featured: false,
    is_published: true,
    sizes: [
      { name: 'S', available: true },
      { name: 'M', available: true },
      { name: 'L', available: true },
      { name: 'XL', available: true }
    ],
    colours: [
      { name: 'Classic Black', hex: '#111111', available: true },
      { name: 'Pure White', hex: '#ffffff', available: true }
    ],
    attributes_json: {
      fabric: '',
      fit: '',
      pattern: '',
      sleeve: '',
      occasion: '',
      saree_type: ''
    },
    images: []
  });

  const [newImageUrl, setNewImageUrl] = useState('');
  const [newSizeName, setNewSizeName] = useState('');
  const [newColourName, setNewColourName] = useState('');
  const [newColourHex, setNewColourHex] = useState('#000000');
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (isEditMode && existingProduct) {
      setFormData({
        name: existingProduct.name || '',
        slug: existingProduct.slug || '',
        sku: existingProduct.sku || '',
        brand: existingProduct.brand || 'Style Zone Exclusive',
        department: existingProduct.department || 'men',
        category_name: existingProduct.category_name || '',
        subcategory_name: existingProduct.subcategory_name || '',
        age_group: existingProduct.age_group || '',
        price: existingProduct.price || '',
        discount_price: existingProduct.discount_price || '',
        availability: existingProduct.availability || 'in_stock',
        description: existingProduct.description || '',
        is_featured: Boolean(existingProduct.is_featured),
        is_published: existingProduct.is_published !== false,
        sizes: existingProduct.sizes || [],
        colours: existingProduct.colours || [],
        attributes_json: existingProduct.attributes_json || {},
        images: existingProduct.images || []
      });
    }
  }, [isEditMode, existingProduct]);

  // Dynamic categories for selected department
  const deptCategories = categories.filter(
    (c) => c.department === formData.department && c.is_visible !== false
  );

  const selectedCategoryObj = deptCategories.find(
    (c) => c.name === formData.category_name
  );

  const subcategoryOptions = selectedCategoryObj?.subcategories || [];

  const handleNameChange = (e) => {
    const val = e.target.value;
    setFormData((prev) => ({
      ...prev,
      name: val,
      slug: isEditMode ? prev.slug : slugify(val)
    }));
  };

  const handleDepartmentChange = (e) => {
    const newDept = e.target.value;
    const defaultCats = categories.filter((c) => c.department === newDept);
    setFormData((prev) => ({
      ...prev,
      department: newDept,
      category_name: defaultCats[0]?.name || '',
      subcategory_name: ''
    }));
  };

  const [isUploading, setIsUploading] = useState(false);

  // Image actions
  const handleAddImage = (e) => {
    e.preventDefault();
    if (!newImageUrl.trim()) return;
    const isFirst = formData.images.length === 0;
    const newImg = {
      id: `img-${Date.now()}`,
      image_url: newImageUrl.trim(),
      alt_text: formData.name || 'Garment Photo',
      is_primary: isFirst
    };
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, newImg]
    }));
    setNewImageUrl('');
  };

  const handleSetPrimaryImage = (imgId) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.map((img) => ({
        ...img,
        is_primary: img.id === imgId
      }))
    }));
  };

  const handleRemoveImage = (imgId) => {
    setFormData((prev) => {
      const remaining = prev.images.filter((img) => img.id !== imgId);
      if (remaining.length > 0 && !remaining.some((img) => img.is_primary)) {
        remaining[0].is_primary = true;
      }
      return { ...prev, images: remaining };
    });
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setIsUploading(true);
    try {
      const uploadPromises = files.map(async (file, idx) => {
        const result = await StorageService.uploadFile(file, 'product-images');
        return {
          id: `img-${Date.now()}-${idx}`,
          image_url: result.url,
          storage_path: result.path || '',
          alt_text: file.name,
          is_primary: formData.images.length === 0 && idx === 0
        };
      });

      const uploadedImages = await Promise.all(uploadPromises);
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...uploadedImages]
      }));
    } catch (err) {
      console.warn('Image upload error:', err);
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  // Size actions
  const handleAddSize = () => {
    if (!newSizeName.trim()) return;
    if (formData.sizes.some((s) => s.name.toLowerCase() === newSizeName.trim().toLowerCase())) return;
    setFormData((prev) => ({
      ...prev,
      sizes: [...prev.sizes, { name: newSizeName.trim(), available: true }]
    }));
    setNewSizeName('');
  };

  const handleToggleSizeAvail = (sizeName) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.map((s) => (s.name === sizeName ? { ...s, available: !s.available } : s))
    }));
  };

  const handleRemoveSize = (sizeName) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.filter((s) => s.name !== sizeName)
    }));
  };

  // Colour actions
  const handleAddColour = () => {
    if (!newColourName.trim()) return;
    setFormData((prev) => ({
      ...prev,
      colours: [
        ...prev.colours,
        { name: newColourName.trim(), hex: newColourHex, available: true }
      ]
    }));
    setNewColourName('');
    setNewColourHex('#000000');
  };

  const handleRemoveColour = (colourName) => {
    setFormData((prev) => ({
      ...prev,
      colours: prev.colours.filter((c) => c.name !== colourName)
    }));
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const productPayload = {
      ...formData,
      price: Number(formData.price),
      discount_price: formData.discount_price ? Number(formData.discount_price) : null
    };

    if (isEditMode) {
      await updateProduct(id, productPayload);
    } else {
      await addProduct(productPayload);
    }

    setSaveSuccess(true);
    setTimeout(() => {
      navigate('/admin/products');
    }, 800);
  };

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link to="/admin/products" className="btn btn-outline btn-sm">
            <ArrowLeft size={16} />
            <span>Back to Products</span>
          </Link>
          <h1 style={{ fontSize: '1.6rem', margin: 0 }}>
            {isEditMode ? `Edit: ${formData.name || 'Product'}` : 'Create New Garment Item'}
          </h1>
        </div>

        <button onClick={handleSubmit} className="btn btn-primary" type="button">
          <Save size={16} />
          <span>Save Garment</span>
        </button>
      </div>

      {saveSuccess && (
        <div className="toast" style={{ position: 'fixed', top: '2rem', right: '2rem', zIndex: 100 }}>
          <Check size={18} color="#25d366" />
          <span>Product saved successfully!</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Card 1: Core Department & Category */}
        <div className="admin-card">
          <div className="admin-card-header">
            <span className="admin-card-title">1. Department & Classification</span>
          </div>
          <div className="admin-card-body">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Shopping Department *</label>
                <select
                  value={formData.department}
                  onChange={handleDepartmentChange}
                  className="form-select"
                  required
                >
                  <option value="kids">Kids (0–16Y)</option>
                  <option value="boys">Boys</option>
                  <option value="girls">Girls</option>
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Category *</label>
                <select
                  value={formData.category_name}
                  onChange={(e) => setFormData({ ...formData, category_name: e.target.value })}
                  className="form-select"
                  required
                >
                  <option value="">Select Category</option>
                  {deptCategories.map((c) => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Subcategory / Style</label>
                <input
                  type="text"
                  list="subcat-list"
                  value={formData.subcategory_name}
                  onChange={(e) => setFormData({ ...formData, subcategory_name: e.target.value })}
                  placeholder="e.g. Linen Shirts, Kanchipuram, Checks"
                  className="form-input"
                />
                <datalist id="subcat-list">
                  {subcategoryOptions.map((sub) => (
                    <option key={sub} value={sub} />
                  ))}
                </datalist>
              </div>

              {formData.department === 'kids' && (
                <div className="form-group">
                  <label className="form-label">Kids Age Group</label>
                  <select
                    value={formData.age_group}
                    onChange={(e) => setFormData({ ...formData, age_group: e.target.value })}
                    className="form-select"
                  >
                    <option value="">Select Age Group</option>
                    {ageRanges.map((age) => (
                      <option key={age} value={age}>{age}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Card 2: Basic Info & Pricing */}
        <div className="admin-card">
          <div className="admin-card-header">
            <span className="admin-card-title">2. Product Details & Pricing</span>
          </div>
          <div className="admin-card-body">
            <div className="form-group">
              <label className="form-label">Product Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={handleNameChange}
                placeholder="e.g. Heritage Pure Linen Solid Shirt"
                className="form-input"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Slug (URL friendly)</label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">SKU / Item Code</label>
                <input
                  type="text"
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  placeholder="e.g. SZ-M-SH-001"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Brand Label</label>
                <input
                  type="text"
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  placeholder="e.g. Style Zone Exclusive"
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Regular Price (₹) *</label>
                <input
                  type="number"
                  required
                  min="0"
                  step="1"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="2499"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Discounted / Offer Price (₹)</label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={formData.discount_price}
                  onChange={(e) => setFormData({ ...formData, discount_price: e.target.value })}
                  placeholder="1999 (Optional)"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Availability Status</label>
                <select
                  value={formData.availability}
                  onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                  className="form-select"
                >
                  <option value="in_stock">In Stock at Boutique</option>
                  <option value="low_stock">Low Stock</option>
                  <option value="out_of_stock">Out of Stock</option>
                  <option value="made_to_order">Made to Order / Bespoke</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Product Description</label>
              <textarea
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe fabric weave, fitting, occasions, styling tips..."
                className="form-textarea"
              />
            </div>
          </div>
        </div>

        {/* Card 3: Image Gallery & Upload */}
        <div className="admin-card">
          <div className="admin-card-header">
            <span className="admin-card-title">3. Product Photography (Multi-Image)</span>
          </div>
          <div className="admin-card-body">
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
              <input
                type="url"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="Paste Image URL (Unsplash / CDN / Supabase storage)..."
                className="form-input"
                style={{ flex: 1, minWidth: '280px' }}
              />
              <button type="button" onClick={handleAddImage} className="btn btn-outline">
                <Plus size={16} />
                <span>Add Image URL</span>
              </button>

              <label className="btn btn-primary" style={{ cursor: 'pointer' }}>
                <Upload size={16} />
                <span>Upload Files</span>
                <input type="file" multiple accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} />
              </label>
            </div>

            {formData.images.length === 0 ? (
              <div style={{ padding: '2rem', textAlign: 'center', border: '2px dashed #cbd5e1', borderRadius: '8px', color: '#94a3b8' }}>
                <ImageIcon size={32} style={{ margin: '0 auto 0.5rem' }} />
                <p>No photos added yet. Add URLs or upload photos.</p>
              </div>
            ) : (
              <div className="admin-image-grid">
                {formData.images.map((img) => (
                  <div key={img.id} className={`admin-image-card ${img.is_primary ? 'is-primary' : ''}`}>
                    <img src={img.image_url} alt="" />
                    <div className="admin-image-actions">
                      <button
                        type="button"
                        onClick={() => handleSetPrimaryImage(img.id)}
                        className="admin-image-btn"
                        title="Set as Primary cover photo"
                        style={{ color: img.is_primary ? '#d4af37' : '#fff' }}
                      >
                        <Star size={14} fill={img.is_primary ? '#d4af37' : 'none'} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(img.id)}
                        className="admin-image-btn"
                        title="Delete photo"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                    {img.is_primary && (
                      <span className="admin-primary-badge">PRIMARY</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Card 4: Sizes & Colours Management */}
        <div className="admin-card">
          <div className="admin-card-header">
            <span className="admin-card-title">4. Sizes & Colour Variants</span>
          </div>
          <div className="admin-card-body">
            {/* Sizes */}
            <div style={{ marginBottom: '2rem' }}>
              <label className="form-label">Supported Garment Sizes</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '1rem' }}>
                {formData.sizes.map((s) => (
                  <div
                    key={s.name}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      background: s.available ? '#f1f5f9' : '#fee2e2',
                      padding: '0.35rem 0.75rem',
                      borderRadius: '6px',
                      border: '1px solid #cbd5e1'
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={s.available}
                      onChange={() => handleToggleSizeAvail(s.name)}
                      title="Toggle availability for this size"
                    />
                    <strong style={{ fontSize: '0.85rem' }}>{s.name}</strong>
                    <button
                      type="button"
                      onClick={() => handleRemoveSize(s.name)}
                      style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', marginLeft: '4px' }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', maxWidth: '300px' }}>
                <input
                  type="text"
                  value={newSizeName}
                  onChange={(e) => setNewSizeName(e.target.value)}
                  placeholder="e.g. XXL, 38, 0–3M"
                  className="form-input"
                  style={{ height: '36px', fontSize: '0.85rem' }}
                />
                <button type="button" onClick={handleAddSize} className="btn btn-outline btn-sm">
                  + Add Size
                </button>
              </div>
            </div>

            {/* Colours */}
            <div>
              <label className="form-label">Available Colours</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
                {formData.colours.map((c) => (
                  <div
                    key={c.name}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      background: '#f8fafc',
                      padding: '0.4rem 0.75rem',
                      borderRadius: '6px',
                      border: '1px solid #e2e8f0'
                    }}
                  >
                    <span style={{ width: '16px', height: '16px', borderRadius: '50%', background: c.hex, border: '1px solid #999' }} />
                    <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{c.name}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveColour(c.name)}
                      style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', marginLeft: '4px' }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', maxWidth: '450px' }}>
                <input
                  type="text"
                  value={newColourName}
                  onChange={(e) => setNewColourName(e.target.value)}
                  placeholder="Colour name (e.g. Royal Wine)"
                  className="form-input"
                  style={{ height: '36px', fontSize: '0.85rem', flex: 1 }}
                />
                <input
                  type="color"
                  value={newColourHex}
                  onChange={(e) => setNewColourHex(e.target.value)}
                  style={{ width: '40px', height: '36px', padding: 0, border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' }}
                />
                <button type="button" onClick={handleAddColour} className="btn btn-outline btn-sm">
                  + Add Colour
                </button>
              </div>
            </div>

            {/* Size x Colour Variant Matrix */}
            {formData.sizes.length > 0 && formData.colours.length > 0 && (
              <div style={{ marginTop: '2rem', borderTop: '1px dashed #cbd5e1', paddingTop: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <label className="form-label" style={{ margin: 0 }}>
                    Size × Colour Variant Matrix & Stock Allocation
                  </label>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                    Toggle exact availability per variant combination
                  </span>
                </div>

                <div style={{ overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: '6px' }}>
                  <table className="admin-table" style={{ fontSize: '0.82rem' }}>
                    <thead>
                      <tr>
                        <th>Size</th>
                        <th>Colour</th>
                        <th style={{ textAlign: 'center' }}>Variant Availability</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.sizes.flatMap((s) =>
                        formData.colours.map((c) => {
                          const variantKey = `${s.name}-${c.name}`;
                          const currentVariant = (formData.variants || []).find(
                            (v) => v.size === s.name && v.colour === c.name
                          );
                          const isAvail = currentVariant ? currentVariant.available : (s.available && c.available);

                          return (
                            <tr key={variantKey}>
                              <td>
                                <strong>{s.name}</strong>
                              </td>
                              <td>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                  <span style={{ width: '14px', height: '14px', borderRadius: '50%', background: c.hex, border: '1px solid #aaa' }} />
                                  <span>{c.name}</span>
                                </div>
                              </td>
                              <td style={{ textAlign: 'center' }}>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const currentList = formData.variants || [];
                                    const filtered = currentList.filter(v => !(v.size === s.name && v.colour === c.name));
                                    const updatedVariants = [
                                      ...filtered,
                                      { size: s.name, colour: c.name, available: !isAvail }
                                    ];
                                    setFormData({ ...formData, variants: updatedVariants });
                                  }}
                                  className={`badge ${isAvail ? 'badge-stock-in' : 'badge-stock-out'}`}
                                  style={{ cursor: 'pointer', border: 'none', padding: '0.3rem 0.75rem' }}
                                >
                                  {isAvail ? 'In Stock' : 'Out of Stock'}
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Card 5: Fabric & Garment Attributes */}
        <div className="admin-card">
          <div className="admin-card-header">
            <span className="admin-card-title">5. Specifications & Attributes</span>
          </div>
          <div className="admin-card-body">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Fabric / Material</label>
                <input
                  type="text"
                  value={formData.attributes_json.fabric || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      attributes_json: { ...formData.attributes_json, fabric: e.target.value }
                    })
                  }
                  placeholder="e.g. 100% Pure Mulberry Silk, French Flax Linen"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Fit / Cut</label>
                <input
                  type="text"
                  value={formData.attributes_json.fit || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      attributes_json: { ...formData.attributes_json, fit: e.target.value }
                    })
                  }
                  placeholder="e.g. Slim Fit, Wide Leg, Oversized"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Pattern / Weave</label>
                <input
                  type="text"
                  value={formData.attributes_json.pattern || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      attributes_json: { ...formData.attributes_json, pattern: e.target.value }
                    })
                  }
                  placeholder="e.g. Solid, Gold Zari Brocade, Checks"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Occasion</label>
                <input
                  type="text"
                  value={formData.attributes_json.occasion || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      attributes_json: { ...formData.attributes_json, occasion: e.target.value }
                    })
                  }
                  placeholder="e.g. Bridal & Wedding, Resort Casual"
                  className="form-input"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Card 6: Visibility & Publishing Settings */}
        <div className="admin-card">
          <div className="admin-card-header">
            <span className="admin-card-title">6. Publishing & Display Toggles</span>
          </div>
          <div className="admin-card-body" style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
            <label className="switch-label">
              <input
                type="checkbox"
                checked={formData.is_published}
                onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                className="switch-input"
              />
              <div className="switch-track">
                <div className="switch-thumb" />
              </div>
              <div>
                <strong>Published (Live on Website)</strong>
                <div className="form-hint">Item is visible to customers in department catalogue.</div>
              </div>
            </label>

            <label className="switch-label">
              <input
                type="checkbox"
                checked={formData.is_featured}
                onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                className="switch-input"
              />
              <div className="switch-track">
                <div className="switch-thumb" />
              </div>
              <div>
                <strong>Featured on Homepage Spotlight</strong>
                <div className="form-hint">Prominently highlighted on store home screen.</div>
              </div>
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem', marginBottom: '4rem' }}>
          <Link to="/admin/products" className="btn btn-outline">
            Cancel
          </Link>
          <button type="submit" className="btn btn-primary btn-lg">
            <Save size={18} />
            <span>Save & Publish Product</span>
          </button>
        </div>
      </form>
    </div>
  );
}
