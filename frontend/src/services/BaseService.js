import { getApiErrorMessage } from "./shared/error";

export class BaseService {
  async handleRequest(fn, fallback) {
    try {
      return await fn();
    } catch (error) {
      throw new Error(getApiErrorMessage(error, fallback));
    }
  }
}
