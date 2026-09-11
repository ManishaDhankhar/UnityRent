import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import cameraImg from '../../assets/hero_camera.jpg';
import headphonesImg from '../../assets/hero_headphones.jpg';
import ironImg from '../../assets/hero_iron.jpg';
import mouseImg from '../../assets/hero_mouse.jpg';
import bikeImg from '../../assets/hero_bicycle.jpg';
import './Hero.css';

const DEFAULT_HERO = {
  title: "Rent What You Need.\nEarn From What You Have.",
  subtitle: "UnityRent connects people within campuses to rent, lend, and share items with ease. List things you're not using, discover what you need nearby, and turn unused resources into extra income–all within a trusted local community.",
  buttonText: "Explore"
};

const Hero = () => {
  const navigate = useNavigate();
  const [heroData, setHeroData] = useState(DEFAULT_HERO);

  useEffect(() => {
    axios.get('http://localhost:8080/api/hero')
      .then(response => {
        if (response.data && response.data.title) {
          setHeroData(response.data);
        }
      })
      .catch(() => {
        // Seamless fallback to DEFAULT_HERO
      });
  }, []);

  return (
    <section className="hero-section">
      <div className="hero-container">
        {/* Left Column: Text & CTA */}
        <div className="hero-content">
          <h1 className="hero-title">
            Rent What You Need.<br />
            Earn From What You Have.
          </h1>
          <p className="hero-subtitle">
            {heroData.subtitle}
          </p>
          <div className="hero-cta">
            <button className="hero-explore-btn" onClick={() => navigate('/about')}>
              {heroData.buttonText || "Explore"}
            </button>
          </div>
        </div>

        {/* Right Column: Yellow Graphic & Image Collage */}
        <div className="hero-visual-wrapper">
          <div className="yellow-stepped-shape">
            <div className="step-block step-top"></div>
            <div className="step-block step-mid"></div>
            <div className="step-block step-base"></div>
          </div>

          {/* Floating Product Cards */}
          <div className="hero-card card-camera">
            <img src={cameraImg} alt="DSLR Camera" />
          </div>

          <div className="hero-card card-headphones">
            <img src={headphonesImg} alt="Yellow Headphones" />
          </div>

          <div className="hero-card card-iron">
            <img src={ironImg} alt="Steam Iron" />
          </div>

          <div className="hero-card card-mouse">
            <img src={mouseImg} alt="Wireless Mouse" />
          </div>

          <div className="hero-card card-bike">
            <img src={bikeImg} alt="Bicycle" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;