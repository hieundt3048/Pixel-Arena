import BoardProvider from "./BoardProvider";
import CanvasProvider from "./CanvasProvider";
import PaintToolProvider from "./PaintToolProvider";
import UserProvider from "./UserProvider";
import WebSocketProvider from "./WebSocketProvider";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <WebSocketProvider>
        <UserProvider>
          <BoardProvider>
            <CanvasProvider>
              <PaintToolProvider>{children}</PaintToolProvider>
            </CanvasProvider>
          </BoardProvider>
        </UserProvider>
      </WebSocketProvider>
    </>
  );
};

export default AppProvider;
