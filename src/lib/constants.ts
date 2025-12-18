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
