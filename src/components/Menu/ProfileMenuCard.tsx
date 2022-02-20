import React, { MutableRefObject } from "react";

interface MenuItemsProps {
  name: string;
  style?: object;
  callback?: () => void;
}

interface Props {
  triggerLogout?: () => void;
  ref: MutableRefObject<HTMLUListElement | null>;
}

function ProfileMenuCard(props: Props) {
  const { ref, triggerLogout } = props;
  const menuItems: MenuItemsProps[] = [
    { name: "Profile" },
    {
      name: "Logout",
      style: { color: "#d32f2f" },
      callback: triggerLogout
    }
  ];

  return (
    <ul ref={ref} className="card">
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

export default ProfileMenuCard;
