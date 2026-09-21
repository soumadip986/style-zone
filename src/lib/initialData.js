// Initial high-fidelity seed data for STYLE ZONE Fashion Store

export const INITIAL_SHOP = {
  id: 'shop-001',
  name: 'STYLE ZONE',
  tagline: 'Exclusive Haute Couture & Premium Ready-to-Wear',
  description: 'Style Zone is a premier physical fashion house catering to bespoke men’s tailoring, exquisite bridal & festive sarees, modern women’s western silhouettes, and charming, skin-friendly kidswear. Visit our store or enquire via WhatsApp for custom styling and instant reservations.',
  phone: '+91 98300 12345',
  whatsapp: '919830012345',
  email: 'concierge@stylezonefashion.com',
  address: 'Plot 42, Haute Couture Boulevard, Park Street, Kolkata, West Bengal 700016',
  opening_hours: {
    weekdays: '10:30 AM – 9:00 PM (Mon – Sat)',
    sunday: '11:00 AM – 8:00 PM (Sunday)'
  },
  maps_url: 'https://maps.google.com/?q=Park+Street+Kolkata',
  embed_maps_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14738.257546416183!2d88.34768395!3d22.5518299!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02770c8f5f6e63%3A0x6bcfd3c11d02c815!2sPark%20Street%2C%20Kolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
  latitude: 22.5518,
  longitude: 88.3517,
  social: {
    instagram: 'https://instagram.com/stylezonefashion',
    facebook: 'https://facebook.com/stylezonefashion',
    youtube: 'https://youtube.com/@stylezonefashion'
  },
  theme: {
    primary: '#0d0d0f',
    accent: '#c59d5f',
    surface: '#f9f8f6',
    text: '#1a1a1a'
  },
  homepage: {
    hero: {
      badge: 'NEW SEASON 2026',
      heading: 'STYLE FOR EVERY STORY',
      subheading: 'Discover hand-crafted festive silks, tailored bespoke menswear, and delightful collections for kids & youth.',
      cta_text: 'Explore Collection',
      cta_link: '/department/men',
      secondary_cta_text: 'WhatsApp Stylist',
      image_url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop'
    },
    promo: {
      tag: 'LIMITED FESTIVE EDIT',
      title: 'Royal Heritage Sarees & Artisanal Kurtas',
      description: 'Exclusive handloom Kanjivaram and Banarasi weaves paired with hand-embroidered menswear ensembles. Available exclusively in our flagship boutique.',
      button_text: 'Browse Royal Edit',
      button_link: '/department/women?category=Sarees',
      image_url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1887&auto=format&fit=crop'
    },
    why_us: [
      {
        icon: 'Sparkles',
        title: 'Artisanal & Premium Fabrics',
        description: 'Finest 100% Egyptian cotton, mulberry silk, and breathable organic fabrics handpicked for lasting comfort.'
      },
      {
        icon: 'Ruler',
        title: 'Custom Fit & Alterations',
        description: 'In-store master tailoring and customized sizing consultation available directly via WhatsApp.'
      },
      {
        icon: 'MessageCircle',
        title: 'Instant WhatsApp Concierge',
        description: 'Real-time stock availability, video call preview, and instant reserve service directly on WhatsApp.'
      },
      {
        icon: 'MapPin',
        title: 'Flagship Store Experience',
        description: 'Spacious boutique trial lounges, valet parking, and private bridal/groomsmen consultation suites.'
      }
    ]
  }
};

export const INITIAL_AGE_RANGES = [
  '0–3 Months',
  '3–6 Months',
  '6–9 Months',
  '9–12 Months',
  '1–2 Years',
  '2–3 Years',
  '3–4 Years',
  '4–5 Years',
  '5–6 Years',
  '6–8 Years',
  '8–10 Years',
  '10–12 Years',
  '12–14 Years',
  '14–16 Years'
];

