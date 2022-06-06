import { Scene } from "./Scene";
export class SceneManager {
    scenes: Scene[];
    currentScene: number;
    
    constructor(){
        this.scenes = [];
        this.currentScene = 0;
    }
    addScene(scene: Scene){
        this.scenes.push(scene)
    }
    update(){}
    render(){}
}