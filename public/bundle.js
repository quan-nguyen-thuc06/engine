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
    }
    start(render) {
        this.processInput.handleInput(this.sceneManager, render);
        requestAnimationFrame(() => this.loop(render));
    }
    loop(render) {
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
            ctx.drawImage(sprite.images[sprite.frameCurrent], -sprite.width / 2, -sprite.height / 2, sprite.width, sprite.height);
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
        this.frameCurrent = 0;
        this.rate = 1.0 / fps * 1000;
        this.adt = 0;
    }
    update(time, deltaTime) {
    }
    playAnimation(time, deltaTime) {
        this.adt += deltaTime;
        if (this.adt >= this.rate) {
            this.adt -= this.rate;
            this.frameCurrent += 1;
            if (this.frameCurrent > this.images.length - 1) {
                this.frameCurrent = 0;
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
        this.speed = -8;
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
class PlayScene extends _Engine_Scene_Scene__WEBPACK_IMPORTED_MODULE_0__.Scene {
    constructor(game) {
        super(game);
        this.score = _Score__WEBPACK_IMPORTED_MODULE_5__.score;
        // play audio
        // audioPlayer.play();
        // audioPlayer.loop =true;
        this.checkPipe = false;
        this.addScore = null;
        this.deadBird = false;
        this.start = false;
        this.bird = new _Bird__WEBPACK_IMPORTED_MODULE_1__.Bird(100, 280, 50, 50, 0, 0.5, 20, this);
        this.textScore = new _Engine_TextObject_TextObject__WEBPACK_IMPORTED_MODULE_3__.TextObject(10, 30, "score", "Score: " + this.score.getCurrentScore(), "18px Arial", "white");
        var bg = new _Engine_ImageObject_ImageObject__WEBPACK_IMPORTED_MODULE_4__.ImageObject(0, 0, 700, 800, game.loader.getImage("background"), 0, "background");
        this.ground = new _Ground__WEBPACK_IMPORTED_MODULE_6__.Ground(2, game);
        this.pipes = new _PairOfPipe__WEBPACK_IMPORTED_MODULE_2__.ListPairOfPipes(game);
        this.panelGameOver = new _PanelGameOver__WEBPACK_IMPORTED_MODULE_7__.PanelGameOver(new _Engine_ImageObject_ImageObject__WEBPACK_IMPORTED_MODULE_4__.ImageObject(60, 300, 500, 130, game.loader.getImage("gameover"), 0, "gameOver"), new _Engine_TextObject_TextObject__WEBPACK_IMPORTED_MODULE_3__.TextObject(110, 470, "showScore", "Score: 0", "30px Arial", "white"), new _Engine_TextObject_TextObject__WEBPACK_IMPORTED_MODULE_3__.TextObject(330, 470, "highScore", "High Score: 0", "30px Arial", "white"), new _Engine_ButtonObject_ButtonObject__WEBPACK_IMPORTED_MODULE_8__.ButtonObject(225, 500, 160, 80, game.loader.getImage("replayButton"), 0, "replayButton"));
        // addChild
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
            var ground = this.imageObjects.filter((imb) => {
                return imb.name === "ground";
            });
            var pipes = this.imageObjects.filter((imb) => {
                return imb.name === "pipe";
            });
            var checkScore = this.imageObjects.filter((imb) => {
                return imb.name === "checkScore";
            });
            this.ground.update(time, deltaTime);
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
                    if (this.Collision(ground[0], this.sprites[i]) || this.Collision(ground[1], this.sprites[i]) || this.checkPipe) {
                        if (this.score.getCurrentScore() > this.score.getHighScore())
                            this.score.setHighScore(this.score.getCurrentScore());
                        // show panelGameOver
                        this.panelGameOver.setActive(true);
                        // hiden bird
                        this.bird.setActive(false);
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
        }
        else if (this.deadBird) {
            if (this.inputKey !== "" || (this.mouseEvent != null && this.panelGameOver.replayButton.isInside(this.mouseEvent))) {
                this.deadBird = false;
                this.panelGameOver.setActive(false);
                this.bird.setActive(true);
                this.game.sceneManager.switchScene(1);
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
        for (var i = 0; i < this.pipes.listPipe.length; i++) {
            this.pipes.listPipe[i].reset();
        }
        console.log("rendering");
    }
}


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
        "path": "/Images/background/background-night.png"
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUssQ0FBQyxDQUFDLENBQUM7QUFDL0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRSxFQUFFO0lBQzNCLElBQUksVUFBVSxHQUFHLElBQUksd0RBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN4QyxJQUFJLFNBQVMsR0FBRyxJQUFJLHNEQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdEMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMvQixTQUFTLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzlCLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDekIsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsR0FBRSxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWVrMS8uL3NyYy9FbmdpbmUvQnV0dG9uT2JqZWN0L0J1dHRvbk9iamVjdC50cyIsIndlYnBhY2s6Ly93ZWVrMS8uL3NyYy9FbmdpbmUvQ29yZS9HYW1lLnRzIiwid2VicGFjazovL3dlZWsxLy4vc3JjL0VuZ2luZS9HYW1lT2JqZWN0L0dhbWVPYmplY3QudHMiLCJ3ZWJwYWNrOi8vd2VlazEvLi9zcmMvRW5naW5lL0ltYWdlTG9hZGVyL0ltYWdlTG9hZGVyLnRzIiwid2VicGFjazovL3dlZWsxLy4vc3JjL0VuZ2luZS9JbWFnZU9iamVjdC9JbWFnZU9iamVjdC50cyIsIndlYnBhY2s6Ly93ZWVrMS8uL3NyYy9FbmdpbmUvUHJvY2Vzc0lucHV0L1Byb2Nlc3NJbnB1dC50cyIsIndlYnBhY2s6Ly93ZWVrMS8uL3NyYy9FbmdpbmUvUmVuZGVyZXIvUmVuZGVyZXIudHMiLCJ3ZWJwYWNrOi8vd2VlazEvLi9zcmMvRW5naW5lL1NjZW5lL1NjZW5lLnRzIiwid2VicGFjazovL3dlZWsxLy4vc3JjL0VuZ2luZS9TY2VuZS9TY2VuZU1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vd2VlazEvLi9zcmMvRW5naW5lL1Nwcml0ZS9TcHJpdGUudHMiLCJ3ZWJwYWNrOi8vd2VlazEvLi9zcmMvRW5naW5lL1RleHRPYmplY3QvVGV4dE9iamVjdC50cyIsIndlYnBhY2s6Ly93ZWVrMS8uL3NyYy9nYW1lL0JpcmQudHMiLCJ3ZWJwYWNrOi8vd2VlazEvLi9zcmMvZ2FtZS9Hcm91bmQudHMiLCJ3ZWJwYWNrOi8vd2VlazEvLi9zcmMvZ2FtZS9QYWlyT2ZQaXBlLnRzIiwid2VicGFjazovL3dlZWsxLy4vc3JjL2dhbWUvUGFuZWxHYW1lT3Zlci50cyIsIndlYnBhY2s6Ly93ZWVrMS8uL3NyYy9nYW1lL1BsYXlTY2VuZS50cyIsIndlYnBhY2s6Ly93ZWVrMS8uL3NyYy9nYW1lL1Njb3JlLnRzIiwid2VicGFjazovL3dlZWsxLy4vc3JjL2dhbWUvU3RhcnRTY2VuZS50cyIsIndlYnBhY2s6Ly93ZWVrMS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWVrMS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VlazEvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWVrMS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlZWsxLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEltYWdlT2JqZWN0fSBmcm9tIFwiLi4vSW1hZ2VPYmplY3QvSW1hZ2VPYmplY3RcIjtcclxuZXhwb3J0IGNsYXNzIEJ1dHRvbk9iamVjdCBleHRlbmRzIEltYWdlT2JqZWN0e1xyXG4gICAgY29uc3RydWN0b3IoeDogbnVtYmVyLCB5OiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50IHwgbnVsbCwgZGVncmVlczogbnVtYmVyLCBuYW1lOiBzdHJpbmcpe1xyXG4gICAgICAgIHN1cGVyKHgsIHksIHdpZHRoLCBoZWlnaHQsaW1hZ2UsIGRlZ3JlZXMsIG5hbWUpO1xyXG4gICAgfVxyXG4gICAgaXNJbnNpZGUocG9zOiBBcnJheTxudW1iZXI+KXtcclxuICAgICAgICBpZihwb3MubGVuZ3RoIDwgMikgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIHJldHVybiBwb3NbMF0gPiB0aGlzLnggJiYgcG9zWzBdIDwgdGhpcy54K3RoaXMud2lkdGggJiYgcG9zWzFdIDwgdGhpcy55K3RoaXMuaGVpZ2h0ICYmIHBvc1sxXSA+IHRoaXMueTtcclxuICAgIH0gICAgXHJcbn0iLCJpbXBvcnQgeyBTY2VuZU1hbmFnZXIgfSBmcm9tIFwiLi4vU2NlbmUvU2NlbmVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFJlbmRlcmVyIH0gZnJvbSBcIi4uL1JlbmRlcmVyL1JlbmRlcmVyXCI7XHJcbmltcG9ydCB7IFByb2Nlc3NJbnB1dCB9IGZyb20gXCIuLi9Qcm9jZXNzSW5wdXQvUHJvY2Vzc0lucHV0XCI7XHJcbmltcG9ydCB7SW1hZ2VMb2FkZXIgfSBmcm9tIFwiLi4vSW1hZ2VMb2FkZXIvSW1hZ2VMb2FkZXJcIjtcclxuZXhwb3J0IGNsYXNzIEdhbWV7XHJcbiAgICBzY2VuZU1hbmFnZXI6IFNjZW5lTWFuYWdlcjtcclxuICAgIGxhc3RUaW1lOiBudW1iZXI7XHJcbiAgICBwcm9jZXNzSW5wdXQ6IFByb2Nlc3NJbnB1dDtcclxuICAgIGxvYWRlcjogSW1hZ2VMb2FkZXI7XHJcbiAgICBjb25zdHJ1Y3RvcihzY2VuZU1hbmFnZXI6IFNjZW5lTWFuYWdlcil7XHJcbiAgICAgICAgdGhpcy5zY2VuZU1hbmFnZXIgPSBzY2VuZU1hbmFnZXI7XHJcbiAgICAgICAgdGhpcy5sYXN0VGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy5wcm9jZXNzSW5wdXQgPSBuZXcgUHJvY2Vzc0lucHV0KCk7XHJcbiAgICAgICAgdGhpcy5sb2FkZXIgPSBuZXcgSW1hZ2VMb2FkZXIoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgc3RhcnQocmVuZGVyOiBSZW5kZXJlcil7XHJcbiAgICAgICAgdGhpcy5wcm9jZXNzSW5wdXQuaGFuZGxlSW5wdXQodGhpcy5zY2VuZU1hbmFnZXIsIHJlbmRlcik7XHJcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpPT50aGlzLmxvb3AocmVuZGVyKSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGxvb3AocmVuZGVyOiBSZW5kZXJlcil7XHJcbiAgICAgICAgY29uc3QgdGltZSA9IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKTtcclxuICAgICAgICBjb25zdCBkZWx0YSA9IHRpbWUgLSB0aGlzLmxhc3RUaW1lO1xyXG4gICAgICAgIHRoaXMuc2NlbmVNYW5hZ2VyLnNjZW5lc1t0aGlzLnNjZW5lTWFuYWdlci5jdXJyZW50U2NlbmVdLnVwZGF0ZSh0aW1lLGRlbHRhKTtcclxuICAgICAgICB0aGlzLnNjZW5lTWFuYWdlci5zY2VuZXNbdGhpcy5zY2VuZU1hbmFnZXIuY3VycmVudFNjZW5lXS5yZW5kZXIocmVuZGVyKTtcclxuICAgICAgICB0aGlzLmxhc3RUaW1lID0gdGltZTtcclxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCk9PnRoaXMubG9vcChyZW5kZXIpKTtcclxuICAgIH1cclxufSIsImV4cG9ydCBjbGFzcyBHYW1lT2JqZWN0e1xyXG4gICAgeDogbnVtYmVyO1xyXG4gICAgeTogbnVtYmVyO1xyXG4gICAgd2lkdGg6IG51bWJlcjtcclxuICAgIGhlaWdodDogbnVtYmVyO1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgYWN0aXZlOiBib29sZWFuO1xyXG4gICAgZGVmYXVsdFBvc2l0aW9uOiBBcnJheTxudW1iZXI+O1xyXG4gICAgY29uc3RydWN0b3IoeDogbnVtYmVyLCB5OiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBuYW1lOiBzdHJpbmcsIGFjdGl2ZSA9IHRydWUpIHtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5hY3RpdmUgPSBhY3RpdmU7XHJcbiAgICAgICAgdGhpcy5kZWZhdWx0UG9zaXRpb24gPSBbeCx5XTtcclxuICAgIH1cclxuICAgIHJlc2V0KCl7XHJcbiAgICAgICAgdGhpcy54ID0gdGhpcy5kZWZhdWx0UG9zaXRpb25bMF07XHJcbiAgICAgICAgdGhpcy55ID0gdGhpcy5kZWZhdWx0UG9zaXRpb25bMV07XHJcbiAgICB9XHJcbiAgICBzZXRBY3RpdmUoYWN0aXZlOiBib29sZWFuKXtcclxuICAgICAgICB0aGlzLmFjdGl2ZSA9IGFjdGl2ZTtcclxuICAgIH1cclxuICAgIGdldEFjdGl2ZSgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFjdGl2ZTtcclxuICAgIH1cclxuXHJcbn0iLCJleHBvcnQgY2xhc3MgSW1hZ2VMb2FkZXIge1xyXG4gICAgaW1hZ2VzITogTWFwPHN0cmluZywgSFRNTEltYWdlRWxlbWVudD47XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMuaW1hZ2VzID0gbmV3IE1hcDxzdHJpbmcsIEhUTUxJbWFnZUVsZW1lbnQ+KCk7XHJcbiAgICB9XHJcbiAgICBhc3luYyBhZGRJbWFnZShzcmM6IHN0cmluZywgbmFtZTogc3RyaW5nKXtcclxuICAgICAgICB2YXIgaW1nID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgaW1nLnNyYyA9IHNyYztcclxuICAgICAgICB0aGlzLmltYWdlcy5zZXQobmFtZSwgaW1nKTtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBpbWcub25sb2FkID0gcmVzb2x2ZTtcclxuICAgICAgICAgICAgaW1nLm9uZXJyb3IgPSByZWplY3Q7IFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBnZXRJbWFnZShuYW1lOiBzdHJpbmcpOiBIVE1MSW1hZ2VFbGVtZW50IHwgdW5kZWZpbmVke1xyXG4gICAgICAgIGlmKHRoaXMuaW1hZ2VzLmhhcyhuYW1lKSlcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW1hZ2VzLmdldChuYW1lKTtcclxuICAgICAgICByZXR1cm4gbmV3IEltYWdlKCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge0dhbWVPYmplY3R9IGZyb20gXCIuLi9HYW1lT2JqZWN0L0dhbWVPYmplY3RcIlxyXG5leHBvcnQgY2xhc3MgSW1hZ2VPYmplY3QgZXh0ZW5kcyBHYW1lT2JqZWN0e1xyXG4gICAgaW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQ7XHJcbiAgICBkZWdyZWVzOiBudW1iZXI7XHJcbiAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsaW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQgfG51bGwsIGRlZ3JlZXM6IG51bWJlciwgbmFtZTogc3RyaW5nKXtcclxuICAgICAgICBzdXBlcih4LCB5LCB3aWR0aCwgaGVpZ2h0LG5hbWUpO1xyXG4gICAgICAgIGlmKGltYWdlPT1udWxsKVxyXG4gICAgICAgICAgICB0aGlzLmltYWdlID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgZWxzZSB0aGlzLmltYWdlID0gaW1hZ2U7XHJcbiAgICAgICAgdGhpcy5kZWdyZWVzID0gZGVncmVlcztcclxuICAgIH1cclxuICAgIHVwZGF0ZSh0aW1lOiBudW1iZXIsIGRlbHRhVGltZTpudW1iZXIpe31cclxufSIsImltcG9ydCB7U2NlbmVNYW5hZ2VyfSBmcm9tICcuLi9TY2VuZS9TY2VuZU1hbmFnZXInO1xyXG5pbXBvcnQge1JlbmRlcmVyfSBmcm9tICcuLi9SZW5kZXJlci9SZW5kZXJlcidcclxuZXhwb3J0IGNsYXNzIFByb2Nlc3NJbnB1dHtcclxuICAgIGhhbmRsZUlucHV0KHNjZW5lTWFuYWdlcjogU2NlbmVNYW5hZ2VyLCByZW5kZXI6IFJlbmRlcmVyKXtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywoZSk9PnNjZW5lTWFuYWdlci5zY2VuZXNbc2NlbmVNYW5hZ2VyLmN1cnJlbnRTY2VuZV0ub25LZXlEb3duKGUpKTtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsKGUpPT5zY2VuZU1hbmFnZXIuc2NlbmVzW3NjZW5lTWFuYWdlci5jdXJyZW50U2NlbmVdLm9uS2V5VXAoKSk7XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywoZSk9PnNjZW5lTWFuYWdlci5zY2VuZXNbc2NlbmVNYW5hZ2VyLmN1cnJlbnRTY2VuZV0ub25Nb3VzZURvd24oZSxyZW5kZXIuY2FudmFzKSk7XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsKGUpPT5zY2VuZU1hbmFnZXIuc2NlbmVzW3NjZW5lTWFuYWdlci5jdXJyZW50U2NlbmVdLm9uTW91c2VVcCgpKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IEltYWdlT2JqZWN0IH0gZnJvbSBcIi4uL0ltYWdlT2JqZWN0L0ltYWdlT2JqZWN0XCI7XHJcbmltcG9ydCB7IFNwcml0ZSB9IGZyb20gXCIuLi9TcHJpdGUvU3ByaXRlXCI7XHJcbmltcG9ydCB7IFRleHRPYmplY3QgfSBmcm9tIFwiLi4vVGV4dE9iamVjdC9UZXh0T2JqZWN0XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUmVuZGVyZXJ7XHJcbiAgICBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xyXG4gICAgY29uc3RydWN0b3IoY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCl7XHJcbiAgICAgICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XHJcbiAgICB9XHJcbiAgICBkcmF3SW1hZ2UoaW1hZ2VPYmplY3Q6IEltYWdlT2JqZWN0KXtcclxuICAgICAgICBjb25zdCBjdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgICAgIGlmKGN0eCE9bnVsbCl7XHJcbiAgICAgICAgICAgIGN0eC5zYXZlKCk7XHJcbiAgICAgICAgICAgIGN0eC50cmFuc2xhdGUoaW1hZ2VPYmplY3QueCArIGltYWdlT2JqZWN0LndpZHRoLzIsaW1hZ2VPYmplY3QueSArIGltYWdlT2JqZWN0LmhlaWdodC8yKVxyXG4gICAgICAgICAgICBjdHgucm90YXRlKGltYWdlT2JqZWN0LmRlZ3JlZXMqTWF0aC5QSS8xODApO1xyXG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKGltYWdlT2JqZWN0LmltYWdlLC1pbWFnZU9iamVjdC53aWR0aC8yLCAtaW1hZ2VPYmplY3QuaGVpZ2h0LzIsaW1hZ2VPYmplY3Qud2lkdGgsaW1hZ2VPYmplY3QuaGVpZ2h0KTtcclxuICAgICAgICAgICAgY3R4LnJlc3RvcmUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBkcmF3U3ByaXRlKHNwcml0ZTogU3ByaXRlKXtcclxuICAgICAgICBjb25zdCBjdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgICAgIGlmKGN0eCE9bnVsbCl7XHJcbiAgICAgICAgICAgIGN0eC5zYXZlKCk7XHJcbiAgICAgICAgICAgIGN0eC50cmFuc2xhdGUoc3ByaXRlLnggKyBzcHJpdGUud2lkdGgvMixzcHJpdGUueSArIHNwcml0ZS5oZWlnaHQvMilcclxuICAgICAgICAgICAgY3R4LnJvdGF0ZShzcHJpdGUuZGVncmVlcypNYXRoLlBJLzE4MCk7XHJcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2Uoc3ByaXRlLmltYWdlc1tzcHJpdGUuZnJhbWVDdXJyZW50XSwtc3ByaXRlLndpZHRoLzIsIC1zcHJpdGUuaGVpZ2h0LzIsc3ByaXRlLndpZHRoLHNwcml0ZS5oZWlnaHQpO1xyXG4gICAgICAgICAgICBjdHgucmVzdG9yZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGRyYXdUZXh0KHRleHQ6IFRleHRPYmplY3Qpe1xyXG4gICAgICAgIGNvbnN0IGN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICAgICAgaWYoY3R4IT1udWxsKXtcclxuICAgICAgICAgICAgY3R4LmZvbnQgPSB0ZXh0LmZvbnQ7XHJcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSB0ZXh0LmNvbG9yO1xyXG4gICAgICAgICAgICBjdHguZmlsbFRleHQodGV4dC5jb250ZW50LHRleHQueCx0ZXh0LnkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCB7IEltYWdlT2JqZWN0IH0gZnJvbSBcIi4uL0ltYWdlT2JqZWN0L0ltYWdlT2JqZWN0XCI7XHJcbmltcG9ydCB7IFNwcml0ZSB9IGZyb20gXCIuLi9TcHJpdGUvU3ByaXRlXCI7XHJcbmltcG9ydCB7IFRleHRPYmplY3QgfSBmcm9tIFwiLi4vVGV4dE9iamVjdC9UZXh0T2JqZWN0XCI7XHJcbmltcG9ydCB7UmVuZGVyZXJ9IGZyb20gXCIuLi9SZW5kZXJlci9SZW5kZXJlclwiO1xyXG5pbXBvcnQge0dhbWVPYmplY3R9IGZyb20gXCIuLi9HYW1lT2JqZWN0L0dhbWVPYmplY3RcIjtcclxuaW1wb3J0IHsgU2NlbmVNYW5hZ2VyIH0gZnJvbSBcIi4vU2NlbmVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEdhbWUgfSBmcm9tIFwiLi4vQ29yZS9HYW1lXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU2NlbmV7XHJcbiAgICBpbWFnZU9iamVjdHM6IEltYWdlT2JqZWN0W107XHJcbiAgICBzcHJpdGVzOiBTcHJpdGVbXTtcclxuICAgIHRleHRPYmplY3RzOiBUZXh0T2JqZWN0W107IFxyXG4gICAgaW5wdXRLZXkgOiBTdHJpbmc7XHJcbiAgICBtb3VzZUV2ZW50IDogQXJyYXk8bnVtYmVyPiB8IG51bGw7XHJcbiAgICBnYW1lOiBHYW1lO1xyXG4gICAgY29uc3RydWN0b3IoZ2FtZTogR2FtZSl7XHJcbiAgICAgICAgdGhpcy5pbWFnZU9iamVjdHMgPSBbXTtcclxuICAgICAgICB0aGlzLnNwcml0ZXMgPSBbXTtcclxuICAgICAgICB0aGlzLnRleHRPYmplY3RzID0gW107XHJcbiAgICAgICAgdGhpcy5pbnB1dEtleSA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5tb3VzZUV2ZW50ID0gbnVsbDtcclxuICAgICAgICB0aGlzLmdhbWUgPSBnYW1lO1xyXG4gICAgfVxyXG4gICAgcmVzZXRTY2VuZSgpe1xyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmltYWdlT2JqZWN0cy5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgdGhpcy5pbWFnZU9iamVjdHNbaV0ucmVzZXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPHRoaXMuc3ByaXRlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLnNwcml0ZXNbaV0ucmVzZXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pbnB1dEtleSA9IFwiXCI7XHJcbiAgICB9XHJcbiAgICBhZGRDaGlsZChpbWFnZU9iamVjdHM6IEltYWdlT2JqZWN0W10sc3ByaXRlczogU3ByaXRlW10sIHRleHRPYmplY3RzOiBUZXh0T2JqZWN0W10pe1xyXG4gICAgICAgIGltYWdlT2JqZWN0cy5tYXAoaW1hZ2VPYmplY3QgPT4gdGhpcy5pbWFnZU9iamVjdHMucHVzaChpbWFnZU9iamVjdCkpO1xyXG4gICAgICAgIHNwcml0ZXMubWFwKHNwcml0ZSA9PiB0aGlzLnNwcml0ZXMucHVzaChzcHJpdGUpKTtcclxuICAgICAgICB0ZXh0T2JqZWN0cy5tYXAodGV4dE9iamVjdCA9PiB0aGlzLnRleHRPYmplY3RzLnB1c2godGV4dE9iamVjdCkpO1xyXG4gICAgfVxyXG4gICAgcmVtb3ZlQ2hpbGQoaW1hZ2VPYmplY3RzOiBJbWFnZU9iamVjdFtdLHNwcml0ZXM6IFNwcml0ZVtdKXtcclxuICAgICAgICBpbWFnZU9iamVjdHMubWFwKGltYWdlT2JqZWN0ID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pbWFnZU9iamVjdHMgPSB0aGlzLmltYWdlT2JqZWN0cy5maWx0ZXIoKGltYik9PntcclxuICAgICAgICAgICAgICAgIHJldHVybiBpbWIhPSBpbWFnZU9iamVjdDtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIHNwcml0ZXMubWFwKHNwcml0ZSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc3ByaXRlcyA9IHRoaXMuc3ByaXRlcy5maWx0ZXIoKHNwdCk9PntcclxuICAgICAgICAgICAgICAgIHJldHVybiBzcHQhPSBzcHJpdGU7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIocmVuZGVyOiBSZW5kZXJlcil7XHJcbiAgICAgICAgdGhpcy5pbWFnZU9iamVjdHMubWFwKChpbWFnZU9iamVjdCk9PntcclxuICAgICAgICAgICAgaWYoaW1hZ2VPYmplY3QuZ2V0QWN0aXZlKCkpXHJcbiAgICAgICAgICAgICAgICByZW5kZXIuZHJhd0ltYWdlKGltYWdlT2JqZWN0KTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMuc3ByaXRlcy5tYXAoKHNwcml0ZSk9PntcclxuICAgICAgICAgICAgaWYoc3ByaXRlLmdldEFjdGl2ZSgpKVxyXG4gICAgICAgICAgICAgICAgcmVuZGVyLmRyYXdTcHJpdGUoc3ByaXRlKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMudGV4dE9iamVjdHMubWFwKCh0eHQpPT57XHJcbiAgICAgICAgICAgIGlmKHR4dC5nZXRBY3RpdmUoKSlcclxuICAgICAgICAgICAgICAgIHJlbmRlci5kcmF3VGV4dCh0eHQpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICAvLyB4dSBseSBsb2dpY1xyXG4gICAgdXBkYXRlKHRpbWU6IG51bWJlciwgZGVsdGE6IG51bWJlcikge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDx0aGlzLmltYWdlT2JqZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmltYWdlT2JqZWN0c1tpXS51cGRhdGUodGltZSwgZGVsdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8dGhpcy5zcHJpdGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3ByaXRlc1tpXS51cGRhdGUodGltZSwgZGVsdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIG9uS2V5RG93bihlOiBLZXlib2FyZEV2ZW50KXtcclxuICAgICAgICB0aGlzLmlucHV0S2V5ID0gZS5jb2RlO1xyXG4gICAgfVxyXG4gICAgb25LZXlVcCgpe1xyXG4gICAgICAgIHRoaXMuaW5wdXRLZXkgPSBcIlwiO1xyXG4gICAgfVxyXG4gICAgb25Nb3VzZURvd24oZTogTW91c2VFdmVudCwgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCkge1xyXG4gICAgICAgIHZhciByZWN0ID0gY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgIHZhciBtb3VzZVggPSBlLmNsaWVudFggLSByZWN0LmxlZnQ7XHJcbiAgICAgICAgdmFyIG1vdXNlWSA9IGUuY2xpZW50WSAtIHJlY3QudG9wOyAgICBcclxuICAgICAgICB0aGlzLm1vdXNlRXZlbnQgPSBbbW91c2VYLCBtb3VzZVldO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMubW91c2VFdmVudCk7XHJcbiAgICB9XHJcbiAgICBvbk1vdXNlVXAoKSB7XHJcbiAgICAgICAgdGhpcy5tb3VzZUV2ZW50ID0gbnVsbDtcclxuICAgIH1cclxuICAgIENvbGxpc2lvbihvYmoxIDogR2FtZU9iamVjdCwgb2JqMiA6IEdhbWVPYmplY3Qpe1xyXG4gICAgICAgIGlmKG9iajEueCsgb2JqMS53aWR0aD49b2JqMi54ICYmIG9iajEueCA8PSBvYmoyLnggKyBvYmoyLndpZHRoKXtcclxuICAgICAgICAgICAgaWYob2JqMS55KyBvYmoxLmhlaWdodD49b2JqMi55ICYmIG9iajEueSA8PSBvYmoyLnkgKyBvYmoyLmhlaWdodCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBTY2VuZSB9IGZyb20gXCIuL1NjZW5lXCI7XHJcbmltcG9ydCB7R2FtZX0gZnJvbSBcIi4uL0NvcmUvR2FtZVwiO1xyXG5leHBvcnQgY2xhc3MgU2NlbmVNYW5hZ2VyIHtcclxuICAgIHNjZW5lczogU2NlbmVbXTtcclxuICAgIGN1cnJlbnRTY2VuZTogbnVtYmVyO1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICB0aGlzLnNjZW5lcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFNjZW5lID0gMDtcclxuICAgIH1cclxuICAgIGFkZFNjZW5lKHNjZW5lOiBTY2VuZSl7XHJcbiAgICAgICAgdGhpcy5zY2VuZXMucHVzaChzY2VuZSlcclxuICAgIH1cclxuICAgIHN3aXRjaFNjZW5lKG5leHRJbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5zY2VuZXNbdGhpcy5jdXJyZW50U2NlbmVdLnJlc2V0U2NlbmUoKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRTY2VuZSA9IG5leHRJbmRleDtcclxuICAgIH1cclxuICAgIHVwZGF0ZSgpe31cclxuICAgIHJlbmRlcigpe31cclxufSIsImltcG9ydCB7R2FtZU9iamVjdH0gZnJvbSBcIi4uL0dhbWVPYmplY3QvR2FtZU9iamVjdFwiXHJcbmV4cG9ydCBjbGFzcyBTcHJpdGUgZXh0ZW5kcyBHYW1lT2JqZWN0e1xyXG4gICAgaW1hZ2VzOiBBcnJheTxIVE1MSW1hZ2VFbGVtZW50PjtcclxuICAgIGRlZ3JlZXM6IG51bWJlcjtcclxuICAgIGZyYW1lQ3VycmVudDogbnVtYmVyO1xyXG4gICAgcmF0ZTogbnVtYmVyO1xyXG4gICAgYWR0OiBudW1iZXI7XHJcbiAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIGltYWdlczogQXJyYXk8SFRNTEltYWdlRWxlbWVudD4sZGVncmVlczogbnVtYmVyLG5hbWU6IHN0cmluZywgZnBzOiBudW1iZXIpe1xyXG4gICAgICAgIHN1cGVyKHgsIHksIHdpZHRoLCBoZWlnaHQsbmFtZSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJpbWFnZXNcIixpbWFnZXMpO1xyXG4gICAgICAgIHRoaXMuaW1hZ2VzID0gaW1hZ2VzO1xyXG4gICAgICAgIHRoaXMuZGVncmVlcyA9IGRlZ3JlZXM7XHJcbiAgICAgICAgdGhpcy5mcmFtZUN1cnJlbnQgPSAwO1xyXG4gICAgICAgIHRoaXMucmF0ZSA9IDEuMC9mcHMgKjEwMDA7XHJcbiAgICAgICAgdGhpcy5hZHQgPSAwO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKHRpbWU6IG51bWJlciwgZGVsdGFUaW1lOm51bWJlcil7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHBsYXlBbmltYXRpb24odGltZTogbnVtYmVyLCBkZWx0YVRpbWU6bnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5hZHQgKz0gZGVsdGFUaW1lXHJcbiAgICAgICAgaWYodGhpcy5hZHQ+PXRoaXMucmF0ZSl7XHJcbiAgICAgICAgICAgIHRoaXMuYWR0IC09IHRoaXMucmF0ZTtcclxuICAgICAgICAgICAgdGhpcy5mcmFtZUN1cnJlbnQgKz0xO1xyXG4gICAgICAgICAgICBpZih0aGlzLmZyYW1lQ3VycmVudD50aGlzLmltYWdlcy5sZW5ndGgtMSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZyYW1lQ3VycmVudCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge0dhbWVPYmplY3R9IGZyb20gXCIuLi9HYW1lT2JqZWN0L0dhbWVPYmplY3RcIlxyXG5leHBvcnQgY2xhc3MgVGV4dE9iamVjdCBleHRlbmRzIEdhbWVPYmplY3R7XHJcbiAgICBjb250ZW50OiBzdHJpbmc7XHJcbiAgICBmb250OiBzdHJpbmc7XHJcbiAgICBjb2xvcjogc3RyaW5nO1xyXG4gICAgY29uc3RydWN0b3IoeDogbnVtYmVyLCB5OiBudW1iZXIsIG5hbWU6IHN0cmluZyAsIGNvbnRlbnQ6IHN0cmluZywgZm9udDogc3RyaW5nLCBjb2xvciA9IFwiYmxhY2tcIikge1xyXG4gICAgICAgIHN1cGVyKHgsIHksIDAsIDAsIG5hbWUpO1xyXG4gICAgICAgIHRoaXMuY29udGVudCA9IGNvbnRlbnQ7XHJcbiAgICAgICAgdGhpcy5mb250ID0gZm9udDtcclxuICAgICAgICB0aGlzLmNvbG9yID0gY29sb3I7XHJcbiAgICB9XHJcbiAgICBzZXRDb250ZW50KGNvbnRlbnQ6IHN0cmluZyl7XHJcbiAgICAgICAgdGhpcy5jb250ZW50ID0gY29udGVudDtcclxuICAgIH1cclxufSIsImltcG9ydCB7IFNwcml0ZSB9IGZyb20gXCIuLi9FbmdpbmUvU3ByaXRlL1Nwcml0ZVwiO1xyXG52YXIgYXVkaW8gPSBuZXcgQXVkaW8oXCIuLi9hdWRpby9zd29vc2gubXAzXCIpO1xyXG5pbXBvcnQge1NjZW5lfSBmcm9tIFwiLi4vRW5naW5lL1NjZW5lL1NjZW5lXCJcclxuZXhwb3J0IGNsYXNzIEJpcmQgZXh0ZW5kcyBTcHJpdGUge1xyXG4gICAgZ3Jhdml0eSA6IG51bWJlcjtcclxuICAgIHNwZWVkIDogbnVtYmVyOyBcclxuICAgIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcixkZWdyZWVzOiBudW1iZXIsZ3Jhdml0eTogbnVtYmVyLHJhdGU6IG51bWJlciwgc2NlbmU6IFNjZW5lKSB7XHJcbiAgICAgICAgdmFyIGltYWdlczpBcnJheTxIVE1MSW1hZ2VFbGVtZW50PiA9IFtdO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwibG9hZGVyXCIsIHNjZW5lLmdhbWUubG9hZGVyKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8ODtpKyspe1xyXG4gICAgICAgICAgICBsZXQgbmFtZSA9ICBcImJpcmRcIiArIGk7XHJcbiAgICAgICAgICAgIGltYWdlcy5wdXNoKHNjZW5lLmdhbWUubG9hZGVyLmdldEltYWdlKG5hbWUpIGFzIEhUTUxJbWFnZUVsZW1lbnQpO1xyXG4gICAgICAgIH0gXHJcbiAgICAgICAgc3VwZXIoeCwgeSwgd2lkdGgsIGhlaWdodCxpbWFnZXMsZGVncmVlcyxcImJpcmRcIixyYXRlKTtcclxuICAgICAgICB0aGlzLmdyYXZpdHkgPSBncmF2aXR5O1xyXG4gICAgICAgIHRoaXMuc3BlZWQgPSAwO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKHRpbWU6IG51bWJlciwgZGVsdGFUaW1lOm51bWJlcil7XHJcbiAgICAgICAgdGhpcy55ICs9ICh0aGlzLnNwZWVkICsgMC41KnRoaXMuZ3Jhdml0eSkqKGRlbHRhVGltZS8xNi42Nyk7XHJcbiAgICAgICAgdGhpcy5zcGVlZCArPSB0aGlzLmdyYXZpdHkqKGRlbHRhVGltZS8xNi42Nyk7XHJcbiAgICAgICAgaWYodGhpcy55IDwgMClcclxuICAgICAgICAgICAgdGhpcy55ID0gMDtcclxuICAgICAgICBpZih0aGlzLnNwZWVkPjApe1xyXG4gICAgICAgICAgICB0aGlzLmRlZ3JlZXMgKz0gMTtcclxuICAgICAgICAgICAgaWYodGhpcy5kZWdyZWVzPjIwKSB0aGlzLmRlZ3JlZXMgPSAyMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5kZWdyZWVzIC09IDE7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZGVncmVlczwtMjApIHRoaXMuZGVncmVlcyA9IC0yMDtcclxuICAgICAgICAgICAgdGhpcy5wbGF5QW5pbWF0aW9uKHRpbWUsIGRlbHRhVGltZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZseShkZWx0YVRpbWU6IG51bWJlcil7XHJcbiAgICAgICAgLy8gYXVkaW8ucGxheSgpOyBcclxuICAgICAgICAvLyBhdWRpby5wbGF5YmFja1JhdGUgPSAyO1xyXG4gICAgICAgIHRoaXMuc3BlZWQgPSAtODtcclxuICAgIH1cclxuICAgIHJlc2V0KCl7XHJcbiAgICAgICAgc3VwZXIucmVzZXQoKTtcclxuICAgICAgICB0aGlzLnNwZWVkID0gMDtcclxuICAgIH1cclxufSIsImltcG9ydCB7IEltYWdlT2JqZWN0IH0gZnJvbSBcIi4uL0VuZ2luZS9JbWFnZU9iamVjdC9JbWFnZU9iamVjdFwiO1xyXG5pbXBvcnQge0dhbWV9IGZyb20gXCIuLi9FbmdpbmUvQ29yZS9HYW1lXCI7XHJcbmNsYXNzIEdyb3VuZHtcclxuICAgIGltYWdlczogQXJyYXk8SW1hZ2VPYmplY3Q+O1xyXG4gICAgc3BlZWQ6IG51bWJlcjtcclxuICAgIGNvbnN0cnVjdG9yKHNwZWVkOiBudW1iZXIsIGdhbWU6IEdhbWUpe1xyXG4gICAgICAgIHZhciBpbWFnZSA9IGdhbWUubG9hZGVyLmdldEltYWdlKFwiZ3JvdW5kXCIpO1xyXG4gICAgICAgIHZhciBpbWFnZU9iamVjdDEgPSBuZXcgSW1hZ2VPYmplY3QoMCw2NzAsNjUwLDE1MCxpbWFnZSBhcyBIVE1MSW1hZ2VFbGVtZW50LDAsXCJncm91bmRcIik7XHJcbiAgICAgICAgdmFyIGltYWdlT2JqZWN0MiA9IG5ldyBJbWFnZU9iamVjdCg2NDksNjcwLDY1MCwxNTAsaW1hZ2UgYXMgSFRNTEltYWdlRWxlbWVudCwwLFwiZ3JvdW5kXCIpO1xyXG4gICAgICAgIHRoaXMuaW1hZ2VzID0gW2ltYWdlT2JqZWN0MSxpbWFnZU9iamVjdDJdO1xyXG4gICAgICAgIHRoaXMuc3BlZWQgPSBzcGVlZDtcclxuICAgIH1cclxuICAgIHVwZGF0ZSh0aW1lOiBudW1iZXIsIGRlbHRhVGltZTogbnVtYmVyKXtcclxuICAgICAgICBmb3IodmFyIGk9MDtpPHRoaXMuaW1hZ2VzLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICB0aGlzLmltYWdlc1tpXS54IC09IHRoaXMuc3BlZWQqKGRlbHRhVGltZS8xNi42Nyk7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuaW1hZ2VzW2ldLnggPCAtICg2NTArMjApKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2VzW2ldLnggPSB0aGlzLmltYWdlc1tNYXRoLmFicyhpLTEpXS54KzY0MDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gXHJcbiAgICB9XHJcbiAgICBnZXRDb21wb25lbnQoKXtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBcImltYWdlT2JqZWN0c1wiOiB0aGlzLmltYWdlcyxcclxuICAgICAgICAgICAgXCJzcHJpdGVzXCI6IFtdLFxyXG4gICAgICAgICAgICBcInRleHRPYmplY3RzXCI6IFtdXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHJlc2V0KCl7XHJcbiAgICAgICAgZm9yKHZhciBpPTA7aTx0aGlzLmltYWdlcy5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgdGhpcy5pbWFnZXNbaV0ucmVzZXQoKTtcclxuICAgICAgICB9IFxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge0dyb3VuZH07IiwiaW1wb3J0IHsgSW1hZ2VPYmplY3QgfSBmcm9tIFwiLi4vRW5naW5lL0ltYWdlT2JqZWN0L0ltYWdlT2JqZWN0XCI7XHJcbmltcG9ydCB7R2FtZX0gZnJvbSBcIi4uL0VuZ2luZS9Db3JlL0dhbWVcIlxyXG5jb25zdCBibGFua3MgPSAyMDA7XHJcbmNvbnN0IHBpcGVIZWlnaHQgPSAzNTA7XHJcbmNvbnN0IG51bVBpcGUgPSA0O1xyXG5jb25zdCBkaXN0YW5jZSA9IDI1MDtcclxuY29uc3QgcGlwZVdpZHRoID0gODA7XHJcbmNsYXNzIFBhaXJPZlBpcGV7XHJcbiAgICBQaXBlczogQXJyYXk8SW1hZ2VPYmplY3Q+O1xyXG4gICAgcHJpdmF0ZSBzcGVlZDogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHg6bnVtYmVyLCB5Om51bWJlciwgZ2FtZTogR2FtZSxzcGVlZDogbnVtYmVyKXtcclxuICAgICAgICB2YXIgUGlwZVVwID0gbmV3IEltYWdlT2JqZWN0KHgseSxwaXBlV2lkdGgscGlwZUhlaWdodCxnYW1lLmxvYWRlci5nZXRJbWFnZShcInBpcGVcIikgYXMgSFRNTEltYWdlRWxlbWVudCwxODAsXCJwaXBlXCIpO1xyXG4gICAgICAgIHZhciBQaXBlRG93biA9IG5ldyBJbWFnZU9iamVjdCh4LHkrcGlwZUhlaWdodCtibGFua3MscGlwZVdpZHRoLHBpcGVIZWlnaHQsZ2FtZS5sb2FkZXIuZ2V0SW1hZ2UoXCJwaXBlXCIpIGFzIEhUTUxJbWFnZUVsZW1lbnQsMCxcInBpcGVcIik7XHJcbiAgICAgICAgdmFyIGNoZWNrU2NvcmUgPSBuZXcgSW1hZ2VPYmplY3QoeCtwaXBlV2lkdGgseStwaXBlSGVpZ2h0LDEwLGJsYW5rcyxudWxsLDAsXCJjaGVja1Njb3JlXCIpO1xyXG4gICAgICAgIHRoaXMuUGlwZXM9IFtQaXBlVXAsUGlwZURvd24sY2hlY2tTY29yZV07XHJcbiAgICAgICAgdGhpcy5zcGVlZCA9IHNwZWVkO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKHRpbWU6bnVtYmVyLCBkZWx0YVRpbWU6bnVtYmVyKXtcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwzO2krKyl7XHJcbiAgICAgICAgICAgIHRoaXMuUGlwZXNbaV0ueCAtPSB0aGlzLnNwZWVkKihkZWx0YVRpbWUvMTYuNjcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJlc2V0KCl7XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8MztpKyspe1xyXG4gICAgICAgICAgICB0aGlzLlBpcGVzW2ldLnJlc2V0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0Q29tcG9uZW50KCl7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgXCJpbWFnZU9iamVjdHNcIjogdGhpcy5QaXBlcyxcclxuICAgICAgICAgICAgXCJzcHJpdGVzXCI6IFtdLFxyXG4gICAgICAgICAgICBcInRleHRPYmplY3RzXCI6IFtdXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBMaXN0UGFpck9mUGlwZXN7XHJcbiAgICBsaXN0UGlwZTogUGFpck9mUGlwZVtdO1xyXG4gICAgY29uc3RydWN0b3IoZ2FtZTogR2FtZSl7XHJcbiAgICAgICAgdGhpcy5saXN0UGlwZSA9IFtdO1xyXG4gICAgICAgIGZvcih2YXIgaT0wO2k8bnVtUGlwZTtpKyspe1xyXG4gICAgICAgICAgICB2YXIgeCA9IGkqZGlzdGFuY2UgKyBwaXBlV2lkdGggKyA0MDA7XHJcbiAgICAgICAgICAgIHZhciB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICotMjAwKTtcclxuICAgICAgICAgICAgdmFyIHBpcGUgPSBuZXcgUGFpck9mUGlwZSh4LHksZ2FtZSwzKTtcclxuICAgICAgICAgICAgdGhpcy5saXN0UGlwZS5wdXNoKHBpcGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHVwZGF0ZSgpe1xyXG4gICAgICAgIHRoaXMubGlzdFBpcGUubWFwKChwaXBlLGluZGV4KSA9PntcclxuICAgICAgICAgICAgaWYocGlwZS5QaXBlc1swXS54PC0xMDApe1xyXG4gICAgICAgICAgICAgICAgdmFyIGZyb250SW5kZXggPSBpbmRleCAtMTtcclxuICAgICAgICAgICAgICAgIGlmKGZyb250SW5kZXg8MCkgZnJvbnRJbmRleCA9IHRoaXMubGlzdFBpcGUubGVuZ3RoLTE7XHJcbiAgICAgICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDxwaXBlLlBpcGVzLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIHBpcGUuUGlwZXNbaV0ueCA9IHRoaXMubGlzdFBpcGVbZnJvbnRJbmRleF0uUGlwZXNbaV0ueCArIGRpc3RhbmNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHtQYWlyT2ZQaXBlLCBMaXN0UGFpck9mUGlwZXN9O1xyXG4iLCJpbXBvcnQgeyBUZXh0T2JqZWN0IH0gZnJvbSAnLi4vRW5naW5lL1RleHRPYmplY3QvVGV4dE9iamVjdCc7XHJcbmltcG9ydCB7QnV0dG9uT2JqZWN0IH0gZnJvbSAnLi4vRW5naW5lL0J1dHRvbk9iamVjdC9CdXR0b25PYmplY3QnO1xyXG5pbXBvcnQgeyBJbWFnZU9iamVjdCB9IGZyb20gJy4uL0VuZ2luZS9JbWFnZU9iamVjdC9JbWFnZU9iamVjdCc7XHJcblxyXG5leHBvcnQgY2xhc3MgUGFuZWxHYW1lT3ZlciB7XHJcbiAgICBpbWdHYW1lT3ZlcjogSW1hZ2VPYmplY3Q7XHJcbiAgICBjdXJyZW50U2NvcmU6IFRleHRPYmplY3Q7XHJcbiAgICBoaWdoU2NvcmU6IFRleHRPYmplY3Q7XHJcbiAgICByZXBsYXlCdXR0b246IEJ1dHRvbk9iamVjdDtcclxuICAgIGNvbnN0cnVjdG9yKGltZ0dhbWVPdmVyOiBJbWFnZU9iamVjdCwgY3VycmVudFNjb3JlOiBUZXh0T2JqZWN0LCBoaWdoU2NvcmU6IFRleHRPYmplY3QsIHJlcGxheUJ1dHRvbjogQnV0dG9uT2JqZWN0KXtcclxuICAgICAgICB0aGlzLmltZ0dhbWVPdmVyID0gaW1nR2FtZU92ZXI7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50U2NvcmUgPSBjdXJyZW50U2NvcmU7XHJcbiAgICAgICAgdGhpcy5oaWdoU2NvcmUgPSBoaWdoU2NvcmU7XHJcbiAgICAgICAgdGhpcy5yZXBsYXlCdXR0b24gPSByZXBsYXlCdXR0b247XHJcbiAgICB9XHJcbiAgICBzZXRBY3RpdmUoYWN0aXZlOiBib29sZWFuKXtcclxuICAgICAgICB0aGlzLmltZ0dhbWVPdmVyLnNldEFjdGl2ZShhY3RpdmUpO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFNjb3JlLnNldEFjdGl2ZShhY3RpdmUpO1xyXG4gICAgICAgIHRoaXMuaGlnaFNjb3JlLnNldEFjdGl2ZShhY3RpdmUpO1xyXG4gICAgICAgIHRoaXMucmVwbGF5QnV0dG9uLnNldEFjdGl2ZShhY3RpdmUpO1xyXG4gICAgfVxyXG4gICAgZ2V0Q29tcG9uZW50KCl7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgXCJpbWFnZU9iamVjdHNcIjogW3RoaXMuaW1nR2FtZU92ZXIsIHRoaXMucmVwbGF5QnV0dG9uXSxcclxuICAgICAgICAgICAgXCJzcHJpdGVzXCI6W10sXHJcbiAgICAgICAgICAgIFwidGV4dE9iamVjdHNcIjpbdGhpcy5jdXJyZW50U2NvcmUsdGhpcy5oaWdoU2NvcmVdXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHVwZGF0ZShjdXJyZW50U2NvcmU6IG51bWJlciwgaGlnaFNjb3JlOiBudW1iZXIpe1xyXG4gICAgICAgIHRoaXMuY3VycmVudFNjb3JlLnNldENvbnRlbnQoXCJTY29yZTogXCIgKyBjdXJyZW50U2NvcmUpO1xyXG4gICAgICAgIHRoaXMuaGlnaFNjb3JlLnNldENvbnRlbnQoXCJIaWdoIFNjb3JlOiBcIiArIGhpZ2hTY29yZSlcclxuICAgIH1cclxufSIsImltcG9ydCB7U2NlbmV9IGZyb20gJy4uL0VuZ2luZS9TY2VuZS9TY2VuZSc7XHJcbmltcG9ydCB7QmlyZH0gZnJvbSAnLi9CaXJkJztcclxuaW1wb3J0IHtMaXN0UGFpck9mUGlwZXN9IGZyb20gJy4vUGFpck9mUGlwZSc7XHJcbmltcG9ydCB7IFRleHRPYmplY3QgfSBmcm9tICcuLi9FbmdpbmUvVGV4dE9iamVjdC9UZXh0T2JqZWN0JztcclxuaW1wb3J0IHsgSW1hZ2VPYmplY3QgfSBmcm9tICcuLi9FbmdpbmUvSW1hZ2VPYmplY3QvSW1hZ2VPYmplY3QnO1xyXG5pbXBvcnQge3Njb3JlfSBmcm9tIFwiLi9TY29yZVwiO1xyXG5pbXBvcnQgeyBHcm91bmQgfSBmcm9tICcuL0dyb3VuZCc7XHJcbmltcG9ydCB7UGFuZWxHYW1lT3Zlcn0gZnJvbSAnLi9QYW5lbEdhbWVPdmVyJ1xyXG5pbXBvcnQge0dhbWV9IGZyb20gJy4uL0VuZ2luZS9Db3JlL0dhbWUnXHJcbmltcG9ydCB7QnV0dG9uT2JqZWN0fSBmcm9tICcuLi9FbmdpbmUvQnV0dG9uT2JqZWN0L0J1dHRvbk9iamVjdCc7XHJcblxyXG5jb25zdCBwb2ludCA9IG5ldyBBdWRpbyhcIi4uL2F1ZGlvL3BvaW50Lm1wM1wiKTtcclxuY29uc3QgZGllID0gbmV3IEF1ZGlvKFwiLi4vYXVkaW8vZGllLm1wM1wiKTtcclxuY29uc3QgaGl0ID0gbmV3IEF1ZGlvKFwiLi4vYXVkaW8vaGl0Lm1wM1wiKTtcclxuY29uc3QgYXVkaW9QbGF5ZXIgPSBuZXcgQXVkaW8oXCIuLi9hdWRpby9vcmNoZXN0cmF3YXYtMjYxNTgubXAzXCIpO1xyXG5cclxuZXhwb3J0IGNsYXNzIFBsYXlTY2VuZSBleHRlbmRzIFNjZW5lIHtcclxuICAgIGJpcmQ6IEJpcmQ7XHJcbiAgICBwaXBlczogTGlzdFBhaXJPZlBpcGVzO1xyXG4gICAgZ3JvdW5kOiBHcm91bmQ7XHJcbiAgICBjaGVja1BpcGU6IGJvb2xlYW47XHJcbiAgICB0ZXh0U2NvcmU6IFRleHRPYmplY3Q7XHJcbiAgICBhZGRTY29yZTogbnVtYmVyIHwgbnVsbDtcclxuICAgIHNjb3JlID0gc2NvcmU7XHJcbiAgICBkZWFkQmlyZDogYm9vbGVhbjtcclxuICAgIHBhbmVsR2FtZU92ZXIgOiBQYW5lbEdhbWVPdmVyO1xyXG4gICAgc3RhcnQ6IGJvb2xlYW47XHJcbiAgICBjb25zdHJ1Y3RvcihnYW1lOiBHYW1lKXtcclxuICAgICAgICBzdXBlcihnYW1lKTtcclxuICAgICAgICAvLyBwbGF5IGF1ZGlvXHJcbiAgICAgICAgLy8gYXVkaW9QbGF5ZXIucGxheSgpO1xyXG4gICAgICAgIC8vIGF1ZGlvUGxheWVyLmxvb3AgPXRydWU7XHJcbiAgICAgICAgdGhpcy5jaGVja1BpcGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmFkZFNjb3JlID0gbnVsbDtcclxuICAgICAgICB0aGlzLmRlYWRCaXJkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zdGFydCA9IGZhbHNlOyBcclxuICAgICAgICB0aGlzLmJpcmQgPSAgbmV3IEJpcmQoMTAwLDI4MCw1MCw1MCwwLDAuNSwyMCx0aGlzKVxyXG4gICAgICAgIHRoaXMudGV4dFNjb3JlID0gbmV3IFRleHRPYmplY3QoMTAsMzAsXCJzY29yZVwiLFwiU2NvcmU6IFwiKyB0aGlzLnNjb3JlLmdldEN1cnJlbnRTY29yZSgpLCBcIjE4cHggQXJpYWxcIiwgXCJ3aGl0ZVwiKTtcclxuICAgICAgICB2YXIgYmcgPSBuZXcgSW1hZ2VPYmplY3QoMCwwLDcwMCw4MDAsZ2FtZS5sb2FkZXIuZ2V0SW1hZ2UoXCJiYWNrZ3JvdW5kXCIpIGFzIEhUTUxJbWFnZUVsZW1lbnQsMCxcImJhY2tncm91bmRcIik7XHJcbiAgICAgICAgdGhpcy5ncm91bmQgPSBuZXcgR3JvdW5kKDIsZ2FtZSk7XHJcbiAgICAgICAgdGhpcy5waXBlcyA9IG5ldyBMaXN0UGFpck9mUGlwZXMoZ2FtZSk7XHJcblxyXG4gICAgICAgIHRoaXMucGFuZWxHYW1lT3ZlciA9IG5ldyBQYW5lbEdhbWVPdmVyKFxyXG4gICAgICAgICAgICBuZXcgSW1hZ2VPYmplY3QoNjAsMzAwLDUwMCwxMzAsZ2FtZS5sb2FkZXIuZ2V0SW1hZ2UoXCJnYW1lb3ZlclwiKSBhcyBIVE1MSW1hZ2VFbGVtZW50LDAsXCJnYW1lT3ZlclwiKSxcclxuICAgICAgICAgICAgbmV3IFRleHRPYmplY3QoMTEwLDQ3MCxcInNob3dTY29yZVwiLFwiU2NvcmU6IDBcIiwgXCIzMHB4IEFyaWFsXCIsXCJ3aGl0ZVwiKSxcclxuICAgICAgICAgICAgbmV3IFRleHRPYmplY3QoMzMwLDQ3MCxcImhpZ2hTY29yZVwiLFwiSGlnaCBTY29yZTogMFwiLCBcIjMwcHggQXJpYWxcIixcIndoaXRlXCIpLFxyXG4gICAgICAgICAgICBuZXcgQnV0dG9uT2JqZWN0KDIyNSw1MDAsMTYwLDgwLGdhbWUubG9hZGVyLmdldEltYWdlKFwicmVwbGF5QnV0dG9uXCIpIGFzIEhUTUxJbWFnZUVsZW1lbnQsMCxcInJlcGxheUJ1dHRvblwiKSwgXHJcbiAgICAgICAgKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBhZGRDaGlsZFxyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQoW2JnXSxbdGhpcy5iaXJkXSxbdGhpcy50ZXh0U2NvcmVdKTtcclxuICAgICAgICBmb3IodmFyIGk9MDtpPHRoaXMucGlwZXMubGlzdFBpcGUubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIHZhciBwaXBlID0gdGhpcy5waXBlcy5saXN0UGlwZVtpXTtcclxuICAgICAgICAgICAgdGhpcy5hZGRDaGlsZChcclxuICAgICAgICAgICAgICAgIHBpcGUuZ2V0Q29tcG9uZW50KClbXCJpbWFnZU9iamVjdHNcIl0sXHJcbiAgICAgICAgICAgICAgICBwaXBlLmdldENvbXBvbmVudCgpW1wic3ByaXRlc1wiXSxcclxuICAgICAgICAgICAgICAgIHBpcGUuZ2V0Q29tcG9uZW50KClbXCJ0ZXh0T2JqZWN0c1wiXVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFkZENoaWxkKFxyXG4gICAgICAgICAgICB0aGlzLmdyb3VuZC5nZXRDb21wb25lbnQoKVtcImltYWdlT2JqZWN0c1wiXSxcclxuICAgICAgICAgICAgdGhpcy5ncm91bmQuZ2V0Q29tcG9uZW50KClbXCJzcHJpdGVzXCJdLFxyXG4gICAgICAgICAgICB0aGlzLmdyb3VuZC5nZXRDb21wb25lbnQoKVtcInRleHRPYmplY3RzXCJdXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgdGhpcy5hZGRDaGlsZChcclxuICAgICAgICAgICAgdGhpcy5wYW5lbEdhbWVPdmVyLmdldENvbXBvbmVudCgpW1wiaW1hZ2VPYmplY3RzXCJdLFxyXG4gICAgICAgICAgICB0aGlzLnBhbmVsR2FtZU92ZXIuZ2V0Q29tcG9uZW50KClbXCJzcHJpdGVzXCJdLFxyXG4gICAgICAgICAgICB0aGlzLnBhbmVsR2FtZU92ZXIuZ2V0Q29tcG9uZW50KClbXCJ0ZXh0T2JqZWN0c1wiXVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgLy8gaGlkZW4gcGFuZWxHYW1lT3ZlclxyXG4gICAgICAgIHRoaXMucGFuZWxHYW1lT3Zlci5zZXRBY3RpdmUoZmFsc2UpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICB1cGRhdGUodGltZTogbnVtYmVyLCBkZWx0YVRpbWU6IG51bWJlcikge1xyXG4gICAgICAgIGlmKCAhdGhpcy5kZWFkQmlyZCAmJiB0aGlzLnN0YXJ0KXtcclxuICAgICAgICAgICAgdmFyIGdyb3VuZCA9IHRoaXMuaW1hZ2VPYmplY3RzLmZpbHRlcigoaW1iKT0+e1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGltYi5uYW1lID09PSBcImdyb3VuZFwiO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgcGlwZXMgPSB0aGlzLmltYWdlT2JqZWN0cy5maWx0ZXIoKGltYik9PntcclxuICAgICAgICAgICAgICAgIHJldHVybiBpbWIubmFtZSA9PT0gXCJwaXBlXCI7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdmFyIGNoZWNrU2NvcmUgPSB0aGlzLmltYWdlT2JqZWN0cy5maWx0ZXIoKGltYik9PntcclxuICAgICAgICAgICAgICAgIHJldHVybiBpbWIubmFtZSA9PT0gXCJjaGVja1Njb3JlXCI7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHRoaXMuZ3JvdW5kLnVwZGF0ZSh0aW1lLCBkZWx0YVRpbWUpO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPHRoaXMuc3ByaXRlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5zcHJpdGVzW2ldLm5hbWUgPT09IFwiYmlyZFwiKXtcclxuICAgICAgICAgICAgICAgICAgICBmb3IodmFyIGogPSAwOyBqIDwgcGlwZXMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5Db2xsaXNpb24ocGlwZXNbal0sdGhpcy5zcHJpdGVzW2ldKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrUGlwZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImdhbWUgb3ZlciFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IGNoZWNrU2NvcmUubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5Db2xsaXNpb24oY2hlY2tTY29yZVtrXSx0aGlzLnNwcml0ZXNbaV0pJiYgdGhpcy5hZGRTY29yZSAhPSBrKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NvcmUuc2V0Q3VycmVudFNjb3JlKHRoaXMuc2NvcmUuZ2V0Q3VycmVudFNjb3JlKCkrMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRleHRTY29yZS5jb250ZW50ID0gXCJTY29yZTogXCIgKyB0aGlzLnNjb3JlLmdldEN1cnJlbnRTY29yZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRTY29yZSA9IGs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwb2ludC5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBpcGVzLmxpc3RQaXBlLm1hcCgocGlwZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwaXBlLnVwZGF0ZSh0aW1lLCBkZWx0YVRpbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlc1tpXS51cGRhdGUodGltZSxkZWx0YVRpbWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmlucHV0S2V5PT09XCJTcGFjZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmlyZC5mbHkoZGVsdGFUaW1lKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzLmNoZWNrUGlwZSYmKCF0aGlzLkNvbGxpc2lvbihncm91bmRbMF0sIHRoaXMuc3ByaXRlc1tpXSkmJiF0aGlzLkNvbGxpc2lvbihncm91bmRbMV0sIHRoaXMuc3ByaXRlc1tpXSkpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZXNbaV0udXBkYXRlKHRpbWUsZGVsdGFUaW1lKTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLkNvbGxpc2lvbihncm91bmRbMF0sIHRoaXMuc3ByaXRlc1tpXSl8fHRoaXMuQ29sbGlzaW9uKGdyb3VuZFsxXSwgdGhpcy5zcHJpdGVzW2ldKXx8dGhpcy5jaGVja1BpcGUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnNjb3JlLmdldEN1cnJlbnRTY29yZSgpPiB0aGlzLnNjb3JlLmdldEhpZ2hTY29yZSgpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY29yZS5zZXRIaWdoU2NvcmUodGhpcy5zY29yZS5nZXRDdXJyZW50U2NvcmUoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNob3cgcGFuZWxHYW1lT3ZlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBhbmVsR2FtZU92ZXIuc2V0QWN0aXZlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBoaWRlbiBiaXJkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmlyZC5zZXRBY3RpdmUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB1cGRhdGUgc2NvcmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wYW5lbEdhbWVPdmVyLnVwZGF0ZSh0aGlzLnNjb3JlLmdldEN1cnJlbnRTY29yZSgpLCB0aGlzLnNjb3JlLmdldEhpZ2hTY29yZSgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2V0IHN0YXRlIGJpcmQgaXMgZGllXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVhZEJpcmQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcGxheSBhdWRpb1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhdWRpb1BsYXllci5wYXVzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBoaXQucGxheSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgZGllLnBsYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICB9LCA1MDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVzW2ldLnVwZGF0ZSh0aW1lLGRlbHRhVGltZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5waXBlcy51cGRhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih0aGlzLmRlYWRCaXJkKXtcclxuICAgICAgICAgICAgaWYodGhpcy5pbnB1dEtleSAhPT0gXCJcInx8KHRoaXMubW91c2VFdmVudCE9bnVsbCYmIHRoaXMucGFuZWxHYW1lT3Zlci5yZXBsYXlCdXR0b24uaXNJbnNpZGUodGhpcy5tb3VzZUV2ZW50KSkpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZWFkQmlyZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYW5lbEdhbWVPdmVyLnNldEFjdGl2ZShmYWxzZSk7IFxyXG4gICAgICAgICAgICAgICAgdGhpcy5iaXJkLnNldEFjdGl2ZSh0cnVlKTsgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLnNjZW5lTWFuYWdlci5zd2l0Y2hTY2VuZSgxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKCF0aGlzLnN0YXJ0KXtcclxuICAgICAgICAgICAgaWYodGhpcy5pbnB1dEtleSA9PT0gXCJTcGFjZVwiKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmVzZXRTY2VuZSgpe1xyXG4gICAgICAgIC8vIGF1ZGlvUGxheWVyLnBsYXkoKTtcclxuICAgICAgICAvLyBhdWRpb1BsYXllci5sb29wID10cnVlO1xyXG4gICAgICAgIHRoaXMuY2hlY2tQaXBlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5hZGRTY29yZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5zdGFydCA9IGZhbHNlO1xyXG4gICAgICAgIHN1cGVyLnJlc2V0U2NlbmUoKTtcclxuICAgICAgICB0aGlzLnNjb3JlLnNldEN1cnJlbnRTY29yZSgwKTtcclxuICAgICAgICB0aGlzLmJpcmQucmVzZXQoKTtcclxuICAgICAgICB0aGlzLmdyb3VuZC5yZXNldCgpO1xyXG4gICAgICAgIGZvcih2YXIgaT0wO2k8dGhpcy5waXBlcy5saXN0UGlwZS5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgdGhpcy5waXBlcy5saXN0UGlwZVtpXS5yZXNldCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyhcInJlbmRlcmluZ1wiKTtcclxuICAgIH1cclxufVxyXG4iLCJjbGFzcyBTY29yZXtcclxuICAgIHByaXZhdGUgaGlnaFNjb3JlOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIGN1cnJlbnRTY29yZTogbnVtYmVyO1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICB0aGlzLmhpZ2hTY29yZSA9IDA7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50U2NvcmUgPSAwO1xyXG4gICAgfVxyXG4gICAgc2V0Q3VycmVudFNjb3JlKHNjb3JlOiBudW1iZXIpe1xyXG4gICAgICAgIHRoaXMuY3VycmVudFNjb3JlID0gc2NvcmU7XHJcbiAgICB9XHJcbiAgICBnZXRDdXJyZW50U2NvcmUoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50U2NvcmU7XHJcbiAgICB9XHJcbiAgICBnZXRIaWdoU2NvcmUoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5oaWdoU2NvcmU7XHJcbiAgICB9XHJcbiAgICBzZXRIaWdoU2NvcmUoaGlnaFNjb3JlOiBudW1iZXIpe1xyXG4gICAgICAgIHRoaXMuaGlnaFNjb3JlID0gaGlnaFNjb3JlO1xyXG4gICAgfVxyXG59XHJcblxyXG52YXIgc2NvcmUgPSBuZXcgU2NvcmUoKTtcclxuZXhwb3J0IHtzY29yZSxTY29yZX07IiwiaW1wb3J0IHtTY2VuZX0gZnJvbSAnLi4vRW5naW5lL1NjZW5lL1NjZW5lJztcclxuaW1wb3J0IHsgSW1hZ2VPYmplY3QgfSBmcm9tICcuLi9FbmdpbmUvSW1hZ2VPYmplY3QvSW1hZ2VPYmplY3QnO1xyXG5pbXBvcnQgeyBCdXR0b25PYmplY3QgfSBmcm9tICcuLi9FbmdpbmUvQnV0dG9uT2JqZWN0L0J1dHRvbk9iamVjdCc7XHJcbmltcG9ydCB7R3JvdW5kfSBmcm9tIFwiLi9Hcm91bmRcIlxyXG5pbXBvcnQgeyBHYW1lIH0gZnJvbSAnLi4vRW5naW5lL0NvcmUvR2FtZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgU3RhcnRTY2VuZSBleHRlbmRzIFNjZW5lIHtcclxuICAgIGJhY2tncm91bmQ6IEltYWdlT2JqZWN0O1xyXG4gICAgZ3JvdW5kOiBHcm91bmQ7XHJcbiAgICBpbWdTdGFydDogSW1hZ2VPYmplY3Q7XHJcbiAgICBidXR0b25TdGFydDogQnV0dG9uT2JqZWN0XHJcbiAgICBjb25zdHJ1Y3RvcihnYW1lOiBHYW1lKXtcclxuICAgICAgICBzdXBlcihnYW1lKTtcclxuICAgICAgICB0aGlzLmJhY2tncm91bmQgPW5ldyBJbWFnZU9iamVjdCgwLDAsNzAwLDgwMCxnYW1lLmxvYWRlci5nZXRJbWFnZShcImJhY2tncm91bmRcIikgYXMgSFRNTEltYWdlRWxlbWVudCwwLFwiYmFja2dyb3VuZFwiKTtcclxuICAgICAgICB0aGlzLmltZ1N0YXJ0ID0gbmV3IEltYWdlT2JqZWN0KDUwLDIwLDUwMCw3MDAsZ2FtZS5sb2FkZXIuZ2V0SW1hZ2UoXCJtZXNzYWdlXCIpIGFzIEhUTUxJbWFnZUVsZW1lbnQsMCxcIlwiKTtcclxuICAgICAgICB0aGlzLmJ1dHRvblN0YXJ0ID0gbmV3IEJ1dHRvbk9iamVjdCgwLDAsNzAwLDgwMCxudWxsLDAsXCJidXR0b25TdGFydFwiKTtcclxuICAgICAgICB0aGlzLmdyb3VuZCA9IG5ldyBHcm91bmQoMixnYW1lKVxyXG4gICAgICAgIHZhciBpbWFnZU9iamVjdHMgPSBbdGhpcy5iYWNrZ3JvdW5kXS5jb25jYXQodGhpcy5ncm91bmQuZ2V0Q29tcG9uZW50KClbXCJpbWFnZU9iamVjdHNcIl0pO1xyXG4gICAgICAgIGltYWdlT2JqZWN0cy5wdXNoKHRoaXMuaW1nU3RhcnQpO1xyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQoaW1hZ2VPYmplY3RzLFtdLFtdKTtcclxuICAgIH1cclxuICAgIHVwZGF0ZSh0aW1lOiBudW1iZXIsIGRlbHRhVGltZTogbnVtYmVyKXtcclxuICAgICAgICB0aGlzLmdyb3VuZC51cGRhdGUodGltZSwgZGVsdGFUaW1lKTtcclxuICAgICAgICBpZih0aGlzLmlucHV0S2V5ID09PSBcIkVudGVyXCJ8fHRoaXMuaW5wdXRLZXkgPT09IFwiU3BhY2VcIiB8fCh0aGlzLm1vdXNlRXZlbnQhPW51bGwgJiYgdGhpcy5idXR0b25TdGFydC5pc0luc2lkZSh0aGlzLm1vdXNlRXZlbnQpKSkge1xyXG4gICAgICAgICAgICB0aGlzLmdhbWUuc2NlbmVNYW5hZ2VyLnN3aXRjaFNjZW5lKDEpXHJcbiAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIHZhciBzdGFydFNjZW5lID0gbmV3IFN0YXJ0U2NlbmUoKTtcclxuLy8gZXhwb3J0IHtzdGFydFNjZW5lfTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IFN0YXJ0U2NlbmUgfSBmcm9tIFwiLi9nYW1lL1N0YXJ0U2NlbmVcIjtcclxuaW1wb3J0IHsgUmVuZGVyZXIgfSBmcm9tIFwiLi9FbmdpbmUvUmVuZGVyZXIvUmVuZGVyZXJcIjtcclxuaW1wb3J0IHsgU2NlbmVNYW5hZ2VyIH0gZnJvbSBcIi4vRW5naW5lL1NjZW5lL1NjZW5lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBHYW1lIH0gZnJvbSBcIi4vRW5naW5lL0NvcmUvR2FtZVwiOyAgXHJcbmltcG9ydCB7UGxheVNjZW5lfSBmcm9tIFwiLi9nYW1lL1BsYXlTY2VuZVwiO1xyXG5cclxudmFyIGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdteUNhbnZhcycpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xyXG52YXIgcmVuZGVyID0gbmV3IFJlbmRlcmVyKGNhbnZhcylcclxudmFyIGdhbWVTY2VuZSA9IG5ldyBTY2VuZU1hbmFnZXIoKTtcclxudmFyIG15R2FtZSA9IG5ldyBHYW1lKGdhbWVTY2VuZSk7XHJcblxyXG5jb25zdCBpbWFnZXNMb2FkID0gW1xyXG4gICAge1xyXG4gICAgICAgIFwia2V5XCI6IFwiYmlyZDBcIixcclxuICAgICAgICBcInBhdGhcIjogXCIvSW1hZ2VzL2JpcmQvZnJhbWUtMS5wbmdcIixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJrZXlcIjogXCJiaXJkMVwiLFxyXG4gICAgICAgIFwicGF0aFwiOiBcIi9JbWFnZXMvYmlyZC9mcmFtZS0yLnBuZ1wiLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImtleVwiOiBcImJpcmQyXCIsXHJcbiAgICAgICAgXCJwYXRoXCI6IFwiL0ltYWdlcy9iaXJkL2ZyYW1lLTMucG5nXCIsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwia2V5XCI6IFwiYmlyZDNcIixcclxuICAgICAgICBcInBhdGhcIjogXCIvSW1hZ2VzL2JpcmQvZnJhbWUtNC5wbmdcIixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJrZXlcIjogXCJiaXJkNFwiLFxyXG4gICAgICAgIFwicGF0aFwiOiBcIi9JbWFnZXMvYmlyZC9mcmFtZS01LnBuZ1wiLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImtleVwiOiBcImJpcmQ1XCIsXHJcbiAgICAgICAgXCJwYXRoXCI6IFwiL0ltYWdlcy9iaXJkL2ZyYW1lLTYucG5nXCIsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwia2V5XCI6IFwiYmlyZDZcIixcclxuICAgICAgICBcInBhdGhcIjogXCIvSW1hZ2VzL2JpcmQvZnJhbWUtNy5wbmdcIixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJrZXlcIjogXCJiaXJkN1wiLFxyXG4gICAgICAgIFwicGF0aFwiOiBcIi9JbWFnZXMvYmlyZC9mcmFtZS04LnBuZ1wiLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImtleVwiOiBcInBpcGVcIixcclxuICAgICAgICBcInBhdGhcIjogXCIvSW1hZ2VzL3BpcGUvcGlwZS1ncmVlbi5wbmdcIixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJrZXlcIjogXCJtZXNzYWdlXCIsXHJcbiAgICAgICAgXCJwYXRoXCI6IFwiL0ltYWdlcy9nYW1lU3RhcnQvbWVzc2FnZS5wbmdcIixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJrZXlcIjogXCJncm91bmRcIixcclxuICAgICAgICBcInBhdGhcIjogXCIvSW1hZ2VzL2dyb3VuZC9iYXNlLnBuZ1wiLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImtleVwiOiBcImdhbWVvdmVyXCIsXHJcbiAgICAgICAgXCJwYXRoXCI6IFwiL0ltYWdlcy9wYW5lbEdhbWVPdmVyL2dhbWVvdmVyLnBuZ1wiLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImtleVwiOiBcInJlcGxheUJ1dHRvblwiLFxyXG4gICAgICAgIFwicGF0aFwiOiBcIi9JbWFnZXMvcGFuZWxHYW1lT3Zlci9yZXBsYXktYnV0dG9uLnBuZ1wiLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImtleVwiOiBcImJhY2tncm91bmRcIixcclxuICAgICAgICBcInBhdGhcIjogXCIvSW1hZ2VzL2JhY2tncm91bmQvYmFja2dyb3VuZC1uaWdodC5wbmdcIlxyXG4gICAgfVxyXG5dXHJcblxyXG5jb25zdCBwcm9taXNlcyA9IGltYWdlc0xvYWQubWFwKChpbWFnZSkgPT4gbXlHYW1lLmxvYWRlci5hZGRJbWFnZShpbWFnZVtcInBhdGhcIl0sIGltYWdlW1wia2V5XCJdKSlcclxuUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oKCk9PiB7XHJcbiAgICB2YXIgc3RhcnRTY2VuZSA9IG5ldyBTdGFydFNjZW5lKG15R2FtZSk7XHJcbiAgICB2YXIgcGxheVNjZW5lID0gbmV3IFBsYXlTY2VuZShteUdhbWUpO1xyXG4gICAgZ2FtZVNjZW5lLmFkZFNjZW5lKHN0YXJ0U2NlbmUpO1xyXG4gICAgZ2FtZVNjZW5lLmFkZFNjZW5lKHBsYXlTY2VuZSk7XHJcbiAgICBteUdhbWUuc3RhcnQocmVuZGVyKTtcclxufSkuY2F0Y2goKGVycm9yKSA9PiB7Y29uc29sZS5sb2coZXJyb3IpfSlcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9