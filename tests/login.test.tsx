import { describe, it, expect, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { Login } from "../src/Login";
import React from "react";
import { BrowserRouter } from "react-router-dom";

// Tests
describe("Renders main page correctly", async () => {
  it("Should render the page correctly", async () => {
    afterEach(() => {
      cleanup();
    });

    // Setup
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const signInButton = screen.getByRole("button", { name: "Sign In" });
    const filmflixLogo = screen.getByAltText("FilmFlix Logo");
    const emailInput = screen.getByPlaceholderText("Email Address");
    const passwordInput = screen.getByPlaceholderText("Password");

    // Expectations
    expect(signInButton).toBeInTheDocument();
    expect(filmflixLogo).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });
});
