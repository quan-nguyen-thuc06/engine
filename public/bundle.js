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
    constructor(scene, key) {
        super(scene, key);
    }
    isInside(MousePos) {
        if (MousePos.length < 2)
            return false;
        return MousePos[0] > this.x && MousePos[0] < this.x + this.width && MousePos[1] < this.y + this.height && MousePos[1] > this.y;
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
    constructor() {
        this.lastTime = 0;
        this.listenInput = new _ProcessInput_ListenInput__WEBPACK_IMPORTED_MODULE_0__.ListenInput();
        this.loader = new _ImageLoader_ImageLoader__WEBPACK_IMPORTED_MODULE_1__.ImageLoader();
    }
    start(render, sceneManager) {
        this.sceneManager = sceneManager;
        this.render = render;
        this.listenInput.handleInput(this.sceneManager, render);
        requestAnimationFrame(() => this.loop());
    }
    loop() {
        const time = window.performance.now();
        const delta = time - this.lastTime;
        var indexScene = this.sceneManager.currentScene; // index of Currentscene
        var GameObject = this.sceneManager.scenes[indexScene].gameObjects; // gameObjects of scene
        this.sceneManager.scenes[indexScene].update(time, delta);
        this.render.renderObject(GameObject);
        this.lastTime = time;
        requestAnimationFrame(() => this.loop());
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
    constructor(scene) {
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.name = "";
        this.active = true;
        this.z_index = 0;
        this.defaultPosition = [0, 0];
        this.scene = scene;
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
    update(time, deltaTime) { }
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
    constructor(scene, key) {
        super(scene);
        if (key == "null")
            this.image = new Image();
        else
            this.image = this.scene.sceneManager.game.loader.getImage(key);
        this.degrees = 0;
    }
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
/* harmony import */ var _ImageObject_ImageObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ImageObject/ImageObject */ "./src/Engine/ImageObject/ImageObject.ts");
/* harmony import */ var _Sprite_Sprite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Sprite/Sprite */ "./src/Engine/Sprite/Sprite.ts");
/* harmony import */ var _TextObject_TextObject__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../TextObject/TextObject */ "./src/Engine/TextObject/TextObject.ts");



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
    renderObject(gameObjects) {
        gameObjects.sort((a, b) => {
            return a.z_index - b.z_index;
        });
        for (var i = 0; i < gameObjects.length; i++) {
            if (gameObjects[i].getActive()) {
                const obj = gameObjects[i];
                if (obj instanceof _ImageObject_ImageObject__WEBPACK_IMPORTED_MODULE_0__.ImageObject)
                    this.drawImage(obj);
                else if (obj instanceof _Sprite_Sprite__WEBPACK_IMPORTED_MODULE_1__.Sprite)
                    this.drawSprite(obj);
                else if (obj instanceof _TextObject_TextObject__WEBPACK_IMPORTED_MODULE_2__.TextObject)
                    this.drawText(obj);
            }
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
/* harmony import */ var _ProcessInput_ProcessInput__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ProcessInput/ProcessInput */ "./src/Engine/ProcessInput/ProcessInput.ts");
/* harmony import */ var _Collision_Collision__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Collision/Collision */ "./src/Engine/Collision/Collision.ts");




