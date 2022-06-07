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
        // this.loader.addImage("../Images/bird/frame-1.png","bird0");
        // this.loader.addImage("../Images/bird/frame-2.png","bird1");
        // this.loader.addImage("../Images/bird/frame-3.png","bird2");
        // this.loader.addImage("../Images/bird/frame-4.png","bird3");
        // this.loader.addImage("../Images/bird/frame-5.png","bird4");
        // this.loader.addImage("../Images/bird/frame-6.png","bird5");
        // this.loader.addImage("../Images/bird/frame-7.png","bird6");
        // this.loader.addImage("../Images/bird/frame-8.png","bird7");
        // this.loader.addImage("../Images/pipe/pipe-green.png","pipe");
        // this.loader.addImage("../Images/gameStart/message.png","message");
        // this.loader.addImage("../Images/ground/base.png","ground");
        // this.loader.addImage("../Images/panelGameOver/gameover.png","gameover");
        // this.loader.addImage("../Images/panelGameOver/replay-button.png","replayButton");
        // this.loader.addImage("../Images/background/background-night.png","background");
    }
    
    start(render: Renderer){
        console.log('start');
        this.processInput.handleInput(this.sceneManager, render);
        requestAnimationFrame(()=>this.loop(render));
    }
    
    loop(render: Renderer){
        console.log('lasknmlaksmdklasmd')
        const time = window.performance.now();
        const delta = time - this.lastTime;
        this.sceneManager.scenes[this.sceneManager.currentScene].update(time,delta);
        this.sceneManager.scenes[this.sceneManager.currentScene].render(render);
        this.lastTime = time;
        requestAnimationFrame(()=>this.loop(render));
    }
}