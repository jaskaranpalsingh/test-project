import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../services/api';
import '../Shope/Shope.css';

// Import product images
import shpePhoto4 from '../../assets/shpe-photo4.webp';
import photo2 from '../../assets/photo2.webp';
import photo3 from '../../assets/photo3.webp';
import photo4 from '../../assets/photo4.webp';
import shopPhoto1 from '../../assets/shop-photo1.webp';
import sahpePhoto2 from '../../assets/sahpe-photo2.webp';
import shopePhoto3 from '../../assets/shope-photo3.webp';

// 16 Women's Products to match the screenshot
const allProducts = [
    {
        id: 1,
        title: 'Asymmetric tulle midi dress',
        price: 36.16,
        oldPrice: 50.00,
        rating: 4.00,
        reviews: 3,
        badge: '40%',
        image: shpePhoto4,
        categories: ['Women', 'Dresses'],
        colors: ['Green'],
        sizes: ['S', 'M'],
        brand: 'Sportempt'
    },
    {
        id: 2,
        title: 'Billie Eilish T-shirt',
        price: 18.13,
        priceDisplay: '$22.55 – $18.13',
        rating: 3.67,
        reviews: 6,
        badge: '',
        image: photo2,
        categories: ['Women', 'T-shirts'],
        colors: ['Black'],
        sizes: ['XS', 'M'],
        brand: 'UCLA'
    },
    {
        id: 3,
        title: 'Darted smart trousers',
        price: 41.99,
        priceDisplay: '$54.99 – $41.99',
        rating: 4.33,
        reviews: 6,
        badge: '',
        image: photo3,
        categories: ['Women'],
        colors: ['Brown'],
        sizes: ['M', 'L'],
        brand: 'Louis Vuitton'
    },
    {
        id: 4,
        title: 'Linen blend top',
        price: 28.50,
        oldPrice: 43.18,
        rating: 4.50,
        reviews: 4,
        badge: '34%',
        image: photo4,
        categories: ['Women', 'Tops'],
        colors: ['Brown', 'Red'],
        sizes: ['S', 'L'],
        brand: 'Calvin Klein'
    },
    {
        id: 5,
        title: 'Ruffled black blouse',
        price: 45.00,
        oldPrice: 68.18,
        rating: 4.10,
        reviews: 8,
        badge: '34%',
        image: shopPhoto1,
        categories: ['Women', 'Tops'],
        colors: ['Black', 'Yellow'],
        sizes: ['XS', 'XL'],
        brand: 'UCLA'
    },
    {
        id: 6,
        title: 'Yellow co-ord set',
        price: 55.99,
        priceDisplay: '$65.00 – $55.99',
        rating: 4.80,
        reviews: 12,
        badge: '',
        image: sahpePhoto2,
        categories: ['Women'],
        colors: ['Yellow', 'Red'],
        sizes: ['M', 'XL'],
        brand: 'Sportempt'
    },
    {
        id: 7,
        title: 'Floral summer dress',
        price: 65.00,
        oldPrice: 85.00,
        rating: 4.90,
        reviews: 15,
        badge: '23%',
        image: shopePhoto3,
        categories: ['Women', 'Dresses'],
        colors: ['Yellow', 'Red'],
        sizes: ['XS', 'S'],
        brand: 'Louis Vuitton'
    },
    {
        id: 8,
        title: 'Classic denim jacket',
        price: 78.50,
        oldPrice: 95.00,
        rating: 4.60,
        reviews: 20,
        badge: '17%',
        image: shpePhoto4,
        categories: ['Women', 'Jackets'],
        colors: ['Blue'],
        sizes: ['L', 'XL'],
        brand: 'Calvin Klein'
    },
    {
        id: 9,
        title: 'Ribbed knit sweater',
        price: 42.00,
        priceDisplay: '$55.00 – $42.00',
        rating: 4.20,
        reviews: 5,
        badge: '',
        image: photo2,
        categories: ['Women', 'Tops'],
        colors: ['Gray'],
        sizes: ['S', 'M'],
        brand: 'lacoste'
    },
    {
        id: 10,
        title: 'Cropped white T-shirt',
        price: 15.99,
        oldPrice: 22.99,
        rating: 4.00,
        reviews: 11,
        badge: '30%',
        image: photo3,
        categories: ['Women', 'T-shirts'],
        colors: ['Yellow'],
        sizes: ['XS', 'L'],
        brand: 'Sportempt'
    },
    {
        id: 11,
        title: 'High-waisted jeans',
        price: 58.00,
        oldPrice: 75.00,
        rating: 4.70,
        reviews: 18,
        badge: '22%',
        image: photo4,
        categories: ['Women'],
        colors: ['Blue', 'Black'],
        sizes: ['M', 'XL'],
        brand: 'Calvin Klein'
    },
    {
        id: 12,
        title: 'Oversized blazer',
        price: 89.99,
        priceDisplay: '$110.00 – $89.99',
        rating: 4.40,
        reviews: 7,
        badge: '',
        image: shopPhoto1,
        categories: ['Women', 'Jackets'],
        colors: ['Green'],
        sizes: ['S', 'M'],
        brand: 'Tomy Hilfiger'
    },
    {
        id: 13,
        title: 'V-neck slip dress',
        price: 49.50,
        oldPrice: null,
        rating: 4.30,
        reviews: 9,
        badge: '',
        image: sahpePhoto2,
        categories: ['Women', 'Dresses'],
        colors: ['Red'],
        sizes: ['L', 'XL'],
        brand: 'Sportempt'
    },
    {
        id: 14,
        title: 'Graphic print T-shirt',
        price: 20.00,
        oldPrice: 28.00,
        rating: 4.10,
        reviews: 14,
        badge: '28%',
        image: shopePhoto3,
        categories: ['Women', 'T-shirts'],
        colors: ['Red'],
        sizes: ['XS', 'S'],
        brand: 'UCLA'
    },
    {
        id: 15,
        title: 'Pleated midi skirt',
        price: 38.00,
        oldPrice: 55.00,
        rating: 4.50,
        reviews: 6,
        badge: '30%',
        image: shpePhoto4,
        categories: ['Women'],
        colors: ['Brown'],
        sizes: ['M', 'L'],
        brand: 'UCLA'
    },
    {
        id: 16,
        title: 'Faux leather jacket',
        price: 95.00,
        priceDisplay: '$130.00 – $95.00',
        rating: 4.80,
        reviews: 22,
        badge: '',
        image: photo2,
        categories: ['Women', 'Jackets'],
        colors: ['Black'],
        sizes: ['XS', 'XL'],
        brand: 'Louis Vuitton'
    }
];

