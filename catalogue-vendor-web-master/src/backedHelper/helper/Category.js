import { deleteAPI, get, post, put } from "../api_helper";
import * as url from "../url_helper";
import { getApiConfig } from "../config";

const config = getApiConfig();

export const CreateCategory = async (formData) => {
  return await post(`${url.CATEGORY}`, formData, getApiConfig(true));
};

export const GetCategory = async (id) => {
  return await get(`${url.CATEGORY}/${id}`, config);
};

export const PutCategory = async (id, formData) => {
  return await put(`${url.CATEGORY}/${id}`, formData, config);
};

export const DeleteCategory = async (id) => {
  return await deleteAPI(`${url.CATEGORY}/${id}`, config);
};

export const GetCategoryList = async (id) => {
  return await get(`${url.CATEGORY}/name/categories/${id}`, config);
};
