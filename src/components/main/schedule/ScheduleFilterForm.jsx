import {Button, Form} from "antd";
import {useQuery} from "react-query";
import {teacherApi} from "../../../api/teacherApi";
import {groupApi} from "../../../api/groupApi";
import {subjectApi} from "../../../api/subjectApi";
import {educationalProgramsApi} from "../../../api/educationalProgramsApi";
import {roomApi} from "../../../api/roomApi";
import {selectOptionsParser} from "../../../utils/selectOptionsParser";
import {SpaceContainer} from "../../../shared/SpaceContainer";
import FormItem from "antd/es/form/FormItem";
import {FormSearchSelect, FormTagSelect} from "../../../shared/FormSelect";
import {CustomButton} from "../../../shared/CustomButton";
import {Colors} from "../../../const/const";
import ScheduleLogo from "../../../shared/ScheduleLogo/ScheduleLogo";
import {userService} from "../../../services/userService";

const options = [
    {
        label: 'Преподаватель',
        value: 'TEACHER'
    },
    {
        label: 'Предмет',
        value: 'SUBJECT'
    },
    {
        label: 'Группа',
        value: 'GROUP'
    },
]
export const ScheduleFilterForm = ({onSubmit, isRoom, setIsRoom}) => {
    const [form] = Form.useForm();


    const searchTypeObs = Form.useWatch('searchType', form)

    const code = userService.getLocal()


    const {data: teacherData} = useQuery(['teacher'], () =>
        teacherApi.getAlLApi(1, 100, code), {
            enabled: code?.length > 0
        }
    );

    const {data: groupData} = useQuery(['group'], () =>
        groupApi.getAlLApi(1, 100, code), {
            enabled: code?.length > 0
        }
    );

    const {data: subjectData} = useQuery(['subject'], () =>
        subjectApi.getAlLApi(1, 100, code), {
            enabled: code?.length > 0
        }
    );

    const {data: educationalProgramData} = useQuery(['educationalProgram'], () =>
        educationalProgramsApi.getAlLApi(1, 100, code), {
            enabled: code?.length > 0
        }
    );

    const {data: roomsData} = useQuery(['rooms'], () =>
        roomApi.getAlLApi(1, 100, code), {
        enabled: code?.length > 0
        }
    );


    const teachers = selectOptionsParser(teacherData || [], 'email', 'id');
    const groups = selectOptionsParser(groupData || [], 'title', 'id');
    const subjects = selectOptionsParser(subjectData || [], 'title', 'id');
    const educationalPrograms = selectOptionsParser(educationalProgramData || [], 'title', 'id');
    const rooms = selectOptionsParser(roomsData || [], 'name', 'id');

    const optionValues = {
        TEACHER: teachers,
        SUBJECT: subjects,
        GROUP: groups,
        EDUCATIONAL_PROGRAM: educationalPrograms,
    }

    return (
        <>
            <Form form={form}
                  layout="horizontal"
                  onFinish={onSubmit}
                  style={{marginBottom: "10px"}}>
                <SpaceContainer size="middle" direction="horizontal">
                    <div style={{marginRight: "30px"}}>
                        <ScheduleLogo/>
                    </div>

                    {!isRoom && <FormItem
                        name="searchType"
                    >
                        <FormSearchSelect
                            placeholder="Выберите параметр"
                            options={options}
                            onChange={() => form.setFieldValue('searchId')}
                        />
                    </FormItem>}

                    {!isRoom && <FormItem name="searchId">
                        <FormTagSelect
                            placeholder="Выберите элементы"
                            options={optionValues[searchTypeObs]}
                        />
                    </FormItem>}

                    {isRoom && <FormItem name="roomId">
                        <FormSearchSelect
                            placeholder="Выберите элементы"
                            options={rooms}
                        />
                    </FormItem>}

                    <CustomButton
                        onClick={form.submit}
                        color={Colors.Blue}
                        position_from="unset"
                    >
                        Поиск
                    </CustomButton>
                    <CustomButton
                        color={Colors.Grey25}
                        text_color={Colors.Grey90}
                        position_from="unset"
                        onClick={() => {
                            form.setFieldValue('searchId')
                            form.setFieldValue('searchType')
                            form.setFieldValue('roomId')
                        }}
                    >
                        Сбросить
                    </CustomButton>

                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        marginLeft: "20px"
                    }}>
                            <Button style={{
                                background: !isRoom ? Colors.Blue : '#fff',
                                color: isRoom ? Colors.Blue : '#fff',
                            }}
                                    onClick={() => setIsRoom(!isRoom)}
                            >
                                Расписания
                            </Button>

                            <Button style={{
                                background: isRoom ? Colors.Blue : '#fff',
                                color: !isRoom ? Colors.Blue : '#fff',
                            }}
                                    onClick={() => setIsRoom(!isRoom)}
                            >
                                Кабинеты
                            </Button>

                    </div>


                </SpaceContainer>
            </Form>
        </>
    );
};
