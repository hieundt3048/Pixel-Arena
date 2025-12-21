import BoardProvider from "./BoardProvider";
import CanvasProvider from "./CanvasProvider";
import UserProvider from "./UserProvider";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <UserProvider>
        <BoardProvider>
          <CanvasProvider>{children}</CanvasProvider>
        </BoardProvider>
      </UserProvider>
    </>
  );
};

export default AppProvider;
