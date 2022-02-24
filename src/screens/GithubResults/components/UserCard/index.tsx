import React from "react";
import { connect } from "react-redux";
import { AppState } from "../../../../store/RootReducer";
import { User, UserSearch } from "../../domain/SearchRepository";

interface UsersCardStoreStateProps {
  users: UserSearch | null;
}

type Props = UsersCardStoreStateProps;

function UserCard(props: Props) {
  const { users } = props;

  const user = (value: User, index: number) => {
    const { bio, location, name } = value;

    return (
      <li key={`user-card-${index}`} className="app-card user-card">
        <div className="card-top">
          <p className="text-subtitle" style={{ marginRight: "10px" }}>
            {name}
          </p>
          <p className="text-normal">{location}</p>
        </div>
        <p className="text-subtext">{bio}</p>
      </li>
    );
  };

  return (
    <>
      {(!users || users.userCount === 0) && (
        <p className="text-normal" data-testid="user.fallback-text">
          Sorry, no Github User found for your search
        </p>
      )}
      {users && <ul>{users.nodes.map(user)}</ul>}
    </>
  );
}

const mapStateToProps = (state: AppState): UsersCardStoreStateProps => {
  return { users: state.search.users };
};

export default connect(mapStateToProps)(UserCard);
