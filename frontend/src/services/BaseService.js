import { getApiErrorMessage, toApiError } from "./shared/error";

export class BaseService {
  async handleRequest(fn, fallback) {
    try {
      return await fn();
    } catch (error) {
      // Normalize into ApiError so UI can read status/code/details consistently
      throw toApiError(error, fallback);
    }
  }

  async handleGet(url, { normalize, fallback, config } = {}) {
    return this.handleRequest(async () => {
      const { data } = await this.httpClient.get(url, config);
      const result = data?.data;
      return normalize ? normalize(result) : result;
    }, fallback);
  }

  async handleGetList(
    url,
    { dataKey = "items", normalize, fallback, config } = {}
  ) {
    return this.handleRequest(async () => {
      const { data } = await this.httpClient.get(url, config);
      const items = data?.data?.[dataKey] || [];
      return normalize ? items.map(normalize) : items;
    }, fallback);
  }

  async handlePost(url, payload, { normalize, fallback, config } = {}) {
    return this.handleRequest(async () => {
      const { data } = await this.httpClient.post(url, payload, config);
      const result = data?.data;
      return normalize ? normalize(result) : result;
    }, fallback);
  }

  async handlePut(url, payload, { normalize, fallback, config } = {}) {
    return this.handleRequest(async () => {
      const { data } = await this.httpClient.put(url, payload, config);
      const result = data?.data;
      return normalize ? normalize(result) : result;
    }, fallback);
  }

  async handleDelete(url, { fallback, config } = {}) {
    return this.handleRequest(async () => {
      await this.httpClient.delete(url, config);
      return true;
    }, fallback);
  }

  async handlePatch(url, payload, { normalize, fallback, config } = {}) {
    return this.handleRequest(async () => {
      const { data } = await this.httpClient.patch(url, payload, config);
      const result = data?.data;
      return normalize ? normalize(result) : result;
    }, fallback);
  }
}
