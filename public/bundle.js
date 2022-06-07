/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Engine/ButtonObject/ButtonObject.ts":
/*!*************************************************!*\
  !*** ./src/Engine/ButtonObject/ButtonObject.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ButtonObject": () => (/* binding */ ButtonObject)
/* harmony export */ });
/* harmony import */ var _ImageObject_ImageObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ImageObject/ImageObject */ "./src/Engine/ImageObject/ImageObject.ts");

class ButtonObject extends _ImageObject_ImageObject__WEBPACK_IMPORTED_MODULE_0__.ImageObject {
    constructor(x, y, width, height, image, degrees, name) {
        super(x, y, width, height, image, degrees, name);
    }
    isInside(pos) {
        if (pos.length < 2)
            return false;
        return pos[0] > this.x && pos[0] < this.x + this.width && pos[1] < this.y + this.height && pos[1] > this.y;
    }
}


/***/ }),

/***/ "./src/Engine/Core/Game.ts":
/*!*********************************!*\
  !*** ./src/Engine/Core/Game.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Game": () => (/* binding */ Game)
/* harmony export */ });
/* harmony import */ var _ProcessInput_ProcessInput__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ProcessInput/ProcessInput */ "./src/Engine/ProcessInput/ProcessInput.ts");
/* harmony import */ var _ImageLoader_ImageLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ImageLoader/ImageLoader */ "./src/Engine/ImageLoader/ImageLoader.ts");


class Game {
    constructor(sceneManager) {
        this.sceneManager = sceneManager;
        this.lastTime = 0;
        this.processInput = new _ProcessInput_ProcessInput__WEBPACK_IMPORTED_MODULE_0__.ProcessInput();
        this.loader = new _ImageLoader_ImageLoader__WEBPACK_IMPORTED_MODULE_1__.ImageLoader();
        // this.loader.addImage("../Images/bird/frame-1.png","bird0");
        // this.loader.addImage("../Images/bird/frame-2.png","bird1");
        // this.loader.addImage("../Images/bird/frame-3.png","bird2");
        // this.loader.addImage("../Images/bird/frame-4.png","bird3");
        // this.loader.addImage("../Images/bird/frame-5.png","bird4");
        // this.loader.addImage("../Images/bird/frame-6.png","bird5");
        // this.loader.addImage("../Images/bird/frame-7.png","bird6");
        // this.loader.addImage("../Images/bird/frame-8.png","bird7");
        // this.loader.addImage("../Images/pipe/pipe-green.png","pipe");
        // this.loader.addImage("../Images/gameStart/message.png","message");
        // this.loader.addImage("../Images/ground/base.png","ground");
        // this.loader.addImage("../Images/panelGameOver/gameover.png","gameover");
        // this.loader.addImage("../Images/panelGameOver/replay-button.png","replayButton");
        // this.loader.addImage("../Images/background/background-night.png","background");
    }
    start(render) {
        console.log('start');
        this.processInput.handleInput(this.sceneManager, render);
        requestAnimationFrame(() => this.loop(render));
    }
    loop(render) {
        console.log('lasknmlaksmdklasmd');
        const time = window.performance.now();
        const delta = time - this.lastTime;
        this.sceneManager.scenes[this.sceneManager.currentScene].update(time, delta);
        this.sceneManager.scenes[this.sceneManager.currentScene].render(render);
        this.lastTime = time;
        requestAnimationFrame(() => this.loop(render));
    }
}


/***/ }),

/***/ "./src/Engine/GameObject/GameObject.ts":
/*!*********************************************!*\
  !*** ./src/Engine/GameObject/GameObject.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GameObject": () => (/* binding */ GameObject)
/* harmony export */ });
class GameObject {
    constructor(x, y, width, height, name, active = true) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.name = name;
        this.active = active;
        this.defaultPosition = [x, y];
    }
    reset() {
        this.x = this.defaultPosition[0];
        this.y = this.defaultPosition[1];
    }
    setActive(active) {
        this.active = active;
    }
    getActive() {
        return this.active;
    }
}


/***/ }),

/***/ "./src/Engine/ImageLoader/ImageLoader.ts":
/*!***********************************************!*\
  !*** ./src/Engine/ImageLoader/ImageLoader.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ImageLoader": () => (/* binding */ ImageLoader)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class ImageLoader {
    constructor() {
        this.images = new Map();
    }
    addImage(src, name) {
        return __awaiter(this, void 0, void 0, function* () {
            var img = new Image();
            img.src = src;
            this.images.set(name, img);
            return new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
            });
        });
    }
    getImage(name) {
        if (this.images.has(name))
            return this.images.get(name);
        return new Image();
    }
}


/***/ }),

/***/ "./src/Engine/ImageObject/ImageObject.ts":
/*!***********************************************!*\
  !*** ./src/Engine/ImageObject/ImageObject.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ImageObject": () => (/* binding */ ImageObject)
/* harmony export */ });
/* harmony import */ var _GameObject_GameObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../GameObject/GameObject */ "./src/Engine/GameObject/GameObject.ts");

class ImageObject extends _GameObject_GameObject__WEBPACK_IMPORTED_MODULE_0__.GameObject {
    constructor(x, y, width, height, image, degrees, name) {
        super(x, y, width, height, name);
        if (image == null)
            this.image = new Image();
        else
            this.image = image;
        this.degrees = degrees;
    }
    update(time, deltaTime) { }
}


/***/ }),

/***/ "./src/Engine/ProcessInput/ProcessInput.ts":
/*!*************************************************!*\
  !*** ./src/Engine/ProcessInput/ProcessInput.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProcessInput": () => (/* binding */ ProcessInput)
/* harmony export */ });
class ProcessInput {
    handleInput(sceneManager, render) {
        document.addEventListener('keydown', (e) => sceneManager.scenes[sceneManager.currentScene].onKeyDown(e));
        document.addEventListener('keyup', (e) => sceneManager.scenes[sceneManager.currentScene].onKeyUp());
        document.addEventListener('mousedown', (e) => sceneManager.scenes[sceneManager.currentScene].onMouseDown(e, render.canvas));
        document.addEventListener('mouseup', (e) => sceneManager.scenes[sceneManager.currentScene].onMouseUp());
    }
}


/***/ }),

/***/ "./src/Engine/Renderer/Renderer.ts":
/*!*****************************************!*\
  !*** ./src/Engine/Renderer/Renderer.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Renderer": () => (/* binding */ Renderer)
/* harmony export */ });
class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
    }
    drawImage(imageObject) {
        const ctx = this.canvas.getContext('2d');
        if (ctx != null) {
            ctx.save();
            ctx.translate(imageObject.x + imageObject.width / 2, imageObject.y + imageObject.height / 2);
            ctx.rotate(imageObject.degrees * Math.PI / 180);
            ctx.drawImage(imageObject.image, -imageObject.width / 2, -imageObject.height / 2, imageObject.width, imageObject.height);
            ctx.restore();
        }
    }
    drawSprite(sprite) {
        const ctx = this.canvas.getContext('2d');
        if (ctx != null) {
            ctx.save();
            ctx.translate(sprite.x + sprite.width / 2, sprite.y + sprite.height / 2);
            ctx.rotate(sprite.degrees * Math.PI / 180);
            ctx.drawImage(sprite.images[sprite.fameCurrent], -sprite.width / 2, -sprite.height / 2, sprite.width, sprite.height);
            ctx.restore();
        }
    }
    drawText(text) {
        const ctx = this.canvas.getContext('2d');
        if (ctx != null) {
            ctx.font = text.font;
            ctx.fillStyle = text.color;
            ctx.fillText(text.content, text.x, text.y);
        }
    }
}


/***/ }),

/***/ "./src/Engine/Scene/Scene.ts":
/*!***********************************!*\
  !*** ./src/Engine/Scene/Scene.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Scene": () => (/* binding */ Scene)
/* harmony export */ });
class Scene {
    constructor(game) {
        this.imageObjects = [];
        this.sprites = [];
        this.textObjects = [];
        this.inputKey = "";
        this.mouseEvent = null;
        this.game = game;
    }
    resetScene() {
        for (var i = 0; i < this.imageObjects.length; i++) {
            this.imageObjects[i].reset();
        }
        for (var i = 0; i < this.sprites.length; i++) {
            this.sprites[i].reset();
        }
        this.inputKey = "";
    }
    addChild(imageObjects, sprites, textObjects) {
        imageObjects.map(imageObject => this.imageObjects.push(imageObject));
        sprites.map(sprite => this.sprites.push(sprite));
        textObjects.map(textObject => this.textObjects.push(textObject));
    }
    removeChild(imageObjects, sprites) {
        imageObjects.map(imageObject => {
            this.imageObjects = this.imageObjects.filter((imb) => {
                return imb != imageObject;
            });
        });
        sprites.map(sprite => {
            this.sprites = this.sprites.filter((spt) => {
                return spt != sprite;
            });
        });
    }
    render(render) {
        this.imageObjects.map((imageObject) => {
            if (imageObject.getActive())
                render.drawImage(imageObject);
        });
        this.sprites.map((sprite) => {
            if (sprite.getActive())
                render.drawSprite(sprite);
        });
        this.textObjects.map((txt) => {
            if (txt.getActive())
                render.drawText(txt);
        });
    }
    // xu ly logic
    update(time, delta) {
        for (var i = 0; i < this.imageObjects.length; i++) {
            this.imageObjects[i].update(time, delta);
        }
        for (var i = 0; i < this.sprites.length; i++) {
            this.sprites[i].update(time, delta);
        }
    }
    onKeyDown(e) {
        this.inputKey = e.code;
    }
    onKeyUp() {
        this.inputKey = "";
    }
    onMouseDown(e, canvas) {
        var rect = canvas.getBoundingClientRect();
        var mouseX = e.clientX - rect.left;
        var mouseY = e.clientY - rect.top;
        this.mouseEvent = [mouseX, mouseY];
        console.log(this.mouseEvent);
    }
    onMouseUp() {
        this.mouseEvent = null;
    }
    Collision(obj1, obj2) {
        if (obj1.x + obj1.width >= obj2.x && obj1.x <= obj2.x + obj2.width) {
            if (obj1.y + obj1.height >= obj2.y && obj1.y <= obj2.y + obj2.height) {
                return true;
            }
        }
        return false;
    }
}


/***/ }),

/***/ "./src/Engine/Scene/SceneManager.ts":
/*!******************************************!*\
  !*** ./src/Engine/Scene/SceneManager.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SceneManager": () => (/* binding */ SceneManager)
/* harmony export */ });
class SceneManager {
    constructor() {
        this.scenes = [];
        this.currentScene = 0;
    }
    addScene(scene) {
        this.scenes.push(scene);
    }
    switchScene(nextIndex) {
        this.scenes[this.currentScene].resetScene();
        this.currentScene = nextIndex;
    }
    update() { }
    render() { }
}


/***/ }),

/***/ "./src/Engine/Sprite/Sprite.ts":
/*!*************************************!*\
  !*** ./src/Engine/Sprite/Sprite.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Sprite": () => (/* binding */ Sprite)
/* harmony export */ });
/* harmony import */ var _GameObject_GameObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../GameObject/GameObject */ "./src/Engine/GameObject/GameObject.ts");

class Sprite extends _GameObject_GameObject__WEBPACK_IMPORTED_MODULE_0__.GameObject {
    constructor(x, y, width, height, images, degrees, name, fps) {
        super(x, y, width, height, name);
        console.log("images", images);
        this.images = images;
        this.degrees = degrees;
        this.fameCurrent = 0;
        this.rate = 1.0 / fps * 1000;
        this.adt = 0;
    }
    update(time, deltaTime) {
    }
    playAnimation(time, deltaTime) {
        this.adt += deltaTime;
        if (this.adt >= this.rate) {
            this.adt -= this.rate;
            this.fameCurrent += 1;
            if (this.fameCurrent > this.images.length - 1) {
                this.fameCurrent = 0;
            }
        }
    }
}


/***/ }),

/***/ "./src/Engine/TextObject/TextObject.ts":
/*!*********************************************!*\
  !*** ./src/Engine/TextObject/TextObject.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TextObject": () => (/* binding */ TextObject)
/* harmony export */ });
/* harmony import */ var _GameObject_GameObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../GameObject/GameObject */ "./src/Engine/GameObject/GameObject.ts");

class TextObject extends _GameObject_GameObject__WEBPACK_IMPORTED_MODULE_0__.GameObject {
    constructor(x, y, name, content, font, color = "black") {
        super(x, y, 0, 0, name);
        this.content = content;
        this.font = font;
        this.color = color;
    }
    setContent(content) {
        this.content = content;
    }
}


/***/ }),

/***/ "./src/game/Bird.ts":
/*!**************************!*\
  !*** ./src/game/Bird.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Bird": () => (/* binding */ Bird)
/* harmony export */ });
/* harmony import */ var _Engine_Sprite_Sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Engine/Sprite/Sprite */ "./src/Engine/Sprite/Sprite.ts");

var audio = new Audio("../audio/swoosh.mp3");
class Bird extends _Engine_Sprite_Sprite__WEBPACK_IMPORTED_MODULE_0__.Sprite {
    constructor(x, y, width, height, degrees, gravity, rate, scene) {
        var images = [];
        // console.log("loader", scene.game.loader);
        for (var i = 0; i < 8; i++) {
            let name = "bird" + i;
            images.push(scene.game.loader.getImage(name));
        }
        super(x, y, width, height, images, degrees, "bird", rate);
        this.gravity = gravity;
        this.speed = 0;
    }
    update(time, deltaTime) {
        this.y += (this.speed + 0.5 * this.gravity) * (deltaTime / 16.67);
        this.speed += this.gravity * (deltaTime / 16.67);
        if (this.y < 0)
            this.y = 0;
        if (this.speed > 0) {
            this.degrees += 1;
            if (this.degrees > 20)
                this.degrees = 20;
        }
        else {
            this.degrees -= 1;
            if (this.degrees < -20)
                this.degrees = -20;
            this.playAnimation(time, deltaTime);
        }
    }
    fly(deltaTime) {
        // audio.play(); 
        // audio.playbackRate = 2;
        this.speed = -10;
    }
    reset() {
        super.reset();
        this.speed = 0;
    }
}


