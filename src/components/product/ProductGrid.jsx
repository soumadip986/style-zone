import React from 'react';
import { ProductCard } from './ProductCard';
import { Sparkles, RefreshCw } from 'lucide-react';

export function ProductGrid({ products, isLoading, onResetFilters }) {
  if (isLoading) {
    return (
      <div className="products-grid">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
          <div key={n} style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #edeae4' }}>
            <div className="skeleton" style={{ aspectRatio: '3/4', width: '100%' }} />
            <div style={{ padding: '1rem' }}>
              <div className="skeleton" style={{ height: '12px', width: '40%', marginBottom: '8px' }} />
              <div className="skeleton" style={{ height: '18px', width: '85%', marginBottom: '12px' }} />
              <div className="skeleton" style={{ height: '20px', width: '50%' }} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '4rem 1.5rem',
          background: 'var(--bg-surface)',
          borderRadius: 'var(--radius-lg)',
          border: '1px dashed var(--border-medium)',
          maxWidth: '600px',
          margin: '2rem auto'
        }}
      >
        <Sparkles size={40} color="var(--accent)" style={{ margin: '0 auto 1rem' }} />
        <h3 style={{ marginBottom: '0.5rem' }}>No Products Found</h3>
        <p style={{ marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
          We could not find any items matching your selected criteria or filters.
        </p>
        {onResetFilters && (
          <button onClick={onResetFilters} className="btn btn-primary btn-sm">
            <RefreshCw size={14} />
            <span>Reset All Filters</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="products-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
