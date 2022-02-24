import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Header from "../../../components/Header";
import Pagination from "../../../components/Pagination";
import { AppState } from "../../../store/RootReducer";
import NavigationCard from "../components/NavigationCard";
import RepositoryCard from "../components/RepositoryCard";
import UserCard from "../components/UserCard";
import { SearchTypes, UserSearch, RepositorySearch } from "../domain/SearchRepository";
import "./githubSearch.scss";

interface ResultStoreStateProps {
  users: UserSearch | null;
  repositories: RepositorySearch | null;
  searchUserError: string | null;
  searchRepositoryError: string | null;
}
type Props = ResultStoreStateProps;

function GithubResults(props: Props) {
  const { users, repositories } = props;
  const [isUser, setIsUser] = useState(false);

  const getTitle = () => {
    var title = "";
    if (isUser && users?.userCount) {
      title += users.userCount;
      title += ` ${users.userCount > 1 ? "users" : "user"}`;
    } else if (!isUser && repositories?.repositoryCount) {
      title += repositories?.repositoryCount;
      title += ` repository ${repositories.repositoryCount > 1 ? "results" : "result"}`;
    } else {
      title = "0 results";
    }
    return title;
  };

  useEffect(() => {
    const { searchUserError, searchRepositoryError } = props;
    if (searchRepositoryError) alert(searchRepositoryError);
    if (searchUserError) alert(searchUserError);
  });

  return (
    <div className="search-result" data-testid="search_result_test_id">
      <Header showLogo={true} showSearchInput={true} />

      <div className="data-container">
        <NavigationCard
          userCount={users?.userCount || 0}
          repositoryCount={repositories?.repositoryCount || 0}
          callback={(type: SearchTypes) => setIsUser(type === SearchTypes.user)}
        />

        <div className="results">
          <div className="text-title" style={{ marginBottom: "20px" }}>
            {getTitle()}
          </div>

          {isUser ? <UserCard /> : <RepositoryCard />}

          <div className="pagination-content">
            {isUser && <Pagination isUser={isUser} resultCount={users?.userCount || 0} />}

            {!isUser && (
              <Pagination isUser={isUser} resultCount={repositories?.repositoryCount || 0} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state: AppState): ResultStoreStateProps => {
  return {
    users: state.search.users,
    repositories: state.search.repositories,
    searchUserError: state.search.searchUserError,
    searchRepositoryError: state.search.searchRepositoryError
  };
};

export default connect(mapStateToProps)(GithubResults);
