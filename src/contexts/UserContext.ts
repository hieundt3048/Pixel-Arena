import { createContext, useContext } from "react";

interface UserContextData {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  currentUser: string;
  onSubmit: () => void;
}

export const UserContext = createContext<UserContextData>(
  {} as UserContextData
);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");

  return context;
};
