import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../shared/AuthProvider";
import "@testing-library/jest-dom";
import Register from "../pages/Register";

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

describe("Register Component", () => {
  test("renders 'Profile' text", () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </AuthProvider>
    );

     // Check if Dashboard appears
     const heading = screen.getByRole("heading", { level: 4, name: /register/i });
    expect(heading).toBeInTheDocument();
  });
  test("renders all form fields", () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </AuthProvider>
    );

    // Ensure form fields exist
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });

  test("shows validation errors on empty submit", () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </AuthProvider>
    );

    // Click Register button without filling form
    const registerButton = screen.getByRole("button", { name: /register/i });
    fireEvent.click(registerButton);

    // Ensure validation messages appear
    expect(screen.getByText(/username_required/i)).toBeInTheDocument();
    expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
  });

  test("shows error when passwords do not match", () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </AuthProvider>
    );

    // Fill username and email fields correctly
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: "newuser" } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "newuser@example.com" } });

    // Enter mismatched passwords
    fireEvent.change(screen.getByLabelText(/^password$/i), { target: { value: "Password123" } });
    fireEvent.change(screen.getByLabelText(/^confirm_password$/i), { target: { value: "DifferentPass" } });

    // Click Register button
    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    // Ensure error message is displayed
    expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument();
  });

  test("allows successful registration when valid data is entered", () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </AuthProvider>
    );

    // Fill valid inputs
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: "validuser" } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "valid@example.com" } });
    fireEvent.change(screen.getByLabelText(/^password$/i), { target: { value: "ValidPass123" } });
    fireEvent.change(screen.getByLabelText(/^confirm_password$/i), { target: { value: "ValidPass123" } });

    // Click Register button
    fireEvent.click(screen.getByRole("button", { name: /register/i }));

  });
});