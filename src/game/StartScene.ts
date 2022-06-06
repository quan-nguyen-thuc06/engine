import {Scene} from '../Engine/Scene/Scene';
import { ImageObject } from '../Engine/ImageObject/ImageObject';

export class StartScreen extends Scene {
    background: ImageObject;
    ground: ImageObject;
    imgStart: ImageObject;
    constructor(){
        super();
        this.background =new ImageObject(0,0,700,800,"../Images/background-night.png",0,"background");
        this.ground = new ImageObject(0,670,700,150,"../Images/base.png",0,"ground");
        this.imgStart = new ImageObject(50,20,500,700,"../Images/message.png",0,"");
        this.addChild([this.background,this.ground,this.imgStart],[],[]);
    }
    update(time: number, delta: number){
        if(this.inputKey==="Enter") {
            this.inputKey = "";
            return 1;
        }
        return 0;
    }
}