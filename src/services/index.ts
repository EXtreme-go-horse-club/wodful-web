import axios from 'axios';

const wodfulApiPrivate = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_API_URL}`,
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

[wodfulApiPrivate].forEach((instance) => {
  instance.interceptors.response.use(
    (config) => {
      return config;
    },
    async function (error) {
      const originalRequest = error.config;

      if (error.response.status === 400 && !originalRequest._retry) {
        localStorage.removeItem('@Wodful:usr');
        localStorage.removeItem('@Wodful:tkn');
      }
      return Promise.reject(error);
    },
  );
});

export default wodfulApiPrivate;
