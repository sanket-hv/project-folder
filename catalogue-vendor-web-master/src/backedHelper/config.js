import { authToken } from "../utils/auth";

export const getApiConfig = (isFormData = false) => {
  let configData = {};
  let token = authToken();

  if (token) {
    let headers = {
      authtoken: token,
    };

    if (isFormData) {
      headers["Content-Type"] = "multipart/form-data";
    } else {
      headers["Content-Type"] = "application/json";
    }

    configData = {
      headers,
    };
  }

  return configData;
};
