// src/axiosInstance.js
import axios from 'axios';
import { createToast } from 'mosha-vue-toastify';
// import the styling for the toast
import 'mosha-vue-toastify/dist/style.css'

// Tworzenie instancji Axios
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080', // Ustaw bazowy URL API
    timeout: 5000, // Opcjonalnie: ustaw limit czasu
});

// Interceptor odpowiedzi
axiosInstance.interceptors.response.use(
    (response) => {
        // Jeśli odpowiedź jest poprawna, po prostu ją zwróć
        return response;
    },
    (error) => {
        // Jeśli jest błąd
        if (error.response) {
            // Jeśli kod statusu to 500
            if (error.response.status === 500) {
                createToast('An error occurred. Please try again.',
                    {
                        showIcon: 'false',
                        type: 'danger',
                    })
            }
            if (error.response.status === 404) {
                createToast('Resource not found. Please try again.',
                    {
                        showIcon: 'false',
                        type: 'warning',
                    })
            }

            if (error.response.status === 409) {
                createToast('Resource exists in database',
                    {
                        showIcon: 'false',
                        type: 'warning',
                    })
            }

            if (error.response.status === 400 && error.response.data.error ) {
                Object.entries(error.response.data.violations).forEach(([field, message]) => {
                    createToast(`${field}: ${message}`, {
                        type: 'danger',
                        showIcon: 'false',
                    });
                });
            }
        } else {
            console.error('Nie można połączyć się z serwerem:', error.message);
            alert('Nie można połączyć się z serwerem. Sprawdź swoje połączenie internetowe.');
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
