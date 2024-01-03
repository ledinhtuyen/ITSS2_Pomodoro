import React from "react";
import Draggable from "react-draggable";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  setIsRunning,
  plusFiveMinutesMore,
  handleResetPomodoro,
} from "../../redux/reducers/pomodoroReducer";
import { Pause, Play } from "@phosphor-icons/react";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

const VI = {
  Pomodoro: "Pomodoro",
  "Short Break": "Nghỉ ngắn",
  "Long Break": "Nghỉ dài",
};

const ClockDraggable: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isRunning = useAppSelector((state) => state.pomodoro.isRunning);
  const currentProcess = useAppSelector((state) => state.pomodoro.currentProcess);

  const time = useAppSelector((state) => state.pomodoro.time);
  const reset = useAppSelector((state) => state.pomodoro.reset);
  const minutes = Math.floor(time / 60);
  const remainingSeconds = time % 60;

  const handleStartPomodoroTimer = () => {
    dispatch(setIsRunning());
  };

  const handlePlusFiveMinutes = () => {
    dispatch(plusFiveMinutesMore());
  };

  const handleReset = () => {
    dispatch(handleResetPomodoro());
  };

  return (
    <Draggable>
      <div
        className={classNames(
          "fixed right-12 top-8 z-[1000] flex flex-row items-center",
          "bg-stone-800 text-stone-50 rounded-full cursor-grab p-3 pl-4 gap-2",
          window.location.pathname === "/" && "hidden"
        )}
      >
        <div className="flex flex-row items-center text-9xl font-semibold text-[28px]">
          <div>{minutes < 10 ? `0${minutes}` : minutes}</div>
          <div>:</div>
          <div>{remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}</div>
        </div>

        <div
          className="border border-red-500 text-[12px] py-[6px] px-[12px] rounded-full font-semibold"
          onClick={() => navigate("/")}
        >
          {VI[currentProcess]}
        </div>

        {reset === true ? (
          <button
            className="rounded-full h-8 w-8 flex items-center justify-center bg-stone-50 text-stone-900"
            onClick={handleStartPomodoroTimer}
          >
            {isRunning ? <Pause size={20} /> : <Play size={20} />}
          </button>
        ) : (
          <button
            className="rounded-full h-8 w-8 flex items-center justify-center bg-stone-50 text-stone-900"
            onClick={handleReset}
          >
            Bắt đầu lại
          </button>
        )}

        <button
          className="rounded-full h-8 w-8 flex items-center justify-center bg-stone-50 text-stone-900 text-[14px] font-semibold"
          onClick={handlePlusFiveMinutes}
        >
          +5
        </button>
      </div>
    </Draggable>
  );
};

export default ClockDraggable;
