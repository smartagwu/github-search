import React, { ChangeEvent, CSSProperties, KeyboardEvent, useEffect, useState } from "react";
import "./search.scss";
import { ReactComponent as SearchImage } from "./images/search.svg";

export enum SearchBarSize {
  small = "input-small",
  large = "input-large"
}

type SearchBarSizeProps = "input-small" | "input-large";

interface OwnProps {
  name?: string;
  placeholder?: string;
  style?: CSSProperties;
  size?: SearchBarSizeProps;
  callback: (inputValue: string) => void;
  onEnterKeyPressed?: () => void;
}

type Props = OwnProps;

function Search(props: Props) {
  const { size, name, style, placeholder } = props;
  const [_border, setBorder] = useState("1px solid #0000001f");

  const onSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { callback } = props;
    const inputValue = event.currentTarget.value;
    callback(inputValue);
  };

  const onEnterKey = (event: KeyboardEvent<HTMLInputElement>) => {
    const { onEnterKeyPressed } = props;
    if (event.key === "Enter" && onEnterKeyPressed) onEnterKeyPressed();
  };

  useEffect(() => {
    const container = document.getElementById("search-container");
    container?.addEventListener("focus", () => setBorder("1px solid #00000042"));
    container?.addEventListener("blur", () => setBorder("1px solid #0000001f"));

    return () => {
      container?.removeEventListener("focus", () => {});
      container?.removeEventListener("blur", () => {});
    };
  });

  return (
    <div
      className={`search-bar ${size || SearchBarSize.small}`}
      style={{ ...style, border: _border }}>
      <SearchImage />
      <div className="input">
        <input
          type="text"
          onChange={onSearchInputChange}
          id="search-container"
          className="text-normal"
          onKeyUp={onEnterKey}
          style={{ height: size || "auto" }}
          name={name || "search bar input"}
          placeholder={placeholder || "Search github..."}
          data-testid="search_bar_test_id"
        />
      </div>
    </div>
  );
}

export default Search;
