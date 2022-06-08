import {Scene} from '../Engine/Scene/Scene';
import {Bird} from './Bird';
import {ListPairOfPipes} from './PairOfPipe';
import {TextObject } from '../Engine/TextObject/TextObject';
import {ImageObject } from '../Engine/ImageObject/ImageObject';
import {Score} from "./Score";
import {Ground } from './Ground';
import {PanelGameOver} from './PanelGameOver'
import {Game} from '../Engine/Core/Game'
import {ButtonObject} from '../Engine/ButtonObject/ButtonObject';
import { GameObject } from '../Engine/GameObject/GameObject';

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
    textDescription: TextObject;
    addScore: number | null;
    score: Score;
    deadBird: boolean;
    panelGameOver : PanelGameOver;
    start: boolean;
    pause: boolean;
    constructor(game: Game){
        super(game);
        // play audio
        // audioPlayer.play();
        // audioPlayer.loop =true;
        this.checkPipe = false;
        this.addScore = null;
        this.deadBird = false;
        this.start = false;
        this.pause = false; 
        this.score = new Score();
        this.bird =  new Bird(100,280,50,50,0,0.5,20,this,1)
        this.textDescription = new TextObject(140,450,"Description","Press Enter to continue","30px Arial", "white",2);
        this.textDescription.setActive(false);
        this.textScore = new TextObject(10,30,"score","Score: "+ this.score.getCurrentScore(), "18px Arial", "white",2);
        var bg = new ImageObject(0,0,700,800,game.loader.getImage("background") as HTMLImageElement,0,"background");
        this.ground = new Ground(4,game);
        this.pipes = new ListPairOfPipes(game);
        this.panelGameOver = new PanelGameOver(
            new ImageObject(60,300,500,130,game.loader.getImage("gameover") as HTMLImageElement,0,"gameOver",3),
            new TextObject(110,470,"showScore","Score: 0", "30px Arial","white",3),
            new TextObject(330,470,"highScore","High Score: 0", "30px Arial","white",3),
            new ButtonObject(225,500,160,80,game.loader.getImage("replayButton") as HTMLImageElement,0,"replayButton",3), 
        );
        
        // List of GameObject
        var listGameObject :Array<GameObject> = [bg,this.bird,this.textScore, this.textDescription];
        listGameObject =  listGameObject.concat(this.ground.getComponent());
        listGameObject = listGameObject.concat(this.panelGameOver.getComponent());
        
        for(var i=0;i<this.pipes.listPipe.length;i++){
            var pipe = this.pipes.listPipe[i];
            listGameObject = listGameObject.concat(pipe.getComponent())
        }
        console.log("listGameObject",listGameObject)
        this.addChild(listGameObject);
        // hiden panelGameOver
        this.panelGameOver.setActive(false);
    }
    
    update(time: number, deltaTime: number) {
        if( !this.deadBird && this.start && !this.pause){
            if(this.processInput.inputKey === "KeyA"){
                this.pause = true;
                this.textDescription.setActive(true);
            }
            var pipes = this.gameObjects.filter((imb)=>{
                return imb.name === "pipe";
                });
            var checkScore = this.gameObjects.filter((imb)=>{
                return imb.name === "checkScore";
            })
            this.ground.update(time, deltaTime);
            for(var j = 0; j < pipes.length; j++) {
                if(this.collision.handleCollision(pipes[j],this.bird)){
                    this.checkPipe = true;
                    console.log("game over!");
                    break;
                }
            }
            for (var k = 0; k < checkScore.length; k++) {
                if(this.collision.handleCollision(checkScore[k],this.bird)&& this.addScore != k){
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
            this.pipes.update();
            
            if(this.processInput.inputKey==="Space") {
                this.bird.fly(deltaTime);
                audio.play(); 
                audio.playbackRate = 2;
            }
            // va cham ground
            if(this.collision.handleCollision(this.ground.getComponent()[0], this.bird)||this.collision.handleCollision(this.ground.getComponent()[1], this.bird)||this.checkPipe){
                if(this.score.getCurrentScore()> this.score.getHighScore())
                    this.score.setHighScore(this.score.getCurrentScore());
                // update score
                this.panelGameOver.update(this.score.getCurrentScore(), this.score.getHighScore());
                // set state bird is die
                this.deadBird = true;
                
                // play audio
                audioPlayer.pause();
                hit.play();
                setTimeout(() =>{
                    // show panelGameOver
                    this.panelGameOver.setActive(true);
                    die.play();
                }, 500);
            }
            super.update(time, deltaTime);
                    
        }
        else if(this.deadBird){
            if((this.processInput.inputKey === "Enter"||this.processInput.mouseEvent!=null&& this.panelGameOver.replayButton.isInside(this.processInput.mouseEvent))){
                this.deadBird = false;
                this.panelGameOver.setActive(false); 
                this.game.sceneManager.switchScene(1);
            }
        }
        else if(!this.start){
            if(this.processInput.inputKey === "Space"){
                this.start = true;
            }
        }
        else if (this.pause){
            if(this.processInput.inputKey === "Enter"){
                this.pause = false;
                this.textDescription.setActive(false);
            }
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
        this.textScore.setContent("Score: 0");
        this.bird.reset();
        this.ground.reset();
        for(var i=0;i<this.pipes.listPipe.length;i++){
            this.pipes.listPipe[i].reset();
        }
        console.log("reset rendering");
    }
}
