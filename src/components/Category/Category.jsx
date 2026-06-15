import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import './Category.css';

import productVideo from '../../assets/product-video.mp4';
import photo2 from '../../assets/photo2.webp';
import photo3 from '../../assets/photo3.webp';
import photo4 from '../../assets/photo4.webp';
import shopPhoto1 from '../../assets/shop-photo1.webp';
import sahpePhoto2 from '../../assets/sahpe-photo2.webp';
import shopePhoto3 from '../../assets/shope-photo3.webp';
import shpePhoto5 from '../../assets/shpe-photo5.webp';

function Category() {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState('Dresses');

  const categoryProducts = {
    Dresses: [
      {
        id: "d1",
        title: "Asymmetric tulle midi dress",
        price: 2600,
        oldPrice: 5900,
        rating: 4.0,
        reviews: 2,
        badge: "40%",
        isVideo: true,
        video: productVideo,
        image: photo4 // Fallback image for wishlist page
      },
      {
        id: "d2",
        title: "Creased-effect midi dress",
        price: 3200,
        oldPrice: 5700,
        rating: 4.0,
        reviews: 3,
        badge: "15%",
        image: photo2
      },
      {
        id: "d3",
        title: "Draped strapless dress",
        price: 3800,
        oldPrice: 4700,
        rating: 3.33,
        reviews: 3,
        image: photo3
      },
      {
        id: "d4",
        title: "Floral crepe midi dress",
        price: 5300,
        oldPrice: 7800,
        rating: 4.67,
        reviews: 2,
        badge: "22%",
        image: photo4
      }
    ],
    Men: [
      {
        id: "m1",
        title: "Alternative Culture graphic T-shirt",
        price: 1800,
        oldPrice: 2900,
        rating: 4.4,
        reviews: 5,
        badge: "New",
        image: shopePhoto3
      },
      {
        id: "m2",
        title: "Basic cotton T-shirt",
        price: 2200,
        oldPrice: 3800,
        rating: 3.67,
        reviews: 6,
        image: shpePhoto5
      },
      {
        id: "m3",
        title: "100% linen bomber jacket",
        price: 3400,
        oldPrice: 4900,
        rating: 4.33,
        reviews: 6,
        image: sahpePhoto2
      },
      {
        id: "m4",
        title: "Men's 'Run & Brunch' hoodie",
        price: 5900,
        oldPrice: 7900,
        rating: 4.67,
        reviews: 3,
        badge: "28%",
        image: shopPhoto1
      }
    ],
    "T-shirts": [
      {
        id: "t1",
        title: "Alternative Culture graphic T-shirt",
        price: 1800,
        oldPrice: 2900,
        rating: 4.4,
        reviews: 5,
        image: shopePhoto3
      },
      {
        id: "t2",
        title: "Basic cotton T-shirt",
        price: 2200,
        oldPrice: 3800,
        rating: 3.67,
        reviews: 6,
        image: shpePhoto5
      },
      {
        id: "t3",
        title: "Hit Me Hard and Soft T-shirt",
        price: 12500,
        oldPrice: 15000,
        rating: 4.0,
        reviews: 2,
        badge: "Premium",
        image: photo2
      },
      {
        id: "t4",
        title: "Short sleeve graphic tee",
        price: 2500,
        oldPrice: 3500,
        rating: 4.2,
        reviews: 8,
        badge: "Hot",
        image: photo4
      }
    ],
    Women: [
      {
        id: "w1",
        title: "'Run & Brunch' hoodie",
        price: 5900,
        oldPrice: 7900,
        rating: 4.67,
        reviews: 3,
        badge: "28%",
        image: shopPhoto1
      },
      {
        id: "w2",
        title: "100% linen bomber jacket",
        price: 3400,
        oldPrice: 4900,
        rating: 4.33,
        reviews: 6,
        image: sahpePhoto2
      },
      {
        id: "w3",
        title: "Asymmetric tulle midi dress",
        price: 2600,
        oldPrice: 5900,
        rating: 4.0,
        reviews: 2,
        badge: "40%",
        isVideo: true,
        video: productVideo,
        image: photo4
      },
      {
        id: "w4",
        title: "Hit Me Hard and Soft T-shirt",
        price: 12500,
        oldPrice: 15000,
        rating: 4.0,
        reviews: 2,
        badge: "Premium",
        image: photo2
      }
    ]
  };

  const handleAddToCart = (product) => {
    addToCart({
      ...product,
      qty: 1
    });
  };

  const renderStars = (rating) => {
    const full = Math.floor(rating);
    let stars = '★'.repeat(full);
    if (rating % 1 >= 0.5) stars += '★';
    return stars.padEnd(5, '☆');
  };

  const currentProducts = categoryProducts[activeCategory] || [];

  return (
    <div className="category-container">
      <div className="slider cat-slider">
        <div className="slide-track">
          <div className="slide">
            REDEFINE YOUR SUMMER STYLE · CHOOSE
          </div>
          <div className="slide">
            REDEFINE YOUR SUMMER STYLE · CHOOSE
          </div>
        </div>
      </div>

      <section className="category-section">
        <div className="category-header">
          <h3>Redefine Your Wardrobe</h3>
          <ul className="category-filters">
            {Object.keys(categoryProducts).map((cat) => (
              <li
                key={cat}
                className={activeCategory === cat ? 'active' : ''}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </li>
            ))}
          </ul>
        </div>

        <div className="product-grid">
          <button className="nav-arrow left-arrow">&#10094;</button>

          {currentProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <div className="product-media">
                {product.badge && <span className="badge">{product.badge}</span>}
                <div className="media-actions">
                  <button 
                    className="action-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleWishlist(product);
                    }}
                    style={{ color: isInWishlist(product._id || product.id) ? '#f43f5e' : '' }}
                    title="Toggle Wishlist"
                  >
                    {isInWishlist(product._id || product.id) ? '♥' : '♡'}
                  </button>
                  <button className="action-btn" title="Quick View">👁</button>
                </div>
                <Link to="/product" state={{ product }} style={{ display: 'block', width: '100%', height: '100%' }}>
                  {product.isVideo ? (
                    <video src={product.video} autoPlay loop muted playsInline className="product-video" />
                  ) : (
                    <img src={product.image} alt={product.title} className="product-image" />
                  )}
                </Link>
                <button 
                  className="select-options-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleAddToCart(product);
                  }}
                >
                  ADD TO CART
                </button>
              </div>
              <div className="product-info">
                <Link to="/product" state={{ product }} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <h4 className="product-title">{product.title}</h4>
                </Link>
                <div className="product-price">
                  <span className="current-price">₹{product.price}</span>
                  {product.oldPrice && <span className="old-price">₹{product.oldPrice}</span>}
                </div>
                <div className="product-rating">
                  <span className="stars">{renderStars(product.rating)}</span>
                  <span className="rating-score">{product.rating.toFixed(2)} ({product.reviews})</span>
                </div>
              </div>
            </div>
          ))}

          <button className="nav-arrow right-arrow">&#10095;</button>
        </div>

        <div className="pagination-dots">
          <span className="dot active"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </section>
    </div>
  );
}

export default Category;
