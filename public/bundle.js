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
    constructor(x, y, width, height, image, degrees, name, z_index = 0) {
        super(x, y, width, height, image, degrees, name, z_index);
    }
    isInside(pos) {
        if (pos.length < 2)
            return false;
        return pos[0] > this.x && pos[0] < this.x + this.width && pos[1] < this.y + this.height && pos[1] > this.y;
    }
}


/***/ }),

/***/ "./src/Engine/Collision/Collision.ts":
/*!*******************************************!*\
  !*** ./src/Engine/Collision/Collision.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Collision": () => (/* binding */ Collision)
/* harmony export */ });
class Collision {
    handleCollision(obj1, obj2) {
        if (obj1.x + obj1.width + 1 >= obj2.x && obj1.x + 1 <= obj2.x + obj2.width) {
            if (obj1.y + obj1.height + 1 >= obj2.y && obj1.y <= obj2.y + obj2.height) {
                return true;
            }
        }
        return false;
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
/* harmony import */ var _ProcessInput_ListenInput__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ProcessInput/ListenInput */ "./src/Engine/ProcessInput/ListenInput.ts");
/* harmony import */ var _ImageLoader_ImageLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ImageLoader/ImageLoader */ "./src/Engine/ImageLoader/ImageLoader.ts");


class Game {
    constructor(sceneManager) {
        this.sceneManager = sceneManager;
        this.lastTime = 0;
        this.listenInput = new _ProcessInput_ListenInput__WEBPACK_IMPORTED_MODULE_0__.ListenInput();
        this.loader = new _ImageLoader_ImageLoader__WEBPACK_IMPORTED_MODULE_1__.ImageLoader();
    }
    start(render) {
        this.listenInput.handleInput(this.sceneManager, render);
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
    constructor(x, y, width, height, name, active = true, z_index = 0) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.name = name;
        this.active = active;
        this.z_index = z_index;
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
    constructor(x = 0, y = 0, width, height, image, degrees = 0, name, z_index = 0) {
        super(x, y, width, height, name, true, z_index);
        if (image == null)
            this.image = new Image();
        else
            this.image = image;
        this.degrees = degrees;
    }
    update(time, deltaTime) { }
}


/***/ }),

/***/ "./src/Engine/ProcessInput/ListenInput.ts":
/*!************************************************!*\
  !*** ./src/Engine/ProcessInput/ListenInput.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ListenInput": () => (/* binding */ ListenInput)
/* harmony export */ });
class ListenInput {
    handleInput(sceneManager, render) {
        document.addEventListener('keydown', (e) => sceneManager.scenes[sceneManager.currentScene].processInput.onKeyDown(e));
        document.addEventListener('keyup', (e) => sceneManager.scenes[sceneManager.currentScene].processInput.onKeyUp());
        document.addEventListener('mousedown', (e) => sceneManager.scenes[sceneManager.currentScene].processInput.onMouseDown(e, render.canvas));
        document.addEventListener('mouseup', (e) => sceneManager.scenes[sceneManager.currentScene].processInput.onMouseUp());
    }
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
    constructor() {
        this.inputKey = "";
        this.mouseEvent = null;
    }
    onKeyDown(e) {
        this.inputKey = e.code;
        console.log(this.inputKey);
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
/* harmony import */ var _ImageObject_ImageObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ImageObject/ImageObject */ "./src/Engine/ImageObject/ImageObject.ts");
/* harmony import */ var _Sprite_Sprite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Sprite/Sprite */ "./src/Engine/Sprite/Sprite.ts");
/* harmony import */ var _TextObject_TextObject__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../TextObject/TextObject */ "./src/Engine/TextObject/TextObject.ts");
/* harmony import */ var _ProcessInput_ProcessInput__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ProcessInput/ProcessInput */ "./src/Engine/ProcessInput/ProcessInput.ts");
/* harmony import */ var _Collision_Collision__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Collision/Collision */ "./src/Engine/Collision/Collision.ts");





