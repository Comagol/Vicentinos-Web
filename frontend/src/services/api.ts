import axios from 'axios'

// Creación de la instancia de axios
const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    timeout: 6000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

//Interceptadores para Requests
api.interceptors.request.use(
    (config) => {
        console.log('Request:', config.method?.toUpperCase(), config.url);
        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

//Interceptores para las Responses
api.interceptors.response.use(
    (response) => {
        console.log('Response:', response.status, response.config.url);
        return response;
    },
    (error) => {
        console.error('Response error:', error.response?.status, error.message);
        return Promise.reject(error);
    }
);

export default api;