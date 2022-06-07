import {Scene} from '../Engine/Scene/Scene';
import {Bird} from './Bird';
import {ListPairOfPipes} from './PairOfPipe';
import { TextObject } from '../Engine/TextObject/TextObject';
import { ImageObject } from '../Engine/ImageObject/ImageObject';
import {score} from "./Score";
import { Ground } from './Ground';
import {PanelGameOver} from './PanelGameOver'
import {Game} from '../Engine/Core/Game'
import {ButtonObject} from '../Engine/ButtonObject/ButtonObject';

const point = new Audio("../audio/point.mp3");
const die = new Audio("../audio/die.mp3");
const hit = new Audio("../audio/hit.mp3");
const audioPlayer = new Audio("../audio/orchestrawav-26158.mp3");

const fps = 60;
export class PlayScene extends Scene {
    rate: number;
    adt: number;    //accumulated delta time
    bird: Bird;
    pipes: ListPairOfPipes;
    ground: Ground;
    checkPipe: boolean;
    textScore: TextObject;
    addScore: number | null;
    score = score;
    deadBird: boolean;
    panelGameOver : PanelGameOver;
    start: boolean;
    constructor(game: Game){
        super(game);
        // play audio
        // audioPlayer.play();
        // audioPlayer.loop =true;
        this.rate = 1.0/fps*1000;
        this.adt = 0.0;
        this.checkPipe = false;
        this.addScore = null;
        this.deadBird = false;
        this.start = false; 
        this.bird =  new Bird(100,280,50,50,0,0.5,30,this)
        this.textScore = new TextObject(10,30,"score","Score: "+ this.score.getCurrentScore(), "18px Arial", "white");
        var bg = new ImageObject(0,0,700,800,game.loader.getImage("background") as HTMLImageElement,0,"background");
        this.ground = new Ground(2,game);
        this.pipes = new ListPairOfPipes(game);

        this.panelGameOver = new PanelGameOver(
            new ImageObject(60,300,500,130,game.loader.getImage("gameover") as HTMLImageElement,0,"gameOver"),
            new TextObject(110,470,"showScore","Score: 0", "30px Arial","white"),
            new TextObject(330,470,"highScore","High Score: 0", "30px Arial","white"),
            new ButtonObject(225,500,160,80,game.loader.getImage("replayButton") as HTMLImageElement,0,"replayButton"), 
            );
        
        this.addChild([bg],[this.bird],[this.textScore]);
        for(var i=0;i<this.pipes.listPipe.length;i++){
            var pipe = this.pipes.listPipe[i];
            this.addChild(
                pipe.getComponent()["imageObjects"],
                pipe.getComponent()["sprites"],
                pipe.getComponent()["textObjects"]
            );
        }

        this.addChild(
            this.ground.getComponent()["imageObjects"],
            this.ground.getComponent()["sprites"],
            this.ground.getComponent()["textObjects"]
        );

        this.addChild(
            this.panelGameOver.getComponent()["imageObjects"],
            this.panelGameOver.getComponent()["sprites"],
            this.panelGameOver.getComponent()["textObjects"]
        );
        // hiden panelGameOver
        this.panelGameOver.setActive(false);
    }
    
    update(time: number, deltaTime: number) {
        if( !this.deadBird && this.start){
            // this.adt += deltaTime
            var ground = this.imageObjects.filter((imb)=>{
                return imb.name === "ground";
                });
            
            var pipes = this.imageObjects.filter((imb)=>{
                return imb.name === "pipe";
                });
            var checkScore = this.imageObjects.filter((imb)=>{
                return imb.name === "checkScore";
            })
            // if(this.adt>=this.rate){
            //     this.adt -= this.rate;
                this.ground.update(time, deltaTime);
                // for (var i = 0; i <this.imageObjects.length; i++) {
                //     this.imageObjects[i].update(time, deltaTime);
                // }
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
                                // point.play();
                                break;
                            }
                        }
                        this.pipes.listPipe.map((pipe) => {
                            pipe.update(time, deltaTime);
                        });
                        this.sprites[i].update(time,deltaTime);
                        if(this.inputKey==="Space") {
                            this.bird.fly(deltaTime);
                        }
                        else if(this.checkPipe&&(!this.Collision(ground[0], this.sprites[i])&&!this.Collision(ground[1], this.sprites[i])))
                            this.sprites[i].update(time,deltaTime);
                        console.log("test", ground)
                        if(this.Collision(ground[0], this.sprites[i])||this.Collision(ground[1], this.sprites[i])||this.checkPipe){
                            if(this.score.getCurrentScore()> this.score.getHighScore())
                                this.score.setHighScore(this.score.getCurrentScore());
                            // show panelGameOver
                            this.panelGameOver.setActive(true);
                            // this.sprites[i].setActive(false);
                            // update score
                            this.panelGameOver.update(this.score.getCurrentScore(), this.score.getHighScore());
                            // set state bird is die
                            this.deadBird = true;

                            // play audio
                            // audioPlayer.pause();
                            // hit.play();
                            // setTimeout(function() {
                            //     die.play();
                            //   }, 500);
                            
                        }
                    }
                    else
                        this.sprites[i].update(time,deltaTime);
                }
                this.pipes.update();
            // }
        }
        else if(this.deadBird){
            if(this.inputKey !== ""||(this.mouseEvent!=null&& this.panelGameOver.replayButton.isInside(this.mouseEvent))){
                this.deadBird = false;
                this.panelGameOver.setActive(false);   
                this.resetScene();
            }
        }
        else if(!this.start){
            if(this.inputKey === "Space")
                this.start = true;
        }
    }
    resetScene(){
        // audioPlayer.play();
        // audioPlayer.loop =true;
        this.checkPipe = false;
        this.addScore = null;
        this.start = false;
        super.resetScene();
        this.score.setCurrentScore(0);
        this.bird.reset();
        this.ground.reset();
        this.textScore.setContent("Score: 0");
        for(var i=0;i<this.pipes.listPipe.length;i++){
            this.pipes.listPipe[i].reset();
        }
        console.log("rendering");
    }
}

// var playScene = new PlayScene();
// export {playScene};