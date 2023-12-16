import React from "react";
import { Slider, InputNumber } from "antd";
import type { RadioChangeEvent } from "antd";
import { Radio, Space } from "antd";
import axios from "axios";
import "./PomodoroTab.scss";
import { useAppSelector, useAppDispatch } from "../../redux/hook";
import {
  setPomodoro,
  setShortBreak,
  setLongBreak,
} from "../../redux/reducers/pomodoroReducer";
import { useCookies } from "react-cookie";

interface PomandoroTabProps {}

const PomodoroTab = ({}: PomandoroTabProps) => {
  // Cookies
  const [cookies, setCookies] = useCookies(["alert_volume", "alert_choice"]);

  const dispatch = useAppDispatch();
  const pomodoro = useAppSelector((state) => state.pomodoro.pomodoro);
  const shortBreak = useAppSelector((state) => state.pomodoro.shortBreak);
  const longBreak = useAppSelector((state) => state.pomodoro.longBreak);

  const postSetting = (
    a: number = pomodoro,
    b: number = shortBreak,
    c: number = longBreak
  ) => {
    // Round to nearest minute
    a = Math.round(a / 60);
    b = Math.round(b / 60);
    c = Math.round(c / 60);

    console.log(a, b, c);
    axios.post(`${import.meta.env.VITE_DOMAIN}/timer/`, {
        "pomodoro": a,
        "short_break": b,
        "long_break": c,
        "user": 1
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onChangePomodoroTime = (minutes: number | null) => {
    if (minutes !== null) {
      dispatch(setPomodoro(minutes * 60));
      postSetting(minutes * 60);
    }
  };

  const onChangeShortBreak = (minutes: number | null) => {
    if (minutes !== null) {
      dispatch(setShortBreak(minutes * 60));
      postSetting(undefined, minutes * 60);
    }
  };

  const onChangeLongBreak = (minutes: number | null) => {
    if (minutes !== null) {
      dispatch(setLongBreak(minutes * 60));
      postSetting(undefined, undefined, minutes * 60);
    }
  };

  const onChangeSlider = (value: number) => {
    setCookies("alert_volume", value);
  };

  const onChangeAlertChoice = (e: RadioChangeEvent) => {
    setCookies("alert_choice", e.target.value);
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
          <Slider
            value={cookies.alert_volume}
            onChange={onChangeSlider}
          />
        </div>
        <div className="mt-6 ml-1">
          <Radio.Group
            value={cookies.alert_choice}
            onChange={onChangeAlertChoice}
          >
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
