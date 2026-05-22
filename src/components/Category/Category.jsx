import React from 'react';
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
              <span className="badge">40%</span>
              <video src={productVideo} autoPlay loop muted playsInline className="product-video" />
            </div>
            <div className="product-info">
              <h4 className="product-title">Asymmetric tulle midi dress</h4>
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
              <img src={photo2} alt="Creased-effect midi dress" className="product-image" />
              <button className="select-options-btn">SELECT OPTIONS</button>
            </div>
            <div className="product-info">
              <h4 className="product-title">Creased-effect midi dress</h4>
              <div className="product-price">
                <span className="current-price">$3200</span>
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
              <img src={photo3} alt="Draped strapless dress" className="product-image" />
            </div>
            <div className="product-info">
              <h4 className="product-title">Draped strapless dress</h4>
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
              <img src={photo4} alt="Floral crepe midi dress" className="product-image" />
            </div>
            <div className="product-info">
              <h4 className="product-title">Floral crepe midi dress</h4>
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
