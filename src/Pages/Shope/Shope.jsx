import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../services/api';
import { useWishlist } from '../../context/WishlistContext';
import './Shope.css';

// Import product images
import shopPhoto1 from '../../assets/shop-photo1.webp';
import sahpePhoto2 from '../../assets/sahpe-photo2.webp';
import shopePhoto3 from '../../assets/shope-photo3.webp';
import shpePhoto4 from '../../assets/shpe-photo4.webp';
import shpePhoto5 from '../../assets/shpe-photo5.webp';
import photo2 from '../../assets/photo2.webp';
import photo3 from '../../assets/photo3.webp';
import photo4 from '../../assets/photo4.webp';

// ─── Base Catalog (6 items from the screenshot) ────────────────────────
const baseProducts = [
    {
        id: 1,
        title: "'Run & Brunch' hoodie",
        price: 59.99,
        oldPrice: 79.99,
        rating: 4.67,
        reviews: 3,
        badge: '28%',
        image: shopPhoto1,
        categories: ['Women', 'Tops'],
        colors: ['Gray'],
        sizes: ['S', 'M'],
        brand: 'Sportempt'
    },
    {
        id: 2,
        title: '100% linen bomber jacket',
        price: 34.76,
        maxPrice: 49.66,
        priceDisplay: '$34.76 – $49.66',
        rating: 4.33,
        reviews: 6,
        badge: '',
        image: sahpePhoto2,
        categories: ['Women', 'Jackets'],
        colors: ['Gray', 'White'],
        sizes: ['M', 'L'],
        brand: 'Sportempt'
    },
    {
        id: 3,
        title: 'Alternative Culture graphic T-shirt',
        price: 18.99,
        maxPrice: 29.99,
        priceDisplay: '$29.99 – $18.99', // Matches screenshot display
        rating: 4.40,
        reviews: 5,
        badge: '',
        image: shopePhoto3,
        categories: ['Men', 'T-shirts'],
        colors: ['White', 'Black'],
        sizes: ['S', 'M', 'L'],
        brand: 'Calvin Klein'
    },
    {
        id: 4,
        title: 'Asymmetric tulle midi dress',
        price: 36.16,
        oldPrice: 59.99,
        rating: 4.0,
        reviews: 2,
        badge: '40%',
        image: shpePhoto4,
        categories: ['Women', 'Dresses'],
        colors: ['Green'],
        sizes: ['S', 'M'],
        brand: 'Sportempt'
    },
    {
        id: 5,
        title: 'Basic cotton T-shirt',
        price: 22.55,
        oldPrice: 38.13,
        rating: 3.67,
        reviews: 6,
        badge: '',
        image: shpePhoto5,
        categories: ['Men', 'T-shirts'],
        colors: ['White'],
        sizes: ['M', 'L', 'XL'],
        brand: 'Calvin Klein'
    },
    {
        id: 6,
        title: 'Hit Me Hard and Soft T-shirt',
        price: 125.99,
        oldPrice: null,
        rating: 4.0,
        reviews: 2,
        badge: '',
        image: photo2,
        categories: ['Women', 'T-shirts'],
        colors: ['Black'],
        sizes: ['XS', 'S'],
        brand: 'UCLA'
    }
];

// ─── Generate remaining 52 products to meet target counts perfectly ───
// Targets:
// Colors: Black: 12, Blue: 7, Brown: 6, Gray: 9, Green: 8, Red: 10, Yellow: 9.
// Sizes: XS: 14, S: 13, M: 13, L: 13, XL: 14.
// Brands: Calvin Klein: 12, lacoste: 6, Louis Vuitton: 10, Sportempt: 11, Tomy Hilfiger: 8, UCLA: 10.

const colorsToDistribute = [
    ...Array(10).fill('Black'),
    ...Array(7).fill('Blue'),
    ...Array(6).fill('Brown'),
    ...Array(7).fill('Gray'),
    ...Array(7).fill('Green'),
    ...Array(10).fill('Red'),
    ...Array(9).fill('Yellow')
]; // Length 56

