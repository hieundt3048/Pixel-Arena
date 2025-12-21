import { BoardContext } from "@/contexts/BoardContext";
import { useContext } from "react";

export const useBoard = () => {
  const context = useContext(BoardContext);
  if (!context) throw new Error("useBoard must be used within a BoardProvider");

  return context;
};
