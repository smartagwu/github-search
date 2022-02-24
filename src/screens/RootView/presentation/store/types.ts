import { RepositorySearch, UserSearch } from "../../../GithubResults/domain/SearchRepository";
import { UserProfile } from "../../../Login/domain/LoginRepository";

export const SHOW_LOADING_SCREEN = "SCREEN.ROOT_VIEW.SHOW_LOADING_SCREEN";
export const SHOW_LOGIN_SCREEN = "SCREEN.ROOT_VIEW.SHOW_LOGIN_SCREEN";
export const SHOW_SEARCH_SCREEN = "SCREEN.ROOT_VIEW.SHOW_SEARCH_SCREEN";
export const SHOW_GITHUB_RESULTS_SCREEN = "SCREEN.ROOT_VIEW.SHOW_GITHUB_RESULTS_SCREEN";
export const RESET_APP = "SCREEN.ROOT_VIEW.RESET_APP";

export interface ShowLoadingScreen {
  type: typeof SHOW_LOADING_SCREEN;
}

export interface ShowLoginScreen {
  type: typeof SHOW_LOGIN_SCREEN;
}

export interface ShowSearchScreen {
  type: typeof SHOW_SEARCH_SCREEN;
}

export interface ShowGithubResultsScreen {
  type: typeof SHOW_GITHUB_RESULTS_SCREEN;
}

export interface ResetApp {
  type: typeof RESET_APP;
}

export interface AppStateProps {
  loading: boolean;
  login: boolean;
  search: boolean;
  isMobile: boolean;
  githubResults: boolean;
}

export interface AppStoreStateProps extends AppStateProps {
  users: UserSearch | null;
  repositories: RepositorySearch | null;
  userProfile: UserProfile | null;
}

export interface AppStoreDispatchProps {
  showLogin: () => void;
  showSearch: () => void;
  showResults: () => void;
}

export type AppActionTypes =
  | ShowLoadingScreen
  | ShowLoginScreen
  | ShowSearchScreen
  | ShowGithubResultsScreen
  | ResetApp;
