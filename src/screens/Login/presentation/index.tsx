import React, { useEffect } from "react";
import "./login.scss";
import { connect } from "react-redux";
import "../../../components/Button/button.scss";
import LoginGithub from "react-login-github";
import Logo from "../../../components/Logo";
import { LoginStoreDispatchProps, LoginStoreStateProps } from "./store/types";
import { triggerGetAccessToken, triggerGetUserProfile } from "./store/actions";
import { AccessTokenRequest, UserProfileRequest } from "../domain/LoginRepository";
import { AppState } from "../../../store/RootReducer";

type Props = LoginStoreStateProps & LoginStoreDispatchProps;

function Login(props: Props) {
  const {
    accessToken,
    getUserProfile,
    getAccesstoken,
    getAccessTokenLoading,
    getUserProfileLoading,
    getAccessTokenError,
    getUserProfileError,
    userProfile
  } = props;

  const getAccessToken = (request: AccessTokenRequest) => {
    getAccesstoken(request);
  };

  useEffect(() => {
    if (getAccessTokenError) {
      alert(getAccessTokenError);
      return;
    }

    if (getUserProfileError) {
      alert(getUserProfileError);
      return;
    }

    if (accessToken && !userProfile) {
      const request: UserProfileRequest = { accessToken };
      getUserProfile(request);
    }
  });

  return (
    <div className="login-container">
      <div className="login">
        <Logo style={{ justifyContent: "center" }} />
        <LoginGithub
          className="Button"
          onSuccess={getAccessToken}
          onFailure={() => alert("Github login failed")}
          buttonText={
            getAccessTokenLoading || getUserProfileLoading ? "Authenticating..." : "Login to Github"
          }
          clientId={process.env.REACT_APP_GITHUB_CLIENT_ID}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state: AppState): LoginStoreStateProps => {
  return state.login;
};

const mapDispatchToProps = (dispatch: (action: any) => void): LoginStoreDispatchProps => {
  return {
    getAccesstoken: (request: AccessTokenRequest) => {
      dispatch(triggerGetAccessToken(request));
    },
    getUserProfile: (request: UserProfileRequest) => {
      dispatch(triggerGetUserProfile(request));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
