import './App.css';

import {
  BrowserRouter,
  Routes,
  Route,
  useLocation
} from "react-router-dom";

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
import Login from './Pages/Login/Login.jsx';
import ForgotPassword from './Pages/ForgotPassword/ForgotPassword.jsx';
import ResetPassword from './Pages/ResetPassword/ResetPassword.jsx';
import Checkout from './Pages/Checkout/Checkout.jsx';
import OrderConfirmation from './Pages/OrderConfirmation/OrderConfirmation.jsx';

function MainContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isForgotPage = location.pathname === "/forgot-password";
  const isResetPage = location.pathname.startsWith("/reset-password");

  const hideNav = isLoginPage || isForgotPage || isResetPage;

  return (
    <>
      {!hideNav && <Navbar />}
      {!hideNav && <CartSidebar />}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Category />
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
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation/:id" element={<OrderConfirmation />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <MainContent />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;