import React, { useState } from 'react';
import './ServiceCard.css'; 
import { useNavigate } from 'react-router-dom';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

const ServiceCard = ({ service }) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  if (!service) return null;

  const badgeText = service.badge || "FEATURED";

  return (
    <div className="service-card coverflow-card-style" onClick={() => navigate(`/service/${service._id}`)}>
      {/* Top Row: Badge & Heart */}
      <div className="card-top-row">
        <span className="card-badge" style={{ backgroundColor: '#e6f5f0', color: '#063b28' }}>
          {badgeText}
        </span>
        <button
          className={`heart-btn ${isFavorite ? 'heart-active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
        >
          {isFavorite ? <FavoriteIcon sx={{ color: '#e74c3c', fontSize: 18 }} /> : <FavoriteBorderIcon sx={{ fontSize: 18 }} />}
        </button>
      </div>

      {/* Image Box */}
      <div className="card-image-box">
        <img 
          src={service.image} 
          alt={service.serviceName || service.title}  
        />
      </div>

      {/* Image Dots */}
      <div className="card-image-dots">
        <span className="dot dot-active"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
      
      {/* Content */}
      <div className="card-info">
        <h3 className="card-title">{service.serviceName || service.title}</h3>
        <p className="card-provider">By: {service.providerName || "Campus Expert"}</p>

        {/* Rating */}
        <div className="card-rating">
          <span className="star">★</span>
          <span className="rating-num">{service.rating || 4.9}</span>
          <span className="reviews-count">({service.reviewsCount || 45})</span>
        </div>
        
        {/* Footer Price & Button */}
        <div className="card-footer-row">
          <div className="card-price">
            ₹{service.price || 299}
            <small>/{service.priceUnit || "service"}</small>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/service/${service._id}`);
            }}
            className="btn-rent-now"
          >
            <ShoppingBagOutlinedIcon fontSize="small" />
            <span>Book Service</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;