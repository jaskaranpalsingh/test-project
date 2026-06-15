import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Cart.css';

function Cart() {
    const navigate = useNavigate();
    const { cartItems, removeFromCart, updateQty, subtotal, clearCart } = useCart();
    
    // Coupon State
    const [couponInput, setCouponInput] = useState('');
    const [discountPercent, setDiscountPercent] = useState(0);
    const [couponError, setCouponError] = useState('');
    const [couponSuccess, setCouponSuccess] = useState('');

    const FREE_SHIPPING_THRESHOLD = 500;
    const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 15.00;
    const discountAmount = subtotal * (discountPercent / 100);
    const finalTotal = subtotal - discountAmount + shippingCost;

    const handleApplyCoupon = (e) => {
        e.preventDefault();
        setCouponError('');
        setCouponSuccess('');
        
        const code = couponInput.trim().toUpperCase();
        if (!code) {
            setCouponError('Please enter a coupon code.');
            return;
        }

        if (code === 'NURFIA20') {
            setDiscountPercent(20);
            setCouponSuccess('Coupon NURFIA20 applied! You received a 20% discount.');
        } else if (code === 'SAVE10') {
            setDiscountPercent(10);
            setCouponSuccess('Coupon SAVE10 applied! You received a 10% discount.');
        } else {
            setCouponError('Invalid coupon code. Try "NURFIA20" or "SAVE10".');
        }
    };

    return (
        <div className="cart-page">
            <div className="cart-page-header">
                <h1 className="cart-page-title">Shopping Cart</h1>
                <p className="cart-page-subtitle">Review your items and proceed to checkout.</p>
                <div className="cart-page-underline"></div>
            </div>

            <div className="cart-page-container">
                {cartItems.length === 0 ? (
                    <div className="cart-page-empty-state">
                        <div className="empty-cart-icon">🛒</div>
                        <h2>Your cart is currently empty</h2>
                        <p>Before you check out, you must add some products to your shopping cart.</p>
                        <p>You will find a lot of interesting products on our "Shop" page.</p>
                        <Link to="/shope" className="cart-start-shopping-btn">
                            Return to Shop
                        </Link>
                    </div>
                ) : (
                    <div className="cart-layout-grid">
                        
                        {/* Cart Items Column */}
                        <div className="cart-items-column">
                            <div className="cart-items-table-header">
                                <div className="header-col product-info-header">Product</div>
                                <div className="header-col price-header">Price</div>
                                <div className="header-col qty-header">Quantity</div>
                                <div className="header-col total-header">Subtotal</div>
                            </div>

                            <div className="cart-items-list-wrapper">
                                {cartItems.map((item) => (
                                    <div className="cart-page-item-row" key={item.id}>
                                        
                                        {/* Product image & title */}
                                        <div className="cart-page-item-product">
                                            <button 
                                                className="cart-page-item-remove-btn"
                                                onClick={() => removeFromCart(item.id)}
                                                title="Remove item"
                                            >
                                                ×
                                            </button>
                                            <div className="cart-page-item-image-box">
                                                <Link to="/product" state={{ product: item }}>
                                                    <img src={item.image} alt={item.title} />
                                                </Link>
                                            </div>
                                            <div className="cart-page-item-details">
                                                <Link to="/product" state={{ product: item }} className="cart-page-item-title">
                                                    {item.title}
                                                </Link>
                                                {item.badge && <span className="cart-page-item-badge">{item.badge}</span>}
                                                <span className="cart-page-item-stock">In Stock</span>
                                            </div>
                                        </div>

                                        {/* Price */}
                                        <div className="cart-page-item-price">
                                            ${item.price?.toFixed(2)}
                                        </div>

                                        {/* Quantity Selector */}
                                        <div className="cart-page-item-qty">
                                            <div className="cart-page-qty-selector">
                                                <button 
                                                    onClick={() => updateQty(item.id, -1)}
                                                    disabled={item.qty <= 1}
                                                >
                                                    −
                                                </button>
                                                <span>{item.qty}</span>
                                                <button onClick={() => updateQty(item.id, 1)}>+</button>
                                            </div>
                                        </div>

                                        {/* Item Subtotal */}
                                        <div className="cart-page-item-total">
                                            ${(item.price * item.qty).toFixed(2)}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Coupon & Cart Actions Row */}
                            <div className="cart-actions-row">
                                <form className="coupon-form" onSubmit={handleApplyCoupon}>
                                    <input 
                                        type="text" 
                                        placeholder="Coupon code" 
                                        value={couponInput}
                                        onChange={(e) => setCouponInput(e.target.value)}
                                        className="coupon-input"
                                    />
                                    <button type="submit" className="apply-coupon-btn">
                                        Apply Coupon
                                    </button>
                                </form>
                                <button className="clear-cart-btn" onClick={clearCart}>
                                    Clear Cart
                                </button>
                            </div>
                            
                            {couponError && <p className="coupon-message error">{couponError}</p>}
                            {couponSuccess && <p className="coupon-message success">{couponSuccess}</p>}
                        </div>

                        {/* Order Summary Column */}
                        <div className="cart-summary-column">
                            <div className="summary-card">
                                <h3 className="summary-title">Order Summary</h3>
                                <div className="summary-underline"></div>

                                <div className="summary-row">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>

                                {discountPercent > 0 && (
                                    <div className="summary-row discount">
                                        <span>Discount ({discountPercent}%)</span>
                                        <span>-${discountAmount.toFixed(2)}</span>
                                    </div>
                                )}

                                <div className="summary-row">
                                    <span>Shipping</span>
                                    <span>{shippingCost === 0 ? 'Free Shipping' : `$${shippingCost.toFixed(2)}`}</span>
                                </div>

                                <div className="summary-divider"></div>

                                <div className="summary-row total-row">
                                    <span>Total</span>
                                    <span className="total-amount">${finalTotal.toFixed(2)}</span>
                                </div>

                                <button 
                                    className="checkout-proceed-btn"
                                    onClick={() => navigate('/checkout')}
                                >
                                    Proceed To Checkout
                                </button>

                                <div className="checkout-security-note">
                                    <span className="lock-icon">🔒</span>
                                    <span>Secure checkout. 3-Year warranty included.</span>
                                </div>
                            </div>

                            <Link to="/shope" className="continue-shopping-link">
                                ← Continue Shopping
                            </Link>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
}

export default Cart;
