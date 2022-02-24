import { combineReducers } from "redux";
import githubResultReducer from "../screens/GithubResults/presentation/store/reducer";
import loginReducer from "../screens/Login/presentation/store/reducer";
import appReducer from "../screens/RootView/presentation/store/reducer";

const rootReducer = combineReducers({
  app: appReducer,
  login: loginReducer,
  search: githubResultReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
