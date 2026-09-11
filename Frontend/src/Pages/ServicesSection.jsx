import React, { useState, useMemo } from 'react';
import { useNavigate } from "react-router-dom";
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const DEMO_SERVICES = [
  {
    _id: "demo-service-1",
    serviceName: "Laptop Repair & Servicing",
    providerName: "Rahul Sharma",
    category: "Tech Support",
    badge: "TOP RATED",
    badgeBg: "#e6f5f0",
    badgeColor: "#063b28",
    price: 299,
    priceUnit: "service",
    rating: 4.9,
    reviewsCount: 54,
    image: "https://images.unsplash.com/photo-1588702547919-26088e609072?w=500&auto=format&fit=crop&q=60"
  },
  {
    _id: "demo-service-2",
    serviceName: "Academic Tutoring & Coding",
    providerName: "Priya Patel",
    category: "Academics",
    badge: "FEATURED",
    badgeBg: "#f6eedf",
    badgeColor: "#855b28",
    price: 499,
    priceUnit: "hr",
    rating: 4.8,
    reviewsCount: 88,
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&auto=format&fit=crop&q=60"
  },
  {
    _id: "demo-service-3",
    serviceName: "Campus Photography & Reels",
    providerName: "Aman Verma",
    category: "Media",
    badge: "POPULAR",
    badgeBg: "#e3f0f8",
    badgeColor: "#1d6092",
    price: 799,
    priceUnit: "session",
    rating: 5.0,
    reviewsCount: 32,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop&q=60"
  },
  {
    _id: "demo-service-4",
    serviceName: "Room Cleaning & Moving",
    providerName: "Vikram Singh",
    category: "Services",
    badge: "VERIFIED",
    badgeBg: "#f5e8e8",
    badgeColor: "#9c3232",
    price: 349,
    priceUnit: "visit",
    rating: 4.7,
    reviewsCount: 65,
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&auto=format&fit=crop&q=60"
  },
  {
    _id: "demo-service-5",
    serviceName: "Guitar & Music Lessons",
    providerName: "Neha Gupta",
    category: "Arts",
    badge: "NEW",
    badgeBg: "#f5f0e3",
    badgeColor: "#7e621d",
    price: 399,
    priceUnit: "hr",
    rating: 4.9,
    reviewsCount: 40,
    image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&auto=format&fit=crop&q=60"
  }
];

const ServicesSection = ({ services, title, loading, showButton }) => {
  const navigate = useNavigate();

  const serviceList = useMemo(() => {
    if (services && services.length >= 5) return services;
    if (services && services.length > 0) {
      return [...services, ...DEMO_SERVICES.slice(0, 5 - services.length)];
    }
    return DEMO_SERVICES;
  }, [services]);

  const [activeIndex, setActiveIndex] = useState(Math.floor(serviceList.length / 2));
  const [favorites, setFavorites] = useState({});

  const toggleFavorite = (e, id) => {
    e.stopPropagation();
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCardClick = (id, index) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
    } else {
      navigate(`/service/${id}`);
    }
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % serviceList.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + serviceList.length) % serviceList.length);
  };

  if (loading) return <div className="loader">Loading Services...</div>;

  return (
    <section className="featured-services-carousel-section">
      {/* Header Section */}
      <div className="section-header">
        <span className="section-subtitle">OUR SERVICES</span>
        <h2 className="section-main-title">{title || "Featured Services"}</h2>
        <p className="section-desc">Explore top-rated skills & services from campus experts</p>
      </div>

      {/* 3D Coverflow Carousel Wrapper */}
      <div className="carousel-wrapper">
        {/* Left Nav Arrow */}
        <button className="carousel-arrow arrow-left" onClick={prevSlide} aria-label="Previous service">
          <ChevronLeftIcon />
        </button>

        {/* Cards Track */}
        <div className="carousel-track">
          {serviceList.map((item, index) => {
            const offset = index - activeIndex;
            const isActive = offset === 0;

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

            const badgeText = item.badge || (index % 2 === 0 ? "TOP RATED" : "FEATURED");
            const badgeBg = item.badgeBg || (index % 2 === 0 ? "#e6f5f0" : "#f6eedf");
            const badgeColor = item.badgeColor || (index % 2 === 0 ? "#063b28" : "#855b28");

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

                {/* Service Image */}
                <div className="card-image-box">
                  <img src={item.image} alt={item.serviceName || item.title} />
                </div>

                {/* Pagination Dots Below Image */}
                <div className="card-image-dots">
                  <span className="dot dot-active"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>

                {/* Content Section */}
                <div className="card-info">
                  <h3 className="card-title">{item.serviceName || item.title}</h3>
                  <p className="card-provider">
                    By: {item.providerName || "Campus Expert"}
                  </p>

                  {/* Rating */}
                  <div className="card-rating">
                    <span className="star">★</span>
                    <span className="rating-num">{item.rating || 4.9}</span>
                    <span className="reviews-count">({item.reviewsCount || 45})</span>
                  </div>

                  {/* Price & CTA Row */}
                  <div className="card-footer-row">
                    <div className="card-price">
                      ₹{item.price || 299}
                      <small>/{item.priceUnit || "service"}</small>
                    </div>

                    {isActive ? (
                      <button
                        className="btn-rent-now"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/service/${item._id}`);
                        }}
                      >
                        <ShoppingBagOutlinedIcon fontSize="small" />
                        <span>Book Service</span>
                      </button>
                    ) : (
                      <button
                        className="btn-cart-icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveIndex(index);
                        }}
                      >
                        <ShoppingBagOutlinedIcon fontSize="small" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Nav Arrow */}
        <button className="carousel-arrow arrow-right" onClick={nextSlide} aria-label="Next service">
          <ChevronRightIcon />
        </button>
      </div>

      {/* Bottom Pagination Dots */}
      <div className="carousel-dots-nav">
        {serviceList.map((_, i) => (
          <span
            key={i}
            className={`nav-dot ${i === activeIndex ? 'active' : ''}`}
            onClick={() => setActiveIndex(i)}
          ></span>
        ))}
      </div>

      {showButton !== false && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
          <button 
            className="explore-more-btn"
            onClick={() => navigate('/allservices')}
            style={{
              padding: '16px 48px',
              borderRadius: '50px',
              color: '#063b28',
              backgroundColor: '#ffffff',
              border: '2px solid #063b28',
              cursor: 'pointer',
              fontWeight: '800',
              fontSize: '1.05rem',
              boxShadow: '0 8px 20px rgba(6, 59, 40, 0.08)',
              transition: 'all 0.3s ease'
            }}
          >
            Explore More Services →
          </button>
        </div>
      )}

      {/* Embedded CSS for Services Carousel */}
      <style>{`
        .featured-services-carousel-section {
          padding: 70px 4%;
          background: linear-gradient(180deg, #ffffff 0%, #f4faf8 50%, #f8fbf9 100%);
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
          color: #063b28;
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
          overflow: hidden;
        }

        .card-image-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
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
          background: #063b28;
        }

        /* Info Section */
        .card-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 1.2rem;
          font-weight: 800;
          color: #063b28;
          margin: 0 0 4px;
          line-height: 1.25;
        }

        .card-provider {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.85rem;
          color: #597a6e;
          margin: 0 0 14px;
          font-weight: 600;
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
          width: 100%;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: 2px solid #063b28;
          background: transparent;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .nav-dot.active {
          width: 14px;
          height: 14px;
          background: #063b28;
        }

        .explore-more-btn:hover {
          background-color: #063b28 !important;
          color: white !important;
          transform: translateY(-2px);
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
};

export default ServicesSection;