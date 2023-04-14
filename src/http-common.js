import axios from "axios";

export default axios.create({
  baseURL: `http://${process.env.SERVER}`,
  headers: {
    "Content-type": "application/json"
  }
});