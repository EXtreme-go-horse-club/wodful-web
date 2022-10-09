import axios from 'axios';

const wodfulApiPrivate = axios.create({
  baseURL: 'http://localhost:3333',
});

[wodfulApiPrivate].forEach((instance) => {
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('@Wodful:tkn');

      if (token) config.headers!.Authorization = `Bearer ${token}`;

      return config;
    },
    (error) => Promise.reject(error),
  );
});

export default wodfulApiPrivate;
