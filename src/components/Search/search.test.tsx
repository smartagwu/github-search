import Search from ".";
import { render, screen } from "@testing-library/react";

test("Render search bar properly", () => {
  render(<Search placeholder="Test search" />);
  expect(screen.getByPlaceholderText(/Test search/i)).toBeInTheDocument();
});
