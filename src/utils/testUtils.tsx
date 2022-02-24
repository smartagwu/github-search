import React, { FC } from "react";
import { Provider } from "react-redux";
import { render as rtlRender } from "@testing-library/react";
import { createStore } from "redux";
import rootReducer from "../store/RootReducer";

export function render(ui: JSX.Element, store = createStore(rootReducer)) {
  const Component: FC = () => {
    return <Provider store={store}>{ui}</Provider>;
  };
  return rtlRender(<Component />);
}

export * from "@testing-library/react";
