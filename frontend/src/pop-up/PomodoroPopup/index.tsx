import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import {
  PomodoroStep1,
  PomodoroStep2,
  PomodoroStep3,
  PomodoroStep4,
  PomodoroStep5,
  PomodoroStep6,
} from "../../assets/svgs";

interface PomodoroPopupProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const INSTRUCTIONS = [
  {
    image: <PomodoroStep1 />,
    title: "Bước 1",
    description: "Chọn việc cần làm",
  },
  {
    image: <PomodoroStep2 />,
    title: "Bước 2",
    description: (
      <div>
        Đặt báo thức trong 25 phút <div>(1 Pomodoro)</div>
      </div>
    ),
  },
  {
    image: <PomodoroStep3 />,
    title: "Bước 3",
    description: "Tập trung làm đến hết thời gian",
  },
  {
    image: <PomodoroStep4 />,
    title: "Bước 4",
    description: "Tạm nghỉ tầm 5 phút",
  },
  {
    image: <PomodoroStep5 />,
    title: "Bước 5",
    description: "Quay lại làm việc",
  },
  {
    image: <PomodoroStep6 />,
    title: "Bước 6",
    description: "Nghỉ ngơi sau 4 lần Pomodoro",
  },
];

const PomodoroPopup: React.FC<PomodoroPopupProps> = ({ isOpen, setIsOpen }) => {
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[1000]" onClose={handleClose}>
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
              <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all flex flex-col items-center gap-4">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 text-center"
                >
                  <div className="text-4xl font-bold uppercase text-red-500">Pomodoro</div>
                  <div>Phương pháp cà chua</div>
                </Dialog.Title>

                <div className="mt-2">
                  <p className="text-sm text-gray-500 text-center mx-8">
                    Pomodoro là một phương pháp quản lý thời gian được phát triển bởi Francesco
                    Cirillo vào những năm 1980. Phương pháp này sử dụng đồng hồ bấm giờ để chia công
                    việc thành những đoạn ngắn, phân tách bằng nhau và có thời gian ngắn nghỉ giữa
                    các đoạn.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {INSTRUCTIONS.map(({ image, title, description }) => (
                    <div className="flex flex-col justify-center items-center text-center">
                      <div className="w-28 mb-4">{image}</div>
                      <div className="font-semibold">{title}</div>
                      <div>{description}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-full border border-transparent bg-stone-800 text-stone-100 px-4 py-2 text-sm font-medium"
                    onClick={handleClose}
                  >
                    Tôi đã hiểu 🍅
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default PomodoroPopup;
