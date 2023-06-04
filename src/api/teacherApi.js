import { axiosInstance } from './index';
import {userService} from "../services/userService";


export const teacherApi = {
  getAlLApi: async (page = 1, size = 100, filter = '') => {
    const response = await axiosInstance.get(
        `teachers/extended?pageCurrent=${page}&pageSize=${size}&pageTotal=0&universityCode=${filter}`
    );
    return response.data;
  },
};
