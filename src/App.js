import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline, Box } from "@mui/material";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Inbox from "./pages/Inbox";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import AuthContext, { AuthProvider } from "./shared/AuthProvider";
import ThemeProviderWrapper from "./shared/ThemeContext";
import AppBarComponent from "./components/AppBarComponent";
import Sidebar from "./components/Sidebar";

const drawerWidth = 240;

const ProtectedRoute = ({ element }) => {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) return null; // Prevents redirect loop on page load

  return user ? element : <Navigate to="/login" />;
};

// Redirect logged-in users away from login/register pages
const RedirectRoute = ({ element }) => {
  const { user } = useContext(AuthContext);
  return user ? <Navigate to="/dashboard" /> : element;
};

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProviderWrapper>
        <AuthProvider>
          <CssBaseline />
          <Router>
            <AuthContext.Consumer>
              {({ user }) => (
                <Box sx={{ display: "flex" }}>
                  {/* AppBar Component */}
                  <AppBarComponent isSidebarVisible={Boolean(user)} toggleSidebar={() => setMobileOpen(!mobileOpen)} />

                  {/* Show Sidebar only if user is logged in */}
                  {user && <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />}

                  {/* Main Content */}
                  <Box
                    component="main"
                    sx={{
                      flexGrow: 1,
                      p: 3,
                      ml: { md: user ? `${drawerWidth}px` : "0px", xs: "0px" },
                    }}
                  >
                    <Routes>
                      <Route path="/" element={<Navigate to="/login" />} />
                      <Route path="/login" element={<RedirectRoute element={<Login />} />} />
                      <Route path="/register" element={<RedirectRoute element={<Register />} />} />
                      <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
                      <Route path="/inbox" element={<ProtectedRoute element={<Inbox />} />} />
                      <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
                    </Routes>
                  </Box>
                </Box>
              )}
            </AuthContext.Consumer>
          </Router>
        </AuthProvider>
      </ThemeProviderWrapper>
    </I18nextProvider>
  );
}

export default App;
