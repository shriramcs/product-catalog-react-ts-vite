import { useEffect, useState } from 'react';
import './App.css';
import type { Product } from './types';
import SearchFilter from './components/SearchFilter';
import ProductList from './components/ProductList';
import Pagination from './components/Pagination';

const API_URL = 'https://fakestoreapi.com/products';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage] = useState<number>(5);

  // Search/Filter
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);

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
        setError(
          err instanceof Error ? err.message : 'An unknown error occurred'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on search term and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === '' || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Get current products for pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when changing category
  };

  return (
    <div className="app">
      <h1>Product Catalog</h1>

      <SearchFilter
        searchTerm={searchTerm}
        onSearchChange={handleSearch}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      {loading && <div className="loading">Loading products...</div>}
      {error && <div className="error">Error: {error}</div>}

      {!loading && !error && (
        <>
          <ProductList products={currentProducts} />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />

          {currentProducts.length > 0 ? (
            <div className="results-info">
              Showing {currentProducts.length} of {filteredProducts.length}{' '}
              products
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}

export default App;
