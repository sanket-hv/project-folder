import { get, post, put } from "../api_helper";
import * as url from "../url_helper";
import { getApiConfig } from "../config";

const config = getApiConfig();

export const GetSetting = async (id) => {
  return await get(`${url.SETTING}/${id}`, config);
};

export const CreateSetting = async (data) => {
  return await post(`${url.SETTING}`, data, config);
};

export const UpdateSetting = async (id, data) => {
  return await put(`${url.SETTING}/${id}`, data, config);
};
