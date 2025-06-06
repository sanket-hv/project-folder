import { get } from "../api_helper";
import * as url from "../url_helper";
import { getApiConfig } from "../config";

const config = getApiConfig();

export const GetInquiry = async (id) => {
  return await get(`${url.INQUIRY}/${id}`, config);
};
