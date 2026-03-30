const features = [
  {
    title: "Verified Users",
    description: "Student email & phone verification for safety",
    icon: "🛡️", // You can use Lucide-React icons here
  },
  {
    title: "Easy Booking",
    description: "Rent items in minutes with secure payments",
    icon: "🕒",
  },
  {
    title: "Direct Chat",
    description: "Message owners directly within the platform",
    icon: "💬",
  },
];

const FeatureCard = ({ title, description, icon }) => (
  <div className="bg-white border-[3px] border-black rounded-2xl p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col items-start text-left h-full">
    {/* Icon Container */}
    <div className="w-14 h-14 bg-[#FFD700] border-[3px] border-black rounded-full flex items-center justify-center text-3xl mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      {icon}
    </div>

 
    <h3 className="text-2xl font-black mb-3 text-black tracking-tight">{title}</h3>
    <p className="text-gray-600 font-medium leading-relaxed">{description}</p>
  </div>
);

const WhyChose = () => {
  return (
    <section className="bg-[#F8F8F8] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black text-center mb-16 text-black">
          Why Choose UnityRent?
        </h2>
        
        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChose;