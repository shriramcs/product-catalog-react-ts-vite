import { useEffect, useState } from 'react';
import './SearchFilter.css';

interface SearchFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const SearchFilter = ({
  searchTerm,
  onSearchChange,
  categories,
  selectedCategory,
  onCategoryChange,
}: SearchFilterProps) => {
  const [inputValue, setInputValue] = useState(searchTerm);

  // Update local state when prop changes
  useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]);

  // Debounce search to avoid too many rerenders
  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue !== searchTerm) {
        onSearchChange(inputValue);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [inputValue, onSearchChange, searchTerm]);

  return (
    <div className="search-filter">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search products..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="category-filter">
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="category-select"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchFilter;
