import { SceneManager } from "../Scene/SceneManager";
import { Renderer } from "../Renderer/Renderer";
import { ListenInput } from "../ProcessInput/ListenInput";
import {ImageLoader } from "../ImageLoader/ImageLoader";
export class Game{
    sceneManager!: SceneManager;
    lastTime: number;
    listenInput: ListenInput;
    loader: ImageLoader;
    constructor(){
        this.lastTime = 0;
        this.listenInput = new ListenInput();
        this.loader = new ImageLoader();
    }
    
    start(render: Renderer, sceneManager: SceneManager){
        this.sceneManager = sceneManager;
        this.listenInput.handleInput(this.sceneManager!, render);
        requestAnimationFrame(()=>this.loop(render));
    }
    
    loop(render: Renderer){
        const time = window.performance.now();
        const delta = time - this.lastTime;
        this.sceneManager!.scenes[this.sceneManager!.currentScene].update(time,delta);
        this.sceneManager!.scenes[this.sceneManager!.currentScene].render(render);
        this.lastTime = time;
        requestAnimationFrame(()=>this.loop(render));
    }
}