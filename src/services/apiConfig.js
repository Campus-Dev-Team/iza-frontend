const API_BASE_URL = "https://chatcampuslands.com:8443/iza--test/";
const API_WEBSOCKET_URL = "wss://chatcampuslands.com:8443/iza--test/chat";

export const endpoints = {
  login: `${API_BASE_URL}auth/login`,
  register: `${API_BASE_URL}auth/register`,
  messages: `${API_BASE_URL}messages/add`,
  age: `${API_BASE_URL}user/age`,
  availability: `${API_BASE_URL}user/availability`,
  chat: `${API_BASE_URL}api/chat/new`,
};

export default API_WEBSOCKET_URL;
