import { useState } from "react";
import "./navbar.css";
import { ChevronDownIcon, ShoppingCartIcon } from "@heroicons/react/24/solid";
import { UserIcon, HeartIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const { wishlistItems } = useWishlist();

  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  const firstName = userInfo?.name?.split(" ")[0]
    || userInfo?.userName?.split(" ")[0]
    || "Account";

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    window.location.reload();
  };

  return (
    <>
      <nav className="navbar">
        <div className="container-fluid">

          {/* Logo */}
          <a className="brand-name" href="#">
            <img src="/src/assets/logoimg.png" alt="MyStore" />
          </a>

          {/* Menu */}
          <ul className="menu-listing">
            <Link to="/" className="listing-tital" style={{ textDecoration: "none" }}>Home</Link>
            <Link to="/shope" className="listing-tital" style={{ textDecoration: "none" }}>Shop</Link>
            <Link to="/women" className="listing-tital" style={{ textDecoration: "none" }}>Women</Link>
            <Link to="/men" className="listing-tital" style={{ textDecoration: "none" }}>Men</Link>

            {/* Dropdown */}
            <li className="list-btn">
              <button onClick={() => setIsOpen(!isOpen)}>
                Categories
                <ChevronDownIcon className={`dropdown-icon ${isOpen ? "dropdown-icon-open" : ""}`} />
              </button>

              {isOpen && (
                <div className="custom-dropdown">
                  <div className="dropdown-category-header">Browse Categories</div>
                  <ul className="sub-menu">
                    <Link to="/dresses" className="dropdown-element" onClick={() => setIsOpen(false)}>
                      <span className="dropdown-icon-box" style={{ background: "#fce7f3", color: "#be185d" }}>👗</span>
                      <span className="dropdown-element-text">
                        <span className="dropdown-element-label">Dresses</span>
                        <span className="dropdown-element-sub">Casual, formal &amp; more</span>
                      </span>
                      <span className="dropdown-element-arrow">›</span>
                    </Link>
                    <Link to="/Jackets" className="dropdown-element" onClick={() => setIsOpen(false)}>
                      <span className="dropdown-icon-box" style={{ background: "#dbeafe", color: "#1d4ed8" }}>🧥</span>
                      <span className="dropdown-element-text">
                        <span className="dropdown-element-label">Jackets</span>
                        <span className="dropdown-element-sub">Coats, hoodies &amp; outerwear</span>
                      </span>
                      <span className="dropdown-element-arrow">›</span>
                    </Link>
                    <Link to="/Tshirts" className="dropdown-element" onClick={() => setIsOpen(false)}>
                      <span className="dropdown-icon-box" style={{ background: "#fef3c7", color: "#b45309" }}>👕</span>
                      <span className="dropdown-element-text">
                        <span className="dropdown-element-label">T-shirts</span>
                        <span className="dropdown-element-sub">Graphics, basics &amp; more</span>
                      </span>
                      <span className="dropdown-element-arrow">›</span>
                    </Link>
                  </ul>
                  <Link to="/shope" className="dropdown-footer-link" onClick={() => setIsOpen(false)}>
                    View all categories <span style={{ marginLeft: "4px" }}>→</span>
                  </Link>
                </div>
              )}
            </li>
          </ul>

          {/* Wishlist Icon */}
          <Link to="/wishlist" className="navbar-wishlist">
            <HeartIcon className="wishlist-icon" />
            {wishlistItems.length > 0 && <span className="wishlist-badge">{wishlistItems.length}</span>}
          </Link>

          {/* Cart Icon */}
          <div className="navbar-cart" onClick={() => setIsCartOpen(true)}>
            <ShoppingCartIcon className="cart-icon" />
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </div>

          {/* User Auth Section */}
          <div className="navbar-user-section">
            {userInfo ? (
              <div className="user-dropdown-container">
                <button
                  className="user-profile-btn"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                >
                  <UserIcon className="user-icon" />
                  <span className="user-firstname">{firstName}</span>
                </button>

                {userDropdownOpen && (
                  <div className="user-profile-dropdown">
                    <div className="user-info-header">
                      <p className="dropdown-username">{userInfo?.name || "User"}</p>
                      <p className="dropdown-email">{userInfo?.email || ""}</p>
                    </div>
                    <div className="dropdown-divider"></div>
                    <Link
                      to="/my-account"
                      className="dropdown-item"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      My Account
                    </Link>
                    {userInfo?.isAdmin && (
                      <a
                        href="http://localhost:5174"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="dropdown-item admin-link"
                      >
                        Admin Dashboard
                      </a>
                    )}
                    <button onClick={handleLogout} className="dropdown-item logout-btn">
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="login-link">
                <UserIcon className="user-icon" />
                <span>Sign In</span>
              </Link>
            )}
          </div>

        </div>
      </nav>
    </>
  );
}

export default Navbar;