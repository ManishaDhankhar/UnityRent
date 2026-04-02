import React from 'react';
import {useNavigate} from "react-router-dom";

function FeaturedItems({ items }) {
  const navigate=useNavigate();
const goToNewPage=()=>{
  navigate("/about");
}
const handleCardClick=(item_id)=>{
  navigate(`/item/${item_id}`);
}
  if (!items || items.length === 0) return <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>;
  return (
    <section style={{ padding: '30px 5%', backgroundColor: '#f9f9f9', fontFamily: 'sans-serif' }}>
      
      {/* Header Section */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', flexWrap: 'wrap', gap: '15px' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#111', margin: 0 }}>Browse Rental Items</h2>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <select style={{ padding: '10px 15px', borderRadius: '8px', border: '1px solid #ddd', backgroundColor: '#fff', color: '#666', fontSize: '0.9rem', minWidth: '160px', outline: 'none' }}>
              <option>Category...</option>
              <option>Study Materials</option>
              <option>Tech</option>
            </select>
            <button style={{ backgroundColor: '#002d5b', color: 'white', border: 'none', padding: '10px 14px', borderRadius: '8px', cursor: 'pointer' }}>☰</button>
          </div>
        </div>
      </div>

      {/* The Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
        {items.map((item, index) => (
          <div 
            key={item._id} 
            onClick={()=>handleCardClick(item._id)}
            className="rental-card-animate"
            style={{
              cursor:'pointer',
              backgroundColor: 'white',
              borderRadius: '35px',
              padding: '20px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
              animation: 'fadeInUp 0.6s ease forwards',
              animationDelay: `${index * 0.1}s`,
              opacity: 0,
              transform: 'translateY(20px)',
              position: 'relative'
            }}
          >
            {/* Top Image Section */}
            <div style={{
              position: 'relative',
              height: '220px',
              borderRadius: '25px',
              backgroundColor: '#f6f6f6',
              overflow: 'hidden',
              marginBottom: '20px'
            }}>
              
              <div style={{ 
                position: 'absolute', 
                top: '15px', 
                right: '15px', 
                backgroundColor: 'white', 
                width: '60px', 
                height: '60px', 
                borderRadius: '50%', 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center', 
                justifyContent: 'center', 
                zIndex: 2, 
                boxShadow: '0 4px 12px rgba(0,0,0,0.12)'
              }}>
                <span style={{ fontWeight: '900', fontSize: '14px', color: '#111' }}>₹{item.pricing.ratePerDay}</span>
                <span style={{ fontSize: '8px', fontWeight: '700', color: '#888', marginTop: '-2px' }}>/DAY</span>
              </div>

              <img 
                src={item.image} 
                alt={item.title} 
                style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '35px' }} 
              />
              
              <div style={{ position: 'absolute', bottom: '15px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '5px' }}>
                 <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#002d5b' }}></div>
                 <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#ccc' }}></div>
                 <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#ccc' }}></div>
              </div>
            </div>

            <div style={{ padding: '0 10px' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#111', margin: '0 0 5px 0' }}>{item.title}</h3>
              <p style={{ color: 'rgb(34, 29, 29)', margin: '0 0 8px 0', fontSize: '0.95rem', fontWeight: '500' }}>{item.category || "Campus Essential"}</p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
                 <button style={{ flex: 1, backgroundColor: 'transparent', border: '1.5px solid #eee', padding: '10px 0', borderRadius: '30px', fontWeight: '700', cursor: 'pointer', fontSize: '0.9rem', color: '#444' }}>
                   Details
                 </button>
                 
                 <button style={{ flex: 1.5, backgroundColor: '#002d5b', color: 'white', border: 'none', padding: '10px 0', borderRadius: '30px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '0.9rem' }}>
                  Rent Now <span style={{ backgroundColor: '#fff', color: '#002d5b', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '900' }}>↗</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '60px' }}>
        <button 
          className="explore-more-btn"
          onClick={goToNewPage}
          style={{ padding: '16px 45px', borderRadius: '40px', backgroundColor: 'white', color: '#002d5b', border: '2px solid #002d5b', fontSize: '1rem', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', transition: 'all 0.3s ease', boxShadow: '0 4px 15px rgba(0, 45, 91, 0.05)' }}
        >
          Explore More <span style={{ fontSize: '1.2rem' }}>→</span>
        </button>
      </div>

      <style>{`
        /* CATEGORY PILLS HOVER LOGIC */
        .category-pill {
          background-color: white;
          color: #555;
          box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        }

        .category-pill:hover {
          background-color: #002d5b !important;
          color: white !important;
          box-shadow: 0 4px 10px rgba(0,45,91,0.2) !important;
        }

        .category-pill.active {
          background-color: #002d5b;
          color: white;
          box-shadow: 0 4px 10px rgba(0,45,91,0.2);
        }

        /* EXPLORE MORE HOVER */
        .explore-more-btn:hover {
          background-color: #002d5b !important;
          color: white !important;
          transform: scale(1.05);
          box-shadow: 0 10px 25px rgba(0, 45, 91, 0.2) !important;
        }

        /* CARD ANIMATIONS */
        @keyframes fadeInUp {
          to { opacity: 1; transform: translateY(0); }
        }

        .rental-card-animate:hover {
          transform: translateY(-12px) !important;
          box-shadow: 0 25px 50px rgba(14, 5, 110, 0.12) !important;
          transition: 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
      `}</style>
    </section>
  );
}

export default FeaturedItems;