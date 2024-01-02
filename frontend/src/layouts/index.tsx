import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, NavLink } from "react-router-dom";

import LogoIcon from "../assets/images/Icon.png";
import ClockDraggable from "../components/ClockDraggable";

import "./Layout.scss";
import { Barbell, Heart, House } from "@phosphor-icons/react";

interface DefaultLayoutProps {
  children: React.ReactElement;
}

const items = [
  {
    label: "FOCUS",
    key: "1",
    href: "/",
    icon: <House />,
  },
  {
    label: "EXERCISE",
    key: "2",
    href: "exercises",
    icon: <Barbell />,
  },
  {
    label: "LIKES",
    key: "3",
    href: "likes",
    icon: <Heart />,
  },
];

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [currentPage, setCurrentPage] = useState<any>(() => {
    if (location.pathname === "/") {
      return "1";
    } else if (location.pathname.includes("/exercise")) {
      return "2";
    } else if (location.pathname === "/likes") {
      return "3";
    } else {
      return "1";
    }
  });

  // set Current Page when URL change
  useEffect(() => {
    if (location.pathname === "/") {
      setCurrentPage("1");
    } else if (location.pathname.includes("/exercise")) {
      setCurrentPage("2");
    } else if (location.pathname === "/likes") {
      setCurrentPage("3");
    } else {
      setCurrentPage("1");
    }
  }, [location.pathname]);

  const onClick = (e) => {
    setCurrentPage(e.key);
  };

  // Navigate URL when currentPage state change
  useEffect(() => {
    if (currentPage === "1" || currentPage === "0") {
      navigate("/");
    } else if (currentPage === "2") {
      if (location.search) {
        navigate(location.pathname + location.search);
      } else {
        if (location.pathname.length > 9) {
          navigate(location.pathname);
        } else {
          navigate("/exercise");
        }
      }
    } else if (currentPage === "3") {
      navigate("/likes");
    }
  }, [currentPage]);

  return (
    <>
      <div onClick={onClick} className="z-[100] fixed top-0 left-0 p-6 pt-8 h-screen">
        <div className="rounded-2xl bg-stone-900 p-2 pt-3 flex flex-col gap-4 h-full">
          <NavLink to="/">
            <div className="h-14 w-14">
              <img src={LogoIcon} />
            </div>
          </NavLink>

          <nav className="flex flex-col gap-2">
            {items.map(({ key, icon, label, href }) => (
              <NavLink
                key={key}
                to={href}
                className="flex flex-col gap-1 text-stone-500 justify-center items-center h-14 w-14"
              >
                <div className="text-2xl">{icon}</div>
                <span className="text-[10px]">{label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      <div className="h-full w-full relative top-0 left-0">{children}</div>
      {currentPage !== "1" && currentPage !== "0" && (
        <ClockDraggable setCurrentPage={setCurrentPage} currentPage={currentPage} />
      )}
    </>
  );
};

export default DefaultLayout;
