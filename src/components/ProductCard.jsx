import {
  Heart,
  ShoppingCart,
  Star,
  ArrowUpRight,
  Eye
} from "lucide-react";

import { useStore } from "../context/useStore";

import { motion } from "framer-motion";

function ProductCard({
  product,
  onProductClick,
  onBuyNow,
  viewMode = "grid"
}) {

  const {
    addToCart,
    toggleWishlist,
    isWishlisted
  } = useStore();

  const discount = Math.round(
    ((product.originalPrice - product.price) /
      product.originalPrice) * 100
  );

  const wishlisted = isWishlisted(product.id);

  return (

    <motion.div
      className={`product-card ${viewMode === "list" ? "list-view" : ""}`}
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >

      <div
        className="product-image-wrapper"
        onClick={() => onProductClick(product)}
      >

        <img
          src={product.image}
          alt={product.name}
          className="product-image"
          loading="lazy"
        />

        {discount > 0 && (
          <span className="discount-badge">
            -{discount}%
          </span>
        )}

        {product.stock <= 10 && (
          <span className="stock-badge">
            Low Stock
          </span>
        )}

        <button
          className={`wishlist-button ${
            wishlisted ? "wishlisted" : ""
          }`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          aria-label="Toggle wishlist"
        >
          <Heart
            size={19}
            fill={wishlisted ? "currentColor" : "none"}
          />
        </button>

        <button
          className="quick-view-button"
          onClick={(e) => {
            e.stopPropagation();
            onProductClick(product);
          }}
        >
          <Eye size={16} />
          Quick View
        </button>

      </div>

      <div className="product-info">

        <div className="product-brand">
          {product.brand}
        </div>

        <h3
          className="product-name"
          onClick={() => onProductClick(product)}
        >
          {product.name}
        </h3>

        <div className="product-rating">

          <Star
            size={14}
            fill="#F5B544"
            color="#F5B544"
          />

          <strong>{product.rating.toFixed(1)}</strong>

          <span>
            ({product.reviews} reviews)
          </span>

        </div>

        <div className="product-price">

          <strong>
            ₹{product.price.toLocaleString("en-IN")}
          </strong>

          <del>
            ₹{product.originalPrice.toLocaleString("en-IN")}
          </del>

        </div>

        <div className="product-card-actions">

          <button
            className="add-cart-button"
            disabled={product.stock <= 0}
            onClick={() => addToCart(product)}
          >
            <ShoppingCart size={16} />

            {product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
          </button>

          <button
            className="buy-now-button"
            disabled={product.stock <= 0}
            onClick={() => onBuyNow(product)}
            title="Buy Now"
          >
            <ArrowUpRight size={18} />
          </button>

        </div>

      </div>

    </motion.div>

  );

}

export default ProductCard;