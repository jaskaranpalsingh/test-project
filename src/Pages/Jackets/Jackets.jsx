import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../services/api';
import '../Shope/Shope.css';

// Import product images
import shpePhoto5 from '../../assets/shpe-photo5.webp';
import shpePhoto4 from '../../assets/shpe-photo4.webp';
import photo2 from '../../assets/photo2.webp';
import photo3 from '../../assets/photo3.webp';
import photo4 from '../../assets/photo4.webp';
import shopPhoto1 from '../../assets/shop-photo1.webp';

// Fallback Jacket Products
const allProducts = [
    {
        id: 'jack-1',
        title: "Levi's Men's Sherpa Lined Denim Trucker Jacket",
        price: 89.00,
        oldPrice: 120.00,
        rating: 4.80,
        reviews: 142,
        badge: "Best Seller",
        image: photo2,
        categories: ["Men", "Jackets"],
        colors: ["Blue"],
        sizes: ["M", "L"],
        brand: "Calvin Klein"
    },
    {
        id: 'jack-2',
        title: "Classic Black Leather Bomber Jacket",
        price: 149.00,
        oldPrice: 199.00,
        rating: 4.60,
        reviews: 89,
        badge: "New",
        image: shpePhoto5,
        categories: ["Men", "Jackets"],
        colors: ["Black"],
        sizes: ["S", "M"],
        brand: "Louis Vuitton"
    },
    {
        id: 'jack-3',
        title: "Ultra Light Down Winter Puffer Jacket",
        price: 79.00,
        oldPrice: 99.00,
        rating: 4.50,
        reviews: 64,
        badge: "Sale",
        image: photo3,
        categories: ["Women", "Jackets"],
        colors: ["Gray"],
        sizes: ["S", "M", "L"],
        brand: "Sportempt"
    },
    {
        id: 'jack-4',
        title: "Classic Denim Jacket",
        price: 78.50,
        oldPrice: 95.00,
        rating: 4.60,
        reviews: 20,
        badge: "17%",
        image: shpePhoto4,
        categories: ["Women", "Jackets"],
        colors: ["Blue"],
        sizes: ["L", "XL"],
        brand: "Calvin Klein"
    },
    {
        id: 'jack-5',
        title: "Oversized Blazer",
        price: 89.99,
        oldPrice: 110.00,
        rating: 4.40,
        reviews: 7,
        badge: "",
        image: shopPhoto1,
        categories: ["Women", "Jackets"],
        colors: ["Green"],
        sizes: ["S", "M"],
        brand: "Tomy Hilfiger"
    },
    {
        id: 'jack-6',
        title: "Faux Leather Jacket",
        price: 95.00,
        oldPrice: 130.00,
        rating: 4.80,
        reviews: 22,
        badge: "",
        image: photo4,
        categories: ["Women", "Jackets"],
        colors: ["Black"],
        sizes: ["XS", "XL"],
        brand: "Louis Vuitton"
    }
];

const colorsList = [
    { name: "Black", color: "#000", count: 2 },
    { name: "Blue", color: "#2874c7", count: 2 },
    { name: "Brown", color: "#c58a2c", count: 0 },
    { name: "Gray", color: "#8f8f8f", count: 1 },
    { name: "Green", color: "#7ed321", count: 1 },
    { name: "Red", color: "#ef4444", count: 0 },
    { name: "Yellow", color: "#facc15", count: 0 },
];

const sizesList = [
    { size: "XS", count: 1 },
    { size: "S", count: 3 },
    { size: "M", count: 4 },
    { size: "L", count: 2 },
    { size: "XL", count: 2 },
];

const brandsList = [
    { name: "Calvin Klein", count: 2 },
    { name: "lacoste", count: 0 },
    { name: "Louis Vuitton", count: 2 },
    { name: "Sportempt", count: 1 },
    { name: "Tomy Hilfiger", count: 1 },
];

