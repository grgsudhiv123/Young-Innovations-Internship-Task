import { X } from "@phosphor-icons/react";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export const CustomDialog = ({
  isOpen,
  isClose,
  children,
}: {
  isOpen: boolean;
  isClose: (close: boolean) => void;
  children: React.ReactNode;
}) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (!dialogRef) return;
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <dialog
      ref={dialogRef}
      className="min-w-1/5 min-h-50 z-10 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2  rounded-md p-2 bg-transparent"
    >
      <div className="relative w-full h-full bg-transparent">
        <button
          type="button"
          className="absolute top-2 right-2 z-20 cursor-pointer hover:text-gray-700 float-end p-1 bg-gray-50"
          onClick={() => isClose(false)}
        >
          <X size={24} />
        </button>
        {children}
      </div>
    </dialog>,
    document.body
  );
};
