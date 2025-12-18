import {
  useCallback,
  useEffect,
  useRef,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { PixelPosition } from "@/lib/constants";
import {
  OVERLAY_COLORS,
  OVERLAY_DIMENSIONS,
  CANVAS_CONFIG,
} from "@/lib/constants";

// ============================================================================
// Types
// ============================================================================

interface SubCanvasProps {
  gridSize: number;
  pixelSize: number;
  position: PixelPosition | null;
  setPosition: Dispatch<SetStateAction<PixelPosition | null>>;
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Converts mouse event coordinates to grid coordinates
 */
const getCoords = (
  e: React.MouseEvent,
  canvas: HTMLCanvasElement,
  pixelSize: number,
  gridSize: number
): PixelPosition | null => {
  const rect = canvas.getBoundingClientRect();

  // Calculate scale factors for transformed canvas
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  // Convert screen coordinates to canvas coordinates
  const x = Math.floor(((e.clientX - rect.left) * scaleX) / pixelSize);
  const y = Math.floor(((e.clientY - rect.top) * scaleY) / pixelSize);

  // Validate bounds
  if (x < 0 || x >= gridSize || y < 0 || y >= gridSize) {
    return null;
  }

  return { x, y };
};

/**
 * Draws the pixel selection overlay at the specified coordinates
 */
const drawOverlay = (
  ctx: CanvasRenderingContext2D,
  pixelSize: number,
  coords: PixelPosition
): void => {
  const { width, height } = ctx.canvas;
  ctx.clearRect(0, 0, width, height);

  const baseX = coords.x * pixelSize;
  const baseY = coords.y * pixelSize;
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
  drawRect(0, 0, pixelSize, pixelSize);

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

// ============================================================================
// Component
// ============================================================================

/**
 * Overlay canvas component that handles mouse interactions and displays
 * pixel selection overlay
 */
const SubCanvas = ({
  gridSize,
  pixelSize,
  position,
  setPosition,
}: SubCanvasProps) => {
  const subCanvasRef = useRef<HTMLCanvasElement>(null);

  // Initialize canvas dimensions and context
  useEffect(() => {
    const canvas = subCanvasRef.current;
    if (!canvas) return;

    const width = gridSize * pixelSize;
    const height = gridSize * pixelSize;

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d", {
      alpha: true, // Transparent overlay
    });

    if (!ctx) return;

    ctx.imageSmoothingEnabled = CANVAS_CONFIG.imageSmoothingEnabled;
    ctx.clearRect(0, 0, width, height);
  }, [gridSize, pixelSize]);

  // Draw overlay when position changes
  useEffect(() => {
    const canvas = subCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.imageSmoothingEnabled = CANVAS_CONFIG.imageSmoothingEnabled;

    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);

    if (position) {
      drawOverlay(ctx, pixelSize, position);
    }
  }, [position, pixelSize]);

  // Event handlers (memoized to prevent unnecessary re-renders)
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = subCanvasRef.current;
      if (!canvas) return;

      const coords = getCoords(e, canvas, pixelSize, gridSize);
      setPosition(coords);
    },
    [pixelSize, gridSize, setPosition]
  );

  const handleMouseClick = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = subCanvasRef.current;
      if (!canvas) return;

      const coords = getCoords(e, canvas, pixelSize, gridSize);
      if (coords) {
        setPosition(coords);
      }
    },
    [pixelSize, gridSize, setPosition]
  );

  const handleMouseLeave = useCallback(() => {
    setPosition(null);
  }, [setPosition]);

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
