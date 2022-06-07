import { ImageObject } from "../ImageObject/ImageObject";
import { Sprite } from "../Sprite/Sprite";
import { TextObject } from "../TextObject/TextObject";
import {Renderer} from "../Renderer/Renderer";
import {GameObject} from "../GameObject/GameObject";
import { SceneManager } from "./SceneManager";
import { Game } from "../Core/Game";

export class Scene{
    imageObjects: ImageObject[];
    sprites: Sprite[];
    textObjects: TextObject[]; 
    inputKey : String;
    mouseEvent : Array<number> | null;
    game: Game;
    constructor(game: Game){
        this.imageObjects = [];
        this.sprites = [];
        this.textObjects = [];
        this.inputKey = "";
        this.mouseEvent = null;
        this.game = game;
    }
    resetScene(){
        for(var i = 0; i < this.imageObjects.length;i++){
            this.imageObjects[i].reset();
        }
        for (var i = 0; i <this.sprites.length; i++) {
            this.sprites[i].reset();
        }
        this.inputKey = "";
    }
    addChild(imageObjects: ImageObject[],sprites: Sprite[], textObjects: TextObject[]){
        imageObjects.map(imageObject => this.imageObjects.push(imageObject));
        sprites.map(sprite => this.sprites.push(sprite));
        textObjects.map(textObject => this.textObjects.push(textObject));
    }
    removeChild(imageObjects: ImageObject[],sprites: Sprite[]){
        imageObjects.map(imageObject => {
            this.imageObjects = this.imageObjects.filter((imb)=>{
                return imb!= imageObject;
            })
        })
        sprites.map(sprite => {
            this.sprites = this.sprites.filter((spt)=>{
                return spt!= sprite;
            })
        })
    }

    render(render: Renderer){
        this.imageObjects.map((imageObject)=>{
            if(imageObject.getActive())
                render.drawImage(imageObject);
        })
        this.sprites.map((sprite)=>{
            if(sprite.getActive())
                render.drawSprite(sprite);
        })
        this.textObjects.map((txt)=>{
            if(txt.getActive())
                render.drawText(txt);
        })
    }
    // xu ly logic
    update(time: number, delta: number) {
        for (var i = 0; i <this.imageObjects.length; i++) {
            this.imageObjects[i].update(time, delta);
        }
        for (var i = 0; i <this.sprites.length; i++) {
            this.sprites[i].update(time, delta);
        }
    }
    onKeyDown(e: KeyboardEvent){
        this.inputKey = e.code;
    }
    onKeyUp(){
        this.inputKey = "";
    }
    onMouseDown(e: MouseEvent, canvas: HTMLCanvasElement) {
        var rect = canvas.getBoundingClientRect();
        var mouseX = e.clientX - rect.left;
        var mouseY = e.clientY - rect.top;    
        this.mouseEvent = [mouseX, mouseY];
        console.log(this.mouseEvent);
    }
    onMouseUp() {
        this.mouseEvent = null;
    }
    Collision(obj1 : GameObject, obj2 : GameObject){
        if(obj1.x+ obj1.width>=obj2.x && obj1.x <= obj2.x + obj2.width){
            if(obj1.y+ obj1.height>=obj2.y && obj1.y <= obj2.y + obj2.height){
                return true;
            }
        }
        return false;
    }
}