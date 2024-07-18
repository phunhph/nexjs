import axios from "axios";

export const instance = axios.create({
  baseURL: "http://localhost:3200",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 3000,
});
