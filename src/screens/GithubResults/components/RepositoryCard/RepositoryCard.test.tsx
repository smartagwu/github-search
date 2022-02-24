import RepositoryCard from ".";
import { getStore } from "../../../../store/store";
import { render, screen } from "../../../../utils/testUtils";
import { Repository, RepositorySearch } from "../../domain/SearchRepository";
import { searchRepositorySuccessful } from "../../presentation/store/actions";
import { build, fake } from "@jackfranklin/test-data-bot";

const buildData = build({
  fields: {
    description: fake((f) => f.lorem.paragraph()),
    licenseInfo: fake((f) => f.random.words(3)),
    name: fake((f) => f.name.findName()),
    nameWithOwner: fake((f) => f.name.findName()),
    primaryLanguage: fake((f) => f.random.word()),
    stargazerCount: fake((f) => f.datatype.number()),
    updatedAt: String(fake((f) => f.date.past()))
  }
});

const data = buildData();
const repositories: Repository[] = [
  {
    description: data.description as string,
    licenseInfo: { name: data.licenseInfo as string },
    name: data.name as string,
    nameWithOwner: data.nameWithOwner as string,
    primaryLanguage: { name: data.primaryLanguage as string },
    stargazerCount: data.stargazerCount as number,
    updatedAt: data.updatedAt as string
  }
];
const repositorySearch: RepositorySearch = {
  nodes: repositories,
  pageInfo: {
    endCursor: "",
    hasNextPage: false,
    hasPreviousPage: false,
    startCursor: ""
  },
  repositoryCount: 50
};

test("Renders component properly", () => {
  render(<RepositoryCard />);
  expect(screen.getByTestId("repository-not-found")).toBeInTheDocument();
});

test("Displays repository data", async () => {
  const store = getStore();
  render(<RepositoryCard />, store);

  store.dispatch(searchRepositorySuccessful(repositorySearch, "Test query"));
  expect(await screen.findByText(data.nameWithOwner as string)).toBeInTheDocument();
});
