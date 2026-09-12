import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Breadcrumbs, 
  Typography, 
  IconButton, 
  Tooltip, 
  Divider 
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import PersonIcon from '@mui/icons-material/Person';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import UpdateIcon from '@mui/icons-material/Update';

import cameraImg from '../assets/hero_camera.jpg';

const DEMO_SERVICES_DICT = {
  "demo-service-1": {
    _id: "demo-service-1",
    serviceName: "Laptop Repair & OS Servicing",
    providerName: "Rahul Sharma",
    category: "Tech Support",
    price: 299,
    priceUnit: "service",
    rating: 4.9,
    reviewsCount: 54,
    description: "Complete diagnostic, hardware cleaning, thermal paste replacement, and OS speedup for laptops & PCs. 24-hour turnaround guaranteed.",
    tags: ["LaptopRepair", "RAMUpgrade", "VirusRemoval", "SSDInstall"],
    experienceYears: "3+",
    teamMembers: "2",
    updatedAt: new Date().toISOString(),
    image: "https://images.unsplash.com/photo-1588702547919-26088e609072?w=600&auto=format&fit=crop&q=60"
  },
  "demo-service-2": {
    _id: "demo-service-2",
    serviceName: "Academic Tutoring & Coding",
    providerName: "Priya Patel",
    category: "Academics",
    price: 499,
    priceUnit: "hr",
    rating: 4.8,
    reviewsCount: 88,
    description: "One-on-one tutoring in Data Structures, Java, C++, Python, and Web Development. Exam preparation and assignment guidance.",
    tags: ["DSA", "Python", "React", "ExamPrep"],
    experienceYears: "2+",
    teamMembers: "1",
    updatedAt: new Date().toISOString(),
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=60"
  },
  "demo-service-3": {
    _id: "demo-service-3",
    serviceName: "Campus Photography & Reels",
    providerName: "Aman Verma",
    category: "Media",
    price: 799,
    priceUnit: "session",
    rating: 5.0,
    reviewsCount: 32,
    description: "Professional portrait shoots, fest photography, and high-quality Instagram reel production with 4K color grading.",
    tags: ["Portrait", "EventPhoto", "Reels", "Lightroom"],
    experienceYears: "4+",
    teamMembers: "3",
    updatedAt: new Date().toISOString(),
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop&q=60"
  },
  "demo-service-4": {
    _id: "demo-service-4",
    serviceName: "Room Cleaning & Moving",
    providerName: "Vikram Singh",
    category: "Services",
    price: 349,
    priceUnit: "visit",
    rating: 4.7,
    reviewsCount: 65,
    description: "Hostel room deep cleaning, dust removal, bed sanitization, and heavy luggage moving assistance for semester transitions.",
    tags: ["RoomClean", "LuggageMove", "Sanitization"],
    experienceYears: "2+",
    teamMembers: "4",
    updatedAt: new Date().toISOString(),
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&auto=format&fit=crop&q=60"
  },
  "demo-service-5": {
    _id: "demo-service-5",
    serviceName: "Guitar & Music Lessons",
    providerName: "Neha Gupta",
    category: "Arts",
    price: 399,
    priceUnit: "hr",
    rating: 4.9,
    reviewsCount: 40,
    description: "Beginner to advanced acoustic & electric guitar classes. Learn chords, fingerstyle, rhythm, and your favorite songs quickly.",
    tags: ["Guitar", "Acoustic", "MusicTheory", "Chords"],
    experienceYears: "5+",
    teamMembers: "1",
    updatedAt: new Date().toISOString(),
    image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=600&auto=format&fit=crop&q=60"
  }
};

