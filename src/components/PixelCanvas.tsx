import { useState } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import Canvas from "./Canvas";
import SubCanvas from "./SubCanvas";
import CanvasContainer from "@/layouts/CanvasContainer";
import { Button } from "./ui/button";
import { type PixelPosition } from "@/lib/constants";

const PixelCanvas = () => {
  const [position, setPosition] = useState<PixelPosition | null>(null);

  return (
    <div className="relative w-full h-full">
      <TransformWrapper initialScale={0.8} minScale={0.8} maxScale={5}>
        <TransformComponent>
          <CanvasContainer>
            <Canvas />
            <SubCanvas position={position} setPosition={setPosition} />
          </CanvasContainer>
        </TransformComponent>
      </TransformWrapper>
      <Button
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 rounded-full"
        size={"lg"}
      >
        Paint
      </Button>
    </div>
  );
};

export default PixelCanvas;
