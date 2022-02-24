import { all } from "redux-saga/effects";
import {
  triggerSearchUserSaga,
  triggerSearchRepositorySaga
} from "../screens/GithubResults/presentation/store/saga";
import {
  triggerGetAccessTokenSaga,
  triggerGetUserProfileSaga
} from "../screens/Login/presentation/store/saga";

function* rootSaga(dispatch: any) {
  yield all([
    triggerGetAccessTokenSaga(),
    triggerGetUserProfileSaga(),
    triggerSearchUserSaga(),
    triggerSearchRepositorySaga()
  ]);
}

export default rootSaga;
