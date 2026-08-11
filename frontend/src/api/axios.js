import axios from "axios";

const api = axios.create({
    baseURL : import.meta.env.VITE_BACKEND_URL,
    withCredentials : true,
    timeout : 10000,
    headers: {
        // "content-type":"application/json",
        Accept : "application/json"
    }
})

export default api;