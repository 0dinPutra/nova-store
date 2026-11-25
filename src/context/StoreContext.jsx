import { useState, useEffect } from "react";
import StoreContext from "./StoreContextBase";
import initialProducts from "../data/products";

export function StoreProvider({ children }) {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("nova_products");
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("nova_cart")) || [];
  });

  const [wishlist, setWishlist] = useState(() => {
    return JSON.parse(localStorage.getItem("nova_wishlist")) || [];
  });

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    localStorage.setItem("nova_products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("nova_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("nova_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Notifications

  const notify = (message, type = "success") => {
    const id = Date.now();

    setNotifications((prev) => [
      ...prev,
      { id, message, type }
    ]);

    setTimeout(() => {
      setNotifications((prev) =>
        prev.filter((item) => item.id !== id)
      );
    }, 3000);
  };

  // Cart

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });

    notify("Product added to cart");
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    notify("Product removed from cart");
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;

    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Wishlist

  const toggleWishlist = (product) => {
    const exists = wishlist.some((item) => item.id === product.id);

    if (exists) {
      setWishlist((prev) =>
        prev.filter((item) => item.id !== product.id)
      );

      notify("Removed from wishlist");
    } else {
      setWishlist((prev) => [...prev, product]);
      notify("Added to wishlist");
    }
  };

  const isWishlisted = (id) =>
    wishlist.some((item) => item.id === id);

  // Product Management

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: Date.now(),
      popularity: 50,
      reviews: 0,
      rating: 0,
      dateAdded: new Date().toISOString().split("T")[0]
    };

    setProducts((prev) => [newProduct, ...prev]);
    notify("Product created successfully");
  };

  const updateProduct = (id, updatedProduct) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, ...updatedProduct } : item
      )
    );

    notify("Product updated successfully");
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
    setCart((prev) => prev.filter((item) => item.id !== id));
    setWishlist((prev) => prev.filter((item) => item.id !== id));

    notify("Product deleted successfully");
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        wishlist,
        notifications,

        cartCount,
        cartTotal,

        addToCart,
        removeFromCart,
        updateQuantity,

        toggleWishlist,
        isWishlisted,

        addProduct,
        updateProduct,
        deleteProduct,

        notify
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}
