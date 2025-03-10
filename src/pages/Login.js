import React, { useContext, useState } from "react";
import { Container, Paper, Typography, Button, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import AuthContext from "../shared/AuthProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { t } = useTranslation();
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "" });

  const validateForm = () => {
    let valid = true;
    let newErrors = { username: "", password: "" };

    if (!username.trim()) {
      newErrors.username = t("username_required");
      valid = false;
    }

    if (!password.trim()) {
      newErrors.password = t("password_required");
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLogin = () => {
    if (!validateForm()) return;

    // Mock user data (replace with real API call)
    const userData = {
      name: "John Doe",
      username: "johndoe",
      email: "john@doe.com",
      avatar: "https://i.pravatar.cc/150?img=3", // Random profile picture
    };
    login(userData);
    navigate("/dashboard"); // Redirect after login
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: 20, marginTop: 50 }}>
        <Typography variant="h4" align="center">
          {t("login")}
        </Typography>

        {/* Username Field */}
        <TextField
          fullWidth
          label={t("username")}
          margin="normal"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={!!errors.username}
          helperText={errors.username}
        />

        {/* Password Field */}
        <TextField
          fullWidth
          label={t("password")}
          type="password"
          margin="normal"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!errors.password}
          helperText={errors.password}
        />

        {/* Login Button */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: 20 }}
          onClick={handleLogin}
        >
          {t("login")}
        </Button>

        {/* Register Link */}
        <Typography variant="body2" align="center" style={{ marginTop: 15 }}>
          {t("not_registered")} <a href="/register">{t("register")}</a>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Login;
