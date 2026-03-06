vi.mock("next/font/google", () => ({
  Geist: () => ({ variable: "geist-sans" }),
  Geist_Mono: () => ({ variable: "geist-mono" }),
}));

import RootLayout from "./layout";

describe("Root layout shell", () => {
  it("applies overflow protection for responsive widths", () => {
    const tree = RootLayout({ children: <div>content</div> });
    const body = tree.props.children;
    const shell = body.props.children;

    expect(shell.props.className).toContain("overflow-x-hidden");
    expect(shell.props.className).toContain("min-h-screen");
  });
});
