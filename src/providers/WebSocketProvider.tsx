import { WebSocketContext } from "@/contexts/WebSocketContext";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { toast } from "sonner";
import { type PixelUpdateMessage } from "@/lib/types";

const WS_URL = "http://localhost:8080/ws";

const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {
  const clientRef = useRef<Client | null>(null);
  const [updatedPoint, setUpdatedPoint] = useState<PixelUpdateMessage | null>(
    null
  );

  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS(WS_URL),
      reconnectDelay: 3000,

      onConnect: () => {
        toast.success("websocket connected");

        client.subscribe("/topic/pixel-update", (message) => {
          const payload: PixelUpdateMessage = JSON.parse(message.body);
          console.log("Nhận tin nhắn từ /topic/update:", payload);
          setUpdatedPoint(payload);
        });
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ updatedPoint }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export default WebSocketProvider;
