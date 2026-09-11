import React from 'react';

const steps = [
  { id: 1, title: 'Browse', desc: 'Browse items & services near you', icon: '🔍' },
  { id: 2, title: 'Chat', desc: 'Chat and confirm securely', icon: '💬' },
  { id: 3, title: 'Verify', desc: 'Digital agreement protects both sides', icon: '📄' },
  { id: 4, title: 'Review', desc: 'Rent → Return → Review', icon: '🔄' },
];

const Working = () => {
  return (
    <section className="bg-white py-20 px-4 text-center">
      <h4 className="text-[#063b28] font-extrabold uppercase tracking-widest text-xs mb-2">How it works</h4>
      <h2 className="text-4xl font-extrabold text-[#063b28] mb-4">First time here?</h2>
      <p className="text-[#2b4d40] font-semibold mb-12">Renting is simple:</p>

      <div className="relative max-w-5xl mx-auto flex flex-wrap justify-center gap-8 md:gap-0">
        {/* The Connecting Line (Hidden on mobile) */}
        <div className="hidden md:block absolute top-10 left-10 right-10 h-0.5 bg-[#cce4db] z-0"></div>

        {steps.map((step) => (
          <div key={step.id} className="relative z-10 flex flex-col items-center w-full md:w-1/4 px-4">
            {/* Circle with Icon */}
            <div className="relative w-20 h-20 bg-[#e6f5f0] border-2 border-[#063b28] rounded-full flex items-center justify-center text-3xl shadow-sm mb-4">
              {step.icon}
              {/* Step Number Badge */}
              <span className="absolute bottom-0 right-0 bg-[#063b28] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border border-white">
                {step.id}
              </span>
            </div>

            {/* Text Content */}
            <h3 className="text-xl font-bold text-[#063b28] mb-2">{step.title}</h3>
            <p className="text-[#2b4d40] text-sm leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>

      <p className="mt-16 italic text-[#597a6e] font-medium">
        No paperwork. No awkward follow-ups. No confusion.
      </p>
    </section>
  );
};

export default Working;