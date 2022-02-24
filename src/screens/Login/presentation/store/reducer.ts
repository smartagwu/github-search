import {
  GET_ACCESS_TOKEN_ERROR,
  GET_ACCESS_TOKEN_PENDING,
  GET_ACCESS_TOKEN_SUCCESSFUL,
  GET_USER_PROFILE_ERROR,
  GET_USER_PROFILE_PENDING,
  GET_USER_PROFILE_SUCCESSFUL,
  LoginActionTypes,
  LoginState,
  RESET_LOGIN
} from "./types";

const initialState: LoginState = {
  accessToken: null,
  getAccessTokenError: null,
  getAccessTokenLoading: false,

  userProfile: null,
  getUserProfileError: null,
  getUserProfileLoading: false
};

function loginReducer(state: LoginState = initialState, action: LoginActionTypes) {
  switch (action.type) {
    case GET_ACCESS_TOKEN_PENDING: {
      return { ...state, getAccessTokenLoading: true };
    }

    case GET_ACCESS_TOKEN_ERROR: {
      const { payload } = action;
      const { error } = payload;
      return { ...state, getAccessTokenError: error };
    }

    case GET_ACCESS_TOKEN_SUCCESSFUL: {
      const { payload } = action;
      const { response } = payload;
      return {
        ...state,
        getAccessTokenLoading: false,
        accessToken: response?.data?.access_token || null
      };
    }

    case GET_USER_PROFILE_PENDING: {
      return { ...state, getUserProfileLoading: true };
    }

    case GET_USER_PROFILE_ERROR: {
      const { payload } = action;
      const { error } = payload;
      return { ...state, getUserProfileError: error };
    }

    case GET_USER_PROFILE_SUCCESSFUL: {
      const { payload } = action;
      const { profile } = payload;
      return { ...state, getUserProfileLoading: false, userProfile: profile };
    }

    case RESET_LOGIN: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}

export default loginReducer;
