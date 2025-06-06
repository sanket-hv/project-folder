import axios from "axios";
import { API_URL } from "./url_helper";

export const axiosApi = axios.create({
  baseURL: API_URL,
});

//* GET API
export const get = async (url, config = {}) => {
  try {
    const response = await axiosApi.get(url, { ...config });
    if (response.status) {
    }
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401 || error?.response?.data?.logout) {
      }
    }

    throw error;
  }
};

//* POST API

export const post = async (url, data, config = {}) => {

  const token = localStorage.getItem("authToken");
  
  console.log(`token ${token} and url ${url}`);
  
  const header = {
    ...(config.headers || {}),
    'Authtoken':`Bearer ${token}`
  }

   if(data instanceof FormData){
      delete Headers['Content-Type']
    }
    else{
      Headers['Content-Type'] = 'application/json';
      data = JSON.stringify(data);
    }
  try {
    const response = await axiosApi.post(url, data, { ...config },header);
    if (response.status) {
    }
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401 || error?.response?.data?.logout) {
      }
    }

    throw error;
  }
};

//* PUT API
export const put = async (url, data, config = {}) => {
  try {
    const response = await axiosApi.put(url, data, { ...config });
    if (response.status) {
    }
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401 || error?.response?.data?.logout) {
      }
    }
    throw error;
  }
};

//* DELETE API
export const deleteAPI = async (url, config = {}) => {
  try {
    const response = await axiosApi.delete(url, { ...config });
    if (response.status) {
    }
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401 || error?.response?.data?.logout) {
      }
    }
    throw error;
  }
};
