import { axiosInstance } from './index';
import {userService} from "../utils/userService";

export const educationalProgramsApi = {
  getAlLApi: async (page = 1, size = 100, filter = '') => {
    const code = userService.getLocal()
    const response = await axiosInstance.get(
      `educational-programs?pageCurrent=${page}&pageSize=${size}&pageTotal=0&universityCode=${code}&${filter}`
    );
    return response.data;
  },
};
