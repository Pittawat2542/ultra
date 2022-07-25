import { Dialog, Transition } from "@headlessui/react";

import Button from "../Button/Button";
import { Fragment } from "react";
import type { ReactChild } from "react";

type ModalProps = {
  title: string;
  subtitleContent?: ReactChild;
  bodyContent?: ReactChild;
  isOpen: boolean;
  closeModal: () => void;
  confirmButtonText: string;
  onConfirmButtonClick: () => void;
  onCancelButtonClick: () => void;
};

export default function Modal({
  closeModal,
  isOpen,
  title,
  subtitleContent,
  bodyContent,
  confirmButtonText,
  onCancelButtonClick,
  onConfirmButtonClick,
}: ModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
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
              <Dialog.Panel className="w-full max-w-[50%] transform overflow-hidden rounded-2xl bg-white bg-opacity-10 p-12 text-left align-middle shadow-xl backdrop-blur-xl backdrop-filter transition-all">
                <Dialog.Title
                  as="h3"
                  className="font-serif text-3xl font-bold leading-6"
                >
                  {title}
                </Dialog.Title>
                {subtitleContent}
                <div className="mt-8">{bodyContent}</div>

                <div className="mt-12 flex justify-end gap-4">
                  <Button className="text-xl" onClick={onCancelButtonClick}>
                    Cancel
                  </Button>
                  <Button className="text-xl" onClick={onConfirmButtonClick}>
                    {confirmButtonText}
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
