import './App.css'

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

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
function App() {

  return (
    <BrowserRouter>

      <Navbar />

      <Routes>


        <Route path="/" element={
          <>
            <Hero />
            <Category />
            <Banner />
            <Footer />
          </>
        } />


        <Route path="/shope" element={<Shope />} />
        <Route path="/dresses" element={<Dresses />} />
        <Route path="/jackets" element={<Jackets />} />
        <Route path="/tshirts" element={<Tshirts />} />
        <Route path="/men" element={<Men />} />
        <Route path="/women" element={<Women />} />

      </Routes>

    </BrowserRouter>

  )
}

export default App