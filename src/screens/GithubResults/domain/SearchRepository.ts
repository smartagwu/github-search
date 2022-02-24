import { AxiosRequestConfig } from "axios";
import httpClient, { HttpClient } from "../../../utils/httpClient";

export enum SearchTypes {
  user = "USER",
  repository = "REPOSITORY"
}

interface PageInfo {
  endCursor: string;
  startCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface User {
  bio: string | null;
  location: string | null;
  name: string | null;
}

export interface Repository {
  description: string | null;
  licenseInfo: { name: string } | null;
  name: string | null;
  nameWithOwner: string | null;
  stargazerCount: number | null;
  updatedAt: string | null;
  primaryLanguage: { name: string } | null;
}

export interface UserSearch {
  nodes: User[];
  pageInfo: PageInfo;
  userCount: number;
}

export interface RepositorySearch {
  nodes: Repository[];
  pageInfo: PageInfo;
  repositoryCount: number;
}

export interface SearchRequest {
  queryString: string;
  accessToken: string;
  getFirst?: boolean;
  getLast?: boolean;
  endCursor: string;
}

export interface SearchUserResponse {
  status: number;
  data: {
    data: { search: UserSearch };
    errors?: { message: string }[];
  };
}

export interface SearchRepositoryResponse {
  status: number;
  data: {
    data: { search: RepositorySearch };
    errors?: { message: string }[];
  };
  errors?: { message: string }[];
}

interface SearchRepositoryImpl {
  searchUsers: (request: SearchRequest) => Promise<SearchUserResponse>;
  searchRepository: (request: SearchRequest) => Promise<SearchRepositoryResponse>;
}

class SearchRepository implements SearchRepositoryImpl {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  private getSearchArgument(request: SearchRequest, type: SearchTypes) {
    const { endCursor, getFirst, getLast, queryString } = request;
    const searchArgument = `(
        query: "${queryString}",
        type: ${type}
        ${getFirst || endCursor ? ", first: 10" : ""}
        ${getLast ? ", last: 10" : ""}
        ${endCursor ? `, after: "${endCursor}"` : ""}
    )`;
    return searchArgument;
  }

  async searchUsers(request: SearchRequest): Promise<SearchUserResponse> {
    const { accessToken } = request;
    const searchArgument = this.getSearchArgument(request, SearchTypes.user);
    const config: AxiosRequestConfig = {
      headers: { Authorization: `Bearer ${accessToken}` }
    };

    const data = {
      query: `query {
          search ${searchArgument}
          {
            pageInfo{
              endCursor
              startCursor
              hasNextPage
              hasPreviousPage
            }
            userCount
            nodes {
              ... on User {
                bio
                name
                location
              }
            }
          }
        }`
    };

    const response = await this.httpClient.github.post("", data, config);
    return response;
  }

  async searchRepository(request: SearchRequest): Promise<SearchRepositoryResponse> {
    const { accessToken } = request;
    const searchArgument = this.getSearchArgument(request, SearchTypes.repository);
    const config: AxiosRequestConfig = {
      headers: { Authorization: `Bearer ${accessToken}` }
    };

    const data = {
      query: `query {
          search ${searchArgument} 
          {
            pageInfo{
              endCursor
              startCursor
              hasNextPage
              hasPreviousPage
            }
            repositoryCount
            nodes {
              ... on Repository {
                name
                updatedAt
                description
                licenseInfo {
                  body
                  name
                }
                nameWithOwner
                stargazerCount
                primaryLanguage {
                  name
                }
              }
            }
          }
        }`
    };

    const response = await this.httpClient.github.post("", data, config);
    return response;
  }
}

export default new SearchRepository(httpClient);
