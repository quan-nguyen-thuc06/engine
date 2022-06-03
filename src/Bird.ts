export class Bird{
    private x: number;
    private y: number;
    width: number;
    height: number;
    private speed: number;
    private images: Array<string>;
    private fameCurrent: number;
    private degrees: number;
    constructor(width:number, height:number, images: Array<string>){
        this.x = 100;
        this.y = 30;
        this.speed = 0;
        this.images = images;
        this.fameCurrent =0 ;
        this.degrees = 0;
        this.width = width;
        this.height = height;
    }

    update(gravity: number){
        this.y += this.speed + 0.5*gravity;
        this.speed += gravity;
        if(this.speed>0){
            this.degrees = 20;
        }
        else{
            this.fameCurrent+=1;
            this.degrees = 0;
        }
    }
    fly(){
        this.speed = -5 ;
    }
    getPosition(){
        return [this.x, this.y];
    }
    public draw(){
        const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;;
        const ctx = canvas.getContext('2d');
        var img = new Image();
        if( this.fameCurrent%7==0){
            img.src = this.images[this.fameCurrent/7];
        }
        else{
            img.src = this.images[Math.floor(this.fameCurrent/7)];
        }
        if(ctx!=null){
            ctx.save();
            ctx.translate(this.x + this.width/2,this.y + this.height/2)
            ctx.rotate(this.degrees*Math.PI/180);
            ctx.drawImage(img,-this.width/2, -this.height/2,this.width,this.height);
            ctx.restore();
        }
        console.log("render bird");
       
        if(this.fameCurrent>=21){
            this.fameCurrent =0;
        }
    }
}