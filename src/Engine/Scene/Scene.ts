import { ImageObject } from "../GameObject/ImageObject";
import { Sprite } from "../GameObject/Sprite";
import { TextObject } from "../GameObject/TextObject";
import {Renderer} from "../Renderer/Renderer";
import {GameObject} from "../GameObject/GameObject";
import { ProcessInput } from "../ProcessInput/ProcessInput";
import { Collision } from "../Collision/Collision";
import { SceneManager } from "./SceneManager";
export class Scene{
    gameObjects: GameObject[];
    processInput: ProcessInput;
    collision: Collision;
    sceneManager : SceneManager;
    constructor(sceneManager : SceneManager){
        this.gameObjects = [];
        this.processInput = new ProcessInput();
        this.collision = new Collision();
        this.sceneManager = sceneManager;
    }
    resetScene(){
        for (var i = 0; i <this.gameObjects.length; i++) {
            this.gameObjects[i].reset();
        }
    }
    addChild(gameObjects: GameObject[]){
        gameObjects.map((gameObject)=>{this.gameObjects.push(gameObject)})
    }

    // xu ly logic
    update(time: number, delta: number) {
        for (var i = 0; i <this.gameObjects.length; i++) {
            var obj = this.gameObjects[i];
            if (obj instanceof ImageObject || obj instanceof Sprite)
                obj.update(time, delta);
        }
    }
}