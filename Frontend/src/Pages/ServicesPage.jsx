import React, { useEffect, useState } from 'react';
import ServiceCard from '../Landing_Page/Home/ServiceCard';

const ServicesPage = () => {

  if (loading) return <div className="loader">Loading Services...</div>;

  return (
    <div className="page-wrapper">
      <h2 className="section-title">Available University Services</h2>
      <div className="services-grid">
        {services.length > 0 ? (
          services.map(item => (
            <ServiceCard key={item._id} service={item} />
          ))
        ) : (
          <p>No services found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default ServicesPage;