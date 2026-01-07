export class ApiError extends Error {
  constructor(
    message = "API error",
    status = null,
    code = null,
    details = null
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

function extractResponse(err) {
  return err?.response?.data ?? err?.response ?? err?.data ?? null;
}

export function getApiErrorMessage(err, fallback) {
  if (!err) return fallback || "Unknown error";

  // If already an ApiError, return its message
  if (err.name === "ApiError" && err.message) return err.message;

  // Axios style response body and common shapes
  const resp = extractResponse(err);
  if (resp) {
    const { message, error, errors, details, code } = resp;
    if (typeof message === "string" && message.trim()) return message;
    if (typeof error === "string" && error.trim()) return error;
    if (Array.isArray(errors) && errors.length) {
      return errors
        .map((e) => e?.msg || e?.message || JSON.stringify(e))
        .filter(Boolean)
        .join("; ");
    }
    if (typeof details === "string" && details.trim()) return details;
    if (typeof code === "string" && code.trim()) return code;
  }

  if (err.message) return err.message;
  return fallback || "Unknown error";
}

export function toApiError(err, fallback) {
  const message = getApiErrorMessage(err, fallback);
  const status = err?.response?.status ?? null;
  const code = err?.response?.data?.code ?? null;
  const details = extractResponse(err);
  return new ApiError(message, status, code, details);
}

export default {
  ApiError,
  getApiErrorMessage,
  toApiError,
};
// export const getApiErrorMessage = (error, fallback) => {
//   if (error?.response?.data?.error?.message) {
//     return error.response.data.error.message;
//   }
//   if (error?.response?.data?.message) {
//     return error.response.data.message;
//   }
//   return error?.message || fallback;
// };
