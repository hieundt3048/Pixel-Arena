import { LoggerContext } from "@/hooks";
import { useState } from "react";

const LoggerProvider = ({ children }: { children: React.ReactNode }) => {
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => setLogs((prev) => [...prev, message]);

  return (
    <LoggerContext.Provider value={{ logs, addLog }}>
      {children}
    </LoggerContext.Provider>
  );
};

export default LoggerProvider;