class Scene {
    constructor(sceneManager) {
        this.gameObjects = [];
        this.processInput = new _ProcessInput_ProcessInput__WEBPACK_IMPORTED_MODULE_2__.ProcessInput();
        this.collision = new _Collision_Collision__WEBPACK_IMPORTED_MODULE_3__.Collision();
        this.sceneManager = sceneManager;
    }
    resetScene() {
        for (var i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].reset();
        }
    }
    addChild(gameObjects) {
        gameObjects.map((gameObject) => { this.gameObjects.push(gameObject); });
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
    constructor(game) {
        this.scenes = [];
        this.currentScene = 0;
        this.game = game;
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
    constructor(scene, images) {
        super(scene);
        console.log("images", images);
        this.images = images;
        this.degrees = 0;
        this.frameCurrent = 0;
        this.rate = 0;
        this.adt = 0;
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
    constructor(scene) {
        super(scene);
        this.content = "";
        this.font = "";
        this.color = "";
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
    constructor(scene) {
        var images = [];
        // console.log("loader", scene.game.loader);
        for (var i = 0; i < 8; i++) {
            let name = "bird" + i;
            images.push(scene.sceneManager.game.loader.getImage(name));
        }
        super(scene, images);
        this.name = "bird";
        this.gravity = 0;
        this.speed = 0;
        this.rate = 1.0 / 30 * 1000;
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
    constructor(scene, speed) {
        var imageObject1 = new _Engine_ImageObject_ImageObject__WEBPACK_IMPORTED_MODULE_0__.ImageObject(scene, "ground");
        imageObject1.name = "ground";
        imageObject1.z_index = 2;
        imageObject1.y = 670;
        imageObject1.width = 650;
        imageObject1.height = 150;
        imageObject1.defaultPosition = [0, 670];
        var imageObject2 = new _Engine_ImageObject_ImageObject__WEBPACK_IMPORTED_MODULE_0__.ImageObject(scene, "ground");
        imageObject2.name = "ground";
        imageObject2.z_index = 2;
        imageObject2.x = 649;
        imageObject2.y = 670;
        imageObject2.width = 650;
        imageObject2.height = 150;
        imageObject2.defaultPosition = [649, 670];
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
const distance = 300;
const pipeWidth = 80;
class PairOfPipe {
    constructor(scene, x, y, speed) {
        var PipeUp = new _Engine_ImageObject_ImageObject__WEBPACK_IMPORTED_MODULE_0__.ImageObject(scene, "pipe");
        // set attributes
        PipeUp.x = x;
        PipeUp.y = y;
        PipeUp.width = pipeWidth;
        PipeUp.height = pipeHeight;
        PipeUp.degrees = 180;
        PipeUp.name = "pipe";
        PipeUp.z_index = 1;
        // set defaultPosition
        PipeUp.defaultPosition = [x, y];
        var PipeDown = new _Engine_ImageObject_ImageObject__WEBPACK_IMPORTED_MODULE_0__.ImageObject(scene, "pipe");
        // set attributes
        PipeDown.x = x;
        PipeDown.y = y + pipeHeight + blanks;
        PipeDown.width = pipeWidth;
        PipeDown.height = pipeHeight;
        PipeDown.name = "pipe";
        PipeDown.z_index = 1;
        // set defaultPosition
        PipeDown.defaultPosition = [x, y + pipeHeight + blanks];
        var checkScore = new _Engine_ImageObject_ImageObject__WEBPACK_IMPORTED_MODULE_0__.ImageObject(scene, "null");
        // set attributes
        checkScore.x = x + pipeWidth;
        checkScore.y = y + pipeHeight;
        checkScore.width = 10;
        checkScore.height = blanks;
        checkScore.name = "checkScore";
        checkScore.z_index = 1;
        checkScore.defaultPosition = [x + pipeWidth, y + pipeHeight];
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
    constructor(scene) {
        this.listPipe = [];
        for (var i = 0; i < numPipe; i++) {
            var x = i * distance + pipeWidth + 400;
            var y = Math.floor(Math.random() * -200);
            var pipe = new PairOfPipe(scene, x, y, 4);
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
const Bird_Width = 50;
const Bird_Height = 50;
const Bird_X = 100;
const Bird_Y = 280;
class PlayScene extends _Engine_Scene_Scene__WEBPACK_IMPORTED_MODULE_0__.Scene {
    constructor(sceneManager) {
        super(sceneManager);
        // play audio
        // audioPlayer.play();
        // audioPlayer.loop =true;
        this.checkPipe = false;
        this.addScore = null;
        this.deadBird = false;
        this.start = false;
        this.pause = false;
        this.score = new _Score__WEBPACK_IMPORTED_MODULE_5__.Score();
        this.bird = new _Bird__WEBPACK_IMPORTED_MODULE_1__.Bird(this);
        // set attributes
        this.bird.x = Bird_X;
        this.bird.y = Bird_Y;
        this.bird.width = Bird_Width;
        this.bird.height = Bird_Height;
        this.bird.gravity = 0.5;
        this.bird.speed = 20;
        this.bird.z_index = 2;
        this.bird.defaultPosition = [this.bird.x, this.bird.y];
        this.textDescription = new _Engine_TextObject_TextObject__WEBPACK_IMPORTED_MODULE_3__.TextObject(this);
        // set attributes
        this.textDescription.x = 140;
        this.textDescription.y = 450;
        this.textDescription.content = "Press Enter to continue";
        this.textDescription.font = "30px Arial";
        this.textDescription.color = "white";
        this.textDescription.z_index = 2;
        this.textDescription.setActive(false);
        this.textDescription.defaultPosition = [140, 450];
        this.textScore = new _Engine_TextObject_TextObject__WEBPACK_IMPORTED_MODULE_3__.TextObject(this);
        this.textScore.x = 10;
        this.textScore.y = 30;
        this.textScore.content = "Score: " + this.score.getCurrentScore();
        this.textScore.font = "18px Arial";
        this.textScore.color = "white";
        this.textScore.z_index = 2;
        this.textScore.defaultPosition = [10, 30];
        var bg = new _Engine_ImageObject_ImageObject__WEBPACK_IMPORTED_MODULE_4__.ImageObject(this, "background");
        // set attributes
        bg.width = 700;
        bg.height = 800;
        bg.name = "background";
        this.ground = new _Ground__WEBPACK_IMPORTED_MODULE_6__.Ground(this, 4);
        this.pipes = new _PairOfPipe__WEBPACK_IMPORTED_MODULE_2__.ListPairOfPipes(this);
        // init panelGameOver
        var imgGameOver = new _Engine_ImageObject_ImageObject__WEBPACK_IMPORTED_MODULE_4__.ImageObject(this, "gameover");
        imgGameOver.x = 60;
        imgGameOver.y = 300;
        imgGameOver.width = 500;
        imgGameOver.height = 130;
        imgGameOver.z_index = 3;
        imgGameOver.defaultPosition = [60, 300];
        var textCurrentScore = new _Engine_TextObject_TextObject__WEBPACK_IMPORTED_MODULE_3__.TextObject(this);
        textCurrentScore.x = 110;
        textCurrentScore.y = 470;
        textCurrentScore.content = "Score: 0";
        textCurrentScore.font = "30px Arial";
        textCurrentScore.color = "white";
        textCurrentScore.z_index = 3;
        textCurrentScore.defaultPosition = [110, 470];
        var textHighScore = new _Engine_TextObject_TextObject__WEBPACK_IMPORTED_MODULE_3__.TextObject(this);
        textHighScore.x = 330;
        textHighScore.y = 470;
        textHighScore.content = "High Score: 0";
        textHighScore.font = "30px Arial";
        textHighScore.color = "white";
        textHighScore.z_index = 3;
        textHighScore.defaultPosition = [330, 470];
        var buttonReplay = new _Engine_ButtonObject_ButtonObject__WEBPACK_IMPORTED_MODULE_8__.ButtonObject(this, "replayButton");
        buttonReplay.x = 225;
        buttonReplay.y = 500;
        buttonReplay.width = 160;
        buttonReplay.height = 80;
        buttonReplay.z_index = 3;
        buttonReplay.defaultPosition = [225, 500];
        this.panelGameOver = new _PanelGameOver__WEBPACK_IMPORTED_MODULE_7__.PanelGameOver(imgGameOver, textCurrentScore, textHighScore, buttonReplay);
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
                this.bird.speed = 10;
                this.bird.update(time, deltaTime);
            }
            if ((this.processInput.inputKey === "Enter" || this.processInput.mouseEvent != null && this.panelGameOver.replayButton.isInside(this.processInput.mouseEvent))) {
                this.deadBird = false;
                this.panelGameOver.setActive(false);
                this.sceneManager.switchScene(1);
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
    constructor(sceneManager) {
        super(sceneManager);
        this.background = new _Engine_ImageObject_ImageObject__WEBPACK_IMPORTED_MODULE_1__.ImageObject(this, "background");
        // set attributes
        this.background.width = 700;
        this.background.height = 800;
        this.background.name = "background";
        this.imgStart = new _Engine_ImageObject_ImageObject__WEBPACK_IMPORTED_MODULE_1__.ImageObject(this, "message");
        // set attributes
        this.imgStart.width = 500,
            this.imgStart.height = 700;
        this.imgStart.x = 50;
        this.imgStart.y = 20;
        this.imgStart.z_index = 2;
        this.buttonStart = new _Engine_ButtonObject_ButtonObject__WEBPACK_IMPORTED_MODULE_2__.ButtonObject(this, "null");
        // set attributes
        this.buttonStart.width = 700;
        this.buttonStart.height = 800;
        this.buttonStart.name = "buttonStart";
        this.ground = new _Ground__WEBPACK_IMPORTED_MODULE_3__.Ground(this, 2);
        var imageObjects = [this.background].concat(this.ground.getComponent());
        imageObjects.push(this.imgStart);
        this.addChild(imageObjects);
    }
    update(time, deltaTime) {
        this.ground.update(time, deltaTime);
        if (this.processInput.inputKey === "Enter" || this.processInput.inputKey === "Space" || (this.processInput.mouseEvent != null && this.buttonStart.isInside(this.processInput.mouseEvent))) {
            this.sceneManager.switchScene(1);
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
var myGame = new _Engine_Core_Game__WEBPACK_IMPORTED_MODULE_3__.Game();
var render = new _Engine_Renderer_Renderer__WEBPACK_IMPORTED_MODULE_1__.Renderer(canvas);
var gameScene = new _Engine_Scene_SceneManager__WEBPACK_IMPORTED_MODULE_2__.SceneManager(myGame);
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
    var startScene = new _game_StartScene__WEBPACK_IMPORTED_MODULE_0__.StartScene(gameScene);
    var playScene = new _game_PlayScene__WEBPACK_IMPORTED_MODULE_4__.PlayScene(gameScene);
    gameScene.addScene(startScene);
    gameScene.addScene(playScene);
    myGame.start(render, gameScene);
}).catch((error) => { console.log(error); });

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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L0IsU0FBUyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM5QixNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQztBQUNwQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxHQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3dlZWsxLy4vc3JjL0VuZ2luZS9CdXR0b25PYmplY3QvQnV0dG9uT2JqZWN0LnRzIiwid2VicGFjazovL3dlZWsxLy4vc3JjL0VuZ2luZS9Db2xsaXNpb24vQ29sbGlzaW9uLnRzIiwid2VicGFjazovL3dlZWsxLy4vc3JjL0VuZ2luZS9Db3JlL0dhbWUudHMiLCJ3ZWJwYWNrOi8vd2VlazEvLi9zcmMvRW5naW5lL0dhbWVPYmplY3QvR2FtZU9iamVjdC50cyIsIndlYnBhY2s6Ly93ZWVrMS8uL3NyYy9FbmdpbmUvSW1hZ2VMb2FkZXIvSW1hZ2VMb2FkZXIudHMiLCJ3ZWJwYWNrOi8vd2VlazEvLi9zcmMvRW5naW5lL0ltYWdlT2JqZWN0L0ltYWdlT2JqZWN0LnRzIiwid2VicGFjazovL3dlZWsxLy4vc3JjL0VuZ2luZS9Qcm9jZXNzSW5wdXQvTGlzdGVuSW5wdXQudHMiLCJ3ZWJwYWNrOi8vd2VlazEvLi9zcmMvRW5naW5lL1Byb2Nlc3NJbnB1dC9Qcm9jZXNzSW5wdXQudHMiLCJ3ZWJwYWNrOi8vd2VlazEvLi9zcmMvRW5naW5lL1JlbmRlcmVyL1JlbmRlcmVyLnRzIiwid2VicGFjazovL3dlZWsxLy4vc3JjL0VuZ2luZS9TY2VuZS9TY2VuZS50cyIsIndlYnBhY2s6Ly93ZWVrMS8uL3NyYy9FbmdpbmUvU2NlbmUvU2NlbmVNYW5hZ2VyLnRzIiwid2VicGFjazovL3dlZWsxLy4vc3JjL0VuZ2luZS9TcHJpdGUvU3ByaXRlLnRzIiwid2VicGFjazovL3dlZWsxLy4vc3JjL0VuZ2luZS9UZXh0T2JqZWN0L1RleHRPYmplY3QudHMiLCJ3ZWJwYWNrOi8vd2VlazEvLi9zcmMvZ2FtZS9CaXJkLnRzIiwid2VicGFjazovL3dlZWsxLy4vc3JjL2dhbWUvR3JvdW5kLnRzIiwid2VicGFjazovL3dlZWsxLy4vc3JjL2dhbWUvUGFpck9mUGlwZS50cyIsIndlYnBhY2s6Ly93ZWVrMS8uL3NyYy9nYW1lL1BhbmVsR2FtZU92ZXIudHMiLCJ3ZWJwYWNrOi8vd2VlazEvLi9zcmMvZ2FtZS9QbGF5U2NlbmUudHMiLCJ3ZWJwYWNrOi8vd2VlazEvLi9zcmMvZ2FtZS9TY29yZS50cyIsIndlYnBhY2s6Ly93ZWVrMS8uL3NyYy9nYW1lL1N0YXJ0U2NlbmUudHMiLCJ3ZWJwYWNrOi8vd2VlazEvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VlazEvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlZWsxL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VlazEvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWVrMS8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbWFnZU9iamVjdH0gZnJvbSBcIi4uL0ltYWdlT2JqZWN0L0ltYWdlT2JqZWN0XCI7XHJcbmltcG9ydCB7IFNjZW5lIH0gZnJvbSBcIi4uL1NjZW5lL1NjZW5lXCI7XHJcbmV4cG9ydCBjbGFzcyBCdXR0b25PYmplY3QgZXh0ZW5kcyBJbWFnZU9iamVjdHtcclxuICAgIGNvbnN0cnVjdG9yKHNjZW5lOiBTY2VuZSwga2V5OiBzdHJpbmcpe1xyXG4gICAgICAgIHN1cGVyKHNjZW5lLGtleSk7XHJcbiAgICB9XHJcbiAgICBpc0luc2lkZShNb3VzZVBvczogQXJyYXk8bnVtYmVyPil7XHJcbiAgICAgICAgaWYoTW91c2VQb3MubGVuZ3RoIDwgMikgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIHJldHVybiBNb3VzZVBvc1swXSA+IHRoaXMueCAmJiBNb3VzZVBvc1swXSA8IHRoaXMueCt0aGlzLndpZHRoICYmIE1vdXNlUG9zWzFdIDwgdGhpcy55K3RoaXMuaGVpZ2h0ICYmIE1vdXNlUG9zWzFdID4gdGhpcy55O1xyXG4gICAgfSAgICBcclxufSIsImltcG9ydCB7R2FtZU9iamVjdH0gZnJvbSBcIi4uL0dhbWVPYmplY3QvR2FtZU9iamVjdFwiO1xyXG5leHBvcnQgY2xhc3MgQ29sbGlzaW9ue1xyXG4gICAgaGFuZGxlQ29sbGlzaW9uKG9iajEgOiBHYW1lT2JqZWN0LCBvYmoyIDogR2FtZU9iamVjdCl7XHJcbiAgICAgICAgaWYob2JqMS54KyBvYmoxLndpZHRoICsgMT49b2JqMi54ICYmIG9iajEueCsxIDw9IG9iajIueCArIG9iajIud2lkdGgpe1xyXG4gICAgICAgICAgICBpZihvYmoxLnkrIG9iajEuaGVpZ2h0ICsgMT49b2JqMi55ICYmIG9iajEueTw9IG9iajIueSArIG9iajIuaGVpZ2h0KXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IFNjZW5lTWFuYWdlciB9IGZyb20gXCIuLi9TY2VuZS9TY2VuZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgUmVuZGVyZXIgfSBmcm9tIFwiLi4vUmVuZGVyZXIvUmVuZGVyZXJcIjtcclxuaW1wb3J0IHsgTGlzdGVuSW5wdXQgfSBmcm9tIFwiLi4vUHJvY2Vzc0lucHV0L0xpc3RlbklucHV0XCI7XHJcbmltcG9ydCB7SW1hZ2VMb2FkZXIgfSBmcm9tIFwiLi4vSW1hZ2VMb2FkZXIvSW1hZ2VMb2FkZXJcIjtcclxuZXhwb3J0IGNsYXNzIEdhbWV7XHJcbiAgICBzY2VuZU1hbmFnZXIhOiBTY2VuZU1hbmFnZXI7XHJcbiAgICBsYXN0VGltZTogbnVtYmVyO1xyXG4gICAgbGlzdGVuSW5wdXQ6IExpc3RlbklucHV0O1xyXG4gICAgbG9hZGVyOiBJbWFnZUxvYWRlcjtcclxuICAgIHJlbmRlciE6IFJlbmRlcmVyO1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICB0aGlzLmxhc3RUaW1lID0gMDtcclxuICAgICAgICB0aGlzLmxpc3RlbklucHV0ID0gbmV3IExpc3RlbklucHV0KCk7XHJcbiAgICAgICAgdGhpcy5sb2FkZXIgPSBuZXcgSW1hZ2VMb2FkZXIoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgc3RhcnQocmVuZGVyOiBSZW5kZXJlciwgc2NlbmVNYW5hZ2VyOiBTY2VuZU1hbmFnZXIpe1xyXG4gICAgICAgIHRoaXMuc2NlbmVNYW5hZ2VyID0gc2NlbmVNYW5hZ2VyO1xyXG4gICAgICAgIHRoaXMucmVuZGVyID0gcmVuZGVyO1xyXG4gICAgICAgIHRoaXMubGlzdGVuSW5wdXQuaGFuZGxlSW5wdXQodGhpcy5zY2VuZU1hbmFnZXIhLCByZW5kZXIpO1xyXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKT0+dGhpcy5sb29wKCkpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBsb29wKCl7XHJcbiAgICAgICAgY29uc3QgdGltZSA9IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKTtcclxuICAgICAgICBjb25zdCBkZWx0YSA9IHRpbWUgLSB0aGlzLmxhc3RUaW1lO1xyXG4gICAgICAgIHZhciBpbmRleFNjZW5lID0gdGhpcy5zY2VuZU1hbmFnZXIhLmN1cnJlbnRTY2VuZTsgLy8gaW5kZXggb2YgQ3VycmVudHNjZW5lXHJcbiAgICAgICAgdmFyIEdhbWVPYmplY3QgPSB0aGlzLnNjZW5lTWFuYWdlciEuc2NlbmVzW2luZGV4U2NlbmVdLmdhbWVPYmplY3RzOyAvLyBnYW1lT2JqZWN0cyBvZiBzY2VuZVxyXG4gICAgICAgIHRoaXMuc2NlbmVNYW5hZ2VyIS5zY2VuZXNbaW5kZXhTY2VuZV0udXBkYXRlKHRpbWUsZGVsdGEpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyLnJlbmRlck9iamVjdChHYW1lT2JqZWN0KTtcclxuICAgICAgICB0aGlzLmxhc3RUaW1lID0gdGltZTtcclxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCk9PnRoaXMubG9vcCgpKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IFNjZW5lIH0gZnJvbSBcIi4uL1NjZW5lL1NjZW5lXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgR2FtZU9iamVjdHtcclxuICAgIHg6IG51bWJlcjtcclxuICAgIHk6IG51bWJlcjtcclxuICAgIHdpZHRoOiBudW1iZXI7XHJcbiAgICBoZWlnaHQ6IG51bWJlcjtcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIGFjdGl2ZTogYm9vbGVhbjtcclxuICAgIGRlZmF1bHRQb3NpdGlvbjogQXJyYXk8bnVtYmVyPjtcclxuICAgIHpfaW5kZXg6IG51bWJlcjtcclxuICAgIHNjZW5lOiBTY2VuZTtcclxuICAgIGNvbnN0cnVjdG9yKHNjZW5lOiBTY2VuZSkge1xyXG4gICAgICAgIHRoaXMueCA9IDA7XHJcbiAgICAgICAgdGhpcy55ID0gMDtcclxuICAgICAgICB0aGlzLndpZHRoID0gMDtcclxuICAgICAgICB0aGlzLmhlaWdodCA9IDA7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gXCJcIjtcclxuICAgICAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy56X2luZGV4ID0gMDtcclxuICAgICAgICB0aGlzLmRlZmF1bHRQb3NpdGlvbiA9IFswLDBdO1xyXG4gICAgICAgIHRoaXMuc2NlbmUgPSBzY2VuZTtcclxuICAgIH1cclxuICAgIHJlc2V0KCl7XHJcbiAgICAgICAgdGhpcy54ID0gdGhpcy5kZWZhdWx0UG9zaXRpb25bMF07XHJcbiAgICAgICAgdGhpcy55ID0gdGhpcy5kZWZhdWx0UG9zaXRpb25bMV07XHJcbiAgICB9XHJcbiAgICBzZXRBY3RpdmUoYWN0aXZlOiBib29sZWFuKXtcclxuICAgICAgICB0aGlzLmFjdGl2ZSA9IGFjdGl2ZTtcclxuICAgIH1cclxuICAgIGdldEFjdGl2ZSgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFjdGl2ZTtcclxuICAgIH1cclxuICAgIHVwZGF0ZSh0aW1lOiBudW1iZXIsIGRlbHRhVGltZTpudW1iZXIpe31cclxufSIsImV4cG9ydCBjbGFzcyBJbWFnZUxvYWRlciB7XHJcbiAgICBpbWFnZXMhOiBNYXA8c3RyaW5nLCBIVE1MSW1hZ2VFbGVtZW50PjtcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgdGhpcy5pbWFnZXMgPSBuZXcgTWFwPHN0cmluZywgSFRNTEltYWdlRWxlbWVudD4oKTtcclxuICAgIH1cclxuICAgIGFzeW5jIGFkZEltYWdlKHNyYzogc3RyaW5nLCBuYW1lOiBzdHJpbmcpe1xyXG4gICAgICAgIHZhciBpbWcgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICBpbWcuc3JjID0gc3JjO1xyXG4gICAgICAgIHRoaXMuaW1hZ2VzLnNldChuYW1lLCBpbWcpO1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGltZy5vbmxvYWQgPSByZXNvbHZlO1xyXG4gICAgICAgICAgICBpbWcub25lcnJvciA9IHJlamVjdDsgXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIGdldEltYWdlKG5hbWU6IHN0cmluZyk6IEhUTUxJbWFnZUVsZW1lbnQge1xyXG4gICAgICAgIGlmKHRoaXMuaW1hZ2VzLmhhcyhuYW1lKSlcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW1hZ2VzLmdldChuYW1lKSE7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBJbWFnZSgpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtHYW1lT2JqZWN0fSBmcm9tIFwiLi4vR2FtZU9iamVjdC9HYW1lT2JqZWN0XCJcclxuaW1wb3J0IHsgU2NlbmUgfSBmcm9tIFwiLi4vU2NlbmUvU2NlbmVcIjtcclxuZXhwb3J0IGNsYXNzIEltYWdlT2JqZWN0IGV4dGVuZHMgR2FtZU9iamVjdHtcclxuICAgIGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50O1xyXG4gICAgZGVncmVlczogbnVtYmVyO1xyXG4gICAgY29uc3RydWN0b3Ioc2NlbmU6IFNjZW5lLCBrZXk6IHN0cmluZyl7XHJcbiAgICAgICAgc3VwZXIoc2NlbmUpO1xyXG4gICAgICAgIGlmKGtleT09XCJudWxsXCIpXHJcbiAgICAgICAgICAgIHRoaXMuaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICBlbHNlIHRoaXMuaW1hZ2UgPSB0aGlzLnNjZW5lLnNjZW5lTWFuYWdlci5nYW1lLmxvYWRlci5nZXRJbWFnZShrZXkpO1xyXG4gICAgICAgIHRoaXMuZGVncmVlcyA9IDA7XHJcbiAgICB9XHJcbiAgICBcclxufSIsImltcG9ydCB7U2NlbmVNYW5hZ2VyfSBmcm9tICcuLi9TY2VuZS9TY2VuZU1hbmFnZXInO1xyXG5pbXBvcnQge1JlbmRlcmVyfSBmcm9tICcuLi9SZW5kZXJlci9SZW5kZXJlcidcclxuZXhwb3J0IGNsYXNzIExpc3RlbklucHV0e1xyXG4gICAgaGFuZGxlSW5wdXQoc2NlbmVNYW5hZ2VyOiBTY2VuZU1hbmFnZXIsIHJlbmRlcjogUmVuZGVyZXIpe1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLChlKT0+c2NlbmVNYW5hZ2VyLnNjZW5lc1tzY2VuZU1hbmFnZXIuY3VycmVudFNjZW5lXS5wcm9jZXNzSW5wdXQub25LZXlEb3duKGUpKTtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsKGUpPT5zY2VuZU1hbmFnZXIuc2NlbmVzW3NjZW5lTWFuYWdlci5jdXJyZW50U2NlbmVdLnByb2Nlc3NJbnB1dC5vbktleVVwKCkpO1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsKGUpPT5zY2VuZU1hbmFnZXIuc2NlbmVzW3NjZW5lTWFuYWdlci5jdXJyZW50U2NlbmVdLnByb2Nlc3NJbnB1dC5vbk1vdXNlRG93bihlLHJlbmRlci5jYW52YXMpKTtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywoZSk9PnNjZW5lTWFuYWdlci5zY2VuZXNbc2NlbmVNYW5hZ2VyLmN1cnJlbnRTY2VuZV0ucHJvY2Vzc0lucHV0Lm9uTW91c2VVcCgpKTtcclxuICAgIH1cclxufSIsImV4cG9ydCBjbGFzcyBQcm9jZXNzSW5wdXR7XHJcbiAgICBpbnB1dEtleSA6IFN0cmluZztcclxuICAgIG1vdXNlRXZlbnQgOiBBcnJheTxudW1iZXI+IHwgbnVsbDtcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgdGhpcy5pbnB1dEtleSA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5tb3VzZUV2ZW50ID0gbnVsbDtcclxuICAgIH1cclxuICAgIG9uS2V5RG93bihlOiBLZXlib2FyZEV2ZW50KXtcclxuICAgICAgICB0aGlzLmlucHV0S2V5ID0gZS5jb2RlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuaW5wdXRLZXkpO1xyXG4gICAgfVxyXG4gICAgb25LZXlVcCgpe1xyXG4gICAgICAgIHRoaXMuaW5wdXRLZXkgPSBcIlwiO1xyXG4gICAgfVxyXG4gICAgb25Nb3VzZURvd24oZTogTW91c2VFdmVudCwgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCkge1xyXG4gICAgICAgIHZhciByZWN0ID0gY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgIHZhciBtb3VzZVggPSBlLmNsaWVudFggLSByZWN0LmxlZnQ7XHJcbiAgICAgICAgdmFyIG1vdXNlWSA9IGUuY2xpZW50WSAtIHJlY3QudG9wOyAgICBcclxuICAgICAgICB0aGlzLm1vdXNlRXZlbnQgPSBbbW91c2VYLCBtb3VzZVldO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMubW91c2VFdmVudCk7XHJcbiAgICB9XHJcbiAgICBvbk1vdXNlVXAoKSB7XHJcbiAgICAgICAgdGhpcy5tb3VzZUV2ZW50ID0gbnVsbDtcclxuICAgIH1cclxufSIsImltcG9ydCB7IEdhbWVPYmplY3QgfSBmcm9tIFwiLi4vR2FtZU9iamVjdC9HYW1lT2JqZWN0XCI7XHJcbmltcG9ydCB7IEltYWdlT2JqZWN0IH0gZnJvbSBcIi4uL0ltYWdlT2JqZWN0L0ltYWdlT2JqZWN0XCI7XHJcbmltcG9ydCB7IFNwcml0ZSB9IGZyb20gXCIuLi9TcHJpdGUvU3ByaXRlXCI7XHJcbmltcG9ydCB7IFRleHRPYmplY3QgfSBmcm9tIFwiLi4vVGV4dE9iamVjdC9UZXh0T2JqZWN0XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUmVuZGVyZXJ7XHJcbiAgICBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xyXG4gICAgY29uc3RydWN0b3IoY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCl7XHJcbiAgICAgICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XHJcbiAgICB9XHJcbiAgICBkcmF3SW1hZ2UoaW1hZ2VPYmplY3Q6IEltYWdlT2JqZWN0KXtcclxuICAgICAgICBjb25zdCBjdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgICAgIGlmKGN0eCE9bnVsbCl7XHJcbiAgICAgICAgICAgIGN0eC5zYXZlKCk7XHJcbiAgICAgICAgICAgIGN0eC50cmFuc2xhdGUoaW1hZ2VPYmplY3QueCArIGltYWdlT2JqZWN0LndpZHRoLzIsaW1hZ2VPYmplY3QueSArIGltYWdlT2JqZWN0LmhlaWdodC8yKVxyXG4gICAgICAgICAgICBjdHgucm90YXRlKGltYWdlT2JqZWN0LmRlZ3JlZXMqTWF0aC5QSS8xODApO1xyXG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKGltYWdlT2JqZWN0LmltYWdlLC1pbWFnZU9iamVjdC53aWR0aC8yLCAtaW1hZ2VPYmplY3QuaGVpZ2h0LzIsaW1hZ2VPYmplY3Qud2lkdGgsaW1hZ2VPYmplY3QuaGVpZ2h0KTtcclxuICAgICAgICAgICAgY3R4LnJlc3RvcmUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBkcmF3U3ByaXRlKHNwcml0ZTogU3ByaXRlKXtcclxuICAgICAgICBjb25zdCBjdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgICAgIGlmKGN0eCE9bnVsbCl7XHJcbiAgICAgICAgICAgIGN0eC5zYXZlKCk7XHJcbiAgICAgICAgICAgIGN0eC50cmFuc2xhdGUoc3ByaXRlLnggKyBzcHJpdGUud2lkdGgvMixzcHJpdGUueSArIHNwcml0ZS5oZWlnaHQvMilcclxuICAgICAgICAgICAgY3R4LnJvdGF0ZShzcHJpdGUuZGVncmVlcypNYXRoLlBJLzE4MCk7XHJcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2Uoc3ByaXRlLmltYWdlc1tzcHJpdGUuZnJhbWVDdXJyZW50XSwtc3ByaXRlLndpZHRoLzIsIC1zcHJpdGUuaGVpZ2h0LzIsc3ByaXRlLndpZHRoLHNwcml0ZS5oZWlnaHQpO1xyXG4gICAgICAgICAgICBjdHgucmVzdG9yZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGRyYXdUZXh0KHRleHQ6IFRleHRPYmplY3Qpe1xyXG4gICAgICAgIGNvbnN0IGN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICAgICAgaWYoY3R4IT1udWxsKXtcclxuICAgICAgICAgICAgY3R4LmZvbnQgPSB0ZXh0LmZvbnQ7XHJcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSB0ZXh0LmNvbG9yO1xyXG4gICAgICAgICAgICBjdHguZmlsbFRleHQodGV4dC5jb250ZW50LHRleHQueCx0ZXh0LnkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJPYmplY3QoZ2FtZU9iamVjdHM6IEdhbWVPYmplY3RbXSl7XHJcbiAgICAgICAgZ2FtZU9iamVjdHMuc29ydCgoYSxiKT0+e1xyXG4gICAgICAgICAgICByZXR1cm4gYS56X2luZGV4IC0gYi56X2luZGV4O1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPGdhbWVPYmplY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmKGdhbWVPYmplY3RzW2ldLmdldEFjdGl2ZSgpKXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG9iaiA9IGdhbWVPYmplY3RzW2ldOyBcclxuICAgICAgICAgICAgICAgIGlmKCBvYmogaW5zdGFuY2VvZiBJbWFnZU9iamVjdClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdJbWFnZShvYmopO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZihvYmogaW5zdGFuY2VvZiBTcHJpdGUpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3U3ByaXRlKG9iaik7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKG9iaiBpbnN0YW5jZW9mIFRleHRPYmplY3QpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3VGV4dChvYmopO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgSW1hZ2VPYmplY3QgfSBmcm9tIFwiLi4vSW1hZ2VPYmplY3QvSW1hZ2VPYmplY3RcIjtcclxuaW1wb3J0IHsgU3ByaXRlIH0gZnJvbSBcIi4uL1Nwcml0ZS9TcHJpdGVcIjtcclxuaW1wb3J0IHsgVGV4dE9iamVjdCB9IGZyb20gXCIuLi9UZXh0T2JqZWN0L1RleHRPYmplY3RcIjtcclxuaW1wb3J0IHtSZW5kZXJlcn0gZnJvbSBcIi4uL1JlbmRlcmVyL1JlbmRlcmVyXCI7XHJcbmltcG9ydCB7R2FtZU9iamVjdH0gZnJvbSBcIi4uL0dhbWVPYmplY3QvR2FtZU9iamVjdFwiO1xyXG5pbXBvcnQgeyBQcm9jZXNzSW5wdXQgfSBmcm9tIFwiLi4vUHJvY2Vzc0lucHV0L1Byb2Nlc3NJbnB1dFwiO1xyXG5pbXBvcnQgeyBDb2xsaXNpb24gfSBmcm9tIFwiLi4vQ29sbGlzaW9uL0NvbGxpc2lvblwiO1xyXG5pbXBvcnQgeyBTY2VuZU1hbmFnZXIgfSBmcm9tIFwiLi9TY2VuZU1hbmFnZXJcIjtcclxuZXhwb3J0IGNsYXNzIFNjZW5le1xyXG4gICAgZ2FtZU9iamVjdHM6IEdhbWVPYmplY3RbXTtcclxuICAgIHByb2Nlc3NJbnB1dDogUHJvY2Vzc0lucHV0O1xyXG4gICAgY29sbGlzaW9uOiBDb2xsaXNpb247XHJcbiAgICBzY2VuZU1hbmFnZXIgOiBTY2VuZU1hbmFnZXI7XHJcbiAgICBjb25zdHJ1Y3RvcihzY2VuZU1hbmFnZXIgOiBTY2VuZU1hbmFnZXIpe1xyXG4gICAgICAgIHRoaXMuZ2FtZU9iamVjdHMgPSBbXTtcclxuICAgICAgICB0aGlzLnByb2Nlc3NJbnB1dCA9IG5ldyBQcm9jZXNzSW5wdXQoKTtcclxuICAgICAgICB0aGlzLmNvbGxpc2lvbiA9IG5ldyBDb2xsaXNpb24oKTtcclxuICAgICAgICB0aGlzLnNjZW5lTWFuYWdlciA9IHNjZW5lTWFuYWdlcjtcclxuICAgIH1cclxuICAgIHJlc2V0U2NlbmUoKXtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8dGhpcy5nYW1lT2JqZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVPYmplY3RzW2ldLnJlc2V0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgYWRkQ2hpbGQoZ2FtZU9iamVjdHM6IEdhbWVPYmplY3RbXSl7XHJcbiAgICAgICAgZ2FtZU9iamVjdHMubWFwKChnYW1lT2JqZWN0KT0+e3RoaXMuZ2FtZU9iamVjdHMucHVzaChnYW1lT2JqZWN0KX0pXHJcbiAgICB9XHJcblxyXG4gICAgLy8geHUgbHkgbG9naWNcclxuICAgIHVwZGF0ZSh0aW1lOiBudW1iZXIsIGRlbHRhOiBudW1iZXIpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8dGhpcy5nYW1lT2JqZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgb2JqID0gdGhpcy5nYW1lT2JqZWN0c1tpXTtcclxuICAgICAgICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIEltYWdlT2JqZWN0IHx8IG9iaiBpbnN0YW5jZW9mIFNwcml0ZSlcclxuICAgICAgICAgICAgICAgIG9iai51cGRhdGUodGltZSwgZGVsdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCB7IFNjZW5lIH0gZnJvbSBcIi4vU2NlbmVcIjtcclxuaW1wb3J0IHtHYW1lfSBmcm9tIFwiLi4vQ29yZS9HYW1lXCI7XHJcbmV4cG9ydCBjbGFzcyBTY2VuZU1hbmFnZXIge1xyXG4gICAgc2NlbmVzOiBTY2VuZVtdO1xyXG4gICAgY3VycmVudFNjZW5lOiBudW1iZXI7XHJcbiAgICBnYW1lOiBHYW1lO1xyXG4gICAgY29uc3RydWN0b3IoZ2FtZTogR2FtZSl7XHJcbiAgICAgICAgdGhpcy5zY2VuZXMgPSBbXTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRTY2VuZSA9IDA7XHJcbiAgICAgICAgdGhpcy5nYW1lID0gZ2FtZTtcclxuICAgIH1cclxuICAgIGFkZFNjZW5lKHNjZW5lOiBTY2VuZSl7XHJcbiAgICAgICAgdGhpcy5zY2VuZXMucHVzaChzY2VuZSlcclxuICAgIH1cclxuICAgIHN3aXRjaFNjZW5lKG5leHRJbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5zY2VuZXNbdGhpcy5jdXJyZW50U2NlbmVdLnJlc2V0U2NlbmUoKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRTY2VuZSA9IG5leHRJbmRleDtcclxuICAgIH1cclxuICAgIHVwZGF0ZSgpe31cclxuICAgIHJlbmRlcigpe31cclxufSIsImltcG9ydCB7R2FtZU9iamVjdH0gZnJvbSBcIi4uL0dhbWVPYmplY3QvR2FtZU9iamVjdFwiXHJcbmltcG9ydCB7IFNjZW5lIH0gZnJvbSBcIi4uL1NjZW5lL1NjZW5lXCI7XHJcbmV4cG9ydCBjbGFzcyBTcHJpdGUgZXh0ZW5kcyBHYW1lT2JqZWN0e1xyXG4gICAgaW1hZ2VzOiBBcnJheTxIVE1MSW1hZ2VFbGVtZW50PjtcclxuICAgIGRlZ3JlZXM6IG51bWJlcjtcclxuICAgIGZyYW1lQ3VycmVudDogbnVtYmVyO1xyXG4gICAgcmF0ZTogbnVtYmVyO1xyXG4gICAgYWR0OiBudW1iZXI7XHJcbiAgICBjb25zdHJ1Y3RvcihzY2VuZTogU2NlbmUsaW1hZ2VzOiBBcnJheTxIVE1MSW1hZ2VFbGVtZW50Pil7XHJcbiAgICAgICAgc3VwZXIoc2NlbmUpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiaW1hZ2VzXCIsaW1hZ2VzKTtcclxuICAgICAgICB0aGlzLmltYWdlcyA9IGltYWdlcztcclxuICAgICAgICB0aGlzLmRlZ3JlZXMgPSAwO1xyXG4gICAgICAgIHRoaXMuZnJhbWVDdXJyZW50ID0gMDtcclxuICAgICAgICB0aGlzLnJhdGUgPSAwO1xyXG4gICAgICAgIHRoaXMuYWR0ID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBwbGF5QW5pbWF0aW9uKHRpbWU6IG51bWJlciwgZGVsdGFUaW1lOm51bWJlcikge1xyXG4gICAgICAgIHRoaXMuYWR0ICs9IGRlbHRhVGltZVxyXG4gICAgICAgIGlmKHRoaXMuYWR0Pj10aGlzLnJhdGUpe1xyXG4gICAgICAgICAgICB0aGlzLmFkdCAtPSB0aGlzLnJhdGU7XHJcbiAgICAgICAgICAgIHRoaXMuZnJhbWVDdXJyZW50ICs9MTtcclxuICAgICAgICAgICAgaWYodGhpcy5mcmFtZUN1cnJlbnQ+dGhpcy5pbWFnZXMubGVuZ3RoLTEpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mcmFtZUN1cnJlbnQgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtHYW1lT2JqZWN0fSBmcm9tIFwiLi4vR2FtZU9iamVjdC9HYW1lT2JqZWN0XCJcclxuaW1wb3J0IHsgU2NlbmUgfSBmcm9tIFwiLi4vU2NlbmUvU2NlbmVcIjtcclxuZXhwb3J0IGNsYXNzIFRleHRPYmplY3QgZXh0ZW5kcyBHYW1lT2JqZWN0e1xyXG4gICAgY29udGVudDogc3RyaW5nO1xyXG4gICAgZm9udDogc3RyaW5nO1xyXG4gICAgY29sb3I6IHN0cmluZztcclxuICAgIGNvbnN0cnVjdG9yKHNjZW5lOiBTY2VuZSkge1xyXG4gICAgICAgIHN1cGVyKHNjZW5lKTtcclxuICAgICAgICB0aGlzLmNvbnRlbnQgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuZm9udCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5jb2xvciA9IFwiXCI7XHJcbiAgICB9XHJcbiAgICBzZXRDb250ZW50KGNvbnRlbnQ6IHN0cmluZyl7XHJcbiAgICAgICAgdGhpcy5jb250ZW50ID0gY29udGVudDtcclxuICAgIH1cclxufSIsImltcG9ydCB7IFNwcml0ZSB9IGZyb20gXCIuLi9FbmdpbmUvU3ByaXRlL1Nwcml0ZVwiO1xyXG5cclxuaW1wb3J0IHtTY2VuZX0gZnJvbSBcIi4uL0VuZ2luZS9TY2VuZS9TY2VuZVwiXHJcbmV4cG9ydCBjbGFzcyBCaXJkIGV4dGVuZHMgU3ByaXRlIHtcclxuICAgIGdyYXZpdHkgOiBudW1iZXI7XHJcbiAgICBzcGVlZCA6IG51bWJlcjsgXHJcbiAgICBjb25zdHJ1Y3RvcihzY2VuZTogU2NlbmUpIHtcclxuICAgICAgICB2YXIgaW1hZ2VzOkFycmF5PEhUTUxJbWFnZUVsZW1lbnQ+ID0gW107XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJsb2FkZXJcIiwgc2NlbmUuZ2FtZS5sb2FkZXIpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDw4O2krKyl7XHJcbiAgICAgICAgICAgIGxldCBuYW1lID0gIFwiYmlyZFwiICsgaTtcclxuICAgICAgICAgICAgaW1hZ2VzLnB1c2goc2NlbmUuc2NlbmVNYW5hZ2VyLmdhbWUubG9hZGVyLmdldEltYWdlKG5hbWUpIGFzIEhUTUxJbWFnZUVsZW1lbnQpO1xyXG4gICAgICAgIH0gXHJcbiAgICAgICAgc3VwZXIoc2NlbmUsaW1hZ2VzKTtcclxuICAgICAgICB0aGlzLm5hbWUgPSBcImJpcmRcIjtcclxuICAgICAgICB0aGlzLmdyYXZpdHkgPSAwO1xyXG4gICAgICAgIHRoaXMuc3BlZWQgPSAwO1xyXG4gICAgICAgIHRoaXMucmF0ZSA9IDEuMC8zMCoxMDAwO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKHRpbWU6IG51bWJlciwgZGVsdGFUaW1lOm51bWJlcil7XHJcbiAgICAgICAgdGhpcy55ICs9ICh0aGlzLnNwZWVkICsgMC41KnRoaXMuZ3Jhdml0eSkqKGRlbHRhVGltZS8xNi42Nyk7XHJcbiAgICAgICAgdGhpcy5zcGVlZCArPSB0aGlzLmdyYXZpdHkqKGRlbHRhVGltZS8xNi42Nyk7XHJcbiAgICAgICAgaWYodGhpcy55IDwgMClcclxuICAgICAgICAgICAgdGhpcy55ID0gMDtcclxuICAgICAgICBpZih0aGlzLnNwZWVkPjApe1xyXG4gICAgICAgICAgICB0aGlzLmRlZ3JlZXMgKz0gMTtcclxuICAgICAgICAgICAgaWYodGhpcy5kZWdyZWVzPjQwKSB0aGlzLmRlZ3JlZXMgPSA0MDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5kZWdyZWVzIC09IDE7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZGVncmVlczwtMjApIHRoaXMuZGVncmVlcyA9IC0yMDtcclxuICAgICAgICAgICAgdGhpcy5wbGF5QW5pbWF0aW9uKHRpbWUsIGRlbHRhVGltZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZseSgpe1xyXG4gICAgICAgIHRoaXMuc3BlZWQgPSAtODtcclxuICAgIH1cclxuICAgIHJlc2V0KCl7XHJcbiAgICAgICAgc3VwZXIucmVzZXQoKTtcclxuICAgICAgICB0aGlzLnNwZWVkID0gMDtcclxuICAgIH1cclxufSIsImltcG9ydCB7IEltYWdlT2JqZWN0IH0gZnJvbSBcIi4uL0VuZ2luZS9JbWFnZU9iamVjdC9JbWFnZU9iamVjdFwiO1xyXG5pbXBvcnQge0dhbWV9IGZyb20gXCIuLi9FbmdpbmUvQ29yZS9HYW1lXCI7XHJcbmltcG9ydCB7IFNjZW5lIH0gZnJvbSBcIi4uL0VuZ2luZS9TY2VuZS9TY2VuZVwiO1xyXG5jbGFzcyBHcm91bmR7XHJcbiAgICBpbWFnZXM6IEFycmF5PEltYWdlT2JqZWN0PjtcclxuICAgIHNwZWVkOiBudW1iZXI7XHJcbiAgICBjb25zdHJ1Y3RvcihzY2VuZTogU2NlbmUgLHNwZWVkOiBudW1iZXIpe1xyXG4gICAgICAgIHZhciBpbWFnZU9iamVjdDEgPSBuZXcgSW1hZ2VPYmplY3Qoc2NlbmUsXCJncm91bmRcIik7XHJcbiAgICAgICAgaW1hZ2VPYmplY3QxLm5hbWUgPSBcImdyb3VuZFwiO1xyXG4gICAgICAgIGltYWdlT2JqZWN0MS56X2luZGV4ID0yO1xyXG4gICAgICAgIGltYWdlT2JqZWN0MS55ID0gNjcwO1xyXG4gICAgICAgIGltYWdlT2JqZWN0MS53aWR0aCA9IDY1MDtcclxuICAgICAgICBpbWFnZU9iamVjdDEuaGVpZ2h0ID0gMTUwO1xyXG4gICAgICAgIGltYWdlT2JqZWN0MS5kZWZhdWx0UG9zaXRpb249IFswLDY3MF07XHJcblxyXG4gICAgICAgIHZhciBpbWFnZU9iamVjdDIgPSBuZXcgSW1hZ2VPYmplY3Qoc2NlbmUsXCJncm91bmRcIik7XHJcbiAgICAgICAgaW1hZ2VPYmplY3QyLm5hbWUgPSBcImdyb3VuZFwiO1xyXG4gICAgICAgIGltYWdlT2JqZWN0Mi56X2luZGV4ID0yO1xyXG4gICAgICAgIGltYWdlT2JqZWN0Mi54ID0gNjQ5O1xyXG4gICAgICAgIGltYWdlT2JqZWN0Mi55ID0gNjcwO1xyXG4gICAgICAgIGltYWdlT2JqZWN0Mi53aWR0aCA9IDY1MDtcclxuICAgICAgICBpbWFnZU9iamVjdDIuaGVpZ2h0ID0gMTUwO1xyXG4gICAgICAgIGltYWdlT2JqZWN0Mi5kZWZhdWx0UG9zaXRpb249IFs2NDksNjcwXTtcclxuXHJcbiAgICAgICAgdGhpcy5pbWFnZXMgPSBbaW1hZ2VPYmplY3QxLGltYWdlT2JqZWN0Ml07XHJcbiAgICAgICAgdGhpcy5zcGVlZCA9IHNwZWVkO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKHRpbWU6IG51bWJlciwgZGVsdGFUaW1lOiBudW1iZXIpe1xyXG4gICAgICAgIGZvcih2YXIgaT0wO2k8dGhpcy5pbWFnZXMubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIHRoaXMuaW1hZ2VzW2ldLnggLT0gdGhpcy5zcGVlZCooZGVsdGFUaW1lLzE2LjY3KTtcclxuICAgICAgICAgICAgaWYodGhpcy5pbWFnZXNbaV0ueCA8IC0gKDY1MCkpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbWFnZXNbaV0ueCA9IHRoaXMuaW1hZ2VzW01hdGguYWJzKGktMSldLngrNjQ5O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBcclxuICAgIH1cclxuICAgIGdldENvbXBvbmVudCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmltYWdlcztcclxuICAgIH1cclxuICAgIHJlc2V0KCl7XHJcbiAgICAgICAgZm9yKHZhciBpPTA7aTx0aGlzLmltYWdlcy5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgdGhpcy5pbWFnZXNbaV0ucmVzZXQoKTtcclxuICAgICAgICB9IFxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge0dyb3VuZH07IiwiaW1wb3J0IHsgSW1hZ2VPYmplY3QgfSBmcm9tIFwiLi4vRW5naW5lL0ltYWdlT2JqZWN0L0ltYWdlT2JqZWN0XCI7XHJcbmltcG9ydCB7IFNjZW5lIH0gZnJvbSBcIi4uL0VuZ2luZS9TY2VuZS9TY2VuZVwiO1xyXG5jb25zdCBibGFua3MgPSAyMDA7XHJcbmNvbnN0IHBpcGVIZWlnaHQgPSAzNTA7XHJcbmNvbnN0IG51bVBpcGUgPSA0O1xyXG5jb25zdCBkaXN0YW5jZSA9IDMwMDtcclxuY29uc3QgcGlwZVdpZHRoID0gODA7XHJcbmNsYXNzIFBhaXJPZlBpcGV7XHJcbiAgICBQaXBlczogQXJyYXk8SW1hZ2VPYmplY3Q+O1xyXG4gICAgcHJpdmF0ZSBzcGVlZDogbnVtYmVyO1xyXG4gICAgY29uc3RydWN0b3Ioc2NlbmU6IFNjZW5lLHg6bnVtYmVyLCB5Om51bWJlcixzcGVlZDogbnVtYmVyKXtcclxuICAgICAgICB2YXIgUGlwZVVwID0gbmV3IEltYWdlT2JqZWN0KHNjZW5lLFwicGlwZVwiKTtcclxuICAgICAgICAvLyBzZXQgYXR0cmlidXRlc1xyXG4gICAgICAgIFBpcGVVcC54ID0geDtcclxuICAgICAgICBQaXBlVXAueSA9IHk7XHJcbiAgICAgICAgUGlwZVVwLndpZHRoID0gcGlwZVdpZHRoO1xyXG4gICAgICAgIFBpcGVVcC5oZWlnaHQgPSBwaXBlSGVpZ2h0O1xyXG4gICAgICAgIFBpcGVVcC5kZWdyZWVzID0gMTgwO1xyXG4gICAgICAgIFBpcGVVcC5uYW1lID0gXCJwaXBlXCI7XHJcbiAgICAgICAgUGlwZVVwLnpfaW5kZXggPSAxO1xyXG4gICAgICAgIC8vIHNldCBkZWZhdWx0UG9zaXRpb25cclxuICAgICAgICBQaXBlVXAuZGVmYXVsdFBvc2l0aW9uID0gW3gseV07XHJcblxyXG4gICAgICAgIHZhciBQaXBlRG93biA9IG5ldyBJbWFnZU9iamVjdChzY2VuZSxcInBpcGVcIik7XHJcbiAgICAgICAgLy8gc2V0IGF0dHJpYnV0ZXNcclxuICAgICAgICBQaXBlRG93bi54ID0geDtcclxuICAgICAgICBQaXBlRG93bi55ID0geStwaXBlSGVpZ2h0K2JsYW5rcztcclxuICAgICAgICBQaXBlRG93bi53aWR0aCA9IHBpcGVXaWR0aDtcclxuICAgICAgICBQaXBlRG93bi5oZWlnaHQgPSBwaXBlSGVpZ2h0O1xyXG4gICAgICAgIFBpcGVEb3duLm5hbWUgPSBcInBpcGVcIjtcclxuICAgICAgICBQaXBlRG93bi56X2luZGV4ID0gMTtcclxuICAgICAgICAvLyBzZXQgZGVmYXVsdFBvc2l0aW9uXHJcbiAgICAgICAgUGlwZURvd24uZGVmYXVsdFBvc2l0aW9uID0gW3gseStwaXBlSGVpZ2h0K2JsYW5rc107XHJcblxyXG4gICAgICAgIHZhciBjaGVja1Njb3JlID0gbmV3IEltYWdlT2JqZWN0KHNjZW5lLFwibnVsbFwiKTtcclxuICAgICAgICAvLyBzZXQgYXR0cmlidXRlc1xyXG4gICAgICAgIGNoZWNrU2NvcmUueCA9IHgrcGlwZVdpZHRoO1xyXG4gICAgICAgIGNoZWNrU2NvcmUueSA9IHkrcGlwZUhlaWdodDtcclxuICAgICAgICBjaGVja1Njb3JlLndpZHRoID0gMTA7XHJcbiAgICAgICAgY2hlY2tTY29yZS5oZWlnaHQgPSBibGFua3M7XHJcbiAgICAgICAgY2hlY2tTY29yZS5uYW1lID0gXCJjaGVja1Njb3JlXCI7XHJcbiAgICAgICAgY2hlY2tTY29yZS56X2luZGV4ID0gMTtcclxuICAgICAgICBjaGVja1Njb3JlLmRlZmF1bHRQb3NpdGlvbiA9IFt4K3BpcGVXaWR0aCx5K3BpcGVIZWlnaHRdO1xyXG5cclxuICAgICAgICB0aGlzLlBpcGVzPSBbUGlwZVVwLFBpcGVEb3duLGNoZWNrU2NvcmVdO1xyXG5cclxuICAgICAgICB0aGlzLnNwZWVkID0gc3BlZWQ7XHJcbiAgICB9XHJcbiAgICB1cGRhdGUodGltZTpudW1iZXIsIGRlbHRhVGltZTpudW1iZXIpe1xyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPDM7aSsrKXtcclxuICAgICAgICAgICAgdGhpcy5QaXBlc1tpXS54IC09IHRoaXMuc3BlZWQqKGRlbHRhVGltZS8xNi42Nyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmVzZXQoKXtcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwzO2krKyl7XHJcbiAgICAgICAgICAgIHRoaXMuUGlwZXNbaV0ucmVzZXQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZXRDb21wb25lbnQoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5QaXBlcztcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgTGlzdFBhaXJPZlBpcGVze1xyXG4gICAgbGlzdFBpcGU6IFBhaXJPZlBpcGVbXTtcclxuICAgIGNvbnN0cnVjdG9yKHNjZW5lOiBTY2VuZSl7XHJcbiAgICAgICAgdGhpcy5saXN0UGlwZSA9IFtdO1xyXG4gICAgICAgIGZvcih2YXIgaT0wO2k8bnVtUGlwZTtpKyspe1xyXG4gICAgICAgICAgICB2YXIgeCA9IGkqZGlzdGFuY2UgKyBwaXBlV2lkdGggKyA0MDA7XHJcbiAgICAgICAgICAgIHZhciB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICotMjAwKTtcclxuICAgICAgICAgICAgdmFyIHBpcGUgPSBuZXcgUGFpck9mUGlwZShzY2VuZSx4LHksNCk7XHJcbiAgICAgICAgICAgIHRoaXMubGlzdFBpcGUucHVzaChwaXBlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB1cGRhdGUoKXtcclxuICAgICAgICB0aGlzLmxpc3RQaXBlLm1hcCgocGlwZSxpbmRleCkgPT57XHJcbiAgICAgICAgICAgIGlmKHBpcGUuUGlwZXNbMF0ueDwtMTAwKXtcclxuICAgICAgICAgICAgICAgIHZhciBmcm9udEluZGV4ID0gaW5kZXggLTE7XHJcbiAgICAgICAgICAgICAgICBpZihmcm9udEluZGV4PDApIGZyb250SW5kZXggPSB0aGlzLmxpc3RQaXBlLmxlbmd0aC0xO1xyXG4gICAgICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8cGlwZS5QaXBlcy5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgICAgICAgICBwaXBlLlBpcGVzW2ldLnggPSB0aGlzLmxpc3RQaXBlW2Zyb250SW5kZXhdLlBpcGVzW2ldLnggKyBkaXN0YW5jZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7UGFpck9mUGlwZSwgTGlzdFBhaXJPZlBpcGVzfTtcclxuIiwiaW1wb3J0IHsgVGV4dE9iamVjdCB9IGZyb20gJy4uL0VuZ2luZS9UZXh0T2JqZWN0L1RleHRPYmplY3QnO1xyXG5pbXBvcnQge0J1dHRvbk9iamVjdCB9IGZyb20gJy4uL0VuZ2luZS9CdXR0b25PYmplY3QvQnV0dG9uT2JqZWN0JztcclxuaW1wb3J0IHsgSW1hZ2VPYmplY3QgfSBmcm9tICcuLi9FbmdpbmUvSW1hZ2VPYmplY3QvSW1hZ2VPYmplY3QnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFBhbmVsR2FtZU92ZXIge1xyXG4gICAgaW1nR2FtZU92ZXI6IEltYWdlT2JqZWN0O1xyXG4gICAgY3VycmVudFNjb3JlOiBUZXh0T2JqZWN0O1xyXG4gICAgaGlnaFNjb3JlOiBUZXh0T2JqZWN0O1xyXG4gICAgcmVwbGF5QnV0dG9uOiBCdXR0b25PYmplY3Q7XHJcbiAgICBjb25zdHJ1Y3RvcihpbWdHYW1lT3ZlcjogSW1hZ2VPYmplY3QsIGN1cnJlbnRTY29yZTogVGV4dE9iamVjdCwgaGlnaFNjb3JlOiBUZXh0T2JqZWN0LCByZXBsYXlCdXR0b246IEJ1dHRvbk9iamVjdCl7XHJcbiAgICAgICAgdGhpcy5pbWdHYW1lT3ZlciA9IGltZ0dhbWVPdmVyO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFNjb3JlID0gY3VycmVudFNjb3JlO1xyXG4gICAgICAgIHRoaXMuaGlnaFNjb3JlID0gaGlnaFNjb3JlO1xyXG4gICAgICAgIHRoaXMucmVwbGF5QnV0dG9uID0gcmVwbGF5QnV0dG9uO1xyXG4gICAgfVxyXG4gICAgc2V0QWN0aXZlKGFjdGl2ZTogYm9vbGVhbil7XHJcbiAgICAgICAgdGhpcy5pbWdHYW1lT3Zlci5zZXRBY3RpdmUoYWN0aXZlKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRTY29yZS5zZXRBY3RpdmUoYWN0aXZlKTtcclxuICAgICAgICB0aGlzLmhpZ2hTY29yZS5zZXRBY3RpdmUoYWN0aXZlKTtcclxuICAgICAgICB0aGlzLnJlcGxheUJ1dHRvbi5zZXRBY3RpdmUoYWN0aXZlKTtcclxuICAgIH1cclxuICAgIGdldENvbXBvbmVudCgpe1xyXG4gICAgICAgIHJldHVybiBbdGhpcy5pbWdHYW1lT3ZlciwgdGhpcy5yZXBsYXlCdXR0b24sIHRoaXMuY3VycmVudFNjb3JlLCB0aGlzLmhpZ2hTY29yZV07XHJcbiAgICB9XHJcbiAgICB1cGRhdGUoY3VycmVudFNjb3JlOiBudW1iZXIsIGhpZ2hTY29yZTogbnVtYmVyKXtcclxuICAgICAgICB0aGlzLmN1cnJlbnRTY29yZS5zZXRDb250ZW50KFwiU2NvcmU6IFwiICsgY3VycmVudFNjb3JlKTtcclxuICAgICAgICB0aGlzLmhpZ2hTY29yZS5zZXRDb250ZW50KFwiSGlnaCBTY29yZTogXCIgKyBoaWdoU2NvcmUpXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge1NjZW5lfSBmcm9tICcuLi9FbmdpbmUvU2NlbmUvU2NlbmUnO1xyXG5pbXBvcnQge0JpcmR9IGZyb20gJy4vQmlyZCc7XHJcbmltcG9ydCB7TGlzdFBhaXJPZlBpcGVzfSBmcm9tICcuL1BhaXJPZlBpcGUnO1xyXG5pbXBvcnQge1RleHRPYmplY3QgfSBmcm9tICcuLi9FbmdpbmUvVGV4dE9iamVjdC9UZXh0T2JqZWN0JztcclxuaW1wb3J0IHtJbWFnZU9iamVjdCB9IGZyb20gJy4uL0VuZ2luZS9JbWFnZU9iamVjdC9JbWFnZU9iamVjdCc7XHJcbmltcG9ydCB7U2NvcmV9IGZyb20gXCIuL1Njb3JlXCI7XHJcbmltcG9ydCB7R3JvdW5kIH0gZnJvbSAnLi9Hcm91bmQnO1xyXG5pbXBvcnQge1BhbmVsR2FtZU92ZXJ9IGZyb20gJy4vUGFuZWxHYW1lT3ZlcidcclxuaW1wb3J0IHtHYW1lfSBmcm9tICcuLi9FbmdpbmUvQ29yZS9HYW1lJ1xyXG5pbXBvcnQge0J1dHRvbk9iamVjdH0gZnJvbSAnLi4vRW5naW5lL0J1dHRvbk9iamVjdC9CdXR0b25PYmplY3QnO1xyXG5pbXBvcnQgeyBHYW1lT2JqZWN0IH0gZnJvbSAnLi4vRW5naW5lL0dhbWVPYmplY3QvR2FtZU9iamVjdCc7XHJcbmltcG9ydCB7IFNjZW5lTWFuYWdlciB9IGZyb20gJy4uL0VuZ2luZS9TY2VuZS9TY2VuZU1hbmFnZXInO1xyXG5cclxuY29uc3QgcG9pbnQgPSBuZXcgQXVkaW8oXCJhdWRpby9wb2ludC5tcDNcIik7XHJcbmNvbnN0IGRpZSA9IG5ldyBBdWRpbyhcImF1ZGlvL2RpZS5tcDNcIik7XHJcbmNvbnN0IGhpdCA9IG5ldyBBdWRpbyhcImF1ZGlvL2hpdC5tcDNcIik7XHJcbmNvbnN0IGF1ZGlvUGxheWVyID0gbmV3IEF1ZGlvKFwiYXVkaW8vb3JjaGVzdHJhd2F2LTI2MTU4Lm1wM1wiKTtcclxuY29uc3QgYXVkaW8gPSBuZXcgQXVkaW8oXCJhdWRpby9zd29vc2gubXAzXCIpO1xyXG5jb25zdCBCaXJkX1dpZHRoID0gNTA7XHJcbmNvbnN0IEJpcmRfSGVpZ2h0ID0gNTA7XHJcbmNvbnN0IEJpcmRfWCA9IDEwMDtcclxuY29uc3QgQmlyZF9ZID0gMjgwO1xyXG5cclxuZXhwb3J0IGNsYXNzIFBsYXlTY2VuZSBleHRlbmRzIFNjZW5lIHtcclxuICAgIGJpcmQ6IEJpcmQ7XHJcbiAgICBwaXBlczogTGlzdFBhaXJPZlBpcGVzO1xyXG4gICAgZ3JvdW5kOiBHcm91bmQ7XHJcbiAgICBjaGVja1BpcGU6IGJvb2xlYW47XHJcbiAgICB0ZXh0U2NvcmU6IFRleHRPYmplY3Q7XHJcbiAgICB0ZXh0RGVzY3JpcHRpb246IFRleHRPYmplY3Q7XHJcbiAgICBhZGRTY29yZTogbnVtYmVyIHwgbnVsbDtcclxuICAgIHNjb3JlOiBTY29yZTtcclxuICAgIGRlYWRCaXJkOiBib29sZWFuO1xyXG4gICAgcGFuZWxHYW1lT3ZlciA6IFBhbmVsR2FtZU92ZXI7XHJcbiAgICBzdGFydDogYm9vbGVhbjtcclxuICAgIHBhdXNlOiBib29sZWFuO1xyXG4gICAgY29uc3RydWN0b3Ioc2NlbmVNYW5hZ2VyIDogU2NlbmVNYW5hZ2VyKXtcclxuICAgICAgICBzdXBlcihzY2VuZU1hbmFnZXIpO1xyXG4gICAgICAgIC8vIHBsYXkgYXVkaW9cclxuICAgICAgICAvLyBhdWRpb1BsYXllci5wbGF5KCk7XHJcbiAgICAgICAgLy8gYXVkaW9QbGF5ZXIubG9vcCA9dHJ1ZTtcclxuICAgICAgICB0aGlzLmNoZWNrUGlwZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYWRkU2NvcmUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuZGVhZEJpcmQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnN0YXJ0ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5wYXVzZSA9IGZhbHNlOyBcclxuICAgICAgICB0aGlzLnNjb3JlID0gbmV3IFNjb3JlKCk7XHJcblxyXG4gICAgICAgIHRoaXMuYmlyZCA9ICBuZXcgQmlyZCh0aGlzKVxyXG4gICAgICAgIC8vIHNldCBhdHRyaWJ1dGVzXHJcbiAgICAgICAgdGhpcy5iaXJkLnggPSBCaXJkX1g7XHJcbiAgICAgICAgdGhpcy5iaXJkLnkgPSBCaXJkX1k7XHJcbiAgICAgICAgdGhpcy5iaXJkLndpZHRoID0gQmlyZF9XaWR0aDtcclxuICAgICAgICB0aGlzLmJpcmQuaGVpZ2h0ID0gQmlyZF9IZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5iaXJkLmdyYXZpdHkgPSAwLjU7XHJcbiAgICAgICAgdGhpcy5iaXJkLnNwZWVkID0gMjA7XHJcbiAgICAgICAgdGhpcy5iaXJkLnpfaW5kZXggPSAyO1xyXG4gICAgICAgIHRoaXMuYmlyZC5kZWZhdWx0UG9zaXRpb24gPSBbdGhpcy5iaXJkLngsIHRoaXMuYmlyZC55XTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnRleHREZXNjcmlwdGlvbiA9IG5ldyBUZXh0T2JqZWN0KHRoaXMpO1xyXG4gICAgICAgIC8vIHNldCBhdHRyaWJ1dGVzXHJcbiAgICAgICAgdGhpcy50ZXh0RGVzY3JpcHRpb24ueCA9IDE0MDtcclxuICAgICAgICB0aGlzLnRleHREZXNjcmlwdGlvbi55ID0gNDUwO1xyXG4gICAgICAgIHRoaXMudGV4dERlc2NyaXB0aW9uLmNvbnRlbnQgPSBcIlByZXNzIEVudGVyIHRvIGNvbnRpbnVlXCI7XHJcbiAgICAgICAgdGhpcy50ZXh0RGVzY3JpcHRpb24uZm9udCA9IFwiMzBweCBBcmlhbFwiO1xyXG4gICAgICAgIHRoaXMudGV4dERlc2NyaXB0aW9uLmNvbG9yID0gXCJ3aGl0ZVwiO1xyXG4gICAgICAgIHRoaXMudGV4dERlc2NyaXB0aW9uLnpfaW5kZXggPSAyO1xyXG4gICAgICAgIHRoaXMudGV4dERlc2NyaXB0aW9uLnNldEFjdGl2ZShmYWxzZSk7XHJcbiAgICAgICAgdGhpcy50ZXh0RGVzY3JpcHRpb24uZGVmYXVsdFBvc2l0aW9uID0gWzE0MCw0NTBdO1xyXG5cclxuICAgICAgICB0aGlzLnRleHRTY29yZSA9IG5ldyBUZXh0T2JqZWN0KHRoaXMpO1xyXG4gICAgICAgIHRoaXMudGV4dFNjb3JlLnggPSAxMDtcclxuICAgICAgICB0aGlzLnRleHRTY29yZS55ID0gMzA7XHJcbiAgICAgICAgdGhpcy50ZXh0U2NvcmUuY29udGVudCA9IFwiU2NvcmU6IFwiKyB0aGlzLnNjb3JlLmdldEN1cnJlbnRTY29yZSgpO1xyXG4gICAgICAgIHRoaXMudGV4dFNjb3JlLmZvbnQgPSBcIjE4cHggQXJpYWxcIjtcclxuICAgICAgICB0aGlzLnRleHRTY29yZS5jb2xvciA9IFwid2hpdGVcIjtcclxuICAgICAgICB0aGlzLnRleHRTY29yZS56X2luZGV4ID0gMjtcclxuICAgICAgICB0aGlzLnRleHRTY29yZS5kZWZhdWx0UG9zaXRpb24gPSBbMTAsMzBdO1xyXG5cclxuICAgICAgICB2YXIgYmcgPSBuZXcgSW1hZ2VPYmplY3QodGhpcyxcImJhY2tncm91bmRcIik7XHJcbiAgICAgICAgLy8gc2V0IGF0dHJpYnV0ZXNcclxuICAgICAgICBiZy53aWR0aCA9IDcwMDtcclxuICAgICAgICBiZy5oZWlnaHQgPSA4MDA7XHJcbiAgICAgICAgYmcubmFtZSA9IFwiYmFja2dyb3VuZFwiO1xyXG5cclxuICAgICAgICB0aGlzLmdyb3VuZCA9IG5ldyBHcm91bmQodGhpcyw0KTtcclxuICAgICAgICB0aGlzLnBpcGVzID0gbmV3IExpc3RQYWlyT2ZQaXBlcyh0aGlzKTtcclxuXHJcbiAgICAgICAgLy8gaW5pdCBwYW5lbEdhbWVPdmVyXHJcbiAgICAgICAgdmFyIGltZ0dhbWVPdmVyID0gbmV3IEltYWdlT2JqZWN0KHRoaXMsXCJnYW1lb3ZlclwiKTtcclxuICAgICAgICBpbWdHYW1lT3Zlci54ID0gNjA7XHJcbiAgICAgICAgaW1nR2FtZU92ZXIueSA9IDMwMDtcclxuICAgICAgICBpbWdHYW1lT3Zlci53aWR0aCA9IDUwMDtcclxuICAgICAgICBpbWdHYW1lT3Zlci5oZWlnaHQgPSAxMzA7XHJcbiAgICAgICAgaW1nR2FtZU92ZXIuel9pbmRleCA9IDM7XHJcbiAgICAgICAgaW1nR2FtZU92ZXIuZGVmYXVsdFBvc2l0aW9uID0gWzYwLDMwMF07XHJcblxyXG4gICAgICAgIHZhciB0ZXh0Q3VycmVudFNjb3JlID0gbmV3IFRleHRPYmplY3QodGhpcyk7XHJcbiAgICAgICAgdGV4dEN1cnJlbnRTY29yZS54ID0gMTEwO1xyXG4gICAgICAgIHRleHRDdXJyZW50U2NvcmUueSA9IDQ3MDtcclxuICAgICAgICB0ZXh0Q3VycmVudFNjb3JlLmNvbnRlbnQgPSBcIlNjb3JlOiAwXCI7XHJcbiAgICAgICAgdGV4dEN1cnJlbnRTY29yZS5mb250ID0gXCIzMHB4IEFyaWFsXCI7XHJcbiAgICAgICAgdGV4dEN1cnJlbnRTY29yZS5jb2xvciA9IFwid2hpdGVcIjtcclxuICAgICAgICB0ZXh0Q3VycmVudFNjb3JlLnpfaW5kZXggPSAzO1xyXG4gICAgICAgIHRleHRDdXJyZW50U2NvcmUuZGVmYXVsdFBvc2l0aW9uID0gWzExMCw0NzBdO1xyXG5cclxuICAgICAgICB2YXIgdGV4dEhpZ2hTY29yZSA9IG5ldyBUZXh0T2JqZWN0KHRoaXMpO1xyXG4gICAgICAgIHRleHRIaWdoU2NvcmUueCA9IDMzMDtcclxuICAgICAgICB0ZXh0SGlnaFNjb3JlLnkgPSA0NzA7XHJcbiAgICAgICAgdGV4dEhpZ2hTY29yZS5jb250ZW50ID0gXCJIaWdoIFNjb3JlOiAwXCI7XHJcbiAgICAgICAgdGV4dEhpZ2hTY29yZS5mb250ID0gXCIzMHB4IEFyaWFsXCI7XHJcbiAgICAgICAgdGV4dEhpZ2hTY29yZS5jb2xvciA9IFwid2hpdGVcIjtcclxuICAgICAgICB0ZXh0SGlnaFNjb3JlLnpfaW5kZXggPSAzO1xyXG4gICAgICAgIHRleHRIaWdoU2NvcmUuZGVmYXVsdFBvc2l0aW9uID0gWzMzMCw0NzBdXHJcblxyXG4gICAgICAgIHZhciBidXR0b25SZXBsYXkgPSBuZXcgQnV0dG9uT2JqZWN0KHRoaXMsXCJyZXBsYXlCdXR0b25cIik7XHJcbiAgICAgICAgYnV0dG9uUmVwbGF5LnggPSAyMjU7XHJcbiAgICAgICAgYnV0dG9uUmVwbGF5LnkgPSA1MDA7XHJcbiAgICAgICAgYnV0dG9uUmVwbGF5LndpZHRoID0gMTYwO1xyXG4gICAgICAgIGJ1dHRvblJlcGxheS5oZWlnaHQgPSA4MDtcclxuICAgICAgICBidXR0b25SZXBsYXkuel9pbmRleCA9IDM7XHJcbiAgICAgICAgYnV0dG9uUmVwbGF5LmRlZmF1bHRQb3NpdGlvbiA9IFsyMjUsNTAwXTtcclxuXHJcbiAgICAgICAgdGhpcy5wYW5lbEdhbWVPdmVyID0gbmV3IFBhbmVsR2FtZU92ZXIoXHJcbiAgICAgICAgICAgIGltZ0dhbWVPdmVyLHRleHRDdXJyZW50U2NvcmUsdGV4dEhpZ2hTY29yZSxidXR0b25SZXBsYXlcclxuICAgICAgICApO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIExpc3Qgb2YgR2FtZU9iamVjdFxyXG4gICAgICAgIHZhciBsaXN0R2FtZU9iamVjdCA6QXJyYXk8R2FtZU9iamVjdD4gPSBbYmcsdGhpcy5iaXJkLHRoaXMudGV4dFNjb3JlLCB0aGlzLnRleHREZXNjcmlwdGlvbl07XHJcbiAgICAgICAgbGlzdEdhbWVPYmplY3QgPSAgbGlzdEdhbWVPYmplY3QuY29uY2F0KHRoaXMuZ3JvdW5kLmdldENvbXBvbmVudCgpKTtcclxuICAgICAgICBsaXN0R2FtZU9iamVjdCA9IGxpc3RHYW1lT2JqZWN0LmNvbmNhdCh0aGlzLnBhbmVsR2FtZU92ZXIuZ2V0Q29tcG9uZW50KCkpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGZvcih2YXIgaT0wO2k8dGhpcy5waXBlcy5saXN0UGlwZS5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgdmFyIHBpcGUgPSB0aGlzLnBpcGVzLmxpc3RQaXBlW2ldO1xyXG4gICAgICAgICAgICBsaXN0R2FtZU9iamVjdCA9IGxpc3RHYW1lT2JqZWN0LmNvbmNhdChwaXBlLmdldENvbXBvbmVudCgpKVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyhcImxpc3RHYW1lT2JqZWN0XCIsbGlzdEdhbWVPYmplY3QpXHJcbiAgICAgICAgdGhpcy5hZGRDaGlsZChsaXN0R2FtZU9iamVjdCk7XHJcbiAgICAgICAgLy8gaGlkZW4gcGFuZWxHYW1lT3ZlclxyXG4gICAgICAgIHRoaXMucGFuZWxHYW1lT3Zlci5zZXRBY3RpdmUoZmFsc2UpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICB1cGRhdGUodGltZTogbnVtYmVyLCBkZWx0YVRpbWU6IG51bWJlcikge1xyXG4gICAgICAgIGlmKCAhdGhpcy5kZWFkQmlyZCAmJiB0aGlzLnN0YXJ0ICYmICF0aGlzLnBhdXNlKXtcclxuICAgICAgICAgICAgaWYodGhpcy5wcm9jZXNzSW5wdXQuaW5wdXRLZXkgPT09IFwiS2V5QVwiKXtcclxuICAgICAgICAgICAgICAgIHRoaXMucGF1c2UgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0RGVzY3JpcHRpb24uc2V0QWN0aXZlKHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBwaXBlcyA9IHRoaXMuZ2FtZU9iamVjdHMuZmlsdGVyKChpbWIpPT57XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaW1iLm5hbWUgPT09IFwicGlwZVwiO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHZhciBjaGVja1Njb3JlID0gdGhpcy5nYW1lT2JqZWN0cy5maWx0ZXIoKGltYik9PntcclxuICAgICAgICAgICAgICAgIHJldHVybiBpbWIubmFtZSA9PT0gXCJjaGVja1Njb3JlXCI7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHRoaXMuZ3JvdW5kLnVwZGF0ZSh0aW1lLCBkZWx0YVRpbWUpO1xyXG4gICAgICAgICAgICBmb3IodmFyIGogPSAwOyBqIDwgcGlwZXMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuY29sbGlzaW9uLmhhbmRsZUNvbGxpc2lvbihwaXBlc1tqXSx0aGlzLmJpcmQpKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrUGlwZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJnYW1lIG92ZXIhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgY2hlY2tTY29yZS5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5jb2xsaXNpb24uaGFuZGxlQ29sbGlzaW9uKGNoZWNrU2NvcmVba10sdGhpcy5iaXJkKSYmIHRoaXMuYWRkU2NvcmUgIT0gayl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY29yZS5zZXRDdXJyZW50U2NvcmUodGhpcy5zY29yZS5nZXRDdXJyZW50U2NvcmUoKSsxKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRleHRTY29yZS5jb250ZW50ID0gXCJTY29yZTogXCIgKyB0aGlzLnNjb3JlLmdldEN1cnJlbnRTY29yZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkU2NvcmUgPSBrO1xyXG4gICAgICAgICAgICAgICAgICAgIHBvaW50LnBsYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnBpcGVzLmxpc3RQaXBlLm1hcCgocGlwZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcGlwZS51cGRhdGUodGltZSwgZGVsdGFUaW1lKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMucGlwZXMudXBkYXRlKCk7XHJcblxyXG4gICAgICAgICAgICBpZih0aGlzLnByb2Nlc3NJbnB1dC5pbnB1dEtleT09PVwiU3BhY2VcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iaXJkLmZseSgpO1xyXG4gICAgICAgICAgICAgICAgYXVkaW8ucGxheSgpOyBcclxuICAgICAgICAgICAgICAgIGF1ZGlvLnBsYXliYWNrUmF0ZSA9IDI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gdmEgY2hhbSBncm91bmRcclxuICAgICAgICAgICAgaWYodGhpcy5jb2xsaXNpb24uaGFuZGxlQ29sbGlzaW9uKHRoaXMuZ3JvdW5kLmdldENvbXBvbmVudCgpWzBdLCB0aGlzLmJpcmQpfHx0aGlzLmNvbGxpc2lvbi5oYW5kbGVDb2xsaXNpb24odGhpcy5ncm91bmQuZ2V0Q29tcG9uZW50KClbMV0sIHRoaXMuYmlyZCl8fHRoaXMuY2hlY2tQaXBlKXtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuc2NvcmUuZ2V0Q3VycmVudFNjb3JlKCk+IHRoaXMuc2NvcmUuZ2V0SGlnaFNjb3JlKCkpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY29yZS5zZXRIaWdoU2NvcmUodGhpcy5zY29yZS5nZXRDdXJyZW50U2NvcmUoKSk7XHJcbiAgICAgICAgICAgICAgICAvLyB1cGRhdGUgc2NvcmVcclxuICAgICAgICAgICAgICAgIHRoaXMucGFuZWxHYW1lT3Zlci51cGRhdGUodGhpcy5zY29yZS5nZXRDdXJyZW50U2NvcmUoKSwgdGhpcy5zY29yZS5nZXRIaWdoU2NvcmUoKSk7XHJcbiAgICAgICAgICAgICAgICAvLyBzZXQgc3RhdGUgYmlyZCBpcyBkaWVcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVhZEJpcmQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgLy8gcGxheSBhdWRpb1xyXG4gICAgICAgICAgICAgICAgYXVkaW9QbGF5ZXIucGF1c2UoKTtcclxuICAgICAgICAgICAgICAgIGhpdC5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+e1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHNob3cgcGFuZWxHYW1lT3ZlclxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFuZWxHYW1lT3Zlci5zZXRBY3RpdmUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGllLnBsYXkoKTtcclxuICAgICAgICAgICAgICAgIH0sIDUwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3VwZXIudXBkYXRlKHRpbWUsIGRlbHRhVGltZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodGhpcy5kZWFkQmlyZCl7XHJcbiAgICAgICAgICAgIGlmKCF0aGlzLmNvbGxpc2lvbi5oYW5kbGVDb2xsaXNpb24odGhpcy5ncm91bmQuZ2V0Q29tcG9uZW50KClbMF0sIHRoaXMuYmlyZCkmJiF0aGlzLmNvbGxpc2lvbi5oYW5kbGVDb2xsaXNpb24odGhpcy5ncm91bmQuZ2V0Q29tcG9uZW50KClbMV0sIHRoaXMuYmlyZCkpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iaXJkLnNwZWVkICA9IDEwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iaXJkLnVwZGF0ZSh0aW1lLCBkZWx0YVRpbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKCh0aGlzLnByb2Nlc3NJbnB1dC5pbnB1dEtleSA9PT0gXCJFbnRlclwifHx0aGlzLnByb2Nlc3NJbnB1dC5tb3VzZUV2ZW50IT1udWxsJiYgdGhpcy5wYW5lbEdhbWVPdmVyLnJlcGxheUJ1dHRvbi5pc0luc2lkZSh0aGlzLnByb2Nlc3NJbnB1dC5tb3VzZUV2ZW50KSkpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZWFkQmlyZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYW5lbEdhbWVPdmVyLnNldEFjdGl2ZShmYWxzZSk7IFxyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2VuZU1hbmFnZXIuc3dpdGNoU2NlbmUoMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZighdGhpcy5zdGFydCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMucHJvY2Vzc0lucHV0LmlucHV0S2V5ID09PSBcIlNwYWNlXCIpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5wYXVzZSl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMucHJvY2Vzc0lucHV0LmlucHV0S2V5ID09PSBcIkVudGVyXCIpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXVzZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0RGVzY3JpcHRpb24uc2V0QWN0aXZlKGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJlc2V0U2NlbmUoKXtcclxuICAgICAgICAvLyBhdWRpb1BsYXllci5wbGF5KCk7XHJcbiAgICAgICAgLy8gYXVkaW9QbGF5ZXIubG9vcCA9dHJ1ZTtcclxuICAgICAgICB0aGlzLmNoZWNrUGlwZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYWRkU2NvcmUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuc3RhcnQgPSBmYWxzZTtcclxuICAgICAgICBzdXBlci5yZXNldFNjZW5lKCk7XHJcbiAgICAgICAgdGhpcy5zY29yZS5zZXRDdXJyZW50U2NvcmUoMCk7XHJcbiAgICAgICAgdGhpcy50ZXh0U2NvcmUuc2V0Q29udGVudChcIlNjb3JlOiAwXCIpO1xyXG4gICAgICAgIHRoaXMuYmlyZC5yZXNldCgpO1xyXG4gICAgICAgIHRoaXMuZ3JvdW5kLnJlc2V0KCk7XHJcbiAgICAgICAgZm9yKHZhciBpPTA7aTx0aGlzLnBpcGVzLmxpc3RQaXBlLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICB0aGlzLnBpcGVzLmxpc3RQaXBlW2ldLnJlc2V0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwicmVzZXQgcmVuZGVyaW5nXCIpO1xyXG4gICAgfVxyXG59XHJcbiIsImNsYXNzIFNjb3Jle1xyXG4gICAgcHJpdmF0ZSBoaWdoU2NvcmU6IG51bWJlcjtcclxuICAgIHByaXZhdGUgY3VycmVudFNjb3JlOiBudW1iZXI7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMuaGlnaFNjb3JlID0gMDtcclxuICAgICAgICB0aGlzLmN1cnJlbnRTY29yZSA9IDA7XHJcbiAgICB9XHJcbiAgICBzZXRDdXJyZW50U2NvcmUoc2NvcmU6IG51bWJlcil7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50U2NvcmUgPSBzY29yZTtcclxuICAgIH1cclxuICAgIGdldEN1cnJlbnRTY29yZSgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRTY29yZTtcclxuICAgIH1cclxuICAgIGdldEhpZ2hTY29yZSgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmhpZ2hTY29yZTtcclxuICAgIH1cclxuICAgIHNldEhpZ2hTY29yZShoaWdoU2NvcmU6IG51bWJlcil7XHJcbiAgICAgICAgdGhpcy5oaWdoU2NvcmUgPSBoaWdoU2NvcmU7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IHtTY29yZX07IiwiaW1wb3J0IHtTY2VuZX0gZnJvbSAnLi4vRW5naW5lL1NjZW5lL1NjZW5lJztcclxuaW1wb3J0IHsgSW1hZ2VPYmplY3QgfSBmcm9tICcuLi9FbmdpbmUvSW1hZ2VPYmplY3QvSW1hZ2VPYmplY3QnO1xyXG5pbXBvcnQgeyBCdXR0b25PYmplY3QgfSBmcm9tICcuLi9FbmdpbmUvQnV0dG9uT2JqZWN0L0J1dHRvbk9iamVjdCc7XHJcbmltcG9ydCB7R3JvdW5kfSBmcm9tIFwiLi9Hcm91bmRcIlxyXG5pbXBvcnQgeyBTY2VuZU1hbmFnZXIgfSBmcm9tICcuLi9FbmdpbmUvU2NlbmUvU2NlbmVNYW5hZ2VyJztcclxuXHJcbmV4cG9ydCBjbGFzcyBTdGFydFNjZW5lIGV4dGVuZHMgU2NlbmUge1xyXG4gICAgYmFja2dyb3VuZDogSW1hZ2VPYmplY3Q7XHJcbiAgICBncm91bmQ6IEdyb3VuZDtcclxuICAgIGltZ1N0YXJ0OiBJbWFnZU9iamVjdDtcclxuICAgIGJ1dHRvblN0YXJ0OiBCdXR0b25PYmplY3RcclxuICAgIGNvbnN0cnVjdG9yKHNjZW5lTWFuYWdlciA6IFNjZW5lTWFuYWdlcil7XHJcbiAgICAgICAgc3VwZXIoc2NlbmVNYW5hZ2VyKTtcclxuICAgICAgICB0aGlzLmJhY2tncm91bmQgPW5ldyBJbWFnZU9iamVjdCh0aGlzLFwiYmFja2dyb3VuZFwiKTtcclxuICAgICAgICAvLyBzZXQgYXR0cmlidXRlc1xyXG4gICAgICAgIHRoaXMuYmFja2dyb3VuZC53aWR0aCA9IDcwMDtcclxuICAgICAgICB0aGlzLmJhY2tncm91bmQuaGVpZ2h0ID0gODAwO1xyXG4gICAgICAgIHRoaXMuYmFja2dyb3VuZC5uYW1lID0gXCJiYWNrZ3JvdW5kXCJcclxuXHJcbiAgICAgICAgdGhpcy5pbWdTdGFydCA9IG5ldyBJbWFnZU9iamVjdCh0aGlzLFwibWVzc2FnZVwiKTtcclxuICAgICAgICAvLyBzZXQgYXR0cmlidXRlc1xyXG4gICAgICAgIHRoaXMuaW1nU3RhcnQud2lkdGggPTUwMCxcclxuICAgICAgICB0aGlzLmltZ1N0YXJ0LmhlaWdodCA9IDcwMDtcclxuICAgICAgICB0aGlzLmltZ1N0YXJ0LnggPSA1MDtcclxuICAgICAgICB0aGlzLmltZ1N0YXJ0LnkgPSAyMDtcclxuICAgICAgICB0aGlzLmltZ1N0YXJ0LnpfaW5kZXggPSAyO1xyXG5cclxuICAgICAgICB0aGlzLmJ1dHRvblN0YXJ0ID0gbmV3IEJ1dHRvbk9iamVjdCh0aGlzLFwibnVsbFwiKTtcclxuICAgICAgICAvLyBzZXQgYXR0cmlidXRlc1xyXG4gICAgICAgIHRoaXMuYnV0dG9uU3RhcnQud2lkdGggPSA3MDA7XHJcbiAgICAgICAgdGhpcy5idXR0b25TdGFydC5oZWlnaHQgPSA4MDA7XHJcbiAgICAgICAgdGhpcy5idXR0b25TdGFydC5uYW1lID0gXCJidXR0b25TdGFydFwiO1xyXG5cclxuICAgICAgICB0aGlzLmdyb3VuZCA9IG5ldyBHcm91bmQodGhpcywyKVxyXG4gICAgICAgIHZhciBpbWFnZU9iamVjdHMgPSBbdGhpcy5iYWNrZ3JvdW5kXS5jb25jYXQodGhpcy5ncm91bmQuZ2V0Q29tcG9uZW50KCkpO1xyXG4gICAgICAgIGltYWdlT2JqZWN0cy5wdXNoKHRoaXMuaW1nU3RhcnQpO1xyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQoaW1hZ2VPYmplY3RzKTtcclxuICAgIH1cclxuICAgIHVwZGF0ZSh0aW1lOiBudW1iZXIsIGRlbHRhVGltZTogbnVtYmVyKXtcclxuICAgICAgICB0aGlzLmdyb3VuZC51cGRhdGUodGltZSwgZGVsdGFUaW1lKTtcclxuICAgICAgICBpZih0aGlzLnByb2Nlc3NJbnB1dC5pbnB1dEtleSA9PT0gXCJFbnRlclwifHx0aGlzLnByb2Nlc3NJbnB1dC5pbnB1dEtleSA9PT0gXCJTcGFjZVwiIHx8KHRoaXMucHJvY2Vzc0lucHV0Lm1vdXNlRXZlbnQhPW51bGwgJiYgdGhpcy5idXR0b25TdGFydC5pc0luc2lkZSh0aGlzLnByb2Nlc3NJbnB1dC5tb3VzZUV2ZW50KSkpIHtcclxuICAgICAgICAgICAgdGhpcy5zY2VuZU1hbmFnZXIuc3dpdGNoU2NlbmUoMSlcclxuICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxufVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IFN0YXJ0U2NlbmUgfSBmcm9tIFwiLi9nYW1lL1N0YXJ0U2NlbmVcIjtcclxuaW1wb3J0IHsgUmVuZGVyZXIgfSBmcm9tIFwiLi9FbmdpbmUvUmVuZGVyZXIvUmVuZGVyZXJcIjtcclxuaW1wb3J0IHsgU2NlbmVNYW5hZ2VyIH0gZnJvbSBcIi4vRW5naW5lL1NjZW5lL1NjZW5lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBHYW1lIH0gZnJvbSBcIi4vRW5naW5lL0NvcmUvR2FtZVwiOyAgXHJcbmltcG9ydCB7UGxheVNjZW5lfSBmcm9tIFwiLi9nYW1lL1BsYXlTY2VuZVwiO1xyXG5cclxudmFyIGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdteUNhbnZhcycpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xyXG52YXIgbXlHYW1lID0gbmV3IEdhbWUoKTtcclxudmFyIHJlbmRlciA9IG5ldyBSZW5kZXJlcihjYW52YXMpXHJcbnZhciBnYW1lU2NlbmUgPSBuZXcgU2NlbmVNYW5hZ2VyKG15R2FtZSk7XHJcblxyXG5jb25zdCBpbWFnZXNMb2FkID0gW1xyXG4gICAge1xyXG4gICAgICAgIFwia2V5XCI6IFwiYmlyZDBcIixcclxuICAgICAgICBcInBhdGhcIjogXCJJbWFnZXMvYmlyZC9mcmFtZS0xLnBuZ1wiLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImtleVwiOiBcImJpcmQxXCIsXHJcbiAgICAgICAgXCJwYXRoXCI6IFwiSW1hZ2VzL2JpcmQvZnJhbWUtMi5wbmdcIixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJrZXlcIjogXCJiaXJkMlwiLFxyXG4gICAgICAgIFwicGF0aFwiOiBcIkltYWdlcy9iaXJkL2ZyYW1lLTMucG5nXCIsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwia2V5XCI6IFwiYmlyZDNcIixcclxuICAgICAgICBcInBhdGhcIjogXCJJbWFnZXMvYmlyZC9mcmFtZS00LnBuZ1wiLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImtleVwiOiBcImJpcmQ0XCIsXHJcbiAgICAgICAgXCJwYXRoXCI6IFwiSW1hZ2VzL2JpcmQvZnJhbWUtNS5wbmdcIixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJrZXlcIjogXCJiaXJkNVwiLFxyXG4gICAgICAgIFwicGF0aFwiOiBcIkltYWdlcy9iaXJkL2ZyYW1lLTYucG5nXCIsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwia2V5XCI6IFwiYmlyZDZcIixcclxuICAgICAgICBcInBhdGhcIjogXCJJbWFnZXMvYmlyZC9mcmFtZS03LnBuZ1wiLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImtleVwiOiBcImJpcmQ3XCIsXHJcbiAgICAgICAgXCJwYXRoXCI6IFwiSW1hZ2VzL2JpcmQvZnJhbWUtOC5wbmdcIixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJrZXlcIjogXCJwaXBlXCIsXHJcbiAgICAgICAgXCJwYXRoXCI6IFwiSW1hZ2VzL3BpcGUvcGlwZS1ncmVlbi5wbmdcIixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJrZXlcIjogXCJtZXNzYWdlXCIsXHJcbiAgICAgICAgXCJwYXRoXCI6IFwiSW1hZ2VzL2dhbWVTdGFydC9tZXNzYWdlLnBuZ1wiLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImtleVwiOiBcImdyb3VuZFwiLFxyXG4gICAgICAgIFwicGF0aFwiOiBcIkltYWdlcy9ncm91bmQvYmFzZS5wbmdcIixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJrZXlcIjogXCJnYW1lb3ZlclwiLFxyXG4gICAgICAgIFwicGF0aFwiOiBcIkltYWdlcy9wYW5lbEdhbWVPdmVyL2dhbWVvdmVyLnBuZ1wiLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImtleVwiOiBcInJlcGxheUJ1dHRvblwiLFxyXG4gICAgICAgIFwicGF0aFwiOiBcIkltYWdlcy9wYW5lbEdhbWVPdmVyL3JlcGxheS1idXR0b24ucG5nXCIsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwia2V5XCI6IFwiYmFja2dyb3VuZFwiLFxyXG4gICAgICAgIFwicGF0aFwiOiBcIkltYWdlcy9iYWNrZ3JvdW5kL2JhY2tncm91bmQtbmlnaHQucG5nXCJcclxuICAgIH1cclxuXVxyXG5cclxuY29uc3QgcHJvbWlzZXMgPSBpbWFnZXNMb2FkLm1hcCgoaW1hZ2UpID0+IG15R2FtZS5sb2FkZXIuYWRkSW1hZ2UoaW1hZ2VbXCJwYXRoXCJdLCBpbWFnZVtcImtleVwiXSkpXHJcblByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKCgpPT4ge1xyXG4gICAgdmFyIHN0YXJ0U2NlbmUgPSBuZXcgU3RhcnRTY2VuZShnYW1lU2NlbmUpO1xyXG4gICAgdmFyIHBsYXlTY2VuZSA9IG5ldyBQbGF5U2NlbmUoZ2FtZVNjZW5lKTtcclxuICAgIGdhbWVTY2VuZS5hZGRTY2VuZShzdGFydFNjZW5lKTtcclxuICAgIGdhbWVTY2VuZS5hZGRTY2VuZShwbGF5U2NlbmUpO1xyXG4gICAgbXlHYW1lLnN0YXJ0KHJlbmRlciwgZ2FtZVNjZW5lKTtcclxufSkuY2F0Y2goKGVycm9yKSA9PiB7Y29uc29sZS5sb2coZXJyb3IpfSlcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9