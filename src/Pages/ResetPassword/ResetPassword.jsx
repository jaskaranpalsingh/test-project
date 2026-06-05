import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import API from "../../services/api";
import "./ResetPassword.css";

function ResetPassword() {
    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email;

    const [formData, setFormData] = useState({
        otp: "",
        newPassword: "",
        confirmPassword: "",
    });

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

        if (!formData.otp || !formData.newPassword || !formData.confirmPassword) {
            return setError("Please fill in all fields.");
        }

        if (formData.newPassword !== formData.confirmPassword) {
            return setError("Passwords do not match.");
        }

        if (formData.newPassword.length < 6) {
            return setError("Password must be at least 6 characters.");
        }

        if (formData.otp.length !== 6 || isNaN(formData.otp)) {
            return setError("OTP must be 6 digits.");
        }

        setLoading(true);

        try {
            await API.post("/auth/verify-otp", {
                email,
                otp: formData.otp,
                newPassword: formData.newPassword,
            });

            setSuccess("Password reset successful!");
            setTimeout(() => navigate("/login"), 2000);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Invalid OTP or error occurred."
            );
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
                        <p className="brand-login-subtitle">
                            Verify OTP & Reset Password
                        </p>
                    </div>

                    {error && (
                        <div className="alert-box alert-error">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="alert-box alert-success">
                            {success}
                        </div>
                    )}

                    {!success && (
                        <form onSubmit={handleSubmit} className="auth-form" noValidate>

                            <div className="form-input-group">
                                <input
                                    type="text"
                                    name="otp"
                                    id="reset-otp"
                                    value={formData.otp}
                                    onChange={handleChange}
                                    placeholder=" "
                                    maxLength="6"
                                />
                                <label htmlFor="reset-otp">
                                    Enter OTP (6 digits)
                                </label>
                            </div>

                            <div className="form-input-group password-group">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="newPassword"
                                    id="reset-password"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                    placeholder=" "
                                />
                                <label htmlFor="reset-password">
                                    New Password
                                </label>

                                <button
                                    type="button"
                                    className="pwd-toggle-btn"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
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
                                />
                                <label htmlFor="reset-confirmPassword">
                                    Confirm New Password
                                </label>
                            </div>

                            <button
                                type="submit"
                                className="auth-submit-btn"
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="spinner-loader"></span>
                                ) : (
                                    "Reset Password"
                                )}
                            </button>

                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;