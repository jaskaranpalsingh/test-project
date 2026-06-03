import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import API from "../../services/api";
import "./ResetPassword.css";

function ResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ password: "", confirmPassword: "" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (formData.password !== formData.confirmPassword) {
            return setError("Passwords do not match.");
        }
        if (formData.password.length < 6) {
            return setError("Password must be at least 6 characters.");
        }

        setLoading(true);

        try {
            await API.post(`/auth/reset-password/${token}`, { password: formData.password });
            setSuccess("Password reset successful!");
            setTimeout(() => navigate("/login"), 2000);
        } catch (err) {
            setError(err.response?.data?.message || "Invalid or expired link. Please try again.");
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
                        <p className="brand-login-subtitle">Choose a new password</p>
                    </div>

                    {error && <div className="alert-box alert-error">{error}</div>}
                    {success && <div className="alert-box alert-success">{success}</div>}

                    {!success && (
                        <form onSubmit={handleSubmit} className="auth-form">

                            <div className="form-input-group password-group">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    id="reset-password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder=" "
                                    required
                                />
                                <label htmlFor="reset-password">New Password</label>
                                <button
                                    type="button"
                                    className="pwd-toggle-btn"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? "👁️" : "👁️‍🗨️"}
                                </button>
                            </div>

                            <div className="form-input-group">
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    id="reset-confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder=" "
                                    required
                                />
                                <label htmlFor="reset-confirmPassword">Confirm New Password</label>
                            </div>

                            <button type="submit" className="auth-submit-btn" disabled={loading}>
                                {loading ? <span className="spinner-loader"></span> : "Reset Password"}
                            </button>

                        </form>
                    )}

                </div>
            </div>
        </div>
    );
}

export default ResetPassword;