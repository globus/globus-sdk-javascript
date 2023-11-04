import { HTTP_METHODS } from "../shared.js";

export function getHeadersForService(
  method: keyof typeof HTTP_METHODS
): Record<string, any> {
  if (method === HTTP_METHODS.GET) {
    return {};
  }
  return {
    "Content-Type": "application/json",
  };
}
