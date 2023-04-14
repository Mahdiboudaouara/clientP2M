import axios from "axios";

export default axios.create({
  baseURL: `http://139-144-162-115.ip.linodeusercontent.com`,
  headers: {
    "Content-type": "application/json"
  }
});