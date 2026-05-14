import React from 'react';
import './ServiceCard.css';
import { useNavigate } from "react-router-dom";

function FeaturedItems({ items }) {
  const navigate = useNavigate();
  
  // Navigate to your about or products page
  const goToMore = () => navigate("/about");
  const handleCardClick = (item_id) => navigate(`/item/${item_id}`);

  if (!items || items.length === 0) return null;

  return (
    <section className="featured-section" style={{ padding: '40px 5%', backgroundColor: '#fdfdfd' }}>
      {/* Section Title stays centered */}
      <h2 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '40px', textAlign: 'center' }}>
        Browse Rental Items
      </h2>
      
      {/* Wrapper to center the grid on the page */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px', width: '100%', maxWidth: '1200px' }}>
          {items.map((item) => (
            <div key={item._id} className="service-card rental-item-wrapper" style={{ textAlign: 'left' }}>
              
              {/* Image with Blue Frame */}
              <div className="image-container" onClick={() => handleCardClick(item._id)}>
                <img src={item.image} alt={item.title} />
                <div className="rating-badge">⭐ 4.9</div>
              </div>
              
              <div className="card-content" style={{ textAlign: 'left' }}>
                <div className="card-header">
                  <span className="category-tag">{item.category || "General"}</span>
                  <span className="price-tag">₹{item.pricing?.ratePerDay} <small>/ day</small></span>
                </div>

                <h3 className="service-title">{item.title}</h3>
                <p className="provider-name">By: {item.locationTag || "UnityRent User"}</p>
                
                {/* Two-Button Footer for Rentals */}
                <div className="rental-footer">
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleCardClick(item._id); }}
                    className="details-btn"
                  >
                    Details
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleCardClick(item._id); }}
                    className="rent-btn"
                  >
                    Rent Now <span className="arrow">↗</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Explore More Button - Centered at bottom */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '60px' }}>
        <button className="explore-more-btn" onClick={goToMore}>
          Explore More Products <span>→</span>
        </button>
      </div>
    </section>
  );
}

export default FeaturedItems;