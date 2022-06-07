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
class Game {
    constructor(sceneManager) {
        this.sceneManager = sceneManager;
        this.lastTime = null;
    }
    start(render) {
        document.addEventListener('keydown', (e) => this.sceneManager.scenes[this.sceneManager.currentScene].onKeyDown(e));
        document.addEventListener('keyup', (e) => this.sceneManager.scenes[this.sceneManager.currentScene].onKeyUp());
        document.addEventListener('mousedown', (e) => this.sceneManager.scenes[this.sceneManager.currentScene].onMouseDown(e, render.canvas));
        document.addEventListener('mouseup', (e) => this.sceneManager.scenes[this.sceneManager.currentScene].onMouseUp());
        requestAnimationFrame(() => this.loop(render));
    }
    loop(render) {
        var indexScene = this.sceneManager.currentScene;
        const time = window.performance.now();
        if (this.lastTime == null) {
            indexScene = this.sceneManager.scenes[this.sceneManager.currentScene].update(time, 0);
            this.sceneManager.scenes[this.sceneManager.currentScene].render(render);
        }
        else {
            const delta = time - this.lastTime;
            indexScene = this.sceneManager.scenes[this.sceneManager.currentScene].update(time, delta);
            this.sceneManager.scenes[this.sceneManager.currentScene].render(render);
        }
        if (indexScene != this.sceneManager.currentScene) {
            this.loadScene(indexScene);
            this.sceneManager.scenes[indexScene].resetScene();
        }
        this.lastTime = time;
        requestAnimationFrame(() => this.loop(render));
    }
    loadScene(indexScene) {
        this.sceneManager.currentScene = indexScene;
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
        this.image = image;
        this.degrees = degrees;
    }
    update(time, deltaTime) { }
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
        var img = new Image();
        img.src = imageObject.image;
        if (ctx != null) {
            ctx.save();
            ctx.translate(imageObject.x + imageObject.width / 2, imageObject.y + imageObject.height / 2);
            ctx.rotate(imageObject.degrees * Math.PI / 180);
            ctx.drawImage(img, -imageObject.width / 2, -imageObject.height / 2, imageObject.width, imageObject.height);
            ctx.restore();
        }
    }
    drawSprite(sprite) {
        const ctx = this.canvas.getContext('2d');
        var img = new Image();
        if (ctx != null) {
            img.src = sprite.images[sprite.fameCurrent];
            // ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
            ctx.save();
            ctx.translate(sprite.x + sprite.width / 2, sprite.y + sprite.height / 2);
            ctx.rotate(sprite.degrees * Math.PI / 180);
            ctx.drawImage(img, -sprite.width / 2, -sprite.height / 2, sprite.width, sprite.height);
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
    constructor() {
        this.imageObjects = [];
        this.sprites = [];
        this.textObjects = [];
        this.inputKey = "";
        this.mouseEvent = null;
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
        return 1;
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
    constructor(x, y, width, height, images, degrees, name) {
        super(x, y, width, height, name);
        this.images = images;
        this.degrees = degrees;
        this.fameCurrent = 0;
    }
    update(time, deltaTime) { }
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
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Engine_Sprite_Sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Engine/Sprite/Sprite */ "./src/Engine/Sprite/Sprite.ts");

var audio = new Audio("../audio/swoosh.mp3");
class Bird extends _Engine_Sprite_Sprite__WEBPACK_IMPORTED_MODULE_0__.Sprite {
    constructor(x, y, width, height, images, degrees, gravity, speed) {
        super(x, y, width, height, images, degrees, "bird");
        this.gravity = gravity;
        this.speed = speed;
        this.pfs = 60;
        this.rate = 1.0 / this.pfs * 1000;
        this.adt = 0.0;
    }
    update(time, deltaTime) {
        this.y += this.speed + 0.5 * this.gravity;
        if (this.y < 0)
            this.y = 0;
        this.speed += this.gravity;
        this.adt += deltaTime;
        if (this.speed > 0) {
            this.degrees += 1;
            if (this.degrees > 20)
                this.degrees = 20;
        }
        else {
            this.degrees -= 1;
            if (this.degrees < -20)
                this.degrees = -20;
            if (this.adt >= this.rate) {
                this.adt -= this.rate;
                this.fameCurrent += 1;
                if (this.fameCurrent > this.images.length - 1) {
                    this.fameCurrent = 0;
                }
            }
            if (this.fameCurrent > this.images.length) {
                this.fameCurrent = 0;
            }
        }
    }
    fly() {
        audio.play();
        audio.playbackRate = 2;
        this.speed = -5;
    }
    reset() {
        super.reset();
        this.speed = 0;
    }
}
const imgBird = [
    "../Images/bird/frame-1.png",
    "../Images/bird/frame-2.png",
    "../Images/bird/frame-3.png",
    "../Images/bird/frame-4.png",
    "../Images/bird/frame-5.png",
    "../Images/bird/frame-6.png",
    "../Images/bird/frame-7.png",
    "../Images/bird/frame-8.png",
];
var bird = new Bird(100, 280, 50, 50, imgBird, 0, 0.5, 0.1);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (bird);


/***/ }),

/***/ "./src/game/Ground.ts":
/*!****************************!*\
  !*** ./src/game/Ground.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ground": () => (/* binding */ Ground),
/* harmony export */   "ground": () => (/* binding */ ground)
/* harmony export */ });
/* harmony import */ var _Engine_ImageObject_ImageObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Engine/ImageObject/ImageObject */ "./src/Engine/ImageObject/ImageObject.ts");

class Ground {
    constructor(speed) {
        var image1 = new _Engine_ImageObject_ImageObject__WEBPACK_IMPORTED_MODULE_0__.ImageObject(0, 670, 650, 150, "../Images/base.png", 0, "ground");
        var image2 = new _Engine_ImageObject_ImageObject__WEBPACK_IMPORTED_MODULE_0__.ImageObject(649, 670, 650, 150, "../Images/base.png", 0, "ground");
        this.images = [image1, image2];
        this.speed = speed;
    }
    update() {
        for (var i = 0; i < this.images.length; i++) {
            this.images[i].x -= this.speed;
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
var ground = new Ground(2);



/***/ }),

/***/ "./src/game/PairOfPipe.ts":
/*!********************************!*\
  !*** ./src/game/PairOfPipe.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PairOfPipe": () => (/* binding */ PairOfPipe),
/* harmony export */   "listPairOfPipes": () => (/* binding */ listPairOfPipes)
/* harmony export */ });
/* harmony import */ var _Engine_ImageObject_ImageObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Engine/ImageObject/ImageObject */ "./src/Engine/ImageObject/ImageObject.ts");

const blanks = 200;
const pipeHeight = 350;
const numPipe = 4;
const distance = 250;
const pipeWidth = 80;
class PairOfPipe {
    constructor(x, y, image, speed) {
        var PipeUp = new _Engine_ImageObject_ImageObject__WEBPACK_IMPORTED_MODULE_0__.ImageObject(x, y, pipeWidth, pipeHeight, image, 180, "pipe");
        var PipeDown = new _Engine_ImageObject_ImageObject__WEBPACK_IMPORTED_MODULE_0__.ImageObject(x, y + pipeHeight + blanks, pipeWidth, pipeHeight, image, 0, "pipe");
        var checkScore = new _Engine_ImageObject_ImageObject__WEBPACK_IMPORTED_MODULE_0__.ImageObject(x + pipeWidth, y + pipeHeight, 10, blanks, "", 0, "checkScore");
        this.Pipes = [PipeUp, PipeDown, checkScore];
        this.speed = speed;
    }
    update() {
        for (var i = 0; i < 3; i++) {
            this.Pipes[i].x -= this.speed;
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
    constructor() {
        this.listPipe = [];
        for (var i = 0; i < numPipe; i++) {
            var x = i * distance + pipeWidth + 400;
            var y = Math.floor(Math.random() * -200);
            var pipe = new PairOfPipe(x, y, "../Images/pipe-green.png", 2);
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
var listPairOfPipes = new ListPairOfPipes();



/***/ }),

/***/ "./src/game/PanelGameOver.ts":
/*!***********************************!*\
  !*** ./src/game/PanelGameOver.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "panelGameOver": () => (/* binding */ panelGameOver)
/* harmony export */ });
/* harmony import */ var _Engine_TextObject_TextObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Engine/TextObject/TextObject */ "./src/Engine/TextObject/TextObject.ts");
/* harmony import */ var _Engine_ButtonObject_ButtonObject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Engine/ButtonObject/ButtonObject */ "./src/Engine/ButtonObject/ButtonObject.ts");
/* harmony import */ var _Engine_ImageObject_ImageObject__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Engine/ImageObject/ImageObject */ "./src/Engine/ImageObject/ImageObject.ts");



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
var replayButton = new _Engine_ButtonObject_ButtonObject__WEBPACK_IMPORTED_MODULE_1__.ButtonObject(225, 500, 160, 80, "../Images/replay-button.png", 0, "replayButton");
var imgGameOver = new _Engine_ImageObject_ImageObject__WEBPACK_IMPORTED_MODULE_2__.ImageObject(60, 300, 500, 130, "../Images/gameover.png", 0, "gameOver");
var currentScore = new _Engine_TextObject_TextObject__WEBPACK_IMPORTED_MODULE_0__.TextObject(110, 470, "showScore", "Score: 0", "30px Arial", "white");
var highScore = new _Engine_TextObject_TextObject__WEBPACK_IMPORTED_MODULE_0__.TextObject(330, 470, "highScore", "High Score: 0", "30px Arial", "white");
var panelGameOver = new PanelGameOver(imgGameOver, currentScore, highScore, replayButton);



/***/ }),

/***/ "./src/game/PlayScene.ts":
/*!*******************************!*\
  !*** ./src/game/PlayScene.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PlayScene": () => (/* binding */ PlayScene),
/* harmony export */   "playScene": () => (/* binding */ playScene)
/* harmony export */ });
/* harmony import */ var _Engine_Scene_Scene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Engine/Scene/Scene */ "./src/Engine/Scene/Scene.ts");
/* harmony import */ var _Bird__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Bird */ "./src/game/Bird.ts");
/* harmony import */ var _PairOfPipe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PairOfPipe */ "./src/game/PairOfPipe.ts");
/* harmony import */ var _Engine_TextObject_TextObject__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Engine/TextObject/TextObject */ "./src/Engine/TextObject/TextObject.ts");
/* harmony import */ var _Engine_ImageObject_ImageObject__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Engine/ImageObject/ImageObject */ "./src/Engine/ImageObject/ImageObject.ts");
/* harmony import */ var _Score__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Score */ "./src/game/Score.ts");
/* harmony import */ var _Ground__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Ground */ "./src/game/Ground.ts");
/* harmony import */ var _PanelGameOver__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./PanelGameOver */ "./src/game/PanelGameOver.ts");








const point = new Audio("../audio/point.mp3");
const die = new Audio("../audio/die.mp3");
const hit = new Audio("../audio/hit.mp3");
const audioPlayer = new Audio("../audio/orchestrawav-26158.mp3");
const fps = 60;
class PlayScene extends _Engine_Scene_Scene__WEBPACK_IMPORTED_MODULE_0__.Scene {
    constructor() {
        super();
        this.bird = _Bird__WEBPACK_IMPORTED_MODULE_1__["default"];
        this.pipes = _PairOfPipe__WEBPACK_IMPORTED_MODULE_2__.listPairOfPipes;
        this.ground = _Ground__WEBPACK_IMPORTED_MODULE_6__.ground;
        this.score = _Score__WEBPACK_IMPORTED_MODULE_5__.score;
        this.panelGameOver = _PanelGameOver__WEBPACK_IMPORTED_MODULE_7__.panelGameOver;
        // play audio
        audioPlayer.play();
        audioPlayer.loop = true;
        this.rate = 1.0 / fps * 1000;
        this.adt = 0.0;
        this.checkPipe = false;
        this.addScore = null;
        this.deadBird = false;
        this.start = false;
        this.textScore = new _Engine_TextObject_TextObject__WEBPACK_IMPORTED_MODULE_3__.TextObject(10, 30, "score", "Score: " + this.score.getCurrentScore(), "18px Arial", "white");
        var bg = new _Engine_ImageObject_ImageObject__WEBPACK_IMPORTED_MODULE_4__.ImageObject(0, 0, 700, 800, "../Images/background-night.png", 0, "background");
        this.addChild([bg], [this.bird], [this.textScore]);
        for (var i = 0; i < _PairOfPipe__WEBPACK_IMPORTED_MODULE_2__.listPairOfPipes.listPipe.length; i++) {
            var pipe = _PairOfPipe__WEBPACK_IMPORTED_MODULE_2__.listPairOfPipes.listPipe[i];
            this.addChild(pipe.getComponent()["imageObjects"], pipe.getComponent()["sprites"], pipe.getComponent()["textObjects"]);
        }
        this.addChild(this.ground.getComponent()["imageObjects"], this.ground.getComponent()["sprites"], this.ground.getComponent()["textObjects"]);
        // hiden panelGameOver
        this, _PanelGameOver__WEBPACK_IMPORTED_MODULE_7__.panelGameOver.setActive(false);
        this.addChild(this.panelGameOver.getComponent()["imageObjects"], this.panelGameOver.getComponent()["sprites"], this.panelGameOver.getComponent()["textObjects"]);
    }
    update(time, deltaTime) {
        if (!this.deadBird && this.start) {
            this.adt += deltaTime;
            var ground = this.imageObjects.filter((imb) => {
                return imb.name === "ground";
            });
            var pipes = this.imageObjects.filter((imb) => {
                return imb.name === "pipe";
            });
            var checkScore = this.imageObjects.filter((imb) => {
                return imb.name === "checkScore";
            });
            if (this.adt >= this.rate) {
                this.adt -= this.rate;
                this.ground.update();
                for (var i = 0; i < this.imageObjects.length; i++) {
                    this.imageObjects[i].update(time, deltaTime);
                }
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
                                point.play();
                                break;
                            }
                        }
                        this.pipes.listPipe.map((pipe) => {
                            pipe.update();
                        });
                        this.sprites[i].update(time, deltaTime);
                        if (this.inputKey === "Space") {
                            this.bird.fly();
                        }
                        else if (this.checkPipe && (!this.Collision(ground[0], this.sprites[i]) && !this.Collision(ground[1], this.sprites[i])))
                            this.sprites[i].update(time, deltaTime);
                        console.log("test", ground);
                        if (this.Collision(ground[0], this.sprites[i]) || this.Collision(ground[1], this.sprites[i]) || this.checkPipe) {
                            if (this.score.getCurrentScore() > this.score.getHighScore())
                                this.score.setHighScore(this.score.getCurrentScore());
                            // show panelGameOver
                            this.panelGameOver.setActive(true);
                            // update score
                            this.panelGameOver.update(this.score.getCurrentScore(), this.score.getHighScore());
                            // set state bird is die
                            this.deadBird = true;
                            // play audio
                            audioPlayer.pause();
                            hit.play();
                            setTimeout(function () {
                                die.play();
                            }, 500);
                        }
                    }
                    else
                        this.sprites[i].update(time, deltaTime);
                }
                this.pipes.update();
            }
        }
        else if (this.deadBird) {
            if (this.inputKey === "Enter" || (this.mouseEvent != null && this.panelGameOver.replayButton.isInside(this.mouseEvent))) {
                this.deadBird = false;
                this.panelGameOver.setActive(false);
                this.resetScene();
            }
        }
        else if (!this.start) {
            if (this.inputKey === "Space")
                this.start = true;
        }
        return 1;
    }
    resetScene() {
        audioPlayer.play();
        audioPlayer.loop = true;
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
var playScene = new PlayScene();



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
/* harmony export */   "startScene": () => (/* binding */ startScene)
/* harmony export */ });
/* harmony import */ var _Engine_Scene_Scene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Engine/Scene/Scene */ "./src/Engine/Scene/Scene.ts");
/* harmony import */ var _Engine_ImageObject_ImageObject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Engine/ImageObject/ImageObject */ "./src/Engine/ImageObject/ImageObject.ts");
/* harmony import */ var _Engine_ButtonObject_ButtonObject__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Engine/ButtonObject/ButtonObject */ "./src/Engine/ButtonObject/ButtonObject.ts");
/* harmony import */ var _Ground__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Ground */ "./src/game/Ground.ts");




