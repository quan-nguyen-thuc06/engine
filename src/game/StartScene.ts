import {Scene} from '../Engine/Scene/Scene';
import { ImageObject } from '../Engine/GameObject/ImageObject';
import { ButtonObject } from '../Engine/GameObject/ButtonObject';
import {Ground} from "./Ground"
import { SceneManager } from '../Engine/Scene/SceneManager';

export class StartScene extends Scene {
    background: ImageObject;
    ground: Ground;
    imgStart: ImageObject;
    buttonStart: ButtonObject
    constructor(sceneManager : SceneManager){
        super(sceneManager);
        this.background =new ImageObject(this,"background");
        // set attributes
        this.background.width = 700;
        this.background.height = 800;
        this.background.name = "background"

        this.imgStart = new ImageObject(this,"message");
        // set attributes
        this.imgStart.width =500,
        this.imgStart.height = 700;
        this.imgStart.x = 50;
        this.imgStart.y = 20;
        this.imgStart.z_index = 2;

        this.buttonStart = new ButtonObject(this,"null");
        // set attributes
        this.buttonStart.width = 700;
        this.buttonStart.height = 800;
        this.buttonStart.name = "buttonStart";

        this.ground = new Ground(this,2)
        var imageObjects = [this.background].concat(this.ground.getComponent());
        imageObjects.push(this.imgStart);
        this.addChild(imageObjects);
    }
    update(time: number, deltaTime: number){
        this.ground.update(time, deltaTime);
        if(this.processInput.inputKey === "Enter"||this.processInput.inputKey === "Space" ||(this.processInput.mouseEvent!=null && this.buttonStart.isInside(this.processInput.mouseEvent))) {
            this.sceneManager.switchScene(1)
            return 1;
        }

        return 0;
    }
}
