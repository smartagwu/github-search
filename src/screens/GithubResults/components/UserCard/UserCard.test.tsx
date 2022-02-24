import React from "react";
import UserCard from ".";
import { getStore } from "../../../../store/store";
import { render, screen } from "../../../../utils/testUtils";
import { User, UserSearch } from "../../domain/SearchRepository";
import { searchUserSuccessful } from "../../presentation/store/actions";
import { build, fake } from "@jackfranklin/test-data-bot";

const data = build({
  fields: {
    bio: fake((f) => f.lorem.paragraph()),
    location: fake((f) => f.address.city()),
    name: fake((f) => f.name.findName())
  }
});
const { bio, location, name } = data();
const users: User[] = [
  {
    bio: bio as string,
    location: location as string,
    name: name as string
  }
];

const userSearch: UserSearch = {
  nodes: users,
  userCount: 50,
  pageInfo: {
    endCursor: "",
    hasNextPage: false,
    hasPreviousPage: false,
    startCursor: ""
  }
};

test("User card renders properly", () => {
  render(<UserCard />);

  const fallback = screen.queryByTestId(/user.fallback-text/i);
  expect(fallback).toHaveTextContent("Sorry, no Github User found for your search");
});

test("Displays user data", async () => {
  const store = getStore();
  render(<UserCard />, store);

  store.dispatch(searchUserSuccessful(userSearch, "Test query"));
  expect(await screen.findByText(location as string)).toBeInTheDocument();
});
