import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import "./MyAccount.css";

function MyAccount() {
    const navigate = useNavigate();

    // Retrieve authentication info in stable state
    const [userInfo, setUserInfo] = useState(() => {
        const stored = localStorage.getItem("userInfo");
        return stored ? JSON.parse(stored) : null;
    });

    const token = userInfo?.token;

    // Tab state: 'profile' or 'orders'
    const [activeTab, setActiveTab] = useState("profile");

    // Profile states
    const [profile, setProfile] = useState(null);
    const [loadingProfile, setLoadingProfile] = useState(true);
    const [errorProfile, setErrorProfile] = useState("");
    const [successProfile, setSuccessProfile] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    // Profile form state
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    // Orders states
    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(true);
    const [errorOrders, setErrorOrders] = useState("");

    // Enforce authentication
    useEffect(() => {
        if (!userInfo) {
            navigate("/login");
        }
    }, [userInfo, navigate]);

    // Fetch user profile info
    useEffect(() => {
        if (!token) return;

        const fetchProfile = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                const res = await API.get("/auth/profile", config);
                setProfile(res.data);
                setFormData({
                    name: res.data.name,
                    email: res.data.email,
                    password: "",
                    confirmPassword: ""
                });
            } catch (err) {
                console.error("Fetch profile error:", err);
                setErrorProfile(err.response?.data?.message || "Failed to load profile details.");
            } finally {
                setLoadingProfile(false);
            }
        };

        fetchProfile();
    }, [token]);

    // Fetch orders history
    useEffect(() => {
        if (!token) return;

        const fetchOrders = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                const res = await API.get("/orders/myorders", config);
                setOrders(res.data);
            } catch (err) {
                console.error("Fetch orders error:", err);
                setErrorOrders(err.response?.data?.message || "Failed to load order history.");
            } finally {
                setLoadingOrders(false);
            }
        };

        fetchOrders();
    }, [token]);

    // Handle profile form input change
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrorProfile("");
        setSuccessProfile("");
    };

    // Handle profile form submission
    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setErrorProfile("");
        setSuccessProfile("");

        if (formData.password && formData.password !== formData.confirmPassword) {
            setErrorProfile("Passwords do not match.");
            return;
        }

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const payload = {
                name: formData.name,
                email: formData.email,
            };

            if (formData.password) {
                payload.password = formData.password;
            }

            const res = await API.put("/auth/profile", payload, config);

            // Update local states
            setProfile(res.data);
            setIsEditing(false);
            setSuccessProfile("Profile updated successfully!");

            // Update user info in localStorage (including fresh token if changed) and state
            const updatedUserInfo = {
                ...userInfo,
                name: res.data.name,
                email: res.data.email,
                token: res.data.token || token
            };
            localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
            setUserInfo(updatedUserInfo);

            // Reset password input fields
            setFormData(prev => ({
                ...prev,
                password: "",
                confirmPassword: ""
            }));

        } catch (err) {
            console.error("Update profile error:", err);
            setErrorProfile(err.response?.data?.message || "Failed to update profile.");
        }
    };

    if (!userInfo) {
        return null;
    }

    return (
        <div className="my-account-page">
            <div className="my-account-container">
                {/* Sidebar Navigation */}
                <div className="account-sidebar">
                    <div className="user-avatar-badge">
                        {userInfo.name ? userInfo.name.slice(0, 2).toUpperCase() : "ME"}
                    </div>
                    <h2 className="user-sidebar-name">{profile?.name || userInfo.name}</h2>
                    <p className="user-sidebar-email">{profile?.email || userInfo.email}</p>

                    <div className="sidebar-menu">
                        <button
                            className={`sidebar-menu-btn ${activeTab === "profile" ? "active" : ""}`}
                            onClick={() => setActiveTab("profile")}
                        >
                            👤 My Profile
                        </button>
                        <button
                            className={`sidebar-menu-btn ${activeTab === "orders" ? "active" : ""}`}
                            onClick={() => setActiveTab("orders")}
                        >
                            📦 Order History
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                <div className="account-content-card">
                    {activeTab === "profile" ? (
                        <div className="profile-tab-content">
                            <div className="tab-header">
                                <h3>Account Information</h3>
                                {!isEditing && (
                                    <button className="edit-profile-trigger-btn" onClick={() => setIsEditing(true)}>
                                        Edit Profile
                                    </button>
                                )}
                            </div>

                            {loadingProfile ? (
                                <div className="tab-loader">
                                    <div className="spinner-loader"></div>
                                    <p>Loading profile...</p>
                                </div>
                            ) : errorProfile && !isEditing ? (
                                <div className="alert-box alert-error">{errorProfile}</div>
                            ) : (
                                <>
                                    {successProfile && <div className="alert-box alert-success">{successProfile}</div>}

                                    {!isEditing ? (
                                        <div className="profile-details-grid">
                                            <div className="detail-item">
                                                <span className="detail-label">Full Name</span>
                                                <span className="detail-val">{profile?.name}</span>
                                            </div>
                                            <div className="detail-item">
                                                <span className="detail-label">Email Address</span>
                                                <span className="detail-val">{profile?.email}</span>
                                            </div>
                                            <div className="detail-item">
                                                <span className="detail-label">Account Role</span>
                                                <span className="detail-val">{profile?.isAdmin ? "Administrator" : "Customer"}</span>
                                            </div>
                                            <div className="detail-item">
                                                <span className="detail-label">Member Since</span>
                                                <span className="detail-val">
                                                    {profile?.createdAt
                                                        ? new Date(profile.createdAt).toLocaleDateString("en-US", {
                                                            year: "numeric",
                                                            month: "long",
                                                            day: "numeric"
                                                        })
                                                        : "N/A"
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleProfileUpdate} className="profile-edit-form">
                                            {errorProfile && <div className="alert-box alert-error">{errorProfile}</div>}

                                            <div className="form-input-group">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    placeholder=" "
                                                    required
                                                />
                                                <label htmlFor="name">Full Name</label>
                                            </div>

                                            <div className="form-input-group">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    placeholder=" "
                                                    required
                                                />
                                                <label htmlFor="email">Email Address</label>
                                            </div>

                                            <div className="form-row">
                                                <div className="form-input-group">
                                                    <input
                                                        type="password"
                                                        name="password"
                                                        id="password"
                                                        value={formData.password}
                                                        onChange={handleInputChange}
                                                        placeholder=" "
                                                    />
                                                    <label htmlFor="password">New Password (optional)</label>
                                                </div>

                                                <div className="form-input-group">
                                                    <input
                                                        type="password"
                                                        name="confirmPassword"
                                                        id="confirmPassword"
                                                        value={formData.confirmPassword}
                                                        onChange={handleInputChange}
                                                        placeholder=" "
                                                    />
                                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                                </div>
                                            </div>

                                            <div className="form-actions">
                                                <button type="submit" className="save-profile-btn">
                                                    Save Changes
                                                </button>
                                                <button
                                                    type="button"
                                                    className="cancel-edit-btn"
                                                    onClick={() => {
                                                        setIsEditing(false);
                                                        setErrorProfile("");
                                                        setFormData({
                                                            name: profile?.name || "",
                                                            email: profile?.email || "",
                                                            password: "",
                                                            confirmPassword: ""
                                                        });
                                                    }}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </form>
                                    )}
                                </>
                            )}
                        </div>
                    ) : (
                        <div className="orders-tab-content">
                            <div className="tab-header">
                                <h3>Order History</h3>
                            </div>

                            {loadingOrders ? (
                                <div className="tab-loader">
                                    <div className="spinner-loader"></div>
                                    <p>Loading order history...</p>
                                </div>
                            ) : errorOrders ? (
                                <div className="alert-box alert-error">{errorOrders}</div>
                            ) : orders.length === 0 ? (
                                <div className="empty-orders-state">
                                    <span className="empty-orders-icon">📦</span>
                                    <h4>No orders placed yet</h4>
                                    <p>You haven't placed any orders with us. Start browsing our collection and place your first order!</p>
                                    <button className="go-shop-btn" onClick={() => navigate("/shope")}>
                                        Start Shopping
                                    </button>
                                </div>
                            ) : (
                                <div className="orders-list">
                                    {orders.map((order) => (
                                        <div className="order-card" key={order._id}>
                                            <div className="order-card-header">
                                                <div className="order-meta">
                                                    <span className="order-number">
                                                        Order ID: <strong>#ORD-{order._id.slice(-6).toUpperCase()}</strong>
                                                    </span>
                                                    <span className="order-date">
                                                        Placed on: {new Date(order.createdAt).toLocaleDateString("en-US", {
                                                            year: "numeric",
                                                            month: "short",
                                                            day: "numeric"
                                                        })}
                                                    </span>
                                                </div>
                                                <div className="order-totals-status">
                                                    <span className="order-total-amount">Total: ${order.totalPrice?.toFixed(2)}</span>
                                                    <span className={`status-badge badge-${order.status ? order.status.toLowerCase() : "pending"}`}>
                                                        {order.status || "Pending"}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="order-card-items">
                                                {order.orderItems?.map((item, idx) => (
                                                    <div className="order-card-item-row" key={idx}>
                                                        <div className="order-item-thumb">
                                                            {item.image ? (
                                                                <img src={item.image} alt={item.title} />
                                                            ) : (
                                                                <div className="order-item-thumb-placeholder" />
                                                            )}
                                                        </div>
                                                        <div className="order-item-info">
                                                            <p className="item-title-text">{item.title}</p>
                                                            <p className="item-quantity-text">Qty: {item.qty} × ${item.price?.toFixed(2)}</p>
                                                        </div>
                                                        <div className="order-item-subtotal">
                                                            ${(item.qty * item.price)?.toFixed(2)}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="order-card-actions">
                                                <button
                                                    className="view-invoice-btn"
                                                    onClick={() => navigate(`/order-confirmation/${order._id}`)}
                                                >
                                                    View Invoice Details
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MyAccount;
