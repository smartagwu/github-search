import { RepositorySearch, SearchRequest, UserSearch } from "../../domain/SearchRepository";
import {
  ResetGithubResults,
  RESET_GITHUB_RESULTS,
  SearchPending,
  SearchRepositoryError,
  SearchRepositorySuccessful,
  SearchUserError,
  SearchUserSuccessful,
  SEARCH_PENDING,
  SEARCH_REPOSITORY_ERROR,
  SEARCH_REPOSITORY_SUCCESSFUL,
  SEARCH_USER_ERROR,
  SEARCH_USER_SUCCESSFUL,
  TriggerSearchRepository,
  TriggerSearchUser,
  TRIGGER_SEARCH_REPOSITORY,
  TRIGGER_SEARCH_USER
} from "./types";

export const searchPending = (): SearchPending => {
  return { type: SEARCH_PENDING };
};

export const triggerSearchUser = (request: SearchRequest): TriggerSearchUser => {
  return {
    type: TRIGGER_SEARCH_USER,
    payload: { request }
  };
};

export const searchUserSuccessful = (
  users: UserSearch,
  queryString: string
): SearchUserSuccessful => {
  return {
    type: SEARCH_USER_SUCCESSFUL,
    payload: { users, queryString }
  };
};

export const searchUserError = (error: string): SearchUserError => {
  return {
    type: SEARCH_USER_ERROR,
    payload: { error }
  };
};

export const triggerSearchRepository = (request: SearchRequest): TriggerSearchRepository => {
  return {
    type: TRIGGER_SEARCH_REPOSITORY,
    payload: { request }
  };
};

export const searchRepositorySuccessful = (
  repositories: RepositorySearch,
  queryString: string
): SearchRepositorySuccessful => {
  return {
    type: SEARCH_REPOSITORY_SUCCESSFUL,
    payload: { repositories, queryString }
  };
};

export const searchRepositoryError = (error: string): SearchRepositoryError => {
  return {
    type: SEARCH_REPOSITORY_ERROR,
    payload: { error }
  };
};

export const resetGithubResults = (): ResetGithubResults => {
  return { type: RESET_GITHUB_RESULTS };
};
