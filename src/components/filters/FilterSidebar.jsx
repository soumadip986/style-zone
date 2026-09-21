import React from 'react';
import { RotateCcw, Check } from 'lucide-react';
import { formatCurrency } from '../../lib/formatters';

export function FilterSidebar({
  department,
  categories,
  ageRanges,
  activeFilters,
  onFilterChange,
  onClearFilters
}) {
  const deptCategories = categories.filter(
    (c) => c.department === department && c.is_visible !== false
  );

  const availableColours = [
    { name: 'Black', hex: '#111111' },
    { name: 'White', hex: '#fdfbf7' },
    { name: 'Navy', hex: '#162238' },
    { name: 'Red', hex: '#990000' },
    { name: 'Gold', hex: '#d4af37' },
    { name: 'Green', hex: '#1b4332' },
    { name: 'Pink', hex: '#f4acb7' },
    { name: 'Beige', hex: '#e3dcce' },
    { name: 'Maroon', hex: '#631326' },
    { name: 'Yellow', hex: '#f9844a' }
  ];

  const standardSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '30', '32', '34', '36', 'Free Size'];

  const menShirtTypes = [
    'Solid Shirts', 'Printed Shirts', 'Checked Shirts', 'Striped Shirts',
    'Pattern Shirts', 'Floral Shirts', 'Formal Shirts', 'Casual Shirts',
    'Linen Shirts', 'Cotton Shirts', 'Oversized Shirts', 'Slim Fit Shirts'
  ];

  const menPantsFits = [
    'Baggy Pants', 'Cargo Pants', 'Skinny Fit', 'Slim Fit',
    'Regular Fit', 'Straight Fit', 'Wide Leg', 'Formal Trousers', 'Chinos'
  ];

  const womenSareeTypes = [
    'Kanchipuram / Kanjivaram', 'Banarasi Sarees', 'Silk Sarees',
    'Designer Sarees', 'Traditional Sarees', 'Handloom Sarees',
    'Georgette Sarees', 'Chiffon Sarees', 'Cotton Sarees', 'Party Wear'
  ];

  const isFilterActive = Object.values(activeFilters).some(
    (v) => (Array.isArray(v) && v.length > 0) || (typeof v === 'string' && v !== '') || (typeof v === 'number' && v > 0)
  );

  const handleArrayToggle = (key, val) => {
    const current = activeFilters[key] || [];
    const next = current.includes(val)
      ? current.filter((item) => item !== val)
      : [...current, val];
    onFilterChange(key, next);
  };

  return (
    <aside className="filter-sidebar" aria-label="Product Filters">
      <div className="filter-header">
        <span style={{ fontWeight: 700, fontSize: '0.95rem', letterSpacing: '0.04em' }}>
          Filters
        </span>
        {isFilterActive && (
          <button onClick={onClearFilters} className="filter-clear-btn" title="Reset all filters">
            <RotateCcw size={13} style={{ display: 'inline', marginRight: '4px' }} />
            Clear All
          </button>
        )}
      </div>

      {/* 1. Category Filter */}
      {deptCategories.length > 0 && (
        <div className="filter-group">
          <div className="filter-group-title">Category</div>
          <div className="filter-options-list">
            {deptCategories.map((cat) => (
              <label key={cat.id} className="filter-checkbox-label">
                <input
                  type="checkbox"
                  checked={(activeFilters.categories || []).includes(cat.name)}
                  onChange={() => handleArrayToggle('categories', cat.name)}
                />
                <span>{cat.name}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* 2. Kids Department: AGE RANGES */}
      {department === 'kids' && ageRanges?.length > 0 && (
        <div className="filter-group">
          <div className="filter-group-title">Age Range</div>
          <div className="filter-options-list" style={{ maxHeight: '200px', overflowY: 'auto' }}>
            {ageRanges.map((age) => (
              <label key={age} className="filter-checkbox-label">
                <input
                  type="checkbox"
                  checked={(activeFilters.ages || []).includes(age)}
                  onChange={() => handleArrayToggle('ages', age)}
                />
                <span>{age}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* 3. Men Department: SHIRT STYLES & PANTS FITS */}
      {department === 'men' && (
        <>
          <div className="filter-group">
            <div className="filter-group-title">Shirt Types</div>
            <div className="filter-options-list" style={{ maxHeight: '160px', overflowY: 'auto' }}>
              {menShirtTypes.map((type) => (
                <label key={type} className="filter-checkbox-label">
                  <input
                    type="checkbox"
                    checked={(activeFilters.subcategories || []).includes(type)}
                    onChange={() => handleArrayToggle('subcategories', type)}
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <div className="filter-group-title">Pants & Trousers Fit</div>
            <div className="filter-options-list">
              {menPantsFits.map((fit) => (
                <label key={fit} className="filter-checkbox-label">
                  <input
                    type="checkbox"
                    checked={(activeFilters.fits || []).includes(fit)}
                    onChange={() => handleArrayToggle('fits', fit)}
                  />
                  <span>{fit}</span>
                </label>
              ))}
            </div>
          </div>
        </>
      )}

      {/* 4. Women Department: SAREE TYPES */}
      {department === 'women' && (
        <div className="filter-group">
          <div className="filter-group-title">Saree & Weave Styles</div>
          <div className="filter-options-list" style={{ maxHeight: '180px', overflowY: 'auto' }}>
            {womenSareeTypes.map((saree) => (
              <label key={saree} className="filter-checkbox-label">
                <input
                  type="checkbox"
                  checked={(activeFilters.sareeTypes || []).includes(saree)}
                  onChange={() => handleArrayToggle('sareeTypes', saree)}
                />
                <span>{saree}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* 5. Sizes Filter */}
      {department !== 'kids' && (
        <div className="filter-group">
          <div className="filter-group-title">Size</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {standardSizes.map((size) => {
              const isSelected = (activeFilters.sizes || []).includes(size);
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => handleArrayToggle('sizes', size)}
                  className={`size-pill-btn ${isSelected ? 'selected' : ''}`}
                  style={{ fontSize: '0.78rem', padding: '0.35rem 0.6rem' }}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 6. Colours Swatch Filter */}
      <div className="filter-group">
        <div className="filter-group-title">Colours</div>
        <div className="filter-swatches">
          {availableColours.map((col) => {
            const isSelected = (activeFilters.colours || []).includes(col.name);
            return (
              <button
                key={col.name}
                type="button"
                title={col.name}
                className={`colour-swatch-btn ${isSelected ? 'selected' : ''}`}
                style={{ backgroundColor: col.hex }}
                onClick={() => handleArrayToggle('colours', col.name)}
              />
            );
          })}
        </div>
      </div>

      {/* 7. Price Max Slider */}
      <div className="filter-group">
        <div className="filter-group-title">
          <span>Max Price</span>
          <span style={{ color: 'var(--accent)' }}>
            {activeFilters.maxPrice ? formatCurrency(activeFilters.maxPrice) : 'All Prices'}
          </span>
        </div>
        <input
          type="range"
          min="500"
          max="25000"
          step="500"
          value={activeFilters.maxPrice || 25000}
          onChange={(e) => onFilterChange('maxPrice', Number(e.target.value))}
          style={{ width: '100%', accentColor: 'var(--accent)', cursor: 'pointer' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#888', marginTop: '0.3rem' }}>
          <span>₹500</span>
          <span>₹25,000+</span>
        </div>
      </div>

      {/* 8. Availability Filter */}
      <div className="filter-group">
        <div className="filter-group-title">Availability</div>
        <label className="filter-checkbox-label">
          <input
            type="checkbox"
            checked={Boolean(activeFilters.inStockOnly)}
            onChange={(e) => onFilterChange('inStockOnly', e.target.checked)}
          />
          <span>In Stock Only</span>
        </label>
      </div>
    </aside>
  );
}
