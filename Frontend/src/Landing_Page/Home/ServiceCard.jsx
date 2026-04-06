import React from 'react';
import './ServiceCard.css'; 
import { useNavigate } from 'react-router-dom';

const ServiceCard = ({ service }) => {
  const navigate = useNavigate();

    if (!service) return null;

  return (
    <div className="service-card">
      <div className="image-container">
        <img 
          src={service.image} 
          alt={service.serviceName}  
        />
        <div className="rating-badge">
          ⭐ {service.rating || "New"}
        </div>
      </div>
      
      <div className="card-content">
        <div className="card-header">
          <span className="category-tag">{service.category}</span>
          <span className="price-tag">₹{service.price} <small>{service.priceUnit}</small></span>
        </div>

        <h3 className="service-title">{service.serviceName}</h3>
        <p className="provider-name">By: {service.providerName}</p>
        {/* <p className="description">{service.description.substring(0, 80)}...</p> */}
        
        <div className="card-footer">
          {/* <div className="tags">
            {service.tags.slice(0, 2).map((tag, i) => (
              <span key={i} className="tag">#{tag}</span>
            ))}
          </div> */}
          <button
           onClick={() => navigate(`/service/${service._id}`)}
           className="view-btn">View Details</button>
        </div>
      </div>
    </div>
     
  );
};



export default ServiceCard;