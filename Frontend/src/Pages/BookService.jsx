import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, Container, Typography, Card, TextField, Grid, 
  FormControlLabel, Button, Alert, Divider, Paper, MenuItem, Select, InputLabel, FormControl
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { processPayment } from '../Landing_Page/Home/PaymentHandler';

import cameraImg from '../assets/hero_camera.jpg';

const DEMO_SERVICES_DICT = {
  "demo-service-1": { serviceName: "Laptop Repair & Servicing", providerName: "Rahul Sharma", price: 299, priceUnit: "service", image: "https://images.unsplash.com/photo-1588702547919-26088e609072?w=600&auto=format&fit=crop&q=60" },
  "demo-service-2": { serviceName: "Academic Tutoring & Coding", providerName: "Priya Patel", price: 499, priceUnit: "hr", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=60" },
  "demo-service-3": { serviceName: "Campus Photography & Reels", providerName: "Aman Verma", price: 799, priceUnit: "session", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop&q=60" },
  "demo-service-4": { serviceName: "Room Cleaning & Moving", providerName: "Vikram Singh", price: 349, priceUnit: "visit", image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&auto=format&fit=crop&q=60" },
  "demo-service-5": { serviceName: "Guitar & Music Lessons", providerName: "Neha Gupta", price: 399, priceUnit: "hr", image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=600&auto=format&fit=crop&q=60" }
};

const BookService = ({ allServices = [] }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [service, setService] = useState(null);
  const [bookingDate, setBookingDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('10:00 AM - 12:00 PM');
  const [contact, setContact] = useState({ name: '', phone: '', address: '', notes: '' });

  useEffect(() => {
    window.scrollTo(0, 0);

    if (id && DEMO_SERVICES_DICT[id]) {
      setService(DEMO_SERVICES_DICT[id]);
      return;
    }

    const found = allServices.find(s => s._id === id || s.id === id);
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

  if (!service) {
    return (
      <Box sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography color="#063b28" fontWeight="700">Loading Service Booking...</Typography>
      </Box>
    );
  }

  const basePrice = service.price || 299;
  const platformFee = 25;
  const totalPrice = basePrice + platformFee;

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(180deg, #ffffff 0%, #f4faf8 50%, #ffffff 100%)', py: 5, px: 2, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
      <Container maxWidth="lg">

        {/* Back Button */}
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
              '&:hover': { backgroundColor: '#063b28', color: '#fff' } 
            }}
          >
            Back
          </Button>
        </Box>

        {/* Page Title */}
        <Box mb={4}>
          <Typography variant="h4" fontWeight="800" sx={{ color: '#063b28', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Book Campus Service
          </Typography>
          <Typography color="#597a6e" fontWeight="500">
            Schedule your appointment with <strong>{service.providerName || "Campus Expert"}</strong> for {service.serviceName || service.title}
          </Typography>
        </Box>

        {/* Service Summary Card */}
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
              justifyContent: 'center'
            }}
          >
            <img src={service.image || cameraImg} alt={service.serviceName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </Box>
          <Box>
            <Typography variant="h6" fontWeight="800" color="#063b28">{service.serviceName || service.title}</Typography>
            <Typography variant="body2" color="#597a6e" fontWeight="600">Provided by: {service.providerName || "Campus Expert"}</Typography>
            <Typography variant="h6" color="#063b28" fontWeight="900" sx={{ mt: 0.5 }}>
              ₹{service.price} <small style={{ fontSize: '0.8rem', color: '#597a6e' }}>/{service.priceUnit || "service"}</small>
            </Typography>
          </Box>
        </Paper>

        <Grid container spacing={4}>
          
          {/* Left Column: Booking Details Form */}
          <Grid item xs={12} md={7.5}>
            
            {/* DATE & TIME SLOT SECTION */}
            <Paper elevation={0} sx={{ p: 3.5, borderRadius: '24px', border: '1px solid #eef4f1', mb: 3, backgroundColor: '#ffffff' }}>
              <Typography variant="h6" fontWeight="800" color="#063b28" sx={{ display: 'flex', alignItems: 'center', mb: 2.5 }}>
                <CalendarMonthIcon sx={{ mr: 1, color: '#063b28' }} /> Select Schedule & Time Slot
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField 
                    fullWidth 
                    type="date" 
                    label="Preferred Date" 
                    InputLabelProps={{ shrink: true }} 
                    inputProps={{ min: new Date().toISOString().split("T")[0] }}
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)} 
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '14px' } }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth sx={{ '& .MuiOutlinedInput-root': { borderRadius: '14px' } }}>
                    <InputLabel id="time-slot-label">Time Slot</InputLabel>
                    <Select
                      labelId="time-slot-label"
                      value={timeSlot}
                      label="Time Slot"
                      onChange={(e) => setTimeSlot(e.target.value)}
                    >
                      <MenuItem value="09:00 AM - 11:00 AM">09:00 AM - 11:00 AM (Morning)</MenuItem>
                      <MenuItem value="11:00 AM - 01:00 PM">11:00 AM - 01:00 PM (Noon)</MenuItem>
                      <MenuItem value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM (Afternoon)</MenuItem>
                      <MenuItem value="04:00 PM - 06:00 PM">04:00 PM - 06:00 PM (Evening)</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Paper>

            {/* CONTACT & LOCATION INFO */}
            <Paper elevation={0} sx={{ p: 3.5, borderRadius: '24px', border: '1px solid #eef4f1', mb: 3, backgroundColor: '#ffffff' }}>
              <Typography variant="h6" fontWeight="800" color="#063b28" sx={{ display: 'flex', alignItems: 'center', mb: 2.5 }}>
                <PersonOutlineIcon sx={{ mr: 1, color: '#063b28' }} /> Student Contact & Location
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField 
                    fullWidth 
                    label="Your Full Name" 
                    value={contact.name}
                    onChange={(e) => setContact({...contact, name: e.target.value})}
                    placeholder="e.g. Priya Sharma"
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '14px' } }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField 
                    fullWidth 
                    label="Phone Number (WhatsApp)" 
                    value={contact.phone}
                    onChange={(e) => setContact({...contact, phone: e.target.value})}
                    placeholder="+91 9876543210"
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '14px' } }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField 
                    fullWidth 
                    label="Hostel Room / Campus Address" 
                    value={contact.address}
                    onChange={(e) => setContact({...contact, address: e.target.value})}
                    placeholder="Hostel 3, Room 104"
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '14px' } }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField 
                    fullWidth 
                    multiline 
                    rows={2} 
                    label="Special Notes or Requirements (Optional)" 
                    value={contact.notes}
                    onChange={(e) => setContact({...contact, notes: e.target.value})}
                    placeholder="Specify any details, model numbers, or special instructions..."
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '14px' } }}
                  />
                </Grid>
              </Grid>
            </Paper>

            <Alert severity="success" sx={{ borderRadius: '20px', backgroundColor: '#e6f5f0', border: '1px solid #bce2d5', color: '#063b28' }}>
              <Typography variant="subtitle2" fontWeight="800">
                ⚡ Student Satisfaction Guarantee
              </Typography>
              <Typography variant="body2">
                If the service is not completed as described, UnityRent will refund your booking fee 100%.
              </Typography>
            </Alert>

          </Grid>

          {/* Right Column: Price Summary Card */}
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
                Booking Price Summary
              </Typography>

              <Box display="flex" justifyContent="space-between" mb={1.5}>
                <Typography color="#597a6e" fontWeight="600">Service Fee</Typography>
                <Typography fontWeight="800" color="#063b28">₹{basePrice}</Typography>
              </Box>

              <Box display="flex" justifyContent="space-between" mb={1.5}>
                <Typography color="#597a6e" fontWeight="600">Campus Assurance Fee</Typography>
                <Typography fontWeight="800" color="#063b28">₹{platformFee}</Typography>
              </Box>

              <Divider sx={{ my: 2.5, borderColor: '#eef4f1' }} />

              <Box display="flex" justifyContent="space-between" alignItems="baseline" mb={3.5}>
                <Typography fontWeight="800" color="#063b28">Total Amount</Typography>
                <Typography variant="h4" fontWeight="900" color="#063b28">
                  ₹{totalPrice}
                </Typography>
              </Box>

              <Button 
                fullWidth 
                variant="contained" 
                disabled={!bookingDate || !contact.phone || !contact.address || !contact.name}
                onClick={() => {
                  const bookingData = {
                    serviceId: id,
                    renterName: contact.name,
                    renterPhone: contact.phone,
                    renterAddress: contact.address, 
                    startDate: bookingDate,
                    notes: contact.notes
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
                Confirm & Pay ₹{totalPrice}
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

export default BookService;
