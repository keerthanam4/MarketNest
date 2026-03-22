import axios from "axios";

const API = axios.create({
    baseURL: "https://marketnest-backend-z7i1.onrender.com"
});

export default API;