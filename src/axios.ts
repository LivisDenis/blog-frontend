import axios from "axios";

export const baseUrl = process.env.REACT_APP_API_URL

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

instance.interceptors.request.use((config) => {
    config.headers!.Authorization = localStorage.getItem('token')
    return config
})

export default instance