import { useState } from "react";

import {
  X,
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Tag,
  Truck,
  ShieldCheck
} from "lucide-react";

import { useStore } from "../context/useStore";

function CartDrawer({ isOpen, onClose }) {

  const {
    cart,
    cartTotal,
    updateQuantity,
    removeFromCart,
    notify
  } = useStore();

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");

  const [checkoutComplete, setCheckoutComplete] = useState(false);

  const shipping = cartTotal >= 2000 || cartTotal === 0 ? 0 : 99;

  const finalTotal = cartTotal + shipping - discount;

  const applyCoupon = () => {

    if (coupon.trim().toUpperCase() === "NOVA10") {

      setDiscount(Math.round(cartTotal * 0.1));

      setCouponMessage("10% discount applied!");

    } else {

      setDiscount(0);

      setCouponMessage("Invalid coupon code.");

    }

  };

  const handleCheckout = () => {

    if (cart.length === 0) return;

    setCheckoutComplete(true);

    notify("Order placed successfully!");

  };

  const finishCheckout = () => {

    setCheckoutComplete(false);
    setCoupon("");
    setDiscount(0);
    setCouponMessage("");
    onClose();

  };

  return (

    <>

      {isOpen && (
        <div
          className="drawer-overlay"
          onClick={onClose}
        />
      )}

      <aside className={`cart-drawer ${
        isOpen ? "open" : ""
      }`}>

        <div className="cart-header">

          <div>

            <span className="section-eyebrow">
              YOUR SELECTION
            </span>

            <h2>
              Shopping Bag
              <span className="cart-item-count">
                {cart.length}
              </span>
            </h2>

          </div>

          <button
            className="close-button"
            onClick={onClose}
          >
            <X size={21} />
          </button>

        </div>

        {checkoutComplete ? (

          <div className="checkout-success">

            <div className="success-icon">
              <ShieldCheck size={42} />
            </div>

            <h2>Order Confirmed!</h2>

            <p>
              Your demo order has been placed successfully.
            </p>

            <span className="demo-order-note">
              This is a frontend demonstration. No actual
              payment was processed.
            </span>

            <button
              className="checkout-button"
              onClick={finishCheckout}
            >
              Continue Shopping
            </button>

          </div>

        ) : cart.length === 0 ? (

          <div className="empty-cart">

            <div className="empty-cart-icon">
              <ShoppingBag size={36} />
            </div>

            <h3>Your bag is empty</h3>

            <p>
              Looks like you haven't added anything yet.
            </p>

            <button onClick={onClose}>
              Explore Products
            </button>

          </div>

        ) : (

          <>

            <div className="cart-items">

              {cart.map((item) => (

                <div
                  className="cart-item"
                  key={item.id}
                >

                  <img
                    src={item.image}
                    alt={item.name}
                  />

                  <div className="cart-item-info">

                    <span>{item.brand}</span>

                    <h4>{item.name}</h4>

                    <strong>
                      ₹{item.price.toLocaleString("en-IN")}
                    </strong>

                    <div className="cart-quantity">

                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.quantity - 1
                          )
                        }
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={13} />
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.quantity + 1
                          )
                        }
                        disabled={item.quantity >= item.stock}
                      >
                        <Plus size={13} />
                      </button>

                    </div>

                  </div>

                  <div className="cart-item-end">

                    <strong>
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </strong>

                    <button
                      className="remove-cart-item"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 size={16} />
                    </button>

                  </div>

                </div>

              ))}

            </div>

            <div className="cart-bottom">

              <div className="cart-shipping-note">
                <Truck size={18} />

                {shipping === 0
                  ? "You've unlocked free shipping!"
                  : `Add ₹${(2000 - cartTotal).toLocaleString("en-IN")} more for free shipping.`
                }

              </div>

              <div className="coupon-box">

                <div className="coupon-input">

                  <Tag size={17} />

                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                  />

                  <button onClick={applyCoupon}>
                    Apply
                  </button>

                </div>

                {couponMessage && (
                  <span className="coupon-message">
                    {couponMessage}
                  </span>
                )}

              </div>

              <div className="cart-summary">

                <div>
                  <span>Subtotal</span>
                  <strong>
                    ₹{cartTotal.toLocaleString("en-IN")}
                  </strong>
                </div>

                <div>
                  <span>Shipping</span>
                  <strong>
                    {shipping === 0
                      ? "FREE"
                      : `₹${shipping}`
                    }
                  </strong>
                </div>

                {discount > 0 && (

                  <div className="discount-row">
                    <span>Discount</span>
                    <strong>
                      -₹{discount.toLocaleString("en-IN")}
                    </strong>
                  </div>

                )}

                <div className="cart-total">

                  <span>Total</span>

                  <strong>
                    ₹{finalTotal.toLocaleString("en-IN")}
                  </strong>

                </div>

              </div>

              <button
                className="checkout-button"
                onClick={handleCheckout}
              >
                Proceed to Checkout
                <ArrowRight size={18} />
              </button>

              <div className="cart-secure">
                <ShieldCheck size={15} />
                Secure demo checkout
              </div>

            </div>

          </>

        )}

      </aside>

    </>

  );

}

export default CartDrawer;