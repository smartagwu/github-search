import React, { CSSProperties } from "react";
import icon from "./images/GitHub_Mark.png";
import logo from "./images/GitHub_Logo.png";
import { memoComponent } from "../../utils/memoComponent";

interface Props {
  height?: string;
  style?: CSSProperties;
}

function Logo(props: Props) {
  const { height, style } = props;

  return (
    <div data-testid="logo" style={{ ...style, display: "flex", height: `${height || "50px"}` }}>
      <img src={icon} alt="github icon" />
      <img src={logo} alt="github logo" />
    </div>
  );
}

export default memoComponent(Logo);
