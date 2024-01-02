import React from "react";
import Draggable from "react-draggable";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  setIsRunning,
  plusFiveMinutesMore,
  handleResetPomodoro,
} from "../../redux/reducers/pomodoroReducer";
import { Pause, SkipForward } from "@phosphor-icons/react";

interface ClockDraggableProps {
  setCurrentPage: any;
  currentPage: any;
}

const ClockDraggable = ({ setCurrentPage }: ClockDraggableProps) => {
  const dispatch = useAppDispatch();

  const isRunning = useAppSelector((state) => state.pomodoro.isRunning);
  const currentProcess = useAppSelector((state) => state.pomodoro.currentProcess);

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
          "fixed right-6 top-6 bg-stone-800 text-stone-50 rounded-full flex flex-row z-[1000] items-center cursor-grab p-3 pl-4 gap-3"
        }
      >
        <div className="flex flex-row items-center text-9xl font-semibold text-[28px]">
          <div>{minutes < 10 ? `0${minutes}` : minutes}</div>
          <div>:</div>
          <div>{remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}</div>
        </div>

        <span className="border border-red-500 text-[12px] py-[6px] px-[12px] rounded-full font-semibold">
          {currentProcess}
        </span>

        {reset === true ? (
          <button
            className="rounded-full h-8 w-8 flex items-center justify-center bg-stone-50 text-stone-900"
            onClick={handleStartPomodoroTimer}
          >
            {isRunning ? <Pause size={20} /> : <SkipForward size={20} />}
          </button>
        ) : (
          <button className="" onClick={handleReset}>
            Reset
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
