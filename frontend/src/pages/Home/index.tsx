import React, { useState } from "react";
import {
  StepForwardOutlined,
  SettingOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import TomotoIcon from "../../assets/images/tomato.png";
import "./Home.scss";
import PomodoroPopup from "../../pop-up/PomodoroPopup";

const Home = () => {
  const [isOpenPopupPomodoro, setIsOpenPopupPomodoro] = useState(false);

  const handleOpenPopupPomodoro = () => {
    setIsOpenPopupPomodoro(true);
  };

  return (
    <div className="">
      <div className="bg-[url('src/assets/images/Wallpaper.png')] bg-cover bg-no-repeat bg-center h-screen">
        <div className="pomodoro-timer absolute top-[140px] left-1/3 text-white w-[450px] h-[400px] bg-transparent">
          <div className="flex justify-between leading-8	">
            <button className="w-[120px] bg-black px-4 py-1 rounded-full border-[2px] border-red-700">
              <span>Pomodoro</span>
            </button>
            <button className="w-[120px] bg-transparent px-4 py-1 rounded-full border border-white">
              <span>Long Break </span>
            </button>
            <button className="w-[120px] bg-transparent px-4 py-1 rounded-full border border-white">
              <span>Short Break </span>
            </button>
          </div>
          <div className="mt-5 flex justify-center gap-3">
            <img src={TomotoIcon} />
            <img src={TomotoIcon} className="opacity-60" />
            <img src={TomotoIcon} className="opacity-60" />
            <img src={TomotoIcon} className="opacity-60" />
          </div>
          <div className="flex justify-center text-9xl font-semibold">
            <div className="text-9xl">25</div>
            <div className="text-9xl">:</div>
            <div className="text-9xl">00</div>
          </div>
          <div className="mt-5 flex justify-center gap-3 leading-8">
            <button className="w-[80px] bg-[#44403C] px-4 py-1 rounded-full">
              <span>Pause</span>
            </button>
            <button className="bg-white w-[40px] h-[40px] rounded-full border border-white">
              <StepForwardOutlined />
            </button>
            <button className="bg-white w-[40px] h-[40px] rounded-full border border-white">
              <SettingOutlined />
            </button>
          </div>
        </div>
        <div className="absolute bottom-3 right-10">
          <button
            className="bg-white w-[40px] h-[40px] rounded-full border border-white"
            onClick={handleOpenPopupPomodoro}
          >
            <InfoCircleOutlined />
          </button>
        </div>
      </div>
      {isOpenPopupPomodoro && <PomodoroPopup setIsOpenPopupPomodoro={setIsOpenPopupPomodoro} />}
    </div>
  );
};

export default Home;
