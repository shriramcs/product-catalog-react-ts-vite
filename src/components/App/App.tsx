import './App.css';
import { useState } from 'react';
import useProducts from '../../hooks/useProducts';
import useFilteredProducts from '../../hooks/useFilteredProducts';
import usePagination from '../../hooks/usePagination';
import SearchFilter from '../SearchFilter';
import ProductList from '../ProductList';
import Pagination from '../Pagination';

function App() {
  const { products, loading, error, categories } = useProducts();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage = 5;

  // Use the custom hook for filtering
  const filteredProducts = useFilteredProducts(products, searchTerm, selectedCategory);

  // Use the custom hook for pagination
  const { paginatedData: currentProducts, totalPages } = usePagination(
    filteredProducts,
    currentPage,
    productsPerPage
  );

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
