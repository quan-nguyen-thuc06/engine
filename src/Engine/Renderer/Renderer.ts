import { GameObject } from "../GameObject/GameObject";
import { ImageObject } from "../GameObject/ImageObject";
import { Sprite } from "../GameObject/Sprite";
import { TextObject } from "../GameObject/TextObject";

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

    renderObject(gameObjects: GameObject[]){
        gameObjects.sort((a,b)=>{
            return a.z_index - b.z_index;
        })
        for (var i = 0; i <gameObjects.length; i++) {
            if(gameObjects[i].getActive()){
                const obj = gameObjects[i]; 
                if( obj instanceof ImageObject)
                    this.drawImage(obj);
                else if(obj instanceof Sprite)
                    this.drawSprite(obj);
                else if(obj instanceof TextObject)
                    this.drawText(obj);
            }
        }
    }
}