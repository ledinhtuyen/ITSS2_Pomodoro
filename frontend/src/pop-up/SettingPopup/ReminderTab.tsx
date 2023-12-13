import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { TimePicker } from "antd";
import "./ReminderTab.scss";
import axios from "axios";

interface ReminderTabProps {
  sleepReminder: string;
  setSleepReminder: React.Dispatch<React.SetStateAction<string>>;
}

const format = "HH:mm";

const ReminderTab = ({ setSleepReminder, sleepReminder }: ReminderTabProps) => {
  // const [sleepReminder, setSleepReminder] = useState<string>("23:00");

  const postSetting = (sleep_time:string) => {
    axios.post(`${import.meta.env.VITE_DOMAIN}/timer/`, {
      "sleep_time": sleep_time,
      "user": 1
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const onChangesleepReminder = (value: Dayjs | null, timeString: string) => {
    if (timeString !== null) {
      setSleepReminder(timeString);
      postSetting(timeString);
    }
  };

  return (
    <div className="mx-5 text-white">
      <div>
        <h1 className="text-2xl mb-3">Sleep Reminder</h1>
        <div className="mb-3">Schedule</div>
        <TimePicker
          value={dayjs(sleepReminder, format)}
          onChange={onChangesleepReminder}
          format={format}
        />
        <div className="mt-3">Default schedule</div>
      </div>
    </div>
  );
};

export default ReminderTab;
