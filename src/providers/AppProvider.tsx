import BoardProvider from "./BoardProvider";
import CanvasProvider from "./CanvasProvider";
import PaintToolProvider from "./PaintToolProvider";
import UserProvider from "./UserProvider";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <UserProvider>
        <BoardProvider>
          <CanvasProvider>
            <PaintToolProvider>{children}</PaintToolProvider>
          </CanvasProvider>
        </BoardProvider>
      </UserProvider>
    </>
  );
};

export default AppProvider;
