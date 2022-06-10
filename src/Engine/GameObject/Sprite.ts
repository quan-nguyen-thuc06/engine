import {GameObject} from "./GameObject"
import { Scene } from "../Scene/Scene";
export class Sprite extends GameObject{
    images: Array<HTMLImageElement>;
    degrees: number;
    frameCurrent: number;
    rate: number;
    adt: number;
    constructor(scene: Scene,images: Array<HTMLImageElement>){
        super(scene);
        console.log("images",images);
        this.images = images;
        this.degrees = 0;
        this.frameCurrent = 0;
        this.rate = 0;
        this.adt = 0;
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