import { Sprite } from "../Engine/Sprite/Sprite";
var audio = new Audio("../audio/swoosh.mp3");
export class Bird extends Sprite {
    gravity : number;
    speed : number;
    pfs: number;
    rate: number;
    adt: number;  
    constructor(x: number, y: number, width: number, height: number,images: Array<string>,degrees: number,gravity: number,speed: number){
        super(x, y, width, height,images,degrees,"bird");
        this.gravity = gravity;
        this.speed = speed;
        this.pfs = 80;
        this.rate = 1.0/this.pfs*1000;
        this.adt = 0.0;
    }
    update(time: number, deltaTime:number){
        this.y += this.speed + 0.5*this.gravity;
        this.speed += this.gravity;
        this.adt += deltaTime
        if(this.speed>0){
            this.degrees += 1;
            if(this.degrees>20) this.degrees = 20;
        }
        else{
            this.degrees -= 1;
            if(this.degrees<-20) this.degrees = -20;
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
        audio.play(); 
        audio.playbackRate = 2;
        this.speed = -5 ;
    }
}