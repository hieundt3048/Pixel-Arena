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
        const res = await http.post("/pixels/paint", data)

        console.log(res.data)
    }
    catch(e) { console.error(e) }
}