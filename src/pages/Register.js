import React, { useContext, useState } from "react";
import { Container, Paper, Typography, Button, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import AuthContext from "../shared/AuthProvider";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { t } = useTranslation();
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // State for form fields
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = t('username_required');
    } else if (formData.username.length < 4) {
      newErrors.username = t('username_length');
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle registration
  const handleRegister = () => {
    if (!validateForm()) return;

    // Mock user data (Replace with API call if needed)
    const newUser = {
      id: Date.now(),
      username: formData.username,
      email: formData.email,
    };

    login(newUser); // Log the user in automatically
    navigate("/dashboard"); // Redirect to dashboard after successful registration
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 5 }}>
        <Typography variant="h4" align="center">
          {t("register")}
        </Typography>

        {/* Username Field */}
        <TextField
          fullWidth
          label={t('username')}
          name="username"
          value={formData.username}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          error={Boolean(errors.username)}
          helperText={errors.username}
        />

        {/* Email Field */}
        <TextField
          fullWidth
          label={t('email')}
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          error={Boolean(errors.email)}
          helperText={errors.email}
        />

        {/* Password Field */}
        <TextField
          fullWidth
          label={t('password')}
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          error={Boolean(errors.password)}
          helperText={errors.password}
        />

        {/* Confirm Password Field */}
        <TextField
          fullWidth
          label={t('confirm_password')}
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          error={Boolean(errors.confirmPassword)}
          helperText={errors.confirmPassword}
        />

        {/* Register Button */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleRegister}
        >
          {t("register")}
        </Button>

        {/* Already have an account? Login */}
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          {t("already_registered")} <a href="/login">{t("login")}</a>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Register;
