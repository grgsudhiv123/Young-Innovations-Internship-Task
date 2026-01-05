import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";
import type { AppDispatch, RootState } from "../features/formstore";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// eslint-disable-next-line react-refresh/only-export-components
export const useAppDispatch = useDispatch<AppDispatch>;
