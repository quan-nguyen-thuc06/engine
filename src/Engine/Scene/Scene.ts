import { ImageObject } from "../ImageObject/ImageObject";
import { Sprite } from "../Sprite/Sprite";
import { TextObject } from "../TextObject/TextObject";
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

    render(render: Renderer){
        // sort gameObjects following z_index
        this.gameObjects.sort((a,b)=>{
            return a.z_index - b.z_index;
        })
        for (var i = 0; i <this.gameObjects.length; i++) {
            if(this.gameObjects[i].getActive()){
                const obj = this.gameObjects[i]; 
                if( obj instanceof ImageObject)
                    render.drawImage(obj);
                else if(obj instanceof Sprite)
                    render.drawSprite(obj);
                else if(obj instanceof TextObject)
                    render.drawText(obj);
            }
        }
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