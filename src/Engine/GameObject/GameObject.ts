export class GameObject{
    x: number;
    y: number;
    width: number;
    height: number;
    name: string;
    active: boolean;
    defaultPosition: Array<number>;
    constructor(x: number, y: number, width: number, height: number, name: string, active = true) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.name = name;
        this.active = active;
        this.defaultPosition = [x,y];
    }
    reset(){
        this.x = this.defaultPosition[0];
        this.y = this.defaultPosition[1];
    }
    setActive(active: boolean){
        this.active = active;
    }
    getActive(){
        return this.active;
    }

}