import { UserContext } from "@/contexts/UserContext";
import type React from "react";

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  // TODO: While submiting name, then save username to session and create websocket connection
  return <UserContext.Provider value={{}}>{children}</UserContext.Provider>;
};

export default UserProvider;
