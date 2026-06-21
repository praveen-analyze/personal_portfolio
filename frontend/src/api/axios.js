import axios from 'axios';

// This safely looks for the Netlify variable, fallback to placeholder if missing
const baseURL = import.meta.env.VITE_API_URL || 'https://placeholder.example.com';

export default axios.create({ baseURL });