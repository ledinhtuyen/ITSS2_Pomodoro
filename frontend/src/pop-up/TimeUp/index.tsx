import { CloseOutlined } from "@ant-design/icons";
import { useAppDispatch } from "../../redux/hook";
import { setCloseTimeUpPopup } from "../../redux/reducers/popupReducer";
import timeUpImage from "../../assets/images/TimeUp.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Play, PlayCircle } from "@phosphor-icons/react";

const TimeUpPopup = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleCloseTimUpPopup = () => {
    dispatch(setCloseTimeUpPopup());
  };

  const navigateToExercise = () => {
    dispatch(setCloseTimeUpPopup());
    navigate("/exercise");
  };

  const navigateToDetailBlog = (id: number) => {
    dispatch(setCloseTimeUpPopup());
    navigate(`/exercise/blog/${id}`);
  };

  const navigateToDetailVideo = (id: number) => {
    dispatch(setCloseTimeUpPopup());
    navigate(`/exercise/video/${id}`);
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
      <div className="bg-stone-50 rounded-3xl relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-cover bg-no-repeat bg-center w-[884px]">
        <button
          className="absolute top-2 right-5 bg-[#DDDDE3] w-[40px] h-[40px] rounded-full border border-white"
          onClick={handleCloseTimUpPopup}
        >
          <CloseOutlined />
        </button>

        <div className="p-8">
          <h1 className="font-semibold text-[36px] text-center">Hết giờ</h1>

          <img src={timeUpImage} className="block mx-auto" />

          <div className="flex items-end justify-between mb-3">
            <h1 className="font-semibold text-[20px]">Thử các bài tập sau khi nghỉ ngơi</h1>
            <button className="font-semibold text-sm text-stone-500" onClick={navigateToExercise}>
              Xem thêm
            </button>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {dataPost.map((item: any, index: any) => (
              <div
                className="cursor-pointer"
                key={index}
                onClick={() => navigateToDetailBlog(item.id)}
              >
                <div className="w-full aspect-video rounded-md overflow-hidden">
                  <img src={item.thumbnail} className="w-full h-full object-cover" />
                </div>
                <h1 className="font-semibold multiline-ellipsis">{item.title}</h1>
                <div className="flex justify-between text-[14px] text-[#78716C]">
                  <span>{item.readtime} phút</span>
                  <span>{item.likes} thích</span>
                </div>
              </div>
            ))}

            {dataVideo.map((item: any, index: any) => (
              <div
                className="cursor-pointer"
                key={index}
                onClick={() => navigateToDetailVideo(item.id)}
              >
                <div className="relative w-full aspect-video rounded-md overflow-hidden">
                  <img src={item.thumbnail} className="w-full h-full object-cover" />
                  <PlayCircle
                    size={40}
                    weight="fill"
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-stone-100/75"
                  />
                </div>
                <h1 className="font-semibold multiline-ellipsis">{item.title}</h1>
                <div className="flex justify-between text-[14px] text-[#78716C]">
                  <span>{item.readtime} phút</span>
                  <span>{item.likes} thích</span>
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
