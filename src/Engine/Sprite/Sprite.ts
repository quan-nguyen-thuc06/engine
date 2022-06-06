import {GameObject} from "../GameObject/GameObject"
export class Sprite extends GameObject{
    images: Array<string>;
    degrees: number;
    fameCurrent: number;
    constructor(x: number, y: number, width: number, height: number, images: Array<string>,degrees: number,name: string){
        super(x, y, width, height,name);
        this.images = images;
        this.degrees = degrees;
        this.fameCurrent = 0;
    }
    update(time: number, deltaTime:number){}
}