const sizesToDistribute = [
    ...Array(13).fill('XS'),
    ...Array(9).fill('S'),
    ...Array(9).fill('M'),
    ...Array(10).fill('L'),
    ...Array(13).fill('XL')
]; // Length 54

const brandsToDistribute = [
    ...Array(10).fill('Calvin Klein'),
    ...Array(6).fill('lacoste'),
    ...Array(10).fill('Louis Vuitton'),
    ...Array(8).fill('Sportempt'),
    ...Array(8).fill('Tomy Hilfiger'),
    ...Array(9).fill('UCLA')
]; // Length 51

const generatedProducts = [];
const images = [shopPhoto1, sahpePhoto2, shopePhoto3, shpePhoto4, shpePhoto5, photo2, photo3, photo4];
const categoryList = ['Dresses', 'Jackets', 'Men', 'T-shirts', 'Tops', 'Women'];

for (let i = 0; i < 52; i++) {
    const prodId = 7 + i;

    // Distribute colors (assign 2 colors to first 4 products to consume all 56)
    const prodColors = [];
    if (i < colorsToDistribute.length) {
        prodColors.push(colorsToDistribute[i]);
    }
    if (i < 4 && (52 + i) < colorsToDistribute.length) {
        prodColors.push(colorsToDistribute[52 + i]);
    }
    if (prodColors.length === 0) {
        prodColors.push('Black');
    }

    // Distribute sizes (assign 2 sizes to first 2 products to consume all 54)
    const prodSizes = [];
    if (i < sizesToDistribute.length) {
        prodSizes.push(sizesToDistribute[i]);
    }
    if (i < 2 && (52 + i) < sizesToDistribute.length) {
        prodSizes.push(sizesToDistribute[52 + i]);
    }
    if (prodSizes.length === 0) {
        prodSizes.push('M');
    }

    // Distribute brand (1 item will have null brand to make sum 57 out of 58 items)
    const prodBrand = i < brandsToDistribute.length ? brandsToDistribute[i] : null;

    // Distribute category
    const mainCat = categoryList[i % categoryList.length];
    const prodCategories = [mainCat];
    if (mainCat === 'Men' || mainCat === 'Women') {
        prodCategories.push(i % 2 === 0 ? 'T-shirts' : 'Jackets');
    }

    // Price, Rating & Reviews
    const priceVal = parseFloat((15 + (i * 2.3) % 130).toFixed(2));
    const ratingVal = parseFloat((3.5 + (i * 0.15) % 1.5).toFixed(2));
    const reviewsCount = Math.floor(5 + (i * 3) % 20);

    generatedProducts.push({
        id: prodId,
        title: `Casual ${mainCat} style ${prodId}`,
        price: priceVal,
        oldPrice: i % 5 === 0 ? parseFloat((priceVal * 1.3).toFixed(2)) : null,
        rating: ratingVal,
        reviews: reviewsCount,
        badge: i % 7 === 0 ? `${Math.floor(15 + (i * 3) % 30)}%` : '',
        image: images[i % images.length],
        categories: prodCategories,
        colors: prodColors,
        sizes: prodSizes,
        brand: prodBrand
    });
}

const allProducts = [...baseProducts, ...generatedProducts];

// ─── Filter Calculations for Sidebar ───────────────────────────────────
const colorsList = [
    { name: "Black", color: "#000", count: allProducts.filter(p => p.colors.includes("Black")).length },
    { name: "Blue", color: "#2874c7", count: allProducts.filter(p => p.colors.includes("Blue")).length },
    { name: "Brown", color: "#c58a2c", count: allProducts.filter(p => p.colors.includes("Brown")).length },
    { name: "Gray", color: "#8f8f8f", count: allProducts.filter(p => p.colors.includes("Gray")).length },
    { name: "Green", color: "#7ed321", count: allProducts.filter(p => p.colors.includes("Green")).length },
    { name: "Red", color: "#ef4444", count: allProducts.filter(p => p.colors.includes("Red")).length },
    { name: "Yellow", color: "#facc15", count: allProducts.filter(p => p.colors.includes("Yellow")).length },
];

