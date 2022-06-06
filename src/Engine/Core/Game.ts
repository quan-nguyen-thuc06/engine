import { SceneManager } from "../Scene/SceneManager";
import { Renderer } from "../Renderer/Renderer";
export class Game{
    sceneManager: SceneManager;
    lastTime: number | null;
    constructor(sceneManager: SceneManager){
        this.sceneManager = sceneManager;
        this.lastTime = null;
    }
    
    start(render: Renderer){
        document.addEventListener('keyup',(e)=>this.sceneManager.scenes[this.sceneManager.currentScene].handleInputEvent(e));
        document.addEventListener('click',(e)=>this.sceneManager.scenes[this.sceneManager.currentScene].handleMouseDown(e,render.canvas));
        requestAnimationFrame(()=>this.loop(render));
    }
    loop(render: Renderer){
        var indexScene = this.sceneManager.currentScene;
        const time = window.performance.now();
        if(this.lastTime == null){
            indexScene = this.sceneManager.scenes[this.sceneManager.currentScene].update(time, 0);
            this.sceneManager.scenes[this.sceneManager.currentScene].render(render);
            
        }
        else{
            const delta = time - this.lastTime;
            indexScene = this.sceneManager.scenes[this.sceneManager.currentScene].update(time,delta);
            this.sceneManager.scenes[this.sceneManager.currentScene].render(render);
        }
        if(indexScene!=this.sceneManager.currentScene){
            this.loadScene(indexScene);
            this.sceneManager.scenes[indexScene].resetScene();
        }
        this.lastTime = time;
        requestAnimationFrame(()=>this.loop(render));
    }
    loadScene(indexScene: number){
        this.sceneManager.currentScene = indexScene;
    }
}