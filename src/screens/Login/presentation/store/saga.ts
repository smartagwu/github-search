import { put, takeLatest, takeLeading } from "redux-saga/effects";
import {
  getAccessTokenError,
  getAccessTokenPending,
  getAccessTokenSuccessful,
  getUserProfileError,
  getUserProfilePending,
  getUserProfileSuccessful
} from "./actions";
import {
  TriggerGetAccessToken,
  TriggerGetUserProfile,
  TRIGGER_GET_ACCESS_TOKEN,
  TRIGGER_GET_USER_PROFILE
} from "./types";
import UserRepository, {
  AccessTokenResponse,
  GetUserProfileResponse,
  UserProfile
} from "../../domain/LoginRepository";
import { showSearchScreen } from "../../../RootView/presentation/store/actions";

function* getAccesstoken(action: TriggerGetAccessToken) {
  const { payload } = action;
  const { request } = payload;
  var response: AccessTokenResponse;

  yield put(getAccessTokenPending());

  try {
    response = yield UserRepository.getAccessToken(request);
  } catch (error: any) {
    yield put(getAccessTokenError(error));
    return;
  }

  if (response.message === "success") {
    yield put(getAccessTokenSuccessful(response));
  } else {
    yield put(getAccessTokenError(response.message));
  }
}

function* getUserProfile(action: TriggerGetUserProfile) {
  const { payload } = action;
  const { request } = payload;
  var response: GetUserProfileResponse;

  yield put(getUserProfilePending());

  try {
    response = yield UserRepository.getUserProfile(request);
  } catch (error: any) {
    yield put(getUserProfileError(error));
    return;
  }

  yield put(getUserProfileSuccessful(response.data.viewer));
  yield put(showSearchScreen());
}

export function* triggerGetAccessTokenSaga() {
  yield takeLatest(TRIGGER_GET_ACCESS_TOKEN, getAccesstoken);
}

export function* triggerGetUserProfileSaga() {
  yield takeLeading(TRIGGER_GET_USER_PROFILE, getUserProfile);
}
