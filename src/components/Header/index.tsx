import React, { ChangeEvent } from "react";
import "./Header.scss";
import ProfileMenu, { UserProfileProps } from "../Menu";
import Logo from "../Logo";
import Search from "../Search";

interface Props {
  showLogo: boolean;
  profile: UserProfileProps;
  showSearchInput: boolean;
}

function Header(props: Props) {
  const { showLogo, showSearchInput, profile } = props;
  const isMobile = window.innerWidth <= 480;

  const searchItem = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.currentTarget.value);
    return;
  };

  return (
    <div className="header">
      <div className="inside">
        <div className="main">
          <div className="header-logo">
            {showLogo && <Logo height={isMobile ? "30px" : "40px"} />}
          </div>
          <div className="header-search">
            {showSearchInput && <Search style={{ width: "100%" }} callback={searchItem} />}
          </div>
          <div className="header-menu">
            <ProfileMenu name={profile.name} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;