import { UserContext } from "@/contexts/UserContext";
import type { User } from "@/lib/types";
import type React from "react";
import { useEffect, useState } from "react";

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const getData = () => {
      const username = sessionStorage.getItem("user.username");
      if (username) setUser({ username });
    };

    getData();
  }, []);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value);

  const handleSubmit = () => {
    if (!username) return;

    sessionStorage.setItem("user.username", username.trim());
    setUser({ username } as User);
    setUsername("");
  };

  return (
    <UserContext.Provider
      value={{ user, username, onInputChange, handleSubmit }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
