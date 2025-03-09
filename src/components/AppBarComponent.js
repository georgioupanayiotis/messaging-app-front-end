import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Select,
  Menu,
  Box,
  useMediaQuery,
} from "@mui/material";
import { Menu as MenuIcon, Brightness4 as MoonIcon, Brightness7 as SunIcon } from "@mui/icons-material";
import { ThemeContext } from "../shared/ThemeContext";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";

const AppBarComponent = ({ isSidebarVisible, toggleSidebar }) => {
  const { darkMode, toggleTheme, locale, changeLocale } = useContext(ThemeContext);
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Detect mobile screen size

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleLanguageChange = (event) => {
    const newLang = event.target.value;
    changeLocale(newLang);
    i18n.changeLanguage(newLang);
    handleMenuClose()
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { md: isSidebarVisible ? `calc(100% - 240px)` : "100%", xs: "100%" }, // Adjust width dynamically
        ml: { md: isSidebarVisible ? "240px" : "0px", xs: "0px" }, // Shift when sidebar is open
      }}
    >
      <Toolbar>
        {/* Hamburger Icon for Mobile Sidebar */}
        {isSidebarVisible && (
          <IconButton color="inherit" onClick={toggleSidebar} sx={{ display: { md: "none", xs: "block" } }}>
            <MenuIcon />
          </IconButton>
        )}

        {/* Title on the left */}
        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: { xs: "center", md: "left" } }}>
          {t("app_title")}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* Theme Toggle Button */}
          <IconButton color="inherit" onClick={toggleTheme}>
            {darkMode ? <SunIcon /> : <MoonIcon />}
          </IconButton>

          {/* Responsive Language Selector */}
          {isMobile ? (
            <>
              <IconButton color="inherit" onClick={handleMenuOpen}>
                🌐
              </IconButton>
              <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
                <MenuItem onClick={() => handleLanguageChange({ target: { value: "en" } })}>
                  🇺🇸 English
                </MenuItem>
                <MenuItem onClick={() => handleLanguageChange({ target: { value: "fr" } })}>
                  🇫🇷 Français
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Select
              value={locale}
              onChange={handleLanguageChange}
              sx={{ color: "white", ml: 2, borderColor: "white" }}
              variant="standard"
            >
              <MenuItem value="en">🇺🇸 English</MenuItem>
              <MenuItem value="fr">🇫🇷 Français</MenuItem>
            </Select>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;
