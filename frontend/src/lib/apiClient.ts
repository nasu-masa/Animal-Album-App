import axios from "axios";
import { API_TIMEOUT_MS } from "@/constants/api";

const apiClient = axios.create({
  baseURL: "/backend",
  timeout: API_TIMEOUT_MS,
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

export default apiClient;
