import { ImageObject } from "../ImageObject/ImageObject";
import { Sprite } from "../Sprite/Sprite";
import { TextObject } from "../TextObject/TextObject";
import {Renderer} from "../Renderer/Renderer";
import {GameObject} from "../GameObject/GameObject";
export class Scene{
    imageObjects: ImageObject[];
    sprites: Sprite[];
    textObjects: TextObject[]; 
    inputKey : String;
    mouseEvent : Array<number> | null;
    constructor(){
        this.imageObjects = [];
        this.sprites = [];
        this.textObjects = [];
        this.inputKey = "";
        this.mouseEvent = null;
    }
    resetScene(){
        this.imageObjects = [];
        this.sprites = [];
        this.textObjects = [];
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
            render.drawImage(imageObject);
        })
        this.sprites.map((sprite)=>{
            render.drawSprite(sprite);
        })
        this.textObjects.map((txt)=>{
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
        return 1;
    }
    handleInputEvent(e: KeyboardEvent){
        this.inputKey = e.code;
        console.log(this.inputKey);
    }
    handleMouseDown(e: MouseEvent, canvas: HTMLCanvasElement) {
        var rect = canvas.getBoundingClientRect();
        var mouseX = e.clientX - rect.left;
        var mouseY = e.clientY - rect.top;    
        this.mouseEvent = [mouseX, mouseY];
        // this.mouseEvent.clientX = 3;
        console.log(this.mouseEvent);
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