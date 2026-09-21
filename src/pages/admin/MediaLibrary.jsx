import React, { useState } from 'react';
import { Upload, Image as ImageIcon, Copy, Check, Trash2, Plus, Filter, ExternalLink } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { StorageService } from '../../lib/storage';

export function MediaLibrary() {
  const { products, collections, shop } = useShop();
  const [selectedBucket, setSelectedBucket] = useState('all');
  const [copiedUrl, setCopiedUrl] = useState('');
  const [customMedia, setCustomMedia] = useState(() => {
    try {
      const saved = localStorage.getItem('sz_custom_media');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [];
  });

  const [newMediaUrl, setNewMediaUrl] = useState('');
  const [newMediaTitle, setNewMediaTitle] = useState('');
  const [newMediaBucket, setNewMediaBucket] = useState('product-images');

  // Extract all media from products, collections & homepage
  const allProductMedia = products.flatMap((p) =>
    (p.images || []).map((img, idx) => ({
      id: `prod-img-${p.id}-${idx}`,
      title: `${p.name} - Photo ${idx + 1}`,
      url: img.image_url,
      bucket: 'product-images',
      linked_to: p.name
    }))
  );

  const allCollectionMedia = collections.map((c) => ({
    id: `col-img-${c.id}`,
    title: `${c.name} Lookbook Banner`,
    url: c.image_url,
    bucket: 'collection-images',
    linked_to: c.name
  }));

  const allHomepageMedia = [
    {
      id: 'hp-hero',
      title: 'Homepage Hero Banner',
      url: shop.homepage?.hero?.image_url,
      bucket: 'homepage-assets',
      linked_to: 'Hero Section'
    },
    {
      id: 'hp-promo',
      title: 'Festive Promo Banner',
      url: shop.homepage?.promo?.image_url,
      bucket: 'homepage-assets',
      linked_to: 'Promo Banner'
    }
  ].filter((m) => Boolean(m.url));

  const combinedMedia = [...customMedia, ...allProductMedia, ...allCollectionMedia, ...allHomepageMedia];

  const filteredMedia = combinedMedia.filter((m) => {
    if (selectedBucket === 'all') return true;
    return m.bucket === selectedBucket;
  });

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(''), 2500);
  };

  const handleAddMedia = (e) => {
    e.preventDefault();
    if (!newMediaUrl.trim()) return;

    const newItem = {
      id: `custom-${Date.now()}`,
      title: newMediaTitle || 'Uploaded Asset',
      url: newMediaUrl.trim(),
      bucket: newMediaBucket,
      linked_to: 'Custom Upload'
    };

    const updated = [newItem, ...customMedia];
    setCustomMedia(updated);
    localStorage.setItem('sz_custom_media', JSON.stringify(updated));
    setNewMediaUrl('');
    setNewMediaTitle('');
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    for (const file of files) {
      try {
        const result = await StorageService.uploadFile(file, newMediaBucket);
        const newItem = {
          id: `asset-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          title: file.name,
          url: result.url,
          bucket: newMediaBucket,
          linked_to: 'Storage Asset'
        };
        setCustomMedia((prev) => {
          const next = [newItem, ...prev];
          localStorage.setItem('sz_custom_media', JSON.stringify(next));
          return next;
        });
      } catch (err) {
        console.warn('Storage upload error:', err);
      }
    }
    e.target.value = '';
  };

  const handleDeleteCustomMedia = (id) => {
    const updated = customMedia.filter((m) => m.id !== id);
    setCustomMedia(updated);
    localStorage.setItem('sz_custom_media', JSON.stringify(updated));
  };

  const buckets = [
    { key: 'all', label: 'All Media Assets' },
    { key: 'product-images', label: 'Product Photos' },
    { key: 'collection-images', label: 'Collection Lookbooks' },
    { key: 'homepage-assets', label: 'Homepage Banners' },
    { key: 'store-assets', label: 'Store Assets' }
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Media Library & Storage</h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
            Centralized gallery of garment photography, lookbooks, banners, and Supabase Storage assets.
          </p>
        </div>
      </div>

      {copiedUrl && (
        <div className="toast" style={{ position: 'fixed', top: '2rem', right: '2rem', zIndex: 100 }}>
          <Check size={18} color="#25d366" />
          <span>Image URL copied to clipboard!</span>
        </div>
      )}

      {/* Upload Box */}
      <div className="admin-card" style={{ marginBottom: '2rem' }}>
        <div className="admin-card-header">
          <span className="admin-card-title">+ Upload / Add New Asset</span>
        </div>
        <div className="admin-card-body">
          <form onSubmit={handleAddMedia} style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'flex-end' }}>
            <div style={{ flex: 1, minWidth: '220px' }}>
              <label className="form-label">Asset Title</label>
              <input
                type="text"
                value={newMediaTitle}
                onChange={(e) => setNewMediaTitle(e.target.value)}
                placeholder="e.g. Summer Silk Campaign Banner"
                className="form-input"
              />
            </div>

            <div style={{ width: '180px' }}>
              <label className="form-label">Storage Bucket</label>
              <select
                value={newMediaBucket}
                onChange={(e) => setNewMediaBucket(e.target.value)}
                className="form-select"
              >
                <option value="product-images">product-images</option>
                <option value="collection-images">collection-images</option>
                <option value="homepage-assets">homepage-assets</option>
                <option value="store-assets">store-assets</option>
              </select>
            </div>

            <div style={{ flex: 2, minWidth: '280px' }}>
              <label className="form-label">Asset CDN / Image URL</label>
              <input
                type="url"
                value={newMediaUrl}
                onChange={(e) => setNewMediaUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="form-input"
              />
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button type="submit" className="btn btn-primary">
                <Plus size={16} />
                <span>Add URL</span>
              </button>

              <label className="btn btn-outline" style={{ cursor: 'pointer' }}>
                <Upload size={16} />
                <span>Upload File</span>
                <input type="file" multiple accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} />
              </label>
            </div>
          </form>
        </div>
      </div>

      {/* Bucket Filter Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {buckets.map((b) => (
          <button
            key={b.key}
            type="button"
            onClick={() => setSelectedBucket(b.key)}
            className={`size-pill-btn ${selectedBucket === b.key ? 'selected' : ''}`}
            style={{ fontSize: '0.85rem', padding: '0.45rem 1rem' }}
          >
            {b.label} ({combinedMedia.filter((m) => b.key === 'all' || m.bucket === b.key).length})
          </button>
        ))}
      </div>

      {/* Media Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '4rem' }}>
        {filteredMedia.map((m) => (
          <div key={m.id} className="admin-card" style={{ marginBottom: 0, display: 'flex', flexDirection: 'column' }}>
            <div style={{ position: 'relative', aspectRatio: '4/3', background: '#e2e8f0', overflow: 'hidden' }}>
              <img src={m.url} alt={m.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <button
                onClick={() => handleCopy(m.url)}
                className="admin-image-btn"
                style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', background: 'white', color: '#000' }}
                title="Copy Direct URL"
              >
                <Copy size={13} />
              </button>
              {m.id.startsWith('custom') && (
                <button
                  onClick={() => handleDeleteCustomMedia(m.id)}
                  className="admin-image-btn"
                  style={{ position: 'absolute', top: '0.5rem', left: '0.5rem' }}
                  title="Delete Custom Upload"
                >
                  <Trash2 size={13} />
                </button>
              )}
            </div>

            <div style={{ padding: '0.85rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <strong style={{ display: 'block', fontSize: '0.85rem', color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {m.title}
                </strong>
                <span style={{ fontSize: '0.72rem', color: '#64748b' }}>
                  {m.linked_to} • <span style={{ color: 'var(--accent)', fontWeight: 600 }}>{m.bucket}</span>
                </span>
              </div>

              <button
                onClick={() => handleCopy(m.url)}
                className="btn btn-outline btn-sm btn-block"
                style={{ marginTop: '0.75rem', fontSize: '0.75rem', padding: '0.35rem' }}
              >
                <Copy size={12} />
                <span>Copy Image Link</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
