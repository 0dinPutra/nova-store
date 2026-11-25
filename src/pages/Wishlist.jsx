import { useState } from "react";

import {
  Heart,
  ArrowLeft,
  ShoppingBag
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useStore } from "../context/useStore";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";
import CartDrawer from "../components/CartDrawer";
import Notification from "../components/Notification";

function Wishlist() {

  const navigate = useNavigate();

  const {
    wishlist,
    addToCart
  } = useStore();

  const [searchQuery, setSearchQuery] = useState("");

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [cartOpen, setCartOpen] = useState(false);

  const filteredWishlist = wishlist.filter((product) =>

    product.name.toLowerCase().includes(
      searchQuery.toLowerCase()
    )

  );

  const handleBuyNow = (product) => {

    addToCart(product);

    setSelectedProduct(null);

    setCartOpen(true);

  };

  return (

    <div className="app-layout">

      <div className="sidebar-wrapper">

        <Sidebar
          selectedCategory=""
          onCategoryChange={() => navigate("/")}
        />

      </div>

      <main className="main-content">

        <Navbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onCartOpen={() => setCartOpen(true)}
          onMenuToggle={() => {}}
          mobileMenuOpen={false}
        />

        <div className="store-content wishlist-page">

          <button
            className="back-button"
            onClick={() => navigate("/")}
          >
            <ArrowLeft size={17} />
            Back to Store
          </button>

          <div className="wishlist-heading">

            <div>

              <span className="section-eyebrow">
                YOUR PERSONAL COLLECTION
              </span>

              <h1>
                My Wishlist
                <Heart
                  size={27}
                  fill="#8B72E8"
                  color="#8B72E8"
                />
              </h1>

              <p>
                Keep all your favourite products in one place.
              </p>

            </div>

            <div className="wishlist-count">

              <span>{wishlist.length}</span>

              <small>Saved Items</small>

            </div>

          </div>

          {filteredWishlist.length > 0 ? (

            <div className="products-grid">

              {filteredWishlist.map((product) => (

                <ProductCard
                  key={product.id}
                  product={product}
                  onProductClick={setSelectedProduct}
                  onBuyNow={handleBuyNow}
                />

              ))}

            </div>

          ) : (

            <div className="empty-wishlist">

              <div className="empty-wishlist-icon">
                <Heart size={42} />
              </div>

              <h2>
                {searchQuery
                  ? "No matching products"
                  : "Your wishlist is waiting"
                }
              </h2>

              <p>
                {searchQuery
                  ? "Try searching for something else."
                  : "Save products you love and find them here whenever you need them."
                }
              </p>

              <button onClick={() => navigate("/")}>
                <ShoppingBag size={17} />
                Explore Products
              </button>

            </div>

          )}

        </div>

      </main>

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
      />

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onBuyNow={handleBuyNow}
      />

      <Notification />

    </div>

  );

}

export default Wishlist;