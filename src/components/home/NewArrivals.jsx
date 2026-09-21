import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { ProductGrid } from '../product/ProductGrid';

export function NewArrivals() {
  const { products, isLoading } = useShop();

  // Automatically show recent products
  const recentProducts = [...products]
    .filter((p) => p.is_published !== false)
    .sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0))
    .slice(0, 4);

  return (
    <section className="section-spacing" style={{ background: 'var(--bg-surface)' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="section-badge">FRESH ON THE RACK</span>
            <h2 className="section-title">New In This Season</h2>
            <p className="section-subtitle">
              The latest additions to our physical store inventory, ready for trial.
            </p>
          </div>
          <Link to="/collections" className="btn btn-outline btn-sm">
            <span>Browse All New In</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <ProductGrid products={recentProducts} isLoading={isLoading} />
      </div>
    </section>
  );
}
