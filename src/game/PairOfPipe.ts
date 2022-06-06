import { ImageObject } from "../Engine/ImageObject/ImageObject";
var pipeWidth = 80;
var blanks = 300;
const pipeHeight = 350;
export class PairOfPipe{
    Pipes: Array<ImageObject>;
    private speed: number;
    constructor(x:number, y:number, image: string,speed: number){
        var PipeUp = new ImageObject(x,y,pipeWidth,pipeHeight,image,180,"pipe");
        var PipeDown = new ImageObject(x,y+pipeHeight+blanks,pipeWidth,pipeHeight,image,0,"pipe");
        var checkScore = new ImageObject(x+pipeWidth,y+pipeHeight,10,blanks," ",0,"checkScore");
        this.Pipes= [PipeUp,PipeDown,checkScore];
        this.speed = speed;
    }
    update(){
        for(var i = 0; i <3;i++){
            this.Pipes[i].x -= this.speed;
        }
    }
}