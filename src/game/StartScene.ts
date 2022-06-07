import {Scene} from '../Engine/Scene/Scene';
import { ImageObject } from '../Engine/ImageObject/ImageObject';
import { ButtonObject } from '../Engine/ButtonObject/ButtonObject';
import {ground} from "./Ground"
const fps = 60;
class StartScene extends Scene {
    rate: number;
    adt: number;    //accumulated delta time
    background: ImageObject;
    ground = ground;
    imgStart: ImageObject;
    buttonStart: ButtonObject
    constructor(){
        super();
        this.rate = 1.0/fps*1000;
        this.adt = 0.0;
        this.background =new ImageObject(0,0,700,800,"../Images/background-night.png",0,"background");
        this.imgStart = new ImageObject(50,20,500,700,"../Images/message.png",0,"");
        this.buttonStart = new ButtonObject(0,0,700,800,"",0,"buttonStart");

        var imageObjects = [this.background].concat(this.ground.getComponent()["imageObjects"]);
        imageObjects.push(this.imgStart);
        this.addChild(imageObjects,[],[]);
    }
    update(time: number, deltaTime: number){
        this.adt += deltaTime;
        if(this.adt>=this.rate){
            this.adt -= this.rate;
            this.ground.update();
        }
        if(this.inputKey === "Enter"||(this.mouseEvent!=null && this.buttonStart.isInside(this.mouseEvent))) {
            this.inputKey = "";
            return 1;
        }

        return 0;
    }
}

var startScene = new StartScene();
export {startScene};