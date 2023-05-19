import axios from "axios";

export default axios.create({
  baseURL: `http://143-42-223-116.ip.linodeusercontent.com`,
  headers: {
    "Content-type": "application/json"
  }
});