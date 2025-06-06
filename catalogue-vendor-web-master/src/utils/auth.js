// src/utils/auth.js
export const isAuthenticated = () => {
  return !!localStorage.getItem("authToken");
};

export const login = (token) => {
  localStorage.setItem("authToken", token);
};

export const logout = () => {
  localStorage.removeItem("authToken");
};

export const authToken = () => {
  return localStorage.getItem("authToken");
};

export const vendorID = (id) => {
  localStorage.setItem("vendorID", id);
};

export const getVendorID = () => {
  return localStorage.getItem("vendorID");
};