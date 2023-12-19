import React from "react";
import { CloseOutlined } from "@ant-design/icons";
import { useAppDispatch } from "../../redux/hook";
import { setCloseTimeUpPopup } from "../../redux/reducers/popupReducer";
import timeUpImage from "../../assets/images/TimeUp.png";
import greyBackGround from "../../assets/images/GreyBackground.png";
import { useNavigate } from "react-router-dom";

const TimeUpPopup = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleCloseTimUpPopup = () => {
    dispatch(setCloseTimeUpPopup());
  };

  return (
    <div className="w-screen h-screen fixed inset-0 bg-[rgba(0,0,0,0.5)] z-[101]">
      <div className="bg-[#FAFAF9] rounded-3xl relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-cover bg-no-repeat bg-center w-[884px] h-[650px]">
        <button
          className="absolute top-2 right-5 bg-[#DDDDE3] w-[40px] h-[40px] rounded-full border border-white"
          onClick={handleCloseTimUpPopup}
        >
          <CloseOutlined />
        </button>
        <div className="px-5">
          <h1 className="font-semibold text-[36px] text-center">Time Up</h1>
          <img src={timeUpImage} className="block mx-auto" />
          <div className="flex items-end justify-between mb-3">
            <h1 className="font-semibold text-[20px]">
              Try these exercises while in break
            </h1>
            <a className="font-semibold text-[14px]" href="exercise">
              See more
            </a>
          </div>
          <div className="grid grid-cols-4 gap-x-4 gap-y-2">
            {Array.from({ length: 8 }, (item, index) => (
              <div className="" key={index}>
                <img src={greyBackGround} className="w-full" />
                <h1 className="font-semibold">Relax Eyes Excercise</h1>
                <div className="flex justify-between text-[14px] text-[#78716C]">
                  <span>5 mins</span>
                  <span>107 likes</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeUpPopup;
