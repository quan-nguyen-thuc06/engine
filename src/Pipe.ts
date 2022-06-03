export class Pipe{
    private width: number;
    private height: number;
    private speed: number;
    private image: HTMLImageElement;
    blanks: number;
    ls: Array<Array<number>>;
    private distance: number;
    constructor(speed:number,image:HTMLImageElement, distance:number,blanks:number){
        this.width = image.width;
        this.height = image.height;
        this.speed = speed;
        this.image = image;
        this.distance = distance;
        this.blanks = blanks;
        this.ls = [];
        for (var i = 0; i <3;i++){
            var x = i*this.distance+250;
            var y = Math.floor(Math.random() *-100);
            this.ls.push([x,y]);
        }
    }
    update(){
        for(var i = 0; i <this.ls.length;i++){
            this.ls[i][0] -= this.speed;
        }
        if(this.ls[0][0]< 300&&this.ls.length<5){
            // this.ls.shift();
            console.log('length', this.ls.length)
            var x = this.ls[this.ls.length - 1][0] + this.distance;
            var y = Math.floor(Math.random()*-100);
            this.ls.push([x,y]);
        }
        if(this.ls[0][0]< -100) this.ls.shift();
    }
    draw(){
        const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;;
        const ctx = canvas.getContext('2d');
        if(ctx!=null){
            for(var i=0; i<this.ls.length; i++){
                // 
                ctx.save();
                ctx.translate(this.ls[i][0] + this.image.width/2,this.ls[i][1] + this.image.height/2);
                ctx.rotate(180*Math.PI/180);
                ctx.drawImage(this.image,-this.image.width/2, -this.image.height/2,this.image.width,this.image.height);
                ctx.restore();
                ctx.drawImage(this.image, this.ls[i][0], this.ls[i][1]+this.image.height+this.blanks,this.image.width,this.image.height);
                console.log(this.ls[i][0],this.ls[i][1]);
            }
        }
        console.log("rendering... pipe", this.ls.length);
    }
}