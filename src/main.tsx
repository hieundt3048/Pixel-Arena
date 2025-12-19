import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Toaster } from "@/components/ui/sonner.tsx";
import CanvasProvider from "@/provider/CanvasProvider";
import UserProvider from "@/provider/UserProvider";

createRoot(document.getElementById("root")!).render(
  <>
    <StrictMode>
      <UserProvider>
        <CanvasProvider>
          <Toaster />
          <App />
        </CanvasProvider>
      </UserProvider>
    </StrictMode>
  </>
);
