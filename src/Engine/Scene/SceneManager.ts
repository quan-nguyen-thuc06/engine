import { Scene } from "./Scene";
import {Game} from "../Core/Game";
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
    switchScene(nextIndex: number) {
        this.scenes[this.currentScene].resetScene();
        this.currentScene = nextIndex;
    }
    update(){}
    render(){}
}