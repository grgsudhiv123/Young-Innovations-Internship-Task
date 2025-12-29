import { CaretDownIcon } from "@phosphor-icons/react";
import clsx from "clsx";
import React, { createContext, useContext, useRef, useState } from "react";

type ContextType = {
  value: string | null;
  setValue: (value: string) => void;
  open: boolean;
  setOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  isErrorActive: boolean;
};

type SelectPropsType = {
  error?: string | null;
  label?: string | null;
  className?: string | null;
  children: React.ReactNode;
  value?: string | null;
  onValueChange?: (value: string) => void;
};

type SelectContents = {
  children: React.ReactNode;
  className?: string;
};

const SelectContext = createContext<ContextType | null>(null);

const useSelectContext = () => {
  const ctx = useContext(SelectContext);
  if (!ctx) {
    throw new Error("Components must be inside <Select>");
  }
  return ctx;
};

export const Select = ({
  error,
  label,
  className,
  children,
  value: controlledValue,
  onValueChange,
}: SelectPropsType) => {
  const selectCompRef = useRef<HTMLDivElement | null>(null);

  const isControlled = controlledValue !== undefined;

  const [open, setOpen] = useState<boolean>(false);

  const [uncontrolledValue, setUncontrolledValue] = useState<string | null>(
    null
  );

  const value = isControlled ? controlledValue : uncontrolledValue;

  const setValue = (val: string) => {
    if (!isControlled) {
      setUncontrolledValue(val);
    }
    onValueChange?.(val);
    setOpen(false);
  };

  const isErrorActive = error && error.length > 0 ? true : false;

  return (
    <SelectContext.Provider
      value={{ value, setValue, open, setOpen, isErrorActive }}
    >
      <div
        ref={selectCompRef}
        className={clsx("relative w-full bg-white selectComp", className)}
      >
        {label && (
          <label
            htmlFor={label}
            className="body-md-400 text-gray-900 block mb-1.5"
          >
            {label}
          </label>
        )}
        {children}
        {isErrorActive && (
          <span className="absolute  bottom-0 translate-y-[110%] body-sm-400 text-primary-500 mt-0.5">
            {error}
          </span>
        )}
      </div>
    </SelectContext.Provider>
  );
};

export const SelectTrigger = ({
  placeholder,
  disabled,
  className,
  textStyle,
  chevronStyle,
}: {
  placeholder: string;
  disabled?: boolean;
  className?: string;
  textStyle?: string;
  chevronStyle?: string;
}) => {
  const { value, open, setOpen, isErrorActive } = useSelectContext();

  return (
    <button
      type="button"
      onClick={() => setOpen((prev) => !prev)}
      disabled={disabled}
      className={clsx(
        className,
        "selectTriggerClass w-full flex justify-between gap-2 items-center border hover:border-primary-200 ring-0 hover:ring-1 ring-primary-200 px-4.5 py-3 transition-all duration-200 ease-in-out",
        isErrorActive
          ? "border-primary-500 bg-primary-100"
          : " border-gray-100 bg-white",
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      )}
    >
      <span
        className={clsx(
          !value ? "text-gray-500" : "text-gray-900",
          "capitalize body-lg-400",
          textStyle
        )}
      >
        {value && value?.length !== 0 ? value : placeholder}
      </span>

      <CaretDownIcon
        size={16}
        className={clsx(
          open ? "rotate-180" : "rotate-0",
          "text-gray-900 transition-all duration-200 ease-in-out",
          chevronStyle
        )}
      />
    </button>
  );
};

export const SelectContents = ({ children, className }: SelectContents) => {
  const { open } = useSelectContext();

  if (!open) return null;

  return (
    <div
      className={clsx(
        "absolute bottom-0 z-50 flex flex-col shadow-2xl bg-white border border-gray-100",
        className
      )}
    >
      {children}
    </div>
  );
};

export const SelectItem = ({
  children,
  newvalue,
  onClick,
}: {
  children: React.ReactNode;
  newvalue: string;
  onClick?: () => void;
}) => {
  const { setValue, value } = useSelectContext();
  const isActive = value === newvalue;
  return (
    <button
      type="button"
      onClick={() => {
        setValue(newvalue);
        if (onClick) onClick();
      }}
      className={clsx(
        "hover:bg-primary-100 text-gray-700 capitalize hover:text-gray-900 w-full px-4.5 py-1.5 cursor-pointer flex justify-start whitespace-nowrap",
        isActive ? "bg-primary-50" : ""
      )}
    >
      {children}
    </button>
  );
};
