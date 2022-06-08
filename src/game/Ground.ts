import { ImageObject } from "../Engine/ImageObject/ImageObject";
import {Game} from "../Engine/Core/Game";
class Ground{
    images: Array<ImageObject>;
    speed: number;
    constructor(speed: number, game: Game){
        var image = game.loader.getImage("ground");
        var imageObject1 = new ImageObject(0,670,650,150,image as HTMLImageElement,0,"ground",2);
        var imageObject2 = new ImageObject(649,670,650,150,image as HTMLImageElement,0,"ground",2);
        this.images = [imageObject1,imageObject2];
        this.speed = speed;
    }
    update(time: number, deltaTime: number){
        for(var i=0;i<this.images.length;i++){
            this.images[i].x -= this.speed*(deltaTime/16.67);
            if(this.images[i].x < - (650)){
                this.images[i].x = this.images[Math.abs(i-1)].x+649;
            }
        } 
    }
    getComponent(){
        return this.images;
    }
    reset(){
        for(var i=0;i<this.images.length;i++){
            this.images[i].reset();
        } 
    }
}

export {Ground};