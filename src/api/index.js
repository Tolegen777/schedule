import axios from 'axios';

import { customNotification } from '../utils/customNotification';

const BASE_URL = 'https://university-scheduler.herokuapp.com/';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.defaults.headers.common['Content-Type'] = 'application/json';


axiosInstance.interceptors.response.use(
  ( response ) =>
    response, async ( error ) => {
      console.log(error, 'RESponse')
    if (error.response) {
      const errorMessage = error.response.data.message
      customNotification({
        type: 'error',
        message: errorMessage.length ? errorMessage : 'Ошибка сервера'
      })
    }

    return Promise.reject(error)
  });





