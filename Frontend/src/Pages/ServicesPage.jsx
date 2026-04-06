import React, { useEffect, useState } from 'react';
import ServicesSection from './ServicesSection';

const ServicesPage = ({ allServices, title, loading }) => {
  return (
    <div className="full-page-container" style={{ paddingTop: '30px' }}>
      <ServicesSection 
        services={allServices} 
        title="Featured Services"
        showButton={false} // Hide button because we are already on the full page
      />
    </div>
  );
};

export default ServicesPage;