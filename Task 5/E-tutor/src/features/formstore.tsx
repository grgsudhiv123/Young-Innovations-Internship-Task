import { configureStore } from "@reduxjs/toolkit";
import multistepFormSlice from "./multistepFormReducer";
const Store = configureStore({
  reducer: {
    multistepForm: multistepFormSlice.reducer,
  },
});

export default Store;

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
