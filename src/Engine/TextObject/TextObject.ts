import {GameObject} from "../GameObject/GameObject"
export class TextObject extends GameObject{
    content: string;
    font: string;
    color: string;
    constructor() {
        super();
        this.content = "";
        this.font = "";
        this.color = "";
    }
    setContent(content: string){
        this.content = content;
    }
}