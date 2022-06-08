import { ImageObject } from "../ImageObject/ImageObject";
import { Sprite } from "../Sprite/Sprite";
import { TextObject } from "../TextObject/TextObject";
import {Renderer} from "../Renderer/Renderer";
import {GameObject} from "../GameObject/GameObject";
import { ProcessInput } from "../ProcessInput/ProcessInput";
import { Game } from "../Core/Game";
import { Collision } from "../Collision/Collision";
export class Scene{
    imageObjects: ImageObject[];
    sprites: Sprite[];
    textObjects: TextObject[]; 
    processInput: ProcessInput;
    collision: Collision;
    game: Game;
    constructor(game: Game){
        this.imageObjects = [];
        this.sprites = [];
        this.textObjects = [];
        this.processInput = new ProcessInput();
        this.collision = new Collision();
        this.game = game;
    }
    resetScene(){
        for(var i = 0; i < this.imageObjects.length;i++){
            this.imageObjects[i].reset();
        }
        for (var i = 0; i <this.sprites.length; i++) {
            this.sprites[i].reset();
        }
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
}