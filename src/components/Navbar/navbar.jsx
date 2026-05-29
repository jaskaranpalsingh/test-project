import { useState } from "react";
import "./navbar.css";
import { ChevronDownIcon, ShoppingCartIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();

  return (
    <>
      <nav className="navbar">
        <div className="container-fluid">

          {/* Logo */}
          <a className="brand-name" href="#"><img src="/src/assets/logoimg.png" alt="MyStore" /></a>

          {/* Menu */}
          <ul className="menu-listing">
            <Link to="/" className="listing-tital" style={{ textDecoration: 'none' }}>Home</Link>
            <Link to="/shope" className="listing-tital" style={{ textDecoration: 'none' }}>Shop</Link>
            <Link to="/women" className="listing-tital" style={{ textDecoration: 'none' }}>Women</Link>
            <Link to="/men" className="listing-tital" style={{ textDecoration: 'none' }}>Men</Link>

            {/* Dropdown */}
            <li className="list-btn">
              <button onClick={() => setIsOpen(!isOpen)}>
                Categories
                <ChevronDownIcon className="dropdown-icon" />
              </button>

              {isOpen && (
                <div className="custom-dropdown">
                  <ul className="sub-menu">
                    <Link to="/dresses" className="dropdown-element" onClick={() => setIsOpen(false)}>
                      Dresses
                    </Link>
                    <Link to="/Jackets" className="dropdown-element" onClick={() => setIsOpen(false)}>
                      Jackets
                    </Link>
                    <Link to="/Tshirts" className="dropdown-element" onClick={() => setIsOpen(false)}>
                      Tshirts
                    </Link>
                  </ul>
                </div>
              )}
            </li>
          </ul>

          {/* Cart Icon */}
          <div className="navbar-cart" onClick={() => setIsCartOpen(true)}>
            <ShoppingCartIcon className="cart-icon" />
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </div>

        </div>
      </nav>


    </>




  );
}

export default Navbar;