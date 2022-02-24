import React, { useEffect, useState } from "react";
import "./pagination.scss";
import arrowLeftWhite from "./images/arrow_left_grey.svg";
import arrowLeftGrey from "./images/arrow_left_grey.svg";
import arrowRightGrey from "./images/arrow_right_grey.svg";
import arrowRightWhite from "./images/arrow_right_white.svg";
import {
  ButtonProps,
  Props,
  ButtonAction,
  PaginationStoreDispatchProps,
  PaginationStoreStateProps
} from "./types";
import PaginationButton from "./PaginationButton";
import { connect } from "react-redux";
import { SearchRequest } from "../../screens/GithubResults/domain/SearchRepository";
import {
  triggerSearchUser,
  triggerSearchRepository
} from "../../screens/GithubResults/presentation/store/actions";
import { AppState } from "../../store/RootReducer";

const initialState = (resultCount: number): ButtonProps => {
  const end = resultCount > 50 ? 5 : Math.ceil(resultCount / 10);
  const currentSet = 1;
  return {
    next: end * 10 < resultCount,
    previous: false,
    currentSet,
    activePageId: "page-1",
    start: 1,
    end
  };
};

const pagesButtons = (props: ButtonProps, onClick: (index: number) => void): JSX.Element[] => {
  const { start, end } = props;
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

const Pagination = (props: Props) => {
  const { resultCount } = props;
  const [buttonProps, setButtonProps] = useState(initialState(resultCount));
  const { start, end, next, previous } = buttonProps;

  function switchPageSet(action: ButtonAction): void {
    const { previous, next, currentSet, activePageId } = buttonProps;
    document.getElementById(activePageId)?.classList.remove("active");
    var _newSet = currentSet;
    var _newResultCount = resultCount;
    var _newEnd = end;
    var _newStart = start;

    if (action === "next" && next) {
      _newSet = currentSet + 1;
      _newResultCount = resultCount - end * 10;
      _newEnd = _newResultCount > 50 ? _newSet * 5 : Math.ceil(_newResultCount / 10) + end;
      _newStart = _newEnd - 4;
    } else if (action === "previous" && previous) {
      _newSet = currentSet - 1;
      _newStart = start - 5 < 1 ? 1 : start - 5;
      _newEnd = _newStart + 4;
    }

    setButtonProps((props) => {
      return {
        ...props,
        end: _newEnd,
        start: _newStart,
        currentSet: _newSet,
        previous: _newStart > 1,
        next: _newEnd * 10 < resultCount
      };
    });
  }

  async function searchGithub(index: number) {
    if (props.isUser) {
      const { queryString, searchUser, accessToken, usersEndCursor } = props;
      const request: SearchRequest = {
        endCursor: index > 1 && index < resultCount ? usersEndCursor : "",
        getFirst: index === 1 ? true : false,
        getLast: index === resultCount ? true : false,
        queryString: queryString || "",
        accessToken: accessToken || ""
      };
      searchUser(request);
    } else {
      const { queryString, searchRepository, accessToken, repositoriesEndCursor } = props;
      const request: SearchRequest = {
        endCursor: index > 1 && index < resultCount ? repositoriesEndCursor : "",
        getFirst: index === 1 ? true : false,
        getLast: index === resultCount ? true : false,
        queryString: queryString || "",
        accessToken: accessToken || ""
      };
      searchRepository(request);
    }

    const id = `page-${index}`;
    document.getElementById(id)?.classList.add("active");
    document.getElementById(buttonProps.activePageId)?.classList.remove("active");
    setButtonProps((props) => {
      return { ...props, activePageId: id };
    });
    if (document.scrollingElement) document.scrollingElement.scrollTop = 0;
  }

  useEffect(() => {
    const { activePageId: id } = buttonProps;
    document.getElementById(id)?.classList.add("active");
  }, [buttonProps]);

  return (
    <>
      {resultCount && resultCount > 10 && (
        <div className="pagination" data-testid="pagination_id">
          <PaginationButton
            id="previous_button"
            alt="arrow left icon"
            callback={() => previous && switchPageSet("previous")}
            className={previous ? "active" : ""}
            icon={previous ? arrowLeftWhite : arrowLeftGrey}
          />

          <ul>{pagesButtons(buttonProps, searchGithub)}</ul>

          <PaginationButton
            id="next_button"
            alt="arrow right icon"
            testId="pagination-next"
            callback={() => next && switchPageSet("next")}
            className={next ? "active" : ""}
            icon={next ? arrowRightWhite : arrowRightGrey}
          />
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state: AppState): PaginationStoreStateProps => {
  return {
    queryString: state.search.queryString,
    accessToken: state.login.accessToken,
    usersEndCursor: state.search.users?.pageInfo.endCursor || "",
    repositoriesEndCursor: state.search.repositories?.pageInfo.endCursor || ""
  };
};

const mapDispatchToProps = (dispatch: (action: any) => void): PaginationStoreDispatchProps => {
  return {
    searchUser: (request: SearchRequest) => {
      dispatch(triggerSearchUser(request));
    },
    searchRepository: (request: SearchRequest) => {
      dispatch(triggerSearchRepository(request));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
