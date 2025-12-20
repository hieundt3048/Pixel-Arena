import Canvas from "./components/canvas/Canvas";
import HoverCanvas from "./components/canvas/HoverCanvas";
import { useCanvas } from "./contexts/CanvasContext";
import Loading from "./components/Loading";
import Navbar from "./components/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import MarkerCanvas from "./components/canvas/MarkerCanvas";

const App = () => {
  const { loading } = useCanvas();
  if (loading) return <Loading />;

  return (
    <div className="w-full h-screen flex flex-col gap-3 select-none overflow-hidden">
      <Navbar />
      <div className="flex gap-3 w-full flex-1 min-h-0 px-3 pb-3">
        <main className="w-full h-full border p-3 overflow-hidden bg-gray-50 min-h-0">
          <TransformWrapper
            initialScale={0.7}
            minScale={0.7}
            maxScale={10}
            wheel={{ step: 0.2 }}
            pinch={{ disabled: false }}
            doubleClick={{ disabled: false, step: 0.7 }}
            panning={{ disabled: false }}
            centerOnInit
          >
            <TransformComponent
              wrapperStyle={{ width: "100%", height: "100%" }}
            >
              <div className="w-full h-full relative border">
                <Canvas />
                <MarkerCanvas />
                <HoverCanvas />
              </div>
            </TransformComponent>
          </TransformWrapper>
        </main>
        <Sidebar />
      </div>
    </div>
  );
};

export default App;
