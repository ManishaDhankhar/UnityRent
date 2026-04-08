import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, Container, Typography, Card, TextField, Grid, 
  Checkbox, FormControlLabel, Button, Alert, Divider, Paper, IconButton
} from '@mui/material';
 import RecordVideo from './RecordVideo';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'; // New Icon

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  
  // Form State
  const [dates, setDates] = useState({ start: '', end: '' });
  const [agreedToVideo, setAgreedToVideo] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8080/item/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(err => console.log(err));
  }, [id]);

  // Logic: Calculate Total Price
  const calculateTotal = () => {
    if (!dates.start || !dates.end || !product) return 0;
    const start = new Date(dates.start);
    const end = new Date(dates.end);
    const diffTime = end - start;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays * product.pricing.ratePerDay : 0;
  };

  if (!product) return <Typography sx={{ mt: 15, textAlign: 'center' }}>Loading Booking Details...</Typography>;

  const totalRent = calculateTotal();

  return (
    <Container maxWidth="md" sx={{ pt: 5, pb: 10 }}>
      
      {/* 0. BACK OPTION */}
      <Box mb={2}>
        <Button 
          startIcon={<ArrowBackIosNewIcon sx={{ fontSize: '14px !important' }} />} 
          onClick={() => navigate(-1)} // Takes user back to the Item Detail page
          sx={{ 
            color: '#666', 
            textTransform: 'none', 
            fontWeight: '700', 
            fontSize: '0.9rem',
            padding: 0,
            '&:hover': { backgroundColor: 'transparent', color: '#002d5b' } 
          }}
        >
          Back
        </Button>
      </Box>

      {/* 1. TOP HEADER */}
      <Box mb={4}>
        <Typography variant="h4" fontWeight="900" gutterBottom>Book Item</Typography>
        <Typography color="text.secondary">Complete your booking details for {product.title}</Typography>
      </Box>

      {/* 2. ITEM SUMMARY CARD */}
      <Paper variant="outlined" sx={{ p: 3, borderRadius: '20px', mb: 4, display: 'flex', gap: 3, alignItems: 'center', border: '1px solid #eee' }}>
        <img src={product.image} alt={product.title} style={{ width: 100, height: 100, objectFit: 'contain', borderRadius: '12px', background: '#f5f5f5' }} />
        <Box>
          <Typography variant="h6" fontWeight="700">{product.title}</Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>{product.category}</Typography>
          <Typography variant="h6" color="primary.main" fontWeight="800">₹{product.pricing.ratePerDay}/day</Typography>
        </Box>
      </Paper>

      <Grid container spacing={4}>
        {/* LEFT COLUMN: FORM */}
        <Grid item xs={12} md={8}>
          
          {/* RENTAL PERIOD */}
          <Typography variant="subtitle1" fontWeight="700" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <CalendarMonthIcon sx={{ mr: 1, color: '#002d5b' }} /> Rental Period
          </Typography>
          <Box display="flex" gap={2} mb={4}>
            <TextField 
                fullWidth 
                type="date" 
                label="Start Date" 
                InputLabelProps={{ shrink: true }} 
                inputProps={{ min: new Date().toISOString().split("T")[0] }} // Prevent past dates
                onChange={(e) => setDates({...dates, start: e.target.value})} 
            />
            <TextField 
                fullWidth 
                type="date" 
                label="End Date" 
                InputLabelProps={{ shrink: true }} 
                inputProps={{ min: dates.start || new Date().toISOString().split("T")[0] }} // End date must be after start
                onChange={(e) => setDates({...dates, end: e.target.value})} 
            />
          </Box>

          {/* CONTACT INFO */}
          <Typography variant="subtitle1" fontWeight="700" mb={2}>Contact Information</Typography>
          <TextField fullWidth label="Phone Number" placeholder="Enter phone number" sx={{ mb: 2 }} />
          <TextField fullWidth multiline rows={3} label="Address" placeholder="Enter complete address" sx={{ mb: 4 }} />

          {/* VIDEO RECORDING BOX */}
          <Alert 
            icon={<VideoCameraBackIcon />} 
            severity="error" 
            sx={{ 
                borderRadius: '15px', 
                border: '1px solid #ffcdd2', 
                backgroundColor: '#fff8f8', 
                p: 2, 
                mb: 4,
                '& .MuiAlert-icon': { color: '#d32f2f' }
            }}
          >  
          <RecordVideo/>
            <Typography variant="subtitle2" fontWeight="800" color="#d32f2f">Important: Video Recording Required</Typography>
            <Typography variant="caption" display="block" sx={{ my: 1, color: '#444', lineHeight: 1.5 }}>
              • Record a clear video of the item during handover (pickup)<br />
              • Show all sides, accessories, and condition<br />
              • Record again during return
            </Typography>
            <FormControlLabel
              control={<Checkbox size="small" checked={agreedToVideo} onChange={(e) => setAgreedToVideo(e.target.checked)} />}
              label={<Typography variant="body2" fontWeight="600" color="#444">I understand and agree to record videos</Typography>}
            />
          </Alert>
        </Grid>

        {/* RIGHT COLUMN: BOOKING SUMMARY */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, borderRadius: '25px', position: 'sticky', top: 100, border: '1px solid #eee', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
            <Typography variant="h6" fontWeight="800" mb={3}>Booking Summary</Typography>
            
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography color="text.secondary">Total Rent</Typography>
              <Typography fontWeight="700">₹{totalRent}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography color="text.secondary">Security Deposit</Typography>
              <Typography fontWeight="700">₹{product.pricing.securityDeposit}</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box display="flex" justifyContent="space-between" mb={3}>
              <Typography fontWeight="800">Total Payable</Typography>
              <Typography variant="h5" fontWeight="900" color="primary.main">₹{totalRent + product.pricing.securityDeposit}</Typography>
            </Box>

            <Button 
              fullWidth 
              variant="contained" 
              disabled={!agreedToVideo || totalRent === 0}
              sx={{ 
                backgroundColor: '#002d5b', 
                borderRadius: '30px', 
                py: 1.8, 
                fontWeight: '800',
                fontSize: '1rem',
                '&:hover': { backgroundColor: '#001a35' }
              }}
            >
              Confirm Booking
            </Button>
            <Typography variant="caption" align="center" display="block" sx={{ mt: 2, color: '#999', fontWeight: '500' }}>
              🔒 Secure payment processing
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BookingPage;