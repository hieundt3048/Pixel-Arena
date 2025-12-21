import { PaintToolContext } from "@/contexts/PaintToolContext";
import { useContext } from "react";

export const usePaintTool = () => {
  const context = useContext(PaintToolContext);
  if (!context)
    throw new Error("usePaintTool must be used within a PaintToolProvider");

  return context;
};
