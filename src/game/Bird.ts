import { Sprite } from "../Engine/Sprite/Sprite";
var audio = new Audio("../audio/swoosh.mp3");
import {Scene} from "../Engine/Scene/Scene"
export class Bird extends Sprite {
    gravity : number;
    speed : number; 
    constructor(x: number, y: number, width: number, height: number,degrees: number,gravity: number,rate: number, scene: Scene) {
        var images:Array<HTMLImageElement> = [];
        // console.log("loader", scene.game.loader);
        for (var i = 0; i <8;i++){
            let name =  "bird" + i;
            images.push(scene.game.loader.getImage(name) as HTMLImageElement);
        } 
        super(x, y, width, height,images,degrees,"bird",rate);
        this.gravity = gravity;
        this.speed = 0;
    }
    update(time: number, deltaTime:number){
        this.y += (this.speed + 0.5*this.gravity)*(deltaTime/16.67);
        this.speed += this.gravity*(deltaTime/16.67);
        if(this.y < 0)
            this.y = 0;
        if(this.speed>0){
            this.degrees += 1;
            if(this.degrees>20) this.degrees = 20;
        }
        else{
            this.degrees -= 1;
            if(this.degrees<-20) this.degrees = -20;
            this.playAnimation(time, deltaTime);
        }
    }

    fly(deltaTime: number){
        // audio.play(); 
        // audio.playbackRate = 2;
        this.speed = -10;
    }
    reset(){
        super.reset();
        this.speed = 0;
    }
}