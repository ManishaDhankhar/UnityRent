import React from 'react';
import ServiceCard from '../Landing_Page/Home/ServiceCard';
import {useNavigate} from "react-router-dom";


const ServicesSection = ({ services, title, loading, showButton }) => {
  const navigate=useNavigate();

  if (loading) return <div className="loader">Loading Services...</div>;

  return (
    <section className="services-section page-wrapper">
      {title && <h2 className="section-title text-3xl">{title}</h2>}
      
      <div className="services-grid">
        {services && services.length > 0 ? (
          services.map((item) => (
            <ServiceCard key={item._id} service={item} />
          ))
        ) : (
          <p>No services found.</p>
        )}
      </div>

        {showButton && (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
            <button 
              className="explore-more-btn"
              onClick={() => navigate('/allservices')} // Directs to your ServicesPage route
              style={{
                padding: '12px 35px',
                borderRadius: '30px',
                color: '#002d5b',
                border: 'solid',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              Explore More →
            </button>
          </div>
        )
        }

    </section>
  );
};

export default ServicesSection;