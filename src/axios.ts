import axios from "axios";

export const baseUrl = 'http://localhost:5000'

const instance = axios.create({
    baseURL: 'http://localhost:5000',
});

instance.interceptors.request.use((config) => {
    config.headers!.Authorization = localStorage.getItem('token')
    return config
})

export default instance