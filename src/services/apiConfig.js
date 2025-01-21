const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_WEBSOCKET_URL = import.meta.env.VITE_API_WEBSOCKET_URL;

export const endpoints = {
    login: `${API_BASE_URL}auth/login`,
}

export default API_WEBSOCKET_URL