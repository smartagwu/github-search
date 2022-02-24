import {
  GithubResultsActionTypes,
  GithubResultsState,
  RESET_GITHUB_RESULTS,
  SEARCH_PENDING,
  SEARCH_REPOSITORY_ERROR,
  SEARCH_REPOSITORY_SUCCESSFUL,
  SEARCH_USER_ERROR,
  SEARCH_USER_SUCCESSFUL
} from "./types";

const initialState: GithubResultsState = {
  users: null,
  repositories: null,
  loading: false,
  queryString: null,
  searchUserError: null,
  searchRepositoryError: null
};

function githubResultReducer(
  state: GithubResultsState = initialState,
  action: GithubResultsActionTypes
) {
  switch (action.type) {
    case SEARCH_PENDING: {
      return { ...state, loading: true };
    }

    case SEARCH_USER_SUCCESSFUL: {
      const { payload } = action;
      const { users, queryString } = payload;
      return { ...state, users, queryString };
    }

    case SEARCH_USER_ERROR: {
      const { payload } = action;
      const { error } = payload;
      return { ...state, searchUserError: error };
    }

    case SEARCH_REPOSITORY_SUCCESSFUL: {
      const { payload } = action;
      const { repositories, queryString } = payload;
      return { ...state, repositories, queryString };
    }

    case SEARCH_REPOSITORY_ERROR: {
      const { payload } = action;
      const { error } = payload;
      return { ...state, searchRepositoryError: error };
    }

    case RESET_GITHUB_RESULTS: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}

export default githubResultReducer;
