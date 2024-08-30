import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Register from "./Register";
import { registerUSerApi } from "../../apis/api";
import { toast } from "react-hot-toast";

// Mock the API and toast functions
jest.mock("../../apis/api");
jest.mock("react-hot-toast");

describe("Register Component", () => {
  it("Should display success toast message on successful registration", async () => {
    const mockResponse = {
      data: {
        success: true,
        message: "Registration successful",
      },
    };

    registerUSerApi.mockResolvedValue(mockResponse);
    toast.success = jest.fn();

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    const firstName = await screen.findByPlaceholderText("First Name");
    const lastName = screen.getByPlaceholderText("Last Name");
    const email = screen.getByPlaceholderText("Email");
    const phone = screen.getByPlaceholderText("Phone");
    const password = screen.getByPlaceholderText("Password");
    const registerButton = screen.getByText("Create Account");

    fireEvent.change(firstName, { target: { value: "Chewan" } });
    fireEvent.change(lastName, { target: { value: "Rai" } });
    fireEvent.change(email, { target: { value: "Chewan@example.com" } });
    fireEvent.change(phone, { target: { value: "1234567890" } });
    fireEvent.change(password, { target: { value: "password123" } });

    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(registerUSerApi).toHaveBeenCalledTimes(1);
      expect(toast.success).toHaveBeenCalledWith(mockResponse.data.message);
    });
  });

  it("Should display error toast message when registration fails", async () => {
    const mockResponse = {
      data: {
        success: false,
        message: "Registration failed!",
      },
    };

    registerUSerApi.mockResolvedValue(mockResponse);
    toast.error = jest.fn();

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    const firstName = await screen.findByPlaceholderText("First Name");
    const lastName = screen.getByPlaceholderText("Last Name");
    const email = screen.getByPlaceholderText("Email");
    const phone = screen.getByPlaceholderText("Phone");
    const password = screen.getByPlaceholderText("Password");
    const registerButton = screen.getByText("Create Account");

    fireEvent.change(firstName, { target: { value: "Chewan" } });
    fireEvent.change(lastName, { target: { value: "Rai" } });
    fireEvent.change(email, { target: { value: "Chewan@example.com" } });
    fireEvent.change(phone, { target: { value: "1234567890" } });
    fireEvent.change(password, { target: { value: "password123" } });

    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(registerUSerApi).toHaveBeenCalledTimes(1);
      expect(toast.error).toHaveBeenCalledWith(mockResponse.data.message);
    });
  });

  it("Should display validation errors when fields are empty", async () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    const registerButton = screen.getByText("Create Account");

    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(screen.getByText("First name is empty")).toBeInTheDocument();
      expect(screen.getByText("Last name is empty")).toBeInTheDocument();
      expect(
        screen.getByText("Email is empty or forgot to put @")
      ).toBeInTheDocument();
      expect(screen.getByText("Please enter phone no")).toBeInTheDocument();
      expect(screen.getByText("Password is Empty")).toBeInTheDocument();
    });
  });
});
