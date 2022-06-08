import {GameObject} from "../GameObject/GameObject"
export class ImageObject extends GameObject{
    image: HTMLImageElement;
    degrees: number;
    constructor(x: number = 0, y: number = 0, width: number, height: number,image: HTMLImageElement |null, degrees: number = 0, name: string, z_index: number =0){
        super(x, y, width, height,name,true,z_index);
        if(image==null)
            this.image = new Image();
        else this.image = image;
        this.degrees = degrees;
    }
    update(time: number, deltaTime:number){}
}