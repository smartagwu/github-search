import { put, takeLatest } from "redux-saga/effects";
import SearchRepository, {
  SearchRepositoryResponse,
  SearchUserResponse
} from "../../domain/SearchRepository";
import {
  searchPending,
  searchRepositorySuccessful,
  searchUserError,
  searchUserSuccessful
} from "./actions";
import {
  TriggerSearchRepository,
  TriggerSearchUser,
  TRIGGER_SEARCH_REPOSITORY,
  TRIGGER_SEARCH_USER
} from "./types";

function* searchUser(action: TriggerSearchUser) {
  const { payload } = action;
  const { request } = payload;
  var response: SearchUserResponse;

  yield put(searchPending());

  try {
    response = yield SearchRepository.searchUsers(request);
  } catch (error: any) {
    yield put(searchUserError(error));
    return;
  }

  if (response.data.data) {
    yield put(searchUserSuccessful(response.data.data.search, request.queryString));
  } else if (response.data.errors) {
    const message = response.data.errors[0].message || "Error, please check the query string";
    yield put(searchUserError(message));
  }
}

function* searchRepository(action: TriggerSearchRepository) {
  const { payload } = action;
  const { request } = payload;
  var response: SearchRepositoryResponse;

  yield put(searchPending());

  try {
    response = yield SearchRepository.searchRepository(request);
  } catch (error: any) {
    yield put(searchUserError(error));
    return;
  }

  if (response.data.data) {
    yield put(searchRepositorySuccessful(response.data.data.search, request.queryString));
  } else if (response.data.errors) {
    const message = response.data.errors[0].message || "Error, please check the query string";
    yield put(searchUserError(message));
  }
}

export function* triggerSearchUserSaga() {
  yield takeLatest(TRIGGER_SEARCH_USER, searchUser);
}

export function* triggerSearchRepositorySaga() {
  yield takeLatest(TRIGGER_SEARCH_REPOSITORY, searchRepository);
}
