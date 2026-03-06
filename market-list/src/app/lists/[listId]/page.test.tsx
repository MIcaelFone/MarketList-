import { render, screen } from "@testing-library/react";

import ListPage from "./page";

describe("List route scaffold", () => {
  it("renders the dynamic listId route content", async () => {
    const view = await ListPage({ params: Promise.resolve({ listId: "demo-list" }) });
    render(view);

    expect(screen.getByRole("heading", { name: "List Details" })).toBeInTheDocument();
    expect(screen.getByText("demo-list")).toBeInTheDocument();
  });
});

