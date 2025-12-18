import RootLayout from "@/layouts/RootLayout";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import SubCanvas from "@/components/SubCanvas";
import Canvas from "./components/Canvas";
import CanvasContainer from "./layouts/CanvasContainer";
import { useState } from "react";
import type { PixelPosition } from "./lib/constants";

const GRID_SIZE = 100;
const PIXEL_SIZE = 10;

const App = () => {
  const [position, setPosition] = useState<PixelPosition | null>(null);

  return (
    <RootLayout>
      <TransformWrapper>
        <TransformComponent>
          <CanvasContainer>
            <Canvas
              gridSize={GRID_SIZE}
              pixelSize={PIXEL_SIZE}
              position={position}
              setPosition={setPosition}
            />

            <SubCanvas
              gridSize={GRID_SIZE}
              pixelSize={PIXEL_SIZE}
              position={position}
              setPosition={setPosition}
            />
          </CanvasContainer>
        </TransformComponent>
      </TransformWrapper>
    </RootLayout>
  );
};

export default App;
