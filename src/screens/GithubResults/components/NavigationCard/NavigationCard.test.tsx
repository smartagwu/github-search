import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import Navigationcard from ".";
import { SearchTypes } from "../../domain/SearchRepository";

test("Navigation card renders properly", () => {
  const callback = jest.fn((type: SearchTypes) => {});
  render(<Navigationcard callback={callback} repositoryCount={10} userCount={7} />);

  const repository = screen.getByTestId(/navigation-card-repository/i);
  userEvent.click(repository);
  expect(callback).toBeCalledWith(SearchTypes.repository);
});
