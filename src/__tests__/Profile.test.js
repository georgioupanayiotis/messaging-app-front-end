import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../shared/AuthProvider";
import "@testing-library/jest-dom";
import Profile from "../pages/Profile";

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

describe("Profile Component", () => {
  test("renders 'Profile' text", () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <Profile />
        </MemoryRouter>
      </AuthProvider>
    );

     // Check if Dashboard appears
     const heading = screen.getByRole("heading", { level: 4, name: /profile/i });
    expect(heading).toBeInTheDocument();
  });
  const mockUser = {
    username: "testuser",
    email: "testuser@example.com",
  };

  test("renders form fields correctly", () => {
    render(
      <AuthProvider value={{ user: mockUser }}>
        <MemoryRouter>
          <Profile />
        </MemoryRouter>
      </AuthProvider>
    );

    // Ensure form fields exist
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });
  test("allows user to edit profile", () => {
    render(
      <AuthProvider value={{ user: mockUser }}>
        <MemoryRouter>
          <Profile />
        </MemoryRouter>
      </AuthProvider>
    );

    // Click "Edit Profile" button
    const editButton = screen.getByRole("button", { name: /edit_profile/i });
    fireEvent.click(editButton);

    // Ensure inputs are now editable
    const usernameInput = screen.getByLabelText(/username/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(usernameInput, { target: { value: "newuser" } });
    fireEvent.change(emailInput, { target: { value: "newuser@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "NewPassword123" } });

    // Click "Save Changes" button
    const saveButton = screen.getByRole("button", { name: /save changes/i });
    fireEvent.click(saveButton);

    // Check if input values are updated
    expect(usernameInput).toHaveValue("newuser");
    expect(emailInput).toHaveValue("newuser@example.com");
  });

  test("validates email input", () => {
    render(
      <AuthProvider value={{ user: mockUser }}>
        <MemoryRouter>
          <Profile />
        </MemoryRouter>
      </AuthProvider>
    );

    // Click "Edit Profile" button
    fireEvent.click(screen.getByRole("button", { name: /edit_profile/i }));

    // Enter an invalid email
    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });

    // Click "Save Changes" button
    fireEvent.click(screen.getByRole("button", { name: /save changes/i }));

    // Ensure error message is displayed
    expect(screen.getByText(/Invalid email address/i)).toBeInTheDocument();
  });
});