import {
  AccessTokenRequest,
  AccessTokenResponse,
  UserProfile,
  UserProfileRequest
} from "../../domain/LoginRepository";

export const GET_USER_PROFILE_PENDING = "SCREEN.LOGIN.GET_USER_PROFILE_PENDING";
export const GET_USER_PROFILE_ERROR = "SCREEN.LOGIN.GET_USER_PROFILE_ERROR";
export const GET_USER_PROFILE_SUCCESSFUL = "SCREEN.LOGIN.GET_USER_PROFILE_SUCCESSFUL";
export const TRIGGER_GET_USER_PROFILE = "SCREEN.LOGIN.TRIGGER_GET_USER_PROFILE";

export const GET_ACCESS_TOKEN_PENDING = "SCREEN.LOGIN.GET_ACCESS_TOKEN_PENDING";
export const GET_ACCESS_TOKEN_ERROR = "SCREEN.LOGIN.GET_ACCESS_TOKEN_ERROR";
export const GET_ACCESS_TOKEN_SUCCESSFUL = "SCREEN.LOGIN.GET_ACCESS_TOKEN_SUCCESSFUL";
export const TRIGGER_GET_ACCESS_TOKEN = "SCREEN.LOGIN.TRIGGER_GET_ACCESS_TOKEN";
export const RESET_LOGIN = "SCREEN.LOGIN.RESET_LOGIN";

export interface TriggerGetUserProfile {
  type: typeof TRIGGER_GET_USER_PROFILE;
  payload: { request: UserProfileRequest };
}

export interface TriggerGetAccessToken {
  type: typeof TRIGGER_GET_ACCESS_TOKEN;
  payload: { request: AccessTokenRequest };
}

export interface GetUserProfilePending {
  type: typeof GET_USER_PROFILE_PENDING;
}

export interface GetUserProfileSuccessful {
  type: typeof GET_USER_PROFILE_SUCCESSFUL;
  payload: { profile: UserProfile | null };
}

export interface GetUserProfileError {
  type: typeof GET_USER_PROFILE_ERROR;
  payload: { error: string | null };
}

export interface GetAccessTokenPending {
  type: typeof GET_ACCESS_TOKEN_PENDING;
}

export interface GetAccessTokenSuccessful {
  type: typeof GET_ACCESS_TOKEN_SUCCESSFUL;
  payload: { response: AccessTokenResponse | null };
}

export interface GetAccessTokenError {
  type: typeof GET_ACCESS_TOKEN_ERROR;
  payload: { error: string | null };
}

export interface ResetLogin {
  type: typeof RESET_LOGIN;
}

export interface LoginState {
  accessToken: string | null;
  getAccessTokenError: string | null;
  getAccessTokenLoading: boolean;

  userProfile: UserProfile | null;
  getUserProfileError: string | null;
  getUserProfileLoading: boolean;
}

export type LoginStoreStateProps = LoginState;

export interface LoginStoreDispatchProps {
  getAccesstoken: (request: AccessTokenRequest) => void;
  getUserProfile: (request: UserProfileRequest) => void;
}

export type LoginActionTypes =
  | GetUserProfilePending
  | GetUserProfileSuccessful
  | GetUserProfileError
  | GetAccessTokenPending
  | GetAccessTokenSuccessful
  | GetAccessTokenError
  | ResetLogin;
