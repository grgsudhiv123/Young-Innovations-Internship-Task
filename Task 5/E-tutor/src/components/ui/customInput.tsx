import { EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";
import clsx from "clsx";
import { useState, type ChangeEvent } from "react";

interface CustomFormFieldType {
  label: string;
  value?: string | null | undefined;
  onChange?: (value: string) => void;
  maxLength?: number;
  placeholder: string;
  error?: string;
  watchValue?: string | undefined;
  type?: string;
}

const CustomFormField = ({
  type,
  label,
  maxLength,
  placeholder,
  error,
  onChange,
  value,
  watchValue,
}: CustomFormFieldType) => {
  const isPasswordField = type === "password";
  const [isPassword, setIspassword] = useState(true);

  const res =
    watchValue !== undefined ? `${watchValue.length}/${maxLength}` : "";

  const [unControlledValue, setUnControlledValue] = useState<string | null>(
    null
  );

  const isControlled = value !== undefined;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setUnControlledValue(e.target.value);
    }
    onChange?.(e.target.value);
  };

  const isErrorActive = error && error.length > 0 ? true : false;
  const currentValue = isControlled ? value : unControlledValue;

  return (
    <div className="relative w-full h-fit space-y-1.5">
      <label className="body-md-400 text-gray-900 block mb-1.5">{label}</label>
      <div
        className={clsx(
          "w-full px-[clamp(0.75rem,0.75rem+3.5vw,1.125rem)] py-[clamp(0.5rem,0.5rem+3.5vw,0.875rem)] flex items-center border border-gray-100 focus-within:border-gray-300 hover:border-primary-200 hover:ring-2 ring-gray-100 hover:ring-primary-200",
          isErrorActive
            ? "border-primary-500 bg-primary-100"
            : "border-gray-100 bg-white"
        )}
      >
        <input
          type={
            isPasswordField
              ? isPassword
                ? "password"
                : "text"
              : type ?? "text"
          }
          value={currentValue as string}
          onChange={handleChange}
          placeholder={placeholder}
          className={clsx(
            "outline-0 w-full placeholder:text-gray-500 body-lg-400"
          )}
        />

        {type?.toLocaleLowerCase() == "password" && (
          <button
            type="button"
            className="cursor-pointer"
            onClick={() => setIspassword((prev) => !prev)}
          >
            {isPassword ? <EyeIcon size={16} /> : <EyeSlashIcon size={16} />}
          </button>
        )}
        <span className="text-xs md:text-sm lg:text-base">{res}</span>
      </div>
      {isErrorActive && (
        <span className="absolute bottom-0 translate-y-[110%] body-sm-400 text-primary-500">
          {error}
        </span>
      )}
    </div>
  );
};

export default CustomFormField;
