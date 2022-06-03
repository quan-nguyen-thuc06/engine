export class Ground{
    private x:number;
    private y:number;
    private image: HTMLImageElement;
    constructor(x:number, y:number, image:HTMLImageElement){
        this.x = x;
        this.y = y;
        this.image = image;
    }
    getPosition(){
        return [this.x, this.y];
    }
    draw(){
        const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;;
        const ctx = canvas.getContext('2d');
        if(ctx!=null)
            ctx.drawImage(this.image,this.x, this.y,this.image.width*2,this.image.height*2);
        console.log("rendering... base");
    }
}