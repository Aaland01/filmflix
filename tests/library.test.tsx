import { describe, it, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// Used github copilot to help making the tests as well as mock data
// Mock data
const movies = [
  { id: 1, title: "Movie 1", genre: "Action", year: 2021 },
  { id: 2, title: "Movie 2", genre: "Comedy", year: 2022 },
];

// Tests
describe("Renders main page correctly", async () => {
  it("Should render the page correctly", async () => {
    afterEach(() => {
      cleanup();
    });
});
});

