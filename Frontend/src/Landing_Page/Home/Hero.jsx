import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
  PlusCircle,
  Zap,
  Laptop,
  Camera,
  BookOpen,
  Award
} from 'lucide-react';
import heroImg from "../../assets/hero3.png";
import axios from 'axios';
import "./Hero.css";

const Hero = () => {
  const navigate = useNavigate();
  const [heroData, setHeroData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    axios.get('http://localhost:8080/api/hero')
      .then(response => {
        setHeroData(response.data);
      })
      .catch(error => {
        console.warn("Backend hero data fallback engaged:", error.message);
      });
  }, []);

  const handleSearch = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      if (searchQuery.trim()) {
        navigate(`/about?search=${encodeURIComponent(searchQuery)}`);
      } else {
        navigate('/about');
      }
    }
  };

  const tagSuggestions = [
    { name: 'DSLR Cameras', icon: <Camera size={14} /> },
    { name: 'Laptops', icon: <Laptop size={14} /> },
    { name: 'Lab Gear', icon: <BookOpen size={14} /> },
    { name: 'Project Tools', icon: <Zap size={14} /> }
  ];

  return (
    <div className="hero-section-wrapper">
      {/* Background Animated Gradient Orbs */}
      <motion.div
        className="hero-glow-orb orb-1"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.35, 0.55, 0.35],
          x: [0, 30, 0],
          y: [0, -30, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="hero-glow-orb orb-2"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.25, 0.45, 0.25],
          x: [0, -40, 0],
          y: [0, 40, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="hero-grid-pattern" />

      <div className="hero-container">
        {/* LEFT COLUMN: HERO TEXT & SEARCH */}
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Badge */}
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Sparkles size={16} className="badge-sparkle" />
            <span>Campus Exclusive P2P Marketplace</span>
            <span className="badge-pill-new">NEW</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Turn Hostel Clutter Into{" "}
            <span className="hero-gradient-text">Passive Income</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {heroData?.subtitle ||
              "UnityRent connects university students to safely rent cameras, laptops, lab gear, and hostel essentials. Earn money from unused items or rent equipment hyper-locally."}
          </motion.p>

          {/* Interactive Search Bar */}
          <motion.div
            className="hero-search-card"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <div className="search-input-group">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder="Search cameras, laptops, lab tools..."
                className="hero-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
              />
            </div>
            <button className="hero-btn-primary" onClick={handleSearch}>
              <span>{heroData?.buttonText || "Search Gear"}</span>
              <ArrowRight size={18} />
            </button>
          </motion.div>

          {/* Tag Suggestions */}
          <motion.div
            className="hero-tags-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <span className="tags-label">Popular:</span>
            <div className="tags-list">
              {tagSuggestions.map((tag, index) => (
                <button
                  key={index}
                  className="tag-btn"
                  onClick={() => navigate(`/about?search=${encodeURIComponent(tag.name)}`)}
                >
                  {tag.icon}
                  <span>{tag.name}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            className="hero-cta-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <button className="btn-explore" onClick={() => navigate('/about')}>
              <Search size={18} />
              <span>Explore Catalog</span>
            </button>
            <button className="btn-list-item" onClick={() => navigate('/add-product')}>
              <PlusCircle size={18} />
              <span>List Your Item</span>
            </button>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN: HERO IMAGE & ANIMATED FLOATING BADGES */}
        <motion.div
          className="hero-image-column"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <div className="hero-image-wrapper">
            {/* Animated Glow Backdrop Ring */}
            <motion.div
              className="glowing-ring"
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            />

            {/* Main Student Image */}
            <motion.img
              src={heroImg}
              alt="Campus Rental Essentials"
              className="hero-main-img"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Floating Badge 1: Earnings */}
            <motion.div
              className="floating-card card-top-right"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
              transition={{
                x: { delay: 0.6, duration: 0.6 },
                y: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
              }}
            >
              <div className="card-icon icon-green">
                <TrendingUp size={20} />
              </div>
              <div className="card-text">
                <span className="card-title">₹3,500+ Avg. Earnings</span>
                <span className="card-subtitle">Per month for student owners</span>
              </div>
            </motion.div>

            {/* Floating Badge 2: Verified Campus */}
            <motion.div
              className="floating-card card-bottom-left"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0, y: [0, 8, 0] }}
              transition={{
                x: { delay: 0.8, duration: 0.6 },
                y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }
              }}
            >
              <div className="card-icon icon-purple">
                <ShieldCheck size={20} />
              </div>
              <div className="card-text">
                <span className="card-title">100% Student Verified</span>
                <span className="card-subtitle">Safe hostel pick-up & delivery</span>
              </div>
            </motion.div>

            {/* Floating Badge 3: Fast Booking */}
            <motion.div
              className="floating-card card-bottom-right"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: [0, -6, 0] }}
              transition={{
                y: { duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 1.5 }
              }}
            >
              <div className="card-icon icon-amber">
                <Award size={20} />
              </div>
              <div className="card-text">
                <span className="card-title">Top Rated Campus Gear</span>
                <span className="card-subtitle">Cameras, laptops, lab items</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;