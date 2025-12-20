import type { ButtonHTMLAttributes, ReactElement } from "react";
import type {
  ButtonVariantType,
  SizeType,
} from "../utils/constants/ui/buttonconstants";

export interface ButtonPropsType
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariantType;
  size?: SizeType;
  disabled?: boolean;
  children?: ReactElement | string;
  className?: string;
}
