import React, { useEffect, useState } from "react";
import "./search.scss";
import SearchBar from "../../../components/Search";
import Header from "../../../components/Header";
import Logo from "../../../components/Logo";
import Button from "../../../components/Button";
import { connect } from "react-redux";
import { AppState } from "../../../store/RootReducer";
import { SearchRequest } from "../../GithubResults/domain/SearchRepository";
import {
  triggerSearchUser,
  triggerSearchRepository
} from "../../GithubResults/presentation/store/actions";

interface SearchStoreStateProps {
  isMobile: boolean;
  searchPending: boolean;
  accessToken: string | null;
  userError: string | null;
  repositoryError: string | null;
}

interface SearchStoreDispatchProps {
  searchUser: (request: SearchRequest) => void;
  searchRepository: (request: SearchRequest) => void;
}

type Props = SearchStoreStateProps & SearchStoreDispatchProps;

function Search(props: Props) {
  const { isMobile, searchPending } = props;
  const [queryString, setQueryString] = useState("");

  const onButtonClick = () => {
    if (!queryString) return;

    const { accessToken, searchRepository, searchUser } = props;
    const request: SearchRequest = {
      queryString,
      endCursor: "",
      getFirst: true,
      getLast: false,
      accessToken: accessToken || ""
    };
    searchUser(request);
    searchRepository(request);
  };

  useEffect(() => {
    const { repositoryError, userError } = props;
    if (userError) {
      alert(userError);
      return;
    }
    if (repositoryError) {
      alert(repositoryError);
      return;
    }
  });

  return (
    <div className="search-container">
      <Header showLogo={false} showSearchInput={false} />

      <div className="search-content" style={{ height: "100vh", width: "100vw" }}>
        <div className="search">
          <div className="logo">
            <Logo style={{ justifyContent: "center" }} height={isMobile ? "30px" : "50px"} />
          </div>

          <SearchBar
            size={`input-${isMobile ? "small" : "large"}`}
            callback={setQueryString}
            onEnterKeyPressed={onButtonClick}
          />

          <div className="button-content">
            <Button
              id="search-button"
              text={searchPending ? "Searching..." : "Search Github"}
              callback={onButtonClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state: AppState): SearchStoreStateProps => {
  return {
    isMobile: state.app.isMobile,
    searchPending: state.search.loading,
    accessToken: state.login.accessToken,
    userError: state.search.searchUserError,
    repositoryError: state.search.searchRepositoryError
  };
};

const mapDispatchToProps = (dispatch: (action: any) => void): SearchStoreDispatchProps => {
  return {
    searchUser: (request: SearchRequest) => {
      dispatch(triggerSearchUser(request));
    },
    searchRepository: (request: SearchRequest) => {
      dispatch(triggerSearchRepository(request));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
