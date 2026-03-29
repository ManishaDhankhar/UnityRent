import React,{useState,useEffect} from 'react';
import heroImg from "../../assets/student.png";
import axios from 'axios';
import "./Hero.css";

const Hero=()=>{
    const [heroData,setHeroData]=useState(null);

useEffect(() => {
    // Calling the API route you just created in app.js
    axios.get('http://localhost:8080/api/hero')
      .then(response => {
        setHeroData(response.data);
      })
      .catch(error => {
        console.error("Error fetching hero data:", error);
      });
  }, []);

  if (!heroData) return <div className="loader">Loading UnityRent...</div>;

  return (
    <div className="hero-container">
      <div className="hero-content">
        <h1 className="hero-title">{heroData.title}</h1>
        <p className="hero-subtitle">{heroData.subtitle}</p>
        
        <div className="hero-search-wrapper">
          <input 
            type="text" 
            placeholder="Find your equipment here" 
            className="hero-input"
          />
          <button className="hero-btn">{heroData.buttonText}</button>
        </div>
      </div>
      
      <div className="hero-image-container">
        {/* This URL comes directly from your MongoDB Banner collection */}
        <img src={heroImg} alt="Campus Rental Essentials" />
      </div>
    </div>
  );
};

export default Hero;