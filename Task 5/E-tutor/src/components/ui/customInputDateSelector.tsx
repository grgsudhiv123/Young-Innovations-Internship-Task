import { CaretDownIcon } from "@phosphor-icons/react";
import clsx from "clsx";
import { useState } from "react";
import { COURSE_DURATION } from "../../utils/constants/basicInfoConstants";

interface CustomFormFieldType {
  label: string;
  value: string | undefined;
  onChange?: (value: string) => void;
  placeholder: string;
  error?: string | undefined;
  watchValue?: string | undefined;
  type?: string;
  className?: string;
}

const CustomInputDateSelector = ({
  type,
  label,
  placeholder,
  error,
  onChange,
  value,
  className,
}: CustomFormFieldType) => {
  const isErrorActive = error && error.length > 0 ? true : false;
  const [unit, duration] = value ? value.split(" ") : ["", COURSE_DURATION[0]];
  const [selectOpen, setSelectOpen] = useState<boolean>(false);
  return (
    <div className={clsx("relative w-full h-fit space-y-1.5", className)}>
      <label className="body-md-400 text-gray-900 block mb-2">{label}</label>
      <div
        className={clsx(
          "w-full flex px-4.5 py-3.5  border border-gray-100 focus-within:border-gray-300 hover:border-primary-200 hover:ring-2 ring-gray-100 hover:ring-primary-200 gap-2",
          isErrorActive
            ? "border-primary-500 bg-primary-100"
            : "border-gray-100 bg-white"
        )}
      >
        <input
          type={type ?? "text"}
          value={unit}
          onChange={(e) => {
            onChange?.(e.target.value ? `${e.target.value} ${duration}` : "");
          }}
          placeholder={placeholder}
          className={clsx(
            "outline-0 w-full placeholder:text-gray-500 body-lg-400"
          )}
          minLength={1}
          min="0"
          pattern="^[0-9]+$"
        />

        <div
          onClick={() => setSelectOpen((prev) => !prev)}
          className="cursor-pointer flex flex-row"
        >
          <select
            value={duration}
            name="courseduration"
            className="outline-0 style-select body-lg-400 text-gray-500 "
            onChange={(e) => {
              onChange?.(e.target.value ? `${unit} ${e.target.value} ` : "");
            }}
          >
            {COURSE_DURATION.map((item, i) => {
              return (
                <option key={i} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
          <CaretDownIcon
            size={24}
            className={clsx(
              "transition-all ease-in-out duration-60 text-gray-500 ",
              selectOpen ? "rotate-180" : "rotate-0"
            )}
          />
        </div>
      </div>
      {isErrorActive && (
        <span className="absolute bottom-0 translate-y-[110%] body-sm-400 text-primary-500">
          {error}
        </span>
      )}
    </div>
  );
};

export default CustomInputDateSelector;
