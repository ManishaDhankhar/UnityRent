import React, { useState, useEffect } from 'react';
import { processPayment } from './PaymentHandler';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, Container, Typography, Card, TextField, Grid, 
  Checkbox, FormControlLabel, Button, Alert, Divider, Paper
} from '@mui/material';
import RecordVideo from './RecordVideo';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

import cameraImg from '../../assets/hero_camera.jpg';
import headphonesImg from '../../assets/hero_headphones.jpg';
import ironImg from '../../assets/hero_iron.jpg';
import mouseImg from '../../assets/hero_mouse.jpg';
import bikeImg from '../../assets/hero_bicycle.jpg';

const DEMO_ITEMS_DICT = {
  "demo-headphones": { title: "Wireless Noise-Cancelling Headphones", pricing: { ratePerDay: 129, securityDeposit: 500 }, image: headphonesImg },
  "demo-camera": { title: "DSLR Camera Canon EOS 1500D", pricing: { ratePerDay: 599, securityDeposit: 1500 }, image: cameraImg },
  "demo-bike": { title: "Campus Hybrid Travel Bicycle", pricing: { ratePerDay: 129, securityDeposit: 400 }, image: bikeImg },
  "demo-mouse": { title: "Precision Wireless Gaming Mouse", pricing: { ratePerDay: 79, securityDeposit: 300 }, image: mouseImg },
  "demo-iron": { title: "Heavy Duty Steam Iron", pricing: { ratePerDay: 59, securityDeposit: 200 }, image: ironImg }
};

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [contact, setContact] = useState({ phone: '', address: '', renterName: '' });
  const [dates, setDates] = useState({ start: '', end: '' });
  const [agreedToVideo, setAgreedToVideo] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (id && DEMO_ITEMS_DICT[id]) {
      setProduct(DEMO_ITEMS_DICT[id]);
      return;
    }

    fetch(`https://unityrent.onrender.com/item/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.title) {
          setProduct(data);
        } else if (DEMO_ITEMS_DICT[id]) {
          setProduct(DEMO_ITEMS_DICT[id]);
        } else {
          setProduct({
            title: data.productName || data.title || "Campus Quality Item",
            pricing: { ratePerDay: data.price || 149, securityDeposit: data.securityDeposit || 400 },
            image: data.imageUrl || data.image || cameraImg
          });
        }
      })
      .catch(err => {
        console.log("Fetch Error:", err);
        if (DEMO_ITEMS_DICT[id]) {
          setProduct(DEMO_ITEMS_DICT[id]);
        } else {
          setProduct(DEMO_ITEMS_DICT["demo-headphones"]);
        }
      });
  }, [id]);

  const calculateTotal = () => {
    if (!dates.start || !dates.end || !product) return 0;
    const start = new Date(dates.start);
    const end = new Date(dates.end);
    const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays * product.pricing.ratePerDay : 0;
  };

  if (!product) {
    return (
      <Box sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography color="#063b28" fontWeight="700">Loading Booking Checkout...</Typography>
      </Box>
    );
  }

  const totalRent = calculateTotal();
  const totalPayable = totalRent + (product.pricing?.securityDeposit || 0);

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(180deg, #ffffff 0%, #f4faf8 50%, #ffffff 100%)', py: 5, px: 2, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
      <Container maxWidth="lg">
        
        {/* Navigation Back Button */}
        <Box mb={3}>
          <Button 
            startIcon={<ArrowBackIosNewIcon sx={{ fontSize: '14px !important' }} />} 
            onClick={() => navigate(-1)}
            sx={{ 
              color: '#063b28', 
              fontWeight: '700', 
              borderRadius: '50px',
              border: '1px solid #d8e5e0',
              px: 2.5,
              py: 0.8,
              backgroundColor: '#ffffff',
              boxShadow: '0 2px 8px rgba(6, 59, 40, 0.04)',
              '&:hover': { backgroundColor: '#063b28', color: '#fff', borderColor: '#063b28' } 
            }}
          >
            Back to Item
          </Button>
        </Box>

        {/* Page Title */}
        <Box mb={4}>
          <Typography variant="h4" fontWeight="800" sx={{ color: '#063b28', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Book Item Rental
          </Typography>
          <Typography color="#597a6e" fontWeight="500">
            Complete your rental period and verification details for <strong>{product.title}</strong>
          </Typography>
        </Box>

        {/* Item Preview Card */}
        <Paper 
          elevation={0}
          sx={{ 
            p: 3, 
            borderRadius: '24px', 
            mb: 4, 
            display: 'flex', 
            gap: 3, 
            alignItems: 'center',
            backgroundColor: '#ffffff',
            border: '1px solid #eef4f1',
            boxShadow: '0 8px 25px rgba(6, 59, 40, 0.05)'
          }}
        >
          <Box 
            sx={{ 
              width: 100, 
              height: 100, 
              borderRadius: '16px', 
              overflow: 'hidden', 
              backgroundColor: '#fcfdfe',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 1
            }}
          >
            <img src={product.image || cameraImg} alt={product.title} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
          </Box>
          <Box>
            <Typography variant="h6" fontWeight="800" color="#063b28">{product.title}</Typography>
            <Typography variant="h6" color="#063b28" fontWeight="900" sx={{ mt: 0.5 }}>
              ₹{product.pricing?.ratePerDay}<small style={{ fontSize: '0.8rem', color: '#597a6e' }}> / day</small>
            </Typography>
            <Typography variant="body2" color="#597a6e" sx={{ mt: 0.5 }}>
              Refundable Deposit: ₹{product.pricing?.securityDeposit}
            </Typography>
          </Box>
        </Paper>

        <Grid container spacing={4}>
          {/* Left Column: Form Details */}
          <Grid item xs={12} md={7.5}>
            
            {/* RENTAL PERIOD SECTION */}
            <Paper elevation={0} sx={{ p: 3.5, borderRadius: '24px', border: '1px solid #eef4f1', mb: 3, backgroundColor: '#ffffff' }}>
              <Typography variant="h6" fontWeight="800" color="#063b28" sx={{ display: 'flex', alignItems: 'center', mb: 2.5 }}>
                <CalendarMonthIcon sx={{ mr: 1, color: '#063b28' }} /> Select Rental Period
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField 
                    fullWidth 
                    type="date" 
                    label="Start Date" 
                    InputLabelProps={{ shrink: true }} 
                    inputProps={{ min: new Date().toISOString().split("T")[0] }}
                    onChange={(e) => setDates({...dates, start: e.target.value})} 
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '14px' } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField 
                    fullWidth 
                    type="date" 
                    label="End Date" 
                    InputLabelProps={{ shrink: true }} 
                    inputProps={{ min: dates.start || new Date().toISOString().split("T")[0] }}
                    onChange={(e) => setDates({...dates, end: e.target.value})} 
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '14px' } }}
                  />
                </Grid>
              </Grid>
            </Paper>

            {/* CONTACT INFO SECTION */}
            <Paper elevation={0} sx={{ p: 3.5, borderRadius: '24px', border: '1px solid #eef4f1', mb: 3, backgroundColor: '#ffffff' }}>
              <Typography variant="h6" fontWeight="800" color="#063b28" sx={{ display: 'flex', alignItems: 'center', mb: 2.5 }}>
                <PersonOutlineIcon sx={{ mr: 1, color: '#063b28' }} /> Contact Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField 
                    fullWidth 
                    label="Full Name / Student Name" 
                    value={contact.renterName}
                    onChange={(e) => setContact({...contact, renterName: e.target.value})}
                    placeholder="e.g. Rahul Verma"
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '14px' } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField 
                    fullWidth 
                    label="Phone Number" 
                    value={contact.phone}
                    onChange={(e) => setContact({...contact, phone: e.target.value})}
                    placeholder="+91 9876543210"
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '14px' } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField 
                    fullWidth 
                    label="Campus Hostel / Address" 
                    value={contact.address}
                    onChange={(e) => setContact({...contact, address: e.target.value})}
                    placeholder="Hostel 4, Room 208"
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '14px' } }}
                  />
                </Grid>
              </Grid>
            </Paper>

            {/* VIDEO RECORDING AGREEMENT */}
            <Alert 
              icon={<VideoCameraBackIcon sx={{ color: '#063b28' }} />} 
              severity="info" 
              sx={{ 
                borderRadius: '20px', 
                mb: 4, 
                backgroundColor: '#e6f5f0', 
                border: '1px solid #bce2d5',
                color: '#063b28',
                '& .MuiAlert-icon': { color: '#063b28' }
              }}
            >  
              <RecordVideo />
              <Typography variant="subtitle2" fontWeight="800" sx={{ mt: 1 }}>
                Digital Handover Protection
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox 
                    size="small" 
                    checked={agreedToVideo} 
                    onChange={(e) => setAgreedToVideo(e.target.checked)}
                    sx={{ color: '#063b28', '&.Mui-checked': { color: '#063b28' } }}
                  />
                }
                label={
                  <Typography variant="body2" fontWeight="700">
                    I agree to record handover videos for item protection
                  </Typography>
                }
              />
            </Alert>

          </Grid>

          {/* Right Column: Order Summary Card */}
          <Grid item xs={12} md={4.5}>
            <Card 
              elevation={0}
              sx={{ 
                p: 3.5, 
                borderRadius: '28px', 
                position: 'sticky', 
                top: 100,
                border: '1px solid #cce4db',
                boxShadow: '0 12px 35px rgba(6, 59, 40, 0.08)',
                backgroundColor: '#ffffff'
              }}
            >
              <Typography variant="h6" fontWeight="900" color="#063b28" mb={3}>
                Booking Summary
              </Typography>

              <Box display="flex" justifyContent="space-between" mb={1.5}>
                <Typography color="#597a6e" fontWeight="600">Daily Rate</Typography>
                <Typography fontWeight="700" color="#063b28">₹{product.pricing?.ratePerDay} / day</Typography>
              </Box>

              <Box display="flex" justifyContent="space-between" mb={1.5}>
                <Typography color="#597a6e" fontWeight="600">Calculated Rent</Typography>
                <Typography fontWeight="800" color="#063b28">₹{totalRent}</Typography>
              </Box>

              <Box display="flex" justifyContent="space-between" mb={1.5}>
                <Typography color="#597a6e" fontWeight="600">Security Deposit</Typography>
                <Typography fontWeight="800" color="#063b28">₹{product.pricing?.securityDeposit}</Typography>
              </Box>

              <Typography variant="caption" color="#597a6e" display="block" mb={2}>
                * Security deposit is 100% refundable upon return.
              </Typography>

              <Divider sx={{ my: 2.5, borderColor: '#eef4f1' }} />

              <Box display="flex" justifyContent="space-between" alignItems="baseline" mb={3.5}>
                <Typography fontWeight="800" color="#063b28">Total Payable</Typography>
                <Typography variant="h4" fontWeight="900" color="#063b28">
                  ₹{totalPayable}
                </Typography>
              </Box>

              <Button 
                fullWidth 
                variant="contained" 
                disabled={!agreedToVideo || totalRent === 0 || !contact.phone || !contact.address}
                onClick={() => {
                  const bookingData = {
                    productId: id,
                    renterName: contact.renterName || "Campus Student",
                    renterPhone: contact.phone,
                    renterAddress: contact.address, 
                    startDate: dates.start,
                    endDate: dates.end
                  };
                  processPayment(bookingData, navigate);
                }}
                sx={{ 
                  backgroundColor: '#063b28', 
                  borderRadius: '50px', 
                  py: 1.8, 
                  fontWeight: '800',
                  fontSize: '1rem',
                  boxShadow: '0 8px 20px rgba(6, 59, 40, 0.25)',
                  '&:hover': { backgroundColor: '#042b1d' },
                  '&.Mui-disabled': { backgroundColor: '#d0dfd9', color: '#88a398' }
                }}
              >
                Confirm & Pay ₹{totalPayable}
              </Button>

              <Box display="flex" alignItems="center" justifyContent="center" gap={1} mt={2.5}>
                <ShieldOutlinedIcon sx={{ color: '#063b28', fontSize: 18 }} />
                <Typography variant="caption" color="#597a6e" fontWeight="600">
                  Protected by UnityRent Campus Security
                </Typography>
              </Box>

            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default BookingPage;