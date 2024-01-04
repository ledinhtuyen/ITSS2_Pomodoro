import { Dialog, Transition } from "@headlessui/react";
import { X } from "@phosphor-icons/react";
import { Menu, MenuProps } from "antd";
import React, { Fragment, useState } from "react";
import PomodoroTab from "./PomodoroTab";
import ReminderTab from "./ReminderTab";
import "./SettingPopup.scss";

interface SettingPopupProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

type MenuItem = Required<MenuProps>["items"][number];

function getItem(label: React.ReactNode, key: React.Key): MenuItem {
  return {
    label,
    key,
  } as MenuItem;
}

const items: MenuProps["items"] = [getItem("Quản lý thời gian", "1"), getItem("Cảnh báo", "2")];

const SettingPopup = ({ isOpen, setIsOpen }: SettingPopupProps) => {
  const [currentTab, setCurrentTab] = useState("1");

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrentTab(e.key);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[1000]" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-stone-900 p-4 text-left align-middle shadow-xl transition-all flex flex-col items-center gap-4 min-h-[75vh]">
                <button
                  className="absolute top-4 left-4 bg-stone-800 w-10 h-10 rounded-full flex items-center justify-center hover:bg-stone-700 transition"
                  onClick={handleClose}
                >
                  <X className="text-stone-400" weight="bold" size={20} />
                </button>

                <div className="w-full h-full grid grid-cols-12 mt-12">
                  <div className="col-span-3 border-r border-[#292524] relative pr-2">
                    <Menu
                      onClick={onClick}
                      className="setting-menu w-full !bg-[#1C1917]"
                      selectedKeys={[currentTab]}
                      mode="inline"
                      theme="dark"
                      items={items}
                    />
                  </div>
                  <div className="col-span-9 pb-4">
                    {currentTab === "1" && <PomodoroTab />}
                    {currentTab === "2" && <ReminderTab />}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SettingPopup;
