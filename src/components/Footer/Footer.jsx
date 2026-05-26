import React from "react";
import "./Footer.css";

function Footer() {
    return (
        <footer className="footer">

            <div className="footer-container">

                {/* Company */}
                <div className="footer-column">
                    <h3>Company</h3>

                    <ul>
                        <li>Careers for Nurfia</li>
                        <li>About Nurfia</li>
                        <li>Investor Relations</li>
                        <li>Nurfia Devices</li>
                        <li>Customer Reviews</li>
                        <li>Social Responsibility</li>
                        <li>Store Locations</li>
                    </ul>
                </div>

                {/* Resources */}
                <div className="footer-column">
                    <h3>Resources</h3>

                    <ul>
                        <li>Your Orders</li>
                        <li>Returns & Replacements</li>
                        <li>Shipping Rates & Policies</li>
                        <li>Refund and Returns Policy</li>
                        <li>Privacy Policy</li>
                        <li>Terms and Conditions</li>
                        <li>Cookie Settings</li>
                        <li>Help Center</li>
                    </ul>
                </div>

                {/* Help */}
                <div className="footer-column">
                    <h3>Help & Support</h3>

                    <ul>
                        <li>Sell on Nurfia</li>
                        <li>Sell Your Services on Nurfia</li>
                        <li>Sell on Nurfia Business</li>
                        <li>Sell Your Apps on Nurfia</li>
                        <li>Become an Affiliate</li>
                        <li>Advertise Your Products</li>
                        <li>Sell-Publish with Us</li>
                        <li>Become a Nurfia Vendor</li>
                    </ul>
                </div>

                {/* Subscribe */}
                <div className="footer-column subscribe-section">
                    <h3>Subscribe to our emails</h3>

                    <p>
                        Subscribe to receive all our updates and offers,
                        and get a 10% discount on your first purchase.
                    </p>

                    <input
                        type="email"
                        placeholder="Enter your email address"
                    />

                    <button>SUBSCRIBE</button>

                    <small>
                        By subscribing you agree to our
                        <span> Terms & Conditions </span>
                        and
                        <span> Privacy & Cookies Policy </span>.
                    </small>
                </div>

            </div>

            <hr />

        </footer>
    );
}

export default Footer;