import type { PixelRecord } from "@/lib/types";
import { createContext } from "react";

interface BoardContextProps {
  data: PixelRecord[] | null;
  loading: boolean;
}

export const BoardContext = createContext<BoardContextProps | null>(null);
