import axios from "axios";

export const Network = axios.create({
  timeout: 5000,
  baseURL: "http://www.mocky.io/v2/",
});
