import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const { t } = useTranslation();
  const [editMode, setEditMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  // Load user data from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user")) || {
    username: "JohnDoe",
    password: "",
    email: "johndoe@example.com",
  };

  // Initialize user details
  const [profile, setProfile] = useState(storedUser);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setProfile(JSON.parse(storedUser));
    }
  }, [setProfile]);

  const handleInputChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!profile.username.trim()) {
      newErrors.username = t('username_required');
    } else if (profile.username.length < 4) {
      newErrors.username = t('username_length');
    }

    if (!profile.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) {
      newErrors.email = "Invalid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    // Save updated profile to localStorage
    localStorage.setItem("user", JSON.stringify(profile));

    setEditMode(false);
  };

  return (
    <Box sx={{ display: "flex", marginTop: 8, flexDirection: "column", gap: 3 }}>
      {/* Title */}
      <Typography variant="h4">{t('profile')}</Typography>

      <Paper sx={{ p: 3, maxWidth: 500 }}>
        <Typography variant="h6">User Information</Typography>

        <TextField
          label={t('username')}
          name="username"
          fullWidth
          margin="normal"
          value={profile.username}
          onChange={handleInputChange}
          disabled={!editMode}
          error={Boolean(errors.username)}
          helperText={errors.username}
        />

        <TextField
          label={t('password')}
          name="password"
          type={showPassword ? "text" : "password"}
          fullWidth
          margin="normal"
          value={profile.password}
          onChange={handleInputChange}
          disabled={!editMode}
          error={Boolean(errors.password)}
          helperText={errors.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label={t('email')}
          name="email"
          fullWidth
          margin="normal"
          value={profile.email}
          onChange={handleInputChange}
          disabled={!editMode}
          error={Boolean(errors.email)}
          helperText={errors.email}
        />

        {/* Edit & Save Buttons */}
        {editMode ? (
          <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleSave}>
            Save Changes
          </Button>
        ) : (
          <Button variant="outlined" fullWidth sx={{ mt: 2 }} onClick={() => setEditMode(true)}>
            {t('edit_profile')}
          </Button>
        )}
      </Paper>
    </Box>
  );
};

export default Profile;
