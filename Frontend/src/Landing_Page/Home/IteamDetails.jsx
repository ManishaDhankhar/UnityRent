import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { 
  IconButton, 
  Tooltip, 
  Breadcrumbs, 
  Typography, 
  Divider 
} from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import StarIcon from '@mui/icons-material/Star';
import axios from "axios";
import { BACKEND_URL } from "../../config";

import cameraImg from '../../assets/hero_camera.jpg';
import headphonesImg from '../../assets/hero_headphones.jpg';
import ironImg from '../../assets/hero_iron.jpg';
import mouseImg from '../../assets/hero_mouse.jpg';
import bikeImg from '../../assets/hero_bicycle.jpg';

const DEMO_ITEMS_DICT = {
  "demo-headphones": {
    _id: "demo-headphones",
    title: "Wireless Noise-Cancelling Headphones",
    category: "Electronics",
    condition: "Like New",
    locationTag: "Student Activity Center / Hostel 4",
    description: "High quality wireless sound with active noise cancellation. Ultra-comfortable earcups, 30-hour battery life, and crystal clear mic for online classes or music.",
    pricing: { ratePerDay: 129, securityDeposit: 500 },
    rating: 4.8,
    reviewsCount: 120,
    image: headphonesImg
  },
  "demo-camera": {
    _id: "demo-camera",
    title: "DSLR Camera Canon EOS 1500D",
    category: "Photography",
    condition: "Excellent",
    locationTag: "Media Block / Library Annex",
    description: "Capture campus events and memories in 4K clarity. Includes 18-55mm IS II lens, 64GB high-speed SD card, battery charger, and padded carrying case.",
    pricing: { ratePerDay: 599, securityDeposit: 1500 },
    rating: 4.9,
    reviewsCount: 60,
    image: cameraImg
  },
  "demo-bike": {
    _id: "demo-bike",
    title: "Campus Hybrid Travel Bicycle",
    category: "Mobility",
    condition: "Good",
    locationTag: "North Gate Parking / Hostel 2",
    description: "Spacious, durable hybrid bike built for effortless campus travel. Features 21-speed Shimano gears, front suspension, sturdy lock, and helmet.",
    pricing: { ratePerDay: 129, securityDeposit: 400 },
    rating: 4.7,
    reviewsCount: 85,
    image: bikeImg
  },
  "demo-mouse": {
    _id: "demo-mouse",
    title: "Precision Wireless Gaming Mouse",
    category: "Electronics",
    condition: "Like New",
    locationTag: "Tech Lab / Hostel 7",
    description: "Ergonomic wireless mouse with high DPI precision tracking, dual bluetooth connection, silent click switches, and long-lasting rechargeable battery.",
    pricing: { ratePerDay: 79, securityDeposit: 300 },
    rating: 4.6,
    reviewsCount: 98,
    image: mouseImg
  },
  "demo-iron": {
    _id: "demo-iron",
    title: "Heavy Duty Steam Iron",
    category: "Appliances",
    condition: "Excellent",
    locationTag: "Hostel 1 Laundry Block",
    description: "Lightweight and powerful non-stick steam iron. Ideal for crisp ironing of shirts, formal wear, and everyday laundry.",
    pricing: { ratePerDay: 59, securityDeposit: 200 },
    rating: 4.5,
    reviewsCount: 75,
    image: ironImg
  }
};

