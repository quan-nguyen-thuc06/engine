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
    constructor(image) {
        super(image);
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
    constructor() {
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.name = "";
        this.active = true;
        this.z_index = 0;
        this.defaultPosition = [0, 0];
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
    constructor(image) {
        super();
        if (image == null)
            this.image = new Image();
        else
            this.image = image;
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
    constructor(images) {
        super();
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
    constructor() {
        super();
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
        super(images);
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
    constructor(speed, game) {
        var image = game.loader.getImage("ground");
        var imageObject1 = new _Engine_ImageObject_ImageObject__WEBPACK_IMPORTED_MODULE_0__.ImageObject(image);
        imageObject1.name = "ground";
        imageObject1.z_index = 2;
        imageObject1.y = 670;
        imageObject1.width = 650;
        imageObject1.height = 150;
        imageObject1.defaultPosition = [0, 670];
        var imageObject2 = new _Engine_ImageObject_ImageObject__WEBPACK_IMPORTED_MODULE_0__.ImageObject(image);
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
    constructor(x, y, game, speed) {
        var PipeUp = new _Engine_ImageObject_ImageObject__WEBPACK_IMPORTED_MODULE_0__.ImageObject(game.loader.getImage("pipe"));
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
        var PipeDown = new _Engine_ImageObject_ImageObject__WEBPACK_IMPORTED_MODULE_0__.ImageObject(game.loader.getImage("pipe"));
        // set attributes
        PipeDown.x = x;
        PipeDown.y = y + pipeHeight + blanks;
        PipeDown.width = pipeWidth;
        PipeDown.height = pipeHeight;
        PipeDown.name = "pipe";
        PipeDown.z_index = 1;
        // set defaultPosition
        PipeDown.defaultPosition = [x, y + pipeHeight + blanks];
        var checkScore = new _Engine_ImageObject_ImageObject__WEBPACK_IMPORTED_MODULE_0__.ImageObject(game.loader.getImage("pipe"));
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
        this.textDescription = new _Engine_TextObject_TextObject__WEBPACK_IMPORTED_MODULE_3__.TextObject();
        // set attributes
        this.textDescription.x = 140;
        this.textDescription.y = 450;
        this.textDescription.content = "Press Enter to continue";
        this.textDescription.font = "30px Arial";
        this.textDescription.color = "white";
        this.textDescription.z_index = 2;
        this.textDescription.setActive(false);
        this.textDescription.defaultPosition = [140, 450];
        this.textScore = new _Engine_TextObject_TextObject__WEBPACK_IMPORTED_MODULE_3__.TextObject();
        this.textScore.x = 10;
        this.textScore.y = 30;
        this.textScore.content = "Score: " + this.score.getCurrentScore();
        this.textScore.font = "18px Arial";
        this.textScore.color = "white";
        this.textScore.z_index = 2;
        this.textScore.defaultPosition = [10, 30];
        var bg = new _Engine_ImageObject_ImageObject__WEBPACK_IMPORTED_MODULE_4__.ImageObject(game.loader.getImage("background"));
        // set attributes
        bg.width = 700;
        bg.height = 800;
        bg.name = "background";
        this.ground = new _Ground__WEBPACK_IMPORTED_MODULE_6__.Ground(4, game);
        this.pipes = new _PairOfPipe__WEBPACK_IMPORTED_MODULE_2__.ListPairOfPipes(game);
        // init panelGameOver
        var imgGameOver = new _Engine_ImageObject_ImageObject__WEBPACK_IMPORTED_MODULE_4__.ImageObject(game.loader.getImage("gameover"));
        imgGameOver.x = 60;
        imgGameOver.y = 300;
        imgGameOver.width = 500;
        imgGameOver.height = 130;
        imgGameOver.z_index = 3;
        imgGameOver.defaultPosition = [60, 300];
        var textCurrentScore = new _Engine_TextObject_TextObject__WEBPACK_IMPORTED_MODULE_3__.TextObject();
        textCurrentScore.x = 110;
        textCurrentScore.y = 470;
        textCurrentScore.content = "Score: 0";
        textCurrentScore.font = "30px Arial";
        textCurrentScore.color = "white";
        textCurrentScore.z_index = 3;
        textCurrentScore.defaultPosition = [110, 470];
        var textHighScore = new _Engine_TextObject_TextObject__WEBPACK_IMPORTED_MODULE_3__.TextObject();
        textHighScore.x = 330;
        textHighScore.y = 470;
        textHighScore.content = "High Score: 0";
        textHighScore.font = "30px Arial";
        textHighScore.color = "white";
        textHighScore.z_index = 3;
        textHighScore.defaultPosition = [330, 470];
        var buttonReplay = new _Engine_ButtonObject_ButtonObject__WEBPACK_IMPORTED_MODULE_8__.ButtonObject(game.loader.getImage("replayButton"));
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
        this.background = new _Engine_ImageObject_ImageObject__WEBPACK_IMPORTED_MODULE_1__.ImageObject(game.loader.getImage("background"));
        // set attributes
        this.background.width = 700;
        this.background.height = 800;
        this.background.name = "background";
        this.imgStart = new _Engine_ImageObject_ImageObject__WEBPACK_IMPORTED_MODULE_1__.ImageObject(game.loader.getImage("message"));
        // set attributes
        this.imgStart.width = 500,
            this.imgStart.height = 700;
        this.imgStart.x = 50;
        this.imgStart.y = 20;
        this.imgStart.z_index = 2;
        this.buttonStart = new _Engine_ButtonObject_ButtonObject__WEBPACK_IMPORTED_MODULE_2__.ButtonObject(null);
        // set attributes
        this.buttonStart.width = 700;
        this.buttonStart.height = 800;
        this.buttonStart.name = "buttonStart";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUF3RDtBQUNqRCxNQUFNLFlBQWEsU0FBUSxpRUFBVztJQUN6QyxZQUFZLEtBQThCO1FBQ3RDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQixDQUFDO0lBQ0QsUUFBUSxDQUFDLEdBQWtCO1FBQ3ZCLElBQUcsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFDaEMsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDM0csQ0FBQztDQUNKOzs7Ozs7Ozs7Ozs7Ozs7QUNSTSxNQUFNLFNBQVM7SUFDbEIsZUFBZSxDQUFDLElBQWlCLEVBQUUsSUFBaUI7UUFDaEQsSUFBRyxJQUFJLENBQUMsQ0FBQyxHQUFFLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxJQUFFLElBQUksQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsR0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFDO1lBQ2pFLElBQUcsSUFBSSxDQUFDLENBQUMsR0FBRSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBRSxJQUFJLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLElBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFDO2dCQUNoRSxPQUFPLElBQUksQ0FBQzthQUNmO1NBQ0o7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0NBQ0o7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUnlEO0FBQ0Y7QUFDakQsTUFBTSxJQUFJO0lBS2IsWUFBWSxZQUEwQjtRQUNsQyxJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztRQUNqQyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztRQUNsQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksa0VBQVcsRUFBRSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxpRUFBVyxFQUFFLENBQUM7SUFDcEMsQ0FBQztJQUVELEtBQUssQ0FBQyxNQUFnQjtRQUNsQixJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3hELHFCQUFxQixDQUFDLEdBQUUsRUFBRSxLQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVELElBQUksQ0FBQyxNQUFnQjtRQUNqQixNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3RDLE1BQU0sS0FBSyxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ25DLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksRUFBQyxLQUFLLENBQUMsQ0FBQztRQUM1RSxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN4RSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixxQkFBcUIsQ0FBQyxHQUFFLEVBQUUsS0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ2pELENBQUM7Q0FDSjs7Ozs7Ozs7Ozs7Ozs7O0FDN0JNLE1BQU0sVUFBVTtJQVNuQjtRQUNJLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1gsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDWCxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7UUFDakIsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBQ0QsS0FBSztRQUNELElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUNELFNBQVMsQ0FBQyxNQUFlO1FBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ3pCLENBQUM7SUFDRCxTQUFTO1FBQ0wsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7Q0FFSjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDOUJNLE1BQU0sV0FBVztJQUVwQjtRQUNJLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxHQUFHLEVBQTRCLENBQUM7SUFDdEQsQ0FBQztJQUNLLFFBQVEsQ0FBQyxHQUFXLEVBQUUsSUFBWTs7WUFDcEMsSUFBSSxHQUFHLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztZQUN0QixHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztZQUNkLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztZQUMzQixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO2dCQUNuQyxHQUFHLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQztnQkFDckIsR0FBRyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7WUFDekIsQ0FBQyxDQUFDO1FBQ04sQ0FBQztLQUFBO0lBQ0QsUUFBUSxDQUFDLElBQVk7UUFDakIsSUFBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7WUFDcEIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqQyxPQUFPLElBQUksS0FBSyxFQUFFLENBQUM7SUFDdkIsQ0FBQztDQUNKOzs7Ozs7Ozs7Ozs7Ozs7O0FDbkJrRDtBQUM1QyxNQUFNLFdBQVksU0FBUSw4REFBVTtJQUd2QyxZQUFZLEtBQTZCO1FBQ3JDLEtBQUssRUFBRSxDQUFDO1FBQ1IsSUFBRyxLQUFLLElBQUUsSUFBSTtZQUNWLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQzs7WUFDeEIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUNELE1BQU0sQ0FBQyxJQUFZLEVBQUUsU0FBZ0IsSUFBRSxDQUFDO0NBQzNDOzs7Ozs7Ozs7Ozs7Ozs7QUNWTSxNQUFNLFdBQVc7SUFDcEIsV0FBVyxDQUFDLFlBQTBCLEVBQUUsTUFBZ0I7UUFDcEQsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBQyxDQUFDLENBQUMsRUFBQyxFQUFFLGFBQVksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuSCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUUsYUFBWSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDOUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBQyxDQUFDLENBQUMsRUFBQyxFQUFFLGFBQVksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ3JJLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUMsQ0FBQyxDQUFDLEVBQUMsRUFBRSxhQUFZLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztJQUN0SCxDQUFDO0NBQ0o7Ozs7Ozs7Ozs7Ozs7OztBQ1RNLE1BQU0sWUFBWTtJQUdyQjtRQUNJLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO0lBQzNCLENBQUM7SUFDRCxTQUFTLENBQUMsQ0FBZ0I7UUFDdEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFDRCxPQUFPO1FBQ0gsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUNELFdBQVcsQ0FBQyxDQUFhLEVBQUUsTUFBeUI7UUFDaEQsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDMUMsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ25DLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUNsQyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ25DLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFDRCxTQUFTO1FBQ0wsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7SUFDM0IsQ0FBQztDQUNKOzs7Ozs7Ozs7Ozs7Ozs7QUNwQk0sTUFBTSxRQUFRO0lBRWpCLFlBQVksTUFBeUI7UUFDakMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDekIsQ0FBQztJQUNELFNBQVMsQ0FBQyxXQUF3QjtRQUM5QixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QyxJQUFHLEdBQUcsSUFBRSxJQUFJLEVBQUM7WUFDVCxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDWCxHQUFHLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDLEtBQUssR0FBQyxDQUFDLEVBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQztZQUN2RixHQUFHLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEdBQUMsSUFBSSxDQUFDLEVBQUUsR0FBQyxHQUFHLENBQUMsQ0FBQztZQUM1QyxHQUFHLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSyxHQUFDLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxFQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2xILEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUNqQjtJQUNMLENBQUM7SUFDRCxVQUFVLENBQUMsTUFBYztRQUNyQixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QyxJQUFHLEdBQUcsSUFBRSxJQUFJLEVBQUM7WUFDVCxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDWCxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLEtBQUssR0FBQyxDQUFDLEVBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQztZQUNuRSxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUMsSUFBSSxDQUFDLEVBQUUsR0FBQyxHQUFHLENBQUMsQ0FBQztZQUN2QyxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFDLENBQUMsRUFBQyxNQUFNLENBQUMsS0FBSyxFQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMvRyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDakI7SUFDTCxDQUFDO0lBQ0QsUUFBUSxDQUFDLElBQWdCO1FBQ3JCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pDLElBQUcsR0FBRyxJQUFFLElBQUksRUFBQztZQUNULEdBQUcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNyQixHQUFHLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDM0IsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzVDO0lBQ0wsQ0FBQztDQUNKOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JDd0Q7QUFDZjtBQUNZO0FBR007QUFFVDtBQUM1QyxNQUFNLEtBQUs7SUFLZCxZQUFZLElBQVU7UUFDbEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLG9FQUFZLEVBQUUsQ0FBQztRQUN2QyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksMkRBQVMsRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFDRCxVQUFVO1FBQ04sS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzdDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDL0I7SUFDTCxDQUFDO0lBQ0QsUUFBUSxDQUFDLFdBQXlCO1FBQzlCLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxVQUFVLEVBQUMsRUFBRSxHQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFDLENBQUM7SUFDdEUsQ0FBQztJQUVELE1BQU0sQ0FBQyxNQUFnQjtRQUNuQixxQ0FBcUM7UUFDckMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUU7WUFDekIsT0FBTyxDQUFDLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUM7UUFDakMsQ0FBQyxDQUFDO1FBQ0YsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzdDLElBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBQztnQkFDL0IsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDaEMsSUFBSSxHQUFHLFlBQVksaUVBQVc7b0JBQzFCLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7cUJBQ3JCLElBQUcsR0FBRyxZQUFZLGtEQUFNO29CQUN6QixNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3FCQUN0QixJQUFHLEdBQUcsWUFBWSw4REFBVTtvQkFDN0IsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUM1QjtTQUNKO0lBQ0wsQ0FBQztJQUNELGNBQWM7SUFDZCxNQUFNLENBQUMsSUFBWSxFQUFFLEtBQWE7UUFDOUIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzdDLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUIsSUFBSSxHQUFHLFlBQVksaUVBQVcsSUFBSSxHQUFHLFlBQVksa0RBQU07Z0JBQ25ELEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQy9CO0lBQ0wsQ0FBQztDQUNKOzs7Ozs7Ozs7Ozs7Ozs7QUNuRE0sTUFBTSxZQUFZO0lBR3JCO1FBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUNELFFBQVEsQ0FBQyxLQUFZO1FBQ2pCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUMzQixDQUFDO0lBQ0QsV0FBVyxDQUFDLFNBQWlCO1FBQ3pCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQzVDLElBQUksQ0FBQyxZQUFZLEdBQUcsU0FBUyxDQUFDO0lBQ2xDLENBQUM7SUFDRCxNQUFNLEtBQUcsQ0FBQztJQUNWLE1BQU0sS0FBRyxDQUFDO0NBQ2I7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsQmtEO0FBQzVDLE1BQU0sTUFBTyxTQUFRLDhEQUFVO0lBTWxDLFlBQVksTUFBK0I7UUFDdkMsS0FBSyxFQUFFLENBQUM7UUFDUixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBQyxNQUFNLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztRQUNqQixJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztRQUNkLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBQ2pCLENBQUM7SUFDRCxNQUFNLENBQUMsSUFBWSxFQUFFLFNBQWdCO0lBRXJDLENBQUM7SUFFRCxhQUFhLENBQUMsSUFBWSxFQUFFLFNBQWdCO1FBQ3hDLElBQUksQ0FBQyxHQUFHLElBQUksU0FBUztRQUNyQixJQUFHLElBQUksQ0FBQyxHQUFHLElBQUUsSUFBSSxDQUFDLElBQUksRUFBQztZQUNuQixJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDdEIsSUFBSSxDQUFDLFlBQVksSUFBRyxDQUFDLENBQUM7WUFDdEIsSUFBRyxJQUFJLENBQUMsWUFBWSxHQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFDLENBQUMsRUFBQztnQkFDdEMsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7YUFDekI7U0FDSjtJQUNMLENBQUM7Q0FDSjs7Ozs7Ozs7Ozs7Ozs7OztBQzlCa0Q7QUFDNUMsTUFBTSxVQUFXLFNBQVEsOERBQVU7SUFJdEM7UUFDSSxLQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUNELFVBQVUsQ0FBQyxPQUFlO1FBQ3RCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQzNCLENBQUM7Q0FDSjs7Ozs7Ozs7Ozs7Ozs7OztBQ2RnRDtBQUcxQyxNQUFNLElBQUssU0FBUSx5REFBTTtJQUc1QixZQUFZLEtBQVk7UUFDcEIsSUFBSSxNQUFNLEdBQTJCLEVBQUUsQ0FBQztRQUN4Qyw0Q0FBNEM7UUFDNUMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFFLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQztZQUNyQixJQUFJLElBQUksR0FBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBcUIsQ0FBQyxDQUFDO1NBQ3JFO1FBQ0QsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2QsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7UUFDbkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7UUFDakIsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDZixJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsR0FBQyxFQUFFLEdBQUMsSUFBSSxDQUFDO0lBQzVCLENBQUM7SUFDRCxNQUFNLENBQUMsSUFBWSxFQUFFLFNBQWdCO1FBQ2pDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUMsQ0FBQyxTQUFTLEdBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUQsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsT0FBTyxHQUFDLENBQUMsU0FBUyxHQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdDLElBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQ1QsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDZixJQUFHLElBQUksQ0FBQyxLQUFLLEdBQUMsQ0FBQyxFQUFDO1lBQ1osSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUM7WUFDbEIsSUFBRyxJQUFJLENBQUMsT0FBTyxHQUFDLEVBQUU7Z0JBQUUsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7U0FDekM7YUFDRztZQUNBLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDO1lBQ2xCLElBQUcsSUFBSSxDQUFDLE9BQU8sR0FBQyxDQUFDLEVBQUU7Z0JBQUUsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUN4QyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztTQUN2QztJQUNMLENBQUM7SUFFRCxHQUFHO1FBQ0MsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNwQixDQUFDO0lBQ0QsS0FBSztRQUNELEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNkLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO0lBQ25CLENBQUM7Q0FDSjs7Ozs7Ozs7Ozs7Ozs7OztBQzFDK0Q7QUFFaEUsTUFBTSxNQUFNO0lBR1IsWUFBWSxLQUFhLEVBQUUsSUFBVTtRQUNqQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzQyxJQUFJLFlBQVksR0FBRyxJQUFJLHdFQUFXLENBQUMsS0FBeUIsQ0FBQyxDQUFDO1FBQzlELFlBQVksQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDO1FBQzdCLFlBQVksQ0FBQyxPQUFPLEdBQUUsQ0FBQyxDQUFDO1FBQ3hCLFlBQVksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3JCLFlBQVksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO1FBQ3pCLFlBQVksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1FBQzFCLFlBQVksQ0FBQyxlQUFlLEdBQUUsQ0FBQyxDQUFDLEVBQUMsR0FBRyxDQUFDLENBQUM7UUFFdEMsSUFBSSxZQUFZLEdBQUcsSUFBSSx3RUFBVyxDQUFDLEtBQXlCLENBQUMsQ0FBQztRQUM5RCxZQUFZLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQztRQUM3QixZQUFZLENBQUMsT0FBTyxHQUFFLENBQUMsQ0FBQztRQUN4QixZQUFZLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNyQixZQUFZLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNyQixZQUFZLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztRQUN6QixZQUFZLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztRQUMxQixZQUFZLENBQUMsZUFBZSxHQUFFLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRXhDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxZQUFZLEVBQUMsWUFBWSxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDdkIsQ0FBQztJQUNELE1BQU0sQ0FBQyxJQUFZLEVBQUUsU0FBaUI7UUFDbEMsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFDLENBQUMsRUFBRSxFQUFDO1lBQ2pDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLEdBQUMsQ0FBQyxTQUFTLEdBQUMsS0FBSyxDQUFDLENBQUM7WUFDakQsSUFBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFFLENBQUMsR0FBRyxDQUFDLEVBQUM7Z0JBQzFCLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsR0FBRyxDQUFDO2FBQ3ZEO1NBQ0o7SUFDTCxDQUFDO0lBQ0QsWUFBWTtRQUNSLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBQ0QsS0FBSztRQUNELEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUUsRUFBQztZQUNqQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQzFCO0lBQ0wsQ0FBQztDQUNKO0FBRWU7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0NnRDtBQUVoRSxNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUM7QUFDbkIsTUFBTSxVQUFVLEdBQUcsR0FBRyxDQUFDO0FBQ3ZCLE1BQU0sT0FBTyxHQUFHLENBQUMsQ0FBQztBQUNsQixNQUFNLFFBQVEsR0FBRyxHQUFHLENBQUM7QUFDckIsTUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDO0FBQ3JCLE1BQU0sVUFBVTtJQUdaLFlBQVksQ0FBUSxFQUFFLENBQVEsRUFBRSxJQUFVLEVBQUMsS0FBYTtRQUNwRCxJQUFJLE1BQU0sR0FBRyxJQUFJLHdFQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFxQixDQUFDLENBQUM7UUFDL0UsaUJBQWlCO1FBQ2pCLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2IsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDYixNQUFNLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztRQUN6QixNQUFNLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQztRQUMzQixNQUFNLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztRQUNyQixNQUFNLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztRQUNyQixNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztRQUNuQixzQkFBc0I7UUFDdEIsTUFBTSxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUUvQixJQUFJLFFBQVEsR0FBRyxJQUFJLHdFQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFxQixDQUFDLENBQUM7UUFDakYsaUJBQWlCO1FBQ2pCLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUMsVUFBVSxHQUFDLE1BQU0sQ0FBQztRQUNqQyxRQUFRLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztRQUMzQixRQUFRLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQztRQUM3QixRQUFRLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztRQUN2QixRQUFRLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztRQUNyQixzQkFBc0I7UUFDdEIsUUFBUSxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsVUFBVSxHQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRW5ELElBQUksVUFBVSxHQUFHLElBQUksd0VBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQXFCLENBQUMsQ0FBQztRQUNuRixpQkFBaUI7UUFDakIsVUFBVSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUMsU0FBUyxDQUFDO1FBQzNCLFVBQVUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFDLFVBQVUsQ0FBQztRQUM1QixVQUFVLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUN0QixVQUFVLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUMzQixVQUFVLENBQUMsSUFBSSxHQUFHLFlBQVksQ0FBQztRQUMvQixVQUFVLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztRQUN2QixVQUFVLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQyxHQUFDLFNBQVMsRUFBQyxDQUFDLEdBQUMsVUFBVSxDQUFDLENBQUM7UUFFeEQsSUFBSSxDQUFDLEtBQUssR0FBRSxDQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsVUFBVSxDQUFDLENBQUM7UUFFekMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDdkIsQ0FBQztJQUNELE1BQU0sQ0FBQyxJQUFXLEVBQUUsU0FBZ0I7UUFDaEMsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFFLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQztZQUNwQixJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxHQUFDLENBQUMsU0FBUyxHQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ25EO0lBQ0wsQ0FBQztJQUNELEtBQUs7UUFDRCxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUUsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDO1lBQ3BCLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDekI7SUFDTCxDQUFDO0lBQ0QsWUFBWTtRQUNSLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUN0QixDQUFDO0NBQ0o7QUFFRCxNQUFNLGVBQWU7SUFFakIsWUFBWSxJQUFVO1FBQ2xCLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ25CLEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxPQUFPLEVBQUMsQ0FBQyxFQUFFLEVBQUM7WUFDdEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFDLFFBQVEsR0FBRyxTQUFTLEdBQUcsR0FBRyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDeEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxVQUFVLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDNUI7SUFDTCxDQUFDO0lBQ0QsTUFBTTtRQUNGLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFDLEtBQUssRUFBRSxFQUFFO1lBQzdCLElBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFHLEVBQUM7Z0JBQ3BCLElBQUksVUFBVSxHQUFHLEtBQUssR0FBRSxDQUFDLENBQUM7Z0JBQzFCLElBQUcsVUFBVSxHQUFDLENBQUM7b0JBQUUsVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQztnQkFDckQsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFDLENBQUMsRUFBRSxFQUFDO29CQUNwQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDO2lCQUNyRTthQUNKO1FBQ0wsQ0FBQyxDQUFDO0lBQ04sQ0FBQztDQUNKO0FBRW9DOzs7Ozs7Ozs7Ozs7Ozs7QUNuRjlCLE1BQU0sYUFBYTtJQUt0QixZQUFZLFdBQXdCLEVBQUUsWUFBd0IsRUFBRSxTQUFxQixFQUFFLFlBQTBCO1FBQzdHLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQy9CLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO0lBQ3JDLENBQUM7SUFDRCxTQUFTLENBQUMsTUFBZTtRQUNyQixJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBQ0QsWUFBWTtRQUNSLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDcEYsQ0FBQztJQUNELE1BQU0sQ0FBQyxZQUFvQixFQUFFLFNBQWlCO1FBQzFDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxjQUFjLEdBQUcsU0FBUyxDQUFDO0lBQ3pELENBQUM7Q0FDSjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUIyQztBQUNoQjtBQUNpQjtBQUNlO0FBQ0c7QUFDakM7QUFDRztBQUNZO0FBRW9CO0FBR2pFLE1BQU0sS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7QUFDM0MsTUFBTSxHQUFHLEdBQUcsSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDdkMsTUFBTSxHQUFHLEdBQUcsSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDdkMsTUFBTSxXQUFXLEdBQUcsSUFBSSxLQUFLLENBQUMsOEJBQThCLENBQUMsQ0FBQztBQUM5RCxNQUFNLEtBQUssR0FBRyxJQUFJLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBQzVDLE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQztBQUN0QixNQUFNLFdBQVcsR0FBRyxFQUFFLENBQUM7QUFDdkIsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDO0FBQ25CLE1BQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQztBQUVaLE1BQU0sU0FBVSxTQUFRLHNEQUFLO0lBYWhDLFlBQVksSUFBVTtRQUNsQixLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDWixhQUFhO1FBQ2Isc0JBQXNCO1FBQ3RCLDBCQUEwQjtRQUMxQixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN2QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUkseUNBQUssRUFBRSxDQUFDO1FBRXpCLElBQUksQ0FBQyxJQUFJLEdBQUksSUFBSSx1Q0FBSSxDQUFDLElBQUksQ0FBQztRQUMzQixpQkFBaUI7UUFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUM7UUFDN0IsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsV0FBVyxDQUFDO1FBQy9CLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztRQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV2RCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUkscUVBQVUsRUFBRSxDQUFDO1FBQ3hDLGlCQUFpQjtRQUNqQixJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDN0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQzdCLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxHQUFHLHlCQUF5QixDQUFDO1FBQ3pELElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxHQUFHLFlBQVksQ0FBQztRQUN6QyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUM7UUFDckMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxHQUFHLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRWpELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxxRUFBVSxFQUFFLENBQUM7UUFDbEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBRyxTQUFTLEdBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUNqRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxZQUFZLENBQUM7UUFDbkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDO1FBQy9CLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsR0FBRyxDQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsQ0FBQztRQUV6QyxJQUFJLEVBQUUsR0FBRyxJQUFJLHdFQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFxQixDQUFDLENBQUM7UUFDakYsaUJBQWlCO1FBQ2pCLEVBQUUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO1FBQ2YsRUFBRSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7UUFDaEIsRUFBRSxDQUFDLElBQUksR0FBRyxZQUFZLENBQUM7UUFFdkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLDJDQUFNLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSx3REFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXZDLHFCQUFxQjtRQUNyQixJQUFJLFdBQVcsR0FBRyxJQUFJLHdFQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFxQixDQUFDLENBQUM7UUFDeEYsV0FBVyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDbkIsV0FBVyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDcEIsV0FBVyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7UUFDeEIsV0FBVyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7UUFDekIsV0FBVyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7UUFDeEIsV0FBVyxDQUFDLGVBQWUsR0FBRyxDQUFDLEVBQUUsRUFBQyxHQUFHLENBQUMsQ0FBQztRQUV2QyxJQUFJLGdCQUFnQixHQUFHLElBQUkscUVBQVUsRUFBRSxDQUFDO1FBQ3hDLGdCQUFnQixDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDekIsZ0JBQWdCLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUN6QixnQkFBZ0IsQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDO1FBQ3RDLGdCQUFnQixDQUFDLElBQUksR0FBRyxZQUFZLENBQUM7UUFDckMsZ0JBQWdCLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQztRQUNqQyxnQkFBZ0IsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQzdCLGdCQUFnQixDQUFDLGVBQWUsR0FBRyxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsQ0FBQztRQUU3QyxJQUFJLGFBQWEsR0FBRyxJQUFJLHFFQUFVLEVBQUUsQ0FBQztRQUNyQyxhQUFhLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUN0QixhQUFhLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUN0QixhQUFhLENBQUMsT0FBTyxHQUFHLGVBQWUsQ0FBQztRQUN4QyxhQUFhLENBQUMsSUFBSSxHQUFHLFlBQVksQ0FBQztRQUNsQyxhQUFhLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQztRQUM5QixhQUFhLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztRQUMxQixhQUFhLENBQUMsZUFBZSxHQUFHLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQztRQUV6QyxJQUFJLFlBQVksR0FBRyxJQUFJLDJFQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFxQixDQUFDLENBQUM7UUFDOUYsWUFBWSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDckIsWUFBWSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDckIsWUFBWSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7UUFDekIsWUFBWSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDekIsWUFBWSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7UUFDekIsWUFBWSxDQUFDLGVBQWUsR0FBRyxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsQ0FBQztRQUV6QyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUkseURBQWEsQ0FDbEMsV0FBVyxFQUFDLGdCQUFnQixFQUFDLGFBQWEsRUFBQyxZQUFZLENBQzFELENBQUM7UUFFRixxQkFBcUI7UUFDckIsSUFBSSxjQUFjLEdBQXNCLENBQUMsRUFBRSxFQUFDLElBQUksQ0FBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDNUYsY0FBYyxHQUFJLGNBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO1FBQ3BFLGNBQWMsR0FBRyxjQUFjLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztRQUUxRSxLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFDLENBQUMsRUFBRSxFQUFDO1lBQ3pDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLGNBQWMsR0FBRyxjQUFjLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUM5RDtRQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUMsY0FBYyxDQUFDO1FBQzVDLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDOUIsc0JBQXNCO1FBQ3RCLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRCxNQUFNLENBQUMsSUFBWSxFQUFFLFNBQWlCO1FBQ2xDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFDO1lBQzVDLElBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEtBQUssTUFBTSxFQUFDO2dCQUNyQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztnQkFDbEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDeEM7WUFDRCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBQyxFQUFFO2dCQUN2QyxPQUFPLEdBQUcsQ0FBQyxJQUFJLEtBQUssTUFBTSxDQUFDO1lBQzNCLENBQUMsQ0FBQyxDQUFDO1lBQ1AsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUMsRUFBRTtnQkFDNUMsT0FBTyxHQUFHLENBQUMsSUFBSSxLQUFLLFlBQVksQ0FBQztZQUNyQyxDQUFDLENBQUM7WUFDRixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDcEMsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2xDLElBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBQztvQkFDbEQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7b0JBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7b0JBQzFCLE1BQU07aUJBQ1Q7YUFDSjtZQUNELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUN4QyxJQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUcsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLEVBQUM7b0JBQzVFLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxFQUFFLEdBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzNELElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxHQUFHLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO29CQUNsRSxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztvQkFDbEIsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO29CQUNiLE1BQU07aUJBQ1Q7YUFDSjtZQUNELElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUM3QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztZQUNqQyxDQUFDLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7WUFFcEIsSUFBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsS0FBRyxPQUFPLEVBQUU7Z0JBQ3JDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7Z0JBQ2hCLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDYixLQUFLLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQzthQUMxQjtZQUNELGlCQUFpQjtZQUNqQixJQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFFLElBQUksQ0FBQyxTQUFTLEVBQUM7Z0JBQ2xLLElBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQUUsR0FBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRTtvQkFDdEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDO2dCQUMxRCxlQUFlO2dCQUNmLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxFQUFFLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO2dCQUNuRix3QkFBd0I7Z0JBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO2dCQUNyQixhQUFhO2dCQUNiLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDcEIsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNYLFVBQVUsQ0FBQyxHQUFHLEVBQUU7b0JBQ1oscUJBQXFCO29CQUNyQixJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDbkMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNmLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQzthQUNYO1lBQ0QsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7U0FFakM7YUFDSSxJQUFHLElBQUksQ0FBQyxRQUFRLEVBQUM7WUFDbEIsSUFBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUM7Z0JBQ3BKLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztnQkFDdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO2FBQ3JDO1lBQ0QsSUFBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxLQUFLLE9BQU8sSUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsSUFBRSxJQUFJLElBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBQztnQkFDckosSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7Z0JBQ3RCLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNwQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDekM7U0FDSjthQUNJLElBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFDO1lBQ2hCLElBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEtBQUssT0FBTyxFQUFDO2dCQUN0QyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQzthQUNyQjtTQUNKO2FBQ0ksSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFDO1lBQ2hCLElBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEtBQUssT0FBTyxFQUFDO2dCQUN0QyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztnQkFDbkIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDekM7U0FDSjtJQUNMLENBQUM7SUFDRCxVQUFVO1FBQ04sc0JBQXNCO1FBQ3RCLDBCQUEwQjtRQUMxQixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN2QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixLQUFLLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3BCLEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUMsQ0FBQyxFQUFFLEVBQUM7WUFDekMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDbEM7UUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDbkMsQ0FBQztDQUNKOzs7Ozs7Ozs7Ozs7Ozs7QUMvT0QsTUFBTSxLQUFLO0lBR1A7UUFDSSxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztRQUNuQixJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBQ0QsZUFBZSxDQUFDLEtBQWE7UUFDekIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7SUFDOUIsQ0FBQztJQUNELGVBQWU7UUFDWCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDN0IsQ0FBQztJQUNELFlBQVk7UUFDUixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUNELFlBQVksQ0FBQyxTQUFpQjtRQUMxQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUMvQixDQUFDO0NBQ0o7QUFDYzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BCNkI7QUFDb0I7QUFDRztBQUNwQztBQUd4QixNQUFNLFVBQVcsU0FBUSxzREFBSztJQUtqQyxZQUFZLElBQVU7UUFDbEIsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ1osSUFBSSxDQUFDLFVBQVUsR0FBRSxJQUFJLHdFQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFxQixDQUFDLENBQUM7UUFDekYsaUJBQWlCO1FBQ2pCLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztRQUM1QixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7UUFDN0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEdBQUcsWUFBWTtRQUVuQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksd0VBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQXFCLENBQUMsQ0FBQztRQUNyRixpQkFBaUI7UUFDakIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUUsR0FBRztZQUN4QixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7UUFDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7UUFFMUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLDJFQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUMsaUJBQWlCO1FBQ2pCLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztRQUM3QixJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7UUFDOUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEdBQUcsYUFBYSxDQUFDO1FBRXRDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSwyQ0FBTSxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUM7UUFDaEMsSUFBSSxZQUFZLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztRQUN4RSxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFDRCxNQUFNLENBQUMsSUFBWSxFQUFFLFNBQWlCO1FBQ2xDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNwQyxJQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxLQUFLLE9BQU8sSUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsS0FBSyxPQUFPLElBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsSUFBRSxJQUFJLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFO1lBQ2pMLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDckMsT0FBTyxDQUFDLENBQUM7U0FDWjtRQUVELE9BQU8sQ0FBQyxDQUFDO0lBQ2IsQ0FBQztDQUNKOzs7Ozs7O1VDL0NEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7O0FDTitDO0FBQ087QUFDSztBQUNqQjtBQUNDO0FBRTNDLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFzQixDQUFDO0FBQ3RFLElBQUksTUFBTSxHQUFHLElBQUksK0RBQVEsQ0FBQyxNQUFNLENBQUM7QUFDakMsSUFBSSxTQUFTLEdBQUcsSUFBSSxvRUFBWSxFQUFFLENBQUM7QUFDbkMsSUFBSSxNQUFNLEdBQUcsSUFBSSxtREFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBRWpDLE1BQU0sVUFBVSxHQUFHO0lBQ2Y7UUFDSSxLQUFLLEVBQUUsT0FBTztRQUNkLE1BQU0sRUFBRSx5QkFBeUI7S0FDcEM7SUFDRDtRQUNJLEtBQUssRUFBRSxPQUFPO1FBQ2QsTUFBTSxFQUFFLHlCQUF5QjtLQUNwQztJQUNEO1FBQ0ksS0FBSyxFQUFFLE9BQU87UUFDZCxNQUFNLEVBQUUseUJBQXlCO0tBQ3BDO0lBQ0Q7UUFDSSxLQUFLLEVBQUUsT0FBTztRQUNkLE1BQU0sRUFBRSx5QkFBeUI7S0FDcEM7SUFDRDtRQUNJLEtBQUssRUFBRSxPQUFPO1FBQ2QsTUFBTSxFQUFFLHlCQUF5QjtLQUNwQztJQUNEO1FBQ0ksS0FBSyxFQUFFLE9BQU87UUFDZCxNQUFNLEVBQUUseUJBQXlCO0tBQ3BDO0lBQ0Q7UUFDSSxLQUFLLEVBQUUsT0FBTztRQUNkLE1BQU0sRUFBRSx5QkFBeUI7S0FDcEM7SUFDRDtRQUNJLEtBQUssRUFBRSxPQUFPO1FBQ2QsTUFBTSxFQUFFLHlCQUF5QjtLQUNwQztJQUNEO1FBQ0ksS0FBSyxFQUFFLE1BQU07UUFDYixNQUFNLEVBQUUsNEJBQTRCO0tBQ3ZDO0lBQ0Q7UUFDSSxLQUFLLEVBQUUsU0FBUztRQUNoQixNQUFNLEVBQUUsOEJBQThCO0tBQ3pDO0lBQ0Q7UUFDSSxLQUFLLEVBQUUsUUFBUTtRQUNmLE1BQU0sRUFBRSx3QkFBd0I7S0FDbkM7SUFDRDtRQUNJLEtBQUssRUFBRSxVQUFVO1FBQ2pCLE1BQU0sRUFBRSxtQ0FBbUM7S0FDOUM7SUFDRDtRQUNJLEtBQUssRUFBRSxjQUFjO1FBQ3JCLE1BQU0sRUFBRSx3Q0FBd0M7S0FDbkQ7SUFDRDtRQUNJLEtBQUssRUFBRSxZQUFZO1FBQ25CLE1BQU0sRUFBRSx3Q0FBd0M7S0FDbkQ7Q0FDSjtBQUVELE1BQU0sUUFBUSxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUMvRixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFFLEVBQUU7SUFDM0IsSUFBSSxVQUFVLEdBQUcsSUFBSSx3REFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3hDLElBQUksU0FBUyxHQUFHLElBQUksc0RBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0QyxTQUFTLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQy9CLFNBQVMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDOUIsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN6QixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxHQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3dlZWsxLy4vc3JjL0VuZ2luZS9CdXR0b25PYmplY3QvQnV0dG9uT2JqZWN0LnRzIiwid2VicGFjazovL3dlZWsxLy4vc3JjL0VuZ2luZS9Db2xsaXNpb24vQ29sbGlzaW9uLnRzIiwid2VicGFjazovL3dlZWsxLy4vc3JjL0VuZ2luZS9Db3JlL0dhbWUudHMiLCJ3ZWJwYWNrOi8vd2VlazEvLi9zcmMvRW5naW5lL0dhbWVPYmplY3QvR2FtZU9iamVjdC50cyIsIndlYnBhY2s6Ly93ZWVrMS8uL3NyYy9FbmdpbmUvSW1hZ2VMb2FkZXIvSW1hZ2VMb2FkZXIudHMiLCJ3ZWJwYWNrOi8vd2VlazEvLi9zcmMvRW5naW5lL0ltYWdlT2JqZWN0L0ltYWdlT2JqZWN0LnRzIiwid2VicGFjazovL3dlZWsxLy4vc3JjL0VuZ2luZS9Qcm9jZXNzSW5wdXQvTGlzdGVuSW5wdXQudHMiLCJ3ZWJwYWNrOi8vd2VlazEvLi9zcmMvRW5naW5lL1Byb2Nlc3NJbnB1dC9Qcm9jZXNzSW5wdXQudHMiLCJ3ZWJwYWNrOi8vd2VlazEvLi9zcmMvRW5naW5lL1JlbmRlcmVyL1JlbmRlcmVyLnRzIiwid2VicGFjazovL3dlZWsxLy4vc3JjL0VuZ2luZS9TY2VuZS9TY2VuZS50cyIsIndlYnBhY2s6Ly93ZWVrMS8uL3NyYy9FbmdpbmUvU2NlbmUvU2NlbmVNYW5hZ2VyLnRzIiwid2VicGFjazovL3dlZWsxLy4vc3JjL0VuZ2luZS9TcHJpdGUvU3ByaXRlLnRzIiwid2VicGFjazovL3dlZWsxLy4vc3JjL0VuZ2luZS9UZXh0T2JqZWN0L1RleHRPYmplY3QudHMiLCJ3ZWJwYWNrOi8vd2VlazEvLi9zcmMvZ2FtZS9CaXJkLnRzIiwid2VicGFjazovL3dlZWsxLy4vc3JjL2dhbWUvR3JvdW5kLnRzIiwid2VicGFjazovL3dlZWsxLy4vc3JjL2dhbWUvUGFpck9mUGlwZS50cyIsIndlYnBhY2s6Ly93ZWVrMS8uL3NyYy9nYW1lL1BhbmVsR2FtZU92ZXIudHMiLCJ3ZWJwYWNrOi8vd2VlazEvLi9zcmMvZ2FtZS9QbGF5U2NlbmUudHMiLCJ3ZWJwYWNrOi8vd2VlazEvLi9zcmMvZ2FtZS9TY29yZS50cyIsIndlYnBhY2s6Ly93ZWVrMS8uL3NyYy9nYW1lL1N0YXJ0U2NlbmUudHMiLCJ3ZWJwYWNrOi8vd2VlazEvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VlazEvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlZWsxL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VlazEvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWVrMS8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbWFnZU9iamVjdH0gZnJvbSBcIi4uL0ltYWdlT2JqZWN0L0ltYWdlT2JqZWN0XCI7XHJcbmV4cG9ydCBjbGFzcyBCdXR0b25PYmplY3QgZXh0ZW5kcyBJbWFnZU9iamVjdHtcclxuICAgIGNvbnN0cnVjdG9yKGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50IHwgbnVsbCl7XHJcbiAgICAgICAgc3VwZXIoaW1hZ2UpO1xyXG4gICAgfVxyXG4gICAgaXNJbnNpZGUocG9zOiBBcnJheTxudW1iZXI+KXtcclxuICAgICAgICBpZihwb3MubGVuZ3RoIDwgMikgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIHJldHVybiBwb3NbMF0gPiB0aGlzLnggJiYgcG9zWzBdIDwgdGhpcy54K3RoaXMud2lkdGggJiYgcG9zWzFdIDwgdGhpcy55K3RoaXMuaGVpZ2h0ICYmIHBvc1sxXSA+IHRoaXMueTtcclxuICAgIH0gICAgXHJcbn0iLCJpbXBvcnQge0dhbWVPYmplY3R9IGZyb20gXCIuLi9HYW1lT2JqZWN0L0dhbWVPYmplY3RcIjtcclxuZXhwb3J0IGNsYXNzIENvbGxpc2lvbntcclxuICAgIGhhbmRsZUNvbGxpc2lvbihvYmoxIDogR2FtZU9iamVjdCwgb2JqMiA6IEdhbWVPYmplY3Qpe1xyXG4gICAgICAgIGlmKG9iajEueCsgb2JqMS53aWR0aCArIDE+PW9iajIueCAmJiBvYmoxLngrMSA8PSBvYmoyLnggKyBvYmoyLndpZHRoKXtcclxuICAgICAgICAgICAgaWYob2JqMS55KyBvYmoxLmhlaWdodCArIDE+PW9iajIueSAmJiBvYmoxLnk8PSBvYmoyLnkgKyBvYmoyLmhlaWdodCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBTY2VuZU1hbmFnZXIgfSBmcm9tIFwiLi4vU2NlbmUvU2NlbmVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFJlbmRlcmVyIH0gZnJvbSBcIi4uL1JlbmRlcmVyL1JlbmRlcmVyXCI7XHJcbmltcG9ydCB7IExpc3RlbklucHV0IH0gZnJvbSBcIi4uL1Byb2Nlc3NJbnB1dC9MaXN0ZW5JbnB1dFwiO1xyXG5pbXBvcnQge0ltYWdlTG9hZGVyIH0gZnJvbSBcIi4uL0ltYWdlTG9hZGVyL0ltYWdlTG9hZGVyXCI7XHJcbmV4cG9ydCBjbGFzcyBHYW1le1xyXG4gICAgc2NlbmVNYW5hZ2VyOiBTY2VuZU1hbmFnZXI7XHJcbiAgICBsYXN0VGltZTogbnVtYmVyO1xyXG4gICAgbGlzdGVuSW5wdXQ6IExpc3RlbklucHV0O1xyXG4gICAgbG9hZGVyOiBJbWFnZUxvYWRlcjtcclxuICAgIGNvbnN0cnVjdG9yKHNjZW5lTWFuYWdlcjogU2NlbmVNYW5hZ2VyKXtcclxuICAgICAgICB0aGlzLnNjZW5lTWFuYWdlciA9IHNjZW5lTWFuYWdlcjtcclxuICAgICAgICB0aGlzLmxhc3RUaW1lID0gMDtcclxuICAgICAgICB0aGlzLmxpc3RlbklucHV0ID0gbmV3IExpc3RlbklucHV0KCk7XHJcbiAgICAgICAgdGhpcy5sb2FkZXIgPSBuZXcgSW1hZ2VMb2FkZXIoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgc3RhcnQocmVuZGVyOiBSZW5kZXJlcil7XHJcbiAgICAgICAgdGhpcy5saXN0ZW5JbnB1dC5oYW5kbGVJbnB1dCh0aGlzLnNjZW5lTWFuYWdlciwgcmVuZGVyKTtcclxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCk9PnRoaXMubG9vcChyZW5kZXIpKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgbG9vcChyZW5kZXI6IFJlbmRlcmVyKXtcclxuICAgICAgICBjb25zdCB0aW1lID0gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpO1xyXG4gICAgICAgIGNvbnN0IGRlbHRhID0gdGltZSAtIHRoaXMubGFzdFRpbWU7XHJcbiAgICAgICAgdGhpcy5zY2VuZU1hbmFnZXIuc2NlbmVzW3RoaXMuc2NlbmVNYW5hZ2VyLmN1cnJlbnRTY2VuZV0udXBkYXRlKHRpbWUsZGVsdGEpO1xyXG4gICAgICAgIHRoaXMuc2NlbmVNYW5hZ2VyLnNjZW5lc1t0aGlzLnNjZW5lTWFuYWdlci5jdXJyZW50U2NlbmVdLnJlbmRlcihyZW5kZXIpO1xyXG4gICAgICAgIHRoaXMubGFzdFRpbWUgPSB0aW1lO1xyXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKT0+dGhpcy5sb29wKHJlbmRlcikpO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGNsYXNzIEdhbWVPYmplY3R7XHJcbiAgICB4OiBudW1iZXI7XHJcbiAgICB5OiBudW1iZXI7XHJcbiAgICB3aWR0aDogbnVtYmVyO1xyXG4gICAgaGVpZ2h0OiBudW1iZXI7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICBhY3RpdmU6IGJvb2xlYW47XHJcbiAgICBkZWZhdWx0UG9zaXRpb246IEFycmF5PG51bWJlcj47XHJcbiAgICB6X2luZGV4OiBudW1iZXI7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnggPSAwO1xyXG4gICAgICAgIHRoaXMueSA9IDA7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9IDA7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSAwO1xyXG4gICAgICAgIHRoaXMubmFtZSA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuel9pbmRleCA9IDA7XHJcbiAgICAgICAgdGhpcy5kZWZhdWx0UG9zaXRpb24gPSBbMCwwXTtcclxuICAgIH1cclxuICAgIHJlc2V0KCl7XHJcbiAgICAgICAgdGhpcy54ID0gdGhpcy5kZWZhdWx0UG9zaXRpb25bMF07XHJcbiAgICAgICAgdGhpcy55ID0gdGhpcy5kZWZhdWx0UG9zaXRpb25bMV07XHJcbiAgICB9XHJcbiAgICBzZXRBY3RpdmUoYWN0aXZlOiBib29sZWFuKXtcclxuICAgICAgICB0aGlzLmFjdGl2ZSA9IGFjdGl2ZTtcclxuICAgIH1cclxuICAgIGdldEFjdGl2ZSgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFjdGl2ZTtcclxuICAgIH1cclxuXHJcbn0iLCJleHBvcnQgY2xhc3MgSW1hZ2VMb2FkZXIge1xyXG4gICAgaW1hZ2VzITogTWFwPHN0cmluZywgSFRNTEltYWdlRWxlbWVudD47XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMuaW1hZ2VzID0gbmV3IE1hcDxzdHJpbmcsIEhUTUxJbWFnZUVsZW1lbnQ+KCk7XHJcbiAgICB9XHJcbiAgICBhc3luYyBhZGRJbWFnZShzcmM6IHN0cmluZywgbmFtZTogc3RyaW5nKXtcclxuICAgICAgICB2YXIgaW1nID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgaW1nLnNyYyA9IHNyYztcclxuICAgICAgICB0aGlzLmltYWdlcy5zZXQobmFtZSwgaW1nKTtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBpbWcub25sb2FkID0gcmVzb2x2ZTtcclxuICAgICAgICAgICAgaW1nLm9uZXJyb3IgPSByZWplY3Q7IFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBnZXRJbWFnZShuYW1lOiBzdHJpbmcpOiBIVE1MSW1hZ2VFbGVtZW50IHwgdW5kZWZpbmVke1xyXG4gICAgICAgIGlmKHRoaXMuaW1hZ2VzLmhhcyhuYW1lKSlcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW1hZ2VzLmdldChuYW1lKTtcclxuICAgICAgICByZXR1cm4gbmV3IEltYWdlKCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge0dhbWVPYmplY3R9IGZyb20gXCIuLi9HYW1lT2JqZWN0L0dhbWVPYmplY3RcIlxyXG5leHBvcnQgY2xhc3MgSW1hZ2VPYmplY3QgZXh0ZW5kcyBHYW1lT2JqZWN0e1xyXG4gICAgaW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQ7XHJcbiAgICBkZWdyZWVzOiBudW1iZXI7XHJcbiAgICBjb25zdHJ1Y3RvcihpbWFnZTogSFRNTEltYWdlRWxlbWVudCB8bnVsbCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICBpZihpbWFnZT09bnVsbClcclxuICAgICAgICAgICAgdGhpcy5pbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgIGVsc2UgdGhpcy5pbWFnZSA9IGltYWdlO1xyXG4gICAgICAgIHRoaXMuZGVncmVlcyA9IDA7XHJcbiAgICB9XHJcbiAgICB1cGRhdGUodGltZTogbnVtYmVyLCBkZWx0YVRpbWU6bnVtYmVyKXt9XHJcbn0iLCJpbXBvcnQge1NjZW5lTWFuYWdlcn0gZnJvbSAnLi4vU2NlbmUvU2NlbmVNYW5hZ2VyJztcclxuaW1wb3J0IHtSZW5kZXJlcn0gZnJvbSAnLi4vUmVuZGVyZXIvUmVuZGVyZXInXHJcbmV4cG9ydCBjbGFzcyBMaXN0ZW5JbnB1dHtcclxuICAgIGhhbmRsZUlucHV0KHNjZW5lTWFuYWdlcjogU2NlbmVNYW5hZ2VyLCByZW5kZXI6IFJlbmRlcmVyKXtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywoZSk9PnNjZW5lTWFuYWdlci5zY2VuZXNbc2NlbmVNYW5hZ2VyLmN1cnJlbnRTY2VuZV0ucHJvY2Vzc0lucHV0Lm9uS2V5RG93bihlKSk7XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLChlKT0+c2NlbmVNYW5hZ2VyLnNjZW5lc1tzY2VuZU1hbmFnZXIuY3VycmVudFNjZW5lXS5wcm9jZXNzSW5wdXQub25LZXlVcCgpKTtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLChlKT0+c2NlbmVNYW5hZ2VyLnNjZW5lc1tzY2VuZU1hbmFnZXIuY3VycmVudFNjZW5lXS5wcm9jZXNzSW5wdXQub25Nb3VzZURvd24oZSxyZW5kZXIuY2FudmFzKSk7XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsKGUpPT5zY2VuZU1hbmFnZXIuc2NlbmVzW3NjZW5lTWFuYWdlci5jdXJyZW50U2NlbmVdLnByb2Nlc3NJbnB1dC5vbk1vdXNlVXAoKSk7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgY2xhc3MgUHJvY2Vzc0lucHV0e1xyXG4gICAgaW5wdXRLZXkgOiBTdHJpbmc7XHJcbiAgICBtb3VzZUV2ZW50IDogQXJyYXk8bnVtYmVyPiB8IG51bGw7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMuaW5wdXRLZXkgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMubW91c2VFdmVudCA9IG51bGw7XHJcbiAgICB9XHJcbiAgICBvbktleURvd24oZTogS2V5Ym9hcmRFdmVudCl7XHJcbiAgICAgICAgdGhpcy5pbnB1dEtleSA9IGUuY29kZTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmlucHV0S2V5KTtcclxuICAgIH1cclxuICAgIG9uS2V5VXAoKXtcclxuICAgICAgICB0aGlzLmlucHV0S2V5ID0gXCJcIjtcclxuICAgIH1cclxuICAgIG9uTW91c2VEb3duKGU6IE1vdXNlRXZlbnQsIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQpIHtcclxuICAgICAgICB2YXIgcmVjdCA9IGNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICB2YXIgbW91c2VYID0gZS5jbGllbnRYIC0gcmVjdC5sZWZ0O1xyXG4gICAgICAgIHZhciBtb3VzZVkgPSBlLmNsaWVudFkgLSByZWN0LnRvcDsgICAgXHJcbiAgICAgICAgdGhpcy5tb3VzZUV2ZW50ID0gW21vdXNlWCwgbW91c2VZXTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm1vdXNlRXZlbnQpO1xyXG4gICAgfVxyXG4gICAgb25Nb3VzZVVwKCkge1xyXG4gICAgICAgIHRoaXMubW91c2VFdmVudCA9IG51bGw7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBJbWFnZU9iamVjdCB9IGZyb20gXCIuLi9JbWFnZU9iamVjdC9JbWFnZU9iamVjdFwiO1xyXG5pbXBvcnQgeyBTcHJpdGUgfSBmcm9tIFwiLi4vU3ByaXRlL1Nwcml0ZVwiO1xyXG5pbXBvcnQgeyBUZXh0T2JqZWN0IH0gZnJvbSBcIi4uL1RleHRPYmplY3QvVGV4dE9iamVjdFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFJlbmRlcmVye1xyXG4gICAgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcclxuICAgIGNvbnN0cnVjdG9yKGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQpe1xyXG4gICAgICAgIHRoaXMuY2FudmFzID0gY2FudmFzO1xyXG4gICAgfVxyXG4gICAgZHJhd0ltYWdlKGltYWdlT2JqZWN0OiBJbWFnZU9iamVjdCl7XHJcbiAgICAgICAgY29uc3QgY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgICAgICBpZihjdHghPW51bGwpe1xyXG4gICAgICAgICAgICBjdHguc2F2ZSgpO1xyXG4gICAgICAgICAgICBjdHgudHJhbnNsYXRlKGltYWdlT2JqZWN0LnggKyBpbWFnZU9iamVjdC53aWR0aC8yLGltYWdlT2JqZWN0LnkgKyBpbWFnZU9iamVjdC5oZWlnaHQvMilcclxuICAgICAgICAgICAgY3R4LnJvdGF0ZShpbWFnZU9iamVjdC5kZWdyZWVzKk1hdGguUEkvMTgwKTtcclxuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShpbWFnZU9iamVjdC5pbWFnZSwtaW1hZ2VPYmplY3Qud2lkdGgvMiwgLWltYWdlT2JqZWN0LmhlaWdodC8yLGltYWdlT2JqZWN0LndpZHRoLGltYWdlT2JqZWN0LmhlaWdodCk7XHJcbiAgICAgICAgICAgIGN0eC5yZXN0b3JlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZHJhd1Nwcml0ZShzcHJpdGU6IFNwcml0ZSl7XHJcbiAgICAgICAgY29uc3QgY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgICAgICBpZihjdHghPW51bGwpe1xyXG4gICAgICAgICAgICBjdHguc2F2ZSgpO1xyXG4gICAgICAgICAgICBjdHgudHJhbnNsYXRlKHNwcml0ZS54ICsgc3ByaXRlLndpZHRoLzIsc3ByaXRlLnkgKyBzcHJpdGUuaGVpZ2h0LzIpXHJcbiAgICAgICAgICAgIGN0eC5yb3RhdGUoc3ByaXRlLmRlZ3JlZXMqTWF0aC5QSS8xODApO1xyXG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKHNwcml0ZS5pbWFnZXNbc3ByaXRlLmZyYW1lQ3VycmVudF0sLXNwcml0ZS53aWR0aC8yLCAtc3ByaXRlLmhlaWdodC8yLHNwcml0ZS53aWR0aCxzcHJpdGUuaGVpZ2h0KTtcclxuICAgICAgICAgICAgY3R4LnJlc3RvcmUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBkcmF3VGV4dCh0ZXh0OiBUZXh0T2JqZWN0KXtcclxuICAgICAgICBjb25zdCBjdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgICAgIGlmKGN0eCE9bnVsbCl7XHJcbiAgICAgICAgICAgIGN0eC5mb250ID0gdGV4dC5mb250O1xyXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gdGV4dC5jb2xvcjtcclxuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KHRleHQuY29udGVudCx0ZXh0LngsdGV4dC55KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBJbWFnZU9iamVjdCB9IGZyb20gXCIuLi9JbWFnZU9iamVjdC9JbWFnZU9iamVjdFwiO1xyXG5pbXBvcnQgeyBTcHJpdGUgfSBmcm9tIFwiLi4vU3ByaXRlL1Nwcml0ZVwiO1xyXG5pbXBvcnQgeyBUZXh0T2JqZWN0IH0gZnJvbSBcIi4uL1RleHRPYmplY3QvVGV4dE9iamVjdFwiO1xyXG5pbXBvcnQge1JlbmRlcmVyfSBmcm9tIFwiLi4vUmVuZGVyZXIvUmVuZGVyZXJcIjtcclxuaW1wb3J0IHtHYW1lT2JqZWN0fSBmcm9tIFwiLi4vR2FtZU9iamVjdC9HYW1lT2JqZWN0XCI7XHJcbmltcG9ydCB7IFByb2Nlc3NJbnB1dCB9IGZyb20gXCIuLi9Qcm9jZXNzSW5wdXQvUHJvY2Vzc0lucHV0XCI7XHJcbmltcG9ydCB7IEdhbWUgfSBmcm9tIFwiLi4vQ29yZS9HYW1lXCI7XHJcbmltcG9ydCB7IENvbGxpc2lvbiB9IGZyb20gXCIuLi9Db2xsaXNpb24vQ29sbGlzaW9uXCI7XHJcbmV4cG9ydCBjbGFzcyBTY2VuZXtcclxuICAgIGdhbWVPYmplY3RzOiBHYW1lT2JqZWN0W107XHJcbiAgICBwcm9jZXNzSW5wdXQ6IFByb2Nlc3NJbnB1dDtcclxuICAgIGNvbGxpc2lvbjogQ29sbGlzaW9uO1xyXG4gICAgZ2FtZTogR2FtZTtcclxuICAgIGNvbnN0cnVjdG9yKGdhbWU6IEdhbWUpe1xyXG4gICAgICAgIHRoaXMuZ2FtZU9iamVjdHMgPSBbXTtcclxuICAgICAgICB0aGlzLnByb2Nlc3NJbnB1dCA9IG5ldyBQcm9jZXNzSW5wdXQoKTtcclxuICAgICAgICB0aGlzLmNvbGxpc2lvbiA9IG5ldyBDb2xsaXNpb24oKTtcclxuICAgICAgICB0aGlzLmdhbWUgPSBnYW1lO1xyXG4gICAgfVxyXG4gICAgcmVzZXRTY2VuZSgpe1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDx0aGlzLmdhbWVPYmplY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZU9iamVjdHNbaV0ucmVzZXQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBhZGRDaGlsZChnYW1lT2JqZWN0czogR2FtZU9iamVjdFtdKXtcclxuICAgICAgICBnYW1lT2JqZWN0cy5tYXAoKGdhbWVPYmplY3QpPT57dGhpcy5nYW1lT2JqZWN0cy5wdXNoKGdhbWVPYmplY3QpfSlcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIocmVuZGVyOiBSZW5kZXJlcil7XHJcbiAgICAgICAgLy8gc29ydCBnYW1lT2JqZWN0cyBmb2xsb3dpbmcgel9pbmRleFxyXG4gICAgICAgIHRoaXMuZ2FtZU9iamVjdHMuc29ydCgoYSxiKT0+e1xyXG4gICAgICAgICAgICByZXR1cm4gYS56X2luZGV4IC0gYi56X2luZGV4O1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPHRoaXMuZ2FtZU9iamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYodGhpcy5nYW1lT2JqZWN0c1tpXS5nZXRBY3RpdmUoKSl7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBvYmogPSB0aGlzLmdhbWVPYmplY3RzW2ldOyBcclxuICAgICAgICAgICAgICAgIGlmKCBvYmogaW5zdGFuY2VvZiBJbWFnZU9iamVjdClcclxuICAgICAgICAgICAgICAgICAgICByZW5kZXIuZHJhd0ltYWdlKG9iaik7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKG9iaiBpbnN0YW5jZW9mIFNwcml0ZSlcclxuICAgICAgICAgICAgICAgICAgICByZW5kZXIuZHJhd1Nwcml0ZShvYmopO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZihvYmogaW5zdGFuY2VvZiBUZXh0T2JqZWN0KVxyXG4gICAgICAgICAgICAgICAgICAgIHJlbmRlci5kcmF3VGV4dChvYmopO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8geHUgbHkgbG9naWNcclxuICAgIHVwZGF0ZSh0aW1lOiBudW1iZXIsIGRlbHRhOiBudW1iZXIpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8dGhpcy5nYW1lT2JqZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgb2JqID0gdGhpcy5nYW1lT2JqZWN0c1tpXTtcclxuICAgICAgICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIEltYWdlT2JqZWN0IHx8IG9iaiBpbnN0YW5jZW9mIFNwcml0ZSlcclxuICAgICAgICAgICAgICAgIG9iai51cGRhdGUodGltZSwgZGVsdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCB7IFNjZW5lIH0gZnJvbSBcIi4vU2NlbmVcIjtcclxuaW1wb3J0IHtHYW1lfSBmcm9tIFwiLi4vQ29yZS9HYW1lXCI7XHJcbmV4cG9ydCBjbGFzcyBTY2VuZU1hbmFnZXIge1xyXG4gICAgc2NlbmVzOiBTY2VuZVtdO1xyXG4gICAgY3VycmVudFNjZW5lOiBudW1iZXI7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMuc2NlbmVzID0gW107XHJcbiAgICAgICAgdGhpcy5jdXJyZW50U2NlbmUgPSAwO1xyXG4gICAgfVxyXG4gICAgYWRkU2NlbmUoc2NlbmU6IFNjZW5lKXtcclxuICAgICAgICB0aGlzLnNjZW5lcy5wdXNoKHNjZW5lKVxyXG4gICAgfVxyXG4gICAgc3dpdGNoU2NlbmUobmV4dEluZGV4OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnNjZW5lc1t0aGlzLmN1cnJlbnRTY2VuZV0ucmVzZXRTY2VuZSgpO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFNjZW5lID0gbmV4dEluZGV4O1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKCl7fVxyXG4gICAgcmVuZGVyKCl7fVxyXG59IiwiaW1wb3J0IHtHYW1lT2JqZWN0fSBmcm9tIFwiLi4vR2FtZU9iamVjdC9HYW1lT2JqZWN0XCJcclxuZXhwb3J0IGNsYXNzIFNwcml0ZSBleHRlbmRzIEdhbWVPYmplY3R7XHJcbiAgICBpbWFnZXM6IEFycmF5PEhUTUxJbWFnZUVsZW1lbnQ+O1xyXG4gICAgZGVncmVlczogbnVtYmVyO1xyXG4gICAgZnJhbWVDdXJyZW50OiBudW1iZXI7XHJcbiAgICByYXRlOiBudW1iZXI7XHJcbiAgICBhZHQ6IG51bWJlcjtcclxuICAgIGNvbnN0cnVjdG9yKGltYWdlczogQXJyYXk8SFRNTEltYWdlRWxlbWVudD4pe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJpbWFnZXNcIixpbWFnZXMpO1xyXG4gICAgICAgIHRoaXMuaW1hZ2VzID0gaW1hZ2VzO1xyXG4gICAgICAgIHRoaXMuZGVncmVlcyA9IDA7XHJcbiAgICAgICAgdGhpcy5mcmFtZUN1cnJlbnQgPSAwO1xyXG4gICAgICAgIHRoaXMucmF0ZSA9IDA7XHJcbiAgICAgICAgdGhpcy5hZHQgPSAwO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKHRpbWU6IG51bWJlciwgZGVsdGFUaW1lOm51bWJlcil7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHBsYXlBbmltYXRpb24odGltZTogbnVtYmVyLCBkZWx0YVRpbWU6bnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5hZHQgKz0gZGVsdGFUaW1lXHJcbiAgICAgICAgaWYodGhpcy5hZHQ+PXRoaXMucmF0ZSl7XHJcbiAgICAgICAgICAgIHRoaXMuYWR0IC09IHRoaXMucmF0ZTtcclxuICAgICAgICAgICAgdGhpcy5mcmFtZUN1cnJlbnQgKz0xO1xyXG4gICAgICAgICAgICBpZih0aGlzLmZyYW1lQ3VycmVudD50aGlzLmltYWdlcy5sZW5ndGgtMSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZyYW1lQ3VycmVudCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge0dhbWVPYmplY3R9IGZyb20gXCIuLi9HYW1lT2JqZWN0L0dhbWVPYmplY3RcIlxyXG5leHBvcnQgY2xhc3MgVGV4dE9iamVjdCBleHRlbmRzIEdhbWVPYmplY3R7XHJcbiAgICBjb250ZW50OiBzdHJpbmc7XHJcbiAgICBmb250OiBzdHJpbmc7XHJcbiAgICBjb2xvcjogc3RyaW5nO1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLmNvbnRlbnQgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuZm9udCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5jb2xvciA9IFwiXCI7XHJcbiAgICB9XHJcbiAgICBzZXRDb250ZW50KGNvbnRlbnQ6IHN0cmluZyl7XHJcbiAgICAgICAgdGhpcy5jb250ZW50ID0gY29udGVudDtcclxuICAgIH1cclxufSIsImltcG9ydCB7IFNwcml0ZSB9IGZyb20gXCIuLi9FbmdpbmUvU3ByaXRlL1Nwcml0ZVwiO1xyXG5cclxuaW1wb3J0IHtTY2VuZX0gZnJvbSBcIi4uL0VuZ2luZS9TY2VuZS9TY2VuZVwiXHJcbmV4cG9ydCBjbGFzcyBCaXJkIGV4dGVuZHMgU3ByaXRlIHtcclxuICAgIGdyYXZpdHkgOiBudW1iZXI7XHJcbiAgICBzcGVlZCA6IG51bWJlcjsgXHJcbiAgICBjb25zdHJ1Y3RvcihzY2VuZTogU2NlbmUpIHtcclxuICAgICAgICB2YXIgaW1hZ2VzOkFycmF5PEhUTUxJbWFnZUVsZW1lbnQ+ID0gW107XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJsb2FkZXJcIiwgc2NlbmUuZ2FtZS5sb2FkZXIpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDw4O2krKyl7XHJcbiAgICAgICAgICAgIGxldCBuYW1lID0gIFwiYmlyZFwiICsgaTtcclxuICAgICAgICAgICAgaW1hZ2VzLnB1c2goc2NlbmUuZ2FtZS5sb2FkZXIuZ2V0SW1hZ2UobmFtZSkgYXMgSFRNTEltYWdlRWxlbWVudCk7XHJcbiAgICAgICAgfSBcclxuICAgICAgICBzdXBlcihpbWFnZXMpO1xyXG4gICAgICAgIHRoaXMubmFtZSA9IFwiYmlyZFwiO1xyXG4gICAgICAgIHRoaXMuZ3Jhdml0eSA9IDA7XHJcbiAgICAgICAgdGhpcy5zcGVlZCA9IDA7XHJcbiAgICAgICAgdGhpcy5yYXRlID0gMS4wLzMwKjEwMDA7XHJcbiAgICB9XHJcbiAgICB1cGRhdGUodGltZTogbnVtYmVyLCBkZWx0YVRpbWU6bnVtYmVyKXtcclxuICAgICAgICB0aGlzLnkgKz0gKHRoaXMuc3BlZWQgKyAwLjUqdGhpcy5ncmF2aXR5KSooZGVsdGFUaW1lLzE2LjY3KTtcclxuICAgICAgICB0aGlzLnNwZWVkICs9IHRoaXMuZ3Jhdml0eSooZGVsdGFUaW1lLzE2LjY3KTtcclxuICAgICAgICBpZih0aGlzLnkgPCAwKVxyXG4gICAgICAgICAgICB0aGlzLnkgPSAwO1xyXG4gICAgICAgIGlmKHRoaXMuc3BlZWQ+MCl7XHJcbiAgICAgICAgICAgIHRoaXMuZGVncmVlcyArPSAxO1xyXG4gICAgICAgICAgICBpZih0aGlzLmRlZ3JlZXM+NDApIHRoaXMuZGVncmVlcyA9IDQwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLmRlZ3JlZXMgLT0gMTtcclxuICAgICAgICAgICAgaWYodGhpcy5kZWdyZWVzPC0yMCkgdGhpcy5kZWdyZWVzID0gLTIwO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXlBbmltYXRpb24odGltZSwgZGVsdGFUaW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZmx5KCl7XHJcbiAgICAgICAgdGhpcy5zcGVlZCA9IC03O1xyXG4gICAgfVxyXG4gICAgcmVzZXQoKXtcclxuICAgICAgICBzdXBlci5yZXNldCgpO1xyXG4gICAgICAgIHRoaXMuc3BlZWQgPSAwO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgSW1hZ2VPYmplY3QgfSBmcm9tIFwiLi4vRW5naW5lL0ltYWdlT2JqZWN0L0ltYWdlT2JqZWN0XCI7XHJcbmltcG9ydCB7R2FtZX0gZnJvbSBcIi4uL0VuZ2luZS9Db3JlL0dhbWVcIjtcclxuY2xhc3MgR3JvdW5ke1xyXG4gICAgaW1hZ2VzOiBBcnJheTxJbWFnZU9iamVjdD47XHJcbiAgICBzcGVlZDogbnVtYmVyO1xyXG4gICAgY29uc3RydWN0b3Ioc3BlZWQ6IG51bWJlciwgZ2FtZTogR2FtZSl7XHJcbiAgICAgICAgdmFyIGltYWdlID0gZ2FtZS5sb2FkZXIuZ2V0SW1hZ2UoXCJncm91bmRcIik7XHJcbiAgICAgICAgdmFyIGltYWdlT2JqZWN0MSA9IG5ldyBJbWFnZU9iamVjdChpbWFnZSBhcyBIVE1MSW1hZ2VFbGVtZW50KTtcclxuICAgICAgICBpbWFnZU9iamVjdDEubmFtZSA9IFwiZ3JvdW5kXCI7XHJcbiAgICAgICAgaW1hZ2VPYmplY3QxLnpfaW5kZXggPTI7XHJcbiAgICAgICAgaW1hZ2VPYmplY3QxLnkgPSA2NzA7XHJcbiAgICAgICAgaW1hZ2VPYmplY3QxLndpZHRoID0gNjUwO1xyXG4gICAgICAgIGltYWdlT2JqZWN0MS5oZWlnaHQgPSAxNTA7XHJcbiAgICAgICAgaW1hZ2VPYmplY3QxLmRlZmF1bHRQb3NpdGlvbj0gWzAsNjcwXTtcclxuXHJcbiAgICAgICAgdmFyIGltYWdlT2JqZWN0MiA9IG5ldyBJbWFnZU9iamVjdChpbWFnZSBhcyBIVE1MSW1hZ2VFbGVtZW50KTtcclxuICAgICAgICBpbWFnZU9iamVjdDIubmFtZSA9IFwiZ3JvdW5kXCI7XHJcbiAgICAgICAgaW1hZ2VPYmplY3QyLnpfaW5kZXggPTI7XHJcbiAgICAgICAgaW1hZ2VPYmplY3QyLnggPSA2NDk7XHJcbiAgICAgICAgaW1hZ2VPYmplY3QyLnkgPSA2NzA7XHJcbiAgICAgICAgaW1hZ2VPYmplY3QyLndpZHRoID0gNjUwO1xyXG4gICAgICAgIGltYWdlT2JqZWN0Mi5oZWlnaHQgPSAxNTA7XHJcbiAgICAgICAgaW1hZ2VPYmplY3QyLmRlZmF1bHRQb3NpdGlvbj0gWzY0OSw2NzBdO1xyXG5cclxuICAgICAgICB0aGlzLmltYWdlcyA9IFtpbWFnZU9iamVjdDEsaW1hZ2VPYmplY3QyXTtcclxuICAgICAgICB0aGlzLnNwZWVkID0gc3BlZWQ7XHJcbiAgICB9XHJcbiAgICB1cGRhdGUodGltZTogbnVtYmVyLCBkZWx0YVRpbWU6IG51bWJlcil7XHJcbiAgICAgICAgZm9yKHZhciBpPTA7aTx0aGlzLmltYWdlcy5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgdGhpcy5pbWFnZXNbaV0ueCAtPSB0aGlzLnNwZWVkKihkZWx0YVRpbWUvMTYuNjcpO1xyXG4gICAgICAgICAgICBpZih0aGlzLmltYWdlc1tpXS54IDwgLSAoNjUwKSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmltYWdlc1tpXS54ID0gdGhpcy5pbWFnZXNbTWF0aC5hYnMoaS0xKV0ueCs2NDk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IFxyXG4gICAgfVxyXG4gICAgZ2V0Q29tcG9uZW50KCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW1hZ2VzO1xyXG4gICAgfVxyXG4gICAgcmVzZXQoKXtcclxuICAgICAgICBmb3IodmFyIGk9MDtpPHRoaXMuaW1hZ2VzLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICB0aGlzLmltYWdlc1tpXS5yZXNldCgpO1xyXG4gICAgICAgIH0gXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7R3JvdW5kfTsiLCJpbXBvcnQgeyBJbWFnZU9iamVjdCB9IGZyb20gXCIuLi9FbmdpbmUvSW1hZ2VPYmplY3QvSW1hZ2VPYmplY3RcIjtcclxuaW1wb3J0IHtHYW1lfSBmcm9tIFwiLi4vRW5naW5lL0NvcmUvR2FtZVwiXHJcbmNvbnN0IGJsYW5rcyA9IDIwMDtcclxuY29uc3QgcGlwZUhlaWdodCA9IDM1MDtcclxuY29uc3QgbnVtUGlwZSA9IDQ7XHJcbmNvbnN0IGRpc3RhbmNlID0gMzAwO1xyXG5jb25zdCBwaXBlV2lkdGggPSA4MDtcclxuY2xhc3MgUGFpck9mUGlwZXtcclxuICAgIFBpcGVzOiBBcnJheTxJbWFnZU9iamVjdD47XHJcbiAgICBwcml2YXRlIHNwZWVkOiBudW1iZXI7XHJcbiAgICBjb25zdHJ1Y3Rvcih4Om51bWJlciwgeTpudW1iZXIsIGdhbWU6IEdhbWUsc3BlZWQ6IG51bWJlcil7XHJcbiAgICAgICAgdmFyIFBpcGVVcCA9IG5ldyBJbWFnZU9iamVjdChnYW1lLmxvYWRlci5nZXRJbWFnZShcInBpcGVcIikgYXMgSFRNTEltYWdlRWxlbWVudCk7XHJcbiAgICAgICAgLy8gc2V0IGF0dHJpYnV0ZXNcclxuICAgICAgICBQaXBlVXAueCA9IHg7XHJcbiAgICAgICAgUGlwZVVwLnkgPSB5O1xyXG4gICAgICAgIFBpcGVVcC53aWR0aCA9IHBpcGVXaWR0aDtcclxuICAgICAgICBQaXBlVXAuaGVpZ2h0ID0gcGlwZUhlaWdodDtcclxuICAgICAgICBQaXBlVXAuZGVncmVlcyA9IDE4MDtcclxuICAgICAgICBQaXBlVXAubmFtZSA9IFwicGlwZVwiO1xyXG4gICAgICAgIFBpcGVVcC56X2luZGV4ID0gMTtcclxuICAgICAgICAvLyBzZXQgZGVmYXVsdFBvc2l0aW9uXHJcbiAgICAgICAgUGlwZVVwLmRlZmF1bHRQb3NpdGlvbiA9IFt4LHldO1xyXG5cclxuICAgICAgICB2YXIgUGlwZURvd24gPSBuZXcgSW1hZ2VPYmplY3QoZ2FtZS5sb2FkZXIuZ2V0SW1hZ2UoXCJwaXBlXCIpIGFzIEhUTUxJbWFnZUVsZW1lbnQpO1xyXG4gICAgICAgIC8vIHNldCBhdHRyaWJ1dGVzXHJcbiAgICAgICAgUGlwZURvd24ueCA9IHg7XHJcbiAgICAgICAgUGlwZURvd24ueSA9IHkrcGlwZUhlaWdodCtibGFua3M7XHJcbiAgICAgICAgUGlwZURvd24ud2lkdGggPSBwaXBlV2lkdGg7XHJcbiAgICAgICAgUGlwZURvd24uaGVpZ2h0ID0gcGlwZUhlaWdodDtcclxuICAgICAgICBQaXBlRG93bi5uYW1lID0gXCJwaXBlXCI7XHJcbiAgICAgICAgUGlwZURvd24uel9pbmRleCA9IDE7XHJcbiAgICAgICAgLy8gc2V0IGRlZmF1bHRQb3NpdGlvblxyXG4gICAgICAgIFBpcGVEb3duLmRlZmF1bHRQb3NpdGlvbiA9IFt4LHkrcGlwZUhlaWdodCtibGFua3NdO1xyXG5cclxuICAgICAgICB2YXIgY2hlY2tTY29yZSA9IG5ldyBJbWFnZU9iamVjdChnYW1lLmxvYWRlci5nZXRJbWFnZShcInBpcGVcIikgYXMgSFRNTEltYWdlRWxlbWVudCk7XHJcbiAgICAgICAgLy8gc2V0IGF0dHJpYnV0ZXNcclxuICAgICAgICBjaGVja1Njb3JlLnggPSB4K3BpcGVXaWR0aDtcclxuICAgICAgICBjaGVja1Njb3JlLnkgPSB5K3BpcGVIZWlnaHQ7XHJcbiAgICAgICAgY2hlY2tTY29yZS53aWR0aCA9IDEwO1xyXG4gICAgICAgIGNoZWNrU2NvcmUuaGVpZ2h0ID0gYmxhbmtzO1xyXG4gICAgICAgIGNoZWNrU2NvcmUubmFtZSA9IFwiY2hlY2tTY29yZVwiO1xyXG4gICAgICAgIGNoZWNrU2NvcmUuel9pbmRleCA9IDE7XHJcbiAgICAgICAgY2hlY2tTY29yZS5kZWZhdWx0UG9zaXRpb24gPSBbeCtwaXBlV2lkdGgseStwaXBlSGVpZ2h0XTtcclxuXHJcbiAgICAgICAgdGhpcy5QaXBlcz0gW1BpcGVVcCxQaXBlRG93bixjaGVja1Njb3JlXTtcclxuXHJcbiAgICAgICAgdGhpcy5zcGVlZCA9IHNwZWVkO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKHRpbWU6bnVtYmVyLCBkZWx0YVRpbWU6bnVtYmVyKXtcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwzO2krKyl7XHJcbiAgICAgICAgICAgIHRoaXMuUGlwZXNbaV0ueCAtPSB0aGlzLnNwZWVkKihkZWx0YVRpbWUvMTYuNjcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJlc2V0KCl7XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8MztpKyspe1xyXG4gICAgICAgICAgICB0aGlzLlBpcGVzW2ldLnJlc2V0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0Q29tcG9uZW50KCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuUGlwZXM7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIExpc3RQYWlyT2ZQaXBlc3tcclxuICAgIGxpc3RQaXBlOiBQYWlyT2ZQaXBlW107XHJcbiAgICBjb25zdHJ1Y3RvcihnYW1lOiBHYW1lKXtcclxuICAgICAgICB0aGlzLmxpc3RQaXBlID0gW107XHJcbiAgICAgICAgZm9yKHZhciBpPTA7aTxudW1QaXBlO2krKyl7XHJcbiAgICAgICAgICAgIHZhciB4ID0gaSpkaXN0YW5jZSArIHBpcGVXaWR0aCArIDQwMDtcclxuICAgICAgICAgICAgdmFyIHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKi0yMDApO1xyXG4gICAgICAgICAgICB2YXIgcGlwZSA9IG5ldyBQYWlyT2ZQaXBlKHgseSxnYW1lLDQpO1xyXG4gICAgICAgICAgICB0aGlzLmxpc3RQaXBlLnB1c2gocGlwZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdXBkYXRlKCl7XHJcbiAgICAgICAgdGhpcy5saXN0UGlwZS5tYXAoKHBpcGUsaW5kZXgpID0+e1xyXG4gICAgICAgICAgICBpZihwaXBlLlBpcGVzWzBdLng8LTEwMCl7XHJcbiAgICAgICAgICAgICAgICB2YXIgZnJvbnRJbmRleCA9IGluZGV4IC0xO1xyXG4gICAgICAgICAgICAgICAgaWYoZnJvbnRJbmRleDwwKSBmcm9udEluZGV4ID0gdGhpcy5saXN0UGlwZS5sZW5ndGgtMTtcclxuICAgICAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPHBpcGUuUGlwZXMubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgcGlwZS5QaXBlc1tpXS54ID0gdGhpcy5saXN0UGlwZVtmcm9udEluZGV4XS5QaXBlc1tpXS54ICsgZGlzdGFuY2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge1BhaXJPZlBpcGUsIExpc3RQYWlyT2ZQaXBlc307XHJcbiIsImltcG9ydCB7IFRleHRPYmplY3QgfSBmcm9tICcuLi9FbmdpbmUvVGV4dE9iamVjdC9UZXh0T2JqZWN0JztcclxuaW1wb3J0IHtCdXR0b25PYmplY3QgfSBmcm9tICcuLi9FbmdpbmUvQnV0dG9uT2JqZWN0L0J1dHRvbk9iamVjdCc7XHJcbmltcG9ydCB7IEltYWdlT2JqZWN0IH0gZnJvbSAnLi4vRW5naW5lL0ltYWdlT2JqZWN0L0ltYWdlT2JqZWN0JztcclxuXHJcbmV4cG9ydCBjbGFzcyBQYW5lbEdhbWVPdmVyIHtcclxuICAgIGltZ0dhbWVPdmVyOiBJbWFnZU9iamVjdDtcclxuICAgIGN1cnJlbnRTY29yZTogVGV4dE9iamVjdDtcclxuICAgIGhpZ2hTY29yZTogVGV4dE9iamVjdDtcclxuICAgIHJlcGxheUJ1dHRvbjogQnV0dG9uT2JqZWN0O1xyXG4gICAgY29uc3RydWN0b3IoaW1nR2FtZU92ZXI6IEltYWdlT2JqZWN0LCBjdXJyZW50U2NvcmU6IFRleHRPYmplY3QsIGhpZ2hTY29yZTogVGV4dE9iamVjdCwgcmVwbGF5QnV0dG9uOiBCdXR0b25PYmplY3Qpe1xyXG4gICAgICAgIHRoaXMuaW1nR2FtZU92ZXIgPSBpbWdHYW1lT3ZlcjtcclxuICAgICAgICB0aGlzLmN1cnJlbnRTY29yZSA9IGN1cnJlbnRTY29yZTtcclxuICAgICAgICB0aGlzLmhpZ2hTY29yZSA9IGhpZ2hTY29yZTtcclxuICAgICAgICB0aGlzLnJlcGxheUJ1dHRvbiA9IHJlcGxheUJ1dHRvbjtcclxuICAgIH1cclxuICAgIHNldEFjdGl2ZShhY3RpdmU6IGJvb2xlYW4pe1xyXG4gICAgICAgIHRoaXMuaW1nR2FtZU92ZXIuc2V0QWN0aXZlKGFjdGl2ZSk7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50U2NvcmUuc2V0QWN0aXZlKGFjdGl2ZSk7XHJcbiAgICAgICAgdGhpcy5oaWdoU2NvcmUuc2V0QWN0aXZlKGFjdGl2ZSk7XHJcbiAgICAgICAgdGhpcy5yZXBsYXlCdXR0b24uc2V0QWN0aXZlKGFjdGl2ZSk7XHJcbiAgICB9XHJcbiAgICBnZXRDb21wb25lbnQoKXtcclxuICAgICAgICByZXR1cm4gW3RoaXMuaW1nR2FtZU92ZXIsIHRoaXMucmVwbGF5QnV0dG9uLCB0aGlzLmN1cnJlbnRTY29yZSwgdGhpcy5oaWdoU2NvcmVdO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKGN1cnJlbnRTY29yZTogbnVtYmVyLCBoaWdoU2NvcmU6IG51bWJlcil7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50U2NvcmUuc2V0Q29udGVudChcIlNjb3JlOiBcIiArIGN1cnJlbnRTY29yZSk7XHJcbiAgICAgICAgdGhpcy5oaWdoU2NvcmUuc2V0Q29udGVudChcIkhpZ2ggU2NvcmU6IFwiICsgaGlnaFNjb3JlKVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtTY2VuZX0gZnJvbSAnLi4vRW5naW5lL1NjZW5lL1NjZW5lJztcclxuaW1wb3J0IHtCaXJkfSBmcm9tICcuL0JpcmQnO1xyXG5pbXBvcnQge0xpc3RQYWlyT2ZQaXBlc30gZnJvbSAnLi9QYWlyT2ZQaXBlJztcclxuaW1wb3J0IHtUZXh0T2JqZWN0IH0gZnJvbSAnLi4vRW5naW5lL1RleHRPYmplY3QvVGV4dE9iamVjdCc7XHJcbmltcG9ydCB7SW1hZ2VPYmplY3QgfSBmcm9tICcuLi9FbmdpbmUvSW1hZ2VPYmplY3QvSW1hZ2VPYmplY3QnO1xyXG5pbXBvcnQge1Njb3JlfSBmcm9tIFwiLi9TY29yZVwiO1xyXG5pbXBvcnQge0dyb3VuZCB9IGZyb20gJy4vR3JvdW5kJztcclxuaW1wb3J0IHtQYW5lbEdhbWVPdmVyfSBmcm9tICcuL1BhbmVsR2FtZU92ZXInXHJcbmltcG9ydCB7R2FtZX0gZnJvbSAnLi4vRW5naW5lL0NvcmUvR2FtZSdcclxuaW1wb3J0IHtCdXR0b25PYmplY3R9IGZyb20gJy4uL0VuZ2luZS9CdXR0b25PYmplY3QvQnV0dG9uT2JqZWN0JztcclxuaW1wb3J0IHsgR2FtZU9iamVjdCB9IGZyb20gJy4uL0VuZ2luZS9HYW1lT2JqZWN0L0dhbWVPYmplY3QnO1xyXG5cclxuY29uc3QgcG9pbnQgPSBuZXcgQXVkaW8oXCJhdWRpby9wb2ludC5tcDNcIik7XHJcbmNvbnN0IGRpZSA9IG5ldyBBdWRpbyhcImF1ZGlvL2RpZS5tcDNcIik7XHJcbmNvbnN0IGhpdCA9IG5ldyBBdWRpbyhcImF1ZGlvL2hpdC5tcDNcIik7XHJcbmNvbnN0IGF1ZGlvUGxheWVyID0gbmV3IEF1ZGlvKFwiYXVkaW8vb3JjaGVzdHJhd2F2LTI2MTU4Lm1wM1wiKTtcclxuY29uc3QgYXVkaW8gPSBuZXcgQXVkaW8oXCJhdWRpby9zd29vc2gubXAzXCIpO1xyXG5jb25zdCBCaXJkX1dpZHRoID0gNTA7XHJcbmNvbnN0IEJpcmRfSGVpZ2h0ID0gNTA7XHJcbmNvbnN0IEJpcmRfWCA9IDEwMDtcclxuY29uc3QgQmlyZF9ZID0gMjgwO1xyXG5cclxuZXhwb3J0IGNsYXNzIFBsYXlTY2VuZSBleHRlbmRzIFNjZW5lIHtcclxuICAgIGJpcmQ6IEJpcmQ7XHJcbiAgICBwaXBlczogTGlzdFBhaXJPZlBpcGVzO1xyXG4gICAgZ3JvdW5kOiBHcm91bmQ7XHJcbiAgICBjaGVja1BpcGU6IGJvb2xlYW47XHJcbiAgICB0ZXh0U2NvcmU6IFRleHRPYmplY3Q7XHJcbiAgICB0ZXh0RGVzY3JpcHRpb246IFRleHRPYmplY3Q7XHJcbiAgICBhZGRTY29yZTogbnVtYmVyIHwgbnVsbDtcclxuICAgIHNjb3JlOiBTY29yZTtcclxuICAgIGRlYWRCaXJkOiBib29sZWFuO1xyXG4gICAgcGFuZWxHYW1lT3ZlciA6IFBhbmVsR2FtZU92ZXI7XHJcbiAgICBzdGFydDogYm9vbGVhbjtcclxuICAgIHBhdXNlOiBib29sZWFuO1xyXG4gICAgY29uc3RydWN0b3IoZ2FtZTogR2FtZSl7XHJcbiAgICAgICAgc3VwZXIoZ2FtZSk7XHJcbiAgICAgICAgLy8gcGxheSBhdWRpb1xyXG4gICAgICAgIC8vIGF1ZGlvUGxheWVyLnBsYXkoKTtcclxuICAgICAgICAvLyBhdWRpb1BsYXllci5sb29wID10cnVlO1xyXG4gICAgICAgIHRoaXMuY2hlY2tQaXBlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5hZGRTY29yZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5kZWFkQmlyZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc3RhcnQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnBhdXNlID0gZmFsc2U7IFxyXG4gICAgICAgIHRoaXMuc2NvcmUgPSBuZXcgU2NvcmUoKTtcclxuXHJcbiAgICAgICAgdGhpcy5iaXJkID0gIG5ldyBCaXJkKHRoaXMpXHJcbiAgICAgICAgLy8gc2V0IGF0dHJpYnV0ZXNcclxuICAgICAgICB0aGlzLmJpcmQueCA9IEJpcmRfWDtcclxuICAgICAgICB0aGlzLmJpcmQueSA9IEJpcmRfWTtcclxuICAgICAgICB0aGlzLmJpcmQud2lkdGggPSBCaXJkX1dpZHRoO1xyXG4gICAgICAgIHRoaXMuYmlyZC5oZWlnaHQgPSBCaXJkX0hlaWdodDtcclxuICAgICAgICB0aGlzLmJpcmQuZ3Jhdml0eSA9IDAuNTtcclxuICAgICAgICB0aGlzLmJpcmQuc3BlZWQgPSAyMDtcclxuICAgICAgICB0aGlzLmJpcmQuel9pbmRleCA9IDI7XHJcbiAgICAgICAgdGhpcy5iaXJkLmRlZmF1bHRQb3NpdGlvbiA9IFt0aGlzLmJpcmQueCwgdGhpcy5iaXJkLnldO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMudGV4dERlc2NyaXB0aW9uID0gbmV3IFRleHRPYmplY3QoKTtcclxuICAgICAgICAvLyBzZXQgYXR0cmlidXRlc1xyXG4gICAgICAgIHRoaXMudGV4dERlc2NyaXB0aW9uLnggPSAxNDA7XHJcbiAgICAgICAgdGhpcy50ZXh0RGVzY3JpcHRpb24ueSA9IDQ1MDtcclxuICAgICAgICB0aGlzLnRleHREZXNjcmlwdGlvbi5jb250ZW50ID0gXCJQcmVzcyBFbnRlciB0byBjb250aW51ZVwiO1xyXG4gICAgICAgIHRoaXMudGV4dERlc2NyaXB0aW9uLmZvbnQgPSBcIjMwcHggQXJpYWxcIjtcclxuICAgICAgICB0aGlzLnRleHREZXNjcmlwdGlvbi5jb2xvciA9IFwid2hpdGVcIjtcclxuICAgICAgICB0aGlzLnRleHREZXNjcmlwdGlvbi56X2luZGV4ID0gMjtcclxuICAgICAgICB0aGlzLnRleHREZXNjcmlwdGlvbi5zZXRBY3RpdmUoZmFsc2UpO1xyXG4gICAgICAgIHRoaXMudGV4dERlc2NyaXB0aW9uLmRlZmF1bHRQb3NpdGlvbiA9IFsxNDAsNDUwXTtcclxuXHJcbiAgICAgICAgdGhpcy50ZXh0U2NvcmUgPSBuZXcgVGV4dE9iamVjdCgpO1xyXG4gICAgICAgIHRoaXMudGV4dFNjb3JlLnggPSAxMDtcclxuICAgICAgICB0aGlzLnRleHRTY29yZS55ID0gMzA7XHJcbiAgICAgICAgdGhpcy50ZXh0U2NvcmUuY29udGVudCA9IFwiU2NvcmU6IFwiKyB0aGlzLnNjb3JlLmdldEN1cnJlbnRTY29yZSgpO1xyXG4gICAgICAgIHRoaXMudGV4dFNjb3JlLmZvbnQgPSBcIjE4cHggQXJpYWxcIjtcclxuICAgICAgICB0aGlzLnRleHRTY29yZS5jb2xvciA9IFwid2hpdGVcIjtcclxuICAgICAgICB0aGlzLnRleHRTY29yZS56X2luZGV4ID0gMjtcclxuICAgICAgICB0aGlzLnRleHRTY29yZS5kZWZhdWx0UG9zaXRpb24gPSBbMTAsMzBdO1xyXG5cclxuICAgICAgICB2YXIgYmcgPSBuZXcgSW1hZ2VPYmplY3QoZ2FtZS5sb2FkZXIuZ2V0SW1hZ2UoXCJiYWNrZ3JvdW5kXCIpIGFzIEhUTUxJbWFnZUVsZW1lbnQpO1xyXG4gICAgICAgIC8vIHNldCBhdHRyaWJ1dGVzXHJcbiAgICAgICAgYmcud2lkdGggPSA3MDA7XHJcbiAgICAgICAgYmcuaGVpZ2h0ID0gODAwO1xyXG4gICAgICAgIGJnLm5hbWUgPSBcImJhY2tncm91bmRcIjtcclxuXHJcbiAgICAgICAgdGhpcy5ncm91bmQgPSBuZXcgR3JvdW5kKDQsZ2FtZSk7XHJcbiAgICAgICAgdGhpcy5waXBlcyA9IG5ldyBMaXN0UGFpck9mUGlwZXMoZ2FtZSk7XHJcblxyXG4gICAgICAgIC8vIGluaXQgcGFuZWxHYW1lT3ZlclxyXG4gICAgICAgIHZhciBpbWdHYW1lT3ZlciA9IG5ldyBJbWFnZU9iamVjdChnYW1lLmxvYWRlci5nZXRJbWFnZShcImdhbWVvdmVyXCIpIGFzIEhUTUxJbWFnZUVsZW1lbnQpO1xyXG4gICAgICAgIGltZ0dhbWVPdmVyLnggPSA2MDtcclxuICAgICAgICBpbWdHYW1lT3Zlci55ID0gMzAwO1xyXG4gICAgICAgIGltZ0dhbWVPdmVyLndpZHRoID0gNTAwO1xyXG4gICAgICAgIGltZ0dhbWVPdmVyLmhlaWdodCA9IDEzMDtcclxuICAgICAgICBpbWdHYW1lT3Zlci56X2luZGV4ID0gMztcclxuICAgICAgICBpbWdHYW1lT3Zlci5kZWZhdWx0UG9zaXRpb24gPSBbNjAsMzAwXTtcclxuXHJcbiAgICAgICAgdmFyIHRleHRDdXJyZW50U2NvcmUgPSBuZXcgVGV4dE9iamVjdCgpO1xyXG4gICAgICAgIHRleHRDdXJyZW50U2NvcmUueCA9IDExMDtcclxuICAgICAgICB0ZXh0Q3VycmVudFNjb3JlLnkgPSA0NzA7XHJcbiAgICAgICAgdGV4dEN1cnJlbnRTY29yZS5jb250ZW50ID0gXCJTY29yZTogMFwiO1xyXG4gICAgICAgIHRleHRDdXJyZW50U2NvcmUuZm9udCA9IFwiMzBweCBBcmlhbFwiO1xyXG4gICAgICAgIHRleHRDdXJyZW50U2NvcmUuY29sb3IgPSBcIndoaXRlXCI7XHJcbiAgICAgICAgdGV4dEN1cnJlbnRTY29yZS56X2luZGV4ID0gMztcclxuICAgICAgICB0ZXh0Q3VycmVudFNjb3JlLmRlZmF1bHRQb3NpdGlvbiA9IFsxMTAsNDcwXTtcclxuXHJcbiAgICAgICAgdmFyIHRleHRIaWdoU2NvcmUgPSBuZXcgVGV4dE9iamVjdCgpO1xyXG4gICAgICAgIHRleHRIaWdoU2NvcmUueCA9IDMzMDtcclxuICAgICAgICB0ZXh0SGlnaFNjb3JlLnkgPSA0NzA7XHJcbiAgICAgICAgdGV4dEhpZ2hTY29yZS5jb250ZW50ID0gXCJIaWdoIFNjb3JlOiAwXCI7XHJcbiAgICAgICAgdGV4dEhpZ2hTY29yZS5mb250ID0gXCIzMHB4IEFyaWFsXCI7XHJcbiAgICAgICAgdGV4dEhpZ2hTY29yZS5jb2xvciA9IFwid2hpdGVcIjtcclxuICAgICAgICB0ZXh0SGlnaFNjb3JlLnpfaW5kZXggPSAzO1xyXG4gICAgICAgIHRleHRIaWdoU2NvcmUuZGVmYXVsdFBvc2l0aW9uID0gWzMzMCw0NzBdXHJcblxyXG4gICAgICAgIHZhciBidXR0b25SZXBsYXkgPSBuZXcgQnV0dG9uT2JqZWN0KGdhbWUubG9hZGVyLmdldEltYWdlKFwicmVwbGF5QnV0dG9uXCIpIGFzIEhUTUxJbWFnZUVsZW1lbnQpO1xyXG4gICAgICAgIGJ1dHRvblJlcGxheS54ID0gMjI1O1xyXG4gICAgICAgIGJ1dHRvblJlcGxheS55ID0gNTAwO1xyXG4gICAgICAgIGJ1dHRvblJlcGxheS53aWR0aCA9IDE2MDtcclxuICAgICAgICBidXR0b25SZXBsYXkuaGVpZ2h0ID0gODA7XHJcbiAgICAgICAgYnV0dG9uUmVwbGF5LnpfaW5kZXggPSAzO1xyXG4gICAgICAgIGJ1dHRvblJlcGxheS5kZWZhdWx0UG9zaXRpb24gPSBbMjI1LDUwMF07XHJcblxyXG4gICAgICAgIHRoaXMucGFuZWxHYW1lT3ZlciA9IG5ldyBQYW5lbEdhbWVPdmVyKFxyXG4gICAgICAgICAgICBpbWdHYW1lT3Zlcix0ZXh0Q3VycmVudFNjb3JlLHRleHRIaWdoU2NvcmUsYnV0dG9uUmVwbGF5XHJcbiAgICAgICAgKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBMaXN0IG9mIEdhbWVPYmplY3RcclxuICAgICAgICB2YXIgbGlzdEdhbWVPYmplY3QgOkFycmF5PEdhbWVPYmplY3Q+ID0gW2JnLHRoaXMuYmlyZCx0aGlzLnRleHRTY29yZSwgdGhpcy50ZXh0RGVzY3JpcHRpb25dO1xyXG4gICAgICAgIGxpc3RHYW1lT2JqZWN0ID0gIGxpc3RHYW1lT2JqZWN0LmNvbmNhdCh0aGlzLmdyb3VuZC5nZXRDb21wb25lbnQoKSk7XHJcbiAgICAgICAgbGlzdEdhbWVPYmplY3QgPSBsaXN0R2FtZU9iamVjdC5jb25jYXQodGhpcy5wYW5lbEdhbWVPdmVyLmdldENvbXBvbmVudCgpKTtcclxuICAgICAgICBcclxuICAgICAgICBmb3IodmFyIGk9MDtpPHRoaXMucGlwZXMubGlzdFBpcGUubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIHZhciBwaXBlID0gdGhpcy5waXBlcy5saXN0UGlwZVtpXTtcclxuICAgICAgICAgICAgbGlzdEdhbWVPYmplY3QgPSBsaXN0R2FtZU9iamVjdC5jb25jYXQocGlwZS5nZXRDb21wb25lbnQoKSlcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJsaXN0R2FtZU9iamVjdFwiLGxpc3RHYW1lT2JqZWN0KVxyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQobGlzdEdhbWVPYmplY3QpO1xyXG4gICAgICAgIC8vIGhpZGVuIHBhbmVsR2FtZU92ZXJcclxuICAgICAgICB0aGlzLnBhbmVsR2FtZU92ZXIuc2V0QWN0aXZlKGZhbHNlKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgdXBkYXRlKHRpbWU6IG51bWJlciwgZGVsdGFUaW1lOiBudW1iZXIpIHtcclxuICAgICAgICBpZiggIXRoaXMuZGVhZEJpcmQgJiYgdGhpcy5zdGFydCAmJiAhdGhpcy5wYXVzZSl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMucHJvY2Vzc0lucHV0LmlucHV0S2V5ID09PSBcIktleUFcIil7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhdXNlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMudGV4dERlc2NyaXB0aW9uLnNldEFjdGl2ZSh0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgcGlwZXMgPSB0aGlzLmdhbWVPYmplY3RzLmZpbHRlcigoaW1iKT0+e1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGltYi5uYW1lID09PSBcInBpcGVcIjtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB2YXIgY2hlY2tTY29yZSA9IHRoaXMuZ2FtZU9iamVjdHMuZmlsdGVyKChpbWIpPT57XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaW1iLm5hbWUgPT09IFwiY2hlY2tTY29yZVwiO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB0aGlzLmdyb3VuZC51cGRhdGUodGltZSwgZGVsdGFUaW1lKTtcclxuICAgICAgICAgICAgZm9yKHZhciBqID0gMDsgaiA8IHBpcGVzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmNvbGxpc2lvbi5oYW5kbGVDb2xsaXNpb24ocGlwZXNbal0sdGhpcy5iaXJkKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja1BpcGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZ2FtZSBvdmVyIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IGNoZWNrU2NvcmUubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuY29sbGlzaW9uLmhhbmRsZUNvbGxpc2lvbihjaGVja1Njb3JlW2tdLHRoaXMuYmlyZCkmJiB0aGlzLmFkZFNjb3JlICE9IGspe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NvcmUuc2V0Q3VycmVudFNjb3JlKHRoaXMuc2NvcmUuZ2V0Q3VycmVudFNjb3JlKCkrMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXh0U2NvcmUuY29udGVudCA9IFwiU2NvcmU6IFwiICsgdGhpcy5zY29yZS5nZXRDdXJyZW50U2NvcmUoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFNjb3JlID0gaztcclxuICAgICAgICAgICAgICAgICAgICBwb2ludC5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5waXBlcy5saXN0UGlwZS5tYXAoKHBpcGUpID0+IHtcclxuICAgICAgICAgICAgICAgIHBpcGUudXBkYXRlKHRpbWUsIGRlbHRhVGltZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLnBpcGVzLnVwZGF0ZSgpO1xyXG5cclxuICAgICAgICAgICAgaWYodGhpcy5wcm9jZXNzSW5wdXQuaW5wdXRLZXk9PT1cIlNwYWNlXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmlyZC5mbHkoKTtcclxuICAgICAgICAgICAgICAgIGF1ZGlvLnBsYXkoKTsgXHJcbiAgICAgICAgICAgICAgICBhdWRpby5wbGF5YmFja1JhdGUgPSAyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIHZhIGNoYW0gZ3JvdW5kXHJcbiAgICAgICAgICAgIGlmKHRoaXMuY29sbGlzaW9uLmhhbmRsZUNvbGxpc2lvbih0aGlzLmdyb3VuZC5nZXRDb21wb25lbnQoKVswXSwgdGhpcy5iaXJkKXx8dGhpcy5jb2xsaXNpb24uaGFuZGxlQ29sbGlzaW9uKHRoaXMuZ3JvdW5kLmdldENvbXBvbmVudCgpWzFdLCB0aGlzLmJpcmQpfHx0aGlzLmNoZWNrUGlwZSl7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLnNjb3JlLmdldEN1cnJlbnRTY29yZSgpPiB0aGlzLnNjb3JlLmdldEhpZ2hTY29yZSgpKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NvcmUuc2V0SGlnaFNjb3JlKHRoaXMuc2NvcmUuZ2V0Q3VycmVudFNjb3JlKCkpO1xyXG4gICAgICAgICAgICAgICAgLy8gdXBkYXRlIHNjb3JlXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhbmVsR2FtZU92ZXIudXBkYXRlKHRoaXMuc2NvcmUuZ2V0Q3VycmVudFNjb3JlKCksIHRoaXMuc2NvcmUuZ2V0SGlnaFNjb3JlKCkpO1xyXG4gICAgICAgICAgICAgICAgLy8gc2V0IHN0YXRlIGJpcmQgaXMgZGllXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlYWRCaXJkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIC8vIHBsYXkgYXVkaW9cclxuICAgICAgICAgICAgICAgIGF1ZGlvUGxheWVyLnBhdXNlKCk7XHJcbiAgICAgICAgICAgICAgICBoaXQucGxheSgpO1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PntcclxuICAgICAgICAgICAgICAgICAgICAvLyBzaG93IHBhbmVsR2FtZU92ZXJcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhbmVsR2FtZU92ZXIuc2V0QWN0aXZlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRpZS5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICB9LCA1MDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHN1cGVyLnVwZGF0ZSh0aW1lLCBkZWx0YVRpbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHRoaXMuZGVhZEJpcmQpe1xyXG4gICAgICAgICAgICBpZighdGhpcy5jb2xsaXNpb24uaGFuZGxlQ29sbGlzaW9uKHRoaXMuZ3JvdW5kLmdldENvbXBvbmVudCgpWzBdLCB0aGlzLmJpcmQpJiYhdGhpcy5jb2xsaXNpb24uaGFuZGxlQ29sbGlzaW9uKHRoaXMuZ3JvdW5kLmdldENvbXBvbmVudCgpWzFdLCB0aGlzLmJpcmQpKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmlyZC5zcGVlZCA9IDEwMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmlyZC51cGRhdGUodGltZSwgZGVsdGFUaW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZigodGhpcy5wcm9jZXNzSW5wdXQuaW5wdXRLZXkgPT09IFwiRW50ZXJcInx8dGhpcy5wcm9jZXNzSW5wdXQubW91c2VFdmVudCE9bnVsbCYmIHRoaXMucGFuZWxHYW1lT3Zlci5yZXBsYXlCdXR0b24uaXNJbnNpZGUodGhpcy5wcm9jZXNzSW5wdXQubW91c2VFdmVudCkpKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVhZEJpcmQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGFuZWxHYW1lT3Zlci5zZXRBY3RpdmUoZmFsc2UpOyBcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5zY2VuZU1hbmFnZXIuc3dpdGNoU2NlbmUoMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZighdGhpcy5zdGFydCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMucHJvY2Vzc0lucHV0LmlucHV0S2V5ID09PSBcIlNwYWNlXCIpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5wYXVzZSl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMucHJvY2Vzc0lucHV0LmlucHV0S2V5ID09PSBcIkVudGVyXCIpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXVzZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0RGVzY3JpcHRpb24uc2V0QWN0aXZlKGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJlc2V0U2NlbmUoKXtcclxuICAgICAgICAvLyBhdWRpb1BsYXllci5wbGF5KCk7XHJcbiAgICAgICAgLy8gYXVkaW9QbGF5ZXIubG9vcCA9dHJ1ZTtcclxuICAgICAgICB0aGlzLmNoZWNrUGlwZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYWRkU2NvcmUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuc3RhcnQgPSBmYWxzZTtcclxuICAgICAgICBzdXBlci5yZXNldFNjZW5lKCk7XHJcbiAgICAgICAgdGhpcy5zY29yZS5zZXRDdXJyZW50U2NvcmUoMCk7XHJcbiAgICAgICAgdGhpcy50ZXh0U2NvcmUuc2V0Q29udGVudChcIlNjb3JlOiAwXCIpO1xyXG4gICAgICAgIHRoaXMuYmlyZC5yZXNldCgpO1xyXG4gICAgICAgIHRoaXMuZ3JvdW5kLnJlc2V0KCk7XHJcbiAgICAgICAgZm9yKHZhciBpPTA7aTx0aGlzLnBpcGVzLmxpc3RQaXBlLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICB0aGlzLnBpcGVzLmxpc3RQaXBlW2ldLnJlc2V0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwicmVzZXQgcmVuZGVyaW5nXCIpO1xyXG4gICAgfVxyXG59XHJcbiIsImNsYXNzIFNjb3Jle1xyXG4gICAgcHJpdmF0ZSBoaWdoU2NvcmU6IG51bWJlcjtcclxuICAgIHByaXZhdGUgY3VycmVudFNjb3JlOiBudW1iZXI7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMuaGlnaFNjb3JlID0gMDtcclxuICAgICAgICB0aGlzLmN1cnJlbnRTY29yZSA9IDA7XHJcbiAgICB9XHJcbiAgICBzZXRDdXJyZW50U2NvcmUoc2NvcmU6IG51bWJlcil7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50U2NvcmUgPSBzY29yZTtcclxuICAgIH1cclxuICAgIGdldEN1cnJlbnRTY29yZSgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRTY29yZTtcclxuICAgIH1cclxuICAgIGdldEhpZ2hTY29yZSgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmhpZ2hTY29yZTtcclxuICAgIH1cclxuICAgIHNldEhpZ2hTY29yZShoaWdoU2NvcmU6IG51bWJlcil7XHJcbiAgICAgICAgdGhpcy5oaWdoU2NvcmUgPSBoaWdoU2NvcmU7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IHtTY29yZX07IiwiaW1wb3J0IHtTY2VuZX0gZnJvbSAnLi4vRW5naW5lL1NjZW5lL1NjZW5lJztcclxuaW1wb3J0IHsgSW1hZ2VPYmplY3QgfSBmcm9tICcuLi9FbmdpbmUvSW1hZ2VPYmplY3QvSW1hZ2VPYmplY3QnO1xyXG5pbXBvcnQgeyBCdXR0b25PYmplY3QgfSBmcm9tICcuLi9FbmdpbmUvQnV0dG9uT2JqZWN0L0J1dHRvbk9iamVjdCc7XHJcbmltcG9ydCB7R3JvdW5kfSBmcm9tIFwiLi9Hcm91bmRcIlxyXG5pbXBvcnQgeyBHYW1lIH0gZnJvbSAnLi4vRW5naW5lL0NvcmUvR2FtZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgU3RhcnRTY2VuZSBleHRlbmRzIFNjZW5lIHtcclxuICAgIGJhY2tncm91bmQ6IEltYWdlT2JqZWN0O1xyXG4gICAgZ3JvdW5kOiBHcm91bmQ7XHJcbiAgICBpbWdTdGFydDogSW1hZ2VPYmplY3Q7XHJcbiAgICBidXR0b25TdGFydDogQnV0dG9uT2JqZWN0XHJcbiAgICBjb25zdHJ1Y3RvcihnYW1lOiBHYW1lKXtcclxuICAgICAgICBzdXBlcihnYW1lKTtcclxuICAgICAgICB0aGlzLmJhY2tncm91bmQgPW5ldyBJbWFnZU9iamVjdChnYW1lLmxvYWRlci5nZXRJbWFnZShcImJhY2tncm91bmRcIikgYXMgSFRNTEltYWdlRWxlbWVudCk7XHJcbiAgICAgICAgLy8gc2V0IGF0dHJpYnV0ZXNcclxuICAgICAgICB0aGlzLmJhY2tncm91bmQud2lkdGggPSA3MDA7XHJcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kLmhlaWdodCA9IDgwMDtcclxuICAgICAgICB0aGlzLmJhY2tncm91bmQubmFtZSA9IFwiYmFja2dyb3VuZFwiXHJcblxyXG4gICAgICAgIHRoaXMuaW1nU3RhcnQgPSBuZXcgSW1hZ2VPYmplY3QoZ2FtZS5sb2FkZXIuZ2V0SW1hZ2UoXCJtZXNzYWdlXCIpIGFzIEhUTUxJbWFnZUVsZW1lbnQpO1xyXG4gICAgICAgIC8vIHNldCBhdHRyaWJ1dGVzXHJcbiAgICAgICAgdGhpcy5pbWdTdGFydC53aWR0aCA9NTAwLFxyXG4gICAgICAgIHRoaXMuaW1nU3RhcnQuaGVpZ2h0ID0gNzAwO1xyXG4gICAgICAgIHRoaXMuaW1nU3RhcnQueCA9IDUwO1xyXG4gICAgICAgIHRoaXMuaW1nU3RhcnQueSA9IDIwO1xyXG4gICAgICAgIHRoaXMuaW1nU3RhcnQuel9pbmRleCA9IDI7XHJcblxyXG4gICAgICAgIHRoaXMuYnV0dG9uU3RhcnQgPSBuZXcgQnV0dG9uT2JqZWN0KG51bGwpO1xyXG4gICAgICAgIC8vIHNldCBhdHRyaWJ1dGVzXHJcbiAgICAgICAgdGhpcy5idXR0b25TdGFydC53aWR0aCA9IDcwMDtcclxuICAgICAgICB0aGlzLmJ1dHRvblN0YXJ0LmhlaWdodCA9IDgwMDtcclxuICAgICAgICB0aGlzLmJ1dHRvblN0YXJ0Lm5hbWUgPSBcImJ1dHRvblN0YXJ0XCI7XHJcblxyXG4gICAgICAgIHRoaXMuZ3JvdW5kID0gbmV3IEdyb3VuZCgyLGdhbWUpXHJcbiAgICAgICAgdmFyIGltYWdlT2JqZWN0cyA9IFt0aGlzLmJhY2tncm91bmRdLmNvbmNhdCh0aGlzLmdyb3VuZC5nZXRDb21wb25lbnQoKSk7XHJcbiAgICAgICAgaW1hZ2VPYmplY3RzLnB1c2godGhpcy5pbWdTdGFydCk7XHJcbiAgICAgICAgdGhpcy5hZGRDaGlsZChpbWFnZU9iamVjdHMpO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKHRpbWU6IG51bWJlciwgZGVsdGFUaW1lOiBudW1iZXIpe1xyXG4gICAgICAgIHRoaXMuZ3JvdW5kLnVwZGF0ZSh0aW1lLCBkZWx0YVRpbWUpO1xyXG4gICAgICAgIGlmKHRoaXMucHJvY2Vzc0lucHV0LmlucHV0S2V5ID09PSBcIkVudGVyXCJ8fHRoaXMucHJvY2Vzc0lucHV0LmlucHV0S2V5ID09PSBcIlNwYWNlXCIgfHwodGhpcy5wcm9jZXNzSW5wdXQubW91c2VFdmVudCE9bnVsbCAmJiB0aGlzLmJ1dHRvblN0YXJ0LmlzSW5zaWRlKHRoaXMucHJvY2Vzc0lucHV0Lm1vdXNlRXZlbnQpKSkge1xyXG4gICAgICAgICAgICB0aGlzLmdhbWUuc2NlbmVNYW5hZ2VyLnN3aXRjaFNjZW5lKDEpXHJcbiAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBTdGFydFNjZW5lIH0gZnJvbSBcIi4vZ2FtZS9TdGFydFNjZW5lXCI7XHJcbmltcG9ydCB7IFJlbmRlcmVyIH0gZnJvbSBcIi4vRW5naW5lL1JlbmRlcmVyL1JlbmRlcmVyXCI7XHJcbmltcG9ydCB7IFNjZW5lTWFuYWdlciB9IGZyb20gXCIuL0VuZ2luZS9TY2VuZS9TY2VuZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgR2FtZSB9IGZyb20gXCIuL0VuZ2luZS9Db3JlL0dhbWVcIjsgIFxyXG5pbXBvcnQge1BsYXlTY2VuZX0gZnJvbSBcIi4vZ2FtZS9QbGF5U2NlbmVcIjtcclxuXHJcbnZhciBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbXlDYW52YXMnKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcclxudmFyIHJlbmRlciA9IG5ldyBSZW5kZXJlcihjYW52YXMpXHJcbnZhciBnYW1lU2NlbmUgPSBuZXcgU2NlbmVNYW5hZ2VyKCk7XHJcbnZhciBteUdhbWUgPSBuZXcgR2FtZShnYW1lU2NlbmUpO1xyXG5cclxuY29uc3QgaW1hZ2VzTG9hZCA9IFtcclxuICAgIHtcclxuICAgICAgICBcImtleVwiOiBcImJpcmQwXCIsXHJcbiAgICAgICAgXCJwYXRoXCI6IFwiSW1hZ2VzL2JpcmQvZnJhbWUtMS5wbmdcIixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJrZXlcIjogXCJiaXJkMVwiLFxyXG4gICAgICAgIFwicGF0aFwiOiBcIkltYWdlcy9iaXJkL2ZyYW1lLTIucG5nXCIsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwia2V5XCI6IFwiYmlyZDJcIixcclxuICAgICAgICBcInBhdGhcIjogXCJJbWFnZXMvYmlyZC9mcmFtZS0zLnBuZ1wiLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImtleVwiOiBcImJpcmQzXCIsXHJcbiAgICAgICAgXCJwYXRoXCI6IFwiSW1hZ2VzL2JpcmQvZnJhbWUtNC5wbmdcIixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJrZXlcIjogXCJiaXJkNFwiLFxyXG4gICAgICAgIFwicGF0aFwiOiBcIkltYWdlcy9iaXJkL2ZyYW1lLTUucG5nXCIsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwia2V5XCI6IFwiYmlyZDVcIixcclxuICAgICAgICBcInBhdGhcIjogXCJJbWFnZXMvYmlyZC9mcmFtZS02LnBuZ1wiLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImtleVwiOiBcImJpcmQ2XCIsXHJcbiAgICAgICAgXCJwYXRoXCI6IFwiSW1hZ2VzL2JpcmQvZnJhbWUtNy5wbmdcIixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJrZXlcIjogXCJiaXJkN1wiLFxyXG4gICAgICAgIFwicGF0aFwiOiBcIkltYWdlcy9iaXJkL2ZyYW1lLTgucG5nXCIsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwia2V5XCI6IFwicGlwZVwiLFxyXG4gICAgICAgIFwicGF0aFwiOiBcIkltYWdlcy9waXBlL3BpcGUtZ3JlZW4ucG5nXCIsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwia2V5XCI6IFwibWVzc2FnZVwiLFxyXG4gICAgICAgIFwicGF0aFwiOiBcIkltYWdlcy9nYW1lU3RhcnQvbWVzc2FnZS5wbmdcIixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJrZXlcIjogXCJncm91bmRcIixcclxuICAgICAgICBcInBhdGhcIjogXCJJbWFnZXMvZ3JvdW5kL2Jhc2UucG5nXCIsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwia2V5XCI6IFwiZ2FtZW92ZXJcIixcclxuICAgICAgICBcInBhdGhcIjogXCJJbWFnZXMvcGFuZWxHYW1lT3Zlci9nYW1lb3Zlci5wbmdcIixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJrZXlcIjogXCJyZXBsYXlCdXR0b25cIixcclxuICAgICAgICBcInBhdGhcIjogXCJJbWFnZXMvcGFuZWxHYW1lT3Zlci9yZXBsYXktYnV0dG9uLnBuZ1wiLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImtleVwiOiBcImJhY2tncm91bmRcIixcclxuICAgICAgICBcInBhdGhcIjogXCJJbWFnZXMvYmFja2dyb3VuZC9iYWNrZ3JvdW5kLW5pZ2h0LnBuZ1wiXHJcbiAgICB9XHJcbl1cclxuXHJcbmNvbnN0IHByb21pc2VzID0gaW1hZ2VzTG9hZC5tYXAoKGltYWdlKSA9PiBteUdhbWUubG9hZGVyLmFkZEltYWdlKGltYWdlW1wicGF0aFwiXSwgaW1hZ2VbXCJrZXlcIl0pKVxyXG5Qcm9taXNlLmFsbChwcm9taXNlcykudGhlbigoKT0+IHtcclxuICAgIHZhciBzdGFydFNjZW5lID0gbmV3IFN0YXJ0U2NlbmUobXlHYW1lKTtcclxuICAgIHZhciBwbGF5U2NlbmUgPSBuZXcgUGxheVNjZW5lKG15R2FtZSk7XHJcbiAgICBnYW1lU2NlbmUuYWRkU2NlbmUoc3RhcnRTY2VuZSk7XHJcbiAgICBnYW1lU2NlbmUuYWRkU2NlbmUocGxheVNjZW5lKTtcclxuICAgIG15R2FtZS5zdGFydChyZW5kZXIpO1xyXG59KS5jYXRjaCgoZXJyb3IpID0+IHtjb25zb2xlLmxvZyhlcnJvcil9KVxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=