export const INITIAL_CATEGORIES = [
  // KIDS
  {
    id: 'cat-kids-1',
    department: 'kids',
    name: 'Newborn & Infants',
    slug: 'newborn',
    description: 'Ultra-soft hypoallergenic rompers, sets and swaddles for babies.',
    image_url: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?q=80&w=1000&auto=format&fit=crop',
    subcategories: ['Rompers', 'Bodysuits', 'Sleepsuits', 'Gift Sets', 'Swaddles'],
    display_order: 1,
    is_visible: true
  },
  {
    id: 'cat-kids-2',
    department: 'kids',
    name: 'Casual Wear',
    slug: 'casual-wear',
    description: 'Playful t-shirts, dungarees and daily comfy clothes.',
    image_url: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=1000&auto=format&fit=crop',
    subcategories: ['T-Shirts', 'Shorts', 'Dungarees', 'Joggers', 'Tracksuits'],
    display_order: 2,
    is_visible: true
  },
  {
    id: 'cat-kids-3',
    department: 'kids',
    name: 'Party & Festive Wear',
    slug: 'party-wear',
    description: 'Glittering frocks, sherwanis, and festive ensembles for celebrations.',
    image_url: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1000&auto=format&fit=crop',
    subcategories: ['Festive Frocks', 'Baby Sherwanis', 'Kurta Sets', 'Lehengas', 'Blazers'],
    display_order: 3,
    is_visible: true
  },
  {
    id: 'cat-kids-4',
    department: 'kids',
    name: 'Ethnic Wear',
    slug: 'ethnic-wear',
    description: 'Traditional dhoti sets, chaniya cholis and kurtas for kids.',
    image_url: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=1000&auto=format&fit=crop',
    subcategories: ['Kurta Pajama', 'Dhoti Kurta', 'Pavada Set', 'Sherwani Sets'],
    display_order: 4,
    is_visible: true
  },

  // BOYS
  {
    id: 'cat-boys-1',
    department: 'boys',
    name: 'Shirts',
    slug: 'shirts',
    description: 'Casual, formal, checked, striped and printed shirts for boys.',
    image_url: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?q=80&w=1000&auto=format&fit=crop',
    subcategories: ['Solid', 'Printed', 'Checks', 'Stripes', 'Pattern', 'Floral', 'Formal', 'Casual', 'Full Sleeve', 'Half Sleeve', 'Oversized', 'Regular Fit', 'Slim Fit'],
    display_order: 1,
    is_visible: true
  },
  {
    id: 'cat-boys-2',
    department: 'boys',
    name: 'T-Shirts & Polos',
    slug: 't-shirts',
    description: 'Graphic prints, crew necks and sporty polos.',
    image_url: 'https://images.unsplash.com/photo-1471286174890-9c112ffca564?q=80&w=1000&auto=format&fit=crop',
    subcategories: ['Crew Neck', 'Polo T-Shirts', 'Graphic Tees', 'Oversized Tees', 'Sleeveless'],
    display_order: 2,
    is_visible: true
  },
  {
    id: 'cat-boys-3',
    department: 'boys',
    name: 'Jeans & Cargo Pants',
    slug: 'pants',
    description: 'Durable stretch denims, rugged utility cargos and joggers.',
    image_url: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?q=80&w=1000&auto=format&fit=crop',
    subcategories: ['Jeans', 'Cargo Pants', 'Joggers', 'Chinos', 'Shorts', 'Track Pants'],
    display_order: 3,
    is_visible: true
  },
  {
    id: 'cat-boys-4',
    department: 'boys',
    name: 'Ethnic & Kurta',
    slug: 'ethnic-wear',
    description: 'Handloom silk kurtas, Nehru jackets and festive sets.',
    image_url: 'https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?q=80&w=1000&auto=format&fit=crop',
    subcategories: ['Kurta Sets', 'Nehru Jackets', 'Pathani Suits', 'Indo-Western'],
    display_order: 4,
    is_visible: true
  },

  // GIRLS
  {
    id: 'cat-girls-1',
    department: 'girls',
    name: 'Dresses & Frocks',
    slug: 'dresses',
    description: 'Enchanting floral frocks, tiered tulle dresses and party wear.',
    image_url: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?q=80&w=1000&auto=format&fit=crop',
    subcategories: ['Party Frocks', 'Tulle Dresses', 'Maxi Dresses', 'Floral Sundresses', 'A-Line Dresses'],
    display_order: 1,
    is_visible: true
  },
  {
    id: 'cat-girls-2',
    department: 'girls',
    name: 'Ethnic & Festive',
    slug: 'ethnic-wear',
    description: 'Chanderi lehengas, shararas, anarkalis and festive kurtis.',
    image_url: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1000&auto=format&fit=crop',
    subcategories: ['Lehenga Choli', 'Sharara Sets', 'Anarkali Suits', 'Kurtis & Palazzo', 'Gown'],
    display_order: 2,
    is_visible: true
  },
  {
    id: 'cat-girls-3',
    department: 'girls',
    name: 'Tops & T-Shirts',
    slug: 'tops',
    description: 'Chic peplum tops, crop tees and ruffle blouses.',
    image_url: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?q=80&w=1000&auto=format&fit=crop',
    subcategories: ['Peplum Tops', 'Ruffle Blouses', 'Printed T-Shirts', 'Crop Tops', 'Shirts'],
    display_order: 3,
    is_visible: true
  },
  {
    id: 'cat-girls-4',
    department: 'girls',
    name: 'Jeans, Skirts & Pants',
    slug: 'bottoms',
    description: 'Flared jeans, pleated skirts and trendy trousers.',
    image_url: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=1000&auto=format&fit=crop',
    subcategories: ['Flared Jeans', 'Pleated Skirts', 'Wide Leg Pants', 'Shorts', 'Culottes'],
    display_order: 4,
    is_visible: true
  },

  // MEN
  {
    id: 'cat-men-1',
    department: 'men',
    name: 'Shirts',
    slug: 'shirts',
    description: 'Executive formal shirts, weekend resort linens, and contemporary prints.',
    image_url: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1000&auto=format&fit=crop',
    subcategories: ['Solid Shirts', 'Printed Shirts', 'Checked Shirts', 'Striped Shirts', 'Pattern Shirts', 'Floral Shirts', 'Formal Shirts', 'Casual Shirts', 'Linen Shirts', 'Cotton Shirts', 'Oversized Shirts', 'Slim Fit Shirts', 'Regular Fit Shirts', 'Full Sleeve', 'Half Sleeve', 'Party Wear'],
    display_order: 1,
    is_visible: true
  },
  {
    id: 'cat-men-2',
    department: 'men',
    name: 'Pants & Trousers',
    slug: 'pants-trousers',
    description: 'Tailored trousers, relaxed wide legs, luxury chinos and denims.',
    image_url: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1000&auto=format&fit=crop',
    subcategories: ['Baggy Pants', 'Cargo Pants', 'Skinny Fit', 'Slim Fit', 'Regular Fit', 'Straight Fit', 'Wide Leg', 'Formal Trousers', 'Casual Trousers', 'Jeans', 'Chinos', 'Shorts', 'Track Pants', 'Joggers'],
    display_order: 2,
    is_visible: true
  },
  {
    id: 'cat-men-3',
    department: 'men',
    name: 'T-Shirts & Polos',
    slug: 't-shirts',
    description: 'Heavyweight oversized tees, supima cotton crewnecks and luxe polos.',
    image_url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop',
    subcategories: ['Oversized Fit', 'Polo Collars', 'Solid Supima', 'Waffle Knit', 'Graphic Drops'],
    display_order: 3,
    is_visible: true
  },
  {
    id: 'cat-men-4',
    department: 'men',
    name: 'Ethnic & Festive Kurta',
    slug: 'ethnic-wear',
    description: 'Bespoke sherwanis, silk bandhgalas and embroidered kurtas.',
    image_url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1000&auto=format&fit=crop',
    subcategories: ['Embroidered Kurta', 'Silk Bundi Sets', 'Bandhgala Suits', 'Sherwani Sets', 'Dhoti Sets'],
    display_order: 4,
    is_visible: true
  },
  {
    id: 'cat-men-5',
    department: 'men',
    name: 'Jackets & Blazers',
    slug: 'jackets',
    description: 'Italian cut single-breasted blazers, leather jackets and bombers.',
    image_url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop',
    subcategories: ['Tuxedos', 'Linen Blazers', 'Bomber Jackets', 'Tweed Coats'],
    display_order: 5,
    is_visible: true
  },

  // WOMEN
  {
    id: 'cat-women-1',
    department: 'women',
    name: 'Sarees',
    slug: 'sarees',
    description: 'Heritage handwoven Kanjivarams, Banarasi brocades and contemporary designer sarees.',
    image_url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1000&auto=format&fit=crop',
    subcategories: ['Fashion Sarees', 'Designer Sarees', 'Silk Sarees', 'Kanchipuram / Kanjivaram', 'Traditional Sarees', 'Cotton Sarees', 'Banarasi Sarees', 'Tussar Silk', 'Handloom Sarees', 'Party Wear', 'Wedding Sarees', 'Festive Sarees', 'Printed Sarees', 'Embroidered Sarees', 'Georgette Sarees', 'Chiffon Sarees', 'Linen Sarees'],
    display_order: 1,
    is_visible: true
  },
  {
    id: 'cat-women-2',
    department: 'women',
    name: 'Dresses & Western',
    slug: 'dresses',
    description: 'Cocktail gowns, satin slip dresses and contemporary silhouettes.',
    image_url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000&auto=format&fit=crop',
    subcategories: ['Evening Gowns', 'Cocktail Dresses', 'Maxi Dresses', 'Midi Dresses', 'Co-ord Sets'],
    display_order: 2,
    is_visible: true
  },
  {
    id: 'cat-women-3',
    department: 'women',
    name: 'Kurtis & Salwar Suits',
    slug: 'kurtis-salwar',
    description: 'Intricate Lucknowi Chikankari, Anarkali sets and daily cotton kurtis.',
    image_url: 'https://images.unsplash.com/photo-1583391733975-00c73e0a1334?q=80&w=1000&auto=format&fit=crop',
    subcategories: ['Anarkali Sets', 'Straight Kurtis', 'Palazzo Suits', 'Sharara Sets', 'Chikankari'],
    display_order: 3,
    is_visible: true
  },
  {
    id: 'cat-women-4',
    department: 'women',
    name: 'Tops, Blouses & Bottoms',
    slug: 'tops-bottoms',
    description: 'Designer saree blouses, corset tops, palazzo and trousers.',
    image_url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop',
    subcategories: ['Designer Blouses', 'Corset Tops', 'Wide Leg Trousers', 'Palazzo Pants', 'Skirts'],
    display_order: 4,
    is_visible: true
  }
];

