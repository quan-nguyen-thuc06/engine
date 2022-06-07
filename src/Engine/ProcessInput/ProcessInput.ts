import {SceneManager} from '../Scene/SceneManager';
import {Renderer} from '../Renderer/Renderer'
export class ProcessInput{
    handleInput(sceneManager: SceneManager, render: Renderer){
        document.addEventListener('keydown',(e)=>sceneManager.scenes[sceneManager.currentScene].onKeyDown(e));
        document.addEventListener('keyup',(e)=>sceneManager.scenes[sceneManager.currentScene].onKeyUp());
        document.addEventListener('mousedown',(e)=>sceneManager.scenes[sceneManager.currentScene].onMouseDown(e,render.canvas));
        document.addEventListener('mouseup',(e)=>sceneManager.scenes[sceneManager.currentScene].onMouseUp());
    }
}