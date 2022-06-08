export class GameObject{
    x: number;
    y: number;
    width: number;
    height: number;
    name: string;
    active: boolean;
    defaultPosition: Array<number>;
    z_index: number;
    constructor() {
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.name = "";
        this.active = true;
        this.z_index = 0;
        this.defaultPosition = [0,0];
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