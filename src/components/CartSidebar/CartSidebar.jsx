import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './CartSidebar.css';

const FREE_SHIPPING_THRESHOLD = 500;

function CartSidebar() {
    const navigate = useNavigate();
    const { cartItems, removeFromCart, isCartOpen, setIsCartOpen, subtotal } = useCart();

    const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
    const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

    return (
        <>
            {/* Overlay */}
            {isCartOpen && (
                <div className="cart-overlay" onClick={() => setIsCartOpen(false)} />
            )}

            {/* Sidebar */}
            <div className={`cart-sidebar ${isCartOpen ? 'open' : ''}`}>

                {/* Header */}
                <div className="cart-header">
                    <h2 className="cart-title">Your Cart</h2>
                    <button className="cart-close-btn" onClick={() => setIsCartOpen(false)}>✕</button>
                </div>

                <div className="cart-divider" />

                {/* Free Shipping Banner */}
                <div className="cart-shipping-banner">
                    {remaining > 0 ? (
                        <p>Add <strong>${remaining.toFixed(2)}</strong> to cart and get free shipping!</p>
                    ) : (
                        <p>🎉 You have <strong>free shipping!</strong></p>
                    )}
                    <div className="shipping-progress-bar">
                        <div className="shipping-progress-fill" style={{ width: `${progress}%` }} />
                    </div>
                </div>

                {/* Cart Items */}
                <div className="cart-items-list">
                    {cartItems.length === 0 ? (
                        <div className="cart-empty">
                            <span>🛒</span>
                            <p>Your cart is empty.</p>
                        </div>
                    ) : (
                        cartItems.map(item => (
                            <div className="cart-item" key={item.id}>
                                <div className="cart-item-img">
                                    {item.image ? (
                                        <img src={item.image} alt={item.title} />
                                    ) : (
                                        <div className="img-placeholder" />
                                    )}
                                </div>
                                <div className="cart-item-info">
                                    <p className="cart-item-name">'{item.title}'</p>
                                    <div className="cart-item-meta">
                                        <span className="cart-item-qty-price">
                                            {item.qty} × <strong>${item.price?.toFixed(2)}</strong>
                                        </span>
                                        <button
                                            className="cart-item-remove"
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            🗑 Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {cartItems.length > 0 && (
                    <div className="cart-footer">
                        <div className="cart-subtotal">
                            <span className="subtotal-label">Subtotal:</span>
                            <span className="subtotal-value">${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="cart-actions">
                            <button
                                className="view-cart-btn"
                                onClick={() => {
                                    setIsCartOpen(false);
                                    navigate("/cart");
                                }}
                            >
                                VIEW CART
                            </button>
                            <button
                                className="checkout-btn"
                                onClick={() => {
                                    setIsCartOpen(false);
                                    navigate("/checkout");
                                }}
                            >
                                CHECKOUT
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </>
    );
}

export default CartSidebar;
