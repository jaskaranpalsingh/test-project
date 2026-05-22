import React, { useState } from 'react';
import './Shope.css';

function Shope() {
    const [price, setPrice] = useState(130);

    const categories = [
        "Dresses",
        "Jackets",
        "Men",
        "T-shirts",
        "Tops",
        "Women"
    ];

    const colors = [
        { name: "Black", color: "#000", count: 2 },
        { name: "Blue", color: "#2874c7", count: 1 },
        { name: "Brown", color: "#c58a2c", count: 2 },
        { name: "Gray", color: "#8f8f8f", count: 1 },
        { name: "Green", color: "#7ed321", count: 2 },
        { name: "Red", color: "#ef4444", count: 4 },
        { name: "Yellow", color: "#facc15", count: 4 },
    ];

    const sizes = [
        { size: "XS", count: 4 },
        { size: "S", count: 3 },
        { size: "M", count: 3 },
        { size: "L", count: 3 },
        { size: "XL", count: 4 },
    ];

    const brands = [
        { name: "Calvin Klein", count: 3 },
        { name: "Lacoste", count: 1 },
        { name: "Louis Vuitton", count: 2 },
        { name: "Sportempt", count: 4 },
        { name: "Tommy Hilfiger", count: 1 },
        { name: "UCLA", count: 4 },
    ];

    const products = [
        { id: 1, title: 'Asymmetric tulle midi dress', price: 36.16, oldPrice: 59.99, rating: 4.0, reviews: 2, badge: '40%' },
        { id: 2, title: 'Billie Eilish T-shirt', price: 22.55, oldPrice: 38.13, rating: 3.67, reviews: 6, badge: '' },
        { id: 3, title: 'Darted smart trousers', price: 34.99, oldPrice: 41.99, rating: 4.33, reviews: 3, badge: '' },
        { id: 4, title: 'Darted smart trousers Cream', price: 24.30, oldPrice: 39.99, rating: 3.67, reviews: 3, badge: '30%' },
        { id: 5, title: 'Dotted mesh skort', price: 18.99, oldPrice: 29.99, rating: 3.33, reviews: 3, badge: '36%' },
        { id: 6, title: 'Mini skirt with pockets', price: 125.99, oldPrice: null, rating: 4.0, reviews: 2, badge: '140%' },
    ];

    return (
        <div className="shope-page">
            <h1 className="shope-title">Shop</h1>

            <div className="shope-container">
                {/* Sidebar */}
                <div className="filter-sidebar">

                    {/* Categories */}
                    <h3 className="sidebar-title">Product Categories</h3>
                    {categories.map((item, index) => (
                        <div className="filter-item" key={index}>
                            <div className="filter-left">
                                <input
                                    type="checkbox"
                                    id={item}
                                    className="custom-checkbox"
                                    defaultChecked={item === "Women"}
                                />
                                <label htmlFor={item} className="filter-name">{item}</label>
                            </div>
                            {(item === "Men" || item === "Women") && (
                                <span className="plus-icon">+</span>
                            )}
                        </div>
                    ))}

                    <div className="divider"></div>

                    {/* Price */}
                    <h3 className="sidebar-title">Filter by price</h3>
                    <div className="price-inputs">
                        <input type="text" value="10" readOnly className="price-input" />
                        <span className="price-separator">-</span>
                        <input type="text" value={price} readOnly className="price-input" />
                    </div>
                    <div className="price-range-slider">
                        <input
                            type="range"
                            min="10"
                            max="130"
                            value={price}
                            className="range-slider"
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    <div className="price-footer">
                        <span>Price: $10 - ${price}</span>
                        <button className="filter-btn">FILTER</button>
                    </div>

                    <div className="divider"></div>

                    {/* Colors */}
                    <h3 className="sidebar-title">Filter by Color</h3>
                    {colors.map((item, index) => (
                        <div className="filter-item" key={index}>
                            <div className="filter-left">
                                <div className="color-dot" style={{ backgroundColor: item.color }}></div>
                                <span className="filter-name">{item.name}</span>
                            </div>
                            <span className="count">({item.count})</span>
                        </div>
                    ))}

                    <div className="divider"></div>

                    {/* Sizes */}
                    <h3 className="sidebar-title">Filter by Size</h3>
                    {sizes.map((item, index) => (
                        <div className="filter-item" key={index}>
                            <div className="filter-left">
                                <input type="checkbox" id={item.size} className="custom-checkbox" />
                                <label htmlFor={item.size} className="filter-name">{item.size}</label>
                            </div>
                            <span className="count">({item.count})</span>
                        </div>
                    ))}

                    <div className="divider"></div>

                    {/* Brands */}
                    <h3 className="sidebar-title">Brands</h3>
                    {brands.map((item, index) => (
                        <div className="filter-item" key={index}>
                            <div className="filter-left">
                                <input type="checkbox" className="custom-checkbox" />
                                <span className="filter-name">{item.name}</span>
                            </div>
                            <span className="count">({item.count})</span>
                        </div>
                    ))}
                </div>

                {/* Main Content */}
                <div className="shope-main">
                    <div className="shope-topbar">
                        <div className="results-count">Showing 1–12 of 15 results</div>
                        <div className="topbar-actions">
                            <div className="view-icons">
                                <span>⊞</span>
                                <span>≡</span>
                            </div>
                            <select className="sort-select">
                                <option>Default sorting</option>
                            </select>
                            <select className="items-select">
                                <option>12 Items</option>
                            </select>
                        </div>
                    </div>

                    <div className="product-grid">
                        {products.map(product => (
                            <div className="product-card" key={product.id}>
                                <div className="product-image-placeholder">
                                    {/* Placeholder space for the image */}
                                    <div className="placeholder-text" style={{ color: '#aaa', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '90%' }}><img src="/src/assets/shop-photo1.webp" alt="photo" /></div>

                                    {product.badge && <span className="product-badge">{product.badge}</span>}
                                    <div className="product-actions">
                                        <button className="action-btn">♡</button>
                                        <button className="action-btn">👁</button>
                                    </div>
                                    <button className="select-options-btn">SELECT OPTIONS</button>
                                </div>
                                <div className="product-info">
                                    <h4 className="product-title">{product.title}</h4>
                                    <div className="product-price">
                                        <span className="current-price">${product.price.toFixed(2)}</span>
                                        {product.oldPrice && <span className="old-price">${product.oldPrice.toFixed(2)}</span>}
                                    </div>
                                    <div className="product-rating">
                                        <span className="stars">★★★★☆</span>
                                        <span className="rating-score">{product.rating.toFixed(2)} ({product.reviews})</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Shope;