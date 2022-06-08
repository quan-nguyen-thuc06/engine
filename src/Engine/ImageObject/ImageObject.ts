import {GameObject} from "../GameObject/GameObject"
export class ImageObject extends GameObject{
    image: HTMLImageElement;
    degrees: number;
    constructor(image: HTMLImageElement |null){
        super();
        if(image==null)
            this.image = new Image();
        else this.image = image;
        this.degrees = 0;
    }
    update(time: number, deltaTime:number){}
}