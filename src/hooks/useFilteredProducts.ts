import { useMemo } from 'react';
import type { Product } from '../types';

const useFilteredProducts = (
  products: Product[],
  searchTerm: string,
  selectedCategory: string
): Product[] => {
  return useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === '' || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);
};

export default useFilteredProducts;
