import axios from "axios";

const API_URL = "http://localhost:5000";

export const registerAdmin = (data) =>
  axios.post(`${API_URL}/admin/register`, data);
export const loginAdmin = (data) => axios.post(`${API_URL}/admin/login`, data);
export const getUsers = (token) =>
  axios.get(`${API_URL}/admin/users`, { headers: { Authorization: token } });
export const submitUser = (data, config) =>
  axios.post(`${API_URL}/submit`, data, config);
