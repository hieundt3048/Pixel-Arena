import { WebSocketContext } from "@/contexts/WebSocketContext";
import type React from "react";
import { useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { toast } from "sonner";

const WS_URL = "http://localhost:8080/ws";

const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {
  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS(WS_URL),
      reconnectDelay: 3000,

      onConnect: () => {
        toast.success("websocket connected");

        client.subscribe("/topic/pixel-update", (message) => {
          const payload = JSON.parse(message.body);
          console.log("Nhận tin nhắn từ /topic/update:", payload);
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
    <WebSocketContext.Provider value={null}>
      {children}
    </WebSocketContext.Provider>
  );
};

export default WebSocketProvider;
