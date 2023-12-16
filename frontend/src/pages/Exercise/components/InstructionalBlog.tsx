import React from "react";
import Logo from "../../../assets/images/Icon.png";
import "../Exercise.scss";

const InstructionalBlog = () => {
  return (
    <div>
      <div className="bg-white rounded-lg border-[1px] border-[#e7e5e4] p-5">
        <h1 className="font-bold text-[#1C1917] mb-5">Instructional Blog</h1>
        <ul className="flex flex-col gap-4">
          {Array.from({ length: 5 }, (_, index) => (
            <a
              href={`/exercise/blog/${index}`}
              className="border-b-[1px] border-[#E7E5E4] pb-2"
              key={index}
            >
              <li>
                <div className="flex gap-5">
                  <img src={Logo} className="w-[58px]" />
                  <div>
                    <h1 className="font-semibold text-[#1C1917]">
                      Exercises to treat back pain
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
      <div className="mt-3">abc phan trang</div>
    </div>
  );
};

export default InstructionalBlog;
