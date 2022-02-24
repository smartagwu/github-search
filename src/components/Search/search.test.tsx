import Search from ".";
import { render, screen } from "@testing-library/react";

test("Render search bar properly", () => {
  const callback = jest.fn();
  const onEnter = jest.fn();

  render(<Search callback={callback} placeholder="Test search" onEnterKeyPressed={onEnter} />);
  expect(screen.getByPlaceholderText(/Test search/i)).toBeInTheDocument();
});
