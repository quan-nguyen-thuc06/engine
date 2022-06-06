import {Scene} from '../Engine/Scene/Scene';
import { Bird } from './Bird';
import {PairOfPipe} from './PairOfPipe';
import { TextObject } from '../Engine/TextObject/TextObject';
import {ButtonObject } from '../Engine/ButtonObject/ButtonObject';
import { ImageObject } from '../Engine/ImageObject/ImageObject';
import {Score} from "./Score";
import { Ground } from './Ground';
var point = new Audio("../audio/point.mp3");
var die = new Audio("../audio/die.mp3");
var hit = new Audio("../audio/hit.mp3");
var audioPlayer = new Audio("../audio/orchestrawav-26158.mp3");
const imgBird = [
    "../Images/bird/frame-1.png",
    "../Images/bird/frame-2.png",
    "../Images/bird/frame-3.png",
    "../Images/bird/frame-4.png",
    "../Images/bird/frame-5.png",
    "../Images/bird/frame-6.png",
    "../Images/bird/frame-7.png",
    "../Images/bird/frame-8.png",
];
const numPipe = 4;
const distance = 250;
const pipeWidth = 80;
const fps = 60;
export class PlayScene extends Scene {
    fps: number;
    rate: number;
    adt: number;    //accumulated delta time
    bird: Bird;
    pipes: PairOfPipe[];
    ground: Ground;
    checkPipe: boolean;
    textScore: TextObject;
    addScore: number | null;
    score: Score;
    deadBird: boolean;
    buttonReplay: ButtonObject;
    constructor(){
        audioPlayer.play();
        audioPlayer.loop =true;
        super();
        this.buttonReplay = new ButtonObject(225,500,160,80,"../Images/replay-button.png",0,"replayButton");
        this.fps = fps;
        this.rate = 1.0/fps*1000;
        this.adt = 0.0;
        this.checkPipe = false;
        this.addScore = null;
        this.deadBird = false;
        this.score = new Score();
        this.ground = new Ground(2);
        this.textScore = new TextObject(10,30,"score","Score: "+ this.score.getCurrentScore(), "18px Arial");
        var bird = new Bird(100,30,50,50,
            imgBird,0,0.5,0.1
            );
        this.bird = bird;
        var bg = new ImageObject(0,0,700,800,"../Images/background-night.png",0,"background");
        // var ground = new ImageObject(0,670,700,150,"../Images/base.png",0,"ground");
        this.pipes = []
        this.addChild([bg],[bird],[this.textScore]);
        for(var i=0;i<numPipe;i++){
            var x = i*distance + pipeWidth + 250;
            var y = Math.floor(Math.random() *-200);
            var pipe = new PairOfPipe(x,y,"../Images/pipe-green.png",2);
            this.pipes.push(pipe);
            this.addChild([pipe.Pipes[0],pipe.Pipes[1],pipe.Pipes[2]],[],[]);
        }
        this.addChild([this.ground.images[0],this.ground.images[1]],[],[]);
        console.log(this.sprites.length);
    }
    
