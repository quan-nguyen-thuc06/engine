import { ImageObject } from "../Engine/ImageObject/ImageObject";
import {Game} from "../Engine/Core/Game"
const blanks = 200;
const pipeHeight = 350;
const numPipe = 4;
const distance = 250;
const pipeWidth = 80;
class PairOfPipe{
    Pipes: Array<ImageObject>;
    private speed: number;

    constructor(x:number, y:number, game: Game,speed: number){
        var PipeUp = new ImageObject(x,y,pipeWidth,pipeHeight,game.loader.getImage("pipe") as HTMLImageElement,180,"pipe");
        var PipeDown = new ImageObject(x,y+pipeHeight+blanks,pipeWidth,pipeHeight,game.loader.getImage("pipe") as HTMLImageElement,0,"pipe");
        var checkScore = new ImageObject(x+pipeWidth,y+pipeHeight,10,blanks,null,0,"checkScore");
        this.Pipes= [PipeUp,PipeDown,checkScore];
        this.speed = speed;
    }
    update(time:number, deltaTime:number){
        for(var i = 0; i <3;i++){
            this.Pipes[i].x -= this.speed*(deltaTime/16.67);
        }
    }
    reset(){
        for(var i = 0; i <3;i++){
            this.Pipes[i].reset();
        }
    }
    getComponent(){
        return {
            "imageObjects": this.Pipes,
            "sprites": [],
            "textObjects": []
        }
    }
}

class ListPairOfPipes{
    listPipe: PairOfPipe[];
    constructor(game: Game){
        this.listPipe = [];
        for(var i=0;i<numPipe;i++){
            var x = i*distance + pipeWidth + 400;
            var y = Math.floor(Math.random() *-200);
            var pipe = new PairOfPipe(x,y,game,4);
            this.listPipe.push(pipe);
        }
    }
    update(){
        this.listPipe.map((pipe,index) =>{
            if(pipe.Pipes[0].x<-100){
                var frontIndex = index -1;
                if(frontIndex<0) frontIndex = this.listPipe.length-1;
                for(var i = 0; i <pipe.Pipes.length;i++){
                    pipe.Pipes[i].x = this.listPipe[frontIndex].Pipes[i].x + distance;
                }
            }
        })
    }
}

export {PairOfPipe, ListPairOfPipes};
