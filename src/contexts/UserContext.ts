import type { User } from "@/lib/types";
import { createContext } from "react";

interface UserContextData {
  user: User | null;
  username: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
}

export const UserContext = createContext<UserContextData | null>(null);
