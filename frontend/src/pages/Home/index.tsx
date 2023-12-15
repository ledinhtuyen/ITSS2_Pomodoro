import { useState, useRef } from "react";
import {
  StepForwardOutlined,
  SettingOutlined,
  InfoCircleOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import TomotoIcon from "../../assets/images/tomato.png";
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

const Home = () => {
  const dispatch = useAppDispatch();

  const [isOpenPomodoroPopup, setIsOpenPomodoroPopup] = useState(false);
  const [isOpenSettingPopup, setIsOpenSettingPopup] = useState(false);

  const isRunning = useAppSelector((state) => state.pomodoro.isRunning);
  const totalIteration = useAppSelector(
    (state) => state.pomodoro.totalIteration
  );
  const currentIteration = useAppSelector(
    (state) => state.pomodoro.currentIteration
  );
  const currentProcess = useAppSelector(
    (state) => state.pomodoro.currentProcess
  );

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
  };

  const handleOpenSettingPopup = () => {
    setIsOpenSettingPopup(true);
  };

  const handleReset = () => {
    dispatch(handleResetPomodoro());
  };

  return (
    <div className="">
      <div
        style={{ backgroundImage: `url(${BackgroundImg})` }}
        className="bg-cover bg-no-repeat bg-center h-screen"
      ></div>
      <div className="bg-[rgba(0,0,0,0.6)] h-screen w-screen fixed top-0 left-0">
        <div className="pomodoro-timer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white w-[450px] h-[400px] bg-transparent">
          <div className="flex justify-between leading-8	">
            <button
              className={
                currentProcess === Process.POMODORO
                  ? "w-[120px] bg-black px-4 py-1 rounded-full border-[2px] border-red-700 cursor-default"
                  : "w-[120px] bg-transparent px-4 py-1 rounded-full border border-white cursor-default"
              }
            >
              <span>{Process.POMODORO}</span>
            </button>
            <button
              className={
                currentProcess === Process.SHORT_BREAK
                  ? "w-[120px] bg-black px-4 py-1 rounded-full border-[2px] border-red-700 cursor-default"
                  : "w-[120px] bg-transparent px-4 py-1 rounded-full border border-white cursor-default"
              }
            >
              <span>{Process.SHORT_BREAK}</span>
            </button>
            <button
              className={
                currentProcess === Process.LONG_BREAK
                  ? "w-[120px] bg-black px-4 py-1 rounded-full border-[2px] border-red-700 cursor-default"
                  : "w-[120px] bg-transparent px-4 py-1 rounded-full border border-white cursor-default"
              }
            >
              <span>{Process.LONG_BREAK}</span>
            </button>
          </div>
          <div className="mt-5 flex justify-center gap-3">
            {Array.from({ length: totalIteration }).map((_i, index) => (
              <img
                key={index}
                src={TomotoIcon}
                alt={`Tomato ${index + 1}`}
                className={index + 1 > currentIteration ? "opacity-50" : ""}
              />
            ))}
          </div>
          <div className="flex justify-center text-9xl font-semibold">
            <div className="text-9xl">
              {minutes < 10 ? `0${minutes}` : minutes}
            </div>
            <div className="text-9xl">:</div>
            <div className="text-9xl">
              {remainingSeconds < 10
                ? `0${remainingSeconds}`
                : remainingSeconds}
            </div>
          </div>
          <div className="mt-5 flex justify-center gap-3 leading-8">
            <button
              className={
                reset === false
                  ? "bg-white w-[40px] h-[40px] rounded-full border border-white"
                  : "hidden"
              }
              onClick={handleReset}
            >
              <RedoOutlined spin />
            </button>
            <button
              className={
                reset === true
                  ? `w-[80px] bg-[#44403C] px-4 py-1 rounded-full`
                  : "hidden"
              }
              onClick={handleStartPomodoroTimer}
            >
              <span>{isRunning ? "Pause" : "Start"}</span>
            </button>
            <button
              className="bg-white w-[40px] h-[40px] rounded-full border border-white"
              onClick={handleNextProcess}
            >
              <StepForwardOutlined />
            </button>
            <button
              className="bg-white w-[40px] h-[40px] rounded-full border border-white"
              onClick={handleOpenSettingPopup}
            >
              <SettingOutlined spin />
            </button>
          </div>
        </div>
        <div className="absolute bottom-14 right-10">
          <button
            className="bg-white w-[40px] h-[40px] rounded-full border border-white"
            onClick={handleOpenPomodoroPopup}
          >
            <InfoCircleOutlined />
          </button>
        </div>

        <div className="absolute bottom-14 left-36">
          <Spotify
            key={""}
            url={`${import.meta.env.VITE_SPOTIFY_MUSIC_URL}`}
            height="compact"
            width="380"
          />
        </div>
      </div>
      {isOpenPomodoroPopup && (
        <PomodoroPopup setIsOpenPomodoroPopup={setIsOpenPomodoroPopup} />
      )}
      {/* {isOpenSettingPopup && (
        <SettingPopup
          setIsOpenSettingPopup={setIsOpenSettingPopup}
          cookies={cookies}
          setCookies={setCookies}
        />
      )} */}
    </div>
  );
};

export default Home;
