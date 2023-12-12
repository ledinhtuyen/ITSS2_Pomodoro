import { useEffect, useState } from "react";
import {
  StepForwardOutlined,
  SettingOutlined,
  InfoCircleOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import TomotoIcon from "../../assets/images/tomato.png";
import "./Home.scss";
import PomodoroPopup from "../../pop-up/PomodoroPopup";
import SettingPopup from "../../pop-up/SettingPopup";
import axios from "axios";
import Spotify from "../../components/Spotify/Spotify";

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
  const [isOpenPomodoroPopup, setIsOpenPomodoroPopup] = useState(false);
  const [isOpenSettingPopup, setIsOpenSettingPopup] = useState(false);

  const [isRunning, setIsRunning] = useState(false);
  const [totalIteration, setTotalIteration] = useState(4);
  const [currentIteration, setCurrentIteration] = useState(1);
  const [currentProcess, setCurrentProcess] = useState<Process>(
    Process.POMODORO
  );
  const [pomodoro, setPomodoro] = useState(25 * 60);
  const [shortBreak, setShortBreak] = useState(5 * 60);
  const [longBreak, setLongBreak] = useState(30 * 60);

  // set CountDown Clock Time
  const [time, setTime] = useState<number>(pomodoro);
  const [reset, setReset] = useState(true);
  const minutes = Math.floor(time / 60);
  const remainingSeconds = time % 60;

  // Countdown time
  useEffect(() => {
    let timer: any;

    if (isRunning && time > 0) {
      timer = setInterval(() => {
        if (time > 0) {
          setTime((prevTime) => prevTime - 1);
        }
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [time, isRunning]);

  // set Time with Process is corresponding
  useEffect(() => {
    setTime(
      currentProcess === Process.POMODORO
        ? pomodoro
        : currentProcess === Process.SHORT_BREAK
        ? shortBreak
        : longBreak
    );
  }, [currentProcess, pomodoro, shortBreak, longBreak]);

  // set Next Process if time of current Process is time up
  useEffect(() => {
    if (time === 0) {
      if (currentIteration < totalIteration) {
        setTimeout(() => {
          currentProcess === Process.POMODORO
            ? setCurrentProcess(Process.SHORT_BREAK)
            : setCurrentProcess(Process.POMODORO);
          setCurrentIteration(currentIteration + 0.5);
        }, 1000);
      } else {
        setTimeout(() => {
          currentProcess === Process.POMODORO
            ? setCurrentProcess(Process.SHORT_BREAK)
            : currentProcess === Process.SHORT_BREAK
            ? setCurrentProcess(Process.LONG_BREAK)
            : null;
          setCurrentIteration(currentIteration + 0.5);
        }, 1000);
      }
    }
  }, [time, pomodoro, shortBreak, longBreak]);

  // Display Reset button to Reset Pomodoro CLock
  useEffect(() => {
    if (
      time === 0 &&
      currentProcess === Process.LONG_BREAK &&
      currentIteration === 5.5
    ) {
      // set thong bao gi do
      setIsRunning(false);
      setReset(false);
    }
  }, [time, currentProcess, currentIteration]);

  let timer: Timer;
  // Get Timer from API
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_DOMAIN}/timer/`)
      .then((res) => {
        timer = res.data;
        setPomodoro(timer.pomodoro * 60);
        setShortBreak(timer.short_break * 60);
        setLongBreak(timer.long_break * 60);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleOpenPomodoroPopup = () => {
    setIsOpenPomodoroPopup(true);
  };

  const handleStartPomodoroTimer = () => {
    setIsRunning((prev) => !prev);
  };

  const handleNextProcess = () => {
    if (currentIteration < totalIteration) {
      currentProcess === Process.POMODORO
        ? setCurrentProcess(Process.SHORT_BREAK)
        : setCurrentProcess(Process.POMODORO);
    } else {
      currentProcess === Process.POMODORO
        ? setCurrentProcess(Process.SHORT_BREAK)
        : currentProcess === Process.SHORT_BREAK
        ? setCurrentProcess(Process.LONG_BREAK)
        : null;
    }
    setIsRunning(false);
    setCurrentIteration(currentIteration + 0.5);
  };

  const handleOpenSettingPopup = () => {
    setIsOpenSettingPopup(true);
  };

  const handleReset = () => {
    setReset(true);
    setIsRunning(false);
    setCurrentIteration(1);
    setCurrentProcess(Process.POMODORO);
  };

  return (
    <div className="">
      <div className="bg-[url('src/assets/images/Wallpaper.png')] bg-cover bg-no-repeat bg-center h-screen">
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
        <div className="absolute bottom-3 right-10">
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
            width="380" />
        </div>
      </div>
      {isOpenPomodoroPopup && (
        <PomodoroPopup setIsOpenPomodoroPopup={setIsOpenPomodoroPopup} />
      )}
      {isOpenSettingPopup && (
        <SettingPopup
          setIsOpenSettingPopup={setIsOpenSettingPopup}
          pomodoro={pomodoro}
          setPomodoro={setPomodoro}
          shortBreak={shortBreak}
          setShortBreak={setShortBreak}
          longBreak={longBreak}
          setLongBreak={setLongBreak}
        />
      )}
    </div>
  );
};

export default Home;
