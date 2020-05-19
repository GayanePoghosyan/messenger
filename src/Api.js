import axios from 'axios';

const API_URL = 'http://localhost:4000';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-authorization'] = token;
  }
  return config;
}, (err) => Promise.reject(err));

export class Api {
  static login(email, password) {
    return api.post('/users/login', { email, password })
  }

  static getUsers() {
    return api.get('/users/list')
  }

}


export default Api;