/***/ }),

/***/ "./src/game/Ground.ts":
/*!****************************!*\
  !*** ./src/game/Ground.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ground": () => (/* binding */ Ground)
/* harmony export */ });
/* harmony import */ var _Engine_ImageObject_ImageObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Engine/ImageObject/ImageObject */ "./src/Engine/ImageObject/ImageObject.ts");

class Ground {
    constructor(speed, game) {
        var image = game.loader.getImage("ground");
        var imageObject1 = new _Engine_ImageObject_ImageObject__WEBPACK_IMPORTED_MODULE_0__.ImageObject(0, 670, 650, 150, image, 0, "ground");
        var imageObject2 = new _Engine_ImageObject_ImageObject__WEBPACK_IMPORTED_MODULE_0__.ImageObject(649, 670, 650, 150, image, 0, "ground");
        this.images = [imageObject1, imageObject2];
        this.speed = speed;
    }
    update(time, deltaTime) {
        for (var i = 0; i < this.images.length; i++) {
            this.images[i].x -= this.speed * (deltaTime / 16.67);
            if (this.images[i].x < -(650 + 20)) {
                this.images[i].x = this.images[Math.abs(i - 1)].x + 640;
            }
        }
    }
    getComponent() {
        return {
            "imageObjects": this.images,
            "sprites": [],
            "textObjects": []
        };
    }
    reset() {
        for (var i = 0; i < this.images.length; i++) {
            this.images[i].reset();
        }
    }
}



/***/ }),

/***/ "./src/game/PairOfPipe.ts":
/*!********************************!*\
  !*** ./src/game/PairOfPipe.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ListPairOfPipes": () => (/* binding */ ListPairOfPipes),
/* harmony export */   "PairOfPipe": () => (/* binding */ PairOfPipe)
/* harmony export */ });
/* harmony import */ var _Engine_ImageObject_ImageObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Engine/ImageObject/ImageObject */ "./src/Engine/ImageObject/ImageObject.ts");

const blanks = 200;
const pipeHeight = 350;
const numPipe = 4;
const distance = 250;
const pipeWidth = 80;
class PairOfPipe {
    constructor(x, y, game, speed) {
        var PipeUp = new _Engine_ImageObject_ImageObject__WEBPACK_IMPORTED_MODULE_0__.ImageObject(x, y, pipeWidth, pipeHeight, game.loader.getImage("pipe"), 180, "pipe");
        var PipeDown = new _Engine_ImageObject_ImageObject__WEBPACK_IMPORTED_MODULE_0__.ImageObject(x, y + pipeHeight + blanks, pipeWidth, pipeHeight, game.loader.getImage("pipe"), 0, "pipe");
        var checkScore = new _Engine_ImageObject_ImageObject__WEBPACK_IMPORTED_MODULE_0__.ImageObject(x + pipeWidth, y + pipeHeight, 10, blanks, null, 0, "checkScore");
        this.Pipes = [PipeUp, PipeDown, checkScore];
        this.speed = speed;
    }
    update(time, deltaTime) {
        for (var i = 0; i < 3; i++) {
            this.Pipes[i].x -= this.speed * (deltaTime / 16.67);
        }
    }
    reset() {
        for (var i = 0; i < 3; i++) {
            this.Pipes[i].reset();
        }
    }
    getComponent() {
        return {
            "imageObjects": this.Pipes,
            "sprites": [],
            "textObjects": []
        };
    }
}
class ListPairOfPipes {
    constructor(game) {
        this.listPipe = [];
        for (var i = 0; i < numPipe; i++) {
            var x = i * distance + pipeWidth + 400;
            var y = Math.floor(Math.random() * -200);
            var pipe = new PairOfPipe(x, y, game, 3);
            this.listPipe.push(pipe);
        }
    }
    update() {
        this.listPipe.map((pipe, index) => {
            if (pipe.Pipes[0].x < -100) {
                var frontIndex = index - 1;
                if (frontIndex < 0)
                    frontIndex = this.listPipe.length - 1;
                for (var i = 0; i < pipe.Pipes.length; i++) {
                    pipe.Pipes[i].x = this.listPipe[frontIndex].Pipes[i].x + distance;
                }
            }
        });
    }
}



/***/ }),

/***/ "./src/game/PanelGameOver.ts":
/*!***********************************!*\
  !*** ./src/game/PanelGameOver.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PanelGameOver": () => (/* binding */ PanelGameOver)
/* harmony export */ });
class PanelGameOver {
    constructor(imgGameOver, currentScore, highScore, replayButton) {
        this.imgGameOver = imgGameOver;
        this.currentScore = currentScore;
        this.highScore = highScore;
        this.replayButton = replayButton;
    }
    setActive(active) {
        this.imgGameOver.setActive(active);
        this.currentScore.setActive(active);
        this.highScore.setActive(active);
        this.replayButton.setActive(active);
    }
    getComponent() {
        return {
            "imageObjects": [this.imgGameOver, this.replayButton],
            "sprites": [],
            "textObjects": [this.currentScore, this.highScore]
        };
    }
    update(currentScore, highScore) {
        this.currentScore.setContent("Score: " + currentScore);
        this.highScore.setContent("High Score: " + highScore);
    }
}
// var replayButton = new ButtonObject(225,500,160,80,"../Images/replay-button.png",0,"replayButton");
// var imgGameOver = new ImageObject(60,300,500,130,"../Images/gameover.png",0,"gameOver");
// var currentScore = new TextObject(110,470,"showScore","Score: 0", "30px Arial","white");
// var highScore = new TextObject(330,470,"highScore","High Score: 0", "30px Arial","white");
// var panelGameOver = new PanelGameOver(imgGameOver,currentScore,highScore,replayButton);
// export {panelGameOver}


/***/ }),

/***/ "./src/game/PlayScene.ts":
/*!*******************************!*\
  !*** ./src/game/PlayScene.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PlayScene": () => (/* binding */ PlayScene)
/* harmony export */ });
/* harmony import */ var _Engine_Scene_Scene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Engine/Scene/Scene */ "./src/Engine/Scene/Scene.ts");
/* harmony import */ var _Bird__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Bird */ "./src/game/Bird.ts");
/* harmony import */ var _PairOfPipe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PairOfPipe */ "./src/game/PairOfPipe.ts");
/* harmony import */ var _Engine_TextObject_TextObject__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Engine/TextObject/TextObject */ "./src/Engine/TextObject/TextObject.ts");
/* harmony import */ var _Engine_ImageObject_ImageObject__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Engine/ImageObject/ImageObject */ "./src/Engine/ImageObject/ImageObject.ts");
/* harmony import */ var _Score__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Score */ "./src/game/Score.ts");
/* harmony import */ var _Ground__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Ground */ "./src/game/Ground.ts");
/* harmony import */ var _PanelGameOver__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./PanelGameOver */ "./src/game/PanelGameOver.ts");
/* harmony import */ var _Engine_ButtonObject_ButtonObject__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Engine/ButtonObject/ButtonObject */ "./src/Engine/ButtonObject/ButtonObject.ts");









const point = new Audio("../audio/point.mp3");
const die = new Audio("../audio/die.mp3");
const hit = new Audio("../audio/hit.mp3");
const audioPlayer = new Audio("../audio/orchestrawav-26158.mp3");
const fps = 60;
class PlayScene extends _Engine_Scene_Scene__WEBPACK_IMPORTED_MODULE_0__.Scene {
    constructor(game) {
        super(game);
        this.score = _Score__WEBPACK_IMPORTED_MODULE_5__.score;
        // play audio
        // audioPlayer.play();
        // audioPlayer.loop =true;
        this.rate = 1.0 / fps * 1000;
        this.adt = 0.0;
        this.checkPipe = false;
        this.addScore = null;
        this.deadBird = false;
        this.start = false;
        this.bird = new _Bird__WEBPACK_IMPORTED_MODULE_1__.Bird(100, 280, 50, 50, 0, 0.5, 30, this);
        this.textScore = new _Engine_TextObject_TextObject__WEBPACK_IMPORTED_MODULE_3__.TextObject(10, 30, "score", "Score: " + this.score.getCurrentScore(), "18px Arial", "white");
        var bg = new _Engine_ImageObject_ImageObject__WEBPACK_IMPORTED_MODULE_4__.ImageObject(0, 0, 700, 800, game.loader.getImage("background"), 0, "background");
        this.ground = new _Ground__WEBPACK_IMPORTED_MODULE_6__.Ground(2, game);
        this.pipes = new _PairOfPipe__WEBPACK_IMPORTED_MODULE_2__.ListPairOfPipes(game);
        this.panelGameOver = new _PanelGameOver__WEBPACK_IMPORTED_MODULE_7__.PanelGameOver(new _Engine_ImageObject_ImageObject__WEBPACK_IMPORTED_MODULE_4__.ImageObject(60, 300, 500, 130, game.loader.getImage("gameover"), 0, "gameOver"), new _Engine_TextObject_TextObject__WEBPACK_IMPORTED_MODULE_3__.TextObject(110, 470, "showScore", "Score: 0", "30px Arial", "white"), new _Engine_TextObject_TextObject__WEBPACK_IMPORTED_MODULE_3__.TextObject(330, 470, "highScore", "High Score: 0", "30px Arial", "white"), new _Engine_ButtonObject_ButtonObject__WEBPACK_IMPORTED_MODULE_8__.ButtonObject(225, 500, 160, 80, game.loader.getImage("replayButton"), 0, "replayButton"));
        this.addChild([bg], [this.bird], [this.textScore]);
        for (var i = 0; i < this.pipes.listPipe.length; i++) {
            var pipe = this.pipes.listPipe[i];
            this.addChild(pipe.getComponent()["imageObjects"], pipe.getComponent()["sprites"], pipe.getComponent()["textObjects"]);
        }
        this.addChild(this.ground.getComponent()["imageObjects"], this.ground.getComponent()["sprites"], this.ground.getComponent()["textObjects"]);
        this.addChild(this.panelGameOver.getComponent()["imageObjects"], this.panelGameOver.getComponent()["sprites"], this.panelGameOver.getComponent()["textObjects"]);
        // hiden panelGameOver
        this.panelGameOver.setActive(false);
    }
    update(time, deltaTime) {
        if (!this.deadBird && this.start) {
            // this.adt += deltaTime
            var ground = this.imageObjects.filter((imb) => {
                return imb.name === "ground";
            });
            var pipes = this.imageObjects.filter((imb) => {
                return imb.name === "pipe";
            });
            var checkScore = this.imageObjects.filter((imb) => {
                return imb.name === "checkScore";
            });
            // if(this.adt>=this.rate){
            //     this.adt -= this.rate;
            this.ground.update(time, deltaTime);
            // for (var i = 0; i <this.imageObjects.length; i++) {
            //     this.imageObjects[i].update(time, deltaTime);
            // }
            for (var i = 0; i < this.sprites.length; i++) {
                if (this.sprites[i].name === "bird") {
                    for (var j = 0; j < pipes.length; j++) {
                        if (this.Collision(pipes[j], this.sprites[i])) {
                            this.checkPipe = true;
                            console.log("game over!");
                            break;
                        }
                    }
                    for (var k = 0; k < checkScore.length; k++) {
                        if (this.Collision(checkScore[k], this.sprites[i]) && this.addScore != k) {
                            this.score.setCurrentScore(this.score.getCurrentScore() + 1);
                            this.textScore.content = "Score: " + this.score.getCurrentScore();
                            this.addScore = k;
                            // point.play();
                            break;
                        }
                    }
                    this.pipes.listPipe.map((pipe) => {
                        pipe.update(time, deltaTime);
                    });
                    this.sprites[i].update(time, deltaTime);
                    if (this.inputKey === "Space") {
                        this.bird.fly(deltaTime);
                    }
                    else if (this.checkPipe && (!this.Collision(ground[0], this.sprites[i]) && !this.Collision(ground[1], this.sprites[i])))
                        this.sprites[i].update(time, deltaTime);
                    console.log("test", ground);
                    if (this.Collision(ground[0], this.sprites[i]) || this.Collision(ground[1], this.sprites[i]) || this.checkPipe) {
                        if (this.score.getCurrentScore() > this.score.getHighScore())
                            this.score.setHighScore(this.score.getCurrentScore());
                        // show panelGameOver
                        this.panelGameOver.setActive(true);
                        // this.sprites[i].setActive(false);
                        // update score
                        this.panelGameOver.update(this.score.getCurrentScore(), this.score.getHighScore());
                        // set state bird is die
                        this.deadBird = true;
                        // play audio
                        // audioPlayer.pause();
                        // hit.play();
                        // setTimeout(function() {
                        //     die.play();
                        //   }, 500);
                    }
                }
                else
                    this.sprites[i].update(time, deltaTime);
            }
            this.pipes.update();
            // }
        }
        else if (this.deadBird) {
            if (this.inputKey !== "" || (this.mouseEvent != null && this.panelGameOver.replayButton.isInside(this.mouseEvent))) {
                this.deadBird = false;
                this.panelGameOver.setActive(false);
                this.resetScene();
            }
        }
        else if (!this.start) {
            if (this.inputKey === "Space")
                this.start = true;
        }
    }
    resetScene() {
        // audioPlayer.play();
        // audioPlayer.loop =true;
        this.checkPipe = false;
        this.addScore = null;
        this.start = false;
        super.resetScene();
        this.score.setCurrentScore(0);
        this.bird.reset();
        this.ground.reset();
        this.textScore.setContent("Score: 0");
        for (var i = 0; i < this.pipes.listPipe.length; i++) {
            this.pipes.listPipe[i].reset();
        }
        console.log("rendering");
    }
}
// var playScene = new PlayScene();
// export {playScene};


/***/ }),

/***/ "./src/game/Score.ts":
/*!***************************!*\
  !*** ./src/game/Score.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Score": () => (/* binding */ Score),
/* harmony export */   "score": () => (/* binding */ score)
/* harmony export */ });
class Score {
    constructor() {
        this.highScore = 0;
        this.currentScore = 0;
    }
    setCurrentScore(score) {
        this.currentScore = score;
    }
    getCurrentScore() {
        return this.currentScore;
    }
    getHighScore() {
        return this.highScore;
    }
    setHighScore(highScore) {
        this.highScore = highScore;
    }
}
var score = new Score();



