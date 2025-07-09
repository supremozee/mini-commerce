'use client';

import { useQuery } from '@tanstack/react-query';
import { Product } from '@/types';
import { getProductsFromLocalStorage, seedProductsToLocalStorage } from '@/lib/products';

export const useProducts = () => {
  return useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: () => {
      seedProductsToLocalStorage();
      const products = getProductsFromLocalStorage();
      if (products.length === 0) {
        throw new Error('No products found');
      }
      return products
    },
  });
};
