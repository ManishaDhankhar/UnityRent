import React from 'react';
import { FileText, MessageCircle, Shield, Star } from 'lucide-react'; // Using Lucide for the icons

const Secure = () => {
  const safetyFeatures = [
    {
      icon: <FileText className="w-5 h-5 text-[#002d5b]-500" />,
      text: "Digital agreements give clarity to both sides",
    },
    {
      icon: <MessageCircle className="w-5 h-5 text-[#002d5b]-500" />,
      text: "Clear communication at every step",
    },
    {
      icon: <Shield className="w-5 h-5 text-[#002d5b]-500" />,
      text: "Support if an issue arises",
    },
    {
      icon: <Star className="w-5 h-5 text-[#002d5b]-500" />,
      text: "Post-rental follow-ups for peace of mind",
    },
  ];

  return (
    <section className="py-20 px-6 bg-white flex flex-col items-center">
      {/* Header */}
      <div className="text-center mb-12">
        <span className="text-pink-500 font-bold text-xs tracking-widest uppercase">
          Peace of Mind
        </span>
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#001a33] mt-3 mb-4">
          What if something goes wrong?
        </h2>
        <p className="text-gray-600 font-medium text-lg">
          We've already thought about that.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
        {safetyFeatures.map((feature, index) => (
          <div 
            key={index} 
            className="flex items-center p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex items-center justify-center w-12 h-12 bg-orange-50 rounded-full mr-5 shrink-0">
              {feature.icon}
            </div>
            <p className="text-[#001a33] font-semibold text-lg">
              {feature.text}
            </p>
          </div>
        ))}
      </div>

      {/* Footer Text */}
      <div className="mt-16 text-center">
        <h3 className="text-2xl md:text-3xl font-extrabold text-[#001a33]">
          Renting should feel safe — <span className="text-gray-500 font-medium italic">not stressful.</span>
        </h3>
      </div>
    </section>
  );
};

export default Secure;