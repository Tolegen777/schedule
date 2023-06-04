import React, {useCallback, useState} from 'react';
import styled from 'styled-components';
import Dayjs from 'dayjs';
import {times} from 'lodash';
import ScheduleCard from "./ScheduleCard";
import {Button} from "antd";
import ViewModal from "./ViewModal";
import {Colors, constTimes, weeks} from "../../../const/const";
import {scheduleApi} from "../../../api/scheduleApi";
import {useQuery} from "react-query";
import {roomApi} from "../../../api/roomApi";
import {dayParser} from "../../../utils/dayParser";
import {convertReverseDateTimeToTime, convertTime} from "../../../utils/convertTimeToDateTime";
import {Loader} from "../../../shared/Loader";
import {userService} from "../../../services/userService";


const StyledCalendar = styled.div`
  display: grid;
  grid-template-columns: 150px repeat(7, 1fr);
  grid-template-rows: 50px repeat(14, 1fr);
  grid-column-gap: 1px;
  grid-row-gap: 1px;
  height: 100%;
  background-color: #fff;
`;

const StyledCell = styled.div`
  border: 1px solid #ccc;
  grid-row: ${props => props.row};
  grid-column: ${props => props.column};
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
`;

const StyledHeaderCell = styled(StyledCell)`
  font-weight: bold;
  background-color: ${Colors.Blue};
  color: #FFF;
  font-size: 16px;
  box-shadow: 1px 1px 2px #a6ede2, -1px 1px 2px #a6ede2, -1px -1px 2px #a6ede2, 1px -1px 2px #a6ede2;
`;

const StyledTimeCell = styled(StyledCell)`
  background-color: ${Colors.Blue};
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  box-shadow: 1px 1px 2px #a6ede2, -1px 1px 2px #a6ede2, -1px -1px 2px #a6ede2, 1px -1px 2px #a6ede2;
`;

const StyledEventCell = styled(StyledCell)`
  font-size: 14px;
  font-weight: bold;
  background-color: ${Colors.White}
  color: #fff;
  min-height: 200px;
  //cursor: pointer;
  position: relative;
  width: 210px;
  box-shadow: 1px 1px 2px #a6ede2, -1px 1px 2px #a6ede2, -1px -1px 2px #a6ede2, 1px -1px 2px #a6ede2;
`;