const ServiceDetails = ({ allServices = [] }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (id && DEMO_SERVICES_DICT[id]) {
      setService(DEMO_SERVICES_DICT[id]);
      return;
    }

    const found = allServices.find(item => item._id === id || item.id === id);
    if (found) {
      setService(found);
    } else if (DEMO_SERVICES_DICT[id]) {
      setService(DEMO_SERVICES_DICT[id]);
    } else if (allServices.length > 0) {
      setService(allServices[0]);
    } else {
      setService(DEMO_SERVICES_DICT["demo-service-1"]);
    }
  }, [id, allServices]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: service?.serviceName,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  if (!service) {
    return (
      <div className="detail-loading-screen">
        <div className="spinner"></div>
        <p>Loading Service Details...</p>
      </div>
    );
  }

  return (
    <div className="item-detail-page">
      <div className="item-detail-container">
        
        {/* Top Nav & Breadcrumbs - Symmetrical to IteamDetails */}
        <div className="detail-top-bar">
          <button className="btn-back-link" onClick={() => navigate(-1)}>
            <ArrowBackIcon fontSize="small" />
            <span>Back</span>
          </button>

          <Breadcrumbs separator="›" className="detail-breadcrumbs">
            <span onClick={() => navigate('/')} className="crumb-link">Home</span>
            <span onClick={() => navigate('/about')} className="crumb-link">Explore</span>
            <Typography className="crumb-current">{service.category || "Services"}</Typography>
          </Breadcrumbs>

          <div className="detail-action-buttons">
            <Tooltip title="Share Service">
              <IconButton onClick={handleShare} className="icon-action-btn">
                <ShareIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Save to Favorites">
              <IconButton onClick={() => setIsFavorite(!isFavorite)} className="icon-action-btn">
                {isFavorite ? <FavoriteIcon sx={{ color: '#e74c3c' }} fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
              </IconButton>
            </Tooltip>
          </div>
        </div>

        {/* Main Content Layout Grid - Identical 2-Column Structure */}
        <div className="detail-grid-layout">
          
          {/* Left Column: Visual Showcase Box & Provider Details */}
          <div className="detail-visual-col">
            <div className="image-showcase-box">
              <span className="condition-badge">
                VERIFIED SERVICE
              </span>

              <div className="image-wrapper">
                <img src={service.image || cameraImg} alt={service.serviceName || service.title} />
              </div>
            </div>

            {/* Provider Meta Bar */}
            <div className="visual-footer-bar">
              <div className="location-info">
                <PersonIcon sx={{ color: '#063b28', fontSize: 20 }} />
                <span>Provided by: <strong>{service.providerName || "Campus Expert"}</strong></span>
                <VerifiedUserIcon sx={{ color: '#063b28', fontSize: 18, ml: 1 }} />
              </div>
            </div>

            {/* Provider Metrics */}
            <div className="metrics-card-box">
              <div className="metric-item">
                <UpdateIcon sx={{ color: '#063b28', fontSize: 28 }} />
                <div>
                  <span className="metric-number">{service.experienceYears || "2+"}</span>
                  <span className="metric-label">Years Experience</span>
                </div>
              </div>

              <div className="metric-item">
                <PersonIcon sx={{ color: '#063b28', fontSize: 28 }} />
                <div>
                  <span className="metric-number">{service.teamMembers || "1-3"}</span>
                  <span className="metric-label">Team Members</span>
                </div>
              </div>
            </div>

            {/* Trust Seal Box */}
            <div className="trust-seal-box">
              <ShieldOutlinedIcon sx={{ color: '#063b28', fontSize: 28 }} />
              <div>
                <h4>UnityRent Service Assurance</h4>
                <p>100% money back guarantee if service is not completed as scheduled.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Information & Pricing Box */}
          <div className="detail-info-col">
            <div className="category-meta-row">
              <span className="category-tag">{service.category || "CAMPUS SERVICE"}</span>
              <div className="rating-row">
                <StarIcon sx={{ color: '#f7cb2c', fontSize: 18 }} />
                <span className="rating-score">{service.rating || 4.9}</span>
                <span className="rating-count">({service.reviewsCount || 45} verified reviews)</span>
              </div>
            </div>

            <h1 className="product-title">{service.serviceName || service.title}</h1>
            <p className="product-description">
              {service.description || "Professional campus service provided with high quality standards and verified student identity."}
            </p>

            {service.tags && service.tags.length > 0 && (
              <div className="tags-container">
                <span className="tags-label">Expertise:</span>
                <div className="tags-flex">
                  {service.tags.map(tag => (
                    <span key={tag} className="tag-chip">#{tag}</span>
                  ))}
                </div>
              </div>
            )}

            <Divider className="detail-divider" />

            {/* Pricing Box - Symmetrical to IteamDetails */}
            <div className="pricing-card-box">
              <div className="price-primary">
                <span className="currency">₹</span>
                <span className="amount">{service.price || 299}</span>
                <span className="per-unit">/{service.priceUnit || "service"}</span>
              </div>

              <div className="deposit-note">
                <VerifiedUserIcon sx={{ color: '#063b28', fontSize: 18 }} />
                <span>
                  Campus Quality Guarantee: <strong>No Hidden Fees</strong>
                </span>
              </div>
            </div>

            {/* Main Action CTAs */}
            <div className="cta-button-group">
              <button 
                className="btn-secure-item"
                onClick={() => navigate(`/bookservice/${service._id}`)}
              >
                <ShoppingBagOutlinedIcon fontSize="small" />
                <span>Book This Service Now</span>
              </button>

              <button 
                className="btn-contact-owner"
                onClick={() => alert("Provider Contact: Inquiry sent! Provider will message you on Chat.")}
              >
                <ChatOutlinedIcon fontSize="small" />
                <span>Contact Provider</span>
              </button>
            </div>

            <p className="detail-footer-note">
              ⚡ Guaranteed appointment slot • Verified student provider • 100% Satisfaction protection
            </p>
          </div>

        </div>

      </div>

      {/* Embedded Symmetrical CSS */}
      <style>{`
        .item-detail-page {
          min-height: 100vh;
          background: linear-gradient(180deg, #ffffff 0%, #f4faf8 50%, #ffffff 100%);
          padding: 30px 4% 80px;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .item-detail-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .detail-loading-screen {
          height: 80vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #063b28;
          font-weight: 700;
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #cce4db;
          border-top: 4px solid #063b28;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin-bottom: 16px;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Top Bar */
        .detail-top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 30px;
          flex-wrap: wrap;
          gap: 16px;
        }

        .btn-back-link {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #ffffff;
          border: 1px solid #d8e5e0;
          color: #063b28;
          padding: 8px 18px;
          border-radius: 50px;
          font-weight: 700;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px rgba(6, 59, 40, 0.04);
        }

        .btn-back-link:hover {
          background: #063b28;
          color: #ffffff;
          border-color: #063b28;
        }

        .crumb-link {
          color: #597a6e;
          font-weight: 600;
          cursor: pointer;
          transition: color 0.2s ease;
        }

        .crumb-link:hover {
          color: #063b28;
          text-decoration: underline;
        }

        .crumb-current {
          color: #063b28 !important;
          font-weight: 800 !important;
        }

        .detail-action-buttons {
          display: flex;
          gap: 10px;
        }

        .icon-action-btn {
          background: #ffffff !important;
          border: 1px solid #d8e5e0 !important;
          color: #063b28 !important;
          transition: all 0.2s ease !important;
        }

        .icon-action-btn:hover {
          background: #e6f5f0 !important;
          border-color: #063b28 !important;
        }

        /* Grid Layout */
        .detail-grid-layout {
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          gap: 50px;
          align-items: start;
        }

        @media (max-width: 900px) {
          .detail-grid-layout {
            grid-template-columns: 1fr;
            gap: 36px;
          }
        }

        /* Left Visual Column */
        .image-showcase-box {
          background: #ffffff;
          border-radius: 28px;
          padding: 40px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #eef4f1;
          box-shadow: 0 12px 35px rgba(6, 59, 40, 0.06);
          min-height: 380px;
        }

        .condition-badge {
          position: absolute;
          top: 20px;
          left: 20px;
          background: #063b28;
          color: #f7cb2c;
          padding: 6px 16px;
          border-radius: 50px;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .image-wrapper {
          width: 100%;
          max-height: 340px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .image-wrapper img {
          max-width: 100%;
          max-height: 340px;
          object-fit: cover;
          border-radius: 18px;
          filter: drop-shadow(0px 12px 20px rgba(6, 59, 40, 0.1));
          transition: transform 0.3s ease;
        }

        .image-showcase-box:hover img {
          transform: scale(1.03);
        }

        .visual-footer-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 18px;
          padding: 12px 18px;
          background: #ffffff;
          border-radius: 16px;
          border: 1px solid #eef4f1;
        }

        .location-info {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.88rem;
          color: #597a6e;
        }

        .location-info strong {
          color: #063b28;
        }

        .metrics-card-box {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin-top: 16px;
        }

        .metric-item {
          background: #ffffff;
          border: 1px solid #eef4f1;
          border-radius: 18px;
          padding: 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: 0 4px 14px rgba(6, 59, 40, 0.03);
        }

        .metric-number {
          display: block;
          font-size: 1.3rem;
          font-weight: 900;
          color: #063b28;
          line-height: 1;
        }

        .metric-label {
          font-size: 0.78rem;
          color: #597a6e;
          font-weight: 600;
        }

        .trust-seal-box {
          margin-top: 16px;
          background: #e6f5f0;
          border: 1px solid #bce2d5;
          padding: 18px 22px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .trust-seal-box h4 {
          margin: 0 0 4px;
          font-size: 0.95rem;
          font-weight: 800;
          color: #063b28;
        }

        .trust-seal-box p {
          margin: 0;
          font-size: 0.82rem;
          color: #3b5c50;
          line-height: 1.4;
        }

        /* Right Info Column */
        .category-meta-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
          flex-wrap: wrap;
          gap: 10px;
        }

        .category-tag {
          font-size: 0.78rem;
          font-weight: 800;
          color: #855b28;
          background: #f6eedf;
          padding: 5px 14px;
          border-radius: 50px;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .rating-row {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .rating-score {
          font-weight: 800;
          font-size: 0.95rem;
          color: #063b28;
        }

        .rating-count {
          font-size: 0.82rem;
          color: #7b8e87;
        }

        .product-title {
          font-family: 'Plus Jakarta Sans', 'Outfit', sans-serif;
          font-size: 2.6rem;
          font-weight: 800;
          color: #063b28;
          margin: 0 0 16px;
          line-height: 1.15;
          letter-spacing: -0.5px;
        }

        .product-description {
          font-size: 1.05rem;
          color: #436356;
          line-height: 1.7;
          margin: 0 0 20px;
        }

        .tags-container {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }

        .tags-label {
          font-size: 0.85rem;
          font-weight: 800;
          color: #063b28;
        }

        .tags-flex {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }

        .tag-chip {
          background: #f0f6f4;
          color: #063b28;
          border: 1px solid #d5e6e0;
          padding: 4px 12px;
          border-radius: 50px;
          font-size: 0.78rem;
          font-weight: 700;
        }

        .detail-divider {
          margin-bottom: 28px !important;
          border-color: #eef4f1 !important;
        }

        /* Pricing Card */
        .pricing-card-box {
          background: #ffffff;
          border: 1px solid #cce4db;
          border-radius: 24px;
          padding: 24px 28px;
          box-shadow: 0 10px 30px rgba(6, 59, 40, 0.05);
          margin-bottom: 30px;
        }

        .price-primary {
          display: flex;
          align-items: baseline;
          gap: 4px;
          margin-bottom: 12px;
        }

        .price-primary .currency {
          font-size: 1.6rem;
          font-weight: 800;
          color: #063b28;
        }

        .price-primary .amount {
          font-size: 2.8rem;
          font-weight: 900;
          color: #063b28;
          line-height: 1;
        }

        .price-primary .per-unit {
          font-size: 1rem;
          color: #597a6e;
          font-weight: 700;
          margin-left: 4px;
        }

        .deposit-note {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.88rem;
          color: #3b5c50;
          background: #f4faf8;
          padding: 10px 16px;
          border-radius: 12px;
        }

        .deposit-note strong {
          color: #063b28;
        }

        /* CTAs */
        .cta-button-group {
          display: flex;
          gap: 16px;
          margin-bottom: 20px;
        }

        @media (max-width: 600px) {
          .cta-button-group {
            flex-direction: column;
          }
        }

        .btn-secure-item {
          flex: 1.8;
          background-color: #063b28;
          color: #ffffff;
          border: none;
          padding: 16px 28px;
          border-radius: 50px;
          font-weight: 800;
          font-size: 1.05rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          cursor: pointer;
          box-shadow: 0 8px 22px rgba(6, 59, 40, 0.22);
          transition: all 0.25s ease;
        }

        .btn-secure-item:hover {
          background-color: #042b1d;
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(6, 59, 40, 0.3);
        }

        .btn-contact-owner {
          flex: 1;
          background-color: #ffffff;
          color: #063b28;
          border: 2px solid #063b28;
          padding: 16px 24px;
          border-radius: 50px;
          font-weight: 800;
          font-size: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .btn-contact-owner:hover {
          background-color: #e6f5f0;
          transform: translateY(-2px);
        }

        .detail-footer-note {
          text-align: center;
          font-size: 0.82rem;
          color: #7b8e87;
          margin: 0;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
};

export default ServiceDetails;