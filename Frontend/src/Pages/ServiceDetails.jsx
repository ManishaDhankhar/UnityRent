import React from 'react';
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowBack, 
  Star, 
  Person, 
  LocalOffer, 
  WhatsApp, 
  Email, 
  Phone,
  Share,
  RateReview,
  Category,
  Update
} from '@mui/icons-material';
import { Button, IconButton, Chip } from '@mui/material';

const ServiceDetails = ({ allServices }) => {
    const { id } = useParams();
    const navigate = useNavigate();
  


  const service = allServices.find(item => item._id === id);

  // Check if still waiting for the backend fetch to complete in App.js
  if (allServices.length === 0) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        Loading UnityRent Quality...
      </div>
    );
  }

  if (!service) return <div className="p-20 text-center">Loading Service Details...</div>;

  return (
    <div className="max-w-7xl mx-auto p-5 mt-5 bg-[#fcfcfc]">
      {/* Navigation */}
      <Button 
        startIcon={<ArrowBack />} 
        onClick={() => navigate(-1)}
        className="mb-6 text-gray-600 normal-case"
      >
        Back to Explore
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Main Card */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <div className="w-90 h-90 mb-6 rounded-xl overflow-hidden border">
               <img src={service.image} alt={service.serviceName} className="w-full h-full object-cover" />
            </div>
            
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <Chip 
                  icon={<Category fontSize="small" />} 
                  label={service.category} 
                  size="small" 
                  color="primary" 
                  variant="outlined" 
                />
                <h1 className="text-4xl font-black text-gray-900">{service.serviceName}</h1>
                <div className="flex items-center gap-4 text-sm font-medium">
                   <span className="flex items-center text-orange-500">
                     <Star fontSize="small" className="mr-1"/> {service.rating} (Verified)
                   </span>
                   <span className="flex items-center text-gray-400">
                     <Person fontSize="small" className="mr-1"/> Provided by: {service.providerName}
                   </span>
                </div>
              </div>
              <IconButton color="primary"><Share /></IconButton>
            </div>
          </div>

          {/* Description Section */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold mb-4">Description</h3>
            <p className="text-gray-600 leading-relaxed">{service.description}</p>
            
            <h3 className="text-xl font-bold mt-8 mb-4">Expertise Tags</h3>
            <div className="flex flex-wrap gap-2">
               {service.tags && service.tags.map(tag => (
                 <Chip key={tag} label={`#${tag}`} className="bg-gray-100 text-gray-700" />
               ))}
            </div>
          </div>

          {/* Experience Section */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold mb-4">Experiance</h3>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-50 rounded-full text-orange-600">
                <Update fontSize="large" /> 
              </div>
              <div>
              <p className="text-2xl font-black text-gray-900">2+</p>
              <p className="text-sm text-gray-500">Years Experience</p>
              </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-50 rounded-full text-orange-600">
              <Person fontSize="large" />
            </div>
            <div>
              <p className="text-2xl font-black text-gray-900">1020</p>
              <p className="text-sm text-gray-500">Team Members</p>
            </div>
          </div>
        </div>
         
    

          {/* Service Metadata (Timestamps) */}
          <div className="flex items-center gap-2 text-xs text-gray-400 px-2">
             <Update fontSize="inherit" />
             <span>Last updated: {new Date(service.updatedAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* RIGHT COLUMN: Contact & Pricing Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl border-t-4 border-t-blue-900">
              <h3 className="font-bold text-lg mb-6">Booking Summary</h3>
              
              <div className="bg-blue-50 p-4 rounded-2xl mb-8">
                <p className="text-xs text-blue-800 uppercase font-bold tracking-widest mb-1">Price Details</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-blue-900">₹{service.price}</span>
                  <span className="text-blue-700 font-medium italic text-sm">/{service.priceUnit}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-all">
                  <div className="p-2 bg-green-100 text-green-700 rounded-lg"><WhatsApp /></div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold">Fastest Response</p>
                    <p className="text-sm font-semibold">Chat with Provider</p>
                  </div>
                </li>
                <li className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-all">
                  <div className="p-2 bg-blue-100 text-blue-700 rounded-lg"><Email /></div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold">Official Inquiry</p>
                    <p className="text-sm font-semibold">Send an Email</p>
                  </div>
                </li>
              </ul>

              <Button 
                onClick={() => navigate('/bookservice')}
                fullWidth 
                variant="contained" 
                size="large"
                sx={{ 
                  bgcolor: '#002d5b', 
                  py: 2, 
                  borderRadius: '15px',
                  fontWeight: '800',
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  '&:hover': { bgcolor: '#004080' } 
                }}
              >
                Book This Service
              </Button>
            </div>
            
            <div className="p-4 text-center">
               <p className="text-xs text-gray-400 italic">Secure payment & student protection included.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;