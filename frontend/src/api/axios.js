import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://personal-portfolio-2d24.onrender.com/',
})

export default api
