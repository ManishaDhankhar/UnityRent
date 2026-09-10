import React from 'react';
import './ServiceCard.css';
import { useNavigate } from "react-router-dom";
import SearchBar from '../../components/SearchBar/SearchBar'; 
import useSearch from '../../hooks/UseSearch';

function FeaturedItems({ items, showSearch = false }) {
  const navigate = useNavigate();
  const { query, setQuery, displayItems } = useSearch(items);

  // Agar search enabled hai to filtered list use karo, warna original items
  const itemsToShow = showSearch ? displayItems : items;

  const goToMore = () => navigate("/about");
  const handleCardClick = (item_id) => navigate(`/item/${item_id}`);

  if (!items || items.length === 0) return null;

  return (
    <section className="featured-section" style={{ padding: '40px 5%', backgroundColor: '#fdfdfd' }}>
      <h2 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '20px', textAlign: 'center' }}>
        Browse Rental Items
      </h2>

      {/* Search bar sirf tab dikhega jab showSearch true ho */}
      {showSearch && (
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
          <SearchBar query={query} setQuery={setQuery} />
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px', width: '100%', maxWidth: '1200px' }}>
          {itemsToShow.map((item) => (
            <div key={item._id} className="service-card rental-item-wrapper" style={{ textAlign: 'left' }}>
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
                <div className="rental-footer">
                  <button onClick={(e) => { e.stopPropagation(); handleCardClick(item._id); }} className="details-btn">
                    Details
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); handleCardClick(item._id); }} className="rent-btn">
                    Rent Now <span className="arrow">↗</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {!showSearch && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '60px' }}>
          <button className="explore-more-btn" onClick={goToMore}>
            Explore More Products <span>→</span>
          </button>
        </div>
      )}
    </section>
  );
}

export default FeaturedItems;