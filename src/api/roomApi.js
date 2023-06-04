import { axiosInstance } from './index';
import {userService} from "../services/userService";
export const roomApi = {
  getAlLApi: async (page = 1, size = 100, filter = '') => {
    const response = await axiosInstance.get(
          `rooms?pageCurrent=${page}&pageSize=${size}&pageTotal=0&universityCode=${filter}`
    );
    return response.data;
  },

  getByIdApi: async (id, code) => {
    const response = await axiosInstance.get(`rooms/${id}/timeIntervals?universityCode=${code}`);
    return response.data;
  },
};
