import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import API from '../../services/api'
import './Tshirts.css'

function Tshirts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [price, setPrice] = useState(100);

    const categories = ["Dresses", "Jackets", "Men", "T-shirts", "Tops", "Women"];
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
        { size: "XS", count: 4 }, { size: "S", count: 3 },
        { size: "M", count: 3 }, { size: "L", count: 3 }, { size: "XL", count: 4 },
    ];
    const brands = [
        { name: "Calvin Klein", count: 3 },
        { name: "Lacoste", count: 1 },
        { name: "Louis Vuitton", count: 2 },
    ];

    const renderStars = (rating) => {
        return '★★★★★'.split('').map((star, i) => (
            <span key={i} style={{ color: i < Math.round(rating) ? '#fbbf24' : '#e5e7eb' }}>★</span>
        ));
    };

    useEffect(() => {
        const load = async () => {
            try {
                const res = await API.get('/products');
                const tshirtProducts = res.data.filter(p =>
                    p.category === 'T-shirts' ||
                    (Array.isArray(p.categories) && p.categories.includes('T-shirts'))
                );
                setProducts(tshirtProducts.map(p => ({
                    id: p._id,
                    title: p.title || p.name,
                    price: Number(p.price),
                    oldPrice: null,
                    rating: p.rating || 4.5,
                    reviews: p.reviews || 0,
                    badge: '',
                    image: p.image || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
                })));
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    return (
        <div className="dress-page">
            <div className="filter-sidebar">
                <h3 className="sidebar-title">Product Categories</h3>
                {categories.map((item, index) => (
                    <div className="filter-item" key={index}>
                        <div className="filter-left">
                            <input type="radio" name="category" id={item} className="custom-radio" defaultChecked={item === "T-shirts"} />
                            <span className="filter-name">{item}</span>
                        </div>
                        {(item === "Men" || item === "Women") && <span className="plus-icon">+</span>}
                    </div>
                ))}

                <div className="divider"></div>
                <h3 className="sidebar-title">Price Filter</h3>
                <p className="selected-price">${price}</p>
                <input type="range" min="0" max="300" value={price} className="range-slider" onChange={(e) => setPrice(Number(e.target.value))} />
                <div className="price-range"><span>$0</span><span>${price}</span></div>

                <div className="divider"></div>
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
                <h3 className="sidebar-title">Filter by Size</h3>
                {sizes.map((item, index) => (
                    <div className="filter-item" key={index}>
                        <div className="filter-left">
                            <input type="radio" name="size" id={item.size} className="custom-radio" />
                            <span className="filter-name">{item.size}</span>
                        </div>
                        <span className="count">({item.count})</span>
                    </div>
                ))}

                <div className="divider"></div>
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

            {/* Main product grid */}
            <div className="dresses-main" style={{ flex: 1 }}>
                {loading ? (
                    <p style={{ padding: '40px', color: '#6b7280' }}>Loading T-shirts...</p>
                ) : products.length === 0 ? (
                    <div style={{ padding: '60px', textAlign: 'center' }}>
                        <p style={{ fontSize: '3rem' }}>👕</p>
                        <p style={{ color: '#6b7280', marginTop: '12px' }}>No T-shirts added yet. Add one from the admin panel!</p>
                    </div>
                ) : (
                    <div className="product-grid-4">
                        {products.map(product => (
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
                )}
            </div>
        </div>
    );
}

export default Tshirts