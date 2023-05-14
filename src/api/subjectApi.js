import { axiosInstance } from './index';
import {userService} from "../utils/userService";

export const subjectApi = {
  getAlLApi: async (page = 1, size = 100, filter = '') => {
    const code = userService.getLocal()
    const response = await axiosInstance.get(
      `subjects/extended?pageCurrent=${page}&pageSize=${size}&pageTotal=0&universityCode=${code}&${filter}`
    );
    return response.data;
  },
};
