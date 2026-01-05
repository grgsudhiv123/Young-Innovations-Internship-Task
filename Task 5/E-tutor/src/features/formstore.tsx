import { combineReducers, configureStore } from "@reduxjs/toolkit";
import multistepFormSlice from "./multistepFormReducer";
import { persistStore, persistReducer } from "redux-persist";
import localStorage from "redux-persist/es/storage";

const rootReducer = combineReducers({
  multistepForm: multistepFormSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage: localStorage,
  whitelist: ["multistepForm"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);
export { store, persistor };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
