import axios from 'axios'
const baseURL = 'https://mvn-task-manager.work'

const axiosInstance = axios.create({
    baseURL: baseURL,
})
axiosInstance.interceptors.request.use((req) => {
    req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return req
});

axiosInstance.interceptors.response.use((res) => {
    res.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return res
});

export default axiosInstance