import React from 'react';
import { useNavigate } from "react-router-dom";

function FeaturedItems({ items }) {
  const navigate = useNavigate();
  
  const goToNewPage = () => navigate("/about");
  const handleCardClick = (item_id) => navigate(`/item/${item_id}`);

  if (!items || items.length === 0) return (
    <div style={{ textAlign: 'center', padding: '100px', color: '#666' }}>
      <p style={{ fontSize: '1.2rem', fontWeight: '600' }}>Loading UnityRent Items...</p>
    </div>
  );

  return (
    <section style={{ padding: '40px 5%', backgroundColor: '#fdfdfd', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      
      {/* Header Section */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', flexWrap: 'wrap', gap: '15px' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#111', margin: 0 }}>Browse Rental Items</h2>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <select style={{ padding: '10px 15px', borderRadius: '12px', border: '1px solid #eee', backgroundColor: '#fff', color: '#666', fontSize: '0.9rem', minWidth: '180px', outline: 'none' }}>
              <option>Filter by Category</option>
              <option>Academic</option>
              <option>Electronics</option>
              <option>Furniture</option>
            </select>
            <button style={{ backgroundColor: '#002d5b', color: 'white', border: 'none', padding: '12px 16px', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold' }}>☰</button>
          </div>
        </div>
      </div>

      {/* The Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}>
        {items.map((item, index) => (
          <div 
            key={item._id} 
            className="rental-card-animate"
            style={{
              backgroundColor: 'white',
              borderRadius: '28px',
              padding: '18px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
              animation: 'fadeInUp 0.6s ease forwards',
              animationDelay: `${index * 0.1}s`,
              opacity: 0,
              transform: 'translateY(20px)',
              position: 'relative',
              border: '1px solid #f9f9f9'
            }}
          >
            {/* Top Image Section - FIXED TO SHOW BLUE BACKGROUND */}
            <div 
              onClick={() => handleCardClick(item._id)}
              style={{
                position: 'relative',
                height: '220px',
                borderRadius: '20px',
                backgroundColor: '#002d5b', // The reference blue
                overflow: 'hidden',
                marginBottom: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                // Creates the "frame" effect so blue shows around image
                cursor: 'pointer'
              }}
            >
              <img 
                src={item.image} 
                alt={item.title} 
                style={{ 
                  maxWidth: '100%', 
                  maxHeight: '100%', 
                  objectFit: 'contain', // Ensures image doesn't cover the blue background
                  filter: 'drop-shadow(0px 10px 15px rgba(0,0,0,0.2))'
                }} 
              />
            </div>

            {/* Content Section */}
            <div style={{ padding: '0 10px' }}>
              
              {/* Rating Star Row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
                <span style={{ color: '#FFB800', fontSize: '1.3rem' }}>★</span>
                <span style={{ fontWeight: '800', fontSize: '1.05rem', color: '#111' }}>4.9</span>
              </div>

              {/* Category Pill and Price */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', flexWrap: 'wrap' }}>
                <span style={{ 
                  backgroundColor: '#FFF4E5', 
                  color: '#D48C2C', 
                  padding: '5px 14px', 
                  borderRadius: '10px', 
                  fontSize: '0.8rem', 
                  fontWeight: '800',
                  textTransform: 'uppercase'
                }}>
                  {item.category || "General"}
                </span>
                <div style={{ fontSize: '1.05rem', color: '#111', fontWeight: '600' }}>
                   <span style={{ fontWeight: '900', fontSize: '1.2rem' }}>₹{item.pricing?.ratePerDay}</span> / day
                </div>
              </div>

              {/* Title and Owner info */}
              <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#111', margin: '0 0 6px 0', lineHeight: '1.2' }}>
                {item.title}
              </h3>
              <p style={{ color: '#888', margin: '0 0 24px 0', fontSize: '0.9rem', fontWeight: '600' }}>
                By: {item.locationTag || "UnityRent User"}
              </p>
              
              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '12px' }}>
                 <button 
                  onClick={(e) => { e.stopPropagation(); handleCardClick(item._id); }}
                  style={{ flex: 1, backgroundColor: 'transparent', border: '2px solid #f0f0f0', padding: '12px 0', borderRadius: '15px', fontWeight: '800', cursor: 'pointer', fontSize: '0.9rem', color: '#444', transition: '0.3s' }}
                >
                  Details
                </button>
                
                 <button 
                  onClick={(e) => { e.stopPropagation(); handleCardClick(item._id); }}
                  style={{ flex: 1.6, backgroundColor: '#002d5b', color: 'white', border: 'none', padding: '12px 0', borderRadius: '15px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '0.95rem' }}
                >
                  Rent Now <span style={{ backgroundColor: '#fff', color: '#002d5b', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '900' }}>↗</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Explore Button */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '70px' }}>
        <button 
          className="explore-more-btn"
          onClick={goToNewPage}
          style={{ 
            padding: '18px 50px', 
            borderRadius: '50px', 
            backgroundColor: 'white', 
            color: '#002d5b', 
            border: '2px solid #002d5b', 
            fontSize: '1.1rem', 
            fontWeight: '900', 
            cursor: 'pointer', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '15px', 
            transition: '0.3s all cubic-bezier(0.4, 0, 0.2, 1)', 
            boxShadow: '0 10px 20px rgba(0, 45, 91, 0.08)' 
          }}
        >
          Explore More Products <span style={{ fontSize: '1.4rem' }}>→</span>
        </button>
      </div>

      {/* Dynamic CSS for Hover Effects */}
      <style>{`
        @keyframes fadeInUp {
          to { opacity: 1; transform: translateY(0); }
        }
        .rental-card-animate:hover {
          transform: translateY(-10px) !important;
          box-shadow: 0 30px 60px rgba(0,0,0,0.08) !important;
          border-color: #eee !important;
          transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .explore-more-btn:hover {
          background-color: #002d5b !important;
          color: white !important;
          transform: translateY(-3px) scale(1.02);
        }
        button:active {
          transform: scale(0.95);
        }
      `}</style>
    </section>
  );
}

export default FeaturedItems;