import React from "react";
import asyncDelay from "../../../utils/asyncDelay";
import { render, screen } from "../../../utils/testUtils";
import App from "./App";

test("renders root view", async () => {
  render(<App />);
  await asyncDelay(3000);
  expect(screen.getByRole("button", { name: "Login to Github" })).toBeInTheDocument();
});
