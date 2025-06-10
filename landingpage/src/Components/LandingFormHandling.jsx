
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
  Stack
} from "@mui/material";
import "../style/LandingFormHandling.css";

const LeadForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    // email: "",
    mobile: "",
    // brandname: "",
    category: "",
    // state: "",
    city: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[0-9]{10}$/;

    if (!formData.name.trim()) newErrors.name = "Please enter your name";
    // if (!formData.email.trim()) {
    //   newErrors.email = "Please enter your email";
    // } else if (!emailRegex.test(formData.email)) {
    //   newErrors.email = "Please enter a valid email";
    // }
    if (!formData.mobile.trim()) {
      newErrors.mobile = "Please enter your mobile number";
    } else if (!mobileRegex.test(formData.mobile)) {
      newErrors.mobile = "Enter a valid 10-digit mobile number";
    }
    // if (!formData.brandname.trim()) newErrors.brandname = "Please enter your company name";
    if (!formData.category.trim()) newErrors.category = "Please select a category";
    // if (!formData.state.trim()) newErrors.state = "Please enter your state";
    if (!formData.city.trim()) newErrors.city = "Please enter your city";
    // if (!formData.message.trim()) newErrors.message = "Please enter your message";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
    
    if (onSuccess) {
      onSuccess(); // Notify parent
    }
    setIsSubmitting(true);

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
      // email: "",
      mobile: "",
      // brandname: "",
      category: "",
      // state: "",
      city: "",
      // message: "",
    });
    setErrors({});
  };

  return (
    <div className="lead-form-container">
      <Grow in timeout={800}>
        <Paper elevation={8} className="lead-form-paper">
          {submitSuccess ? (
            <Box textAlign="center" py={5} px={8}>
              <Typography variant="h4" gutterBottom color="success.main">Thank You!</Typography>
              <Typography variant="body1">Your information has been submitted successfully.</Typography>
              <Typography variant="body2">You should be redirected to WhatsApp shortly.</Typography>
            </Box>
          ) : (
            <Box sx={{marginLeft: '15px' }} >
              <Typography variant="h5" textAlign="center"  fontWeight={700} color="orange">
                Talk to our experts
              </Typography>
              <Box className="form-scrollable-content"  >
                <form onSubmit={handleSubmit}> <Stack direction={{ xs: 'column', }} marginTop={2} spacing={2} flexWrap="wrap" >
                  <TextField
                    label="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    error={!!errors.name}
                    helperText={errors.name}
                    size="small"
                    required
                  />
                  <TextField
                    label="Mobile Number"
                    name="mobile"
                    type="tel"
                    value={formData.mobile}
                    onChange={handleChange}
                    error={!!errors.mobile}
                    helperText={errors.mobile}
                    inputProps={{ maxLength: 10 }}
                    size="small"
                    required
                  />
                  <TextField
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    error={!!errors.city}
                    helperText={errors.city}
                    size="small"
                    required
                  />
                  <FormControl error={!!errors.category} required size="small">
                    <InputLabel id="category-label">Category</InputLabel>
                    <Select
                      labelId="category-label"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      label="Category"
                      style={{ minWidth: 200 }}
                    >
                      {categoryOptions.map((option) => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                      ))}
                    </Select>
                    {errors.category && <Typography variant="caption" color="error">{errors.category}</Typography>}
                  </FormControl>
                </Stack>
                <Box mt={3}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ backgroundColor: "#27d808", color: "#fff" }}
                    disabled={isSubmitting}
                    endIcon={isSubmitting && <CircularProgress size={20} color="inherit" />}
                  >
                    {isSubmitting ? "Processing..." : "Submit"}
                  </Button>
                </Box>
                </form>
              </Box>
            </Box>
          )}
        </Paper>
      </Grow>
    </div>
  );
};

export default LeadForm;