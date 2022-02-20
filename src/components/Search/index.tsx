import React, { ChangeEvent, CSSProperties, useEffect, useRef } from "react";
import "./SearchBar.scss";
import { ReactComponent as SearchImage } from "./images/search.svg";

export enum SearchBarSize {
  "input-small",
  "input-large"
}

type SearchBarSizeProps = "input-small" | "input-large";

interface SearchBarProps {
  name?: string;
  placeholder?: string;
  style?: CSSProperties;
  size?: SearchBarSizeProps;
  callback?: (event: ChangeEvent<HTMLInputElement>) => void;
}

function Search(props: SearchBarProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { size, name, style, placeholder, callback } = props;

  // async function onChange(e): Promise<any> {
  //   var value = e.target.value;
  //   var userSearchResult = await new Utils().searchUser(value, accessToken, true, false, "");
  //   var repositorySearchResult = await new Utils().searchRepository(
  //     value,
  //     accessToken,
  //     true,
  //     false,
  //     ""
  //   );

  //   if (!userSearchResult || !repositorySearchResult) {
  //     userSearchResult = {};
  //     repositorySearchResult = {};
  //   }

  //   callback(repositorySearchResult, userSearchResult, value);
  // }

  useEffect(() => {
    const container = containerRef.current;

    container?.addEventListener("focus", () => {
      if (container) container.style.border = "1px solid #000000";
    });

    container?.addEventListener("blur", () => {
      if (container) container.style.border = "1px solid #0000001f";
    });

    return () => {
      container?.removeEventListener("focus", () => {});
      container?.removeEventListener("blur", () => {});
    };
  });

  return (
    <div className={`search-bar ${size || SearchBarSize["input-small"].toString}`} style={style}>
      <SearchImage />
      <div className="input">
        <input
          type="text"
          onChange={callback}
          className="text-normal"
          name={name || "search bar input"}
          placeholder={placeholder || "Search..."}
          data-testid="search_bar_test_id"
        />
      </div>
    </div>
  );
}

export default Search;
