import React from 'react';

const features = [
  {
    title: "Verified Users",
    description: "Student email & phone verification for campus safety",
    icon: "🛡️",
  },
  {
    title: "Easy Booking",
    description: "Rent items in minutes with transparent pricing",
    icon: "🕒",
  },
  {
    title: "Direct Chat",
    description: "Message owners directly within the platform",
    icon: "💬",
  },
];

const FeatureCard = ({ title, description, icon }) => (
  <div className="bg-white border border-[#e2e8e5] rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col items-start text-left h-full">
    {/* Icon Container */}
    <div className="w-14 h-14 bg-[#f7cb2c] text-[#063b28] rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-sm">
      {icon}
    </div>

    <h3 className="text-2xl font-bold mb-3 text-[#063b28] tracking-tight">{title}</h3>
    <p className="text-[#2b4d40] font-medium leading-relaxed">{description}</p>
  </div>
);

const WhyChose = () => {
  return (
    <section className="bg-[#f4faf8] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black text-center mb-16 text-[#063b28] tracking-tight">
          Why Choose UnityRent?
        </h2>
        
        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChose;