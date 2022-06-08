export class GameObject{
    x: number;
    y: number;
    width: number;
    height: number;
    name: string;
    active: boolean;
    defaultPosition: Array<number>;
    z_index: number;
    constructor(x: number, y: number, width: number, height: number, name: string, active = true, z_index: number = 0) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.name = name;
        this.active = active;
        this.z_index = z_index;
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