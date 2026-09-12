import React from 'react';
import { useNavigate } from 'react-router-dom';

const CallToAction = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-r from-[#dcf2f4] via-[#e6f6f5] to-[#faf8ea] py-20 px-6 flex flex-col items-center text-center">
      {/* Heading */}
      <h2 className="text-4xl md:text-5xl font-black text-[#063b28] mb-6 tracking-tight">
        Ready to Start Renting?
      </h2>
      
      {/* Subtext */}
      <p className="text-lg md:text-xl text-[#2b4d40] font-medium mb-10 max-w-2xl">
        Join thousands of students saving money and earning by sharing.
      </p>
      
      {/* Forest Green Button */}
      <button 
        onClick={() => navigate('/about')}
        className="bg-[#063b28] text-white text-lg font-bold py-4 px-10 rounded-full transition-all hover:bg-[#042b1d] hover:shadow-lg active:scale-95 cursor-pointer"
      >
        Get Started Now
      </button>
    </section>
  );
};

export default CallToAction;