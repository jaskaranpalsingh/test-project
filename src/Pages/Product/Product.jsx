import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Product.css';
import { useCart } from '../../context/CartContext';

function Product() {
    const location = useLocation();
    const navigate = useNavigate();
    const { addToCart } = useCart();


    const productData = location.state?.product;


    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('M');
    const [quantity, setQuantity] = useState(1);


    useEffect(() => {
        if (!productData) {

        } else {

            if (productData.colors && productData.colors.length > 0) {
                setSelectedColor(productData.colors[0]);
            }
            if (productData.sizes && productData.sizes.length > 0) {
                setSelectedSize(productData.sizes[Math.floor(productData.sizes.length / 2)]);
            }
        }
    }, [productData, navigate]);

    if (!productData) {
        return (
            <div className="product-not-found">
                <h2>Product not found</h2>
                <button onClick={() => navigate('/shope')} className="back-btn">Return to Shop</button>
            </div>
        );
    }

    const handleQuantityChange = (type) => {
        if (type === 'dec' && quantity > 1) setQuantity(prev => prev - 1);
        if (type === 'inc') setQuantity(prev => prev + 1);
    };

    const renderStars = (rating) => {
        const full = Math.floor(rating || 5);
        let stars = '★'.repeat(full);
        if (rating % 1 >= 0.5) stars += '★';
        return stars.padEnd(5, '☆');
    };


    const colorMap = {
        'Black': '#000',
        'Blue': '#2874c7',
        'Brown': '#c58a2c',
        'Gray': '#8f8f8f',
        'Green': '#7ed321',
        'Red': '#ef4444',
        'Yellow': '#facc15'
    };

    return (
        <div className="product-details-page">
            <div className="product-details-container">

                <div className="product-gallery">

                    <div className="gallery-item large-left">
                        <img src={productData.image} alt={productData.title} />
                    </div>
                    <div className="gallery-item top-right">
                        <img src={productData.image} alt={`${productData.title} view 2`} style={{ filter: 'brightness(0.95)' }} />
                    </div>
                    <div className="gallery-item bottom-left">
                        <img src={productData.image} alt={`${productData.title} view 3`} style={{ filter: 'contrast(1.1)' }} />
                    </div>
                </div>


                <div className="product-info-panel">
                    <div className="sticky-content">

                        <h1 className="product-title">{productData.title}</h1>

                        <div className="product-meta">
                            <div className="stars">
                                <span className="star-icons">{renderStars(productData.rating)}</span>
                                <span className="rating-score">{productData.rating?.toFixed(2)} ({productData.reviews})</span>
                            </div>
                            <span className="sku">SKU: ZU49VQR5</span>
                        </div>

                        <div className="divider"></div>

                        <p className="product-description">
                            Looks nice with shorts, leggings, sweat pants, skorts, sneakers, sports shoes to create a chic look for you
                        </p>

                        <div className="price-stock">
                            {productData.priceDisplay ? (
                                <h2 className="price-range">{productData.priceDisplay}</h2>
                            ) : (
                                <h2 className="price-range">
                                    {productData.oldPrice && <span className="old-price">${productData.oldPrice.toFixed(2)} </span>}
                                    ${productData.price.toFixed(2)}
                                </h2>
                            )}
                            <span className="stock-status">67 in stock</span>
                        </div>

                        {/* Color Selector */}
                        {productData.colors && productData.colors.length > 0 && (
                            <div className="selector-group">
                                <span className="selector-label">color: <strong>{selectedColor}</strong></span>
                                <div className="color-options">
                                    {productData.colors.map((color, idx) => (
                                        <div
                                            key={idx}
                                            className={`color-circle ${selectedColor === color ? 'selected' : ''}`}
                                            style={{ backgroundColor: colorMap[color] || color }}
                                            onClick={() => setSelectedColor(color)}
                                        ></div>
                                    ))}
                                    {/* Mock extra colors to match screenshot if needed */}
                                    <div className="color-circle" style={{ backgroundColor: '#c58a2c' }}></div>
                                    <div className="color-circle" style={{ backgroundColor: '#7ed321' }}></div>
                                    <div className="color-circle" style={{ backgroundColor: '#ef4444' }}></div>
                                    <div className="color-circle" style={{ backgroundColor: '#facc15' }}></div>
                                </div>
                            </div>
                        )}

                        {/* Size Selector */}
                        {productData.sizes && productData.sizes.length > 0 && (
                            <div className="selector-group">
                                <span className="selector-label">size: <strong>{selectedSize}</strong></span>
                                <div className="size-options">
                                    {['XS', 'S', 'M', 'L', 'XL'].map(size => {
                                        const isAvailable = productData.sizes.includes(size) || ['XS', 'S', 'M', 'L', 'XL'].includes(size); // Default all visible for demo
                                        return (
                                            <button
                                                key={size}
                                                className={`size-btn ${selectedSize === size ? 'selected' : ''} ${!isAvailable ? 'disabled' : ''}`}
                                                onClick={() => isAvailable && setSelectedSize(size)}
                                            >
                                                {size}
                                            </button>
                                        );
                                    })}
                                    <button className="clear-btn" onClick={() => setSelectedSize('')}>× Clear</button>
                                </div>
                            </div>
                        )}

                        {/* Final Price */}
                        <h2 className="final-price">${productData.price?.toFixed(2) || '22.55'}</h2>

                        {/* Add to Cart Group */}
                        <div className="add-to-cart-group">
                            <div className="quantity-selector">
                                <button onClick={() => handleQuantityChange('dec')}>−</button>
                                <span>{quantity}</span>
                                <button onClick={() => handleQuantityChange('inc')}>+</button>
                            </div>
                            <button className="add-cart-btn" onClick={() => {
                            addToCart({
                                ...productData,
                                qty: quantity
                            });
                        }}>ADD TO CART</button>
                        </div>

                        {/* Actions */}
                        <div className="product-actions-links">
                            <button className="text-action-btn">♡ Add to wishlist</button>
                            <button className="text-action-btn">⇋ Compare</button>
                        </div>

                        <div className="divider"></div>

                        {/* Shipping Info */}
                        <div className="shipping-info-box">
                            <div className="shipping-row">
                                <span className="icon">⏱</span>
                                <span><strong>Shipping within 3 days</strong> | Speedy and reliable parcel delivery!</span>
                            </div>
                        </div>

                        <div className="warranty-info-box">
                            <div className="warranty-row">
                                <strong>Dispatch within 24 Hours:</strong> Your product will be shipped quickly.
                            </div>
                            <div className="warranty-row">
                                <strong>3-Year Warranty:</strong> Nurtia is safe with warranty conditions.
                            </div>
                        </div>

                        {/* Social Share */}
                        <div className="social-share">
                            <span>Share:</span>

                            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon fb">
                                f
                            </a>

                            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-icon tw">
                                t
                            </a>

                            <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="social-icon pi">
                                p
                            </a>

                            <a href="https://wa.me/" target="_blank" rel="noreferrer" className="social-icon wa">
                                w
                            </a>

                            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon ig">
                                i
                            </a>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}

export default Product;