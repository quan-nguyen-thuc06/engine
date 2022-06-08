import {SceneManager} from '../Scene/SceneManager';
import {Renderer} from '../Renderer/Renderer'
export class ListenInput{
    handleInput(sceneManager: SceneManager, render: Renderer){
        document.addEventListener('keydown',(e)=>sceneManager.scenes[sceneManager.currentScene].processInput.onKeyDown(e));
        document.addEventListener('keyup',(e)=>sceneManager.scenes[sceneManager.currentScene].processInput.onKeyUp());
        document.addEventListener('mousedown',(e)=>sceneManager.scenes[sceneManager.currentScene].processInput.onMouseDown(e,render.canvas));
        document.addEventListener('mouseup',(e)=>sceneManager.scenes[sceneManager.currentScene].processInput.onMouseUp());
    }
}