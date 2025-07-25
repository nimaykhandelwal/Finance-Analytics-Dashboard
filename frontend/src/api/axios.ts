// src/api/axios.ts
import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,  // e.g. "http://localhost:4000/api"
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token && config.headers) {
        // send Authorization header
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default api
