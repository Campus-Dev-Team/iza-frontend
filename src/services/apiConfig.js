// const API_BASE_URL = "https://chatcampuslands.com:8443/iza--dev/";
// const API_WEBSOCKET_URL = "wss://chatcampuslands.com:8443/iza--dev/chat";
const API_BASE_URL = "http://localhost:8080/iza--test/";
const API_WEBSOCKET_URL = "ws://localhost:8080/iza--test/chat";


export const endpoints = {
  login: `${API_BASE_URL}auth/login`,
  register: `${API_BASE_URL}auth/register`,
  messages: `${API_BASE_URL}messages/add`,
  age: `${API_BASE_URL}user/age`,
  availability: `${API_BASE_URL}user/availability`,
  chat: `${API_BASE_URL}api/chat/new`,
  getMessages: `${API_BASE_URL}messages/chat`,
  chatId: `${API_BASE_URL}api/chat/getChatByUser`,
};

export default API_WEBSOCKET_URL;
