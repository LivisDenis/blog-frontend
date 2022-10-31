import axios from "axios";

export const baseUrl = 'https://livis-blog.herokuapp.com'
// process.env.REACT_APP_API_URL
const instance = axios.create({
    baseURL: 'https://livis-blog.herokuapp.com',
});

instance.interceptors.request.use((config) => {
    config.headers!.Authorization = localStorage.getItem('token')
    return config
})

export default instance