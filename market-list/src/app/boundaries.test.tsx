import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ErrorPage from "./error";
import Loading from "./loading";
import NotFound from "./not-found";

describe("Application boundaries", () => {
  it("renders loading fallback content", () => {
    render(<Loading />);
    expect(screen.getByText("Loading market list...")).toBeInTheDocument();
  });

  it("renders not found fallback content", () => {
    render(<NotFound />);
    expect(screen.getByRole("heading", { name: "Page not found" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back to dashboard" })).toHaveAttribute("href", "/");
  });

  it("renders error fallback and allows retry", async () => {
    const user = userEvent.setup();
    const reset = vi.fn();

    render(<ErrorPage error={new Error("Boundary failure")} reset={reset} />);

    await user.click(screen.getByRole("button", { name: "Try again" }));
    expect(reset).toHaveBeenCalledTimes(1);
  });
});

