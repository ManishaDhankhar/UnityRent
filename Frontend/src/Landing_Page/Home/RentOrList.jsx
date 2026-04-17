import React from 'react';

const RentOrList = () => {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-extrabold text-[#001a33] mb-4">
          Two ways to join the mission
        </h2>
        <p className="text-gray-500 text-lg">
          Whether you have things or need things — we've got you.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Card 1: Listers */}
        <MissionCard 
          badge="FOR LISTERS"
          badgeColor="bg-[#002d5b]"
          title="Turn unused items into income — safely"
          description="Have a camera, drill, or party speaker gathering dust? List it in seconds and let your neighbours rent it safely."
          image="https://images.unsplash.com/photo-1565598621680-94ac0c22b148?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3R1ZGVudHMlMjBsZWFybmluZ3xlbnwwfHwwfHx8MA%3D%3D"
          features={[
            "Rent only to verified users",
            "Clear terms & digital proof",
            "You decide availability & pricing",
            "Earn from what you already own"
          ]}
          buttonText="List Your Item"
          buttonStyle="bg-[#002d5b] text-white"
          checkColor="text-red-400"
        />

        {/* Card 2: Renters */}
        <MissionCard 
          badge="FOR RENTERS"
          badgeColor="bg-[#002d5b]"
          title="Get what you need, without buying"
          description="Why buy a tent for one weekend? Rent high-quality items from neighbours near you for a fraction of the cost."
          image="https://images.unsplash.com/photo-1648201188793-418f2b9b4b32?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHNjaWVudGlmaWMlMjBjYWxjdWxhdG9yfGVufDB8fDB8fHww"
          features={[
            "Affordable local rentals",
            "Faster than online shopping",
            "Better for the planet",
            "No long-term commitment"
          ]}
          buttonText="Explore Rentals"
          buttonStyle="bg-[#002d5b] text-white"
          checkColor="text-red-400"
        />
      </div>
    </section>
  );
};

const MissionCard = ({ badge, badgeColor, title, description, image, features, buttonText, buttonStyle, checkColor }) => {
  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col h-full">
      {/* Image Header */}
      <div className="relative h-64">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6">
          <span className={`${badgeColor} text-white text-[10px] font-bold px-2 py-1 rounded w-fit mb-2 tracking-wider`}>
            {badge}
          </span>
          <h3 className="text-white text-2xl font-bold leading-tight">
            {title}
          </h3>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-8 flex flex-col grow">
        <p className="text-gray-600 mb-8 leading-relaxed">
          {description}
        </p>

        <ul className="space-y-4 mb-10 grow">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-gray-700 font-medium">
              <span className={`mr-3 ${checkColor}`}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </span>
              {feature}
            </li>
          ))}
        </ul>

        {/* Action Button */}
        <button className={`w-full py-4 rounded-xl font-bold text-lg transition-transform hover:scale-[1.02] active:scale-[0.98] ${buttonStyle}`}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default RentOrList;