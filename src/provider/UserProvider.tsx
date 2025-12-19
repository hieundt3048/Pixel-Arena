import { UserContext } from "@/contexts/UserContext";
import type React from "react";

interface UserProviderProps {
  children: React.ReactNode;
}

const UserProvider = ({ children }: UserProviderProps) => {
  return <UserContext.Provider value={null}>{children}</UserContext.Provider>;
};

export default UserProvider;
