import dayjs, { Dayjs } from "dayjs";
import { TimePicker } from "antd";
import "./ReminderTab.scss";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { setSleepReminder } from "../../redux/reducers/pomodoroReducer";

const format = "HH:mm";

const ReminderTab = () => {
  const dispatch = useAppDispatch();
  const sleepReminder = useAppSelector((state) => state.pomodoro.sleepReminder);

  const postSetting = (sleep_time: string) => {
    axios.post(`${import.meta.env.VITE_DOMAIN}/timer`, {
        "sleep_time": sleep_time,
        "user": 1
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onChangeSleepReminder = (value: Dayjs | null, timeString: string) => {
    if (timeString !== null) {
      dispatch(setSleepReminder(timeString));
      postSetting(timeString);
      value;
    }
  };

  return (
    <div className="mx-5 text-white">
      <div>
        <h1 className="text-2xl mb-3">Sleep Reminder</h1>
        <div className="mb-3">Schedule</div>
        <TimePicker
          value={dayjs(sleepReminder, format)}
          onChange={onChangeSleepReminder}
          format={format}
        />
        <div className="mt-3">Default schedule</div>
      </div>
    </div>
  );
};

export default ReminderTab;
