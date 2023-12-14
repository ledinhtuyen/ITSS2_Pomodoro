import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { publicRoutes } from "./routes";
import { useAppDispatch } from "./redux/hook";
import { useEffect } from "react";
import axios from "axios";
import { setLongBreak, setPomodoro, setShortBreak, setSleepReminder } from "./redux/reducers/pomodoroReducer";

interface Timer {
  pomodoro: number;
  short_break: number;
  long_break: number;
  sleep_reminder: string;
}

function App() {
  const dispatch = useAppDispatch();

  let timer: Timer;
  // Get Timer from API
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_DOMAIN}/timer/?user=1`)
      .then((res) => {
        timer = res.data;
        dispatch(setPomodoro(timer.pomodoro * 60));
        dispatch(setShortBreak(timer.short_break * 60));
        dispatch(setLongBreak(timer.long_break * 60));
        dispatch(setSleepReminder(timer.sleep_reminder));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
