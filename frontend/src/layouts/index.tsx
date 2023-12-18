import React, { useEffect, useState } from "react";
import { Menu, MenuProps } from "antd";
import { HeartOutlined, HomeOutlined } from "@ant-design/icons";
import ExerciseIcon from "../assets/icons/ExerciseIcon";
import LogoIcon from "../assets/images/Icon.png";
import { useNavigate, useLocation } from "react-router-dom";
import "./Layout.scss";
import ClockDraggable from "../components/ClockDraggable";

interface DefaultLayoutProps {
  children: React.ReactElement;
}

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label?: React.ReactNode,
  key?: React.Key,
  icon?: React.ReactNode
): MenuItem {
  return {
    label,
    key,
    icon,
  } as MenuItem;
}

const items: MenuProps["items"] = [
  getItem(undefined, "0", <img src={LogoIcon} />),
  getItem("FOCUS", "1", <HomeOutlined />),
  getItem("EXERCISE", "2", <ExerciseIcon />),
  getItem("LIKES", "3", <HeartOutlined />),
];

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [currentPage, setCurrentPage] = useState(() =>
    location.pathname == "/"
      ? "1"
      : location.pathname.includes("/exercise")
        ? "2"
        : "3"
  );


  const onClick: MenuProps["onClick"] = (e) => {
    setCurrentPage(e.key);
  };

  // Navigate URL when currentPage state change
  useEffect(() => {
    if (currentPage === "1" || currentPage === "0") {
      navigate("/")
    }
    else if (currentPage === "2") {
      location.pathname.length > 9 ? navigate(location.pathname) : navigate("/exercise")
    }
    else {
      navigate("/likes")
    }
  }, [currentPage]);

  console.log(currentPage);

  return (
    <div>
      <Menu
        onClick={onClick}
        className="sidebar-menu w-[89px] rounded-3xl z-[100] fixed top-4 left-8 h-[95vh] !bg-[#1C1917]  "
        selectedKeys={[currentPage]}
        mode="inline"
        theme="dark"
        items={items}
      />
      <div className="h-screen w-screen relative top-0 left-0">{children}</div>
      {currentPage !== "1" && currentPage !== "0" && (
        <ClockDraggable
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      )}
    </div>
  );
};

export default DefaultLayout;
