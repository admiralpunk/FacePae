import axios from "axios";

const API_URL = "http://localhost:3000/api"; // Replace with your actual backend URL

export const createRestaurant = (data) => {
  return axios.post(`${API_URL}/create-restaurant`, data);
};

export const loginRestaurant = (credentials) => {
  return axios.post(`${API_URL}/login`, credentials);
};

export const getProfile = (token) => {
  return axios.get(`${API_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getOrders = (token) => {
  return axios.get(`${API_URL}/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
