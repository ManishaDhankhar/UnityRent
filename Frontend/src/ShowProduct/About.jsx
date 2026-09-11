import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FilterListIcon from '@mui/icons-material/FilterList';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import StarIcon from '@mui/icons-material/Star';

import cameraImg from '../assets/hero_camera.jpg';
import headphonesImg from '../assets/hero_headphones.jpg';
import ironImg from '../assets/hero_iron.jpg';
import mouseImg from '../assets/hero_mouse.jpg';
import bikeImg from '../assets/hero_bicycle.jpg';

// Categories list matching reference bar
const CATEGORIES = [
  'All',
  'Books & Stationery',
  'Electronics & Tech',
  'Clothing & Accessories',
  'Sports & Fitness',
  'Tools & Hardware',
  'Cameras & Photography',
  'Camping & Outdoor',
  'Musical Instruments',
  'Home Appliances',
  'Vehicles & Cycles'
];

// Rich fallback items for demonstration parity with reference image
const DEMO_ITEMS = [
  {
    _id: "demo-item-bag",
    title: "Vintage Leather Travel Bag",
    category: "Clothing & Accessories",
    badge: "CLOTHING & ACCESSORIES",
    badgeBg: "#f5e8e8",
    badgeColor: "#9c3232",
    description: "Premium durable leather duffel bag ideal for weekend trips.",
    pricing: { ratePerDay: 149 },
    rating: 4.8,
    reviewsCount: 64,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=60"
  },
  {
    _id: "demo-item-canon",
    title: "Canon EOS 1500D DSLR",
    category: "Cameras & Photography",
    badge: "CAMERAS & PHOTOGRAPHY",
    badgeBg: "#e6f5f0",
    badgeColor: "#063b28",
    description: "Canon EOS 1500D with 18-55mm lens in excellent condition.",
    pricing: { ratePerDay: 599 },
    rating: 4.9,
    reviewsCount: 110,
    image: cameraImg
  },
  {
    _id: "demo-item-iphone",
    title: "Apple iPhone 15 Pro",
    category: "Electronics & Tech",
    badge: "ELECTRONICS & TECH",
    badgeBg: "#e3f0f8",
    badgeColor: "#1d6092",
    description: "256 GB Titanium Blue, battery health 98%, ready for rent.",
    pricing: { ratePerDay: 899 },
    rating: 4.9,
    reviewsCount: 85,
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=600&auto=format&fit=crop&q=60"
  },
  {
    _id: "demo-item-raspi",
    title: "Raspberry Pi Zero Kit + Micro SD",
    category: "Tools & Hardware",
    badge: "TOOLS & HARDWARE",
    badgeBg: "#f6eedf",
    badgeColor: "#855b28",
    description: "Complete IoT starter kit with micro SD pre-loaded with OS.",
    pricing: { ratePerDay: 99 },
    rating: 4.7,
    reviewsCount: 42,
    image: "https://images.unsplash.com/photo-1608564697071-ddf911d81370?w=600&auto=format&fit=crop&q=60"
  },
  {
    _id: "demo-item-headphones",
    title: "Sony Noise Cancelling Headphones",
    category: "Electronics & Tech",
    badge: "ELECTRONICS & TECH",
    badgeBg: "#e6f5f0",
    badgeColor: "#063b28",
    description: "High-end wireless noise cancelling headphones with mic.",
    pricing: { ratePerDay: 199 },
    rating: 4.8,
    reviewsCount: 120,
    image: headphonesImg
  },
  {
    _id: "demo-item-bike",
    title: "Campus Hybrid Bicycle",
    category: "Vehicles & Cycles",
    badge: "VEHICLES & CYCLES",
    badgeBg: "#e3f0f8",
    badgeColor: "#1d6092",
    description: "Lightweight 21-speed gear bike with lock and helmet.",
    pricing: { ratePerDay: 129 },
    rating: 4.7,
    reviewsCount: 95,
    image: bikeImg
  },
  {
    _id: "demo-item-tent",
    title: "4-Person Camping Tent & Bag",
    category: "Camping & Outdoor",
    badge: "CAMPING & OUTDOOR",
    badgeBg: "#f5f0e3",
    badgeColor: "#7e621d",
    description: "Waterproof instant popup tent with double sleeping bag.",
    pricing: { ratePerDay: 349 },
    rating: 4.8,
    reviewsCount: 50,
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&auto=format&fit=crop&q=60"
  },
  {
    _id: "demo-item-guitar",
    title: "Yamaha Acoustic Guitar F310",
    category: "Musical Instruments",
    badge: "MUSICAL INSTRUMENTS",
    badgeBg: "#f5e8e8",
    badgeColor: "#9c3232",
    description: "Rich resonant tone acoustic guitar with padded carry bag.",
    pricing: { ratePerDay: 249 },
    rating: 4.9,
    reviewsCount: 78,
    image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=600&auto=format&fit=crop&q=60"
  }
];

