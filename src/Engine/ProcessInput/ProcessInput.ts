export class ProcessInput{
    inputKey : String;
    mouseEvent : Array<number> | null;
    constructor(){
        this.inputKey = "";
        this.mouseEvent = null;
    }
    onKeyDown(e: KeyboardEvent){
        this.inputKey = e.code;
    }
    onKeyUp(){
        this.inputKey = "";
    }
    onMouseDown(e: MouseEvent, canvas: HTMLCanvasElement) {
        var rect = canvas.getBoundingClientRect();
        var mouseX = e.clientX - rect.left;
        var mouseY = e.clientY - rect.top;    
        this.mouseEvent = [mouseX, mouseY];
        console.log(this.mouseEvent);
    }
    onMouseUp() {
        this.mouseEvent = null;
    }
}