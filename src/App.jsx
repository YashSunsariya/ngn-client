import React from 'react'
import Navbar from './assets/components/navbar/Navbar'
import Footer from './assets/components/footer/Footer'
import { Routes, Route, Outlet } from "react-router-dom";
import Home from './assets/components/pages/Home';
import Products from './assets/components/pages/Products';
import ProductDetail from './assets/components/pages/ProductDetail';
import Services from './assets/components/pages/Services';
import Brands from './assets/components/pages/Brands';
import About from './assets/components/pages/About';
import Blog from './assets/components/pages/Blog';
import Contact from './assets/components/pages/Contact';
import Projects from './assets/components/pages/Projects';
import Login from './assets/components/pages/Login';
import Register from './assets/components/pages/Register';
import Profile from './assets/components/pages/Profile';
import Cart from './assets/components/pages/Cart';
import Checkout from './assets/components/pages/Checkout';
import Wishlist from './assets/components/pages/Wishlist';
import NotFound from './assets/components/pages/NotFound';

const MainLayout = () => (
  <>
    <Navbar />
    <Outlet />
    <Footer />
  </>
)

const App = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/:id' element={<ProductDetail />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/wishlist' element={<Wishlist />} />
        <Route path='/services' element={<Services />} />
        <Route path='/projects' element={<Projects />} />
        <Route path='/brands' element={<Brands />} />
        <Route path='/about' element={<About />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/contact' element={<Contact />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
