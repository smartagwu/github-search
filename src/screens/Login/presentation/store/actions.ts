import {
  AccessTokenRequest,
  AccessTokenResponse,
  UserProfile,
  UserProfileRequest
} from "../../domain/LoginRepository";
import {
  GetAccessTokenError,
  GetAccessTokenPending,
  GetAccessTokenSuccessful,
  GetUserProfileError,
  GetUserProfilePending,
  GetUserProfileSuccessful,
  GET_ACCESS_TOKEN_ERROR,
  GET_ACCESS_TOKEN_PENDING,
  GET_ACCESS_TOKEN_SUCCESSFUL,
  GET_USER_PROFILE_ERROR,
  GET_USER_PROFILE_PENDING,
  GET_USER_PROFILE_SUCCESSFUL,
  ResetLogin,
  RESET_LOGIN,
  TriggerGetAccessToken,
  TriggerGetUserProfile,
  TRIGGER_GET_ACCESS_TOKEN,
  TRIGGER_GET_USER_PROFILE
} from "./types";

export const triggerGetUserProfile = (request: UserProfileRequest): TriggerGetUserProfile => {
  return {
    type: TRIGGER_GET_USER_PROFILE,
    payload: { request }
  };
};

export const triggerGetAccessToken = (request: AccessTokenRequest): TriggerGetAccessToken => {
  return {
    type: TRIGGER_GET_ACCESS_TOKEN,
    payload: { request }
  };
};

export const getUserProfilePending = (): GetUserProfilePending => {
  return { type: GET_USER_PROFILE_PENDING };
};

export const getUserProfileSuccessful = (profile: UserProfile): GetUserProfileSuccessful => {
  return {
    type: GET_USER_PROFILE_SUCCESSFUL,
    payload: { profile }
  };
};

export const getUserProfileError = (error: string | null): GetUserProfileError => {
  return {
    type: GET_USER_PROFILE_ERROR,
    payload: { error }
  };
};

export const getAccessTokenPending = (): GetAccessTokenPending => {
  return { type: GET_ACCESS_TOKEN_PENDING };
};

export const getAccessTokenSuccessful = (
  response: AccessTokenResponse
): GetAccessTokenSuccessful => {
  return {
    type: GET_ACCESS_TOKEN_SUCCESSFUL,
    payload: { response }
  };
};

export const getAccessTokenError = (error: string | null): GetAccessTokenError => {
  return {
    type: GET_ACCESS_TOKEN_ERROR,
    payload: { error }
  };
};

export const resetLogin = (): ResetLogin => {
  return { type: RESET_LOGIN }
}