import { AppContext } from "@/providers/App.provider";
import { useContext } from "react";

export function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useApp must be used inside AppProvider");
  }

  return context;
}