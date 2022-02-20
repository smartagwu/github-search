import React from "react";
import icon from "../../assets/images/GitHub_Mark.png";
import logo from "../../assets/images/GitHub_Logo.png";
import { memoComponent } from "../memo-component";

interface Props {
  height?: string;
}

function Logo(props: Props) {
  const { height } = props;

  return (
    <div data-testid="logo" style={{ display: "flex", height: `${height || "70px"}` }}>
      <img src={icon} alt="github icon" />
      <img src={logo} alt="github logo" />
    </div>
  );
}

export default memoComponent(Logo);
