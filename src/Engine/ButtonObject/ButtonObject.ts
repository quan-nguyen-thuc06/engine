import { ImageObject} from "../ImageObject/ImageObject";
import { Scene } from "../Scene/Scene";
export class ButtonObject extends ImageObject{
    constructor(scene: Scene, key: string){
        super(scene,key);
    }
    isInside(pos: Array<number>){
        if(pos.length < 2) return false;
        return pos[0] > this.x && pos[0] < this.x+this.width && pos[1] < this.y+this.height && pos[1] > this.y;
    }    
}