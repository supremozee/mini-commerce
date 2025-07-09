import { Product } from '@/types';
import productsData from '@/data/products.json';

const STORAGE_KEY = 'mini-commerce-products';

export const seedProductsToLocalStorage = (): void => {
  if (typeof window === 'undefined') return;
  
  const existingProducts = localStorage.getItem(STORAGE_KEY);
  if (!existingProducts) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(productsData));
  }
};

export const getProductsFromLocalStorage = (): Product[] => {
  if (typeof window === 'undefined') return productsData as Product[];
  
  try {
    const products = localStorage.getItem(STORAGE_KEY);
    return products ? JSON.parse(products) : productsData;
  } catch (error) {
    console.error('Error getting products:', error);
    return productsData as Product[];
  }
};

export const getProductBySlug = (slug: string): Product | undefined => {
  // For SSR, use the static data directly
  if (typeof window === 'undefined') {
    return (productsData as Product[]).find(product => product.slug === slug);
  }
  
  // For client-side, use localStorage
  const products = getProductsFromLocalStorage();
  return products.find(product => product.slug === slug);
};
