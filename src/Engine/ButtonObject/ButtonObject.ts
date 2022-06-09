import { ImageObject} from "../ImageObject/ImageObject";
import { Scene } from "../Scene/Scene";
export class ButtonObject extends ImageObject{
    constructor(scene: Scene, key: string){
        super(scene,key);
    }
    isInside(MousePos: Array<number>){
        if(MousePos.length < 2) return false;
        return MousePos[0] > this.x && MousePos[0] < this.x+this.width && MousePos[1] < this.y+this.height && MousePos[1] > this.y;
    }    
}