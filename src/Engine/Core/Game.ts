import { SceneManager } from "../Scene/SceneManager";
import { Renderer } from "../Renderer/Renderer";
import { ListenInput } from "../ProcessInput/ListenInput";
import {ImageLoader } from "../ImageLoader/ImageLoader";
export class Game{
    sceneManager!: SceneManager;
    lastTime: number;
    listenInput: ListenInput;
    loader: ImageLoader;
    render!: Renderer;
    constructor(){
        this.lastTime = 0;
        this.listenInput = new ListenInput();
        this.loader = new ImageLoader();
    }
    
    start(render: Renderer, sceneManager: SceneManager){
        this.sceneManager = sceneManager;
        this.render = render;
        this.listenInput.handleInput(this.sceneManager!, render);
        requestAnimationFrame(()=>this.loop());
    }
    
    loop(){
        const time = window.performance.now();
        const delta = time - this.lastTime;
        var indexScene = this.sceneManager!.currentScene; // index of Currentscene
        var GameObject = this.sceneManager!.scenes[indexScene].gameObjects; // gameObjects of scene
        this.sceneManager!.scenes[indexScene].update(time,delta);
        this.render.renderObject(GameObject);
        this.lastTime = time;
        requestAnimationFrame(()=>this.loop());
    }
}