import {
  Home,
  ShoppingBag,
  Heart,
  LayoutGrid,
  Headphones,
  Watch,
  Shirt,
  Footprints,
  Lamp,
  ChevronRight,
  Settings,
  HelpCircle,
  Sparkles
} from "lucide-react";

import { NavLink } from "react-router-dom";

const categories = [
  { name: "Electronics", icon: Headphones },
  { name: "Fashion", icon: Shirt },
  { name: "Footwear", icon: Footprints },
  { name: "Accessories", icon: Watch },
  { name: "Home", icon: Lamp }
];

function Sidebar({ selectedCategory, onCategoryChange }) {
  return (
    <aside className="sidebar">

      <div className="sidebar-logo">
        <div className="logo-icon">
          N
        </div>

        <div>
          <h2>NOVA</h2>
          <span>SHOP DIFFERENT</span>
        </div>
      </div>

      <div className="sidebar-section">

        <p className="sidebar-label">MENU</p>

        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <Home size={19} />
          <span>Discover</span>
        </NavLink>

        <button
          className={`sidebar-link ${selectedCategory === "All" ? "active" : ""}`}
          onClick={() => {
            onCategoryChange("All");
            window.history.pushState({}, "", "/");
          }}
        >
          <LayoutGrid size={19} />
          <span>All Products</span>
        </button>

        <NavLink
          to="/wishlist"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <Heart size={19} />
          <span>Wishlist</span>
        </NavLink>

        <button className="sidebar-link">
          <ShoppingBag size={19} />
          <span>My Orders</span>
        </button>

      </div>

      <div className="sidebar-section">

        <p className="sidebar-label">CATEGORIES</p>

        {categories.map((category) => {
          const Icon = category.icon;

          return (
            <button
              key={category.name}
              className={`sidebar-link ${
                selectedCategory === category.name ? "active" : ""
              }`}
              onClick={() => {
                onCategoryChange(category.name);
                window.history.pushState({}, "", "/");
              }}
            >
              <Icon size={19} />
              <span>{category.name}</span>
            </button>
          );
        })}

      </div>

      <div className="sidebar-spacer" />

      <div className="sidebar-promo">

        <div className="promo-icon">
          <Sparkles size={20} />
        </div>

        <h3>Discover More</h3>

        <p>
          Find something special with our latest collections.
        </p>

        <button onClick={() => {
          onCategoryChange("All");
          window.history.pushState({}, "", "/");
        }}>
          Explore Now <ChevronRight size={15} />
        </button>

      </div>

      <div className="sidebar-bottom">

        <button className="sidebar-link">
          <HelpCircle size={19} />
          <span>Help Center</span>
        </button>

        <button className="sidebar-link">
          <Settings size={19} />
          <span>Settings</span>
        </button>

      </div>

      <div className="sidebar-profile">

        <div className="profile-avatar">JD</div>

        <div className="profile-info">
          <h4>John Doe</h4>
          <span>Premium Member</span>
        </div>

        <ChevronRight size={17} />

      </div>

    </aside>
  );
}

export default Sidebar;