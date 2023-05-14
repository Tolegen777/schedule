import { axiosInstance } from './index';

export const scheduleApi = {
  getAlLApi: async (filter = '') => {
    const response = await axiosInstance.get(
      `schedules?pageCurrent=${1}&pageSize=${100}&pageTotal=0&${filter}`
    );
    return response.data;
  },
};
