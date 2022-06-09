import {GameObject} from "../GameObject/GameObject"
import { Scene } from "../Scene/Scene";
export class ImageObject extends GameObject{
    image: HTMLImageElement;
    degrees: number;
    constructor(scene: Scene, key: string){
        super(scene);
        if(key=="null")
            this.image = new Image();
        else this.image = this.scene.sceneManager.game.loader.getImage(key);
        this.degrees = 0;
    }
    update(time: number, deltaTime:number){}
}