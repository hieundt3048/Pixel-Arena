// ============================================================================
// Type Definitions
// ============================================================================

export interface Pixel {
  x: number;
  y: number;
  color: string;
  updatedBy?: string;
  version?: number;
}

export interface PixelCanvasProps {
  pixels: Pixel[];
  width: number;
  height: number;
  scale: number;
}

export interface PixelPosition {
  x: number;
  y: number;
}

// ============================================================================
// Canvas Configuration
// ============================================================================

export const GRID_SIZE = 100;
export const PIXEL_SIZE = 10;

// ============================================================================
// Overlay Configuration
// ============================================================================

export const OVERLAY_COLORS = {
  background: "#edf2f4",
  border: "#8d99ae",
  corner: "#2b2d42",
} as const;

export const OVERLAY_DIMENSIONS = {
  cornerSize: 4,
  cornerOffset: 6,
  innerSize: 3,
  innerOffset: 1,
  dotSize: 2,
  dotOffset: 2,
} as const;

// ============================================================================
// Transform Configuration
// ============================================================================

export const TRANSFORM_CONFIG = {
  initialScale: 1,
  minScale: 0.1,
  maxScale: 5,
  wheelStep: 0.1,
  panningEnabled: true,
  limitToBounds: false,
} as const;

// ============================================================================
// Canvas Drawing Constants
// ============================================================================

export const CANVAS_COLORS = {
  background: "#ffffff",
  gridLine: "#f0f0f0",
} as const;

export const CANVAS_CONFIG = {
  gridLineWidth: 1,
  contextAlpha: false,
  contextDesynchronized: true,
  imageSmoothingEnabled: false,
} as const;
