class GameObject{
    x: number;
    y: number;
    width: number;
    height: number;
    name: string;
    constructor(x: number, y: number, width: number, height: number, name: string){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.name = name;
    }

}
class TextObject extends GameObject{
    content: string;
    font: string;
    constructor(x: number, y: number, name: string , content: string, font: string){
        super(x, y, 0, 0, name);
        this.content = content;
        this.font = font;
    }
}
class ImageObject extends GameObject{
    image: string;
    degrees: number;
    constructor(x: number, y: number, width: number, height: number,image: string, degrees: number, name: string){
        super(x, y, width, height,name);
        this.image = image;
        this.degrees = degrees;
    }
    update(time: number, deltaTime:number){}
}

class ButtonObject extends ImageObject{
    constructor(x: number, y: number, width: number, height: number,image: string, degrees: number, name: string){
        super(x, y, width, height,image, degrees, name);
    }
    isInside(pos: Array<number>){
        if(pos.length < 2) return false;
        return pos[0] > this.x && pos[0] < this.x+this.width && pos[1] < this.y+this.height && pos[1] > this.y;
        return 1;
    }    
}
class Sprite extends GameObject{
    images: Array<string>;
    degrees: number;
    fameCurrent: number;
    constructor(x: number, y: number, width: number, height: number, images: Array<string>,degrees: number,name: string){
        super(x, y, width, height,name);
        this.images = images;
        this.degrees = degrees;
        this.fameCurrent = 0;
    }
    update(time: number, deltaTime:number){}
}

class Renderer{
    canvas: HTMLCanvasElement;
    constructor(canvas: HTMLCanvasElement){
        this.canvas = canvas;
    }
    drawImage(imageObject: ImageObject){
        const ctx = this.canvas.getContext('2d');
        var img = new Image();
        img.src = imageObject.image;
        if(ctx!=null){
            ctx.save();
            ctx.translate(imageObject.x + imageObject.width/2,imageObject.y + imageObject.height/2)
            ctx.rotate(imageObject.degrees*Math.PI/180);
            ctx.drawImage(img,-imageObject.width/2, -imageObject.height/2,imageObject.width,imageObject.height);
            ctx.restore();
        }
    }
    drawSprite(sprite: Sprite){
        const ctx = this.canvas.getContext('2d');
        var img = new Image();
        if(ctx!=null){
            img.src = sprite.images[sprite.fameCurrent];
            // ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
            ctx.save();
            ctx.translate(sprite.x + sprite.width/2,sprite.y + sprite.height/2)
            ctx.rotate(sprite.degrees*Math.PI/180);
            ctx.drawImage(img,-sprite.width/2, -sprite.height/2,sprite.width,sprite.height);
            ctx.restore();
        }
    }
    drawText(text: TextObject){
        const ctx = this.canvas.getContext('2d');
        if(ctx!=null){
            ctx.font = text.font;
            ctx.fillText(text.content,text.x,text.y);
        }
    }
}

class Scene{
    imageObjects: ImageObject[];
    sprites: Sprite[];
    textObjects: TextObject[]; 
    inputKey : String;
    mouseEvent : Array<number> | null;
    constructor(){
        this.imageObjects = [];
        this.sprites = [];
        this.textObjects = [];
        this.inputKey = "";
        this.mouseEvent = null;
    }
    resetScene(){
        this.imageObjects = [];
        this.sprites = [];
        this.textObjects = [];
        this.inputKey = "";
    }
    addChild(imageObjects: ImageObject[],sprites: Sprite[], textObjects: TextObject[]){
        imageObjects.map(imageObject => this.imageObjects.push(imageObject));
        sprites.map(sprite => this.sprites.push(sprite));
        textObjects.map(textObject => this.textObjects.push(textObject));
    }
    removeChild(imageObjects: ImageObject[],sprites: Sprite[]){
        imageObjects.map(imageObject => {
            this.imageObjects = this.imageObjects.filter((imb)=>{
                return imb!= imageObject;
            })
        })
        sprites.map(sprite => {
            this.sprites = this.sprites.filter((spt)=>{
                return spt!= sprite;
            })
        })
    }

    render(render: Renderer){
        this.imageObjects.map((imageObject)=>{
            render.drawImage(imageObject);
        })
        this.sprites.map((sprite)=>{
            render.drawSprite(sprite);
        })
        this.textObjects.map((txt)=>{
            render.drawText(txt);
        })
    }
    // xu ly logic
    update(time: number, delta: number) {
        for (var i = 0; i <this.imageObjects.length; i++) {
            this.imageObjects[i].update(time, delta);
        }
        for (var i = 0; i <this.sprites.length; i++) {
            this.sprites[i].update(time, delta);
        }
        return 1;
    }
    handleInputEvent(e: KeyboardEvent){
        this.inputKey = e.code;
        console.log(this.inputKey);
    }
    handleMouseDown(e: MouseEvent, canvas: HTMLCanvasElement) {
        var rect = canvas.getBoundingClientRect();
        var mouseX = e.clientX - rect.left;
        var mouseY = e.clientY - rect.top;    
        this.mouseEvent = [mouseX, mouseY];
        // this.mouseEvent.clientX = 3;
        console.log(this.mouseEvent);
    }
    Collision(obj1 : GameObject, obj2 : GameObject){
        if(obj1.x+ obj1.width>=obj2.x && obj1.x <= obj2.x + obj2.width){
            if(obj1.y+ obj1.height>=obj2.y && obj1.y <= obj2.y + obj2.height){
                return true;
            }
        }
        return false;
    }
}

class SceneManager {
    scenes: Scene[];
    currentScene: number;
    
    constructor(){
        this.scenes = [];
        this.currentScene = 0;
    }
    addScene(scene: Scene){
        this.scenes.push(scene)
    }
    update(){}
    render(){}
}
class Game{
    sceneManager: SceneManager;
    lastTime: number | null;
    constructor(sceneManager: SceneManager){
        this.sceneManager = sceneManager;
        this.lastTime = null;
    }
    
    start(render: Renderer){
        document.addEventListener('keyup',(e)=>this.sceneManager.scenes[this.sceneManager.currentScene].handleInputEvent(e));
        document.addEventListener('click',(e)=>this.sceneManager.scenes[this.sceneManager.currentScene].handleMouseDown(e,render.canvas));
        requestAnimationFrame(()=>this.loop(render));
    }
    loop(render: Renderer){
        var indexScene = this.sceneManager.currentScene;
        const time = window.performance.now();
        if(this.lastTime == null){
            indexScene = this.sceneManager.scenes[this.sceneManager.currentScene].update(time, 0);
            this.sceneManager.scenes[this.sceneManager.currentScene].render(render);
            
        }
        else{
            const delta = time - this.lastTime;
            indexScene = this.sceneManager.scenes[this.sceneManager.currentScene].update(time,delta);
            this.sceneManager.scenes[this.sceneManager.currentScene].render(render);
        }
        if(indexScene!=this.sceneManager.currentScene){
            this.loadScene(indexScene);
            this.sceneManager.scenes[indexScene].resetScene();
        }
        this.lastTime = time;
        requestAnimationFrame(()=>this.loop(render));
    }
    loadScene(indexScene: number){
        this.sceneManager.currentScene = indexScene;
    }
}

export {GameObject,ImageObject,Renderer, SceneManager, Sprite,Game,Scene,TextObject,ButtonObject};