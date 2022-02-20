import { render, screen } from "@testing-library/react";
import Button from ".";

test("renders Button component", () => {
  render(<Button id="test-button-id" text="Test Button" callback={() => {}} />);

  const button = screen.getByText(/test button/i);
  expect(button).toBeInTheDocument();
});
