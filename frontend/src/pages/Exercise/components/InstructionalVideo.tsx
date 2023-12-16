import React from "react";
import Logo from "../../../assets/images/Icon.png";
const InstructionalVideo = () => {
  return (
    <div>
      <div className="bg-white rounded-lg border-[1px] border-[#e7e5e4] p-5">
        <h1 className="font-bold text-[rgb(28,25,23)] mb-5">Video</h1>
        <ul className="flex flex-col gap-2">
          {Array.from({ length: 2 }, (_, index) => (
            <a href={`/exercise/video/${index}`} className="pb-2" key={index}>
              <li>
                <div className="flex gap-5">
                  <img
                    src={
                      "https://i.ytimg.com/vi/dsTuF2tTxPw/hqdefault.jpg?sqp=-oaymwE2CNACELwBSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgB_gmAAtAFigIMCAAQARhrIDgocjAP&rs=AOn4CLAgNS7RON4hUlI7UXlLuU8Qk_A5Xg"
                    }
                  />
                  <div>
                    <h1 className="font-semibold text-[#1C1917]">
                      Tặng bạn phòng khám đa khoa
                    </h1>
                    <span className="text-[#78716C]">
                      Lorem ipsum dolor sit amet consectetur.
                    </span>
                  </div>
                </div>
              </li>
            </a>
          ))}
        </ul>
      </div>
      <div>abc phan trang</div>
    </div>
  );
};

export default InstructionalVideo;
