import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";
import type { AppDispatch, RootState } from "../features/formstore";

export const UseAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const UseAppDispatch = () => useDispatch<AppDispatch>();
