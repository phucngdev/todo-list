import axios from "axios";

const defaultURL = "http://localhost:8080/api/v1/todos";
const baseUrl = axios.create({
  baseURL: defaultURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default baseUrl;
