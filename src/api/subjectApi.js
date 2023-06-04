import { axiosInstance } from './index';
import {userService} from "../services/userService";

export const subjectApi = {
  getAlLApi: async (page = 1, size = 100, filter = '') => {
    const response = await axiosInstance.get(
      `subjects/extended?pageCurrent=${page}&pageSize=${size}&pageTotal=0&universityCode=${filter}`
    );
    return response.data;
  },
};
