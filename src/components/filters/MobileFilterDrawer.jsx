import React from 'react';
import { X, Check, RotateCcw } from 'lucide-react';
import { FilterSidebar } from './FilterSidebar';

export function MobileFilterDrawer({
  isOpen,
  onClose,
  department,
  categories,
  ageRanges,
  activeFilters,
  onFilterChange,
  onClearFilters,
  productCount = 0
}) {
  if (!isOpen) return null;

  return (
    <div className="mobile-filter-drawer" onClick={onClose}>
      <div className="mobile-filter-content" onClick={(e) => e.stopPropagation()}>
        <div className="mobile-filter-header">
          <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Filter Products</span>
          <button
            onClick={onClose}
            style={{
              background: '#eee',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={18} />
          </button>
        </div>

        <div className="mobile-filter-body">
          <FilterSidebar
            department={department}
            categories={categories}
            ageRanges={ageRanges}
            activeFilters={activeFilters}
            onFilterChange={onFilterChange}
            onClearFilters={onClearFilters}
          />
        </div>

        <div className="mobile-filter-footer">
          <button onClick={onClearFilters} className="btn btn-outline" style={{ flex: 1 }}>
            <RotateCcw size={15} />
            <span>Reset</span>
          </button>
          <button onClick={onClose} className="btn btn-primary" style={{ flex: 2 }}>
            <Check size={16} />
            <span>Show Results ({productCount})</span>
          </button>
        </div>
      </div>
    </div>
  );
}
