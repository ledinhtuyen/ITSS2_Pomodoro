import { useEffect, useState, useRef } from "react";
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
import axios from "axios";
import Spotify from "../../components/Spotify/Spotify";
import { extractHourAndMinute } from "../../helper/extractTime";
import WarningPopup from "../../pop-up/WarningPopup";
import dayjs from "dayjs";
import { useCookies } from "react-cookie";
import SoftAlert from "../../assets/sounds/soft.wav";
import ChimeAlert from "../../assets/sounds/chime.wav";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  handleResetPomodoro,
  minusOneSecond,
  setIsResetFalse,
  setIsRunning,
  setIsRunningFalse,
  setTimeWithProcessCorresponding,
  setToNextProcess,
} from "../../redux/reducers/pomodoroReducer";

enum Process {
  POMODORO = "Pomodoro",
  LONG_BREAK = "Long Break",
  SHORT_BREAK = "Short Break",
}

interface Timer {
  id: number;
  pomodoro: number;
  short_break: number;
  long_break: number;
  sleep_time: string;
  user: number;
}

const Home = () => {
  const dispatch = useAppDispatch();

  const [isOpenPomodoroPopup, setIsOpenPomodoroPopup] = useState(false);
  const [isOpenSettingPopup, setIsOpenSettingPopup] = useState(false);
  const [isOpenWarningPopup, setIsOpenWarningPopup] = useState(false);
  const [countOpenWarningPopup, setCountOpenWarningPopup] = useState(0);

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
  const pomodoro = useAppSelector((state) => state.pomodoro.pomodoro);
  const shortBreak = useAppSelector((state) => state.pomodoro.shortBreak);
  const longBreak = useAppSelector((state) => state.pomodoro.longBreak);
  const sleepReminder = useAppSelector((state) => state.pomodoro.sleepReminder);

  // Cookies
  const [cookies, setCookies] = useCookies(["alert_volume", "alert_choice"]);
  if (cookies.alert_volume === undefined) {
    setCookies("alert_volume", 50);
  }
  if (cookies.alert_choice === undefined) {
    setCookies("alert_choice", 1);
  }

  // Alert Sound
  const alertSound: any = [SoftAlert, ChimeAlert];
  const audioRef = useRef<HTMLAudioElement>(null);

  // Get Hour and Minute Now every time
  const [currentHour, setCurrentHour] = useState<number>(dayjs().hour()); // Assuming this is being updated elsewhere
  const [currentMinute, setCurrentMinute] = useState<number>(dayjs().minute()); // Assuming this is being updated elsewhere

  // set CountDown Clock Time
  const time = useAppSelector((state) => state.pomodoro.time);
  const reset = useAppSelector((state) => state.pomodoro.reset);
  const minutes = Math.floor(time / 60);
  const remainingSeconds = time % 60;

  // Countdown time
  useEffect(() => {
    let timer: any;

    if (isRunning && time > 0) {
      timer = setInterval(() => {
        if (time > 0) {
          dispatch(minusOneSecond());
        }
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [time, isRunning]);

  // set Time with Process is corresponding
  useEffect(() => {
    dispatch(setTimeWithProcessCorresponding());
  }, [currentProcess, pomodoro, shortBreak, longBreak]);

  // set Next Process if time of current Process is time up
  useEffect(() => {
    let timer: any;
    if (time === 0) {
      if (cookies.alert_choice !== 3) audioRef.current?.play();
      timer = setTimeout(() => {
        dispatch(setToNextProcess());
      }, 1000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [time, pomodoro, shortBreak, longBreak]);

  // Display Reset button to Reset Pomodoro CLock
  useEffect(() => {
    if (
      time === 0 &&
      currentProcess === Process.LONG_BREAK &&
      currentIteration > 5
    ) {
      dispatch(setIsRunningFalse());
      dispatch(setIsResetFalse());
    }
  }, [time, currentProcess, currentIteration]);

  // Show WarningPopup
  useEffect(() => {
    const { hour: sleepHour, minute: sleepMinute } =
      extractHourAndMinute(sleepReminder);

    let currentTime = currentHour * 60 + currentMinute;
    let sleepTime = sleepHour * 60 + sleepMinute;
    let extraTime = countOpenWarningPopup * 15;

    if (sleepTime + extraTime <= currentTime) {
      if (cookies.alert_choice !== 3) audioRef.current?.play();
      setIsOpenWarningPopup(true);
      setCountOpenWarningPopup(countOpenWarningPopup + 1);
    } else {
      setIsOpenWarningPopup(false);
    }
  }, [sleepReminder, currentHour, currentMinute]);

  //Update Current Hour and Current Minute everytime
  useEffect(() => {
    // Update currentHour and currentMinute every minute
    const interval = setInterval(() => {
      setCurrentHour(dayjs().hour());
      setCurrentMinute(dayjs().minute());
    }, 60000); // Interval set to 1 minute (60,000 milliseconds)

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  // Update Alert Volume
  useEffect(() => {
    audioRef.current!.volume = cookies.alert_volume / 100;
  }, [cookies.alert_volume]);

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
      <audio ref={audioRef} src={alertSound[cookies.alert_choice - 1]}></audio>
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
      {isOpenSettingPopup && (
        <SettingPopup
          setIsOpenSettingPopup={setIsOpenSettingPopup}
          cookies={cookies}
          setCookies={setCookies}
        />
      )}
      {isOpenWarningPopup && (
        <WarningPopup setIsOpenWarningPopup={setIsOpenWarningPopup} />
      )}
    </div>
  );
};

export default Home;
