import React from 'react'
import './HomePage.css'
import Hero from './Hero';
import Working from './Working';
import Secure from './Secure';
import FeaturedItems from './FeaturedItems';
import ServiceCard from './ServiceCard';
import StartButton from './StartButton';
import WhyChose from './WhyChoose';
import CallToAction from './CallToAction';


function HomePage({ allProducts, allServices }) {
    return ( 
        <>
          <Hero />
          {/* We pass the data into FeaturedItems so it can show the cards */}
          <FeaturedItems items={allProducts} />

          {/* 2. Wrap your services in a section and a grid */}
          <section className="services-section">
            <h2 className="text-center">Featured Services</h2>
            <div className="services-grid">
                {/* 3. Loop through the array */}
                {allServices && allServices.length > 0 ? (
                    allServices.map((item) => (
                        <ServiceCard key={item._id} service={item} />
                    ))
                ) : (
                    <p>Loading services...</p> // This shows if the array is empty
                )}
                <button>Explore More</button>
            </div>
          </section>

          <WhyChose/>
          <Working />
          <Secure />
          <StartButton />
          <CallToAction/>
        </>
     );
}

export default HomePage;