export const INITIAL_PRODUCTS = [
  // MEN PRODUCTS
  {
    id: 'prod-men-01',
    name: 'Heritage Pure Linen Solid Shirt',
    slug: 'heritage-pure-linen-solid-shirt',
    department: 'men',
    category_name: 'Shirts',
    subcategory_name: 'Linen Shirts',
    brand: 'Style Zone Couture',
    price: 2499,
    discount_price: 1999,
    currency: '₹',
    availability: 'in_stock',
    sku: 'SZ-M-SH-001',
    is_featured: true,
    is_published: true,
    description: 'Crafted from 100% French flax linen, this breathable solid shirt combines lightweight elegance with superior drape. Ideal for destination weddings, weekend soirees, or understated executive wear.',
    sizes: [
      { name: 'S', available: true },
      { name: 'M', available: true },
      { name: 'L', available: true },
      { name: 'XL', available: true },
      { name: 'XXL', available: false }
    ],
    colours: [
      { name: 'Ivory White', hex: '#fdfbf7', available: true },
      { name: 'Midnight Navy', hex: '#162238', available: true },
      { name: 'Sage Green', hex: '#879782', available: true },
      { name: 'Terracotta', hex: '#b35d46', available: true }
    ],
    attributes_json: {
      fabric: '100% Pure Linen',
      fit: 'Regular Fit',
      pattern: 'Solid',
      sleeve: 'Full Sleeve',
      occasion: 'Casual & Resort Wear'
    },
    images: [
      {
        id: 'img-m1-1',
        image_url: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1000&auto=format&fit=crop',
        alt_text: 'Heritage Pure Linen Solid Shirt Front View',
        is_primary: true
      },
      {
        id: 'img-m1-2',
        image_url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000&auto=format&fit=crop',
        alt_text: 'Heritage Pure Linen Shirt Detail Close-up',
        is_primary: false
      },
      {
        id: 'img-m1-3',
        image_url: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=1000&auto=format&fit=crop',
        alt_text: 'Heritage Linen Shirt Lifestyle Angle',
        is_primary: false
      }
    ]
  },
  {
    id: 'prod-men-02',
    name: 'Artisanal Botanical Printed Shirt',
    slug: 'artisanal-botanical-printed-shirt',
    department: 'men',
    category_name: 'Shirts',
    subcategory_name: 'Printed Shirts',
    brand: 'Style Zone Modern',
    price: 2199,
    discount_price: 1699,
    currency: '₹',
    availability: 'in_stock',
    sku: 'SZ-M-SH-002',
    is_featured: true,
    is_published: true,
    description: 'A bespoke resort-style short-sleeve shirt in silky rayon modal, decorated with tropical botanical motifs inspired by royal Mughal gardens.',
    sizes: [
      { name: 'S', available: true },
      { name: 'M', available: true },
      { name: 'L', available: true },
      { name: 'XL', available: true }
    ],
    colours: [
      { name: 'Emerald Forest', hex: '#1b4332', available: true },
      { name: 'Onyx Monochrome', hex: '#111111', available: true }
    ],
    attributes_json: {
      fabric: 'Rayon Viscose Satin',
      fit: 'Oversized Fit',
      pattern: 'Floral / Botanical',
      sleeve: 'Half Sleeve',
      occasion: 'Party & Festive'
    },
    images: [
      {
        id: 'img-m2-1',
        image_url: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=1000&auto=format&fit=crop',
        alt_text: 'Artisanal Botanical Printed Shirt',
        is_primary: true
      },
      {
        id: 'img-m2-2',
        image_url: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1000&auto=format&fit=crop',
        alt_text: 'Shirt Collar Detail',
        is_primary: false
      }
    ]
  },
  {
    id: 'prod-men-03',
    name: 'Italian Tailored Relaxed Wide Leg Trousers',
    slug: 'italian-tailored-wide-leg-trousers',
    department: 'men',
    category_name: 'Pants & Trousers',
    subcategory_name: 'Wide Leg',
    brand: 'Style Zone Sartorial',
    price: 2899,
    discount_price: 2299,
    currency: '₹',
    availability: 'in_stock',
    sku: 'SZ-M-PT-003',
    is_featured: false,
    is_published: true,
    description: 'High-waisted double-pleated relaxed trousers tailored in stretch gabardine wool blend. Offers structured drape with supreme all-day movement.',
    sizes: [
      { name: '30', available: true },
      { name: '32', available: true },
      { name: '34', available: true },
      { name: '36', available: true }
    ],
    colours: [
      { name: 'Charcoal Grey', hex: '#333333', available: true },
      { name: 'Oatmeal Beige', hex: '#e3dcce', available: true },
      { name: 'Jet Black', hex: '#0a0a0a', available: true }
    ],
    attributes_json: {
      fabric: 'Gabardine Stretch Blend',
      fit: 'Wide Leg',
      pattern: 'Solid',
      occasion: 'Formal & Smart Casual'
    },
    images: [
      {
        id: 'img-m3-1',
        image_url: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1000&auto=format&fit=crop',
        alt_text: 'Tailored Wide Leg Trousers',
        is_primary: true
      }
    ]
  },
  {
    id: 'prod-men-04',
    name: 'Raw Silk Embroidered Bundi & Kurta Set',
    slug: 'raw-silk-embroidered-bundi-kurta-set',
    department: 'men',
    category_name: 'Ethnic & Festive Kurta',
    subcategory_name: 'Silk Bundi Sets',
    brand: 'Style Zone Heritage',
    price: 6999,
    discount_price: 5499,
    currency: '₹',
    availability: 'in_stock',
    sku: 'SZ-M-ET-004',
    is_featured: true,
    is_published: true,
    description: 'Royal Matka raw silk asymmetric kurta paired with a handcrafted zardozi embroidered Nehru waistcoat jacket and silk churidar.',
    sizes: [
      { name: '38 (M)', available: true },
      { name: '40 (L)', available: true },
      { name: '42 (XL)', available: true },
      { name: '44 (XXL)', available: true }
    ],
    colours: [
      { name: 'Royal Mustard', hex: '#d4af37', available: true },
      { name: 'Ruby Wine', hex: '#631326', available: true }
    ],
    attributes_json: {
      fabric: 'Pure Matka Silk',
      fit: 'Tailored Fit',
      pattern: 'Embroidered',
      occasion: 'Wedding & Festive'
    },
    images: [
      {
        id: 'img-m4-1',
        image_url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1000&auto=format&fit=crop',
        alt_text: 'Silk Embroidered Bundi Kurta Set',
        is_primary: true
      }
    ]
  },

  // WOMEN PRODUCTS
  {
    id: 'prod-wom-01',
    name: 'Pure Kanchipuram Gold Zari Bridal Silk Saree',
    slug: 'pure-kanchipuram-gold-zari-bridal-silk-saree',
    department: 'women',
    category_name: 'Sarees',
    subcategory_name: 'Kanchipuram / Kanjivaram',
    brand: 'Style Zone Royal Silks',
    price: 18999,
    discount_price: 14499,
    currency: '₹',
    availability: 'in_stock',
    sku: 'SZ-W-SR-001',
    is_featured: true,
    is_published: true,
    description: 'An authentic master-weaver Kanjivaram silk saree in luminous vermilion crimson. Features heavy 24k electroplated gold zari woven with traditional peacock and temple border motifs. Includes matching unstitched pure silk blouse piece.',
    sizes: [
      { name: 'Free Size (6.3m)', available: true }
    ],
    colours: [
      { name: 'Royal Crimson Red', hex: '#990000', available: true },
      { name: 'Peacock Teal', hex: '#005f73', available: true },
      { name: 'Rani Magenta Pink', hex: '#b5179e', available: true }
    ],
    attributes_json: {
      saree_type: 'Kanchipuram / Kanjivaram',
      fabric: '100% Pure Mulberry Silk',
      occasion: 'Bridal & Wedding',
      pattern: 'Gold Zari Brocade',
      blouse_piece: 'Included (Unstitched)'
    },
    images: [
      {
        id: 'img-w1-1',
        image_url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1000&auto=format&fit=crop',
        alt_text: 'Pure Kanchipuram Bridal Saree',
        is_primary: true
      },
      {
        id: 'img-w1-2',
        image_url: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1000&auto=format&fit=crop',
        alt_text: 'Zari Border Detail',
        is_primary: false
      }
    ]
  },
  {
    id: 'prod-wom-02',
    name: 'Varanasi Handloom Banarasi Georgette Saree',
    slug: 'varanasi-handloom-banarasi-georgette-saree',
    department: 'women',
    category_name: 'Sarees',
    subcategory_name: 'Banarasi Sarees',
    brand: 'Style Zone Royal Silks',
    price: 12499,
    discount_price: 9999,
    currency: '₹',
    availability: 'in_stock',
    sku: 'SZ-W-SR-002',
    is_featured: true,
    is_published: true,
    description: 'Whisper-light pure Khaddi Georgette woven in Varanasi with fine silver zari florals and meenakari highlights for effortless gala elegance.',
    sizes: [
      { name: 'Free Size (6.3m)', available: true }
    ],
    colours: [
      { name: 'Pastel Lilac', hex: '#c8b6ff', available: true },
      { name: 'Mint Jade', hex: '#b7e4c7', available: true },
      { name: 'Blush Rose', hex: '#f7cad0', available: true }
    ],
    attributes_json: {
      saree_type: 'Banarasi Sarees',
      fabric: 'Pure Khaddi Georgette Silk',
      occasion: 'Festive & Reception',
      pattern: 'Silver Zari & Meenakari'
    },
    images: [
      {
        id: 'img-w2-1',
        image_url: 'https://images.unsplash.com/photo-1583391733975-00c73e0a1334?q=80&w=1000&auto=format&fit=crop',
        alt_text: 'Banarasi Georgette Saree',
        is_primary: true
      }
    ]
  },
  {
    id: 'prod-wom-03',
    name: 'Couture Satin Draped Evening Gown',
    slug: 'couture-satin-draped-evening-gown',
    department: 'women',
    category_name: 'Dresses & Western',
    subcategory_name: 'Evening Gowns',
    brand: 'Style Zone Atelier',
    price: 5499,
    discount_price: 4299,
    currency: '₹',
    availability: 'in_stock',
    sku: 'SZ-W-DR-003',
    is_featured: false,
    is_published: true,
    description: 'Floor-sweeping liquid silk satin gown with architectural cowl neck, structured corset boning, and subtle side slit.',
    sizes: [
      { name: 'XS', available: true },
      { name: 'S', available: true },
      { name: 'M', available: true },
      { name: 'L', available: false }
    ],
    colours: [
      { name: 'Champagne Gold', hex: '#e0c9a6', available: true },
      { name: 'Midnight Black', hex: '#0f0f11', available: true },
      { name: 'Burgundy', hex: '#581825', available: true }
    ],
    attributes_json: {
      fabric: 'Liquid Silk Satin',
      fit: 'Hourglass Corset',
      pattern: 'Solid',
      occasion: 'Cocktail & Evening Gala'
    },
    images: [
      {
        id: 'img-w3-1',
        image_url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000&auto=format&fit=crop',
        alt_text: 'Satin Draped Evening Gown',
        is_primary: true
      }
    ]
  },

  // KIDS PRODUCTS
  {
    id: 'prod-kids-01',
    name: 'Organic Cotton Newborn Welcome Romper Set',
    slug: 'organic-cotton-newborn-welcome-romper-set',
    department: 'kids',
    category_name: 'Newborn & Infants',
    subcategory_name: 'Gift Sets',
    age_group: '0–3 Months',
    brand: 'Style Zone Petite',
    price: 1299,
    discount_price: 999,
    currency: '₹',
    availability: 'in_stock',
    sku: 'SZ-K-NB-001',
    is_featured: true,
    is_published: true,
    description: '5-piece ultra-soft GOTS certified organic cotton gift set including kimono snap romper, mittens, cap, bib, and muslin swaddle.',
    sizes: [
      { name: '0–3 Months', available: true },
      { name: '3–6 Months', available: true },
      { name: '6–9 Months', available: true }
    ],
    colours: [
      { name: 'Pastel Cloud Yellow', hex: '#fff3b0', available: true },
      { name: 'Soft Mint', hex: '#d8f3dc', available: true },
      { name: 'Baby Pink', hex: '#ffccd5', available: true }
    ],
    attributes_json: {
      fabric: '100% GOTS Organic Cotton',
      fit: 'Comfort Fit',
      pattern: 'Minimal Animal Embroidery',
      age_range: '0–6 Months'
    },
    images: [
      {
        id: 'img-k1-1',
        image_url: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?q=80&w=1000&auto=format&fit=crop',
        alt_text: 'Newborn Romper Set',
        is_primary: true
      }
    ]
  },
  {
    id: 'prod-kids-02',
    name: 'Little Prince Royal Velvet Sherwani Set',
    slug: 'little-prince-royal-velvet-sherwani-set',
    department: 'kids',
    category_name: 'Party & Festive Wear',
    subcategory_name: 'Baby Sherwanis',
    age_group: '2–3 Years',
    brand: 'Style Zone Petite',
    price: 3499,
    discount_price: 2799,
    currency: '₹',
    availability: 'in_stock',
    sku: 'SZ-K-FS-002',
    is_featured: false,
    is_published: true,
    description: 'Micro-velvet regal jacket adorned with golden antique buttons, silk dhoti pants, and matching lightweight stole for your little maharaja.',
    sizes: [
      { name: '1–2 Years', available: true },
      { name: '2–3 Years', available: true },
      { name: '3–4 Years', available: true },
      { name: '4–5 Years', available: true }
    ],
    colours: [
      { name: 'Royal Navy Blue', hex: '#1d3557', available: true },
      { name: 'Maroon Gold', hex: '#7209b7', available: true }
    ],
    attributes_json: {
      fabric: 'Micro Velvet & Silk Blend',
      fit: 'Tailored Kidswear',
      pattern: 'Gold Embellished'
    },
    images: [
      {
        id: 'img-k2-1',
        image_url: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1000&auto=format&fit=crop',
        alt_text: 'Velvet Sherwani Set for Kids',
        is_primary: true
      }
    ]
  },

  // BOYS PRODUCTS
  {
    id: 'prod-boy-01',
    name: 'Boys Oxford Classic Tartan Checks Shirt',
    slug: 'boys-oxford-classic-tartan-checks-shirt',
    department: 'boys',
    category_name: 'Shirts',
    subcategory_name: 'Checks',
    age_group: '8–10 Years',
    brand: 'Style Zone Junior',
    price: 1499,
    discount_price: 1199,
    currency: '₹',
    availability: 'in_stock',
    sku: 'SZ-B-SH-001',
    is_featured: true,
    is_published: true,
    description: 'Pre-washed breathable 100% cotton Oxford shirt featuring timeless Scottish tartan checks and wooden button details.',
    sizes: [
      { name: '6–8 Years', available: true },
      { name: '8–10 Years', available: true },
      { name: '10–12 Years', available: true },
      { name: '12–14 Years', available: true },
      { name: '14–16 Years', available: true }
    ],
    colours: [
      { name: 'Classic Navy Red', hex: '#2b2d42', available: true },
      { name: 'Olive Forest', hex: '#4f772d', available: true }
    ],
    attributes_json: {
      fabric: '100% Oxford Cotton',
      fit: 'Regular Fit',
      pattern: 'Checks',
      sleeve: 'Full Sleeve'
    },
    images: [
      {
        id: 'img-b1-1',
        image_url: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?q=80&w=1000&auto=format&fit=crop',
        alt_text: 'Boys Classic Checks Shirt',
        is_primary: true
      }
    ]
  },
  {
    id: 'prod-boy-02',
    name: 'Boys Multi-Pocket Tactical Cargo Pants',
    slug: 'boys-multi-pocket-tactical-cargo-pants',
    department: 'boys',
    category_name: 'Jeans & Cargo Pants',
    subcategory_name: 'Cargo Pants',
    age_group: '10–12 Years',
    brand: 'Style Zone Junior',
    price: 1799,
    discount_price: 1399,
    currency: '₹',
    availability: 'in_stock',
    sku: 'SZ-B-CG-002',
    is_featured: false,
    is_published: true,
    description: 'Heavy duty stretch ripstop cargo pants with 6 utility pockets and elasticated adjustable inner waistband.',
    sizes: [
      { name: '8–10 Years', available: true },
      { name: '10–12 Years', available: true },
      { name: '12–14 Years', available: true },
      { name: '14–16 Years', available: true }
    ],
    colours: [
      { name: 'Desert Khaki', hex: '#c2b280', available: true },
      { name: 'Stealth Black', hex: '#111111', available: true }
    ],
    attributes_json: {
      fabric: 'Cotton Ripstop Stretch',
      fit: 'Relaxed Cargo',
      pattern: 'Solid Utility'
    },
    images: [
      {
        id: 'img-b2-1',
        image_url: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?q=80&w=1000&auto=format&fit=crop',
        alt_text: 'Boys Tactical Cargo Pants',
        is_primary: true
      }
    ]
  },

  // GIRLS PRODUCTS
  {
    id: 'prod-girl-01',
    name: 'Girls Sparkling Tulle Tiered Ballerina Frock',
    slug: 'girls-sparkling-tulle-tiered-ballerina-frock',
    department: 'girls',
    category_name: 'Dresses & Frocks',
    subcategory_name: 'Tulle Dresses',
    age_group: '6–8 Years',
    brand: 'Style Zone Junior',
    price: 2499,
    discount_price: 1899,
    currency: '₹',
    availability: 'in_stock',
    sku: 'SZ-G-DR-001',
    is_featured: true,
    is_published: true,
    description: 'Magical 5-layer shimmering tulle dress with soft cotton lining, pearl embellished waistband, and satin tie-up back bow.',
    sizes: [
      { name: '4–5 Years', available: true },
      { name: '5–6 Years', available: true },
      { name: '6–8 Years', available: true },
      { name: '8–10 Years', available: true },
      { name: '10–12 Years', available: true }
    ],
    colours: [
      { name: 'Princess Blush Pink', hex: '#f4acb7', available: true },
      { name: 'Sky Lavender', hex: '#d8b4e2', available: true },
      { name: 'Snow Ivory', hex: '#fdfbf7', available: true }
    ],
    attributes_json: {
      fabric: 'Shimmer Tulle & Pure Cotton Lining',
      fit: 'Flared Party Fit',
      pattern: 'Glitter & Pearls',
      occasion: 'Birthday & Party'
    },
    images: [
      {
        id: 'img-g1-1',
        image_url: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?q=80&w=1000&auto=format&fit=crop',
        alt_text: 'Girls Sparkling Tulle Frock',
        is_primary: true
      }
    ]
  },
  {
    id: 'prod-girl-02',
    name: 'Girls Handcrafted Bandhani Chaniya Choli Set',
    slug: 'girls-handcrafted-bandhani-chaniya-choli-set',
    department: 'girls',
    category_name: 'Ethnic & Festive',
    subcategory_name: 'Lehenga Choli',
    age_group: '8–10 Years',
    brand: 'Style Zone Heritage',
    price: 2999,
    discount_price: 2399,
    currency: '₹',
    availability: 'in_stock',
    sku: 'SZ-G-ET-002',
    is_featured: true,
    is_published: true,
    description: 'Festive pure silk blend Bandhani print flared lehenga choli with mirror work tassels and lightweight net dupatta.',
    sizes: [
      { name: '4–5 Years', available: true },
      { name: '6–8 Years', available: true },
      { name: '8–10 Years', available: true },
      { name: '10–12 Years', available: true },
      { name: '12–14 Years', available: true }
    ],
    colours: [
      { name: 'Sunrise Yellow & Coral', hex: '#f9844a', available: true },
      { name: 'Emerald Rani', hex: '#43aa8b', available: true }
    ],
    attributes_json: {
      fabric: 'Art Silk with Cotton Inner',
      fit: 'Traditional Flared',
      pattern: 'Bandhani Mirror Work'
    },
    images: [
      {
        id: 'img-g2-1',
        image_url: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1000&auto=format&fit=crop',
        alt_text: 'Girls Bandhani Chaniya Choli Set',
        is_primary: true
      }
    ]
  }
];

