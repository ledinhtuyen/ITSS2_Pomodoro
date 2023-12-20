import { CloseOutlined, PlayCircleOutlined } from "@ant-design/icons";
import { useAppDispatch } from "../../redux/hook";
import { setCloseTimeUpPopup } from "../../redux/reducers/popupReducer";
import timeUpImage from "../../assets/images/TimeUp.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import PlayIcon from "../../assets/icons/PlayIcon";

const TimeUpPopup = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleCloseTimUpPopup = () => {
    dispatch(setCloseTimeUpPopup());
  };

  const [dataPost, setDataPost] = useState<any>([]);
  const [dataVideo, setDataVideo] = useState<any>([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_DOMAIN}/recommend`)
      .then((res) => {
        setDataPost(res.data.posts);
        setDataVideo(res.data.videos);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
            {dataPost.map((item: any, index: any) => (
              <a href={`exercise/blog/${item.id}`} key={index}>
                <img src={item.thumbnail} className="w-full" />
                <h1 className="font-semibold multiline-ellipsis">{item.title}</h1>
                <div className="flex justify-between text-[14px] text-[#78716C]">
                  <span>{item.readtime} mins</span>
                  <span>{item.likes} likes</span>
                </div>
              </a>
            ))}
            {dataVideo.map((item: any, index: any) => (
              <a href={`exercise/video/${item.id}`} key={index}>
                <div className="relative">
                  <img src={item.thumbnail} className="w-full" />
                  <PlayIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
                <h1 className="font-semibold multiline-ellipsis">{item.title}</h1>
                <div className="flex justify-between text-[14px] text-[#78716C]">
                  <span>{item.readtime} mins</span>
                  <span>{item.likes} likes</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeUpPopup;
