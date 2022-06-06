class Score{
    private highScore: number;
    private currentScore: number;
    constructor(){
        this.highScore = 0;
        this.currentScore = 0;
    }
    setCurrentScore(score: number){
        this.currentScore = score;
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

var score = new Score();
export {score,Score};