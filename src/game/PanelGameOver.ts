import { TextObject } from '../Engine/TextObject/TextObject';
import {ButtonObject } from '../Engine/ButtonObject/ButtonObject';
import { ImageObject } from '../Engine/ImageObject/ImageObject';

export class PanelGameOver {
    imgGameOver: ImageObject;
    currentScore: TextObject;
    highScore: TextObject;
    replayButton: ButtonObject;
    constructor(imgGameOver: ImageObject, currentScore: TextObject, highScore: TextObject, replayButton: ButtonObject){
        this.imgGameOver = imgGameOver;
        this.currentScore = currentScore;
        this.highScore = highScore;
        this.replayButton = replayButton;
    }
    setActive(active: boolean){
        this.imgGameOver.setActive(active);
        this.currentScore.setActive(active);
        this.highScore.setActive(active);
        this.replayButton.setActive(active);
    }
    getComponent(){
        return {
            "imageObjects": [this.imgGameOver, this.replayButton],
            "sprites":[],
            "textObjects":[this.currentScore,this.highScore]
        };
    }
    update(currentScore: number, highScore: number){
        this.currentScore.setContent("Score: " + currentScore);
        this.highScore.setContent("High Score: " + highScore)
    }
}
// var replayButton = new ButtonObject(225,500,160,80,"../Images/replay-button.png",0,"replayButton");
// var imgGameOver = new ImageObject(60,300,500,130,"../Images/gameover.png",0,"gameOver");
// var currentScore = new TextObject(110,470,"showScore","Score: 0", "30px Arial","white");
// var highScore = new TextObject(330,470,"highScore","High Score: 0", "30px Arial","white");

// var panelGameOver = new PanelGameOver(imgGameOver,currentScore,highScore,replayButton);
// export {panelGameOver}