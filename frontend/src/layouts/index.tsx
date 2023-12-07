import React from "react";
import Header from "./Header";
import Footer from "./Footer";

interface DefaultLayoutProps {
  children: React.ReactElement;
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return <div>default</div>;
};

export default DefaultLayout;
