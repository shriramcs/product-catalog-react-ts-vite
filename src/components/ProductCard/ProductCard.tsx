import type { Product } from '../../types';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
  removeEventHandler: (id: number) => void
}

const ProductCard = ({ product, removeEventHandler }: ProductCardProps) => {
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img
          src={product.image}
          alt={product.title}
          className="product-image"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://via.placeholder.com/150';
          }}
        />
      </div>
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <p className="product-category">{product.category}</p>
        <div className="product-rating">
          <span>★ {product.rating.rate.toFixed(1)}</span>
          <span className="product-rating-count">
            ({product.rating.count} reviews)
          </span>
        </div>
        <button onClick={() => removeEventHandler(product.id)}>Remove</button>
      </div>
    </div>
  );
};

export default ProductCard;
