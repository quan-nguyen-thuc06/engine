class InputManager {
    eventKeyboard = {
        keyDown: "",
        keyUp: "",
        keyPress: ""
    };
    mousePosition: Array<number> | null;
    constructor(){
        this.mousePosition = null;
    }
    start(){
        document.addEventListener("keydown",(e) => this._onKeyDown(e));
        document.addEventListener("keyup",(e) =>this._onKeyUp(e));
        document.addEventListener("mousedown",(e) => this._onMouseDown(e));
        document.addEventListener("mouseup",(e) => this._onMouseUp(e));
    }
    _onKeyDown(event: KeyboardEvent){
        this.eventKeyboard.keyUp= "";
        this.eventKeyboard.keyDown = event.code;
        this.eventKeyboard.keyPress = event.code;
    }
    _onKeyUp(event: KeyboardEvent){
        this.eventKeyboard.keyUp= event.code
        this.eventKeyboard.keyPress = "";
    }
    getKeyDown(){
        return this.eventKeyboard.keyDown;
    }
    getKeyUp(){
        return this.eventKeyboard.keyUp;
    }
    getKeyPress(){
        return this.eventKeyboard.keyPress;
    }
    _onMouseDown(event: MouseEvent): void {
        this.mousePosition = [event.clientX, event.clientY];
    }
    _onMouseUp(event: MouseEvent): void {
        this.mousePosition = null;
    }
    getMousePosition(){
        return this.mousePosition;
    }
}

var inputManager = new InputManager();
export default inputManager;