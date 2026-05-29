import './App.css';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import { useEffect, useState } from "react";
import axios from "axios";

import { CartProvider } from './context/CartContext.jsx';

import Navbar from './components/Navbar/navbar.jsx';
import Hero from './components/Hero/Hero.jsx';
import Category from './components/Category/Category.jsx';
import Shope from './Pages/Shope/Shope.jsx';
import Dresses from './Pages/Dresses/Dresses.jsx';
import Jackets from './Pages/Jackets/Jackets.jsx';
import Tshirts from './Pages/Tshirts/Tshirts.jsx';
import Men from './Pages/Men/Men.jsx';
import Women from './Pages/Women/Women.jsx';
import Banner from './components/Banner/Banner.jsx';
import Footer from './components/Footer/Footer.jsx';
import Product from './Pages/Product/Product.jsx';
import CartSidebar from './components/CartSidebar/CartSidebar.jsx';

function App() {

  const [products, setProducts] = useState([]);

  useEffect(() => {

    axios
      .get("http://localhost:5000/api/products")
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  return (
    <CartProvider>

      <BrowserRouter>

        <Navbar />
        <CartSidebar />

        <Routes>

          <Route
            path="/"
            element={
              <>
                <Hero />
                <Category />

                {/* Backend Data Show */}
                <div className="backend-products">

                  <h1>Backend Products</h1>

                  {
                    products.map((item) => (
                      <div key={item.id}>

                        <h2>{item.name}</h2>

                        <p>₹ {item.price}</p>

                      </div>
                    ))
                  }

                </div>

                <Banner />
                <Footer />
              </>
            }
          />

          <Route path="/shope" element={<Shope />} />
          <Route path="/dresses" element={<Dresses />} />
          <Route path="/jackets" element={<Jackets />} />
          <Route path="/tshirts" element={<Tshirts />} />
          <Route path="/men" element={<Men />} />
          <Route path="/women" element={<Women />} />
          <Route path="/product" element={<Product />} />

        </Routes>

      </BrowserRouter>

    </CartProvider>
  );
}

export default App;