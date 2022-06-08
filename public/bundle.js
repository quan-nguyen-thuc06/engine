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
        this.gameObjects.sort((a, b) => {
            return a.z_index - b.z_index;
        });
    }
    render(render) {
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
        this.bird = new _Bird__WEBPACK_IMPORTED_MODULE_1__.Bird(100, 280, 50, 50, 0, 0.5, 20, this, 1);
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
            if (this.processInput.inputKey === "Space") {
                this.bird.fly(deltaTime);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFFLFVBQVU7UUFDakIsTUFBTSxFQUFFLG1DQUFtQztLQUM5QztJQUNEO1FBQ0ksS0FBSyxFQUFFLGNBQWM7UUFDckIsTUFBTSxFQUFFLHdDQUF3QztLQUNuRDtJQUNEO1FBQ0ksS0FBSyxFQUFFLFlBQVk7UUFDbkIsTUFBTSxFQUFFLHdDQUF3QztLQUNuRDtDQUNKO0FBRUQsTUFBTSxRQUFRLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBQy9GLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUUsRUFBRTtJQUMzQixJQUFJLFVBQVUsR0FBRyxJQUFJLHdEQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDeEMsSUFBSSxTQUFTLEdBQUcsSUFBSSxzREFBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3RDLFNBQVMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDL0IsU0FBUyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM5QixNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3pCLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLEdBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VlazEvLi9zcmMvRW5naW5lL0J1dHRvbk9iamVjdC9CdXR0b25PYmplY3QudHMiLCJ3ZWJwYWNrOi8vd2VlazEvLi9zcmMvRW5naW5lL0NvbGxpc2lvbi9Db2xsaXNpb24udHMiLCJ3ZWJwYWNrOi8vd2VlazEvLi9zcmMvRW5naW5lL0NvcmUvR2FtZS50cyIsIndlYnBhY2s6Ly93ZWVrMS8uL3NyYy9FbmdpbmUvR2FtZU9iamVjdC9HYW1lT2JqZWN0LnRzIiwid2VicGFjazovL3dlZWsxLy4vc3JjL0VuZ2luZS9JbWFnZUxvYWRlci9JbWFnZUxvYWRlci50cyIsIndlYnBhY2s6Ly93ZWVrMS8uL3NyYy9FbmdpbmUvSW1hZ2VPYmplY3QvSW1hZ2VPYmplY3QudHMiLCJ3ZWJwYWNrOi8vd2VlazEvLi9zcmMvRW5naW5lL1Byb2Nlc3NJbnB1dC9MaXN0ZW5JbnB1dC50cyIsIndlYnBhY2s6Ly93ZWVrMS8uL3NyYy9FbmdpbmUvUHJvY2Vzc0lucHV0L1Byb2Nlc3NJbnB1dC50cyIsIndlYnBhY2s6Ly93ZWVrMS8uL3NyYy9FbmdpbmUvUmVuZGVyZXIvUmVuZGVyZXIudHMiLCJ3ZWJwYWNrOi8vd2VlazEvLi9zcmMvRW5naW5lL1NjZW5lL1NjZW5lLnRzIiwid2VicGFjazovL3dlZWsxLy4vc3JjL0VuZ2luZS9TY2VuZS9TY2VuZU1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vd2VlazEvLi9zcmMvRW5naW5lL1Nwcml0ZS9TcHJpdGUudHMiLCJ3ZWJwYWNrOi8vd2VlazEvLi9zcmMvRW5naW5lL1RleHRPYmplY3QvVGV4dE9iamVjdC50cyIsIndlYnBhY2s6Ly93ZWVrMS8uL3NyYy9nYW1lL0JpcmQudHMiLCJ3ZWJwYWNrOi8vd2VlazEvLi9zcmMvZ2FtZS9Hcm91bmQudHMiLCJ3ZWJwYWNrOi8vd2VlazEvLi9zcmMvZ2FtZS9QYWlyT2ZQaXBlLnRzIiwid2VicGFjazovL3dlZWsxLy4vc3JjL2dhbWUvUGFuZWxHYW1lT3Zlci50cyIsIndlYnBhY2s6Ly93ZWVrMS8uL3NyYy9nYW1lL1BsYXlTY2VuZS50cyIsIndlYnBhY2s6Ly93ZWVrMS8uL3NyYy9nYW1lL1Njb3JlLnRzIiwid2VicGFjazovL3dlZWsxLy4vc3JjL2dhbWUvU3RhcnRTY2VuZS50cyIsIndlYnBhY2s6Ly93ZWVrMS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWVrMS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VlazEvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWVrMS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlZWsxLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEltYWdlT2JqZWN0fSBmcm9tIFwiLi4vSW1hZ2VPYmplY3QvSW1hZ2VPYmplY3RcIjtcclxuZXhwb3J0IGNsYXNzIEJ1dHRvbk9iamVjdCBleHRlbmRzIEltYWdlT2JqZWN0e1xyXG4gICAgY29uc3RydWN0b3IoeDogbnVtYmVyLCB5OiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50IHwgbnVsbCwgZGVncmVlczogbnVtYmVyLCBuYW1lOiBzdHJpbmcsIHpfaW5kZXg6IG51bWJlciA9MCl7XHJcbiAgICAgICAgc3VwZXIoeCwgeSwgd2lkdGgsIGhlaWdodCxpbWFnZSwgZGVncmVlcywgbmFtZSx6X2luZGV4KTtcclxuICAgIH1cclxuICAgIGlzSW5zaWRlKHBvczogQXJyYXk8bnVtYmVyPil7XHJcbiAgICAgICAgaWYocG9zLmxlbmd0aCA8IDIpIHJldHVybiBmYWxzZTtcclxuICAgICAgICByZXR1cm4gcG9zWzBdID4gdGhpcy54ICYmIHBvc1swXSA8IHRoaXMueCt0aGlzLndpZHRoICYmIHBvc1sxXSA8IHRoaXMueSt0aGlzLmhlaWdodCAmJiBwb3NbMV0gPiB0aGlzLnk7XHJcbiAgICB9ICAgIFxyXG59IiwiaW1wb3J0IHtHYW1lT2JqZWN0fSBmcm9tIFwiLi4vR2FtZU9iamVjdC9HYW1lT2JqZWN0XCI7XHJcbmV4cG9ydCBjbGFzcyBDb2xsaXNpb257XHJcbiAgICBoYW5kbGVDb2xsaXNpb24ob2JqMSA6IEdhbWVPYmplY3QsIG9iajIgOiBHYW1lT2JqZWN0KXtcclxuICAgICAgICBpZihvYmoxLngrIG9iajEud2lkdGggKyAxPj1vYmoyLnggJiYgb2JqMS54KzEgPD0gb2JqMi54ICsgb2JqMi53aWR0aCl7XHJcbiAgICAgICAgICAgIGlmKG9iajEueSsgb2JqMS5oZWlnaHQgKyAxPj1vYmoyLnkgJiYgb2JqMS55PD0gb2JqMi55ICsgb2JqMi5oZWlnaHQpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgU2NlbmVNYW5hZ2VyIH0gZnJvbSBcIi4uL1NjZW5lL1NjZW5lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBSZW5kZXJlciB9IGZyb20gXCIuLi9SZW5kZXJlci9SZW5kZXJlclwiO1xyXG5pbXBvcnQgeyBMaXN0ZW5JbnB1dCB9IGZyb20gXCIuLi9Qcm9jZXNzSW5wdXQvTGlzdGVuSW5wdXRcIjtcclxuaW1wb3J0IHtJbWFnZUxvYWRlciB9IGZyb20gXCIuLi9JbWFnZUxvYWRlci9JbWFnZUxvYWRlclwiO1xyXG5leHBvcnQgY2xhc3MgR2FtZXtcclxuICAgIHNjZW5lTWFuYWdlcjogU2NlbmVNYW5hZ2VyO1xyXG4gICAgbGFzdFRpbWU6IG51bWJlcjtcclxuICAgIGxpc3RlbklucHV0OiBMaXN0ZW5JbnB1dDtcclxuICAgIGxvYWRlcjogSW1hZ2VMb2FkZXI7XHJcbiAgICBjb25zdHJ1Y3RvcihzY2VuZU1hbmFnZXI6IFNjZW5lTWFuYWdlcil7XHJcbiAgICAgICAgdGhpcy5zY2VuZU1hbmFnZXIgPSBzY2VuZU1hbmFnZXI7XHJcbiAgICAgICAgdGhpcy5sYXN0VGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy5saXN0ZW5JbnB1dCA9IG5ldyBMaXN0ZW5JbnB1dCgpO1xyXG4gICAgICAgIHRoaXMubG9hZGVyID0gbmV3IEltYWdlTG9hZGVyKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHN0YXJ0KHJlbmRlcjogUmVuZGVyZXIpe1xyXG4gICAgICAgIHRoaXMubGlzdGVuSW5wdXQuaGFuZGxlSW5wdXQodGhpcy5zY2VuZU1hbmFnZXIsIHJlbmRlcik7XHJcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpPT50aGlzLmxvb3AocmVuZGVyKSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGxvb3AocmVuZGVyOiBSZW5kZXJlcil7XHJcbiAgICAgICAgY29uc3QgdGltZSA9IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKTtcclxuICAgICAgICBjb25zdCBkZWx0YSA9IHRpbWUgLSB0aGlzLmxhc3RUaW1lO1xyXG4gICAgICAgIHRoaXMuc2NlbmVNYW5hZ2VyLnNjZW5lc1t0aGlzLnNjZW5lTWFuYWdlci5jdXJyZW50U2NlbmVdLnVwZGF0ZSh0aW1lLGRlbHRhKTtcclxuICAgICAgICB0aGlzLnNjZW5lTWFuYWdlci5zY2VuZXNbdGhpcy5zY2VuZU1hbmFnZXIuY3VycmVudFNjZW5lXS5yZW5kZXIocmVuZGVyKTtcclxuICAgICAgICB0aGlzLmxhc3RUaW1lID0gdGltZTtcclxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCk9PnRoaXMubG9vcChyZW5kZXIpKTtcclxuICAgIH1cclxufSIsImV4cG9ydCBjbGFzcyBHYW1lT2JqZWN0e1xyXG4gICAgeDogbnVtYmVyO1xyXG4gICAgeTogbnVtYmVyO1xyXG4gICAgd2lkdGg6IG51bWJlcjtcclxuICAgIGhlaWdodDogbnVtYmVyO1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgYWN0aXZlOiBib29sZWFuO1xyXG4gICAgZGVmYXVsdFBvc2l0aW9uOiBBcnJheTxudW1iZXI+O1xyXG4gICAgel9pbmRleDogbnVtYmVyO1xyXG4gICAgY29uc3RydWN0b3IoeDogbnVtYmVyLCB5OiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBuYW1lOiBzdHJpbmcsIGFjdGl2ZSA9IHRydWUsIHpfaW5kZXg6IG51bWJlciA9IDApIHtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5hY3RpdmUgPSBhY3RpdmU7XHJcbiAgICAgICAgdGhpcy56X2luZGV4ID0gel9pbmRleDtcclxuICAgICAgICB0aGlzLmRlZmF1bHRQb3NpdGlvbiA9IFt4LHldO1xyXG4gICAgfVxyXG4gICAgcmVzZXQoKXtcclxuICAgICAgICB0aGlzLnggPSB0aGlzLmRlZmF1bHRQb3NpdGlvblswXTtcclxuICAgICAgICB0aGlzLnkgPSB0aGlzLmRlZmF1bHRQb3NpdGlvblsxXTtcclxuICAgIH1cclxuICAgIHNldEFjdGl2ZShhY3RpdmU6IGJvb2xlYW4pe1xyXG4gICAgICAgIHRoaXMuYWN0aXZlID0gYWN0aXZlO1xyXG4gICAgfVxyXG4gICAgZ2V0QWN0aXZlKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYWN0aXZlO1xyXG4gICAgfVxyXG5cclxufSIsImV4cG9ydCBjbGFzcyBJbWFnZUxvYWRlciB7XHJcbiAgICBpbWFnZXMhOiBNYXA8c3RyaW5nLCBIVE1MSW1hZ2VFbGVtZW50PjtcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgdGhpcy5pbWFnZXMgPSBuZXcgTWFwPHN0cmluZywgSFRNTEltYWdlRWxlbWVudD4oKTtcclxuICAgIH1cclxuICAgIGFzeW5jIGFkZEltYWdlKHNyYzogc3RyaW5nLCBuYW1lOiBzdHJpbmcpe1xyXG4gICAgICAgIHZhciBpbWcgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICBpbWcuc3JjID0gc3JjO1xyXG4gICAgICAgIHRoaXMuaW1hZ2VzLnNldChuYW1lLCBpbWcpO1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGltZy5vbmxvYWQgPSByZXNvbHZlO1xyXG4gICAgICAgICAgICBpbWcub25lcnJvciA9IHJlamVjdDsgXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIGdldEltYWdlKG5hbWU6IHN0cmluZyk6IEhUTUxJbWFnZUVsZW1lbnQgfCB1bmRlZmluZWR7XHJcbiAgICAgICAgaWYodGhpcy5pbWFnZXMuaGFzKG5hbWUpKVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pbWFnZXMuZ2V0KG5hbWUpO1xyXG4gICAgICAgIHJldHVybiBuZXcgSW1hZ2UoKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7R2FtZU9iamVjdH0gZnJvbSBcIi4uL0dhbWVPYmplY3QvR2FtZU9iamVjdFwiXHJcbmV4cG9ydCBjbGFzcyBJbWFnZU9iamVjdCBleHRlbmRzIEdhbWVPYmplY3R7XHJcbiAgICBpbWFnZTogSFRNTEltYWdlRWxlbWVudDtcclxuICAgIGRlZ3JlZXM6IG51bWJlcjtcclxuICAgIGNvbnN0cnVjdG9yKHg6IG51bWJlciA9IDAsIHk6IG51bWJlciA9IDAsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50IHxudWxsLCBkZWdyZWVzOiBudW1iZXIgPSAwLCBuYW1lOiBzdHJpbmcsIHpfaW5kZXg6IG51bWJlciA9MCl7XHJcbiAgICAgICAgc3VwZXIoeCwgeSwgd2lkdGgsIGhlaWdodCxuYW1lLHRydWUsel9pbmRleCk7XHJcbiAgICAgICAgaWYoaW1hZ2U9PW51bGwpXHJcbiAgICAgICAgICAgIHRoaXMuaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICBlbHNlIHRoaXMuaW1hZ2UgPSBpbWFnZTtcclxuICAgICAgICB0aGlzLmRlZ3JlZXMgPSBkZWdyZWVzO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKHRpbWU6IG51bWJlciwgZGVsdGFUaW1lOm51bWJlcil7fVxyXG59IiwiaW1wb3J0IHtTY2VuZU1hbmFnZXJ9IGZyb20gJy4uL1NjZW5lL1NjZW5lTWFuYWdlcic7XHJcbmltcG9ydCB7UmVuZGVyZXJ9IGZyb20gJy4uL1JlbmRlcmVyL1JlbmRlcmVyJ1xyXG5leHBvcnQgY2xhc3MgTGlzdGVuSW5wdXR7XHJcbiAgICBoYW5kbGVJbnB1dChzY2VuZU1hbmFnZXI6IFNjZW5lTWFuYWdlciwgcmVuZGVyOiBSZW5kZXJlcil7XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsKGUpPT5zY2VuZU1hbmFnZXIuc2NlbmVzW3NjZW5lTWFuYWdlci5jdXJyZW50U2NlbmVdLnByb2Nlc3NJbnB1dC5vbktleURvd24oZSkpO1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywoZSk9PnNjZW5lTWFuYWdlci5zY2VuZXNbc2NlbmVNYW5hZ2VyLmN1cnJlbnRTY2VuZV0ucHJvY2Vzc0lucHV0Lm9uS2V5VXAoKSk7XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywoZSk9PnNjZW5lTWFuYWdlci5zY2VuZXNbc2NlbmVNYW5hZ2VyLmN1cnJlbnRTY2VuZV0ucHJvY2Vzc0lucHV0Lm9uTW91c2VEb3duKGUscmVuZGVyLmNhbnZhcykpO1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLChlKT0+c2NlbmVNYW5hZ2VyLnNjZW5lc1tzY2VuZU1hbmFnZXIuY3VycmVudFNjZW5lXS5wcm9jZXNzSW5wdXQub25Nb3VzZVVwKCkpO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGNsYXNzIFByb2Nlc3NJbnB1dHtcclxuICAgIGlucHV0S2V5IDogU3RyaW5nO1xyXG4gICAgbW91c2VFdmVudCA6IEFycmF5PG51bWJlcj4gfCBudWxsO1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICB0aGlzLmlucHV0S2V5ID0gXCJcIjtcclxuICAgICAgICB0aGlzLm1vdXNlRXZlbnQgPSBudWxsO1xyXG4gICAgfVxyXG4gICAgb25LZXlEb3duKGU6IEtleWJvYXJkRXZlbnQpe1xyXG4gICAgICAgIHRoaXMuaW5wdXRLZXkgPSBlLmNvZGU7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5pbnB1dEtleSk7XHJcbiAgICB9XHJcbiAgICBvbktleVVwKCl7XHJcbiAgICAgICAgdGhpcy5pbnB1dEtleSA9IFwiXCI7XHJcbiAgICB9XHJcbiAgICBvbk1vdXNlRG93bihlOiBNb3VzZUV2ZW50LCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50KSB7XHJcbiAgICAgICAgdmFyIHJlY3QgPSBjYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgdmFyIG1vdXNlWCA9IGUuY2xpZW50WCAtIHJlY3QubGVmdDtcclxuICAgICAgICB2YXIgbW91c2VZID0gZS5jbGllbnRZIC0gcmVjdC50b3A7ICAgIFxyXG4gICAgICAgIHRoaXMubW91c2VFdmVudCA9IFttb3VzZVgsIG1vdXNlWV07XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5tb3VzZUV2ZW50KTtcclxuICAgIH1cclxuICAgIG9uTW91c2VVcCgpIHtcclxuICAgICAgICB0aGlzLm1vdXNlRXZlbnQgPSBudWxsO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgSW1hZ2VPYmplY3QgfSBmcm9tIFwiLi4vSW1hZ2VPYmplY3QvSW1hZ2VPYmplY3RcIjtcclxuaW1wb3J0IHsgU3ByaXRlIH0gZnJvbSBcIi4uL1Nwcml0ZS9TcHJpdGVcIjtcclxuaW1wb3J0IHsgVGV4dE9iamVjdCB9IGZyb20gXCIuLi9UZXh0T2JqZWN0L1RleHRPYmplY3RcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBSZW5kZXJlcntcclxuICAgIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XHJcbiAgICBjb25zdHJ1Y3RvcihjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50KXtcclxuICAgICAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcztcclxuICAgIH1cclxuICAgIGRyYXdJbWFnZShpbWFnZU9iamVjdDogSW1hZ2VPYmplY3Qpe1xyXG4gICAgICAgIGNvbnN0IGN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICAgICAgaWYoY3R4IT1udWxsKXtcclxuICAgICAgICAgICAgY3R4LnNhdmUoKTtcclxuICAgICAgICAgICAgY3R4LnRyYW5zbGF0ZShpbWFnZU9iamVjdC54ICsgaW1hZ2VPYmplY3Qud2lkdGgvMixpbWFnZU9iamVjdC55ICsgaW1hZ2VPYmplY3QuaGVpZ2h0LzIpXHJcbiAgICAgICAgICAgIGN0eC5yb3RhdGUoaW1hZ2VPYmplY3QuZGVncmVlcypNYXRoLlBJLzE4MCk7XHJcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoaW1hZ2VPYmplY3QuaW1hZ2UsLWltYWdlT2JqZWN0LndpZHRoLzIsIC1pbWFnZU9iamVjdC5oZWlnaHQvMixpbWFnZU9iamVjdC53aWR0aCxpbWFnZU9iamVjdC5oZWlnaHQpO1xyXG4gICAgICAgICAgICBjdHgucmVzdG9yZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGRyYXdTcHJpdGUoc3ByaXRlOiBTcHJpdGUpe1xyXG4gICAgICAgIGNvbnN0IGN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICAgICAgaWYoY3R4IT1udWxsKXtcclxuICAgICAgICAgICAgY3R4LnNhdmUoKTtcclxuICAgICAgICAgICAgY3R4LnRyYW5zbGF0ZShzcHJpdGUueCArIHNwcml0ZS53aWR0aC8yLHNwcml0ZS55ICsgc3ByaXRlLmhlaWdodC8yKVxyXG4gICAgICAgICAgICBjdHgucm90YXRlKHNwcml0ZS5kZWdyZWVzKk1hdGguUEkvMTgwKTtcclxuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShzcHJpdGUuaW1hZ2VzW3Nwcml0ZS5mcmFtZUN1cnJlbnRdLC1zcHJpdGUud2lkdGgvMiwgLXNwcml0ZS5oZWlnaHQvMixzcHJpdGUud2lkdGgsc3ByaXRlLmhlaWdodCk7XHJcbiAgICAgICAgICAgIGN0eC5yZXN0b3JlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZHJhd1RleHQodGV4dDogVGV4dE9iamVjdCl7XHJcbiAgICAgICAgY29uc3QgY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgICAgICBpZihjdHghPW51bGwpe1xyXG4gICAgICAgICAgICBjdHguZm9udCA9IHRleHQuZm9udDtcclxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHRleHQuY29sb3I7XHJcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dCh0ZXh0LmNvbnRlbnQsdGV4dC54LHRleHQueSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgSW1hZ2VPYmplY3QgfSBmcm9tIFwiLi4vSW1hZ2VPYmplY3QvSW1hZ2VPYmplY3RcIjtcclxuaW1wb3J0IHsgU3ByaXRlIH0gZnJvbSBcIi4uL1Nwcml0ZS9TcHJpdGVcIjtcclxuaW1wb3J0IHsgVGV4dE9iamVjdCB9IGZyb20gXCIuLi9UZXh0T2JqZWN0L1RleHRPYmplY3RcIjtcclxuaW1wb3J0IHtSZW5kZXJlcn0gZnJvbSBcIi4uL1JlbmRlcmVyL1JlbmRlcmVyXCI7XHJcbmltcG9ydCB7R2FtZU9iamVjdH0gZnJvbSBcIi4uL0dhbWVPYmplY3QvR2FtZU9iamVjdFwiO1xyXG5pbXBvcnQgeyBQcm9jZXNzSW5wdXQgfSBmcm9tIFwiLi4vUHJvY2Vzc0lucHV0L1Byb2Nlc3NJbnB1dFwiO1xyXG5pbXBvcnQgeyBHYW1lIH0gZnJvbSBcIi4uL0NvcmUvR2FtZVwiO1xyXG5pbXBvcnQgeyBDb2xsaXNpb24gfSBmcm9tIFwiLi4vQ29sbGlzaW9uL0NvbGxpc2lvblwiO1xyXG5leHBvcnQgY2xhc3MgU2NlbmV7XHJcbiAgICBnYW1lT2JqZWN0czogR2FtZU9iamVjdFtdO1xyXG4gICAgcHJvY2Vzc0lucHV0OiBQcm9jZXNzSW5wdXQ7XHJcbiAgICBjb2xsaXNpb246IENvbGxpc2lvbjtcclxuICAgIGdhbWU6IEdhbWU7XHJcbiAgICBjb25zdHJ1Y3RvcihnYW1lOiBHYW1lKXtcclxuICAgICAgICB0aGlzLmdhbWVPYmplY3RzID0gW107XHJcbiAgICAgICAgdGhpcy5wcm9jZXNzSW5wdXQgPSBuZXcgUHJvY2Vzc0lucHV0KCk7XHJcbiAgICAgICAgdGhpcy5jb2xsaXNpb24gPSBuZXcgQ29sbGlzaW9uKCk7XHJcbiAgICAgICAgdGhpcy5nYW1lID0gZ2FtZTtcclxuICAgIH1cclxuICAgIHJlc2V0U2NlbmUoKXtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8dGhpcy5nYW1lT2JqZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVPYmplY3RzW2ldLnJlc2V0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgYWRkQ2hpbGQoZ2FtZU9iamVjdHM6IEdhbWVPYmplY3RbXSl7XHJcbiAgICAgICAgZ2FtZU9iamVjdHMubWFwKChnYW1lT2JqZWN0KT0+e3RoaXMuZ2FtZU9iamVjdHMucHVzaChnYW1lT2JqZWN0KX0pXHJcbiAgICAgICAgdGhpcy5nYW1lT2JqZWN0cy5zb3J0KChhLGIpPT57XHJcbiAgICAgICAgICAgIHJldHVybiBhLnpfaW5kZXggLSBiLnpfaW5kZXg7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIocmVuZGVyOiBSZW5kZXJlcil7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPHRoaXMuZ2FtZU9iamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYodGhpcy5nYW1lT2JqZWN0c1tpXS5nZXRBY3RpdmUoKSl7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBvYmogPSB0aGlzLmdhbWVPYmplY3RzW2ldOyBcclxuICAgICAgICAgICAgICAgIGlmKCBvYmogaW5zdGFuY2VvZiBJbWFnZU9iamVjdClcclxuICAgICAgICAgICAgICAgICAgICByZW5kZXIuZHJhd0ltYWdlKG9iaik7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKG9iaiBpbnN0YW5jZW9mIFNwcml0ZSlcclxuICAgICAgICAgICAgICAgICAgICByZW5kZXIuZHJhd1Nwcml0ZShvYmopO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZihvYmogaW5zdGFuY2VvZiBUZXh0T2JqZWN0KVxyXG4gICAgICAgICAgICAgICAgICAgIHJlbmRlci5kcmF3VGV4dChvYmopO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8geHUgbHkgbG9naWNcclxuICAgIHVwZGF0ZSh0aW1lOiBudW1iZXIsIGRlbHRhOiBudW1iZXIpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8dGhpcy5nYW1lT2JqZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgb2JqID0gdGhpcy5nYW1lT2JqZWN0c1tpXTtcclxuICAgICAgICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIEltYWdlT2JqZWN0IHx8IG9iaiBpbnN0YW5jZW9mIFNwcml0ZSlcclxuICAgICAgICAgICAgICAgIG9iai51cGRhdGUodGltZSwgZGVsdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCB7IFNjZW5lIH0gZnJvbSBcIi4vU2NlbmVcIjtcclxuaW1wb3J0IHtHYW1lfSBmcm9tIFwiLi4vQ29yZS9HYW1lXCI7XHJcbmV4cG9ydCBjbGFzcyBTY2VuZU1hbmFnZXIge1xyXG4gICAgc2NlbmVzOiBTY2VuZVtdO1xyXG4gICAgY3VycmVudFNjZW5lOiBudW1iZXI7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMuc2NlbmVzID0gW107XHJcbiAgICAgICAgdGhpcy5jdXJyZW50U2NlbmUgPSAwO1xyXG4gICAgfVxyXG4gICAgYWRkU2NlbmUoc2NlbmU6IFNjZW5lKXtcclxuICAgICAgICB0aGlzLnNjZW5lcy5wdXNoKHNjZW5lKVxyXG4gICAgfVxyXG4gICAgc3dpdGNoU2NlbmUobmV4dEluZGV4OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnNjZW5lc1t0aGlzLmN1cnJlbnRTY2VuZV0ucmVzZXRTY2VuZSgpO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFNjZW5lID0gbmV4dEluZGV4O1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKCl7fVxyXG4gICAgcmVuZGVyKCl7fVxyXG59IiwiaW1wb3J0IHtHYW1lT2JqZWN0fSBmcm9tIFwiLi4vR2FtZU9iamVjdC9HYW1lT2JqZWN0XCJcclxuZXhwb3J0IGNsYXNzIFNwcml0ZSBleHRlbmRzIEdhbWVPYmplY3R7XHJcbiAgICBpbWFnZXM6IEFycmF5PEhUTUxJbWFnZUVsZW1lbnQ+O1xyXG4gICAgZGVncmVlczogbnVtYmVyO1xyXG4gICAgZnJhbWVDdXJyZW50OiBudW1iZXI7XHJcbiAgICByYXRlOiBudW1iZXI7XHJcbiAgICBhZHQ6IG51bWJlcjtcclxuICAgIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgaW1hZ2VzOiBBcnJheTxIVE1MSW1hZ2VFbGVtZW50PixkZWdyZWVzOiBudW1iZXIsbmFtZTogc3RyaW5nLCBmcHM6IG51bWJlciwgel9pbmRleDogbnVtYmVyID0wKXtcclxuICAgICAgICBzdXBlcih4LCB5LCB3aWR0aCwgaGVpZ2h0LG5hbWUsdHJ1ZSx6X2luZGV4KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImltYWdlc1wiLGltYWdlcyk7XHJcbiAgICAgICAgdGhpcy5pbWFnZXMgPSBpbWFnZXM7XHJcbiAgICAgICAgdGhpcy5kZWdyZWVzID0gZGVncmVlcztcclxuICAgICAgICB0aGlzLmZyYW1lQ3VycmVudCA9IDA7XHJcbiAgICAgICAgdGhpcy5yYXRlID0gMS4wL2ZwcyAqMTAwMDtcclxuICAgICAgICB0aGlzLmFkdCA9IDA7XHJcbiAgICB9XHJcbiAgICB1cGRhdGUodGltZTogbnVtYmVyLCBkZWx0YVRpbWU6bnVtYmVyKXtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcGxheUFuaW1hdGlvbih0aW1lOiBudW1iZXIsIGRlbHRhVGltZTpudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmFkdCArPSBkZWx0YVRpbWVcclxuICAgICAgICBpZih0aGlzLmFkdD49dGhpcy5yYXRlKXtcclxuICAgICAgICAgICAgdGhpcy5hZHQgLT0gdGhpcy5yYXRlO1xyXG4gICAgICAgICAgICB0aGlzLmZyYW1lQ3VycmVudCArPTE7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZnJhbWVDdXJyZW50PnRoaXMuaW1hZ2VzLmxlbmd0aC0xKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZnJhbWVDdXJyZW50ID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCB7R2FtZU9iamVjdH0gZnJvbSBcIi4uL0dhbWVPYmplY3QvR2FtZU9iamVjdFwiXHJcbmV4cG9ydCBjbGFzcyBUZXh0T2JqZWN0IGV4dGVuZHMgR2FtZU9iamVjdHtcclxuICAgIGNvbnRlbnQ6IHN0cmluZztcclxuICAgIGZvbnQ6IHN0cmluZztcclxuICAgIGNvbG9yOiBzdHJpbmc7XHJcbiAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlciwgbmFtZTogc3RyaW5nICwgY29udGVudDogc3RyaW5nLCBmb250OiBzdHJpbmcsIGNvbG9yID0gXCJibGFja1wiLCB6X2luZGV4OiBudW1iZXIgPTApIHtcclxuICAgICAgICBzdXBlcih4LCB5LCAwLCAwLCBuYW1lLHRydWUsIHpfaW5kZXgpO1xyXG4gICAgICAgIHRoaXMuY29udGVudCA9IGNvbnRlbnQ7XHJcbiAgICAgICAgdGhpcy5mb250ID0gZm9udDtcclxuICAgICAgICB0aGlzLmNvbG9yID0gY29sb3I7XHJcbiAgICB9XHJcbiAgICBzZXRDb250ZW50KGNvbnRlbnQ6IHN0cmluZyl7XHJcbiAgICAgICAgdGhpcy5jb250ZW50ID0gY29udGVudDtcclxuICAgIH1cclxufSIsImltcG9ydCB7IFNwcml0ZSB9IGZyb20gXCIuLi9FbmdpbmUvU3ByaXRlL1Nwcml0ZVwiO1xyXG5cclxuaW1wb3J0IHtTY2VuZX0gZnJvbSBcIi4uL0VuZ2luZS9TY2VuZS9TY2VuZVwiXHJcbmV4cG9ydCBjbGFzcyBCaXJkIGV4dGVuZHMgU3ByaXRlIHtcclxuICAgIGdyYXZpdHkgOiBudW1iZXI7XHJcbiAgICBzcGVlZCA6IG51bWJlcjsgXHJcbiAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsZGVncmVlczogbnVtYmVyLGdyYXZpdHk6IG51bWJlcixyYXRlOiBudW1iZXIsIHNjZW5lOiBTY2VuZSwgel9pbmRleDogbnVtYmVyID0wKSB7XHJcbiAgICAgICAgdmFyIGltYWdlczpBcnJheTxIVE1MSW1hZ2VFbGVtZW50PiA9IFtdO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwibG9hZGVyXCIsIHNjZW5lLmdhbWUubG9hZGVyKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8ODtpKyspe1xyXG4gICAgICAgICAgICBsZXQgbmFtZSA9ICBcImJpcmRcIiArIGk7XHJcbiAgICAgICAgICAgIGltYWdlcy5wdXNoKHNjZW5lLmdhbWUubG9hZGVyLmdldEltYWdlKG5hbWUpIGFzIEhUTUxJbWFnZUVsZW1lbnQpO1xyXG4gICAgICAgIH0gXHJcbiAgICAgICAgc3VwZXIoeCwgeSwgd2lkdGgsIGhlaWdodCxpbWFnZXMsZGVncmVlcyxcImJpcmRcIixyYXRlLCB6X2luZGV4KTtcclxuICAgICAgICB0aGlzLmdyYXZpdHkgPSBncmF2aXR5O1xyXG4gICAgICAgIHRoaXMuc3BlZWQgPSAwO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKHRpbWU6IG51bWJlciwgZGVsdGFUaW1lOm51bWJlcil7XHJcbiAgICAgICAgdGhpcy55ICs9ICh0aGlzLnNwZWVkICsgMC41KnRoaXMuZ3Jhdml0eSkqKGRlbHRhVGltZS8xNi42Nyk7XHJcbiAgICAgICAgdGhpcy5zcGVlZCArPSB0aGlzLmdyYXZpdHkqKGRlbHRhVGltZS8xNi42Nyk7XHJcbiAgICAgICAgaWYodGhpcy55IDwgMClcclxuICAgICAgICAgICAgdGhpcy55ID0gMDtcclxuICAgICAgICBpZih0aGlzLnNwZWVkPjApe1xyXG4gICAgICAgICAgICB0aGlzLmRlZ3JlZXMgKz0gMTtcclxuICAgICAgICAgICAgaWYodGhpcy5kZWdyZWVzPjIwKSB0aGlzLmRlZ3JlZXMgPSAyMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5kZWdyZWVzIC09IDE7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZGVncmVlczwtMjApIHRoaXMuZGVncmVlcyA9IC0yMDtcclxuICAgICAgICAgICAgdGhpcy5wbGF5QW5pbWF0aW9uKHRpbWUsIGRlbHRhVGltZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZseShkZWx0YVRpbWU6IG51bWJlcil7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5zcGVlZCA9IC04O1xyXG4gICAgfVxyXG4gICAgcmVzZXQoKXtcclxuICAgICAgICBzdXBlci5yZXNldCgpO1xyXG4gICAgICAgIHRoaXMuc3BlZWQgPSAwO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgSW1hZ2VPYmplY3QgfSBmcm9tIFwiLi4vRW5naW5lL0ltYWdlT2JqZWN0L0ltYWdlT2JqZWN0XCI7XHJcbmltcG9ydCB7R2FtZX0gZnJvbSBcIi4uL0VuZ2luZS9Db3JlL0dhbWVcIjtcclxuY2xhc3MgR3JvdW5ke1xyXG4gICAgaW1hZ2VzOiBBcnJheTxJbWFnZU9iamVjdD47XHJcbiAgICBzcGVlZDogbnVtYmVyO1xyXG4gICAgY29uc3RydWN0b3Ioc3BlZWQ6IG51bWJlciwgZ2FtZTogR2FtZSl7XHJcbiAgICAgICAgdmFyIGltYWdlID0gZ2FtZS5sb2FkZXIuZ2V0SW1hZ2UoXCJncm91bmRcIik7XHJcbiAgICAgICAgdmFyIGltYWdlT2JqZWN0MSA9IG5ldyBJbWFnZU9iamVjdCgwLDY3MCw2NTAsMTUwLGltYWdlIGFzIEhUTUxJbWFnZUVsZW1lbnQsMCxcImdyb3VuZFwiLDIpO1xyXG4gICAgICAgIHZhciBpbWFnZU9iamVjdDIgPSBuZXcgSW1hZ2VPYmplY3QoNjQ5LDY3MCw2NTAsMTUwLGltYWdlIGFzIEhUTUxJbWFnZUVsZW1lbnQsMCxcImdyb3VuZFwiLDIpO1xyXG4gICAgICAgIHRoaXMuaW1hZ2VzID0gW2ltYWdlT2JqZWN0MSxpbWFnZU9iamVjdDJdO1xyXG4gICAgICAgIHRoaXMuc3BlZWQgPSBzcGVlZDtcclxuICAgIH1cclxuICAgIHVwZGF0ZSh0aW1lOiBudW1iZXIsIGRlbHRhVGltZTogbnVtYmVyKXtcclxuICAgICAgICBmb3IodmFyIGk9MDtpPHRoaXMuaW1hZ2VzLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICB0aGlzLmltYWdlc1tpXS54IC09IHRoaXMuc3BlZWQqKGRlbHRhVGltZS8xNi42Nyk7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuaW1hZ2VzW2ldLnggPCAtICg2NTApKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2VzW2ldLnggPSB0aGlzLmltYWdlc1tNYXRoLmFicyhpLTEpXS54KzY0OTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gXHJcbiAgICB9XHJcbiAgICBnZXRDb21wb25lbnQoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbWFnZXM7XHJcbiAgICB9XHJcbiAgICByZXNldCgpe1xyXG4gICAgICAgIGZvcih2YXIgaT0wO2k8dGhpcy5pbWFnZXMubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIHRoaXMuaW1hZ2VzW2ldLnJlc2V0KCk7XHJcbiAgICAgICAgfSBcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHtHcm91bmR9OyIsImltcG9ydCB7IEltYWdlT2JqZWN0IH0gZnJvbSBcIi4uL0VuZ2luZS9JbWFnZU9iamVjdC9JbWFnZU9iamVjdFwiO1xyXG5pbXBvcnQge0dhbWV9IGZyb20gXCIuLi9FbmdpbmUvQ29yZS9HYW1lXCJcclxuY29uc3QgYmxhbmtzID0gMjAwO1xyXG5jb25zdCBwaXBlSGVpZ2h0ID0gMzUwO1xyXG5jb25zdCBudW1QaXBlID0gNDtcclxuY29uc3QgZGlzdGFuY2UgPSAyNTA7XHJcbmNvbnN0IHBpcGVXaWR0aCA9IDgwO1xyXG5jbGFzcyBQYWlyT2ZQaXBle1xyXG4gICAgUGlwZXM6IEFycmF5PEltYWdlT2JqZWN0PjtcclxuICAgIHByaXZhdGUgc3BlZWQ6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih4Om51bWJlciwgeTpudW1iZXIsIGdhbWU6IEdhbWUsc3BlZWQ6IG51bWJlcil7XHJcbiAgICAgICAgdmFyIFBpcGVVcCA9IG5ldyBJbWFnZU9iamVjdCh4LHkscGlwZVdpZHRoLHBpcGVIZWlnaHQsZ2FtZS5sb2FkZXIuZ2V0SW1hZ2UoXCJwaXBlXCIpIGFzIEhUTUxJbWFnZUVsZW1lbnQsMTgwLFwicGlwZVwiLDEpO1xyXG4gICAgICAgIHZhciBQaXBlRG93biA9IG5ldyBJbWFnZU9iamVjdCh4LHkrcGlwZUhlaWdodCtibGFua3MscGlwZVdpZHRoLHBpcGVIZWlnaHQsZ2FtZS5sb2FkZXIuZ2V0SW1hZ2UoXCJwaXBlXCIpIGFzIEhUTUxJbWFnZUVsZW1lbnQsMCxcInBpcGVcIiwxKTtcclxuICAgICAgICB2YXIgY2hlY2tTY29yZSA9IG5ldyBJbWFnZU9iamVjdCh4K3BpcGVXaWR0aCx5K3BpcGVIZWlnaHQsMTAsYmxhbmtzLG51bGwsMCxcImNoZWNrU2NvcmVcIiwxKTtcclxuICAgICAgICB0aGlzLlBpcGVzPSBbUGlwZVVwLFBpcGVEb3duLGNoZWNrU2NvcmVdO1xyXG4gICAgICAgIHRoaXMuc3BlZWQgPSBzcGVlZDtcclxuICAgIH1cclxuICAgIHVwZGF0ZSh0aW1lOm51bWJlciwgZGVsdGFUaW1lOm51bWJlcil7XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8MztpKyspe1xyXG4gICAgICAgICAgICB0aGlzLlBpcGVzW2ldLnggLT0gdGhpcy5zcGVlZCooZGVsdGFUaW1lLzE2LjY3KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXNldCgpe1xyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPDM7aSsrKXtcclxuICAgICAgICAgICAgdGhpcy5QaXBlc1tpXS5yZXNldCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdldENvbXBvbmVudCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLlBpcGVzO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBMaXN0UGFpck9mUGlwZXN7XHJcbiAgICBsaXN0UGlwZTogUGFpck9mUGlwZVtdO1xyXG4gICAgY29uc3RydWN0b3IoZ2FtZTogR2FtZSl7XHJcbiAgICAgICAgdGhpcy5saXN0UGlwZSA9IFtdO1xyXG4gICAgICAgIGZvcih2YXIgaT0wO2k8bnVtUGlwZTtpKyspe1xyXG4gICAgICAgICAgICB2YXIgeCA9IGkqZGlzdGFuY2UgKyBwaXBlV2lkdGggKyA0MDA7XHJcbiAgICAgICAgICAgIHZhciB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICotMjAwKTtcclxuICAgICAgICAgICAgdmFyIHBpcGUgPSBuZXcgUGFpck9mUGlwZSh4LHksZ2FtZSw0KTtcclxuICAgICAgICAgICAgdGhpcy5saXN0UGlwZS5wdXNoKHBpcGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHVwZGF0ZSgpe1xyXG4gICAgICAgIHRoaXMubGlzdFBpcGUubWFwKChwaXBlLGluZGV4KSA9PntcclxuICAgICAgICAgICAgaWYocGlwZS5QaXBlc1swXS54PC0xMDApe1xyXG4gICAgICAgICAgICAgICAgdmFyIGZyb250SW5kZXggPSBpbmRleCAtMTtcclxuICAgICAgICAgICAgICAgIGlmKGZyb250SW5kZXg8MCkgZnJvbnRJbmRleCA9IHRoaXMubGlzdFBpcGUubGVuZ3RoLTE7XHJcbiAgICAgICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDxwaXBlLlBpcGVzLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIHBpcGUuUGlwZXNbaV0ueCA9IHRoaXMubGlzdFBpcGVbZnJvbnRJbmRleF0uUGlwZXNbaV0ueCArIGRpc3RhbmNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHtQYWlyT2ZQaXBlLCBMaXN0UGFpck9mUGlwZXN9O1xyXG4iLCJpbXBvcnQgeyBUZXh0T2JqZWN0IH0gZnJvbSAnLi4vRW5naW5lL1RleHRPYmplY3QvVGV4dE9iamVjdCc7XHJcbmltcG9ydCB7QnV0dG9uT2JqZWN0IH0gZnJvbSAnLi4vRW5naW5lL0J1dHRvbk9iamVjdC9CdXR0b25PYmplY3QnO1xyXG5pbXBvcnQgeyBJbWFnZU9iamVjdCB9IGZyb20gJy4uL0VuZ2luZS9JbWFnZU9iamVjdC9JbWFnZU9iamVjdCc7XHJcblxyXG5leHBvcnQgY2xhc3MgUGFuZWxHYW1lT3ZlciB7XHJcbiAgICBpbWdHYW1lT3ZlcjogSW1hZ2VPYmplY3Q7XHJcbiAgICBjdXJyZW50U2NvcmU6IFRleHRPYmplY3Q7XHJcbiAgICBoaWdoU2NvcmU6IFRleHRPYmplY3Q7XHJcbiAgICByZXBsYXlCdXR0b246IEJ1dHRvbk9iamVjdDtcclxuICAgIGNvbnN0cnVjdG9yKGltZ0dhbWVPdmVyOiBJbWFnZU9iamVjdCwgY3VycmVudFNjb3JlOiBUZXh0T2JqZWN0LCBoaWdoU2NvcmU6IFRleHRPYmplY3QsIHJlcGxheUJ1dHRvbjogQnV0dG9uT2JqZWN0KXtcclxuICAgICAgICB0aGlzLmltZ0dhbWVPdmVyID0gaW1nR2FtZU92ZXI7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50U2NvcmUgPSBjdXJyZW50U2NvcmU7XHJcbiAgICAgICAgdGhpcy5oaWdoU2NvcmUgPSBoaWdoU2NvcmU7XHJcbiAgICAgICAgdGhpcy5yZXBsYXlCdXR0b24gPSByZXBsYXlCdXR0b247XHJcbiAgICB9XHJcbiAgICBzZXRBY3RpdmUoYWN0aXZlOiBib29sZWFuKXtcclxuICAgICAgICB0aGlzLmltZ0dhbWVPdmVyLnNldEFjdGl2ZShhY3RpdmUpO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFNjb3JlLnNldEFjdGl2ZShhY3RpdmUpO1xyXG4gICAgICAgIHRoaXMuaGlnaFNjb3JlLnNldEFjdGl2ZShhY3RpdmUpO1xyXG4gICAgICAgIHRoaXMucmVwbGF5QnV0dG9uLnNldEFjdGl2ZShhY3RpdmUpO1xyXG4gICAgfVxyXG4gICAgZ2V0Q29tcG9uZW50KCl7XHJcbiAgICAgICAgcmV0dXJuIFt0aGlzLmltZ0dhbWVPdmVyLCB0aGlzLnJlcGxheUJ1dHRvbiwgdGhpcy5jdXJyZW50U2NvcmUsIHRoaXMuaGlnaFNjb3JlXTtcclxuICAgIH1cclxuICAgIHVwZGF0ZShjdXJyZW50U2NvcmU6IG51bWJlciwgaGlnaFNjb3JlOiBudW1iZXIpe1xyXG4gICAgICAgIHRoaXMuY3VycmVudFNjb3JlLnNldENvbnRlbnQoXCJTY29yZTogXCIgKyBjdXJyZW50U2NvcmUpO1xyXG4gICAgICAgIHRoaXMuaGlnaFNjb3JlLnNldENvbnRlbnQoXCJIaWdoIFNjb3JlOiBcIiArIGhpZ2hTY29yZSlcclxuICAgIH1cclxufSIsImltcG9ydCB7U2NlbmV9IGZyb20gJy4uL0VuZ2luZS9TY2VuZS9TY2VuZSc7XHJcbmltcG9ydCB7QmlyZH0gZnJvbSAnLi9CaXJkJztcclxuaW1wb3J0IHtMaXN0UGFpck9mUGlwZXN9IGZyb20gJy4vUGFpck9mUGlwZSc7XHJcbmltcG9ydCB7VGV4dE9iamVjdCB9IGZyb20gJy4uL0VuZ2luZS9UZXh0T2JqZWN0L1RleHRPYmplY3QnO1xyXG5pbXBvcnQge0ltYWdlT2JqZWN0IH0gZnJvbSAnLi4vRW5naW5lL0ltYWdlT2JqZWN0L0ltYWdlT2JqZWN0JztcclxuaW1wb3J0IHtTY29yZX0gZnJvbSBcIi4vU2NvcmVcIjtcclxuaW1wb3J0IHtHcm91bmQgfSBmcm9tICcuL0dyb3VuZCc7XHJcbmltcG9ydCB7UGFuZWxHYW1lT3Zlcn0gZnJvbSAnLi9QYW5lbEdhbWVPdmVyJ1xyXG5pbXBvcnQge0dhbWV9IGZyb20gJy4uL0VuZ2luZS9Db3JlL0dhbWUnXHJcbmltcG9ydCB7QnV0dG9uT2JqZWN0fSBmcm9tICcuLi9FbmdpbmUvQnV0dG9uT2JqZWN0L0J1dHRvbk9iamVjdCc7XHJcbmltcG9ydCB7IEdhbWVPYmplY3QgfSBmcm9tICcuLi9FbmdpbmUvR2FtZU9iamVjdC9HYW1lT2JqZWN0JztcclxuXHJcbmNvbnN0IHBvaW50ID0gbmV3IEF1ZGlvKFwiYXVkaW8vcG9pbnQubXAzXCIpO1xyXG5jb25zdCBkaWUgPSBuZXcgQXVkaW8oXCJhdWRpby9kaWUubXAzXCIpO1xyXG5jb25zdCBoaXQgPSBuZXcgQXVkaW8oXCJhdWRpby9oaXQubXAzXCIpO1xyXG5jb25zdCBhdWRpb1BsYXllciA9IG5ldyBBdWRpbyhcImF1ZGlvL29yY2hlc3RyYXdhdi0yNjE1OC5tcDNcIik7XHJcbmNvbnN0IGF1ZGlvID0gbmV3IEF1ZGlvKFwiYXVkaW8vc3dvb3NoLm1wM1wiKTtcclxuXHJcbmV4cG9ydCBjbGFzcyBQbGF5U2NlbmUgZXh0ZW5kcyBTY2VuZSB7XHJcbiAgICBiaXJkOiBCaXJkO1xyXG4gICAgcGlwZXM6IExpc3RQYWlyT2ZQaXBlcztcclxuICAgIGdyb3VuZDogR3JvdW5kO1xyXG4gICAgY2hlY2tQaXBlOiBib29sZWFuO1xyXG4gICAgdGV4dFNjb3JlOiBUZXh0T2JqZWN0O1xyXG4gICAgdGV4dERlc2NyaXB0aW9uOiBUZXh0T2JqZWN0O1xyXG4gICAgYWRkU2NvcmU6IG51bWJlciB8IG51bGw7XHJcbiAgICBzY29yZTogU2NvcmU7XHJcbiAgICBkZWFkQmlyZDogYm9vbGVhbjtcclxuICAgIHBhbmVsR2FtZU92ZXIgOiBQYW5lbEdhbWVPdmVyO1xyXG4gICAgc3RhcnQ6IGJvb2xlYW47XHJcbiAgICBwYXVzZTogYm9vbGVhbjtcclxuICAgIGNvbnN0cnVjdG9yKGdhbWU6IEdhbWUpe1xyXG4gICAgICAgIHN1cGVyKGdhbWUpO1xyXG4gICAgICAgIC8vIHBsYXkgYXVkaW9cclxuICAgICAgICAvLyBhdWRpb1BsYXllci5wbGF5KCk7XHJcbiAgICAgICAgLy8gYXVkaW9QbGF5ZXIubG9vcCA9dHJ1ZTtcclxuICAgICAgICB0aGlzLmNoZWNrUGlwZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYWRkU2NvcmUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuZGVhZEJpcmQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnN0YXJ0ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5wYXVzZSA9IGZhbHNlOyBcclxuICAgICAgICB0aGlzLnNjb3JlID0gbmV3IFNjb3JlKCk7XHJcbiAgICAgICAgdGhpcy5iaXJkID0gIG5ldyBCaXJkKDEwMCwyODAsNTAsNTAsMCwwLjUsMjAsdGhpcywxKVxyXG4gICAgICAgIHRoaXMudGV4dERlc2NyaXB0aW9uID0gbmV3IFRleHRPYmplY3QoMTQwLDQ1MCxcIkRlc2NyaXB0aW9uXCIsXCJQcmVzcyBFbnRlciB0byBjb250aW51ZVwiLFwiMzBweCBBcmlhbFwiLCBcIndoaXRlXCIsMik7XHJcbiAgICAgICAgdGhpcy50ZXh0RGVzY3JpcHRpb24uc2V0QWN0aXZlKGZhbHNlKTtcclxuICAgICAgICB0aGlzLnRleHRTY29yZSA9IG5ldyBUZXh0T2JqZWN0KDEwLDMwLFwic2NvcmVcIixcIlNjb3JlOiBcIisgdGhpcy5zY29yZS5nZXRDdXJyZW50U2NvcmUoKSwgXCIxOHB4IEFyaWFsXCIsIFwid2hpdGVcIiwyKTtcclxuICAgICAgICB2YXIgYmcgPSBuZXcgSW1hZ2VPYmplY3QoMCwwLDcwMCw4MDAsZ2FtZS5sb2FkZXIuZ2V0SW1hZ2UoXCJiYWNrZ3JvdW5kXCIpIGFzIEhUTUxJbWFnZUVsZW1lbnQsMCxcImJhY2tncm91bmRcIik7XHJcbiAgICAgICAgdGhpcy5ncm91bmQgPSBuZXcgR3JvdW5kKDQsZ2FtZSk7XHJcbiAgICAgICAgdGhpcy5waXBlcyA9IG5ldyBMaXN0UGFpck9mUGlwZXMoZ2FtZSk7XHJcbiAgICAgICAgdGhpcy5wYW5lbEdhbWVPdmVyID0gbmV3IFBhbmVsR2FtZU92ZXIoXHJcbiAgICAgICAgICAgIG5ldyBJbWFnZU9iamVjdCg2MCwzMDAsNTAwLDEzMCxnYW1lLmxvYWRlci5nZXRJbWFnZShcImdhbWVvdmVyXCIpIGFzIEhUTUxJbWFnZUVsZW1lbnQsMCxcImdhbWVPdmVyXCIsMyksXHJcbiAgICAgICAgICAgIG5ldyBUZXh0T2JqZWN0KDExMCw0NzAsXCJzaG93U2NvcmVcIixcIlNjb3JlOiAwXCIsIFwiMzBweCBBcmlhbFwiLFwid2hpdGVcIiwzKSxcclxuICAgICAgICAgICAgbmV3IFRleHRPYmplY3QoMzMwLDQ3MCxcImhpZ2hTY29yZVwiLFwiSGlnaCBTY29yZTogMFwiLCBcIjMwcHggQXJpYWxcIixcIndoaXRlXCIsMyksXHJcbiAgICAgICAgICAgIG5ldyBCdXR0b25PYmplY3QoMjI1LDUwMCwxNjAsODAsZ2FtZS5sb2FkZXIuZ2V0SW1hZ2UoXCJyZXBsYXlCdXR0b25cIikgYXMgSFRNTEltYWdlRWxlbWVudCwwLFwicmVwbGF5QnV0dG9uXCIsMyksIFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gTGlzdCBvZiBHYW1lT2JqZWN0XHJcbiAgICAgICAgdmFyIGxpc3RHYW1lT2JqZWN0IDpBcnJheTxHYW1lT2JqZWN0PiA9IFtiZyx0aGlzLmJpcmQsdGhpcy50ZXh0U2NvcmUsIHRoaXMudGV4dERlc2NyaXB0aW9uXTtcclxuICAgICAgICBsaXN0R2FtZU9iamVjdCA9ICBsaXN0R2FtZU9iamVjdC5jb25jYXQodGhpcy5ncm91bmQuZ2V0Q29tcG9uZW50KCkpO1xyXG4gICAgICAgIGxpc3RHYW1lT2JqZWN0ID0gbGlzdEdhbWVPYmplY3QuY29uY2F0KHRoaXMucGFuZWxHYW1lT3Zlci5nZXRDb21wb25lbnQoKSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZm9yKHZhciBpPTA7aTx0aGlzLnBpcGVzLmxpc3RQaXBlLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICB2YXIgcGlwZSA9IHRoaXMucGlwZXMubGlzdFBpcGVbaV07XHJcbiAgICAgICAgICAgIGxpc3RHYW1lT2JqZWN0ID0gbGlzdEdhbWVPYmplY3QuY29uY2F0KHBpcGUuZ2V0Q29tcG9uZW50KCkpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwibGlzdEdhbWVPYmplY3RcIixsaXN0R2FtZU9iamVjdClcclxuICAgICAgICB0aGlzLmFkZENoaWxkKGxpc3RHYW1lT2JqZWN0KTtcclxuICAgICAgICAvLyBoaWRlbiBwYW5lbEdhbWVPdmVyXHJcbiAgICAgICAgdGhpcy5wYW5lbEdhbWVPdmVyLnNldEFjdGl2ZShmYWxzZSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHVwZGF0ZSh0aW1lOiBudW1iZXIsIGRlbHRhVGltZTogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYoICF0aGlzLmRlYWRCaXJkICYmIHRoaXMuc3RhcnQgJiYgIXRoaXMucGF1c2Upe1xyXG4gICAgICAgICAgICBpZih0aGlzLnByb2Nlc3NJbnB1dC5pbnB1dEtleSA9PT0gXCJLZXlBXCIpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXVzZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRleHREZXNjcmlwdGlvbi5zZXRBY3RpdmUodHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHBpcGVzID0gdGhpcy5nYW1lT2JqZWN0cy5maWx0ZXIoKGltYik9PntcclxuICAgICAgICAgICAgICAgIHJldHVybiBpbWIubmFtZSA9PT0gXCJwaXBlXCI7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdmFyIGNoZWNrU2NvcmUgPSB0aGlzLmdhbWVPYmplY3RzLmZpbHRlcigoaW1iKT0+e1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGltYi5uYW1lID09PSBcImNoZWNrU2NvcmVcIjtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdGhpcy5ncm91bmQudXBkYXRlKHRpbWUsIGRlbHRhVGltZSk7XHJcbiAgICAgICAgICAgIGZvcih2YXIgaiA9IDA7IGogPCBwaXBlcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5jb2xsaXNpb24uaGFuZGxlQ29sbGlzaW9uKHBpcGVzW2pdLHRoaXMuYmlyZCkpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tQaXBlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImdhbWUgb3ZlciFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBjaGVja1Njb3JlLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmNvbGxpc2lvbi5oYW5kbGVDb2xsaXNpb24oY2hlY2tTY29yZVtrXSx0aGlzLmJpcmQpJiYgdGhpcy5hZGRTY29yZSAhPSBrKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjb3JlLnNldEN1cnJlbnRTY29yZSh0aGlzLnNjb3JlLmdldEN1cnJlbnRTY29yZSgpKzEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGV4dFNjb3JlLmNvbnRlbnQgPSBcIlNjb3JlOiBcIiArIHRoaXMuc2NvcmUuZ2V0Q3VycmVudFNjb3JlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRTY29yZSA9IGs7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9pbnQucGxheSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucGlwZXMubGlzdFBpcGUubWFwKChwaXBlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBwaXBlLnVwZGF0ZSh0aW1lLCBkZWx0YVRpbWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmKHRoaXMucHJvY2Vzc0lucHV0LmlucHV0S2V5PT09XCJTcGFjZVwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJpcmQuZmx5KGRlbHRhVGltZSk7XHJcbiAgICAgICAgICAgICAgICBhdWRpby5wbGF5KCk7IFxyXG4gICAgICAgICAgICAgICAgYXVkaW8ucGxheWJhY2tSYXRlID0gMjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyB2YSBjaGFtIGdyb3VuZFxyXG4gICAgICAgICAgICBpZih0aGlzLmNvbGxpc2lvbi5oYW5kbGVDb2xsaXNpb24odGhpcy5ncm91bmQuZ2V0Q29tcG9uZW50KClbMF0sIHRoaXMuYmlyZCl8fHRoaXMuY29sbGlzaW9uLmhhbmRsZUNvbGxpc2lvbih0aGlzLmdyb3VuZC5nZXRDb21wb25lbnQoKVsxXSwgdGhpcy5iaXJkKXx8dGhpcy5jaGVja1BpcGUpe1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5zY29yZS5nZXRDdXJyZW50U2NvcmUoKT4gdGhpcy5zY29yZS5nZXRIaWdoU2NvcmUoKSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjb3JlLnNldEhpZ2hTY29yZSh0aGlzLnNjb3JlLmdldEN1cnJlbnRTY29yZSgpKTtcclxuICAgICAgICAgICAgICAgIC8vIHVwZGF0ZSBzY29yZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5wYW5lbEdhbWVPdmVyLnVwZGF0ZSh0aGlzLnNjb3JlLmdldEN1cnJlbnRTY29yZSgpLCB0aGlzLnNjb3JlLmdldEhpZ2hTY29yZSgpKTtcclxuICAgICAgICAgICAgICAgIC8vIHNldCBzdGF0ZSBiaXJkIGlzIGRpZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5kZWFkQmlyZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vIHBsYXkgYXVkaW9cclxuICAgICAgICAgICAgICAgIGF1ZGlvUGxheWVyLnBhdXNlKCk7XHJcbiAgICAgICAgICAgICAgICBoaXQucGxheSgpO1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PntcclxuICAgICAgICAgICAgICAgICAgICAvLyBzaG93IHBhbmVsR2FtZU92ZXJcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhbmVsR2FtZU92ZXIuc2V0QWN0aXZlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRpZS5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICB9LCA1MDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHN1cGVyLnVwZGF0ZSh0aW1lLCBkZWx0YVRpbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHRoaXMuZGVhZEJpcmQpe1xyXG4gICAgICAgICAgICBpZigodGhpcy5wcm9jZXNzSW5wdXQuaW5wdXRLZXkgPT09IFwiRW50ZXJcInx8dGhpcy5wcm9jZXNzSW5wdXQubW91c2VFdmVudCE9bnVsbCYmIHRoaXMucGFuZWxHYW1lT3Zlci5yZXBsYXlCdXR0b24uaXNJbnNpZGUodGhpcy5wcm9jZXNzSW5wdXQubW91c2VFdmVudCkpKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVhZEJpcmQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGFuZWxHYW1lT3Zlci5zZXRBY3RpdmUoZmFsc2UpOyBcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5zY2VuZU1hbmFnZXIuc3dpdGNoU2NlbmUoMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZighdGhpcy5zdGFydCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMucHJvY2Vzc0lucHV0LmlucHV0S2V5ID09PSBcIlNwYWNlXCIpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5wYXVzZSl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMucHJvY2Vzc0lucHV0LmlucHV0S2V5ID09PSBcIkVudGVyXCIpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXVzZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0RGVzY3JpcHRpb24uc2V0QWN0aXZlKGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJlc2V0U2NlbmUoKXtcclxuICAgICAgICAvLyBhdWRpb1BsYXllci5wbGF5KCk7XHJcbiAgICAgICAgLy8gYXVkaW9QbGF5ZXIubG9vcCA9dHJ1ZTtcclxuICAgICAgICB0aGlzLmNoZWNrUGlwZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYWRkU2NvcmUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuc3RhcnQgPSBmYWxzZTtcclxuICAgICAgICBzdXBlci5yZXNldFNjZW5lKCk7XHJcbiAgICAgICAgdGhpcy5zY29yZS5zZXRDdXJyZW50U2NvcmUoMCk7XHJcbiAgICAgICAgdGhpcy50ZXh0U2NvcmUuc2V0Q29udGVudChcIlNjb3JlOiAwXCIpO1xyXG4gICAgICAgIHRoaXMuYmlyZC5yZXNldCgpO1xyXG4gICAgICAgIHRoaXMuZ3JvdW5kLnJlc2V0KCk7XHJcbiAgICAgICAgZm9yKHZhciBpPTA7aTx0aGlzLnBpcGVzLmxpc3RQaXBlLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICB0aGlzLnBpcGVzLmxpc3RQaXBlW2ldLnJlc2V0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwicmVzZXQgcmVuZGVyaW5nXCIpO1xyXG4gICAgfVxyXG59XHJcbiIsImNsYXNzIFNjb3Jle1xyXG4gICAgcHJpdmF0ZSBoaWdoU2NvcmU6IG51bWJlcjtcclxuICAgIHByaXZhdGUgY3VycmVudFNjb3JlOiBudW1iZXI7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMuaGlnaFNjb3JlID0gMDtcclxuICAgICAgICB0aGlzLmN1cnJlbnRTY29yZSA9IDA7XHJcbiAgICB9XHJcbiAgICBzZXRDdXJyZW50U2NvcmUoc2NvcmU6IG51bWJlcil7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50U2NvcmUgPSBzY29yZTtcclxuICAgIH1cclxuICAgIGdldEN1cnJlbnRTY29yZSgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRTY29yZTtcclxuICAgIH1cclxuICAgIGdldEhpZ2hTY29yZSgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmhpZ2hTY29yZTtcclxuICAgIH1cclxuICAgIHNldEhpZ2hTY29yZShoaWdoU2NvcmU6IG51bWJlcil7XHJcbiAgICAgICAgdGhpcy5oaWdoU2NvcmUgPSBoaWdoU2NvcmU7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IHtTY29yZX07IiwiaW1wb3J0IHtTY2VuZX0gZnJvbSAnLi4vRW5naW5lL1NjZW5lL1NjZW5lJztcclxuaW1wb3J0IHsgSW1hZ2VPYmplY3QgfSBmcm9tICcuLi9FbmdpbmUvSW1hZ2VPYmplY3QvSW1hZ2VPYmplY3QnO1xyXG5pbXBvcnQgeyBCdXR0b25PYmplY3QgfSBmcm9tICcuLi9FbmdpbmUvQnV0dG9uT2JqZWN0L0J1dHRvbk9iamVjdCc7XHJcbmltcG9ydCB7R3JvdW5kfSBmcm9tIFwiLi9Hcm91bmRcIlxyXG5pbXBvcnQgeyBHYW1lIH0gZnJvbSAnLi4vRW5naW5lL0NvcmUvR2FtZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgU3RhcnRTY2VuZSBleHRlbmRzIFNjZW5lIHtcclxuICAgIGJhY2tncm91bmQ6IEltYWdlT2JqZWN0O1xyXG4gICAgZ3JvdW5kOiBHcm91bmQ7XHJcbiAgICBpbWdTdGFydDogSW1hZ2VPYmplY3Q7XHJcbiAgICBidXR0b25TdGFydDogQnV0dG9uT2JqZWN0XHJcbiAgICBjb25zdHJ1Y3RvcihnYW1lOiBHYW1lKXtcclxuICAgICAgICBzdXBlcihnYW1lKTtcclxuICAgICAgICB0aGlzLmJhY2tncm91bmQgPW5ldyBJbWFnZU9iamVjdCgwLDAsNzAwLDgwMCxnYW1lLmxvYWRlci5nZXRJbWFnZShcImJhY2tncm91bmRcIikgYXMgSFRNTEltYWdlRWxlbWVudCwwLFwiYmFja2dyb3VuZFwiKTtcclxuICAgICAgICB0aGlzLmltZ1N0YXJ0ID0gbmV3IEltYWdlT2JqZWN0KDUwLDIwLDUwMCw3MDAsZ2FtZS5sb2FkZXIuZ2V0SW1hZ2UoXCJtZXNzYWdlXCIpIGFzIEhUTUxJbWFnZUVsZW1lbnQsMCxcIlwiLDIpO1xyXG4gICAgICAgIHRoaXMuYnV0dG9uU3RhcnQgPSBuZXcgQnV0dG9uT2JqZWN0KDAsMCw3MDAsODAwLG51bGwsMCxcImJ1dHRvblN0YXJ0XCIpO1xyXG4gICAgICAgIHRoaXMuZ3JvdW5kID0gbmV3IEdyb3VuZCgyLGdhbWUpXHJcbiAgICAgICAgdmFyIGltYWdlT2JqZWN0cyA9IFt0aGlzLmJhY2tncm91bmRdLmNvbmNhdCh0aGlzLmdyb3VuZC5nZXRDb21wb25lbnQoKSk7XHJcbiAgICAgICAgaW1hZ2VPYmplY3RzLnB1c2godGhpcy5pbWdTdGFydCk7XHJcbiAgICAgICAgdGhpcy5hZGRDaGlsZChpbWFnZU9iamVjdHMpO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKHRpbWU6IG51bWJlciwgZGVsdGFUaW1lOiBudW1iZXIpe1xyXG4gICAgICAgIHRoaXMuZ3JvdW5kLnVwZGF0ZSh0aW1lLCBkZWx0YVRpbWUpO1xyXG4gICAgICAgIGlmKHRoaXMucHJvY2Vzc0lucHV0LmlucHV0S2V5ID09PSBcIkVudGVyXCJ8fHRoaXMucHJvY2Vzc0lucHV0LmlucHV0S2V5ID09PSBcIlNwYWNlXCIgfHwodGhpcy5wcm9jZXNzSW5wdXQubW91c2VFdmVudCE9bnVsbCAmJiB0aGlzLmJ1dHRvblN0YXJ0LmlzSW5zaWRlKHRoaXMucHJvY2Vzc0lucHV0Lm1vdXNlRXZlbnQpKSkge1xyXG4gICAgICAgICAgICB0aGlzLmdhbWUuc2NlbmVNYW5hZ2VyLnN3aXRjaFNjZW5lKDEpXHJcbiAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBTdGFydFNjZW5lIH0gZnJvbSBcIi4vZ2FtZS9TdGFydFNjZW5lXCI7XHJcbmltcG9ydCB7IFJlbmRlcmVyIH0gZnJvbSBcIi4vRW5naW5lL1JlbmRlcmVyL1JlbmRlcmVyXCI7XHJcbmltcG9ydCB7IFNjZW5lTWFuYWdlciB9IGZyb20gXCIuL0VuZ2luZS9TY2VuZS9TY2VuZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgR2FtZSB9IGZyb20gXCIuL0VuZ2luZS9Db3JlL0dhbWVcIjsgIFxyXG5pbXBvcnQge1BsYXlTY2VuZX0gZnJvbSBcIi4vZ2FtZS9QbGF5U2NlbmVcIjtcclxuXHJcbnZhciBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbXlDYW52YXMnKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcclxudmFyIHJlbmRlciA9IG5ldyBSZW5kZXJlcihjYW52YXMpXHJcbnZhciBnYW1lU2NlbmUgPSBuZXcgU2NlbmVNYW5hZ2VyKCk7XHJcbnZhciBteUdhbWUgPSBuZXcgR2FtZShnYW1lU2NlbmUpO1xyXG5cclxuY29uc3QgaW1hZ2VzTG9hZCA9IFtcclxuICAgIHtcclxuICAgICAgICBcImtleVwiOiBcImJpcmQwXCIsXHJcbiAgICAgICAgXCJwYXRoXCI6IFwiSW1hZ2VzL2JpcmQvZnJhbWUtMS5wbmdcIixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJrZXlcIjogXCJiaXJkMVwiLFxyXG4gICAgICAgIFwicGF0aFwiOiBcIkltYWdlcy9iaXJkL2ZyYW1lLTIucG5nXCIsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwia2V5XCI6IFwiYmlyZDJcIixcclxuICAgICAgICBcInBhdGhcIjogXCJJbWFnZXMvYmlyZC9mcmFtZS0zLnBuZ1wiLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImtleVwiOiBcImJpcmQzXCIsXHJcbiAgICAgICAgXCJwYXRoXCI6IFwiSW1hZ2VzL2JpcmQvZnJhbWUtNC5wbmdcIixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJrZXlcIjogXCJiaXJkNFwiLFxyXG4gICAgICAgIFwicGF0aFwiOiBcIkltYWdlcy9iaXJkL2ZyYW1lLTUucG5nXCIsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwia2V5XCI6IFwiYmlyZDVcIixcclxuICAgICAgICBcInBhdGhcIjogXCJJbWFnZXMvYmlyZC9mcmFtZS02LnBuZ1wiLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImtleVwiOiBcImJpcmQ2XCIsXHJcbiAgICAgICAgXCJwYXRoXCI6IFwiSW1hZ2VzL2JpcmQvZnJhbWUtNy5wbmdcIixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJrZXlcIjogXCJiaXJkN1wiLFxyXG4gICAgICAgIFwicGF0aFwiOiBcIkltYWdlcy9iaXJkL2ZyYW1lLTgucG5nXCIsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwia2V5XCI6IFwicGlwZVwiLFxyXG4gICAgICAgIFwicGF0aFwiOiBcIkltYWdlcy9waXBlL3BpcGUtZ3JlZW4ucG5nXCIsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwia2V5XCI6IFwibWVzc2FnZVwiLFxyXG4gICAgICAgIFwicGF0aFwiOiBcIkltYWdlcy9nYW1lU3RhcnQvbWVzc2FnZS5wbmdcIixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJrZXlcIjogXCJncm91bmRcIixcclxuICAgICAgICBcInBhdGhcIjogXCJJbWFnZXMvZ3JvdW5kL2Jhc2UucG5nXCIsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwia2V5XCI6IFwiZ2FtZW92ZXJcIixcclxuICAgICAgICBcInBhdGhcIjogXCJJbWFnZXMvcGFuZWxHYW1lT3Zlci9nYW1lb3Zlci5wbmdcIixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJrZXlcIjogXCJyZXBsYXlCdXR0b25cIixcclxuICAgICAgICBcInBhdGhcIjogXCJJbWFnZXMvcGFuZWxHYW1lT3Zlci9yZXBsYXktYnV0dG9uLnBuZ1wiLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImtleVwiOiBcImJhY2tncm91bmRcIixcclxuICAgICAgICBcInBhdGhcIjogXCJJbWFnZXMvYmFja2dyb3VuZC9iYWNrZ3JvdW5kLW5pZ2h0LnBuZ1wiXHJcbiAgICB9XHJcbl1cclxuXHJcbmNvbnN0IHByb21pc2VzID0gaW1hZ2VzTG9hZC5tYXAoKGltYWdlKSA9PiBteUdhbWUubG9hZGVyLmFkZEltYWdlKGltYWdlW1wicGF0aFwiXSwgaW1hZ2VbXCJrZXlcIl0pKVxyXG5Qcm9taXNlLmFsbChwcm9taXNlcykudGhlbigoKT0+IHtcclxuICAgIHZhciBzdGFydFNjZW5lID0gbmV3IFN0YXJ0U2NlbmUobXlHYW1lKTtcclxuICAgIHZhciBwbGF5U2NlbmUgPSBuZXcgUGxheVNjZW5lKG15R2FtZSk7XHJcbiAgICBnYW1lU2NlbmUuYWRkU2NlbmUoc3RhcnRTY2VuZSk7XHJcbiAgICBnYW1lU2NlbmUuYWRkU2NlbmUocGxheVNjZW5lKTtcclxuICAgIG15R2FtZS5zdGFydChyZW5kZXIpO1xyXG59KS5jYXRjaCgoZXJyb3IpID0+IHtjb25zb2xlLmxvZyhlcnJvcil9KVxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=