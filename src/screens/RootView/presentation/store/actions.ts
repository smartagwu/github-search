import {
  ResetApp,
  RESET_APP,
  ShowGithubResultsScreen,
  ShowLoadingScreen,
  ShowLoginScreen,
  ShowSearchScreen,
  SHOW_GITHUB_RESULTS_SCREEN,
  SHOW_LOADING_SCREEN,
  SHOW_LOGIN_SCREEN,
  SHOW_SEARCH_SCREEN
} from "./types";

export const showLoadingScreen = (): ShowLoadingScreen => {
  return { type: SHOW_LOADING_SCREEN };
};

export const showLoginScreen = (): ShowLoginScreen => {
  return { type: SHOW_LOGIN_SCREEN };
};

export const showSearchScreen = (): ShowSearchScreen => {
  return { type: SHOW_SEARCH_SCREEN };
};

export const showGithubResultsScreen = (): ShowGithubResultsScreen => {
  return { type: SHOW_GITHUB_RESULTS_SCREEN };
};

export const resetApp = (): ResetApp => {
  return { type: RESET_APP };
};
