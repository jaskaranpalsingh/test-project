import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Product.css';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

const API_BASE = 'http://localhost:5000/api';

function Product() {
    const location = useLocation();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();

    const productData = location.state?.product;

    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('M');
    const [quantity, setQuantity] = useState(1);

    // Reviews state
    const [reviews, setReviews] = useState([]);
    const [reviewStats, setReviewStats] = useState({
        averageRating: 0,
        totalReviews: 0,
        breakdown: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    });
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [reviewRating, setReviewRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [reviewTitle, setReviewTitle] = useState('');
    const [reviewComment, setReviewComment] = useState('');
    const [reviewSubmitting, setReviewSubmitting] = useState(false);
    const [reviewError, setReviewError] = useState('');
    const [reviewSuccess, setReviewSuccess] = useState('');
    const [visibleReviews, setVisibleReviews] = useState(5);
    const [deleteConfirm, setDeleteConfirm] = useState({ show: false, reviewId: null });

    // Check if user is logged in
    const userInfo = localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null;
    const token = userInfo?.token;
    const userName = userInfo?.name;
    const isLoggedIn = !!token;

    useEffect(() => {
        if (!productData) {
            // no product
        } else {
            if (productData.colors && productData.colors.length > 0) {
                setSelectedColor(productData.colors[0]);
            }
            if (productData.sizes && productData.sizes.length > 0) {
                setSelectedSize(productData.sizes[Math.floor(productData.sizes.length / 2)]);
            }
        }
    }, [productData, navigate]);

    // Fetch reviews when product changes
    useEffect(() => {
        if (productData && productData._id) {
            fetchReviews(productData._id);
        }
    }, [productData]);

    const fetchReviews = async (productId) => {
        try {
            const res = await fetch(`${API_BASE}/reviews/${productId}`);
            const data = await res.json();
            if (res.ok) {
                setReviews(data.reviews || []);
                setReviewStats({
                    averageRating: data.averageRating || 0,
                    totalReviews: data.totalReviews || 0,
                    breakdown: data.breakdown || { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
                });
            }
        } catch (err) {
            console.error('Error fetching reviews:', err);
        }
    };

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        setReviewError('');
        setReviewSuccess('');

        if (reviewRating === 0) {
            setReviewError('Please select a star rating');
            return;
        }
        if (!reviewComment.trim()) {
            setReviewError('Please write a comment');
            return;
        }

        setReviewSubmitting(true);

        try {
            const res = await fetch(`${API_BASE}/reviews/${productData._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    rating: reviewRating,
                    title: reviewTitle,
                    comment: reviewComment,
                }),
            });

            const data = await res.json();

            if (res.ok) {
                setReviewSuccess('Review submitted successfully!');
                setReviewRating(0);
                setReviewTitle('');
                setReviewComment('');
                setShowReviewForm(false);
                // Refresh reviews
                fetchReviews(productData._id);
            } else {
                setReviewError(data.message || 'Failed to submit review');
            }
        } catch (err) {
            setReviewError('Network error. Please try again.');
        } finally {
            setReviewSubmitting(false);
        }
    };

    const confirmDeleteReview = (reviewId) => {
        setDeleteConfirm({ show: true, reviewId });
    };

    const handleDeleteReview = async () => {
        const reviewId = deleteConfirm.reviewId;
        setDeleteConfirm({ show: false, reviewId: null });

        try {
            const res = await fetch(`${API_BASE}/reviews/${reviewId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.ok) {
                fetchReviews(productData._id);
            }
        } catch (err) {
            console.error('Error deleting review:', err);
        }
    };

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

    const renderInteractiveStars = () => {
        return (
            <div className="interactive-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                    <span
                        key={star}
                        className={`interactive-star ${star <= (hoverRating || reviewRating) ? 'filled' : ''}`}
                        onClick={() => setReviewRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                    >
                        ★
                    </span>
                ))}
                <span className="rating-label">
                    {hoverRating || reviewRating
                        ? ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][hoverRating || reviewRating]
                        : 'Select rating'}
                </span>
            </div>
        );
    };

    const getInitials = (name) => {
        if (!name) return '?';
        return name
            .split(' ')
            .map((w) => w[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const getAvatarColor = (name) => {
        const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f97316', '#eab308', '#22c55e', '#14b8a6', '#06b6d4', '#3b82f6'];
        if (!name) return colors[0];
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        return colors[Math.abs(hash) % colors.length];
    };

    const formatDate = (dateStr) => {
        const d = new Date(dateStr);
        return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
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
                            <button className="text-action-btn" onClick={() => toggleWishlist(productData)}>
                                {isInWishlist(productData._id || productData.id) ? (
                                    <span style={{ color: '#f43f5e', fontWeight: 'bold' }}>♥ In wishlist</span>
                                ) : (
                                    <span>♡ Add to wishlist</span>
                                )}
                            </button>
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

            {/* ========== REVIEWS SECTION ========== */}
            {productData._id && (
                <div className="reviews-section">
                    <div className="reviews-header">
                        <h2 className="reviews-title">Customer Reviews</h2>
                        <div className="reviews-title-underline"></div>
                    </div>

                    {/* Rating Summary */}
                    <div className="rating-summary">
                        <div className="rating-summary-left">
                            <div className="big-rating">{reviewStats.averageRating.toFixed(1)}</div>
                            <div className="big-stars">{renderStars(reviewStats.averageRating)}</div>
                            <p className="total-reviews-label">Based on {reviewStats.totalReviews} review{reviewStats.totalReviews !== 1 ? 's' : ''}</p>
                        </div>
                        <div className="rating-summary-right">
                            {[5, 4, 3, 2, 1].map((star) => {
                                const count = reviewStats.breakdown[star] || 0;
                                const pct = reviewStats.totalReviews > 0 ? (count / reviewStats.totalReviews) * 100 : 0;
                                return (
                                    <div className="breakdown-row" key={star}>
                                        <span className="breakdown-label">{star} ★</span>
                                        <div className="breakdown-bar-track">
                                            <div
                                                className="breakdown-bar-fill"
                                                style={{ width: `${pct}%` }}
                                            ></div>
                                        </div>
                                        <span className="breakdown-count">{count}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Write a Review */}
                    <div className="write-review-area">
                        {!isLoggedIn ? (
                            <div className="login-to-review">
                                <p>Want to share your experience?</p>
                                <button className="login-review-btn" onClick={() => navigate('/login')}>
                                    Login to Write a Review
                                </button>
                            </div>
                        ) : !showReviewForm ? (
                            <button className="write-review-btn" onClick={() => setShowReviewForm(true)}>
                                ✍️ Write a Review
                            </button>
                        ) : (
                            <form className="review-form" onSubmit={handleSubmitReview}>
                                <h3 className="form-heading">Share Your Experience</h3>

                                {reviewError && <div className="review-alert review-alert-error">{reviewError}</div>}
                                {reviewSuccess && <div className="review-alert review-alert-success">{reviewSuccess}</div>}

                                <div className="form-group">
                                    <label>Your Rating</label>
                                    {renderInteractiveStars()}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="review-title">Title <span className="optional-label">(optional)</span></label>
                                    <input
                                        id="review-title"
                                        type="text"
                                        placeholder="Summarize your experience..."
                                        value={reviewTitle}
                                        onChange={(e) => setReviewTitle(e.target.value)}
                                        maxLength={100}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="review-comment">Your Review</label>
                                    <textarea
                                        id="review-comment"
                                        placeholder="What did you like or dislike about this product?"
                                        value={reviewComment}
                                        onChange={(e) => setReviewComment(e.target.value)}
                                        rows={4}
                                        maxLength={1000}
                                        required
                                    ></textarea>
                                    <span className="char-count">{reviewComment.length}/1000</span>
                                </div>

                                <div className="form-actions">
                                    <button type="submit" className="submit-review-btn" disabled={reviewSubmitting}>
                                        {reviewSubmitting ? 'Submitting...' : 'Submit Review'}
                                    </button>
                                    <button
                                        type="button"
                                        className="cancel-review-btn"
                                        onClick={() => {
                                            setShowReviewForm(false);
                                            setReviewError('');
                                            setReviewSuccess('');
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>

                    {/* Review success toast */}
                    {reviewSuccess && !showReviewForm && (
                        <div className="review-toast-success">✅ {reviewSuccess}</div>
                    )}

                    {/* Review List */}
                    <div className="reviews-list">
                        {reviews.length === 0 ? (
                            <div className="no-reviews">
                                <div className="no-reviews-icon">💬</div>
                                <h3>No reviews yet</h3>
                                <p>Be the first to share your thoughts about this product!</p>
                            </div>
                        ) : (
                            <>
                                {reviews.slice(0, visibleReviews).map((review) => (
                                    <div className="review-card" key={review._id}>
                                        <div className="review-card-header">
                                            <div
                                                className="review-avatar"
                                                style={{ backgroundColor: getAvatarColor(review.user?.name) }}
                                            >
                                                {getInitials(review.user?.name)}
                                            </div>
                                            <div className="review-meta">
                                                <span className="review-author">{review.user?.name || 'Anonymous'}</span>
                                                <span className="review-date">{formatDate(review.createdAt)}</span>
                                            </div>
                                            <div className="review-rating-badge">
                                                <span className="review-stars-small">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span>
                                            </div>
                                        </div>

                                        {review.title && <h4 className="review-card-title">{review.title}</h4>}
                                        <p className="review-card-comment">{review.comment}</p>

                                        {/* Show delete button if this is the user's own review */}
                                        {isLoggedIn && review.user?.name === userName && (
                                            <button
                                                className="delete-own-review-btn"
                                                onClick={() => confirmDeleteReview(review._id)}
                                            >
                                                🗑️ Delete my review
                                            </button>
                                        )}
                                    </div>
                                ))}

                                {reviews.length > visibleReviews && (
                                    <button
                                        className="show-more-reviews-btn"
                                        onClick={() => setVisibleReviews(prev => prev + 5)}
                                    >
                                        Show More Reviews ({reviews.length - visibleReviews} remaining)
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* Custom Delete Confirmation Modal */}
            {deleteConfirm.show && (
                <div className="confirm-modal-overlay" onClick={() => setDeleteConfirm({ show: false, reviewId: null })}>
                    <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="confirm-modal-icon">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"/>
                                <line x1="12" y1="8" x2="12" y2="12"/>
                                <line x1="12" y1="16" x2="12.01" y2="16"/>
                            </svg>
                        </div>
                        <h3 className="confirm-modal-title">Delete Review</h3>
                        <p className="confirm-modal-text">Are you sure you want to delete your review? This action cannot be undone.</p>
                        <div className="confirm-modal-actions">
                            <button className="confirm-modal-cancel" onClick={() => setDeleteConfirm({ show: false, reviewId: null })}>
                                Cancel
                            </button>
                            <button className="confirm-modal-delete" onClick={handleDeleteReview}>
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Product;