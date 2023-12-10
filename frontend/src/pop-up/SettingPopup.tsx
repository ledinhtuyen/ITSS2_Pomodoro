import React, { useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import "./SettingPopup.scss";

interface SettingPopupProps {
  setIsOpenSettingPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

type MenuItem = Required<MenuProps>["items"][number];

function getItem(label: React.ReactNode, key: React.Key): MenuItem {
  return {
    label,
    key,
  } as MenuItem;
}

const items: MenuProps["items"] = [
  getItem("Pomodoro Timer", "1"),
  getItem("Reminders", "2"),
];

const SettingPopup = ({ setIsOpenSettingPopup }: SettingPopupProps) => {
  const [currentTab, setCurrentTab] = useState("1");

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrentTab(e.key);
  };

  const handleCloseSettingPopup = () => {
    setIsOpenSettingPopup(false);
  };

  return (
    <div className="w-screen h-screen fixed inset-0 bg-[rgba(0,0,0,0.5)] z-[102]">
      <div className="bg-[#1C1917] rounded-3xl relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px]">
        <button
          className="absolute top-2 left-2 bg-[#292524] w-[40px] h-[40px] rounded-full"
          onClick={handleCloseSettingPopup}
        >
          <CloseOutlined className="text-white" />
        </button>
        <div className="w-full h-full mt-14 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="grid grid-cols-12 px-4">
            <div className="col-span-3 border-r border-[#292524] pr-3">
              <Menu
                onClick={onClick}
                className="setting-menu w-min !bg-[#1C1917] relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                selectedKeys={[currentTab]}
                mode="inline"
                theme="dark"
                items={items}
              />
            </div>
            <div className="col-span-9">
              {currentTab === "1" && (
                <div className="col-span-9">Pomandoro Tab</div>
              )}
              {currentTab === "2" && (
                <div className="col-span-9">Reminder Tab</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingPopup;
