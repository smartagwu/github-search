import ProfileMenu from ".";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

test("Render component properly", () => {
  render(<ProfileMenu name="Smart Agwu" />);
  expect(screen.getByText(/smart agwu/i)).toBeInTheDocument();
});

test("Displays menu card on click", async () => {
  render(<ProfileMenu name="Smart Agwu" />);

  const menuCard = screen.getByTestId("menu-card-id");

  userEvent.click(menuCard);
  expect(await screen.findByText(/logout/i)).toBeInTheDocument();

  userEvent.click(menuCard);
  expect(await screen.findByText(/logout/i)).not.toBeInTheDocument();
});
