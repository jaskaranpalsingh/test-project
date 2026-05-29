import { Link } from 'react-router-dom';
import './Category.css';

import productVideo from '../../assets/product-video.mp4';
import photo2 from '../../assets/photo2.webp';
import photo3 from '../../assets/photo3.webp';
import photo4 from '../../assets/photo4.webp';

function Category() {
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
            <li className="active">Dresses</li>
            <li>Men</li>
            <li>T-shirts</li>
            <li>Women</li>
          </ul>
        </div>

        <div className="product-grid">
          <button className="nav-arrow left-arrow">&#10094;</button>


          <div className="product-card">
            <div className="product-media">
              <Link to="/product" state={{ product: { title: "Asymmetric tulle midi dress", price: 2600, oldPrice: 5900, rating: 4, reviews: 2, badge: '40%', image: null /* video used here */ } }} style={{ display: 'block', width: '100%', height: '100%' }}>
                  <span className="badge">40%</span>
                  <video src={productVideo} autoPlay loop muted playsInline className="product-video" />
              </Link>
            </div>
            <div className="product-info">
              <Link to="/product" state={{ product: { title: "Asymmetric tulle midi dress", price: 2600, oldPrice: 5900, rating: 4, reviews: 2 } }} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <h4 className="product-title">Asymmetric tulle midi dress</h4>
              </Link>
              <div className="product-price">
                <span className="current-price">₹2600</span>
                <span className="old-price">₹5900</span>
              </div>
              <div className="product-rating">
                <span className="stars">★★★★★</span>
                <span className="rating-score">4.00 (2)</span>
              </div>
            </div>
          </div>


          <div className="product-card">
            <div className="product-media">
              <span className="badge">15%</span>
              <div className="media-actions">
                <button className="action-btn">♡</button>
                <button className="action-btn">👁</button>
              </div>
              <Link to="/product" state={{ product: { title: "Creased-effect midi dress", price: 3200, oldPrice: 5700, rating: 4, reviews: 3, image: photo2 } }} style={{ display: 'block', width: '100%', height: '100%' }}>
                  <img src={photo2} alt="Creased-effect midi dress" className="product-image" />
              </Link>
              <button className="select-options-btn">SELECT OPTIONS</button>
            </div>
            <div className="product-info">
              <Link to="/product" state={{ product: { title: "Creased-effect midi dress", price: 3200, oldPrice: 5700, rating: 4, reviews: 3, image: photo2 } }} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <h4 className="product-title">Creased-effect midi dress</h4>
              </Link>
              <div className="product-price">
                <span className="current-price">₹3200</span>
                <span className="old-price">₹5700</span>
              </div>
              <div className="product-rating">
                <span className="stars">★★★★☆</span>
                <span className="rating-score">4.00 (3)</span>
              </div>
            </div>
          </div>


          <div className="product-card">
            <div className="product-media">
              <Link to="/product" state={{ product: { title: "Draped strapless dress", price: 3800, oldPrice: 4700, rating: 3.33, reviews: 3, image: photo3 } }} style={{ display: 'block', width: '100%', height: '100%' }}>
                  <img src={photo3} alt="Draped strapless dress" className="product-image" />
              </Link>
            </div>
            <div className="product-info">
              <Link to="/product" state={{ product: { title: "Draped strapless dress", price: 3800, oldPrice: 4700, rating: 3.33, reviews: 3, image: photo3 } }} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <h4 className="product-title">Draped strapless dress</h4>
              </Link>
              <div className="product-price">
                <span className="current-price">₹3800</span>
                <span className="old-price">₹4700</span>
              </div>
              <div className="product-rating">
                <span className="stars">★★★☆☆</span>
                <span className="rating-score">3.33 (3)</span>
              </div>
            </div>
          </div>


          <div className="product-card">
            <div className="product-media">
              <span className="badge">22%</span>
              <Link to="/product" state={{ product: { title: "Floral crepe midi dress", price: 5300, oldPrice: 7800, rating: 4.67, reviews: 2, image: photo4 } }} style={{ display: 'block', width: '100%', height: '100%' }}>
                  <img src={photo4} alt="Floral crepe midi dress" className="product-image" />
              </Link>
            </div>
            <div className="product-info">
              <Link to="/product" state={{ product: { title: "Floral crepe midi dress", price: 5300, oldPrice: 7800, rating: 4.67, reviews: 2, image: photo4 } }} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <h4 className="product-title">Floral crepe midi dress</h4>
              </Link>
              <div className="product-price">
                <span className="current-price">₹5300</span>
                <span className="old-price">₹7800</span>
              </div>
              <div className="product-rating">
                <span className="stars">★★★★★</span>
                <span className="rating-score">4.67 (2)</span>
              </div>
            </div>
          </div>

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
