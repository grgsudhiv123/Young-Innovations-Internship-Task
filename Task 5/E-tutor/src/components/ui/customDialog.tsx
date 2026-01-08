import { X } from "@phosphor-icons/react";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type CustomDialogProps = {
  isOpen: boolean;
  isClose: (value: boolean) => void;
  children: React.ReactNode;
};

export const CustomDialog = ({
  isOpen,
  isClose,
  children,
}: CustomDialogProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    }

    if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  return createPortal(
    <dialog
      ref={dialogRef}
      className=" backdrop:bg-black/40 w-[80vw] max-w-3xl min-h-50 z-10 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2  rounded-md p-2 bg-transparent"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          isClose(false);
        }
      }}
      onCancel={(e) => {
        e.preventDefault();
        isClose(false);
      }}
    >
      <div className="relative bg-white rounded-md p-4">
        <button
          type="button"
          onClick={() => isClose(false)}
          className="absolute top-2 right-2 p-1 rounded hover:bg-gray-100"
        >
          <X size={20} />
        </button>

        {children}
      </div>
    </dialog>,
    document.body
  );
};
