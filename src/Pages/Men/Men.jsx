import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import '../Shope/Shope.css';

// Import product images (using available assets)
import shopePhoto3 from '../../assets/shope-photo3.webp';
import shpePhoto5 from '../../assets/shpe-photo5.webp';
import photo2 from '../../assets/photo2.webp';
import photo3 from '../../assets/photo3.webp';
import photo4 from '../../assets/photo4.webp';

// 10 Men's Products to match the screenshot
const allProducts = [
    {
        id: 1,
        title: 'Alternative Culture graphic T-shirt',
        price: 18.99,
        priceDisplay: '$29.99 – $18.99',
        rating: 4.40,
        reviews: 5,
        badge: '',
        image: shopePhoto3,
        categories: ['Men', 'T-shirts'],
        colors: ['Black', 'Blue'],
        sizes: ['M', 'L'],
        brand: 'Calvin Klein'
    },
    {
        id: 2,
        title: 'Bermuda jogging shorts',
        price: 12.66,
        priceDisplay: '$24.40 – $12.66',
        rating: 4.00,
        reviews: 6,
        badge: '',
        image: shpePhoto5,
        categories: ['Men'],
        colors: ['Black', 'Gray'],
        sizes: ['S', 'M'],
        brand: 'lacoste'
    },
    {
        id: 3,
        title: 'Cargo jogger trousers',
        price: 49.99,
        priceDisplay: '$59.33 – $49.99',
        rating: 4.33,
        reviews: 3,
        badge: '',
        image: photo2,
        categories: ['Men'],
        colors: ['Brown', 'Green'],
        sizes: ['M', 'L', 'XL'],
        brand: 'Louis Vuitton'
    },
    {
        id: 4,
        title: 'Textured pink T-shirt',
        price: 24.50,
        oldPrice: 39.50,
        rating: 4.10,
        reviews: 2,
        badge: '38%',
        image: photo3,
        categories: ['Men', 'T-shirts'],
        colors: ['Red', 'Yellow'],
        sizes: ['XS', 'S'],
        brand: 'Sportempt'
    },
    {
        id: 5,
        title: 'Classic white T-shirt',
        price: 15.00,
        oldPrice: 32.00,
        rating: 3.80,
        reviews: 8,
        badge: '53%',
        image: photo4,
        categories: ['Men', 'T-shirts'],
        colors: ['Blue', 'Gray'],
        sizes: ['M', 'L', 'XL'],
        brand: 'Tomy Hilfiger'
    },
    {
        id: 6,
        title: 'Striped short-sleeve shirt',
        price: 35.99,
        oldPrice: 41.85,
        rating: 4.50,
        reviews: 4,
        badge: '14%',
        image: shopePhoto3,
        categories: ['Men', 'Tops'],
        colors: ['Black', 'Blue'],
        sizes: ['S', 'M'],
        brand: 'UCLA'
    },
    {
        id: 7,
        title: 'Denim jacket',
        price: 55.00,
        oldPrice: null,
        rating: 4.80,
        reviews: 12,
        badge: '',
        image: shpePhoto5,
        categories: ['Men', 'Jackets'],
        colors: ['Blue', 'Red'],
        sizes: ['XS', 'XL'],
        brand: 'Calvin Klein'
    },
    {
        id: 8,
        title: 'Casual zip hoodie',
        price: 42.00,
        oldPrice: 50.00,
        rating: 4.20,
        reviews: 7,
        badge: '16%',
        image: photo2,
        categories: ['Men', 'Jackets'],
        colors: ['Green', 'Yellow'],
        sizes: ['XS', 'S', 'L'],
        brand: 'lacoste'
    },
    {
        id: 9,
        title: 'Basic sweatpants',
        price: 28.50,
        oldPrice: null,
        rating: 4.00,
        reviews: 5,
        badge: '',
        image: photo3,
        categories: ['Men'],
        colors: ['Brown', 'Red'],
        sizes: ['M', 'L'],
        brand: 'Louis Vuitton'
    },
    {
        id: 10,
        title: 'Polo shirt',
        price: 22.00,
        oldPrice: null,
        rating: 4.60,
        reviews: 9,
        badge: '',
        image: photo4,
        categories: ['Men', 'T-shirts'],
        colors: ['Black', 'Blue'],
        sizes: ['XS', 'S', 'XL'],
        brand: 'Tomy Hilfiger'
    }
];

