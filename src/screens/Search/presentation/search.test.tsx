import React from "react";
import Search from ".";
import { setupServer } from "msw/node";
import { render, screen } from "../../../utils/testUtils";
import { graphql } from "msw";
import { build, fake } from "@jackfranklin/test-data-bot";
import userEvent from "@testing-library/user-event";

const handlers = [
  graphql.operation((req, res, ctx) => {
    return res(ctx.data({}));
  })
];
const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("Renders search component properly", () => {
  render(<Search />);

  const searchButton = screen.getByRole("button", { name: "Search Github" });
  expect(searchButton).toBeInTheDocument();
});

test("Shows profile menu", () => {
  render(<Search />);

  const profileMenu = screen.getByTestId("menu-card-id");
  expect(profileMenu).toBeInTheDocument();
});

test("Search github", async () => {
  const form = build({
    fields: { queryString: fake((f) => f.random.words(2)) }
  });

  render(<Search />);

  const { queryString } = form();
  const searchInput = screen.getByTestId("search_bar_test_id");
  const searchButton = screen.getByRole("button", { name: "Search Github" });

  userEvent.type(searchInput, queryString as string);
  userEvent.click(searchButton);
});
