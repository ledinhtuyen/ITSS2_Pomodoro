import React from "react";
import { NavLink, Outlet } from "react-router-dom";

import LogoIcon from "../assets/images/Icon.png";
import ClockDraggable from "../components/ClockDraggable";

import { Barbell, Heart, House } from "@phosphor-icons/react";
import { twMerge } from "tailwind-merge";

interface DefaultLayoutProps {
  children?: React.ReactElement;
}

const NAV_ITEMS = [
  {
    label: "Làm việc",
    key: "1",
    href: "/",
    icon: <House />,
    activeIcon: <House weight="fill" />,
  },
  {
    label: "Bài tập",
    key: "2",
    href: "exercise",
    icon: <Barbell />,
    activeIcon: <Barbell weight="fill" />,
  },
  {
    label: "Thích",
    key: "3",
    href: "likes",
    icon: <Heart />,
    activeIcon: <Heart weight="fill" />,
  },
];

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <>
      <div className="z-[100] fixed top-0 left-0 p-6 pt-8 h-screen">
        <div className="rounded-3xl bg-stone-900 p-3 flex flex-col gap-4 h-full">
          <NavLink to="/">
            <div className="h-[72px] w-[72px]">
              <img src={LogoIcon} />
            </div>
          </NavLink>

          <nav className="flex flex-col gap-2">
            {NAV_ITEMS.map(({ key, activeIcon, icon, label, href }) => (
              <NavLink
                key={key}
                to={href}
                className={({ isActive }) =>
                  twMerge(
                    "flex flex-col gap-1 text-stone-500 justify-center items-center h-[72px] w-[72px] rounded-lg",
                    isActive && "bg-stone-800 text-stone-200"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="text-2xl">{isActive ? activeIcon : icon}</div>
                    <span className="font-semibold uppercase text-xs text-center">{label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      <div className="h-full w-full relative">{children ?? <Outlet />}</div>

      <ClockDraggable />
    </>
  );
};

export default DefaultLayout;
