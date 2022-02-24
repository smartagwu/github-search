import React from "react";
import Login from ".";
import { getStore } from "../../../store/store";
import { render, screen } from "../../../utils/testUtils";
import { AccessTokenResponse } from "../domain/LoginRepository";
import { getAccessTokenSuccessful } from "./store/actions";
import { build, fake } from "@jackfranklin/test-data-bot";

const data = build({
  fields: {
    access_token: fake((f) => f.datatype.uuid()),
    scope: fake((f) => f.helpers.randomize()),
    token_type: "bearer"
  }
});
const { access_token, scope, token_type } = data();
const accessTokenResponse: AccessTokenResponse = {
  data: {
    access_token: access_token as string,
    scope: scope as string,
    token_type: token_type as string
  },
  message: "Succesful"
};

test("Login component renders properly", () => {
  render(<Login />);
  const button = screen.getByRole("button", { name: "Login to Github" });
  expect(button).toBeInTheDocument();
});

test("Login to github", async () => {
  const store = getStore();

  render(<Login />, store);

  store.dispatch(getAccessTokenSuccessful(accessTokenResponse));
  expect(await screen.findByText(/Authenticating.../i)).toBeInTheDocument();
});
