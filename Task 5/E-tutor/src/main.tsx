import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./routes/routes.tsx";
import { AuthProvider } from "./hooks/useAuth.tsx";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { persistor, store } from "./features/formstore.tsx";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <AuthProvider>
          <ToastContainer
            stacked
            hideProgressBar
            position="top-center"
            autoClose={3000}
          />
          <RouterProvider router={router} />
        </AuthProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
