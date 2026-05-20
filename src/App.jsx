import './App.css'

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Navbar from './components/Navbar/navbar.jsx';
import Hero from './components/Hero/Hero.jsx';
import Category from './components/Category/Category.jsx';
import Dresses from './Pages/Dresses.jsx';
import Jackets from './Pages/Jackets.jsx';
import Tshirts from './Pages/Tshirts.jsx';
function App() {

  return (
    <BrowserRouter>
      <Category />
      <Navbar />

      <Routes>

        {/* Home Page */}
        <Route path="/" element={<Hero />} />

        {/* Dresses Page */}
        <Route path="/dresses" element={<Dresses />} />
        <Route path="/jackets" element={<Jackets />} />
        <Route path="/tshirts" element={<Tshirts />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App