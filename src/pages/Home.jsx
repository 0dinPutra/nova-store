import { useState, useMemo } from "react";

import {
  Grid2X2,
  List,
  SlidersHorizontal,
  ArrowDownWideNarrow,
  Package,
  Share2,
  Download,
  ChevronDown,
  X
} from "lucide-react";

import { useStore } from "../context/useStore";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import FilterPanel from "../components/FilterPanel";
import ProductCard from "../components/ProductCard";
import CartDrawer from "../components/CartDrawer";
import ProductModal from "../components/ProductModal";
import Notification from "../components/Notification";

function Home() {

  const { products, addToCart, notify } = useStore();

  const [searchQuery, setSearchQuery] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("All");

  const [sortBy, setSortBy] = useState("popular");

  const [viewMode, setViewMode] = useState("grid");

  const [showFilters, setShowFilters] = useState(true);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [cartOpen, setCartOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [filters, setFilters] = useState({
    categories: [],
    brands: [],
    minPrice: 0,
    maxPrice: 30000,
    rating: 0
  });

  // CATEGORY SELECTION

  const handleCategoryChange = (category) => {

    setSelectedCategory(category);

    setFilters((prev) => ({
      ...prev,
      categories: category === "All" ? [] : [category]
    }));

    setMobileMenuOpen(false);

  };

  // FILTER AND SORT PRODUCTS

  const filteredProducts = useMemo(() => {

    let result = [...products];

    if (searchQuery.trim()) {

      const query = searchQuery.toLowerCase();

      result = result.filter((product) =>
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );

    }

    if (filters.categories.length > 0) {

      result = result.filter((product) =>
        filters.categories.includes(product.category)
      );

    }

    if (filters.brands.length > 0) {

      result = result.filter((product) =>
        filters.brands.includes(product.brand)
      );

    }

    result = result.filter((product) =>
      product.price >= filters.minPrice &&
      product.price <= filters.maxPrice
    );

    if (filters.rating > 0) {

      result = result.filter((product) =>
        product.rating >= filters.rating
      );

    }

    switch (sortBy) {

      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;

      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;

      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.dateAdded) - new Date(a.dateAdded)
        );
        break;

      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;

      default:
        result.sort((a, b) => b.popularity - a.popularity);

    }

    return result;

  }, [products, searchQuery, filters, sortBy]);

  // BUY NOW

  const handleBuyNow = (product) => {

    addToCart(product);

    setCartOpen(true);

  };

  // EXPORT PRODUCTS

  const exportProducts = () => {

    const data = filteredProducts.map((product) => ({
      Name: product.name,
      Brand: product.brand,
      Category: product.category,
      Price: product.price,
      Rating: product.rating,
      Stock: product.stock
    }));

    const csv = [
      Object.keys(data[0] || {}).join(","),
      ...data.map((row) => Object.values(row).join(","))
    ].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;"
    });

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = "nova-products.csv";

    link.click();

    URL.revokeObjectURL(link.href);

    notify("Products exported successfully");

  };

  // SHARE STORE

  const shareStore = async () => {

    try {

      await navigator.clipboard.writeText(
        window.location.href
      );

      notify("Store link copied to clipboard");

    } catch {

      notify("Unable to copy link", "error");

    }

  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (

    <div className="app-layout">

      {/* MOBILE OVERLAY */}

      {mobileMenuOpen && (
        <div
          className="mobile-overlay"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* SIDEBAR */}

      <div className={`sidebar-wrapper ${
        mobileMenuOpen ? "mobile-open" : ""
      }`}>

        <Sidebar
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

      </div>

      {/* MAIN CONTENT */}

      <main className="main-content">

        <Navbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onCartOpen={() => setCartOpen(true)}
          onMenuToggle={() =>
            setMobileMenuOpen(!mobileMenuOpen)
          }
          mobileMenuOpen={mobileMenuOpen}
        />

        <div className="store-content">

          {/* PAGE HEADER */}

          <section className="store-hero">

            <div>

              <div className="hero-eyebrow">
                <span className="hero-dot" />
                YOUR NEXT FAVOURITE IS HERE
              </div>

              <h1>
                Find your <span>perfect match.</span>
              </h1>

              <p>
                Explore our curated collection of products
                made to elevate your everyday.
              </p>

            </div>

            <div className="hero-decoration">
              <div className="hero-decoration-circle">
                <Package size={43} />
              </div>
            </div>

          </section>

          {/* STATS */}

          <section className="store-stats">

            <div className="store-stat">
              <span>Products Available</span>
              <strong>{products.length}</strong>
            </div>

            <div className="store-stat">
              <span>Categories</span>
              <strong>
                {[...new Set(products.map(p => p.category))].length}
              </strong>
            </div>

            <div className="store-stat">
              <span>Featured Products</span>
              <strong>
                {products.filter(p => p.popularity >= 90).length}
              </strong>
            </div>

          </section>

          {/* PRODUCT SECTION */}

          <section className="product-section">

            <div className="product-section-header">

              <div>

                <span className="section-eyebrow">
                  OUR COLLECTION
                </span>

                <h2>
                  {selectedCategory === "All"
                    ? "Explore Products"
                    : selectedCategory
                  }
                </h2>

                <p>
                  Showing {filteredProducts.length} products
                </p>

              </div>

              <div className="section-actions">

                <button
                  className="secondary-action"
                  onClick={shareStore}
                >
                  <Share2 size={16} />
                  Share
                </button>

                <button
                  className="secondary-action"
                  onClick={exportProducts}
                >
                  <Download size={16} />
                  Export
                </button>

              </div>

            </div>

            {/* TOOLBAR */}

            <div className="product-toolbar">

              <div className="toolbar-left">

                <button
                  className={`filter-toggle ${
                    showFilters ? "selected" : ""
                  }`}
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal size={17} />
                  Filters
                </button>

                <span className="product-count">
                  {filteredProducts.length} results
                </span>

              </div>

              <div className="toolbar-right">

                <div className="sort-wrapper">

                  <ArrowDownWideNarrow size={16} />

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="popular">Most Popular</option>
                    <option value="newest">Newest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>

                  <ChevronDown size={14} />

                </div>

                <div className="view-toggle">

                  <button
                    className={viewMode === "grid" ? "active" : ""}
                    onClick={() => setViewMode("grid")}
                    title="Grid View"
                  >
                    <Grid2X2 size={17} />
                  </button>

                  <button
                    className={viewMode === "list" ? "active" : ""}
                    onClick={() => setViewMode("list")}
                    title="List View"
                  >
                    <List size={18} />
                  </button>

                </div>

              </div>

            </div>

            {/* PRODUCT DISPLAY */}

            <div className="product-display">

              {showFilters && (

                <div className="filter-sidebar">

                  <FilterPanel
                    filters={filters}
                    setFilters={setFilters}
                    products={products}
                  />

                </div>

              )}

              <div className="products-area">

                {searchQuery && (

                  <div className="search-result-message">

                    <span>
                      Search results for "{searchQuery}"
                    </span>

                    <button onClick={clearSearch}>
                      Clear <X size={14} />
                    </button>

                  </div>

                )}

                {filteredProducts.length > 0 ? (

                  <div className={`products-grid ${
                    viewMode === "list" ? "list-layout" : ""
                  }`}>

                    {filteredProducts.map((product) => (

                      <ProductCard
                        key={product.id}
                        product={product}
                        onProductClick={setSelectedProduct}
                        onBuyNow={handleBuyNow}
                        viewMode={viewMode}
                      />

                    ))}

                  </div>

                ) : (

                  <div className="empty-products">

                    <div className="empty-products-icon">
                      <Package size={35} />
                    </div>

                    <h3>No products found</h3>

                    <p>
                      Try changing your search or filters.
                    </p>

                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setFilters({
                          categories: [],
                          brands: [],
                          minPrice: 0,
                          maxPrice: 30000,
                          rating: 0
                        });
                        setSelectedCategory("All");
                      }}
                    >
                      Clear All Filters
                    </button>

                  </div>

                )}

              </div>

            </div>

          </section>

          {/* FOOTER */}

          <footer className="store-footer">

            <span>© 2026 NOVA. All rights reserved.</span>

            <span>
              Designed for better shopping.
            </span>

          </footer>

        </div>

      </main>

      {/* DRAWERS AND MODALS */}

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

export default Home;