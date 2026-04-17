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

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [contact, setContact] = useState({ phone: '', address: '' });
  const [dates, setDates] = useState({ start: '', end: '' });
  const [agreedToVideo, setAgreedToVideo] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8080/item/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data)) // Fixed nesting
      .catch(err => console.log("Fetch Error:", err));
  }, [id]);

  const calculateTotal = () => {
    if (!dates.start || !dates.end || !product) return 0;
    const start = new Date(dates.start);
    const end = new Date(dates.end);
    const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays * product.pricing.ratePerDay : 0;
  };

  if (!product) return <Typography sx={{ mt: 15, textAlign: 'center' }}>Loading Booking Details...</Typography>;

  const totalRent = calculateTotal();
  const totalPayable = totalRent + product.pricing.securityDeposit;

  return (
    <Container maxWidth="md" sx={{ pt: 5, pb: 10 }}>
      <Box mb={2}>
        <Button 
          startIcon={<ArrowBackIosNewIcon sx={{ fontSize: '14px !important' }} />} 
          onClick={() => navigate(-1)}
          sx={{ color: '#666', fontWeight: '700', '&:hover': { color: '#002d5b' } }}
        >
          Back
        </Button>
      </Box>

      <Box mb={4}>
        <Typography variant="h4" fontWeight="900" gutterBottom>Book Item</Typography>
        <Typography color="text.secondary">Complete your details for {product.title}</Typography>
      </Box>

      <Paper variant="outlined" sx={{ p: 3, borderRadius: '20px', mb: 4, display: 'flex', gap: 3, alignItems: 'center' }}>
        <img src={product.image} alt={product.title} style={{ width: 100, height: 100, objectFit: 'contain', borderRadius: '12px' }} />
        <Box>
          <Typography variant="h6" fontWeight="700">{product.title}</Typography>
          <Typography variant="h6" color="primary.main" fontWeight="800">₹{product.pricing.ratePerDay}/day</Typography>
        </Box>
      </Paper>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {/* RENTAL PERIOD SECTION */}
          <Typography variant="subtitle1" fontWeight="700" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <CalendarMonthIcon sx={{ mr: 1, color: '#002d5b' }} /> Rental Period
          </Typography>
          <Box display="flex" gap={2} mb={4}>
            <TextField 
                fullWidth type="date" label="Start Date" InputLabelProps={{ shrink: true }} 
                inputProps={{ min: new Date().toISOString().split("T")[0] }}
                onChange={(e) => setDates({...dates, start: e.target.value})} 
            />
            <TextField 
                fullWidth type="date" label="End Date" InputLabelProps={{ shrink: true }} 
                inputProps={{ min: dates.start || new Date().toISOString().split("T")[0] }}
                onChange={(e) => setDates({...dates, end: e.target.value})} 
            />
          </Box>

          {/* CONTACT INFO SECTION */}
          <Typography variant="subtitle1" fontWeight="700" mb={2}>Contact Information</Typography>
          <TextField 
            fullWidth label="Phone Number" sx={{ mb: 2 }} 
            value={contact.phone}
            onChange={(e) => setContact({...contact, phone: e.target.value})}
          />
          <TextField 
            fullWidth multiline rows={3} label="Address" sx={{ mb: 4 }} 
            value={contact.address}
            onChange={(e) => setContact({...contact, address: e.target.value})}
          />

          <Alert icon={<VideoCameraBackIcon />} severity="error" sx={{ borderRadius: '15px', mb: 4 }}>  
            <RecordVideo />
            <Typography variant="subtitle2" fontWeight="800">Video Recording Required</Typography>
            <FormControlLabel
              control={<Checkbox size="small" checked={agreedToVideo} onChange={(e) => setAgreedToVideo(e.target.checked)} />}
              label={<Typography variant="body2" fontWeight="600">I agree to record handover videos</Typography>}
            />
          </Alert>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, borderRadius: '25px', position: 'sticky', top: 100 }}>
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
              <Typography variant="h5" fontWeight="900" color="primary.main">₹{totalPayable}</Typography>
            </Box>

            <Button 
              fullWidth variant="contained" 
              disabled={!agreedToVideo || totalRent === 0 || !contact.phone || !contact.address}
              onClick={() => {
                const bookingData = {
                  productId: id,
                  renterName: "Guest User",
                  renterPhone: contact.phone,
                  renterAddress: contact.address, 
                  startDate: dates.start,
                  endDate: dates.end
                };
                processPayment(bookingData, navigate);
              }}
              sx={{ backgroundColor: '#002d5b', borderRadius: '30px', py: 1.8 }}
            >
              Confirm Booking
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BookingPage;