import { render, screen } from "@testing-library/react";

import Home from "./page";

describe("Home route", () => {
  it("renders dashboard shell and route navigation", () => {
    render(<Home />);

    expect(screen.getByRole("heading", { name: "Market List" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Dashboard" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Open List Scaffold" })).toHaveAttribute(
      "href",
      "/lists/demo-list",
    );
  });
});

