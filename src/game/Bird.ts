import { Sprite } from "../Engine/GameObject/Sprite";

import {Scene} from "../Engine/Scene/Scene"
export class Bird extends Sprite {
    gravity : number;
    speed : number; 
    constructor(scene: Scene) {
        var images:Array<HTMLImageElement> = [];
        // console.log("loader", scene.game.loader);
        for (var i = 0; i <8;i++){
            let name =  "bird" + i;
            images.push(scene.sceneManager.game.loader.getImage(name) as HTMLImageElement);
        } 
        super(scene,images);
        this.name = "bird";
        this.gravity = 0;
        this.speed = 0;
        this.rate = 1.0/30*1000;
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