function Jackets() {
    const [dbProducts, setDbProducts] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState(['Jackets']);
    const [priceLimit, setPriceLimit] = useState(200);
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [sortBy, setSortBy] = useState('Default sorting');
    const [itemsPerPage, setItemsPerPage] = useState(12);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const res = await API.get('/products');
                const jacketDbProducts = res.data.filter(p =>
                    p.category === 'Jackets' ||
                    (Array.isArray(p.categories) && p.categories.includes('Jackets'))
                );
                const formattedDb = jacketDbProducts.map(p => ({
                    id: p._id || Math.random().toString(),
                    _id: p._id,
                    title: p.title || p.name,
                    price: Number(p.price),
                    oldPrice: p.oldPrice ? Number(p.oldPrice) : null,
                    rating: p.rating || 4.5,
                    reviews: p.reviews || 0,
                    badge: p.badge || '',
                    image: p.image || 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500',
                    categories: Array.isArray(p.categories) ? p.categories : [p.category || 'Jackets'],
                    colors: p.colors || ['Black'],
                    sizes: p.sizes || ['M', 'L'],
                    brand: p.brand || 'Calvin Klein'
                }));
                setDbProducts(formattedDb);
            } catch (err) {
                console.error("Failed to load products from API:", err);
            }
        };
        loadProducts();
    }, []);

    const combinedProducts = useMemo(() => {
        return [...dbProducts, ...allProducts];
    }, [dbProducts]);

    const maxPricePossible = useMemo(() => {
        if (combinedProducts.length === 0) return 200;
        const prices = combinedProducts.map(p => p.price || 0);
        return Math.ceil(Math.max(...prices, 200));
    }, [combinedProducts]);

    useEffect(() => {
        setPriceLimit(maxPricePossible);
    }, [maxPricePossible]);

    const categories = ["Dresses", "Jackets", "Men", "T-shirts", "Tops", "Women"];

    const handleCategoryChange = (category) => {
        setSelectedCategories(prev =>
            prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
        );
    };

    const handleColorToggle = (colorName) => {
        setSelectedColors(prev =>
            prev.includes(colorName) ? prev.filter(c => c !== colorName) : [...prev, colorName]
        );
    };

    const handleSizeToggle = (sizeName) => {
        setSelectedSizes(prev =>
            prev.includes(sizeName) ? prev.filter(s => s !== sizeName) : [...prev, sizeName]
        );
    };

    const handleBrandChange = (brandName) => {
        setSelectedBrands(prev =>
            prev.includes(brandName) ? prev.filter(b => b !== brandName) : [...prev, brandName]
        );
    };

    const handleResetFilters = () => {
        setSelectedCategories(['Jackets']);
        setPriceLimit(maxPricePossible);
        setSelectedColors([]);
        setSelectedSizes([]);
        setSelectedBrands([]);
    };

    const filteredProducts = useMemo(() => {
        let result = combinedProducts;

        if (selectedCategories.length > 0) {
            result = result.filter(p => p.categories.some(c => selectedCategories.includes(c)));
        }

        result = result.filter(p => p.price <= priceLimit);

        if (selectedColors.length > 0) {
            result = result.filter(p => p.colors.some(c => selectedColors.includes(c)));
        }

        if (selectedSizes.length > 0) {
            result = result.filter(p => p.sizes.some(s => selectedSizes.includes(s)));
        }

        if (selectedBrands.length > 0) {
            result = result.filter(p => selectedBrands.includes(p.brand));
        }

        if (sortBy === 'Sort by price: low to high') {
            result = [...result].sort((a, b) => a.price - b.price);
        } else if (sortBy === 'Sort by price: high to low') {
            result = [...result].sort((a, b) => b.price - a.price);
        } else if (sortBy === 'Sort by rating') {
            result = [...result].sort((a, b) => b.rating - a.rating);
        }

        return result;
    }, [combinedProducts, selectedCategories, priceLimit, selectedColors, selectedSizes, selectedBrands, sortBy]);

    const renderStars = (rating) => {
        const full = Math.floor(rating);
        let stars = '★'.repeat(full);
        if (rating % 1 >= 0.5) stars += '★';
        return stars.padEnd(5, '☆');
    };

    const isFilterActive =
        selectedCategories.length > 0 ||
        selectedColors.length > 0 ||
        selectedSizes.length > 0 ||
        selectedBrands.length > 0 ||
        priceLimit !== maxPricePossible;

    const currentItemsCount = Math.min(filteredProducts.length, itemsPerPage);

    return (
        <div className="shope-page">
            <div className="shope-container" style={{ borderTop: 'none', paddingTop: '10px' }}>
                {/* Sidebar */}
                <div className="filter-sidebar">
                    {/* Categories */}
                    <h3 className="sidebar-title">Product Categories</h3>
                    {categories.map((item, index) => (
                        <div className="filter-item" key={index}>
                            <div className="filter-left">
                                <input
                                    type="checkbox"
                                    id={`cat-${item}`}
                                    className="custom-checkbox"
                                    checked={selectedCategories.includes(item)}
                                    onChange={() => handleCategoryChange(item)}
                                />
                                <label 
                                    htmlFor={`cat-${item}`} 
                                    className="filter-name"
                                    style={{
                                        fontWeight: selectedCategories.includes(item) ? '600' : '400',
                                        color: selectedCategories.includes(item) ? '#111827' : ''
                                    }}
                                >
                                    {item}
                                </label>
                            </div>
                            {(item === "Men" || item === "Women") && (
                                <span className="plus-icon">+</span>
                            )}
                        </div>
                    ))}

                    <div className="divider"></div>

                    {/* Price Filter */}
                    <h3 className="sidebar-title">Filter by price</h3>
                    <div className="price-range-slider">
                        <input
                            type="range"
                            min="10"
                            max={maxPricePossible}
                            value={priceLimit}
                            className="range-slider"
                            onChange={(e) => setPriceLimit(Number(e.target.value))}
                        />
                    </div>
                    <div className="price-inputs">
                        <input type="text" value="10" readOnly className="price-input" />
                        <span className="price-separator">-</span>
                        <input type="text" value={priceLimit} readOnly className="price-input" />
                    </div>

                    <div className="price-footer">
                        <span>Price: $10 — ${priceLimit}</span>
                        <button className="filter-btn">FILTER</button>
                    </div>

                    <div className="divider"></div>

                    {/* Colors Filter */}
                    <h3 className="sidebar-title">Filter by Color</h3>
                    {colorsList.map((item, index) => (
                        <div className="filter-item" key={index}>
                            <div className="filter-left">
                                <div
                                    className={`color-dot-wrapper ${selectedColors.includes(item.name) ? 'active' : ''}`}
                                    onClick={() => handleColorToggle(item.name)}
                                >
                                    <div className="color-dot" style={{ backgroundColor: item.color }}></div>
                                </div>
                                <span
                                    className="filter-name"
                                    onClick={() => handleColorToggle(item.name)}
                                    style={{
                                        fontWeight: selectedColors.includes(item.name) ? '600' : '400',
                                        color: selectedColors.includes(item.name) ? '#111827' : ''
                                    }}
                                >
                                    {item.name}
                                </span>
                            </div>
                            <span className="count">({item.count})</span>
                        </div>
                    ))}

                    <div className="divider"></div>

                    {/* Sizes Filter */}
                    <h3 className="sidebar-title">Filter by Size</h3>
                    {sizesList.map((item, index) => (
                        <div className="filter-item" key={index}>
                            <div className="filter-left">
                                <input
                                    type="checkbox"
                                    id={`size-${item.size}`}
                                    className="custom-checkbox"
                                    checked={selectedSizes.includes(item.size)}
                                    onChange={() => handleSizeToggle(item.size)}
                                />
                                <label
                                    htmlFor={`size-${item.size}`}
                                    className="filter-name"
                                    style={{
                                        fontWeight: selectedSizes.includes(item.size) ? '600' : '400',
                                        color: selectedSizes.includes(item.size) ? '#111827' : ''
                                    }}
                                >
                                    {item.size}
                                </label>
                            </div>
                            <span className="count">({item.count})</span>
                        </div>
                    ))}

                    <div className="divider"></div>

                    {/* Brands Filter */}
                    <h3 className="sidebar-title">Brands</h3>
                    {brandsList.map((item, index) => (
                        <div className="filter-item" key={index}>
                            <div className="filter-left">
                                <input
                                    type="checkbox"
                                    id={`brand-${item.name}`}
                                    className="custom-checkbox"
                                    checked={selectedBrands.includes(item.name)}
                                    onChange={() => handleBrandChange(item.name)}
                                />
                                <label
                                    htmlFor={`brand-${item.name}`}
                                    className="filter-name"
                                    style={{
                                        fontWeight: selectedBrands.includes(item.name) ? '600' : '400',
                                        color: selectedBrands.includes(item.name) ? '#111827' : ''
                                    }}
                                >
                                    {item.name}
                                </label>
                            </div>
                            <span className="count">({item.count})</span>
                        </div>
                    ))}

                    {isFilterActive && (
                        <>
                            <div className="divider"></div>
                            <button className="reset-filters-btn" onClick={handleResetFilters}>
                                RESET FILTERS
                            </button>
                        </>
                    )}
                </div>

                {/* Main Content */}
                <div className="shope-main">
                    <div className="shope-topbar">
                        <div className="results-count">
                            Showing all {filteredProducts.length} results
                        </div>
                        <div className="topbar-actions">
                            <div className="view-icons">
                                <span>⊞</span>
                                <span>≡</span>
                            </div>
                            <select
                                className="sort-select"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option>Default sorting</option>
                                <option>Sort by price: low to high</option>
                                <option>Sort by price: high to low</option>
                                <option>Sort by rating</option>
                            </select>
                            <select
                                className="items-select"
                                value={itemsPerPage}
                                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                            >
                                <option value={12}>12 Items</option>
                                <option value={16}>16 Items</option>
                                <option value={24}>24 Items</option>
                            </select>
                        </div>
                    </div>

                    {filteredProducts.length === 0 ? (
                        <div className="no-results">
                            <h3>No products match the selected filters.</h3>
                            <button className="filter-btn" onClick={handleResetFilters}>
                                Clear Filters
                            </button>
                        </div>
                    ) : (
                        <div className="product-grid">
                            {filteredProducts.slice(0, itemsPerPage).map(product => (
                                <div className="product-card" key={product.id}>
                                    <div className="product-image-placeholder">
                                        <Link to="/product" state={{ product }} style={{ display: 'block', width: '100%', height: '100%' }}>
                                            <img src={product.image} alt={product.title} className="product-image" />
                                        </Link>
                                        {product.badge && <span className="product-badge">{product.badge}</span>}
                                    </div>
                                    <div className="product-info">
                                        <Link to="/product" state={{ product }} style={{ textDecoration: 'none', color: 'inherit' }}>
                                            <h4 className="product-title">{product.title}</h4>
                                        </Link>
                                        <div className="product-price">
                                            {product.priceDisplay ? (
                                                <span className="current-price">{product.priceDisplay}</span>
                                            ) : (
                                                <>
                                                    {product.oldPrice && <span className="old-price" style={{ marginRight: '8px' }}>${product.oldPrice.toFixed(2)}</span>}
                                                    <span className="current-price" style={{ fontSize: '14px' }}>${product.price.toFixed(2)}</span>
                                                </>
                                            )}
                                        </div>
                                        <div className="product-rating">
                                            <span className="stars">{renderStars(product.rating)}</span>
                                            <span className="rating-score">{product.rating.toFixed(2)} ({product.reviews})</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Jackets;