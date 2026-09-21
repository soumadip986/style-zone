import { supabase, isSupabaseConfigured } from './supabase';
import {
  INITIAL_SHOP,
  INITIAL_CATEGORIES,
  INITIAL_PRODUCTS,
  INITIAL_COLLECTIONS,
  INITIAL_AGE_RANGES
} from './initialData';

const STORAGE_KEYS = {
  SHOP: 'sz_shop_settings',
  CATEGORIES: 'sz_categories',
  PRODUCTS: 'sz_products',
  COLLECTIONS: 'sz_collections',
  AGE_RANGES: 'sz_age_ranges'
};

// Helper for local storage persistence
function getLocalItem(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.warn(`Error reading ${key} from storage:`, e);
    return fallback;
  }
}

function setLocalItem(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.warn(`Error writing ${key} to storage:`, e);
  }
}

// Utility to check if a string is a valid UUID
function isUUID(str) {
  if (typeof str !== 'string') return false;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(str);
}

export const StorageService = {
  // --- SUPABASE STORAGE FILE UPLOAD ---
  async uploadFile(file, bucket = 'product-images') {
    if (!file) return null;

    if (isSupabaseConfigured && supabase) {
      try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
        const filePath = `${fileName}`;

        const { data, error } = await supabase.storage
          .from(bucket)
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
          });

        if (error) {
          console.warn('Supabase storage upload error, falling back:', error);
        } else {
          const { data: publicData } = supabase.storage
            .from(bucket)
            .getPublicUrl(filePath);

          if (publicData?.publicUrl) {
            return {
              url: publicData.publicUrl,
              path: filePath,
              name: file.name
            };
          }
        }
      } catch (err) {
        console.warn('Supabase storage upload exception:', err);
      }
    }

    // Fallback to Data URL for offline preview
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve({
          url: e.target.result,
          path: '',
          name: file.name
        });
      };
      reader.readAsDataURL(file);
    });
  },

  // --- SHOP SETTINGS ---
  async getShopSettings() {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('shops').select('*').limit(1).maybeSingle();
        if (!error && data) {
          return {
            ...INITIAL_SHOP,
            ...data,
            theme: data.theme_config || INITIAL_SHOP.theme,
            homepage: data.homepage_config || INITIAL_SHOP.homepage,
            opening_hours: data.opening_hours || INITIAL_SHOP.opening_hours,
            social: data.social || INITIAL_SHOP.social
          };
        }
      } catch (err) {
        console.warn('Supabase getShopSettings fallback:', err);
      }
    }
    return getLocalItem(STORAGE_KEYS.SHOP, INITIAL_SHOP);
  },

  async updateShopSettings(updatedShop) {
    setLocalItem(STORAGE_KEYS.SHOP, updatedShop);
    if (isSupabaseConfigured && supabase) {
      try {
        const shopPayload = {
          name: updatedShop.name,
          tagline: updatedShop.tagline,
          description: updatedShop.description,
          phone: updatedShop.phone,
          whatsapp: updatedShop.whatsapp,
          email: updatedShop.email,
          address: updatedShop.address,
          maps_url: updatedShop.maps_url,
          embed_maps_url: updatedShop.embed_maps_url,
          latitude: updatedShop.latitude,
          longitude: updatedShop.longitude,
          social: updatedShop.social,
          theme_config: updatedShop.theme,
          homepage_config: updatedShop.homepage,
          opening_hours: updatedShop.opening_hours,
          updated_at: new Date().toISOString()
        };

        if (isUUID(updatedShop.id)) {
          shopPayload.id = updatedShop.id;
        }

        const { data, error } = await supabase
          .from('shops')
          .upsert(shopPayload)
          .select()
          .maybeSingle();

        if (!error && data) {
          return { ...updatedShop, id: data.id };
        }
      } catch (err) {
        console.warn('Supabase updateShopSettings sync error:', err);
      }
    }
    return updatedShop;
  },

  // --- CATEGORIES ---
  async getCategories() {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .order('display_order', { ascending: true });
        if (!error && data && data.length > 0) {
          setLocalItem(STORAGE_KEYS.CATEGORIES, data);
          return data;
        }
      } catch (err) {
        console.warn('Supabase getCategories fallback:', err);
      }
    }
    return getLocalItem(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
  },

  async addCategory(catData) {
    if (isSupabaseConfigured && supabase) {
      try {
        const catPayload = {
          name: catData.name,
          slug: catData.slug,
          department: catData.department,
          description: catData.description || '',
          image_url: catData.image_url || '',
          subcategories: catData.subcategories || [],
          display_order: catData.display_order || 0,
          is_visible: catData.is_visible !== false
        };
        if (isUUID(catData.id)) {
          catPayload.id = catData.id;
        }

        const { data, error } = await supabase
          .from('categories')
          .insert(catPayload)
          .select()
          .single();

        if (!error && data) {
          return data;
        }
      } catch (err) {
        console.warn('Supabase addCategory error:', err);
      }
    }
    return catData;
  },

  async updateCategory(id, catData) {
    if (isSupabaseConfigured && supabase && isUUID(id)) {
      try {
        await supabase
          .from('categories')
          .update({
            name: catData.name,
            slug: catData.slug,
            department: catData.department,
            description: catData.description,
            image_url: catData.image_url,
            subcategories: catData.subcategories,
            display_order: catData.display_order,
            is_visible: catData.is_visible,
            updated_at: new Date().toISOString()
          })
          .eq('id', id);
      } catch (err) {
        console.warn('Supabase updateCategory error:', err);
      }
    }
    return catData;
  },

  async deleteCategory(id) {
    if (isSupabaseConfigured && supabase && isUUID(id)) {
      try {
        await supabase.from('categories').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase deleteCategory error:', err);
      }
    }
  },

  async saveCategories(categories) {
    setLocalItem(STORAGE_KEYS.CATEGORIES, categories);
    return categories;
  },

  // --- PRODUCTS ---
  async getProducts() {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*, product_images(*)')
          .order('created_at', { ascending: false });
        if (!error && data && data.length > 0) {
          const mapped = data.map((p) => ({
            ...p,
            images: p.product_images || []
          }));
          setLocalItem(STORAGE_KEYS.PRODUCTS, mapped);
          return mapped;
        }
      } catch (err) {
        console.warn('Supabase getProducts fallback:', err);
      }
    }
    return getLocalItem(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
  },

  async addProduct(productData) {
    if (isSupabaseConfigured && supabase) {
      try {
        const prodPayload = {
          name: productData.name,
          slug: productData.slug,
          description: productData.description || '',
          sku: productData.sku || '',
          brand: productData.brand || 'Style Zone Exclusive',
          department: productData.department,
          category_name: productData.category_name || '',
          subcategory_name: productData.subcategory_name || '',
          age_group: productData.age_group || '',
          price: productData.price,
          discount_price: productData.discount_price || null,
          availability: productData.availability || 'in_stock',
          sizes: productData.sizes || [],
          colours: productData.colours || [],
          variants: productData.variants || [],
          attributes_json: productData.attributes_json || {},
          is_featured: Boolean(productData.is_featured),
          is_published: productData.is_published !== false
        };

        if (isUUID(productData.id)) {
          prodPayload.id = productData.id;
        }

        const { data: insertedProduct, error: prodErr } = await supabase
          .from('products')
          .insert(prodPayload)
          .select()
          .single();

        if (!prodErr && insertedProduct) {
          const productId = insertedProduct.id;
          // Insert images if present
          if (productData.images && productData.images.length > 0) {
            const imagePayloads = productData.images.map((img, idx) => ({
              product_id: productId,
              image_url: img.image_url,
              storage_path: img.storage_path || '',
              alt_text: img.alt_text || productData.name,
              display_order: idx,
              is_primary: idx === 0 || Boolean(img.is_primary)
            }));

            const { data: insertedImages } = await supabase
              .from('product_images')
              .insert(imagePayloads)
              .select();

            return {
              ...insertedProduct,
              images: insertedImages || productData.images
            };
          }
          return { ...insertedProduct, images: [] };
        }
      } catch (err) {
        console.warn('Supabase addProduct error:', err);
      }
    }
    return productData;
  },

  async updateProduct(id, productData) {
    if (isSupabaseConfigured && supabase && isUUID(id)) {
      try {
        await supabase
          .from('products')
          .update({
            name: productData.name,
            slug: productData.slug,
            description: productData.description,
            sku: productData.sku,
            brand: productData.brand,
            department: productData.department,
            category_name: productData.category_name,
            subcategory_name: productData.subcategory_name,
            age_group: productData.age_group,
            price: productData.price,
            discount_price: productData.discount_price,
            availability: productData.availability,
            sizes: productData.sizes,
            colours: productData.colours,
            variants: productData.variants,
            attributes_json: productData.attributes_json,
            is_featured: productData.is_featured,
            is_published: productData.is_published,
            updated_at: new Date().toISOString()
          })
          .eq('id', id);

        // Update product images: delete existing and reinsert
        if (productData.images) {
          await supabase.from('product_images').delete().eq('product_id', id);

          if (productData.images.length > 0) {
            const imagePayloads = productData.images.map((img, idx) => ({
              product_id: id,
              image_url: img.image_url,
              storage_path: img.storage_path || '',
              alt_text: img.alt_text || productData.name,
              display_order: idx,
              is_primary: Boolean(img.is_primary)
            }));
            await supabase.from('product_images').insert(imagePayloads);
          }
        }
      } catch (err) {
        console.warn('Supabase updateProduct error:', err);
      }
    }
    return productData;
  },

  async deleteProduct(id) {
    if (isSupabaseConfigured && supabase && isUUID(id)) {
      try {
        await supabase.from('products').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase deleteProduct error:', err);
      }
    }
  },

  async saveProducts(products) {
    setLocalItem(STORAGE_KEYS.PRODUCTS, products);
    return products;
  },

  // --- COLLECTIONS ---
  async getCollections() {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('collections')
          .select('*')
          .order('display_order', { ascending: true });
        if (!error && data && data.length > 0) {
          setLocalItem(STORAGE_KEYS.COLLECTIONS, data);
          return data;
        }
      } catch (err) {
        console.warn('Supabase getCollections fallback:', err);
      }
    }
    return getLocalItem(STORAGE_KEYS.COLLECTIONS, INITIAL_COLLECTIONS);
  },

  async addCollection(colData) {
    if (isSupabaseConfigured && supabase) {
      try {
        const colPayload = {
          name: colData.name,
          slug: colData.slug,
          description: colData.description || '',
          image_url: colData.image_url || '',
          badge_tag: colData.badge_tag || 'EXCLUSIVE EDIT',
          product_ids: colData.product_ids || [],
          display_order: colData.display_order || 0,
          is_visible: colData.is_visible !== false
        };
        if (isUUID(colData.id)) {
          colPayload.id = colData.id;
        }

        const { data, error } = await supabase
          .from('collections')
          .insert(colPayload)
          .select()
          .single();

        if (!error && data) {
          return data;
        }
      } catch (err) {
        console.warn('Supabase addCollection error:', err);
      }
    }
    return colData;
  },

  async updateCollection(id, colData) {
    if (isSupabaseConfigured && supabase && isUUID(id)) {
      try {
        await supabase
          .from('collections')
          .update({
            name: colData.name,
            slug: colData.slug,
            description: colData.description,
            image_url: colData.image_url,
            badge_tag: colData.badge_tag,
            product_ids: colData.product_ids,
            display_order: colData.display_order,
            is_visible: colData.is_visible,
            updated_at: new Date().toISOString()
          })
          .eq('id', id);
      } catch (err) {
        console.warn('Supabase updateCollection error:', err);
      }
    }
    return colData;
  },

  async deleteCollection(id) {
    if (isSupabaseConfigured && supabase && isUUID(id)) {
      try {
        await supabase.from('collections').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase deleteCollection error:', err);
      }
    }
  },

  async saveCollections(collections) {
    setLocalItem(STORAGE_KEYS.COLLECTIONS, collections);
    return collections;
  },

  // --- AGE RANGES ---
  async getAgeRanges() {
    return getLocalItem(STORAGE_KEYS.AGE_RANGES, INITIAL_AGE_RANGES);
  },

  async saveAgeRanges(ageRanges) {
    setLocalItem(STORAGE_KEYS.AGE_RANGES, ageRanges);
    return ageRanges;
  },

  // --- RESET TO FACTORY DEMO DATA ---
  resetToInitial() {
    setLocalItem(STORAGE_KEYS.SHOP, INITIAL_SHOP);
    setLocalItem(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
    setLocalItem(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
    setLocalItem(STORAGE_KEYS.COLLECTIONS, INITIAL_COLLECTIONS);
    setLocalItem(STORAGE_KEYS.AGE_RANGES, INITIAL_AGE_RANGES);
    return {
      shop: INITIAL_SHOP,
      categories: INITIAL_CATEGORIES,
      products: INITIAL_PRODUCTS,
      collections: INITIAL_COLLECTIONS,
      ageRanges: INITIAL_AGE_RANGES
    };
  }
};

