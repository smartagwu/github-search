import React, { useRef, useState } from "react";
import "./ProfileMenu.scss";
import { ReactComponent as DropdownIcon } from "./images/drop-down.svg";
import ProfileMenuCard from "./ProfileMenuCard";

export interface UserProfileProps {
  name: string;
  avatarUrl?: string;
}

type Props = UserProfileProps;

function ProfileMenu(props: Props) {
  const { name, avatarUrl } = props;
  const [showMenu, setShowMenu] = useState(false);
  const menuCardRef = useRef<HTMLUListElement | null>(null);

  function toggleMenuCard() {
    if (showMenu) {
      menuCardRef.current?.style.setProperty("top", "50px");
      menuCardRef.current?.style.setProperty("opacity", "0");
      setTimeout(() => setShowMenu(!showMenu), 500);
    } else {
      setShowMenu(!showMenu);
      setTimeout(() => {
        menuCardRef.current?.style.setProperty("top", "40px");
        menuCardRef.current?.style.setProperty("opacity", "1");
      }, 100);
    }
  }

  return (
    <div className="profile-menu">
      <div className="menu" data-testid="menu-card-id" onClick={toggleMenuCard}>
        <DropdownIcon />
        {showMenu && <ProfileMenuCard ref={menuCardRef} />}
      </div>
      <div className="profile">
        <img src={avatarUrl} alt="User profile" />
        <p>{name}</p>
      </div>
    </div>
  );
}

export default ProfileMenu;
