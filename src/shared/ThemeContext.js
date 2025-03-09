import React, { createContext, useState, useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import * as locales from "@mui/material/locale";

export const ThemeContext = createContext();

const ThemeProviderWrapper = ({ children }) => {
  const storedTheme = localStorage.getItem("theme") === "dark";
  const storedLocale = localStorage.getItem("locale") || "en";

  const [darkMode, setDarkMode] = useState(storedTheme);
  const [locale, setLocale] = useState(storedLocale);

  const theme = useMemo(
    () =>
      createTheme(
        {
          palette: {
            mode: darkMode ? "dark" : "light",
          },
        },
        locales[locale] || locales.enUS
      ),
    [darkMode, locale]
  );

  const toggleTheme = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("theme", newMode ? "dark" : "light");
      return newMode;
    });
  };

  const changeLocale = (newLocale) => {
    setLocale(newLocale);
    localStorage.setItem("locale", newLocale);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme, locale, changeLocale }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProviderWrapper;
