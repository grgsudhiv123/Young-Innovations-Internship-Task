import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./routes/routes.tsx";
import { AuthProvider } from "./hooks/useAuth.tsx";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import Store from "./features/formstore.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={Store}>
      <AuthProvider>
        <ToastContainer
          stacked
          hideProgressBar
          position="top-center"
          autoClose={3000}
        />
        <RouterProvider router={router} />
      </AuthProvider>
    </Provider>
  </StrictMode>
);
