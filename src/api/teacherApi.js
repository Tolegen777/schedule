import { axiosInstance } from './index';
import {userService} from "../utils/userService";

export const teacherApi = {
  getAlLApi: async (page = 1, size = 100, filter = '') => {
    const code = userService.getLocal()
    const response = await axiosInstance.get(
        `teachers/extended?pageCurrent=${page}&pageSize=${size}&pageTotal=0&universityCode=${code}&${filter}`
    );
    return response.data;
  },
};