import React, { useState } from "react";
import "./menu.scss";
import { connect } from "react-redux";
import { ReactComponent as DropdownIcon } from "./images/drop-down.svg";
import ProfileMenuCard from "./ProfileMenuCard";
import { UserProfile } from "../../screens/Login/domain/LoginRepository";
import { AppState } from "../../store/RootReducer";

interface ProfileMenuStoreStateProps {
  userProfile: UserProfile | null;
}

type Props = ProfileMenuStoreStateProps;

function ProfileMenu(props: Props) {
  const { userProfile } = props;
  const [showMenu, setShowMenu] = useState(false);
  const [_propertyTop, setTop] = useState("50px");
  const [_propertyOpacity, setOpacity] = useState(0);

  function toggleMenuCard() {
    if (showMenu) {
      setTop("50px");
      setOpacity(0);
      setTimeout(() => setShowMenu(!showMenu), 500);
    } else {
      setShowMenu(!showMenu);
      setTimeout(() => {
        setTop("50px");
        setOpacity(1);
      }, 100);
    }
  }

  return (
    <div className="profile-menu">
      <div className="menu" data-testid="menu-card-id" onClick={toggleMenuCard}>
        <DropdownIcon />
        {showMenu && <ProfileMenuCard style={{ top: _propertyTop, opacity: _propertyOpacity }} />}
      </div>
      <div className="profile">
        <img src={userProfile?.avatarUrl || ""} alt="User profile" />
        <p>{userProfile?.name || ""}</p>
      </div>
    </div>
  );
}

const mapStateToProps = (state: AppState): ProfileMenuStoreStateProps => {
  return {
    userProfile: state.login.userProfile
  };
};

export default connect(mapStateToProps)(ProfileMenu);
