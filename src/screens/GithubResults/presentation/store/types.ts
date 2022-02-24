import { RepositorySearch, SearchRequest, UserSearch } from "../../domain/SearchRepository";

export const SEARCH_PENDING = "SCREEN.GITHUB_RESULTS.SEARCH_PENDING";

export const SEARCH_USER_ERROR = "SCREEN.GITHUB_RESULTS.SEARCH_USER_ERROR";
export const SEARCH_USER_SUCCESSFUL = "SCREEN.GITHUB_RESULTS.SEARCH_USER_SUCCESSFUL";
export const TRIGGER_SEARCH_USER = "SCREEN.GITHUB_RESULTS.TRIGGER_SEARCH_USER";

export const SEARCH_REPOSITORY_ERROR = "SCREEN.GITHUB_RESULTS.SEARCH_REPOSITORY_ERROR";
export const SEARCH_REPOSITORY_SUCCESSFUL = "SCREEN.GITHUB_RESULTS.SEARCH_REPOSITORY_SUCCESSFUL";
export const TRIGGER_SEARCH_REPOSITORY = "SCREEN.GITHUB_RESULTS.TRIGGER_SEARCH_REPOSITORY";
export const RESET_GITHUB_RESULTS = "SCREEN.GITHUB_RESULTS.RESET_GITHUB_RESULTS";

export interface SearchPending {
  type: typeof SEARCH_PENDING;
}

export interface TriggerSearchUser {
  type: typeof TRIGGER_SEARCH_USER;
  payload: { request: SearchRequest };
}

export interface SearchUserSuccessful {
  type: typeof SEARCH_USER_SUCCESSFUL;
  payload: {
    users: UserSearch | null;
    queryString: string;
  };
}

export interface SearchUserError {
  type: typeof SEARCH_USER_ERROR;
  payload: { error: string | null };
}

export interface TriggerSearchRepository {
  type: typeof TRIGGER_SEARCH_REPOSITORY;
  payload: { request: SearchRequest };
}

export interface SearchRepositorySuccessful {
  type: typeof SEARCH_REPOSITORY_SUCCESSFUL;
  payload: {
    repositories: RepositorySearch | null;
    queryString: string;
  };
}

export interface SearchRepositoryError {
  type: typeof SEARCH_REPOSITORY_ERROR;
  payload: { error: string | null };
}

export interface ResetGithubResults {
  type: typeof RESET_GITHUB_RESULTS;
}

export interface GithubResultsState {
  users: UserSearch | null;
  repositories: RepositorySearch | null;
  loading: boolean;
  queryString: string | null;
  searchUserError: string | null;
  searchRepositoryError: string | null;
}

export type GithubResultsActionTypes =
  | SearchPending
  | SearchRepositoryError
  | SearchRepositorySuccessful
  | SearchUserError
  | SearchUserSuccessful
  | ResetGithubResults;
