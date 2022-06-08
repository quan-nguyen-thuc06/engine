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
const Bird_Width = 50;
const Bird_Height = 50;
const Bird_X = 100;
const Bird_Y = 280;

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

        this.bird =  new Bird(this)
        // set attributes
        this.bird.x = Bird_X;
        this.bird.y = Bird_Y;
        this.bird.width = Bird_Width;
        this.bird.height = Bird_Height;
        this.bird.gravity = 0.5;
        this.bird.speed = 20;
        this.bird.z_index = 2;
        this.bird.defaultPosition = [this.bird.x, this.bird.y];
        
        this.textDescription = new TextObject();
        // set attributes
        this.textDescription.x = 140;
        this.textDescription.y = 450;
        this.textDescription.content = "Press Enter to continue";
        this.textDescription.font = "30px Arial";
        this.textDescription.color = "white";
        this.textDescription.z_index = 2;
        this.textDescription.setActive(false);
        this.textDescription.defaultPosition = [140,450];

        this.textScore = new TextObject();
        this.textScore.x = 10;
        this.textScore.y = 30;
        this.textScore.content = "Score: "+ this.score.getCurrentScore();
        this.textScore.font = "18px Arial";
        this.textScore.color = "white";
        this.textScore.z_index = 2;
        this.textScore.defaultPosition = [10,30];

        var bg = new ImageObject(game.loader.getImage("background") as HTMLImageElement);
        // set attributes
        bg.width = 700;
        bg.height = 800;
        bg.name = "background";

        this.ground = new Ground(4,game);
        this.pipes = new ListPairOfPipes(game);

        // init panelGameOver
        var imgGameOver = new ImageObject(game.loader.getImage("gameover") as HTMLImageElement);
        imgGameOver.x = 60;
        imgGameOver.y = 300;
        imgGameOver.width = 500;
        imgGameOver.height = 130;
        imgGameOver.z_index = 3;
        imgGameOver.defaultPosition = [60,300];

        var textCurrentScore = new TextObject();
        textCurrentScore.x = 110;
        textCurrentScore.y = 470;
        textCurrentScore.content = "Score: 0";
        textCurrentScore.font = "30px Arial";
        textCurrentScore.color = "white";
        textCurrentScore.z_index = 3;
        textCurrentScore.defaultPosition = [110,470];

        var textHighScore = new TextObject();
        textHighScore.x = 330;
        textHighScore.y = 470;
        textHighScore.content = "High Score: 0";
        textHighScore.font = "30px Arial";
        textHighScore.color = "white";
        textHighScore.z_index = 3;
        textHighScore.defaultPosition = [330,470]

        var buttonReplay = new ButtonObject(game.loader.getImage("replayButton") as HTMLImageElement);
        buttonReplay.x = 225;
        buttonReplay.y = 500;
        buttonReplay.width = 160;
        buttonReplay.height = 80;
        buttonReplay.z_index = 3;
        buttonReplay.defaultPosition = [225,500];

        this.panelGameOver = new PanelGameOver(
            imgGameOver,textCurrentScore,textHighScore,buttonReplay
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
                this.bird.fly();
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
            if(!this.collision.handleCollision(this.ground.getComponent()[0], this.bird)&&!this.collision.handleCollision(this.ground.getComponent()[1], this.bird)){
                this.bird.speed = 100;
                this.bird.update(time, deltaTime);
            }
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
