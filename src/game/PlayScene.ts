import {Scene} from '../Engine/Scene/Scene';
import bird from './Bird';
import {listPairOfPipes} from './PairOfPipe';
import { TextObject } from '../Engine/TextObject/TextObject';
import { ImageObject } from '../Engine/ImageObject/ImageObject';
import {score} from "./Score";
import { ground } from './Ground';
import {panelGameOver} from './PanelGameOver'

const point = new Audio("../audio/point.mp3");
const die = new Audio("../audio/die.mp3");
const hit = new Audio("../audio/hit.mp3");
const audioPlayer = new Audio("../audio/orchestrawav-26158.mp3");

const fps = 60;
export class PlayScene extends Scene {
    rate: number;
    adt: number;    //accumulated delta time
    bird = bird;
    pipes = listPairOfPipes;
    ground = ground;
    checkPipe: boolean;
    textScore: TextObject;
    addScore: number | null;
    score = score;
    deadBird: boolean;
    panelGameOver = panelGameOver;
    constructor(){
        super();
        // play audio
        audioPlayer.play();
        audioPlayer.loop =true;
        this.rate = 1.0/fps*1000;
        this.adt = 0.0;
        this.checkPipe = false;
        this.addScore = null;
        this.deadBird = false;
        // this.ground = new Ground(2);

        this.textScore = new TextObject(10,30,"score","Score: "+ this.score.getCurrentScore(), "18px Arial", "white");
        var bg = new ImageObject(0,0,700,800,"../Images/background-night.png",0,"background");

        this.addChild([bg],[this.bird],[this.textScore]);
        for(var i=0;i<listPairOfPipes.listPipe.length;i++){
            var pipe = listPairOfPipes.listPipe[i];
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

        // hiden panelGameOver
        this,panelGameOver.setActive(false);
        this.addChild(
            this.panelGameOver.getComponent()["imageObjects"],
            this.panelGameOver.getComponent()["sprites"],
            this.panelGameOver.getComponent()["textObjects"]
        );
    }
    
    update(time: number, deltaTime: number) {
        if( !this.deadBird){
            this.adt += deltaTime
            var ground = this.imageObjects.filter((imb)=>{
                return imb.name === "ground";
                });
            
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
                        this.pipes.listPipe.map((pipe) => {
                            pipe.update();
                        });
                        this.sprites[i].update(time,deltaTime);
                        if(this.inputKey==="Space") {
                            this.bird.fly();
                        }
                        else if(this.checkPipe&&(!this.Collision(ground[0], this.sprites[i])&&!this.Collision(ground[1], this.sprites[i])))
                            this.sprites[i].update(time,deltaTime);
                        console.log("test", ground)
                        if(this.Collision(ground[0], this.sprites[i])||this.Collision(ground[1], this.sprites[i])||this.checkPipe){
                            if(this.score.getCurrentScore()> this.score.getHighScore())
                                this.score.setHighScore(this.score.getCurrentScore());
                            // show panelGameOver
                            this.panelGameOver.setActive(true);
                            // update score
                            this.panelGameOver.update(this.score.getCurrentScore(), this.score.getHighScore());
                            // set state bird is die
                            this.deadBird = true;

                            // play audio
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
                this.pipes.update();
            }
        }
        else if(this.deadBird){
            if(this.inputKey === "Enter"||(this.mouseEvent!=null&& this.panelGameOver.replayButton.isInside(this.mouseEvent))){
                this.deadBird = false;
                this.panelGameOver.setActive(false);
                this.resetScene();
            }
        }
        return 1;
    }
    resetScene(){
        audioPlayer.play();
        audioPlayer.loop =true;
        this.checkPipe = false;
        this.addScore = null;
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

var playScene = new PlayScene();
export {playScene};