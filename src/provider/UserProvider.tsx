import { UserContext } from "@/contexts/UserContext";
import type React from "react";
import { useEffect, useState } from "react";

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  // TODO: Create websocket connection and handle connection status
  const [username, setUsername] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<string>(
    () => sessionStorage.getItem("pixel-arena-username") || ""
  );

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "pixel-arena-username") setCurrentUser(e.newValue || "");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const onSubmit = () => {
    if (username.trim() === "") return;

    const trimmedUsername = username.trim();
    sessionStorage.setItem("pixel-arena-username", trimmedUsername);
    setCurrentUser(trimmedUsername);
    setUsername("");
  };

  const value = { username, setUsername, currentUser, onSubmit };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
