import axios from 'axios';

const wodfulAPI = axios.create({
  baseURL: 'http://localhost:3333',
});

export default wodfulAPI;
