-- ==============================================================================
-- STYLE ZONE - PREMIUM FASHION STORE & WHATSAPP CATALOGUE DATABASE SCHEMA
-- PostgreSQL / Supabase Schema with Row Level Security (RLS) & Storage Setup
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. SHOPS TABLE (Store settings, location, theme, WhatsApp number)
CREATE TABLE IF NOT EXISTS public.shops (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL DEFAULT 'STYLE ZONE',
    logo_url TEXT DEFAULT '',
    favicon_url TEXT DEFAULT '',
    tagline TEXT DEFAULT 'Exclusive Haute Couture & Ready-To-Wear',
    description TEXT DEFAULT 'Experience luxury fashion for Men, Women, Kids, Boys & Girls. Visit our flagship boutique or enquire directly via WhatsApp for instant fitting assistance and bespoke tailoring.',
    phone VARCHAR(50) DEFAULT '+91 98300 12345',
    whatsapp VARCHAR(50) NOT NULL DEFAULT '919830012345',
    email VARCHAR(255) DEFAULT 'concierge@stylezonefashion.com',
    address TEXT DEFAULT 'Plot 42, Haute Couture Boulevard, Park Street, Kolkata, West Bengal 700016',
    opening_hours JSONB DEFAULT '{"weekdays": "10:30 AM – 9:00 PM (Mon – Sat)", "sunday": "11:00 AM – 8:00 PM (Sunday)"}'::jsonb,
    maps_url TEXT DEFAULT 'https://maps.google.com/?q=Park+Street+Kolkata',
    embed_maps_url TEXT DEFAULT 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14738.257546416183!2d88.34768395!3d22.5518299!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02770c8f5f6e63%3A0x6bcfd3c11d02c815!2sPark%20Street%2C%20Kolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
    latitude DECIMAL(10, 8) DEFAULT 22.5518,
    longitude DECIMAL(11, 8) DEFAULT 88.3517,
    social JSONB DEFAULT '{"instagram": "https://instagram.com/stylezonefashion", "facebook": "https://facebook.com/stylezonefashion", "youtube": "https://youtube.com/@stylezonefashion"}'::jsonb,
    theme_config JSONB DEFAULT '{"primary": "#0f0f11", "accent": "#c59d5f", "surface": "#fbf9f5", "radius": "12px"}'::jsonb,
    homepage_config JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. CATEGORIES TABLE (Hierarchical: Department -> Category -> Subcategory)
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    shop_id UUID REFERENCES public.shops(id) ON DELETE CASCADE,
    parent_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    name VARCHAR(150) NOT NULL,
    slug VARCHAR(150) NOT NULL,
    department VARCHAR(50) NOT NULL CHECK (department IN ('kids', 'boys', 'girls', 'men', 'women')),
    description TEXT,
    image_url TEXT,
    subcategories JSONB DEFAULT '[]'::jsonb,
    display_order INT DEFAULT 0,
    is_visible BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    shop_id UUID REFERENCES public.shops(id) ON DELETE CASCADE,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    description TEXT,
    sku VARCHAR(100),
    brand VARCHAR(150) DEFAULT 'Style Zone Exclusive',
    department VARCHAR(50) NOT NULL CHECK (department IN ('kids', 'boys', 'girls', 'men', 'women')),
    category_name VARCHAR(150),
    subcategory_name VARCHAR(150),
    age_group VARCHAR(50),
    price DECIMAL(10, 2) NOT NULL,
    discount_price DECIMAL(10, 2),
    currency VARCHAR(10) DEFAULT '₹',
    availability VARCHAR(50) DEFAULT 'in_stock' CHECK (availability IN ('in_stock', 'low_stock', 'out_of_stock', 'made_to_order')),
    sizes JSONB DEFAULT '[]'::jsonb,     -- e.g. [{"name": "M", "available": true}, {"name": "L", "available": true}]
    colours JSONB DEFAULT '[]'::jsonb,   -- e.g. [{"name": "Navy Blue", "hex": "#0a192f", "available": true}]
    variants JSONB DEFAULT '[]'::jsonb,  -- Matrix: [{"size": "M", "colour": "Black", "available": true}, {"size": "L", "colour": "Black", "available": false}]
    attributes_json JSONB DEFAULT '{}'::jsonb, -- e.g. {"fabric": "Pure Linen", "fit": "Slim Fit", "pattern": "Solid", "sleeve": "Full Sleeve"}
    is_featured BOOLEAN DEFAULT false,
    is_published BOOLEAN DEFAULT true,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. PRODUCT IMAGES TABLE
CREATE TABLE IF NOT EXISTS public.product_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    storage_path TEXT,
    alt_text VARCHAR(255),
    display_order INT DEFAULT 0,
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. COLLECTIONS TABLE
CREATE TABLE IF NOT EXISTS public.collections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    shop_id UUID REFERENCES public.shops(id) ON DELETE CASCADE,
    name VARCHAR(150) NOT NULL,
    slug VARCHAR(150) NOT NULL,
    description TEXT,
    image_url TEXT,
    badge_tag VARCHAR(50),
    product_ids JSONB DEFAULT '[]'::jsonb,
    display_order INT DEFAULT 0,
    is_visible BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. COLLECTION PRODUCTS JUNCTION
CREATE TABLE IF NOT EXISTS public.collection_products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    collection_id UUID REFERENCES public.collections(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    display_order INT DEFAULT 0,
    UNIQUE(collection_id, product_id)
);

-- 8. ADMIN PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.admin_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    role VARCHAR(50) DEFAULT 'admin',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.shops ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collection_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;

-- Public can READ published/visible items
CREATE POLICY "Public shops read" ON public.shops FOR SELECT USING (true);
CREATE POLICY "Public categories read" ON public.categories FOR SELECT USING (is_visible = true);
CREATE POLICY "Public products read" ON public.products FOR SELECT USING (is_published = true);
CREATE POLICY "Public product_images read" ON public.product_images FOR SELECT USING (true);
CREATE POLICY "Public collections read" ON public.collections FOR SELECT USING (is_visible = true);
CREATE POLICY "Public collection_products read" ON public.collection_products FOR SELECT USING (true);

-- Authenticated Admin can perform full CRUD
CREATE POLICY "Admin shops all" ON public.shops FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin categories all" ON public.categories FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin products all" ON public.products FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin product_images all" ON public.product_images FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin collections all" ON public.collections FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin collection_products all" ON public.collection_products FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin profiles all" ON public.admin_profiles FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 10. SUPABASE STORAGE BUCKETS (Product Images, Collection Banners, Homepage & Store Assets)
INSERT INTO storage.buckets (id, name, public) 
VALUES 
  ('product-images', 'product-images', true),
  ('collection-images', 'collection-images', true),
  ('homepage-assets', 'homepage-assets', true),
  ('store-assets', 'store-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS Policies
CREATE POLICY "Public product-images read" ON storage.objects FOR SELECT USING (bucket_id IN ('product-images', 'collection-images', 'homepage-assets', 'store-assets'));
CREATE POLICY "Admin storage upload" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id IN ('product-images', 'collection-images', 'homepage-assets', 'store-assets'));
CREATE POLICY "Admin storage update" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id IN ('product-images', 'collection-images', 'homepage-assets', 'store-assets'));
CREATE POLICY "Admin storage delete" ON storage.objects FOR DELETE TO authenticated USING (bucket_id IN ('product-images', 'collection-images', 'homepage-assets', 'store-assets'));
