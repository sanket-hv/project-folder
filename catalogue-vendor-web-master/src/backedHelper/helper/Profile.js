import { get, put } from "../api_helper";
import * as url from "../url_helper";
import { getApiConfig } from "../config";

const config = getApiConfig();

export const GetProfile = async (id) => {
  return await get(`${url.VENDOR}/${id}`, config);
};

export const putProfile = async (id, data) => {
  return await put(`${url.VENDOR}/${id}`, data, config);
};
