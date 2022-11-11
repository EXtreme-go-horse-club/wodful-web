import axios from 'axios';

const removeTokenMessage = ['Invalid token', 'Token is missing'];

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

  instance.interceptors.response.use(
    (config) => {
      return config;
    },
    async function (error) {
      const errorReponseMessage = error.response.data.message;
      if (error.response.status === 400 && removeTokenMessage.includes(errorReponseMessage)) {
        localStorage.removeItem('@Wodful:usr');
        localStorage.removeItem('@Wodful:tkn');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    },
  );
});

export default wodfulApiPrivate;