const colorsList = [
    { name: "Black", color: "#000", count: 3 },
    { name: "Blue", color: "#2874c7", count: 4 },
    { name: "Brown", color: "#c58a2c", count: 2 },
    { name: "Gray", color: "#8f8f8f", count: 2 },
    { name: "Green", color: "#7ed321", count: 2 },
    { name: "Red", color: "#ef4444", count: 3 },
    { name: "Yellow", color: "#facc15", count: 2 },
];

const sizesList = [
    { size: "XS", count: 3 },
    { size: "S", count: 3 },
    { size: "M", count: 3 },
    { size: "L", count: 3 },
    { size: "XL", count: 3 },
];

const brandsList = [
    { name: "Calvin Klein", count: 2 },
    { name: "lacoste", count: 2 },
    { name: "Louis Vuitton", count: 2 },
    { name: "Sportempt", count: 1 },
    { name: "Tomy Hilfiger", count: 2 },
    { name: "UCLA", count: 1 },
];

function Men() {
    // ─── Filter & Sort States ───────────────────────────────────────────────
    const [selectedCategories, setSelectedCategories] = useState(['Men']); // 'Men' is checked by default based on screenshot
    const [priceLimit, setPriceLimit] = useState(60);
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [sortBy, setSortBy] = useState('Default sorting');
    const [itemsPerPage, setItemsPerPage] = useState(12);

    // ─── Sidebar Data ───────────────────────────────────────────────────────
    const categories = ["Dresses", "Jackets", "Men", "T-shirts", "Tops", "Women"];

    // ─── Filter & Sort Logic ────────────────────────────────────────────────
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
        setSelectedCategories(['Men']);
        setPriceLimit(60);
        setSelectedColors([]);
        setSelectedSizes([]);
        setSelectedBrands([]);
    };

    const filteredProducts = useMemo(() => {
        let result = allProducts;

        // 1. Category filter
        if (selectedCategories.length > 0) {
            result = result.filter(p => p.categories.some(c => selectedCategories.includes(c)));
        }

        // 2. Price filter
        result = result.filter(p => p.price <= priceLimit);

        // 3. Color filter
        if (selectedColors.length > 0) {
            result = result.filter(p => p.colors.some(c => selectedColors.includes(c)));
        }

        // 4. Size filter
        if (selectedSizes.length > 0) {
            result = result.filter(p => p.sizes.some(s => selectedSizes.includes(s)));
        }

        // 5. Brand filter
        if (selectedBrands.length > 0) {
            result = result.filter(p => selectedBrands.includes(p.brand));
        }

        // 6. Sort
        if (sortBy === 'Sort by price: low to high') {
            result = [...result].sort((a, b) => a.price - b.price);
        } else if (sortBy === 'Sort by price: high to low') {
            result = [...result].sort((a, b) => b.price - a.price);
        } else if (sortBy === 'Sort by rating') {
            result = [...result].sort((a, b) => b.rating - a.rating);
        }

        return result;
    }, [selectedCategories, priceLimit, selectedColors, selectedSizes, selectedBrands, sortBy]);

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
        priceLimit !== 60;

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
                                <label htmlFor={`cat-${item}`} className="filter-name">{item}</label>
                            </div>
                            {(item === "Men" || item === "Women") && (
                                <span className="plus-icon">+</span>
                            )}
                        </div>
                    ))}

                    <div className="divider"></div>

                    {/* Price Filter */}
                    <h3 className="sidebar-title">Filter by price</h3>
                    <div className="price-range-slider" style={{ marginBottom: '15px' }}>
                        <input
                            type="range"
                            min="0"
                            max="60"
                            value={priceLimit}
                            className="range-slider"
                            onChange={(e) => setPriceLimit(Number(e.target.value))}
                        />
                    </div>
                    <div className="price-inputs" style={{ marginBottom: '15px' }}>
                        <input type="text" value="0" readOnly className="price-input" style={{ width: '80px' }} />
                        <span className="price-separator">-</span>
                        <input type="text" value={priceLimit} readOnly className="price-input" style={{ width: '80px' }} />
                    </div>
                    
                    <div className="price-footer">
                        <span>Price: $0 — ${priceLimit}</span>
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
                                        {/* No action buttons based on screenshot */}
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

export default Men;