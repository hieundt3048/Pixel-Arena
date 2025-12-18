import { useState } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import Canvas from "./Canvas";
import SubCanvas from "./SubCanvas";
import CanvasContainer from "@/layouts/CanvasContainer";
import { Button } from "./ui/button";
import {
  GRID_SIZE,
  PIXEL_SIZE,
  TRANSFORM_CONFIG,
  type PixelPosition,
} from "@/lib/constants";

// ============================================================================
// Component
// ============================================================================

/**
 * Reusable PixelCanvas component that combines Canvas and SubCanvas
 * with zoom/pan functionality.
 *
 * Features:
 * - Interactive pixel grid
 * - Zoom and pan controls
 * - Mouse hover and click detection
 */
const PixelCanvas = () => {
  const [position, setPosition] = useState<PixelPosition | null>(null);

  return (
    <div className="relative w-full h-full">
      <TransformWrapper
        initialScale={TRANSFORM_CONFIG.initialScale}
        minScale={TRANSFORM_CONFIG.minScale}
        maxScale={TRANSFORM_CONFIG.maxScale}
        wheel={{ step: TRANSFORM_CONFIG.wheelStep }}
        panning={{ disabled: !TRANSFORM_CONFIG.panningEnabled }}
        limitToBounds={TRANSFORM_CONFIG.limitToBounds}
      >
        <TransformComponent>
          <CanvasContainer>
            <Canvas gridSize={GRID_SIZE} pixelSize={PIXEL_SIZE} />
            <SubCanvas
              gridSize={GRID_SIZE}
              pixelSize={PIXEL_SIZE}
              position={position}
              setPosition={setPosition}
            />
          </CanvasContainer>
        </TransformComponent>
      </TransformWrapper>
      <Button
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 rounded-full"
        size={"lg"}
        variant={"default"}
      >
        Paint
      </Button>
    </div>
  );
};

export default PixelCanvas;
