import React, { useContext } from "react";
import { Container, Paper, Typography, Button, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import AuthContext from "../shared/AuthProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { t } = useTranslation();
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    // Mock user data (replace with real API call)
    const userData = {
      name: "John Doe",
      username: 'johndoe',
      email:'john@doe.com',
      avatar: "https://i.pravatar.cc/150?img=3" // Random profile picture
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
        />

        {/* Password Field */}
        <TextField
          fullWidth
          label={t("password")}
          type="password"
          margin="normal"
          variant="outlined"
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
