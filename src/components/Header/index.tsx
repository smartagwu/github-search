import React, { useEffect } from "react";
import "./header.scss";
import ProfileMenu from "../Menu";
import Logo from "../Logo";
import SearchBar from "../Search";
import { connect } from "react-redux";
import { AppState } from "../../store/RootReducer";
import { SearchRequest } from "../../screens/GithubResults/domain/SearchRepository";
import {
  triggerSearchUser,
  triggerSearchRepository
} from "../../screens/GithubResults/presentation/store/actions";

interface HeaderStoreStateProps {
  isMobile: boolean;
  accessToken: string | null;
  userError: string | null;
  repositoryError: string | null;
}

interface HeaderStoreDispatchProps {
  searchUser: (request: SearchRequest) => void;
  searchRepository: (request: SearchRequest) => void;
}

interface OwnProps {
  showLogo: boolean;
  showSearchInput: boolean;
}

type Props = HeaderStoreStateProps & HeaderStoreDispatchProps & OwnProps;

function Header(props: Props) {
  const { showLogo, showSearchInput, isMobile } = props;

  const searchGithub = (queryString: string) => {
    const { searchUser, searchRepository, accessToken } = props;
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
    const { userError, repositoryError } = props;
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
    <div className="header">
      <div className="inside">
        <div className="main">
          <div className="header-logo">
            {showLogo && <Logo height={isMobile ? "30px" : "40px"} />}
          </div>
          <div className="header-search">
            {showSearchInput && <SearchBar style={{ width: "100%" }} callback={searchGithub} />}
          </div>
          <div className="header-menu">
            <ProfileMenu />
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state: AppState): HeaderStoreStateProps => {
  return {
    isMobile: state.app.isMobile,
    accessToken: state.login.accessToken,
    userError: state.search.searchUserError,
    repositoryError: state.search.searchRepositoryError
  };
};

const mapDispatchToProps = (dispatch: (action: any) => void): HeaderStoreDispatchProps => {
  return {
    searchUser: (request: SearchRequest) => {
      dispatch(triggerSearchUser(request));
    },
    searchRepository: (request: SearchRequest) => {
      dispatch(triggerSearchRepository(request));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
