import { ImageObject } from "../Engine/ImageObject/ImageObject";

export class Ground{
    images: Array<ImageObject>;
    speed: number;
    constructor(speed: number){
        var image1 = new ImageObject(0,670,650,150,"../Images/base.png",0,"ground");
        var image2 = new ImageObject(649,670,650,150,"../Images/base.png",0,"ground");
        this.images = [image1,image2];
        this.speed = speed;
    }
    update(){
        for(var i=0;i<this.images.length;i++){
            this.images[i].x -= this.speed;
            if(this.images[i].x < - (650+20)){
                this.images[i].x = this.images[Math.abs(i-1)].x+640;
            }
        } 
    }
    getComponent(){
        return {
            "imageObjects": this.images,
            "sprites": [],
            "textObjects": []
        };
    }
    reset(){
        for(var i=0;i<this.images.length;i++){
            this.images[i].reset();
        } 
    }
}