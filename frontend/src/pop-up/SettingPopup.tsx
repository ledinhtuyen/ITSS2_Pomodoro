import React from "react";

interface SettingPopupProps {
  setIsOpenPomodoroPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const SettingPopup = ({ setIsOpenPomodoroPopup }: SettingPopupProps) => {
  return (
    <div className="w-screen h-screen fixed inset-0 bg-[rgba(0,0,0,0.5)] z-[102]">
      SettingPopup
    </div>
  );
};

export default SettingPopup;
