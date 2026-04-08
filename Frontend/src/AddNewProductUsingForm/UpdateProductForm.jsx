import React,{useState,useEffect} from 'react';
import { Button, TextField, MenuItem, Container, Paper, Typography, Box, CircularProgress } from '@mui/material';
import { useNavigate,useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateProductForm=({refreshProducts})=>{
        const {id}=useParams();
        const navigate=useNavigate();
        const [loading,setLoading]=useState(true);
        const [formData,setFormData]=useState({
            category: '',
            title: '',
            description: '',
            image: '',
            ratePerDay: '',
            securityDeposit: '',
            locationTag: '',
            condition: ''
        });
        useEffect(()=>{
            axios.get(`http://localhost:8080/item/${id}`)
            .then((res)=>{
                const data=res.data;
             setFormData({
                category: data.category || '',
                title: data.title || '',
                description: data.description || '',
                image: data.image || '',
                locationTag: data.locationTag || '',
                condition: data.condition || '',
                ratePerDay: data.pricing?.ratePerDay || '',
                securityDeposit: data.pricing?.securityDeposit || ''
            });
        setLoading(false)
            }).catch((err)=>{
                console.error("error",err);
                setLoading(false);
            })
        },[id]);

        const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

        const handleSubmit=async(e)=>{
            e.preventDefault();
            const updatedPayload = {
        category: formData.category,
        title: formData.title,
        description: formData.description,
        image: formData.image,
        locationTag: formData.locationTag,
        condition: formData.condition,
        pricing: {
            ratePerDay: Number(formData.ratePerDay),
            securityDeposit: Number(formData.securityDeposit)
        }
    };
            try{
           await axios.put(`http://localhost:8080/item/${id}`,updatedPayload);
           alert("Product Updated Successfully");

           if(refreshProducts)refreshProducts();
           navigate(`/item/${id}`)
            }catch(err){
                console.error(err);
                alert("product is update to fail");
            }
        };

        if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;

        return (
    <Container maxWidth="sm" sx={{ py: 5 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#002d5b' }}>
          Edit Your Listing
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField select label="Category" name="category" value={formData.category} onChange={handleChange} fullWidth margin="normal">
            {["Academic", "Residential", "Commercial", "Furniture", "Electronics"].map((opt) => (
              <MenuItem key={opt} value={opt}>{opt}</MenuItem>
            ))}
          </TextField>

          <TextField label="Title" name="title" value={formData.title} onChange={handleChange} fullWidth margin="normal" />
          
          <TextField label="Description" name="description" value={formData.description} multiline rows={3} onChange={handleChange} fullWidth margin="normal" />

          <TextField label="Location" name="locationTag" value={formData.locationTag} onChange={handleChange} fullWidth margin="normal" />
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField label="Rate/Day (₹)" name="ratePerDay" type="number" value={formData.ratePerDay} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="Security (₹)" name="securityDeposit" type="number" value={formData.securityDeposit} onChange={handleChange} fullWidth margin="normal" />
          </Box>

          <TextField select label="Condition" name="condition" value={formData.condition} onChange={handleChange} fullWidth margin="normal">
            {["New", "Like New", "Good", "Fair"].map((opt) => (
              <MenuItem key={opt} value={opt}>{opt}</MenuItem>
            ))}
          </TextField>

          <TextField label="Image URL" name="image" value={formData.image} onChange={handleChange} fullWidth margin="normal" />

          <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
            <Button variant="outlined" fullWidth onClick={() => navigate(-1)}>Cancel</Button>
            <Button type="submit" variant="contained" fullWidth sx={{ bgcolor: '#002d5b' }}>Save Changes</Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );

}
export default UpdateProductForm;