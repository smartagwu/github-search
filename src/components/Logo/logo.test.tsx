import { render, screen } from "@testing-library/react";
import Logo from ".";

describe("Logo component", () => {
  test("Renders correctly", () => {
    render(<Logo height="100px" />);
  });

  test("Displays correct height", () => {
    render(<Logo height="100px" />);

    const logoContainer = screen.getByTestId(/logo/i);
    expect(logoContainer.style.height).toEqual("100px");
  });
});
