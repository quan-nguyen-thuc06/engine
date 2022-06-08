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
            this.image = this.scene.game.loader.getImage(key);
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
            images.push(scene.game.loader.getImage(name));
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
        this.speed = -7;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUF3RDtBQUVqRCxNQUFNLFlBQWEsU0FBUSxpRUFBVztJQUN6QyxZQUFZLEtBQVksRUFBRSxHQUFXO1FBQ2pDLEtBQUssQ0FBQyxLQUFLLEVBQUMsR0FBRyxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUNELFFBQVEsQ0FBQyxHQUFrQjtRQUN2QixJQUFHLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQztZQUFFLE9BQU8sS0FBSyxDQUFDO1FBQ2hDLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzNHLENBQUM7Q0FDSjs7Ozs7Ozs7Ozs7Ozs7O0FDVE0sTUFBTSxTQUFTO0lBQ2xCLGVBQWUsQ0FBQyxJQUFpQixFQUFFLElBQWlCO1FBQ2hELElBQUcsSUFBSSxDQUFDLENBQUMsR0FBRSxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsSUFBRSxJQUFJLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLEdBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBQztZQUNqRSxJQUFHLElBQUksQ0FBQyxDQUFDLEdBQUUsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUUsSUFBSSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxJQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBQztnQkFDaEUsT0FBTyxJQUFJLENBQUM7YUFDZjtTQUNKO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztDQUNKOzs7Ozs7Ozs7Ozs7Ozs7OztBQ1J5RDtBQUNGO0FBQ2pELE1BQU0sSUFBSTtJQUtiLFlBQVksWUFBMEI7UUFDbEMsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7UUFDakMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7UUFDbEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLGtFQUFXLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksaUVBQVcsRUFBRSxDQUFDO0lBQ3BDLENBQUM7SUFFRCxLQUFLLENBQUMsTUFBZ0I7UUFDbEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN4RCxxQkFBcUIsQ0FBQyxHQUFFLEVBQUUsS0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRCxJQUFJLENBQUMsTUFBZ0I7UUFDakIsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUN0QyxNQUFNLEtBQUssR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUNuQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDeEUsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDckIscUJBQXFCLENBQUMsR0FBRSxFQUFFLEtBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNqRCxDQUFDO0NBQ0o7Ozs7Ozs7Ozs7Ozs7OztBQzNCTSxNQUFNLFVBQVU7SUFVbkIsWUFBWSxLQUFZO1FBQ3BCLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1gsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDWCxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7UUFDakIsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUN2QixDQUFDO0lBQ0QsS0FBSztRQUNELElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUNELFNBQVMsQ0FBQyxNQUFlO1FBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ3pCLENBQUM7SUFDRCxTQUFTO1FBQ0wsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7Q0FFSjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbENNLE1BQU0sV0FBVztJQUVwQjtRQUNJLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxHQUFHLEVBQTRCLENBQUM7SUFDdEQsQ0FBQztJQUNLLFFBQVEsQ0FBQyxHQUFXLEVBQUUsSUFBWTs7WUFDcEMsSUFBSSxHQUFHLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztZQUN0QixHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztZQUNkLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztZQUMzQixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO2dCQUNuQyxHQUFHLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQztnQkFDckIsR0FBRyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7WUFDekIsQ0FBQyxDQUFDO1FBQ04sQ0FBQztLQUFBO0lBQ0QsUUFBUSxDQUFDLElBQVk7UUFDakIsSUFBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7WUFDcEIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUUsQ0FBQztRQUNsQyxPQUFPLElBQUksS0FBSyxFQUFFLENBQUM7SUFDdkIsQ0FBQztDQUNKOzs7Ozs7Ozs7Ozs7Ozs7O0FDbkJrRDtBQUU1QyxNQUFNLFdBQVksU0FBUSw4REFBVTtJQUd2QyxZQUFZLEtBQVksRUFBRSxHQUFXO1FBQ2pDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNiLElBQUcsR0FBRyxJQUFFLE1BQU07WUFDVixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7O1lBQ3hCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBQ0QsTUFBTSxDQUFDLElBQVksRUFBRSxTQUFnQixJQUFFLENBQUM7Q0FDM0M7Ozs7Ozs7Ozs7Ozs7OztBQ1hNLE1BQU0sV0FBVztJQUNwQixXQUFXLENBQUMsWUFBMEIsRUFBRSxNQUFnQjtRQUNwRCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUUsYUFBWSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25ILFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUMsQ0FBQyxDQUFDLEVBQUMsRUFBRSxhQUFZLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUM5RyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUUsYUFBWSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDckksUUFBUSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBQyxDQUFDLENBQUMsRUFBQyxFQUFFLGFBQVksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO0lBQ3RILENBQUM7Q0FDSjs7Ozs7Ozs7Ozs7Ozs7O0FDVE0sTUFBTSxZQUFZO0lBR3JCO1FBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7SUFDM0IsQ0FBQztJQUNELFNBQVMsQ0FBQyxDQUFnQjtRQUN0QixJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUNELE9BQU87UUFDSCxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBQ0QsV0FBVyxDQUFDLENBQWEsRUFBRSxNQUF5QjtRQUNoRCxJQUFJLElBQUksR0FBRyxNQUFNLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUMxQyxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDbkMsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDbkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUNELFNBQVM7UUFDTCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztJQUMzQixDQUFDO0NBQ0o7Ozs7Ozs7Ozs7Ozs7OztBQ3BCTSxNQUFNLFFBQVE7SUFFakIsWUFBWSxNQUF5QjtRQUNqQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN6QixDQUFDO0lBQ0QsU0FBUyxDQUFDLFdBQXdCO1FBQzlCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pDLElBQUcsR0FBRyxJQUFFLElBQUksRUFBQztZQUNULEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNYLEdBQUcsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsS0FBSyxHQUFDLENBQUMsRUFBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDO1lBQ3ZGLEdBQUcsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sR0FBQyxJQUFJLENBQUMsRUFBRSxHQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzVDLEdBQUcsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEdBQUMsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBQyxDQUFDLEVBQUMsV0FBVyxDQUFDLEtBQUssRUFBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbEgsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ2pCO0lBQ0wsQ0FBQztJQUNELFVBQVUsQ0FBQyxNQUFjO1FBQ3JCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pDLElBQUcsR0FBRyxJQUFFLElBQUksRUFBQztZQUNULEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNYLEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsS0FBSyxHQUFDLENBQUMsRUFBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDO1lBQ25FLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBQyxJQUFJLENBQUMsRUFBRSxHQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZDLEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLEVBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUMsQ0FBQyxFQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQy9HLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUNqQjtJQUNMLENBQUM7SUFDRCxRQUFRLENBQUMsSUFBZ0I7UUFDckIsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekMsSUFBRyxHQUFHLElBQUUsSUFBSSxFQUFDO1lBQ1QsR0FBRyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ3JCLEdBQUcsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUMzQixHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDNUM7SUFDTCxDQUFDO0NBQ0o7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckN3RDtBQUNmO0FBQ1k7QUFHTTtBQUVUO0FBQzVDLE1BQU0sS0FBSztJQUtkLFlBQVksSUFBVTtRQUNsQixJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksb0VBQVksRUFBRSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSwyREFBUyxFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUNELFVBQVU7UUFDTixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDN0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUMvQjtJQUNMLENBQUM7SUFDRCxRQUFRLENBQUMsV0FBeUI7UUFDOUIsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFVBQVUsRUFBQyxFQUFFLEdBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUMsQ0FBQztJQUN0RSxDQUFDO0lBRUQsTUFBTSxDQUFDLE1BQWdCO1FBQ25CLHFDQUFxQztRQUNyQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsRUFBRTtZQUN6QixPQUFPLENBQUMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQztRQUNqQyxDQUFDLENBQUM7UUFDRixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDN0MsSUFBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFDO2dCQUMvQixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoQyxJQUFJLEdBQUcsWUFBWSxpRUFBVztvQkFDMUIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztxQkFDckIsSUFBRyxHQUFHLFlBQVksa0RBQU07b0JBQ3pCLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7cUJBQ3RCLElBQUcsR0FBRyxZQUFZLDhEQUFVO29CQUM3QixNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQzVCO1NBQ0o7SUFDTCxDQUFDO0lBQ0QsY0FBYztJQUNkLE1BQU0sQ0FBQyxJQUFZLEVBQUUsS0FBYTtRQUM5QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDN0MsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5QixJQUFJLEdBQUcsWUFBWSxpRUFBVyxJQUFJLEdBQUcsWUFBWSxrREFBTTtnQkFDbkQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDL0I7SUFDTCxDQUFDO0NBQ0o7Ozs7Ozs7Ozs7Ozs7OztBQ25ETSxNQUFNLFlBQVk7SUFHckI7UUFDSSxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBQ0QsUUFBUSxDQUFDLEtBQVk7UUFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQzNCLENBQUM7SUFDRCxXQUFXLENBQUMsU0FBaUI7UUFDekIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDNUMsSUFBSSxDQUFDLFlBQVksR0FBRyxTQUFTLENBQUM7SUFDbEMsQ0FBQztJQUNELE1BQU0sS0FBRyxDQUFDO0lBQ1YsTUFBTSxLQUFHLENBQUM7Q0FDYjs7Ozs7Ozs7Ozs7Ozs7OztBQ2xCa0Q7QUFFNUMsTUFBTSxNQUFPLFNBQVEsOERBQVU7SUFNbEMsWUFBWSxLQUFZLEVBQUMsTUFBK0I7UUFDcEQsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7UUFDakIsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7UUFDdEIsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7UUFDZCxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztJQUNqQixDQUFDO0lBQ0QsTUFBTSxDQUFDLElBQVksRUFBRSxTQUFnQjtJQUVyQyxDQUFDO0lBRUQsYUFBYSxDQUFDLElBQVksRUFBRSxTQUFnQjtRQUN4QyxJQUFJLENBQUMsR0FBRyxJQUFJLFNBQVM7UUFDckIsSUFBRyxJQUFJLENBQUMsR0FBRyxJQUFFLElBQUksQ0FBQyxJQUFJLEVBQUM7WUFDbkIsSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxZQUFZLElBQUcsQ0FBQyxDQUFDO1lBQ3RCLElBQUcsSUFBSSxDQUFDLFlBQVksR0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBQyxDQUFDLEVBQUM7Z0JBQ3RDLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO2FBQ3pCO1NBQ0o7SUFDTCxDQUFDO0NBQ0o7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvQmtEO0FBRTVDLE1BQU0sVUFBVyxTQUFRLDhEQUFVO0lBSXRDLFlBQVksS0FBWTtRQUNwQixLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDYixJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFDRCxVQUFVLENBQUMsT0FBZTtRQUN0QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUMzQixDQUFDO0NBQ0o7Ozs7Ozs7Ozs7Ozs7Ozs7QUNmZ0Q7QUFHMUMsTUFBTSxJQUFLLFNBQVEseURBQU07SUFHNUIsWUFBWSxLQUFZO1FBQ3BCLElBQUksTUFBTSxHQUEyQixFQUFFLENBQUM7UUFDeEMsNENBQTRDO1FBQzVDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRSxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUM7WUFDckIsSUFBSSxJQUFJLEdBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztZQUN2QixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQXFCLENBQUMsQ0FBQztTQUNyRTtRQUNELEtBQUssQ0FBQyxLQUFLLEVBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7UUFDbkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7UUFDakIsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDZixJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsR0FBQyxFQUFFLEdBQUMsSUFBSSxDQUFDO0lBQzVCLENBQUM7SUFDRCxNQUFNLENBQUMsSUFBWSxFQUFFLFNBQWdCO1FBQ2pDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUMsQ0FBQyxTQUFTLEdBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUQsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsT0FBTyxHQUFDLENBQUMsU0FBUyxHQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdDLElBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQ1QsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDZixJQUFHLElBQUksQ0FBQyxLQUFLLEdBQUMsQ0FBQyxFQUFDO1lBQ1osSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUM7WUFDbEIsSUFBRyxJQUFJLENBQUMsT0FBTyxHQUFDLEVBQUU7Z0JBQUUsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7U0FDekM7YUFDRztZQUNBLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDO1lBQ2xCLElBQUcsSUFBSSxDQUFDLE9BQU8sR0FBQyxDQUFDLEVBQUU7Z0JBQUUsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUN4QyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztTQUN2QztJQUNMLENBQUM7SUFFRCxHQUFHO1FBQ0MsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNwQixDQUFDO0lBQ0QsS0FBSztRQUNELEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNkLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO0lBQ25CLENBQUM7Q0FDSjs7Ozs7Ozs7Ozs7Ozs7OztBQzFDK0Q7QUFHaEUsTUFBTSxNQUFNO0lBR1IsWUFBWSxLQUFZLEVBQUUsS0FBYTtRQUNuQyxJQUFJLFlBQVksR0FBRyxJQUFJLHdFQUFXLENBQUMsS0FBSyxFQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ25ELFlBQVksQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDO1FBQzdCLFlBQVksQ0FBQyxPQUFPLEdBQUUsQ0FBQyxDQUFDO1FBQ3hCLFlBQVksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3JCLFlBQVksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO1FBQ3pCLFlBQVksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1FBQzFCLFlBQVksQ0FBQyxlQUFlLEdBQUUsQ0FBQyxDQUFDLEVBQUMsR0FBRyxDQUFDLENBQUM7UUFFdEMsSUFBSSxZQUFZLEdBQUcsSUFBSSx3RUFBVyxDQUFDLEtBQUssRUFBQyxRQUFRLENBQUMsQ0FBQztRQUNuRCxZQUFZLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQztRQUM3QixZQUFZLENBQUMsT0FBTyxHQUFFLENBQUMsQ0FBQztRQUN4QixZQUFZLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNyQixZQUFZLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNyQixZQUFZLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztRQUN6QixZQUFZLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztRQUMxQixZQUFZLENBQUMsZUFBZSxHQUFFLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRXhDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxZQUFZLEVBQUMsWUFBWSxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDdkIsQ0FBQztJQUNELE1BQU0sQ0FBQyxJQUFZLEVBQUUsU0FBaUI7UUFDbEMsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFDLENBQUMsRUFBRSxFQUFDO1lBQ2pDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLEdBQUMsQ0FBQyxTQUFTLEdBQUMsS0FBSyxDQUFDLENBQUM7WUFDakQsSUFBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFFLENBQUMsR0FBRyxDQUFDLEVBQUM7Z0JBQzFCLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsR0FBRyxDQUFDO2FBQ3ZEO1NBQ0o7SUFDTCxDQUFDO0lBQ0QsWUFBWTtRQUNSLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBQ0QsS0FBSztRQUNELEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUUsRUFBQztZQUNqQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQzFCO0lBQ0wsQ0FBQztDQUNKO0FBRWU7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0NnRDtBQUdoRSxNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUM7QUFDbkIsTUFBTSxVQUFVLEdBQUcsR0FBRyxDQUFDO0FBQ3ZCLE1BQU0sT0FBTyxHQUFHLENBQUMsQ0FBQztBQUNsQixNQUFNLFFBQVEsR0FBRyxHQUFHLENBQUM7QUFDckIsTUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDO0FBQ3JCLE1BQU0sVUFBVTtJQUdaLFlBQVksS0FBWSxFQUFDLENBQVEsRUFBRSxDQUFRLEVBQUMsS0FBYTtRQUNyRCxJQUFJLE1BQU0sR0FBRyxJQUFJLHdFQUFXLENBQUMsS0FBSyxFQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNDLGlCQUFpQjtRQUNqQixNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNiLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2IsTUFBTSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7UUFDekIsTUFBTSxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUM7UUFDM0IsTUFBTSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7UUFDckIsTUFBTSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7UUFDckIsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7UUFDbkIsc0JBQXNCO1FBQ3RCLE1BQU0sQ0FBQyxlQUFlLEdBQUcsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFFL0IsSUFBSSxRQUFRLEdBQUcsSUFBSSx3RUFBVyxDQUFDLEtBQUssRUFBQyxNQUFNLENBQUMsQ0FBQztRQUM3QyxpQkFBaUI7UUFDakIsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDZixRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBQyxVQUFVLEdBQUMsTUFBTSxDQUFDO1FBQ2pDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO1FBQzNCLFFBQVEsQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDO1FBQzdCLFFBQVEsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO1FBQ3ZCLFFBQVEsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLHNCQUFzQjtRQUN0QixRQUFRLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxVQUFVLEdBQUMsTUFBTSxDQUFDLENBQUM7UUFFbkQsSUFBSSxVQUFVLEdBQUcsSUFBSSx3RUFBVyxDQUFDLEtBQUssRUFBQyxNQUFNLENBQUMsQ0FBQztRQUMvQyxpQkFBaUI7UUFDakIsVUFBVSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUMsU0FBUyxDQUFDO1FBQzNCLFVBQVUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFDLFVBQVUsQ0FBQztRQUM1QixVQUFVLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUN0QixVQUFVLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUMzQixVQUFVLENBQUMsSUFBSSxHQUFHLFlBQVksQ0FBQztRQUMvQixVQUFVLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztRQUN2QixVQUFVLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQyxHQUFDLFNBQVMsRUFBQyxDQUFDLEdBQUMsVUFBVSxDQUFDLENBQUM7UUFFeEQsSUFBSSxDQUFDLEtBQUssR0FBRSxDQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsVUFBVSxDQUFDLENBQUM7UUFFekMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDdkIsQ0FBQztJQUNELE1BQU0sQ0FBQyxJQUFXLEVBQUUsU0FBZ0I7UUFDaEMsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFFLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQztZQUNwQixJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxHQUFDLENBQUMsU0FBUyxHQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ25EO0lBQ0wsQ0FBQztJQUNELEtBQUs7UUFDRCxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUUsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDO1lBQ3BCLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDekI7SUFDTCxDQUFDO0lBQ0QsWUFBWTtRQUNSLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUN0QixDQUFDO0NBQ0o7QUFFRCxNQUFNLGVBQWU7SUFFakIsWUFBWSxLQUFZO1FBQ3BCLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ25CLEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxPQUFPLEVBQUMsQ0FBQyxFQUFFLEVBQUM7WUFDdEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFDLFFBQVEsR0FBRyxTQUFTLEdBQUcsR0FBRyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDeEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxVQUFVLENBQUMsS0FBSyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDNUI7SUFDTCxDQUFDO0lBQ0QsTUFBTTtRQUNGLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFDLEtBQUssRUFBRSxFQUFFO1lBQzdCLElBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFHLEVBQUM7Z0JBQ3BCLElBQUksVUFBVSxHQUFHLEtBQUssR0FBRSxDQUFDLENBQUM7Z0JBQzFCLElBQUcsVUFBVSxHQUFDLENBQUM7b0JBQUUsVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQztnQkFDckQsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFDLENBQUMsRUFBRSxFQUFDO29CQUNwQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDO2lCQUNyRTthQUNKO1FBQ0wsQ0FBQyxDQUFDO0lBQ04sQ0FBQztDQUNKO0FBRW9DOzs7Ozs7Ozs7Ozs7Ozs7QUNwRjlCLE1BQU0sYUFBYTtJQUt0QixZQUFZLFdBQXdCLEVBQUUsWUFBd0IsRUFBRSxTQUFxQixFQUFFLFlBQTBCO1FBQzdHLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQy9CLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO0lBQ3JDLENBQUM7SUFDRCxTQUFTLENBQUMsTUFBZTtRQUNyQixJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBQ0QsWUFBWTtRQUNSLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDcEYsQ0FBQztJQUNELE1BQU0sQ0FBQyxZQUFvQixFQUFFLFNBQWlCO1FBQzFDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxjQUFjLEdBQUcsU0FBUyxDQUFDO0lBQ3pELENBQUM7Q0FDSjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUIyQztBQUNoQjtBQUNpQjtBQUNlO0FBQ0c7QUFDakM7QUFDRztBQUNZO0FBRW9CO0FBR2pFLE1BQU0sS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7QUFDM0MsTUFBTSxHQUFHLEdBQUcsSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDdkMsTUFBTSxHQUFHLEdBQUcsSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDdkMsTUFBTSxXQUFXLEdBQUcsSUFBSSxLQUFLLENBQUMsOEJBQThCLENBQUMsQ0FBQztBQUM5RCxNQUFNLEtBQUssR0FBRyxJQUFJLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBQzVDLE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQztBQUN0QixNQUFNLFdBQVcsR0FBRyxFQUFFLENBQUM7QUFDdkIsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDO0FBQ25CLE1BQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQztBQUVaLE1BQU0sU0FBVSxTQUFRLHNEQUFLO0lBYWhDLFlBQVksSUFBVTtRQUNsQixLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDWixhQUFhO1FBQ2Isc0JBQXNCO1FBQ3RCLDBCQUEwQjtRQUMxQixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN2QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUkseUNBQUssRUFBRSxDQUFDO1FBRXpCLElBQUksQ0FBQyxJQUFJLEdBQUksSUFBSSx1Q0FBSSxDQUFDLElBQUksQ0FBQztRQUMzQixpQkFBaUI7UUFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUM7UUFDN0IsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsV0FBVyxDQUFDO1FBQy9CLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztRQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV2RCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUkscUVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QyxpQkFBaUI7UUFDakIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQzdCLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUM3QixJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sR0FBRyx5QkFBeUIsQ0FBQztRQUN6RCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksR0FBRyxZQUFZLENBQUM7UUFDekMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsR0FBRyxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsQ0FBQztRQUVqRCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUkscUVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxHQUFHLFNBQVMsR0FBRSxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ2pFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLFlBQVksQ0FBQztRQUNuQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUM7UUFDL0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxHQUFHLENBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRXpDLElBQUksRUFBRSxHQUFHLElBQUksd0VBQVcsQ0FBQyxJQUFJLEVBQUMsWUFBWSxDQUFDLENBQUM7UUFDNUMsaUJBQWlCO1FBQ2pCLEVBQUUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO1FBQ2YsRUFBRSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7UUFDaEIsRUFBRSxDQUFDLElBQUksR0FBRyxZQUFZLENBQUM7UUFFdkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLDJDQUFNLENBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSx3REFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXZDLHFCQUFxQjtRQUNyQixJQUFJLFdBQVcsR0FBRyxJQUFJLHdFQUFXLENBQUMsSUFBSSxFQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ25ELFdBQVcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ25CLFdBQVcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3BCLFdBQVcsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO1FBQ3hCLFdBQVcsQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1FBQ3pCLFdBQVcsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ3hCLFdBQVcsQ0FBQyxlQUFlLEdBQUcsQ0FBQyxFQUFFLEVBQUMsR0FBRyxDQUFDLENBQUM7UUFFdkMsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLHFFQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUMsZ0JBQWdCLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUN6QixnQkFBZ0IsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3pCLGdCQUFnQixDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUM7UUFDdEMsZ0JBQWdCLENBQUMsSUFBSSxHQUFHLFlBQVksQ0FBQztRQUNyQyxnQkFBZ0IsQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDO1FBQ2pDLGdCQUFnQixDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7UUFDN0IsZ0JBQWdCLENBQUMsZUFBZSxHQUFHLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRTdDLElBQUksYUFBYSxHQUFHLElBQUkscUVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QyxhQUFhLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUN0QixhQUFhLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUN0QixhQUFhLENBQUMsT0FBTyxHQUFHLGVBQWUsQ0FBQztRQUN4QyxhQUFhLENBQUMsSUFBSSxHQUFHLFlBQVksQ0FBQztRQUNsQyxhQUFhLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQztRQUM5QixhQUFhLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztRQUMxQixhQUFhLENBQUMsZUFBZSxHQUFHLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQztRQUV6QyxJQUFJLFlBQVksR0FBRyxJQUFJLDJFQUFZLENBQUMsSUFBSSxFQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3pELFlBQVksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3JCLFlBQVksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3JCLFlBQVksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO1FBQ3pCLFlBQVksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ3pCLFlBQVksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLFlBQVksQ0FBQyxlQUFlLEdBQUcsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLENBQUM7UUFFekMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLHlEQUFhLENBQ2xDLFdBQVcsRUFBQyxnQkFBZ0IsRUFBQyxhQUFhLEVBQUMsWUFBWSxDQUMxRCxDQUFDO1FBRUYscUJBQXFCO1FBQ3JCLElBQUksY0FBYyxHQUFzQixDQUFDLEVBQUUsRUFBQyxJQUFJLENBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzVGLGNBQWMsR0FBSSxjQUFjLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztRQUNwRSxjQUFjLEdBQUcsY0FBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7UUFFMUUsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUUsRUFBQztZQUN6QyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsQyxjQUFjLEdBQUcsY0FBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDOUQ7UUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFDLGNBQWMsQ0FBQztRQUM1QyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzlCLHNCQUFzQjtRQUN0QixJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQsTUFBTSxDQUFDLElBQVksRUFBRSxTQUFpQjtRQUNsQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBQztZQUM1QyxJQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxLQUFLLE1BQU0sRUFBQztnQkFDckMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7Z0JBQ2xCLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3hDO1lBQ0QsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUMsRUFBRTtnQkFDdkMsT0FBTyxHQUFHLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQztZQUMzQixDQUFDLENBQUMsQ0FBQztZQUNQLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFDLEVBQUU7Z0JBQzVDLE9BQU8sR0FBRyxDQUFDLElBQUksS0FBSyxZQUFZLENBQUM7WUFDckMsQ0FBQyxDQUFDO1lBQ0YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ3BDLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNsQyxJQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUM7b0JBQ2xELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO29CQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO29CQUMxQixNQUFNO2lCQUNUO2FBQ0o7WUFDRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDeEMsSUFBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFHLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxFQUFDO29CQUM1RSxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsRUFBRSxHQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMzRCxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBRyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztvQkFDbEUsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7b0JBQ2xCLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFDYixNQUFNO2lCQUNUO2FBQ0o7WUFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDN0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDakMsQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBRXBCLElBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEtBQUcsT0FBTyxFQUFFO2dCQUNyQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUNoQixLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ2IsS0FBSyxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7YUFDMUI7WUFDRCxpQkFBaUI7WUFDakIsSUFBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBRSxJQUFJLENBQUMsU0FBUyxFQUFDO2dCQUNsSyxJQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxFQUFFLEdBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUU7b0JBQ3RELElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQztnQkFDMUQsZUFBZTtnQkFDZixJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsRUFBRSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztnQkFDbkYsd0JBQXdCO2dCQUN4QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztnQkFDckIsYUFBYTtnQkFDYixXQUFXLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ3BCLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDWCxVQUFVLENBQUMsR0FBRyxFQUFFO29CQUNaLHFCQUFxQjtvQkFDckIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ25DLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDZixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7YUFDWDtZQUNELEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1NBRWpDO2FBQ0ksSUFBRyxJQUFJLENBQUMsUUFBUSxFQUFDO1lBQ2xCLElBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFDO2dCQUNwSixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7Z0JBQ3RCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQzthQUNyQztZQUNELElBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsS0FBSyxPQUFPLElBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLElBQUUsSUFBSSxJQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUM7Z0JBQ3JKLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO2dCQUN0QixJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDcEMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3pDO1NBQ0o7YUFDSSxJQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBQztZQUNoQixJQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxLQUFLLE9BQU8sRUFBQztnQkFDdEMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7YUFDckI7U0FDSjthQUNJLElBQUksSUFBSSxDQUFDLEtBQUssRUFBQztZQUNoQixJQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxLQUFLLE9BQU8sRUFBQztnQkFDdEMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7Z0JBQ25CLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3pDO1NBQ0o7SUFDTCxDQUFDO0lBQ0QsVUFBVTtRQUNOLHNCQUFzQjtRQUN0QiwwQkFBMEI7UUFDMUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDckIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNwQixLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFDLENBQUMsRUFBRSxFQUFDO1lBQ3pDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ2xDO1FBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQ25DLENBQUM7Q0FDSjs7Ozs7Ozs7Ozs7Ozs7O0FDL09ELE1BQU0sS0FBSztJQUdQO1FBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDbkIsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUNELGVBQWUsQ0FBQyxLQUFhO1FBQ3pCLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO0lBQzlCLENBQUM7SUFDRCxlQUFlO1FBQ1gsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzdCLENBQUM7SUFDRCxZQUFZO1FBQ1IsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFDRCxZQUFZLENBQUMsU0FBaUI7UUFDMUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7SUFDL0IsQ0FBQztDQUNKO0FBQ2M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwQjZCO0FBQ29CO0FBQ0c7QUFDcEM7QUFHeEIsTUFBTSxVQUFXLFNBQVEsc0RBQUs7SUFLakMsWUFBWSxJQUFVO1FBQ2xCLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNaLElBQUksQ0FBQyxVQUFVLEdBQUUsSUFBSSx3RUFBVyxDQUFDLElBQUksRUFBQyxZQUFZLENBQUMsQ0FBQztRQUNwRCxpQkFBaUI7UUFDakIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO1FBQzVCLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztRQUM3QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksR0FBRyxZQUFZO1FBRW5DLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSx3RUFBVyxDQUFDLElBQUksRUFBQyxTQUFTLENBQUMsQ0FBQztRQUNoRCxpQkFBaUI7UUFDakIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUUsR0FBRztZQUN4QixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7UUFDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7UUFFMUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLDJFQUFZLENBQUMsSUFBSSxFQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2pELGlCQUFpQjtRQUNqQixJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7UUFDN0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1FBQzlCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxHQUFHLGFBQWEsQ0FBQztRQUV0QyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksMkNBQU0sQ0FBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDO1FBQ2hDLElBQUksWUFBWSxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7UUFDeEUsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBQ0QsTUFBTSxDQUFDLElBQVksRUFBRSxTQUFpQjtRQUNsQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDcEMsSUFBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsS0FBSyxPQUFPLElBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEtBQUssT0FBTyxJQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLElBQUUsSUFBSSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRTtZQUNqTCxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLE9BQU8sQ0FBQyxDQUFDO1NBQ1o7UUFFRCxPQUFPLENBQUMsQ0FBQztJQUNiLENBQUM7Q0FDSjs7Ozs7OztVQy9DRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7OztBQ04rQztBQUNPO0FBQ0s7QUFDakI7QUFDQztBQUUzQyxJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBc0IsQ0FBQztBQUN0RSxJQUFJLE1BQU0sR0FBRyxJQUFJLCtEQUFRLENBQUMsTUFBTSxDQUFDO0FBQ2pDLElBQUksU0FBUyxHQUFHLElBQUksb0VBQVksRUFBRSxDQUFDO0FBQ25DLElBQUksTUFBTSxHQUFHLElBQUksbURBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUVqQyxNQUFNLFVBQVUsR0FBRztJQUNmO1FBQ0ksS0FBSyxFQUFFLE9BQU87UUFDZCxNQUFNLEVBQUUseUJBQXlCO0tBQ3BDO0lBQ0Q7UUFDSSxLQUFLLEVBQUUsT0FBTztRQUNkLE1BQU0sRUFBRSx5QkFBeUI7S0FDcEM7SUFDRDtRQUNJLEtBQUssRUFBRSxPQUFPO1FBQ2QsTUFBTSxFQUFFLHlCQUF5QjtLQUNwQztJQUNEO1FBQ0ksS0FBSyxFQUFFLE9BQU87UUFDZCxNQUFNLEVBQUUseUJBQXlCO0tBQ3BDO0lBQ0Q7UUFDSSxLQUFLLEVBQUUsT0FBTztRQUNkLE1BQU0sRUFBRSx5QkFBeUI7S0FDcEM7SUFDRDtRQUNJLEtBQUssRUFBRSxPQUFPO1FBQ2QsTUFBTSxFQUFFLHlCQUF5QjtLQUNwQztJQUNEO1FBQ0ksS0FBSyxFQUFFLE9BQU87UUFDZCxNQUFNLEVBQUUseUJBQXlCO0tBQ3BDO0lBQ0Q7UUFDSSxLQUFLLEVBQUUsT0FBTztRQUNkLE1BQU0sRUFBRSx5QkFBeUI7S0FDcEM7SUFDRDtRQUNJLEtBQUssRUFBRSxNQUFNO1FBQ2IsTUFBTSxFQUFFLDRCQUE0QjtLQUN2QztJQUNEO1FBQ0ksS0FBSyxFQUFFLFNBQVM7UUFDaEIsTUFBTSxFQUFFLDhCQUE4QjtLQUN6QztJQUNEO1FBQ0ksS0FBSyxFQUFFLFFBQVE7UUFDZixNQUFNLEVBQUUsd0JBQXdCO0tBQ25DO0lBQ0Q7UUFDSSxLQUFLLEVBQUUsVUFBVTtRQUNqQixNQUFNLEVBQUUsbUNBQW1DO0tBQzlDO0lBQ0Q7UUFDSSxLQUFLLEVBQUUsY0FBYztRQUNyQixNQUFNLEVBQUUsd0NBQXdDO0tBQ25EO0lBQ0Q7UUFDSSxLQUFLLEVBQUUsWUFBWTtRQUNuQixNQUFNLEVBQUUsd0NBQXdDO0tBQ25EO0NBQ0o7QUFFRCxNQUFNLFFBQVEsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDL0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRSxFQUFFO0lBQzNCLElBQUksVUFBVSxHQUFHLElBQUksd0RBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN4QyxJQUFJLFNBQVMsR0FBRyxJQUFJLHNEQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdEMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMvQixTQUFTLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzlCLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDekIsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsR0FBRSxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWVrMS8uL3NyYy9FbmdpbmUvQnV0dG9uT2JqZWN0L0J1dHRvbk9iamVjdC50cyIsIndlYnBhY2s6Ly93ZWVrMS8uL3NyYy9FbmdpbmUvQ29sbGlzaW9uL0NvbGxpc2lvbi50cyIsIndlYnBhY2s6Ly93ZWVrMS8uL3NyYy9FbmdpbmUvQ29yZS9HYW1lLnRzIiwid2VicGFjazovL3dlZWsxLy4vc3JjL0VuZ2luZS9HYW1lT2JqZWN0L0dhbWVPYmplY3QudHMiLCJ3ZWJwYWNrOi8vd2VlazEvLi9zcmMvRW5naW5lL0ltYWdlTG9hZGVyL0ltYWdlTG9hZGVyLnRzIiwid2VicGFjazovL3dlZWsxLy4vc3JjL0VuZ2luZS9JbWFnZU9iamVjdC9JbWFnZU9iamVjdC50cyIsIndlYnBhY2s6Ly93ZWVrMS8uL3NyYy9FbmdpbmUvUHJvY2Vzc0lucHV0L0xpc3RlbklucHV0LnRzIiwid2VicGFjazovL3dlZWsxLy4vc3JjL0VuZ2luZS9Qcm9jZXNzSW5wdXQvUHJvY2Vzc0lucHV0LnRzIiwid2VicGFjazovL3dlZWsxLy4vc3JjL0VuZ2luZS9SZW5kZXJlci9SZW5kZXJlci50cyIsIndlYnBhY2s6Ly93ZWVrMS8uL3NyYy9FbmdpbmUvU2NlbmUvU2NlbmUudHMiLCJ3ZWJwYWNrOi8vd2VlazEvLi9zcmMvRW5naW5lL1NjZW5lL1NjZW5lTWFuYWdlci50cyIsIndlYnBhY2s6Ly93ZWVrMS8uL3NyYy9FbmdpbmUvU3ByaXRlL1Nwcml0ZS50cyIsIndlYnBhY2s6Ly93ZWVrMS8uL3NyYy9FbmdpbmUvVGV4dE9iamVjdC9UZXh0T2JqZWN0LnRzIiwid2VicGFjazovL3dlZWsxLy4vc3JjL2dhbWUvQmlyZC50cyIsIndlYnBhY2s6Ly93ZWVrMS8uL3NyYy9nYW1lL0dyb3VuZC50cyIsIndlYnBhY2s6Ly93ZWVrMS8uL3NyYy9nYW1lL1BhaXJPZlBpcGUudHMiLCJ3ZWJwYWNrOi8vd2VlazEvLi9zcmMvZ2FtZS9QYW5lbEdhbWVPdmVyLnRzIiwid2VicGFjazovL3dlZWsxLy4vc3JjL2dhbWUvUGxheVNjZW5lLnRzIiwid2VicGFjazovL3dlZWsxLy4vc3JjL2dhbWUvU2NvcmUudHMiLCJ3ZWJwYWNrOi8vd2VlazEvLi9zcmMvZ2FtZS9TdGFydFNjZW5lLnRzIiwid2VicGFjazovL3dlZWsxL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlZWsxL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWVrMS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlZWsxL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VlazEvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW1hZ2VPYmplY3R9IGZyb20gXCIuLi9JbWFnZU9iamVjdC9JbWFnZU9iamVjdFwiO1xyXG5pbXBvcnQgeyBTY2VuZSB9IGZyb20gXCIuLi9TY2VuZS9TY2VuZVwiO1xyXG5leHBvcnQgY2xhc3MgQnV0dG9uT2JqZWN0IGV4dGVuZHMgSW1hZ2VPYmplY3R7XHJcbiAgICBjb25zdHJ1Y3RvcihzY2VuZTogU2NlbmUsIGtleTogc3RyaW5nKXtcclxuICAgICAgICBzdXBlcihzY2VuZSxrZXkpO1xyXG4gICAgfVxyXG4gICAgaXNJbnNpZGUocG9zOiBBcnJheTxudW1iZXI+KXtcclxuICAgICAgICBpZihwb3MubGVuZ3RoIDwgMikgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIHJldHVybiBwb3NbMF0gPiB0aGlzLnggJiYgcG9zWzBdIDwgdGhpcy54K3RoaXMud2lkdGggJiYgcG9zWzFdIDwgdGhpcy55K3RoaXMuaGVpZ2h0ICYmIHBvc1sxXSA+IHRoaXMueTtcclxuICAgIH0gICAgXHJcbn0iLCJpbXBvcnQge0dhbWVPYmplY3R9IGZyb20gXCIuLi9HYW1lT2JqZWN0L0dhbWVPYmplY3RcIjtcclxuZXhwb3J0IGNsYXNzIENvbGxpc2lvbntcclxuICAgIGhhbmRsZUNvbGxpc2lvbihvYmoxIDogR2FtZU9iamVjdCwgb2JqMiA6IEdhbWVPYmplY3Qpe1xyXG4gICAgICAgIGlmKG9iajEueCsgb2JqMS53aWR0aCArIDE+PW9iajIueCAmJiBvYmoxLngrMSA8PSBvYmoyLnggKyBvYmoyLndpZHRoKXtcclxuICAgICAgICAgICAgaWYob2JqMS55KyBvYmoxLmhlaWdodCArIDE+PW9iajIueSAmJiBvYmoxLnk8PSBvYmoyLnkgKyBvYmoyLmhlaWdodCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBTY2VuZU1hbmFnZXIgfSBmcm9tIFwiLi4vU2NlbmUvU2NlbmVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFJlbmRlcmVyIH0gZnJvbSBcIi4uL1JlbmRlcmVyL1JlbmRlcmVyXCI7XHJcbmltcG9ydCB7IExpc3RlbklucHV0IH0gZnJvbSBcIi4uL1Byb2Nlc3NJbnB1dC9MaXN0ZW5JbnB1dFwiO1xyXG5pbXBvcnQge0ltYWdlTG9hZGVyIH0gZnJvbSBcIi4uL0ltYWdlTG9hZGVyL0ltYWdlTG9hZGVyXCI7XHJcbmV4cG9ydCBjbGFzcyBHYW1le1xyXG4gICAgc2NlbmVNYW5hZ2VyOiBTY2VuZU1hbmFnZXI7XHJcbiAgICBsYXN0VGltZTogbnVtYmVyO1xyXG4gICAgbGlzdGVuSW5wdXQ6IExpc3RlbklucHV0O1xyXG4gICAgbG9hZGVyOiBJbWFnZUxvYWRlcjtcclxuICAgIGNvbnN0cnVjdG9yKHNjZW5lTWFuYWdlcjogU2NlbmVNYW5hZ2VyKXtcclxuICAgICAgICB0aGlzLnNjZW5lTWFuYWdlciA9IHNjZW5lTWFuYWdlcjtcclxuICAgICAgICB0aGlzLmxhc3RUaW1lID0gMDtcclxuICAgICAgICB0aGlzLmxpc3RlbklucHV0ID0gbmV3IExpc3RlbklucHV0KCk7XHJcbiAgICAgICAgdGhpcy5sb2FkZXIgPSBuZXcgSW1hZ2VMb2FkZXIoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgc3RhcnQocmVuZGVyOiBSZW5kZXJlcil7XHJcbiAgICAgICAgdGhpcy5saXN0ZW5JbnB1dC5oYW5kbGVJbnB1dCh0aGlzLnNjZW5lTWFuYWdlciwgcmVuZGVyKTtcclxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCk9PnRoaXMubG9vcChyZW5kZXIpKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgbG9vcChyZW5kZXI6IFJlbmRlcmVyKXtcclxuICAgICAgICBjb25zdCB0aW1lID0gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpO1xyXG4gICAgICAgIGNvbnN0IGRlbHRhID0gdGltZSAtIHRoaXMubGFzdFRpbWU7XHJcbiAgICAgICAgdGhpcy5zY2VuZU1hbmFnZXIuc2NlbmVzW3RoaXMuc2NlbmVNYW5hZ2VyLmN1cnJlbnRTY2VuZV0udXBkYXRlKHRpbWUsZGVsdGEpO1xyXG4gICAgICAgIHRoaXMuc2NlbmVNYW5hZ2VyLnNjZW5lc1t0aGlzLnNjZW5lTWFuYWdlci5jdXJyZW50U2NlbmVdLnJlbmRlcihyZW5kZXIpO1xyXG4gICAgICAgIHRoaXMubGFzdFRpbWUgPSB0aW1lO1xyXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKT0+dGhpcy5sb29wKHJlbmRlcikpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgU2NlbmUgfSBmcm9tIFwiLi4vU2NlbmUvU2NlbmVcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBHYW1lT2JqZWN0e1xyXG4gICAgeDogbnVtYmVyO1xyXG4gICAgeTogbnVtYmVyO1xyXG4gICAgd2lkdGg6IG51bWJlcjtcclxuICAgIGhlaWdodDogbnVtYmVyO1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgYWN0aXZlOiBib29sZWFuO1xyXG4gICAgZGVmYXVsdFBvc2l0aW9uOiBBcnJheTxudW1iZXI+O1xyXG4gICAgel9pbmRleDogbnVtYmVyO1xyXG4gICAgc2NlbmU6IFNjZW5lO1xyXG4gICAgY29uc3RydWN0b3Ioc2NlbmU6IFNjZW5lKSB7XHJcbiAgICAgICAgdGhpcy54ID0gMDtcclxuICAgICAgICB0aGlzLnkgPSAwO1xyXG4gICAgICAgIHRoaXMud2lkdGggPSAwO1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gMDtcclxuICAgICAgICB0aGlzLm5hbWUgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnpfaW5kZXggPSAwO1xyXG4gICAgICAgIHRoaXMuZGVmYXVsdFBvc2l0aW9uID0gWzAsMF07XHJcbiAgICAgICAgdGhpcy5zY2VuZSA9IHNjZW5lO1xyXG4gICAgfVxyXG4gICAgcmVzZXQoKXtcclxuICAgICAgICB0aGlzLnggPSB0aGlzLmRlZmF1bHRQb3NpdGlvblswXTtcclxuICAgICAgICB0aGlzLnkgPSB0aGlzLmRlZmF1bHRQb3NpdGlvblsxXTtcclxuICAgIH1cclxuICAgIHNldEFjdGl2ZShhY3RpdmU6IGJvb2xlYW4pe1xyXG4gICAgICAgIHRoaXMuYWN0aXZlID0gYWN0aXZlO1xyXG4gICAgfVxyXG4gICAgZ2V0QWN0aXZlKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYWN0aXZlO1xyXG4gICAgfVxyXG5cclxufSIsImV4cG9ydCBjbGFzcyBJbWFnZUxvYWRlciB7XHJcbiAgICBpbWFnZXMhOiBNYXA8c3RyaW5nLCBIVE1MSW1hZ2VFbGVtZW50PjtcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgdGhpcy5pbWFnZXMgPSBuZXcgTWFwPHN0cmluZywgSFRNTEltYWdlRWxlbWVudD4oKTtcclxuICAgIH1cclxuICAgIGFzeW5jIGFkZEltYWdlKHNyYzogc3RyaW5nLCBuYW1lOiBzdHJpbmcpe1xyXG4gICAgICAgIHZhciBpbWcgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICBpbWcuc3JjID0gc3JjO1xyXG4gICAgICAgIHRoaXMuaW1hZ2VzLnNldChuYW1lLCBpbWcpO1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGltZy5vbmxvYWQgPSByZXNvbHZlO1xyXG4gICAgICAgICAgICBpbWcub25lcnJvciA9IHJlamVjdDsgXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIGdldEltYWdlKG5hbWU6IHN0cmluZyk6IEhUTUxJbWFnZUVsZW1lbnQge1xyXG4gICAgICAgIGlmKHRoaXMuaW1hZ2VzLmhhcyhuYW1lKSlcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW1hZ2VzLmdldChuYW1lKSE7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBJbWFnZSgpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtHYW1lT2JqZWN0fSBmcm9tIFwiLi4vR2FtZU9iamVjdC9HYW1lT2JqZWN0XCJcclxuaW1wb3J0IHsgU2NlbmUgfSBmcm9tIFwiLi4vU2NlbmUvU2NlbmVcIjtcclxuZXhwb3J0IGNsYXNzIEltYWdlT2JqZWN0IGV4dGVuZHMgR2FtZU9iamVjdHtcclxuICAgIGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50O1xyXG4gICAgZGVncmVlczogbnVtYmVyO1xyXG4gICAgY29uc3RydWN0b3Ioc2NlbmU6IFNjZW5lLCBrZXk6IHN0cmluZyl7XHJcbiAgICAgICAgc3VwZXIoc2NlbmUpO1xyXG4gICAgICAgIGlmKGtleT09XCJudWxsXCIpXHJcbiAgICAgICAgICAgIHRoaXMuaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICBlbHNlIHRoaXMuaW1hZ2UgPSB0aGlzLnNjZW5lLmdhbWUubG9hZGVyLmdldEltYWdlKGtleSk7XHJcbiAgICAgICAgdGhpcy5kZWdyZWVzID0gMDtcclxuICAgIH1cclxuICAgIHVwZGF0ZSh0aW1lOiBudW1iZXIsIGRlbHRhVGltZTpudW1iZXIpe31cclxufSIsImltcG9ydCB7U2NlbmVNYW5hZ2VyfSBmcm9tICcuLi9TY2VuZS9TY2VuZU1hbmFnZXInO1xyXG5pbXBvcnQge1JlbmRlcmVyfSBmcm9tICcuLi9SZW5kZXJlci9SZW5kZXJlcidcclxuZXhwb3J0IGNsYXNzIExpc3RlbklucHV0e1xyXG4gICAgaGFuZGxlSW5wdXQoc2NlbmVNYW5hZ2VyOiBTY2VuZU1hbmFnZXIsIHJlbmRlcjogUmVuZGVyZXIpe1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLChlKT0+c2NlbmVNYW5hZ2VyLnNjZW5lc1tzY2VuZU1hbmFnZXIuY3VycmVudFNjZW5lXS5wcm9jZXNzSW5wdXQub25LZXlEb3duKGUpKTtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsKGUpPT5zY2VuZU1hbmFnZXIuc2NlbmVzW3NjZW5lTWFuYWdlci5jdXJyZW50U2NlbmVdLnByb2Nlc3NJbnB1dC5vbktleVVwKCkpO1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsKGUpPT5zY2VuZU1hbmFnZXIuc2NlbmVzW3NjZW5lTWFuYWdlci5jdXJyZW50U2NlbmVdLnByb2Nlc3NJbnB1dC5vbk1vdXNlRG93bihlLHJlbmRlci5jYW52YXMpKTtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywoZSk9PnNjZW5lTWFuYWdlci5zY2VuZXNbc2NlbmVNYW5hZ2VyLmN1cnJlbnRTY2VuZV0ucHJvY2Vzc0lucHV0Lm9uTW91c2VVcCgpKTtcclxuICAgIH1cclxufSIsImV4cG9ydCBjbGFzcyBQcm9jZXNzSW5wdXR7XHJcbiAgICBpbnB1dEtleSA6IFN0cmluZztcclxuICAgIG1vdXNlRXZlbnQgOiBBcnJheTxudW1iZXI+IHwgbnVsbDtcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgdGhpcy5pbnB1dEtleSA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5tb3VzZUV2ZW50ID0gbnVsbDtcclxuICAgIH1cclxuICAgIG9uS2V5RG93bihlOiBLZXlib2FyZEV2ZW50KXtcclxuICAgICAgICB0aGlzLmlucHV0S2V5ID0gZS5jb2RlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuaW5wdXRLZXkpO1xyXG4gICAgfVxyXG4gICAgb25LZXlVcCgpe1xyXG4gICAgICAgIHRoaXMuaW5wdXRLZXkgPSBcIlwiO1xyXG4gICAgfVxyXG4gICAgb25Nb3VzZURvd24oZTogTW91c2VFdmVudCwgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCkge1xyXG4gICAgICAgIHZhciByZWN0ID0gY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgIHZhciBtb3VzZVggPSBlLmNsaWVudFggLSByZWN0LmxlZnQ7XHJcbiAgICAgICAgdmFyIG1vdXNlWSA9IGUuY2xpZW50WSAtIHJlY3QudG9wOyAgICBcclxuICAgICAgICB0aGlzLm1vdXNlRXZlbnQgPSBbbW91c2VYLCBtb3VzZVldO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMubW91c2VFdmVudCk7XHJcbiAgICB9XHJcbiAgICBvbk1vdXNlVXAoKSB7XHJcbiAgICAgICAgdGhpcy5tb3VzZUV2ZW50ID0gbnVsbDtcclxuICAgIH1cclxufSIsImltcG9ydCB7IEltYWdlT2JqZWN0IH0gZnJvbSBcIi4uL0ltYWdlT2JqZWN0L0ltYWdlT2JqZWN0XCI7XHJcbmltcG9ydCB7IFNwcml0ZSB9IGZyb20gXCIuLi9TcHJpdGUvU3ByaXRlXCI7XHJcbmltcG9ydCB7IFRleHRPYmplY3QgfSBmcm9tIFwiLi4vVGV4dE9iamVjdC9UZXh0T2JqZWN0XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUmVuZGVyZXJ7XHJcbiAgICBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xyXG4gICAgY29uc3RydWN0b3IoY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCl7XHJcbiAgICAgICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XHJcbiAgICB9XHJcbiAgICBkcmF3SW1hZ2UoaW1hZ2VPYmplY3Q6IEltYWdlT2JqZWN0KXtcclxuICAgICAgICBjb25zdCBjdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgICAgIGlmKGN0eCE9bnVsbCl7XHJcbiAgICAgICAgICAgIGN0eC5zYXZlKCk7XHJcbiAgICAgICAgICAgIGN0eC50cmFuc2xhdGUoaW1hZ2VPYmplY3QueCArIGltYWdlT2JqZWN0LndpZHRoLzIsaW1hZ2VPYmplY3QueSArIGltYWdlT2JqZWN0LmhlaWdodC8yKVxyXG4gICAgICAgICAgICBjdHgucm90YXRlKGltYWdlT2JqZWN0LmRlZ3JlZXMqTWF0aC5QSS8xODApO1xyXG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKGltYWdlT2JqZWN0LmltYWdlLC1pbWFnZU9iamVjdC53aWR0aC8yLCAtaW1hZ2VPYmplY3QuaGVpZ2h0LzIsaW1hZ2VPYmplY3Qud2lkdGgsaW1hZ2VPYmplY3QuaGVpZ2h0KTtcclxuICAgICAgICAgICAgY3R4LnJlc3RvcmUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBkcmF3U3ByaXRlKHNwcml0ZTogU3ByaXRlKXtcclxuICAgICAgICBjb25zdCBjdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgICAgIGlmKGN0eCE9bnVsbCl7XHJcbiAgICAgICAgICAgIGN0eC5zYXZlKCk7XHJcbiAgICAgICAgICAgIGN0eC50cmFuc2xhdGUoc3ByaXRlLnggKyBzcHJpdGUud2lkdGgvMixzcHJpdGUueSArIHNwcml0ZS5oZWlnaHQvMilcclxuICAgICAgICAgICAgY3R4LnJvdGF0ZShzcHJpdGUuZGVncmVlcypNYXRoLlBJLzE4MCk7XHJcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2Uoc3ByaXRlLmltYWdlc1tzcHJpdGUuZnJhbWVDdXJyZW50XSwtc3ByaXRlLndpZHRoLzIsIC1zcHJpdGUuaGVpZ2h0LzIsc3ByaXRlLndpZHRoLHNwcml0ZS5oZWlnaHQpO1xyXG4gICAgICAgICAgICBjdHgucmVzdG9yZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGRyYXdUZXh0KHRleHQ6IFRleHRPYmplY3Qpe1xyXG4gICAgICAgIGNvbnN0IGN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICAgICAgaWYoY3R4IT1udWxsKXtcclxuICAgICAgICAgICAgY3R4LmZvbnQgPSB0ZXh0LmZvbnQ7XHJcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSB0ZXh0LmNvbG9yO1xyXG4gICAgICAgICAgICBjdHguZmlsbFRleHQodGV4dC5jb250ZW50LHRleHQueCx0ZXh0LnkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCB7IEltYWdlT2JqZWN0IH0gZnJvbSBcIi4uL0ltYWdlT2JqZWN0L0ltYWdlT2JqZWN0XCI7XHJcbmltcG9ydCB7IFNwcml0ZSB9IGZyb20gXCIuLi9TcHJpdGUvU3ByaXRlXCI7XHJcbmltcG9ydCB7IFRleHRPYmplY3QgfSBmcm9tIFwiLi4vVGV4dE9iamVjdC9UZXh0T2JqZWN0XCI7XHJcbmltcG9ydCB7UmVuZGVyZXJ9IGZyb20gXCIuLi9SZW5kZXJlci9SZW5kZXJlclwiO1xyXG5pbXBvcnQge0dhbWVPYmplY3R9IGZyb20gXCIuLi9HYW1lT2JqZWN0L0dhbWVPYmplY3RcIjtcclxuaW1wb3J0IHsgUHJvY2Vzc0lucHV0IH0gZnJvbSBcIi4uL1Byb2Nlc3NJbnB1dC9Qcm9jZXNzSW5wdXRcIjtcclxuaW1wb3J0IHsgR2FtZSB9IGZyb20gXCIuLi9Db3JlL0dhbWVcIjtcclxuaW1wb3J0IHsgQ29sbGlzaW9uIH0gZnJvbSBcIi4uL0NvbGxpc2lvbi9Db2xsaXNpb25cIjtcclxuZXhwb3J0IGNsYXNzIFNjZW5le1xyXG4gICAgZ2FtZU9iamVjdHM6IEdhbWVPYmplY3RbXTtcclxuICAgIHByb2Nlc3NJbnB1dDogUHJvY2Vzc0lucHV0O1xyXG4gICAgY29sbGlzaW9uOiBDb2xsaXNpb247XHJcbiAgICBnYW1lOiBHYW1lO1xyXG4gICAgY29uc3RydWN0b3IoZ2FtZTogR2FtZSl7XHJcbiAgICAgICAgdGhpcy5nYW1lT2JqZWN0cyA9IFtdO1xyXG4gICAgICAgIHRoaXMucHJvY2Vzc0lucHV0ID0gbmV3IFByb2Nlc3NJbnB1dCgpO1xyXG4gICAgICAgIHRoaXMuY29sbGlzaW9uID0gbmV3IENvbGxpc2lvbigpO1xyXG4gICAgICAgIHRoaXMuZ2FtZSA9IGdhbWU7XHJcbiAgICB9XHJcbiAgICByZXNldFNjZW5lKCl7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPHRoaXMuZ2FtZU9iamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5nYW1lT2JqZWN0c1tpXS5yZXNldCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGFkZENoaWxkKGdhbWVPYmplY3RzOiBHYW1lT2JqZWN0W10pe1xyXG4gICAgICAgIGdhbWVPYmplY3RzLm1hcCgoZ2FtZU9iamVjdCk9Pnt0aGlzLmdhbWVPYmplY3RzLnB1c2goZ2FtZU9iamVjdCl9KVxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcihyZW5kZXI6IFJlbmRlcmVyKXtcclxuICAgICAgICAvLyBzb3J0IGdhbWVPYmplY3RzIGZvbGxvd2luZyB6X2luZGV4XHJcbiAgICAgICAgdGhpcy5nYW1lT2JqZWN0cy5zb3J0KChhLGIpPT57XHJcbiAgICAgICAgICAgIHJldHVybiBhLnpfaW5kZXggLSBiLnpfaW5kZXg7XHJcbiAgICAgICAgfSlcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8dGhpcy5nYW1lT2JqZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZih0aGlzLmdhbWVPYmplY3RzW2ldLmdldEFjdGl2ZSgpKXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG9iaiA9IHRoaXMuZ2FtZU9iamVjdHNbaV07IFxyXG4gICAgICAgICAgICAgICAgaWYoIG9iaiBpbnN0YW5jZW9mIEltYWdlT2JqZWN0KVxyXG4gICAgICAgICAgICAgICAgICAgIHJlbmRlci5kcmF3SW1hZ2Uob2JqKTtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYob2JqIGluc3RhbmNlb2YgU3ByaXRlKVxyXG4gICAgICAgICAgICAgICAgICAgIHJlbmRlci5kcmF3U3ByaXRlKG9iaik7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKG9iaiBpbnN0YW5jZW9mIFRleHRPYmplY3QpXHJcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyLmRyYXdUZXh0KG9iaik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyB4dSBseSBsb2dpY1xyXG4gICAgdXBkYXRlKHRpbWU6IG51bWJlciwgZGVsdGE6IG51bWJlcikge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDx0aGlzLmdhbWVPYmplY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBvYmogPSB0aGlzLmdhbWVPYmplY3RzW2ldO1xyXG4gICAgICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgSW1hZ2VPYmplY3QgfHwgb2JqIGluc3RhbmNlb2YgU3ByaXRlKVxyXG4gICAgICAgICAgICAgICAgb2JqLnVwZGF0ZSh0aW1lLCBkZWx0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgU2NlbmUgfSBmcm9tIFwiLi9TY2VuZVwiO1xyXG5pbXBvcnQge0dhbWV9IGZyb20gXCIuLi9Db3JlL0dhbWVcIjtcclxuZXhwb3J0IGNsYXNzIFNjZW5lTWFuYWdlciB7XHJcbiAgICBzY2VuZXM6IFNjZW5lW107XHJcbiAgICBjdXJyZW50U2NlbmU6IG51bWJlcjtcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgdGhpcy5zY2VuZXMgPSBbXTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRTY2VuZSA9IDA7XHJcbiAgICB9XHJcbiAgICBhZGRTY2VuZShzY2VuZTogU2NlbmUpe1xyXG4gICAgICAgIHRoaXMuc2NlbmVzLnB1c2goc2NlbmUpXHJcbiAgICB9XHJcbiAgICBzd2l0Y2hTY2VuZShuZXh0SW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuc2NlbmVzW3RoaXMuY3VycmVudFNjZW5lXS5yZXNldFNjZW5lKCk7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50U2NlbmUgPSBuZXh0SW5kZXg7XHJcbiAgICB9XHJcbiAgICB1cGRhdGUoKXt9XHJcbiAgICByZW5kZXIoKXt9XHJcbn0iLCJpbXBvcnQge0dhbWVPYmplY3R9IGZyb20gXCIuLi9HYW1lT2JqZWN0L0dhbWVPYmplY3RcIlxyXG5pbXBvcnQgeyBTY2VuZSB9IGZyb20gXCIuLi9TY2VuZS9TY2VuZVwiO1xyXG5leHBvcnQgY2xhc3MgU3ByaXRlIGV4dGVuZHMgR2FtZU9iamVjdHtcclxuICAgIGltYWdlczogQXJyYXk8SFRNTEltYWdlRWxlbWVudD47XHJcbiAgICBkZWdyZWVzOiBudW1iZXI7XHJcbiAgICBmcmFtZUN1cnJlbnQ6IG51bWJlcjtcclxuICAgIHJhdGU6IG51bWJlcjtcclxuICAgIGFkdDogbnVtYmVyO1xyXG4gICAgY29uc3RydWN0b3Ioc2NlbmU6IFNjZW5lLGltYWdlczogQXJyYXk8SFRNTEltYWdlRWxlbWVudD4pe1xyXG4gICAgICAgIHN1cGVyKHNjZW5lKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImltYWdlc1wiLGltYWdlcyk7XHJcbiAgICAgICAgdGhpcy5pbWFnZXMgPSBpbWFnZXM7XHJcbiAgICAgICAgdGhpcy5kZWdyZWVzID0gMDtcclxuICAgICAgICB0aGlzLmZyYW1lQ3VycmVudCA9IDA7XHJcbiAgICAgICAgdGhpcy5yYXRlID0gMDtcclxuICAgICAgICB0aGlzLmFkdCA9IDA7XHJcbiAgICB9XHJcbiAgICB1cGRhdGUodGltZTogbnVtYmVyLCBkZWx0YVRpbWU6bnVtYmVyKXtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcGxheUFuaW1hdGlvbih0aW1lOiBudW1iZXIsIGRlbHRhVGltZTpudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmFkdCArPSBkZWx0YVRpbWVcclxuICAgICAgICBpZih0aGlzLmFkdD49dGhpcy5yYXRlKXtcclxuICAgICAgICAgICAgdGhpcy5hZHQgLT0gdGhpcy5yYXRlO1xyXG4gICAgICAgICAgICB0aGlzLmZyYW1lQ3VycmVudCArPTE7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZnJhbWVDdXJyZW50PnRoaXMuaW1hZ2VzLmxlbmd0aC0xKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZnJhbWVDdXJyZW50ID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCB7R2FtZU9iamVjdH0gZnJvbSBcIi4uL0dhbWVPYmplY3QvR2FtZU9iamVjdFwiXHJcbmltcG9ydCB7IFNjZW5lIH0gZnJvbSBcIi4uL1NjZW5lL1NjZW5lXCI7XHJcbmV4cG9ydCBjbGFzcyBUZXh0T2JqZWN0IGV4dGVuZHMgR2FtZU9iamVjdHtcclxuICAgIGNvbnRlbnQ6IHN0cmluZztcclxuICAgIGZvbnQ6IHN0cmluZztcclxuICAgIGNvbG9yOiBzdHJpbmc7XHJcbiAgICBjb25zdHJ1Y3RvcihzY2VuZTogU2NlbmUpIHtcclxuICAgICAgICBzdXBlcihzY2VuZSk7XHJcbiAgICAgICAgdGhpcy5jb250ZW50ID0gXCJcIjtcclxuICAgICAgICB0aGlzLmZvbnQgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuY29sb3IgPSBcIlwiO1xyXG4gICAgfVxyXG4gICAgc2V0Q29udGVudChjb250ZW50OiBzdHJpbmcpe1xyXG4gICAgICAgIHRoaXMuY29udGVudCA9IGNvbnRlbnQ7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBTcHJpdGUgfSBmcm9tIFwiLi4vRW5naW5lL1Nwcml0ZS9TcHJpdGVcIjtcclxuXHJcbmltcG9ydCB7U2NlbmV9IGZyb20gXCIuLi9FbmdpbmUvU2NlbmUvU2NlbmVcIlxyXG5leHBvcnQgY2xhc3MgQmlyZCBleHRlbmRzIFNwcml0ZSB7XHJcbiAgICBncmF2aXR5IDogbnVtYmVyO1xyXG4gICAgc3BlZWQgOiBudW1iZXI7IFxyXG4gICAgY29uc3RydWN0b3Ioc2NlbmU6IFNjZW5lKSB7XHJcbiAgICAgICAgdmFyIGltYWdlczpBcnJheTxIVE1MSW1hZ2VFbGVtZW50PiA9IFtdO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwibG9hZGVyXCIsIHNjZW5lLmdhbWUubG9hZGVyKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8ODtpKyspe1xyXG4gICAgICAgICAgICBsZXQgbmFtZSA9ICBcImJpcmRcIiArIGk7XHJcbiAgICAgICAgICAgIGltYWdlcy5wdXNoKHNjZW5lLmdhbWUubG9hZGVyLmdldEltYWdlKG5hbWUpIGFzIEhUTUxJbWFnZUVsZW1lbnQpO1xyXG4gICAgICAgIH0gXHJcbiAgICAgICAgc3VwZXIoc2NlbmUsaW1hZ2VzKTtcclxuICAgICAgICB0aGlzLm5hbWUgPSBcImJpcmRcIjtcclxuICAgICAgICB0aGlzLmdyYXZpdHkgPSAwO1xyXG4gICAgICAgIHRoaXMuc3BlZWQgPSAwO1xyXG4gICAgICAgIHRoaXMucmF0ZSA9IDEuMC8zMCoxMDAwO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKHRpbWU6IG51bWJlciwgZGVsdGFUaW1lOm51bWJlcil7XHJcbiAgICAgICAgdGhpcy55ICs9ICh0aGlzLnNwZWVkICsgMC41KnRoaXMuZ3Jhdml0eSkqKGRlbHRhVGltZS8xNi42Nyk7XHJcbiAgICAgICAgdGhpcy5zcGVlZCArPSB0aGlzLmdyYXZpdHkqKGRlbHRhVGltZS8xNi42Nyk7XHJcbiAgICAgICAgaWYodGhpcy55IDwgMClcclxuICAgICAgICAgICAgdGhpcy55ID0gMDtcclxuICAgICAgICBpZih0aGlzLnNwZWVkPjApe1xyXG4gICAgICAgICAgICB0aGlzLmRlZ3JlZXMgKz0gMTtcclxuICAgICAgICAgICAgaWYodGhpcy5kZWdyZWVzPjQwKSB0aGlzLmRlZ3JlZXMgPSA0MDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5kZWdyZWVzIC09IDE7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZGVncmVlczwtMjApIHRoaXMuZGVncmVlcyA9IC0yMDtcclxuICAgICAgICAgICAgdGhpcy5wbGF5QW5pbWF0aW9uKHRpbWUsIGRlbHRhVGltZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZseSgpe1xyXG4gICAgICAgIHRoaXMuc3BlZWQgPSAtNztcclxuICAgIH1cclxuICAgIHJlc2V0KCl7XHJcbiAgICAgICAgc3VwZXIucmVzZXQoKTtcclxuICAgICAgICB0aGlzLnNwZWVkID0gMDtcclxuICAgIH1cclxufSIsImltcG9ydCB7IEltYWdlT2JqZWN0IH0gZnJvbSBcIi4uL0VuZ2luZS9JbWFnZU9iamVjdC9JbWFnZU9iamVjdFwiO1xyXG5pbXBvcnQge0dhbWV9IGZyb20gXCIuLi9FbmdpbmUvQ29yZS9HYW1lXCI7XHJcbmltcG9ydCB7IFNjZW5lIH0gZnJvbSBcIi4uL0VuZ2luZS9TY2VuZS9TY2VuZVwiO1xyXG5jbGFzcyBHcm91bmR7XHJcbiAgICBpbWFnZXM6IEFycmF5PEltYWdlT2JqZWN0PjtcclxuICAgIHNwZWVkOiBudW1iZXI7XHJcbiAgICBjb25zdHJ1Y3RvcihzY2VuZTogU2NlbmUgLHNwZWVkOiBudW1iZXIpe1xyXG4gICAgICAgIHZhciBpbWFnZU9iamVjdDEgPSBuZXcgSW1hZ2VPYmplY3Qoc2NlbmUsXCJncm91bmRcIik7XHJcbiAgICAgICAgaW1hZ2VPYmplY3QxLm5hbWUgPSBcImdyb3VuZFwiO1xyXG4gICAgICAgIGltYWdlT2JqZWN0MS56X2luZGV4ID0yO1xyXG4gICAgICAgIGltYWdlT2JqZWN0MS55ID0gNjcwO1xyXG4gICAgICAgIGltYWdlT2JqZWN0MS53aWR0aCA9IDY1MDtcclxuICAgICAgICBpbWFnZU9iamVjdDEuaGVpZ2h0ID0gMTUwO1xyXG4gICAgICAgIGltYWdlT2JqZWN0MS5kZWZhdWx0UG9zaXRpb249IFswLDY3MF07XHJcblxyXG4gICAgICAgIHZhciBpbWFnZU9iamVjdDIgPSBuZXcgSW1hZ2VPYmplY3Qoc2NlbmUsXCJncm91bmRcIik7XHJcbiAgICAgICAgaW1hZ2VPYmplY3QyLm5hbWUgPSBcImdyb3VuZFwiO1xyXG4gICAgICAgIGltYWdlT2JqZWN0Mi56X2luZGV4ID0yO1xyXG4gICAgICAgIGltYWdlT2JqZWN0Mi54ID0gNjQ5O1xyXG4gICAgICAgIGltYWdlT2JqZWN0Mi55ID0gNjcwO1xyXG4gICAgICAgIGltYWdlT2JqZWN0Mi53aWR0aCA9IDY1MDtcclxuICAgICAgICBpbWFnZU9iamVjdDIuaGVpZ2h0ID0gMTUwO1xyXG4gICAgICAgIGltYWdlT2JqZWN0Mi5kZWZhdWx0UG9zaXRpb249IFs2NDksNjcwXTtcclxuXHJcbiAgICAgICAgdGhpcy5pbWFnZXMgPSBbaW1hZ2VPYmplY3QxLGltYWdlT2JqZWN0Ml07XHJcbiAgICAgICAgdGhpcy5zcGVlZCA9IHNwZWVkO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKHRpbWU6IG51bWJlciwgZGVsdGFUaW1lOiBudW1iZXIpe1xyXG4gICAgICAgIGZvcih2YXIgaT0wO2k8dGhpcy5pbWFnZXMubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIHRoaXMuaW1hZ2VzW2ldLnggLT0gdGhpcy5zcGVlZCooZGVsdGFUaW1lLzE2LjY3KTtcclxuICAgICAgICAgICAgaWYodGhpcy5pbWFnZXNbaV0ueCA8IC0gKDY1MCkpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbWFnZXNbaV0ueCA9IHRoaXMuaW1hZ2VzW01hdGguYWJzKGktMSldLngrNjQ5O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBcclxuICAgIH1cclxuICAgIGdldENvbXBvbmVudCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmltYWdlcztcclxuICAgIH1cclxuICAgIHJlc2V0KCl7XHJcbiAgICAgICAgZm9yKHZhciBpPTA7aTx0aGlzLmltYWdlcy5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgdGhpcy5pbWFnZXNbaV0ucmVzZXQoKTtcclxuICAgICAgICB9IFxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge0dyb3VuZH07IiwiaW1wb3J0IHsgSW1hZ2VPYmplY3QgfSBmcm9tIFwiLi4vRW5naW5lL0ltYWdlT2JqZWN0L0ltYWdlT2JqZWN0XCI7XHJcbmltcG9ydCB7R2FtZX0gZnJvbSBcIi4uL0VuZ2luZS9Db3JlL0dhbWVcIlxyXG5pbXBvcnQgeyBTY2VuZSB9IGZyb20gXCIuLi9FbmdpbmUvU2NlbmUvU2NlbmVcIjtcclxuY29uc3QgYmxhbmtzID0gMjAwO1xyXG5jb25zdCBwaXBlSGVpZ2h0ID0gMzUwO1xyXG5jb25zdCBudW1QaXBlID0gNDtcclxuY29uc3QgZGlzdGFuY2UgPSAzMDA7XHJcbmNvbnN0IHBpcGVXaWR0aCA9IDgwO1xyXG5jbGFzcyBQYWlyT2ZQaXBle1xyXG4gICAgUGlwZXM6IEFycmF5PEltYWdlT2JqZWN0PjtcclxuICAgIHByaXZhdGUgc3BlZWQ6IG51bWJlcjtcclxuICAgIGNvbnN0cnVjdG9yKHNjZW5lOiBTY2VuZSx4Om51bWJlciwgeTpudW1iZXIsc3BlZWQ6IG51bWJlcil7XHJcbiAgICAgICAgdmFyIFBpcGVVcCA9IG5ldyBJbWFnZU9iamVjdChzY2VuZSxcInBpcGVcIik7XHJcbiAgICAgICAgLy8gc2V0IGF0dHJpYnV0ZXNcclxuICAgICAgICBQaXBlVXAueCA9IHg7XHJcbiAgICAgICAgUGlwZVVwLnkgPSB5O1xyXG4gICAgICAgIFBpcGVVcC53aWR0aCA9IHBpcGVXaWR0aDtcclxuICAgICAgICBQaXBlVXAuaGVpZ2h0ID0gcGlwZUhlaWdodDtcclxuICAgICAgICBQaXBlVXAuZGVncmVlcyA9IDE4MDtcclxuICAgICAgICBQaXBlVXAubmFtZSA9IFwicGlwZVwiO1xyXG4gICAgICAgIFBpcGVVcC56X2luZGV4ID0gMTtcclxuICAgICAgICAvLyBzZXQgZGVmYXVsdFBvc2l0aW9uXHJcbiAgICAgICAgUGlwZVVwLmRlZmF1bHRQb3NpdGlvbiA9IFt4LHldO1xyXG5cclxuICAgICAgICB2YXIgUGlwZURvd24gPSBuZXcgSW1hZ2VPYmplY3Qoc2NlbmUsXCJwaXBlXCIpO1xyXG4gICAgICAgIC8vIHNldCBhdHRyaWJ1dGVzXHJcbiAgICAgICAgUGlwZURvd24ueCA9IHg7XHJcbiAgICAgICAgUGlwZURvd24ueSA9IHkrcGlwZUhlaWdodCtibGFua3M7XHJcbiAgICAgICAgUGlwZURvd24ud2lkdGggPSBwaXBlV2lkdGg7XHJcbiAgICAgICAgUGlwZURvd24uaGVpZ2h0ID0gcGlwZUhlaWdodDtcclxuICAgICAgICBQaXBlRG93bi5uYW1lID0gXCJwaXBlXCI7XHJcbiAgICAgICAgUGlwZURvd24uel9pbmRleCA9IDE7XHJcbiAgICAgICAgLy8gc2V0IGRlZmF1bHRQb3NpdGlvblxyXG4gICAgICAgIFBpcGVEb3duLmRlZmF1bHRQb3NpdGlvbiA9IFt4LHkrcGlwZUhlaWdodCtibGFua3NdO1xyXG5cclxuICAgICAgICB2YXIgY2hlY2tTY29yZSA9IG5ldyBJbWFnZU9iamVjdChzY2VuZSxcIm51bGxcIik7XHJcbiAgICAgICAgLy8gc2V0IGF0dHJpYnV0ZXNcclxuICAgICAgICBjaGVja1Njb3JlLnggPSB4K3BpcGVXaWR0aDtcclxuICAgICAgICBjaGVja1Njb3JlLnkgPSB5K3BpcGVIZWlnaHQ7XHJcbiAgICAgICAgY2hlY2tTY29yZS53aWR0aCA9IDEwO1xyXG4gICAgICAgIGNoZWNrU2NvcmUuaGVpZ2h0ID0gYmxhbmtzO1xyXG4gICAgICAgIGNoZWNrU2NvcmUubmFtZSA9IFwiY2hlY2tTY29yZVwiO1xyXG4gICAgICAgIGNoZWNrU2NvcmUuel9pbmRleCA9IDE7XHJcbiAgICAgICAgY2hlY2tTY29yZS5kZWZhdWx0UG9zaXRpb24gPSBbeCtwaXBlV2lkdGgseStwaXBlSGVpZ2h0XTtcclxuXHJcbiAgICAgICAgdGhpcy5QaXBlcz0gW1BpcGVVcCxQaXBlRG93bixjaGVja1Njb3JlXTtcclxuXHJcbiAgICAgICAgdGhpcy5zcGVlZCA9IHNwZWVkO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKHRpbWU6bnVtYmVyLCBkZWx0YVRpbWU6bnVtYmVyKXtcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwzO2krKyl7XHJcbiAgICAgICAgICAgIHRoaXMuUGlwZXNbaV0ueCAtPSB0aGlzLnNwZWVkKihkZWx0YVRpbWUvMTYuNjcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJlc2V0KCl7XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8MztpKyspe1xyXG4gICAgICAgICAgICB0aGlzLlBpcGVzW2ldLnJlc2V0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0Q29tcG9uZW50KCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuUGlwZXM7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIExpc3RQYWlyT2ZQaXBlc3tcclxuICAgIGxpc3RQaXBlOiBQYWlyT2ZQaXBlW107XHJcbiAgICBjb25zdHJ1Y3RvcihzY2VuZTogU2NlbmUpe1xyXG4gICAgICAgIHRoaXMubGlzdFBpcGUgPSBbXTtcclxuICAgICAgICBmb3IodmFyIGk9MDtpPG51bVBpcGU7aSsrKXtcclxuICAgICAgICAgICAgdmFyIHggPSBpKmRpc3RhbmNlICsgcGlwZVdpZHRoICsgNDAwO1xyXG4gICAgICAgICAgICB2YXIgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqLTIwMCk7XHJcbiAgICAgICAgICAgIHZhciBwaXBlID0gbmV3IFBhaXJPZlBpcGUoc2NlbmUseCx5LDQpO1xyXG4gICAgICAgICAgICB0aGlzLmxpc3RQaXBlLnB1c2gocGlwZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdXBkYXRlKCl7XHJcbiAgICAgICAgdGhpcy5saXN0UGlwZS5tYXAoKHBpcGUsaW5kZXgpID0+e1xyXG4gICAgICAgICAgICBpZihwaXBlLlBpcGVzWzBdLng8LTEwMCl7XHJcbiAgICAgICAgICAgICAgICB2YXIgZnJvbnRJbmRleCA9IGluZGV4IC0xO1xyXG4gICAgICAgICAgICAgICAgaWYoZnJvbnRJbmRleDwwKSBmcm9udEluZGV4ID0gdGhpcy5saXN0UGlwZS5sZW5ndGgtMTtcclxuICAgICAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPHBpcGUuUGlwZXMubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgcGlwZS5QaXBlc1tpXS54ID0gdGhpcy5saXN0UGlwZVtmcm9udEluZGV4XS5QaXBlc1tpXS54ICsgZGlzdGFuY2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge1BhaXJPZlBpcGUsIExpc3RQYWlyT2ZQaXBlc307XHJcbiIsImltcG9ydCB7IFRleHRPYmplY3QgfSBmcm9tICcuLi9FbmdpbmUvVGV4dE9iamVjdC9UZXh0T2JqZWN0JztcclxuaW1wb3J0IHtCdXR0b25PYmplY3QgfSBmcm9tICcuLi9FbmdpbmUvQnV0dG9uT2JqZWN0L0J1dHRvbk9iamVjdCc7XHJcbmltcG9ydCB7IEltYWdlT2JqZWN0IH0gZnJvbSAnLi4vRW5naW5lL0ltYWdlT2JqZWN0L0ltYWdlT2JqZWN0JztcclxuXHJcbmV4cG9ydCBjbGFzcyBQYW5lbEdhbWVPdmVyIHtcclxuICAgIGltZ0dhbWVPdmVyOiBJbWFnZU9iamVjdDtcclxuICAgIGN1cnJlbnRTY29yZTogVGV4dE9iamVjdDtcclxuICAgIGhpZ2hTY29yZTogVGV4dE9iamVjdDtcclxuICAgIHJlcGxheUJ1dHRvbjogQnV0dG9uT2JqZWN0O1xyXG4gICAgY29uc3RydWN0b3IoaW1nR2FtZU92ZXI6IEltYWdlT2JqZWN0LCBjdXJyZW50U2NvcmU6IFRleHRPYmplY3QsIGhpZ2hTY29yZTogVGV4dE9iamVjdCwgcmVwbGF5QnV0dG9uOiBCdXR0b25PYmplY3Qpe1xyXG4gICAgICAgIHRoaXMuaW1nR2FtZU92ZXIgPSBpbWdHYW1lT3ZlcjtcclxuICAgICAgICB0aGlzLmN1cnJlbnRTY29yZSA9IGN1cnJlbnRTY29yZTtcclxuICAgICAgICB0aGlzLmhpZ2hTY29yZSA9IGhpZ2hTY29yZTtcclxuICAgICAgICB0aGlzLnJlcGxheUJ1dHRvbiA9IHJlcGxheUJ1dHRvbjtcclxuICAgIH1cclxuICAgIHNldEFjdGl2ZShhY3RpdmU6IGJvb2xlYW4pe1xyXG4gICAgICAgIHRoaXMuaW1nR2FtZU92ZXIuc2V0QWN0aXZlKGFjdGl2ZSk7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50U2NvcmUuc2V0QWN0aXZlKGFjdGl2ZSk7XHJcbiAgICAgICAgdGhpcy5oaWdoU2NvcmUuc2V0QWN0aXZlKGFjdGl2ZSk7XHJcbiAgICAgICAgdGhpcy5yZXBsYXlCdXR0b24uc2V0QWN0aXZlKGFjdGl2ZSk7XHJcbiAgICB9XHJcbiAgICBnZXRDb21wb25lbnQoKXtcclxuICAgICAgICByZXR1cm4gW3RoaXMuaW1nR2FtZU92ZXIsIHRoaXMucmVwbGF5QnV0dG9uLCB0aGlzLmN1cnJlbnRTY29yZSwgdGhpcy5oaWdoU2NvcmVdO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKGN1cnJlbnRTY29yZTogbnVtYmVyLCBoaWdoU2NvcmU6IG51bWJlcil7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50U2NvcmUuc2V0Q29udGVudChcIlNjb3JlOiBcIiArIGN1cnJlbnRTY29yZSk7XHJcbiAgICAgICAgdGhpcy5oaWdoU2NvcmUuc2V0Q29udGVudChcIkhpZ2ggU2NvcmU6IFwiICsgaGlnaFNjb3JlKVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtTY2VuZX0gZnJvbSAnLi4vRW5naW5lL1NjZW5lL1NjZW5lJztcclxuaW1wb3J0IHtCaXJkfSBmcm9tICcuL0JpcmQnO1xyXG5pbXBvcnQge0xpc3RQYWlyT2ZQaXBlc30gZnJvbSAnLi9QYWlyT2ZQaXBlJztcclxuaW1wb3J0IHtUZXh0T2JqZWN0IH0gZnJvbSAnLi4vRW5naW5lL1RleHRPYmplY3QvVGV4dE9iamVjdCc7XHJcbmltcG9ydCB7SW1hZ2VPYmplY3QgfSBmcm9tICcuLi9FbmdpbmUvSW1hZ2VPYmplY3QvSW1hZ2VPYmplY3QnO1xyXG5pbXBvcnQge1Njb3JlfSBmcm9tIFwiLi9TY29yZVwiO1xyXG5pbXBvcnQge0dyb3VuZCB9IGZyb20gJy4vR3JvdW5kJztcclxuaW1wb3J0IHtQYW5lbEdhbWVPdmVyfSBmcm9tICcuL1BhbmVsR2FtZU92ZXInXHJcbmltcG9ydCB7R2FtZX0gZnJvbSAnLi4vRW5naW5lL0NvcmUvR2FtZSdcclxuaW1wb3J0IHtCdXR0b25PYmplY3R9IGZyb20gJy4uL0VuZ2luZS9CdXR0b25PYmplY3QvQnV0dG9uT2JqZWN0JztcclxuaW1wb3J0IHsgR2FtZU9iamVjdCB9IGZyb20gJy4uL0VuZ2luZS9HYW1lT2JqZWN0L0dhbWVPYmplY3QnO1xyXG5cclxuY29uc3QgcG9pbnQgPSBuZXcgQXVkaW8oXCJhdWRpby9wb2ludC5tcDNcIik7XHJcbmNvbnN0IGRpZSA9IG5ldyBBdWRpbyhcImF1ZGlvL2RpZS5tcDNcIik7XHJcbmNvbnN0IGhpdCA9IG5ldyBBdWRpbyhcImF1ZGlvL2hpdC5tcDNcIik7XHJcbmNvbnN0IGF1ZGlvUGxheWVyID0gbmV3IEF1ZGlvKFwiYXVkaW8vb3JjaGVzdHJhd2F2LTI2MTU4Lm1wM1wiKTtcclxuY29uc3QgYXVkaW8gPSBuZXcgQXVkaW8oXCJhdWRpby9zd29vc2gubXAzXCIpO1xyXG5jb25zdCBCaXJkX1dpZHRoID0gNTA7XHJcbmNvbnN0IEJpcmRfSGVpZ2h0ID0gNTA7XHJcbmNvbnN0IEJpcmRfWCA9IDEwMDtcclxuY29uc3QgQmlyZF9ZID0gMjgwO1xyXG5cclxuZXhwb3J0IGNsYXNzIFBsYXlTY2VuZSBleHRlbmRzIFNjZW5lIHtcclxuICAgIGJpcmQ6IEJpcmQ7XHJcbiAgICBwaXBlczogTGlzdFBhaXJPZlBpcGVzO1xyXG4gICAgZ3JvdW5kOiBHcm91bmQ7XHJcbiAgICBjaGVja1BpcGU6IGJvb2xlYW47XHJcbiAgICB0ZXh0U2NvcmU6IFRleHRPYmplY3Q7XHJcbiAgICB0ZXh0RGVzY3JpcHRpb246IFRleHRPYmplY3Q7XHJcbiAgICBhZGRTY29yZTogbnVtYmVyIHwgbnVsbDtcclxuICAgIHNjb3JlOiBTY29yZTtcclxuICAgIGRlYWRCaXJkOiBib29sZWFuO1xyXG4gICAgcGFuZWxHYW1lT3ZlciA6IFBhbmVsR2FtZU92ZXI7XHJcbiAgICBzdGFydDogYm9vbGVhbjtcclxuICAgIHBhdXNlOiBib29sZWFuO1xyXG4gICAgY29uc3RydWN0b3IoZ2FtZTogR2FtZSl7XHJcbiAgICAgICAgc3VwZXIoZ2FtZSk7XHJcbiAgICAgICAgLy8gcGxheSBhdWRpb1xyXG4gICAgICAgIC8vIGF1ZGlvUGxheWVyLnBsYXkoKTtcclxuICAgICAgICAvLyBhdWRpb1BsYXllci5sb29wID10cnVlO1xyXG4gICAgICAgIHRoaXMuY2hlY2tQaXBlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5hZGRTY29yZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5kZWFkQmlyZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc3RhcnQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnBhdXNlID0gZmFsc2U7IFxyXG4gICAgICAgIHRoaXMuc2NvcmUgPSBuZXcgU2NvcmUoKTtcclxuXHJcbiAgICAgICAgdGhpcy5iaXJkID0gIG5ldyBCaXJkKHRoaXMpXHJcbiAgICAgICAgLy8gc2V0IGF0dHJpYnV0ZXNcclxuICAgICAgICB0aGlzLmJpcmQueCA9IEJpcmRfWDtcclxuICAgICAgICB0aGlzLmJpcmQueSA9IEJpcmRfWTtcclxuICAgICAgICB0aGlzLmJpcmQud2lkdGggPSBCaXJkX1dpZHRoO1xyXG4gICAgICAgIHRoaXMuYmlyZC5oZWlnaHQgPSBCaXJkX0hlaWdodDtcclxuICAgICAgICB0aGlzLmJpcmQuZ3Jhdml0eSA9IDAuNTtcclxuICAgICAgICB0aGlzLmJpcmQuc3BlZWQgPSAyMDtcclxuICAgICAgICB0aGlzLmJpcmQuel9pbmRleCA9IDI7XHJcbiAgICAgICAgdGhpcy5iaXJkLmRlZmF1bHRQb3NpdGlvbiA9IFt0aGlzLmJpcmQueCwgdGhpcy5iaXJkLnldO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMudGV4dERlc2NyaXB0aW9uID0gbmV3IFRleHRPYmplY3QodGhpcyk7XHJcbiAgICAgICAgLy8gc2V0IGF0dHJpYnV0ZXNcclxuICAgICAgICB0aGlzLnRleHREZXNjcmlwdGlvbi54ID0gMTQwO1xyXG4gICAgICAgIHRoaXMudGV4dERlc2NyaXB0aW9uLnkgPSA0NTA7XHJcbiAgICAgICAgdGhpcy50ZXh0RGVzY3JpcHRpb24uY29udGVudCA9IFwiUHJlc3MgRW50ZXIgdG8gY29udGludWVcIjtcclxuICAgICAgICB0aGlzLnRleHREZXNjcmlwdGlvbi5mb250ID0gXCIzMHB4IEFyaWFsXCI7XHJcbiAgICAgICAgdGhpcy50ZXh0RGVzY3JpcHRpb24uY29sb3IgPSBcIndoaXRlXCI7XHJcbiAgICAgICAgdGhpcy50ZXh0RGVzY3JpcHRpb24uel9pbmRleCA9IDI7XHJcbiAgICAgICAgdGhpcy50ZXh0RGVzY3JpcHRpb24uc2V0QWN0aXZlKGZhbHNlKTtcclxuICAgICAgICB0aGlzLnRleHREZXNjcmlwdGlvbi5kZWZhdWx0UG9zaXRpb24gPSBbMTQwLDQ1MF07XHJcblxyXG4gICAgICAgIHRoaXMudGV4dFNjb3JlID0gbmV3IFRleHRPYmplY3QodGhpcyk7XHJcbiAgICAgICAgdGhpcy50ZXh0U2NvcmUueCA9IDEwO1xyXG4gICAgICAgIHRoaXMudGV4dFNjb3JlLnkgPSAzMDtcclxuICAgICAgICB0aGlzLnRleHRTY29yZS5jb250ZW50ID0gXCJTY29yZTogXCIrIHRoaXMuc2NvcmUuZ2V0Q3VycmVudFNjb3JlKCk7XHJcbiAgICAgICAgdGhpcy50ZXh0U2NvcmUuZm9udCA9IFwiMThweCBBcmlhbFwiO1xyXG4gICAgICAgIHRoaXMudGV4dFNjb3JlLmNvbG9yID0gXCJ3aGl0ZVwiO1xyXG4gICAgICAgIHRoaXMudGV4dFNjb3JlLnpfaW5kZXggPSAyO1xyXG4gICAgICAgIHRoaXMudGV4dFNjb3JlLmRlZmF1bHRQb3NpdGlvbiA9IFsxMCwzMF07XHJcblxyXG4gICAgICAgIHZhciBiZyA9IG5ldyBJbWFnZU9iamVjdCh0aGlzLFwiYmFja2dyb3VuZFwiKTtcclxuICAgICAgICAvLyBzZXQgYXR0cmlidXRlc1xyXG4gICAgICAgIGJnLndpZHRoID0gNzAwO1xyXG4gICAgICAgIGJnLmhlaWdodCA9IDgwMDtcclxuICAgICAgICBiZy5uYW1lID0gXCJiYWNrZ3JvdW5kXCI7XHJcblxyXG4gICAgICAgIHRoaXMuZ3JvdW5kID0gbmV3IEdyb3VuZCh0aGlzLDQpO1xyXG4gICAgICAgIHRoaXMucGlwZXMgPSBuZXcgTGlzdFBhaXJPZlBpcGVzKHRoaXMpO1xyXG5cclxuICAgICAgICAvLyBpbml0IHBhbmVsR2FtZU92ZXJcclxuICAgICAgICB2YXIgaW1nR2FtZU92ZXIgPSBuZXcgSW1hZ2VPYmplY3QodGhpcyxcImdhbWVvdmVyXCIpO1xyXG4gICAgICAgIGltZ0dhbWVPdmVyLnggPSA2MDtcclxuICAgICAgICBpbWdHYW1lT3Zlci55ID0gMzAwO1xyXG4gICAgICAgIGltZ0dhbWVPdmVyLndpZHRoID0gNTAwO1xyXG4gICAgICAgIGltZ0dhbWVPdmVyLmhlaWdodCA9IDEzMDtcclxuICAgICAgICBpbWdHYW1lT3Zlci56X2luZGV4ID0gMztcclxuICAgICAgICBpbWdHYW1lT3Zlci5kZWZhdWx0UG9zaXRpb24gPSBbNjAsMzAwXTtcclxuXHJcbiAgICAgICAgdmFyIHRleHRDdXJyZW50U2NvcmUgPSBuZXcgVGV4dE9iamVjdCh0aGlzKTtcclxuICAgICAgICB0ZXh0Q3VycmVudFNjb3JlLnggPSAxMTA7XHJcbiAgICAgICAgdGV4dEN1cnJlbnRTY29yZS55ID0gNDcwO1xyXG4gICAgICAgIHRleHRDdXJyZW50U2NvcmUuY29udGVudCA9IFwiU2NvcmU6IDBcIjtcclxuICAgICAgICB0ZXh0Q3VycmVudFNjb3JlLmZvbnQgPSBcIjMwcHggQXJpYWxcIjtcclxuICAgICAgICB0ZXh0Q3VycmVudFNjb3JlLmNvbG9yID0gXCJ3aGl0ZVwiO1xyXG4gICAgICAgIHRleHRDdXJyZW50U2NvcmUuel9pbmRleCA9IDM7XHJcbiAgICAgICAgdGV4dEN1cnJlbnRTY29yZS5kZWZhdWx0UG9zaXRpb24gPSBbMTEwLDQ3MF07XHJcblxyXG4gICAgICAgIHZhciB0ZXh0SGlnaFNjb3JlID0gbmV3IFRleHRPYmplY3QodGhpcyk7XHJcbiAgICAgICAgdGV4dEhpZ2hTY29yZS54ID0gMzMwO1xyXG4gICAgICAgIHRleHRIaWdoU2NvcmUueSA9IDQ3MDtcclxuICAgICAgICB0ZXh0SGlnaFNjb3JlLmNvbnRlbnQgPSBcIkhpZ2ggU2NvcmU6IDBcIjtcclxuICAgICAgICB0ZXh0SGlnaFNjb3JlLmZvbnQgPSBcIjMwcHggQXJpYWxcIjtcclxuICAgICAgICB0ZXh0SGlnaFNjb3JlLmNvbG9yID0gXCJ3aGl0ZVwiO1xyXG4gICAgICAgIHRleHRIaWdoU2NvcmUuel9pbmRleCA9IDM7XHJcbiAgICAgICAgdGV4dEhpZ2hTY29yZS5kZWZhdWx0UG9zaXRpb24gPSBbMzMwLDQ3MF1cclxuXHJcbiAgICAgICAgdmFyIGJ1dHRvblJlcGxheSA9IG5ldyBCdXR0b25PYmplY3QodGhpcyxcInJlcGxheUJ1dHRvblwiKTtcclxuICAgICAgICBidXR0b25SZXBsYXkueCA9IDIyNTtcclxuICAgICAgICBidXR0b25SZXBsYXkueSA9IDUwMDtcclxuICAgICAgICBidXR0b25SZXBsYXkud2lkdGggPSAxNjA7XHJcbiAgICAgICAgYnV0dG9uUmVwbGF5LmhlaWdodCA9IDgwO1xyXG4gICAgICAgIGJ1dHRvblJlcGxheS56X2luZGV4ID0gMztcclxuICAgICAgICBidXR0b25SZXBsYXkuZGVmYXVsdFBvc2l0aW9uID0gWzIyNSw1MDBdO1xyXG5cclxuICAgICAgICB0aGlzLnBhbmVsR2FtZU92ZXIgPSBuZXcgUGFuZWxHYW1lT3ZlcihcclxuICAgICAgICAgICAgaW1nR2FtZU92ZXIsdGV4dEN1cnJlbnRTY29yZSx0ZXh0SGlnaFNjb3JlLGJ1dHRvblJlcGxheVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gTGlzdCBvZiBHYW1lT2JqZWN0XHJcbiAgICAgICAgdmFyIGxpc3RHYW1lT2JqZWN0IDpBcnJheTxHYW1lT2JqZWN0PiA9IFtiZyx0aGlzLmJpcmQsdGhpcy50ZXh0U2NvcmUsIHRoaXMudGV4dERlc2NyaXB0aW9uXTtcclxuICAgICAgICBsaXN0R2FtZU9iamVjdCA9ICBsaXN0R2FtZU9iamVjdC5jb25jYXQodGhpcy5ncm91bmQuZ2V0Q29tcG9uZW50KCkpO1xyXG4gICAgICAgIGxpc3RHYW1lT2JqZWN0ID0gbGlzdEdhbWVPYmplY3QuY29uY2F0KHRoaXMucGFuZWxHYW1lT3Zlci5nZXRDb21wb25lbnQoKSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZm9yKHZhciBpPTA7aTx0aGlzLnBpcGVzLmxpc3RQaXBlLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICB2YXIgcGlwZSA9IHRoaXMucGlwZXMubGlzdFBpcGVbaV07XHJcbiAgICAgICAgICAgIGxpc3RHYW1lT2JqZWN0ID0gbGlzdEdhbWVPYmplY3QuY29uY2F0KHBpcGUuZ2V0Q29tcG9uZW50KCkpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwibGlzdEdhbWVPYmplY3RcIixsaXN0R2FtZU9iamVjdClcclxuICAgICAgICB0aGlzLmFkZENoaWxkKGxpc3RHYW1lT2JqZWN0KTtcclxuICAgICAgICAvLyBoaWRlbiBwYW5lbEdhbWVPdmVyXHJcbiAgICAgICAgdGhpcy5wYW5lbEdhbWVPdmVyLnNldEFjdGl2ZShmYWxzZSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHVwZGF0ZSh0aW1lOiBudW1iZXIsIGRlbHRhVGltZTogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYoICF0aGlzLmRlYWRCaXJkICYmIHRoaXMuc3RhcnQgJiYgIXRoaXMucGF1c2Upe1xyXG4gICAgICAgICAgICBpZih0aGlzLnByb2Nlc3NJbnB1dC5pbnB1dEtleSA9PT0gXCJLZXlBXCIpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXVzZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRleHREZXNjcmlwdGlvbi5zZXRBY3RpdmUodHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHBpcGVzID0gdGhpcy5nYW1lT2JqZWN0cy5maWx0ZXIoKGltYik9PntcclxuICAgICAgICAgICAgICAgIHJldHVybiBpbWIubmFtZSA9PT0gXCJwaXBlXCI7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdmFyIGNoZWNrU2NvcmUgPSB0aGlzLmdhbWVPYmplY3RzLmZpbHRlcigoaW1iKT0+e1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGltYi5uYW1lID09PSBcImNoZWNrU2NvcmVcIjtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdGhpcy5ncm91bmQudXBkYXRlKHRpbWUsIGRlbHRhVGltZSk7XHJcbiAgICAgICAgICAgIGZvcih2YXIgaiA9IDA7IGogPCBwaXBlcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5jb2xsaXNpb24uaGFuZGxlQ29sbGlzaW9uKHBpcGVzW2pdLHRoaXMuYmlyZCkpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tQaXBlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImdhbWUgb3ZlciFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBjaGVja1Njb3JlLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmNvbGxpc2lvbi5oYW5kbGVDb2xsaXNpb24oY2hlY2tTY29yZVtrXSx0aGlzLmJpcmQpJiYgdGhpcy5hZGRTY29yZSAhPSBrKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjb3JlLnNldEN1cnJlbnRTY29yZSh0aGlzLnNjb3JlLmdldEN1cnJlbnRTY29yZSgpKzEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGV4dFNjb3JlLmNvbnRlbnQgPSBcIlNjb3JlOiBcIiArIHRoaXMuc2NvcmUuZ2V0Q3VycmVudFNjb3JlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRTY29yZSA9IGs7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9pbnQucGxheSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucGlwZXMubGlzdFBpcGUubWFwKChwaXBlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBwaXBlLnVwZGF0ZSh0aW1lLCBkZWx0YVRpbWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5waXBlcy51cGRhdGUoKTtcclxuXHJcbiAgICAgICAgICAgIGlmKHRoaXMucHJvY2Vzc0lucHV0LmlucHV0S2V5PT09XCJTcGFjZVwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJpcmQuZmx5KCk7XHJcbiAgICAgICAgICAgICAgICBhdWRpby5wbGF5KCk7IFxyXG4gICAgICAgICAgICAgICAgYXVkaW8ucGxheWJhY2tSYXRlID0gMjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyB2YSBjaGFtIGdyb3VuZFxyXG4gICAgICAgICAgICBpZih0aGlzLmNvbGxpc2lvbi5oYW5kbGVDb2xsaXNpb24odGhpcy5ncm91bmQuZ2V0Q29tcG9uZW50KClbMF0sIHRoaXMuYmlyZCl8fHRoaXMuY29sbGlzaW9uLmhhbmRsZUNvbGxpc2lvbih0aGlzLmdyb3VuZC5nZXRDb21wb25lbnQoKVsxXSwgdGhpcy5iaXJkKXx8dGhpcy5jaGVja1BpcGUpe1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5zY29yZS5nZXRDdXJyZW50U2NvcmUoKT4gdGhpcy5zY29yZS5nZXRIaWdoU2NvcmUoKSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjb3JlLnNldEhpZ2hTY29yZSh0aGlzLnNjb3JlLmdldEN1cnJlbnRTY29yZSgpKTtcclxuICAgICAgICAgICAgICAgIC8vIHVwZGF0ZSBzY29yZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5wYW5lbEdhbWVPdmVyLnVwZGF0ZSh0aGlzLnNjb3JlLmdldEN1cnJlbnRTY29yZSgpLCB0aGlzLnNjb3JlLmdldEhpZ2hTY29yZSgpKTtcclxuICAgICAgICAgICAgICAgIC8vIHNldCBzdGF0ZSBiaXJkIGlzIGRpZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5kZWFkQmlyZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAvLyBwbGF5IGF1ZGlvXHJcbiAgICAgICAgICAgICAgICBhdWRpb1BsYXllci5wYXVzZSgpO1xyXG4gICAgICAgICAgICAgICAgaGl0LnBsYXkoKTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT57XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gc2hvdyBwYW5lbEdhbWVPdmVyXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYW5lbEdhbWVPdmVyLnNldEFjdGl2ZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICBkaWUucGxheSgpO1xyXG4gICAgICAgICAgICAgICAgfSwgNTAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzdXBlci51cGRhdGUodGltZSwgZGVsdGFUaW1lKTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih0aGlzLmRlYWRCaXJkKXtcclxuICAgICAgICAgICAgaWYoIXRoaXMuY29sbGlzaW9uLmhhbmRsZUNvbGxpc2lvbih0aGlzLmdyb3VuZC5nZXRDb21wb25lbnQoKVswXSwgdGhpcy5iaXJkKSYmIXRoaXMuY29sbGlzaW9uLmhhbmRsZUNvbGxpc2lvbih0aGlzLmdyb3VuZC5nZXRDb21wb25lbnQoKVsxXSwgdGhpcy5iaXJkKSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJpcmQuc3BlZWQgPSAxMDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJpcmQudXBkYXRlKHRpbWUsIGRlbHRhVGltZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoKHRoaXMucHJvY2Vzc0lucHV0LmlucHV0S2V5ID09PSBcIkVudGVyXCJ8fHRoaXMucHJvY2Vzc0lucHV0Lm1vdXNlRXZlbnQhPW51bGwmJiB0aGlzLnBhbmVsR2FtZU92ZXIucmVwbGF5QnV0dG9uLmlzSW5zaWRlKHRoaXMucHJvY2Vzc0lucHV0Lm1vdXNlRXZlbnQpKSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlYWRCaXJkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhbmVsR2FtZU92ZXIuc2V0QWN0aXZlKGZhbHNlKTsgXHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUuc2NlbmVNYW5hZ2VyLnN3aXRjaFNjZW5lKDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoIXRoaXMuc3RhcnQpe1xyXG4gICAgICAgICAgICBpZih0aGlzLnByb2Nlc3NJbnB1dC5pbnB1dEtleSA9PT0gXCJTcGFjZVwiKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMucGF1c2Upe1xyXG4gICAgICAgICAgICBpZih0aGlzLnByb2Nlc3NJbnB1dC5pbnB1dEtleSA9PT0gXCJFbnRlclwiKXtcclxuICAgICAgICAgICAgICAgIHRoaXMucGF1c2UgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMudGV4dERlc2NyaXB0aW9uLnNldEFjdGl2ZShmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXNldFNjZW5lKCl7XHJcbiAgICAgICAgLy8gYXVkaW9QbGF5ZXIucGxheSgpO1xyXG4gICAgICAgIC8vIGF1ZGlvUGxheWVyLmxvb3AgPXRydWU7XHJcbiAgICAgICAgdGhpcy5jaGVja1BpcGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmFkZFNjb3JlID0gbnVsbDtcclxuICAgICAgICB0aGlzLnN0YXJ0ID0gZmFsc2U7XHJcbiAgICAgICAgc3VwZXIucmVzZXRTY2VuZSgpO1xyXG4gICAgICAgIHRoaXMuc2NvcmUuc2V0Q3VycmVudFNjb3JlKDApO1xyXG4gICAgICAgIHRoaXMudGV4dFNjb3JlLnNldENvbnRlbnQoXCJTY29yZTogMFwiKTtcclxuICAgICAgICB0aGlzLmJpcmQucmVzZXQoKTtcclxuICAgICAgICB0aGlzLmdyb3VuZC5yZXNldCgpO1xyXG4gICAgICAgIGZvcih2YXIgaT0wO2k8dGhpcy5waXBlcy5saXN0UGlwZS5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgdGhpcy5waXBlcy5saXN0UGlwZVtpXS5yZXNldCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyhcInJlc2V0IHJlbmRlcmluZ1wiKTtcclxuICAgIH1cclxufVxyXG4iLCJjbGFzcyBTY29yZXtcclxuICAgIHByaXZhdGUgaGlnaFNjb3JlOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIGN1cnJlbnRTY29yZTogbnVtYmVyO1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICB0aGlzLmhpZ2hTY29yZSA9IDA7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50U2NvcmUgPSAwO1xyXG4gICAgfVxyXG4gICAgc2V0Q3VycmVudFNjb3JlKHNjb3JlOiBudW1iZXIpe1xyXG4gICAgICAgIHRoaXMuY3VycmVudFNjb3JlID0gc2NvcmU7XHJcbiAgICB9XHJcbiAgICBnZXRDdXJyZW50U2NvcmUoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50U2NvcmU7XHJcbiAgICB9XHJcbiAgICBnZXRIaWdoU2NvcmUoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5oaWdoU2NvcmU7XHJcbiAgICB9XHJcbiAgICBzZXRIaWdoU2NvcmUoaGlnaFNjb3JlOiBudW1iZXIpe1xyXG4gICAgICAgIHRoaXMuaGlnaFNjb3JlID0gaGlnaFNjb3JlO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCB7U2NvcmV9OyIsImltcG9ydCB7U2NlbmV9IGZyb20gJy4uL0VuZ2luZS9TY2VuZS9TY2VuZSc7XHJcbmltcG9ydCB7IEltYWdlT2JqZWN0IH0gZnJvbSAnLi4vRW5naW5lL0ltYWdlT2JqZWN0L0ltYWdlT2JqZWN0JztcclxuaW1wb3J0IHsgQnV0dG9uT2JqZWN0IH0gZnJvbSAnLi4vRW5naW5lL0J1dHRvbk9iamVjdC9CdXR0b25PYmplY3QnO1xyXG5pbXBvcnQge0dyb3VuZH0gZnJvbSBcIi4vR3JvdW5kXCJcclxuaW1wb3J0IHsgR2FtZSB9IGZyb20gJy4uL0VuZ2luZS9Db3JlL0dhbWUnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFN0YXJ0U2NlbmUgZXh0ZW5kcyBTY2VuZSB7XHJcbiAgICBiYWNrZ3JvdW5kOiBJbWFnZU9iamVjdDtcclxuICAgIGdyb3VuZDogR3JvdW5kO1xyXG4gICAgaW1nU3RhcnQ6IEltYWdlT2JqZWN0O1xyXG4gICAgYnV0dG9uU3RhcnQ6IEJ1dHRvbk9iamVjdFxyXG4gICAgY29uc3RydWN0b3IoZ2FtZTogR2FtZSl7XHJcbiAgICAgICAgc3VwZXIoZ2FtZSk7XHJcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kID1uZXcgSW1hZ2VPYmplY3QodGhpcyxcImJhY2tncm91bmRcIik7XHJcbiAgICAgICAgLy8gc2V0IGF0dHJpYnV0ZXNcclxuICAgICAgICB0aGlzLmJhY2tncm91bmQud2lkdGggPSA3MDA7XHJcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kLmhlaWdodCA9IDgwMDtcclxuICAgICAgICB0aGlzLmJhY2tncm91bmQubmFtZSA9IFwiYmFja2dyb3VuZFwiXHJcblxyXG4gICAgICAgIHRoaXMuaW1nU3RhcnQgPSBuZXcgSW1hZ2VPYmplY3QodGhpcyxcIm1lc3NhZ2VcIik7XHJcbiAgICAgICAgLy8gc2V0IGF0dHJpYnV0ZXNcclxuICAgICAgICB0aGlzLmltZ1N0YXJ0LndpZHRoID01MDAsXHJcbiAgICAgICAgdGhpcy5pbWdTdGFydC5oZWlnaHQgPSA3MDA7XHJcbiAgICAgICAgdGhpcy5pbWdTdGFydC54ID0gNTA7XHJcbiAgICAgICAgdGhpcy5pbWdTdGFydC55ID0gMjA7XHJcbiAgICAgICAgdGhpcy5pbWdTdGFydC56X2luZGV4ID0gMjtcclxuXHJcbiAgICAgICAgdGhpcy5idXR0b25TdGFydCA9IG5ldyBCdXR0b25PYmplY3QodGhpcyxcIm51bGxcIik7XHJcbiAgICAgICAgLy8gc2V0IGF0dHJpYnV0ZXNcclxuICAgICAgICB0aGlzLmJ1dHRvblN0YXJ0LndpZHRoID0gNzAwO1xyXG4gICAgICAgIHRoaXMuYnV0dG9uU3RhcnQuaGVpZ2h0ID0gODAwO1xyXG4gICAgICAgIHRoaXMuYnV0dG9uU3RhcnQubmFtZSA9IFwiYnV0dG9uU3RhcnRcIjtcclxuXHJcbiAgICAgICAgdGhpcy5ncm91bmQgPSBuZXcgR3JvdW5kKHRoaXMsMilcclxuICAgICAgICB2YXIgaW1hZ2VPYmplY3RzID0gW3RoaXMuYmFja2dyb3VuZF0uY29uY2F0KHRoaXMuZ3JvdW5kLmdldENvbXBvbmVudCgpKTtcclxuICAgICAgICBpbWFnZU9iamVjdHMucHVzaCh0aGlzLmltZ1N0YXJ0KTtcclxuICAgICAgICB0aGlzLmFkZENoaWxkKGltYWdlT2JqZWN0cyk7XHJcbiAgICB9XHJcbiAgICB1cGRhdGUodGltZTogbnVtYmVyLCBkZWx0YVRpbWU6IG51bWJlcil7XHJcbiAgICAgICAgdGhpcy5ncm91bmQudXBkYXRlKHRpbWUsIGRlbHRhVGltZSk7XHJcbiAgICAgICAgaWYodGhpcy5wcm9jZXNzSW5wdXQuaW5wdXRLZXkgPT09IFwiRW50ZXJcInx8dGhpcy5wcm9jZXNzSW5wdXQuaW5wdXRLZXkgPT09IFwiU3BhY2VcIiB8fCh0aGlzLnByb2Nlc3NJbnB1dC5tb3VzZUV2ZW50IT1udWxsICYmIHRoaXMuYnV0dG9uU3RhcnQuaXNJbnNpZGUodGhpcy5wcm9jZXNzSW5wdXQubW91c2VFdmVudCkpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5zY2VuZU1hbmFnZXIuc3dpdGNoU2NlbmUoMSlcclxuICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxufVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IFN0YXJ0U2NlbmUgfSBmcm9tIFwiLi9nYW1lL1N0YXJ0U2NlbmVcIjtcclxuaW1wb3J0IHsgUmVuZGVyZXIgfSBmcm9tIFwiLi9FbmdpbmUvUmVuZGVyZXIvUmVuZGVyZXJcIjtcclxuaW1wb3J0IHsgU2NlbmVNYW5hZ2VyIH0gZnJvbSBcIi4vRW5naW5lL1NjZW5lL1NjZW5lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBHYW1lIH0gZnJvbSBcIi4vRW5naW5lL0NvcmUvR2FtZVwiOyAgXHJcbmltcG9ydCB7UGxheVNjZW5lfSBmcm9tIFwiLi9nYW1lL1BsYXlTY2VuZVwiO1xyXG5cclxudmFyIGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdteUNhbnZhcycpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xyXG52YXIgcmVuZGVyID0gbmV3IFJlbmRlcmVyKGNhbnZhcylcclxudmFyIGdhbWVTY2VuZSA9IG5ldyBTY2VuZU1hbmFnZXIoKTtcclxudmFyIG15R2FtZSA9IG5ldyBHYW1lKGdhbWVTY2VuZSk7XHJcblxyXG5jb25zdCBpbWFnZXNMb2FkID0gW1xyXG4gICAge1xyXG4gICAgICAgIFwia2V5XCI6IFwiYmlyZDBcIixcclxuICAgICAgICBcInBhdGhcIjogXCJJbWFnZXMvYmlyZC9mcmFtZS0xLnBuZ1wiLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImtleVwiOiBcImJpcmQxXCIsXHJcbiAgICAgICAgXCJwYXRoXCI6IFwiSW1hZ2VzL2JpcmQvZnJhbWUtMi5wbmdcIixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJrZXlcIjogXCJiaXJkMlwiLFxyXG4gICAgICAgIFwicGF0aFwiOiBcIkltYWdlcy9iaXJkL2ZyYW1lLTMucG5nXCIsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwia2V5XCI6IFwiYmlyZDNcIixcclxuICAgICAgICBcInBhdGhcIjogXCJJbWFnZXMvYmlyZC9mcmFtZS00LnBuZ1wiLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImtleVwiOiBcImJpcmQ0XCIsXHJcbiAgICAgICAgXCJwYXRoXCI6IFwiSW1hZ2VzL2JpcmQvZnJhbWUtNS5wbmdcIixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJrZXlcIjogXCJiaXJkNVwiLFxyXG4gICAgICAgIFwicGF0aFwiOiBcIkltYWdlcy9iaXJkL2ZyYW1lLTYucG5nXCIsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwia2V5XCI6IFwiYmlyZDZcIixcclxuICAgICAgICBcInBhdGhcIjogXCJJbWFnZXMvYmlyZC9mcmFtZS03LnBuZ1wiLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImtleVwiOiBcImJpcmQ3XCIsXHJcbiAgICAgICAgXCJwYXRoXCI6IFwiSW1hZ2VzL2JpcmQvZnJhbWUtOC5wbmdcIixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJrZXlcIjogXCJwaXBlXCIsXHJcbiAgICAgICAgXCJwYXRoXCI6IFwiSW1hZ2VzL3BpcGUvcGlwZS1ncmVlbi5wbmdcIixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJrZXlcIjogXCJtZXNzYWdlXCIsXHJcbiAgICAgICAgXCJwYXRoXCI6IFwiSW1hZ2VzL2dhbWVTdGFydC9tZXNzYWdlLnBuZ1wiLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImtleVwiOiBcImdyb3VuZFwiLFxyXG4gICAgICAgIFwicGF0aFwiOiBcIkltYWdlcy9ncm91bmQvYmFzZS5wbmdcIixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJrZXlcIjogXCJnYW1lb3ZlclwiLFxyXG4gICAgICAgIFwicGF0aFwiOiBcIkltYWdlcy9wYW5lbEdhbWVPdmVyL2dhbWVvdmVyLnBuZ1wiLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImtleVwiOiBcInJlcGxheUJ1dHRvblwiLFxyXG4gICAgICAgIFwicGF0aFwiOiBcIkltYWdlcy9wYW5lbEdhbWVPdmVyL3JlcGxheS1idXR0b24ucG5nXCIsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwia2V5XCI6IFwiYmFja2dyb3VuZFwiLFxyXG4gICAgICAgIFwicGF0aFwiOiBcIkltYWdlcy9iYWNrZ3JvdW5kL2JhY2tncm91bmQtbmlnaHQucG5nXCJcclxuICAgIH1cclxuXVxyXG5cclxuY29uc3QgcHJvbWlzZXMgPSBpbWFnZXNMb2FkLm1hcCgoaW1hZ2UpID0+IG15R2FtZS5sb2FkZXIuYWRkSW1hZ2UoaW1hZ2VbXCJwYXRoXCJdLCBpbWFnZVtcImtleVwiXSkpXHJcblByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKCgpPT4ge1xyXG4gICAgdmFyIHN0YXJ0U2NlbmUgPSBuZXcgU3RhcnRTY2VuZShteUdhbWUpO1xyXG4gICAgdmFyIHBsYXlTY2VuZSA9IG5ldyBQbGF5U2NlbmUobXlHYW1lKTtcclxuICAgIGdhbWVTY2VuZS5hZGRTY2VuZShzdGFydFNjZW5lKTtcclxuICAgIGdhbWVTY2VuZS5hZGRTY2VuZShwbGF5U2NlbmUpO1xyXG4gICAgbXlHYW1lLnN0YXJ0KHJlbmRlcik7XHJcbn0pLmNhdGNoKChlcnJvcikgPT4ge2NvbnNvbGUubG9nKGVycm9yKX0pXHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==