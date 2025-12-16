import clsx from "clsx";
import {
  buttonTypeConstants,
  sizeConstants,
  type ButtonType,
} from "../../utils/constants/ui/buttonconstants";
import type { ButtonPropsType } from "../../types/buttonui.type";

function variantType(key: ButtonType, disabled: boolean) {
  switch (key) {
    case buttonTypeConstants.PRIMARY:
      return ` text-white  ${
        disabled
          ? "bg-primary-200"
          : "bg-primary-500 hover:bg-primary-600 hover:shadow-[0px_6px_20px_0px_rgba(204,82,43,0.5)]"
      }`;

    case buttonTypeConstants.SECONDARY:
      return `text-white ${
        disabled
          ? "bg-secondary-200"
          : "bg-secondary-500 hover:bg-secondary-600 hover:shadow-[0px_6px_20px_0px_rgba(69,63,202,0.5)]"
      }`;

    case buttonTypeConstants.GRAY:
      return ` text-white ${
        disabled
          ? "bg-gray-200"
          : "bg-gray-500 hover:bg-gray-600 hover:shadow-[0px_6px_20px_0px_rgba(54,59,71,0.5)]"
      }`;

    case buttonTypeConstants.LIGHT_PRIMARY:
      return `${
        disabled
          ? "bg-primary-100 text-primary-300"
          : "bg-primary-100 text-primary-500 hover:bg-primary-200 hover:text-primary-600"
      }`;

    case buttonTypeConstants.LIGHT_SECONDARY:
      return `${
        disabled
          ? "bg-secondary-100 text-secondary-300"
          : "bg-secondary-100 text-secondary-500 hover:bg-secondary-200 hover:text-secondary-600"
      }`;

    case buttonTypeConstants.LIGHT_GRAY:
      return `${
        disabled
          ? "bg-gray-50 text-gray-300"
          : "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-600"
      }`;

    case buttonTypeConstants.TERTIARY_PRIMARY:
      return `${
        disabled
          ? "text-primary-300"
          : "text-primary-500 hover:bg-primary-100 hover:text-primary-600"
      }`;

    case buttonTypeConstants.TERTIARY_SECONDARY:
      return `${
        disabled
          ? "text-secondary-300"
          : "text-secondary-500 hover:bg-secondary-100 hover:text-secondary-600"
      }`;

    case buttonTypeConstants.TERTIARY_GRAY:
      return `${
        disabled
          ? "text-gray-300"
          : "text-gray-900 hover:text-gray-900 hover:bg-gray-50"
      }`;

    default:
      return "";
  }
}

function buttonSize(key: string) {
  switch (key) {
    case sizeConstants.SMALL:
      return "px-4 button-text-small";

    case sizeConstants.MEDIUM:
      return "px-6 button-text-medium";

    case sizeConstants.LARGE:
      return "px-8 button-text-large";

    default:
      return "px-6 button-text-medium";
  }
}

const CustomButton = ({
  type = "primary",
  size = "base",
  disabled = false,
  children = "",
  className = "",
  onClick,
}: ButtonPropsType) => {
  const variant = variantType(type, disabled);
  const btnSize = buttonSize(size);

  const handleOnclick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };
  return (
    <button
      type="button"
      onClick={handleOnclick}
      disabled={disabled}
      className={clsx(
        "transition-colors duration-200 ease-in-out",
        disabled ? "cursor-not-allowed" : " cursor-pointer",
        btnSize,
        variant,
        className
      )}
    >
      {children}
    </button>
  );
};

export default CustomButton;
