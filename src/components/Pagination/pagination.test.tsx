import Pagination from ".";
import { render, screen } from "@testing-library/react";

test("Renders Pagination component", () => {
  render(<Pagination resultCount={10} />);

  const page = screen.getByTestId("pagination_id");
  expect(page).toBeInTheDocument();
});

test("Does not renders elements in Pagination component with no data", () => {
  render(<Pagination resultCount={0} />);

  const page = screen.getByTestId("pagination_id");
  expect(page).toBeNull();
});
