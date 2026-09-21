import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { SlidersHorizontal, ArrowUpDown, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { DEPARTMENT_METADATA } from '../lib/initialData';
import { FilterSidebar } from '../components/filters/FilterSidebar';
import { MobileFilterDrawer } from '../components/filters/MobileFilterDrawer';
import { ProductGrid } from '../components/product/ProductGrid';

export function DepartmentPage() {
  const { dept } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { categories, products, ageRanges, isLoading } = useShop();

  const currentDept = dept?.toLowerCase() || 'men';
  const meta = DEPARTMENT_METADATA[currentDept] || DEPARTMENT_METADATA.men;

  // Filter states
  const initialCategory = searchParams.get('category') ? [searchParams.get('category')] : [];
  const initialAge = searchParams.get('age') ? [searchParams.get('age')] : [];

  const [activeFilters, setActiveFilters] = useState({
    categories: initialCategory,
    subcategories: [],
    ages: initialAge,
    sizes: [],
    colours: [],
    fits: [],
    sareeTypes: [],
    maxPrice: 25000,
    inStockOnly: false
  });

  const [sortBy, setSortBy] = useState('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync url params when department changes
  useEffect(() => {
    window.scrollTo(0, 0);
    const catParam = searchParams.get('category');
    const ageParam = searchParams.get('age');
    setActiveFilters({
      categories: catParam ? [catParam] : [],
      subcategories: [],
      ages: ageParam ? [ageParam] : [],
      sizes: [],
      colours: [],
      fits: [],
      sareeTypes: [],
      maxPrice: 25000,
      inStockOnly: false
    });
  }, [currentDept, searchParams]);

  const handleFilterChange = (key, value) => {
    setActiveFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setActiveFilters({
      categories: [],
      subcategories: [],
      ages: [],
      sizes: [],
      colours: [],
      fits: [],
      sareeTypes: [],
      maxPrice: 25000,
      inStockOnly: false
    });
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // 1. Department match
      if (p.department !== currentDept) return false;
      if (p.is_published === false) return false;

      // 2. Category filter
      if (
        activeFilters.categories.length > 0 &&
        !activeFilters.categories.includes(p.category_name)
      ) {
        return false;
      }

      // 3. Subcategory / Shirt Type / Fit filter
      if (activeFilters.subcategories.length > 0) {
        const matchesSubcat = activeFilters.subcategories.some(
          (sub) =>
            p.subcategory_name === sub ||
            p.attributes_json?.pattern === sub ||
            p.attributes_json?.fit === sub ||
            p.attributes_json?.sleeve === sub
        );
        if (!matchesSubcat) return false;
      }

      // 4. Age Range (Kids)
      if (activeFilters.ages.length > 0) {
        if (!activeFilters.ages.includes(p.age_group)) return false;
      }

      // 5. Pants Fit
      if (activeFilters.fits.length > 0) {
        const pFit = p.attributes_json?.fit || p.subcategory_name;
        if (!activeFilters.fits.includes(pFit)) return false;
      }

      // 6. Saree Types (Women)
      if (activeFilters.sareeTypes.length > 0) {
        const pSaree = p.attributes_json?.saree_type || p.subcategory_name;
        if (!activeFilters.sareeTypes.includes(pSaree)) return false;
      }

      // 7. Size filter
      if (activeFilters.sizes.length > 0) {
        const hasSize = p.sizes?.some(
          (s) => activeFilters.sizes.includes(s.name) && s.available
        );
        if (!hasSize) return false;
      }

      // 8. Colour filter
      if (activeFilters.colours.length > 0) {
        const hasColour = p.colours?.some((c) =>
          activeFilters.colours.some((name) =>
            c.name.toLowerCase().includes(name.toLowerCase())
          )
        );
        if (!hasColour) return false;
      }

      // 9. Price
      const finalPrice = p.discount_price || p.price;
      if (activeFilters.maxPrice && finalPrice > activeFilters.maxPrice) {
        return false;
      }

      // 10. Availability
      if (activeFilters.inStockOnly && p.availability === 'out_of_stock') {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.created_at || 0) - new Date(a.created_at || 0);
      }
      if (sortBy === 'price_asc') {
        return (a.discount_price || a.price) - (b.discount_price || b.price);
      }
      if (sortBy === 'price_desc') {
        return (b.discount_price || b.price) - (a.discount_price || a.price);
      }
      if (sortBy === 'name_asc') {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === 'name_desc') {
        return b.name.localeCompare(a.name);
      }
      // default: featured
      return (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0);
    });
  }, [products, currentDept, activeFilters, sortBy]);

  return (
    <div>
      {/* Department Luxury Banner */}
      <section
        style={{
          position: 'relative',
          padding: ' clamp(3rem, 6vw, 4.5rem) 0',
          background: `linear-gradient(to right, rgba(13, 13, 15, 0.95) 0%, rgba(13, 13, 15, 0.7) 60%, rgba(13, 13, 15, 0.3) 100%), url(${meta.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#ffffff'
        }}
      >
        <div className="container">
          <div style={{ maxWidth: '650px' }}>
            <span
              style={{
                fontSize: '0.78rem',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--accent)',
                marginBottom: '0.75rem',
                display: 'block'
              }}
            >
              HAUTE COUTURE CATALOGUE
            </span>
            <h1 style={{ color: '#fff', fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', marginBottom: '0.75rem' }}>
              {meta.title}
            </h1>
            <p style={{ color: '#d5d5df', fontSize: '1.05rem', lineHeight: 1.5 }}>
              {meta.tagline}
            </p>
          </div>
        </div>
      </section>

      {/* Catalog & Filter Layout */}
      <div className="container section-spacing" style={{ paddingTop: '2.5rem' }}>
        {/* Toolbar with count, sorting & mobile filter button */}
        <div className="catalog-toolbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="btn btn-outline btn-sm mobile-menu-trigger"
              style={{ display: 'inline-flex', padding: '0.45rem 0.85rem' }}
            >
              <SlidersHorizontal size={15} />
              <span>Filter</span>
            </button>

            <span className="catalog-count">
              Showing <strong>{filteredProducts.length}</strong> items in {meta.title}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ fontSize: '0.85rem', color: '#777', display: 'none' }}>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="catalog-sort-select"
              aria-label="Sort products"
            >
              <option value="featured">Sort by: Featured</option>
              <option value="newest">Sort by: Newest Arrivals</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="name_asc">Name: A to Z</option>
              <option value="name_desc">Name: Z to A</option>
            </select>
          </div>
        </div>

        {/* Main Grid + Desktop Sidebar Layout */}
        <div className="catalog-layout">
          {/* Desktop Filter Sidebar */}
          <FilterSidebar
            department={currentDept}
            categories={categories}
            ageRanges={ageRanges}
            activeFilters={activeFilters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
          />

          {/* Product Grid */}
          <div>
            <ProductGrid
              products={filteredProducts}
              isLoading={isLoading}
              onResetFilters={handleClearFilters}
            />
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <MobileFilterDrawer
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        department={currentDept}
        categories={categories}
        ageRanges={ageRanges}
        activeFilters={activeFilters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        productCount={filteredProducts.length}
      />
    </div>
  );
}
