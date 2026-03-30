import React from 'react';
// If using Lucide icons: import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#111111] text-white pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-gray-800 pb-12">
        
        {/* Column 1: Brand & Bio */}
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-black tracking-tight text-[#eaece4]">UnityRent</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            The most trusted marketplace for students to rent, lend, and save. 
            Join our community and start sharing today.
          </p>
          <div className="flex gap-4 mt-2">
            {/* Social Icons Placeholder */}
            <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#eaece4] hover:text-black cursor-pointer transition-colors"><i className="fa-brands fa-facebook"></i></div>
            <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#eaece4] hover:text-black cursor-pointer transition-colors"><i className="fa-brands fa-twitter"></i></div>
            <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#eaece4] hover:text-black cursor-pointer transition-colors"><i className="fa-brands fa-instagram"></i></div>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="font-bold mb-6 text-lg">Platform</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li className="hover:text-[#eaece4] cursor-pointer transition-colors">Browse Items</li>
            <li className="hover:text-[#eaece4] cursor-pointer transition-colors">How it Works</li>
            <li className="hover:text-[#eaece4] cursor-pointer transition-colors">Verification</li>
            <li className="hover:text-[#eaece4] cursor-pointer transition-colors">Pricing</li>
          </ul>
        </div>

        {/* Column 3: Support */}
        <div>
          <h4 className="font-bold mb-6 text-lg">Support</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li className="hover:text-[#eaece4] cursor-pointer transition-colors">Help Center</li>
            <li className="hover:text-[#eaece4] cursor-pointer transition-colors">Safety Rules</li>
            <li className="hover:text-[#eaece4] cursor-pointer transition-colors">Terms of Service</li>
            <li className="hover:text-[#eaece4] cursor-pointer transition-colors">Privacy Policy</li>
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div>
          <h4 className="font-bold mb-6 text-lg">Stay Updated</h4>
          <p className="text-gray-400 text-sm mb-4">Get the latest deals and updates.</p>
          <div className="flex flex-col gap-2">
            <input 
              type="email" 
              placeholder="Email address" 
              className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#eaece4]"
            />
            <button className="bg-[#eaece4] text-black font-bold py-2 rounded-lg text-sm hover:opacity-90 transition-opacity">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs gap-4">
        <p>© {currentYear} UnityRent Technologies. All rights reserved.</p>
        <div className="flex gap-6">
          <span className="hover:text-white cursor-pointer">Cookie Settings</span>
          <span className="hover:text-white cursor-pointer">Sitemap</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;