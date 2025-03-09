import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../shared/AuthProvider";
import "@testing-library/jest-dom";
import Inbox from "../pages/Inbox";

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

describe("Inbox Component", () => {
  test("renders 'Profile' text", () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <Inbox />
        </MemoryRouter>
      </AuthProvider>
    );
     // Check if Inbox appears
     const heading = screen.getByRole("heading", { level: 4, name: /inbox/i });
    expect(heading).toBeInTheDocument();
  });

  test("renders received messages", () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <Inbox />
        </MemoryRouter>
      </AuthProvider>
    );
      // Check if received messages are displayed
    expect(screen.getByText(/Received Messages/i)).toBeInTheDocument();
    // expect(screen.getByText(/bob: how are you\?/i)).toBeInTheDocument();
    // expect(screen.getByText(/charlie: good morning!/i)).toBeInTheDocument();
  });

  test("renders Send a Message", () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <Inbox />
        </MemoryRouter>
      </AuthProvider>
    );
      // Check if received messages are displayed
    expect(screen.getByText(/Send a Message/i)).toBeInTheDocument();
  });

  test("opens delete confirmation dialog", async () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <Inbox />
        </MemoryRouter>
      </AuthProvider>
    );
    // Click the delete icon of the first message
    fireEvent.click(screen.getAllByLabelText(/delete/i)[0]);

    // Check if the confirmation dialog appears
    await waitFor(() => {
      expect(screen.getByText(/confirm deletion/i)).toBeInTheDocument();
    });
  });

  test("deletes a message", async () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <Inbox />
        </MemoryRouter>
      </AuthProvider>
    );
    // Click delete on the first message
    fireEvent.click(screen.getAllByLabelText(/delete/i)[0]);

    // Wait for dialog
    await waitFor(() => {
      expect(screen.getByText(/confirm deletion/i)).toBeInTheDocument();
    });

    // Confirm deletion
    fireEvent.click(screen.getByRole("button", { name: /delete/i }));

    // Ensure message is deleted
    await waitFor(() => {
      expect(screen.queryByText(/alice: hello!/i)).not.toBeInTheDocument();
    });
  });

  test("sends a new message", async () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <Inbox />
        </MemoryRouter>
      </AuthProvider>
    );
    // Select recipient
    // Open recipient dropdown
  fireEvent.mouseDown(screen.getByText(/select recipient/i));

  // Select "Bob" from the dropdown
  fireEvent.click(screen.getByRole("option", { name: /bob/i }));

  // Enter a message
  fireEvent.change(screen.getByLabelText(/type your message/i), {
    target: { value: "This is a test message." },
  });

  // Click send button
  fireEvent.click(screen.getByRole("button", { name: /send/i }));

  // Check if the new message appears in the inbox
  await waitFor(() => {
    expect(screen.getByText(/you: this is a test message\./i)).toBeInTheDocument();
  });
  });
});