export const INITIAL_COLLECTIONS = [
  {
    id: 'col-01',
    name: 'New Arrivals 2026',
    slug: 'new-arrivals',
    badge_tag: 'JUST IN',
    description: 'Fresh runway cuts, seasonal linen palettes, and handcrafted bridal additions.',
    image_url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop',
    display_order: 1,
    is_visible: true,
    product_ids: ['prod-men-01', 'prod-wom-01', 'prod-kids-01', 'prod-boy-01', 'prod-girl-01']
  },
  {
    id: 'col-02',
    name: 'Royal Heritage & Wedding Edit',
    slug: 'royal-heritage',
    badge_tag: 'BRIDAL & GROOM',
    description: 'Authentic pure Kanjivaram silks, Banarasi brocades and hand-embroidered groom sherwanis.',
    image_url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1000&auto=format&fit=crop',
    display_order: 2,
    is_visible: true,
    product_ids: ['prod-wom-01', 'prod-wom-02', 'prod-men-04', 'prod-girl-02', 'prod-kids-02']
  },
  {
    id: 'col-03',
    name: 'Bespoke Linen & Summer Soiree',
    slug: 'summer-linen',
    badge_tag: 'SUMMER RESORT',
    description: 'Pure French linen shirts, silk georgettes and breezy daytime party wear.',
    image_url: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1000&auto=format&fit=crop',
    display_order: 3,
    is_visible: true,
    product_ids: ['prod-men-01', 'prod-men-02', 'prod-men-03', 'prod-wom-03']
  }
];

export const DEPARTMENT_METADATA = {
  kids: {
    title: 'Kids Collection',
    tagline: 'Delightful, skin-safe & playful fashion for newborns to teenagers',
    image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?q=80&w=1200&auto=format&fit=crop',
    accent: '#ffb703'
  },
  boys: {
    title: 'Boys Department',
    tagline: 'Sharp checked shirts, utility cargos, ethnic kurtas & activewear',
    image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?q=80&w=1200&auto=format&fit=crop',
    accent: '#219ebc'
  },
  girls: {
    title: 'Girls Department',
    tagline: 'Fairytale frocks, traditional lehenga cholis & stylish western separates',
    image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?q=80&w=1200&auto=format&fit=crop',
    accent: '#f72585'
  },
  men: {
    title: 'Men’s Collection',
    tagline: 'Artisanal linen shirts, Italian tailored trousers & grand sherwanis',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1200&auto=format&fit=crop',
    accent: '#b5838d'
  },
  women: {
    title: 'Women’s Collection',
    tagline: 'Heirloom Kanjivarams, Banarasi georgettes, cocktail gowns & chic ethnic wear',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1200&auto=format&fit=crop',
    accent: '#d4af37'
  }
};
