import { httpClient } from "./shared/httpClient";
import { BaseService } from "./BaseService";

class UploadServiceClass extends BaseService {
  uploadFile(file) {
    return this.handleRequest(async () => {
      const formData = new FormData();
      formData.append("file", file);
      const { data } = await httpClient.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data?.data?.filePath || data?.data?.url || null;
    }, "Unable to upload file.");
  }
}

export const uploadService = new UploadServiceClass();
