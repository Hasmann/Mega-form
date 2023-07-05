import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:2007/api/v1",
});
