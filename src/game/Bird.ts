import { Sprite } from "../Engine/Sprite/Sprite";

import {Scene} from "../Engine/Scene/Scene"
export class Bird extends Sprite {
    gravity : number;
    speed : number; 
    constructor(x: number, y: number, width: number, height: number,degrees: number,gravity: number,rate: number, scene: Scene, z_index: number =0) {
        var images:Array<HTMLImageElement> = [];
        // console.log("loader", scene.game.loader);
        for (var i = 0; i <8;i++){
            let name =  "bird" + i;
            images.push(scene.game.loader.getImage(name) as HTMLImageElement);
        } 
        super(x, y, width, height,images,degrees,"bird",rate, z_index);
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
            if(this.degrees>40) this.degrees = 40;
        }
        else{
            this.degrees -= 1;
            if(this.degrees<-20) this.degrees = -20;
            this.playAnimation(time, deltaTime);
        }
    }

    fly(){
        this.speed = -8;
    }
    reset(){
        super.reset();
        this.speed = 0;
    }
}