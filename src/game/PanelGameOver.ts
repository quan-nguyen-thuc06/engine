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
        return [this.imgGameOver, this.replayButton, this.currentScore, this.highScore];
    }
    update(currentScore: number, highScore: number){
        this.currentScore.setContent("Score: " + currentScore);
        this.highScore.setContent("High Score: " + highScore)
    }
}