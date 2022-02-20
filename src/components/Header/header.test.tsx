import Header from ".";
import { render, screen } from "@testing-library/react";

test("Renders header component properly", () => {
  render(<Header showLogo={true} profile={{ name: "Smart Agwu" }} showSearchInput={true} />);

  const search = screen.getByTestId("search_bar_test_id");
  expect(search).toBeInTheDocument();
});
