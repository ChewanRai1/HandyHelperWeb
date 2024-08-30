import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "./Login";
import { loginUSerApi } from "../../apis/api";
import { toast } from "react-hot-toast";

jest.mock("../../apis/api");
jest.mock("react-hot-toast");

describe("Login Component", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useNavigate: () => mockNavigate,
    }));
  });

  it("Should display validation errors when fields are empty", async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const loginButton = screen.getByText(/Log in/i);
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(
        screen.getByText(/Email is empty or forgot to put @/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/Password is Empty/i)).toBeInTheDocument();
    });
  });

  it("Should handle login failure due to missing or incorrect credentials", async () => {
    loginUSerApi.mockResolvedValue({
      data: {
        success: false,
        message: "Invalid credentials",
      },
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: "wrongpassword" },
    });

    fireEvent.click(screen.getByText(/Log in/i));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Invalid credentials");
    });
  });

  it("Should handle successful login and redirect to homepage", async () => {
    loginUSerApi.mockResolvedValue({
      data: {
        success: true,
        message: "Login successful",
        token: "fake-token",
        userData: { name: "Test User" },
      },
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: "correctpassword" },
    });

    fireEvent.click(screen.getByText(/Log in/i));

    await waitFor(() => {
      expect(localStorage.getItem("token")).toBe("fake-token");
      expect(localStorage.getItem("user")).toBe(
        JSON.stringify({ name: "Test User" })
      );
      expect(mockNavigate).toHaveBeenCalledWith("/");
      expect(toast.success).toHaveBeenCalledWith("Login successful");
    });
  });

  it("Should handle network error during login", async () => {
    loginUSerApi.mockRejectedValue(new Error("Network Error"));

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: "correctpassword" },
    });

    fireEvent.click(screen.getByText(/Log in/i));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "Login failed due to a network issue. Please try again later."
      );
    });
  });
});