class Scene {
    constructor(game) {
        this.gameObjects = [];
        this.processInput = new _ProcessInput_ProcessInput__WEBPACK_IMPORTED_MODULE_3__.ProcessInput();
        this.collision = new _Collision_Collision__WEBPACK_IMPORTED_MODULE_4__.Collision();
        this.game = game;
    }
    resetScene() {
        for (var i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].reset();
        }
    }
    addChild(gameObjects) {
        gameObjects.map((gameObject) => { this.gameObjects.push(gameObject); });
    }
    render(render) {
        // sort gameObjects following z_index
        this.gameObjects.sort((a, b) => {
            return a.z_index - b.z_index;
        });
        for (var i = 0; i < this.gameObjects.length; i++) {
            if (this.gameObjects[i].getActive()) {
                const obj = this.gameObjects[i];
                if (obj instanceof _ImageObject_ImageObject__WEBPACK_IMPORTED_MODULE_0__.ImageObject)
                    render.drawImage(obj);
                else if (obj instanceof _Sprite_Sprite__WEBPACK_IMPORTED_MODULE_1__.Sprite)
                    render.drawSprite(obj);
                else if (obj instanceof _TextObject_TextObject__WEBPACK_IMPORTED_MODULE_2__.TextObject)
                    render.drawText(obj);
            }
        }
    }
    // xu ly logic
    update(time, delta) {
        for (var i = 0; i < this.gameObjects.length; i++) {
            var obj = this.gameObjects[i];
            if (obj instanceof _ImageObject_ImageObject__WEBPACK_IMPORTED_MODULE_0__.ImageObject || obj instanceof _Sprite_Sprite__WEBPACK_IMPORTED_MODULE_1__.Sprite)
                obj.update(time, delta);
        }
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
    constructor(x, y, width, height, images, degrees, name, fps, z_index = 0) {
        super(x, y, width, height, name, true, z_index);
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
    constructor(x, y, name, content, font, color = "black", z_index = 0) {
        super(x, y, 0, 0, name, true, z_index);
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

class Bird extends _Engine_Sprite_Sprite__WEBPACK_IMPORTED_MODULE_0__.Sprite {
    constructor(x, y, width, height, degrees, gravity, rate, scene, z_index = 0) {
        var images = [];
        // console.log("loader", scene.game.loader);
        for (var i = 0; i < 8; i++) {
            let name = "bird" + i;
            images.push(scene.game.loader.getImage(name));
        }
        super(x, y, width, height, images, degrees, "bird", rate, z_index);
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
            if (this.degrees > 40)
                this.degrees = 40;
        }
        else {
            this.degrees -= 1;
            if (this.degrees < -20)
                this.degrees = -20;
            this.playAnimation(time, deltaTime);
        }
    }
    fly() {
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
        var imageObject1 = new _Engine_ImageObject_ImageObject__WEBPACK_IMPORTED_MODULE_0__.ImageObject(0, 670, 650, 150, image, 0, "ground", 2);
        var imageObject2 = new _Engine_ImageObject_ImageObject__WEBPACK_IMPORTED_MODULE_0__.ImageObject(649, 670, 650, 150, image, 0, "ground", 2);
        this.images = [imageObject1, imageObject2];
        this.speed = speed;
    }
    update(time, deltaTime) {
        for (var i = 0; i < this.images.length; i++) {
            this.images[i].x -= this.speed * (deltaTime / 16.67);
            if (this.images[i].x < -(650)) {
                this.images[i].x = this.images[Math.abs(i - 1)].x + 649;
            }
        }
    }
    getComponent() {
        return this.images;
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
        var PipeUp = new _Engine_ImageObject_ImageObject__WEBPACK_IMPORTED_MODULE_0__.ImageObject(x, y, pipeWidth, pipeHeight, game.loader.getImage("pipe"), 180, "pipe", 1);
        var PipeDown = new _Engine_ImageObject_ImageObject__WEBPACK_IMPORTED_MODULE_0__.ImageObject(x, y + pipeHeight + blanks, pipeWidth, pipeHeight, game.loader.getImage("pipe"), 0, "pipe", 1);
        var checkScore = new _Engine_ImageObject_ImageObject__WEBPACK_IMPORTED_MODULE_0__.ImageObject(x + pipeWidth, y + pipeHeight, 10, blanks, null, 0, "checkScore", 1);
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
        return this.Pipes;
    }
}
class ListPairOfPipes {
    constructor(game) {
        this.listPipe = [];
        for (var i = 0; i < numPipe; i++) {
            var x = i * distance + pipeWidth + 400;
            var y = Math.floor(Math.random() * -200);
            var pipe = new PairOfPipe(x, y, game, 4);
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
        return [this.imgGameOver, this.replayButton, this.currentScore, this.highScore];
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









const point = new Audio("audio/point.mp3");
const die = new Audio("audio/die.mp3");
const hit = new Audio("audio/hit.mp3");
const audioPlayer = new Audio("audio/orchestrawav-26158.mp3");
const audio = new Audio("audio/swoosh.mp3");
class PlayScene extends _Engine_Scene_Scene__WEBPACK_IMPORTED_MODULE_0__.Scene {
    constructor(game) {
        super(game);
        // play audio
        // audioPlayer.play();
        // audioPlayer.loop =true;
        this.checkPipe = false;
        this.addScore = null;
        this.deadBird = false;
        this.start = false;
        this.pause = false;
        this.score = new _Score__WEBPACK_IMPORTED_MODULE_5__.Score();
        this.bird = new _Bird__WEBPACK_IMPORTED_MODULE_1__.Bird(100, 280, 50, 50, 0, 0.5, 20, this, 2);
        this.textDescription = new _Engine_TextObject_TextObject__WEBPACK_IMPORTED_MODULE_3__.TextObject(140, 450, "Description", "Press Enter to continue", "30px Arial", "white", 2);
        this.textDescription.setActive(false);
        this.textScore = new _Engine_TextObject_TextObject__WEBPACK_IMPORTED_MODULE_3__.TextObject(10, 30, "score", "Score: " + this.score.getCurrentScore(), "18px Arial", "white", 2);
        var bg = new _Engine_ImageObject_ImageObject__WEBPACK_IMPORTED_MODULE_4__.ImageObject(0, 0, 700, 800, game.loader.getImage("background"), 0, "background");
        this.ground = new _Ground__WEBPACK_IMPORTED_MODULE_6__.Ground(4, game);
        this.pipes = new _PairOfPipe__WEBPACK_IMPORTED_MODULE_2__.ListPairOfPipes(game);
        this.panelGameOver = new _PanelGameOver__WEBPACK_IMPORTED_MODULE_7__.PanelGameOver(new _Engine_ImageObject_ImageObject__WEBPACK_IMPORTED_MODULE_4__.ImageObject(60, 300, 500, 130, game.loader.getImage("gameover"), 0, "gameOver", 3), new _Engine_TextObject_TextObject__WEBPACK_IMPORTED_MODULE_3__.TextObject(110, 470, "showScore", "Score: 0", "30px Arial", "white", 3), new _Engine_TextObject_TextObject__WEBPACK_IMPORTED_MODULE_3__.TextObject(330, 470, "highScore", "High Score: 0", "30px Arial", "white", 3), new _Engine_ButtonObject_ButtonObject__WEBPACK_IMPORTED_MODULE_8__.ButtonObject(225, 500, 160, 80, game.loader.getImage("replayButton"), 0, "replayButton", 3));
        // List of GameObject
        var listGameObject = [bg, this.bird, this.textScore, this.textDescription];
        listGameObject = listGameObject.concat(this.ground.getComponent());
        listGameObject = listGameObject.concat(this.panelGameOver.getComponent());
        for (var i = 0; i < this.pipes.listPipe.length; i++) {
            var pipe = this.pipes.listPipe[i];
            listGameObject = listGameObject.concat(pipe.getComponent());
        }
        console.log("listGameObject", listGameObject);
        this.addChild(listGameObject);
        // hiden panelGameOver
        this.panelGameOver.setActive(false);
    }
    update(time, deltaTime) {
        if (!this.deadBird && this.start && !this.pause) {
            if (this.processInput.inputKey === "KeyA") {
                this.pause = true;
                this.textDescription.setActive(true);
            }
            var pipes = this.gameObjects.filter((imb) => {
                return imb.name === "pipe";
            });
            var checkScore = this.gameObjects.filter((imb) => {
                return imb.name === "checkScore";
            });
            this.ground.update(time, deltaTime);
            for (var j = 0; j < pipes.length; j++) {
                if (this.collision.handleCollision(pipes[j], this.bird)) {
                    this.checkPipe = true;
                    console.log("game over!");
                    break;
                }
            }
            for (var k = 0; k < checkScore.length; k++) {
                if (this.collision.handleCollision(checkScore[k], this.bird) && this.addScore != k) {
                    this.score.setCurrentScore(this.score.getCurrentScore() + 1);
                    this.textScore.content = "Score: " + this.score.getCurrentScore();
                    this.addScore = k;
                    point.play();
                    break;
                }
            }
            this.pipes.listPipe.map((pipe) => {
                pipe.update(time, deltaTime);
            });
            this.pipes.update();
            if (this.processInput.inputKey === "Space") {
                this.bird.fly();
                audio.play();
                audio.playbackRate = 2;
            }
            // va cham ground
            if (this.collision.handleCollision(this.ground.getComponent()[0], this.bird) || this.collision.handleCollision(this.ground.getComponent()[1], this.bird) || this.checkPipe) {
                if (this.score.getCurrentScore() > this.score.getHighScore())
                    this.score.setHighScore(this.score.getCurrentScore());
                // update score
                this.panelGameOver.update(this.score.getCurrentScore(), this.score.getHighScore());
                // set state bird is die
                this.deadBird = true;
                // play audio
                audioPlayer.pause();
                hit.play();
                setTimeout(() => {
                    // show panelGameOver
                    this.panelGameOver.setActive(true);
                    die.play();
                }, 500);
            }
            super.update(time, deltaTime);
        }
        else if (this.deadBird) {
            if (!this.collision.handleCollision(this.ground.getComponent()[0], this.bird) && !this.collision.handleCollision(this.ground.getComponent()[1], this.bird)) {
                this.bird.speed = 100;
                this.bird.update(time, deltaTime);
            }
            if ((this.processInput.inputKey === "Enter" || this.processInput.mouseEvent != null && this.panelGameOver.replayButton.isInside(this.processInput.mouseEvent))) {
                this.deadBird = false;
                this.panelGameOver.setActive(false);
                this.game.sceneManager.switchScene(1);
            }
        }
        else if (!this.start) {
            if (this.processInput.inputKey === "Space") {
                this.start = true;
            }
        }
        else if (this.pause) {
            if (this.processInput.inputKey === "Enter") {
                this.pause = false;
                this.textDescription.setActive(false);
            }
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
        this.textScore.setContent("Score: 0");
        this.bird.reset();
        this.ground.reset();
        for (var i = 0; i < this.pipes.listPipe.length; i++) {
            this.pipes.listPipe[i].reset();
        }
        console.log("reset rendering");
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
/* harmony export */   "Score": () => (/* binding */ Score)
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
        this.imgStart = new _Engine_ImageObject_ImageObject__WEBPACK_IMPORTED_MODULE_1__.ImageObject(50, 20, 500, 700, game.loader.getImage("message"), 0, "", 2);
        this.buttonStart = new _Engine_ButtonObject_ButtonObject__WEBPACK_IMPORTED_MODULE_2__.ButtonObject(0, 0, 700, 800, null, 0, "buttonStart");
        this.ground = new _Ground__WEBPACK_IMPORTED_MODULE_3__.Ground(2, game);
        var imageObjects = [this.background].concat(this.ground.getComponent());
        imageObjects.push(this.imgStart);
        this.addChild(imageObjects);
    }
    update(time, deltaTime) {
        this.ground.update(time, deltaTime);
        if (this.processInput.inputKey === "Enter" || this.processInput.inputKey === "Space" || (this.processInput.mouseEvent != null && this.buttonStart.isInside(this.processInput.mouseEvent))) {
            this.game.sceneManager.switchScene(1);
            return 1;
        }
        return 0;
    }
}


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
        "path": "Images/bird/frame-1.png",
    },
    {
        "key": "bird1",
        "path": "Images/bird/frame-2.png",
    },
    {
        "key": "bird2",
        "path": "Images/bird/frame-3.png",
    },
    {
        "key": "bird3",
        "path": "Images/bird/frame-4.png",
    },
    {
        "key": "bird4",
        "path": "Images/bird/frame-5.png",
    },
    {
        "key": "bird5",
        "path": "Images/bird/frame-6.png",
    },
    {
        "key": "bird6",
        "path": "Images/bird/frame-7.png",
    },
    {
        "key": "bird7",
        "path": "Images/bird/frame-8.png",
    },
    {
        "key": "pipe",
        "path": "Images/pipe/pipe-green.png",
    },
    {
        "key": "message",
        "path": "Images/gameStart/message.png",
    },
    {
        "key": "ground",
        "path": "Images/ground/base.png",
    },
    {
        "key": "gameover",
        "path": "Images/panelGameOver/gameover.png",
    },
    {
        "key": "replayButton",
        "path": "Images/panelGameOver/replay-button.png",
    },
    {
        "key": "background",
        "path": "Images/background/background-night.png"
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUkscUVBQVUsQ0FBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLE9BQU8sRUFBQyxTQUFTLEdBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQUUsRUFBRSxZQUFZLEVBQUUsT0FBTyxFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hILElBQUksRUFBRSxHQUFHLElBQUksd0VBQVcsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFxQixFQUFDLENBQUMsRUFBQyxZQUFZLENBQUMsQ0FBQztRQUM1RyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksMkNBQU0sQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLHdEQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLHlEQUFhLENBQ2xDLElBQUksd0VBQVcsQ0FBQyxFQUFFLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFxQixFQUFDLENBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxDQUFDLEVBQ25HLElBQUkscUVBQVUsQ0FBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLFdBQVcsRUFBQyxVQUFVLEVBQUUsWUFBWSxFQUFDLE9BQU8sRUFBQyxDQUFDLENBQUMsRUFDdEUsSUFBSSxxRUFBVSxDQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsV0FBVyxFQUFDLGVBQWUsRUFBRSxZQUFZLEVBQUMsT0FBTyxFQUFDLENBQUMsQ0FBQyxFQUMzRSxJQUFJLDJFQUFZLENBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLGNB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UUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzlCLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDekIsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsR0FBRSxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWVrMS8uL3NyYy9FbmdpbmUvQnV0dG9uT2JqZWN0L0J1dHRvbk9iamVjdC50cyIsIndlYnBhY2s6Ly93ZWVrMS8uL3NyYy9FbmdpbmUvQ29sbGlzaW9uL0NvbGxpc2lvbi50cyIsIndlYnBhY2s6Ly93ZWVrMS8uL3NyYy9FbmdpbmUvQ29yZS9HYW1lLnRzIiwid2VicGFjazovL3dlZWsxLy4vc3JjL0VuZ2luZS9HYW1lT2JqZWN0L0dhbWVPYmplY3QudHMiLCJ3ZWJwYWNrOi8vd2VlazEvLi9zcmMvRW5naW5lL0ltYWdlTG9hZGVyL0ltYWdlTG9hZGVyLnRzIiwid2VicGFjazovL3dlZWsxLy4vc3JjL0VuZ2luZS9JbWFnZU9iamVjdC9JbWFnZU9iamVjdC50cyIsIndlYnBhY2s6Ly93ZWVrMS8uL3NyYy9FbmdpbmUvUHJvY2Vzc0lucHV0L0xpc3RlbklucHV0LnRzIiwid2VicGFjazovL3dlZWsxLy4vc3JjL0VuZ2luZS9Qcm9jZXNzSW5wdXQvUHJvY2Vzc0lucHV0LnRzIiwid2VicGFjazovL3dlZWsxLy4vc3JjL0VuZ2luZS9SZW5kZXJlci9SZW5kZXJlci50cyIsIndlYnBhY2s6Ly93ZWVrMS8uL3NyYy9FbmdpbmUvU2NlbmUvU2NlbmUudHMiLCJ3ZWJwYWNrOi8vd2VlazEvLi9zcmMvRW5naW5lL1NjZW5lL1NjZW5lTWFuYWdlci50cyIsIndlYnBhY2s6Ly93ZWVrMS8uL3NyYy9FbmdpbmUvU3ByaXRlL1Nwcml0ZS50cyIsIndlYnBhY2s6Ly93ZWVrMS8uL3NyYy9FbmdpbmUvVGV4dE9iamVjdC9UZXh0T2JqZWN0LnRzIiwid2VicGFjazovL3dlZWsxLy4vc3JjL2dhbWUvQmlyZC50cyIsIndlYnBhY2s6Ly93ZWVrMS8uL3NyYy9nYW1lL0dyb3VuZC50cyIsIndlYnBhY2s6Ly93ZWVrMS8uL3NyYy9nYW1lL1BhaXJPZlBpcGUudHMiLCJ3ZWJwYWNrOi8vd2VlazEvLi9zcmMvZ2FtZS9QYW5lbEdhbWVPdmVyLnRzIiwid2VicGFjazovL3dlZWsxLy4vc3JjL2dhbWUvUGxheVNjZW5lLnRzIiwid2VicGFjazovL3dlZWsxLy4vc3JjL2dhbWUvU2NvcmUudHMiLCJ3ZWJwYWNrOi8vd2VlazEvLi9zcmMvZ2FtZS9TdGFydFNjZW5lLnRzIiwid2VicGFjazovL3dlZWsxL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlZWsxL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWVrMS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlZWsxL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VlazEvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW1hZ2VPYmplY3R9IGZyb20gXCIuLi9JbWFnZU9iamVjdC9JbWFnZU9iamVjdFwiO1xyXG5leHBvcnQgY2xhc3MgQnV0dG9uT2JqZWN0IGV4dGVuZHMgSW1hZ2VPYmplY3R7XHJcbiAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsaW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQgfCBudWxsLCBkZWdyZWVzOiBudW1iZXIsIG5hbWU6IHN0cmluZywgel9pbmRleDogbnVtYmVyID0wKXtcclxuICAgICAgICBzdXBlcih4LCB5LCB3aWR0aCwgaGVpZ2h0LGltYWdlLCBkZWdyZWVzLCBuYW1lLHpfaW5kZXgpO1xyXG4gICAgfVxyXG4gICAgaXNJbnNpZGUocG9zOiBBcnJheTxudW1iZXI+KXtcclxuICAgICAgICBpZihwb3MubGVuZ3RoIDwgMikgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIHJldHVybiBwb3NbMF0gPiB0aGlzLnggJiYgcG9zWzBdIDwgdGhpcy54K3RoaXMud2lkdGggJiYgcG9zWzFdIDwgdGhpcy55K3RoaXMuaGVpZ2h0ICYmIHBvc1sxXSA+IHRoaXMueTtcclxuICAgIH0gICAgXHJcbn0iLCJpbXBvcnQge0dhbWVPYmplY3R9IGZyb20gXCIuLi9HYW1lT2JqZWN0L0dhbWVPYmplY3RcIjtcclxuZXhwb3J0IGNsYXNzIENvbGxpc2lvbntcclxuICAgIGhhbmRsZUNvbGxpc2lvbihvYmoxIDogR2FtZU9iamVjdCwgb2JqMiA6IEdhbWVPYmplY3Qpe1xyXG4gICAgICAgIGlmKG9iajEueCsgb2JqMS53aWR0aCArIDE+PW9iajIueCAmJiBvYmoxLngrMSA8PSBvYmoyLnggKyBvYmoyLndpZHRoKXtcclxuICAgICAgICAgICAgaWYob2JqMS55KyBvYmoxLmhlaWdodCArIDE+PW9iajIueSAmJiBvYmoxLnk8PSBvYmoyLnkgKyBvYmoyLmhlaWdodCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBTY2VuZU1hbmFnZXIgfSBmcm9tIFwiLi4vU2NlbmUvU2NlbmVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFJlbmRlcmVyIH0gZnJvbSBcIi4uL1JlbmRlcmVyL1JlbmRlcmVyXCI7XHJcbmltcG9ydCB7IExpc3RlbklucHV0IH0gZnJvbSBcIi4uL1Byb2Nlc3NJbnB1dC9MaXN0ZW5JbnB1dFwiO1xyXG5pbXBvcnQge0ltYWdlTG9hZGVyIH0gZnJvbSBcIi4uL0ltYWdlTG9hZGVyL0ltYWdlTG9hZGVyXCI7XHJcbmV4cG9ydCBjbGFzcyBHYW1le1xyXG4gICAgc2NlbmVNYW5hZ2VyOiBTY2VuZU1hbmFnZXI7XHJcbiAgICBsYXN0VGltZTogbnVtYmVyO1xyXG4gICAgbGlzdGVuSW5wdXQ6IExpc3RlbklucHV0O1xyXG4gICAgbG9hZGVyOiBJbWFnZUxvYWRlcjtcclxuICAgIGNvbnN0cnVjdG9yKHNjZW5lTWFuYWdlcjogU2NlbmVNYW5hZ2VyKXtcclxuICAgICAgICB0aGlzLnNjZW5lTWFuYWdlciA9IHNjZW5lTWFuYWdlcjtcclxuICAgICAgICB0aGlzLmxhc3RUaW1lID0gMDtcclxuICAgICAgICB0aGlzLmxpc3RlbklucHV0ID0gbmV3IExpc3RlbklucHV0KCk7XHJcbiAgICAgICAgdGhpcy5sb2FkZXIgPSBuZXcgSW1hZ2VMb2FkZXIoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgc3RhcnQocmVuZGVyOiBSZW5kZXJlcil7XHJcbiAgICAgICAgdGhpcy5saXN0ZW5JbnB1dC5oYW5kbGVJbnB1dCh0aGlzLnNjZW5lTWFuYWdlciwgcmVuZGVyKTtcclxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCk9PnRoaXMubG9vcChyZW5kZXIpKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgbG9vcChyZW5kZXI6IFJlbmRlcmVyKXtcclxuICAgICAgICBjb25zdCB0aW1lID0gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpO1xyXG4gICAgICAgIGNvbnN0IGRlbHRhID0gdGltZSAtIHRoaXMubGFzdFRpbWU7XHJcbiAgICAgICAgdGhpcy5zY2VuZU1hbmFnZXIuc2NlbmVzW3RoaXMuc2NlbmVNYW5hZ2VyLmN1cnJlbnRTY2VuZV0udXBkYXRlKHRpbWUsZGVsdGEpO1xyXG4gICAgICAgIHRoaXMuc2NlbmVNYW5hZ2VyLnNjZW5lc1t0aGlzLnNjZW5lTWFuYWdlci5jdXJyZW50U2NlbmVdLnJlbmRlcihyZW5kZXIpO1xyXG4gICAgICAgIHRoaXMubGFzdFRpbWUgPSB0aW1lO1xyXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKT0+dGhpcy5sb29wKHJlbmRlcikpO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGNsYXNzIEdhbWVPYmplY3R7XHJcbiAgICB4OiBudW1iZXI7XHJcbiAgICB5OiBudW1iZXI7XHJcbiAgICB3aWR0aDogbnVtYmVyO1xyXG4gICAgaGVpZ2h0OiBudW1iZXI7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICBhY3RpdmU6IGJvb2xlYW47XHJcbiAgICBkZWZhdWx0UG9zaXRpb246IEFycmF5PG51bWJlcj47XHJcbiAgICB6X2luZGV4OiBudW1iZXI7XHJcbiAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIG5hbWU6IHN0cmluZywgYWN0aXZlID0gdHJ1ZSwgel9pbmRleDogbnVtYmVyID0gMCkge1xyXG4gICAgICAgIHRoaXMueCA9IHg7XHJcbiAgICAgICAgdGhpcy55ID0geTtcclxuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLmFjdGl2ZSA9IGFjdGl2ZTtcclxuICAgICAgICB0aGlzLnpfaW5kZXggPSB6X2luZGV4O1xyXG4gICAgICAgIHRoaXMuZGVmYXVsdFBvc2l0aW9uID0gW3gseV07XHJcbiAgICB9XHJcbiAgICByZXNldCgpe1xyXG4gICAgICAgIHRoaXMueCA9IHRoaXMuZGVmYXVsdFBvc2l0aW9uWzBdO1xyXG4gICAgICAgIHRoaXMueSA9IHRoaXMuZGVmYXVsdFBvc2l0aW9uWzFdO1xyXG4gICAgfVxyXG4gICAgc2V0QWN0aXZlKGFjdGl2ZTogYm9vbGVhbil7XHJcbiAgICAgICAgdGhpcy5hY3RpdmUgPSBhY3RpdmU7XHJcbiAgICB9XHJcbiAgICBnZXRBY3RpdmUoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5hY3RpdmU7XHJcbiAgICB9XHJcblxyXG59IiwiZXhwb3J0IGNsYXNzIEltYWdlTG9hZGVyIHtcclxuICAgIGltYWdlcyE6IE1hcDxzdHJpbmcsIEhUTUxJbWFnZUVsZW1lbnQ+O1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICB0aGlzLmltYWdlcyA9IG5ldyBNYXA8c3RyaW5nLCBIVE1MSW1hZ2VFbGVtZW50PigpO1xyXG4gICAgfVxyXG4gICAgYXN5bmMgYWRkSW1hZ2Uoc3JjOiBzdHJpbmcsIG5hbWU6IHN0cmluZyl7XHJcbiAgICAgICAgdmFyIGltZyA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgIGltZy5zcmMgPSBzcmM7XHJcbiAgICAgICAgdGhpcy5pbWFnZXMuc2V0KG5hbWUsIGltZyk7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgaW1nLm9ubG9hZCA9IHJlc29sdmU7XHJcbiAgICAgICAgICAgIGltZy5vbmVycm9yID0gcmVqZWN0OyBcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgZ2V0SW1hZ2UobmFtZTogc3RyaW5nKTogSFRNTEltYWdlRWxlbWVudCB8IHVuZGVmaW5lZHtcclxuICAgICAgICBpZih0aGlzLmltYWdlcy5oYXMobmFtZSkpXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmltYWdlcy5nZXQobmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBJbWFnZSgpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtHYW1lT2JqZWN0fSBmcm9tIFwiLi4vR2FtZU9iamVjdC9HYW1lT2JqZWN0XCJcclxuZXhwb3J0IGNsYXNzIEltYWdlT2JqZWN0IGV4dGVuZHMgR2FtZU9iamVjdHtcclxuICAgIGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50O1xyXG4gICAgZGVncmVlczogbnVtYmVyO1xyXG4gICAgY29uc3RydWN0b3IoeDogbnVtYmVyID0gMCwgeTogbnVtYmVyID0gMCwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsaW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQgfG51bGwsIGRlZ3JlZXM6IG51bWJlciA9IDAsIG5hbWU6IHN0cmluZywgel9pbmRleDogbnVtYmVyID0wKXtcclxuICAgICAgICBzdXBlcih4LCB5LCB3aWR0aCwgaGVpZ2h0LG5hbWUsdHJ1ZSx6X2luZGV4KTtcclxuICAgICAgICBpZihpbWFnZT09bnVsbClcclxuICAgICAgICAgICAgdGhpcy5pbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgIGVsc2UgdGhpcy5pbWFnZSA9IGltYWdlO1xyXG4gICAgICAgIHRoaXMuZGVncmVlcyA9IGRlZ3JlZXM7XHJcbiAgICB9XHJcbiAgICB1cGRhdGUodGltZTogbnVtYmVyLCBkZWx0YVRpbWU6bnVtYmVyKXt9XHJcbn0iLCJpbXBvcnQge1NjZW5lTWFuYWdlcn0gZnJvbSAnLi4vU2NlbmUvU2NlbmVNYW5hZ2VyJztcclxuaW1wb3J0IHtSZW5kZXJlcn0gZnJvbSAnLi4vUmVuZGVyZXIvUmVuZGVyZXInXHJcbmV4cG9ydCBjbGFzcyBMaXN0ZW5JbnB1dHtcclxuICAgIGhhbmRsZUlucHV0KHNjZW5lTWFuYWdlcjogU2NlbmVNYW5hZ2VyLCByZW5kZXI6IFJlbmRlcmVyKXtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywoZSk9PnNjZW5lTWFuYWdlci5zY2VuZXNbc2NlbmVNYW5hZ2VyLmN1cnJlbnRTY2VuZV0ucHJvY2Vzc0lucHV0Lm9uS2V5RG93bihlKSk7XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLChlKT0+c2NlbmVNYW5hZ2VyLnNjZW5lc1tzY2VuZU1hbmFnZXIuY3VycmVudFNjZW5lXS5wcm9jZXNzSW5wdXQub25LZXlVcCgpKTtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLChlKT0+c2NlbmVNYW5hZ2VyLnNjZW5lc1tzY2VuZU1hbmFnZXIuY3VycmVudFNjZW5lXS5wcm9jZXNzSW5wdXQub25Nb3VzZURvd24oZSxyZW5kZXIuY2FudmFzKSk7XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsKGUpPT5zY2VuZU1hbmFnZXIuc2NlbmVzW3NjZW5lTWFuYWdlci5jdXJyZW50U2NlbmVdLnByb2Nlc3NJbnB1dC5vbk1vdXNlVXAoKSk7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgY2xhc3MgUHJvY2Vzc0lucHV0e1xyXG4gICAgaW5wdXRLZXkgOiBTdHJpbmc7XHJcbiAgICBtb3VzZUV2ZW50IDogQXJyYXk8bnVtYmVyPiB8IG51bGw7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMuaW5wdXRLZXkgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMubW91c2VFdmVudCA9IG51bGw7XHJcbiAgICB9XHJcbiAgICBvbktleURvd24oZTogS2V5Ym9hcmRFdmVudCl7XHJcbiAgICAgICAgdGhpcy5pbnB1dEtleSA9IGUuY29kZTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmlucHV0S2V5KTtcclxuICAgIH1cclxuICAgIG9uS2V5VXAoKXtcclxuICAgICAgICB0aGlzLmlucHV0S2V5ID0gXCJcIjtcclxuICAgIH1cclxuICAgIG9uTW91c2VEb3duKGU6IE1vdXNlRXZlbnQsIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQpIHtcclxuICAgICAgICB2YXIgcmVjdCA9IGNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICB2YXIgbW91c2VYID0gZS5jbGllbnRYIC0gcmVjdC5sZWZ0O1xyXG4gICAgICAgIHZhciBtb3VzZVkgPSBlLmNsaWVudFkgLSByZWN0LnRvcDsgICAgXHJcbiAgICAgICAgdGhpcy5tb3VzZUV2ZW50ID0gW21vdXNlWCwgbW91c2VZXTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm1vdXNlRXZlbnQpO1xyXG4gICAgfVxyXG4gICAgb25Nb3VzZVVwKCkge1xyXG4gICAgICAgIHRoaXMubW91c2VFdmVudCA9IG51bGw7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBJbWFnZU9iamVjdCB9IGZyb20gXCIuLi9JbWFnZU9iamVjdC9JbWFnZU9iamVjdFwiO1xyXG5pbXBvcnQgeyBTcHJpdGUgfSBmcm9tIFwiLi4vU3ByaXRlL1Nwcml0ZVwiO1xyXG5pbXBvcnQgeyBUZXh0T2JqZWN0IH0gZnJvbSBcIi4uL1RleHRPYmplY3QvVGV4dE9iamVjdFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFJlbmRlcmVye1xyXG4gICAgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcclxuICAgIGNvbnN0cnVjdG9yKGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQpe1xyXG4gICAgICAgIHRoaXMuY2FudmFzID0gY2FudmFzO1xyXG4gICAgfVxyXG4gICAgZHJhd0ltYWdlKGltYWdlT2JqZWN0OiBJbWFnZU9iamVjdCl7XHJcbiAgICAgICAgY29uc3QgY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgICAgICBpZihjdHghPW51bGwpe1xyXG4gICAgICAgICAgICBjdHguc2F2ZSgpO1xyXG4gICAgICAgICAgICBjdHgudHJhbnNsYXRlKGltYWdlT2JqZWN0LnggKyBpbWFnZU9iamVjdC53aWR0aC8yLGltYWdlT2JqZWN0LnkgKyBpbWFnZU9iamVjdC5oZWlnaHQvMilcclxuICAgICAgICAgICAgY3R4LnJvdGF0ZShpbWFnZU9iamVjdC5kZWdyZWVzKk1hdGguUEkvMTgwKTtcclxuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShpbWFnZU9iamVjdC5pbWFnZSwtaW1hZ2VPYmplY3Qud2lkdGgvMiwgLWltYWdlT2JqZWN0LmhlaWdodC8yLGltYWdlT2JqZWN0LndpZHRoLGltYWdlT2JqZWN0LmhlaWdodCk7XHJcbiAgICAgICAgICAgIGN0eC5yZXN0b3JlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZHJhd1Nwcml0ZShzcHJpdGU6IFNwcml0ZSl7XHJcbiAgICAgICAgY29uc3QgY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgICAgICBpZihjdHghPW51bGwpe1xyXG4gICAgICAgICAgICBjdHguc2F2ZSgpO1xyXG4gICAgICAgICAgICBjdHgudHJhbnNsYXRlKHNwcml0ZS54ICsgc3ByaXRlLndpZHRoLzIsc3ByaXRlLnkgKyBzcHJpdGUuaGVpZ2h0LzIpXHJcbiAgICAgICAgICAgIGN0eC5yb3RhdGUoc3ByaXRlLmRlZ3JlZXMqTWF0aC5QSS8xODApO1xyXG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKHNwcml0ZS5pbWFnZXNbc3ByaXRlLmZyYW1lQ3VycmVudF0sLXNwcml0ZS53aWR0aC8yLCAtc3ByaXRlLmhlaWdodC8yLHNwcml0ZS53aWR0aCxzcHJpdGUuaGVpZ2h0KTtcclxuICAgICAgICAgICAgY3R4LnJlc3RvcmUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBkcmF3VGV4dCh0ZXh0OiBUZXh0T2JqZWN0KXtcclxuICAgICAgICBjb25zdCBjdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgICAgIGlmKGN0eCE9bnVsbCl7XHJcbiAgICAgICAgICAgIGN0eC5mb250ID0gdGV4dC5mb250O1xyXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gdGV4dC5jb2xvcjtcclxuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KHRleHQuY29udGVudCx0ZXh0LngsdGV4dC55KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBJbWFnZU9iamVjdCB9IGZyb20gXCIuLi9JbWFnZU9iamVjdC9JbWFnZU9iamVjdFwiO1xyXG5pbXBvcnQgeyBTcHJpdGUgfSBmcm9tIFwiLi4vU3ByaXRlL1Nwcml0ZVwiO1xyXG5pbXBvcnQgeyBUZXh0T2JqZWN0IH0gZnJvbSBcIi4uL1RleHRPYmplY3QvVGV4dE9iamVjdFwiO1xyXG5pbXBvcnQge1JlbmRlcmVyfSBmcm9tIFwiLi4vUmVuZGVyZXIvUmVuZGVyZXJcIjtcclxuaW1wb3J0IHtHYW1lT2JqZWN0fSBmcm9tIFwiLi4vR2FtZU9iamVjdC9HYW1lT2JqZWN0XCI7XHJcbmltcG9ydCB7IFByb2Nlc3NJbnB1dCB9IGZyb20gXCIuLi9Qcm9jZXNzSW5wdXQvUHJvY2Vzc0lucHV0XCI7XHJcbmltcG9ydCB7IEdhbWUgfSBmcm9tIFwiLi4vQ29yZS9HYW1lXCI7XHJcbmltcG9ydCB7IENvbGxpc2lvbiB9IGZyb20gXCIuLi9Db2xsaXNpb24vQ29sbGlzaW9uXCI7XHJcbmV4cG9ydCBjbGFzcyBTY2VuZXtcclxuICAgIGdhbWVPYmplY3RzOiBHYW1lT2JqZWN0W107XHJcbiAgICBwcm9jZXNzSW5wdXQ6IFByb2Nlc3NJbnB1dDtcclxuICAgIGNvbGxpc2lvbjogQ29sbGlzaW9uO1xyXG4gICAgZ2FtZTogR2FtZTtcclxuICAgIGNvbnN0cnVjdG9yKGdhbWU6IEdhbWUpe1xyXG4gICAgICAgIHRoaXMuZ2FtZU9iamVjdHMgPSBbXTtcclxuICAgICAgICB0aGlzLnByb2Nlc3NJbnB1dCA9IG5ldyBQcm9jZXNzSW5wdXQoKTtcclxuICAgICAgICB0aGlzLmNvbGxpc2lvbiA9IG5ldyBDb2xsaXNpb24oKTtcclxuICAgICAgICB0aGlzLmdhbWUgPSBnYW1lO1xyXG4gICAgfVxyXG4gICAgcmVzZXRTY2VuZSgpe1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDx0aGlzLmdhbWVPYmplY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZU9iamVjdHNbaV0ucmVzZXQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBhZGRDaGlsZChnYW1lT2JqZWN0czogR2FtZU9iamVjdFtdKXtcclxuICAgICAgICBnYW1lT2JqZWN0cy5tYXAoKGdhbWVPYmplY3QpPT57dGhpcy5nYW1lT2JqZWN0cy5wdXNoKGdhbWVPYmplY3QpfSlcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIocmVuZGVyOiBSZW5kZXJlcil7XHJcbiAgICAgICAgLy8gc29ydCBnYW1lT2JqZWN0cyBmb2xsb3dpbmcgel9pbmRleFxyXG4gICAgICAgIHRoaXMuZ2FtZU9iamVjdHMuc29ydCgoYSxiKT0+e1xyXG4gICAgICAgICAgICByZXR1cm4gYS56X2luZGV4IC0gYi56X2luZGV4O1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPHRoaXMuZ2FtZU9iamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYodGhpcy5nYW1lT2JqZWN0c1tpXS5nZXRBY3RpdmUoKSl7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBvYmogPSB0aGlzLmdhbWVPYmplY3RzW2ldOyBcclxuICAgICAgICAgICAgICAgIGlmKCBvYmogaW5zdGFuY2VvZiBJbWFnZU9iamVjdClcclxuICAgICAgICAgICAgICAgICAgICByZW5kZXIuZHJhd0ltYWdlKG9iaik7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKG9iaiBpbnN0YW5jZW9mIFNwcml0ZSlcclxuICAgICAgICAgICAgICAgICAgICByZW5kZXIuZHJhd1Nwcml0ZShvYmopO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZihvYmogaW5zdGFuY2VvZiBUZXh0T2JqZWN0KVxyXG4gICAgICAgICAgICAgICAgICAgIHJlbmRlci5kcmF3VGV4dChvYmopO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8geHUgbHkgbG9naWNcclxuICAgIHVwZGF0ZSh0aW1lOiBudW1iZXIsIGRlbHRhOiBudW1iZXIpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8dGhpcy5nYW1lT2JqZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgb2JqID0gdGhpcy5nYW1lT2JqZWN0c1tpXTtcclxuICAgICAgICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIEltYWdlT2JqZWN0IHx8IG9iaiBpbnN0YW5jZW9mIFNwcml0ZSlcclxuICAgICAgICAgICAgICAgIG9iai51cGRhdGUodGltZSwgZGVsdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCB7IFNjZW5lIH0gZnJvbSBcIi4vU2NlbmVcIjtcclxuaW1wb3J0IHtHYW1lfSBmcm9tIFwiLi4vQ29yZS9HYW1lXCI7XHJcbmV4cG9ydCBjbGFzcyBTY2VuZU1hbmFnZXIge1xyXG4gICAgc2NlbmVzOiBTY2VuZVtdO1xyXG4gICAgY3VycmVudFNjZW5lOiBudW1iZXI7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMuc2NlbmVzID0gW107XHJcbiAgICAgICAgdGhpcy5jdXJyZW50U2NlbmUgPSAwO1xyXG4gICAgfVxyXG4gICAgYWRkU2NlbmUoc2NlbmU6IFNjZW5lKXtcclxuICAgICAgICB0aGlzLnNjZW5lcy5wdXNoKHNjZW5lKVxyXG4gICAgfVxyXG4gICAgc3dpdGNoU2NlbmUobmV4dEluZGV4OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnNjZW5lc1t0aGlzLmN1cnJlbnRTY2VuZV0ucmVzZXRTY2VuZSgpO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFNjZW5lID0gbmV4dEluZGV4O1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKCl7fVxyXG4gICAgcmVuZGVyKCl7fVxyXG59IiwiaW1wb3J0IHtHYW1lT2JqZWN0fSBmcm9tIFwiLi4vR2FtZU9iamVjdC9HYW1lT2JqZWN0XCJcclxuZXhwb3J0IGNsYXNzIFNwcml0ZSBleHRlbmRzIEdhbWVPYmplY3R7XHJcbiAgICBpbWFnZXM6IEFycmF5PEhUTUxJbWFnZUVsZW1lbnQ+O1xyXG4gICAgZGVncmVlczogbnVtYmVyO1xyXG4gICAgZnJhbWVDdXJyZW50OiBudW1iZXI7XHJcbiAgICByYXRlOiBudW1iZXI7XHJcbiAgICBhZHQ6IG51bWJlcjtcclxuICAgIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgaW1hZ2VzOiBBcnJheTxIVE1MSW1hZ2VFbGVtZW50PixkZWdyZWVzOiBudW1iZXIsbmFtZTogc3RyaW5nLCBmcHM6IG51bWJlciwgel9pbmRleDogbnVtYmVyID0wKXtcclxuICAgICAgICBzdXBlcih4LCB5LCB3aWR0aCwgaGVpZ2h0LG5hbWUsdHJ1ZSx6X2luZGV4KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImltYWdlc1wiLGltYWdlcyk7XHJcbiAgICAgICAgdGhpcy5pbWFnZXMgPSBpbWFnZXM7XHJcbiAgICAgICAgdGhpcy5kZWdyZWVzID0gZGVncmVlcztcclxuICAgICAgICB0aGlzLmZyYW1lQ3VycmVudCA9IDA7XHJcbiAgICAgICAgdGhpcy5yYXRlID0gMS4wL2ZwcyAqMTAwMDtcclxuICAgICAgICB0aGlzLmFkdCA9IDA7XHJcbiAgICB9XHJcbiAgICB1cGRhdGUodGltZTogbnVtYmVyLCBkZWx0YVRpbWU6bnVtYmVyKXtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcGxheUFuaW1hdGlvbih0aW1lOiBudW1iZXIsIGRlbHRhVGltZTpudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmFkdCArPSBkZWx0YVRpbWVcclxuICAgICAgICBpZih0aGlzLmFkdD49dGhpcy5yYXRlKXtcclxuICAgICAgICAgICAgdGhpcy5hZHQgLT0gdGhpcy5yYXRlO1xyXG4gICAgICAgICAgICB0aGlzLmZyYW1lQ3VycmVudCArPTE7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZnJhbWVDdXJyZW50PnRoaXMuaW1hZ2VzLmxlbmd0aC0xKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZnJhbWVDdXJyZW50ID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCB7R2FtZU9iamVjdH0gZnJvbSBcIi4uL0dhbWVPYmplY3QvR2FtZU9iamVjdFwiXHJcbmV4cG9ydCBjbGFzcyBUZXh0T2JqZWN0IGV4dGVuZHMgR2FtZU9iamVjdHtcclxuICAgIGNvbnRlbnQ6IHN0cmluZztcclxuICAgIGZvbnQ6IHN0cmluZztcclxuICAgIGNvbG9yOiBzdHJpbmc7XHJcbiAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlciwgbmFtZTogc3RyaW5nICwgY29udGVudDogc3RyaW5nLCBmb250OiBzdHJpbmcsIGNvbG9yID0gXCJibGFja1wiLCB6X2luZGV4OiBudW1iZXIgPTApIHtcclxuICAgICAgICBzdXBlcih4LCB5LCAwLCAwLCBuYW1lLHRydWUsIHpfaW5kZXgpO1xyXG4gICAgICAgIHRoaXMuY29udGVudCA9IGNvbnRlbnQ7XHJcbiAgICAgICAgdGhpcy5mb250ID0gZm9udDtcclxuICAgICAgICB0aGlzLmNvbG9yID0gY29sb3I7XHJcbiAgICB9XHJcbiAgICBzZXRDb250ZW50KGNvbnRlbnQ6IHN0cmluZyl7XHJcbiAgICAgICAgdGhpcy5jb250ZW50ID0gY29udGVudDtcclxuICAgIH1cclxufSIsImltcG9ydCB7IFNwcml0ZSB9IGZyb20gXCIuLi9FbmdpbmUvU3ByaXRlL1Nwcml0ZVwiO1xyXG5cclxuaW1wb3J0IHtTY2VuZX0gZnJvbSBcIi4uL0VuZ2luZS9TY2VuZS9TY2VuZVwiXHJcbmV4cG9ydCBjbGFzcyBCaXJkIGV4dGVuZHMgU3ByaXRlIHtcclxuICAgIGdyYXZpdHkgOiBudW1iZXI7XHJcbiAgICBzcGVlZCA6IG51bWJlcjsgXHJcbiAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsZGVncmVlczogbnVtYmVyLGdyYXZpdHk6IG51bWJlcixyYXRlOiBudW1iZXIsIHNjZW5lOiBTY2VuZSwgel9pbmRleDogbnVtYmVyID0wKSB7XHJcbiAgICAgICAgdmFyIGltYWdlczpBcnJheTxIVE1MSW1hZ2VFbGVtZW50PiA9IFtdO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwibG9hZGVyXCIsIHNjZW5lLmdhbWUubG9hZGVyKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8ODtpKyspe1xyXG4gICAgICAgICAgICBsZXQgbmFtZSA9ICBcImJpcmRcIiArIGk7XHJcbiAgICAgICAgICAgIGltYWdlcy5wdXNoKHNjZW5lLmdhbWUubG9hZGVyLmdldEltYWdlKG5hbWUpIGFzIEhUTUxJbWFnZUVsZW1lbnQpO1xyXG4gICAgICAgIH0gXHJcbiAgICAgICAgc3VwZXIoeCwgeSwgd2lkdGgsIGhlaWdodCxpbWFnZXMsZGVncmVlcyxcImJpcmRcIixyYXRlLCB6X2luZGV4KTtcclxuICAgICAgICB0aGlzLmdyYXZpdHkgPSBncmF2aXR5O1xyXG4gICAgICAgIHRoaXMuc3BlZWQgPSAwO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKHRpbWU6IG51bWJlciwgZGVsdGFUaW1lOm51bWJlcil7XHJcbiAgICAgICAgdGhpcy55ICs9ICh0aGlzLnNwZWVkICsgMC41KnRoaXMuZ3Jhdml0eSkqKGRlbHRhVGltZS8xNi42Nyk7XHJcbiAgICAgICAgdGhpcy5zcGVlZCArPSB0aGlzLmdyYXZpdHkqKGRlbHRhVGltZS8xNi42Nyk7XHJcbiAgICAgICAgaWYodGhpcy55IDwgMClcclxuICAgICAgICAgICAgdGhpcy55ID0gMDtcclxuICAgICAgICBpZih0aGlzLnNwZWVkPjApe1xyXG4gICAgICAgICAgICB0aGlzLmRlZ3JlZXMgKz0gMTtcclxuICAgICAgICAgICAgaWYodGhpcy5kZWdyZWVzPjQwKSB0aGlzLmRlZ3JlZXMgPSA0MDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5kZWdyZWVzIC09IDE7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZGVncmVlczwtMjApIHRoaXMuZGVncmVlcyA9IC0yMDtcclxuICAgICAgICAgICAgdGhpcy5wbGF5QW5pbWF0aW9uKHRpbWUsIGRlbHRhVGltZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZseSgpe1xyXG4gICAgICAgIHRoaXMuc3BlZWQgPSAtODtcclxuICAgIH1cclxuICAgIHJlc2V0KCl7XHJcbiAgICAgICAgc3VwZXIucmVzZXQoKTtcclxuICAgICAgICB0aGlzLnNwZWVkID0gMDtcclxuICAgIH1cclxufSIsImltcG9ydCB7IEltYWdlT2JqZWN0IH0gZnJvbSBcIi4uL0VuZ2luZS9JbWFnZU9iamVjdC9JbWFnZU9iamVjdFwiO1xyXG5pbXBvcnQge0dhbWV9IGZyb20gXCIuLi9FbmdpbmUvQ29yZS9HYW1lXCI7XHJcbmNsYXNzIEdyb3VuZHtcclxuICAgIGltYWdlczogQXJyYXk8SW1hZ2VPYmplY3Q+O1xyXG4gICAgc3BlZWQ6IG51bWJlcjtcclxuICAgIGNvbnN0cnVjdG9yKHNwZWVkOiBudW1iZXIsIGdhbWU6IEdhbWUpe1xyXG4gICAgICAgIHZhciBpbWFnZSA9IGdhbWUubG9hZGVyLmdldEltYWdlKFwiZ3JvdW5kXCIpO1xyXG4gICAgICAgIHZhciBpbWFnZU9iamVjdDEgPSBuZXcgSW1hZ2VPYmplY3QoMCw2NzAsNjUwLDE1MCxpbWFnZSBhcyBIVE1MSW1hZ2VFbGVtZW50LDAsXCJncm91bmRcIiwyKTtcclxuICAgICAgICB2YXIgaW1hZ2VPYmplY3QyID0gbmV3IEltYWdlT2JqZWN0KDY0OSw2NzAsNjUwLDE1MCxpbWFnZSBhcyBIVE1MSW1hZ2VFbGVtZW50LDAsXCJncm91bmRcIiwyKTtcclxuICAgICAgICB0aGlzLmltYWdlcyA9IFtpbWFnZU9iamVjdDEsaW1hZ2VPYmplY3QyXTtcclxuICAgICAgICB0aGlzLnNwZWVkID0gc3BlZWQ7XHJcbiAgICB9XHJcbiAgICB1cGRhdGUodGltZTogbnVtYmVyLCBkZWx0YVRpbWU6IG51bWJlcil7XHJcbiAgICAgICAgZm9yKHZhciBpPTA7aTx0aGlzLmltYWdlcy5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgdGhpcy5pbWFnZXNbaV0ueCAtPSB0aGlzLnNwZWVkKihkZWx0YVRpbWUvMTYuNjcpO1xyXG4gICAgICAgICAgICBpZih0aGlzLmltYWdlc1tpXS54IDwgLSAoNjUwKSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmltYWdlc1tpXS54ID0gdGhpcy5pbWFnZXNbTWF0aC5hYnMoaS0xKV0ueCs2NDk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IFxyXG4gICAgfVxyXG4gICAgZ2V0Q29tcG9uZW50KCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW1hZ2VzO1xyXG4gICAgfVxyXG4gICAgcmVzZXQoKXtcclxuICAgICAgICBmb3IodmFyIGk9MDtpPHRoaXMuaW1hZ2VzLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICB0aGlzLmltYWdlc1tpXS5yZXNldCgpO1xyXG4gICAgICAgIH0gXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7R3JvdW5kfTsiLCJpbXBvcnQgeyBJbWFnZU9iamVjdCB9IGZyb20gXCIuLi9FbmdpbmUvSW1hZ2VPYmplY3QvSW1hZ2VPYmplY3RcIjtcclxuaW1wb3J0IHtHYW1lfSBmcm9tIFwiLi4vRW5naW5lL0NvcmUvR2FtZVwiXHJcbmNvbnN0IGJsYW5rcyA9IDIwMDtcclxuY29uc3QgcGlwZUhlaWdodCA9IDM1MDtcclxuY29uc3QgbnVtUGlwZSA9IDQ7XHJcbmNvbnN0IGRpc3RhbmNlID0gMjUwO1xyXG5jb25zdCBwaXBlV2lkdGggPSA4MDtcclxuY2xhc3MgUGFpck9mUGlwZXtcclxuICAgIFBpcGVzOiBBcnJheTxJbWFnZU9iamVjdD47XHJcbiAgICBwcml2YXRlIHNwZWVkOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoeDpudW1iZXIsIHk6bnVtYmVyLCBnYW1lOiBHYW1lLHNwZWVkOiBudW1iZXIpe1xyXG4gICAgICAgIHZhciBQaXBlVXAgPSBuZXcgSW1hZ2VPYmplY3QoeCx5LHBpcGVXaWR0aCxwaXBlSGVpZ2h0LGdhbWUubG9hZGVyLmdldEltYWdlKFwicGlwZVwiKSBhcyBIVE1MSW1hZ2VFbGVtZW50LDE4MCxcInBpcGVcIiwxKTtcclxuICAgICAgICB2YXIgUGlwZURvd24gPSBuZXcgSW1hZ2VPYmplY3QoeCx5K3BpcGVIZWlnaHQrYmxhbmtzLHBpcGVXaWR0aCxwaXBlSGVpZ2h0LGdhbWUubG9hZGVyLmdldEltYWdlKFwicGlwZVwiKSBhcyBIVE1MSW1hZ2VFbGVtZW50LDAsXCJwaXBlXCIsMSk7XHJcbiAgICAgICAgdmFyIGNoZWNrU2NvcmUgPSBuZXcgSW1hZ2VPYmplY3QoeCtwaXBlV2lkdGgseStwaXBlSGVpZ2h0LDEwLGJsYW5rcyxudWxsLDAsXCJjaGVja1Njb3JlXCIsMSk7XHJcbiAgICAgICAgdGhpcy5QaXBlcz0gW1BpcGVVcCxQaXBlRG93bixjaGVja1Njb3JlXTtcclxuICAgICAgICB0aGlzLnNwZWVkID0gc3BlZWQ7XHJcbiAgICB9XHJcbiAgICB1cGRhdGUodGltZTpudW1iZXIsIGRlbHRhVGltZTpudW1iZXIpe1xyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPDM7aSsrKXtcclxuICAgICAgICAgICAgdGhpcy5QaXBlc1tpXS54IC09IHRoaXMuc3BlZWQqKGRlbHRhVGltZS8xNi42Nyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmVzZXQoKXtcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwzO2krKyl7XHJcbiAgICAgICAgICAgIHRoaXMuUGlwZXNbaV0ucmVzZXQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZXRDb21wb25lbnQoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5QaXBlcztcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgTGlzdFBhaXJPZlBpcGVze1xyXG4gICAgbGlzdFBpcGU6IFBhaXJPZlBpcGVbXTtcclxuICAgIGNvbnN0cnVjdG9yKGdhbWU6IEdhbWUpe1xyXG4gICAgICAgIHRoaXMubGlzdFBpcGUgPSBbXTtcclxuICAgICAgICBmb3IodmFyIGk9MDtpPG51bVBpcGU7aSsrKXtcclxuICAgICAgICAgICAgdmFyIHggPSBpKmRpc3RhbmNlICsgcGlwZVdpZHRoICsgNDAwO1xyXG4gICAgICAgICAgICB2YXIgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqLTIwMCk7XHJcbiAgICAgICAgICAgIHZhciBwaXBlID0gbmV3IFBhaXJPZlBpcGUoeCx5LGdhbWUsNCk7XHJcbiAgICAgICAgICAgIHRoaXMubGlzdFBpcGUucHVzaChwaXBlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB1cGRhdGUoKXtcclxuICAgICAgICB0aGlzLmxpc3RQaXBlLm1hcCgocGlwZSxpbmRleCkgPT57XHJcbiAgICAgICAgICAgIGlmKHBpcGUuUGlwZXNbMF0ueDwtMTAwKXtcclxuICAgICAgICAgICAgICAgIHZhciBmcm9udEluZGV4ID0gaW5kZXggLTE7XHJcbiAgICAgICAgICAgICAgICBpZihmcm9udEluZGV4PDApIGZyb250SW5kZXggPSB0aGlzLmxpc3RQaXBlLmxlbmd0aC0xO1xyXG4gICAgICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8cGlwZS5QaXBlcy5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgICAgICAgICBwaXBlLlBpcGVzW2ldLnggPSB0aGlzLmxpc3RQaXBlW2Zyb250SW5kZXhdLlBpcGVzW2ldLnggKyBkaXN0YW5jZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7UGFpck9mUGlwZSwgTGlzdFBhaXJPZlBpcGVzfTtcclxuIiwiaW1wb3J0IHsgVGV4dE9iamVjdCB9IGZyb20gJy4uL0VuZ2luZS9UZXh0T2JqZWN0L1RleHRPYmplY3QnO1xyXG5pbXBvcnQge0J1dHRvbk9iamVjdCB9IGZyb20gJy4uL0VuZ2luZS9CdXR0b25PYmplY3QvQnV0dG9uT2JqZWN0JztcclxuaW1wb3J0IHsgSW1hZ2VPYmplY3QgfSBmcm9tICcuLi9FbmdpbmUvSW1hZ2VPYmplY3QvSW1hZ2VPYmplY3QnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFBhbmVsR2FtZU92ZXIge1xyXG4gICAgaW1nR2FtZU92ZXI6IEltYWdlT2JqZWN0O1xyXG4gICAgY3VycmVudFNjb3JlOiBUZXh0T2JqZWN0O1xyXG4gICAgaGlnaFNjb3JlOiBUZXh0T2JqZWN0O1xyXG4gICAgcmVwbGF5QnV0dG9uOiBCdXR0b25PYmplY3Q7XHJcbiAgICBjb25zdHJ1Y3RvcihpbWdHYW1lT3ZlcjogSW1hZ2VPYmplY3QsIGN1cnJlbnRTY29yZTogVGV4dE9iamVjdCwgaGlnaFNjb3JlOiBUZXh0T2JqZWN0LCByZXBsYXlCdXR0b246IEJ1dHRvbk9iamVjdCl7XHJcbiAgICAgICAgdGhpcy5pbWdHYW1lT3ZlciA9IGltZ0dhbWVPdmVyO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFNjb3JlID0gY3VycmVudFNjb3JlO1xyXG4gICAgICAgIHRoaXMuaGlnaFNjb3JlID0gaGlnaFNjb3JlO1xyXG4gICAgICAgIHRoaXMucmVwbGF5QnV0dG9uID0gcmVwbGF5QnV0dG9uO1xyXG4gICAgfVxyXG4gICAgc2V0QWN0aXZlKGFjdGl2ZTogYm9vbGVhbil7XHJcbiAgICAgICAgdGhpcy5pbWdHYW1lT3Zlci5zZXRBY3RpdmUoYWN0aXZlKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRTY29yZS5zZXRBY3RpdmUoYWN0aXZlKTtcclxuICAgICAgICB0aGlzLmhpZ2hTY29yZS5zZXRBY3RpdmUoYWN0aXZlKTtcclxuICAgICAgICB0aGlzLnJlcGxheUJ1dHRvbi5zZXRBY3RpdmUoYWN0aXZlKTtcclxuICAgIH1cclxuICAgIGdldENvbXBvbmVudCgpe1xyXG4gICAgICAgIHJldHVybiBbdGhpcy5pbWdHYW1lT3ZlciwgdGhpcy5yZXBsYXlCdXR0b24sIHRoaXMuY3VycmVudFNjb3JlLCB0aGlzLmhpZ2hTY29yZV07XHJcbiAgICB9XHJcbiAgICB1cGRhdGUoY3VycmVudFNjb3JlOiBudW1iZXIsIGhpZ2hTY29yZTogbnVtYmVyKXtcclxuICAgICAgICB0aGlzLmN1cnJlbnRTY29yZS5zZXRDb250ZW50KFwiU2NvcmU6IFwiICsgY3VycmVudFNjb3JlKTtcclxuICAgICAgICB0aGlzLmhpZ2hTY29yZS5zZXRDb250ZW50KFwiSGlnaCBTY29yZTogXCIgKyBoaWdoU2NvcmUpXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge1NjZW5lfSBmcm9tICcuLi9FbmdpbmUvU2NlbmUvU2NlbmUnO1xyXG5pbXBvcnQge0JpcmR9IGZyb20gJy4vQmlyZCc7XHJcbmltcG9ydCB7TGlzdFBhaXJPZlBpcGVzfSBmcm9tICcuL1BhaXJPZlBpcGUnO1xyXG5pbXBvcnQge1RleHRPYmplY3QgfSBmcm9tICcuLi9FbmdpbmUvVGV4dE9iamVjdC9UZXh0T2JqZWN0JztcclxuaW1wb3J0IHtJbWFnZU9iamVjdCB9IGZyb20gJy4uL0VuZ2luZS9JbWFnZU9iamVjdC9JbWFnZU9iamVjdCc7XHJcbmltcG9ydCB7U2NvcmV9IGZyb20gXCIuL1Njb3JlXCI7XHJcbmltcG9ydCB7R3JvdW5kIH0gZnJvbSAnLi9Hcm91bmQnO1xyXG5pbXBvcnQge1BhbmVsR2FtZU92ZXJ9IGZyb20gJy4vUGFuZWxHYW1lT3ZlcidcclxuaW1wb3J0IHtHYW1lfSBmcm9tICcuLi9FbmdpbmUvQ29yZS9HYW1lJ1xyXG5pbXBvcnQge0J1dHRvbk9iamVjdH0gZnJvbSAnLi4vRW5naW5lL0J1dHRvbk9iamVjdC9CdXR0b25PYmplY3QnO1xyXG5pbXBvcnQgeyBHYW1lT2JqZWN0IH0gZnJvbSAnLi4vRW5naW5lL0dhbWVPYmplY3QvR2FtZU9iamVjdCc7XHJcblxyXG5jb25zdCBwb2ludCA9IG5ldyBBdWRpbyhcImF1ZGlvL3BvaW50Lm1wM1wiKTtcclxuY29uc3QgZGllID0gbmV3IEF1ZGlvKFwiYXVkaW8vZGllLm1wM1wiKTtcclxuY29uc3QgaGl0ID0gbmV3IEF1ZGlvKFwiYXVkaW8vaGl0Lm1wM1wiKTtcclxuY29uc3QgYXVkaW9QbGF5ZXIgPSBuZXcgQXVkaW8oXCJhdWRpby9vcmNoZXN0cmF3YXYtMjYxNTgubXAzXCIpO1xyXG5jb25zdCBhdWRpbyA9IG5ldyBBdWRpbyhcImF1ZGlvL3N3b29zaC5tcDNcIik7XHJcblxyXG5leHBvcnQgY2xhc3MgUGxheVNjZW5lIGV4dGVuZHMgU2NlbmUge1xyXG4gICAgYmlyZDogQmlyZDtcclxuICAgIHBpcGVzOiBMaXN0UGFpck9mUGlwZXM7XHJcbiAgICBncm91bmQ6IEdyb3VuZDtcclxuICAgIGNoZWNrUGlwZTogYm9vbGVhbjtcclxuICAgIHRleHRTY29yZTogVGV4dE9iamVjdDtcclxuICAgIHRleHREZXNjcmlwdGlvbjogVGV4dE9iamVjdDtcclxuICAgIGFkZFNjb3JlOiBudW1iZXIgfCBudWxsO1xyXG4gICAgc2NvcmU6IFNjb3JlO1xyXG4gICAgZGVhZEJpcmQ6IGJvb2xlYW47XHJcbiAgICBwYW5lbEdhbWVPdmVyIDogUGFuZWxHYW1lT3ZlcjtcclxuICAgIHN0YXJ0OiBib29sZWFuO1xyXG4gICAgcGF1c2U6IGJvb2xlYW47XHJcbiAgICBjb25zdHJ1Y3RvcihnYW1lOiBHYW1lKXtcclxuICAgICAgICBzdXBlcihnYW1lKTtcclxuICAgICAgICAvLyBwbGF5IGF1ZGlvXHJcbiAgICAgICAgLy8gYXVkaW9QbGF5ZXIucGxheSgpO1xyXG4gICAgICAgIC8vIGF1ZGlvUGxheWVyLmxvb3AgPXRydWU7XHJcbiAgICAgICAgdGhpcy5jaGVja1BpcGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmFkZFNjb3JlID0gbnVsbDtcclxuICAgICAgICB0aGlzLmRlYWRCaXJkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zdGFydCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucGF1c2UgPSBmYWxzZTsgXHJcbiAgICAgICAgdGhpcy5zY29yZSA9IG5ldyBTY29yZSgpO1xyXG4gICAgICAgIHRoaXMuYmlyZCA9ICBuZXcgQmlyZCgxMDAsMjgwLDUwLDUwLDAsMC41LDIwLHRoaXMsMilcclxuICAgICAgICB0aGlzLnRleHREZXNjcmlwdGlvbiA9IG5ldyBUZXh0T2JqZWN0KDE0MCw0NTAsXCJEZXNjcmlwdGlvblwiLFwiUHJlc3MgRW50ZXIgdG8gY29udGludWVcIixcIjMwcHggQXJpYWxcIiwgXCJ3aGl0ZVwiLDIpO1xyXG4gICAgICAgIHRoaXMudGV4dERlc2NyaXB0aW9uLnNldEFjdGl2ZShmYWxzZSk7XHJcbiAgICAgICAgdGhpcy50ZXh0U2NvcmUgPSBuZXcgVGV4dE9iamVjdCgxMCwzMCxcInNjb3JlXCIsXCJTY29yZTogXCIrIHRoaXMuc2NvcmUuZ2V0Q3VycmVudFNjb3JlKCksIFwiMThweCBBcmlhbFwiLCBcIndoaXRlXCIsMik7XHJcbiAgICAgICAgdmFyIGJnID0gbmV3IEltYWdlT2JqZWN0KDAsMCw3MDAsODAwLGdhbWUubG9hZGVyLmdldEltYWdlKFwiYmFja2dyb3VuZFwiKSBhcyBIVE1MSW1hZ2VFbGVtZW50LDAsXCJiYWNrZ3JvdW5kXCIpO1xyXG4gICAgICAgIHRoaXMuZ3JvdW5kID0gbmV3IEdyb3VuZCg0LGdhbWUpO1xyXG4gICAgICAgIHRoaXMucGlwZXMgPSBuZXcgTGlzdFBhaXJPZlBpcGVzKGdhbWUpO1xyXG4gICAgICAgIHRoaXMucGFuZWxHYW1lT3ZlciA9IG5ldyBQYW5lbEdhbWVPdmVyKFxyXG4gICAgICAgICAgICBuZXcgSW1hZ2VPYmplY3QoNjAsMzAwLDUwMCwxMzAsZ2FtZS5sb2FkZXIuZ2V0SW1hZ2UoXCJnYW1lb3ZlclwiKSBhcyBIVE1MSW1hZ2VFbGVtZW50LDAsXCJnYW1lT3ZlclwiLDMpLFxyXG4gICAgICAgICAgICBuZXcgVGV4dE9iamVjdCgxMTAsNDcwLFwic2hvd1Njb3JlXCIsXCJTY29yZTogMFwiLCBcIjMwcHggQXJpYWxcIixcIndoaXRlXCIsMyksXHJcbiAgICAgICAgICAgIG5ldyBUZXh0T2JqZWN0KDMzMCw0NzAsXCJoaWdoU2NvcmVcIixcIkhpZ2ggU2NvcmU6IDBcIiwgXCIzMHB4IEFyaWFsXCIsXCJ3aGl0ZVwiLDMpLFxyXG4gICAgICAgICAgICBuZXcgQnV0dG9uT2JqZWN0KDIyNSw1MDAsMTYwLDgwLGdhbWUubG9hZGVyLmdldEltYWdlKFwicmVwbGF5QnV0dG9uXCIpIGFzIEhUTUxJbWFnZUVsZW1lbnQsMCxcInJlcGxheUJ1dHRvblwiLDMpLCBcclxuICAgICAgICApO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIExpc3Qgb2YgR2FtZU9iamVjdFxyXG4gICAgICAgIHZhciBsaXN0R2FtZU9iamVjdCA6QXJyYXk8R2FtZU9iamVjdD4gPSBbYmcsdGhpcy5iaXJkLHRoaXMudGV4dFNjb3JlLCB0aGlzLnRleHREZXNjcmlwdGlvbl07XHJcbiAgICAgICAgbGlzdEdhbWVPYmplY3QgPSAgbGlzdEdhbWVPYmplY3QuY29uY2F0KHRoaXMuZ3JvdW5kLmdldENvbXBvbmVudCgpKTtcclxuICAgICAgICBsaXN0R2FtZU9iamVjdCA9IGxpc3RHYW1lT2JqZWN0LmNvbmNhdCh0aGlzLnBhbmVsR2FtZU92ZXIuZ2V0Q29tcG9uZW50KCkpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGZvcih2YXIgaT0wO2k8dGhpcy5waXBlcy5saXN0UGlwZS5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgdmFyIHBpcGUgPSB0aGlzLnBpcGVzLmxpc3RQaXBlW2ldO1xyXG4gICAgICAgICAgICBsaXN0R2FtZU9iamVjdCA9IGxpc3RHYW1lT2JqZWN0LmNvbmNhdChwaXBlLmdldENvbXBvbmVudCgpKVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyhcImxpc3RHYW1lT2JqZWN0XCIsbGlzdEdhbWVPYmplY3QpXHJcbiAgICAgICAgdGhpcy5hZGRDaGlsZChsaXN0R2FtZU9iamVjdCk7XHJcbiAgICAgICAgLy8gaGlkZW4gcGFuZWxHYW1lT3ZlclxyXG4gICAgICAgIHRoaXMucGFuZWxHYW1lT3Zlci5zZXRBY3RpdmUoZmFsc2UpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICB1cGRhdGUodGltZTogbnVtYmVyLCBkZWx0YVRpbWU6IG51bWJlcikge1xyXG4gICAgICAgIGlmKCAhdGhpcy5kZWFkQmlyZCAmJiB0aGlzLnN0YXJ0ICYmICF0aGlzLnBhdXNlKXtcclxuICAgICAgICAgICAgaWYodGhpcy5wcm9jZXNzSW5wdXQuaW5wdXRLZXkgPT09IFwiS2V5QVwiKXtcclxuICAgICAgICAgICAgICAgIHRoaXMucGF1c2UgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0RGVzY3JpcHRpb24uc2V0QWN0aXZlKHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBwaXBlcyA9IHRoaXMuZ2FtZU9iamVjdHMuZmlsdGVyKChpbWIpPT57XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaW1iLm5hbWUgPT09IFwicGlwZVwiO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHZhciBjaGVja1Njb3JlID0gdGhpcy5nYW1lT2JqZWN0cy5maWx0ZXIoKGltYik9PntcclxuICAgICAgICAgICAgICAgIHJldHVybiBpbWIubmFtZSA9PT0gXCJjaGVja1Njb3JlXCI7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHRoaXMuZ3JvdW5kLnVwZGF0ZSh0aW1lLCBkZWx0YVRpbWUpO1xyXG4gICAgICAgICAgICBmb3IodmFyIGogPSAwOyBqIDwgcGlwZXMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuY29sbGlzaW9uLmhhbmRsZUNvbGxpc2lvbihwaXBlc1tqXSx0aGlzLmJpcmQpKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrUGlwZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJnYW1lIG92ZXIhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgY2hlY2tTY29yZS5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5jb2xsaXNpb24uaGFuZGxlQ29sbGlzaW9uKGNoZWNrU2NvcmVba10sdGhpcy5iaXJkKSYmIHRoaXMuYWRkU2NvcmUgIT0gayl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY29yZS5zZXRDdXJyZW50U2NvcmUodGhpcy5zY29yZS5nZXRDdXJyZW50U2NvcmUoKSsxKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRleHRTY29yZS5jb250ZW50ID0gXCJTY29yZTogXCIgKyB0aGlzLnNjb3JlLmdldEN1cnJlbnRTY29yZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkU2NvcmUgPSBrO1xyXG4gICAgICAgICAgICAgICAgICAgIHBvaW50LnBsYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnBpcGVzLmxpc3RQaXBlLm1hcCgocGlwZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcGlwZS51cGRhdGUodGltZSwgZGVsdGFUaW1lKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMucGlwZXMudXBkYXRlKCk7XHJcblxyXG4gICAgICAgICAgICBpZih0aGlzLnByb2Nlc3NJbnB1dC5pbnB1dEtleT09PVwiU3BhY2VcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iaXJkLmZseSgpO1xyXG4gICAgICAgICAgICAgICAgYXVkaW8ucGxheSgpOyBcclxuICAgICAgICAgICAgICAgIGF1ZGlvLnBsYXliYWNrUmF0ZSA9IDI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gdmEgY2hhbSBncm91bmRcclxuICAgICAgICAgICAgaWYodGhpcy5jb2xsaXNpb24uaGFuZGxlQ29sbGlzaW9uKHRoaXMuZ3JvdW5kLmdldENvbXBvbmVudCgpWzBdLCB0aGlzLmJpcmQpfHx0aGlzLmNvbGxpc2lvbi5oYW5kbGVDb2xsaXNpb24odGhpcy5ncm91bmQuZ2V0Q29tcG9uZW50KClbMV0sIHRoaXMuYmlyZCl8fHRoaXMuY2hlY2tQaXBlKXtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuc2NvcmUuZ2V0Q3VycmVudFNjb3JlKCk+IHRoaXMuc2NvcmUuZ2V0SGlnaFNjb3JlKCkpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY29yZS5zZXRIaWdoU2NvcmUodGhpcy5zY29yZS5nZXRDdXJyZW50U2NvcmUoKSk7XHJcbiAgICAgICAgICAgICAgICAvLyB1cGRhdGUgc2NvcmVcclxuICAgICAgICAgICAgICAgIHRoaXMucGFuZWxHYW1lT3Zlci51cGRhdGUodGhpcy5zY29yZS5nZXRDdXJyZW50U2NvcmUoKSwgdGhpcy5zY29yZS5nZXRIaWdoU2NvcmUoKSk7XHJcbiAgICAgICAgICAgICAgICAvLyBzZXQgc3RhdGUgYmlyZCBpcyBkaWVcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVhZEJpcmQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgLy8gcGxheSBhdWRpb1xyXG4gICAgICAgICAgICAgICAgYXVkaW9QbGF5ZXIucGF1c2UoKTtcclxuICAgICAgICAgICAgICAgIGhpdC5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+e1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHNob3cgcGFuZWxHYW1lT3ZlclxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFuZWxHYW1lT3Zlci5zZXRBY3RpdmUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGllLnBsYXkoKTtcclxuICAgICAgICAgICAgICAgIH0sIDUwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3VwZXIudXBkYXRlKHRpbWUsIGRlbHRhVGltZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodGhpcy5kZWFkQmlyZCl7XHJcbiAgICAgICAgICAgIGlmKCF0aGlzLmNvbGxpc2lvbi5oYW5kbGVDb2xsaXNpb24odGhpcy5ncm91bmQuZ2V0Q29tcG9uZW50KClbMF0sIHRoaXMuYmlyZCkmJiF0aGlzLmNvbGxpc2lvbi5oYW5kbGVDb2xsaXNpb24odGhpcy5ncm91bmQuZ2V0Q29tcG9uZW50KClbMV0sIHRoaXMuYmlyZCkpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iaXJkLnNwZWVkID0gMTAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iaXJkLnVwZGF0ZSh0aW1lLCBkZWx0YVRpbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKCh0aGlzLnByb2Nlc3NJbnB1dC5pbnB1dEtleSA9PT0gXCJFbnRlclwifHx0aGlzLnByb2Nlc3NJbnB1dC5tb3VzZUV2ZW50IT1udWxsJiYgdGhpcy5wYW5lbEdhbWVPdmVyLnJlcGxheUJ1dHRvbi5pc0luc2lkZSh0aGlzLnByb2Nlc3NJbnB1dC5tb3VzZUV2ZW50KSkpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZWFkQmlyZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYW5lbEdhbWVPdmVyLnNldEFjdGl2ZShmYWxzZSk7IFxyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLnNjZW5lTWFuYWdlci5zd2l0Y2hTY2VuZSgxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKCF0aGlzLnN0YXJ0KXtcclxuICAgICAgICAgICAgaWYodGhpcy5wcm9jZXNzSW5wdXQuaW5wdXRLZXkgPT09IFwiU3BhY2VcIil7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLnBhdXNlKXtcclxuICAgICAgICAgICAgaWYodGhpcy5wcm9jZXNzSW5wdXQuaW5wdXRLZXkgPT09IFwiRW50ZXJcIil7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhdXNlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRleHREZXNjcmlwdGlvbi5zZXRBY3RpdmUoZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmVzZXRTY2VuZSgpe1xyXG4gICAgICAgIC8vIGF1ZGlvUGxheWVyLnBsYXkoKTtcclxuICAgICAgICAvLyBhdWRpb1BsYXllci5sb29wID10cnVlO1xyXG4gICAgICAgIHRoaXMuY2hlY2tQaXBlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5hZGRTY29yZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5zdGFydCA9IGZhbHNlO1xyXG4gICAgICAgIHN1cGVyLnJlc2V0U2NlbmUoKTtcclxuICAgICAgICB0aGlzLnNjb3JlLnNldEN1cnJlbnRTY29yZSgwKTtcclxuICAgICAgICB0aGlzLnRleHRTY29yZS5zZXRDb250ZW50KFwiU2NvcmU6IDBcIik7XHJcbiAgICAgICAgdGhpcy5iaXJkLnJlc2V0KCk7XHJcbiAgICAgICAgdGhpcy5ncm91bmQucmVzZXQoKTtcclxuICAgICAgICBmb3IodmFyIGk9MDtpPHRoaXMucGlwZXMubGlzdFBpcGUubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIHRoaXMucGlwZXMubGlzdFBpcGVbaV0ucmVzZXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJyZXNldCByZW5kZXJpbmdcIik7XHJcbiAgICB9XHJcbn1cclxuIiwiY2xhc3MgU2NvcmV7XHJcbiAgICBwcml2YXRlIGhpZ2hTY29yZTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBjdXJyZW50U2NvcmU6IG51bWJlcjtcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgdGhpcy5oaWdoU2NvcmUgPSAwO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFNjb3JlID0gMDtcclxuICAgIH1cclxuICAgIHNldEN1cnJlbnRTY29yZShzY29yZTogbnVtYmVyKXtcclxuICAgICAgICB0aGlzLmN1cnJlbnRTY29yZSA9IHNjb3JlO1xyXG4gICAgfVxyXG4gICAgZ2V0Q3VycmVudFNjb3JlKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudFNjb3JlO1xyXG4gICAgfVxyXG4gICAgZ2V0SGlnaFNjb3JlKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaGlnaFNjb3JlO1xyXG4gICAgfVxyXG4gICAgc2V0SGlnaFNjb3JlKGhpZ2hTY29yZTogbnVtYmVyKXtcclxuICAgICAgICB0aGlzLmhpZ2hTY29yZSA9IGhpZ2hTY29yZTtcclxuICAgIH1cclxufVxyXG5leHBvcnQge1Njb3JlfTsiLCJpbXBvcnQge1NjZW5lfSBmcm9tICcuLi9FbmdpbmUvU2NlbmUvU2NlbmUnO1xyXG5pbXBvcnQgeyBJbWFnZU9iamVjdCB9IGZyb20gJy4uL0VuZ2luZS9JbWFnZU9iamVjdC9JbWFnZU9iamVjdCc7XHJcbmltcG9ydCB7IEJ1dHRvbk9iamVjdCB9IGZyb20gJy4uL0VuZ2luZS9CdXR0b25PYmplY3QvQnV0dG9uT2JqZWN0JztcclxuaW1wb3J0IHtHcm91bmR9IGZyb20gXCIuL0dyb3VuZFwiXHJcbmltcG9ydCB7IEdhbWUgfSBmcm9tICcuLi9FbmdpbmUvQ29yZS9HYW1lJztcclxuXHJcbmV4cG9ydCBjbGFzcyBTdGFydFNjZW5lIGV4dGVuZHMgU2NlbmUge1xyXG4gICAgYmFja2dyb3VuZDogSW1hZ2VPYmplY3Q7XHJcbiAgICBncm91bmQ6IEdyb3VuZDtcclxuICAgIGltZ1N0YXJ0OiBJbWFnZU9iamVjdDtcclxuICAgIGJ1dHRvblN0YXJ0OiBCdXR0b25PYmplY3RcclxuICAgIGNvbnN0cnVjdG9yKGdhbWU6IEdhbWUpe1xyXG4gICAgICAgIHN1cGVyKGdhbWUpO1xyXG4gICAgICAgIHRoaXMuYmFja2dyb3VuZCA9bmV3IEltYWdlT2JqZWN0KDAsMCw3MDAsODAwLGdhbWUubG9hZGVyLmdldEltYWdlKFwiYmFja2dyb3VuZFwiKSBhcyBIVE1MSW1hZ2VFbGVtZW50LDAsXCJiYWNrZ3JvdW5kXCIpO1xyXG4gICAgICAgIHRoaXMuaW1nU3RhcnQgPSBuZXcgSW1hZ2VPYmplY3QoNTAsMjAsNTAwLDcwMCxnYW1lLmxvYWRlci5nZXRJbWFnZShcIm1lc3NhZ2VcIikgYXMgSFRNTEltYWdlRWxlbWVudCwwLFwiXCIsMik7XHJcbiAgICAgICAgdGhpcy5idXR0b25TdGFydCA9IG5ldyBCdXR0b25PYmplY3QoMCwwLDcwMCw4MDAsbnVsbCwwLFwiYnV0dG9uU3RhcnRcIik7XHJcbiAgICAgICAgdGhpcy5ncm91bmQgPSBuZXcgR3JvdW5kKDIsZ2FtZSlcclxuICAgICAgICB2YXIgaW1hZ2VPYmplY3RzID0gW3RoaXMuYmFja2dyb3VuZF0uY29uY2F0KHRoaXMuZ3JvdW5kLmdldENvbXBvbmVudCgpKTtcclxuICAgICAgICBpbWFnZU9iamVjdHMucHVzaCh0aGlzLmltZ1N0YXJ0KTtcclxuICAgICAgICB0aGlzLmFkZENoaWxkKGltYWdlT2JqZWN0cyk7XHJcbiAgICB9XHJcbiAgICB1cGRhdGUodGltZTogbnVtYmVyLCBkZWx0YVRpbWU6IG51bWJlcil7XHJcbiAgICAgICAgdGhpcy5ncm91bmQudXBkYXRlKHRpbWUsIGRlbHRhVGltZSk7XHJcbiAgICAgICAgaWYodGhpcy5wcm9jZXNzSW5wdXQuaW5wdXRLZXkgPT09IFwiRW50ZXJcInx8dGhpcy5wcm9jZXNzSW5wdXQuaW5wdXRLZXkgPT09IFwiU3BhY2VcIiB8fCh0aGlzLnByb2Nlc3NJbnB1dC5tb3VzZUV2ZW50IT1udWxsICYmIHRoaXMuYnV0dG9uU3RhcnQuaXNJbnNpZGUodGhpcy5wcm9jZXNzSW5wdXQubW91c2VFdmVudCkpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5zY2VuZU1hbmFnZXIuc3dpdGNoU2NlbmUoMSlcclxuICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxufVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IFN0YXJ0U2NlbmUgfSBmcm9tIFwiLi9nYW1lL1N0YXJ0U2NlbmVcIjtcclxuaW1wb3J0IHsgUmVuZGVyZXIgfSBmcm9tIFwiLi9FbmdpbmUvUmVuZGVyZXIvUmVuZGVyZXJcIjtcclxuaW1wb3J0IHsgU2NlbmVNYW5hZ2VyIH0gZnJvbSBcIi4vRW5naW5lL1NjZW5lL1NjZW5lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBHYW1lIH0gZnJvbSBcIi4vRW5naW5lL0NvcmUvR2FtZVwiOyAgXHJcbmltcG9ydCB7UGxheVNjZW5lfSBmcm9tIFwiLi9nYW1lL1BsYXlTY2VuZVwiO1xyXG5cclxudmFyIGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdteUNhbnZhcycpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xyXG52YXIgcmVuZGVyID0gbmV3IFJlbmRlcmVyKGNhbnZhcylcclxudmFyIGdhbWVTY2VuZSA9IG5ldyBTY2VuZU1hbmFnZXIoKTtcclxudmFyIG15R2FtZSA9IG5ldyBHYW1lKGdhbWVTY2VuZSk7XHJcblxyXG5jb25zdCBpbWFnZXNMb2FkID0gW1xyXG4gICAge1xyXG4gICAgICAgIFwia2V5XCI6IFwiYmlyZDBcIixcclxuICAgICAgICBcInBhdGhcIjogXCJJbWFnZXMvYmlyZC9mcmFtZS0xLnBuZ1wiLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImtleVwiOiBcImJpcmQxXCIsXHJcbiAgICAgICAgXCJwYXRoXCI6IFwiSW1hZ2VzL2JpcmQvZnJhbWUtMi5wbmdcIixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJrZXlcIjogXCJiaXJkMlwiLFxyXG4gICAgICAgIFwicGF0aFwiOiBcIkltYWdlcy9iaXJkL2ZyYW1lLTMucG5nXCIsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwia2V5XCI6IFwiYmlyZDNcIixcclxuICAgICAgICBcInBhdGhcIjogXCJJbWFnZXMvYmlyZC9mcmFtZS00LnBuZ1wiLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImtleVwiOiBcImJpcmQ0XCIsXHJcbiAgICAgICAgXCJwYXRoXCI6IFwiSW1hZ2VzL2JpcmQvZnJhbWUtNS5wbmdcIixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJrZXlcIjogXCJiaXJkNVwiLFxyXG4gICAgICAgIFwicGF0aFwiOiBcIkltYWdlcy9iaXJkL2ZyYW1lLTYucG5nXCIsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwia2V5XCI6IFwiYmlyZDZcIixcclxuICAgICAgICBcInBhdGhcIjogXCJJbWFnZXMvYmlyZC9mcmFtZS03LnBuZ1wiLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImtleVwiOiBcImJpcmQ3XCIsXHJcbiAgICAgICAgXCJwYXRoXCI6IFwiSW1hZ2VzL2JpcmQvZnJhbWUtOC5wbmdcIixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJrZXlcIjogXCJwaXBlXCIsXHJcbiAgICAgICAgXCJwYXRoXCI6IFwiSW1hZ2VzL3BpcGUvcGlwZS1ncmVlbi5wbmdcIixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJrZXlcIjogXCJtZXNzYWdlXCIsXHJcbiAgICAgICAgXCJwYXRoXCI6IFwiSW1hZ2VzL2dhbWVTdGFydC9tZXNzYWdlLnBuZ1wiLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImtleVwiOiBcImdyb3VuZFwiLFxyXG4gICAgICAgIFwicGF0aFwiOiBcIkltYWdlcy9ncm91bmQvYmFzZS5wbmdcIixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJrZXlcIjogXCJnYW1lb3ZlclwiLFxyXG4gICAgICAgIFwicGF0aFwiOiBcIkltYWdlcy9wYW5lbEdhbWVPdmVyL2dhbWVvdmVyLnBuZ1wiLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImtleVwiOiBcInJlcGxheUJ1dHRvblwiLFxyXG4gICAgICAgIFwicGF0aFwiOiBcIkltYWdlcy9wYW5lbEdhbWVPdmVyL3JlcGxheS1idXR0b24ucG5nXCIsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwia2V5XCI6IFwiYmFja2dyb3VuZFwiLFxyXG4gICAgICAgIFwicGF0aFwiOiBcIkltYWdlcy9iYWNrZ3JvdW5kL2JhY2tncm91bmQtbmlnaHQucG5nXCJcclxuICAgIH1cclxuXVxyXG5cclxuY29uc3QgcHJvbWlzZXMgPSBpbWFnZXNMb2FkLm1hcCgoaW1hZ2UpID0+IG15R2FtZS5sb2FkZXIuYWRkSW1hZ2UoaW1hZ2VbXCJwYXRoXCJdLCBpbWFnZVtcImtleVwiXSkpXHJcblByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKCgpPT4ge1xyXG4gICAgdmFyIHN0YXJ0U2NlbmUgPSBuZXcgU3RhcnRTY2VuZShteUdhbWUpO1xyXG4gICAgdmFyIHBsYXlTY2VuZSA9IG5ldyBQbGF5U2NlbmUobXlHYW1lKTtcclxuICAgIGdhbWVTY2VuZS5hZGRTY2VuZShzdGFydFNjZW5lKTtcclxuICAgIGdhbWVTY2VuZS5hZGRTY2VuZShwbGF5U2NlbmUpO1xyXG4gICAgbXlHYW1lLnN0YXJ0KHJlbmRlcik7XHJcbn0pLmNhdGNoKChlcnJvcikgPT4ge2NvbnNvbGUubG9nKGVycm9yKX0pXHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==