const DEMO_SERVICES = [
  {
    _id: "demo-serv-1",
    serviceName: "Laptop Repair & OS Servicing",
    providerName: "Rahul Sharma",
    category: "Electronics & Tech",
    badge: "TECH SUPPORT",
    badgeBg: "#e6f5f0",
    badgeColor: "#063b28",
    price: 299,
    priceUnit: "service",
    rating: 4.9,
    reviewsCount: 54,
    image: "https://images.unsplash.com/photo-1588702547919-26088e609072?w=600&auto=format&fit=crop&q=60"
  },
  {
    _id: "demo-serv-2",
    serviceName: "Academic Tutoring & Coding",
    providerName: "Priya Patel",
    category: "Books & Stationery",
    badge: "ACADEMICS",
    badgeBg: "#f6eedf",
    badgeColor: "#855b28",
    price: 499,
    priceUnit: "hr",
    rating: 4.8,
    reviewsCount: 88,
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=60"
  },
  {
    _id: "demo-serv-3",
    serviceName: "Campus Photography & Reels",
    providerName: "Aman Verma",
    category: "Cameras & Photography",
    badge: "MEDIA",
    badgeBg: "#e3f0f8",
    badgeColor: "#1d6092",
    price: 799,
    priceUnit: "session",
    rating: 5.0,
    reviewsCount: 32,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop&q=60"
  },
  {
    _id: "demo-serv-4",
    serviceName: "Room Cleaning & Moving",
    providerName: "Vikram Singh",
    category: "Home Appliances",
    badge: "SERVICES",
    badgeBg: "#f5e8e8",
    badgeColor: "#9c3232",
    price: 349,
    priceUnit: "visit",
    rating: 4.7,
    reviewsCount: 65,
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&auto=format&fit=crop&q=60"
  }
];

const DEMO_PROPERTIES = [
  {
    _id: "demo-prop-1",
    title: "1BHK Furnished Student Flat",
    location: "Campus North Gate (5 mins walk)",
    category: "Home Appliances",
    badge: "HOUSING",
    badgeBg: "#e6f5f0",
    badgeColor: "#063b28",
    pricing: { ratePerDay: 1200 },
    rating: 4.9,
    reviewsCount: 38,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&auto=format&fit=crop&q=60"
  },
  {
    _id: "demo-prop-2",
    title: "Private Study Room & Desk Space",
    location: "Library Block Annex",
    category: "Books & Stationery",
    badge: "WORKSPACE",
    badgeBg: "#f6eedf",
    badgeColor: "#855b28",
    pricing: { ratePerDay: 250 },
    rating: 4.8,
    reviewsCount: 22,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop&q=60"
  },
  {
    _id: "demo-prop-3",
    title: "Secure Bike & Luggage Storage Spot",
    location: "Hostel Basement Garage",
    category: "Vehicles & Cycles",
    badge: "STORAGE",
    badgeBg: "#e3f0f8",
    badgeColor: "#1d6092",
    pricing: { ratePerDay: 80 },
    rating: 4.7,
    reviewsCount: 19,
    image: "https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=600&auto=format&fit=crop&q=60"
  }
];

