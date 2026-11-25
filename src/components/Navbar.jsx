import {
  Search,
  ShoppingCart,
  Bell,
  Menu,
  X,
  ChevronDown,
  Sparkles
} from "lucide-react";

import { useStore } from "../context/useStore";

function Navbar({
  searchQuery,
  setSearchQuery,
  onCartOpen,
  onMenuToggle,
  mobileMenuOpen
}) {

  const { cartCount } = useStore();

  return (
    <header className="navbar">

      <div className="navbar-left">

        <button
          className="mobile-menu-button"
          onClick={onMenuToggle}
        >
          {mobileMenuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>

        <div className="navbar-heading">
          <span>Welcome back, John</span>
          <h2>Discover your next favourite.</h2>
        </div>

      </div>

      <div className="navbar-actions">

        <div className="navbar-search">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="clear-search"
            >
              <X size={15} />
            </button>
          )}

          <kbd>⌘ K</kbd>

        </div>

        <button className="navbar-icon notification-button">
          <Bell size={20} />
          <span className="notification-dot" />
        </button>

        <button
          className="navbar-icon cart-button"
          onClick={onCartOpen}
        >
          <ShoppingCart size={20} />

          {cartCount > 0 && (
            <span className="cart-badge">
              {cartCount > 99 ? "99+" : cartCount}
            </span>
          )}
        </button>

        <div className="navbar-divider" />

        <button className="navbar-user">

          <div className="profile-avatar navbar-avatar">
            JD
          </div>

          <div className="navbar-user-info">
            <strong>John Doe</strong>
            <span>
              <Sparkles size={11} />
              Premium
            </span>
          </div>

          <ChevronDown size={16} />

        </button>

      </div>

    </header>
  );
}

export default Navbar;