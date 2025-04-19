import axios from "axios";
import { API_BASE_URL } from "../utils/constants";

export const register = (data) =>
  axios.post(`${API_BASE_URL}/user/register`, data);

export const login = (data) =>
  axios.post(`${API_BASE_URL}/user/login`, data);

export const logout = () => {
  // optional: call server logout or just clear client token
};