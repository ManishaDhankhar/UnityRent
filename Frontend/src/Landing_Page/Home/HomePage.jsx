import React from 'react'
import Hero from './Hero';
import Working from './Working';
import Secure from './Secure';
import FeaturedItems from './FeaturedItems';
import Quote from './Quote';
import StartButton from './StartButton';
import WhyChose from './WhyChoose';
import CallToAction from './CallToAction';


function HomePage({ allProducts }) {
    return ( 
        <>
          <Hero />
          {/* We pass the data into FeaturedItems so it can show the cards */}
          <FeaturedItems items={allProducts} />
          <WhyChose/>
          <Working />
          <Secure />
          <Quote />
          <StartButton />
          <CallToAction/>
        </>
     );
}

export default HomePage;