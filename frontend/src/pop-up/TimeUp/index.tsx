import { CloseOutlined } from "@ant-design/icons";
import { Dialog, Transition } from "@headlessui/react";
import { PlayCircle, X } from "@phosphor-icons/react";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import timeUpImage from "../../assets/images/TimeUp.png";
import { useAppDispatch } from "../../redux/hook";
import { setCloseTimeUpPopup } from "../../redux/reducers/popupReducer";

interface TimeUpPopupProps {
  isOpen: boolean;
}

const TimeUpPopup: React.FC<TimeUpPopupProps> = ({ isOpen }) => {
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
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[1000]" onClose={handleCloseTimUpPopup}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative w-full max-w-4xl transform overflow-hidden rounded-2xl bg-stone-50 p-6 text-left align-middle shadow-xl transition-all flex flex-col items-center gap-4 min-h-[75vh]">
                <Dialog.Title className="font-semibold text-[36px] text-center">
                  Hết giờ
                </Dialog.Title>

                <button
                  className="absolute right-6 top-6 bg-stone-200 w-10 h-10 rounded-full flex items-center justify-center hover:bg-stone-300 transition"
                  onClick={handleCloseTimUpPopup}
                >
                  <X className="text-stone-700" weight="bold" size={20} />
                </button>

                <img src={timeUpImage} className="block mx-auto" />

                <div className="flex items-end justify-between mb-3 w-full">
                  <h1 className="font-semibold text-[20px]">Thử các bài tập sau khi nghỉ ngơi</h1>
                  <button
                    className="font-semibold text-sm text-stone-500"
                    onClick={navigateToExercise}
                  >
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
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default TimeUpPopup;
