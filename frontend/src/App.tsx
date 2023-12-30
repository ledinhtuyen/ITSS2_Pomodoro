import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { publicRoutes } from "./routes";
import { useAppDispatch, useAppSelector } from "./redux/hook";
import {
  Process,
  minusOneSecond,
  setIsResetFalse,
  setIsRunningFalse,
  setTimeWithProcessCorresponding,
  setToNextProcess,
  setPomodoro,
  setShortBreak,
  setLongBreak,
  setSleepReminder,
} from "./redux/reducers/pomodoroReducer";
import SoftAlert from "./assets/sounds/soft.wav";
import ChimeAlert from "./assets/sounds/chime.wav";
import { useCookies } from "react-cookie";
import { extractHourAndMinute } from "./helper/extractTime";
import dayjs from "dayjs";
import {
  setCloseWarningPopup,
  setOpenTimeUpPopup,
  setOpenWarningPopup,
} from "./redux/reducers/popupReducer";
import axios from "axios";
import { Notifications } from "react-push-notification";
import addNotification from "react-push-notification";
import Loading from "./components/Loading";
import TimeUpPopup from './pop-up/TimeUp/index';
import WarningPopup from "./pop-up/WarningPopup";
import { setLoadingFalse, setLoadingTrue } from "./redux/reducers/appReducer";
import useCustomTitle from "./hooks/useCustomTitle";

function App() {
  const dispatch = useAppDispatch();

  const isRunning = useAppSelector((state) => state.pomodoro.isRunning);
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

  const time = useAppSelector((state) => state.pomodoro.time);

  const [countOpenWarningPopup, setCountOpenWarningPopup] = useState(0);
  const isOpenWarningPopup = useAppSelector(
    (state) => state.popup.isOpenWarningPopup
  );

  const isOpenTimeUpPopup = useAppSelector(
    (state) => state.popup.isOpenTimeUpPopup
  );

  // Get Hour and Minute Now every time
  const [currentHour, setCurrentHour] = useState<number>(dayjs().hour()); // Assuming this is being updated elsewhere
  const [currentMinute, setCurrentMinute] = useState<number>(dayjs().minute()); // Assuming this is being updated elsewhere

  // Cookies
  const [cookies, setCookies] = useCookies(["alert_volume", "alert_choice"]);
  if (cookies.alert_volume === undefined) {
    setCookies("alert_volume", 50);
  }
  if (cookies.alert_choice === undefined) {
    setCookies("alert_choice", 1);
  }

  useEffect(() => {
    dispatch(setLoadingTrue());
    axios.get(`${import.meta.env.VITE_API_DOMAIN}/timer?user=1`)
      .then((res) => {
        dispatch(setPomodoro(res.data.pomodoro * 60));
        dispatch(setShortBreak(res.data.short_break * 60));
        dispatch(setLongBreak(res.data.long_break * 60));
        dispatch(setSleepReminder(res.data.sleep_time));
        dispatch(setLoadingFalse());
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Alert Sound
  const alertSound: any = [SoftAlert, ChimeAlert];
  const audioRef = useRef<HTMLAudioElement>(null);

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

  //Update Current Hour and Current Minute everytime
  useEffect(() => {
    // Update currentHour and currentMinute every minute
    const interval = setInterval(() => {
      setCurrentHour(dayjs().hour());
      setCurrentMinute(dayjs().minute());
    }, 60000); // Interval set to 1 minute (60,000 milliseconds)

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  // set Time with Process is corresponding
  useEffect(() => {
    dispatch(setTimeWithProcessCorresponding());
  }, [currentProcess, pomodoro, shortBreak, longBreak]);

  // set Next Process if time of current Process is time up
  useEffect(() => {
    let timer: any;
    if (time === 0) {
      if (cookies.alert_choice !== 3) {
        audioRef.current?.play();
      }

      timer = setTimeout(() => {
        dispatch(setToNextProcess());
      }, 1000);

      addNotification({
        title: "Push Notification",
        message: "Time out " + currentProcess + " !",
        onClick: () => {
          window.focus();
        },
        native: true, // when using native, your OS will handle theming.
      });
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
      dispatch(setOpenWarningPopup());
      setCountOpenWarningPopup(countOpenWarningPopup + 1);
    } else {
      dispatch(setCloseWarningPopup());
    }
  }, [sleepReminder, currentHour, currentMinute]);

  // Show TimeUpPopup
  useEffect(() => {
    if (time == shortBreak && currentProcess == Process.SHORT_BREAK) {
      dispatch(setOpenTimeUpPopup())
      dispatch(setIsRunningFalse())
    }
  }, [time, currentProcess, currentIteration]);

  // Update Alert Volume
  useEffect(() => {
    audioRef.current!.volume = cookies.alert_volume / 100;
  }, [cookies.alert_volume]);

  // Custom Title When Current Process and Time change
  // useCustomTitle()

  return (
    <BrowserRouter>
      <Loading />
      <Suspense fallback={<Loading />}>
        <Routes>
          {publicRoutes.map((route) => {
            if (route.layout) {
              const Layout = route.layout;
              const View = route.component;
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <Layout>
                      <View />
                    </Layout>
                  }
                />
              );
            } else {
              const View = route.component;
              return (
                <Route key={route.path} path={route.path} element={<View />} />
              );
            }
          })}
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Suspense>
      <audio ref={audioRef} src={alertSound[cookies.alert_choice - 1]}></audio>
      <Notifications />
      {isOpenWarningPopup && <WarningPopup />}
      {isOpenTimeUpPopup && <TimeUpPopup />}
    </BrowserRouter>
  );
}

export default App;
