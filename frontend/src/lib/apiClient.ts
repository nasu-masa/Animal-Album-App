import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

export default apiClient;
