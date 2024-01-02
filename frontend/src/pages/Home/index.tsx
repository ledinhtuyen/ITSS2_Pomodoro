import { useState } from "react";
import {
  StepForwardOutlined,
  SettingOutlined,
  InfoCircleOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import BackgroundImg from "../../assets/images/Wallpaper.png";
import "./Home.scss";
import PomodoroPopup from "../../pop-up/PomodoroPopup";
import SettingPopup from "../../pop-up/SettingPopup";
import Spotify from "../../components/Spotify/Spotify";

import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  Process,
  handleResetPomodoro,
  setIsRunning,
  setIsRunningFalse,
  setToNextProcess,
} from "../../redux/reducers/pomodoroReducer";
import addNotification from "react-push-notification";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";
import { ArrowCounterClockwise, GearSix, SkipForward } from "@phosphor-icons/react";

const Home = () => {
  const dispatch = useAppDispatch();

  const [isOpenPomodoroPopup, setIsOpenPomodoroPopup] = useState(false);
  const [isOpenSettingPopup, setIsOpenSettingPopup] = useState(false);

  const isRunning = useAppSelector((state) => state.pomodoro.isRunning);
  const totalIteration = useAppSelector((state) => state.pomodoro.totalIteration);
  const currentIteration = useAppSelector((state) => state.pomodoro.currentIteration);
  const currentProcess = useAppSelector((state) => state.pomodoro.currentProcess);

  // set CountDown Clock Time
  const time = useAppSelector((state) => state.pomodoro.time);
  const reset = useAppSelector((state) => state.pomodoro.reset);
  const minutes = Math.floor(time / 60);
  const remainingSeconds = time % 60;

  const handleOpenPomodoroPopup = () => {
    setIsOpenPomodoroPopup(true);
  };

  const handleStartPomodoroTimer = () => {
    dispatch(setIsRunning());
  };

  const handleNextProcess = () => {
    dispatch(setToNextProcess());
    dispatch(setIsRunningFalse());

    addNotification({
      title: "Time up!",
      message: `You have finished ${currentIteration} pomodoro!`,
      onClick: () => {
        window.parent.focus();
      },
      native: true, // when using native, your OS will handle theming.
    });
  };

  const handleOpenSettingPopup = () => {
    setIsOpenSettingPopup(true);
  };

  const handleReset = () => {
    dispatch(handleResetPomodoro());
  };

  return (
    <>
      <div
        style={{ backgroundImage: `url(${BackgroundImg})` }}
        className="bg-cover bg-no-repeat bg-center h-screen"
      ></div>
      <div className="bg-[rgba(0,0,0,0.6)] h-screen w-screen fixed top-0 left-0">
        <div className="pomodoro-timer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white w-[450px] h-[400px] bg-transparent flex flex-col justify-center items-center">
          <div className="flex gap-3">
            {[Process.POMODORO, Process.SHORT_BREAK, Process.LONG_BREAK].map((process, index) => (
              <div
                key={index}
                className={twMerge(
                  "grow px-4 py-1 rounded-full border border-white select-none bg-transparent flex justify-center items-center",
                  currentProcess === process && "bg-black border-[2px] border-red-700"
                )}
              >
                {process}
              </div>
            ))}
          </div>

          <div className="mt-5 flex justify-center gap-3">
            {Array.from({ length: totalIteration }).map((_, index) => (
              <span
                className={classNames("text-4xl", index + 1 > currentIteration && "opacity-50")}
                key={index}
              >
                🍅
              </span>
            ))}
          </div>
          <div className="flex justify-center text-9xl font-semibold">
            <div className="text-9xl">{minutes < 10 ? `0${minutes}` : minutes}</div>
            <div className="text-9xl">:</div>
            <div className="text-9xl">
              {remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}
            </div>
          </div>
          <div className="mt-5 flex justify-center gap-3 leading-8">
            {reset === false && (
              <button
                className="bg-stone-50 w-10 h-10 rounded-full flex justify-center items-center text-stone-900"
                onClick={handleReset}
              >
                <ArrowCounterClockwise size={24} />
              </button>
            )}
            {reset !== false && (
              <button
                className="w-[80px] bg-[#44403C] px-4 py-1 rounded-full"
                onClick={handleStartPomodoroTimer}
              >
                {isRunning ? "Pause" : "Start"}
              </button>
            )}
            <button
              className="bg-stone-50 w-10 h-10 rounded-full flex justify-center items-center text-stone-900"
              onClick={handleNextProcess}
            >
              <SkipForward size={24} />
            </button>
            <button
              className="bg-stone-50 w-10 h-10 rounded-full flex justify-center items-center text-stone-900"
              onClick={handleOpenSettingPopup}
            >
              <GearSix size={24} />
            </button>
          </div>
        </div>
        <div className="absolute bottom-14 right-10">
          <button
            className="bg-stone-50 w-10 h-10 rounded-full flex justify-center items-center text-stone-900"
            onClick={handleOpenPomodoroPopup}
          >
            <InfoCircleOutlined />
          </button>
        </div>

        {/* <div className="absolute bottom-14 left-36">
          <Spotify url={`${import.meta.env.VITE_SPOTIFY_MUSIC_URL}`} height="compact" width="380" />
        </div> */}
      </div>
      {isOpenPomodoroPopup && <PomodoroPopup setIsOpenPomodoroPopup={setIsOpenPomodoroPopup} />}
      {isOpenSettingPopup && <SettingPopup setIsOpenSettingPopup={setIsOpenSettingPopup} />}
    </>
  );
};

export default Home;
