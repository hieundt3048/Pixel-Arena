import type React from "react";
import { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { WEBSOCKET_URL } from "@/lib/constants";
import { useLogger, WebSocketContext } from "@/hooks";
import type { PixelUpdateMessage } from "@/lib/types";

const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { addLog } = useLogger();
  const [connected, setConnected] = useState<boolean>(false);
  const [message, setMessage] = useState<PixelUpdateMessage | null>(null);

  useEffect(() => {
    const client = new Client();

    client.webSocketFactory = () => new SockJS(WEBSOCKET_URL);
    client.reconnectDelay = 3000;

    client.onConnect = () => {
      addLog("Websocket is connected");
      setConnected(true);

      client.subscribe("/topic/pixel-update", (message) => {
        const payload: PixelUpdateMessage = JSON.parse(message.body);

        setMessage(payload);
        addLog(
          `PIXEL UPDATED at (${payload.x}, ${payload.y}) with color (${payload.color}) by ${payload.updatedBy}`
        );
      });
    };

    client.onDisconnect = () => {
      addLog("Websocket is disconnected");
      setConnected(false);
    };
    client.activate();

    return () => {
      client.deactivate();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ message, connected }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export default WebSocketProvider;
