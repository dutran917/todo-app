import axios from 'axios'
const baseURL = 'https://mvn-task-manager.work'

const axiosInstance = axios.create({
    baseURL: baseURL,
})
axiosInstance.interceptors.request.use((req) => {
    const token = localStorage.getItem('token')
    if(token) {
        req.headers.Authorization = `Bearer ${token}`
    }
    return req
});

axiosInstance.interceptors.response.use((res) => {
    const token = localStorage.getItem('token')
    if(token) {
        res.headers.Authorization = `Bearer ${token}`
    }
    return res
});

export default axiosInstance