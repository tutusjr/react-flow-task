import { createRoot } from "react-dom/client";
import "./index.css";
import { TeamProvider } from "./context/TeamContext.tsx";
import AppRouter from "./router/AppRouter.tsx";

createRoot(document.getElementById("root")!).render(
  <TeamProvider>
    <AppRouter />
  </TeamProvider>
);
