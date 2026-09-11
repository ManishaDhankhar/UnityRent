import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import cameraImg from '../../assets/hero_camera.jpg';
import headphonesImg from '../../assets/hero_headphones.jpg';
import ironImg from '../../assets/hero_iron.jpg';
import mouseImg from '../../assets/hero_mouse.jpg';
import bikeImg from '../../assets/hero_bicycle.jpg';

const DEMO_PRODUCTS = [
  {
    _id: "demo-headphones",
    title: "Wireless Headphones",
    description: "High quality sound with premium noise-cancellation comfort.",
    category: "Electronics",
    badge: "BEST SELLER",
    badgeBg: "#f6eedf",
    badgeColor: "#855b28",
    pricing: { ratePerDay: 129.99 },
    rating: 4.8,
    reviewsCount: 120,
    image: headphonesImg
  },
  {
    _id: "demo-camera",
    title: "DSLR Camera",
    description: "Capture moments with perfect 4K clarity & optical zoom.",
    category: "Photography",
    badge: "POPULAR",
    badgeBg: "#e6f5f0",
    badgeColor: "#063b28",
    pricing: { ratePerDay: 699.99 },
    rating: 4.9,
    reviewsCount: 60,
    image: cameraImg
  },
  {
    _id: "demo-bike",
    title: "Travel Bicycle",
    description: "Spacious, durable hybrid bike for campus travel.",
    category: "Mobility",
    badge: "NEW",
    badgeBg: "#e3f0f8",
    badgeColor: "#1d6092",
    pricing: { ratePerDay: 199.99 },
    rating: 4.7,
    reviewsCount: 85,
    image: bikeImg
  },
  {
    _id: "demo-mouse",
    title: "Wireless Mouse",
    description: "Track your precision and stay connected all day.",
    category: "Tech Gear",
    badge: "TRENDING",
    badgeBg: "#f5e8e8",
    badgeColor: "#9c3232",
    pricing: { ratePerDay: 79.99 },
    rating: 4.6,
    reviewsCount: 98,
    image: mouseImg
  },
  {
    _id: "demo-iron",
    title: "Steam Iron",
    description: "Lightweight and comfortable iron for everyday laundry.",
    category: "Appliances",
    badge: "ESSENTIAL",
    badgeBg: "#f5f0e3",
    badgeColor: "#7e621d",
    pricing: { ratePerDay: 59.99 },
    rating: 4.5,
    reviewsCount: 75,
    image: ironImg
  }
];

