import React, { CSSProperties } from "react";
import { memoComponent } from "../../utils/memoComponent";
import "./button.scss";

interface OwnProps {
  id: string;
  text: string;
  callback: () => void;
  style?: CSSProperties;
}

type Props = OwnProps;

function Button(props: Props) {
  const { id, text, callback, style } = props;
  return (
    <button id={id} onClick={callback} style={style}>
      {text}
    </button>
  );
}

export default memoComponent(Button);
