import React, { useReducer, useEffect } from "react";
import "./Pagination.scss";
import arrowLeftWhite from "./image/arrow_left_white.svg";
import arrowLeftGrey from "./images/arrow_left_grey.svg";
import arrowRightGrey from "./images/arrow_right_grey.svg";
import arrowRightWhite from "./images/arrow_right_white.svg";
import { ButtonProps, PaginationProps, DispatchActionInterface, ButtonAction } from "./types";
import PaginationButton from "./PaginationButton";

const initialState = (resultCount: number): ButtonProps => {
  return {
    next: resultCount > 5,
    previous: false,
    currentSet: 1,
    activePageId: "page-1",
    start: 1,
    end: resultCount < 5 ? resultCount : 5
  };
};

const butonReducer = (state: ButtonProps, action: DispatchActionInterface): ButtonProps => {
  const { payload } = action;
  return { ...state, ...payload };
};

const pagesButtons = (start: number, end: number, onClick: (i: number) => void): JSX.Element[] => {
  var pages = [];
  for (let i = start; i <= end; i++) {
    const page = (
      <li id={`page-${i}`} key={`page-${i}`} onClick={() => onClick(i)}>
        {i}
      </li>
    );
    pages.push(page);
  }
  return pages;
};

const Pagination = (props: PaginationProps) => {
  const { resultCount, pageInfo, callback, showUsers } = props;
  const [buttonState, dispatch] = useReducer(butonReducer, null, () => initialState(resultCount));

  function switchPageSet(action: ButtonAction): void {
    const { previous, next, currentSet, activePageId } = buttonState;
    document.getElementById(activePageId)?.classList.remove("active");
    var newSet: number = currentSet;

    if (action === "next" && next) newSet = currentSet + 1;
    else if (action === "previous" && previous) newSet = currentSet - 1;

    var start = 5 * (newSet - 1) + 1;
    var end = 5 * newSet;

    if (start + 5 > resultCount) {
      start = resultCount - 4;
      end = resultCount;
    }

    dispatch({
      payload: {
        ...buttonState,
        end,
        start,
        currentSet: newSet,
        previous: start > 1,
        next: end < resultCount
      }
    });
  }

  async function fetchPage(number: number) {
    // var response = null;
    // var utils = new Utils();
    // if (showUsers) {
    //   if (number === 1) {
    //     response = await utils.searchUser(
    //       pageInfo.queryString,
    //       pageInfo.accessToken,
    //       true,
    //       false,
    //       ""
    //     );
    //   } else if (number === resultCount) {
    //     response = await utils.searchUser(
    //       pageInfo.queryString,
    //       pageInfo.accessToken,
    //       false,
    //       true,
    //       ""
    //     );
    //   } else {
    //     response = await utils.searchUser(
    //       pageInfo.queryString,
    //       pageInfo.accessToken,
    //       false,
    //       false,
    //       pageInfo.userEndCursor
    //     );
    //   }
    // } else {
    //   if (number === 1) {
    //     response = await utils.searchRepository(
    //       pageInfo.queryString,
    //       pageInfo.accessToken,
    //       true,
    //       false,
    //       ""
    //     );
    //   } else if (number === resultCount) {
    //     response = await utils.searchRepository(
    //       pageInfo.queryString,
    //       pageInfo.accessToken,
    //       false,
    //       true,
    //       ""
    //     );
    //   } else {
    //     response = await utils.searchRepository(
    //       pageInfo.queryString,
    //       pageInfo.accessToken,
    //       false,
    //       false,
    //       pageInfo.repositoryEndCursor
    //     );
    //   }
    // }
    // const id = "page-" + number;
    // document.getElementById(id)?.classList.add("active");
    // document.getElementById(buttonState.activePageId)?.classList.remove("active");
    // dispatch({ payload: { ...buttonState, activePageId: id } });
    // if (document.scrollingElement) document.scrollingElement.scrollTop = 0;
    // callback(response);
  }

  useEffect(() => {
    const { activePageId: id } = buttonState;
    document.getElementById(id)?.classList.add("active");
  }, [buttonState]);

  return (
    <>
      {resultCount > 0 && (
        <div className="pagination" data-testid="pagination_id">
          <PaginationButton
            id="previous_button"
            alt="arrow left icon"
            callback={() => switchPageSet("previous")}
            className={buttonState.previous ? "active" : ""}
            icon={buttonState.previous ? arrowLeftWhite : arrowLeftGrey}
          />

          <ul>{pagesButtons(buttonState.start, buttonState.end, fetchPage)}</ul>

          <PaginationButton
            id="next_button"
            alt="arrow right icon"
            callback={() => switchPageSet("next")}
            className={buttonState.next ? "active" : ""}
            icon={buttonState.next ? arrowRightWhite : arrowRightGrey}
          />
        </div>
      )}
    </>
  );
};

export default Pagination;
