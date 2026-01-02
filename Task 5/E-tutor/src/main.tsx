import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./routes/routes.tsx";
import { AuthProvider } from "./hooks/useAuth.tsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ToastContainer
        stacked
        hideProgressBar
        position="top-center"
        autoClose={3000}
      />
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
