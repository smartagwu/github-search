import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { AppState } from "../../../store/RootReducer";
import asyncDelay from "../../../utils/asyncDelay";
import GithubResults from "../../GithubResults/presentation";
import Login from "../../Login/presentation";
import Search from "../../Search/presentation";
import "./app.scss";
import { showLoginScreen, showSearchScreen, showGithubResultsScreen } from "./store/actions";
import { AppStoreDispatchProps, AppStoreStateProps } from "./store/types";

type Props = AppStoreStateProps & AppStoreDispatchProps;

function App(props: Props) {
  const { login, loading, search, githubResults, userProfile } = props;
  const isMounted = useRef(false);

  /**
   * Perform some initial setup
   */
  const initializeApp = async () => {
    const { showLogin } = props;
    await asyncDelay(1000);
    showLogin();
  };

  useEffect(() => {
    const { showResults, users, repositories } = props;
    if (!isMounted.current) {
      initializeApp();
      isMounted.current = true;
    }
    if (users && repositories) showResults();
  });

  return (
    <div className="App">
      {loading && (
        <div className="waiting-message">
          <p className="text-title">Starting Github Search App ...</p>
        </div>
      )}

      {login && <Login />}
      {userProfile && search && <Search />}
      {userProfile && githubResults && <GithubResults />}
    </div>
  );
}

const mapStateToProps = (state: AppState): AppStoreStateProps => {
  return {
    ...state.app,
    userProfile: state.login.userProfile,
    users: state.search.users,
    repositories: state.search.repositories
  };
};

const mapDispatchToProps = (dispatch: (action: any) => void): AppStoreDispatchProps => {
  return {
    showLogin: () => dispatch(showLoginScreen()),
    showSearch: () => dispatch(showSearchScreen()),
    showResults: () => dispatch(showGithubResultsScreen())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
