export class GameObject{
    x: number;
    y: number;
    width: number;
    height: number;
    name: string;
    defaultPosition: Array<number>;
    constructor(x: number, y: number, width: number, height: number, name: string){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.name = name;
        this.defaultPosition = [x,y];
    }
    reset(){
        this.x = this.defaultPosition[0];
        this.y = this.defaultPosition[1];
    }

}