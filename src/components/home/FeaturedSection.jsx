import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { ProductGrid } from '../product/ProductGrid';

export function FeaturedSection() {
  const { products, isLoading } = useShop();

  const featuredProducts = products
    .filter((p) => p.is_featured && p.is_published !== false)
    .slice(0, 8);

  if (!isLoading && featuredProducts.length === 0) return null;

  return (
    <section className="section-spacing">
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="section-badge">CURATED SPOTLIGHT</span>
            <h2 className="section-title">Featured Highlights</h2>
            <p className="section-subtitle">
              Masterpiece garments and standout designs hand-picked by our chief stylist.
            </p>
          </div>
          <Link to="/collections" className="btn btn-outline-gold btn-sm">
            <span>View All Highlights</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <ProductGrid products={featuredProducts} isLoading={isLoading} />
      </div>
    </section>
  );
}
