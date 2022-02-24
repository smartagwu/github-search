import React from "react";
import { connect } from "react-redux";
import { AppState } from "../../../../store/RootReducer";
import { Repository, RepositorySearch } from "../../domain/SearchRepository";

interface RepositoryCardStoreStateProps {
  repositories: RepositorySearch | null;
}

type Props = RepositoryCardStoreStateProps;

function RepositoryCard(props: Props) {
  const { repositories } = props;

  const repository = (value: Repository, index: number) => {
    const { description, licenseInfo, nameWithOwner, primaryLanguage, stargazerCount, updatedAt } =
      value;
    return (
      <li key={`repository-card-${index}`} className="app-card repository-card">
        <p className="text-subtitle">{nameWithOwner}</p>
        <p className="text-normal" style={{ marginBottom: "15px", marginTop: "5px" }}>
          {description}
        </p>
        <p className="text-subtext">{`${stargazerCount} Stars ${
          primaryLanguage ? "| " + primaryLanguage.name : ""
        } ${licenseInfo ? "| " + licenseInfo.name : ""} | Updated ${updatedAt}`}</p>
      </li>
    );
  };

  return (
    <>
      {(!repositories || repositories.repositoryCount === 0) && (
        <p className="text-normal" data-testid="repository-not-found">
          Sorry, no Github Repositories found for your search
        </p>
      )}
      {repositories && <ul>{repositories.nodes.map(repository)}</ul>}
    </>
  );
}

const mapStateToProps = (state: AppState): RepositoryCardStoreStateProps => {
  return { repositories: state.search.repositories };
};

export default connect(mapStateToProps)(RepositoryCard);