/***/ }),

/***/ "./src/game/StartScene.ts":
/*!********************************!*\
  !*** ./src/game/StartScene.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StartScene": () => (/* binding */ StartScene)
/* harmony export */ });
/* harmony import */ var _Engine_Scene_Scene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Engine/Scene/Scene */ "./src/Engine/Scene/Scene.ts");
/* harmony import */ var _Engine_ImageObject_ImageObject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Engine/ImageObject/ImageObject */ "./src/Engine/ImageObject/ImageObject.ts");
/* harmony import */ var _Engine_ButtonObject_ButtonObject__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Engine/ButtonObject/ButtonObject */ "./src/Engine/ButtonObject/ButtonObject.ts");
/* harmony import */ var _Ground__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Ground */ "./src/game/Ground.ts");




const fps = 60;
class StartScene extends _Engine_Scene_Scene__WEBPACK_IMPORTED_MODULE_0__.Scene {
    constructor(game) {
        super(game);
        this.background = new _Engine_ImageObject_ImageObject__WEBPACK_IMPORTED_MODULE_1__.ImageObject(0, 0, 700, 800, game.loader.getImage("background"), 0, "background");
        this.imgStart = new _Engine_ImageObject_ImageObject__WEBPACK_IMPORTED_MODULE_1__.ImageObject(50, 20, 500, 700, game.loader.getImage("message"), 0, "");
        this.buttonStart = new _Engine_ButtonObject_ButtonObject__WEBPACK_IMPORTED_MODULE_2__.ButtonObject(0, 0, 700, 800, null, 0, "buttonStart");
        this.ground = new _Ground__WEBPACK_IMPORTED_MODULE_3__.Ground(2, game);
        var imageObjects = [this.background].concat(this.ground.getComponent()["imageObjects"]);
        imageObjects.push(this.imgStart);
        this.addChild(imageObjects, [], []);
    }
    update(time, deltaTime) {
        this.ground.update(time, deltaTime);
        if (this.inputKey === "Enter" || this.inputKey === "Space" || (this.mouseEvent != null && this.buttonStart.isInside(this.mouseEvent))) {
            this.game.sceneManager.switchScene(1);
            return 1;
        }
        return 0;
    }
}
// var startScene = new StartScene();
// export {startScene};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game_StartScene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game/StartScene */ "./src/game/StartScene.ts");
/* harmony import */ var _Engine_Renderer_Renderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Engine/Renderer/Renderer */ "./src/Engine/Renderer/Renderer.ts");
/* harmony import */ var _Engine_Scene_SceneManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Engine/Scene/SceneManager */ "./src/Engine/Scene/SceneManager.ts");
/* harmony import */ var _Engine_Core_Game__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Engine/Core/Game */ "./src/Engine/Core/Game.ts");
/* harmony import */ var _game_PlayScene__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./game/PlayScene */ "./src/game/PlayScene.ts");





