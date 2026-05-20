import React from "react";
import "./Hero.css"
import heroVideo from "../../assets/slider-video-01.mp4";

function Hero() {
    return (
        <section className="hero-section">
            <video className="hero-video" autoPlay muted loop>
                <source src={heroVideo} type="video/mp4" />
            </video>

            <div className="hero-overlay"></div>

            <div className="hero-content">
                <h3>Now Trending for Summer</h3>

                <a className="hero-img" href="#">
                    <img src="/src/assets/slider-logo.webp" alt="NURFIA" />
                </a>

                <p>Timeless silhouettes meet modern confidence. Clean lines, effortless elegance, and a<br />refined look designed for everyday sophistication.</p>

                <button className="hero-btn" onClick={() => { }}>
                    VIEW COLLECTION
                </button>
            </div>


        </section>
    );
}

export default Hero;