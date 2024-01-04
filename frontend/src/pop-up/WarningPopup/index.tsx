import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { useAppDispatch } from "../../redux/hook";
import { setCloseWarningPopup } from "../../redux/reducers/popupReducer";

interface WarningPopupProps {
  isOpen: boolean;
}

const WarningPopup: React.FC<WarningPopupProps> = ({ isOpen }) => {
  const dispatch = useAppDispatch();

  const handleCloseWarningPopup = () => {
    dispatch(setCloseWarningPopup());
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[1000]" onClose={handleCloseWarningPopup}>
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
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all flex flex-col items-center gap-4">
                <Dialog.Title as="h3" className="text-center text-3xl font-bold">
                  Nhắc nhở
                </Dialog.Title>

                <div className="mt-2 flex flex-col items-center">
                  <img
                    src="https://img.freepik.com/free-vector/female-designer-working-late-room-flat-illustration-cartoon-student-using-laptop-computer-night-sitting-desk_74855-14019.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1703635200&semt=ais"
                    className="w-3/4"
                  />
                  <h4 className="text-red-500 uppercase font-semibold text-2xl mb-4">
                    Quá muộn để làm việc rồi!
                  </h4>
                  <p className="text-sm text-gray-500 text-center mx-8">
                    Bây giờ quá muộn để làm việc rồi. Bạn nên nghỉ ngơi và chuyển sang sáng hôm sau
                    để làm việc tiếp nhé !
                  </p>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default WarningPopup;
