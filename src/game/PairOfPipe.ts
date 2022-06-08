import { ImageObject } from "../Engine/ImageObject/ImageObject";
import {Game} from "../Engine/Core/Game"
const blanks = 200;
const pipeHeight = 350;
const numPipe = 4;
const distance = 300;
const pipeWidth = 80;
class PairOfPipe{
    Pipes: Array<ImageObject>;
    private speed: number;
    constructor(x:number, y:number, game: Game,speed: number){
        var PipeUp = new ImageObject(game.loader.getImage("pipe") as HTMLImageElement);
        // set attributes
        PipeUp.x = x;
        PipeUp.y = y;
        PipeUp.width = pipeWidth;
        PipeUp.height = pipeHeight;
        PipeUp.degrees = 180;
        PipeUp.name = "pipe";
        PipeUp.z_index = 1;
        // set defaultPosition
        PipeUp.defaultPosition = [x,y];

        var PipeDown = new ImageObject(game.loader.getImage("pipe") as HTMLImageElement);
        // set attributes
        PipeDown.x = x;
        PipeDown.y = y+pipeHeight+blanks;
        PipeDown.width = pipeWidth;
        PipeDown.height = pipeHeight;
        PipeDown.name = "pipe";
        PipeDown.z_index = 1;
        // set defaultPosition
        PipeDown.defaultPosition = [x,y+pipeHeight+blanks];

        var checkScore = new ImageObject(null);
        // set attributes
        checkScore.x = x+pipeWidth;
        checkScore.y = y+pipeHeight;
        checkScore.width = 10;
        checkScore.height = blanks;
        checkScore.name = "checkScore";
        checkScore.z_index = 1;
        checkScore.defaultPosition = [x+pipeWidth,y+pipeHeight];

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
        return this.Pipes;
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
