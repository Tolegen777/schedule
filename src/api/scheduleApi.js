import { axiosInstance } from './index';
import {userService} from "../services/userService";
import {formatDateWithTime} from "../utils/formatDateWithTime";

export const scheduleApi = {
      getAlLApi: async (filter = [], code) => {
        const response = await axiosInstance.post(`schedules/extended?universityCode=${code}`, filter);

        let newData = []

        if (response.data?.length > 0) {
          const array = []
          newData = response.data.map((item) => {
            if (array.includes(`${formatDateWithTime(item?.startTime)}_${item.week}_0`)) {
              const count = array.filter(elem => elem.replace(/_\d+$/, "") === `${formatDateWithTime(item?.startTime)}_${item.week}`).length;
              array.push(`${formatDateWithTime(item?.startTime)}_${item.week}_${count}`)
              return {
                ...item,
                itemIndex: String(count)
              }
            } else {
              array.push(`${formatDateWithTime(item?.startTime)}_${item.week}_0`)
              return {
                ...item,
                itemIndex: `0`
              }
            }


          })
        }

        return newData;
      },
};
