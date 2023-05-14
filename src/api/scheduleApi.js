import { axiosInstance } from './index';
import {userService} from "../utils/userService";

export const scheduleApi = {
  getAlLApi: async (filter = '') => {
    const code = userService.getLocal()
    const response = await axiosInstance.get(
      `schedules?pageCurrent=${1}&pageSize=${100}&pageTotal=0&universityCode=${code}&${filter}`
    );
    return response.data;
  },
};
