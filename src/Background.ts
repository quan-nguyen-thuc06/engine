export class Background {
    private width: number;
    private height: number;
    image: string;
    constructor(width: number, height: number, image: string) {
        this.width = width;
        this.height = height;
        this.image = image;
    }
    public draw(windowWidth: number, windowHeight: number){
        console.log("rendering background");
    }
}
