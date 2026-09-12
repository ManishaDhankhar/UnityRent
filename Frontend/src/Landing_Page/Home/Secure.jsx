import React from 'react';
import { FileText, MessageCircle, Shield, Star } from 'lucide-react';

const Secure = () => {
  const safetyFeatures = [
    {
      icon: <FileText className="w-5 h-5 text-[#063b28]" />,
      text: "Digital agreements give clarity to both sides",
    },
    {
      icon: <MessageCircle className="w-5 h-5 text-[#063b28]" />,
      text: "Clear communication at every step",
    },
    {
      icon: <Shield className="w-5 h-5 text-[#063b28]" />,
      text: "Support if an issue arises",
    },
    {
      icon: <Star className="w-5 h-5 text-[#063b28]" />,
      text: "Post-rental follow-ups for peace of mind",
    },
  ];

  return (
    <section className="py-20 px-6 bg-[#f4faf8] flex flex-col items-center">
      {/* Header */}
      <div className="text-center mb-12">
        <span className="text-[#063b28] font-bold text-xs tracking-widest uppercase bg-[#e6f5f0] px-4 py-1.5 rounded-full">
          Peace of Mind
        </span>
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#063b28] mt-4 mb-4 tracking-tight">
          What if something goes wrong?
        </h2>
        <p className="text-[#2b4d40] font-medium text-lg">
          We've already thought about that.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-4xl">
        {safetyFeatures.map((feature, index) => (
          <div 
            key={index} 
            className="flex items-center p-6 bg-white border border-[#e2e8e5] rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex items-center justify-center w-12 h-12 bg-[#e6f5f0] rounded-xl mr-5 shrink-0">
              {feature.icon}
            </div>
            <p className="text-[#063b28] font-semibold text-lg">
              {feature.text}
            </p>
          </div>
        ))}
      </div>

      {/* Footer Text */}
      <div className="mt-16 text-center">
        <h3 className="text-2xl md:text-3xl font-extrabold text-[#063b28]">
          Renting should feel safe — <span className="text-[#597a6e] font-medium italic">not stressful.</span>
        </h3>
      </div>
    </section>
  );
};

export default Secure;