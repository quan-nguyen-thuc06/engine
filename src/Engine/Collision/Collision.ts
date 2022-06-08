import {GameObject} from "../GameObject/GameObject";
export class Collision{
    handleCollision(obj1 : GameObject, obj2 : GameObject){
        if(obj1.x+ obj1.width + 1>=obj2.x && obj1.x+1 <= obj2.x + obj2.width){
            if(obj1.y+ obj1.height + 1>=obj2.y && obj1.y<= obj2.y + obj2.height){
                return true;
            }
        }
        return false;
    }
}