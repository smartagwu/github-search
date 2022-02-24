import React, { useState } from "react";
import { SearchTypes } from "../../domain/SearchRepository";
import "./navigationCard.scss";

interface OwnProps {
  userCount: number;
  repositoryCount: number;
  callback: (type: SearchTypes) => void;
}

type Props = OwnProps;

function Navigationcard(props: Props) {
  const { callback, repositoryCount, userCount } = props;
  const [isUser, setIsUser] = useState(false);

  function onCardClick(type: SearchTypes) {
    setIsUser(type === SearchTypes.user);
    callback(type);
  }

  return (
    <ul className="navigation-card">
      <li
        key="repository"
        className={!isUser ? "active" : ""}
        data-testid="navigation-card-repository"
        onClick={() => onCardClick(SearchTypes.repository)}>
        <div className="bubble">
          <p className="text-normal">{repositoryCount}</p>
        </div>
        <p className="text-normal">Repositories</p>
      </li>

      <li
        key="user"
        className={isUser ? "active" : ""}
        data-testid="navigation-card-user"
        onClick={() => onCardClick(SearchTypes.user)}>
        <div className="bubble">
          <p className="text-normal">{userCount}</p>
        </div>
        <p className="text-normal">Users</p>
      </li>
    </ul>
  );
}

export default Navigationcard;
