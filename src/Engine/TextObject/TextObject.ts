import {GameObject} from "../GameObject/GameObject"
export class TextObject extends GameObject{
    content: string;
    font: string;
    color: string;
    constructor(x: number, y: number, name: string , content: string, font: string, color = "black") {
        super(x, y, 0, 0, name);
        this.content = content;
        this.font = font;
        this.color = color;
    }
    setContent(content: string){
        this.content = content;
    }
}