const sizesList = [
    { size: "XS", count: allProducts.filter(p => p.sizes.includes("XS")).length },
    { size: "S", count: allProducts.filter(p => p.sizes.includes("S")).length },
    { size: "M", count: allProducts.filter(p => p.sizes.includes("M")).length },
    { size: "L", count: allProducts.filter(p => p.sizes.includes("L")).length },
    { size: "XL", count: allProducts.filter(p => p.sizes.includes("XL")).length },
];

const brandsList = [
    { name: "Calvin Klein", count: allProducts.filter(p => p.brand === "Calvin Klein").length },
    { name: "lacoste", count: allProducts.filter(p => p.brand === "lacoste").length },
    { name: "Louis Vuitton", count: allProducts.filter(p => p.brand === "Louis Vuitton").length },
    { name: "Sportempt", count: allProducts.filter(p => p.brand === "Sportempt").length },
    { name: "Tomy Hilfiger", count: allProducts.filter(p => p.brand === "Tomy Hilfiger").length },
    { name: "UCLA", count: allProducts.filter(p => p.brand === "UCLA").length },
];

function Shope() {
    const { toggleWishlist, isInWishlist } = useWishlist();
    const [dbProducts, setDbProducts] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [priceLimit, setPriceLimit] = useState(150);
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [sortBy, setSortBy] = useState('Default sorting');
    const [itemsPerPage, setItemsPerPage] = useState(12);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const res = await API.get('/products');
                const formattedDb = res.data.map(p => ({
                    id: p._id || Math.random().toString(),
                    _id: p._id,
                    title: p.title || p.name,
                    price: Number(p.price),
                    rating: p.rating || 4.5,
                    reviews: p.reviews || 0,
                    badge: p.badge || '',
                    image: p.image || 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500',
                    categories: Array.isArray(p.categories) ? p.categories : [p.category || 'Men'],
                    colors: p.colors || ['Black'],
                    sizes: p.sizes || ['M'],
                    brand: p.brand || 'Calvin Klein'
                }));
                setDbProducts(formattedDb);
            } catch (err) {
                console.error('Failed to load products:', err);
            }
        };
        loadProducts();
    }, []);

    const combinedProducts = useMemo(() => [...dbProducts, ...allProducts], [dbProducts]);

    const maxPricePossible = useMemo(() => {
        if (combinedProducts.length === 0) return 150;
        return Math.ceil(Math.max(...combinedProducts.map(p => p.price || 0), 150));
    }, [combinedProducts]);

    useEffect(() => { setPriceLimit(maxPricePossible); }, [maxPricePossible]);

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
        setSelectedCategories([]);
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
                                    checked={selectedCategories.includes(item)}
                                    onChange={() => handleCategoryChange(item)}
                                />
                                <label 
                                    htmlFor={item} 
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
                                    id={item.size} 
                                    className="custom-checkbox"
                                    checked={selectedSizes.includes(item.size)}
                                    onChange={() => handleSizeToggle(item.size)}
                                />
                                <label 
                                    htmlFor={item.size} 
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
                            Showing 1–{Math.min(filteredProducts.length, itemsPerPage)} of {filteredProducts.length} results
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
                                        <div className="product-actions">
                                            <button 
                                                className="action-btn" 
                                                onClick={() => toggleWishlist(product)}
                                                style={{ color: isInWishlist(product._id || product.id) ? '#f43f5e' : '' }}
                                            >
                                                {isInWishlist(product._id || product.id) ? '♥' : '♡'}
                                            </button>
                                            <button className="action-btn">👁</button>
                                        </div>
                                        <button className="select-options-btn">SELECT OPTIONS</button>
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
                                                    <span className="current-price">${product.price.toFixed(2)}</span>
                                                    {product.oldPrice && <span className="old-price">${product.oldPrice.toFixed(2)}</span>}
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

export default Shope;