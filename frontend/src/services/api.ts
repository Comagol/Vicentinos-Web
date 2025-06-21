import axios from 'axios'

// Creación de la instancia de axios
const api = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 6000,
    headers: {
        'Content-Type': 'application/json',
    },
});