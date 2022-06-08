import { ImageObject} from "../ImageObject/ImageObject";
export class ButtonObject extends ImageObject{
    constructor(x: number, y: number, width: number, height: number,image: HTMLImageElement | null, degrees: number, name: string, z_index: number =0){
        super(x, y, width, height,image, degrees, name,z_index);
    }
    isInside(pos: Array<number>){
        if(pos.length < 2) return false;
        return pos[0] > this.x && pos[0] < this.x+this.width && pos[1] < this.y+this.height && pos[1] > this.y;
    }    
}