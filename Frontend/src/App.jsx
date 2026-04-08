import { useCallback,useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AOS from 'aos'
import 'aos/dist/aos.css'
import Navbar from './Landing_Page/Navbar'
import HomePage from './Landing_Page/Home/HomePage'
import IteamDetails from './Landing_Page/Home/IteamDetails';
import ServicesPage from './Pages/ServicesPage';
import ServiceDetails from './Pages/ServiceDetails';
import AddProductForm from './AddNewProductUsingForm/ProductForm';
import UpdateProduct from './AddNewProductUsingForm/UpdateProductForm';
import BookService from './Pages/BookService';
import About from './ShowProduct/About';
import BookItem from './Landing_Page/Home/BookItem';
import Footer from './Landing_Page/Footer';

function App() {

  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);

  // Use useCallback to keep the function reference stable
  const fetchProducts = useCallback(() => {
    fetch("http://localhost:8080/api/products")
      .then((res) => res.json())
      .then((data) => {
        // Sort by newest first so your new product appears at the top
        const sortedData = Array.isArray(data) ? data.reverse() : data;
        setProducts(sortedData);
      })
      .catch((err) => console.log("Product Fetch Error:", err));
  }, []);

  const fetchServices = useCallback(() => {
    fetch("http://localhost:8080/services")
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => console.log("Service Fetch Error:", err));
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1000 });
    fetchProducts();
    fetchServices();
  }, [fetchProducts, fetchServices]);

  return (
    <Router>
      <div className="App">
        {/* If you have a Navbar, put it here so it shows on every page */}
        <Navbar refreshProducts={fetchProducts}></Navbar>
        
        <Routes>
          {/* 1. This is your HOME page (the default view) */}
          <Route path="/" element={<HomePage allProducts={products.slice(0,4)} allServices={services.slice(0,3)}/>} />

          <Route path="/add-product" element={<AddProductForm refreshProducts={fetchProducts} />} />
          <Route path="/edit-product/:id"  element={<UpdateProduct refreshProducts={fetchProducts} />} />

          {/* 2. This is the ABOUT/ShowProduct page */}
          <Route path="/about" element={<About allProducts={products}/>} />
          
          <Route path="/allservices" element={<ServicesPage allServices={services} />} />
          <Route path="/service/:id" element={<ServiceDetails allServices={services} />} />
          <Route path="/bookservice/:id" element={<BookService allServices={services} />} />
         
          {/* 3. Optional: Add more routes here later */}
          <Route path='/item/:id' element={<IteamDetails refreshProducts={fetchProducts}/>} />
          <Route path='/book/:id' element={<BookItem/>} />
        </Routes>

        {/* If you have a Footer, put it here */}
        <Footer></Footer>
      </div>
    </Router>
  )
}

export default App