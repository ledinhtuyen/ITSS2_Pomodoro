import React, { lazy, useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import "./SettingPopup.scss";
import PomodoroTab from "./PomodoroTab";
import ReminderTab from "./ReminderTab";

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

const items: MenuProps["items"] = [getItem("Quản lý thời gian", "1"), getItem("Cảnh báo", "2")];

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
        <div className="w-full h-[calc(100%-64px)] absolute top-16">
          <div className="grid grid-cols-12 px-4 ">
            <div className="col-span-3 border-r border-[#292524] pr-3 relative">
              <Menu
                onClick={onClick}
                className="setting-menu w-min !bg-[#1C1917] absolute top-11 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                selectedKeys={[currentTab]}
                mode="inline"
                theme="dark"
                items={items}
              />
            </div>
            <div className="col-span-9">
              {currentTab === "1" && <PomodoroTab />}
              {currentTab === "2" && <ReminderTab />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingPopup;
