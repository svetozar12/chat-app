import axios from "axios";
import constants from "../constants";
const api = axios.create({
  baseURL: constants.api_url,
});

export default api;
