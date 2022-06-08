import {GameObject} from "../GameObject/GameObject"
export class Sprite extends GameObject{
    images: Array<HTMLImageElement>;
    degrees: number;
    frameCurrent: number;
    rate: number;
    adt: number;
    constructor(x: number, y: number, width: number, height: number, images: Array<HTMLImageElement>,degrees: number,name: string, fps: number, z_index: number =0){
        super(x, y, width, height,name,true,z_index);
        console.log("images",images);
        this.images = images;
        this.degrees = degrees;
        this.frameCurrent = 0;
        this.rate = 1.0/fps *1000;
        this.adt = 0;
    }
    update(time: number, deltaTime:number){

    }

    playAnimation(time: number, deltaTime:number) {
        this.adt += deltaTime
        if(this.adt>=this.rate){
            this.adt -= this.rate;
            this.frameCurrent +=1;
            if(this.frameCurrent>this.images.length-1){
                this.frameCurrent = 0;
            }
        }
    }
}