import { post } from "../api_helper";
import * as url from "../url_helper";
import { getApiConfig } from "../config";


export const uploadImage = async (formData) => {
  return await post(`${url.UPLOADS}`, formData, getApiConfig(true));
};