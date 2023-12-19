import React from "react";
import Draggable from "react-draggable";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  setIsRunning,
  plusFiveMinutesMore,
  handleResetPomodoro,
} from "../../redux/reducers/pomodoroReducer";

interface ClockDraggableProps {
  setCurrentPage: any;
  currentPage: any;
}

const ClockDraggable = ({
  setCurrentPage,
  currentPage,
}: ClockDraggableProps) => {
  const dispatch = useAppDispatch();

  const isRunning = useAppSelector((state) => state.pomodoro.isRunning);
  const currentProcess = useAppSelector(
    (state) => state.pomodoro.currentProcess
  );

  const time = useAppSelector((state) => state.pomodoro.time);
  const reset = useAppSelector((state) => state.pomodoro.reset);
  const minutes = Math.floor(time / 60);
  const remainingSeconds = time % 60;

  const navigateHomePage = () => {
    setCurrentPage("1");
  };

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
        className={
          "fixed right-6 top-6 bg-white w-[240px] h-[150px] rounded-2xl border-solid border-black border-[1px] z-[1000]"
        }
      >
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 rounded-xl border-black border-[1px] w-[100px] h-[100px]">
          <button
            className={
              "absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80px] rounded-3xl border-[1px] border-black cursor-default leading-[16px] py-1"
            }
          >
            <span className="text-xs">{currentProcess}</span>
          </button>
          <div className="absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="flex justify-center text-9xl font-semibold">
              <div className="text-[28px]">
                {minutes < 10 ? `0${minutes}` : minutes}
              </div>
              <div className="text-[28px]">:</div>
              <div className="text-[28px]">
                {remainingSeconds < 10
                  ? `0${remainingSeconds}`
                  : remainingSeconds}
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2  w-[100px] h-[100px] flex flex-col justify-between">
          <button
            className="rounded-3xl leading-6 bg-red-500"
            onClick={navigateHomePage}
          >
            <span className="text-[12px] text-white">Back to Focus</span>
          </button>
          <button
            className={
              reset == true
                ? "rounded-3xl border-[1px] border-black leading-6"
                : "hidden"
            }
            onClick={handleStartPomodoroTimer}
          >
            <span className="text-[12px]">
              <span>{isRunning ? "Pause" : "Start"}</span>
            </span>
          </button>
          <button
            className={
              reset == false
                ? "rounded-3xl border-[1px] border-black leading-6"
                : "hidden"
            }
            onClick={handleReset}
          >
            <span className="text-[12px]">
              <span>Reset</span>
            </span>
          </button>
          <button
            className="rounded-3xl border-[1px] border-black leading-6"
            onClick={handlePlusFiveMinutes}
          >
            <span className="text-[12px]">+5 mins more</span>
          </button>
        </div>
      </div>
    </Draggable>
  );
};

export default ClockDraggable;
