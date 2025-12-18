import {
  useCallback,
  useEffect,
  useRef,
  type Dispatch,
  type MouseEvent,
  type SetStateAction,
} from "react";
import type { PixelPosition } from "@/lib/constants";
import {
  OVERLAY_COLORS,
  OVERLAY_DIMENSIONS,
  CANVAS_CONFIG,
  GRID_SIZE,
  PIXEL_SIZE,
} from "@/lib/constants";

interface SubCanvasProps {
  position: PixelPosition | null;
  setPosition: Dispatch<SetStateAction<PixelPosition | null>>;
}

const getCoords = (
  e: React.MouseEvent,
  canvas: HTMLCanvasElement
): PixelPosition | null => {
  const rect = canvas.getBoundingClientRect();

  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  const x = Math.floor(((e.clientX - rect.left) * scaleX) / PIXEL_SIZE);
  const y = Math.floor(((e.clientY - rect.top) * scaleY) / PIXEL_SIZE);

  // Validate bounds
  if (x < 0 || x >= GRID_SIZE || y < 0 || y >= GRID_SIZE) return null;

  return { x, y };
};

const drawOverlay = (
  ctx: CanvasRenderingContext2D,
  coords: PixelPosition
): void => {
  const { width, height } = ctx.canvas;
  ctx.clearRect(0, 0, width, height);

  const baseX = coords.x * PIXEL_SIZE;
  const baseY = coords.y * PIXEL_SIZE;
  const {
    cornerSize,
    cornerOffset,
    innerSize,
    innerOffset,
    dotSize,
    dotOffset,
  } = OVERLAY_DIMENSIONS;

  // Helper function to draw rectangles relative to pixel position
  const drawRect = (x: number, y: number, w: number, h: number): void => {
    ctx.fillRect(baseX + x, baseY + y, w, h);
  };

  // Draw background highlight
  ctx.fillStyle = OVERLAY_COLORS.background;
  drawRect(0, 0, PIXEL_SIZE, PIXEL_SIZE);

  // Draw corner borders
  ctx.fillStyle = OVERLAY_COLORS.border;
  drawRect(0, 0, cornerSize, cornerSize);
  drawRect(cornerOffset, 0, cornerSize, cornerSize);
  drawRect(0, cornerOffset, cornerSize, cornerSize);
  drawRect(cornerOffset, cornerOffset, cornerSize, cornerSize);

  // Draw inner corners
  ctx.fillStyle = OVERLAY_COLORS.corner;
  drawRect(innerOffset, innerOffset, innerSize, innerSize);
  drawRect(cornerOffset, innerOffset, innerSize, innerSize);
  drawRect(innerOffset, cornerOffset, innerSize, innerSize);
  drawRect(cornerOffset, cornerOffset, innerSize, innerSize);

  // Draw corner dots
  ctx.fillStyle = OVERLAY_COLORS.background;
  drawRect(dotOffset, dotOffset, dotSize, dotSize);
  drawRect(cornerOffset, dotOffset, dotSize, dotSize);
  drawRect(dotOffset, cornerOffset, dotSize, dotSize);
  drawRect(cornerOffset, cornerOffset, dotSize, dotSize);
};

const SubCanvas = ({ position, setPosition }: SubCanvasProps) => {
  const subCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = subCanvasRef.current;
    if (!canvas) return;

    const width = GRID_SIZE * PIXEL_SIZE;
    const height = GRID_SIZE * PIXEL_SIZE;

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, width, height);
  }, []);

  useEffect(() => {
    const canvas = subCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.imageSmoothingEnabled = CANVAS_CONFIG.imageSmoothingEnabled;

    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);

    if (position) drawOverlay(ctx, position);
  }, [position]);

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLCanvasElement>) => {
      const canvas = subCanvasRef.current;
      if (!canvas) return;

      const coords = getCoords(e, canvas);
      setPosition(coords);
    },
    [setPosition]
  );

  const handleMouseClick = useCallback(
    (e: MouseEvent<HTMLCanvasElement>) => {
      const canvas = subCanvasRef.current;
      if (!canvas) return;

      const coords = getCoords(e, canvas);
      if (coords) {
        setPosition(coords);
      }
    },
    [setPosition]
  );

  const handleMouseLeave = useCallback(() => setPosition(null), [setPosition]);

  return (
    <canvas
      className="absolute top-0 left-0 pointer-events-auto"
      ref={subCanvasRef}
      id="sub-canvas"
      onClick={handleMouseClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label="Canvas overlay for pixel selection"
    />
  );
};

export default SubCanvas;
