import React from 'react'
import './HomePage.css'
import Hero from './Hero';
import Working from './Working';
import Secure from './Secure';
import FeaturedItems from './FeaturedItems';
import WhyChose from './WhyChoose';
import CallToAction from './CallToAction';
import RentOrList from './RentOrList';
import ServicesSection from '../../Pages/ServicesSection';


function HomePage({ allProducts, allServices }) {
    return ( 
        <>
          <Hero />
          {/* We pass the data into FeaturedItems so it can show the cards */}
          <FeaturedItems items={allProducts} />
         
          <ServicesSection 
            services={allServices.slice(0, 6)} 
            title="Featured Services"
            showButton={true} 
        />
        
          <WhyChose/>
          <Working />
          <Secure />
          <RentOrList/>
          <CallToAction/>
        </>
     );
}

export default HomePage;