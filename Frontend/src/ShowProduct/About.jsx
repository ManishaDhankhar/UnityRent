import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import FeaturedItems from '../Landing_Page/Home/FeaturedItems';

const About = ({allProducts}) => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);




    return ( 
        <>
          {/* We pass the data into FeaturedItems so it can show the cards */}
          
          <FeaturedItems items={allProducts} />
        
        </>
     );



};

export default About;