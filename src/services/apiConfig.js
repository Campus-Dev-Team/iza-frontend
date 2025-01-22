const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_WEBSOCKET_URL = import.meta.env.VITE_API_WEBSOCKET_URL;

export const endpoints = {
  login: `${API_BASE_URL}auth/login`,
  register: `${API_BASE_URL}auth/register`,
  messages: `${API_BASE_URL}messages/add`,
  age: `${API_BASE_URL}user/age`,
  availability: `${API_BASE_URL}user/availability`,
};

export default API_WEBSOCKET_URL;
