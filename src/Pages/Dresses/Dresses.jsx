import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Dresses.css';

// Import images
import img1 from '../../assets/shpe-photo4.webp';
import img2 from '../../assets/photo2.webp';
import img3 from '../../assets/photo3.webp';
import img4 from '../../assets/photo4.webp';

const dressProducts = [
    {
        id: 1,
        title: "Short sleeveless dress with gathering",
        price: 38.66,
        oldPrice: 59.99,
        rating: 3.67,
        reviews: 3,
        badge: '36%',
        image: img1,
    },
    {
        id: 2,
        title: "Short floral dress with ruffles",
        price: 62.25,
        oldPrice: 75.00,
        rating: 3.33,
        reviews: 3,
        badge: '18%',
        image: img2,
    },
    {
        id: 3,
        title: "Short floral dress",
        price: 54.33,
        oldPrice: 69.66,
        rating: 4.00,
        reviews: 3,
        badge: '23%',
        image: img3,
    },
    {
        id: 4,
        title: "Short beaded dress",
        price: 54.55,
        oldPrice: 60.99,
        rating: 3.00,
        reviews: 6,
        badge: '11%',
        image: img4,
    }
];

function Dresses() {
    const [price, setPrice] = useState(2500)

    const categories = [
        "Dresses",
        "Jackets",
        "Men",
        "T-shirts",
        "Tops",
        "Women"
    ]

    const colors = [
        { name: "Black", color: "#000", count: 2 },
        { name: "Blue", color: "#2874c7", count: 1 },
        { name: "Brown", color: "#c58a2c", count: 2 },
        { name: "Gray", color: "#8f8f8f", count: 1 },
        { name: "Green", color: "#7ed321", count: 2 },
        { name: "Red", color: "#ef4444", count: 4 },
        { name: "Yellow", color: "#facc15", count: 4 },
    ]

    const sizes = [
        { size: "XS", count: 4 },
        { size: "S", count: 3 },
        { size: "M", count: 3 },
        { size: "L", count: 3 },
        { size: "XL", count: 4 },
    ]

    const brands = [
        { name: "Calvin Klein", count: 3 },
        { name: "Lacoste", count: 1 },
        { name: "Louis Vuitton", count: 2 },
    ]

    const renderStars = (rating) => {
        return '★★★★★'.split('').map((star, i) => (
            <span key={i} style={{ color: i < Math.round(rating) ? '#fbbf24' : '#e5e7eb' }}>★</span>
        ));
    };

    return (
        <div className="dresses-page-wrapper">
            <div className="dresses-container">
                {/* Sidebar */}
                <div className="filter-sidebar">

                    {/* Categories */}

                    <h3 className="sidebar-title">
                        Product Categories
                    </h3>

                    {categories.map((item, index) => (
                        <div className="filter-item" key={index}>

                            <div className="filter-left">

                                <input
                                    type="radio"
                                    name="category"
                                    id={item}
                                    className="custom-radio"
                                    defaultChecked={item === "Dresses"}
                                />

                                <label htmlFor={item} className="filter-name">
                                    {item}
                                </label>

                            </div>

                            {(item === "Men" || item === "Women") && (
                                <span className="plus-icon">
                                    +
                                </span>
                            )}

                        </div>
                    ))}

                    {/* Price */}

                    <div className="divider"></div>

                    <h3 className="sidebar-title">
                        Price Filter
                    </h3>

                    <p className="selected-price">
                        ₹{price}
                    </p>

                    <input
                        type="range"
                        min="0"
                        max="5000"
                        value={price}
                        className="range-slider"
                        onChange={(e) => setPrice(e.target.value)}
                    />

                    <div className="price-range">
                        <span>₹0</span>
                        <span>₹5000</span>
                    </div>

                    {/* Colors */}

                    <div className="divider"></div>

                    <h3 className="sidebar-title">
                        Filter by Color
                    </h3>

                    {colors.map((item, index) => (
                        <div className="filter-item" key={index}>

                            <div className="filter-left">

                                <div
                                    className="color-dot"
                                    style={{ backgroundColor: item.color }}
                                ></div>

                                <span className="filter-name">
                                    {item.name}
                                </span>

                            </div>

                            <span className="count">
                                ({item.count})
                            </span>

                        </div>
                    ))}

                    {/* Sizes */}

                    <div className="divider"></div>

                    <h3 className="sidebar-title">
                        Filter by Size
                    </h3>

                    {sizes.map((item, index) => (
                        <div className="filter-item" key={index}>

                            <div className="filter-left">

                                <input
                                    type="radio"
                                    name="size"
                                    id={item.size}
                                    className="custom-radio"
                                />

                                <label htmlFor={item.size} className="filter-name">
                                    {item.size}
                                </label>

                            </div>

                            <span className="count">
                                ({item.count})
                            </span>

                        </div>
                    ))}

                    {/* Brands */}

                    <div className="divider"></div>

                    <h3 className="sidebar-title">
                        Brands
                    </h3>

                    {brands.map((item, index) => (
                        <div className="filter-item" key={index}>

                            <div className="filter-left">

                                <input type="checkbox" id={`brand-${index}`} className="custom-checkbox" />

                                <label htmlFor={`brand-${index}`} className="filter-name">
                                    {item.name}
                                </label>

                            </div>

                            <span className="count">
                                ({item.count})
                            </span>

                        </div>
                    ))}

                </div>

                {/* Main Content */}
                <div className="dresses-main">
                    <div className="product-grid-4">
                        {dressProducts.map(product => (
                            <div className="product-card" key={product.id}>
                                <div className="product-image-placeholder">
                                    <Link to="/product" state={{ product }} style={{ display: 'block', width: '100%', height: '100%' }}>
                                        <img src={product.image} alt={product.title} className="product-image" />
                                    </Link>
                                    {product.badge && <span className="product-badge">{product.badge}</span>}
                                    <div className="product-actions">
                                        <button className="action-btn">♡</button>
                                        <button className="action-btn">👁</button>
                                        <button className="action-btn">⛶</button>
                                    </div>
                                </div>
                                <div className="product-info">
                                    <Link to="/product" state={{ product }} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <h4 className="product-title">{product.title}</h4>
                                    </Link>
                                    <div className="product-price">
                                        <span className="current-price">${product.price.toFixed(2)}</span>
                                        {product.oldPrice && <span className="old-price">${product.oldPrice.toFixed(2)}</span>}
                                    </div>
                                    <div className="product-rating">
                                        <span className="stars">{renderStars(product.rating)}</span>
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

export default Dresses;