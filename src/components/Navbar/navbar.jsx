import { useState } from "react";
import "./navbar.css";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="container-fluid">

          {/* Logo */}
          <a className="brand-name" href="#"><img src="/src/assets/logoimg.png" alt="MyStore" /></a>

          {/* Menu */}
          <ul className="menu-listing">
            <Link to="/" className="listing-tital" style={{ textDecoration: 'none' }}>Home</Link>
            <Link to="/shope" className="listing-tital" style={{ textDecoration: 'none' }}>Shope</Link>
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
                    <Link to="/dresses" className="dropdown-element">
                      Dresses
                    </Link>
                    <Link to="/Jackets" className="dropdown-element">
                      Jackets
                    </Link>
                    <Link to="/Tshirts" className="dropdown-element">
                      Tshirts
                    </Link>

                  </ul>
                </div>
              )}
            </li>
          </ul>

        </div>
      </nav>


    </>




  );
}

export default Navbar;