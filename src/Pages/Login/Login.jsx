import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../../services/api";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    window.location.reload();
  };

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
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
    setSuccess("");
    setLoading(true);

    const { name, email, password, confirmPassword } = formData;

    if (!email || !password) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    if (!isLogin) {
      if (!name) {
        setError("Please enter your name.");
        setLoading(false);
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        setLoading(false);
        return;
      }
      if (password.length < 6) {
        setError("Password must be at least 6 characters long.");
        setLoading(false);
        return;
      }
    }

    try {
      if (isLogin) {
        const res = await API.post("/auth/login", { email, password });
        setSuccess("Successfully logged in!");
        localStorage.setItem("userInfo", JSON.stringify(res.data));
        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 1000);
      } else {
        const res = await API.post("/auth/register", { name, email, password });
        setSuccess("Account successfully registered! Logging in...");
        localStorage.setItem("userInfo", JSON.stringify(res.data));
        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 1500);
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "An authentication error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const toggleTab = (loginTab) => {
    setIsLogin(loginTab);
    setError("");
    setSuccess("");
    setFormData({ name: "", email: "", password: "", confirmPassword: "" });
  };

  // ── Logged-in view ──────────────────────────────────────────────
  if (userInfo) {
    return (
      <div className="login-page-container">
        <div className="login-card-wrapper">
          <div className="login-card-body logged-in-panel">
            <div className="back-to-store-wrapper">
              <Link to="/" className="back-to-store-link">← Back to Store</Link>
            </div>
            <div className="brand-logo-container">
              <h2 className="brand-login-title">NURFIA</h2>
              <p className="brand-login-subtitle">Active Session</p>
            </div>
            <div className="user-profile-summary">
              <div className="profile-avatar-circle">
                {userInfo.name.split(" ").map((n) => n[0]).join("").toUpperCase()}
              </div>
              <h3 className="profile-summary-name">{userInfo.name}</h3>
              <p className="profile-summary-email">{userInfo.email}</p>
              {userInfo.isAdmin && (
                <span className="profile-summary-badge">Administrator</span>
              )}
            </div>
            <div className="logged-in-actions">
              <button className="auth-submit-btn" onClick={() => navigate("/")}>
                Continue Shopping
              </button>
              <button className="auth-logout-btn" onClick={handleLogout}>
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Login / Register view ────────────────────────────────────────
  return (
    <div className="login-page-container">
      <div className="login-card-wrapper">
        <div className="login-card-header">
          <button
            className={`tab-btn ${isLogin ? "active" : ""}`}
            onClick={() => toggleTab(true)}
          >
            Sign In
          </button>
          <button
            className={`tab-btn ${!isLogin ? "active" : ""}`}
            onClick={() => toggleTab(false)}
          >
            Register
          </button>
        </div>

        <div className="login-card-body">
          <div className="back-to-store-wrapper">
            <Link to="/" className="back-to-store-link">← Back to Store</Link>
          </div>

          <div className="brand-logo-container">
            <h2 className="brand-login-title">NURFIA</h2>
            <p className="brand-login-subtitle">
              {isLogin ? "Welcome back! Please sign in." : "Create your premium account."}
            </p>
          </div>

          {error && <div className="alert-box alert-error">{error}</div>}
          {success && <div className="alert-box alert-success">{success}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            {!isLogin && (
              <div className="form-input-group">
                <input
                  type="text"
                  name="name"
                  id="reg-name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder=" "
                  required
                />
                <label htmlFor="reg-name">Full Name</label>
              </div>
            )}

            <div className="form-input-group">
              <input
                type="email"
                name="email"
                id="auth-email"
                value={formData.email}
                onChange={handleChange}
                placeholder=" "
                required
              />
              <label htmlFor="auth-email">Email Address</label>
            </div>

            <div className="form-input-group password-group">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="auth-password"
                value={formData.password}
                onChange={handleChange}
                placeholder=" "
                required
              />
              <label htmlFor="auth-password">Password</label>
              <button
                type="button"
                className="pwd-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>

            {/* Forgot Password Link */}
            {isLogin && (
              <div className="forgot-password-wrapper">
                <Link to="/forgot-password" className="forgot-password-link">
                  Forgot Password?
                </Link>
              </div>
            )}

            {!isLogin && (
              <div className="form-input-group">
                <input
                  type="password"
                  name="confirmPassword"
                  id="auth-confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder=" "
                  required
                />
                <label htmlFor="auth-confirmPassword">Confirm Password</label>
              </div>
            )}

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? (
                <span className="spinner-loader"></span>
              ) : isLogin ? (
                "Sign In"
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {isLogin && (
            <p className="switch-auth-hint">
              Don't have an account?{" "}
              <span onClick={() => toggleTab(false)}>Register here</span>
            </p>
          )}
          {!isLogin && (
            <p className="switch-auth-hint">
              Already have an account?{" "}
              <span onClick={() => toggleTab(true)}>Sign In here</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;