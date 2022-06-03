import {GameObject, Sprite, Scene, ImageObject,Renderer, SceneManager, Game,Collision, TextObject} from "./Engine"
var numPipe = 4;
var distance = 250;
var pipeWidth = 80;
var blanks = 300;
const pipeHeight = 350;
class Bird extends Sprite {
    gravity : number;
    speed : number;
    pfs: number;
    rate: number;
    adt: number;  
    constructor(x: number, y: number, width: number, height: number,images: Array<string>,degrees: number,gravity: number,speed: number){
        super(x, y, width, height,images,degrees,"bird");
        this.gravity = gravity;
        this.speed = speed;
        this.pfs = 20;
        this.rate = 1.0/this.pfs*1000;
        this.adt = 0.0;
    }
    update(time: number, deltaTime:number){
        this.y += this.speed + 0.5*this.gravity;
        this.speed += this.gravity;
        this.adt += deltaTime
        if(this.speed>0){
            this.degrees = 20;
        }
        else{
            this.degrees = -20;
            if(this.adt>=this.rate){
            this.adt -= this.rate;
            this.fameCurrent+=1;
            if(this.fameCurrent>this.images.length-1){
                this.fameCurrent = 0;
            }
            }
            if(this.fameCurrent>this.images.length){
                this.fameCurrent = 0;
            }
        }
    }
    fly(){
        this.speed = -10 ;
    }
}
class Score{
    private highScore: number;
    private currentScore: number;
    constructor(){
        this.highScore = 0;
        this.currentScore = 0;
    }
    incrementScore(){
        this.currentScore +=1;
    }
    getCurrentScore(){
        return this.currentScore;
    }
    getHighScore(){
        return this.highScore;
    }
    setHighScore(highScore: number){
        this.highScore = highScore;
    }
    
}
class PairOfPipe{
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
var pipeImage = "../Images/pipe-green.png";
class PlayScene extends Scene {
    pfs: number;
    rate: number;
    adt: number;    //accumulated delta time
    bird: Bird;
    pipes: PairOfPipe[];
    checkPipe: boolean;
    textScore: TextObject;
    addScore: number | null;
    score: Score;
    constructor(pfs: number, bird: Bird, bg: ImageObject,ground: ImageObject){
        super();
        this.pfs = pfs;
        this.rate = 1.0/pfs*1000;
        this.adt = 0.0;
        this.checkPipe = false;
        this.addScore = null;
        this.score = new Score();
        this.textScore = new TextObject(10,30,"score","Score: "+ this.score.getCurrentScore(), "18px Arial");
        this.bird = bird;
        this.pipes = []
        this.addChild([bg],[bird],[this.textScore]);
        for(var i=0;i<numPipe;i++){
            var x = i*distance + pipeWidth + 250;
            var y = Math.floor(Math.random() *-100);
            var pipe = new PairOfPipe(x,y,"../Images/pipe-green.png",1);
            this.pipes.push(pipe);
            this.addChild([pipe.Pipes[0],pipe.Pipes[1],pipe.Pipes[2]],[],[]);
        }
        this.addChild([ground],[],[]);
        console.log(this.sprites.length);
    }
    
    update(time: number, deltaTime: number) {
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
            for (var i = 0; i <this.imageObjects.length; i++) {
                this.imageObjects[i].update(time, deltaTime);
            }
            for (var i = 0; i <this.sprites.length; i++) {
                if(this.sprites[i].name === "bird"){
                    for(var j = 0; j < pipes.length; j++) {
                        if(Collision(pipes[j],this.sprites[i])){
                            this.checkPipe = true;
                            console.log("game over!");
                            break;
                        }
                    }
                    for (var k = 0; k < checkScore.length; k++) {
                        if(Collision(checkScore[k],this.sprites[i])&& this.addScore != k){
                            this.score.incrementScore();
                            this.textScore.content = "Score: " + this.score.getCurrentScore();
                            this.addScore = k;
                            break;
                        }
                    }
                    if(!Collision(ground, this.sprites[i])&&!this.checkPipe){ 
                        this.pipes.map((pipe) => {
                            pipe.update();
                        });
                        this.sprites[i].update(time,deltaTime);
                        if(this.inputKey==="Space") {
                            this.bird.fly();
                            this.inputKey = "";
                        }
                    }
                    else if(this.checkPipe&&!Collision(ground, this.sprites[i]))
                        this.sprites[i].update(time,deltaTime);
                    if(Collision(ground, this.sprites[i])||this.checkPipe){
                        if(this.score.getCurrentScore> this.score.getHighScore)
                            this.score.setHighScore(this.score.getCurrentScore());
                        return 2;
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
        return 1;
    }
    resetScene(){
        // super();
        this.pfs = 60;
        this.rate = 1.0/60*1000;
        this.adt = 0.0;
        this.checkPipe = false;
        this.addScore = null;
        this.score = new Score();
        this.textScore = new TextObject(10,30,"score","Score: "+ this.score.getCurrentScore(), "18px Arial");
        this.bird = bird;
        this.pipes = []
        this.addChild([bg],[bird],[this.textScore]);
        for(var i=0;i<numPipe;i++){
            var x = i*distance + pipeWidth + 250;
            var y = Math.floor(Math.random() *-100);
            var pipe = new PairOfPipe(x,y,"../Images/pipe-green.png",1);
            this.pipes.push(pipe);
            this.addChild([pipe.Pipes[0],pipe.Pipes[1],pipe.Pipes[2]],[],[]);
        }
        this.addChild([ground],[],[]);
        console.log(this.sprites.length);
    }
}

var bg = new ImageObject(0,0,700,800,"../Images/background-night.png",0,"background");
var ground = new ImageObject(0,670,700,150,"../Images/base.png",0,"ground");
var bird = new Bird(100,30,50,50,
    [
        "../Images/bird/frame-1.png",
        "../Images/bird/frame-2.png",
        "../Images/bird/frame-3.png",
        "../Images/bird/frame-4.png",
        "../Images/bird/frame-5.png",
        "../Images/bird/frame-6.png",
        "../Images/bird/frame-7.png",
        "../Images/bird/frame-8.png",
    ],0,0.5,0.1
    );
var imgStart = new ImageObject(50,20,500,700,"../Images/message.png",0,"");
class StartScreen extends Scene {
    update(time: number, delta: number){
        if(this.inputKey==="Enter") {
            this.inputKey = "";
            return 1;
        }
        return 0;
    }
}
class GameOverScreen extends Scene {
    update(time: number, delta: number){
        if(this.inputKey==="Enter") {
            this.inputKey = "";
            window.location.reload();
            return 1;
        }
        return 2;
    }
}
var startScreen = new StartScreen();
startScreen.addChild([bg,imgStart],[],[]);
var gameOverScreen = new GameOverScreen();
gameOverScreen.addChild([bg,imgStart],[],[]);
const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
var render = new Renderer(canvas)
var gamePlay = new PlayScene(60,bird,bg,ground);
var gameScene = new SceneManager();
gameScene.addScene(startScreen);
gameScene.addScene(gamePlay);
gameScene.addScene(gameOverScreen);
var myGame = new Game(gameScene);
myGame.start(render);