// Base service class with common error handling pattern
import { getApiErrorMessage } from "./error";

export class BaseService {
  async handleRequest(fn, fallbackMessage) {
    try {
      return await fn();
    } catch (error) {
      throw new Error(getApiErrorMessage(error, fallbackMessage));
    }
  }
}

