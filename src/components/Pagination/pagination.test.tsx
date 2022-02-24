import userEvent from "@testing-library/user-event";
import Pagination from ".";
import { render, screen } from "../../utils/testUtils";

test("Renders Pagination component", () => {
  render(<Pagination resultCount={20} isUser={false} />);

  const page = screen.getByTestId("pagination_id");
  expect(page).toBeInTheDocument();
});

test("Does not renders elements in Pagination component with 10 or less data", () => {
  render(<Pagination resultCount={10} isUser={false} />);

  const page = screen.queryByTestId("pagination_id");
  expect(page).toBeNull();
});

test("Pagination next is active", () => {
  render(<Pagination resultCount={60} isUser={false} />);

  const page = screen.getByTestId("pagination-next");
  expect(page.classList.contains("active")).toEqual(true);

  userEvent.click(page);
  const button = screen.getByText("6");
  expect(button).toBeInTheDocument();
  expect(page.classList.contains("active")).toEqual(false);
});