const About = ({ allProducts = [], allServices = [] }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // State management
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeTab, setActiveTab] = useState('items'); // 'items' | 'services' | 'properties'
  const [searchQuery, setSearchQuery] = useState('');
  const [filterInput, setFilterInput] = useState('');
  const [favorites, setFavorites] = useState({});

  // Sync category or filter from URL query param if present
  useEffect(() => {
    window.scrollTo(0, 0);
    const catParam = searchParams.get('cat');
    const filterParam = searchParams.get('filter');

    if (catParam) {
      if (catParam.includes('elec')) setSelectedCategory('Electronics & Tech');
      else if (catParam.includes('cycle')) setSelectedCategory('Vehicles & Cycles');
      else if (catParam.includes('appliance')) setSelectedCategory('Home Appliances');
      else if (catParam.includes('book')) setSelectedCategory('Books & Stationery');
    }
    if (filterParam) {
      setSearchQuery(filterParam === 'new' ? 'New' : filterParam === 'deals' ? 'Deal' : filterParam);
    }
  }, [searchParams]);

  // Combine prop products with demo products to ensure rich view
  const combinedProducts = useMemo(() => {
    if (allProducts && allProducts.length > 0) {
      const formattedProps = allProducts.map(p => ({
        _id: p._id || p.id,
        title: p.title || p.productName || "Campus Item",
        category: p.category || "General",
        badge: (p.category || "FEATURED").toUpperCase(),
        badgeBg: "#e6f5f0",
        badgeColor: "#063b28",
        description: p.description || "High quality rental item available on campus.",
        pricing: p.pricing || { ratePerDay: p.price || 99 },
        rating: p.rating || 4.8,
        reviewsCount: p.reviewsCount || 45,
        image: p.image || p.imageUrl || cameraImg
      }));
      return [...formattedProps, ...DEMO_ITEMS];
    }
    return DEMO_ITEMS;
  }, [allProducts]);

  const combinedServices = useMemo(() => {
    if (allServices && allServices.length > 0) {
      return [...allServices, ...DEMO_SERVICES];
    }
    return DEMO_SERVICES;
  }, [allServices]);

  const toggleFavorite = (e, id) => {
    e.stopPropagation();
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Filtered lists
  const filteredProducts = useMemo(() => {
    return combinedProducts.filter(item => {
      const matchCategory = selectedCategory === 'All' || 
        (item.category && item.category.toLowerCase().includes(selectedCategory.toLowerCase().split(' ')[0]));
      const matchSearch = !searchQuery || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [combinedProducts, selectedCategory, searchQuery]);

  const filteredServices = useMemo(() => {
    return combinedServices.filter(serv => {
      const title = serv.serviceName || serv.title || "";
      const cat = serv.category || "";
      const matchCategory = selectedCategory === 'All' || 
        cat.toLowerCase().includes(selectedCategory.toLowerCase().split(' ')[0]);
      const matchSearch = !searchQuery || title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [combinedServices, selectedCategory, searchQuery]);

  const filteredProperties = useMemo(() => {
    return DEMO_PROPERTIES.filter(prop => {
      const matchCategory = selectedCategory === 'All' || 
        prop.category.toLowerCase().includes(selectedCategory.toLowerCase().split(' ')[0]);
      const matchSearch = !searchQuery || prop.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(filterInput);
  };

  return (
    <div className="explore-page-wrapper">
      <div className="explore-container">

        {/* 1. Category Chips Bar */}
        <div className="category-bar-wrapper">
          <div className="category-chips-scroll">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`category-chip ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="category-accent-line"></div>
        </div>

        {/* 2. Search & Filter Card Box */}
        <div className="search-filter-card">
          <form className="search-form" onSubmit={handleSearchSubmit}>
            <div className="search-input-wrapper">
              <SearchOutlinedIcon className="search-icon" />
              <input
                type="text"
                placeholder="Search for anything..."
                value={filterInput}
                onChange={(e) => setFilterInput(e.target.value)}
                className="search-input"
              />
            </div>

            <button
              type="button"
              className="btn-filter-toggle"
              onClick={() => {
                if (filterInput) {
                  setFilterInput('');
                  setSearchQuery('');
                }
              }}
            >
              <FilterListIcon fontSize="small" />
              <span>{searchQuery ? `Clear Filter` : `Filters`}</span>
            </button>

            <button type="submit" className="btn-search-submit">
              Search
            </button>
          </form>
        </div>

        {/* 3. Sub-Navigation Type Tabs */}
        <div className="type-tabs-container">
          <button
            className={`type-tab ${activeTab === 'items' ? 'active' : ''}`}
            onClick={() => setActiveTab('items')}
          >
            <Inventory2OutlinedIcon className="tab-icon" />
            <span>Items</span>
            <small className="tab-count">({filteredProducts.length})</small>
          </button>

          <button
            className={`type-tab ${activeTab === 'services' ? 'active' : ''}`}
            onClick={() => setActiveTab('services')}
          >
            <ShoppingBagOutlinedIcon className="tab-icon" />
            <span>Services</span>
            <small className="tab-count">({filteredServices.length})</small>
          </button>

          <button
            className={`type-tab ${activeTab === 'properties' ? 'active' : ''}`}
            onClick={() => setActiveTab('properties')}
          >
            <HomeOutlinedIcon className="tab-icon" />
            <span>Properties</span>
            <small className="tab-count">({filteredProperties.length})</small>
          </button>
        </div>

        {/* 4. Products / Services / Properties Card Grid */}
        <div className="explore-grid-section">
          {activeTab === 'items' && (
            filteredProducts.length > 0 ? (
              <div className="cards-grid">
                {filteredProducts.map((item) => (
                  <div
                    key={item._id}
                    className="explore-card"
                    onClick={() => navigate(`/item/${item._id}`)}
                  >
                    {/* Top Row: Badge Tag & Heart Button */}
                    <div className="card-top-row">
                      <span
                        className="card-badge"
                        style={{ backgroundColor: item.badgeBg || '#e6f5f0', color: item.badgeColor || '#063b28' }}
                      >
                        {item.badge || "FEATURED"}
                      </span>
                      <button
                        className={`heart-btn ${favorites[item._id] ? 'heart-active' : ''}`}
                        onClick={(e) => toggleFavorite(e, item._id)}
                      >
                        {favorites[item._id] ? <FavoriteIcon sx={{ color: '#e74c3c', fontSize: 18 }} /> : <FavoriteBorderIcon sx={{ fontSize: 18 }} />}
                      </button>
                    </div>

                    {/* Image Container */}
                    <div className="card-image-box">
                      <img src={item.image} alt={item.title} />
                    </div>

                    {/* Card Content */}
                    <div className="card-info">
                      <h3 className="card-title">{item.title}</h3>
                      <p className="card-desc">{item.description}</p>

                      {/* Rating */}
                      <div className="card-rating">
                        <StarIcon sx={{ color: '#f7cb2c', fontSize: 16 }} />
                        <span className="rating-num">{item.rating || 4.8}</span>
                        <span className="reviews-count">({item.reviewsCount || 50})</span>
                      </div>

                      {/* Footer: Price & CTA */}
                      <div className="card-footer-row">
                        <div className="card-price">
                          ₹{item.pricing?.ratePerDay || 99}
                          <small>/day</small>
                        </div>
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
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>No products found matching your filter criteria.</p>
                <button className="btn-reset-filters" onClick={() => { setSelectedCategory('All'); setSearchQuery(''); setFilterInput(''); }}>
                  Reset Filters
                </button>
              </div>
            )
          )}

          {activeTab === 'services' && (
            filteredServices.length > 0 ? (
              <div className="cards-grid">
                {filteredServices.map((serv) => (
                  <div
                    key={serv._id}
                    className="explore-card"
                    onClick={() => navigate(`/service/${serv._id}`)}
                  >
                    <div className="card-top-row">
                      <span className="card-badge" style={{ backgroundColor: serv.badgeBg || '#e6f5f0', color: serv.badgeColor || '#063b28' }}>
                        {serv.badge || "TOP RATED"}
                      </span>
                      <button
                        className={`heart-btn ${favorites[serv._id] ? 'heart-active' : ''}`}
                        onClick={(e) => toggleFavorite(e, serv._id)}
                      >
                        {favorites[serv._id] ? <FavoriteIcon sx={{ color: '#e74c3c', fontSize: 18 }} /> : <FavoriteBorderIcon sx={{ fontSize: 18 }} />}
                      </button>
                    </div>

                    <div className="card-image-box">
                      <img src={serv.image || cameraImg} alt={serv.serviceName || serv.title} />
                    </div>

                    <div className="card-info">
                      <h3 className="card-title">{serv.serviceName || serv.title}</h3>
                      <p className="card-desc">By: {serv.providerName || "Campus Expert"}</p>

                      <div className="card-rating">
                        <StarIcon sx={{ color: '#f7cb2c', fontSize: 16 }} />
                        <span className="rating-num">{serv.rating || 4.9}</span>
                        <span className="reviews-count">({serv.reviewsCount || 40})</span>
                      </div>

                      <div className="card-footer-row">
                        <div className="card-price">
                          ₹{serv.price || 299}
                          <small>/{serv.priceUnit || "service"}</small>
                        </div>
                        <button
                          className="btn-rent-now"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/service/${serv._id}`);
                          }}
                        >
                          <ShoppingBagOutlinedIcon fontSize="small" />
                          <span>Book Service</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>No services found matching your filter criteria.</p>
                <button className="btn-reset-filters" onClick={() => { setSelectedCategory('All'); setSearchQuery(''); setFilterInput(''); }}>
                  Reset Filters
                </button>
              </div>
            )
          )}

          {activeTab === 'properties' && (
            filteredProperties.length > 0 ? (
              <div className="cards-grid">
                {filteredProperties.map((prop) => (
                  <div
                    key={prop._id}
                    className="explore-card"
                    onClick={() => navigate(`/about`)}
                  >
                    <div className="card-top-row">
                      <span className="card-badge" style={{ backgroundColor: prop.badgeBg || '#e3f0f8', color: prop.badgeColor || '#1d6092' }}>
                        {prop.badge || "HOUSING"}
                      </span>
                      <button
                        className={`heart-btn ${favorites[prop._id] ? 'heart-active' : ''}`}
                        onClick={(e) => toggleFavorite(e, prop._id)}
                      >
                        {favorites[prop._id] ? <FavoriteIcon sx={{ color: '#e74c3c', fontSize: 18 }} /> : <FavoriteBorderIcon sx={{ fontSize: 18 }} />}
                      </button>
                    </div>

                    <div className="card-image-box">
                      <img src={prop.image} alt={prop.title} />
                    </div>

                    <div className="card-info">
                      <h3 className="card-title">{prop.title}</h3>
                      <p className="card-desc">📍 {prop.location}</p>

                      <div className="card-rating">
                        <StarIcon sx={{ color: '#f7cb2c', fontSize: 16 }} />
                        <span className="rating-num">{prop.rating || 4.8}</span>
                        <span className="reviews-count">({prop.reviewsCount || 25})</span>
                      </div>

                      <div className="card-footer-row">
                        <div className="card-price">
                          ₹{prop.pricing.ratePerDay}
                          <small>/day</small>
                        </div>
                        <button className="btn-rent-now">
                          <HomeOutlinedIcon fontSize="small" />
                          <span>View Property</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>No properties found matching your filter criteria.</p>
                <button className="btn-reset-filters" onClick={() => { setSelectedCategory('All'); setSearchQuery(''); setFilterInput(''); }}>
                  Reset Filters
                </button>
              </div>
            )
          )}
        </div>

      </div>

      {/* Embedded Styles to match reference layout & brand design system */}
      <style>{`
        .explore-page-wrapper {
          min-height: 100vh;
          background: #fafcfb;
          padding: 30px 4% 80px;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .explore-container {
          max-width: 1280px;
          margin: 0 auto;
        }

        /* 1. Category Bar */
        .category-bar-wrapper {
          margin-bottom: 24px;
          position: relative;
        }

        .category-chips-scroll {
          display: flex;
          align-items: center;
          gap: 10px;
          overflow-x: auto;
          padding: 8px 0 14px;
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE */
        }

        .category-chips-scroll::-webkit-scrollbar {
          display: none; /* Chrome/Safari */
        }

        .category-chip {
          white-space: nowrap;
          padding: 8px 18px;
          border-radius: 50px;
          border: 1px solid #d8e5e0;
          background: #ffffff;
          color: #3b5c50;
          font-weight: 700;
          font-size: 0.88rem;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 2px 8px rgba(6, 59, 40, 0.03);
        }

        .category-chip:hover {
          border-color: #063b28;
          color: #063b28;
          transform: translateY(-1px);
        }

        .category-chip.active {
          background: #f7cb2c;
          color: #063b28;
          border-color: #f7cb2c;
          box-shadow: 0 4px 12px rgba(247, 203, 44, 0.35);
        }

        .category-accent-line {
          height: 3px;
          background: linear-gradient(90deg, #f7cb2c 0%, #e2eedb 60%, #ffffff 100%);
          border-radius: 4px;
          margin-top: 2px;
        }

        /* 2. Search & Filter Box */
        .search-filter-card {
          background: #ffffff;
          border-radius: 20px;
          padding: 14px 20px;
          border: 1px solid #eef4f1;
          box-shadow: 0 8px 25px rgba(6, 59, 40, 0.05);
          margin-bottom: 30px;
        }

        .search-form {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .search-input-wrapper {
          flex: 1;
          min-width: 250px;
          display: flex;
          align-items: center;
          gap: 10px;
          background: #f7faf9;
          border: 1px solid #e2ede8;
          border-radius: 14px;
          padding: 10px 16px;
          transition: all 0.2s ease;
        }

        .search-input-wrapper:focus-within {
          border-color: #063b28;
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(6, 59, 40, 0.1);
        }

        .search-icon {
          color: #7b8e87;
        }

        .search-input {
          border: none;
          outline: none;
          background: transparent;
          width: 100%;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.95rem;
          color: #063b28;
          font-weight: 500;
        }

        .btn-filter-toggle {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #f0f6f4;
          color: #063b28;
          border: 1px solid #d5e6e0;
          padding: 11px 20px;
          border-radius: 14px;
          font-weight: 700;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-filter-toggle:hover {
          background: #e2f0eb;
          border-color: #063b28;
        }

        .btn-search-submit {
          background: #f7cb2c;
          color: #063b28;
          border: none;
          padding: 12px 28px;
          border-radius: 14px;
          font-weight: 800;
          font-size: 0.95rem;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(247, 203, 44, 0.3);
          transition: all 0.2s ease;
        }

        .btn-search-submit:hover {
          background: #e0b41c;
          transform: translateY(-1px);
        }

        /* 3. Sub-Navigation Tabs */
        .type-tabs-container {
          display: flex;
          align-items: center;
          gap: 32px;
          border-bottom: 2px solid #eef4f1;
          margin-bottom: 30px;
          padding-bottom: 2px;
        }

        .type-tab {
          background: transparent;
          border: none;
          outline: none;
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 1.1rem;
          font-weight: 800;
          color: #7b8e87;
          padding: 12px 4px;
          cursor: pointer;
          position: relative;
          transition: color 0.25s ease;
        }

        .type-tab:hover {
          color: #063b28;
        }

        .type-tab.active {
          color: #063b28;
        }

        .type-tab.active::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          right: 0;
          height: 3px;
          background: #f7cb2c;
          border-radius: 4px;
        }

        .tab-icon {
          font-size: 1.2rem;
        }

        .tab-count {
          font-size: 0.8rem;
          font-weight: 700;
          opacity: 0.7;
        }

        /* 4. Grid & Card Styling */
        .cards-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        @media (max-width: 1100px) {
          .cards-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .cards-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 500px) {
          .cards-grid {
            grid-template-columns: repeat(1, 1fr);
          }
        }

        .explore-card {
          background: #ffffff;
          border-radius: 20px;
          padding: 14px 16px;
          border: 1px solid #eef4f1;
          box-shadow: 0 8px 20px rgba(6, 59, 40, 0.05);
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
        }

        .explore-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 36px rgba(6, 59, 40, 0.12);
          border-color: #cce4db;
        }

        .card-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .card-badge {
          font-size: 0.62rem;
          font-weight: 800;
          padding: 4px 10px;
          border-radius: 50px;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .heart-btn {
          background: #f8fbf9;
          border: 1px solid #e2e8e5;
          width: 28px;
          height: 28px;
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

        .card-image-box {
          width: 100%;
          height: 145px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 10px;
          background: #fcfdfe;
          border-radius: 14px;
          overflow: hidden;
        }

        .card-image-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .explore-card:hover .card-image-box img {
          transform: scale(1.06);
        }

        .card-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 1.05rem;
          font-weight: 800;
          color: #063b28;
          margin: 0 0 4px;
          line-height: 1.25;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .card-desc {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.78rem;
          color: #597a6e;
          margin: 0 0 8px;
          line-height: 1.35;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          height: 2.6em;
        }

        .card-rating {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-bottom: 10px;
        }

        .rating-num {
          font-weight: 800;
          font-size: 0.85rem;
          color: #063b28;
        }

        .reviews-count {
          font-size: 0.75rem;
          color: #7b8e87;
        }

        .card-footer-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 8px;
          border-top: 1px solid #f0f6f4;
          margin-top: auto;
        }

        .card-price {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 1.1rem;
          font-weight: 900;
          color: #063b28;
        }

        .card-price small {
          font-size: 0.72rem;
          color: #597a6e;
          font-weight: 600;
          margin-left: 2px;
        }

        .btn-rent-now {
          background-color: #063b28;
          color: #ffffff;
          border: none;
          padding: 7px 16px;
          border-radius: 50px;
          font-weight: 700;
          font-size: 0.8rem;
          display: flex;
          align-items: center;
          gap: 5px;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(6, 59, 40, 0.2);
          transition: all 0.2s ease;
        }

        .btn-rent-now:hover {
          background-color: #042b1d;
          transform: translateY(-1px);
        }

        .empty-state {
          text-align: center;
          padding: 60px 20px;
          background: #ffffff;
          border-radius: 20px;
          border: 1px dashed #cce4db;
          color: #597a6e;
          font-size: 1.05rem;
          font-weight: 600;
        }

        .btn-reset-filters {
          margin-top: 16px;
          background: #063b28;
          color: #ffffff;
          border: none;
          padding: 10px 24px;
          border-radius: 50px;
          font-weight: 700;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default About;