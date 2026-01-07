import { httpClient } from "./shared/httpClient";
import { BaseService } from "./BaseService";

class UploadServiceClass extends BaseService {
  constructor() {
    super();
    this.httpClient = httpClient;
  }

  uploadFile(file) {
    const formData = new FormData();
    formData.append("file", file);
    return this.handlePost("/upload", formData, {
      normalize: (data) => data?.filePath || data?.url || null,
      fallback: "Unable to upload file.",
      config: {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    });
  }
}

export const uploadService = new UploadServiceClass();
