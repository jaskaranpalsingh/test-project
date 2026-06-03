import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";
import "./ForgotPassword.css";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        try {
            await API.post("/auth/forgot-password", { email });
            setSuccess("Password reset email sent! Check your inbox.");
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
                        <Link to="/login" className="back-to-store-link">← Back to Sign In</Link>
                    </div>

                    <div className="brand-logo-container">
                        <h2 className="brand-login-title">NURFIA</h2>
                        <p className="brand-login-subtitle">Reset your password</p>
                    </div>

                    {error && <div className="alert-box alert-error">{error}</div>}
                    {success && <div className="alert-box alert-success">{success}</div>}

                    {!success && (
                        <form onSubmit={handleSubmit} className="auth-form">
                            <p className="forgot-description">
                                Enter the email address linked to your account and we'll send you a reset link.
                            </p>

                            <div className="form-input-group">
                                <input
                                    type="email"
                                    id="forgot-email"
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value); setError(""); }}
                                    placeholder=" "
                                    required
                                />
                                <label htmlFor="forgot-email">Email Address</label>
                            </div>

                            <button type="submit" className="auth-submit-btn" disabled={loading}>
                                {loading ? <span className="spinner-loader"></span> : "Send Reset Link"}
                            </button>
                        </form>
                    )}

                    {success && (
                        <div className="success-actions">
                            <Link to="/login" className="auth-submit-btn" style={{ textDecoration: "none", textAlign: "center" }}>
                                Back to Sign In
                            </Link>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;