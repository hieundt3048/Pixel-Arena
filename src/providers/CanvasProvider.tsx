import { CanvasContext } from "@/contexts/CanvasContext";
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  GRID_SIZE,
  PIXEL_SIZE,
} from "@/lib/constants";
import type { CanvasFuncProps, PixelCoord } from "@/lib/types";
import type React from "react";
import { useCallback, useState, type RefObject } from "react";

const getPosition = (props: CanvasFuncProps): PixelCoord | null => {
  const canvas = props.canvasRef.current;
  if (!canvas) return null;

  const rect = canvas.getBoundingClientRect();

  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  const x = Math.floor(((props.e.clientX - rect.left) * scaleX) / PIXEL_SIZE);
  const y = Math.floor(((props.e.clientY - rect.top) * scaleY) / PIXEL_SIZE);

  if (x < 0 || x >= GRID_SIZE || y < 0 || y >= GRID_SIZE) return null;

  return { x, y };
};

const drawHoverPoint = (ctx: CanvasRenderingContext2D, pos: PixelCoord) => {
  const { width, height } = ctx.canvas;
  ctx.clearRect(0, 0, width, height);

  const baseX = pos.x * PIXEL_SIZE;
  const baseY = pos.y * PIXEL_SIZE;

  const px = (x: number, y: number, w = 1, h = 1) => {
    ctx.fillRect(baseX + x, baseY + y, w, h);
  };

  ctx.globalAlpha = 0.3;
  ctx.fillStyle = "#00132d";
  px(0, 0, PIXEL_SIZE, PIXEL_SIZE);
};

const drawBase = (ref: RefObject<HTMLCanvasElement | null>) => {
  const canvas = ref.current;
  if (!canvas) return;

  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
};

const drawPin = (
  ref: RefObject<HTMLCanvasElement | null>,
  currentPin: PixelCoord | null
) => {
  const canvas = ref.current;
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  if (!currentPin) return;

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.globalAlpha = 0.3;
  ctx.fillStyle = "#00132d";
  ctx.fillRect(currentPin.x * PIXEL_SIZE, currentPin.y * PIXEL_SIZE, 10, 10);
};

const CanvasProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentPos, setCurrentPos] = useState<PixelCoord | null>(null);
  const [currentPin, setCurrentPin] = useState<PixelCoord | null>(null);

  const onMouseMove = useCallback(
    (props: CanvasFuncProps) => {
      const pos = getPosition(props);

      if (pos) setCurrentPos(pos);
    },
    [setCurrentPos]
  );

  const onMouseLeave = () => setCurrentPos(null);

  const onMouseClick = useCallback(
    (props: CanvasFuncProps) => {
      const pos = getPosition(props);

      if (pos) setCurrentPin(pos);
    },
    [setCurrentPin]
  );

  return (
    <CanvasContext.Provider
      value={{
        currentPos,
        currentPin,
        onMouseMove,
        onMouseLeave,
        onMouseClick,
        drawHoverPoint,
        drawBase,
        drawPin,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export default CanvasProvider;
