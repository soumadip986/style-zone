import React, { createContext, useContext, useState, useEffect } from 'react';
import { StorageService } from '../lib/storage';
import {
  INITIAL_SHOP,
  INITIAL_CATEGORIES,
  INITIAL_PRODUCTS,
  INITIAL_COLLECTIONS,
  INITIAL_AGE_RANGES
} from '../lib/initialData';

const ShopContext = createContext(null);

export function ShopProvider({ children }) {
  const [shop, setShop] = useState(INITIAL_SHOP);
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [collections, setCollections] = useState(INITIAL_COLLECTIONS);
  const [ageRanges, setAgeRanges] = useState(INITIAL_AGE_RANGES);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize data on mount
  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const [loadedShop, loadedCats, loadedProds, loadedCols, loadedAges] = await Promise.all([
          StorageService.getShopSettings(),
          StorageService.getCategories(),
          StorageService.getProducts(),
          StorageService.getCollections(),
          StorageService.getAgeRanges()
        ]);

        if (loadedShop) setShop(loadedShop);
        if (loadedCats && loadedCats.length > 0) setCategories(loadedCats);
        if (loadedProds && loadedProds.length > 0) setProducts(loadedProds);
        if (loadedCols && loadedCols.length > 0) setCollections(loadedCols);
        if (loadedAges && loadedAges.length > 0) setAgeRanges(loadedAges);
      } catch (err) {
        console.error('Error initializing store data:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  // --- SHOP SETTINGS ---
  const updateShopSettings = async (newSettings) => {
    const updated = { ...shop, ...newSettings };
    setShop(updated);
    const saved = await StorageService.updateShopSettings(updated);
    if (saved) setShop((prev) => ({ ...prev, ...saved }));
    return updated;
  };

  // --- PRODUCTS ---
  const addProduct = async (productData) => {
    const newProduct = {
      ...productData,
      id: productData.id || `prod-${Date.now()}`,
      created_at: new Date().toISOString()
    };
    const savedProduct = await StorageService.addProduct(newProduct);
    const itemToAdd = savedProduct || newProduct;
    const updated = [itemToAdd, ...products];
    setProducts(updated);
    await StorageService.saveProducts(updated);
    return itemToAdd;
  };

  const updateProduct = async (id, productData) => {
    const updatedList = products.map((p) => (p.id === id ? { ...p, ...productData, updated_at: new Date().toISOString() } : p));
    setProducts(updatedList);
    const saved = await StorageService.updateProduct(id, productData);
    await StorageService.saveProducts(updatedList);
    return saved;
  };

  const deleteProduct = async (id) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    await StorageService.deleteProduct(id);
    await StorageService.saveProducts(updated);
  };

  const duplicateProduct = async (id) => {
    const original = products.find((p) => p.id === id);
    if (!original) return null;

    const duplicated = {
      ...original,
      id: `prod-${Date.now()}`,
      name: `${original.name} (Copy)`,
      slug: `${original.slug}-copy-${Date.now().toString().slice(-4)}`,
      sku: original.sku ? `${original.sku}-COPY` : '',
      is_published: false,
      created_at: new Date().toISOString()
    };

    const saved = await StorageService.addProduct(duplicated);
    const itemToAdd = saved || duplicated;
    const updated = [itemToAdd, ...products];
    setProducts(updated);
    await StorageService.saveProducts(updated);
    return itemToAdd;
  };

  // --- CATEGORIES ---
  const addCategory = async (catData) => {
    const newCat = {
      ...catData,
      id: catData.id || `cat-${catData.department}-${Date.now()}`,
      subcategories: catData.subcategories || [],
      is_visible: catData.is_visible !== false
    };
    const savedCat = await StorageService.addCategory(newCat);
    const itemToAdd = savedCat || newCat;
    const updated = [...categories, itemToAdd];
    setCategories(updated);
    await StorageService.saveCategories(updated);
    return itemToAdd;
  };

  const updateCategory = async (id, catData) => {
    const updated = categories.map((c) => (c.id === id ? { ...c, ...catData } : c));
    setCategories(updated);
    await StorageService.updateCategory(id, catData);
    await StorageService.saveCategories(updated);
  };

  const deleteCategory = async (id) => {
    const updated = categories.filter((c) => c.id !== id);
    setCategories(updated);
    await StorageService.deleteCategory(id);
    await StorageService.saveCategories(updated);
  };

  // --- COLLECTIONS ---
  const addCollection = async (colData) => {
    const newCol = {
      ...colData,
      id: colData.id || `col-${Date.now()}`,
      product_ids: colData.product_ids || [],
      is_visible: colData.is_visible !== false
    };
    const savedCol = await StorageService.addCollection(newCol);
    const itemToAdd = savedCol || newCol;
    const updated = [...collections, itemToAdd];
    setCollections(updated);
    await StorageService.saveCollections(updated);
    return itemToAdd;
  };

  const updateCollection = async (id, colData) => {
    const updated = collections.map((c) => (c.id === id ? { ...c, ...colData } : c));
    setCollections(updated);
    await StorageService.updateCollection(id, colData);
    await StorageService.saveCollections(updated);
  };

  const deleteCollection = async (id) => {
    const updated = collections.filter((c) => c.id !== id);
    setCollections(updated);
    await StorageService.deleteCollection(id);
    await StorageService.saveCollections(updated);
  };

  // --- RESET TO FACTORY DEMO ---
  const resetToFactoryDefaults = () => {
    const initial = StorageService.resetToInitial();
    setShop(initial.shop);
    setCategories(initial.categories);
    setProducts(initial.products);
    setCollections(initial.collections);
    setAgeRanges(initial.ageRanges);
  };

  return (
    <ShopContext.Provider
      value={{
        shop,
        categories,
        products,
        collections,
        ageRanges,
        isLoading,
        updateShopSettings,
        addProduct,
        updateProduct,
        deleteProduct,
        duplicateProduct,
        addCategory,
        updateCategory,
        deleteCategory,
        addCollection,
        updateCollection,
        deleteCollection,
        resetToFactoryDefaults
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}
