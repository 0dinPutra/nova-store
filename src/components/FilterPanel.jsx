import { useState } from "react";

import {
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  RotateCcw
} from "lucide-react";

const categories = [
  "Electronics",
  "Fashion",
  "Footwear",
  "Accessories",
  "Home"
];

const brands = [
  "Apple",
  "Sony",
  "Nike",
  "Adidas",
  "Samsung",
  "Fossil",
  "Urban",
  "HomeStyle",
  "Ray-Ban"
];

function FilterPanel({
  filters,
  setFilters,
  products
}) {

  const [openSections, setOpenSections] = useState({
    category: true,
    price: true,
    brand: true,
    rating: true
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const toggleArrayFilter = (key, value) => {

    setFilters((prev) => {

      const current = prev[key];

      const updated = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];

      return {
        ...prev,
        [key]: updated
      };

    });

  };

  const clearFilters = () => {

    setFilters({
      categories: [],
      brands: [],
      minPrice: 0,
      maxPrice: 30000,
      rating: 0
    });

  };

  const activeCount =
    filters.categories.length +
    filters.brands.length +
    (filters.rating > 0 ? 1 : 0) +
    (filters.minPrice > 0 || filters.maxPrice < 30000 ? 1 : 0);

  const categoryCounts = categories.map((category) => ({
    name: category,
    count: products.filter(
      (product) => product.category === category
    ).length
  }));

  const brandCounts = brands.map((brand) => ({
    name: brand,
    count: products.filter(
      (product) => product.brand === brand
    ).length
  }));

  return (

    <div className="filter-panel">

      <div className="filter-header">

        <div>
          <SlidersHorizontal size={18} />
          <h3>Filters</h3>
        </div>

        {activeCount > 0 && (
          <button onClick={clearFilters}>
            <RotateCcw size={14} />
            Reset
          </button>
        )}

      </div>

      {/* CATEGORY */}

      <div className="filter-section">

        <button
          className="filter-section-title"
          onClick={() => toggleSection("category")}
        >
          <span>Categories</span>

          {openSections.category
            ? <ChevronUp size={17} />
            : <ChevronDown size={17} />
          }
        </button>

        {openSections.category && (

          <div className="filter-options">

            {categoryCounts.map((category) => (

              <label
                key={category.name}
                className="filter-option"
              >

                <input
                  type="checkbox"
                  checked={filters.categories.includes(category.name)}
                  onChange={() =>
                    toggleArrayFilter("categories", category.name)
                  }
                />

                <span>{category.name}</span>

                <small>{category.count}</small>

              </label>

            ))}

          </div>

        )}

      </div>

      {/* PRICE */}

      <div className="filter-section">

        <button
          className="filter-section-title"
          onClick={() => toggleSection("price")}
        >
          <span>Price Range</span>

          {openSections.price
            ? <ChevronUp size={17} />
            : <ChevronDown size={17} />
          }
        </button>

        {openSections.price && (

          <div className="price-filter">

            <div className="price-values">

              <div>
                <span>Min</span>

                <strong>
                  ₹{filters.minPrice.toLocaleString("en-IN")}
                </strong>
              </div>

              <div>
                <span>Max</span>

                <strong>
                  ₹{filters.maxPrice.toLocaleString("en-IN")}
                </strong>
              </div>

            </div>

            <input
              type="range"
              min="0"
              max="30000"
              step="500"
              value={filters.maxPrice}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  maxPrice: Math.max(
                    Number(e.target.value),
                    prev.minPrice
                  )
                }))
              }
            />

            <input
              type="range"
              min="0"
              max="30000"
              step="500"
              value={filters.minPrice}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  minPrice: Math.min(
                    Number(e.target.value),
                    prev.maxPrice
                  )
                }))
              }
            />

            <div className="price-range-labels">
              <span>₹0</span>
              <span>₹30,000</span>
            </div>

          </div>

        )}

      </div>

      {/* BRANDS */}

      <div className="filter-section">

        <button
          className="filter-section-title"
          onClick={() => toggleSection("brand")}
        >
          <span>Brands</span>

          {openSections.brand
            ? <ChevronUp size={17} />
            : <ChevronDown size={17} />
          }
        </button>

        {openSections.brand && (

          <div className="filter-options">

            {brandCounts.map((brand) => (

              <label
                key={brand.name}
                className="filter-option"
              >

                <input
                  type="checkbox"
                  checked={filters.brands.includes(brand.name)}
                  onChange={() =>
                    toggleArrayFilter("brands", brand.name)
                  }
                />

                <span>{brand.name}</span>

                <small>{brand.count}</small>

              </label>

            ))}

          </div>

        )}

      </div>

      {/* RATING */}

      <div className="filter-section">

        <button
          className="filter-section-title"
          onClick={() => toggleSection("rating")}
        >
          <span>Customer Rating</span>

          {openSections.rating
            ? <ChevronUp size={17} />
            : <ChevronDown size={17} />
          }
        </button>

        {openSections.rating && (

          <div className="rating-options">

            {[4, 3, 2, 1].map((rating) => (

              <button
                key={rating}
                className={`rating-option ${
                  filters.rating === rating ? "selected" : ""
                }`}
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    rating:
                      prev.rating === rating ? 0 : rating
                  }))
                }
              >

                <span className="rating-stars">
                  {"★".repeat(rating)}
                  {"☆".repeat(5 - rating)}
                </span>

                <span>& up</span>

              </button>

            ))}

          </div>

        )}

      </div>

      <button
        className="clear-filter-button"
        onClick={clearFilters}
      >
        Clear all filters
      </button>

    </div>

  );

}

export default FilterPanel;