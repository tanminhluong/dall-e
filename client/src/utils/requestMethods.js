import axios from "axios";

const BASE_URL = "https://dall-e-m084.onrender.com/api";
const TOKEN = localStorage.getItem("userToken");

export const publicRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${TOKEN}`,
  },
});
