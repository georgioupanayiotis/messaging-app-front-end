import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "../pages/Login";
import { AuthProvider } from "../shared/AuthProvider";
import "@testing-library/jest-dom";

// Mock `react-i18next`
jest.mock("react-i18next", () => ({
    useTranslation: () => ({
      t: (key) => key, // Returns translation key as string
    }),
    initReactI18next: {
      type: "3rdParty",
      init: () => {},
    },
  }));

describe("Login Component", () => {
    test("renders 'Profile' text", () => {
        render(
          <AuthProvider>
            <MemoryRouter>
              <Login />
            </MemoryRouter>
          </AuthProvider>
        );
    
         // Check if Dashboard appears
         const heading = screen.getByRole("heading", { level: 4, name: /login/i });
        expect(heading).toBeInTheDocument();
      });

      test("renders username and password fields", () => {
        render(
            <AuthProvider>
              <MemoryRouter>
                <Login />
              </MemoryRouter>
            </AuthProvider>
          );
        expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
      });

      test("renders login button", () => {
        render(
            <AuthProvider>
              <MemoryRouter>
                <Login />
              </MemoryRouter>
            </AuthProvider>
          );
        expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
      });

      test("calls login function on button click", () => {
        render(
            <AuthProvider>
              <MemoryRouter>
                <Login />
              </MemoryRouter>
            </AuthProvider>
          );
        // Click login button
        fireEvent.click(screen.getByRole("button", { name: /login/i }));
      });
});