    update(time: number, deltaTime: number) {
        if( !this.deadBird){
            this.adt += deltaTime
            var ground = this.imageObjects.filter((imb)=>{
                return imb.name === "ground";
                })[0];
            var pipes = this.imageObjects.filter((imb)=>{
                return imb.name === "pipe";
                });
            var checkScore = this.imageObjects.filter((imb)=>{
                return imb.name === "checkScore";
            })
            if(this.adt>=this.rate){
                this.adt -= this.rate;
                this.ground.update();
                for (var i = 0; i <this.imageObjects.length; i++) {
                    this.imageObjects[i].update(time, deltaTime);
                }
                for (var i = 0; i <this.sprites.length; i++) {
                    if(this.sprites[i].name === "bird"){
                        for(var j = 0; j < pipes.length; j++) {
                            if(this.Collision(pipes[j],this.sprites[i])){
                                this.checkPipe = true;
                                console.log("game over!");
                                break;
                            }
                        }
                        for (var k = 0; k < checkScore.length; k++) {
                            if(this.Collision(checkScore[k],this.sprites[i])&& this.addScore != k){
                                this.score.setCurrentScore(this.score.getCurrentScore()+1);
                                this.textScore.content = "Score: " + this.score.getCurrentScore();
                                this.addScore = k;
                                point.play();
                                break;
                            }
                        }
                        // if(!Collision(ground, this.sprites[i])&&!this.checkPipe){ 
                            this.pipes.map((pipe) => {
                                pipe.update();
                            });
                            this.sprites[i].update(time,deltaTime);
                            if(this.inputKey==="Space") {
                                this.bird.fly();
                                this.inputKey = "";
                            }
                        // }
                        else if(this.checkPipe&&!this.Collision(ground, this.sprites[i]))
                            this.sprites[i].update(time,deltaTime);
                        if(this.Collision(ground, this.sprites[i])||this.checkPipe){
                            if(this.score.getCurrentScore()> this.score.getHighScore())
                                this.score.setHighScore(this.score.getCurrentScore());
                            console.log("Score: " + this.score.getCurrentScore() + "High Score: " + this.score.getHighScore());
                            var imgGameOver = new ImageObject(60,300,500,130,"../Images/gameover.png",0,"gameOver");
                            var Score = new TextObject(110,470,"showScore","Score: "+ this.score.getCurrentScore(), "30px Arial");
                            var highScore = new TextObject(330,470,"highScore","High Score: "+ this.score.getHighScore(), "30px Arial");
                            this.addChild([imgGameOver,this.buttonReplay],[],[Score,highScore]);
                            this.deadBird = true;
                            audioPlayer.pause();
                            hit.play();
                            setTimeout(function() {
                                die.play();
                              }, 500);
                            
                        }
                    }
                    else
                        this.sprites[i].update(time,deltaTime);
                }
                
                this.pipes.map((pipe,index) =>{
                    if(pipe.Pipes[0].x<-100){
                        var frontIndex = index -1;
                        if(frontIndex<0) frontIndex = this.pipes.length-1;
                        for(var i = 0; i <3;i++){
                            pipe.Pipes[i].x = this.pipes[frontIndex].Pipes[0].x + distance;
                        }
                    }
                })
            }
        }
        else if(this.deadBird){
            if(this.inputKey === "Enter"||(this.mouseEvent!=null&& this.buttonReplay.isInside(this.mouseEvent))){
                this.deadBird = false;
                this.removeChild([this.buttonReplay],[]);
                this.imageObjects.pop();
                this.imageObjects.pop();
                this.textObjects.pop();
                this.textObjects.pop();
                this.mouseEvent = null;
                this.resetScene();
            }
        }
        return 1;
    }
    resetScene(){
        audioPlayer.play();
        audioPlayer.loop =true;
        super.resetScene();
        this.fps = fps;
        this.rate = 1.0/fps*1000;
        this.adt = 0.0;
        this.checkPipe = false;
        this.addScore = null;
        this.score.setCurrentScore(0);
        this.ground = new Ground(2);
        this.textScore = new TextObject(10,30,"score","Score: "+ this.score.getCurrentScore(), "18px Arial");
        var bird = new Bird(100,30,50,50,
            imgBird,0,0.5,0.1
            );
        this.bird = bird;
        var bg = new ImageObject(0,0,700,800,"../Images/background-night.png",0,"background");
        // var ground = new ImageObject(0,670,700,150,"../Images/base.png",0,"ground");
        this.pipes = []
        this.addChild([bg],[bird],[this.textScore]);
        for(var i=0;i<numPipe;i++){
            var x = i*distance + pipeWidth + 250;
            var y = Math.floor(Math.random() *-100);
            var pipe = new PairOfPipe(x,y,"../Images/pipe-green.png",2);
            this.pipes.push(pipe);
            this.addChild([pipe.Pipes[0],pipe.Pipes[1],pipe.Pipes[2]],[],[]);
        }
        // this.addChild([ground],[],[]);
        this.addChild([this.ground.images[0],this.ground.images[1]],[],[]);
        console.log("rendering");
    }
}