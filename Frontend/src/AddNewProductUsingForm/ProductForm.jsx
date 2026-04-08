import React, { useState } from 'react';
import { Button, TextField, MenuItem, Container, Paper, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // To redirect after saving
import axios from 'axios';

const AddProductForm = ({ refreshProducts }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    category: 'Academic',
    title: '',
    description: '',
    image: '',
    ratePerDay: '',
    securityDeposit: '',
    locationTag: '',
    condition: 'Good'
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:8080/newProduct', formData);
      alert("Product Listed Successfully!");
      
      // 1. Refresh the data in App.js
      if (refreshProducts) refreshProducts(); 
      
      // 2. Go back to Home Page automatically
      navigate('/'); 
    } catch (err) {
      console.error(err);
      alert("Error listing product. Check backend.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 5 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#002d5b' }}>
          List a New Rental Item
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Fill in the details below to make your item available for the campus.
        </Typography>

        <Box component="form" noValidate>
          <TextField 
            select 
            label="Category" 
            name="category" 
            value={formData.category} 
            onChange={handleChange} 
            fullWidth 
            margin="normal"
          >
            {["Academic", "Residential", "Commercial", "Furniture", "Electronics"].map((opt) => (
              <MenuItem key={opt} value={opt}>{opt}</MenuItem>
            ))}
          </TextField>

          <TextField label="Title" name="title" onChange={handleChange} fullWidth margin="normal" />
          
          <TextField 
            label="Description" 
            name="description" 
            multiline 
            rows={3} 
            onChange={handleChange} 
            fullWidth 
            margin="normal" 
          />

          <TextField label="Location (e.g. Hostel A)" name="locationTag" onChange={handleChange} fullWidth margin="normal" />
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField label="Rate/Day (₹)" name="ratePerDay" type="number" onChange={handleChange} fullWidth margin="normal" />
            <TextField label="Security (₹)" name="securityDeposit" type="number" onChange={handleChange} fullWidth margin="normal" />
          </Box>

          <TextField select label="Condition" name="condition" value={formData.condition} onChange={handleChange} fullWidth margin="normal">
            {["New", "Like New", "Good", "Fair"].map((opt) => (
              <MenuItem key={opt} value={opt}>{opt}</MenuItem>
            ))}
          </TextField>

          <TextField label="Image URL (Optional)" name="image" onChange={handleChange} fullWidth margin="normal" />

          <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
            <Button variant="outlined" fullWidth onClick={() => navigate('/')}>
              Cancel
            </Button>
            <Button variant="contained" fullWidth onClick={handleSubmit} sx={{ bgcolor: '#002d5b' }}>
              List Item
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default AddProductForm;