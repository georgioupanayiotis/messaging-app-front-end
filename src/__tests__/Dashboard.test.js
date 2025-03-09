import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../shared/AuthProvider";
import "@testing-library/jest-dom";
import Dashboard from "../pages/Dashboard";

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

describe("Dashboard Component", () => {
  test("renders most frequent", () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <Dashboard />
        </MemoryRouter>
      </AuthProvider>
    );


    // most_frequent is now visible
    expect(screen.getByText(/most_frequent/i)).toBeInTheDocument();

  });

  test("renders last 10 messages", () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <Dashboard />
        </MemoryRouter>
      </AuthProvider>
    );


    // last_ten_messages is now visible
    expect(screen.getByText(/last_ten_messages/i)).toBeInTheDocument();
  });
  
});