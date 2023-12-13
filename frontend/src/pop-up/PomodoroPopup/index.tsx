import React from "react";
import { CloseOutlined } from "@ant-design/icons";

interface PomodoroPopupProps {
  setIsOpenPomodoroPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const PomodoroPopup = ({ setIsOpenPomodoroPopup }: PomodoroPopupProps) => {
  const handleClosePomodoroPopup = () => {
    setIsOpenPomodoroPopup(false);
  };

  return (
    <div className="w-screen h-screen fixed inset-0 bg-[rgba(0,0,0,0.5)] z-[102]">
      <div className="relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[url('src/assets/images/pomodoroPopup.png')] bg-cover bg-no-repeat bg-center w-[800px] h-[650px]">
        <button
          className="absolute top-4 right-2 bg-[#DDDDE3] w-[40px] h-[40px] rounded-full border border-white"
          onClick={handleClosePomodoroPopup}
        >
          <CloseOutlined />
        </button>
        <button
          className="absolute bottom-8 left-[50%] transform -translate-x-1/2 bg-black rounded-full text-white px-6 py-2"
          onClick={handleClosePomodoroPopup}
        >
          Ok, I got it !
        </button>
      </div>
    </div>
  );
};

export default PomodoroPopup;
