import {
  AppStateProps,
  AppActionTypes,
  SHOW_LOADING_SCREEN,
  SHOW_LOGIN_SCREEN,
  SHOW_SEARCH_SCREEN,
  SHOW_GITHUB_RESULTS_SCREEN,
  RESET_APP
} from "./types";

const initialState: AppStateProps = {
  loading: true,
  login: false,
  search: false,
  githubResults: false,
  isMobile: window.innerWidth <= 480
};

function appReducer(state: AppStateProps = initialState, action: AppActionTypes) {
  switch (action.type) {
    case SHOW_LOADING_SCREEN: {
      return initialState;
    }

    case SHOW_LOGIN_SCREEN: {
      return { ...state, login: true, loading: false, search: false, githubResults: false };
    }

    case SHOW_SEARCH_SCREEN: {
      return { ...state, search: true, login: false, loading: false, githubResults: false };
    }

    case SHOW_GITHUB_RESULTS_SCREEN: {
      return { ...state, githubResults: true, login: false, loading: false, search: false };
    }

    case RESET_APP: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}

export default appReducer;