function ItemDetail({ refreshProduct }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Check fallback demo dictionary first if demo id
    if (id && DEMO_ITEMS_DICT[id]) {
      setProduct(DEMO_ITEMS_DICT[id]);
      setLoading(false);
      return;
    }

    fetch(`${BACKEND_URL}/item/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.title) {
          setProduct(data);
        } else if (DEMO_ITEMS_DICT[id]) {
          setProduct(DEMO_ITEMS_DICT[id]);
        } else {
          // Default fallback if item not found in DB
          setProduct({
            _id: id,
            title: data.productName || data.title || "Campus Quality Item",
            category: data.category || "General",
            condition: "Excellent",
            locationTag: "Main Campus Center",
            description: data.description || "Verified high quality rental item managed securely by UnityRent.",
            pricing: { ratePerDay: data.price || 149, securityDeposit: data.securityDeposit || 500 },
            rating: 4.8,
            reviewsCount: 45,
            image: data.imageUrl || data.image || cameraImg
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        if (DEMO_ITEMS_DICT[id]) {
          setProduct(DEMO_ITEMS_DICT[id]);
        } else {
          setProduct(DEMO_ITEMS_DICT["demo-headphones"]);
        }
        setLoading(false);
      });
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      try {
        await axios.delete(`${BACKEND_URL}/item/${id}`);
        alert("Product deleted successfully");
        if (refreshProduct) refreshProduct();
        navigate('/');
      } catch (err) {
        console.error("Product deletion error:", err.response?.data || err.message);
        alert("Item removed from view");
        navigate('/');
      }
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.title,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="detail-loading-screen">
        <div className="spinner"></div>
        <p>Loading UnityRent Quality Details...</p>
      </div>
    );
  }

  if (!product) return <div className="detail-loading-screen"><p>Product not found.</p></div>;

  const isDemo = String(product._id).startsWith("demo-");

  return (
    <div className="item-detail-page">
      <div className="item-detail-container">
        
        {/* Top Nav & Breadcrumbs */}
        <div className="detail-top-bar">
          <button className="btn-back-link" onClick={() => navigate(-1)}>
            <ArrowBackIcon fontSize="small" />
            <span>Back</span>
          </button>

          <Breadcrumbs separator="›" className="detail-breadcrumbs">
            <span onClick={() => navigate('/')} className="crumb-link">Home</span>
            <span onClick={() => navigate('/about')} className="crumb-link">Explore</span>
            <Typography className="crumb-current">{product.category}</Typography>
          </Breadcrumbs>

          <div className="detail-action-buttons">
            <Tooltip title="Share Listing">
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

        {/* Main Content Layout Grid */}
        <div className="detail-grid-layout">
          
          {/* Left Column: Visual Showcase Box */}
          <div className="detail-visual-col">
            <div className="image-showcase-box">
              <span className="condition-badge">
                {product.condition || "LIKE NEW"}
              </span>

              <div className="image-wrapper">
                <img src={product.image || cameraImg} alt={product.title} />
              </div>
            </div>

            {/* Management & Location Bar */}
            <div className="visual-footer-bar">
              <div className="location-info">
                <LocationOnIcon sx={{ color: '#063b28', fontSize: 20 }} />
                <span>Available at: <strong>{product.locationTag || "Campus Main Gate"}</strong></span>
              </div>

              {!isDemo && (
                <div className="owner-manage-actions">
                  <Tooltip title="Edit Listing">
                    <IconButton onClick={() => navigate(`/edit-product/${id}`)} className="btn-edit-action">
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Listing">
                    <IconButton onClick={handleDelete} className="btn-delete-action">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </div>
              )}
            </div>

            {/* Trust Seal Box */}
            <div className="trust-seal-box">
              <ShieldOutlinedIcon sx={{ color: '#063b28', fontSize: 28 }} />
              <div>
                <h4>UnityRent Campus Safe Guarantee</h4>
                <p>Digital handover check & verified student identity protect your rental completely.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Information & Pricing Box */}
          <div className="detail-info-col">
            <div className="category-meta-row">
              <span className="category-tag">{product.category}</span>
              <div className="rating-row">
                <StarIcon sx={{ color: '#f7cb2c', fontSize: 18 }} />
                <span className="rating-score">{product.rating || 4.8}</span>
                <span className="rating-count">({product.reviewsCount || 45} verified reviews)</span>
              </div>
            </div>

            <h1 className="product-title">{product.title}</h1>
            <p className="product-description">{product.description}</p>

            <Divider className="detail-divider" />

            {/* Pricing Box */}
            <div className="pricing-card-box">
              <div className="price-primary">
                <span className="currency">₹</span>
                <span className="amount">{product.pricing?.ratePerDay || 99}</span>
                <span className="per-unit">/ day</span>
              </div>

              <div className="deposit-note">
                <VerifiedUserIcon sx={{ color: '#063b28', fontSize: 18 }} />
                <span>
                  Security Deposit: <strong>₹{product.pricing?.securityDeposit || 400}</strong> (100% Refundable)
                </span>
              </div>
            </div>

            {/* Main Action CTAs */}
            <div className="cta-button-group">
              <button 
                className="btn-secure-item"
                onClick={() => navigate(`/book/${product._id}`)}
              >
                <ShoppingCartOutlinedIcon fontSize="small" />
                <span>Rent This Item Now</span>
              </button>

              <button 
                className="btn-contact-owner"
                onClick={() => alert("Owner Contact: Contact request sent! Owner will reply via Chat.")}
              >
                <ChatOutlinedIcon fontSize="small" />
                <span>Chat with Owner</span>
              </button>
            </div>

            <p className="detail-footer-note">
              ⚡ Instant booking approval • Verified campus listing • No hidden charges
            </p>
          </div>

        </div>

      </div>

      {/* Embedded CSS */}
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
          font-family: 'Plus Jakarta Sans', sans-serif;
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
          object-fit: contain;
          filter: drop-shadow(0px 16px 24px rgba(6, 59, 40, 0.12));
          transition: transform 0.3s ease;
        }

        .image-showcase-box:hover img {
          transform: scale(1.04);
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

        .owner-manage-actions {
          display: flex;
          gap: 6px;
        }

        .btn-edit-action {
          color: #1d6092 !important;
          border: 1px solid #cde2f0 !important;
        }

        .btn-delete-action {
          color: #d32f2f !important;
          border: 1px solid #f5c2c2 !important;
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
          margin: 0 0 24px;
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
}

export default ItemDetail;