import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grow,
  Paper,
} from "@mui/material";

import axios from "axios";

import "../style/LandingFormHandling.css";

const LeadForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    brandname: "",
    category: "",
    state: "",
    city: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [emailOtp, setEmailOtp] = useState("");
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [errors, setErrors] = useState({});


  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[0-9]{10}$/;

    if (!formData.name.trim()) newErrors.name = "Please enter your name";
    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.mobile.trim()) {
      newErrors.mobile = "Please enter your mobile number";
    } else if (!mobileRegex.test(formData.mobile)) {
      newErrors.mobile = "Enter a valid 10-digit mobile number";
    }
    if (!formData.brandname.trim()) newErrors.brandname = "Please enter your company name";
    if (!formData.category.trim()) newErrors.category = "Please select a category";
    if (!formData.state.trim()) newErrors.state = "Please enter your state";
    if (!formData.city.trim()) newErrors.city = "Please enter your city";
    if (!formData.message.trim()) newErrors.message = "Please enter your message";

    if (!emailVerified) {
      if (!emailOtp.trim()) {
        newErrors.emailOtp = "Please enter the OTP sent to your email";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendEmailOtp = async () => {
    try {
      if (!formData.email.trim()) {
        setErrors({...errors, email: "Please enter email first"});
        return;
      }
      
      const res = await axios.post('http://localhost:3000/api/form/send-otp', {
        identifier: formData.email,
        type: "email",
      });

      if (res.status === 200) {
        alert("OTP sent to your email.");
        setEmailOtpSent(true);
        localStorage.setItem("emailOtpToken", res.data.token);
      }
    } catch (error) {
      console.error("Error sending email OTP:", error);
      alert("Failed to send OTP. Please try again.");
    }
  };

  const verifyEmailOtp = async () => {
    try {
      if (!emailOtp.trim()) {
        alert("Please enter OTP first");
        return;
      }

      const res = await axios.post('http://localhost:3000/api/form/verify-otp', {
        identifier: formData.email,
        otp: emailOtp,
        token: localStorage.getItem("emailOtpToken"),
      });

      if (res.status === 200) {
        alert("Email verified successfully!");
        setEmailVerified(true);
      } else {
        alert("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying email OTP:", error);
      alert("Failed to verify OTP. Please try again.");
    }
  };

  const categoryOptions = [
    "Food & Beverage",
    "Retail",
    "Education",
    "Health & Wellness",
    "Automobile",
    "Entertainment",
    "Travel",
    "Real Estate",
    "Technology",
    "Others"
  ];

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({...errors, [e.target.name]: ""});
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    if (!emailVerified) {
      alert("Please verify your email first.");
      return;
    }
    if (onSuccess) {
      onSuccess(); // Notify parent
    }
    setIsSubmitting(true);

    // Use the deployed web app URL (replace with your actual deployed URL)
    const scriptURL = "https://script.google.com/macros/s/AKfycbxI1ILux6w14oSPTORJZtboq8hqM5PxwxuVoFxjG_vFfzeJjQZ5DFNqIfc_N-XopMfh/exec";

    try {
      // Create a hidden iframe to handle the submission
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.name = 'google-script-target';
      document.body.appendChild(iframe);

      // Create a form and submit it through the iframe
      const form = document.createElement('form');
      form.action = scriptURL;
      form.method = 'POST';
      form.target = 'google-script-target';
      
      // Add all form data as hidden inputs
      Object.entries(formData).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();

      // Clean up after submission
      setTimeout(() => {
        document.body.removeChild(form);
        document.body.removeChild(iframe);
      }, 1000);

      // Handle success
      setSubmitSuccess(true);
      resetForm();

      const whatsappMessage = `Hello, I'm ${formData.name}. I just submitted my details...`;
      const whatsappURL = `https://wa.me/+917449213799?text=${encodeURIComponent(whatsappMessage)}`;
      setTimeout(() => window.open(whatsappURL, "_blank"), 1000);

    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting your form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      mobile: "",
      brandname: "",
      category: "",
      state: "",
      city: "",
      message: "",
    });
    setEmailOtp("");
    setEmailOtpSent(false);
    setEmailVerified(false);
    setErrors({});
  };

  return (
    <div className="lead-form-container">
      <Grow in timeout={800}>
    <Paper elevation={8} className="lead-form-paper">
      {submitSuccess ? (
        <Box textAlign="center" py={5} px={8}   >
          <Typography variant="h4" gutterBottom color="success.main">Thank You!</Typography>
          <Typography variant="body1">Your information has been submitted successfully.</Typography>
          <Typography variant="body2">You should be redirected to WhatsApp shortly.</Typography>
        </Box>
      ) :  (
        <Box sx={{marginLeft: '15px'}}>
            
          <Typography variant="h4" textAlign="center" mb={2} fontWeight={700} color="orange">
            Get in Touch
          </Typography>
          <Box className="form-scrollable-content" sx={{marginRight: '-8px' }}>
            <form onSubmit={handleSubmit} >
              <Grid container spacing={2} sx={{marginTop: '10px'}}>
              
                <Grid item xs={12}>
                  <TextField 
                    fullWidth 
                    label="Your Name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange} 
                    size="small" 
                    error={!!errors.name}
                    helperText={errors.name}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField 
                    fullWidth 
                    label="Company Name" 
                    name="brandname" 
                    value={formData.brandname}
                    onChange={handleChange} 
                    size="small" 
                    error={!!errors.brandname}
                    helperText={errors.brandname}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField 
                    fullWidth 
                    label="Your Email" 
                    name="email" 
                    type="email" 
                    value={formData.email}
                    onChange={handleChange} 
                    size="small" 
                    error={!!errors.email}
                    helperText={errors.email}
                    required
                  />
                </Grid>
                {formData.email && !emailVerified && (
                  <>
                    <Grid item xs={12}>
                      <TextField 
                        fullWidth 
                        typeof="number"
                        label="Enter Email OTP" 
                        size="small"
                        inputProps={{ maxLength: 6 }}
                        value={emailOtp} 
                        onChange={(e) => {
                          const otp = e.target.value.replace(/\D/, "");
                          setEmailOtp(otp);
                        }}
                        error={emailOtpSent && emailOtp.length !== 6}
                        helperText={
                          emailOtpSent && emailOtp.length !== 6
                            ? "OTP must be 6 digits"
                            : ""
                        }
                        required
                                              />
                    </Grid>
                    <Grid item xs={12}>
                      {!emailOtpSent ? (
                        <Button fullWidth variant="outlined" color="primary" onClick={sendEmailOtp}>Send Email OTP</Button>
                      ) : (
                        <Button fullWidth variant="contained" onClick={verifyEmailOtp}>Verify Email</Button>
                      )}
                    </Grid>
                  </>
                )}
                <Grid item xs={12}>
                  <TextField 
                    fullWidth 
                    label="Your Mobile Number" 
                    name="mobile"
                    typeof="number"
                    inputProps={{ maxLength: 10 }}
                    inputMode="numeric"
                    pattern="[0-9]{10}"
                    type="tel" 
                    value={formData.mobile}
                    onChange={handleChange} 
                    size="small" 
                    error={!!errors.mobile}
                    helperText={errors.mobile}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField 
                    fullWidth 
                    label="State" 
                    name="state" 
                    size="small" 
                    value={formData.state}
                    onChange={handleChange} 
                    error={!!errors.state}
                    helperText={errors.state}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField 
                    fullWidth 
                    label="City" 
                    name="city" 
                    size="small" 
                    value={formData.city}
                    onChange={handleChange} 
                    error={!!errors.city}
                    helperText={errors.city}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth error={!!errors.category} required>
                    <InputLabel id="category-label" size="small">Category</InputLabel>
                    <Select
                      style={{ width: "220px" }}
                      labelId="category-label"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      label="Category"
                      size="small"
                    >
                      {categoryOptions.map((option) => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                      ))}
                    </Select>
                    {errors.category && <Typography variant="caption" color="error">{errors.category}</Typography>}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    style={{ width: "220px" }}
                    fullWidth
                    label="Your Message"
                    name="message"
                    multiline
                    size="small"
                    rows={2}
                    value={formData.message}
                    onChange={handleChange}
                    error={!!errors.message}
                    helperText={errors.message}
                    required
                  />
                </Grid>
                <Grid item xs={12} width={460}>
                  <Button
                    type="submit"
                    sx={{backgroundColor: "#27d808", color: "#fff"}}
                    variant="contained"
                    size="large"
                    fullWidth
                    disabled={isSubmitting}
                    endIcon={isSubmitting && <CircularProgress size={20} color="inherit" />}
                  >
                    {isSubmitting ? "Processing..." : "Submit"}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Box>
      )}
    </Paper>
  </Grow></div>
    
  );
};

export default LeadForm;
