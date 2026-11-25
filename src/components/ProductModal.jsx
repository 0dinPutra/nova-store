import {
  X,
  Star,
  Heart,
  ShoppingCart,
  ShieldCheck,
  Truck,
  Package
} from "lucide-react";

import { useStore } from "../context/useStore";

function ProductModal({
  product,
  onClose,
  onBuyNow
}) {

  const {
    addToCart,
    toggleWishlist,
    isWishlisted
  } = useStore();

  if (!product) return null;

  const discount = Math.round(
    ((product.originalPrice - product.price) /
      product.originalPrice) * 100
  );

  const wishlisted = isWishlisted(product.id);

  return (

    <div
      className="product-modal-overlay"
      onClick={onClose}
    >

      <div
        className="product-modal"
        onClick={(e) => e.stopPropagation()}
      >

        <button
          className="modal-close"
          onClick={onClose}
        >
          <X size={21} />
        </button>

        <div className="modal-product-image">

          <img
            src={product.image}
            alt={product.name}
          />

          {discount > 0 && (
            <span className="discount-badge">
              {discount}% OFF
            </span>
          )}

        </div>

        <div className="modal-product-details">

          <span className="modal-brand">
            {product.brand} / {product.category}
          </span>

          <h2>{product.name}</h2>

          <div className="modal-rating">

            <Star
              size={17}
              fill="#F5B544"
              color="#F5B544"
            />

            <strong>{product.rating}</strong>

            <span>
              ({product.reviews} customer reviews)
            </span>

          </div>

          <div className="modal-price">

            <strong>
              ₹{product.price.toLocaleString("en-IN")}
            </strong>

            <del>
              ₹{product.originalPrice.toLocaleString("en-IN")}
            </del>

            {discount > 0 && (
              <span>{discount}% OFF</span>
            )}

          </div>

          <p className="modal-description">
            {product.description}
          </p>

          <div className="modal-stock">

            <Package size={17} />

            {product.stock > 0
              ? `${product.stock} units available`
              : "Currently unavailable"
            }

          </div>

          <div className="modal-features">

            <div>
              <Truck size={19} />
              <span>Delivery available</span>
            </div>

            <div>
              <ShieldCheck size={19} />
              <span>Quality assured</span>
            </div>

          </div>

          <div className="modal-actions">

            <button
              className="modal-add-cart"
              disabled={product.stock <= 0}
              onClick={() => addToCart(product)}
            >
              <ShoppingCart size={18} />
              Add to Cart
            </button>

            <button
              className="modal-buy-now"
              disabled={product.stock <= 0}
              onClick={() => {
                onBuyNow(product);
                onClose();
              }}
            >
              Buy Now
            </button>

            <button
              className={`modal-wishlist ${
                wishlisted ? "wishlisted" : ""
              }`}
              onClick={() => toggleWishlist(product)}
            >
              <Heart
                size={20}
                fill={wishlisted ? "currentColor" : "none"}
              />
            </button>

          </div>

        </div>

      </div>

    </div>

  );

}

export default ProductModal;