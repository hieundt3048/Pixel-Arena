import { http } from "./http";

interface PixelDataRequest {
  x: number;
  y: number;
  color: string;
  updatedBy: string;
  mode: string;
}

export const drawPixel = async (data: PixelDataRequest) => {
  try {
    const res = await http.post("/pixels/paint", data);

    console.log(res.data);
  } catch (e) {
    console.error(e);
  }
};

export class Canvas {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private pixelSize: number;
  private canvasSize: number;

  constructor(
    canvas: HTMLCanvasElement,
    canvasSize: number,
    pixelSize: number
  ) {
    this.canvas = canvas;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Cannot find canvas context");

    this.ctx = ctx;
    this.pixelSize = pixelSize;
    this.canvasSize = canvasSize * pixelSize;
  }

  initialize() {
    this.canvas.width = this.canvasSize;
    this.canvas.height = this.canvasSize;

    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.pixelSize, this.pixelSize);
  }

  paint(e: React.MouseEvent<HTMLCanvasElement>) {
    const rect = this.canvas.getBoundingClientRect();

    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;

    const x = Math.floor(((e.clientX - rect.left) * scaleX) / this.pixelSize);
    const y = Math.floor(((e.clientY - rect.top) * scaleY) / this.pixelSize);

    console.log(`Scale X: ${scaleX} - Scale Y: ${scaleY}`);
    console.log(`X: ${x} - Y: ${y}`);
  }
}
