import { deleteAPI, get, post, put } from "../api_helper";
import * as url from "../url_helper";
import { getApiConfig } from "../config";

const config = getApiConfig();

export const CreateProduct = async (formData) => {
  return await post(`${url.PRODUCT}`, formData, config);
};

export const GetProduct = async (id, categoryToDelete) => {
  let urlWithParams = `${url.PRODUCT}/${id}`;
  if (categoryToDelete) {
    urlWithParams += `?categoryId=${categoryToDelete}`;
  }
  return await get(urlWithParams, config);
};

export const DeleteProduct = async (id) => {
  return await deleteAPI(`${url.PRODUCT}/${id}`, config);
};

export const UpdateProduct = async (id, formData) => {
  return await put(`${url.PRODUCT}/${id}`, formData, config);
};
