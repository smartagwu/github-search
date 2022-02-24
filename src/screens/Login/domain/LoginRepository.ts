import { AxiosRequestConfig } from "axios";
import httpClient, { HttpClient } from "../../../utils/httpClient";

export interface AccessTokenRequest {
  code: string;
}

export interface UserProfileRequest {
  accessToken: string;
}

export interface GetUserProfileResponse {
  data: {
    viewer: UserProfile;
  };
}

export interface UserProfile {
  name: string;
  avatarUrl?: string;
}

export interface AccessTokenResponse {
  message: string;
  data?: {
    access_token: string;
    scope: string;
    token_type: string;
  };
}

interface UserRepositoryImpl {
  getAccessToken: (request: AccessTokenRequest) => Promise<AccessTokenResponse>;
  getUserProfile: (request: UserProfileRequest) => Promise<UserProfile>;
}

class UserRepository implements UserRepositoryImpl {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async getAccessToken(request: AccessTokenRequest): Promise<AccessTokenResponse> {
    const response = await this.httpClient.indicina.post<AccessTokenResponse>("", request);
    return response.data;
  }

  async getUserProfile(request: UserProfileRequest): Promise<UserProfile> {
    const config: AxiosRequestConfig = {
      headers: { Authorization: `Bearer ${request.accessToken}` }
    };
    const data = {
      query: `query { viewer { avatarUrl name } }`
    };

    const response = await this.httpClient.github.post<UserProfile>("", data, config);
    return response.data;
  }
}

export default new UserRepository(httpClient);
