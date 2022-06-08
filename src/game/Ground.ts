import { ImageObject } from "../Engine/ImageObject/ImageObject";
import {Game} from "../Engine/Core/Game";
class Ground{
    images: Array<ImageObject>;
    speed: number;
    constructor(speed: number, game: Game){
        var image = game.loader.getImage("ground");
        var imageObject1 = new ImageObject(image as HTMLImageElement);
        imageObject1.name = "ground";
        imageObject1.z_index =2;
        imageObject1.y = 670;
        imageObject1.width = 650;
        imageObject1.height = 150;
        imageObject1.defaultPosition= [0,670];

        var imageObject2 = new ImageObject(image as HTMLImageElement);
        imageObject2.name = "ground";
        imageObject2.z_index =2;
        imageObject2.x = 649;
        imageObject2.y = 670;
        imageObject2.width = 650;
        imageObject2.height = 150;
        imageObject2.defaultPosition= [649,670];

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