import {Scene} from '../Engine/Scene/Scene';
import { ImageObject } from '../Engine/ImageObject/ImageObject';
import { ButtonObject } from '../Engine/ButtonObject/ButtonObject';
import {Ground} from "./Ground"
import { Game } from '../Engine/Core/Game';

export class StartScene extends Scene {
    background: ImageObject;
    ground: Ground;
    imgStart: ImageObject;
    buttonStart: ButtonObject
    constructor(game: Game){
        super(game);
        this.background =new ImageObject(0,0,700,800,game.loader.getImage("background") as HTMLImageElement,0,"background");
        this.imgStart = new ImageObject(50,20,500,700,game.loader.getImage("message") as HTMLImageElement,0,"");
        this.buttonStart = new ButtonObject(0,0,700,800,null,0,"buttonStart");
        this.ground = new Ground(2,game)
        var imageObjects = [this.background].concat(this.ground.getComponent()["imageObjects"]);
        imageObjects.push(this.imgStart);
        this.addChild(imageObjects,[],[]);
    }
    update(time: number, deltaTime: number){
        this.ground.update(time, deltaTime);
        if(this.inputKey === "Enter"||this.inputKey === "Space" ||(this.mouseEvent!=null && this.buttonStart.isInside(this.mouseEvent))) {
            this.game.sceneManager.switchScene(1)
            return 1;
        }

        return 0;
    }
}

// var startScene = new StartScene();
// export {startScene};