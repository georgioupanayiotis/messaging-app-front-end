import React from "react";
import { Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar, useMediaQuery, useTheme, IconButton } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useAuthActions } from "../shared/AuthProvider";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useTranslation } from "react-i18next";

const drawerWidth = 240;

const Sidebar = ({ mobileOpen, setMobileOpen }) => {
  const { handleLogout } = useAuthActions();
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation(); // Get current route

  // Close drawer on mobile after clicking an item
  const handleClose = () => {
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  return (
    <>
      {/* Temporary Drawer for Mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { width: drawerWidth },
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton onClick={handleClose}>
            <ArrowBackIcon />
          </IconButton>
        </Toolbar>
        <List>
          {[
            { text: t('dashboard'), path: "/dashboard" },
            { text: t('inbox'), path: "/inbox" },
            { text: t('profile'), path: "/profile" },
          ].map(({ text, path }) => (
            <ListItem key={path} disablePadding>
              <ListItemButton
                component={Link}
                to={path}
                selected={location.pathname === path} // Highlight active route
                onClick={handleClose}
              >
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem disablePadding>
            <ListItemButton onClick={() => { handleLogout(); handleClose(); }}>
              <ListItemText primary={t('logout')} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      {/* Permanent Drawer for Desktop */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
        }}
      >
        <Toolbar />
        <List>
          {[
            { text: t('dashboard'), path: "/dashboard" },
            { text: t('inbox'), path: "/inbox" },
            { text: t('profile'), path: "/profile" },
          ].map(({ text, path }) => (
            <ListItem key={path} disablePadding>
              <ListItemButton
                component={Link}
                to={path}
                selected={location.pathname === path} // Highlight active route
              >
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemText primary={t('logout')} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
