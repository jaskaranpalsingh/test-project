import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../services/api";
import "./OrderConfirmation.css";

function OrderConfirmation() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchOrder = async () => {
            const userInfo = localStorage.getItem("userInfo")
                ? JSON.parse(localStorage.getItem("userInfo"))
                : null;

            if (!userInfo) {
                navigate("/login");
                return;
            }

            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                };
                const res = await API.get(`/orders/${id}`, config);
                setOrder(res.data);
            } catch (err) {
                console.error("Fetch order error:", err);
                setError(err.response?.data?.message || "Failed to load order details.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [id, navigate]);

    if (loading) {
        return (
            <div className="confirmation-page">
                <div className="confirmation-loading">
                    <div className="spinner-loader" style={{ borderColor: "#0f172a", borderTopColor: "transparent" }}></div>
                    <p>Loading order details...</p>
                </div>
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="confirmation-page">
                <div className="confirmation-error-box">
                    <h2>⚠️ Error</h2>
                    <p>{error || "Order not found."}</p>
                    <button className="continue-shopping-btn" onClick={() => navigate("/shope")}>
                        Go to Shop
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="confirmation-page">
            <div className="confirmation-container">
                <div className="confirmation-header-card">
                    <div className="success-icon-badge">✓</div>
                    <h1>Thank You For Your Order!</h1>
                    <p className="order-subtitle">Your order is being processed and will be shipped soon.</p>
                    <div className="order-id-bubble">
                        <span>Order ID:</span> <strong>#ORD-{order._id.toString().slice(-6).toUpperCase()}</strong>
                    </div>
                </div>

                <div className="confirmation-details-grid">
                    {/* Left: Summary */}
                    <div className="confirmation-card items-summary-card">
                        <h3>Order Summary</h3>
                        <div className="confirmation-items-list">
                            {order.orderItems.map((item, idx) => (
                                <div className="confirmation-item-row" key={idx}>
                                    <div className="item-thumbnail">
                                        {item.image ? (
                                            <img src={item.image} alt={item.title} />
                                        ) : (
                                            <div className="item-thumbnail-placeholder" />
                                        )}
                                    </div>
                                    <div className="item-details">
                                        <p className="item-name">{item.title}</p>
                                        <p className="item-qty">Qty: {item.qty}</p>
                                    </div>
                                    <span className="item-price">${(item.price * item.qty).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>

                        <div className="confirmation-totals">
                            <div className="totals-row">
                                <span>Subtotal</span>
                                <span>${order.subtotal?.toFixed(2)}</span>
                            </div>
                            <div className="totals-row">
                                <span>Shipping</span>
                                <span>{order.shippingPrice === 0 ? "FREE" : `$${order.shippingPrice?.toFixed(2)}`}</span>
                            </div>
                            <div className="totals-divider" />
                            <div className="totals-row grand-total-row">
                                <span>Grand Total</span>
                                <span>${order.totalPrice?.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Shipping Address */}
                    <div className="confirmation-card shipping-details-card">
                        <h3>Delivery Address</h3>
                        <div className="address-details">
                            <p className="recipient-name">{order.shippingAddress?.fullName}</p>
                            <p className="recipient-address">{order.shippingAddress?.address}</p>
                            <p className="recipient-location">
                                {order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.pincode}
                            </p>
                            <p className="recipient-phone">📞 {order.shippingAddress?.phone}</p>
                        </div>

                        <div className="delivery-status-note">
                            <h4>Estimated Delivery</h4>
                            <p>Typically delivers within 3-5 business days.</p>
                        </div>
                    </div>
                </div>

                <div className="confirmation-actions">
                    <button className="continue-shopping-btn" onClick={() => navigate("/")}>
                        Continue Shopping
                    </button>
                </div>
            </div>
        </div>
    );
}

export default OrderConfirmation;
