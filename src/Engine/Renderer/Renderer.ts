import { ImageObject } from "../ImageObject/ImageObject";
import { Sprite } from "../Sprite/Sprite";
import { TextObject } from "../TextObject/TextObject";

export class Renderer{
    canvas: HTMLCanvasElement;
    constructor(canvas: HTMLCanvasElement){
        this.canvas = canvas;
    }
    drawImage(imageObject: ImageObject){
        const ctx = this.canvas.getContext('2d');
        if(ctx!=null){
            ctx.save();
            ctx.translate(imageObject.x + imageObject.width/2,imageObject.y + imageObject.height/2)
            ctx.rotate(imageObject.degrees*Math.PI/180);
            ctx.drawImage(imageObject.image,-imageObject.width/2, -imageObject.height/2,imageObject.width,imageObject.height);
            ctx.restore();
        }
    }
    drawSprite(sprite: Sprite){
        const ctx = this.canvas.getContext('2d');
        if(ctx!=null){
            ctx.save();
            ctx.translate(sprite.x + sprite.width/2,sprite.y + sprite.height/2)
            ctx.rotate(sprite.degrees*Math.PI/180);
            ctx.drawImage(sprite.images[sprite.frameCurrent],-sprite.width/2, -sprite.height/2,sprite.width,sprite.height);
            ctx.restore();
        }
    }
    drawText(text: TextObject){
        const ctx = this.canvas.getContext('2d');
        if(ctx!=null){
            ctx.font = text.font;
            ctx.fillStyle = text.color;
            ctx.fillText(text.content,text.x,text.y);
        }
    }
}