import { useState, useEffect } from 'react';
import type { Product } from '../types';

const API_URL = 'https://fakestoreapi.com/products';

interface UseProductsResult {
  products: Product[];
  loading: boolean;
  error: string | null;
  categories: string[];
  fetchProducts: (url?: string) => void;
  removeProduct: (id: number) => void;
}

const useProducts = (initialUrl: string = API_URL): UseProductsResult => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  const fetchProducts = async (url: string = initialUrl) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setProducts(data);

      // Extract unique categories
      const uniqueCategories: string[] = [
        ...new Set(data.map((product: Product) => product.category)),
      ] as string[];
      setCategories(uniqueCategories);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const removeProduct = (id: number) => {
    setProducts(products.filter(prod=> prod.id != id));
  }

  useEffect(() => {
    fetchProducts();
  }, [initialUrl]);

  return { products, loading, error, categories, fetchProducts, removeProduct };
};

export default useProducts;