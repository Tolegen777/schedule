import React, {useState} from 'react';
import {ScheduleFilterForm} from "../components/main/schedule/ScheduleFilterForm";
import ScheduleView from "../components/main/schedule/ScheduleView";

const Schedule = () => {

    const [isRoom, setIsRoom] = useState(false)

    const [filterParams, setFilterParams] = useState([]);

    const [filterRoomsParams, setFilterRoomsParams] = useState([]);

    const onSubmitFilterModal = (formData) => {

        if (isRoom) {
            setFilterRoomsParams(formData?.roomId ?? '');
        } else {
            const payload = formData?.searchId?.map(item => {
                return {
                    searchId: item ?? '',
                    searchType: formData?.searchType ?? ''
                }
            })
            setFilterParams(payload)
        }

    };

    return (
        <>
            <ScheduleFilterForm
                onSubmit={(val) => onSubmitFilterModal(val)}
                isRoom={isRoom}
                setIsRoom={setIsRoom}
            />
            <ScheduleView
                filterParams={filterParams}
                filterRoomsParams={filterRoomsParams}
                isRoom={isRoom}/>
        </>
    );
};

export default Schedule;