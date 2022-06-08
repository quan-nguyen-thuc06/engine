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
        this.background =new ImageObject(game.loader.getImage("background") as HTMLImageElement);
        // set attributes
        this.background.width = 700;
        this.background.height = 800;
        this.background.name = "background"

        this.imgStart = new ImageObject(game.loader.getImage("message") as HTMLImageElement);
        // set attributes
        this.imgStart.width =500,
        this.imgStart.height = 700;
        this.imgStart.x = 50;
        this.imgStart.y = 20;
        this.imgStart.z_index = 2;

        this.buttonStart = new ButtonObject(null);
        // set attributes
        this.buttonStart.width = 700;
        this.buttonStart.height = 800;
        this.buttonStart.name = "buttonStart";

        this.ground = new Ground(2,game)
        var imageObjects = [this.background].concat(this.ground.getComponent());
        imageObjects.push(this.imgStart);
        this.addChild(imageObjects);
    }
    update(time: number, deltaTime: number){
        this.ground.update(time, deltaTime);
        if(this.processInput.inputKey === "Enter"||this.processInput.inputKey === "Space" ||(this.processInput.mouseEvent!=null && this.buttonStart.isInside(this.processInput.mouseEvent))) {
            this.game.sceneManager.switchScene(1)
            return 1;
        }

        return 0;
    }
}
