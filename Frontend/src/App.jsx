import { useEffect, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import HomePage from './Landing_Page/Home/HomePage'



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
    <div>
     <HomePage allProducts={products}/>
    </div>
  )
}

export default App
