export interface ButtonProps {
  end: number;
  start: number;
  next: boolean;
  previous: boolean;
  currentSet: number;
  activePageId: string;
}

export interface PaginationProps {
  showUsers?: boolean;
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

export interface DispatchActionInterface {
  payload: ButtonProps;
}

export type ButtonAction = "previous" | "next";
