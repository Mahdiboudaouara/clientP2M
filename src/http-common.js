import axios from "axios";

export default axios.create({
  baseURL: `http://${process.env.SERVER}:${process.env.SERVER_PORT}/api`,
  headers: {
    "Content-type": "application/json"
  }
});