import {GameObject} from "../GameObject/GameObject"
export class ImageObject extends GameObject{
    image: string;
    degrees: number;
    constructor(x: number, y: number, width: number, height: number,image: string, degrees: number, name: string){
        super(x, y, width, height,name);
        this.image = image;
        this.degrees = degrees;
    }
    update(time: number, deltaTime:number){}
}