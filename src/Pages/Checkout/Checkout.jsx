import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import API from "../../services/api";
import "./Checkout.css";

const FREE_SHIPPING_THRESHOLD = 500;

function Checkout() {
    const navigate = useNavigate();
    const { cartItems, subtotal, clearCart } = useCart();

    const userInfo = localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo"))
        : null;

    const shippingPrice = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 50;
    const totalPrice = subtotal + shippingPrice;

    const [formData, setFormData] = useState({
        fullName: userInfo?.name || "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!userInfo) {
            navigate("/login");
            return;
        }

        if (cartItems.length === 0) {
            setError("Your cart is empty.");
            return;
        }

        setLoading(true);

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const orderData = {
                orderItems: cartItems.map(item => ({
                    title: item.title,
                    qty: item.qty,
                    price: item.price,
                    image: item.image || "",
                })),
                shippingAddress: formData,
                subtotal,
                shippingPrice,
                totalPrice,
            };

            const res = await API.post("/orders", orderData, config);
            clearCart();
            navigate(`/order-confirmation/${res.data._id}`);

        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Redirect if not logged in
    if (!userInfo) {
        return (
            <div className="checkout-page">
                <div className="checkout-login-prompt">
                    <h2>Please sign in to checkout</h2>
                    <button className="checkout-submit-btn" onClick={() => navigate("/login")}>
                        Sign In
                    </button>
                </div>
            </div>
        );
    }

    // Redirect if cart is empty
    if (cartItems.length === 0) {
        return (
            <div className="checkout-page">
                <div className="checkout-login-prompt">
                    <h2>Your cart is empty</h2>
                    <button className="checkout-submit-btn" onClick={() => navigate("/shope")}>
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-page">
            <div className="checkout-container">

                {/* Left — Shipping Form */}
                <div className="checkout-left">
                    <h2 className="checkout-section-title">Shipping Information</h2>

                    {error && <div className="alert-box alert-error">{error}</div>}

                    <form onSubmit={handleSubmit} className="checkout-form">

                        <div className="form-input-group">
                            <input
                                type="text"
                                name="fullName"
                                id="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder=" "
                                required
                            />
                            <label htmlFor="fullName">Full Name</label>
                        </div>

                        <div className="form-input-group">
                            <input
                                type="tel"
                                name="phone"
                                id="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder=" "
                                required
                            />
                            <label htmlFor="phone">Phone Number</label>
                        </div>

                        <div className="form-input-group">
                            <input
                                type="text"
                                name="address"
                                id="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder=" "
                                required
                            />
                            <label htmlFor="address">Street Address</label>
                        </div>

                        <div className="form-row">
                            <div className="form-input-group">
                                <input
                                    type="text"
                                    name="city"
                                    id="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    placeholder=" "
                                    required
                                />
                                <label htmlFor="city">City</label>
                            </div>

                            <div className="form-input-group">
                                <input
                                    type="text"
                                    name="state"
                                    id="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    placeholder=" "
                                    required
                                />
                                <label htmlFor="state">State</label>
                            </div>
                        </div>

                        <div className="form-input-group">
                            <input
                                type="text"
                                name="pincode"
                                id="pincode"
                                value={formData.pincode}
                                onChange={handleChange}
                                placeholder=" "
                                required
                            />
                            <label htmlFor="pincode">Pincode</label>
                        </div>

                        <button
                            type="submit"
                            className="checkout-submit-btn"
                            disabled={loading}
                        >
                            {loading ? <span className="spinner-loader"></span> : "Place Order"}
                        </button>

                    </form>
                </div>

                {/* Right — Order Summary */}
                <div className="checkout-right">
                    <h2 className="checkout-section-title">Order Summary</h2>

                    <div className="order-items-list">
                        {cartItems.map(item => (
                            <div className="order-item" key={item.id}>
                                <div className="order-item-img">
                                    {item.image
                                        ? <img src={item.image} alt={item.title} />
                                        : <div className="img-placeholder" />
                                    }
                                </div>
                                <div className="order-item-info">
                                    <p className="order-item-title">{item.title}</p>
                                    <p className="order-item-qty">Qty: {item.qty}</p>
                                </div>
                                <p className="order-item-price">${(item.price * item.qty).toFixed(2)}</p>
                            </div>
                        ))}
                    </div>

                    <div className="order-summary-totals">
                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Shipping</span>
                            <span>{shippingPrice === 0 ? "FREE" : `$${shippingPrice.toFixed(2)}`}</span>
                        </div>
                        <div className="summary-divider" />
                        <div className="summary-row total-row">
                            <span>Total</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Checkout;