var canvas = document.getElementById('myCanvas');
var render = new _Engine_Renderer_Renderer__WEBPACK_IMPORTED_MODULE_1__.Renderer(canvas);
var gameScene = new _Engine_Scene_SceneManager__WEBPACK_IMPORTED_MODULE_2__.SceneManager();
var myGame = new _Engine_Core_Game__WEBPACK_IMPORTED_MODULE_3__.Game(gameScene);
const imagesLoad = [
    {
        "key": "bird0",
        "path": "/Images/bird/frame-1.png",
    },
    {
        "key": "bird1",
        "path": "/Images/bird/frame-2.png",
    },
    {
        "key": "bird2",
        "path": "/Images/bird/frame-3.png",
    },
    {
        "key": "bird3",
        "path": "/Images/bird/frame-4.png",
    },
    {
        "key": "bird4",
        "path": "/Images/bird/frame-5.png",
    },
    {
        "key": "bird5",
        "path": "/Images/bird/frame-6.png",
    },
    {
        "key": "bird6",
        "path": "/Images/bird/frame-7.png",
    },
    {
        "key": "bird7",
        "path": "/Images/bird/frame-8.png",
    },
    {
        "key": "pipe",
        "path": "/Images/pipe/pipe-green.png",
    },
    {
        "key": "message",
        "path": "/Images/gameStart/message.png",
    },
    {
        "key": "ground",
        "path": "/Images/ground/base.png",
    },
    {
        "key": "gameover",
        "path": "/Images/panelGameOver/gameover.png",
    },
    {
        "key": "replayButton",
        "path": "/Images/panelGameOver/replay-button.png",
    },
    {
        "key": "background",
        "path": "/Images/tan.png"
    }
];
const promises = imagesLoad.map((image) => myGame.loader.addImage(image["path"], image["key"]));
Promise.all(promises).then(() => {
    var startScene = new _game_StartScene__WEBPACK_IMPORTED_MODULE_0__.StartScene(myGame);
    var playScene = new _game_PlayScene__WEBPACK_IMPORTED_MODULE_4__.PlayScene(myGame);
    gameScene.addScene(startScene);
    gameScene.addScene(playScene);
    myGame.start(render);
}).catch((error) => { console.log(error); });

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFLLEVBQUUsRUFBRSxHQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3dlZWsxLy4vc3JjL0VuZ2luZS9CdXR0b25PYmplY3QvQnV0dG9uT2JqZWN0LnRzIiwid2VicGFjazovL3dlZWsxLy4vc3JjL0VuZ2luZS9Db3JlL0dhbWUudHMiLCJ3ZWJwYWNrOi8vd2VlazEvLi9zcmMvRW5naW5lL0dhbWVPYmplY3QvR2FtZU9iamVjdC50cyIsIndlYnBhY2s6Ly93ZWVrMS8uL3NyYy9FbmdpbmUvSW1hZ2VMb2FkZXIvSW1hZ2VMb2FkZXIudHMiLCJ3ZWJwYWNrOi8vd2VlazEvLi9zcmMvRW5naW5lL0ltYWdlT2JqZWN0L0ltYWdlT2JqZWN0LnRzIiwid2VicGFjazovL3dlZWsxLy4vc3JjL0VuZ2luZS9Qcm9jZXNzSW5wdXQvUHJvY2Vzc0lucHV0LnRzIiwid2VicGFjazovL3dlZWsxLy4vc3JjL0VuZ2luZS9SZW5kZXJlci9SZW5kZXJlci50cyIsIndlYnBhY2s6Ly93ZWVrMS8uL3NyYy9FbmdpbmUvU2NlbmUvU2NlbmUudHMiLCJ3ZWJwYWNrOi8vd2VlazEvLi9zcmMvRW5naW5lL1NjZW5lL1NjZW5lTWFuYWdlci50cyIsIndlYnBhY2s6Ly93ZWVrMS8uL3NyYy9FbmdpbmUvU3ByaXRlL1Nwcml0ZS50cyIsIndlYnBhY2s6Ly93ZWVrMS8uL3NyYy9FbmdpbmUvVGV4dE9iamVjdC9UZXh0T2JqZWN0LnRzIiwid2VicGFjazovL3dlZWsxLy4vc3JjL2dhbWUvQmlyZC50cyIsIndlYnBhY2s6Ly93ZWVrMS8uL3NyYy9nYW1lL0dyb3VuZC50cyIsIndlYnBhY2s6Ly93ZWVrMS8uL3NyYy9nYW1lL1BhaXJPZlBpcGUudHMiLCJ3ZWJwYWNrOi8vd2VlazEvLi9zcmMvZ2FtZS9QYW5lbEdhbWVPdmVyLnRzIiwid2VicGFjazovL3dlZWsxLy4vc3JjL2dhbWUvUGxheVNjZW5lLnRzIiwid2VicGFjazovL3dlZWsxLy4vc3JjL2dhbWUvU2NvcmUudHMiLCJ3ZWJwYWNrOi8vd2VlazEvLi9zcmMvZ2FtZS9TdGFydFNjZW5lLnRzIiwid2VicGFjazovL3dlZWsxL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlZWsxL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWVrMS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlZWsxL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VlazEvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW1hZ2VPYmplY3R9IGZyb20gXCIuLi9JbWFnZU9iamVjdC9JbWFnZU9iamVjdFwiO1xyXG5leHBvcnQgY2xhc3MgQnV0dG9uT2JqZWN0IGV4dGVuZHMgSW1hZ2VPYmplY3R7XHJcbiAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsaW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQgfCBudWxsLCBkZWdyZWVzOiBudW1iZXIsIG5hbWU6IHN0cmluZyl7XHJcbiAgICAgICAgc3VwZXIoeCwgeSwgd2lkdGgsIGhlaWdodCxpbWFnZSwgZGVncmVlcywgbmFtZSk7XHJcbiAgICB9XHJcbiAgICBpc0luc2lkZShwb3M6IEFycmF5PG51bWJlcj4pe1xyXG4gICAgICAgIGlmKHBvcy5sZW5ndGggPCAyKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgcmV0dXJuIHBvc1swXSA+IHRoaXMueCAmJiBwb3NbMF0gPCB0aGlzLngrdGhpcy53aWR0aCAmJiBwb3NbMV0gPCB0aGlzLnkrdGhpcy5oZWlnaHQgJiYgcG9zWzFdID4gdGhpcy55O1xyXG4gICAgfSAgICBcclxufSIsImltcG9ydCB7IFNjZW5lTWFuYWdlciB9IGZyb20gXCIuLi9TY2VuZS9TY2VuZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgUmVuZGVyZXIgfSBmcm9tIFwiLi4vUmVuZGVyZXIvUmVuZGVyZXJcIjtcclxuaW1wb3J0IHsgUHJvY2Vzc0lucHV0IH0gZnJvbSBcIi4uL1Byb2Nlc3NJbnB1dC9Qcm9jZXNzSW5wdXRcIjtcclxuaW1wb3J0IHtJbWFnZUxvYWRlciB9IGZyb20gXCIuLi9JbWFnZUxvYWRlci9JbWFnZUxvYWRlclwiO1xyXG5leHBvcnQgY2xhc3MgR2FtZXtcclxuICAgIHNjZW5lTWFuYWdlcjogU2NlbmVNYW5hZ2VyO1xyXG4gICAgbGFzdFRpbWU6IG51bWJlcjtcclxuICAgIHByb2Nlc3NJbnB1dDogUHJvY2Vzc0lucHV0O1xyXG4gICAgbG9hZGVyOiBJbWFnZUxvYWRlcjtcclxuICAgIGNvbnN0cnVjdG9yKHNjZW5lTWFuYWdlcjogU2NlbmVNYW5hZ2VyKXtcclxuICAgICAgICB0aGlzLnNjZW5lTWFuYWdlciA9IHNjZW5lTWFuYWdlcjtcclxuICAgICAgICB0aGlzLmxhc3RUaW1lID0gMDtcclxuICAgICAgICB0aGlzLnByb2Nlc3NJbnB1dCA9IG5ldyBQcm9jZXNzSW5wdXQoKTtcclxuICAgICAgICB0aGlzLmxvYWRlciA9IG5ldyBJbWFnZUxvYWRlcigpO1xyXG4gICAgICAgIC8vIHRoaXMubG9hZGVyLmFkZEltYWdlKFwiLi4vSW1hZ2VzL2JpcmQvZnJhbWUtMS5wbmdcIixcImJpcmQwXCIpO1xyXG4gICAgICAgIC8vIHRoaXMubG9hZGVyLmFkZEltYWdlKFwiLi4vSW1hZ2VzL2JpcmQvZnJhbWUtMi5wbmdcIixcImJpcmQxXCIpO1xyXG4gICAgICAgIC8vIHRoaXMubG9hZGVyLmFkZEltYWdlKFwiLi4vSW1hZ2VzL2JpcmQvZnJhbWUtMy5wbmdcIixcImJpcmQyXCIpO1xyXG4gICAgICAgIC8vIHRoaXMubG9hZGVyLmFkZEltYWdlKFwiLi4vSW1hZ2VzL2JpcmQvZnJhbWUtNC5wbmdcIixcImJpcmQzXCIpO1xyXG4gICAgICAgIC8vIHRoaXMubG9hZGVyLmFkZEltYWdlKFwiLi4vSW1hZ2VzL2JpcmQvZnJhbWUtNS5wbmdcIixcImJpcmQ0XCIpO1xyXG4gICAgICAgIC8vIHRoaXMubG9hZGVyLmFkZEltYWdlKFwiLi4vSW1hZ2VzL2JpcmQvZnJhbWUtNi5wbmdcIixcImJpcmQ1XCIpO1xyXG4gICAgICAgIC8vIHRoaXMubG9hZGVyLmFkZEltYWdlKFwiLi4vSW1hZ2VzL2JpcmQvZnJhbWUtNy5wbmdcIixcImJpcmQ2XCIpO1xyXG4gICAgICAgIC8vIHRoaXMubG9hZGVyLmFkZEltYWdlKFwiLi4vSW1hZ2VzL2JpcmQvZnJhbWUtOC5wbmdcIixcImJpcmQ3XCIpO1xyXG4gICAgICAgIC8vIHRoaXMubG9hZGVyLmFkZEltYWdlKFwiLi4vSW1hZ2VzL3BpcGUvcGlwZS1ncmVlbi5wbmdcIixcInBpcGVcIik7XHJcbiAgICAgICAgLy8gdGhpcy5sb2FkZXIuYWRkSW1hZ2UoXCIuLi9JbWFnZXMvZ2FtZVN0YXJ0L21lc3NhZ2UucG5nXCIsXCJtZXNzYWdlXCIpO1xyXG4gICAgICAgIC8vIHRoaXMubG9hZGVyLmFkZEltYWdlKFwiLi4vSW1hZ2VzL2dyb3VuZC9iYXNlLnBuZ1wiLFwiZ3JvdW5kXCIpO1xyXG4gICAgICAgIC8vIHRoaXMubG9hZGVyLmFkZEltYWdlKFwiLi4vSW1hZ2VzL3BhbmVsR2FtZU92ZXIvZ2FtZW92ZXIucG5nXCIsXCJnYW1lb3ZlclwiKTtcclxuICAgICAgICAvLyB0aGlzLmxvYWRlci5hZGRJbWFnZShcIi4uL0ltYWdlcy9wYW5lbEdhbWVPdmVyL3JlcGxheS1idXR0b24ucG5nXCIsXCJyZXBsYXlCdXR0b25cIik7XHJcbiAgICAgICAgLy8gdGhpcy5sb2FkZXIuYWRkSW1hZ2UoXCIuLi9JbWFnZXMvYmFja2dyb3VuZC9iYWNrZ3JvdW5kLW5pZ2h0LnBuZ1wiLFwiYmFja2dyb3VuZFwiKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgc3RhcnQocmVuZGVyOiBSZW5kZXJlcil7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3N0YXJ0Jyk7XHJcbiAgICAgICAgdGhpcy5wcm9jZXNzSW5wdXQuaGFuZGxlSW5wdXQodGhpcy5zY2VuZU1hbmFnZXIsIHJlbmRlcik7XHJcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpPT50aGlzLmxvb3AocmVuZGVyKSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGxvb3AocmVuZGVyOiBSZW5kZXJlcil7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2xhc2tubWxha3NtZGtsYXNtZCcpXHJcbiAgICAgICAgY29uc3QgdGltZSA9IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKTtcclxuICAgICAgICBjb25zdCBkZWx0YSA9IHRpbWUgLSB0aGlzLmxhc3RUaW1lO1xyXG4gICAgICAgIHRoaXMuc2NlbmVNYW5hZ2VyLnNjZW5lc1t0aGlzLnNjZW5lTWFuYWdlci5jdXJyZW50U2NlbmVdLnVwZGF0ZSh0aW1lLGRlbHRhKTtcclxuICAgICAgICB0aGlzLnNjZW5lTWFuYWdlci5zY2VuZXNbdGhpcy5zY2VuZU1hbmFnZXIuY3VycmVudFNjZW5lXS5yZW5kZXIocmVuZGVyKTtcclxuICAgICAgICB0aGlzLmxhc3RUaW1lID0gdGltZTtcclxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCk9PnRoaXMubG9vcChyZW5kZXIpKTtcclxuICAgIH1cclxufSIsImV4cG9ydCBjbGFzcyBHYW1lT2JqZWN0e1xyXG4gICAgeDogbnVtYmVyO1xyXG4gICAgeTogbnVtYmVyO1xyXG4gICAgd2lkdGg6IG51bWJlcjtcclxuICAgIGhlaWdodDogbnVtYmVyO1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgYWN0aXZlOiBib29sZWFuO1xyXG4gICAgZGVmYXVsdFBvc2l0aW9uOiBBcnJheTxudW1iZXI+O1xyXG4gICAgY29uc3RydWN0b3IoeDogbnVtYmVyLCB5OiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBuYW1lOiBzdHJpbmcsIGFjdGl2ZSA9IHRydWUpIHtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5hY3RpdmUgPSBhY3RpdmU7XHJcbiAgICAgICAgdGhpcy5kZWZhdWx0UG9zaXRpb24gPSBbeCx5XTtcclxuICAgIH1cclxuICAgIHJlc2V0KCl7XHJcbiAgICAgICAgdGhpcy54ID0gdGhpcy5kZWZhdWx0UG9zaXRpb25bMF07XHJcbiAgICAgICAgdGhpcy55ID0gdGhpcy5kZWZhdWx0UG9zaXRpb25bMV07XHJcbiAgICB9XHJcbiAgICBzZXRBY3RpdmUoYWN0aXZlOiBib29sZWFuKXtcclxuICAgICAgICB0aGlzLmFjdGl2ZSA9IGFjdGl2ZTtcclxuICAgIH1cclxuICAgIGdldEFjdGl2ZSgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFjdGl2ZTtcclxuICAgIH1cclxuXHJcbn0iLCJleHBvcnQgY2xhc3MgSW1hZ2VMb2FkZXIge1xyXG4gICAgaW1hZ2VzITogTWFwPHN0cmluZywgSFRNTEltYWdlRWxlbWVudD47XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMuaW1hZ2VzID0gbmV3IE1hcDxzdHJpbmcsIEhUTUxJbWFnZUVsZW1lbnQ+KCk7XHJcbiAgICB9XHJcbiAgICBhc3luYyBhZGRJbWFnZShzcmM6IHN0cmluZywgbmFtZTogc3RyaW5nKXtcclxuICAgICAgICB2YXIgaW1nID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgaW1nLnNyYyA9IHNyYztcclxuICAgICAgICB0aGlzLmltYWdlcy5zZXQobmFtZSwgaW1nKTtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBpbWcub25sb2FkID0gcmVzb2x2ZTtcclxuICAgICAgICAgICAgaW1nLm9uZXJyb3IgPSByZWplY3Q7IFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBnZXRJbWFnZShuYW1lOiBzdHJpbmcpOiBIVE1MSW1hZ2VFbGVtZW50IHwgdW5kZWZpbmVke1xyXG4gICAgICAgIGlmKHRoaXMuaW1hZ2VzLmhhcyhuYW1lKSlcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW1hZ2VzLmdldChuYW1lKTtcclxuICAgICAgICByZXR1cm4gbmV3IEltYWdlKCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge0dhbWVPYmplY3R9IGZyb20gXCIuLi9HYW1lT2JqZWN0L0dhbWVPYmplY3RcIlxyXG5leHBvcnQgY2xhc3MgSW1hZ2VPYmplY3QgZXh0ZW5kcyBHYW1lT2JqZWN0e1xyXG4gICAgaW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQ7XHJcbiAgICBkZWdyZWVzOiBudW1iZXI7XHJcbiAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsaW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQgfG51bGwsIGRlZ3JlZXM6IG51bWJlciwgbmFtZTogc3RyaW5nKXtcclxuICAgICAgICBzdXBlcih4LCB5LCB3aWR0aCwgaGVpZ2h0LG5hbWUpO1xyXG4gICAgICAgIGlmKGltYWdlPT1udWxsKVxyXG4gICAgICAgICAgICB0aGlzLmltYWdlID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgZWxzZSB0aGlzLmltYWdlID0gaW1hZ2U7XHJcbiAgICAgICAgdGhpcy5kZWdyZWVzID0gZGVncmVlcztcclxuICAgIH1cclxuICAgIHVwZGF0ZSh0aW1lOiBudW1iZXIsIGRlbHRhVGltZTpudW1iZXIpe31cclxufSIsImltcG9ydCB7U2NlbmVNYW5hZ2VyfSBmcm9tICcuLi9TY2VuZS9TY2VuZU1hbmFnZXInO1xyXG5pbXBvcnQge1JlbmRlcmVyfSBmcm9tICcuLi9SZW5kZXJlci9SZW5kZXJlcidcclxuZXhwb3J0IGNsYXNzIFByb2Nlc3NJbnB1dHtcclxuICAgIGhhbmRsZUlucHV0KHNjZW5lTWFuYWdlcjogU2NlbmVNYW5hZ2VyLCByZW5kZXI6IFJlbmRlcmVyKXtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywoZSk9PnNjZW5lTWFuYWdlci5zY2VuZXNbc2NlbmVNYW5hZ2VyLmN1cnJlbnRTY2VuZV0ub25LZXlEb3duKGUpKTtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsKGUpPT5zY2VuZU1hbmFnZXIuc2NlbmVzW3NjZW5lTWFuYWdlci5jdXJyZW50U2NlbmVdLm9uS2V5VXAoKSk7XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywoZSk9PnNjZW5lTWFuYWdlci5zY2VuZXNbc2NlbmVNYW5hZ2VyLmN1cnJlbnRTY2VuZV0ub25Nb3VzZURvd24oZSxyZW5kZXIuY2FudmFzKSk7XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsKGUpPT5zY2VuZU1hbmFnZXIuc2NlbmVzW3NjZW5lTWFuYWdlci5jdXJyZW50U2NlbmVdLm9uTW91c2VVcCgpKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IEltYWdlT2JqZWN0IH0gZnJvbSBcIi4uL0ltYWdlT2JqZWN0L0ltYWdlT2JqZWN0XCI7XHJcbmltcG9ydCB7IFNwcml0ZSB9IGZyb20gXCIuLi9TcHJpdGUvU3ByaXRlXCI7XHJcbmltcG9ydCB7IFRleHRPYmplY3QgfSBmcm9tIFwiLi4vVGV4dE9iamVjdC9UZXh0T2JqZWN0XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUmVuZGVyZXJ7XHJcbiAgICBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xyXG4gICAgY29uc3RydWN0b3IoY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCl7XHJcbiAgICAgICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XHJcbiAgICB9XHJcbiAgICBkcmF3SW1hZ2UoaW1hZ2VPYmplY3Q6IEltYWdlT2JqZWN0KXtcclxuICAgICAgICBjb25zdCBjdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgICAgIGlmKGN0eCE9bnVsbCl7XHJcbiAgICAgICAgICAgIGN0eC5zYXZlKCk7XHJcbiAgICAgICAgICAgIGN0eC50cmFuc2xhdGUoaW1hZ2VPYmplY3QueCArIGltYWdlT2JqZWN0LndpZHRoLzIsaW1hZ2VPYmplY3QueSArIGltYWdlT2JqZWN0LmhlaWdodC8yKVxyXG4gICAgICAgICAgICBjdHgucm90YXRlKGltYWdlT2JqZWN0LmRlZ3JlZXMqTWF0aC5QSS8xODApO1xyXG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKGltYWdlT2JqZWN0LmltYWdlLC1pbWFnZU9iamVjdC53aWR0aC8yLCAtaW1hZ2VPYmplY3QuaGVpZ2h0LzIsaW1hZ2VPYmplY3Qud2lkdGgsaW1hZ2VPYmplY3QuaGVpZ2h0KTtcclxuICAgICAgICAgICAgY3R4LnJlc3RvcmUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBkcmF3U3ByaXRlKHNwcml0ZTogU3ByaXRlKXtcclxuICAgICAgICBjb25zdCBjdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgICAgIGlmKGN0eCE9bnVsbCl7XHJcbiAgICAgICAgICAgIGN0eC5zYXZlKCk7XHJcbiAgICAgICAgICAgIGN0eC50cmFuc2xhdGUoc3ByaXRlLnggKyBzcHJpdGUud2lkdGgvMixzcHJpdGUueSArIHNwcml0ZS5oZWlnaHQvMilcclxuICAgICAgICAgICAgY3R4LnJvdGF0ZShzcHJpdGUuZGVncmVlcypNYXRoLlBJLzE4MCk7XHJcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2Uoc3ByaXRlLmltYWdlc1tzcHJpdGUuZmFtZUN1cnJlbnRdLC1zcHJpdGUud2lkdGgvMiwgLXNwcml0ZS5oZWlnaHQvMixzcHJpdGUud2lkdGgsc3ByaXRlLmhlaWdodCk7XHJcbiAgICAgICAgICAgIGN0eC5yZXN0b3JlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZHJhd1RleHQodGV4dDogVGV4dE9iamVjdCl7XHJcbiAgICAgICAgY29uc3QgY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgICAgICBpZihjdHghPW51bGwpe1xyXG4gICAgICAgICAgICBjdHguZm9udCA9IHRleHQuZm9udDtcclxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHRleHQuY29sb3I7XHJcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dCh0ZXh0LmNvbnRlbnQsdGV4dC54LHRleHQueSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgSW1hZ2VPYmplY3QgfSBmcm9tIFwiLi4vSW1hZ2VPYmplY3QvSW1hZ2VPYmplY3RcIjtcclxuaW1wb3J0IHsgU3ByaXRlIH0gZnJvbSBcIi4uL1Nwcml0ZS9TcHJpdGVcIjtcclxuaW1wb3J0IHsgVGV4dE9iamVjdCB9IGZyb20gXCIuLi9UZXh0T2JqZWN0L1RleHRPYmplY3RcIjtcclxuaW1wb3J0IHtSZW5kZXJlcn0gZnJvbSBcIi4uL1JlbmRlcmVyL1JlbmRlcmVyXCI7XHJcbmltcG9ydCB7R2FtZU9iamVjdH0gZnJvbSBcIi4uL0dhbWVPYmplY3QvR2FtZU9iamVjdFwiO1xyXG5pbXBvcnQgeyBTY2VuZU1hbmFnZXIgfSBmcm9tIFwiLi9TY2VuZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgR2FtZSB9IGZyb20gXCIuLi9Db3JlL0dhbWVcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTY2VuZXtcclxuICAgIGltYWdlT2JqZWN0czogSW1hZ2VPYmplY3RbXTtcclxuICAgIHNwcml0ZXM6IFNwcml0ZVtdO1xyXG4gICAgdGV4dE9iamVjdHM6IFRleHRPYmplY3RbXTsgXHJcbiAgICBpbnB1dEtleSA6IFN0cmluZztcclxuICAgIG1vdXNlRXZlbnQgOiBBcnJheTxudW1iZXI+IHwgbnVsbDtcclxuICAgIGdhbWU6IEdhbWU7XHJcbiAgICBjb25zdHJ1Y3RvcihnYW1lOiBHYW1lKXtcclxuICAgICAgICB0aGlzLmltYWdlT2JqZWN0cyA9IFtdO1xyXG4gICAgICAgIHRoaXMuc3ByaXRlcyA9IFtdO1xyXG4gICAgICAgIHRoaXMudGV4dE9iamVjdHMgPSBbXTtcclxuICAgICAgICB0aGlzLmlucHV0S2V5ID0gXCJcIjtcclxuICAgICAgICB0aGlzLm1vdXNlRXZlbnQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuZ2FtZSA9IGdhbWU7XHJcbiAgICB9XHJcbiAgICByZXNldFNjZW5lKCl7XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHRoaXMuaW1hZ2VPYmplY3RzLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICB0aGlzLmltYWdlT2JqZWN0c1tpXS5yZXNldCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8dGhpcy5zcHJpdGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3ByaXRlc1tpXS5yZXNldCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmlucHV0S2V5ID0gXCJcIjtcclxuICAgIH1cclxuICAgIGFkZENoaWxkKGltYWdlT2JqZWN0czogSW1hZ2VPYmplY3RbXSxzcHJpdGVzOiBTcHJpdGVbXSwgdGV4dE9iamVjdHM6IFRleHRPYmplY3RbXSl7XHJcbiAgICAgICAgaW1hZ2VPYmplY3RzLm1hcChpbWFnZU9iamVjdCA9PiB0aGlzLmltYWdlT2JqZWN0cy5wdXNoKGltYWdlT2JqZWN0KSk7XHJcbiAgICAgICAgc3ByaXRlcy5tYXAoc3ByaXRlID0+IHRoaXMuc3ByaXRlcy5wdXNoKHNwcml0ZSkpO1xyXG4gICAgICAgIHRleHRPYmplY3RzLm1hcCh0ZXh0T2JqZWN0ID0+IHRoaXMudGV4dE9iamVjdHMucHVzaCh0ZXh0T2JqZWN0KSk7XHJcbiAgICB9XHJcbiAgICByZW1vdmVDaGlsZChpbWFnZU9iamVjdHM6IEltYWdlT2JqZWN0W10sc3ByaXRlczogU3ByaXRlW10pe1xyXG4gICAgICAgIGltYWdlT2JqZWN0cy5tYXAoaW1hZ2VPYmplY3QgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmltYWdlT2JqZWN0cyA9IHRoaXMuaW1hZ2VPYmplY3RzLmZpbHRlcigoaW1iKT0+e1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGltYiE9IGltYWdlT2JqZWN0O1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgc3ByaXRlcy5tYXAoc3ByaXRlID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zcHJpdGVzID0gdGhpcy5zcHJpdGVzLmZpbHRlcigoc3B0KT0+e1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNwdCE9IHNwcml0ZTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcihyZW5kZXI6IFJlbmRlcmVyKXtcclxuICAgICAgICB0aGlzLmltYWdlT2JqZWN0cy5tYXAoKGltYWdlT2JqZWN0KT0+e1xyXG4gICAgICAgICAgICBpZihpbWFnZU9iamVjdC5nZXRBY3RpdmUoKSlcclxuICAgICAgICAgICAgICAgIHJlbmRlci5kcmF3SW1hZ2UoaW1hZ2VPYmplY3QpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5zcHJpdGVzLm1hcCgoc3ByaXRlKT0+e1xyXG4gICAgICAgICAgICBpZihzcHJpdGUuZ2V0QWN0aXZlKCkpXHJcbiAgICAgICAgICAgICAgICByZW5kZXIuZHJhd1Nwcml0ZShzcHJpdGUpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy50ZXh0T2JqZWN0cy5tYXAoKHR4dCk9PntcclxuICAgICAgICAgICAgaWYodHh0LmdldEFjdGl2ZSgpKVxyXG4gICAgICAgICAgICAgICAgcmVuZGVyLmRyYXdUZXh0KHR4dCk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIC8vIHh1IGx5IGxvZ2ljXHJcbiAgICB1cGRhdGUodGltZTogbnVtYmVyLCBkZWx0YTogbnVtYmVyKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPHRoaXMuaW1hZ2VPYmplY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW1hZ2VPYmplY3RzW2ldLnVwZGF0ZSh0aW1lLCBkZWx0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDx0aGlzLnNwcml0ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5zcHJpdGVzW2ldLnVwZGF0ZSh0aW1lLCBkZWx0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgb25LZXlEb3duKGU6IEtleWJvYXJkRXZlbnQpe1xyXG4gICAgICAgIHRoaXMuaW5wdXRLZXkgPSBlLmNvZGU7XHJcbiAgICB9XHJcbiAgICBvbktleVVwKCl7XHJcbiAgICAgICAgdGhpcy5pbnB1dEtleSA9IFwiXCI7XHJcbiAgICB9XHJcbiAgICBvbk1vdXNlRG93bihlOiBNb3VzZUV2ZW50LCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50KSB7XHJcbiAgICAgICAgdmFyIHJlY3QgPSBjYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgdmFyIG1vdXNlWCA9IGUuY2xpZW50WCAtIHJlY3QubGVmdDtcclxuICAgICAgICB2YXIgbW91c2VZID0gZS5jbGllbnRZIC0gcmVjdC50b3A7ICAgIFxyXG4gICAgICAgIHRoaXMubW91c2VFdmVudCA9IFttb3VzZVgsIG1vdXNlWV07XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5tb3VzZUV2ZW50KTtcclxuICAgIH1cclxuICAgIG9uTW91c2VVcCgpIHtcclxuICAgICAgICB0aGlzLm1vdXNlRXZlbnQgPSBudWxsO1xyXG4gICAgfVxyXG4gICAgQ29sbGlzaW9uKG9iajEgOiBHYW1lT2JqZWN0LCBvYmoyIDogR2FtZU9iamVjdCl7XHJcbiAgICAgICAgaWYob2JqMS54KyBvYmoxLndpZHRoPj1vYmoyLnggJiYgb2JqMS54IDw9IG9iajIueCArIG9iajIud2lkdGgpe1xyXG4gICAgICAgICAgICBpZihvYmoxLnkrIG9iajEuaGVpZ2h0Pj1vYmoyLnkgJiYgb2JqMS55IDw9IG9iajIueSArIG9iajIuaGVpZ2h0KXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IFNjZW5lIH0gZnJvbSBcIi4vU2NlbmVcIjtcclxuaW1wb3J0IHtHYW1lfSBmcm9tIFwiLi4vQ29yZS9HYW1lXCI7XHJcbmV4cG9ydCBjbGFzcyBTY2VuZU1hbmFnZXIge1xyXG4gICAgc2NlbmVzOiBTY2VuZVtdO1xyXG4gICAgY3VycmVudFNjZW5lOiBudW1iZXI7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMuc2NlbmVzID0gW107XHJcbiAgICAgICAgdGhpcy5jdXJyZW50U2NlbmUgPSAwO1xyXG4gICAgfVxyXG4gICAgYWRkU2NlbmUoc2NlbmU6IFNjZW5lKXtcclxuICAgICAgICB0aGlzLnNjZW5lcy5wdXNoKHNjZW5lKVxyXG4gICAgfVxyXG4gICAgc3dpdGNoU2NlbmUobmV4dEluZGV4OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnNjZW5lc1t0aGlzLmN1cnJlbnRTY2VuZV0ucmVzZXRTY2VuZSgpO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFNjZW5lID0gbmV4dEluZGV4O1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKCl7fVxyXG4gICAgcmVuZGVyKCl7fVxyXG59IiwiaW1wb3J0IHtHYW1lT2JqZWN0fSBmcm9tIFwiLi4vR2FtZU9iamVjdC9HYW1lT2JqZWN0XCJcclxuZXhwb3J0IGNsYXNzIFNwcml0ZSBleHRlbmRzIEdhbWVPYmplY3R7XHJcbiAgICBpbWFnZXM6IEFycmF5PEhUTUxJbWFnZUVsZW1lbnQ+O1xyXG4gICAgZGVncmVlczogbnVtYmVyO1xyXG4gICAgZmFtZUN1cnJlbnQ6IG51bWJlcjtcclxuICAgIHJhdGU6IG51bWJlcjtcclxuICAgIGFkdDogbnVtYmVyO1xyXG4gICAgY29uc3RydWN0b3IoeDogbnVtYmVyLCB5OiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBpbWFnZXM6IEFycmF5PEhUTUxJbWFnZUVsZW1lbnQ+LGRlZ3JlZXM6IG51bWJlcixuYW1lOiBzdHJpbmcsIGZwczogbnVtYmVyKXtcclxuICAgICAgICBzdXBlcih4LCB5LCB3aWR0aCwgaGVpZ2h0LG5hbWUpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiaW1hZ2VzXCIsaW1hZ2VzKTtcclxuICAgICAgICB0aGlzLmltYWdlcyA9IGltYWdlcztcclxuICAgICAgICB0aGlzLmRlZ3JlZXMgPSBkZWdyZWVzO1xyXG4gICAgICAgIHRoaXMuZmFtZUN1cnJlbnQgPSAwO1xyXG4gICAgICAgIHRoaXMucmF0ZSA9IDEuMC9mcHMgKjEwMDA7XHJcbiAgICAgICAgdGhpcy5hZHQgPSAwO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKHRpbWU6IG51bWJlciwgZGVsdGFUaW1lOm51bWJlcil7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHBsYXlBbmltYXRpb24odGltZTogbnVtYmVyLCBkZWx0YVRpbWU6bnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5hZHQgKz0gZGVsdGFUaW1lXHJcbiAgICAgICAgaWYodGhpcy5hZHQ+PXRoaXMucmF0ZSl7XHJcbiAgICAgICAgICAgIHRoaXMuYWR0IC09IHRoaXMucmF0ZTtcclxuICAgICAgICAgICAgdGhpcy5mYW1lQ3VycmVudCs9MTtcclxuICAgICAgICAgICAgaWYodGhpcy5mYW1lQ3VycmVudD50aGlzLmltYWdlcy5sZW5ndGgtMSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZhbWVDdXJyZW50ID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCB7R2FtZU9iamVjdH0gZnJvbSBcIi4uL0dhbWVPYmplY3QvR2FtZU9iamVjdFwiXHJcbmV4cG9ydCBjbGFzcyBUZXh0T2JqZWN0IGV4dGVuZHMgR2FtZU9iamVjdHtcclxuICAgIGNvbnRlbnQ6IHN0cmluZztcclxuICAgIGZvbnQ6IHN0cmluZztcclxuICAgIGNvbG9yOiBzdHJpbmc7XHJcbiAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlciwgbmFtZTogc3RyaW5nICwgY29udGVudDogc3RyaW5nLCBmb250OiBzdHJpbmcsIGNvbG9yID0gXCJibGFja1wiKSB7XHJcbiAgICAgICAgc3VwZXIoeCwgeSwgMCwgMCwgbmFtZSk7XHJcbiAgICAgICAgdGhpcy5jb250ZW50ID0gY29udGVudDtcclxuICAgICAgICB0aGlzLmZvbnQgPSBmb250O1xyXG4gICAgICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcclxuICAgIH1cclxuICAgIHNldENvbnRlbnQoY29udGVudDogc3RyaW5nKXtcclxuICAgICAgICB0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgU3ByaXRlIH0gZnJvbSBcIi4uL0VuZ2luZS9TcHJpdGUvU3ByaXRlXCI7XHJcbnZhciBhdWRpbyA9IG5ldyBBdWRpbyhcIi4uL2F1ZGlvL3N3b29zaC5tcDNcIik7XHJcbmltcG9ydCB7U2NlbmV9IGZyb20gXCIuLi9FbmdpbmUvU2NlbmUvU2NlbmVcIlxyXG5leHBvcnQgY2xhc3MgQmlyZCBleHRlbmRzIFNwcml0ZSB7XHJcbiAgICBncmF2aXR5IDogbnVtYmVyO1xyXG4gICAgc3BlZWQgOiBudW1iZXI7IFxyXG4gICAgY29uc3RydWN0b3IoeDogbnVtYmVyLCB5OiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLGRlZ3JlZXM6IG51bWJlcixncmF2aXR5OiBudW1iZXIscmF0ZTogbnVtYmVyLCBzY2VuZTogU2NlbmUpIHtcclxuICAgICAgICB2YXIgaW1hZ2VzOkFycmF5PEhUTUxJbWFnZUVsZW1lbnQ+ID0gW107XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJsb2FkZXJcIiwgc2NlbmUuZ2FtZS5sb2FkZXIpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDw4O2krKyl7XHJcbiAgICAgICAgICAgIGxldCBuYW1lID0gIFwiYmlyZFwiICsgaTtcclxuICAgICAgICAgICAgaW1hZ2VzLnB1c2goc2NlbmUuZ2FtZS5sb2FkZXIuZ2V0SW1hZ2UobmFtZSkgYXMgSFRNTEltYWdlRWxlbWVudCk7XHJcbiAgICAgICAgfSBcclxuICAgICAgICBzdXBlcih4LCB5LCB3aWR0aCwgaGVpZ2h0LGltYWdlcyxkZWdyZWVzLFwiYmlyZFwiLHJhdGUpO1xyXG4gICAgICAgIHRoaXMuZ3Jhdml0eSA9IGdyYXZpdHk7XHJcbiAgICAgICAgdGhpcy5zcGVlZCA9IDA7XHJcbiAgICB9XHJcbiAgICB1cGRhdGUodGltZTogbnVtYmVyLCBkZWx0YVRpbWU6bnVtYmVyKXtcclxuICAgICAgICB0aGlzLnkgKz0gKHRoaXMuc3BlZWQgKyAwLjUqdGhpcy5ncmF2aXR5KSooZGVsdGFUaW1lLzE2LjY3KTtcclxuICAgICAgICB0aGlzLnNwZWVkICs9IHRoaXMuZ3Jhdml0eSooZGVsdGFUaW1lLzE2LjY3KTtcclxuICAgICAgICBpZih0aGlzLnkgPCAwKVxyXG4gICAgICAgICAgICB0aGlzLnkgPSAwO1xyXG4gICAgICAgIGlmKHRoaXMuc3BlZWQ+MCl7XHJcbiAgICAgICAgICAgIHRoaXMuZGVncmVlcyArPSAxO1xyXG4gICAgICAgICAgICBpZih0aGlzLmRlZ3JlZXM+MjApIHRoaXMuZGVncmVlcyA9IDIwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLmRlZ3JlZXMgLT0gMTtcclxuICAgICAgICAgICAgaWYodGhpcy5kZWdyZWVzPC0yMCkgdGhpcy5kZWdyZWVzID0gLTIwO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXlBbmltYXRpb24odGltZSwgZGVsdGFUaW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZmx5KGRlbHRhVGltZTogbnVtYmVyKXtcclxuICAgICAgICAvLyBhdWRpby5wbGF5KCk7IFxyXG4gICAgICAgIC8vIGF1ZGlvLnBsYXliYWNrUmF0ZSA9IDI7XHJcbiAgICAgICAgdGhpcy5zcGVlZCA9IC0xMDtcclxuICAgIH1cclxuICAgIHJlc2V0KCl7XHJcbiAgICAgICAgc3VwZXIucmVzZXQoKTtcclxuICAgICAgICB0aGlzLnNwZWVkID0gMDtcclxuICAgIH1cclxufSIsImltcG9ydCB7IEltYWdlT2JqZWN0IH0gZnJvbSBcIi4uL0VuZ2luZS9JbWFnZU9iamVjdC9JbWFnZU9iamVjdFwiO1xyXG5pbXBvcnQge0dhbWV9IGZyb20gXCIuLi9FbmdpbmUvQ29yZS9HYW1lXCI7XHJcbmNsYXNzIEdyb3VuZHtcclxuICAgIGltYWdlczogQXJyYXk8SW1hZ2VPYmplY3Q+O1xyXG4gICAgc3BlZWQ6IG51bWJlcjtcclxuICAgIGNvbnN0cnVjdG9yKHNwZWVkOiBudW1iZXIsIGdhbWU6IEdhbWUpe1xyXG4gICAgICAgIHZhciBpbWFnZSA9IGdhbWUubG9hZGVyLmdldEltYWdlKFwiZ3JvdW5kXCIpO1xyXG4gICAgICAgIHZhciBpbWFnZU9iamVjdDEgPSBuZXcgSW1hZ2VPYmplY3QoMCw2NzAsNjUwLDE1MCxpbWFnZSBhcyBIVE1MSW1hZ2VFbGVtZW50LDAsXCJncm91bmRcIik7XHJcbiAgICAgICAgdmFyIGltYWdlT2JqZWN0MiA9IG5ldyBJbWFnZU9iamVjdCg2NDksNjcwLDY1MCwxNTAsaW1hZ2UgYXMgSFRNTEltYWdlRWxlbWVudCwwLFwiZ3JvdW5kXCIpO1xyXG4gICAgICAgIHRoaXMuaW1hZ2VzID0gW2ltYWdlT2JqZWN0MSxpbWFnZU9iamVjdDJdO1xyXG4gICAgICAgIHRoaXMuc3BlZWQgPSBzcGVlZDtcclxuICAgIH1cclxuICAgIHVwZGF0ZSh0aW1lOiBudW1iZXIsIGRlbHRhVGltZTogbnVtYmVyKXtcclxuICAgICAgICBmb3IodmFyIGk9MDtpPHRoaXMuaW1hZ2VzLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICB0aGlzLmltYWdlc1tpXS54IC09IHRoaXMuc3BlZWQqKGRlbHRhVGltZS8xNi42Nyk7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuaW1hZ2VzW2ldLnggPCAtICg2NTArMjApKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2VzW2ldLnggPSB0aGlzLmltYWdlc1tNYXRoLmFicyhpLTEpXS54KzY0MDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gXHJcbiAgICB9XHJcbiAgICBnZXRDb21wb25lbnQoKXtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBcImltYWdlT2JqZWN0c1wiOiB0aGlzLmltYWdlcyxcclxuICAgICAgICAgICAgXCJzcHJpdGVzXCI6IFtdLFxyXG4gICAgICAgICAgICBcInRleHRPYmplY3RzXCI6IFtdXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHJlc2V0KCl7XHJcbiAgICAgICAgZm9yKHZhciBpPTA7aTx0aGlzLmltYWdlcy5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgdGhpcy5pbWFnZXNbaV0ucmVzZXQoKTtcclxuICAgICAgICB9IFxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge0dyb3VuZH07IiwiaW1wb3J0IHsgSW1hZ2VPYmplY3QgfSBmcm9tIFwiLi4vRW5naW5lL0ltYWdlT2JqZWN0L0ltYWdlT2JqZWN0XCI7XHJcbmltcG9ydCB7R2FtZX0gZnJvbSBcIi4uL0VuZ2luZS9Db3JlL0dhbWVcIlxyXG5jb25zdCBibGFua3MgPSAyMDA7XHJcbmNvbnN0IHBpcGVIZWlnaHQgPSAzNTA7XHJcbmNvbnN0IG51bVBpcGUgPSA0O1xyXG5jb25zdCBkaXN0YW5jZSA9IDI1MDtcclxuY29uc3QgcGlwZVdpZHRoID0gODA7XHJcbmNsYXNzIFBhaXJPZlBpcGV7XHJcbiAgICBQaXBlczogQXJyYXk8SW1hZ2VPYmplY3Q+O1xyXG4gICAgcHJpdmF0ZSBzcGVlZDogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHg6bnVtYmVyLCB5Om51bWJlciwgZ2FtZTogR2FtZSxzcGVlZDogbnVtYmVyKXtcclxuICAgICAgICB2YXIgUGlwZVVwID0gbmV3IEltYWdlT2JqZWN0KHgseSxwaXBlV2lkdGgscGlwZUhlaWdodCxnYW1lLmxvYWRlci5nZXRJbWFnZShcInBpcGVcIikgYXMgSFRNTEltYWdlRWxlbWVudCwxODAsXCJwaXBlXCIpO1xyXG4gICAgICAgIHZhciBQaXBlRG93biA9IG5ldyBJbWFnZU9iamVjdCh4LHkrcGlwZUhlaWdodCtibGFua3MscGlwZVdpZHRoLHBpcGVIZWlnaHQsZ2FtZS5sb2FkZXIuZ2V0SW1hZ2UoXCJwaXBlXCIpIGFzIEhUTUxJbWFnZUVsZW1lbnQsMCxcInBpcGVcIik7XHJcbiAgICAgICAgdmFyIGNoZWNrU2NvcmUgPSBuZXcgSW1hZ2VPYmplY3QoeCtwaXBlV2lkdGgseStwaXBlSGVpZ2h0LDEwLGJsYW5rcyxudWxsLDAsXCJjaGVja1Njb3JlXCIpO1xyXG4gICAgICAgIHRoaXMuUGlwZXM9IFtQaXBlVXAsUGlwZURvd24sY2hlY2tTY29yZV07XHJcbiAgICAgICAgdGhpcy5zcGVlZCA9IHNwZWVkO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKHRpbWU6bnVtYmVyLCBkZWx0YVRpbWU6bnVtYmVyKXtcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwzO2krKyl7XHJcbiAgICAgICAgICAgIHRoaXMuUGlwZXNbaV0ueCAtPSB0aGlzLnNwZWVkKihkZWx0YVRpbWUvMTYuNjcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJlc2V0KCl7XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8MztpKyspe1xyXG4gICAgICAgICAgICB0aGlzLlBpcGVzW2ldLnJlc2V0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0Q29tcG9uZW50KCl7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgXCJpbWFnZU9iamVjdHNcIjogdGhpcy5QaXBlcyxcclxuICAgICAgICAgICAgXCJzcHJpdGVzXCI6IFtdLFxyXG4gICAgICAgICAgICBcInRleHRPYmplY3RzXCI6IFtdXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBMaXN0UGFpck9mUGlwZXN7XHJcbiAgICBsaXN0UGlwZTogUGFpck9mUGlwZVtdO1xyXG4gICAgY29uc3RydWN0b3IoZ2FtZTogR2FtZSl7XHJcbiAgICAgICAgdGhpcy5saXN0UGlwZSA9IFtdO1xyXG4gICAgICAgIGZvcih2YXIgaT0wO2k8bnVtUGlwZTtpKyspe1xyXG4gICAgICAgICAgICB2YXIgeCA9IGkqZGlzdGFuY2UgKyBwaXBlV2lkdGggKyA0MDA7XHJcbiAgICAgICAgICAgIHZhciB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICotMjAwKTtcclxuICAgICAgICAgICAgdmFyIHBpcGUgPSBuZXcgUGFpck9mUGlwZSh4LHksZ2FtZSwzKTtcclxuICAgICAgICAgICAgdGhpcy5saXN0UGlwZS5wdXNoKHBpcGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHVwZGF0ZSgpe1xyXG4gICAgICAgIHRoaXMubGlzdFBpcGUubWFwKChwaXBlLGluZGV4KSA9PntcclxuICAgICAgICAgICAgaWYocGlwZS5QaXBlc1swXS54PC0xMDApe1xyXG4gICAgICAgICAgICAgICAgdmFyIGZyb250SW5kZXggPSBpbmRleCAtMTtcclxuICAgICAgICAgICAgICAgIGlmKGZyb250SW5kZXg8MCkgZnJvbnRJbmRleCA9IHRoaXMubGlzdFBpcGUubGVuZ3RoLTE7XHJcbiAgICAgICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDxwaXBlLlBpcGVzLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIHBpcGUuUGlwZXNbaV0ueCA9IHRoaXMubGlzdFBpcGVbZnJvbnRJbmRleF0uUGlwZXNbaV0ueCArIGRpc3RhbmNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHtQYWlyT2ZQaXBlLCBMaXN0UGFpck9mUGlwZXN9O1xyXG4iLCJpbXBvcnQgeyBUZXh0T2JqZWN0IH0gZnJvbSAnLi4vRW5naW5lL1RleHRPYmplY3QvVGV4dE9iamVjdCc7XHJcbmltcG9ydCB7QnV0dG9uT2JqZWN0IH0gZnJvbSAnLi4vRW5naW5lL0J1dHRvbk9iamVjdC9CdXR0b25PYmplY3QnO1xyXG5pbXBvcnQgeyBJbWFnZU9iamVjdCB9IGZyb20gJy4uL0VuZ2luZS9JbWFnZU9iamVjdC9JbWFnZU9iamVjdCc7XHJcblxyXG5leHBvcnQgY2xhc3MgUGFuZWxHYW1lT3ZlciB7XHJcbiAgICBpbWdHYW1lT3ZlcjogSW1hZ2VPYmplY3Q7XHJcbiAgICBjdXJyZW50U2NvcmU6IFRleHRPYmplY3Q7XHJcbiAgICBoaWdoU2NvcmU6IFRleHRPYmplY3Q7XHJcbiAgICByZXBsYXlCdXR0b246IEJ1dHRvbk9iamVjdDtcclxuICAgIGNvbnN0cnVjdG9yKGltZ0dhbWVPdmVyOiBJbWFnZU9iamVjdCwgY3VycmVudFNjb3JlOiBUZXh0T2JqZWN0LCBoaWdoU2NvcmU6IFRleHRPYmplY3QsIHJlcGxheUJ1dHRvbjogQnV0dG9uT2JqZWN0KXtcclxuICAgICAgICB0aGlzLmltZ0dhbWVPdmVyID0gaW1nR2FtZU92ZXI7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50U2NvcmUgPSBjdXJyZW50U2NvcmU7XHJcbiAgICAgICAgdGhpcy5oaWdoU2NvcmUgPSBoaWdoU2NvcmU7XHJcbiAgICAgICAgdGhpcy5yZXBsYXlCdXR0b24gPSByZXBsYXlCdXR0b247XHJcbiAgICB9XHJcbiAgICBzZXRBY3RpdmUoYWN0aXZlOiBib29sZWFuKXtcclxuICAgICAgICB0aGlzLmltZ0dhbWVPdmVyLnNldEFjdGl2ZShhY3RpdmUpO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFNjb3JlLnNldEFjdGl2ZShhY3RpdmUpO1xyXG4gICAgICAgIHRoaXMuaGlnaFNjb3JlLnNldEFjdGl2ZShhY3RpdmUpO1xyXG4gICAgICAgIHRoaXMucmVwbGF5QnV0dG9uLnNldEFjdGl2ZShhY3RpdmUpO1xyXG4gICAgfVxyXG4gICAgZ2V0Q29tcG9uZW50KCl7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgXCJpbWFnZU9iamVjdHNcIjogW3RoaXMuaW1nR2FtZU92ZXIsIHRoaXMucmVwbGF5QnV0dG9uXSxcclxuICAgICAgICAgICAgXCJzcHJpdGVzXCI6W10sXHJcbiAgICAgICAgICAgIFwidGV4dE9iamVjdHNcIjpbdGhpcy5jdXJyZW50U2NvcmUsdGhpcy5oaWdoU2NvcmVdXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHVwZGF0ZShjdXJyZW50U2NvcmU6IG51bWJlciwgaGlnaFNjb3JlOiBudW1iZXIpe1xyXG4gICAgICAgIHRoaXMuY3VycmVudFNjb3JlLnNldENvbnRlbnQoXCJTY29yZTogXCIgKyBjdXJyZW50U2NvcmUpO1xyXG4gICAgICAgIHRoaXMuaGlnaFNjb3JlLnNldENvbnRlbnQoXCJIaWdoIFNjb3JlOiBcIiArIGhpZ2hTY29yZSlcclxuICAgIH1cclxufVxyXG4vLyB2YXIgcmVwbGF5QnV0dG9uID0gbmV3IEJ1dHRvbk9iamVjdCgyMjUsNTAwLDE2MCw4MCxcIi4uL0ltYWdlcy9yZXBsYXktYnV0dG9uLnBuZ1wiLDAsXCJyZXBsYXlCdXR0b25cIik7XHJcbi8vIHZhciBpbWdHYW1lT3ZlciA9IG5ldyBJbWFnZU9iamVjdCg2MCwzMDAsNTAwLDEzMCxcIi4uL0ltYWdlcy9nYW1lb3Zlci5wbmdcIiwwLFwiZ2FtZU92ZXJcIik7XHJcbi8vIHZhciBjdXJyZW50U2NvcmUgPSBuZXcgVGV4dE9iamVjdCgxMTAsNDcwLFwic2hvd1Njb3JlXCIsXCJTY29yZTogMFwiLCBcIjMwcHggQXJpYWxcIixcIndoaXRlXCIpO1xyXG4vLyB2YXIgaGlnaFNjb3JlID0gbmV3IFRleHRPYmplY3QoMzMwLDQ3MCxcImhpZ2hTY29yZVwiLFwiSGlnaCBTY29yZTogMFwiLCBcIjMwcHggQXJpYWxcIixcIndoaXRlXCIpO1xyXG5cclxuLy8gdmFyIHBhbmVsR2FtZU92ZXIgPSBuZXcgUGFuZWxHYW1lT3ZlcihpbWdHYW1lT3ZlcixjdXJyZW50U2NvcmUsaGlnaFNjb3JlLHJlcGxheUJ1dHRvbik7XHJcbi8vIGV4cG9ydCB7cGFuZWxHYW1lT3Zlcn0iLCJpbXBvcnQge1NjZW5lfSBmcm9tICcuLi9FbmdpbmUvU2NlbmUvU2NlbmUnO1xyXG5pbXBvcnQge0JpcmR9IGZyb20gJy4vQmlyZCc7XHJcbmltcG9ydCB7TGlzdFBhaXJPZlBpcGVzfSBmcm9tICcuL1BhaXJPZlBpcGUnO1xyXG5pbXBvcnQgeyBUZXh0T2JqZWN0IH0gZnJvbSAnLi4vRW5naW5lL1RleHRPYmplY3QvVGV4dE9iamVjdCc7XHJcbmltcG9ydCB7IEltYWdlT2JqZWN0IH0gZnJvbSAnLi4vRW5naW5lL0ltYWdlT2JqZWN0L0ltYWdlT2JqZWN0JztcclxuaW1wb3J0IHtzY29yZX0gZnJvbSBcIi4vU2NvcmVcIjtcclxuaW1wb3J0IHsgR3JvdW5kIH0gZnJvbSAnLi9Hcm91bmQnO1xyXG5pbXBvcnQge1BhbmVsR2FtZU92ZXJ9IGZyb20gJy4vUGFuZWxHYW1lT3ZlcidcclxuaW1wb3J0IHtHYW1lfSBmcm9tICcuLi9FbmdpbmUvQ29yZS9HYW1lJ1xyXG5pbXBvcnQge0J1dHRvbk9iamVjdH0gZnJvbSAnLi4vRW5naW5lL0J1dHRvbk9iamVjdC9CdXR0b25PYmplY3QnO1xyXG5cclxuY29uc3QgcG9pbnQgPSBuZXcgQXVkaW8oXCIuLi9hdWRpby9wb2ludC5tcDNcIik7XHJcbmNvbnN0IGRpZSA9IG5ldyBBdWRpbyhcIi4uL2F1ZGlvL2RpZS5tcDNcIik7XHJcbmNvbnN0IGhpdCA9IG5ldyBBdWRpbyhcIi4uL2F1ZGlvL2hpdC5tcDNcIik7XHJcbmNvbnN0IGF1ZGlvUGxheWVyID0gbmV3IEF1ZGlvKFwiLi4vYXVkaW8vb3JjaGVzdHJhd2F2LTI2MTU4Lm1wM1wiKTtcclxuXHJcbmNvbnN0IGZwcyA9IDYwO1xyXG5leHBvcnQgY2xhc3MgUGxheVNjZW5lIGV4dGVuZHMgU2NlbmUge1xyXG4gICAgcmF0ZTogbnVtYmVyO1xyXG4gICAgYWR0OiBudW1iZXI7ICAgIC8vYWNjdW11bGF0ZWQgZGVsdGEgdGltZVxyXG4gICAgYmlyZDogQmlyZDtcclxuICAgIHBpcGVzOiBMaXN0UGFpck9mUGlwZXM7XHJcbiAgICBncm91bmQ6IEdyb3VuZDtcclxuICAgIGNoZWNrUGlwZTogYm9vbGVhbjtcclxuICAgIHRleHRTY29yZTogVGV4dE9iamVjdDtcclxuICAgIGFkZFNjb3JlOiBudW1iZXIgfCBudWxsO1xyXG4gICAgc2NvcmUgPSBzY29yZTtcclxuICAgIGRlYWRCaXJkOiBib29sZWFuO1xyXG4gICAgcGFuZWxHYW1lT3ZlciA6IFBhbmVsR2FtZU92ZXI7XHJcbiAgICBzdGFydDogYm9vbGVhbjtcclxuICAgIGNvbnN0cnVjdG9yKGdhbWU6IEdhbWUpe1xyXG4gICAgICAgIHN1cGVyKGdhbWUpO1xyXG4gICAgICAgIC8vIHBsYXkgYXVkaW9cclxuICAgICAgICAvLyBhdWRpb1BsYXllci5wbGF5KCk7XHJcbiAgICAgICAgLy8gYXVkaW9QbGF5ZXIubG9vcCA9dHJ1ZTtcclxuICAgICAgICB0aGlzLnJhdGUgPSAxLjAvZnBzKjEwMDA7XHJcbiAgICAgICAgdGhpcy5hZHQgPSAwLjA7XHJcbiAgICAgICAgdGhpcy5jaGVja1BpcGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmFkZFNjb3JlID0gbnVsbDtcclxuICAgICAgICB0aGlzLmRlYWRCaXJkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zdGFydCA9IGZhbHNlOyBcclxuICAgICAgICB0aGlzLmJpcmQgPSAgbmV3IEJpcmQoMTAwLDI4MCw1MCw1MCwwLDAuNSwzMCx0aGlzKVxyXG4gICAgICAgIHRoaXMudGV4dFNjb3JlID0gbmV3IFRleHRPYmplY3QoMTAsMzAsXCJzY29yZVwiLFwiU2NvcmU6IFwiKyB0aGlzLnNjb3JlLmdldEN1cnJlbnRTY29yZSgpLCBcIjE4cHggQXJpYWxcIiwgXCJ3aGl0ZVwiKTtcclxuICAgICAgICB2YXIgYmcgPSBuZXcgSW1hZ2VPYmplY3QoMCwwLDcwMCw4MDAsZ2FtZS5sb2FkZXIuZ2V0SW1hZ2UoXCJiYWNrZ3JvdW5kXCIpIGFzIEhUTUxJbWFnZUVsZW1lbnQsMCxcImJhY2tncm91bmRcIik7XHJcbiAgICAgICAgdGhpcy5ncm91bmQgPSBuZXcgR3JvdW5kKDIsZ2FtZSk7XHJcbiAgICAgICAgdGhpcy5waXBlcyA9IG5ldyBMaXN0UGFpck9mUGlwZXMoZ2FtZSk7XHJcblxyXG4gICAgICAgIHRoaXMucGFuZWxHYW1lT3ZlciA9IG5ldyBQYW5lbEdhbWVPdmVyKFxyXG4gICAgICAgICAgICBuZXcgSW1hZ2VPYmplY3QoNjAsMzAwLDUwMCwxMzAsZ2FtZS5sb2FkZXIuZ2V0SW1hZ2UoXCJnYW1lb3ZlclwiKSBhcyBIVE1MSW1hZ2VFbGVtZW50LDAsXCJnYW1lT3ZlclwiKSxcclxuICAgICAgICAgICAgbmV3IFRleHRPYmplY3QoMTEwLDQ3MCxcInNob3dTY29yZVwiLFwiU2NvcmU6IDBcIiwgXCIzMHB4IEFyaWFsXCIsXCJ3aGl0ZVwiKSxcclxuICAgICAgICAgICAgbmV3IFRleHRPYmplY3QoMzMwLDQ3MCxcImhpZ2hTY29yZVwiLFwiSGlnaCBTY29yZTogMFwiLCBcIjMwcHggQXJpYWxcIixcIndoaXRlXCIpLFxyXG4gICAgICAgICAgICBuZXcgQnV0dG9uT2JqZWN0KDIyNSw1MDAsMTYwLDgwLGdhbWUubG9hZGVyLmdldEltYWdlKFwicmVwbGF5QnV0dG9uXCIpIGFzIEhUTUxJbWFnZUVsZW1lbnQsMCxcInJlcGxheUJ1dHRvblwiKSwgXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5hZGRDaGlsZChbYmddLFt0aGlzLmJpcmRdLFt0aGlzLnRleHRTY29yZV0pO1xyXG4gICAgICAgIGZvcih2YXIgaT0wO2k8dGhpcy5waXBlcy5saXN0UGlwZS5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgdmFyIHBpcGUgPSB0aGlzLnBpcGVzLmxpc3RQaXBlW2ldO1xyXG4gICAgICAgICAgICB0aGlzLmFkZENoaWxkKFxyXG4gICAgICAgICAgICAgICAgcGlwZS5nZXRDb21wb25lbnQoKVtcImltYWdlT2JqZWN0c1wiXSxcclxuICAgICAgICAgICAgICAgIHBpcGUuZ2V0Q29tcG9uZW50KClbXCJzcHJpdGVzXCJdLFxyXG4gICAgICAgICAgICAgICAgcGlwZS5nZXRDb21wb25lbnQoKVtcInRleHRPYmplY3RzXCJdXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmFkZENoaWxkKFxyXG4gICAgICAgICAgICB0aGlzLmdyb3VuZC5nZXRDb21wb25lbnQoKVtcImltYWdlT2JqZWN0c1wiXSxcclxuICAgICAgICAgICAgdGhpcy5ncm91bmQuZ2V0Q29tcG9uZW50KClbXCJzcHJpdGVzXCJdLFxyXG4gICAgICAgICAgICB0aGlzLmdyb3VuZC5nZXRDb21wb25lbnQoKVtcInRleHRPYmplY3RzXCJdXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgdGhpcy5hZGRDaGlsZChcclxuICAgICAgICAgICAgdGhpcy5wYW5lbEdhbWVPdmVyLmdldENvbXBvbmVudCgpW1wiaW1hZ2VPYmplY3RzXCJdLFxyXG4gICAgICAgICAgICB0aGlzLnBhbmVsR2FtZU92ZXIuZ2V0Q29tcG9uZW50KClbXCJzcHJpdGVzXCJdLFxyXG4gICAgICAgICAgICB0aGlzLnBhbmVsR2FtZU92ZXIuZ2V0Q29tcG9uZW50KClbXCJ0ZXh0T2JqZWN0c1wiXVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgLy8gaGlkZW4gcGFuZWxHYW1lT3ZlclxyXG4gICAgICAgIHRoaXMucGFuZWxHYW1lT3Zlci5zZXRBY3RpdmUoZmFsc2UpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICB1cGRhdGUodGltZTogbnVtYmVyLCBkZWx0YVRpbWU6IG51bWJlcikge1xyXG4gICAgICAgIGlmKCAhdGhpcy5kZWFkQmlyZCAmJiB0aGlzLnN0YXJ0KXtcclxuICAgICAgICAgICAgLy8gdGhpcy5hZHQgKz0gZGVsdGFUaW1lXHJcbiAgICAgICAgICAgIHZhciBncm91bmQgPSB0aGlzLmltYWdlT2JqZWN0cy5maWx0ZXIoKGltYik9PntcclxuICAgICAgICAgICAgICAgIHJldHVybiBpbWIubmFtZSA9PT0gXCJncm91bmRcIjtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIHBpcGVzID0gdGhpcy5pbWFnZU9iamVjdHMuZmlsdGVyKChpbWIpPT57XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaW1iLm5hbWUgPT09IFwicGlwZVwiO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHZhciBjaGVja1Njb3JlID0gdGhpcy5pbWFnZU9iamVjdHMuZmlsdGVyKChpbWIpPT57XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaW1iLm5hbWUgPT09IFwiY2hlY2tTY29yZVwiO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAvLyBpZih0aGlzLmFkdD49dGhpcy5yYXRlKXtcclxuICAgICAgICAgICAgLy8gICAgIHRoaXMuYWR0IC09IHRoaXMucmF0ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ3JvdW5kLnVwZGF0ZSh0aW1lLCBkZWx0YVRpbWUpO1xyXG4gICAgICAgICAgICAgICAgLy8gZm9yICh2YXIgaSA9IDA7IGkgPHRoaXMuaW1hZ2VPYmplY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5pbWFnZU9iamVjdHNbaV0udXBkYXRlKHRpbWUsIGRlbHRhVGltZSk7XHJcbiAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8dGhpcy5zcHJpdGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5zcHJpdGVzW2ldLm5hbWUgPT09IFwiYmlyZFwiKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yKHZhciBqID0gMDsgaiA8IHBpcGVzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLkNvbGxpc2lvbihwaXBlc1tqXSx0aGlzLnNwcml0ZXNbaV0pKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrUGlwZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJnYW1lIG92ZXIhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgY2hlY2tTY29yZS5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5Db2xsaXNpb24oY2hlY2tTY29yZVtrXSx0aGlzLnNwcml0ZXNbaV0pJiYgdGhpcy5hZGRTY29yZSAhPSBrKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjb3JlLnNldEN1cnJlbnRTY29yZSh0aGlzLnNjb3JlLmdldEN1cnJlbnRTY29yZSgpKzEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGV4dFNjb3JlLmNvbnRlbnQgPSBcIlNjb3JlOiBcIiArIHRoaXMuc2NvcmUuZ2V0Q3VycmVudFNjb3JlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRTY29yZSA9IGs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcG9pbnQucGxheSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGlwZXMubGlzdFBpcGUubWFwKChwaXBlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwaXBlLnVwZGF0ZSh0aW1lLCBkZWx0YVRpbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVzW2ldLnVwZGF0ZSh0aW1lLGRlbHRhVGltZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuaW5wdXRLZXk9PT1cIlNwYWNlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmlyZC5mbHkoZGVsdGFUaW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXMuY2hlY2tQaXBlJiYoIXRoaXMuQ29sbGlzaW9uKGdyb3VuZFswXSwgdGhpcy5zcHJpdGVzW2ldKSYmIXRoaXMuQ29sbGlzaW9uKGdyb3VuZFsxXSwgdGhpcy5zcHJpdGVzW2ldKSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZXNbaV0udXBkYXRlKHRpbWUsZGVsdGFUaW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0ZXN0XCIsIGdyb3VuZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5Db2xsaXNpb24oZ3JvdW5kWzBdLCB0aGlzLnNwcml0ZXNbaV0pfHx0aGlzLkNvbGxpc2lvbihncm91bmRbMV0sIHRoaXMuc3ByaXRlc1tpXSl8fHRoaXMuY2hlY2tQaXBlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuc2NvcmUuZ2V0Q3VycmVudFNjb3JlKCk+IHRoaXMuc2NvcmUuZ2V0SGlnaFNjb3JlKCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY29yZS5zZXRIaWdoU2NvcmUodGhpcy5zY29yZS5nZXRDdXJyZW50U2NvcmUoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzaG93IHBhbmVsR2FtZU92ZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGFuZWxHYW1lT3Zlci5zZXRBY3RpdmUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnNwcml0ZXNbaV0uc2V0QWN0aXZlKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHVwZGF0ZSBzY29yZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wYW5lbEdhbWVPdmVyLnVwZGF0ZSh0aGlzLnNjb3JlLmdldEN1cnJlbnRTY29yZSgpLCB0aGlzLnNjb3JlLmdldEhpZ2hTY29yZSgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNldCBzdGF0ZSBiaXJkIGlzIGRpZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWFkQmlyZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcGxheSBhdWRpb1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYXVkaW9QbGF5ZXIucGF1c2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGhpdC5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIGRpZS5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgIH0sIDUwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlc1tpXS51cGRhdGUodGltZSxkZWx0YVRpbWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5waXBlcy51cGRhdGUoKTtcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHRoaXMuZGVhZEJpcmQpe1xyXG4gICAgICAgICAgICBpZih0aGlzLmlucHV0S2V5ICE9PSBcIlwifHwodGhpcy5tb3VzZUV2ZW50IT1udWxsJiYgdGhpcy5wYW5lbEdhbWVPdmVyLnJlcGxheUJ1dHRvbi5pc0luc2lkZSh0aGlzLm1vdXNlRXZlbnQpKSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlYWRCaXJkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhbmVsR2FtZU92ZXIuc2V0QWN0aXZlKGZhbHNlKTsgICBcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzZXRTY2VuZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoIXRoaXMuc3RhcnQpe1xyXG4gICAgICAgICAgICBpZih0aGlzLmlucHV0S2V5ID09PSBcIlNwYWNlXCIpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0ID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXNldFNjZW5lKCl7XHJcbiAgICAgICAgLy8gYXVkaW9QbGF5ZXIucGxheSgpO1xyXG4gICAgICAgIC8vIGF1ZGlvUGxheWVyLmxvb3AgPXRydWU7XHJcbiAgICAgICAgdGhpcy5jaGVja1BpcGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmFkZFNjb3JlID0gbnVsbDtcclxuICAgICAgICB0aGlzLnN0YXJ0ID0gZmFsc2U7XHJcbiAgICAgICAgc3VwZXIucmVzZXRTY2VuZSgpO1xyXG4gICAgICAgIHRoaXMuc2NvcmUuc2V0Q3VycmVudFNjb3JlKDApO1xyXG4gICAgICAgIHRoaXMuYmlyZC5yZXNldCgpO1xyXG4gICAgICAgIHRoaXMuZ3JvdW5kLnJlc2V0KCk7XHJcbiAgICAgICAgdGhpcy50ZXh0U2NvcmUuc2V0Q29udGVudChcIlNjb3JlOiAwXCIpO1xyXG4gICAgICAgIGZvcih2YXIgaT0wO2k8dGhpcy5waXBlcy5saXN0UGlwZS5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgdGhpcy5waXBlcy5saXN0UGlwZVtpXS5yZXNldCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyhcInJlbmRlcmluZ1wiKTtcclxuICAgIH1cclxufVxyXG5cclxuLy8gdmFyIHBsYXlTY2VuZSA9IG5ldyBQbGF5U2NlbmUoKTtcclxuLy8gZXhwb3J0IHtwbGF5U2NlbmV9OyIsImNsYXNzIFNjb3Jle1xyXG4gICAgcHJpdmF0ZSBoaWdoU2NvcmU6IG51bWJlcjtcclxuICAgIHByaXZhdGUgY3VycmVudFNjb3JlOiBudW1iZXI7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMuaGlnaFNjb3JlID0gMDtcclxuICAgICAgICB0aGlzLmN1cnJlbnRTY29yZSA9IDA7XHJcbiAgICB9XHJcbiAgICBzZXRDdXJyZW50U2NvcmUoc2NvcmU6IG51bWJlcil7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50U2NvcmUgPSBzY29yZTtcclxuICAgIH1cclxuICAgIGdldEN1cnJlbnRTY29yZSgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRTY29yZTtcclxuICAgIH1cclxuICAgIGdldEhpZ2hTY29yZSgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmhpZ2hTY29yZTtcclxuICAgIH1cclxuICAgIHNldEhpZ2hTY29yZShoaWdoU2NvcmU6IG51bWJlcil7XHJcbiAgICAgICAgdGhpcy5oaWdoU2NvcmUgPSBoaWdoU2NvcmU7XHJcbiAgICB9XHJcbn1cclxuXHJcbnZhciBzY29yZSA9IG5ldyBTY29yZSgpO1xyXG5leHBvcnQge3Njb3JlLFNjb3JlfTsiLCJpbXBvcnQge1NjZW5lfSBmcm9tICcuLi9FbmdpbmUvU2NlbmUvU2NlbmUnO1xyXG5pbXBvcnQgeyBJbWFnZU9iamVjdCB9IGZyb20gJy4uL0VuZ2luZS9JbWFnZU9iamVjdC9JbWFnZU9iamVjdCc7XHJcbmltcG9ydCB7IEJ1dHRvbk9iamVjdCB9IGZyb20gJy4uL0VuZ2luZS9CdXR0b25PYmplY3QvQnV0dG9uT2JqZWN0JztcclxuaW1wb3J0IHtHcm91bmR9IGZyb20gXCIuL0dyb3VuZFwiXHJcbmltcG9ydCB7IEdhbWUgfSBmcm9tICcuLi9FbmdpbmUvQ29yZS9HYW1lJztcclxuY29uc3QgZnBzID0gNjA7XHJcbmV4cG9ydCBjbGFzcyBTdGFydFNjZW5lIGV4dGVuZHMgU2NlbmUge1xyXG4gICAgYmFja2dyb3VuZDogSW1hZ2VPYmplY3Q7XHJcbiAgICBncm91bmQ6IEdyb3VuZDtcclxuICAgIGltZ1N0YXJ0OiBJbWFnZU9iamVjdDtcclxuICAgIGJ1dHRvblN0YXJ0OiBCdXR0b25PYmplY3RcclxuICAgIGNvbnN0cnVjdG9yKGdhbWU6IEdhbWUpe1xyXG4gICAgICAgIHN1cGVyKGdhbWUpO1xyXG4gICAgICAgIHRoaXMuYmFja2dyb3VuZCA9bmV3IEltYWdlT2JqZWN0KDAsMCw3MDAsODAwLGdhbWUubG9hZGVyLmdldEltYWdlKFwiYmFja2dyb3VuZFwiKSBhcyBIVE1MSW1hZ2VFbGVtZW50LDAsXCJiYWNrZ3JvdW5kXCIpO1xyXG4gICAgICAgIHRoaXMuaW1nU3RhcnQgPSBuZXcgSW1hZ2VPYmplY3QoNTAsMjAsNTAwLDcwMCxnYW1lLmxvYWRlci5nZXRJbWFnZShcIm1lc3NhZ2VcIikgYXMgSFRNTEltYWdlRWxlbWVudCwwLFwiXCIpO1xyXG4gICAgICAgIHRoaXMuYnV0dG9uU3RhcnQgPSBuZXcgQnV0dG9uT2JqZWN0KDAsMCw3MDAsODAwLG51bGwsMCxcImJ1dHRvblN0YXJ0XCIpO1xyXG4gICAgICAgIHRoaXMuZ3JvdW5kID0gbmV3IEdyb3VuZCgyLGdhbWUpXHJcbiAgICAgICAgdmFyIGltYWdlT2JqZWN0cyA9IFt0aGlzLmJhY2tncm91bmRdLmNvbmNhdCh0aGlzLmdyb3VuZC5nZXRDb21wb25lbnQoKVtcImltYWdlT2JqZWN0c1wiXSk7XHJcbiAgICAgICAgaW1hZ2VPYmplY3RzLnB1c2godGhpcy5pbWdTdGFydCk7XHJcbiAgICAgICAgdGhpcy5hZGRDaGlsZChpbWFnZU9iamVjdHMsW10sW10pO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKHRpbWU6IG51bWJlciwgZGVsdGFUaW1lOiBudW1iZXIpe1xyXG4gICAgICAgIHRoaXMuZ3JvdW5kLnVwZGF0ZSh0aW1lLCBkZWx0YVRpbWUpO1xyXG4gICAgICAgIGlmKHRoaXMuaW5wdXRLZXkgPT09IFwiRW50ZXJcInx8dGhpcy5pbnB1dEtleSA9PT0gXCJTcGFjZVwiIHx8KHRoaXMubW91c2VFdmVudCE9bnVsbCAmJiB0aGlzLmJ1dHRvblN0YXJ0LmlzSW5zaWRlKHRoaXMubW91c2VFdmVudCkpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5zY2VuZU1hbmFnZXIuc3dpdGNoU2NlbmUoMSlcclxuICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxufVxyXG5cclxuLy8gdmFyIHN0YXJ0U2NlbmUgPSBuZXcgU3RhcnRTY2VuZSgpO1xyXG4vLyBleHBvcnQge3N0YXJ0U2NlbmV9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgU3RhcnRTY2VuZSB9IGZyb20gXCIuL2dhbWUvU3RhcnRTY2VuZVwiO1xyXG5pbXBvcnQgeyBSZW5kZXJlciB9IGZyb20gXCIuL0VuZ2luZS9SZW5kZXJlci9SZW5kZXJlclwiO1xyXG5pbXBvcnQgeyBTY2VuZU1hbmFnZXIgfSBmcm9tIFwiLi9FbmdpbmUvU2NlbmUvU2NlbmVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEdhbWUgfSBmcm9tIFwiLi9FbmdpbmUvQ29yZS9HYW1lXCI7ICBcclxuaW1wb3J0IHtQbGF5U2NlbmV9IGZyb20gXCIuL2dhbWUvUGxheVNjZW5lXCI7XHJcblxyXG52YXIgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ215Q2FudmFzJykgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XHJcbnZhciByZW5kZXIgPSBuZXcgUmVuZGVyZXIoY2FudmFzKVxyXG52YXIgZ2FtZVNjZW5lID0gbmV3IFNjZW5lTWFuYWdlcigpO1xyXG52YXIgbXlHYW1lID0gbmV3IEdhbWUoZ2FtZVNjZW5lKTtcclxuXHJcbmNvbnN0IGltYWdlc0xvYWQgPSBbXHJcbiAgICB7XHJcbiAgICAgICAgXCJrZXlcIjogXCJiaXJkMFwiLFxyXG4gICAgICAgIFwicGF0aFwiOiBcIi9JbWFnZXMvYmlyZC9mcmFtZS0xLnBuZ1wiLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImtleVwiOiBcImJpcmQxXCIsXHJcbiAgICAgICAgXCJwYXRoXCI6IFwiL0ltYWdlcy9iaXJkL2ZyYW1lLTIucG5nXCIsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwia2V5XCI6IFwiYmlyZDJcIixcclxuICAgICAgICBcInBhdGhcIjogXCIvSW1hZ2VzL2JpcmQvZnJhbWUtMy5wbmdcIixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJrZXlcIjogXCJiaXJkM1wiLFxyXG4gICAgICAgIFwicGF0aFwiOiBcIi9JbWFnZXMvYmlyZC9mcmFtZS00LnBuZ1wiLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImtleVwiOiBcImJpcmQ0XCIsXHJcbiAgICAgICAgXCJwYXRoXCI6IFwiL0ltYWdlcy9iaXJkL2ZyYW1lLTUucG5nXCIsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwia2V5XCI6IFwiYmlyZDVcIixcclxuICAgICAgICBcInBhdGhcIjogXCIvSW1hZ2VzL2JpcmQvZnJhbWUtNi5wbmdcIixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJrZXlcIjogXCJiaXJkNlwiLFxyXG4gICAgICAgIFwicGF0aFwiOiBcIi9JbWFnZXMvYmlyZC9mcmFtZS03LnBuZ1wiLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImtleVwiOiBcImJpcmQ3XCIsXHJcbiAgICAgICAgXCJwYXRoXCI6IFwiL0ltYWdlcy9iaXJkL2ZyYW1lLTgucG5nXCIsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwia2V5XCI6IFwicGlwZVwiLFxyXG4gICAgICAgIFwicGF0aFwiOiBcIi9JbWFnZXMvcGlwZS9waXBlLWdyZWVuLnBuZ1wiLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImtleVwiOiBcIm1lc3NhZ2VcIixcclxuICAgICAgICBcInBhdGhcIjogXCIvSW1hZ2VzL2dhbWVTdGFydC9tZXNzYWdlLnBuZ1wiLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImtleVwiOiBcImdyb3VuZFwiLFxyXG4gICAgICAgIFwicGF0aFwiOiBcIi9JbWFnZXMvZ3JvdW5kL2Jhc2UucG5nXCIsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwia2V5XCI6IFwiZ2FtZW92ZXJcIixcclxuICAgICAgICBcInBhdGhcIjogXCIvSW1hZ2VzL3BhbmVsR2FtZU92ZXIvZ2FtZW92ZXIucG5nXCIsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwia2V5XCI6IFwicmVwbGF5QnV0dG9uXCIsXHJcbiAgICAgICAgXCJwYXRoXCI6IFwiL0ltYWdlcy9wYW5lbEdhbWVPdmVyL3JlcGxheS1idXR0b24ucG5nXCIsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwia2V5XCI6IFwiYmFja2dyb3VuZFwiLFxyXG4gICAgICAgIFwicGF0aFwiOiBcIi9JbWFnZXMvdGFuLnBuZ1wiXHJcbiAgICB9XHJcbl1cclxuXHJcbmNvbnN0IHByb21pc2VzID0gaW1hZ2VzTG9hZC5tYXAoKGltYWdlKSA9PiBteUdhbWUubG9hZGVyLmFkZEltYWdlKGltYWdlW1wicGF0aFwiXSwgaW1hZ2VbXCJrZXlcIl0pKVxyXG5Qcm9taXNlLmFsbChwcm9taXNlcykudGhlbigoKT0+IHtcclxuICAgIHZhciBzdGFydFNjZW5lID0gbmV3IFN0YXJ0U2NlbmUobXlHYW1lKTtcclxuICAgIHZhciBwbGF5U2NlbmUgPSBuZXcgUGxheVNjZW5lKG15R2FtZSk7XHJcbiAgICBnYW1lU2NlbmUuYWRkU2NlbmUoc3RhcnRTY2VuZSk7XHJcbiAgICBnYW1lU2NlbmUuYWRkU2NlbmUocGxheVNjZW5lKTtcclxuICAgIG15R2FtZS5zdGFydChyZW5kZXIpO1xyXG59KS5jYXRjaCgoZXJyb3IpID0+IHtjb25zb2xlLmxvZyhlcnJvcil9KVxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=