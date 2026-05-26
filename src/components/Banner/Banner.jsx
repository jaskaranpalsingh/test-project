import React from 'react'
import "./Banner.css"
import { Link } from "react-router-dom";

function Banner() {
    return (
        <div className='banner-main'>

            <Link to="/women" className='banner01'>
                <img src="/src/assets/banner-01.webp" alt="" />

                <div className='banner-text'>
                    <h2>WOMEN</h2>

                    <p>
                        Soft strength, refined details, and a confident
                        silhouette shaped for contemporary style.
                    </p>
                </div>
            </Link>


            <Link to="/men" className='banner02'>
                <img src="/src/assets/banner-02.webp" alt="" />

                <div className='banner-text'>
                    <h2>MEN</h2>

                    <p>
                        Clean structure, modern attitude, and effortless
                        pieces designed for everyday confidence.
                    </p>
                </div>
            </Link>

        </div>
    )
}

export default Banner