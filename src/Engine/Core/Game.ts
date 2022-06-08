import { SceneManager } from "../Scene/SceneManager";
import { Renderer } from "../Renderer/Renderer";
import { ProcessInput } from "../ProcessInput/ProcessInput";
import {ImageLoader } from "../ImageLoader/ImageLoader";
export class Game{
    sceneManager: SceneManager;
    lastTime: number;
    processInput: ProcessInput;
    loader: ImageLoader;
    constructor(sceneManager: SceneManager){
        this.sceneManager = sceneManager;
        this.lastTime = 0;
        this.processInput = new ProcessInput();
        this.loader = new ImageLoader();
    }
    
    start(render: Renderer){
        this.processInput.handleInput(this.sceneManager, render);
        requestAnimationFrame(()=>this.loop(render));
    }
    
    loop(render: Renderer){
        const time = window.performance.now();
        const delta = time - this.lastTime;
        this.sceneManager.scenes[this.sceneManager.currentScene].update(time,delta);
        this.sceneManager.scenes[this.sceneManager.currentScene].render(render);
        this.lastTime = time;
        requestAnimationFrame(()=>this.loop(render));
    }
}