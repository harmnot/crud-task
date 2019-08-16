import axios from "axios";

const hitAPI = axios.create({
  baseURL: "http://localhost:4400/"
});

export default hitAPI;