const ScheduleView = React.memo(({filterParams, isRoom, filterRoomsParams}) => {
    const [selectedDate, setSelectedDate] = useState(Dayjs());

    const code = userService.getLocal()

    const [open2, setOpen2] = useState(false)

    const [detailSchedules, setDetailSchedules] = useState([])
    // api
    const {isLoading, data} = useQuery(['schedule', filterParams], () =>
        scheduleApi.getAlLApi(filterParams, code), {
            enabled: code?.length > 0
        }
    );

    const {data: roomsData, isLoading: roomLoading} = useQuery(['roomsData', filterRoomsParams], () =>
        roomApi.getByIdApi(filterRoomsParams, code), {
        enabled: filterRoomsParams?.length > 0 && code?.length > 0
        }
    );


    const onClose = useCallback(() => {
        setOpen2(false)
    }, [])

    const renderHeaderCells = () => {
        const startOfWeek = selectedDate.startOf('week');
        const headerCells = [];

        for (let i = 0; i < 8; i++) {
            const date = startOfWeek.add(i, 'day');
            headerCells.push(
                <StyledHeaderCell key={i} row={1} column={i + 1}>
                    {i === 0 ? '' : dayParser(date.format('ddd '))}
                </StyledHeaderCell>
            );
        }

        return headerCells;
    };

    const renderTimeCells = () => {
        const timeCells = [];

        for (let i = 8; i <= 21; i++) {
            const date = Dayjs().hour(i).minute(10);
            timeCells.push(
                <StyledTimeCell key={i} row={i - 6} column={1}>
                    {date.format('HH:mm')}
                </StyledTimeCell>
            );
        }

        return timeCells;
    };

    const renderWeekCells = () => {
        const startOfWeek = selectedDate.startOf('week');
        const weekCells = [];
        let arr = []

        for (let i = 0; i < 7; i++) {
            const date = startOfWeek.add(i, 'day');
            const isCurrentTime = date.isSame(Dayjs(), 'day');
            const column = i + 2;

            times(14, (j) => {
                weekCells.push(
                    <StyledEventCell
                        key={`${i}-${j}`}
                        row={j + 2}
                        column={column}
                        isCurrentTime={isCurrentTime}
                        onClick={() => {


                            if (`${weeks[i]}_${constTimes[j]}_${constTimes[j + 1]}` in arr) {
                                // setCurrentSchedules(arr[`${weeks[i]}_${constTimes[j]}_${constTimes[j + 1]}`])
                            }

                        }}
                    >
                        {/* Render your event data here */}
                        {!isRoom && data?.map((item, index) => {
                            if (item.week === weeks[i] && convertReverseDateTimeToTime(item.startTime) === constTimes[j]) {
                                if (`${item?.week}_${convertReverseDateTimeToTime(item.startTime)}_${convertReverseDateTimeToTime(item?.endTime, item)}` in arr) {
                                    arr[`${item?.week}_${convertReverseDateTimeToTime(item.startTime)}_${convertReverseDateTimeToTime(item?.endTime, item)}`].push(item)
                                } else {
                                    arr = {
                                        ...arr,
                                        [`${item?.week}_${convertReverseDateTimeToTime(item.startTime)}_${convertReverseDateTimeToTime(item?.endTime, item)}`]: [item]
                                    }
                                }
                                return <ScheduleCard
                                    teacher={`${item?.teacher?.lastName} ${item?.teacher?.firstName?.slice(0, 1)}. ${item.teacher?.middleName?.slice(0, 1)}.` ?? ''}
                                    startTime={item?.startTime}
                                    endTime={item?.endTime}
                                    subject={item?.subject?.title ?? ''}
                                    sessionType={item?.sessionType ?? ''}
                                    group={item?.groups}
                                    roomNumber={item?.room?.name ?? ''}
                                    itemIndex={item?.itemIndex}
                                    educationalProgram={item.groups[0]?.educationalProgramName}
                                />;
                            }
                            return ''
                        })}

                        {!isRoom && <div style={{
                            position: "absolute",
                            bottom: 0,
                            zIndex: 1000,
                            display: "flex",
                            justifyContent: "space-between",
                            gap: "2px"
                        }}>
                            {`${weeks[i]}_${constTimes[j]}_${constTimes[j + 1]}` in arr &&
                                <Button onClick={() => {
                                    setOpen2(true)
                                    setDetailSchedules(arr[`${weeks[i]}_${constTimes[j]}_${constTimes[j + 1]}`])
                                }}>
                                    Посмотреть все
                                </Button>}
                        </div>}

                        {
                            isRoom && roomsData?.timeIntervals?.map(room => {
                                console.log(room?.week, weeks[i], convertTime(room?.timeInterval?.startTime ?? ''), constTimes[j], 'NICE')
                                if (room.week === weeks[i] && convertTime(room?.timeInterval?.startTime ?? '') === constTimes[j]) {
                                    return <div style={{
                                        width: "160px",
                                        height: "50px",
                                        background: "#ee6363",
                                        color: "#fff",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: "18px",
                                        borderRadius: "2px"
                                    }}>
                                        Кабинет занят
                                    </div>
                                }
                            })
                        }

                    </StyledEventCell>
                );
            });
        }

        return weekCells;
    };

    if (isLoading || roomLoading) return <Loader/>

    // return <CustomLoader />

    return (
        <StyledCalendar>
            {/*<ScheduleModal*/}
            {/*    open={open}*/}
            {/*    onSubmit={onSubmitCreateUpdateModal}*/}
            {/*    initialFields={createUpdateFormInitialFields}*/}
            {/*    formType={formType}*/}
            {/*    editEntity={editEntity}*/}
            {/*    onClose={onClose}*/}
            {/*    subjects={subjects}*/}
            {/*    teachers={teachers}*/}
            {/*    rooms={rooms}*/}
            {/*    groups={groups}*/}
            {/*    confirmLoading={createLoading}*/}
            {/*/>*/}
            <ViewModal
                open={open2}
                onClose={onClose}
                items={detailSchedules}
                onRemoveFromArray={(id) => setDetailSchedules(prevState => prevState?.filter(item => item?.id !== id))}
            />
            {renderHeaderCells()}
            {renderTimeCells()}
            {renderWeekCells()}
        </StyledCalendar>
    );
});

export default ScheduleView;
