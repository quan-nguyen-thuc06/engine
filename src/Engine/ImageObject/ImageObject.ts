import {GameObject} from "../GameObject/GameObject"
export class ImageObject extends GameObject{
    image: HTMLImageElement;
    degrees: number;
    constructor(x: number, y: number, width: number, height: number,image: HTMLImageElement |null, degrees: number, name: string){
        super(x, y, width, height,name);
        if(image==null)
            this.image = new Image();
        else this.image = image;
        this.degrees = degrees;
    }
    update(time: number, deltaTime:number){}
}