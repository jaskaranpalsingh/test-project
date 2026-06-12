import React from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import "./Wishlist.css";

function Wishlist() {
    const { wishlistItems, removeFromWishlist, loading } = useWishlist();
    const { addToCart } = useCart();

    const handleAddToCart = (product) => {
        addToCart({
            ...product,
            qty: 1
        });
    };

    if (loading) {
        return (
            <div className="wishlist-loading">
                <div className="loading-spinner"></div>
                <p>Loading your wishlist...</p>
            </div>
        );
    }

    return (
        <div className="wishlist-page">
            <div className="wishlist-header">
                <h1 className="wishlist-title">My Wishlist</h1>
                <p className="wishlist-subtitle">Keep track of the clothing items you love.</p>
                <div className="wishlist-underline"></div>
            </div>

            <div className="wishlist-container">
                {wishlistItems.length === 0 ? (
                    <div className="wishlist-empty-state">
                        <div className="empty-heart-icon">🤍</div>
                        <h2>Your wishlist is currently empty</h2>
                        <p>Explore our shop catalog to add items you like to your wishlist.</p>
                        <Link to="/shope" className="start-shopping-btn">
                            Go To Shop
                        </Link>
                    </div>
                ) : (
                    <div className="wishlist-grid">
                        {wishlistItems.map((product) => {
                            const productId = product._id || product.id;
                            return (
                                <div className="wishlist-card" key={productId}>
                                    <button 
                                        className="wishlist-remove-btn" 
                                        onClick={() => removeFromWishlist(productId)}
                                        title="Remove from wishlist"
                                    >
                                        ×
                                    </button>
                                    
                                    <div className="wishlist-image-container">
                                        <Link to="/product" state={{ product }}>
                                            <img 
                                                src={product.image} 
                                                alt={product.title} 
                                                className="wishlist-product-image" 
                                            />
                                        </Link>
                                        {product.badge && (
                                            <span className="wishlist-badge">{product.badge}</span>
                                        )}
                                    </div>

                                    <div className="wishlist-info">
                                        <Link to="/product" state={{ product }} className="wishlist-product-title-link">
                                            <h3 className="wishlist-product-title">{product.title}</h3>
                                        </Link>
                                        
                                        <div className="wishlist-price-row">
                                            {product.priceDisplay ? (
                                                <span className="wishlist-price">{product.priceDisplay}</span>
                                            ) : (
                                                <>
                                                    <span className="wishlist-price">${product.price.toFixed(2)}</span>
                                                    {product.oldPrice && (
                                                        <span className="wishlist-old-price">${product.oldPrice.toFixed(2)}</span>
                                                    )}
                                                </>
                                            )}
                                        </div>

                                        <div className="wishlist-stock-status">
                                            <span className="stock-dot"></span>
                                            <span className="stock-text">In Stock</span>
                                        </div>

                                        <button 
                                            className="wishlist-add-to-cart-btn"
                                            onClick={() => handleAddToCart(product)}
                                        >
                                            ADD TO CART
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Wishlist;
