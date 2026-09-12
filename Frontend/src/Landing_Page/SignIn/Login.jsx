import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Alert,
  CircularProgress,
  Tabs,
  Tab,
  Divider
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const Login = () => {
  const navigate = useNavigate();

  // Mode: 'login' | 'signup' | 'forgot' | 'reset'
  const [mode, setMode] = useState('login');
  
  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // UI States
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Reset state on tab/mode switch
  const handleTabChange = (event, newValue) => {
    setMode(newValue);
    setErrorMsg('');
    setSuccessMsg('');
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    axios.defaults.withCredentials = true;

    try {
      if (mode === 'signup') {
        if (!name.trim()) {
          setErrorMsg('Please enter your full name.');
          setLoading(false);
          return;
        }
        if (password !== confirmPassword) {
          setErrorMsg('Passwords do not match.');
          setLoading(false);
          return;
        }
        if (password.length < 6) {
          setErrorMsg('Password must be at least 6 characters long.');
          setLoading(false);
          return;
        }

        const res = await axios.post(`${API_BASE_URL}/api/auth/register`, {
          name,
          email,
          password
        });

        if (res.data && res.data.success) {
          setSuccessMsg('Account created successfully! Redirecting...');
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('userName', name);
          localStorage.setItem('userEmail', email);
          setTimeout(() => {
            navigate('/');
          }, 1500);
        } else {
          setErrorMsg(res.data?.message || 'Failed to create account.');
        }
      } else if (mode === 'login') {
        const res = await axios.post(`${API_BASE_URL}/api/auth/login`, {
          email,
          password
        });

        if (res.data && res.data.success) {
          setSuccessMsg('Logged in successfully! Redirecting...');
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('userEmail', email);
          if (res.data.user?.name) {
            localStorage.setItem('userName', res.data.user.name);
          }
          setTimeout(() => {
            navigate('/');
          }, 1200);
        } else {
          setErrorMsg(res.data?.message || 'Invalid credentials.');
        }
      } else if (mode === 'forgot') {
        const res = await axios.post(`${API_BASE_URL}/api/auth/send-reset-otp`, {
          email
        });

        if (res.data && res.data.success) {
          setSuccessMsg('Reset OTP has been sent to your email.');
          setMode('reset');
        } else {
          setErrorMsg(res.data?.message || 'Failed to send reset OTP.');
        }
      } else if (mode === 'reset') {
        const res = await axios.post(`${API_BASE_URL}/api/auth/reset-password`, {
          email,
          otp,
          newPassword
        });

        if (res.data && res.data.success) {
          setSuccessMsg('Password reset successfully! Please login with your new password.');
          setTimeout(() => {
            setMode('login');
            setPassword('');
          }, 2000);
        } else {
          setErrorMsg(res.data?.message || 'Failed to reset password.');
        }
      }
    } catch (err) {
      console.error('Auth Error:', err);
      setErrorMsg(err.response?.data?.message || err.message || 'An error occurred during request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f4faf8 0%, #e6f4f0 100%)',
        py: 6,
        px: 2
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: '28px',
            border: '1px solid #d4eae1',
            boxShadow: '0 12px 40px rgba(6, 59, 40, 0.08)',
            backgroundColor: '#ffffff',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Header Brand */}
          <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
            <Box
              sx={{
                width: 54,
                height: 54,
                borderRadius: '16px',
                backgroundColor: '#e6f5f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 1.5,
                color: '#063b28'
              }}
            >
              <LockOutlinedIcon fontSize="large" />
            </Box>
            <Typography variant="h5" fontWeight="800" color="#063b28" align="center">
              UnityRent
            </Typography>
            <Typography variant="body2" color="#597a6e" align="center">
              Campus Rental & Sharing Community
            </Typography>
          </Box>

          {/* Mode Switcher Tabs */}
          {(mode === 'login' || mode === 'signup') && (
            <Tabs
              value={mode}
              onChange={handleTabChange}
              variant="fullWidth"
              sx={{
                mb: 3,
                minHeight: '42px',
                backgroundColor: '#f4faf8',
                borderRadius: '14px',
                p: '4px',
                '& .MuiTabs-indicator': {
                  height: '100%',
                  borderRadius: '10px',
                  backgroundColor: '#063b28',
                  zIndex: 0
                }
              }}
            >
              <Tab
                label="Login"
                value="login"
                disableRipple
                sx={{
                  fontWeight: '700',
                  textTransform: 'none',
                  fontSize: '0.95rem',
                  zIndex: 1,
                  color: '#597a6e',
                  '&.Mui-selected': { color: '#ffffff' }
                }}
              />
              <Tab
                label="Sign Up"
                value="signup"
                disableRipple
                sx={{
                  fontWeight: '700',
                  textTransform: 'none',
                  fontSize: '0.95rem',
                  zIndex: 1,
                  color: '#597a6e',
                  '&.Mui-selected': { color: '#ffffff' }
                }}
              />
            </Tabs>
          )}

          {/* Title for Forgot Password / Reset */}
          {mode === 'forgot' && (
            <Box mb={2}>
              <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => setMode('login')}
                sx={{ color: '#063b28', textTransform: 'none', fontWeight: 700, mb: 1, p: 0 }}
              >
                Back to Login
              </Button>
              <Typography variant="h6" fontWeight="800" color="#063b28">
                Reset Password
              </Typography>
              <Typography variant="caption" color="#597a6e">
                Enter your registered campus email to receive a password reset OTP.
              </Typography>
            </Box>
          )}

          {mode === 'reset' && (
            <Box mb={2}>
              <Typography variant="h6" fontWeight="800" color="#063b28">
                Enter Reset OTP
              </Typography>
              <Typography variant="caption" color="#597a6e">
                We sent a verification code to {email}
              </Typography>
            </Box>
          )}

          {/* Feedback Alerts */}
          {errorMsg && (
            <Alert severity="error" sx={{ mb: 2, borderRadius: '12px', fontSize: '0.85rem' }}>
              {errorMsg}
            </Alert>
          )}

          {successMsg && (
            <Alert
              icon={<CheckCircleOutlineIcon fontSize="inherit" />}
              severity="success"
              sx={{ mb: 2, borderRadius: '12px', fontSize: '0.85rem' }}
            >
              {successMsg}
            </Alert>
          )}

          {/* Form Fields */}
          <Box component="form" onSubmit={handleSubmit}>
            {/* Full Name field for Sign Up */}
            {mode === 'signup' && (
              <TextField
                fullWidth
                label="Full Name"
                placeholder="Rahul Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineIcon sx={{ color: '#597a6e' }} />
                    </InputAdornment>
                  )
                }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '14px' } }}
              />
            )}

            {/* Email field */}
            <TextField
              fullWidth
              type="email"
              label="Campus Email Address"
              placeholder="student@campus.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlinedIcon sx={{ color: '#597a6e' }} />
                  </InputAdornment>
                )
              }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '14px' } }}
            />

            {/* Password field for Login & Sign Up */}
            {(mode === 'login' || mode === 'signup') && (
              <TextField
                fullWidth
                type={showPassword ? 'text' : 'password'}
                label="Password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon sx={{ color: '#597a6e' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '14px' } }}
              />
            )}

            {/* Confirm Password field for Sign Up */}
            {mode === 'signup' && (
              <TextField
                fullWidth
                type={showPassword ? 'text' : 'password'}
                label="Confirm Password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon sx={{ color: '#597a6e' }} />
                    </InputAdornment>
                  )
                }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '14px' } }}
              />
            )}

            {/* OTP & New Password fields for Password Reset */}
            {mode === 'reset' && (
              <>
                <TextField
                  fullWidth
                  label="OTP Code"
                  placeholder="123456"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  margin="normal"
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '14px' } }}
                />
                <TextField
                  fullWidth
                  type="password"
                  label="New Password"
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  margin="normal"
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '14px' } }}
                />
              </>
            )}

            {/* Forgot Password Link */}
            {mode === 'login' && (
              <Box display="flex" justifyContent="flex-end" mt={0.5} mb={2}>
                <Typography
                  variant="caption"
                  fontWeight="700"
                  color="#063b28"
                  sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                  onClick={() => {
                    setErrorMsg('');
                    setSuccessMsg('');
                    setMode('forgot');
                  }}
                >
                  Forgot Password?
                </Typography>
              </Box>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                mt: mode === 'signup' ? 2 : 1,
                mb: 2,
                py: 1.6,
                borderRadius: '50px',
                backgroundColor: '#063b28',
                fontWeight: '800',
                fontSize: '1rem',
                textTransform: 'none',
                boxShadow: '0 8px 20px rgba(6, 59, 40, 0.25)',
                '&:hover': { backgroundColor: '#042b1d' }
              }}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: '#ffffff' }} />
              ) : mode === 'signup' ? (
                'Create Account'
              ) : mode === 'login' ? (
                'Log In'
              ) : mode === 'forgot' ? (
                'Send Reset OTP'
              ) : (
                'Submit New Password'
              )}
            </Button>

            <Divider sx={{ my: 2, borderColor: '#f0f7f4' }} />

            {/* Bottom Toggle Text */}
            <Box textAlign="center">
              {mode === 'login' && (
                <Typography variant="body2" color="#597a6e">
                  Don't have an account?{' '}
                  <span
                    onClick={() => setMode('signup')}
                    style={{ color: '#063b28', fontWeight: 800, cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    Sign Up
                  </span>
                </Typography>
              )}
              {mode === 'signup' && (
                <Typography variant="body2" color="#597a6e">
                  Already registered?{' '}
                  <span
                    onClick={() => setMode('login')}
                    style={{ color: '#063b28', fontWeight: 800, cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    Log In
                  </span>
                </Typography>
              )}
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
