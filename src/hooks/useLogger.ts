import { createContext, useContext } from "react";

interface ILoggerContext {
  logs: string[];
  addLog: (message: string) => void;
}

export const LoggerContext = createContext<ILoggerContext | null>(null);

export const useLogger = () => {
  const context = useContext(LoggerContext);
  if (!context)
    throw new Error("useLogger must be used within a LoggerProvider");

  return context;
};
