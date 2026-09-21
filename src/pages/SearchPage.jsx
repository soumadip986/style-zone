import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, SlidersHorizontal, Sparkles, X } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductGrid } from '../components/product/ProductGrid';

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(queryParam);
  const [selectedDept, setSelectedDept] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const { products, isLoading } = useShop();

  useEffect(() => {
    setSearchTerm(queryParam);
  }, [queryParam]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParams(searchTerm ? { q: searchTerm } : {});
  };

  const filteredProducts = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();

    return products.filter((p) => {
      if (p.is_published === false) return false;

      // Department filter
      if (selectedDept !== 'all' && p.department !== selectedDept) {
        return false;
      }

      if (!term) return true;

      // Search across name, brand, category, subcategory, sku, description, fabrics, colours, patterns
      const inName = p.name?.toLowerCase().includes(term);
      const inBrand = p.brand?.toLowerCase().includes(term);
      const inCat = p.category_name?.toLowerCase().includes(term);
      const inSubcat = p.subcategory_name?.toLowerCase().includes(term);
      const inSku = p.sku?.toLowerCase().includes(term);
      const inDesc = p.description?.toLowerCase().includes(term);
      const inAge = p.age_group?.toLowerCase().includes(term);

      const inColours = p.colours?.some((c) => c.name.toLowerCase().includes(term));
      const inAttrs = p.attributes_json
        ? Object.values(p.attributes_json).some((val) =>
            String(val).toLowerCase().includes(term)
          )
        : false;

      return inName || inBrand || inCat || inSubcat || inSku || inDesc || inAge || inColours || inAttrs;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return (a.discount_price || a.price) - (b.discount_price || b.price);
      if (sortBy === 'price_desc') return (b.discount_price || b.price) - (a.discount_price || a.price);
      if (sortBy === 'newest') return new Date(b.created_at || 0) - new Date(a.created_at || 0);
      return (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0);
    });
  }, [products, searchTerm, selectedDept, sortBy]);

  const departments = [
    { key: 'all', label: 'All Departments' },
    { key: 'men', label: 'Men' },
    { key: 'women', label: 'Women' },
    { key: 'kids', label: 'Kids' },
    { key: 'boys', label: 'Boys' },
    { key: 'girls', label: 'Girls' }
  ];

  return (
    <div className="container section-spacing" style={{ paddingTop: '2rem' }}>
      {/* Search Header Form */}
      <div style={{ maxWidth: '720px', margin: '0 auto 3rem' }}>
        <h1 style={{ textAlign: 'center', fontSize: '2.2rem', marginBottom: '1.5rem' }}>
          Catalogue Search
        </h1>

        <form onSubmit={handleSearchSubmit} style={{ position: 'relative', display: 'flex', gap: '0.5rem' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={20} color="#888" style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by shirt, saree, linen, pure silk, 8-10 Years, SKU..."
              className="form-input"
              style={{ paddingLeft: '3.25rem', paddingRight: '2.5rem', height: '54px', fontSize: '1rem', borderRadius: 'var(--radius-pill)' }}
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  setSearchParams({});
                }}
                style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#999' }}
              >
                <X size={18} />
              </button>
            )}
          </div>
          <button type="submit" className="btn btn-primary" style={{ borderRadius: 'var(--radius-pill)', padding: '0 1.75rem' }}>
            Search
          </button>
        </form>

        {/* Quick Department Pill Filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem', marginTop: '1.25rem' }}>
          {departments.map((d) => (
            <button
              key={d.key}
              type="button"
              onClick={() => setSelectedDept(d.key)}
              className={`size-pill-btn ${selectedDept === d.key ? 'selected' : ''}`}
              style={{ borderRadius: 'var(--radius-pill)', padding: '0.4rem 1rem' }}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      <div className="catalog-toolbar">
        <span className="catalog-count">
          {searchTerm ? (
            <>
              Search results for <strong>"{searchTerm}"</strong>: <strong>{filteredProducts.length}</strong> products found
            </>
          ) : (
            <>Showing all <strong>{filteredProducts.length}</strong> catalogue products</>
          )}
        </span>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="catalog-sort-select"
        >
          <option value="featured">Featured First</option>
          <option value="newest">Newest Arrivals</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </div>

      {/* Search Product Grid */}
      <ProductGrid
        products={filteredProducts}
        isLoading={isLoading}
        onResetFilters={() => {
          setSearchTerm('');
          setSelectedDept('all');
          setSearchParams({});
        }}
      />
    </div>
  );
}
