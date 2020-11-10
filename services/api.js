import axios from 'axios';

const api = axios.create({
  baseURL: 'https://aps6-api.herokuapp.com'
});

export default api;