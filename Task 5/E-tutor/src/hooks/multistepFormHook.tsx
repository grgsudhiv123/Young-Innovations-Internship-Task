import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";
import type { AppDispatch, RootState } from "../features/formstore";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAppDispatch = useDispatch<AppDispatch>;
