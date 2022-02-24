import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export interface HttpClient {
  github: AxiosInstance;
  indicina: AxiosInstance;
}

const createHttpClient = (baseURL?: string) => {
  const config: AxiosRequestConfig = {
    baseURL,
    headers: {
      "Content-Type": "application/json"
    }
  };

  const instance = axios.create(config);
  return instance;
};

const httpClient = {
  indicina: createHttpClient(process.env.REACT_APP_API_BACKEND_URL),
  github: createHttpClient(process.env.REACT_APP_GITHUB_GRAPHQL_BASE_URL)
};

export default httpClient;
