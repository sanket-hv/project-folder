import { post } from "../api_helper";
import * as url from "../url_helper";
import { getApiConfig } from "../config";

const config = getApiConfig();

export const logIn = async (formData) => {
  return await post(`${url.USER}/signin`, formData, config);
};
