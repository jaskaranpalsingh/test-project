import { useState } from 'react'
import './Jackets.css'
function Jackets() {


    const [price, setPrice] = useState(2500)

    const categories = [
        "Dresses",
        "Jackets",
        "Men",
        "T-shirts",
        "Tops",
        "Women",
    ]

    const colors = [
        { name: "Black", color: "#000", count: 2 },
        { name: "Blue", color: "#2874c7", count: 1 },
        { name: "Brown", color: "#c58a2c", count: 2 },
        { name: "Gray", color: "#8f8f8f", count: 1 },
        { name: "Green", color: "#7ed321", count: 2 },
        { name: "Red", color: "#ef4444", count: 4 },
        { name: "Yellow", color: "#facc15", count: 4 },
    ]

    const sizes = [
        { size: "XS", count: 4 },
        { size: "S", count: 3 },
        { size: "M", count: 3 },
        { size: "L", count: 3 },
        { size: "XL", count: 4 },
    ]

    const brands = [
        { name: "Calvin Klein", count: 3 },
        { name: "Lacoste", count: 1 },
        { name: "Louis Vuitton", count: 2 },
    ]

    return (
        <div className="dress-page">

            <div className="filter-sidebar">

                {/* Categories */}

                <h3 className="sidebar-title">
                    Product Categories
                </h3>

                {categories.map((item, index) => (
                    <div className="filter-item" key={index}>

                        <div className="filter-left">

                            <input
                                type="radio"
                                name="category"
                                id={item}
                                className="custom-radio"
                            />

                            <span className="filter-name">
                                {item}
                            </span>

                        </div>

                        {(item === "Men" || item === "Women") && (
                            <span className="plus-icon">
                                +
                            </span>
                        )}

                    </div>
                ))}

                {/* Price */}

                <div className="divider"></div>

                <h3 className="sidebar-title">
                    Price Filter
                </h3>

                <p className="selected-price">
                    ₹{price}
                </p>

                <input
                    type="range"
                    min="0"
                    max="5000"
                    value={price}
                    className="range-slider"
                    onChange={(e) => setPrice(e.target.value)}
                />

                <div className="price-range">
                    <span>₹0</span>
                    <span>₹5000</span>
                </div>

                {/* Colors */}

                <div className="divider"></div>

                <h3 className="sidebar-title">
                    Filter by Color
                </h3>

                {colors.map((item, index) => (
                    <div className="filter-item" key={index}>

                        <div className="filter-left">

                            <div
                                className="color-dot"
                                style={{ backgroundColor: item.color }}
                            ></div>

                            <span className="filter-name">
                                {item.name}
                            </span>

                        </div>

                        <span className="count">
                            ({item.count})
                        </span>

                    </div>
                ))}

                {/* Sizes */}

                <div className="divider"></div>

                <h3 className="sidebar-title">
                    Filter by Size
                </h3>

                {sizes.map((item, index) => (
                    <div className="filter-item" key={index}>

                        <div className="filter-left">

                            <input
                                type="radio"
                                name="size"
                                id={item.size}
                                className="custom-radio"
                            />

                            <span className="filter-name">
                                {item.size}
                            </span>

                        </div>

                        <span className="count">
                            ({item.count})
                        </span>

                    </div>
                ))}

                {/* Brands */}

                <div className="divider"></div>

                <h3 className="sidebar-title">
                    Brands
                </h3>

                {brands.map((item, index) => (
                    <div className="filter-item" key={index}>

                        <div className="filter-left">

                            <input type="checkbox" className="custom-checkbox" />

                            <span className="filter-name">
                                {item.name}
                            </span>

                        </div>

                        <span className="count">
                            ({item.count})
                        </span>

                    </div>
                ))}

            </div>

        </div>
    )
}

export default Jackets