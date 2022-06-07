import {GameObject} from "../GameObject/GameObject"
export class Sprite extends GameObject{
    images: Array<HTMLImageElement>;
    degrees: number;
    fameCurrent: number;
    rate: number;
    adt: number;
    constructor(x: number, y: number, width: number, height: number, images: Array<HTMLImageElement>,degrees: number,name: string, fps: number){
        super(x, y, width, height,name);
        console.log("images",images);
        this.images = images;
        this.degrees = degrees;
        this.fameCurrent = 0;
        this.rate = 1.0/fps *1000;
        this.adt = 0;
    }
    update(time: number, deltaTime:number){

    }

    playAnimation(time: number, deltaTime:number) {
        this.adt += deltaTime
        if(this.adt>=this.rate){
            this.adt -= this.rate;
            this.fameCurrent+=1;
            if(this.fameCurrent>this.images.length-1){
                this.fameCurrent = 0;
            }
        }
    }
}