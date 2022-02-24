import React, { CSSProperties } from "react";
import { connect } from "react-redux";
import { resetGithubResults } from "../../screens/GithubResults/presentation/store/actions";
import { resetLogin } from "../../screens/Login/presentation/store/actions";
import { resetApp } from "../../screens/RootView/presentation/store/actions";

interface MenuItemsProps {
  name: string;
  style?: CSSProperties;
  callback?: () => void;
}

interface MenuCardStoreDispatchProps {
  triggerLogout: () => void;
}

interface OwnProps {
  style?: CSSProperties;
}

type Props = MenuCardStoreDispatchProps & OwnProps;

function ProfileMenuCard(props: Props) {
  const { triggerLogout, style } = props;
  const menuItems: MenuItemsProps[] = [
    { name: "Profile" },
    {
      name: "Logout",
      style: { color: "#d32f2f" },
      callback: triggerLogout
    }
  ];

  return (
    <ul style={style} className="card">
      {menuItems.map((item, index) => {
        return (
          <li onClick={item.callback} key={`menu-${index}`}>
            <p style={item.style}>{item.name}</p>
          </li>
        );
      })}
    </ul>
  );
}

const mapDispatchToProps = (dispatch: (action: any) => void): MenuCardStoreDispatchProps => {
  return {
    triggerLogout: () => {
      dispatch(resetLogin);
      dispatch(resetGithubResults);
      dispatch(resetApp());
    }
  };
};

export default connect(null, mapDispatchToProps)(ProfileMenuCard);
