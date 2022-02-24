import { SearchRequest } from "../../screens/GithubResults/domain/SearchRepository";

export interface ButtonProps {
  end: number;
  start: number;
  next: boolean;
  previous: boolean;
  currentSet: number;
  activePageId: string;
}

export interface OwnProps {
  isUser: boolean;
  pageInfo?: PageInfo;
  resultCount: number;
  callback?: () => void;
}

interface PageInfo {
  queryString: string;
  accessToken: string;
  userEndCursor: string;
  repositoryEndCursor: string;
}

export interface PaginationStoreStateProps {
  queryString: string | null;
  accessToken: string | null;

  usersEndCursor: string;
  repositoriesEndCursor: string;
}

export interface PaginationStoreDispatchProps {
  searchUser: (request: SearchRequest) => void;
  searchRepository: (request: SearchRequest) => void;
}

export interface DispatchActionInterface {
  payload: ButtonProps;
}

export type ButtonAction = "previous" | "next";

export type Props = PaginationStoreStateProps & PaginationStoreDispatchProps & OwnProps;
