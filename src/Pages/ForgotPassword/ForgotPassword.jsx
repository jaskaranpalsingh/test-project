import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../services/api";
import "./ForgotPassword.css";

function ForgotPassword() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await API.post("/auth/forgot-password", { email });

            navigate("/reset-password", {
                state: { email },
            });
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page-container">
            <div className="login-card-wrapper">
                <div className="login-card-body">
                    <div className="back-to-store-wrapper">
                        <Link to="/login" className="back-to-store-link">
                            ← Back to Sign In
                        </Link>
                    </div>

                    <div className="brand-logo-container">
                        <h2 className="brand-login-title">NURFIA</h2>
                        <p className="brand-login-subtitle">Reset your password</p>
                    </div>

                    {error && <div className="alert-box alert-error">{error}</div>}

                    <form onSubmit={handleSubmit} className="auth-form">
                        <p className="forgot-description">
                            Enter your email and we'll send you an OTP to reset your password.
                        </p>

                        <div className="form-input-group">
                            <input
                                type="email"
                                id="forgot-email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setError("");
                                }}
                                placeholder=" "
                                required
                            />
                            <label htmlFor="forgot-email">Email Address</label>
                        </div>

                        <button type="submit" className="auth-submit-btn" disabled={loading}>
                            {loading ? <span className="spinner-loader"></span> : "Send OTP"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;