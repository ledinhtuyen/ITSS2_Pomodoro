import React, { useEffect, useState } from "react";
import { Slider, InputNumber } from "antd";
import type { RadioChangeEvent } from "antd";
import { Input, Radio, Space } from "antd";
import axios from "axios";

import "./PomodoroTab.scss";

interface PomandoroTabProps {
  pomodoro: number;
  setPomodoro: React.Dispatch<React.SetStateAction<number>>;
  shortBreak: number;
  setShortBreak: React.Dispatch<React.SetStateAction<number>>;
  longBreak: number;
  setLongBreak: React.Dispatch<React.SetStateAction<number>>;
}

const PomodoroTab = ({
  longBreak,
  pomodoro,
  setLongBreak,
  setPomodoro,
  setShortBreak,
  shortBreak,
}: PomandoroTabProps) => {
  const [value, setValue] = useState(1);
  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const postSetting = (a:number = pomodoro, b:number = shortBreak, c:number = longBreak) => {
    axios.post(`${import.meta.env.VITE_DOMAIN}/timer/`, {
      "pomodoro": a / 60,
      "short_break": b / 60,
      "long_break": c / 60,
      "sleep_time": "23:00",
      "user": 1
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const onChangePomodoroTime = (minutes: number | null) => {
    if (minutes !== null) {
      setPomodoro(minutes * 60);
      postSetting(minutes * 60);
    }
  };

  const onChangeShortBreak = (minutes: number | null) => {
    if (minutes !== null) {
      setShortBreak(minutes * 60);
      postSetting(undefined, minutes * 60);
    }
  };

  const onChangeLongBreak = (minutes: number | null) => {
    if (minutes !== null) {
      setLongBreak(minutes * 60);
      postSetting(undefined, undefined, minutes * 60);
    }
  };

  const handleBrowserNotification = () => {};

  return (
    <div className="mx-5 text-white">
      <div>
        <h1 className="text-2xl mb-5">Timer Lengths</h1>
        <div className="w-[80%]">
          <div className="pomandoro-timer-clock flex justify-between gap-5">
            <div>
              <h1 className="mb-2">Pomodoro</h1>
              <InputNumber
                addonAfter={"mins"}
                value={pomodoro / 60}
                onChange={onChangePomodoroTime}
              />
            </div>
            <div>
              <h1 className="mb-2">Short Break</h1>
              <InputNumber
                addonAfter={"mins"}
                value={shortBreak / 60}
                onChange={onChangeShortBreak}
              />
            </div>
            <div>
              <h1 className="mb-2">Long Break</h1>
              <InputNumber
                addonAfter={"mins"}
                value={longBreak / 60}
                onChange={onChangeLongBreak}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-9">
        <h1 className="text-2xl mb-5">Alerts</h1>
        <div className="slider-alert w-1/3">
          <Slider defaultValue={30} />
        </div>
        <div className="mt-6 ml-1">
          <Radio.Group onChange={onChange} value={value}>
            <Space direction="vertical">
              <Radio value={1} className="text-white">
                Soft
              </Radio>
              <Radio value={2} className="text-white">
                Chime
              </Radio>
              <Radio value={3} className="text-white">
                No Alert
              </Radio>
            </Space>
          </Radio.Group>
        </div>
        <div className="mt-5">
          <button
            className="bg-[#1C1917] px-4 py-1 rounded-full border-white border"
            onClick={handleBrowserNotification}
          >
            <span>Allow Browser Notification</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTab;
