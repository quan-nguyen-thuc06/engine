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

const point = new Audio("audio/point.mp3");
const die = new Audio("audio/die.mp3");
const hit = new Audio("audio/hit.mp3");
const audioPlayer = new Audio("audio/orchestrawav-26158.mp3");
const audio = new Audio("audio/swoosh.mp3");

export class PlayScene extends Scene {
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
        this.checkPipe = false;
        this.addScore = null;
        this.deadBird = false;
        this.start = false; 
        this.bird =  new Bird(100,280,50,50,0,0.5,20,this)
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
        
        // addChild
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
            var ground = this.imageObjects.filter((imb)=>{
                return imb.name === "ground";
                });
            
            var pipes = this.imageObjects.filter((imb)=>{
                return imb.name === "pipe";
                });
            var checkScore = this.imageObjects.filter((imb)=>{
                return imb.name === "checkScore";
            })
            this.ground.update(time, deltaTime);

            for (var i = 0; i <this.sprites.length; i++) {
                if(this.sprites[i].name === "bird"){
                    for(var j = 0; j < pipes.length; j++) {
                        if(this.collision.handleCollision(pipes[j],this.sprites[i])){
                            this.checkPipe = true;
                            console.log("game over!");
                            break;
                        }
                    }
                    for (var k = 0; k < checkScore.length; k++) {
                        if(this.collision.handleCollision(checkScore[k],this.sprites[i])&& this.addScore != k){
                            this.score.setCurrentScore(this.score.getCurrentScore()+1);
                            this.textScore.content = "Score: " + this.score.getCurrentScore();
                            this.addScore = k;
                            point.play();
                            break;
                        }
                    }
                    this.pipes.listPipe.map((pipe) => {
                        pipe.update(time, deltaTime);
                    });
                    this.sprites[i].update(time,deltaTime);

                    if(this.processInput.inputKey==="Space") {
                        this.bird.fly(deltaTime);
                        audio.play(); 
                        audio.playbackRate = 2;
                    }
                    else if(this.checkPipe&&(!this.collision.handleCollision(ground[0], this.sprites[i])&&!this.collision.handleCollision(ground[1], this.sprites[i])))
                        this.sprites[i].update(time,deltaTime);
                    
                    if(this.collision.handleCollision(ground[0], this.sprites[i])||this.collision.handleCollision(ground[1], this.sprites[i])||this.checkPipe){
                        if(this.score.getCurrentScore()> this.score.getHighScore())
                            this.score.setHighScore(this.score.getCurrentScore());
                        // update score
                        this.panelGameOver.update(this.score.getCurrentScore(), this.score.getHighScore());
                        // set state bird is die
                        this.deadBird = true;
                        
                        // play audio
                        audioPlayer.pause();
                        hit.play();
                        // hiden bird
                        setTimeout(()=> {
                            this.bird.setActive(false);
                        }, 100);
                        setTimeout(() =>{
                            // show panelGameOver
                            this.panelGameOver.setActive(true);
                            die.play();
                        }, 500);
                    }
                }
                else
                    this.sprites[i].update(time,deltaTime);
            }
            this.pipes.update();
        }
        else if(this.deadBird){
            if((this.processInput.mouseEvent!=null&& this.panelGameOver.replayButton.isInside(this.processInput.mouseEvent))){
                this.deadBird = false;
                this.panelGameOver.setActive(false); 
                this.bird.setActive(true);  
                this.game.sceneManager.switchScene(1);
            }
        }
        else if(!this.start){
            if(this.processInput.inputKey === "Space")
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
        for(var i=0;i<this.pipes.listPipe.length;i++){
            this.pipes.listPipe[i].reset();
        }
        console.log("reset rendering");
    }
}
