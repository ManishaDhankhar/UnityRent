import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { 
  IconButton, 
  Tooltip, 
  Breadcrumbs, 
  Link, 
  Typography, 
  Divider 
} from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function ItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0); // Always scroll to top on load
    fetch(`http://localhost:8080/item/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  const handleShare = () => {
    navigator.share({
      title: product?.title,
      url: window.location.href,
    }).catch(() => alert("Copied to clipboard!"));
  };

  if (loading) return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading UnityRent Quality...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div style={{ padding: '10px 8% 60px', backgroundColor: '#fff', minHeight: '100vh' }}>
      
      {/* 1. TOP NAVIGATION & ACTIONS */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <Breadcrumbs separator=">" aria-label="breadcrumb">
          <Link underline="hover" color="inherit" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Home</Link>
          <Typography color="text.primary">{product.category}</Typography>
        </Breadcrumbs>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <Tooltip title="Share">
            <IconButton onClick={handleShare} style={{ border: '1px solid #eee' }}><ShareIcon /></IconButton>
          </Tooltip>
          <Tooltip title="Save to Wishlist">
            <IconButton style={{ border: '1px solid #eee' }}><FavoriteBorderIcon /></IconButton>
          </Tooltip>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '80px', flexWrap: 'wrap' }}>
        
        {/* 2. LEFT SIDE: THE VISUAL BOX */}
        <div style={{ flex: '1', minWidth: '400px' }}>
          <div style={{ 
            backgroundColor: '#F8F9FA', 
            borderRadius: '40px', 
            padding: '60px', 
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #f0f0f0'
          }}>
            <span style={{ 
              position: 'absolute', top: '30px', left: '30px', 
              backgroundColor: '#002d5b', color: 'white', 
              padding: '8px 20px', borderRadius: '30px', 
              fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase' 
            }}>
              {product.condition}
            </span>
            <img 
              src={product.image} 
              alt={product.title} 
              style={{ width: '100%', maxHeight: '450px', objectFit: 'contain', filter: 'drop-shadow(0px 20px 30px rgba(0,0,0,0.1))' }} 
            />
          </div>
          <div style={{ marginTop: '25px', display: 'flex', alignItems: 'center', gap: '10px', color: '#666' }}>
            <span style={{ fontSize: '1.2rem' }}>📍</span>
            <Typography variant="body2" fontWeight="600">Available at: {product.locationTag}</Typography>
          </div>
        </div>

        {/* 3. RIGHT SIDE: THE CONTENT BOX */}
        <div style={{ flex: '1.2', minWidth: '400px' }}>
          <Typography variant="overline" style={{ color: '#002d5b', fontWeight: '900', letterSpacing: '2px' }}>
            {product.category}
          </Typography>
          
          <Typography variant="h2" style={{ fontSize: '3rem', fontWeight: '900', color: '#111', margin: '10px 0 20px', lineHeight: '1.1' }}>
            {product.title}
          </Typography>

          <Typography variant="body1" style={{ color: '#555', lineHeight: '1.8', fontSize: '1.1rem', marginBottom: '40px' }}>
            {product.description}
          </Typography>

          <Divider style={{ marginBottom: '40px' }} />

          {/* PRICING SECTION */}
          <div style={{ 
            background: 'linear-gradient(145deg, #ffffff, #f0f4f8)', 
            padding: '35px', 
            borderRadius: '32px', 
            border: '1px solid #eef2f6',
            boxShadow: '0 20px 40px rgba(0, 45, 91, 0.04)',
            marginBottom: '40px'
          }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <Typography variant="h3" style={{ fontWeight: '900', color: '#002d5b' }}>₹{product.pricing.ratePerDay}</Typography>
              <Typography variant="subtitle1" style={{ color: '#777', fontWeight: '600' }}>/ day</Typography>
            </div>
            <Typography variant="body2" style={{ color: '#666', marginTop: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              🛡️ Security Deposit: <b>₹{product.pricing.securityDeposit}</b> <span style={{ color: '#00b894' }}>(Fully Refundable)</span>
            </Typography>
          </div>

          {/* FINAL ACTION BAR */}
          <div style={{ display: 'flex', gap: '20px' }}>
            <button 
              onClick={() => navigate(`/book/${product._id}`)}
              style={{ 
                flex: 2, backgroundColor: '#002d5b', color: 'white', 
                 borderRadius: '50px', border: 'none', 
                fontWeight: '800', fontSize: '1.1rem', cursor: 'pointer',
                boxShadow: '0 10px 20px rgba(0, 45, 91, 0.2)',
                transition: '0.3s transform'
              }}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-3px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
              Secure This Item
            </button>
            <button 
              style={{ 
                flex: 1, backgroundColor: '#fff', color: '#002d5b', 
                padding: '22px', borderRadius: '50px', border: '2px solid #002d5b', 
                fontWeight: '800', fontSize: '1rem', cursor: 'pointer' 
              }}
            >
              Contact Owner
            </button>
          </div>
          
          <Typography variant="caption" align="center" style={{ display: 'block', marginTop: '20px', color: '#999' }}>
            Verified campus listing • UnityRent Protection included
          </Typography>
        </div>

      </div>
    </div>
  );
}

export default ItemDetail;