function FeaturedItems({ items }) {
  const navigate = useNavigate();

  // Combine props items with fallback products to guarantee at least 5 items for carousel
  const productList = React.useMemo(() => {
    if (items && items.length >= 5) return items;
    if (items && items.length > 0) {
      return [...items, ...DEMO_PRODUCTS.slice(0, 5 - items.length)];
    }
    return DEMO_PRODUCTS;
  }, [items]);

  const [activeIndex, setActiveIndex] = useState(Math.floor(productList.length / 2));
  const [favorites, setFavorites] = useState({});

  const toggleFavorite = (e, id) => {
    e.stopPropagation();
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCardClick = (id, index) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
    } else {
      navigate(`/item/${id}`);
    }
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % productList.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + productList.length) % productList.length);
  };

  return (
    <section className="featured-carousel-section">
      {/* Header Section */}
      <div className="section-header">
        <span className="section-subtitle">OUR COLLECTION</span>
        <h2 className="section-main-title">Featured Products</h2>
        <p className="section-desc">Explore our most popular items loved by customers</p>
      </div>

      {/* 3D Coverflow Carousel Wrapper */}
      <div className="carousel-wrapper">
        {/* Left Nav Arrow */}
        <button className="carousel-arrow arrow-left" onClick={prevSlide} aria-label="Previous product">
          <ChevronLeftIcon />
        </button>

        {/* Cards Track */}
        <div className="carousel-track">
          {productList.map((item, index) => {
            const offset = index - activeIndex;
            const absOffset = Math.abs(offset);
            const isActive = offset === 0;

            // Styles based on offset from active card
            let transformStyle = '';
            let opacityStyle = 1;
            let zIndexStyle = 1;

            if (isActive) {
              transformStyle = 'translateX(0%) scale(1.12)';
              zIndexStyle = 10;
              opacityStyle = 1;
            } else if (offset === -1) {
              transformStyle = 'translateX(-105%) scale(0.92)';
              zIndexStyle = 5;
              opacityStyle = 0.82;
            } else if (offset === 1) {
              transformStyle = 'translateX(105%) scale(0.92)';
              zIndexStyle = 5;
              opacityStyle = 0.82;
            } else if (offset < -1) {
              transformStyle = `translateX(${-180 + (offset + 2) * 40}%) scale(0.78)`;
              zIndexStyle = 1;
              opacityStyle = 0.4;
            } else if (offset > 1) {
              transformStyle = `translateX(${180 + (offset - 2) * 40}%) scale(0.78)`;
              zIndexStyle = 1;
              opacityStyle = 0.4;
            }

            const badgeText = item.badge || (index % 2 === 0 ? "BEST SELLER" : "NEW");
            const badgeBg = item.badgeBg || (index % 2 === 0 ? "#f6eedf" : "#e6f5f0");
            const badgeColor = item.badgeColor || (index % 2 === 0 ? "#855b28" : "#063b28");

            return (
              <div
                key={item._id || index}
                className={`coverflow-card ${isActive ? 'card-active' : 'card-side'}`}
                style={{
                  transform: transformStyle,
                  zIndex: zIndexStyle,
                  opacity: opacityStyle
                }}
                onClick={() => handleCardClick(item._id, index)}
              >
                {/* Top Row: Badge Tag & Heart Button */}
                <div className="card-top-row">
                  <span
                    className="card-badge"
                    style={{ backgroundColor: badgeBg, color: badgeColor }}
                  >
                    {badgeText}
                  </span>
                  <button
                    className={`heart-btn ${favorites[item._id] ? 'heart-active' : ''}`}
                    onClick={(e) => toggleFavorite(e, item._id)}
                  >
                    {favorites[item._id] ? <FavoriteIcon sx={{ color: '#e74c3c', fontSize: 18 }} /> : <FavoriteBorderIcon sx={{ fontSize: 18 }} />}
                  </button>
                </div>

                {/* Product Image */}
                <div className="card-image-box">
                  <img src={item.image} alt={item.title} />
                </div>

                {/* Pagination Dots Below Image */}
                <div className="card-image-dots">
                  <span className="dot dot-active"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>

                {/* Content Section */}
                <div className="card-info">
                  <h3 className="card-title">{item.title}</h3>
                  <p className="card-description">
                    {item.description || "High quality equipment available for rental."}
                  </p>

                  {/* Rating */}
                  <div className="card-rating">
                    <span className="star">★</span>
                    <span className="rating-num">{item.rating || 4.8}</span>
                    <span className="reviews-count">({item.reviewsCount || 85})</span>
                  </div>

                  {/* Price & CTA Row */}
                  <div className="card-footer-row">
                    <div className="card-price">
                      ₹{item.pricing?.ratePerDay || 99}
                      <small>/day</small>
                    </div>

                    {isActive ? (
                      <button
                        className="btn-rent-now"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/item/${item._id}`);
                        }}
                      >
                        <ShoppingCartOutlinedIcon fontSize="small" />
                        <span>Rent Now</span>
                      </button>
                    ) : (
                      <button
                        className="btn-cart-icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveIndex(index);
                        }}
                      >
                        <ShoppingCartOutlinedIcon fontSize="small" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Nav Arrow */}
        <button className="carousel-arrow arrow-right" onClick={nextSlide} aria-label="Next product">
          <ChevronRightIcon />
        </button>
      </div>

      {/* Bottom Pagination Dots */}
      <div className="carousel-dots-nav">
        {productList.map((_, i) => (
          <span
            key={i}
            className={`nav-dot ${i === activeIndex ? 'active' : ''}`}
            onClick={() => setActiveIndex(i)}
          ></span>
        ))}
      </div>

      {/* Embedded CSS for 3D Coverflow & Product Cards */}
      <style>{`
        .featured-carousel-section {
          padding: 70px 4%;
          background: linear-gradient(180deg, #f8fbf9 0%, #f4faf8 50%, #ffffff 100%);
          overflow: hidden;
          position: relative;
        }

        .section-header {
          text-align: center;
          margin-bottom: 50px;
        }

        .section-subtitle {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.8rem;
          font-weight: 800;
          color: #856404;
          letter-spacing: 2px;
          text-transform: uppercase;
          display: block;
          margin-bottom: 8px;
        }

        .section-main-title {
          font-family: 'Plus Jakarta Sans', 'Outfit', sans-serif;
          font-size: 3.2rem;
          font-weight: 800;
          color: #063b28;
          margin: 0 0 10px;
          letter-spacing: -1px;
        }

        .section-desc {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 1.05rem;
          color: #597a6e;
          margin: 0;
        }

        /* Carousel Track Layout */
        .carousel-wrapper {
          position: relative;
          max-width: 1300px;
          margin: 0 auto;
          height: 520px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .carousel-track {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Card Container */
        .coverflow-card {
          position: absolute;
          width: 290px;
          background: #ffffff;
          border-radius: 24px;
          padding: 20px;
          box-shadow: 0 12px 35px rgba(6, 59, 40, 0.08);
          border: 1px solid #eef4f1;
          cursor: pointer;
          user-select: none;
          transition: all 0.45s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .card-active {
          box-shadow: 0 25px 60px rgba(6, 59, 40, 0.18) !important;
          border-color: #cce4db !important;
        }

        /* Top Row */
        .card-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .card-badge {
          font-size: 0.7rem;
          font-weight: 800;
          padding: 5px 12px;
          border-radius: 50px;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .heart-btn {
          background: #f8fbf9;
          border: 1px solid #e2e8e5;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #7b8e87;
          transition: all 0.2s ease;
        }

        .heart-btn:hover {
          background: #ffffff;
          border-color: #e74c3c;
          transform: scale(1.1);
        }

        /* Image Box */
        .card-image-box {
          width: 100%;
          height: 190px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 10px;
          background: #fcfdfe;
          border-radius: 18px;
          padding: 10px;
        }

        .card-image-box img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          filter: drop-shadow(0 10px 15px rgba(0,0,0,0.1));
          transition: transform 0.3s ease;
        }

        .card-active:hover .card-image-box img {
          transform: scale(1.05);
        }

        /* Image Dots */
        .card-image-dots {
          display: flex;
          justify-content: center;
          gap: 6px;
          margin-bottom: 16px;
        }

        .card-image-dots .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #d5e2dd;
        }

        .card-image-dots .dot-active {
          width: 18px;
          border-radius: 10px;
          background: #855b28;
        }

        /* Info Section */
        .card-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 1.2rem;
          font-weight: 800;
          color: #063b28;
          margin: 0 0 6px;
          line-height: 1.25;
        }

        .card-description {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.85rem;
          color: #597a6e;
          margin: 0 0 14px;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          height: 2.8em;
        }

        .card-rating {
          display: flex;
          align-items: center;
          gap: 5px;
          margin-bottom: 16px;
        }

        .card-rating .star {
          color: #f7cb2c;
          font-size: 1.1rem;
        }

        .rating-num {
          font-weight: 800;
          font-size: 0.95rem;
          color: #063b28;
        }

        .reviews-count {
          font-size: 0.82rem;
          color: #7b8e87;
        }

        /* Footer Row */
        .card-footer-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 12px;
          border-top: 1px solid #f0f6f4;
        }

        .card-price {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 1.25rem;
          font-weight: 900;
          color: #063b28;
        }

        .card-price small {
          font-size: 0.8rem;
          color: #597a6e;
          font-weight: 600;
          margin-left: 2px;
        }

        /* Buttons */
        .btn-rent-now {
          background-color: #063b28;
          color: #ffffff;
          border: none;
          padding: 9px 20px;
          border-radius: 50px;
          font-weight: 700;
          font-size: 0.88rem;
          display: flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          box-shadow: 0 6px 16px rgba(6, 59, 40, 0.25);
          transition: all 0.2s ease;
        }

        .btn-rent-now:hover {
          background-color: #042b1d;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(6, 59, 40, 0.32);
        }

        .btn-cart-icon {
          background-color: #f0f6f4;
          color: #063b28;
          border: 1px solid #d5e6e0;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-cart-icon:hover {
          background-color: #063b28;
          color: #ffffff;
          border-color: #063b28;
        }

        /* Arrow Navigation Buttons */
        .carousel-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 46px;
          height: 46px;
          background: #ffffff;
          border: 1px solid #e2e8e5;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #063b28;
          cursor: pointer;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
          z-index: 20;
          transition: all 0.2s ease;
        }

        .arrow-left {
          left: 10px;
        }

        .arrow-right {
          right: 10px;
        }

        .carousel-arrow:hover {
          background: #063b28;
          color: #ffffff;
          border-color: #063b28;
          transform: translateY(-50%) scale(1.1);
        }

        /* Bottom Dots Navigation */
        .carousel-dots-nav {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
          margin-top: 30px;
        }

        .nav-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: 2px solid #855b28;
          background: transparent;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .nav-dot.active {
          width: 14px;
          height: 14px;
          background: #855b28;
        }

        /* Responsive Breakpoints */
        @media (max-width: 900px) {
          .coverflow-card {
            width: 260px;
            padding: 16px;
          }
          .section-main-title {
            font-size: 2.4rem;
          }
        }
      `}</style>
    </section>
  );
}

export default FeaturedItems;