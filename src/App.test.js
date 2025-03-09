import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { MemoryRouter } from "react-router-dom";
import Login from "./pages/Login";
import { AuthProvider } from "./shared/AuthProvider";
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
  test("renders 'Login' text", () => {
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
});