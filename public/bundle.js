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
    constructor() {
        this.lastTime = 0;
        this.listenInput = new _ProcessInput_ListenInput__WEBPACK_IMPORTED_MODULE_0__.ListenInput();
        this.loader = new _ImageLoader_ImageLoader__WEBPACK_IMPORTED_MODULE_1__.ImageLoader();
    }
    start(render, sceneManager) {
        this.sceneManager = sceneManager;
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
    constructor(sceneManager) {
        this.gameObjects = [];
        this.processInput = new _ProcessInput_ProcessInput__WEBPACK_IMPORTED_MODULE_3__.ProcessInput();
        this.collision = new _Collision_Collision__WEBPACK_IMPORTED_MODULE_4__.Collision();
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
                this.bird.speed = 100;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzlCLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQ3BDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLEdBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VlazEvLi9zcmMvRW5naW5lL0J1dHRvbk9iamVjdC9CdXR0b25PYmplY3QudHMiLCJ3ZWJwYWNrOi8vd2VlazEvLi9zcmMvRW5naW5lL0NvbGxpc2lvbi9Db2xsaXNpb24udHMiLCJ3ZWJwYWNrOi8vd2VlazEvLi9zcmMvRW5naW5lL0NvcmUvR2FtZS50cyIsIndlYnBhY2s6Ly93ZWVrMS8uL3NyYy9FbmdpbmUvR2FtZU9iamVjdC9HYW1lT2JqZWN0LnRzIiwid2VicGFjazovL3dlZWsxLy4vc3JjL0VuZ2luZS9JbWFnZUxvYWRlci9JbWFnZUxvYWRlci50cyIsIndlYnBhY2s6Ly93ZWVrMS8uL3NyYy9FbmdpbmUvSW1hZ2VPYmplY3QvSW1hZ2VPYmplY3QudHMiLCJ3ZWJwYWNrOi8vd2VlazEvLi9zcmMvRW5naW5lL1Byb2Nlc3NJbnB1dC9MaXN0ZW5JbnB1dC50cyIsIndlYnBhY2s6Ly93ZWVrMS8uL3NyYy9FbmdpbmUvUHJvY2Vzc0lucHV0L1Byb2Nlc3NJbnB1dC50cyIsIndlYnBhY2s6Ly93ZWVrMS8uL3NyYy9FbmdpbmUvUmVuZGVyZXIvUmVuZGVyZXIudHMiLCJ3ZWJwYWNrOi8vd2VlazEvLi9zcmMvRW5naW5lL1NjZW5lL1NjZW5lLnRzIiwid2VicGFjazovL3dlZWsxLy4vc3JjL0VuZ2luZS9TY2VuZS9TY2VuZU1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vd2VlazEvLi9zcmMvRW5naW5lL1Nwcml0ZS9TcHJpdGUudHMiLCJ3ZWJwYWNrOi8vd2VlazEvLi9zcmMvRW5naW5lL1RleHRPYmplY3QvVGV4dE9iamVjdC50cyIsIndlYnBhY2s6Ly93ZWVrMS8uL3NyYy9nYW1lL0JpcmQudHMiLCJ3ZWJwYWNrOi8vd2VlazEvLi9zcmMvZ2FtZS9Hcm91bmQudHMiLCJ3ZWJwYWNrOi8vd2VlazEvLi9zcmMvZ2FtZS9QYWlyT2ZQaXBlLnRzIiwid2VicGFjazovL3dlZWsxLy4vc3JjL2dhbWUvUGFuZWxHYW1lT3Zlci50cyIsIndlYnBhY2s6Ly93ZWVrMS8uL3NyYy9nYW1lL1BsYXlTY2VuZS50cyIsIndlYnBhY2s6Ly93ZWVrMS8uL3NyYy9nYW1lL1Njb3JlLnRzIiwid2VicGFjazovL3dlZWsxLy4vc3JjL2dhbWUvU3RhcnRTY2VuZS50cyIsIndlYnBhY2s6Ly93ZWVrMS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWVrMS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VlazEvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWVrMS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlZWsxLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEltYWdlT2JqZWN0fSBmcm9tIFwiLi4vSW1hZ2VPYmplY3QvSW1hZ2VPYmplY3RcIjtcclxuaW1wb3J0IHsgU2NlbmUgfSBmcm9tIFwiLi4vU2NlbmUvU2NlbmVcIjtcclxuZXhwb3J0IGNsYXNzIEJ1dHRvbk9iamVjdCBleHRlbmRzIEltYWdlT2JqZWN0e1xyXG4gICAgY29uc3RydWN0b3Ioc2NlbmU6IFNjZW5lLCBrZXk6IHN0cmluZyl7XHJcbiAgICAgICAgc3VwZXIoc2NlbmUsa2V5KTtcclxuICAgIH1cclxuICAgIGlzSW5zaWRlKHBvczogQXJyYXk8bnVtYmVyPil7XHJcbiAgICAgICAgaWYocG9zLmxlbmd0aCA8IDIpIHJldHVybiBmYWxzZTtcclxuICAgICAgICByZXR1cm4gcG9zWzBdID4gdGhpcy54ICYmIHBvc1swXSA8IHRoaXMueCt0aGlzLndpZHRoICYmIHBvc1sxXSA8IHRoaXMueSt0aGlzLmhlaWdodCAmJiBwb3NbMV0gPiB0aGlzLnk7XHJcbiAgICB9ICAgIFxyXG59IiwiaW1wb3J0IHtHYW1lT2JqZWN0fSBmcm9tIFwiLi4vR2FtZU9iamVjdC9HYW1lT2JqZWN0XCI7XHJcbmV4cG9ydCBjbGFzcyBDb2xsaXNpb257XHJcbiAgICBoYW5kbGVDb2xsaXNpb24ob2JqMSA6IEdhbWVPYmplY3QsIG9iajIgOiBHYW1lT2JqZWN0KXtcclxuICAgICAgICBpZihvYmoxLngrIG9iajEud2lkdGggKyAxPj1vYmoyLnggJiYgb2JqMS54KzEgPD0gb2JqMi54ICsgb2JqMi53aWR0aCl7XHJcbiAgICAgICAgICAgIGlmKG9iajEueSsgb2JqMS5oZWlnaHQgKyAxPj1vYmoyLnkgJiYgb2JqMS55PD0gb2JqMi55ICsgb2JqMi5oZWlnaHQpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgU2NlbmVNYW5hZ2VyIH0gZnJvbSBcIi4uL1NjZW5lL1NjZW5lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBSZW5kZXJlciB9IGZyb20gXCIuLi9SZW5kZXJlci9SZW5kZXJlclwiO1xyXG5pbXBvcnQgeyBMaXN0ZW5JbnB1dCB9IGZyb20gXCIuLi9Qcm9jZXNzSW5wdXQvTGlzdGVuSW5wdXRcIjtcclxuaW1wb3J0IHtJbWFnZUxvYWRlciB9IGZyb20gXCIuLi9JbWFnZUxvYWRlci9JbWFnZUxvYWRlclwiO1xyXG5leHBvcnQgY2xhc3MgR2FtZXtcclxuICAgIHNjZW5lTWFuYWdlciE6IFNjZW5lTWFuYWdlcjtcclxuICAgIGxhc3RUaW1lOiBudW1iZXI7XHJcbiAgICBsaXN0ZW5JbnB1dDogTGlzdGVuSW5wdXQ7XHJcbiAgICBsb2FkZXI6IEltYWdlTG9hZGVyO1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICB0aGlzLmxhc3RUaW1lID0gMDtcclxuICAgICAgICB0aGlzLmxpc3RlbklucHV0ID0gbmV3IExpc3RlbklucHV0KCk7XHJcbiAgICAgICAgdGhpcy5sb2FkZXIgPSBuZXcgSW1hZ2VMb2FkZXIoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgc3RhcnQocmVuZGVyOiBSZW5kZXJlciwgc2NlbmVNYW5hZ2VyOiBTY2VuZU1hbmFnZXIpe1xyXG4gICAgICAgIHRoaXMuc2NlbmVNYW5hZ2VyID0gc2NlbmVNYW5hZ2VyO1xyXG4gICAgICAgIHRoaXMubGlzdGVuSW5wdXQuaGFuZGxlSW5wdXQodGhpcy5zY2VuZU1hbmFnZXIhLCByZW5kZXIpO1xyXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKT0+dGhpcy5sb29wKHJlbmRlcikpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBsb29wKHJlbmRlcjogUmVuZGVyZXIpe1xyXG4gICAgICAgIGNvbnN0IHRpbWUgPSB3aW5kb3cucGVyZm9ybWFuY2Uubm93KCk7XHJcbiAgICAgICAgY29uc3QgZGVsdGEgPSB0aW1lIC0gdGhpcy5sYXN0VGltZTtcclxuICAgICAgICB0aGlzLnNjZW5lTWFuYWdlciEuc2NlbmVzW3RoaXMuc2NlbmVNYW5hZ2VyIS5jdXJyZW50U2NlbmVdLnVwZGF0ZSh0aW1lLGRlbHRhKTtcclxuICAgICAgICB0aGlzLnNjZW5lTWFuYWdlciEuc2NlbmVzW3RoaXMuc2NlbmVNYW5hZ2VyIS5jdXJyZW50U2NlbmVdLnJlbmRlcihyZW5kZXIpO1xyXG4gICAgICAgIHRoaXMubGFzdFRpbWUgPSB0aW1lO1xyXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKT0+dGhpcy5sb29wKHJlbmRlcikpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgU2NlbmUgfSBmcm9tIFwiLi4vU2NlbmUvU2NlbmVcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBHYW1lT2JqZWN0e1xyXG4gICAgeDogbnVtYmVyO1xyXG4gICAgeTogbnVtYmVyO1xyXG4gICAgd2lkdGg6IG51bWJlcjtcclxuICAgIGhlaWdodDogbnVtYmVyO1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgYWN0aXZlOiBib29sZWFuO1xyXG4gICAgZGVmYXVsdFBvc2l0aW9uOiBBcnJheTxudW1iZXI+O1xyXG4gICAgel9pbmRleDogbnVtYmVyO1xyXG4gICAgc2NlbmU6IFNjZW5lO1xyXG4gICAgY29uc3RydWN0b3Ioc2NlbmU6IFNjZW5lKSB7XHJcbiAgICAgICAgdGhpcy54ID0gMDtcclxuICAgICAgICB0aGlzLnkgPSAwO1xyXG4gICAgICAgIHRoaXMud2lkdGggPSAwO1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gMDtcclxuICAgICAgICB0aGlzLm5hbWUgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnpfaW5kZXggPSAwO1xyXG4gICAgICAgIHRoaXMuZGVmYXVsdFBvc2l0aW9uID0gWzAsMF07XHJcbiAgICAgICAgdGhpcy5zY2VuZSA9IHNjZW5lO1xyXG4gICAgfVxyXG4gICAgcmVzZXQoKXtcclxuICAgICAgICB0aGlzLnggPSB0aGlzLmRlZmF1bHRQb3NpdGlvblswXTtcclxuICAgICAgICB0aGlzLnkgPSB0aGlzLmRlZmF1bHRQb3NpdGlvblsxXTtcclxuICAgIH1cclxuICAgIHNldEFjdGl2ZShhY3RpdmU6IGJvb2xlYW4pe1xyXG4gICAgICAgIHRoaXMuYWN0aXZlID0gYWN0aXZlO1xyXG4gICAgfVxyXG4gICAgZ2V0QWN0aXZlKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYWN0aXZlO1xyXG4gICAgfVxyXG5cclxufSIsImV4cG9ydCBjbGFzcyBJbWFnZUxvYWRlciB7XHJcbiAgICBpbWFnZXMhOiBNYXA8c3RyaW5nLCBIVE1MSW1hZ2VFbGVtZW50PjtcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgdGhpcy5pbWFnZXMgPSBuZXcgTWFwPHN0cmluZywgSFRNTEltYWdlRWxlbWVudD4oKTtcclxuICAgIH1cclxuICAgIGFzeW5jIGFkZEltYWdlKHNyYzogc3RyaW5nLCBuYW1lOiBzdHJpbmcpe1xyXG4gICAgICAgIHZhciBpbWcgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICBpbWcuc3JjID0gc3JjO1xyXG4gICAgICAgIHRoaXMuaW1hZ2VzLnNldChuYW1lLCBpbWcpO1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGltZy5vbmxvYWQgPSByZXNvbHZlO1xyXG4gICAgICAgICAgICBpbWcub25lcnJvciA9IHJlamVjdDsgXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIGdldEltYWdlKG5hbWU6IHN0cmluZyk6IEhUTUxJbWFnZUVsZW1lbnQge1xyXG4gICAgICAgIGlmKHRoaXMuaW1hZ2VzLmhhcyhuYW1lKSlcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW1hZ2VzLmdldChuYW1lKSE7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBJbWFnZSgpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtHYW1lT2JqZWN0fSBmcm9tIFwiLi4vR2FtZU9iamVjdC9HYW1lT2JqZWN0XCJcclxuaW1wb3J0IHsgU2NlbmUgfSBmcm9tIFwiLi4vU2NlbmUvU2NlbmVcIjtcclxuZXhwb3J0IGNsYXNzIEltYWdlT2JqZWN0IGV4dGVuZHMgR2FtZU9iamVjdHtcclxuICAgIGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50O1xyXG4gICAgZGVncmVlczogbnVtYmVyO1xyXG4gICAgY29uc3RydWN0b3Ioc2NlbmU6IFNjZW5lLCBrZXk6IHN0cmluZyl7XHJcbiAgICAgICAgc3VwZXIoc2NlbmUpO1xyXG4gICAgICAgIGlmKGtleT09XCJudWxsXCIpXHJcbiAgICAgICAgICAgIHRoaXMuaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICBlbHNlIHRoaXMuaW1hZ2UgPSB0aGlzLnNjZW5lLnNjZW5lTWFuYWdlci5nYW1lLmxvYWRlci5nZXRJbWFnZShrZXkpO1xyXG4gICAgICAgIHRoaXMuZGVncmVlcyA9IDA7XHJcbiAgICB9XHJcbiAgICB1cGRhdGUodGltZTogbnVtYmVyLCBkZWx0YVRpbWU6bnVtYmVyKXt9XHJcbn0iLCJpbXBvcnQge1NjZW5lTWFuYWdlcn0gZnJvbSAnLi4vU2NlbmUvU2NlbmVNYW5hZ2VyJztcclxuaW1wb3J0IHtSZW5kZXJlcn0gZnJvbSAnLi4vUmVuZGVyZXIvUmVuZGVyZXInXHJcbmV4cG9ydCBjbGFzcyBMaXN0ZW5JbnB1dHtcclxuICAgIGhhbmRsZUlucHV0KHNjZW5lTWFuYWdlcjogU2NlbmVNYW5hZ2VyLCByZW5kZXI6IFJlbmRlcmVyKXtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywoZSk9PnNjZW5lTWFuYWdlci5zY2VuZXNbc2NlbmVNYW5hZ2VyLmN1cnJlbnRTY2VuZV0ucHJvY2Vzc0lucHV0Lm9uS2V5RG93bihlKSk7XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLChlKT0+c2NlbmVNYW5hZ2VyLnNjZW5lc1tzY2VuZU1hbmFnZXIuY3VycmVudFNjZW5lXS5wcm9jZXNzSW5wdXQub25LZXlVcCgpKTtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLChlKT0+c2NlbmVNYW5hZ2VyLnNjZW5lc1tzY2VuZU1hbmFnZXIuY3VycmVudFNjZW5lXS5wcm9jZXNzSW5wdXQub25Nb3VzZURvd24oZSxyZW5kZXIuY2FudmFzKSk7XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsKGUpPT5zY2VuZU1hbmFnZXIuc2NlbmVzW3NjZW5lTWFuYWdlci5jdXJyZW50U2NlbmVdLnByb2Nlc3NJbnB1dC5vbk1vdXNlVXAoKSk7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgY2xhc3MgUHJvY2Vzc0lucHV0e1xyXG4gICAgaW5wdXRLZXkgOiBTdHJpbmc7XHJcbiAgICBtb3VzZUV2ZW50IDogQXJyYXk8bnVtYmVyPiB8IG51bGw7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMuaW5wdXRLZXkgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMubW91c2VFdmVudCA9IG51bGw7XHJcbiAgICB9XHJcbiAgICBvbktleURvd24oZTogS2V5Ym9hcmRFdmVudCl7XHJcbiAgICAgICAgdGhpcy5pbnB1dEtleSA9IGUuY29kZTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmlucHV0S2V5KTtcclxuICAgIH1cclxuICAgIG9uS2V5VXAoKXtcclxuICAgICAgICB0aGlzLmlucHV0S2V5ID0gXCJcIjtcclxuICAgIH1cclxuICAgIG9uTW91c2VEb3duKGU6IE1vdXNlRXZlbnQsIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQpIHtcclxuICAgICAgICB2YXIgcmVjdCA9IGNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICB2YXIgbW91c2VYID0gZS5jbGllbnRYIC0gcmVjdC5sZWZ0O1xyXG4gICAgICAgIHZhciBtb3VzZVkgPSBlLmNsaWVudFkgLSByZWN0LnRvcDsgICAgXHJcbiAgICAgICAgdGhpcy5tb3VzZUV2ZW50ID0gW21vdXNlWCwgbW91c2VZXTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm1vdXNlRXZlbnQpO1xyXG4gICAgfVxyXG4gICAgb25Nb3VzZVVwKCkge1xyXG4gICAgICAgIHRoaXMubW91c2VFdmVudCA9IG51bGw7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBJbWFnZU9iamVjdCB9IGZyb20gXCIuLi9JbWFnZU9iamVjdC9JbWFnZU9iamVjdFwiO1xyXG5pbXBvcnQgeyBTcHJpdGUgfSBmcm9tIFwiLi4vU3ByaXRlL1Nwcml0ZVwiO1xyXG5pbXBvcnQgeyBUZXh0T2JqZWN0IH0gZnJvbSBcIi4uL1RleHRPYmplY3QvVGV4dE9iamVjdFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFJlbmRlcmVye1xyXG4gICAgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcclxuICAgIGNvbnN0cnVjdG9yKGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQpe1xyXG4gICAgICAgIHRoaXMuY2FudmFzID0gY2FudmFzO1xyXG4gICAgfVxyXG4gICAgZHJhd0ltYWdlKGltYWdlT2JqZWN0OiBJbWFnZU9iamVjdCl7XHJcbiAgICAgICAgY29uc3QgY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgICAgICBpZihjdHghPW51bGwpe1xyXG4gICAgICAgICAgICBjdHguc2F2ZSgpO1xyXG4gICAgICAgICAgICBjdHgudHJhbnNsYXRlKGltYWdlT2JqZWN0LnggKyBpbWFnZU9iamVjdC53aWR0aC8yLGltYWdlT2JqZWN0LnkgKyBpbWFnZU9iamVjdC5oZWlnaHQvMilcclxuICAgICAgICAgICAgY3R4LnJvdGF0ZShpbWFnZU9iamVjdC5kZWdyZWVzKk1hdGguUEkvMTgwKTtcclxuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShpbWFnZU9iamVjdC5pbWFnZSwtaW1hZ2VPYmplY3Qud2lkdGgvMiwgLWltYWdlT2JqZWN0LmhlaWdodC8yLGltYWdlT2JqZWN0LndpZHRoLGltYWdlT2JqZWN0LmhlaWdodCk7XHJcbiAgICAgICAgICAgIGN0eC5yZXN0b3JlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZHJhd1Nwcml0ZShzcHJpdGU6IFNwcml0ZSl7XHJcbiAgICAgICAgY29uc3QgY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgICAgICBpZihjdHghPW51bGwpe1xyXG4gICAgICAgICAgICBjdHguc2F2ZSgpO1xyXG4gICAgICAgICAgICBjdHgudHJhbnNsYXRlKHNwcml0ZS54ICsgc3ByaXRlLndpZHRoLzIsc3ByaXRlLnkgKyBzcHJpdGUuaGVpZ2h0LzIpXHJcbiAgICAgICAgICAgIGN0eC5yb3RhdGUoc3ByaXRlLmRlZ3JlZXMqTWF0aC5QSS8xODApO1xyXG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKHNwcml0ZS5pbWFnZXNbc3ByaXRlLmZyYW1lQ3VycmVudF0sLXNwcml0ZS53aWR0aC8yLCAtc3ByaXRlLmhlaWdodC8yLHNwcml0ZS53aWR0aCxzcHJpdGUuaGVpZ2h0KTtcclxuICAgICAgICAgICAgY3R4LnJlc3RvcmUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBkcmF3VGV4dCh0ZXh0OiBUZXh0T2JqZWN0KXtcclxuICAgICAgICBjb25zdCBjdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgICAgIGlmKGN0eCE9bnVsbCl7XHJcbiAgICAgICAgICAgIGN0eC5mb250ID0gdGV4dC5mb250O1xyXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gdGV4dC5jb2xvcjtcclxuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KHRleHQuY29udGVudCx0ZXh0LngsdGV4dC55KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBJbWFnZU9iamVjdCB9IGZyb20gXCIuLi9JbWFnZU9iamVjdC9JbWFnZU9iamVjdFwiO1xyXG5pbXBvcnQgeyBTcHJpdGUgfSBmcm9tIFwiLi4vU3ByaXRlL1Nwcml0ZVwiO1xyXG5pbXBvcnQgeyBUZXh0T2JqZWN0IH0gZnJvbSBcIi4uL1RleHRPYmplY3QvVGV4dE9iamVjdFwiO1xyXG5pbXBvcnQge1JlbmRlcmVyfSBmcm9tIFwiLi4vUmVuZGVyZXIvUmVuZGVyZXJcIjtcclxuaW1wb3J0IHtHYW1lT2JqZWN0fSBmcm9tIFwiLi4vR2FtZU9iamVjdC9HYW1lT2JqZWN0XCI7XHJcbmltcG9ydCB7IFByb2Nlc3NJbnB1dCB9IGZyb20gXCIuLi9Qcm9jZXNzSW5wdXQvUHJvY2Vzc0lucHV0XCI7XHJcbmltcG9ydCB7IENvbGxpc2lvbiB9IGZyb20gXCIuLi9Db2xsaXNpb24vQ29sbGlzaW9uXCI7XHJcbmltcG9ydCB7IFNjZW5lTWFuYWdlciB9IGZyb20gXCIuL1NjZW5lTWFuYWdlclwiO1xyXG5leHBvcnQgY2xhc3MgU2NlbmV7XHJcbiAgICBnYW1lT2JqZWN0czogR2FtZU9iamVjdFtdO1xyXG4gICAgcHJvY2Vzc0lucHV0OiBQcm9jZXNzSW5wdXQ7XHJcbiAgICBjb2xsaXNpb246IENvbGxpc2lvbjtcclxuICAgIHNjZW5lTWFuYWdlciA6IFNjZW5lTWFuYWdlcjtcclxuICAgIGNvbnN0cnVjdG9yKHNjZW5lTWFuYWdlciA6IFNjZW5lTWFuYWdlcil7XHJcbiAgICAgICAgdGhpcy5nYW1lT2JqZWN0cyA9IFtdO1xyXG4gICAgICAgIHRoaXMucHJvY2Vzc0lucHV0ID0gbmV3IFByb2Nlc3NJbnB1dCgpO1xyXG4gICAgICAgIHRoaXMuY29sbGlzaW9uID0gbmV3IENvbGxpc2lvbigpO1xyXG4gICAgICAgIHRoaXMuc2NlbmVNYW5hZ2VyID0gc2NlbmVNYW5hZ2VyO1xyXG4gICAgfVxyXG4gICAgcmVzZXRTY2VuZSgpe1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDx0aGlzLmdhbWVPYmplY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZU9iamVjdHNbaV0ucmVzZXQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBhZGRDaGlsZChnYW1lT2JqZWN0czogR2FtZU9iamVjdFtdKXtcclxuICAgICAgICBnYW1lT2JqZWN0cy5tYXAoKGdhbWVPYmplY3QpPT57dGhpcy5nYW1lT2JqZWN0cy5wdXNoKGdhbWVPYmplY3QpfSlcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIocmVuZGVyOiBSZW5kZXJlcil7XHJcbiAgICAgICAgLy8gc29ydCBnYW1lT2JqZWN0cyBmb2xsb3dpbmcgel9pbmRleFxyXG4gICAgICAgIHRoaXMuZ2FtZU9iamVjdHMuc29ydCgoYSxiKT0+e1xyXG4gICAgICAgICAgICByZXR1cm4gYS56X2luZGV4IC0gYi56X2luZGV4O1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPHRoaXMuZ2FtZU9iamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYodGhpcy5nYW1lT2JqZWN0c1tpXS5nZXRBY3RpdmUoKSl7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBvYmogPSB0aGlzLmdhbWVPYmplY3RzW2ldOyBcclxuICAgICAgICAgICAgICAgIGlmKCBvYmogaW5zdGFuY2VvZiBJbWFnZU9iamVjdClcclxuICAgICAgICAgICAgICAgICAgICByZW5kZXIuZHJhd0ltYWdlKG9iaik7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKG9iaiBpbnN0YW5jZW9mIFNwcml0ZSlcclxuICAgICAgICAgICAgICAgICAgICByZW5kZXIuZHJhd1Nwcml0ZShvYmopO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZihvYmogaW5zdGFuY2VvZiBUZXh0T2JqZWN0KVxyXG4gICAgICAgICAgICAgICAgICAgIHJlbmRlci5kcmF3VGV4dChvYmopO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8geHUgbHkgbG9naWNcclxuICAgIHVwZGF0ZSh0aW1lOiBudW1iZXIsIGRlbHRhOiBudW1iZXIpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8dGhpcy5nYW1lT2JqZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgb2JqID0gdGhpcy5nYW1lT2JqZWN0c1tpXTtcclxuICAgICAgICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIEltYWdlT2JqZWN0IHx8IG9iaiBpbnN0YW5jZW9mIFNwcml0ZSlcclxuICAgICAgICAgICAgICAgIG9iai51cGRhdGUodGltZSwgZGVsdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCB7IFNjZW5lIH0gZnJvbSBcIi4vU2NlbmVcIjtcclxuaW1wb3J0IHtHYW1lfSBmcm9tIFwiLi4vQ29yZS9HYW1lXCI7XHJcbmV4cG9ydCBjbGFzcyBTY2VuZU1hbmFnZXIge1xyXG4gICAgc2NlbmVzOiBTY2VuZVtdO1xyXG4gICAgY3VycmVudFNjZW5lOiBudW1iZXI7XHJcbiAgICBnYW1lOiBHYW1lO1xyXG4gICAgY29uc3RydWN0b3IoZ2FtZTogR2FtZSl7XHJcbiAgICAgICAgdGhpcy5zY2VuZXMgPSBbXTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRTY2VuZSA9IDA7XHJcbiAgICAgICAgdGhpcy5nYW1lID0gZ2FtZTtcclxuICAgIH1cclxuICAgIGFkZFNjZW5lKHNjZW5lOiBTY2VuZSl7XHJcbiAgICAgICAgdGhpcy5zY2VuZXMucHVzaChzY2VuZSlcclxuICAgIH1cclxuICAgIHN3aXRjaFNjZW5lKG5leHRJbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5zY2VuZXNbdGhpcy5jdXJyZW50U2NlbmVdLnJlc2V0U2NlbmUoKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRTY2VuZSA9IG5leHRJbmRleDtcclxuICAgIH1cclxuICAgIHVwZGF0ZSgpe31cclxuICAgIHJlbmRlcigpe31cclxufSIsImltcG9ydCB7R2FtZU9iamVjdH0gZnJvbSBcIi4uL0dhbWVPYmplY3QvR2FtZU9iamVjdFwiXHJcbmltcG9ydCB7IFNjZW5lIH0gZnJvbSBcIi4uL1NjZW5lL1NjZW5lXCI7XHJcbmV4cG9ydCBjbGFzcyBTcHJpdGUgZXh0ZW5kcyBHYW1lT2JqZWN0e1xyXG4gICAgaW1hZ2VzOiBBcnJheTxIVE1MSW1hZ2VFbGVtZW50PjtcclxuICAgIGRlZ3JlZXM6IG51bWJlcjtcclxuICAgIGZyYW1lQ3VycmVudDogbnVtYmVyO1xyXG4gICAgcmF0ZTogbnVtYmVyO1xyXG4gICAgYWR0OiBudW1iZXI7XHJcbiAgICBjb25zdHJ1Y3RvcihzY2VuZTogU2NlbmUsaW1hZ2VzOiBBcnJheTxIVE1MSW1hZ2VFbGVtZW50Pil7XHJcbiAgICAgICAgc3VwZXIoc2NlbmUpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiaW1hZ2VzXCIsaW1hZ2VzKTtcclxuICAgICAgICB0aGlzLmltYWdlcyA9IGltYWdlcztcclxuICAgICAgICB0aGlzLmRlZ3JlZXMgPSAwO1xyXG4gICAgICAgIHRoaXMuZnJhbWVDdXJyZW50ID0gMDtcclxuICAgICAgICB0aGlzLnJhdGUgPSAwO1xyXG4gICAgICAgIHRoaXMuYWR0ID0gMDtcclxuICAgIH1cclxuICAgIHVwZGF0ZSh0aW1lOiBudW1iZXIsIGRlbHRhVGltZTpudW1iZXIpe1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwbGF5QW5pbWF0aW9uKHRpbWU6IG51bWJlciwgZGVsdGFUaW1lOm51bWJlcikge1xyXG4gICAgICAgIHRoaXMuYWR0ICs9IGRlbHRhVGltZVxyXG4gICAgICAgIGlmKHRoaXMuYWR0Pj10aGlzLnJhdGUpe1xyXG4gICAgICAgICAgICB0aGlzLmFkdCAtPSB0aGlzLnJhdGU7XHJcbiAgICAgICAgICAgIHRoaXMuZnJhbWVDdXJyZW50ICs9MTtcclxuICAgICAgICAgICAgaWYodGhpcy5mcmFtZUN1cnJlbnQ+dGhpcy5pbWFnZXMubGVuZ3RoLTEpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mcmFtZUN1cnJlbnQgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtHYW1lT2JqZWN0fSBmcm9tIFwiLi4vR2FtZU9iamVjdC9HYW1lT2JqZWN0XCJcclxuaW1wb3J0IHsgU2NlbmUgfSBmcm9tIFwiLi4vU2NlbmUvU2NlbmVcIjtcclxuZXhwb3J0IGNsYXNzIFRleHRPYmplY3QgZXh0ZW5kcyBHYW1lT2JqZWN0e1xyXG4gICAgY29udGVudDogc3RyaW5nO1xyXG4gICAgZm9udDogc3RyaW5nO1xyXG4gICAgY29sb3I6IHN0cmluZztcclxuICAgIGNvbnN0cnVjdG9yKHNjZW5lOiBTY2VuZSkge1xyXG4gICAgICAgIHN1cGVyKHNjZW5lKTtcclxuICAgICAgICB0aGlzLmNvbnRlbnQgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuZm9udCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5jb2xvciA9IFwiXCI7XHJcbiAgICB9XHJcbiAgICBzZXRDb250ZW50KGNvbnRlbnQ6IHN0cmluZyl7XHJcbiAgICAgICAgdGhpcy5jb250ZW50ID0gY29udGVudDtcclxuICAgIH1cclxufSIsImltcG9ydCB7IFNwcml0ZSB9IGZyb20gXCIuLi9FbmdpbmUvU3ByaXRlL1Nwcml0ZVwiO1xyXG5cclxuaW1wb3J0IHtTY2VuZX0gZnJvbSBcIi4uL0VuZ2luZS9TY2VuZS9TY2VuZVwiXHJcbmV4cG9ydCBjbGFzcyBCaXJkIGV4dGVuZHMgU3ByaXRlIHtcclxuICAgIGdyYXZpdHkgOiBudW1iZXI7XHJcbiAgICBzcGVlZCA6IG51bWJlcjsgXHJcbiAgICBjb25zdHJ1Y3RvcihzY2VuZTogU2NlbmUpIHtcclxuICAgICAgICB2YXIgaW1hZ2VzOkFycmF5PEhUTUxJbWFnZUVsZW1lbnQ+ID0gW107XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJsb2FkZXJcIiwgc2NlbmUuZ2FtZS5sb2FkZXIpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDw4O2krKyl7XHJcbiAgICAgICAgICAgIGxldCBuYW1lID0gIFwiYmlyZFwiICsgaTtcclxuICAgICAgICAgICAgaW1hZ2VzLnB1c2goc2NlbmUuc2NlbmVNYW5hZ2VyLmdhbWUubG9hZGVyLmdldEltYWdlKG5hbWUpIGFzIEhUTUxJbWFnZUVsZW1lbnQpO1xyXG4gICAgICAgIH0gXHJcbiAgICAgICAgc3VwZXIoc2NlbmUsaW1hZ2VzKTtcclxuICAgICAgICB0aGlzLm5hbWUgPSBcImJpcmRcIjtcclxuICAgICAgICB0aGlzLmdyYXZpdHkgPSAwO1xyXG4gICAgICAgIHRoaXMuc3BlZWQgPSAwO1xyXG4gICAgICAgIHRoaXMucmF0ZSA9IDEuMC8zMCoxMDAwO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKHRpbWU6IG51bWJlciwgZGVsdGFUaW1lOm51bWJlcil7XHJcbiAgICAgICAgdGhpcy55ICs9ICh0aGlzLnNwZWVkICsgMC41KnRoaXMuZ3Jhdml0eSkqKGRlbHRhVGltZS8xNi42Nyk7XHJcbiAgICAgICAgdGhpcy5zcGVlZCArPSB0aGlzLmdyYXZpdHkqKGRlbHRhVGltZS8xNi42Nyk7XHJcbiAgICAgICAgaWYodGhpcy55IDwgMClcclxuICAgICAgICAgICAgdGhpcy55ID0gMDtcclxuICAgICAgICBpZih0aGlzLnNwZWVkPjApe1xyXG4gICAgICAgICAgICB0aGlzLmRlZ3JlZXMgKz0gMTtcclxuICAgICAgICAgICAgaWYodGhpcy5kZWdyZWVzPjQwKSB0aGlzLmRlZ3JlZXMgPSA0MDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5kZWdyZWVzIC09IDE7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZGVncmVlczwtMjApIHRoaXMuZGVncmVlcyA9IC0yMDtcclxuICAgICAgICAgICAgdGhpcy5wbGF5QW5pbWF0aW9uKHRpbWUsIGRlbHRhVGltZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZseSgpe1xyXG4gICAgICAgIHRoaXMuc3BlZWQgPSAtODtcclxuICAgIH1cclxuICAgIHJlc2V0KCl7XHJcbiAgICAgICAgc3VwZXIucmVzZXQoKTtcclxuICAgICAgICB0aGlzLnNwZWVkID0gMDtcclxuICAgIH1cclxufSIsImltcG9ydCB7IEltYWdlT2JqZWN0IH0gZnJvbSBcIi4uL0VuZ2luZS9JbWFnZU9iamVjdC9JbWFnZU9iamVjdFwiO1xyXG5pbXBvcnQge0dhbWV9IGZyb20gXCIuLi9FbmdpbmUvQ29yZS9HYW1lXCI7XHJcbmltcG9ydCB7IFNjZW5lIH0gZnJvbSBcIi4uL0VuZ2luZS9TY2VuZS9TY2VuZVwiO1xyXG5jbGFzcyBHcm91bmR7XHJcbiAgICBpbWFnZXM6IEFycmF5PEltYWdlT2JqZWN0PjtcclxuICAgIHNwZWVkOiBudW1iZXI7XHJcbiAgICBjb25zdHJ1Y3RvcihzY2VuZTogU2NlbmUgLHNwZWVkOiBudW1iZXIpe1xyXG4gICAgICAgIHZhciBpbWFnZU9iamVjdDEgPSBuZXcgSW1hZ2VPYmplY3Qoc2NlbmUsXCJncm91bmRcIik7XHJcbiAgICAgICAgaW1hZ2VPYmplY3QxLm5hbWUgPSBcImdyb3VuZFwiO1xyXG4gICAgICAgIGltYWdlT2JqZWN0MS56X2luZGV4ID0yO1xyXG4gICAgICAgIGltYWdlT2JqZWN0MS55ID0gNjcwO1xyXG4gICAgICAgIGltYWdlT2JqZWN0MS53aWR0aCA9IDY1MDtcclxuICAgICAgICBpbWFnZU9iamVjdDEuaGVpZ2h0ID0gMTUwO1xyXG4gICAgICAgIGltYWdlT2JqZWN0MS5kZWZhdWx0UG9zaXRpb249IFswLDY3MF07XHJcblxyXG4gICAgICAgIHZhciBpbWFnZU9iamVjdDIgPSBuZXcgSW1hZ2VPYmplY3Qoc2NlbmUsXCJncm91bmRcIik7XHJcbiAgICAgICAgaW1hZ2VPYmplY3QyLm5hbWUgPSBcImdyb3VuZFwiO1xyXG4gICAgICAgIGltYWdlT2JqZWN0Mi56X2luZGV4ID0yO1xyXG4gICAgICAgIGltYWdlT2JqZWN0Mi54ID0gNjQ5O1xyXG4gICAgICAgIGltYWdlT2JqZWN0Mi55ID0gNjcwO1xyXG4gICAgICAgIGltYWdlT2JqZWN0Mi53aWR0aCA9IDY1MDtcclxuICAgICAgICBpbWFnZU9iamVjdDIuaGVpZ2h0ID0gMTUwO1xyXG4gICAgICAgIGltYWdlT2JqZWN0Mi5kZWZhdWx0UG9zaXRpb249IFs2NDksNjcwXTtcclxuXHJcbiAgICAgICAgdGhpcy5pbWFnZXMgPSBbaW1hZ2VPYmplY3QxLGltYWdlT2JqZWN0Ml07XHJcbiAgICAgICAgdGhpcy5zcGVlZCA9IHNwZWVkO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKHRpbWU6IG51bWJlciwgZGVsdGFUaW1lOiBudW1iZXIpe1xyXG4gICAgICAgIGZvcih2YXIgaT0wO2k8dGhpcy5pbWFnZXMubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIHRoaXMuaW1hZ2VzW2ldLnggLT0gdGhpcy5zcGVlZCooZGVsdGFUaW1lLzE2LjY3KTtcclxuICAgICAgICAgICAgaWYodGhpcy5pbWFnZXNbaV0ueCA8IC0gKDY1MCkpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbWFnZXNbaV0ueCA9IHRoaXMuaW1hZ2VzW01hdGguYWJzKGktMSldLngrNjQ5O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBcclxuICAgIH1cclxuICAgIGdldENvbXBvbmVudCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmltYWdlcztcclxuICAgIH1cclxuICAgIHJlc2V0KCl7XHJcbiAgICAgICAgZm9yKHZhciBpPTA7aTx0aGlzLmltYWdlcy5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgdGhpcy5pbWFnZXNbaV0ucmVzZXQoKTtcclxuICAgICAgICB9IFxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge0dyb3VuZH07IiwiaW1wb3J0IHsgSW1hZ2VPYmplY3QgfSBmcm9tIFwiLi4vRW5naW5lL0ltYWdlT2JqZWN0L0ltYWdlT2JqZWN0XCI7XHJcbmltcG9ydCB7R2FtZX0gZnJvbSBcIi4uL0VuZ2luZS9Db3JlL0dhbWVcIlxyXG5pbXBvcnQgeyBTY2VuZSB9IGZyb20gXCIuLi9FbmdpbmUvU2NlbmUvU2NlbmVcIjtcclxuY29uc3QgYmxhbmtzID0gMjAwO1xyXG5jb25zdCBwaXBlSGVpZ2h0ID0gMzUwO1xyXG5jb25zdCBudW1QaXBlID0gNDtcclxuY29uc3QgZGlzdGFuY2UgPSAzMDA7XHJcbmNvbnN0IHBpcGVXaWR0aCA9IDgwO1xyXG5jbGFzcyBQYWlyT2ZQaXBle1xyXG4gICAgUGlwZXM6IEFycmF5PEltYWdlT2JqZWN0PjtcclxuICAgIHByaXZhdGUgc3BlZWQ6IG51bWJlcjtcclxuICAgIGNvbnN0cnVjdG9yKHNjZW5lOiBTY2VuZSx4Om51bWJlciwgeTpudW1iZXIsc3BlZWQ6IG51bWJlcil7XHJcbiAgICAgICAgdmFyIFBpcGVVcCA9IG5ldyBJbWFnZU9iamVjdChzY2VuZSxcInBpcGVcIik7XHJcbiAgICAgICAgLy8gc2V0IGF0dHJpYnV0ZXNcclxuICAgICAgICBQaXBlVXAueCA9IHg7XHJcbiAgICAgICAgUGlwZVVwLnkgPSB5O1xyXG4gICAgICAgIFBpcGVVcC53aWR0aCA9IHBpcGVXaWR0aDtcclxuICAgICAgICBQaXBlVXAuaGVpZ2h0ID0gcGlwZUhlaWdodDtcclxuICAgICAgICBQaXBlVXAuZGVncmVlcyA9IDE4MDtcclxuICAgICAgICBQaXBlVXAubmFtZSA9IFwicGlwZVwiO1xyXG4gICAgICAgIFBpcGVVcC56X2luZGV4ID0gMTtcclxuICAgICAgICAvLyBzZXQgZGVmYXVsdFBvc2l0aW9uXHJcbiAgICAgICAgUGlwZVVwLmRlZmF1bHRQb3NpdGlvbiA9IFt4LHldO1xyXG5cclxuICAgICAgICB2YXIgUGlwZURvd24gPSBuZXcgSW1hZ2VPYmplY3Qoc2NlbmUsXCJwaXBlXCIpO1xyXG4gICAgICAgIC8vIHNldCBhdHRyaWJ1dGVzXHJcbiAgICAgICAgUGlwZURvd24ueCA9IHg7XHJcbiAgICAgICAgUGlwZURvd24ueSA9IHkrcGlwZUhlaWdodCtibGFua3M7XHJcbiAgICAgICAgUGlwZURvd24ud2lkdGggPSBwaXBlV2lkdGg7XHJcbiAgICAgICAgUGlwZURvd24uaGVpZ2h0ID0gcGlwZUhlaWdodDtcclxuICAgICAgICBQaXBlRG93bi5uYW1lID0gXCJwaXBlXCI7XHJcbiAgICAgICAgUGlwZURvd24uel9pbmRleCA9IDE7XHJcbiAgICAgICAgLy8gc2V0IGRlZmF1bHRQb3NpdGlvblxyXG4gICAgICAgIFBpcGVEb3duLmRlZmF1bHRQb3NpdGlvbiA9IFt4LHkrcGlwZUhlaWdodCtibGFua3NdO1xyXG5cclxuICAgICAgICB2YXIgY2hlY2tTY29yZSA9IG5ldyBJbWFnZU9iamVjdChzY2VuZSxcIm51bGxcIik7XHJcbiAgICAgICAgLy8gc2V0IGF0dHJpYnV0ZXNcclxuICAgICAgICBjaGVja1Njb3JlLnggPSB4K3BpcGVXaWR0aDtcclxuICAgICAgICBjaGVja1Njb3JlLnkgPSB5K3BpcGVIZWlnaHQ7XHJcbiAgICAgICAgY2hlY2tTY29yZS53aWR0aCA9IDEwO1xyXG4gICAgICAgIGNoZWNrU2NvcmUuaGVpZ2h0ID0gYmxhbmtzO1xyXG4gICAgICAgIGNoZWNrU2NvcmUubmFtZSA9IFwiY2hlY2tTY29yZVwiO1xyXG4gICAgICAgIGNoZWNrU2NvcmUuel9pbmRleCA9IDE7XHJcbiAgICAgICAgY2hlY2tTY29yZS5kZWZhdWx0UG9zaXRpb24gPSBbeCtwaXBlV2lkdGgseStwaXBlSGVpZ2h0XTtcclxuXHJcbiAgICAgICAgdGhpcy5QaXBlcz0gW1BpcGVVcCxQaXBlRG93bixjaGVja1Njb3JlXTtcclxuXHJcbiAgICAgICAgdGhpcy5zcGVlZCA9IHNwZWVkO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKHRpbWU6bnVtYmVyLCBkZWx0YVRpbWU6bnVtYmVyKXtcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwzO2krKyl7XHJcbiAgICAgICAgICAgIHRoaXMuUGlwZXNbaV0ueCAtPSB0aGlzLnNwZWVkKihkZWx0YVRpbWUvMTYuNjcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJlc2V0KCl7XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8MztpKyspe1xyXG4gICAgICAgICAgICB0aGlzLlBpcGVzW2ldLnJlc2V0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0Q29tcG9uZW50KCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuUGlwZXM7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIExpc3RQYWlyT2ZQaXBlc3tcclxuICAgIGxpc3RQaXBlOiBQYWlyT2ZQaXBlW107XHJcbiAgICBjb25zdHJ1Y3RvcihzY2VuZTogU2NlbmUpe1xyXG4gICAgICAgIHRoaXMubGlzdFBpcGUgPSBbXTtcclxuICAgICAgICBmb3IodmFyIGk9MDtpPG51bVBpcGU7aSsrKXtcclxuICAgICAgICAgICAgdmFyIHggPSBpKmRpc3RhbmNlICsgcGlwZVdpZHRoICsgNDAwO1xyXG4gICAgICAgICAgICB2YXIgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqLTIwMCk7XHJcbiAgICAgICAgICAgIHZhciBwaXBlID0gbmV3IFBhaXJPZlBpcGUoc2NlbmUseCx5LDQpO1xyXG4gICAgICAgICAgICB0aGlzLmxpc3RQaXBlLnB1c2gocGlwZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdXBkYXRlKCl7XHJcbiAgICAgICAgdGhpcy5saXN0UGlwZS5tYXAoKHBpcGUsaW5kZXgpID0+e1xyXG4gICAgICAgICAgICBpZihwaXBlLlBpcGVzWzBdLng8LTEwMCl7XHJcbiAgICAgICAgICAgICAgICB2YXIgZnJvbnRJbmRleCA9IGluZGV4IC0xO1xyXG4gICAgICAgICAgICAgICAgaWYoZnJvbnRJbmRleDwwKSBmcm9udEluZGV4ID0gdGhpcy5saXN0UGlwZS5sZW5ndGgtMTtcclxuICAgICAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPHBpcGUuUGlwZXMubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgcGlwZS5QaXBlc1tpXS54ID0gdGhpcy5saXN0UGlwZVtmcm9udEluZGV4XS5QaXBlc1tpXS54ICsgZGlzdGFuY2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge1BhaXJPZlBpcGUsIExpc3RQYWlyT2ZQaXBlc307XHJcbiIsImltcG9ydCB7IFRleHRPYmplY3QgfSBmcm9tICcuLi9FbmdpbmUvVGV4dE9iamVjdC9UZXh0T2JqZWN0JztcclxuaW1wb3J0IHtCdXR0b25PYmplY3QgfSBmcm9tICcuLi9FbmdpbmUvQnV0dG9uT2JqZWN0L0J1dHRvbk9iamVjdCc7XHJcbmltcG9ydCB7IEltYWdlT2JqZWN0IH0gZnJvbSAnLi4vRW5naW5lL0ltYWdlT2JqZWN0L0ltYWdlT2JqZWN0JztcclxuXHJcbmV4cG9ydCBjbGFzcyBQYW5lbEdhbWVPdmVyIHtcclxuICAgIGltZ0dhbWVPdmVyOiBJbWFnZU9iamVjdDtcclxuICAgIGN1cnJlbnRTY29yZTogVGV4dE9iamVjdDtcclxuICAgIGhpZ2hTY29yZTogVGV4dE9iamVjdDtcclxuICAgIHJlcGxheUJ1dHRvbjogQnV0dG9uT2JqZWN0O1xyXG4gICAgY29uc3RydWN0b3IoaW1nR2FtZU92ZXI6IEltYWdlT2JqZWN0LCBjdXJyZW50U2NvcmU6IFRleHRPYmplY3QsIGhpZ2hTY29yZTogVGV4dE9iamVjdCwgcmVwbGF5QnV0dG9uOiBCdXR0b25PYmplY3Qpe1xyXG4gICAgICAgIHRoaXMuaW1nR2FtZU92ZXIgPSBpbWdHYW1lT3ZlcjtcclxuICAgICAgICB0aGlzLmN1cnJlbnRTY29yZSA9IGN1cnJlbnRTY29yZTtcclxuICAgICAgICB0aGlzLmhpZ2hTY29yZSA9IGhpZ2hTY29yZTtcclxuICAgICAgICB0aGlzLnJlcGxheUJ1dHRvbiA9IHJlcGxheUJ1dHRvbjtcclxuICAgIH1cclxuICAgIHNldEFjdGl2ZShhY3RpdmU6IGJvb2xlYW4pe1xyXG4gICAgICAgIHRoaXMuaW1nR2FtZU92ZXIuc2V0QWN0aXZlKGFjdGl2ZSk7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50U2NvcmUuc2V0QWN0aXZlKGFjdGl2ZSk7XHJcbiAgICAgICAgdGhpcy5oaWdoU2NvcmUuc2V0QWN0aXZlKGFjdGl2ZSk7XHJcbiAgICAgICAgdGhpcy5yZXBsYXlCdXR0b24uc2V0QWN0aXZlKGFjdGl2ZSk7XHJcbiAgICB9XHJcbiAgICBnZXRDb21wb25lbnQoKXtcclxuICAgICAgICByZXR1cm4gW3RoaXMuaW1nR2FtZU92ZXIsIHRoaXMucmVwbGF5QnV0dG9uLCB0aGlzLmN1cnJlbnRTY29yZSwgdGhpcy5oaWdoU2NvcmVdO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKGN1cnJlbnRTY29yZTogbnVtYmVyLCBoaWdoU2NvcmU6IG51bWJlcil7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50U2NvcmUuc2V0Q29udGVudChcIlNjb3JlOiBcIiArIGN1cnJlbnRTY29yZSk7XHJcbiAgICAgICAgdGhpcy5oaWdoU2NvcmUuc2V0Q29udGVudChcIkhpZ2ggU2NvcmU6IFwiICsgaGlnaFNjb3JlKVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtTY2VuZX0gZnJvbSAnLi4vRW5naW5lL1NjZW5lL1NjZW5lJztcclxuaW1wb3J0IHtCaXJkfSBmcm9tICcuL0JpcmQnO1xyXG5pbXBvcnQge0xpc3RQYWlyT2ZQaXBlc30gZnJvbSAnLi9QYWlyT2ZQaXBlJztcclxuaW1wb3J0IHtUZXh0T2JqZWN0IH0gZnJvbSAnLi4vRW5naW5lL1RleHRPYmplY3QvVGV4dE9iamVjdCc7XHJcbmltcG9ydCB7SW1hZ2VPYmplY3QgfSBmcm9tICcuLi9FbmdpbmUvSW1hZ2VPYmplY3QvSW1hZ2VPYmplY3QnO1xyXG5pbXBvcnQge1Njb3JlfSBmcm9tIFwiLi9TY29yZVwiO1xyXG5pbXBvcnQge0dyb3VuZCB9IGZyb20gJy4vR3JvdW5kJztcclxuaW1wb3J0IHtQYW5lbEdhbWVPdmVyfSBmcm9tICcuL1BhbmVsR2FtZU92ZXInXHJcbmltcG9ydCB7R2FtZX0gZnJvbSAnLi4vRW5naW5lL0NvcmUvR2FtZSdcclxuaW1wb3J0IHtCdXR0b25PYmplY3R9IGZyb20gJy4uL0VuZ2luZS9CdXR0b25PYmplY3QvQnV0dG9uT2JqZWN0JztcclxuaW1wb3J0IHsgR2FtZU9iamVjdCB9IGZyb20gJy4uL0VuZ2luZS9HYW1lT2JqZWN0L0dhbWVPYmplY3QnO1xyXG5pbXBvcnQgeyBTY2VuZU1hbmFnZXIgfSBmcm9tICcuLi9FbmdpbmUvU2NlbmUvU2NlbmVNYW5hZ2VyJztcclxuXHJcbmNvbnN0IHBvaW50ID0gbmV3IEF1ZGlvKFwiYXVkaW8vcG9pbnQubXAzXCIpO1xyXG5jb25zdCBkaWUgPSBuZXcgQXVkaW8oXCJhdWRpby9kaWUubXAzXCIpO1xyXG5jb25zdCBoaXQgPSBuZXcgQXVkaW8oXCJhdWRpby9oaXQubXAzXCIpO1xyXG5jb25zdCBhdWRpb1BsYXllciA9IG5ldyBBdWRpbyhcImF1ZGlvL29yY2hlc3RyYXdhdi0yNjE1OC5tcDNcIik7XHJcbmNvbnN0IGF1ZGlvID0gbmV3IEF1ZGlvKFwiYXVkaW8vc3dvb3NoLm1wM1wiKTtcclxuY29uc3QgQmlyZF9XaWR0aCA9IDUwO1xyXG5jb25zdCBCaXJkX0hlaWdodCA9IDUwO1xyXG5jb25zdCBCaXJkX1ggPSAxMDA7XHJcbmNvbnN0IEJpcmRfWSA9IDI4MDtcclxuXHJcbmV4cG9ydCBjbGFzcyBQbGF5U2NlbmUgZXh0ZW5kcyBTY2VuZSB7XHJcbiAgICBiaXJkOiBCaXJkO1xyXG4gICAgcGlwZXM6IExpc3RQYWlyT2ZQaXBlcztcclxuICAgIGdyb3VuZDogR3JvdW5kO1xyXG4gICAgY2hlY2tQaXBlOiBib29sZWFuO1xyXG4gICAgdGV4dFNjb3JlOiBUZXh0T2JqZWN0O1xyXG4gICAgdGV4dERlc2NyaXB0aW9uOiBUZXh0T2JqZWN0O1xyXG4gICAgYWRkU2NvcmU6IG51bWJlciB8IG51bGw7XHJcbiAgICBzY29yZTogU2NvcmU7XHJcbiAgICBkZWFkQmlyZDogYm9vbGVhbjtcclxuICAgIHBhbmVsR2FtZU92ZXIgOiBQYW5lbEdhbWVPdmVyO1xyXG4gICAgc3RhcnQ6IGJvb2xlYW47XHJcbiAgICBwYXVzZTogYm9vbGVhbjtcclxuICAgIGNvbnN0cnVjdG9yKHNjZW5lTWFuYWdlciA6IFNjZW5lTWFuYWdlcil7XHJcbiAgICAgICAgc3VwZXIoc2NlbmVNYW5hZ2VyKTtcclxuICAgICAgICAvLyBwbGF5IGF1ZGlvXHJcbiAgICAgICAgLy8gYXVkaW9QbGF5ZXIucGxheSgpO1xyXG4gICAgICAgIC8vIGF1ZGlvUGxheWVyLmxvb3AgPXRydWU7XHJcbiAgICAgICAgdGhpcy5jaGVja1BpcGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmFkZFNjb3JlID0gbnVsbDtcclxuICAgICAgICB0aGlzLmRlYWRCaXJkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zdGFydCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucGF1c2UgPSBmYWxzZTsgXHJcbiAgICAgICAgdGhpcy5zY29yZSA9IG5ldyBTY29yZSgpO1xyXG5cclxuICAgICAgICB0aGlzLmJpcmQgPSAgbmV3IEJpcmQodGhpcylcclxuICAgICAgICAvLyBzZXQgYXR0cmlidXRlc1xyXG4gICAgICAgIHRoaXMuYmlyZC54ID0gQmlyZF9YO1xyXG4gICAgICAgIHRoaXMuYmlyZC55ID0gQmlyZF9ZO1xyXG4gICAgICAgIHRoaXMuYmlyZC53aWR0aCA9IEJpcmRfV2lkdGg7XHJcbiAgICAgICAgdGhpcy5iaXJkLmhlaWdodCA9IEJpcmRfSGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuYmlyZC5ncmF2aXR5ID0gMC41O1xyXG4gICAgICAgIHRoaXMuYmlyZC5zcGVlZCA9IDIwO1xyXG4gICAgICAgIHRoaXMuYmlyZC56X2luZGV4ID0gMjtcclxuICAgICAgICB0aGlzLmJpcmQuZGVmYXVsdFBvc2l0aW9uID0gW3RoaXMuYmlyZC54LCB0aGlzLmJpcmQueV07XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy50ZXh0RGVzY3JpcHRpb24gPSBuZXcgVGV4dE9iamVjdCh0aGlzKTtcclxuICAgICAgICAvLyBzZXQgYXR0cmlidXRlc1xyXG4gICAgICAgIHRoaXMudGV4dERlc2NyaXB0aW9uLnggPSAxNDA7XHJcbiAgICAgICAgdGhpcy50ZXh0RGVzY3JpcHRpb24ueSA9IDQ1MDtcclxuICAgICAgICB0aGlzLnRleHREZXNjcmlwdGlvbi5jb250ZW50ID0gXCJQcmVzcyBFbnRlciB0byBjb250aW51ZVwiO1xyXG4gICAgICAgIHRoaXMudGV4dERlc2NyaXB0aW9uLmZvbnQgPSBcIjMwcHggQXJpYWxcIjtcclxuICAgICAgICB0aGlzLnRleHREZXNjcmlwdGlvbi5jb2xvciA9IFwid2hpdGVcIjtcclxuICAgICAgICB0aGlzLnRleHREZXNjcmlwdGlvbi56X2luZGV4ID0gMjtcclxuICAgICAgICB0aGlzLnRleHREZXNjcmlwdGlvbi5zZXRBY3RpdmUoZmFsc2UpO1xyXG4gICAgICAgIHRoaXMudGV4dERlc2NyaXB0aW9uLmRlZmF1bHRQb3NpdGlvbiA9IFsxNDAsNDUwXTtcclxuXHJcbiAgICAgICAgdGhpcy50ZXh0U2NvcmUgPSBuZXcgVGV4dE9iamVjdCh0aGlzKTtcclxuICAgICAgICB0aGlzLnRleHRTY29yZS54ID0gMTA7XHJcbiAgICAgICAgdGhpcy50ZXh0U2NvcmUueSA9IDMwO1xyXG4gICAgICAgIHRoaXMudGV4dFNjb3JlLmNvbnRlbnQgPSBcIlNjb3JlOiBcIisgdGhpcy5zY29yZS5nZXRDdXJyZW50U2NvcmUoKTtcclxuICAgICAgICB0aGlzLnRleHRTY29yZS5mb250ID0gXCIxOHB4IEFyaWFsXCI7XHJcbiAgICAgICAgdGhpcy50ZXh0U2NvcmUuY29sb3IgPSBcIndoaXRlXCI7XHJcbiAgICAgICAgdGhpcy50ZXh0U2NvcmUuel9pbmRleCA9IDI7XHJcbiAgICAgICAgdGhpcy50ZXh0U2NvcmUuZGVmYXVsdFBvc2l0aW9uID0gWzEwLDMwXTtcclxuXHJcbiAgICAgICAgdmFyIGJnID0gbmV3IEltYWdlT2JqZWN0KHRoaXMsXCJiYWNrZ3JvdW5kXCIpO1xyXG4gICAgICAgIC8vIHNldCBhdHRyaWJ1dGVzXHJcbiAgICAgICAgYmcud2lkdGggPSA3MDA7XHJcbiAgICAgICAgYmcuaGVpZ2h0ID0gODAwO1xyXG4gICAgICAgIGJnLm5hbWUgPSBcImJhY2tncm91bmRcIjtcclxuXHJcbiAgICAgICAgdGhpcy5ncm91bmQgPSBuZXcgR3JvdW5kKHRoaXMsNCk7XHJcbiAgICAgICAgdGhpcy5waXBlcyA9IG5ldyBMaXN0UGFpck9mUGlwZXModGhpcyk7XHJcblxyXG4gICAgICAgIC8vIGluaXQgcGFuZWxHYW1lT3ZlclxyXG4gICAgICAgIHZhciBpbWdHYW1lT3ZlciA9IG5ldyBJbWFnZU9iamVjdCh0aGlzLFwiZ2FtZW92ZXJcIik7XHJcbiAgICAgICAgaW1nR2FtZU92ZXIueCA9IDYwO1xyXG4gICAgICAgIGltZ0dhbWVPdmVyLnkgPSAzMDA7XHJcbiAgICAgICAgaW1nR2FtZU92ZXIud2lkdGggPSA1MDA7XHJcbiAgICAgICAgaW1nR2FtZU92ZXIuaGVpZ2h0ID0gMTMwO1xyXG4gICAgICAgIGltZ0dhbWVPdmVyLnpfaW5kZXggPSAzO1xyXG4gICAgICAgIGltZ0dhbWVPdmVyLmRlZmF1bHRQb3NpdGlvbiA9IFs2MCwzMDBdO1xyXG5cclxuICAgICAgICB2YXIgdGV4dEN1cnJlbnRTY29yZSA9IG5ldyBUZXh0T2JqZWN0KHRoaXMpO1xyXG4gICAgICAgIHRleHRDdXJyZW50U2NvcmUueCA9IDExMDtcclxuICAgICAgICB0ZXh0Q3VycmVudFNjb3JlLnkgPSA0NzA7XHJcbiAgICAgICAgdGV4dEN1cnJlbnRTY29yZS5jb250ZW50ID0gXCJTY29yZTogMFwiO1xyXG4gICAgICAgIHRleHRDdXJyZW50U2NvcmUuZm9udCA9IFwiMzBweCBBcmlhbFwiO1xyXG4gICAgICAgIHRleHRDdXJyZW50U2NvcmUuY29sb3IgPSBcIndoaXRlXCI7XHJcbiAgICAgICAgdGV4dEN1cnJlbnRTY29yZS56X2luZGV4ID0gMztcclxuICAgICAgICB0ZXh0Q3VycmVudFNjb3JlLmRlZmF1bHRQb3NpdGlvbiA9IFsxMTAsNDcwXTtcclxuXHJcbiAgICAgICAgdmFyIHRleHRIaWdoU2NvcmUgPSBuZXcgVGV4dE9iamVjdCh0aGlzKTtcclxuICAgICAgICB0ZXh0SGlnaFNjb3JlLnggPSAzMzA7XHJcbiAgICAgICAgdGV4dEhpZ2hTY29yZS55ID0gNDcwO1xyXG4gICAgICAgIHRleHRIaWdoU2NvcmUuY29udGVudCA9IFwiSGlnaCBTY29yZTogMFwiO1xyXG4gICAgICAgIHRleHRIaWdoU2NvcmUuZm9udCA9IFwiMzBweCBBcmlhbFwiO1xyXG4gICAgICAgIHRleHRIaWdoU2NvcmUuY29sb3IgPSBcIndoaXRlXCI7XHJcbiAgICAgICAgdGV4dEhpZ2hTY29yZS56X2luZGV4ID0gMztcclxuICAgICAgICB0ZXh0SGlnaFNjb3JlLmRlZmF1bHRQb3NpdGlvbiA9IFszMzAsNDcwXVxyXG5cclxuICAgICAgICB2YXIgYnV0dG9uUmVwbGF5ID0gbmV3IEJ1dHRvbk9iamVjdCh0aGlzLFwicmVwbGF5QnV0dG9uXCIpO1xyXG4gICAgICAgIGJ1dHRvblJlcGxheS54ID0gMjI1O1xyXG4gICAgICAgIGJ1dHRvblJlcGxheS55ID0gNTAwO1xyXG4gICAgICAgIGJ1dHRvblJlcGxheS53aWR0aCA9IDE2MDtcclxuICAgICAgICBidXR0b25SZXBsYXkuaGVpZ2h0ID0gODA7XHJcbiAgICAgICAgYnV0dG9uUmVwbGF5LnpfaW5kZXggPSAzO1xyXG4gICAgICAgIGJ1dHRvblJlcGxheS5kZWZhdWx0UG9zaXRpb24gPSBbMjI1LDUwMF07XHJcblxyXG4gICAgICAgIHRoaXMucGFuZWxHYW1lT3ZlciA9IG5ldyBQYW5lbEdhbWVPdmVyKFxyXG4gICAgICAgICAgICBpbWdHYW1lT3Zlcix0ZXh0Q3VycmVudFNjb3JlLHRleHRIaWdoU2NvcmUsYnV0dG9uUmVwbGF5XHJcbiAgICAgICAgKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBMaXN0IG9mIEdhbWVPYmplY3RcclxuICAgICAgICB2YXIgbGlzdEdhbWVPYmplY3QgOkFycmF5PEdhbWVPYmplY3Q+ID0gW2JnLHRoaXMuYmlyZCx0aGlzLnRleHRTY29yZSwgdGhpcy50ZXh0RGVzY3JpcHRpb25dO1xyXG4gICAgICAgIGxpc3RHYW1lT2JqZWN0ID0gIGxpc3RHYW1lT2JqZWN0LmNvbmNhdCh0aGlzLmdyb3VuZC5nZXRDb21wb25lbnQoKSk7XHJcbiAgICAgICAgbGlzdEdhbWVPYmplY3QgPSBsaXN0R2FtZU9iamVjdC5jb25jYXQodGhpcy5wYW5lbEdhbWVPdmVyLmdldENvbXBvbmVudCgpKTtcclxuICAgICAgICBcclxuICAgICAgICBmb3IodmFyIGk9MDtpPHRoaXMucGlwZXMubGlzdFBpcGUubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIHZhciBwaXBlID0gdGhpcy5waXBlcy5saXN0UGlwZVtpXTtcclxuICAgICAgICAgICAgbGlzdEdhbWVPYmplY3QgPSBsaXN0R2FtZU9iamVjdC5jb25jYXQocGlwZS5nZXRDb21wb25lbnQoKSlcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJsaXN0R2FtZU9iamVjdFwiLGxpc3RHYW1lT2JqZWN0KVxyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQobGlzdEdhbWVPYmplY3QpO1xyXG4gICAgICAgIC8vIGhpZGVuIHBhbmVsR2FtZU92ZXJcclxuICAgICAgICB0aGlzLnBhbmVsR2FtZU92ZXIuc2V0QWN0aXZlKGZhbHNlKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgdXBkYXRlKHRpbWU6IG51bWJlciwgZGVsdGFUaW1lOiBudW1iZXIpIHtcclxuICAgICAgICBpZiggIXRoaXMuZGVhZEJpcmQgJiYgdGhpcy5zdGFydCAmJiAhdGhpcy5wYXVzZSl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMucHJvY2Vzc0lucHV0LmlucHV0S2V5ID09PSBcIktleUFcIil7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhdXNlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMudGV4dERlc2NyaXB0aW9uLnNldEFjdGl2ZSh0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgcGlwZXMgPSB0aGlzLmdhbWVPYmplY3RzLmZpbHRlcigoaW1iKT0+e1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGltYi5uYW1lID09PSBcInBpcGVcIjtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB2YXIgY2hlY2tTY29yZSA9IHRoaXMuZ2FtZU9iamVjdHMuZmlsdGVyKChpbWIpPT57XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaW1iLm5hbWUgPT09IFwiY2hlY2tTY29yZVwiO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB0aGlzLmdyb3VuZC51cGRhdGUodGltZSwgZGVsdGFUaW1lKTtcclxuICAgICAgICAgICAgZm9yKHZhciBqID0gMDsgaiA8IHBpcGVzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmNvbGxpc2lvbi5oYW5kbGVDb2xsaXNpb24ocGlwZXNbal0sdGhpcy5iaXJkKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja1BpcGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZ2FtZSBvdmVyIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IGNoZWNrU2NvcmUubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuY29sbGlzaW9uLmhhbmRsZUNvbGxpc2lvbihjaGVja1Njb3JlW2tdLHRoaXMuYmlyZCkmJiB0aGlzLmFkZFNjb3JlICE9IGspe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NvcmUuc2V0Q3VycmVudFNjb3JlKHRoaXMuc2NvcmUuZ2V0Q3VycmVudFNjb3JlKCkrMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXh0U2NvcmUuY29udGVudCA9IFwiU2NvcmU6IFwiICsgdGhpcy5zY29yZS5nZXRDdXJyZW50U2NvcmUoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFNjb3JlID0gaztcclxuICAgICAgICAgICAgICAgICAgICBwb2ludC5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5waXBlcy5saXN0UGlwZS5tYXAoKHBpcGUpID0+IHtcclxuICAgICAgICAgICAgICAgIHBpcGUudXBkYXRlKHRpbWUsIGRlbHRhVGltZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLnBpcGVzLnVwZGF0ZSgpO1xyXG5cclxuICAgICAgICAgICAgaWYodGhpcy5wcm9jZXNzSW5wdXQuaW5wdXRLZXk9PT1cIlNwYWNlXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmlyZC5mbHkoKTtcclxuICAgICAgICAgICAgICAgIGF1ZGlvLnBsYXkoKTsgXHJcbiAgICAgICAgICAgICAgICBhdWRpby5wbGF5YmFja1JhdGUgPSAyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIHZhIGNoYW0gZ3JvdW5kXHJcbiAgICAgICAgICAgIGlmKHRoaXMuY29sbGlzaW9uLmhhbmRsZUNvbGxpc2lvbih0aGlzLmdyb3VuZC5nZXRDb21wb25lbnQoKVswXSwgdGhpcy5iaXJkKXx8dGhpcy5jb2xsaXNpb24uaGFuZGxlQ29sbGlzaW9uKHRoaXMuZ3JvdW5kLmdldENvbXBvbmVudCgpWzFdLCB0aGlzLmJpcmQpfHx0aGlzLmNoZWNrUGlwZSl7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLnNjb3JlLmdldEN1cnJlbnRTY29yZSgpPiB0aGlzLnNjb3JlLmdldEhpZ2hTY29yZSgpKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NvcmUuc2V0SGlnaFNjb3JlKHRoaXMuc2NvcmUuZ2V0Q3VycmVudFNjb3JlKCkpO1xyXG4gICAgICAgICAgICAgICAgLy8gdXBkYXRlIHNjb3JlXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhbmVsR2FtZU92ZXIudXBkYXRlKHRoaXMuc2NvcmUuZ2V0Q3VycmVudFNjb3JlKCksIHRoaXMuc2NvcmUuZ2V0SGlnaFNjb3JlKCkpO1xyXG4gICAgICAgICAgICAgICAgLy8gc2V0IHN0YXRlIGJpcmQgaXMgZGllXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlYWRCaXJkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIC8vIHBsYXkgYXVkaW9cclxuICAgICAgICAgICAgICAgIGF1ZGlvUGxheWVyLnBhdXNlKCk7XHJcbiAgICAgICAgICAgICAgICBoaXQucGxheSgpO1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PntcclxuICAgICAgICAgICAgICAgICAgICAvLyBzaG93IHBhbmVsR2FtZU92ZXJcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhbmVsR2FtZU92ZXIuc2V0QWN0aXZlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRpZS5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICB9LCA1MDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHN1cGVyLnVwZGF0ZSh0aW1lLCBkZWx0YVRpbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHRoaXMuZGVhZEJpcmQpe1xyXG4gICAgICAgICAgICBpZighdGhpcy5jb2xsaXNpb24uaGFuZGxlQ29sbGlzaW9uKHRoaXMuZ3JvdW5kLmdldENvbXBvbmVudCgpWzBdLCB0aGlzLmJpcmQpJiYhdGhpcy5jb2xsaXNpb24uaGFuZGxlQ29sbGlzaW9uKHRoaXMuZ3JvdW5kLmdldENvbXBvbmVudCgpWzFdLCB0aGlzLmJpcmQpKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmlyZC5zcGVlZCA9IDEwMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmlyZC51cGRhdGUodGltZSwgZGVsdGFUaW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZigodGhpcy5wcm9jZXNzSW5wdXQuaW5wdXRLZXkgPT09IFwiRW50ZXJcInx8dGhpcy5wcm9jZXNzSW5wdXQubW91c2VFdmVudCE9bnVsbCYmIHRoaXMucGFuZWxHYW1lT3Zlci5yZXBsYXlCdXR0b24uaXNJbnNpZGUodGhpcy5wcm9jZXNzSW5wdXQubW91c2VFdmVudCkpKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVhZEJpcmQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGFuZWxHYW1lT3Zlci5zZXRBY3RpdmUoZmFsc2UpOyBcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NlbmVNYW5hZ2VyLnN3aXRjaFNjZW5lKDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoIXRoaXMuc3RhcnQpe1xyXG4gICAgICAgICAgICBpZih0aGlzLnByb2Nlc3NJbnB1dC5pbnB1dEtleSA9PT0gXCJTcGFjZVwiKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMucGF1c2Upe1xyXG4gICAgICAgICAgICBpZih0aGlzLnByb2Nlc3NJbnB1dC5pbnB1dEtleSA9PT0gXCJFbnRlclwiKXtcclxuICAgICAgICAgICAgICAgIHRoaXMucGF1c2UgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMudGV4dERlc2NyaXB0aW9uLnNldEFjdGl2ZShmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXNldFNjZW5lKCl7XHJcbiAgICAgICAgLy8gYXVkaW9QbGF5ZXIucGxheSgpO1xyXG4gICAgICAgIC8vIGF1ZGlvUGxheWVyLmxvb3AgPXRydWU7XHJcbiAgICAgICAgdGhpcy5jaGVja1BpcGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmFkZFNjb3JlID0gbnVsbDtcclxuICAgICAgICB0aGlzLnN0YXJ0ID0gZmFsc2U7XHJcbiAgICAgICAgc3VwZXIucmVzZXRTY2VuZSgpO1xyXG4gICAgICAgIHRoaXMuc2NvcmUuc2V0Q3VycmVudFNjb3JlKDApO1xyXG4gICAgICAgIHRoaXMudGV4dFNjb3JlLnNldENvbnRlbnQoXCJTY29yZTogMFwiKTtcclxuICAgICAgICB0aGlzLmJpcmQucmVzZXQoKTtcclxuICAgICAgICB0aGlzLmdyb3VuZC5yZXNldCgpO1xyXG4gICAgICAgIGZvcih2YXIgaT0wO2k8dGhpcy5waXBlcy5saXN0UGlwZS5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgdGhpcy5waXBlcy5saXN0UGlwZVtpXS5yZXNldCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyhcInJlc2V0IHJlbmRlcmluZ1wiKTtcclxuICAgIH1cclxufVxyXG4iLCJjbGFzcyBTY29yZXtcclxuICAgIHByaXZhdGUgaGlnaFNjb3JlOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIGN1cnJlbnRTY29yZTogbnVtYmVyO1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICB0aGlzLmhpZ2hTY29yZSA9IDA7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50U2NvcmUgPSAwO1xyXG4gICAgfVxyXG4gICAgc2V0Q3VycmVudFNjb3JlKHNjb3JlOiBudW1iZXIpe1xyXG4gICAgICAgIHRoaXMuY3VycmVudFNjb3JlID0gc2NvcmU7XHJcbiAgICB9XHJcbiAgICBnZXRDdXJyZW50U2NvcmUoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50U2NvcmU7XHJcbiAgICB9XHJcbiAgICBnZXRIaWdoU2NvcmUoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5oaWdoU2NvcmU7XHJcbiAgICB9XHJcbiAgICBzZXRIaWdoU2NvcmUoaGlnaFNjb3JlOiBudW1iZXIpe1xyXG4gICAgICAgIHRoaXMuaGlnaFNjb3JlID0gaGlnaFNjb3JlO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCB7U2NvcmV9OyIsImltcG9ydCB7U2NlbmV9IGZyb20gJy4uL0VuZ2luZS9TY2VuZS9TY2VuZSc7XHJcbmltcG9ydCB7IEltYWdlT2JqZWN0IH0gZnJvbSAnLi4vRW5naW5lL0ltYWdlT2JqZWN0L0ltYWdlT2JqZWN0JztcclxuaW1wb3J0IHsgQnV0dG9uT2JqZWN0IH0gZnJvbSAnLi4vRW5naW5lL0J1dHRvbk9iamVjdC9CdXR0b25PYmplY3QnO1xyXG5pbXBvcnQge0dyb3VuZH0gZnJvbSBcIi4vR3JvdW5kXCJcclxuaW1wb3J0IHsgU2NlbmVNYW5hZ2VyIH0gZnJvbSAnLi4vRW5naW5lL1NjZW5lL1NjZW5lTWFuYWdlcic7XHJcblxyXG5leHBvcnQgY2xhc3MgU3RhcnRTY2VuZSBleHRlbmRzIFNjZW5lIHtcclxuICAgIGJhY2tncm91bmQ6IEltYWdlT2JqZWN0O1xyXG4gICAgZ3JvdW5kOiBHcm91bmQ7XHJcbiAgICBpbWdTdGFydDogSW1hZ2VPYmplY3Q7XHJcbiAgICBidXR0b25TdGFydDogQnV0dG9uT2JqZWN0XHJcbiAgICBjb25zdHJ1Y3RvcihzY2VuZU1hbmFnZXIgOiBTY2VuZU1hbmFnZXIpe1xyXG4gICAgICAgIHN1cGVyKHNjZW5lTWFuYWdlcik7XHJcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kID1uZXcgSW1hZ2VPYmplY3QodGhpcyxcImJhY2tncm91bmRcIik7XHJcbiAgICAgICAgLy8gc2V0IGF0dHJpYnV0ZXNcclxuICAgICAgICB0aGlzLmJhY2tncm91bmQud2lkdGggPSA3MDA7XHJcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kLmhlaWdodCA9IDgwMDtcclxuICAgICAgICB0aGlzLmJhY2tncm91bmQubmFtZSA9IFwiYmFja2dyb3VuZFwiXHJcblxyXG4gICAgICAgIHRoaXMuaW1nU3RhcnQgPSBuZXcgSW1hZ2VPYmplY3QodGhpcyxcIm1lc3NhZ2VcIik7XHJcbiAgICAgICAgLy8gc2V0IGF0dHJpYnV0ZXNcclxuICAgICAgICB0aGlzLmltZ1N0YXJ0LndpZHRoID01MDAsXHJcbiAgICAgICAgdGhpcy5pbWdTdGFydC5oZWlnaHQgPSA3MDA7XHJcbiAgICAgICAgdGhpcy5pbWdTdGFydC54ID0gNTA7XHJcbiAgICAgICAgdGhpcy5pbWdTdGFydC55ID0gMjA7XHJcbiAgICAgICAgdGhpcy5pbWdTdGFydC56X2luZGV4ID0gMjtcclxuXHJcbiAgICAgICAgdGhpcy5idXR0b25TdGFydCA9IG5ldyBCdXR0b25PYmplY3QodGhpcyxcIm51bGxcIik7XHJcbiAgICAgICAgLy8gc2V0IGF0dHJpYnV0ZXNcclxuICAgICAgICB0aGlzLmJ1dHRvblN0YXJ0LndpZHRoID0gNzAwO1xyXG4gICAgICAgIHRoaXMuYnV0dG9uU3RhcnQuaGVpZ2h0ID0gODAwO1xyXG4gICAgICAgIHRoaXMuYnV0dG9uU3RhcnQubmFtZSA9IFwiYnV0dG9uU3RhcnRcIjtcclxuXHJcbiAgICAgICAgdGhpcy5ncm91bmQgPSBuZXcgR3JvdW5kKHRoaXMsMilcclxuICAgICAgICB2YXIgaW1hZ2VPYmplY3RzID0gW3RoaXMuYmFja2dyb3VuZF0uY29uY2F0KHRoaXMuZ3JvdW5kLmdldENvbXBvbmVudCgpKTtcclxuICAgICAgICBpbWFnZU9iamVjdHMucHVzaCh0aGlzLmltZ1N0YXJ0KTtcclxuICAgICAgICB0aGlzLmFkZENoaWxkKGltYWdlT2JqZWN0cyk7XHJcbiAgICB9XHJcbiAgICB1cGRhdGUodGltZTogbnVtYmVyLCBkZWx0YVRpbWU6IG51bWJlcil7XHJcbiAgICAgICAgdGhpcy5ncm91bmQudXBkYXRlKHRpbWUsIGRlbHRhVGltZSk7XHJcbiAgICAgICAgaWYodGhpcy5wcm9jZXNzSW5wdXQuaW5wdXRLZXkgPT09IFwiRW50ZXJcInx8dGhpcy5wcm9jZXNzSW5wdXQuaW5wdXRLZXkgPT09IFwiU3BhY2VcIiB8fCh0aGlzLnByb2Nlc3NJbnB1dC5tb3VzZUV2ZW50IT1udWxsICYmIHRoaXMuYnV0dG9uU3RhcnQuaXNJbnNpZGUodGhpcy5wcm9jZXNzSW5wdXQubW91c2VFdmVudCkpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2NlbmVNYW5hZ2VyLnN3aXRjaFNjZW5lKDEpXHJcbiAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBTdGFydFNjZW5lIH0gZnJvbSBcIi4vZ2FtZS9TdGFydFNjZW5lXCI7XHJcbmltcG9ydCB7IFJlbmRlcmVyIH0gZnJvbSBcIi4vRW5naW5lL1JlbmRlcmVyL1JlbmRlcmVyXCI7XHJcbmltcG9ydCB7IFNjZW5lTWFuYWdlciB9IGZyb20gXCIuL0VuZ2luZS9TY2VuZS9TY2VuZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgR2FtZSB9IGZyb20gXCIuL0VuZ2luZS9Db3JlL0dhbWVcIjsgIFxyXG5pbXBvcnQge1BsYXlTY2VuZX0gZnJvbSBcIi4vZ2FtZS9QbGF5U2NlbmVcIjtcclxuXHJcbnZhciBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbXlDYW52YXMnKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcclxudmFyIG15R2FtZSA9IG5ldyBHYW1lKCk7XHJcbnZhciByZW5kZXIgPSBuZXcgUmVuZGVyZXIoY2FudmFzKVxyXG52YXIgZ2FtZVNjZW5lID0gbmV3IFNjZW5lTWFuYWdlcihteUdhbWUpO1xyXG5cclxuY29uc3QgaW1hZ2VzTG9hZCA9IFtcclxuICAgIHtcclxuICAgICAgICBcImtleVwiOiBcImJpcmQwXCIsXHJcbiAgICAgICAgXCJwYXRoXCI6IFwiSW1hZ2VzL2JpcmQvZnJhbWUtMS5wbmdcIixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJrZXlcIjogXCJiaXJkMVwiLFxyXG4gICAgICAgIFwicGF0aFwiOiBcIkltYWdlcy9iaXJkL2ZyYW1lLTIucG5nXCIsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwia2V5XCI6IFwiYmlyZDJcIixcclxuICAgICAgICBcInBhdGhcIjogXCJJbWFnZXMvYmlyZC9mcmFtZS0zLnBuZ1wiLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImtleVwiOiBcImJpcmQzXCIsXHJcbiAgICAgICAgXCJwYXRoXCI6IFwiSW1hZ2VzL2JpcmQvZnJhbWUtNC5wbmdcIixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJrZXlcIjogXCJiaXJkNFwiLFxyXG4gICAgICAgIFwicGF0aFwiOiBcIkltYWdlcy9iaXJkL2ZyYW1lLTUucG5nXCIsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwia2V5XCI6IFwiYmlyZDVcIixcclxuICAgICAgICBcInBhdGhcIjogXCJJbWFnZXMvYmlyZC9mcmFtZS02LnBuZ1wiLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImtleVwiOiBcImJpcmQ2XCIsXHJcbiAgICAgICAgXCJwYXRoXCI6IFwiSW1hZ2VzL2JpcmQvZnJhbWUtNy5wbmdcIixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJrZXlcIjogXCJiaXJkN1wiLFxyXG4gICAgICAgIFwicGF0aFwiOiBcIkltYWdlcy9iaXJkL2ZyYW1lLTgucG5nXCIsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwia2V5XCI6IFwicGlwZVwiLFxyXG4gICAgICAgIFwicGF0aFwiOiBcIkltYWdlcy9waXBlL3BpcGUtZ3JlZW4ucG5nXCIsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwia2V5XCI6IFwibWVzc2FnZVwiLFxyXG4gICAgICAgIFwicGF0aFwiOiBcIkltYWdlcy9nYW1lU3RhcnQvbWVzc2FnZS5wbmdcIixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJrZXlcIjogXCJncm91bmRcIixcclxuICAgICAgICBcInBhdGhcIjogXCJJbWFnZXMvZ3JvdW5kL2Jhc2UucG5nXCIsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwia2V5XCI6IFwiZ2FtZW92ZXJcIixcclxuICAgICAgICBcInBhdGhcIjogXCJJbWFnZXMvcGFuZWxHYW1lT3Zlci9nYW1lb3Zlci5wbmdcIixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJrZXlcIjogXCJyZXBsYXlCdXR0b25cIixcclxuICAgICAgICBcInBhdGhcIjogXCJJbWFnZXMvcGFuZWxHYW1lT3Zlci9yZXBsYXktYnV0dG9uLnBuZ1wiLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImtleVwiOiBcImJhY2tncm91bmRcIixcclxuICAgICAgICBcInBhdGhcIjogXCJJbWFnZXMvYmFja2dyb3VuZC9iYWNrZ3JvdW5kLW5pZ2h0LnBuZ1wiXHJcbiAgICB9XHJcbl1cclxuXHJcbmNvbnN0IHByb21pc2VzID0gaW1hZ2VzTG9hZC5tYXAoKGltYWdlKSA9PiBteUdhbWUubG9hZGVyLmFkZEltYWdlKGltYWdlW1wicGF0aFwiXSwgaW1hZ2VbXCJrZXlcIl0pKVxyXG5Qcm9taXNlLmFsbChwcm9taXNlcykudGhlbigoKT0+IHtcclxuICAgIHZhciBzdGFydFNjZW5lID0gbmV3IFN0YXJ0U2NlbmUoZ2FtZVNjZW5lKTtcclxuICAgIHZhciBwbGF5U2NlbmUgPSBuZXcgUGxheVNjZW5lKGdhbWVTY2VuZSk7XHJcbiAgICBnYW1lU2NlbmUuYWRkU2NlbmUoc3RhcnRTY2VuZSk7XHJcbiAgICBnYW1lU2NlbmUuYWRkU2NlbmUocGxheVNjZW5lKTtcclxuICAgIG15R2FtZS5zdGFydChyZW5kZXIsIGdhbWVTY2VuZSk7XHJcbn0pLmNhdGNoKChlcnJvcikgPT4ge2NvbnNvbGUubG9nKGVycm9yKX0pXHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==