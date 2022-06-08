import { ImageObject} from "../ImageObject/ImageObject";
export class ButtonObject extends ImageObject{
    constructor(image: HTMLImageElement | null){
        super(image);
    }
    isInside(pos: Array<number>){
        if(pos.length < 2) return false;
        return pos[0] > this.x && pos[0] < this.x+this.width && pos[1] < this.y+this.height && pos[1] > this.y;
    }    
}