import React from "react";
import { Menu, MenuProps } from "antd";
import { HeartOutlined, HomeOutlined } from "@ant-design/icons";
import ExerciseIcon from "../assets/icons/ExerciseIcon";
import LogoIcon from "../assets/images/Icon.png";
import "./Layout.scss";
interface DefaultLayoutProps {
  children: React.ReactElement;
}

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label?: React.ReactNode,
  key?: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuProps["items"] = [
  getItem(
    undefined,
    undefined,
    <a href="/">
      <img src={LogoIcon} />
    </a>
  ),
  getItem("FOCUS", "1", <HomeOutlined />),
  getItem("EXERCISE", "2", <ExerciseIcon />),
  getItem("LIKES", "3", <HeartOutlined />),
];

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
  };
  return (
    <div>
      <Menu
        onClick={onClick}
        style={{ width: 89, borderRadius: 20 }}
        className="z-[100] fixed top-4 left-8 h-[95vh] !bg-[#1C1917]  "
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="dark"
        items={items}
      />
      <div className="h-screen w-screen relative top-0 left-0">{children}</div>
    </div>
  );
};

export default DefaultLayout;