const fps = 60;
class StartScene extends _Engine_Scene_Scene__WEBPACK_IMPORTED_MODULE_0__.Scene {
    constructor() {
        super();
        this.ground = _Ground__WEBPACK_IMPORTED_MODULE_3__.ground;
        this.rate = 1.0 / fps * 1000;
        this.adt = 0.0;
        this.background = new _Engine_ImageObject_ImageObject__WEBPACK_IMPORTED_MODULE_1__.ImageObject(0, 0, 700, 800, "../Images/background-night.png", 0, "background");
        this.imgStart = new _Engine_ImageObject_ImageObject__WEBPACK_IMPORTED_MODULE_1__.ImageObject(50, 20, 500, 700, "../Images/message.png", 0, "");
        this.buttonStart = new _Engine_ButtonObject_ButtonObject__WEBPACK_IMPORTED_MODULE_2__.ButtonObject(0, 0, 700, 800, "", 0, "buttonStart");
        var imageObjects = [this.background].concat(this.ground.getComponent()["imageObjects"]);
        imageObjects.push(this.imgStart);
        this.addChild(imageObjects, [], []);
    }
    update(time, deltaTime) {
        this.adt += deltaTime;
        if (this.adt >= this.rate) {
            this.adt -= this.rate;
            this.ground.update();
        }
        if (this.inputKey === "Enter" || (this.mouseEvent != null && this.buttonStart.isInside(this.mouseEvent))) {
            this.inputKey = "";
            return 1;
        }
        return 0;
    }
}
var startScene = new StartScene();



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
gameScene.addScene(_game_StartScene__WEBPACK_IMPORTED_MODULE_0__.startScene);
gameScene.addScene(_game_PlayScene__WEBPACK_IMPORTED_MODULE_4__.playScene);
var myGame = new _Engine_Core_Game__WEBPACK_IMPORTED_MODULE_3__.Game(gameScene);
myGame.start(render);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUF3RDtBQUNqRCxNQUFNLFlBQWEsU0FBUSxpRUFBVztJQUN6QyxZQUFZLENBQVMsRUFBRSxDQUFTLEVBQUUsS0FBYSxFQUFFLE1BQWMsRUFBQyxLQUFhLEVBQUUsT0FBZSxFQUFFLElBQVk7UUFDeEcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFDRCxRQUFRLENBQUMsR0FBa0I7UUFDdkIsSUFBRyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUM7WUFBRSxPQUFPLEtBQUssQ0FBQztRQUNoQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxLQUFLLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMzRyxDQUFDO0NBQ0o7Ozs7Ozs7Ozs7Ozs7OztBQ05NLE1BQU0sSUFBSTtJQUdiLFlBQVksWUFBMEI7UUFDbEMsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7UUFDakMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7SUFDekIsQ0FBQztJQUVELEtBQUssQ0FBQyxNQUFnQjtRQUNsQixRQUFRLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUUsS0FBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoSCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUUsS0FBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQzNHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUMsQ0FBQyxDQUFDLEVBQUMsRUFBRSxLQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDbEksUUFBUSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBQyxDQUFDLENBQUMsRUFBQyxFQUFFLEtBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztRQUMvRyxxQkFBcUIsQ0FBQyxHQUFFLEVBQUUsS0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRCxJQUFJLENBQUMsTUFBZ0I7UUFDakIsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUM7UUFDaEQsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUN0QyxJQUFHLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxFQUFDO1lBQ3JCLFVBQVUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDdEYsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7U0FFM0U7YUFDRztZQUNBLE1BQU0sS0FBSyxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQ25DLFVBQVUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUMsS0FBSyxDQUFDLENBQUM7WUFDekYsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDM0U7UUFDRCxJQUFHLFVBQVUsSUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBQztZQUMxQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzNCLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQ3JEO1FBQ0QsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDckIscUJBQXFCLENBQUMsR0FBRSxFQUFFLEtBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBQ0QsU0FBUyxDQUFDLFVBQWtCO1FBQ3hCLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxHQUFHLFVBQVUsQ0FBQztJQUNoRCxDQUFDO0NBQ0o7Ozs7Ozs7Ozs7Ozs7OztBQzFDTSxNQUFNLFVBQVU7SUFRbkIsWUFBWSxDQUFTLEVBQUUsQ0FBUyxFQUFFLEtBQWEsRUFBRSxNQUFjLEVBQUUsSUFBWSxFQUFFLE1BQU0sR0FBRyxJQUFJO1FBQ3hGLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1gsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDWCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFDRCxLQUFLO1FBQ0QsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBQ0QsU0FBUyxDQUFDLE1BQWU7UUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDekIsQ0FBQztJQUNELFNBQVM7UUFDTCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDdkIsQ0FBQztDQUVKOzs7Ozs7Ozs7Ozs7Ozs7O0FDNUJrRDtBQUM1QyxNQUFNLFdBQVksU0FBUSw4REFBVTtJQUd2QyxZQUFZLENBQVMsRUFBRSxDQUFTLEVBQUUsS0FBYSxFQUFFLE1BQWMsRUFBQyxLQUFhLEVBQUUsT0FBZSxFQUFFLElBQVk7UUFDeEcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBQyxJQUFJLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUMzQixDQUFDO0lBQ0QsTUFBTSxDQUFDLElBQVksRUFBRSxTQUFnQixJQUFFLENBQUM7Q0FDM0M7Ozs7Ozs7Ozs7Ozs7OztBQ05NLE1BQU0sUUFBUTtJQUVqQixZQUFZLE1BQXlCO1FBQ2pDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ3pCLENBQUM7SUFDRCxTQUFTLENBQUMsV0FBd0I7UUFDOUIsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekMsSUFBSSxHQUFHLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztRQUN0QixHQUFHLENBQUMsR0FBRyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUM7UUFDNUIsSUFBRyxHQUFHLElBQUUsSUFBSSxFQUFDO1lBQ1QsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ1gsR0FBRyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxLQUFLLEdBQUMsQ0FBQyxFQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUM7WUFDdkYsR0FBRyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsT0FBTyxHQUFDLElBQUksQ0FBQyxFQUFFLEdBQUMsR0FBRyxDQUFDLENBQUM7WUFDNUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSyxHQUFDLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxFQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3BHLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUNqQjtJQUNMLENBQUM7SUFDRCxVQUFVLENBQUMsTUFBYztRQUNyQixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QyxJQUFJLEdBQUcsR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO1FBQ3RCLElBQUcsR0FBRyxJQUFFLElBQUksRUFBQztZQUNULEdBQUcsQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDNUMsOERBQThEO1lBQzlELEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNYLEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsS0FBSyxHQUFDLENBQUMsRUFBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDO1lBQ25FLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBQyxJQUFJLENBQUMsRUFBRSxHQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZDLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFDLENBQUMsRUFBQyxNQUFNLENBQUMsS0FBSyxFQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNoRixHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDakI7SUFDTCxDQUFDO0lBQ0QsUUFBUSxDQUFDLElBQWdCO1FBQ3JCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pDLElBQUcsR0FBRyxJQUFFLElBQUksRUFBQztZQUNULEdBQUcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNyQixHQUFHLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDM0IsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzVDO0lBQ0wsQ0FBQztDQUNKOzs7Ozs7Ozs7Ozs7Ozs7QUNyQ00sTUFBTSxLQUFLO0lBTWQ7UUFDSSxJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztJQUMzQixDQUFDO0lBQ0QsVUFBVTtRQUNOLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUUsRUFBQztZQUM1QyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ2hDO1FBQ0QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3pDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDM0I7UUFDRCxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBQ0QsUUFBUSxDQUFDLFlBQTJCLEVBQUMsT0FBaUIsRUFBRSxXQUF5QjtRQUM3RSxZQUFZLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUNyRSxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNqRCxXQUFXLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBQ0QsV0FBVyxDQUFDLFlBQTJCLEVBQUMsT0FBaUI7UUFDckQsWUFBWSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUMzQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFDLEVBQUU7Z0JBQ2hELE9BQU8sR0FBRyxJQUFHLFdBQVcsQ0FBQztZQUM3QixDQUFDLENBQUM7UUFDTixDQUFDLENBQUM7UUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ2pCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUMsRUFBRTtnQkFDdEMsT0FBTyxHQUFHLElBQUcsTUFBTSxDQUFDO1lBQ3hCLENBQUMsQ0FBQztRQUNOLENBQUMsQ0FBQztJQUNOLENBQUM7SUFFRCxNQUFNLENBQUMsTUFBZ0I7UUFDbkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxXQUFXLEVBQUMsRUFBRTtZQUNqQyxJQUFHLFdBQVcsQ0FBQyxTQUFTLEVBQUU7Z0JBQ3RCLE1BQU0sQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDdEMsQ0FBQyxDQUFDO1FBQ0YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUMsRUFBRTtZQUN2QixJQUFHLE1BQU0sQ0FBQyxTQUFTLEVBQUU7Z0JBQ2pCLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEMsQ0FBQyxDQUFDO1FBQ0YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUMsRUFBRTtZQUN4QixJQUFHLEdBQUcsQ0FBQyxTQUFTLEVBQUU7Z0JBQ2QsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM3QixDQUFDLENBQUM7SUFDTixDQUFDO0lBQ0QsY0FBYztJQUNkLE1BQU0sQ0FBQyxJQUFZLEVBQUUsS0FBYTtRQUM5QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDOUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQzVDO1FBQ0QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3pDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztTQUN2QztRQUNELE9BQU8sQ0FBQyxDQUFDO0lBQ2IsQ0FBQztJQUNELFNBQVMsQ0FBQyxDQUFnQjtRQUN0QixJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDM0IsQ0FBQztJQUNELE9BQU87UUFDSCxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBQ0QsV0FBVyxDQUFDLENBQWEsRUFBRSxNQUF5QjtRQUNoRCxJQUFJLElBQUksR0FBRyxNQUFNLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUMxQyxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDbkMsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDbkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUNELFNBQVM7UUFDTCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztJQUMzQixDQUFDO0lBQ0QsU0FBUyxDQUFDLElBQWlCLEVBQUUsSUFBaUI7UUFDMUMsSUFBRyxJQUFJLENBQUMsQ0FBQyxHQUFFLElBQUksQ0FBQyxLQUFLLElBQUUsSUFBSSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBQztZQUMzRCxJQUFHLElBQUksQ0FBQyxDQUFDLEdBQUUsSUFBSSxDQUFDLE1BQU0sSUFBRSxJQUFJLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFDO2dCQUM3RCxPQUFPLElBQUksQ0FBQzthQUNmO1NBQ0o7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0NBQ0o7Ozs7Ozs7Ozs7Ozs7OztBQzVGTSxNQUFNLFlBQVk7SUFJckI7UUFDSSxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBQ0QsUUFBUSxDQUFDLEtBQVk7UUFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQzNCLENBQUM7SUFDRCxNQUFNLEtBQUcsQ0FBQztJQUNWLE1BQU0sS0FBRyxDQUFDO0NBQ2I7Ozs7Ozs7Ozs7Ozs7Ozs7QUNka0Q7QUFDNUMsTUFBTSxNQUFPLFNBQVEsOERBQVU7SUFJbEMsWUFBWSxDQUFTLEVBQUUsQ0FBUyxFQUFFLEtBQWEsRUFBRSxNQUFjLEVBQUUsTUFBcUIsRUFBQyxPQUFlLEVBQUMsSUFBWTtRQUMvRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFDRCxNQUFNLENBQUMsSUFBWSxFQUFFLFNBQWdCLElBQUUsQ0FBQztDQUMzQzs7Ozs7Ozs7Ozs7Ozs7OztBQ1prRDtBQUM1QyxNQUFNLFVBQVcsU0FBUSw4REFBVTtJQUl0QyxZQUFZLENBQVMsRUFBRSxDQUFTLEVBQUUsSUFBWSxFQUFHLE9BQWUsRUFBRSxJQUFZLEVBQUUsS0FBSyxHQUFHLE9BQU87UUFDM0YsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUN2QixDQUFDO0lBQ0QsVUFBVSxDQUFDLE9BQWU7UUFDdEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDM0IsQ0FBQztDQUNKOzs7Ozs7Ozs7Ozs7Ozs7O0FDZGdEO0FBQ2pELElBQUksS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFDN0MsTUFBTSxJQUFLLFNBQVEseURBQU07SUFNckIsWUFBWSxDQUFTLEVBQUUsQ0FBUyxFQUFFLEtBQWEsRUFBRSxNQUFjLEVBQUMsTUFBcUIsRUFBQyxPQUFlLEVBQUMsT0FBZSxFQUFDLEtBQWE7UUFDL0gsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ2QsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLEdBQUMsSUFBSSxDQUFDLEdBQUcsR0FBQyxJQUFJLENBQUM7UUFDOUIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7SUFDbkIsQ0FBQztJQUNELE1BQU0sQ0FBQyxJQUFZLEVBQUUsU0FBZ0I7UUFDakMsSUFBSSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3hDLElBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQ1QsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDZixJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDM0IsSUFBSSxDQUFDLEdBQUcsSUFBSSxTQUFTO1FBQ3JCLElBQUcsSUFBSSxDQUFDLEtBQUssR0FBQyxDQUFDLEVBQUM7WUFDWixJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQztZQUNsQixJQUFHLElBQUksQ0FBQyxPQUFPLEdBQUMsRUFBRTtnQkFBRSxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztTQUN6QzthQUNHO1lBQ0EsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUM7WUFDbEIsSUFBRyxJQUFJLENBQUMsT0FBTyxHQUFDLENBQUMsRUFBRTtnQkFBRSxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsRUFBRSxDQUFDO1lBQ3hDLElBQUcsSUFBSSxDQUFDLEdBQUcsSUFBRSxJQUFJLENBQUMsSUFBSSxFQUFDO2dCQUNuQixJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQ3RCLElBQUksQ0FBQyxXQUFXLElBQUUsQ0FBQyxDQUFDO2dCQUNwQixJQUFHLElBQUksQ0FBQyxXQUFXLEdBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUMsQ0FBQyxFQUFDO29CQUNyQyxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztpQkFDeEI7YUFDSjtZQUNELElBQUcsSUFBSSxDQUFDLFdBQVcsR0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBQztnQkFDbkMsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7YUFDeEI7U0FDSjtJQUNMLENBQUM7SUFFRCxHQUFHO1FBQ0MsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2IsS0FBSyxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBRTtJQUNyQixDQUFDO0lBQ0QsS0FBSztRQUNELEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNkLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO0lBQ25CLENBQUM7Q0FDSjtBQUNELE1BQU0sT0FBTyxHQUFHO0lBQ1osNEJBQTRCO0lBQzVCLDRCQUE0QjtJQUM1Qiw0QkFBNEI7SUFDNUIsNEJBQTRCO0lBQzVCLDRCQUE0QjtJQUM1Qiw0QkFBNEI7SUFDNUIsNEJBQTRCO0lBQzVCLDRCQUE0QjtDQUMvQixDQUFDO0FBQ0YsSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3JELGlFQUFlLElBQUksRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvRDRDO0FBRWhFLE1BQU0sTUFBTTtJQUdSLFlBQVksS0FBYTtRQUNyQixJQUFJLE1BQU0sR0FBRyxJQUFJLHdFQUFXLENBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLG9CQUFvQixFQUFDLENBQUMsRUFBQyxRQUFRLENBQUMsQ0FBQztRQUM1RSxJQUFJLE1BQU0sR0FBRyxJQUFJLHdFQUFXLENBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLG9CQUFvQixFQUFDLENBQUMsRUFBQyxRQUFRLENBQUMsQ0FBQztRQUM5RSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsTUFBTSxFQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3ZCLENBQUM7SUFDRCxNQUFNO1FBQ0YsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFDLENBQUMsRUFBRSxFQUFDO1lBQ2pDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDL0IsSUFBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFFLENBQUMsR0FBRyxHQUFDLEVBQUUsQ0FBQyxFQUFDO2dCQUM3QixJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLEdBQUcsQ0FBQzthQUN2RDtTQUNKO0lBQ0wsQ0FBQztJQUNELFlBQVk7UUFDUixPQUFPO1lBQ0gsY0FBYyxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQzNCLFNBQVMsRUFBRSxFQUFFO1lBQ2IsYUFBYSxFQUFFLEVBQUU7U0FDcEIsQ0FBQztJQUNOLENBQUM7SUFDRCxLQUFLO1FBQ0QsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFDLENBQUMsRUFBRSxFQUFDO1lBQ2pDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDMUI7SUFDTCxDQUFDO0NBQ0o7QUFFRCxJQUFJLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNKOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2xDeUM7QUFFaEUsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDO0FBQ25CLE1BQU0sVUFBVSxHQUFHLEdBQUcsQ0FBQztBQUN2QixNQUFNLE9BQU8sR0FBRyxDQUFDLENBQUM7QUFDbEIsTUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFDO0FBQ3JCLE1BQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQztBQUNyQixNQUFNLFVBQVU7SUFJWixZQUFZLENBQVEsRUFBRSxDQUFRLEVBQUUsS0FBYSxFQUFDLEtBQWE7UUFDdkQsSUFBSSxNQUFNLEdBQUcsSUFBSSx3RUFBVyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsU0FBUyxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3hFLElBQUksUUFBUSxHQUFHLElBQUksd0VBQVcsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLFVBQVUsR0FBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsQ0FBQyxFQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzFGLElBQUksVUFBVSxHQUFHLElBQUksd0VBQVcsQ0FBQyxDQUFDLEdBQUMsU0FBUyxFQUFDLENBQUMsR0FBQyxVQUFVLEVBQUMsRUFBRSxFQUFDLE1BQU0sRUFBQyxFQUFFLEVBQUMsQ0FBQyxFQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3ZGLElBQUksQ0FBQyxLQUFLLEdBQUUsQ0FBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3ZCLENBQUM7SUFDRCxNQUFNO1FBQ0YsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFFLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQztZQUNwQixJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDO1NBQ2pDO0lBQ0wsQ0FBQztJQUNELEtBQUs7UUFDRCxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUUsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDO1lBQ3BCLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDekI7SUFDTCxDQUFDO0lBQ0QsWUFBWTtRQUNSLE9BQU87WUFDSCxjQUFjLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDMUIsU0FBUyxFQUFFLEVBQUU7WUFDYixhQUFhLEVBQUUsRUFBRTtTQUNwQjtJQUNMLENBQUM7Q0FDSjtBQUVELE1BQU0sZUFBZTtJQUVqQjtRQUNJLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ25CLEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxPQUFPLEVBQUMsQ0FBQyxFQUFFLEVBQUM7WUFDdEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFDLFFBQVEsR0FBRyxTQUFTLEdBQUcsR0FBRyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDeEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxVQUFVLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQywwQkFBMEIsRUFBQyxDQUFDLENBQUMsQ0FBQztZQUM1RCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM1QjtJQUNMLENBQUM7SUFDRCxNQUFNO1FBQ0YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUMsS0FBSyxFQUFFLEVBQUU7WUFDN0IsSUFBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLEdBQUcsRUFBQztnQkFDcEIsSUFBSSxVQUFVLEdBQUcsS0FBSyxHQUFFLENBQUMsQ0FBQztnQkFDMUIsSUFBRyxVQUFVLEdBQUMsQ0FBQztvQkFBRSxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDO2dCQUNyRCxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUMsQ0FBQyxFQUFFLEVBQUM7b0JBQ3BDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUM7aUJBQ3JFO2FBQ0o7UUFDTCxDQUFDLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFDRCxJQUFJLGVBQWUsR0FBRyxJQUFJLGVBQWUsRUFBRSxDQUFDO0FBQ1A7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdEd0I7QUFDSztBQUNGO0FBRWhFLE1BQU0sYUFBYTtJQUtmLFlBQVksV0FBd0IsRUFBRSxZQUF3QixFQUFFLFNBQXFCLEVBQUUsWUFBMEI7UUFDN0csSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7UUFDakMsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7SUFDckMsQ0FBQztJQUNELFNBQVMsQ0FBQyxNQUFlO1FBQ3JCLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFDRCxZQUFZO1FBQ1IsT0FBTztZQUNILGNBQWMsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUNyRCxTQUFTLEVBQUMsRUFBRTtZQUNaLGFBQWEsRUFBQyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztTQUNuRCxDQUFDO0lBQ04sQ0FBQztJQUNELE1BQU0sQ0FBQyxZQUFvQixFQUFFLFNBQWlCO1FBQzFDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxjQUFjLEdBQUcsU0FBUyxDQUFDO0lBQ3pELENBQUM7Q0FDSjtBQUNELElBQUksWUFBWSxHQUFHLElBQUksMkVBQVksQ0FBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsNkJBQTZCLEVBQUMsQ0FBQyxFQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQ25HLElBQUksV0FBVyxHQUFHLElBQUksd0VBQVcsQ0FBQyxFQUFFLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsd0JBQXdCLEVBQUMsQ0FBQyxFQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3hGLElBQUksWUFBWSxHQUFHLElBQUkscUVBQVUsQ0FBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLFdBQVcsRUFBQyxVQUFVLEVBQUUsWUFBWSxFQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3hGLElBQUksU0FBUyxHQUFHLElBQUkscUVBQVUsQ0FBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLFdBQVcsRUFBQyxlQUFlLEVBQUUsWUFBWSxFQUFDLE9BQU8sQ0FBQyxDQUFDO0FBRTFGLElBQUksYUFBYSxHQUFHLElBQUksYUFBYSxDQUFDLFdBQVcsRUFBQyxZQUFZLEVBQUMsU0FBUyxFQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ2pFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2Q3NCO0FBQ2xCO0FBQ21CO0FBQ2dCO0FBQ0c7QUFDbEM7QUFDSTtBQUNXO0FBRTdDLE1BQU0sS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFDOUMsTUFBTSxHQUFHLEdBQUcsSUFBSSxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUMxQyxNQUFNLEdBQUcsR0FBRyxJQUFJLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBQzFDLE1BQU0sV0FBVyxHQUFHLElBQUksS0FBSyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7QUFFakUsTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDO0FBQ1IsTUFBTSxTQUFVLFNBQVEsc0RBQUs7SUFhaEM7UUFDSSxLQUFLLEVBQUUsQ0FBQztRQVhaLFNBQUksR0FBRyw2Q0FBSSxDQUFDO1FBQ1osVUFBSyxHQUFHLHdEQUFlLENBQUM7UUFDeEIsV0FBTSxHQUFHLDJDQUFNLENBQUM7UUFJaEIsVUFBSyxHQUFHLHlDQUFLLENBQUM7UUFFZCxrQkFBYSxHQUFHLHlEQUFhLENBQUM7UUFJMUIsYUFBYTtRQUNiLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNuQixXQUFXLENBQUMsSUFBSSxHQUFFLElBQUksQ0FBQztRQUN2QixJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsR0FBQyxHQUFHLEdBQUMsSUFBSSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDckIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDdEIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFFbkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLHFFQUFVLENBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUMsU0FBUyxHQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxFQUFFLEVBQUUsWUFBWSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzlHLElBQUksRUFBRSxHQUFHLElBQUksd0VBQVcsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsZ0NBQWdDLEVBQUMsQ0FBQyxFQUFDLFlBQVksQ0FBQyxDQUFDO1FBRXRGLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQ2pELEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyx3RUFBK0IsRUFBQyxDQUFDLEVBQUUsRUFBQztZQUM5QyxJQUFJLElBQUksR0FBRyxpRUFBd0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2QyxJQUFJLENBQUMsUUFBUSxDQUNULElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxjQUFjLENBQUMsRUFDbkMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUM5QixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsYUFBYSxDQUFDLENBQ3JDLENBQUM7U0FDTDtRQUVELElBQUksQ0FBQyxRQUFRLENBQ1QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQyxjQUFjLENBQUMsRUFDMUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFDckMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FDNUMsQ0FBQztRQUVGLHNCQUFzQjtRQUN0QixJQUFJLEVBQUMsbUVBQXVCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLFFBQVEsQ0FDVCxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRSxDQUFDLGNBQWMsQ0FBQyxFQUNqRCxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUM1QyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUNuRCxDQUFDO0lBQ04sQ0FBQztJQUVELE1BQU0sQ0FBQyxJQUFZLEVBQUUsU0FBaUI7UUFDbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLEtBQUssRUFBQztZQUM3QixJQUFJLENBQUMsR0FBRyxJQUFJLFNBQVM7WUFDckIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUMsRUFBRTtnQkFDekMsT0FBTyxHQUFHLENBQUMsSUFBSSxLQUFLLFFBQVEsQ0FBQztZQUM3QixDQUFDLENBQUMsQ0FBQztZQUVQLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFDLEVBQUU7Z0JBQ3hDLE9BQU8sR0FBRyxDQUFDLElBQUksS0FBSyxNQUFNLENBQUM7WUFDM0IsQ0FBQyxDQUFDLENBQUM7WUFDUCxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBQyxFQUFFO2dCQUM3QyxPQUFPLEdBQUcsQ0FBQyxJQUFJLEtBQUssWUFBWSxDQUFDO1lBQ3JDLENBQUMsQ0FBQztZQUNGLElBQUcsSUFBSSxDQUFDLEdBQUcsSUFBRSxJQUFJLENBQUMsSUFBSSxFQUFDO2dCQUNuQixJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQ3RCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ3JCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRSxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDOUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO2lCQUNoRDtnQkFDRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQ3pDLElBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssTUFBTSxFQUFDO3dCQUMvQixLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTs0QkFDbEMsSUFBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUM7Z0NBQ3hDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO2dDQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO2dDQUMxQixNQUFNOzZCQUNUO3lCQUNKO3dCQUNELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFOzRCQUN4QyxJQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBRyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsRUFBQztnQ0FDbEUsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQUUsR0FBQyxDQUFDLENBQUMsQ0FBQztnQ0FDM0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEdBQUcsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7Z0NBQ2xFLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO2dDQUNsQixLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7Z0NBQ2IsTUFBTTs2QkFDVDt5QkFDSjt3QkFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTs0QkFDN0IsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO3dCQUNsQixDQUFDLENBQUMsQ0FBQzt3QkFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUMsU0FBUyxDQUFDLENBQUM7d0JBQ3ZDLElBQUcsSUFBSSxDQUFDLFFBQVEsS0FBRyxPQUFPLEVBQUU7NEJBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7eUJBQ25COzZCQUNJLElBQUcsSUFBSSxDQUFDLFNBQVMsSUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUM5RyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUMsU0FBUyxDQUFDLENBQUM7d0JBQzNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQzt3QkFDM0IsSUFBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFFLElBQUksQ0FBQyxTQUFTLEVBQUM7NEJBQ3RHLElBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQUUsR0FBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRTtnQ0FDdEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDOzRCQUMxRCxxQkFBcUI7NEJBQ3JCLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDOzRCQUNuQyxlQUFlOzRCQUNmLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxFQUFFLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDOzRCQUNuRix3QkFBd0I7NEJBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDOzRCQUVyQixhQUFhOzRCQUNiLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQzs0QkFDcEIsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDOzRCQUNYLFVBQVUsQ0FBQztnQ0FDUCxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7NEJBQ2IsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO3lCQUViO3FCQUNKOzt3QkFFRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUMsU0FBUyxDQUFDLENBQUM7aUJBQzlDO2dCQUNELElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDdkI7U0FDSjthQUNJLElBQUcsSUFBSSxDQUFDLFFBQVEsRUFBQztZQUNsQixJQUFHLElBQUksQ0FBQyxRQUFRLEtBQUssT0FBTyxJQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBRSxJQUFJLElBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFDO2dCQUM5RyxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztnQkFDdEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3BDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQzthQUNyQjtTQUNKO2FBQ0ksSUFBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUM7WUFDaEIsSUFBRyxJQUFJLENBQUMsUUFBUSxLQUFLLE9BQU87Z0JBQ3hCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1NBQ3pCO1FBQ0QsT0FBTyxDQUFDLENBQUM7SUFDYixDQUFDO0lBQ0QsVUFBVTtRQUNOLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNuQixXQUFXLENBQUMsSUFBSSxHQUFFLElBQUksQ0FBQztRQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN2QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixLQUFLLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3RDLEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUMsQ0FBQyxFQUFFLEVBQUM7WUFDekMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDbEM7UUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzdCLENBQUM7Q0FDSjtBQUVELElBQUksU0FBUyxHQUFHLElBQUksU0FBUyxFQUFFLENBQUM7QUFDYjs7Ozs7Ozs7Ozs7Ozs7OztBQzVLbkIsTUFBTSxLQUFLO0lBR1A7UUFDSSxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztRQUNuQixJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBQ0QsZUFBZSxDQUFDLEtBQWE7UUFDekIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7SUFDOUIsQ0FBQztJQUNELGVBQWU7UUFDWCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDN0IsQ0FBQztJQUNELFlBQVk7UUFDUixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUNELFlBQVksQ0FBQyxTQUFpQjtRQUMxQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUMvQixDQUFDO0NBQ0o7QUFFRCxJQUFJLEtBQUssR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO0FBQ0g7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0QnVCO0FBQ29CO0FBQ0c7QUFDcEM7QUFDL0IsTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDO0FBQ2YsTUFBTSxVQUFXLFNBQVEsc0RBQUs7SUFPMUI7UUFDSSxLQUFLLEVBQUUsQ0FBQztRQUpaLFdBQU0sR0FBRywyQ0FBTSxDQUFDO1FBS1osSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLEdBQUMsR0FBRyxHQUFDLElBQUksQ0FBQztRQUN6QixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxVQUFVLEdBQUUsSUFBSSx3RUFBVyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxnQ0FBZ0MsRUFBQyxDQUFDLEVBQUMsWUFBWSxDQUFDLENBQUM7UUFDOUYsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLHdFQUFXLENBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLHVCQUF1QixFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQztRQUM1RSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksMkVBQVksQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxhQUFhLENBQUMsQ0FBQztRQUVwRSxJQUFJLFlBQVksR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1FBQ3hGLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBQ0QsTUFBTSxDQUFDLElBQVksRUFBRSxTQUFpQjtRQUNsQyxJQUFJLENBQUMsR0FBRyxJQUFJLFNBQVMsQ0FBQztRQUN0QixJQUFHLElBQUksQ0FBQyxHQUFHLElBQUUsSUFBSSxDQUFDLElBQUksRUFBQztZQUNuQixJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUN4QjtRQUNELElBQUcsSUFBSSxDQUFDLFFBQVEsS0FBSyxPQUFPLElBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFFLElBQUksSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRTtZQUNqRyxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztZQUNuQixPQUFPLENBQUMsQ0FBQztTQUNaO1FBRUQsT0FBTyxDQUFDLENBQUM7SUFDYixDQUFDO0NBQ0o7QUFFRCxJQUFJLFVBQVUsR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFDO0FBQ2Q7Ozs7Ozs7VUN4Q3BCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7O0FDTitDO0FBQ087QUFDSztBQUNqQjtBQUNDO0FBRTNDLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFzQixDQUFDO0FBQ3RFLElBQUksTUFBTSxHQUFHLElBQUksK0RBQVEsQ0FBQyxNQUFNLENBQUM7QUFDakMsSUFBSSxTQUFTLEdBQUcsSUFBSSxvRUFBWSxFQUFFLENBQUM7QUFDbkMsU0FBUyxDQUFDLFFBQVEsQ0FBQyx3REFBVSxDQUFDLENBQUM7QUFDL0IsU0FBUyxDQUFDLFFBQVEsQ0FBQyxzREFBUyxDQUFDLENBQUM7QUFDOUIsSUFBSSxNQUFNLEdBQUcsSUFBSSxtREFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ2pDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWVrMS8uL3NyYy9FbmdpbmUvQnV0dG9uT2JqZWN0L0J1dHRvbk9iamVjdC50cyIsIndlYnBhY2s6Ly93ZWVrMS8uL3NyYy9FbmdpbmUvQ29yZS9HYW1lLnRzIiwid2VicGFjazovL3dlZWsxLy4vc3JjL0VuZ2luZS9HYW1lT2JqZWN0L0dhbWVPYmplY3QudHMiLCJ3ZWJwYWNrOi8vd2VlazEvLi9zcmMvRW5naW5lL0ltYWdlT2JqZWN0L0ltYWdlT2JqZWN0LnRzIiwid2VicGFjazovL3dlZWsxLy4vc3JjL0VuZ2luZS9SZW5kZXJlci9SZW5kZXJlci50cyIsIndlYnBhY2s6Ly93ZWVrMS8uL3NyYy9FbmdpbmUvU2NlbmUvU2NlbmUudHMiLCJ3ZWJwYWNrOi8vd2VlazEvLi9zcmMvRW5naW5lL1NjZW5lL1NjZW5lTWFuYWdlci50cyIsIndlYnBhY2s6Ly93ZWVrMS8uL3NyYy9FbmdpbmUvU3ByaXRlL1Nwcml0ZS50cyIsIndlYnBhY2s6Ly93ZWVrMS8uL3NyYy9FbmdpbmUvVGV4dE9iamVjdC9UZXh0T2JqZWN0LnRzIiwid2VicGFjazovL3dlZWsxLy4vc3JjL2dhbWUvQmlyZC50cyIsIndlYnBhY2s6Ly93ZWVrMS8uL3NyYy9nYW1lL0dyb3VuZC50cyIsIndlYnBhY2s6Ly93ZWVrMS8uL3NyYy9nYW1lL1BhaXJPZlBpcGUudHMiLCJ3ZWJwYWNrOi8vd2VlazEvLi9zcmMvZ2FtZS9QYW5lbEdhbWVPdmVyLnRzIiwid2VicGFjazovL3dlZWsxLy4vc3JjL2dhbWUvUGxheVNjZW5lLnRzIiwid2VicGFjazovL3dlZWsxLy4vc3JjL2dhbWUvU2NvcmUudHMiLCJ3ZWJwYWNrOi8vd2VlazEvLi9zcmMvZ2FtZS9TdGFydFNjZW5lLnRzIiwid2VicGFjazovL3dlZWsxL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlZWsxL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWVrMS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlZWsxL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VlazEvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW1hZ2VPYmplY3R9IGZyb20gXCIuLi9JbWFnZU9iamVjdC9JbWFnZU9iamVjdFwiO1xyXG5leHBvcnQgY2xhc3MgQnV0dG9uT2JqZWN0IGV4dGVuZHMgSW1hZ2VPYmplY3R7XHJcbiAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsaW1hZ2U6IHN0cmluZywgZGVncmVlczogbnVtYmVyLCBuYW1lOiBzdHJpbmcpe1xyXG4gICAgICAgIHN1cGVyKHgsIHksIHdpZHRoLCBoZWlnaHQsaW1hZ2UsIGRlZ3JlZXMsIG5hbWUpO1xyXG4gICAgfVxyXG4gICAgaXNJbnNpZGUocG9zOiBBcnJheTxudW1iZXI+KXtcclxuICAgICAgICBpZihwb3MubGVuZ3RoIDwgMikgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIHJldHVybiBwb3NbMF0gPiB0aGlzLnggJiYgcG9zWzBdIDwgdGhpcy54K3RoaXMud2lkdGggJiYgcG9zWzFdIDwgdGhpcy55K3RoaXMuaGVpZ2h0ICYmIHBvc1sxXSA+IHRoaXMueTtcclxuICAgIH0gICAgXHJcbn0iLCJpbXBvcnQgeyBTY2VuZU1hbmFnZXIgfSBmcm9tIFwiLi4vU2NlbmUvU2NlbmVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFJlbmRlcmVyIH0gZnJvbSBcIi4uL1JlbmRlcmVyL1JlbmRlcmVyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgR2FtZXtcclxuICAgIHNjZW5lTWFuYWdlcjogU2NlbmVNYW5hZ2VyO1xyXG4gICAgbGFzdFRpbWU6IG51bWJlciB8IG51bGw7XHJcbiAgICBjb25zdHJ1Y3RvcihzY2VuZU1hbmFnZXI6IFNjZW5lTWFuYWdlcil7XHJcbiAgICAgICAgdGhpcy5zY2VuZU1hbmFnZXIgPSBzY2VuZU1hbmFnZXI7XHJcbiAgICAgICAgdGhpcy5sYXN0VGltZSA9IG51bGw7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHN0YXJ0KHJlbmRlcjogUmVuZGVyZXIpe1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLChlKT0+dGhpcy5zY2VuZU1hbmFnZXIuc2NlbmVzW3RoaXMuc2NlbmVNYW5hZ2VyLmN1cnJlbnRTY2VuZV0ub25LZXlEb3duKGUpKTtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsKGUpPT50aGlzLnNjZW5lTWFuYWdlci5zY2VuZXNbdGhpcy5zY2VuZU1hbmFnZXIuY3VycmVudFNjZW5lXS5vbktleVVwKCkpO1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsKGUpPT50aGlzLnNjZW5lTWFuYWdlci5zY2VuZXNbdGhpcy5zY2VuZU1hbmFnZXIuY3VycmVudFNjZW5lXS5vbk1vdXNlRG93bihlLHJlbmRlci5jYW52YXMpKTtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywoZSk9PnRoaXMuc2NlbmVNYW5hZ2VyLnNjZW5lc1t0aGlzLnNjZW5lTWFuYWdlci5jdXJyZW50U2NlbmVdLm9uTW91c2VVcCgpKTtcclxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCk9PnRoaXMubG9vcChyZW5kZXIpKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgbG9vcChyZW5kZXI6IFJlbmRlcmVyKXtcclxuICAgICAgICB2YXIgaW5kZXhTY2VuZSA9IHRoaXMuc2NlbmVNYW5hZ2VyLmN1cnJlbnRTY2VuZTtcclxuICAgICAgICBjb25zdCB0aW1lID0gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpO1xyXG4gICAgICAgIGlmKHRoaXMubGFzdFRpbWUgPT0gbnVsbCl7XHJcbiAgICAgICAgICAgIGluZGV4U2NlbmUgPSB0aGlzLnNjZW5lTWFuYWdlci5zY2VuZXNbdGhpcy5zY2VuZU1hbmFnZXIuY3VycmVudFNjZW5lXS51cGRhdGUodGltZSwgMCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2NlbmVNYW5hZ2VyLnNjZW5lc1t0aGlzLnNjZW5lTWFuYWdlci5jdXJyZW50U2NlbmVdLnJlbmRlcihyZW5kZXIpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgY29uc3QgZGVsdGEgPSB0aW1lIC0gdGhpcy5sYXN0VGltZTtcclxuICAgICAgICAgICAgaW5kZXhTY2VuZSA9IHRoaXMuc2NlbmVNYW5hZ2VyLnNjZW5lc1t0aGlzLnNjZW5lTWFuYWdlci5jdXJyZW50U2NlbmVdLnVwZGF0ZSh0aW1lLGRlbHRhKTtcclxuICAgICAgICAgICAgdGhpcy5zY2VuZU1hbmFnZXIuc2NlbmVzW3RoaXMuc2NlbmVNYW5hZ2VyLmN1cnJlbnRTY2VuZV0ucmVuZGVyKHJlbmRlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGluZGV4U2NlbmUhPXRoaXMuc2NlbmVNYW5hZ2VyLmN1cnJlbnRTY2VuZSl7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKGluZGV4U2NlbmUpO1xyXG4gICAgICAgICAgICB0aGlzLnNjZW5lTWFuYWdlci5zY2VuZXNbaW5kZXhTY2VuZV0ucmVzZXRTY2VuZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxhc3RUaW1lID0gdGltZTtcclxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCk9PnRoaXMubG9vcChyZW5kZXIpKTtcclxuICAgIH1cclxuICAgIGxvYWRTY2VuZShpbmRleFNjZW5lOiBudW1iZXIpe1xyXG4gICAgICAgIHRoaXMuc2NlbmVNYW5hZ2VyLmN1cnJlbnRTY2VuZSA9IGluZGV4U2NlbmU7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgY2xhc3MgR2FtZU9iamVjdHtcclxuICAgIHg6IG51bWJlcjtcclxuICAgIHk6IG51bWJlcjtcclxuICAgIHdpZHRoOiBudW1iZXI7XHJcbiAgICBoZWlnaHQ6IG51bWJlcjtcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIGFjdGl2ZTogYm9vbGVhbjtcclxuICAgIGRlZmF1bHRQb3NpdGlvbjogQXJyYXk8bnVtYmVyPjtcclxuICAgIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgbmFtZTogc3RyaW5nLCBhY3RpdmUgPSB0cnVlKSB7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcclxuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMuYWN0aXZlID0gYWN0aXZlO1xyXG4gICAgICAgIHRoaXMuZGVmYXVsdFBvc2l0aW9uID0gW3gseV07XHJcbiAgICB9XHJcbiAgICByZXNldCgpe1xyXG4gICAgICAgIHRoaXMueCA9IHRoaXMuZGVmYXVsdFBvc2l0aW9uWzBdO1xyXG4gICAgICAgIHRoaXMueSA9IHRoaXMuZGVmYXVsdFBvc2l0aW9uWzFdO1xyXG4gICAgfVxyXG4gICAgc2V0QWN0aXZlKGFjdGl2ZTogYm9vbGVhbil7XHJcbiAgICAgICAgdGhpcy5hY3RpdmUgPSBhY3RpdmU7XHJcbiAgICB9XHJcbiAgICBnZXRBY3RpdmUoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5hY3RpdmU7XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IHtHYW1lT2JqZWN0fSBmcm9tIFwiLi4vR2FtZU9iamVjdC9HYW1lT2JqZWN0XCJcclxuZXhwb3J0IGNsYXNzIEltYWdlT2JqZWN0IGV4dGVuZHMgR2FtZU9iamVjdHtcclxuICAgIGltYWdlOiBzdHJpbmc7XHJcbiAgICBkZWdyZWVzOiBudW1iZXI7XHJcbiAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsaW1hZ2U6IHN0cmluZywgZGVncmVlczogbnVtYmVyLCBuYW1lOiBzdHJpbmcpe1xyXG4gICAgICAgIHN1cGVyKHgsIHksIHdpZHRoLCBoZWlnaHQsbmFtZSk7XHJcbiAgICAgICAgdGhpcy5pbWFnZSA9IGltYWdlO1xyXG4gICAgICAgIHRoaXMuZGVncmVlcyA9IGRlZ3JlZXM7XHJcbiAgICB9XHJcbiAgICB1cGRhdGUodGltZTogbnVtYmVyLCBkZWx0YVRpbWU6bnVtYmVyKXt9XHJcbn0iLCJpbXBvcnQgeyBJbWFnZU9iamVjdCB9IGZyb20gXCIuLi9JbWFnZU9iamVjdC9JbWFnZU9iamVjdFwiO1xyXG5pbXBvcnQgeyBTcHJpdGUgfSBmcm9tIFwiLi4vU3ByaXRlL1Nwcml0ZVwiO1xyXG5pbXBvcnQgeyBUZXh0T2JqZWN0IH0gZnJvbSBcIi4uL1RleHRPYmplY3QvVGV4dE9iamVjdFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFJlbmRlcmVye1xyXG4gICAgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcclxuICAgIGNvbnN0cnVjdG9yKGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQpe1xyXG4gICAgICAgIHRoaXMuY2FudmFzID0gY2FudmFzO1xyXG4gICAgfVxyXG4gICAgZHJhd0ltYWdlKGltYWdlT2JqZWN0OiBJbWFnZU9iamVjdCl7XHJcbiAgICAgICAgY29uc3QgY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgICAgICB2YXIgaW1nID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgaW1nLnNyYyA9IGltYWdlT2JqZWN0LmltYWdlO1xyXG4gICAgICAgIGlmKGN0eCE9bnVsbCl7XHJcbiAgICAgICAgICAgIGN0eC5zYXZlKCk7XHJcbiAgICAgICAgICAgIGN0eC50cmFuc2xhdGUoaW1hZ2VPYmplY3QueCArIGltYWdlT2JqZWN0LndpZHRoLzIsaW1hZ2VPYmplY3QueSArIGltYWdlT2JqZWN0LmhlaWdodC8yKVxyXG4gICAgICAgICAgICBjdHgucm90YXRlKGltYWdlT2JqZWN0LmRlZ3JlZXMqTWF0aC5QSS8xODApO1xyXG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKGltZywtaW1hZ2VPYmplY3Qud2lkdGgvMiwgLWltYWdlT2JqZWN0LmhlaWdodC8yLGltYWdlT2JqZWN0LndpZHRoLGltYWdlT2JqZWN0LmhlaWdodCk7XHJcbiAgICAgICAgICAgIGN0eC5yZXN0b3JlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZHJhd1Nwcml0ZShzcHJpdGU6IFNwcml0ZSl7XHJcbiAgICAgICAgY29uc3QgY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgICAgICB2YXIgaW1nID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgaWYoY3R4IT1udWxsKXtcclxuICAgICAgICAgICAgaW1nLnNyYyA9IHNwcml0ZS5pbWFnZXNbc3ByaXRlLmZhbWVDdXJyZW50XTtcclxuICAgICAgICAgICAgLy8gY3R4LmNsZWFyUmVjdCgwLCAwLCB3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcclxuICAgICAgICAgICAgY3R4LnNhdmUoKTtcclxuICAgICAgICAgICAgY3R4LnRyYW5zbGF0ZShzcHJpdGUueCArIHNwcml0ZS53aWR0aC8yLHNwcml0ZS55ICsgc3ByaXRlLmhlaWdodC8yKVxyXG4gICAgICAgICAgICBjdHgucm90YXRlKHNwcml0ZS5kZWdyZWVzKk1hdGguUEkvMTgwKTtcclxuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShpbWcsLXNwcml0ZS53aWR0aC8yLCAtc3ByaXRlLmhlaWdodC8yLHNwcml0ZS53aWR0aCxzcHJpdGUuaGVpZ2h0KTtcclxuICAgICAgICAgICAgY3R4LnJlc3RvcmUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBkcmF3VGV4dCh0ZXh0OiBUZXh0T2JqZWN0KXtcclxuICAgICAgICBjb25zdCBjdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgICAgIGlmKGN0eCE9bnVsbCl7XHJcbiAgICAgICAgICAgIGN0eC5mb250ID0gdGV4dC5mb250O1xyXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gdGV4dC5jb2xvcjtcclxuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KHRleHQuY29udGVudCx0ZXh0LngsdGV4dC55KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBJbWFnZU9iamVjdCB9IGZyb20gXCIuLi9JbWFnZU9iamVjdC9JbWFnZU9iamVjdFwiO1xyXG5pbXBvcnQgeyBTcHJpdGUgfSBmcm9tIFwiLi4vU3ByaXRlL1Nwcml0ZVwiO1xyXG5pbXBvcnQgeyBUZXh0T2JqZWN0IH0gZnJvbSBcIi4uL1RleHRPYmplY3QvVGV4dE9iamVjdFwiO1xyXG5pbXBvcnQge1JlbmRlcmVyfSBmcm9tIFwiLi4vUmVuZGVyZXIvUmVuZGVyZXJcIjtcclxuaW1wb3J0IHtHYW1lT2JqZWN0fSBmcm9tIFwiLi4vR2FtZU9iamVjdC9HYW1lT2JqZWN0XCI7XHJcbmV4cG9ydCBjbGFzcyBTY2VuZXtcclxuICAgIGltYWdlT2JqZWN0czogSW1hZ2VPYmplY3RbXTtcclxuICAgIHNwcml0ZXM6IFNwcml0ZVtdO1xyXG4gICAgdGV4dE9iamVjdHM6IFRleHRPYmplY3RbXTsgXHJcbiAgICBpbnB1dEtleSA6IFN0cmluZztcclxuICAgIG1vdXNlRXZlbnQgOiBBcnJheTxudW1iZXI+IHwgbnVsbDtcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgdGhpcy5pbWFnZU9iamVjdHMgPSBbXTtcclxuICAgICAgICB0aGlzLnNwcml0ZXMgPSBbXTtcclxuICAgICAgICB0aGlzLnRleHRPYmplY3RzID0gW107XHJcbiAgICAgICAgdGhpcy5pbnB1dEtleSA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5tb3VzZUV2ZW50ID0gbnVsbDtcclxuICAgIH1cclxuICAgIHJlc2V0U2NlbmUoKXtcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5pbWFnZU9iamVjdHMubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIHRoaXMuaW1hZ2VPYmplY3RzW2ldLnJlc2V0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDx0aGlzLnNwcml0ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5zcHJpdGVzW2ldLnJlc2V0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaW5wdXRLZXkgPSBcIlwiO1xyXG4gICAgfVxyXG4gICAgYWRkQ2hpbGQoaW1hZ2VPYmplY3RzOiBJbWFnZU9iamVjdFtdLHNwcml0ZXM6IFNwcml0ZVtdLCB0ZXh0T2JqZWN0czogVGV4dE9iamVjdFtdKXtcclxuICAgICAgICBpbWFnZU9iamVjdHMubWFwKGltYWdlT2JqZWN0ID0+IHRoaXMuaW1hZ2VPYmplY3RzLnB1c2goaW1hZ2VPYmplY3QpKTtcclxuICAgICAgICBzcHJpdGVzLm1hcChzcHJpdGUgPT4gdGhpcy5zcHJpdGVzLnB1c2goc3ByaXRlKSk7XHJcbiAgICAgICAgdGV4dE9iamVjdHMubWFwKHRleHRPYmplY3QgPT4gdGhpcy50ZXh0T2JqZWN0cy5wdXNoKHRleHRPYmplY3QpKTtcclxuICAgIH1cclxuICAgIHJlbW92ZUNoaWxkKGltYWdlT2JqZWN0czogSW1hZ2VPYmplY3RbXSxzcHJpdGVzOiBTcHJpdGVbXSl7XHJcbiAgICAgICAgaW1hZ2VPYmplY3RzLm1hcChpbWFnZU9iamVjdCA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaW1hZ2VPYmplY3RzID0gdGhpcy5pbWFnZU9iamVjdHMuZmlsdGVyKChpbWIpPT57XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaW1iIT0gaW1hZ2VPYmplY3Q7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgICAgICBzcHJpdGVzLm1hcChzcHJpdGUgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNwcml0ZXMgPSB0aGlzLnNwcml0ZXMuZmlsdGVyKChzcHQpPT57XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3B0IT0gc3ByaXRlO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKHJlbmRlcjogUmVuZGVyZXIpe1xyXG4gICAgICAgIHRoaXMuaW1hZ2VPYmplY3RzLm1hcCgoaW1hZ2VPYmplY3QpPT57XHJcbiAgICAgICAgICAgIGlmKGltYWdlT2JqZWN0LmdldEFjdGl2ZSgpKVxyXG4gICAgICAgICAgICAgICAgcmVuZGVyLmRyYXdJbWFnZShpbWFnZU9iamVjdCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLnNwcml0ZXMubWFwKChzcHJpdGUpPT57XHJcbiAgICAgICAgICAgIGlmKHNwcml0ZS5nZXRBY3RpdmUoKSlcclxuICAgICAgICAgICAgICAgIHJlbmRlci5kcmF3U3ByaXRlKHNwcml0ZSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLnRleHRPYmplY3RzLm1hcCgodHh0KT0+e1xyXG4gICAgICAgICAgICBpZih0eHQuZ2V0QWN0aXZlKCkpXHJcbiAgICAgICAgICAgICAgICByZW5kZXIuZHJhd1RleHQodHh0KTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgLy8geHUgbHkgbG9naWNcclxuICAgIHVwZGF0ZSh0aW1lOiBudW1iZXIsIGRlbHRhOiBudW1iZXIpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8dGhpcy5pbWFnZU9iamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5pbWFnZU9iamVjdHNbaV0udXBkYXRlKHRpbWUsIGRlbHRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPHRoaXMuc3ByaXRlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLnNwcml0ZXNbaV0udXBkYXRlKHRpbWUsIGRlbHRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIDE7XHJcbiAgICB9XHJcbiAgICBvbktleURvd24oZTogS2V5Ym9hcmRFdmVudCl7XHJcbiAgICAgICAgdGhpcy5pbnB1dEtleSA9IGUuY29kZTtcclxuICAgIH1cclxuICAgIG9uS2V5VXAoKXtcclxuICAgICAgICB0aGlzLmlucHV0S2V5ID0gXCJcIjtcclxuICAgIH1cclxuICAgIG9uTW91c2VEb3duKGU6IE1vdXNlRXZlbnQsIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQpIHtcclxuICAgICAgICB2YXIgcmVjdCA9IGNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICB2YXIgbW91c2VYID0gZS5jbGllbnRYIC0gcmVjdC5sZWZ0O1xyXG4gICAgICAgIHZhciBtb3VzZVkgPSBlLmNsaWVudFkgLSByZWN0LnRvcDsgICAgXHJcbiAgICAgICAgdGhpcy5tb3VzZUV2ZW50ID0gW21vdXNlWCwgbW91c2VZXTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm1vdXNlRXZlbnQpO1xyXG4gICAgfVxyXG4gICAgb25Nb3VzZVVwKCkge1xyXG4gICAgICAgIHRoaXMubW91c2VFdmVudCA9IG51bGw7XHJcbiAgICB9XHJcbiAgICBDb2xsaXNpb24ob2JqMSA6IEdhbWVPYmplY3QsIG9iajIgOiBHYW1lT2JqZWN0KXtcclxuICAgICAgICBpZihvYmoxLngrIG9iajEud2lkdGg+PW9iajIueCAmJiBvYmoxLnggPD0gb2JqMi54ICsgb2JqMi53aWR0aCl7XHJcbiAgICAgICAgICAgIGlmKG9iajEueSsgb2JqMS5oZWlnaHQ+PW9iajIueSAmJiBvYmoxLnkgPD0gb2JqMi55ICsgb2JqMi5oZWlnaHQpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgU2NlbmUgfSBmcm9tIFwiLi9TY2VuZVwiO1xyXG5leHBvcnQgY2xhc3MgU2NlbmVNYW5hZ2VyIHtcclxuICAgIHNjZW5lczogU2NlbmVbXTtcclxuICAgIGN1cnJlbnRTY2VuZTogbnVtYmVyO1xyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMuc2NlbmVzID0gW107XHJcbiAgICAgICAgdGhpcy5jdXJyZW50U2NlbmUgPSAwO1xyXG4gICAgfVxyXG4gICAgYWRkU2NlbmUoc2NlbmU6IFNjZW5lKXtcclxuICAgICAgICB0aGlzLnNjZW5lcy5wdXNoKHNjZW5lKVxyXG4gICAgfVxyXG4gICAgdXBkYXRlKCl7fVxyXG4gICAgcmVuZGVyKCl7fVxyXG59IiwiaW1wb3J0IHtHYW1lT2JqZWN0fSBmcm9tIFwiLi4vR2FtZU9iamVjdC9HYW1lT2JqZWN0XCJcclxuZXhwb3J0IGNsYXNzIFNwcml0ZSBleHRlbmRzIEdhbWVPYmplY3R7XHJcbiAgICBpbWFnZXM6IEFycmF5PHN0cmluZz47XHJcbiAgICBkZWdyZWVzOiBudW1iZXI7XHJcbiAgICBmYW1lQ3VycmVudDogbnVtYmVyO1xyXG4gICAgY29uc3RydWN0b3IoeDogbnVtYmVyLCB5OiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBpbWFnZXM6IEFycmF5PHN0cmluZz4sZGVncmVlczogbnVtYmVyLG5hbWU6IHN0cmluZyl7XHJcbiAgICAgICAgc3VwZXIoeCwgeSwgd2lkdGgsIGhlaWdodCxuYW1lKTtcclxuICAgICAgICB0aGlzLmltYWdlcyA9IGltYWdlcztcclxuICAgICAgICB0aGlzLmRlZ3JlZXMgPSBkZWdyZWVzO1xyXG4gICAgICAgIHRoaXMuZmFtZUN1cnJlbnQgPSAwO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKHRpbWU6IG51bWJlciwgZGVsdGFUaW1lOm51bWJlcil7fVxyXG59IiwiaW1wb3J0IHtHYW1lT2JqZWN0fSBmcm9tIFwiLi4vR2FtZU9iamVjdC9HYW1lT2JqZWN0XCJcclxuZXhwb3J0IGNsYXNzIFRleHRPYmplY3QgZXh0ZW5kcyBHYW1lT2JqZWN0e1xyXG4gICAgY29udGVudDogc3RyaW5nO1xyXG4gICAgZm9udDogc3RyaW5nO1xyXG4gICAgY29sb3I6IHN0cmluZztcclxuICAgIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyLCBuYW1lOiBzdHJpbmcgLCBjb250ZW50OiBzdHJpbmcsIGZvbnQ6IHN0cmluZywgY29sb3IgPSBcImJsYWNrXCIpIHtcclxuICAgICAgICBzdXBlcih4LCB5LCAwLCAwLCBuYW1lKTtcclxuICAgICAgICB0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xyXG4gICAgICAgIHRoaXMuZm9udCA9IGZvbnQ7XHJcbiAgICAgICAgdGhpcy5jb2xvciA9IGNvbG9yO1xyXG4gICAgfVxyXG4gICAgc2V0Q29udGVudChjb250ZW50OiBzdHJpbmcpe1xyXG4gICAgICAgIHRoaXMuY29udGVudCA9IGNvbnRlbnQ7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBTcHJpdGUgfSBmcm9tIFwiLi4vRW5naW5lL1Nwcml0ZS9TcHJpdGVcIjtcclxudmFyIGF1ZGlvID0gbmV3IEF1ZGlvKFwiLi4vYXVkaW8vc3dvb3NoLm1wM1wiKTtcclxuY2xhc3MgQmlyZCBleHRlbmRzIFNwcml0ZSB7XHJcbiAgICBncmF2aXR5IDogbnVtYmVyO1xyXG4gICAgc3BlZWQgOiBudW1iZXI7XHJcbiAgICBwZnM6IG51bWJlcjtcclxuICAgIHJhdGU6IG51bWJlcjtcclxuICAgIGFkdDogbnVtYmVyOyAgXHJcbiAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsaW1hZ2VzOiBBcnJheTxzdHJpbmc+LGRlZ3JlZXM6IG51bWJlcixncmF2aXR5OiBudW1iZXIsc3BlZWQ6IG51bWJlcil7XHJcbiAgICAgICAgc3VwZXIoeCwgeSwgd2lkdGgsIGhlaWdodCxpbWFnZXMsZGVncmVlcyxcImJpcmRcIik7XHJcbiAgICAgICAgdGhpcy5ncmF2aXR5ID0gZ3Jhdml0eTtcclxuICAgICAgICB0aGlzLnNwZWVkID0gc3BlZWQ7XHJcbiAgICAgICAgdGhpcy5wZnMgPSA2MDtcclxuICAgICAgICB0aGlzLnJhdGUgPSAxLjAvdGhpcy5wZnMqMTAwMDtcclxuICAgICAgICB0aGlzLmFkdCA9IDAuMDtcclxuICAgIH1cclxuICAgIHVwZGF0ZSh0aW1lOiBudW1iZXIsIGRlbHRhVGltZTpudW1iZXIpe1xyXG4gICAgICAgIHRoaXMueSArPSB0aGlzLnNwZWVkICsgMC41KnRoaXMuZ3Jhdml0eTtcclxuICAgICAgICBpZih0aGlzLnkgPCAwKVxyXG4gICAgICAgICAgICB0aGlzLnkgPSAwO1xyXG4gICAgICAgIHRoaXMuc3BlZWQgKz0gdGhpcy5ncmF2aXR5O1xyXG4gICAgICAgIHRoaXMuYWR0ICs9IGRlbHRhVGltZVxyXG4gICAgICAgIGlmKHRoaXMuc3BlZWQ+MCl7XHJcbiAgICAgICAgICAgIHRoaXMuZGVncmVlcyArPSAxO1xyXG4gICAgICAgICAgICBpZih0aGlzLmRlZ3JlZXM+MjApIHRoaXMuZGVncmVlcyA9IDIwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLmRlZ3JlZXMgLT0gMTtcclxuICAgICAgICAgICAgaWYodGhpcy5kZWdyZWVzPC0yMCkgdGhpcy5kZWdyZWVzID0gLTIwO1xyXG4gICAgICAgICAgICBpZih0aGlzLmFkdD49dGhpcy5yYXRlKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWR0IC09IHRoaXMucmF0ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmFtZUN1cnJlbnQrPTE7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmZhbWVDdXJyZW50PnRoaXMuaW1hZ2VzLmxlbmd0aC0xKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZhbWVDdXJyZW50ID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih0aGlzLmZhbWVDdXJyZW50PnRoaXMuaW1hZ2VzLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZhbWVDdXJyZW50ID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmbHkoKXtcclxuICAgICAgICBhdWRpby5wbGF5KCk7IFxyXG4gICAgICAgIGF1ZGlvLnBsYXliYWNrUmF0ZSA9IDI7XHJcbiAgICAgICAgdGhpcy5zcGVlZCA9IC01IDtcclxuICAgIH1cclxuICAgIHJlc2V0KCl7XHJcbiAgICAgICAgc3VwZXIucmVzZXQoKTtcclxuICAgICAgICB0aGlzLnNwZWVkID0gMDtcclxuICAgIH1cclxufVxyXG5jb25zdCBpbWdCaXJkID0gW1xyXG4gICAgXCIuLi9JbWFnZXMvYmlyZC9mcmFtZS0xLnBuZ1wiLFxyXG4gICAgXCIuLi9JbWFnZXMvYmlyZC9mcmFtZS0yLnBuZ1wiLFxyXG4gICAgXCIuLi9JbWFnZXMvYmlyZC9mcmFtZS0zLnBuZ1wiLFxyXG4gICAgXCIuLi9JbWFnZXMvYmlyZC9mcmFtZS00LnBuZ1wiLFxyXG4gICAgXCIuLi9JbWFnZXMvYmlyZC9mcmFtZS01LnBuZ1wiLFxyXG4gICAgXCIuLi9JbWFnZXMvYmlyZC9mcmFtZS02LnBuZ1wiLFxyXG4gICAgXCIuLi9JbWFnZXMvYmlyZC9mcmFtZS03LnBuZ1wiLFxyXG4gICAgXCIuLi9JbWFnZXMvYmlyZC9mcmFtZS04LnBuZ1wiLFxyXG5dO1xyXG52YXIgYmlyZCA9IG5ldyBCaXJkKDEwMCwyODAsNTAsNTAsaW1nQmlyZCwwLDAuNSwwLjEpO1xyXG5leHBvcnQgZGVmYXVsdCBiaXJkOyIsImltcG9ydCB7IEltYWdlT2JqZWN0IH0gZnJvbSBcIi4uL0VuZ2luZS9JbWFnZU9iamVjdC9JbWFnZU9iamVjdFwiO1xyXG5cclxuY2xhc3MgR3JvdW5ke1xyXG4gICAgaW1hZ2VzOiBBcnJheTxJbWFnZU9iamVjdD47XHJcbiAgICBzcGVlZDogbnVtYmVyO1xyXG4gICAgY29uc3RydWN0b3Ioc3BlZWQ6IG51bWJlcil7XHJcbiAgICAgICAgdmFyIGltYWdlMSA9IG5ldyBJbWFnZU9iamVjdCgwLDY3MCw2NTAsMTUwLFwiLi4vSW1hZ2VzL2Jhc2UucG5nXCIsMCxcImdyb3VuZFwiKTtcclxuICAgICAgICB2YXIgaW1hZ2UyID0gbmV3IEltYWdlT2JqZWN0KDY0OSw2NzAsNjUwLDE1MCxcIi4uL0ltYWdlcy9iYXNlLnBuZ1wiLDAsXCJncm91bmRcIik7XHJcbiAgICAgICAgdGhpcy5pbWFnZXMgPSBbaW1hZ2UxLGltYWdlMl07XHJcbiAgICAgICAgdGhpcy5zcGVlZCA9IHNwZWVkO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKCl7XHJcbiAgICAgICAgZm9yKHZhciBpPTA7aTx0aGlzLmltYWdlcy5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgdGhpcy5pbWFnZXNbaV0ueCAtPSB0aGlzLnNwZWVkO1xyXG4gICAgICAgICAgICBpZih0aGlzLmltYWdlc1tpXS54IDwgLSAoNjUwKzIwKSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmltYWdlc1tpXS54ID0gdGhpcy5pbWFnZXNbTWF0aC5hYnMoaS0xKV0ueCs2NDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IFxyXG4gICAgfVxyXG4gICAgZ2V0Q29tcG9uZW50KCl7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgXCJpbWFnZU9iamVjdHNcIjogdGhpcy5pbWFnZXMsXHJcbiAgICAgICAgICAgIFwic3ByaXRlc1wiOiBbXSxcclxuICAgICAgICAgICAgXCJ0ZXh0T2JqZWN0c1wiOiBbXVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICByZXNldCgpe1xyXG4gICAgICAgIGZvcih2YXIgaT0wO2k8dGhpcy5pbWFnZXMubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIHRoaXMuaW1hZ2VzW2ldLnJlc2V0KCk7XHJcbiAgICAgICAgfSBcclxuICAgIH1cclxufVxyXG5cclxudmFyIGdyb3VuZCA9IG5ldyBHcm91bmQoMik7XHJcbmV4cG9ydCB7R3JvdW5kLGdyb3VuZH07IiwiaW1wb3J0IHsgSW1hZ2VPYmplY3QgfSBmcm9tIFwiLi4vRW5naW5lL0ltYWdlT2JqZWN0L0ltYWdlT2JqZWN0XCI7XHJcblxyXG5jb25zdCBibGFua3MgPSAyMDA7XHJcbmNvbnN0IHBpcGVIZWlnaHQgPSAzNTA7XHJcbmNvbnN0IG51bVBpcGUgPSA0O1xyXG5jb25zdCBkaXN0YW5jZSA9IDI1MDtcclxuY29uc3QgcGlwZVdpZHRoID0gODA7XHJcbmNsYXNzIFBhaXJPZlBpcGV7XHJcbiAgICBQaXBlczogQXJyYXk8SW1hZ2VPYmplY3Q+O1xyXG4gICAgcHJpdmF0ZSBzcGVlZDogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHg6bnVtYmVyLCB5Om51bWJlciwgaW1hZ2U6IHN0cmluZyxzcGVlZDogbnVtYmVyKXtcclxuICAgICAgICB2YXIgUGlwZVVwID0gbmV3IEltYWdlT2JqZWN0KHgseSxwaXBlV2lkdGgscGlwZUhlaWdodCxpbWFnZSwxODAsXCJwaXBlXCIpO1xyXG4gICAgICAgIHZhciBQaXBlRG93biA9IG5ldyBJbWFnZU9iamVjdCh4LHkrcGlwZUhlaWdodCtibGFua3MscGlwZVdpZHRoLHBpcGVIZWlnaHQsaW1hZ2UsMCxcInBpcGVcIik7XHJcbiAgICAgICAgdmFyIGNoZWNrU2NvcmUgPSBuZXcgSW1hZ2VPYmplY3QoeCtwaXBlV2lkdGgseStwaXBlSGVpZ2h0LDEwLGJsYW5rcyxcIlwiLDAsXCJjaGVja1Njb3JlXCIpO1xyXG4gICAgICAgIHRoaXMuUGlwZXM9IFtQaXBlVXAsUGlwZURvd24sY2hlY2tTY29yZV07XHJcbiAgICAgICAgdGhpcy5zcGVlZCA9IHNwZWVkO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKCl7XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8MztpKyspe1xyXG4gICAgICAgICAgICB0aGlzLlBpcGVzW2ldLnggLT0gdGhpcy5zcGVlZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXNldCgpe1xyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPDM7aSsrKXtcclxuICAgICAgICAgICAgdGhpcy5QaXBlc1tpXS5yZXNldCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdldENvbXBvbmVudCgpe1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIFwiaW1hZ2VPYmplY3RzXCI6IHRoaXMuUGlwZXMsXHJcbiAgICAgICAgICAgIFwic3ByaXRlc1wiOiBbXSxcclxuICAgICAgICAgICAgXCJ0ZXh0T2JqZWN0c1wiOiBbXVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgTGlzdFBhaXJPZlBpcGVze1xyXG4gICAgbGlzdFBpcGU6IFBhaXJPZlBpcGVbXTtcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgdGhpcy5saXN0UGlwZSA9IFtdO1xyXG4gICAgICAgIGZvcih2YXIgaT0wO2k8bnVtUGlwZTtpKyspe1xyXG4gICAgICAgICAgICB2YXIgeCA9IGkqZGlzdGFuY2UgKyBwaXBlV2lkdGggKyA0MDA7XHJcbiAgICAgICAgICAgIHZhciB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICotMjAwKTtcclxuICAgICAgICAgICAgdmFyIHBpcGUgPSBuZXcgUGFpck9mUGlwZSh4LHksXCIuLi9JbWFnZXMvcGlwZS1ncmVlbi5wbmdcIiwyKTtcclxuICAgICAgICAgICAgdGhpcy5saXN0UGlwZS5wdXNoKHBpcGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHVwZGF0ZSgpe1xyXG4gICAgICAgIHRoaXMubGlzdFBpcGUubWFwKChwaXBlLGluZGV4KSA9PntcclxuICAgICAgICAgICAgaWYocGlwZS5QaXBlc1swXS54PC0xMDApe1xyXG4gICAgICAgICAgICAgICAgdmFyIGZyb250SW5kZXggPSBpbmRleCAtMTtcclxuICAgICAgICAgICAgICAgIGlmKGZyb250SW5kZXg8MCkgZnJvbnRJbmRleCA9IHRoaXMubGlzdFBpcGUubGVuZ3RoLTE7XHJcbiAgICAgICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDxwaXBlLlBpcGVzLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIHBpcGUuUGlwZXNbaV0ueCA9IHRoaXMubGlzdFBpcGVbZnJvbnRJbmRleF0uUGlwZXNbaV0ueCArIGRpc3RhbmNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG52YXIgbGlzdFBhaXJPZlBpcGVzID0gbmV3IExpc3RQYWlyT2ZQaXBlcygpO1xyXG5leHBvcnQge1BhaXJPZlBpcGUsIGxpc3RQYWlyT2ZQaXBlc307XHJcbiIsImltcG9ydCB7IFRleHRPYmplY3QgfSBmcm9tICcuLi9FbmdpbmUvVGV4dE9iamVjdC9UZXh0T2JqZWN0JztcclxuaW1wb3J0IHtCdXR0b25PYmplY3QgfSBmcm9tICcuLi9FbmdpbmUvQnV0dG9uT2JqZWN0L0J1dHRvbk9iamVjdCc7XHJcbmltcG9ydCB7IEltYWdlT2JqZWN0IH0gZnJvbSAnLi4vRW5naW5lL0ltYWdlT2JqZWN0L0ltYWdlT2JqZWN0JztcclxuXHJcbmNsYXNzIFBhbmVsR2FtZU92ZXIge1xyXG4gICAgaW1nR2FtZU92ZXI6IEltYWdlT2JqZWN0O1xyXG4gICAgY3VycmVudFNjb3JlOiBUZXh0T2JqZWN0O1xyXG4gICAgaGlnaFNjb3JlOiBUZXh0T2JqZWN0O1xyXG4gICAgcmVwbGF5QnV0dG9uOiBCdXR0b25PYmplY3Q7XHJcbiAgICBjb25zdHJ1Y3RvcihpbWdHYW1lT3ZlcjogSW1hZ2VPYmplY3QsIGN1cnJlbnRTY29yZTogVGV4dE9iamVjdCwgaGlnaFNjb3JlOiBUZXh0T2JqZWN0LCByZXBsYXlCdXR0b246IEJ1dHRvbk9iamVjdCl7XHJcbiAgICAgICAgdGhpcy5pbWdHYW1lT3ZlciA9IGltZ0dhbWVPdmVyO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFNjb3JlID0gY3VycmVudFNjb3JlO1xyXG4gICAgICAgIHRoaXMuaGlnaFNjb3JlID0gaGlnaFNjb3JlO1xyXG4gICAgICAgIHRoaXMucmVwbGF5QnV0dG9uID0gcmVwbGF5QnV0dG9uO1xyXG4gICAgfVxyXG4gICAgc2V0QWN0aXZlKGFjdGl2ZTogYm9vbGVhbil7XHJcbiAgICAgICAgdGhpcy5pbWdHYW1lT3Zlci5zZXRBY3RpdmUoYWN0aXZlKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRTY29yZS5zZXRBY3RpdmUoYWN0aXZlKTtcclxuICAgICAgICB0aGlzLmhpZ2hTY29yZS5zZXRBY3RpdmUoYWN0aXZlKTtcclxuICAgICAgICB0aGlzLnJlcGxheUJ1dHRvbi5zZXRBY3RpdmUoYWN0aXZlKTtcclxuICAgIH1cclxuICAgIGdldENvbXBvbmVudCgpe1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIFwiaW1hZ2VPYmplY3RzXCI6IFt0aGlzLmltZ0dhbWVPdmVyLCB0aGlzLnJlcGxheUJ1dHRvbl0sXHJcbiAgICAgICAgICAgIFwic3ByaXRlc1wiOltdLFxyXG4gICAgICAgICAgICBcInRleHRPYmplY3RzXCI6W3RoaXMuY3VycmVudFNjb3JlLHRoaXMuaGlnaFNjb3JlXVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICB1cGRhdGUoY3VycmVudFNjb3JlOiBudW1iZXIsIGhpZ2hTY29yZTogbnVtYmVyKXtcclxuICAgICAgICB0aGlzLmN1cnJlbnRTY29yZS5zZXRDb250ZW50KFwiU2NvcmU6IFwiICsgY3VycmVudFNjb3JlKTtcclxuICAgICAgICB0aGlzLmhpZ2hTY29yZS5zZXRDb250ZW50KFwiSGlnaCBTY29yZTogXCIgKyBoaWdoU2NvcmUpXHJcbiAgICB9XHJcbn1cclxudmFyIHJlcGxheUJ1dHRvbiA9IG5ldyBCdXR0b25PYmplY3QoMjI1LDUwMCwxNjAsODAsXCIuLi9JbWFnZXMvcmVwbGF5LWJ1dHRvbi5wbmdcIiwwLFwicmVwbGF5QnV0dG9uXCIpO1xyXG52YXIgaW1nR2FtZU92ZXIgPSBuZXcgSW1hZ2VPYmplY3QoNjAsMzAwLDUwMCwxMzAsXCIuLi9JbWFnZXMvZ2FtZW92ZXIucG5nXCIsMCxcImdhbWVPdmVyXCIpO1xyXG52YXIgY3VycmVudFNjb3JlID0gbmV3IFRleHRPYmplY3QoMTEwLDQ3MCxcInNob3dTY29yZVwiLFwiU2NvcmU6IDBcIiwgXCIzMHB4IEFyaWFsXCIsXCJ3aGl0ZVwiKTtcclxudmFyIGhpZ2hTY29yZSA9IG5ldyBUZXh0T2JqZWN0KDMzMCw0NzAsXCJoaWdoU2NvcmVcIixcIkhpZ2ggU2NvcmU6IDBcIiwgXCIzMHB4IEFyaWFsXCIsXCJ3aGl0ZVwiKTtcclxuXHJcbnZhciBwYW5lbEdhbWVPdmVyID0gbmV3IFBhbmVsR2FtZU92ZXIoaW1nR2FtZU92ZXIsY3VycmVudFNjb3JlLGhpZ2hTY29yZSxyZXBsYXlCdXR0b24pO1xyXG5leHBvcnQge3BhbmVsR2FtZU92ZXJ9IiwiaW1wb3J0IHtTY2VuZX0gZnJvbSAnLi4vRW5naW5lL1NjZW5lL1NjZW5lJztcclxuaW1wb3J0IGJpcmQgZnJvbSAnLi9CaXJkJztcclxuaW1wb3J0IHtsaXN0UGFpck9mUGlwZXN9IGZyb20gJy4vUGFpck9mUGlwZSc7XHJcbmltcG9ydCB7IFRleHRPYmplY3QgfSBmcm9tICcuLi9FbmdpbmUvVGV4dE9iamVjdC9UZXh0T2JqZWN0JztcclxuaW1wb3J0IHsgSW1hZ2VPYmplY3QgfSBmcm9tICcuLi9FbmdpbmUvSW1hZ2VPYmplY3QvSW1hZ2VPYmplY3QnO1xyXG5pbXBvcnQge3Njb3JlfSBmcm9tIFwiLi9TY29yZVwiO1xyXG5pbXBvcnQgeyBncm91bmQgfSBmcm9tICcuL0dyb3VuZCc7XHJcbmltcG9ydCB7cGFuZWxHYW1lT3Zlcn0gZnJvbSAnLi9QYW5lbEdhbWVPdmVyJ1xyXG5cclxuY29uc3QgcG9pbnQgPSBuZXcgQXVkaW8oXCIuLi9hdWRpby9wb2ludC5tcDNcIik7XHJcbmNvbnN0IGRpZSA9IG5ldyBBdWRpbyhcIi4uL2F1ZGlvL2RpZS5tcDNcIik7XHJcbmNvbnN0IGhpdCA9IG5ldyBBdWRpbyhcIi4uL2F1ZGlvL2hpdC5tcDNcIik7XHJcbmNvbnN0IGF1ZGlvUGxheWVyID0gbmV3IEF1ZGlvKFwiLi4vYXVkaW8vb3JjaGVzdHJhd2F2LTI2MTU4Lm1wM1wiKTtcclxuXHJcbmNvbnN0IGZwcyA9IDYwO1xyXG5leHBvcnQgY2xhc3MgUGxheVNjZW5lIGV4dGVuZHMgU2NlbmUge1xyXG4gICAgcmF0ZTogbnVtYmVyO1xyXG4gICAgYWR0OiBudW1iZXI7ICAgIC8vYWNjdW11bGF0ZWQgZGVsdGEgdGltZVxyXG4gICAgYmlyZCA9IGJpcmQ7XHJcbiAgICBwaXBlcyA9IGxpc3RQYWlyT2ZQaXBlcztcclxuICAgIGdyb3VuZCA9IGdyb3VuZDtcclxuICAgIGNoZWNrUGlwZTogYm9vbGVhbjtcclxuICAgIHRleHRTY29yZTogVGV4dE9iamVjdDtcclxuICAgIGFkZFNjb3JlOiBudW1iZXIgfCBudWxsO1xyXG4gICAgc2NvcmUgPSBzY29yZTtcclxuICAgIGRlYWRCaXJkOiBib29sZWFuO1xyXG4gICAgcGFuZWxHYW1lT3ZlciA9IHBhbmVsR2FtZU92ZXI7XHJcbiAgICBzdGFydDogYm9vbGVhbjtcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAvLyBwbGF5IGF1ZGlvXHJcbiAgICAgICAgYXVkaW9QbGF5ZXIucGxheSgpO1xyXG4gICAgICAgIGF1ZGlvUGxheWVyLmxvb3AgPXRydWU7XHJcbiAgICAgICAgdGhpcy5yYXRlID0gMS4wL2ZwcyoxMDAwO1xyXG4gICAgICAgIHRoaXMuYWR0ID0gMC4wO1xyXG4gICAgICAgIHRoaXMuY2hlY2tQaXBlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5hZGRTY29yZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5kZWFkQmlyZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc3RhcnQgPSBmYWxzZTsgXHJcblxyXG4gICAgICAgIHRoaXMudGV4dFNjb3JlID0gbmV3IFRleHRPYmplY3QoMTAsMzAsXCJzY29yZVwiLFwiU2NvcmU6IFwiKyB0aGlzLnNjb3JlLmdldEN1cnJlbnRTY29yZSgpLCBcIjE4cHggQXJpYWxcIiwgXCJ3aGl0ZVwiKTtcclxuICAgICAgICB2YXIgYmcgPSBuZXcgSW1hZ2VPYmplY3QoMCwwLDcwMCw4MDAsXCIuLi9JbWFnZXMvYmFja2dyb3VuZC1uaWdodC5wbmdcIiwwLFwiYmFja2dyb3VuZFwiKTtcclxuXHJcbiAgICAgICAgdGhpcy5hZGRDaGlsZChbYmddLFt0aGlzLmJpcmRdLFt0aGlzLnRleHRTY29yZV0pO1xyXG4gICAgICAgIGZvcih2YXIgaT0wO2k8bGlzdFBhaXJPZlBpcGVzLmxpc3RQaXBlLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICB2YXIgcGlwZSA9IGxpc3RQYWlyT2ZQaXBlcy5saXN0UGlwZVtpXTtcclxuICAgICAgICAgICAgdGhpcy5hZGRDaGlsZChcclxuICAgICAgICAgICAgICAgIHBpcGUuZ2V0Q29tcG9uZW50KClbXCJpbWFnZU9iamVjdHNcIl0sXHJcbiAgICAgICAgICAgICAgICBwaXBlLmdldENvbXBvbmVudCgpW1wic3ByaXRlc1wiXSxcclxuICAgICAgICAgICAgICAgIHBpcGUuZ2V0Q29tcG9uZW50KClbXCJ0ZXh0T2JqZWN0c1wiXVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5hZGRDaGlsZChcclxuICAgICAgICAgICAgdGhpcy5ncm91bmQuZ2V0Q29tcG9uZW50KClbXCJpbWFnZU9iamVjdHNcIl0sXHJcbiAgICAgICAgICAgIHRoaXMuZ3JvdW5kLmdldENvbXBvbmVudCgpW1wic3ByaXRlc1wiXSxcclxuICAgICAgICAgICAgdGhpcy5ncm91bmQuZ2V0Q29tcG9uZW50KClbXCJ0ZXh0T2JqZWN0c1wiXVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIGhpZGVuIHBhbmVsR2FtZU92ZXJcclxuICAgICAgICB0aGlzLHBhbmVsR2FtZU92ZXIuc2V0QWN0aXZlKGZhbHNlKTtcclxuICAgICAgICB0aGlzLmFkZENoaWxkKFxyXG4gICAgICAgICAgICB0aGlzLnBhbmVsR2FtZU92ZXIuZ2V0Q29tcG9uZW50KClbXCJpbWFnZU9iamVjdHNcIl0sXHJcbiAgICAgICAgICAgIHRoaXMucGFuZWxHYW1lT3Zlci5nZXRDb21wb25lbnQoKVtcInNwcml0ZXNcIl0sXHJcbiAgICAgICAgICAgIHRoaXMucGFuZWxHYW1lT3Zlci5nZXRDb21wb25lbnQoKVtcInRleHRPYmplY3RzXCJdXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgdXBkYXRlKHRpbWU6IG51bWJlciwgZGVsdGFUaW1lOiBudW1iZXIpIHtcclxuICAgICAgICBpZiggIXRoaXMuZGVhZEJpcmQgJiYgdGhpcy5zdGFydCl7XHJcbiAgICAgICAgICAgIHRoaXMuYWR0ICs9IGRlbHRhVGltZVxyXG4gICAgICAgICAgICB2YXIgZ3JvdW5kID0gdGhpcy5pbWFnZU9iamVjdHMuZmlsdGVyKChpbWIpPT57XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaW1iLm5hbWUgPT09IFwiZ3JvdW5kXCI7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBwaXBlcyA9IHRoaXMuaW1hZ2VPYmplY3RzLmZpbHRlcigoaW1iKT0+e1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGltYi5uYW1lID09PSBcInBpcGVcIjtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB2YXIgY2hlY2tTY29yZSA9IHRoaXMuaW1hZ2VPYmplY3RzLmZpbHRlcigoaW1iKT0+e1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGltYi5uYW1lID09PSBcImNoZWNrU2NvcmVcIjtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgaWYodGhpcy5hZHQ+PXRoaXMucmF0ZSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkdCAtPSB0aGlzLnJhdGU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdyb3VuZC51cGRhdGUoKTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDx0aGlzLmltYWdlT2JqZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2VPYmplY3RzW2ldLnVwZGF0ZSh0aW1lLCBkZWx0YVRpbWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPHRoaXMuc3ByaXRlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuc3ByaXRlc1tpXS5uYW1lID09PSBcImJpcmRcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcih2YXIgaiA9IDA7IGogPCBwaXBlcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5Db2xsaXNpb24ocGlwZXNbal0sdGhpcy5zcHJpdGVzW2ldKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja1BpcGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZ2FtZSBvdmVyIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IGNoZWNrU2NvcmUubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuQ29sbGlzaW9uKGNoZWNrU2NvcmVba10sdGhpcy5zcHJpdGVzW2ldKSYmIHRoaXMuYWRkU2NvcmUgIT0gayl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY29yZS5zZXRDdXJyZW50U2NvcmUodGhpcy5zY29yZS5nZXRDdXJyZW50U2NvcmUoKSsxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRleHRTY29yZS5jb250ZW50ID0gXCJTY29yZTogXCIgKyB0aGlzLnNjb3JlLmdldEN1cnJlbnRTY29yZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkU2NvcmUgPSBrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50LnBsYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBpcGVzLmxpc3RQaXBlLm1hcCgocGlwZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGlwZS51cGRhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlc1tpXS51cGRhdGUodGltZSxkZWx0YVRpbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmlucHV0S2V5PT09XCJTcGFjZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJpcmQuZmx5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzLmNoZWNrUGlwZSYmKCF0aGlzLkNvbGxpc2lvbihncm91bmRbMF0sIHRoaXMuc3ByaXRlc1tpXSkmJiF0aGlzLkNvbGxpc2lvbihncm91bmRbMV0sIHRoaXMuc3ByaXRlc1tpXSkpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVzW2ldLnVwZGF0ZSh0aW1lLGRlbHRhVGltZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidGVzdFwiLCBncm91bmQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuQ29sbGlzaW9uKGdyb3VuZFswXSwgdGhpcy5zcHJpdGVzW2ldKXx8dGhpcy5Db2xsaXNpb24oZ3JvdW5kWzFdLCB0aGlzLnNwcml0ZXNbaV0pfHx0aGlzLmNoZWNrUGlwZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnNjb3JlLmdldEN1cnJlbnRTY29yZSgpPiB0aGlzLnNjb3JlLmdldEhpZ2hTY29yZSgpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NvcmUuc2V0SGlnaFNjb3JlKHRoaXMuc2NvcmUuZ2V0Q3VycmVudFNjb3JlKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2hvdyBwYW5lbEdhbWVPdmVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBhbmVsR2FtZU92ZXIuc2V0QWN0aXZlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdXBkYXRlIHNjb3JlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBhbmVsR2FtZU92ZXIudXBkYXRlKHRoaXMuc2NvcmUuZ2V0Q3VycmVudFNjb3JlKCksIHRoaXMuc2NvcmUuZ2V0SGlnaFNjb3JlKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2V0IHN0YXRlIGJpcmQgaXMgZGllXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlYWRCaXJkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwbGF5IGF1ZGlvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdWRpb1BsYXllci5wYXVzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGl0LnBsYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGllLnBsYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgNTAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVzW2ldLnVwZGF0ZSh0aW1lLGRlbHRhVGltZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBpcGVzLnVwZGF0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodGhpcy5kZWFkQmlyZCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuaW5wdXRLZXkgPT09IFwiRW50ZXJcInx8KHRoaXMubW91c2VFdmVudCE9bnVsbCYmIHRoaXMucGFuZWxHYW1lT3Zlci5yZXBsYXlCdXR0b24uaXNJbnNpZGUodGhpcy5tb3VzZUV2ZW50KSkpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZWFkQmlyZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYW5lbEdhbWVPdmVyLnNldEFjdGl2ZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0U2NlbmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKCF0aGlzLnN0YXJ0KXtcclxuICAgICAgICAgICAgaWYodGhpcy5pbnB1dEtleSA9PT0gXCJTcGFjZVwiKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAxO1xyXG4gICAgfVxyXG4gICAgcmVzZXRTY2VuZSgpe1xyXG4gICAgICAgIGF1ZGlvUGxheWVyLnBsYXkoKTtcclxuICAgICAgICBhdWRpb1BsYXllci5sb29wID10cnVlO1xyXG4gICAgICAgIHRoaXMuY2hlY2tQaXBlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5hZGRTY29yZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5zdGFydCA9IGZhbHNlO1xyXG4gICAgICAgIHN1cGVyLnJlc2V0U2NlbmUoKTtcclxuICAgICAgICB0aGlzLnNjb3JlLnNldEN1cnJlbnRTY29yZSgwKTtcclxuICAgICAgICB0aGlzLmJpcmQucmVzZXQoKTtcclxuICAgICAgICB0aGlzLmdyb3VuZC5yZXNldCgpO1xyXG4gICAgICAgIHRoaXMudGV4dFNjb3JlLnNldENvbnRlbnQoXCJTY29yZTogMFwiKTtcclxuICAgICAgICBmb3IodmFyIGk9MDtpPHRoaXMucGlwZXMubGlzdFBpcGUubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIHRoaXMucGlwZXMubGlzdFBpcGVbaV0ucmVzZXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJyZW5kZXJpbmdcIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbnZhciBwbGF5U2NlbmUgPSBuZXcgUGxheVNjZW5lKCk7XHJcbmV4cG9ydCB7cGxheVNjZW5lfTsiLCJjbGFzcyBTY29yZXtcclxuICAgIHByaXZhdGUgaGlnaFNjb3JlOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIGN1cnJlbnRTY29yZTogbnVtYmVyO1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICB0aGlzLmhpZ2hTY29yZSA9IDA7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50U2NvcmUgPSAwO1xyXG4gICAgfVxyXG4gICAgc2V0Q3VycmVudFNjb3JlKHNjb3JlOiBudW1iZXIpe1xyXG4gICAgICAgIHRoaXMuY3VycmVudFNjb3JlID0gc2NvcmU7XHJcbiAgICB9XHJcbiAgICBnZXRDdXJyZW50U2NvcmUoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50U2NvcmU7XHJcbiAgICB9XHJcbiAgICBnZXRIaWdoU2NvcmUoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5oaWdoU2NvcmU7XHJcbiAgICB9XHJcbiAgICBzZXRIaWdoU2NvcmUoaGlnaFNjb3JlOiBudW1iZXIpe1xyXG4gICAgICAgIHRoaXMuaGlnaFNjb3JlID0gaGlnaFNjb3JlO1xyXG4gICAgfVxyXG59XHJcblxyXG52YXIgc2NvcmUgPSBuZXcgU2NvcmUoKTtcclxuZXhwb3J0IHtzY29yZSxTY29yZX07IiwiaW1wb3J0IHtTY2VuZX0gZnJvbSAnLi4vRW5naW5lL1NjZW5lL1NjZW5lJztcclxuaW1wb3J0IHsgSW1hZ2VPYmplY3QgfSBmcm9tICcuLi9FbmdpbmUvSW1hZ2VPYmplY3QvSW1hZ2VPYmplY3QnO1xyXG5pbXBvcnQgeyBCdXR0b25PYmplY3QgfSBmcm9tICcuLi9FbmdpbmUvQnV0dG9uT2JqZWN0L0J1dHRvbk9iamVjdCc7XHJcbmltcG9ydCB7Z3JvdW5kfSBmcm9tIFwiLi9Hcm91bmRcIlxyXG5jb25zdCBmcHMgPSA2MDtcclxuY2xhc3MgU3RhcnRTY2VuZSBleHRlbmRzIFNjZW5lIHtcclxuICAgIHJhdGU6IG51bWJlcjtcclxuICAgIGFkdDogbnVtYmVyOyAgICAvL2FjY3VtdWxhdGVkIGRlbHRhIHRpbWVcclxuICAgIGJhY2tncm91bmQ6IEltYWdlT2JqZWN0O1xyXG4gICAgZ3JvdW5kID0gZ3JvdW5kO1xyXG4gICAgaW1nU3RhcnQ6IEltYWdlT2JqZWN0O1xyXG4gICAgYnV0dG9uU3RhcnQ6IEJ1dHRvbk9iamVjdFxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMucmF0ZSA9IDEuMC9mcHMqMTAwMDtcclxuICAgICAgICB0aGlzLmFkdCA9IDAuMDtcclxuICAgICAgICB0aGlzLmJhY2tncm91bmQgPW5ldyBJbWFnZU9iamVjdCgwLDAsNzAwLDgwMCxcIi4uL0ltYWdlcy9iYWNrZ3JvdW5kLW5pZ2h0LnBuZ1wiLDAsXCJiYWNrZ3JvdW5kXCIpO1xyXG4gICAgICAgIHRoaXMuaW1nU3RhcnQgPSBuZXcgSW1hZ2VPYmplY3QoNTAsMjAsNTAwLDcwMCxcIi4uL0ltYWdlcy9tZXNzYWdlLnBuZ1wiLDAsXCJcIik7XHJcbiAgICAgICAgdGhpcy5idXR0b25TdGFydCA9IG5ldyBCdXR0b25PYmplY3QoMCwwLDcwMCw4MDAsXCJcIiwwLFwiYnV0dG9uU3RhcnRcIik7XHJcblxyXG4gICAgICAgIHZhciBpbWFnZU9iamVjdHMgPSBbdGhpcy5iYWNrZ3JvdW5kXS5jb25jYXQodGhpcy5ncm91bmQuZ2V0Q29tcG9uZW50KClbXCJpbWFnZU9iamVjdHNcIl0pO1xyXG4gICAgICAgIGltYWdlT2JqZWN0cy5wdXNoKHRoaXMuaW1nU3RhcnQpO1xyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQoaW1hZ2VPYmplY3RzLFtdLFtdKTtcclxuICAgIH1cclxuICAgIHVwZGF0ZSh0aW1lOiBudW1iZXIsIGRlbHRhVGltZTogbnVtYmVyKXtcclxuICAgICAgICB0aGlzLmFkdCArPSBkZWx0YVRpbWU7XHJcbiAgICAgICAgaWYodGhpcy5hZHQ+PXRoaXMucmF0ZSl7XHJcbiAgICAgICAgICAgIHRoaXMuYWR0IC09IHRoaXMucmF0ZTtcclxuICAgICAgICAgICAgdGhpcy5ncm91bmQudXBkYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuaW5wdXRLZXkgPT09IFwiRW50ZXJcInx8KHRoaXMubW91c2VFdmVudCE9bnVsbCAmJiB0aGlzLmJ1dHRvblN0YXJ0LmlzSW5zaWRlKHRoaXMubW91c2VFdmVudCkpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5wdXRLZXkgPSBcIlwiO1xyXG4gICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG59XHJcblxyXG52YXIgc3RhcnRTY2VuZSA9IG5ldyBTdGFydFNjZW5lKCk7XHJcbmV4cG9ydCB7c3RhcnRTY2VuZX07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBzdGFydFNjZW5lIH0gZnJvbSBcIi4vZ2FtZS9TdGFydFNjZW5lXCI7XHJcbmltcG9ydCB7IFJlbmRlcmVyIH0gZnJvbSBcIi4vRW5naW5lL1JlbmRlcmVyL1JlbmRlcmVyXCI7XHJcbmltcG9ydCB7IFNjZW5lTWFuYWdlciB9IGZyb20gXCIuL0VuZ2luZS9TY2VuZS9TY2VuZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgR2FtZSB9IGZyb20gXCIuL0VuZ2luZS9Db3JlL0dhbWVcIjsgIFxyXG5pbXBvcnQge3BsYXlTY2VuZX0gZnJvbSBcIi4vZ2FtZS9QbGF5U2NlbmVcIjtcclxuXHJcbnZhciBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbXlDYW52YXMnKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcclxudmFyIHJlbmRlciA9IG5ldyBSZW5kZXJlcihjYW52YXMpXHJcbnZhciBnYW1lU2NlbmUgPSBuZXcgU2NlbmVNYW5hZ2VyKCk7XHJcbmdhbWVTY2VuZS5hZGRTY2VuZShzdGFydFNjZW5lKTtcclxuZ2FtZVNjZW5lLmFkZFNjZW5lKHBsYXlTY2VuZSk7XHJcbnZhciBteUdhbWUgPSBuZXcgR2FtZShnYW1lU2NlbmUpO1xyXG5teUdhbWUuc3RhcnQocmVuZGVyKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=