import {GameObject} from "../GameObject/GameObject"
import { Scene } from "../Scene/Scene";
export class TextObject extends GameObject{
    content: string;
    font: string;
    color: string;
    constructor(scene: Scene) {
        super(scene);
        this.content = "";
        this.font = "";
        this.color = "";
    }
    setContent(content: string){
        this.content = content;
    }
}