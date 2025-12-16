import type { ReactElement } from "react";
import type {
  ButtonType,
  SizeType,
} from "../utils/constants/ui/buttonconstants";

export interface ButtonPropsType {
  type?: ButtonType;
  size?: SizeType;
  disabled?: boolean;
  children?: ReactElement | string;
  className?: string;
  onClick?: () => void;
}
