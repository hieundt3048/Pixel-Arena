import { createContext, useContext, useState, type ReactNode } from "react";

interface UsernameContextType {
  username: string | null;
  setUsername: (username: string) => void;
  status: "online" | "offline";
  setStatus: (status: "online" | "offline") => void;
}

const UsernameContext = createContext<UsernameContextType | undefined>(
  undefined
);

export const UsernameProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsernameState] = useState<string | null>(() => {
    // Load from sessionStorage on mount (per-tab storage)
    return sessionStorage.getItem("pixel-arena-username");
  });
  const [status, setStatusState] = useState<"online" | "offline">("online");

  const setUsername = (newUsername: string) => {
    setUsernameState(newUsername);
    sessionStorage.setItem("pixel-arena-username", newUsername);
  };

  const setStatus = (newStatus: "online" | "offline") => {
    setStatusState(newStatus);
  };

  return (
    <UsernameContext.Provider
      value={{ username, setUsername, status, setStatus }}
    >
      {children}
    </UsernameContext.Provider>
  );
};

export const useUsername = () => {
  const context = useContext(UsernameContext);
  if (context === undefined) {
    throw new Error("useUsername must be used within a UsernameProvider");
  }
  return context;
};