const colorsList = [
    { name: "Black", color: "#000", count: 2 },
    { name: "Blue", color: "#2874c7", count: 1 },
    { name: "Brown", color: "#c58a2c", count: 2 },
    { name: "Gray", color: "#8f8f8f", count: 1 },
    { name: "Green", color: "#7ed321", count: 2 },
    { name: "Red", color: "#ef4444", count: 4 },
    { name: "Yellow", color: "#facc15", count: 4 },
];

const sizesList = [
    { size: "XS", count: 4 },
    { size: "S", count: 3 },
    { size: "M", count: 3 },
    { size: "L", count: 3 },
    { size: "XL", count: 4 },
];

const brandsList = [
    { name: "Calvin Klein", count: 3 },
    { name: "lacoste", count: 1 },
    { name: "Louis Vuitton", count: 2 },
    { name: "Sportempt", count: 4 },
    { name: "Tomy Hilfiger", count: 1 },
    { name: "UCLA", count: 4 },
];

const Women = () => {
    const [dbProducts, setDbProducts] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState(['Women']);
    const [priceLimit, setPriceLimit] = useState(130);
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [sortBy, setSortBy] = useState('Default sorting');
    const [itemsPerPage, setItemsPerPage] = useState(12);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const res = await API.get('/products');
                const womenDbProducts = res.data.filter(p =>
                    p.category === 'Women' ||
                    (Array.isArray(p.categories) && p.categories.includes('Women'))
                );
                const formattedDb = womenDbProducts.map(p => ({
                    id: p._id || Math.random().toString(),
                    _id: p._id,
                    title: p.title || p.name,
                    price: Number(p.price),
                    rating: p.rating || 4.5,
                    reviews: p.reviews || 0,
                    badge: p.badge || '',
                    image: p.image || 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=500',
                    categories: Array.isArray(p.categories) ? p.categories : [p.category || 'Women'],
                    colors: p.colors || ['Black'],
                    sizes: p.sizes || ['S', 'M'],
                    brand: p.brand || 'Calvin Klein'
                }));
                setDbProducts(formattedDb);
            } catch (err) {
                console.error('Failed to load products from API:', err);
            }
        };
        loadProducts();
    }, []);

    const combinedProducts = useMemo(() => {
        return [...dbProducts, ...allProducts];
    }, [dbProducts]);

    const maxPricePossible = useMemo(() => {
        if (combinedProducts.length === 0) return 130;
        const prices = combinedProducts.map(p => p.price || 0);
        return Math.ceil(Math.max(...prices, 130));
    }, [combinedProducts]);

    useEffect(() => {
        setPriceLimit(maxPricePossible);
    }, [maxPricePossible]);

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
        setSelectedCategories(['Women']);
        setPriceLimit(maxPricePossible);
        setSelectedColors([]);
        setSelectedSizes([]);
        setSelectedBrands([]);
    };

    const filteredProducts = useMemo(() => {
        let result = combinedProducts;

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
                            Showing 1 {currentItemsCount} of {filteredProducts.length} results
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

export default Women;