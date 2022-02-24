import Header from ".";
import { render, screen } from "../../utils/testUtils";

test("Renders header component properly", () => {
  render(<Header showLogo={true} showSearchInput={true} />);

  const search = screen.getByTestId("search_bar_test_id");
  expect(search).toBeInTheDocument();
});
