import React from 'react';

const CallToAction = () => {
  return (
    <section className="bg-white py-20 px-6 flex flex-col items-center text-center">
      {/* Heading */}
      <h2 className="text-4xl md:text-5xl font-black text-black mb-6 tracking-tight">
        Ready to Start Renting?
      </h2>
      
      {/* Subtext */}
      <p className="text-lg md:text-xl text-black font-medium mb-10 max-w-2xl">
        Join thousands of students saving money and earning by sharing.
      </p>
      
      {/* The Black Button */}
      <button className="bg-[#002d5b] text-white text-lg font-bold py-4 px-10 rounded-full transition-transform active:scale-95 hover:opacity-90">
        Get Started Now
      </button>

      
    </section>
  );
};

export default CallToAction;