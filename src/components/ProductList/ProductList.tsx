import type { Product } from '../../types';
import ProductCard from '../ProductCard/ProductCard';
import './ProductList.css';

interface ProductListProps {
  products: Product[];
  removeEventHandler: (id: number) => void
}

const ProductList = ({ products, removeEventHandler }: ProductListProps) => {

  if (products.length === 0) {
    return <div className="no-products">No products found</div>;
  }

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product} 
          removeEventHandler={removeEventHandler}
        />
      ))}
    </div>
  );
};

export default ProductList;
