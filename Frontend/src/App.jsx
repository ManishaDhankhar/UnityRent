import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AOS from 'aos'
import 'aos/dist/aos.css'
import Navbar from './Landing_Page/Navbar'
import HomePage from './Landing_Page/Home/HomePage'
import IteamDetails from './Landing_Page/Home/IteamDetails';
import About from './ShowProduct/About';
import BookItem from './Landing_Page/Home/BookItem';
import Footer from './Landing_Page/Footer';

function App() {

  const [products, setProducts] = useState([]);
  AOS.init({duration:1000});
  useEffect(()=>{
    fetch("http://localhost:8080/api/products")
    .then((res)=>res.json())
    .then((data)=>{
      console.log("Check this in Console tab:", data);
       setProducts(data);
    })
    .catch((err)=>console.log(err));
  },[]);

  return (
    <Router>
      <div className="App">
        {/* If you have a Navbar, put it here so it shows on every page */}
        <Navbar></Navbar>
        
        <Routes>
          {/* 1. This is your HOME page (the default view) */}
          <Route path="/" element={<HomePage allProducts={products.slice(0,4)} />} />

          {/* 2. This is the ABOUT/ShowProduct page */}
          <Route path="/about" element={<About allProducts={products}/>} />

          {/* 3. Optional: Add more routes here later */}
          <Route path='/item/:id' element={<IteamDetails/>} />
          <Route path='/book/:id' element={<BookItem/>} />
        </Routes>

        {/* If you have a Footer, put it here */}
        <Footer></Footer>
      </div>
    </Router>
  )
}

export default App
