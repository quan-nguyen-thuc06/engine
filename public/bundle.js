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
var bird = new Bird(100, 30, 50, 50, imgBird, 0, 0.5, 0.1);
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
        // this.ground = new Ground(2);
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
        if (!this.deadBird) {
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
        return 1;
    }
    resetScene() {
        audioPlayer.play();
        audioPlayer.loop = true;
        this.checkPipe = false;
        this.addScore = null;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUU7WUFDakcsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7WUFDbkIsT0FBTyxDQUFDLENBQUM7U0FDWjtRQUVELE9BQU8sQ0FBQyxDQUFDO0lBQ2IsQ0FBQztDQUNKO0FBRUQsSUFBSSxVQUFVLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztBQUNkOzs7Ozs7O1VDeENwQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7OztBQ04rQztBQUNPO0FBQ0s7QUFDakI7QUFDQztBQUUzQyxJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBc0IsQ0FBQztBQUN0RSxJQUFJLE1BQU0sR0FBRyxJQUFJLCtEQUFRLENBQUMsTUFBTSxDQUFDO0FBQ2pDLElBQUksU0FBUyxHQUFHLElBQUksb0VBQVksRUFBRSxDQUFDO0FBQ25DLFNBQVMsQ0FBQyxRQUFRLENBQUMsd0RBQVUsQ0FBQyxDQUFDO0FBQy9CLFNBQVMsQ0FBQyxRQUFRLENBQUMsc0RBQVMsQ0FBQyxDQUFDO0FBQzlCLElBQUksTUFBTSxHQUFHLElBQUksbURBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNqQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VlazEvLi9zcmMvRW5naW5lL0J1dHRvbk9iamVjdC9CdXR0b25PYmplY3QudHMiLCJ3ZWJwYWNrOi8vd2VlazEvLi9zcmMvRW5naW5lL0NvcmUvR2FtZS50cyIsIndlYnBhY2s6Ly93ZWVrMS8uL3NyYy9FbmdpbmUvR2FtZU9iamVjdC9HYW1lT2JqZWN0LnRzIiwid2VicGFjazovL3dlZWsxLy4vc3JjL0VuZ2luZS9JbWFnZU9iamVjdC9JbWFnZU9iamVjdC50cyIsIndlYnBhY2s6Ly93ZWVrMS8uL3NyYy9FbmdpbmUvUmVuZGVyZXIvUmVuZGVyZXIudHMiLCJ3ZWJwYWNrOi8vd2VlazEvLi9zcmMvRW5naW5lL1NjZW5lL1NjZW5lLnRzIiwid2VicGFjazovL3dlZWsxLy4vc3JjL0VuZ2luZS9TY2VuZS9TY2VuZU1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vd2VlazEvLi9zcmMvRW5naW5lL1Nwcml0ZS9TcHJpdGUudHMiLCJ3ZWJwYWNrOi8vd2VlazEvLi9zcmMvRW5naW5lL1RleHRPYmplY3QvVGV4dE9iamVjdC50cyIsIndlYnBhY2s6Ly93ZWVrMS8uL3NyYy9nYW1lL0JpcmQudHMiLCJ3ZWJwYWNrOi8vd2VlazEvLi9zcmMvZ2FtZS9Hcm91bmQudHMiLCJ3ZWJwYWNrOi8vd2VlazEvLi9zcmMvZ2FtZS9QYWlyT2ZQaXBlLnRzIiwid2VicGFjazovL3dlZWsxLy4vc3JjL2dhbWUvUGFuZWxHYW1lT3Zlci50cyIsIndlYnBhY2s6Ly93ZWVrMS8uL3NyYy9nYW1lL1BsYXlTY2VuZS50cyIsIndlYnBhY2s6Ly93ZWVrMS8uL3NyYy9nYW1lL1Njb3JlLnRzIiwid2VicGFjazovL3dlZWsxLy4vc3JjL2dhbWUvU3RhcnRTY2VuZS50cyIsIndlYnBhY2s6Ly93ZWVrMS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWVrMS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VlazEvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWVrMS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlZWsxLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEltYWdlT2JqZWN0fSBmcm9tIFwiLi4vSW1hZ2VPYmplY3QvSW1hZ2VPYmplY3RcIjtcclxuZXhwb3J0IGNsYXNzIEJ1dHRvbk9iamVjdCBleHRlbmRzIEltYWdlT2JqZWN0e1xyXG4gICAgY29uc3RydWN0b3IoeDogbnVtYmVyLCB5OiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLGltYWdlOiBzdHJpbmcsIGRlZ3JlZXM6IG51bWJlciwgbmFtZTogc3RyaW5nKXtcclxuICAgICAgICBzdXBlcih4LCB5LCB3aWR0aCwgaGVpZ2h0LGltYWdlLCBkZWdyZWVzLCBuYW1lKTtcclxuICAgIH1cclxuICAgIGlzSW5zaWRlKHBvczogQXJyYXk8bnVtYmVyPil7XHJcbiAgICAgICAgaWYocG9zLmxlbmd0aCA8IDIpIHJldHVybiBmYWxzZTtcclxuICAgICAgICByZXR1cm4gcG9zWzBdID4gdGhpcy54ICYmIHBvc1swXSA8IHRoaXMueCt0aGlzLndpZHRoICYmIHBvc1sxXSA8IHRoaXMueSt0aGlzLmhlaWdodCAmJiBwb3NbMV0gPiB0aGlzLnk7XHJcbiAgICB9ICAgIFxyXG59IiwiaW1wb3J0IHsgU2NlbmVNYW5hZ2VyIH0gZnJvbSBcIi4uL1NjZW5lL1NjZW5lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBSZW5kZXJlciB9IGZyb20gXCIuLi9SZW5kZXJlci9SZW5kZXJlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEdhbWV7XHJcbiAgICBzY2VuZU1hbmFnZXI6IFNjZW5lTWFuYWdlcjtcclxuICAgIGxhc3RUaW1lOiBudW1iZXIgfCBudWxsO1xyXG4gICAgY29uc3RydWN0b3Ioc2NlbmVNYW5hZ2VyOiBTY2VuZU1hbmFnZXIpe1xyXG4gICAgICAgIHRoaXMuc2NlbmVNYW5hZ2VyID0gc2NlbmVNYW5hZ2VyO1xyXG4gICAgICAgIHRoaXMubGFzdFRpbWUgPSBudWxsO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBzdGFydChyZW5kZXI6IFJlbmRlcmVyKXtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywoZSk9PnRoaXMuc2NlbmVNYW5hZ2VyLnNjZW5lc1t0aGlzLnNjZW5lTWFuYWdlci5jdXJyZW50U2NlbmVdLm9uS2V5RG93bihlKSk7XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLChlKT0+dGhpcy5zY2VuZU1hbmFnZXIuc2NlbmVzW3RoaXMuc2NlbmVNYW5hZ2VyLmN1cnJlbnRTY2VuZV0ub25LZXlVcCgpKTtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLChlKT0+dGhpcy5zY2VuZU1hbmFnZXIuc2NlbmVzW3RoaXMuc2NlbmVNYW5hZ2VyLmN1cnJlbnRTY2VuZV0ub25Nb3VzZURvd24oZSxyZW5kZXIuY2FudmFzKSk7XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsKGUpPT50aGlzLnNjZW5lTWFuYWdlci5zY2VuZXNbdGhpcy5zY2VuZU1hbmFnZXIuY3VycmVudFNjZW5lXS5vbk1vdXNlVXAoKSk7XHJcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpPT50aGlzLmxvb3AocmVuZGVyKSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGxvb3AocmVuZGVyOiBSZW5kZXJlcil7XHJcbiAgICAgICAgdmFyIGluZGV4U2NlbmUgPSB0aGlzLnNjZW5lTWFuYWdlci5jdXJyZW50U2NlbmU7XHJcbiAgICAgICAgY29uc3QgdGltZSA9IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKTtcclxuICAgICAgICBpZih0aGlzLmxhc3RUaW1lID09IG51bGwpe1xyXG4gICAgICAgICAgICBpbmRleFNjZW5lID0gdGhpcy5zY2VuZU1hbmFnZXIuc2NlbmVzW3RoaXMuc2NlbmVNYW5hZ2VyLmN1cnJlbnRTY2VuZV0udXBkYXRlKHRpbWUsIDApO1xyXG4gICAgICAgICAgICB0aGlzLnNjZW5lTWFuYWdlci5zY2VuZXNbdGhpcy5zY2VuZU1hbmFnZXIuY3VycmVudFNjZW5lXS5yZW5kZXIocmVuZGVyKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGNvbnN0IGRlbHRhID0gdGltZSAtIHRoaXMubGFzdFRpbWU7XHJcbiAgICAgICAgICAgIGluZGV4U2NlbmUgPSB0aGlzLnNjZW5lTWFuYWdlci5zY2VuZXNbdGhpcy5zY2VuZU1hbmFnZXIuY3VycmVudFNjZW5lXS51cGRhdGUodGltZSxkZWx0YSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2NlbmVNYW5hZ2VyLnNjZW5lc1t0aGlzLnNjZW5lTWFuYWdlci5jdXJyZW50U2NlbmVdLnJlbmRlcihyZW5kZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihpbmRleFNjZW5lIT10aGlzLnNjZW5lTWFuYWdlci5jdXJyZW50U2NlbmUpe1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTY2VuZShpbmRleFNjZW5lKTtcclxuICAgICAgICAgICAgdGhpcy5zY2VuZU1hbmFnZXIuc2NlbmVzW2luZGV4U2NlbmVdLnJlc2V0U2NlbmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sYXN0VGltZSA9IHRpbWU7XHJcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpPT50aGlzLmxvb3AocmVuZGVyKSk7XHJcbiAgICB9XHJcbiAgICBsb2FkU2NlbmUoaW5kZXhTY2VuZTogbnVtYmVyKXtcclxuICAgICAgICB0aGlzLnNjZW5lTWFuYWdlci5jdXJyZW50U2NlbmUgPSBpbmRleFNjZW5lO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGNsYXNzIEdhbWVPYmplY3R7XHJcbiAgICB4OiBudW1iZXI7XHJcbiAgICB5OiBudW1iZXI7XHJcbiAgICB3aWR0aDogbnVtYmVyO1xyXG4gICAgaGVpZ2h0OiBudW1iZXI7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICBhY3RpdmU6IGJvb2xlYW47XHJcbiAgICBkZWZhdWx0UG9zaXRpb246IEFycmF5PG51bWJlcj47XHJcbiAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIG5hbWU6IHN0cmluZywgYWN0aXZlID0gdHJ1ZSkge1xyXG4gICAgICAgIHRoaXMueCA9IHg7XHJcbiAgICAgICAgdGhpcy55ID0geTtcclxuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLmFjdGl2ZSA9IGFjdGl2ZTtcclxuICAgICAgICB0aGlzLmRlZmF1bHRQb3NpdGlvbiA9IFt4LHldO1xyXG4gICAgfVxyXG4gICAgcmVzZXQoKXtcclxuICAgICAgICB0aGlzLnggPSB0aGlzLmRlZmF1bHRQb3NpdGlvblswXTtcclxuICAgICAgICB0aGlzLnkgPSB0aGlzLmRlZmF1bHRQb3NpdGlvblsxXTtcclxuICAgIH1cclxuICAgIHNldEFjdGl2ZShhY3RpdmU6IGJvb2xlYW4pe1xyXG4gICAgICAgIHRoaXMuYWN0aXZlID0gYWN0aXZlO1xyXG4gICAgfVxyXG4gICAgZ2V0QWN0aXZlKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYWN0aXZlO1xyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCB7R2FtZU9iamVjdH0gZnJvbSBcIi4uL0dhbWVPYmplY3QvR2FtZU9iamVjdFwiXHJcbmV4cG9ydCBjbGFzcyBJbWFnZU9iamVjdCBleHRlbmRzIEdhbWVPYmplY3R7XHJcbiAgICBpbWFnZTogc3RyaW5nO1xyXG4gICAgZGVncmVlczogbnVtYmVyO1xyXG4gICAgY29uc3RydWN0b3IoeDogbnVtYmVyLCB5OiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLGltYWdlOiBzdHJpbmcsIGRlZ3JlZXM6IG51bWJlciwgbmFtZTogc3RyaW5nKXtcclxuICAgICAgICBzdXBlcih4LCB5LCB3aWR0aCwgaGVpZ2h0LG5hbWUpO1xyXG4gICAgICAgIHRoaXMuaW1hZ2UgPSBpbWFnZTtcclxuICAgICAgICB0aGlzLmRlZ3JlZXMgPSBkZWdyZWVzO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKHRpbWU6IG51bWJlciwgZGVsdGFUaW1lOm51bWJlcil7fVxyXG59IiwiaW1wb3J0IHsgSW1hZ2VPYmplY3QgfSBmcm9tIFwiLi4vSW1hZ2VPYmplY3QvSW1hZ2VPYmplY3RcIjtcclxuaW1wb3J0IHsgU3ByaXRlIH0gZnJvbSBcIi4uL1Nwcml0ZS9TcHJpdGVcIjtcclxuaW1wb3J0IHsgVGV4dE9iamVjdCB9IGZyb20gXCIuLi9UZXh0T2JqZWN0L1RleHRPYmplY3RcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBSZW5kZXJlcntcclxuICAgIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XHJcbiAgICBjb25zdHJ1Y3RvcihjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50KXtcclxuICAgICAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcztcclxuICAgIH1cclxuICAgIGRyYXdJbWFnZShpbWFnZU9iamVjdDogSW1hZ2VPYmplY3Qpe1xyXG4gICAgICAgIGNvbnN0IGN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICAgICAgdmFyIGltZyA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgIGltZy5zcmMgPSBpbWFnZU9iamVjdC5pbWFnZTtcclxuICAgICAgICBpZihjdHghPW51bGwpe1xyXG4gICAgICAgICAgICBjdHguc2F2ZSgpO1xyXG4gICAgICAgICAgICBjdHgudHJhbnNsYXRlKGltYWdlT2JqZWN0LnggKyBpbWFnZU9iamVjdC53aWR0aC8yLGltYWdlT2JqZWN0LnkgKyBpbWFnZU9iamVjdC5oZWlnaHQvMilcclxuICAgICAgICAgICAgY3R4LnJvdGF0ZShpbWFnZU9iamVjdC5kZWdyZWVzKk1hdGguUEkvMTgwKTtcclxuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShpbWcsLWltYWdlT2JqZWN0LndpZHRoLzIsIC1pbWFnZU9iamVjdC5oZWlnaHQvMixpbWFnZU9iamVjdC53aWR0aCxpbWFnZU9iamVjdC5oZWlnaHQpO1xyXG4gICAgICAgICAgICBjdHgucmVzdG9yZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGRyYXdTcHJpdGUoc3ByaXRlOiBTcHJpdGUpe1xyXG4gICAgICAgIGNvbnN0IGN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICAgICAgdmFyIGltZyA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgIGlmKGN0eCE9bnVsbCl7XHJcbiAgICAgICAgICAgIGltZy5zcmMgPSBzcHJpdGUuaW1hZ2VzW3Nwcml0ZS5mYW1lQ3VycmVudF07XHJcbiAgICAgICAgICAgIC8vIGN0eC5jbGVhclJlY3QoMCwgMCwgd2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7XHJcbiAgICAgICAgICAgIGN0eC5zYXZlKCk7XHJcbiAgICAgICAgICAgIGN0eC50cmFuc2xhdGUoc3ByaXRlLnggKyBzcHJpdGUud2lkdGgvMixzcHJpdGUueSArIHNwcml0ZS5oZWlnaHQvMilcclxuICAgICAgICAgICAgY3R4LnJvdGF0ZShzcHJpdGUuZGVncmVlcypNYXRoLlBJLzE4MCk7XHJcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoaW1nLC1zcHJpdGUud2lkdGgvMiwgLXNwcml0ZS5oZWlnaHQvMixzcHJpdGUud2lkdGgsc3ByaXRlLmhlaWdodCk7XHJcbiAgICAgICAgICAgIGN0eC5yZXN0b3JlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZHJhd1RleHQodGV4dDogVGV4dE9iamVjdCl7XHJcbiAgICAgICAgY29uc3QgY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgICAgICBpZihjdHghPW51bGwpe1xyXG4gICAgICAgICAgICBjdHguZm9udCA9IHRleHQuZm9udDtcclxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHRleHQuY29sb3I7XHJcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dCh0ZXh0LmNvbnRlbnQsdGV4dC54LHRleHQueSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgSW1hZ2VPYmplY3QgfSBmcm9tIFwiLi4vSW1hZ2VPYmplY3QvSW1hZ2VPYmplY3RcIjtcclxuaW1wb3J0IHsgU3ByaXRlIH0gZnJvbSBcIi4uL1Nwcml0ZS9TcHJpdGVcIjtcclxuaW1wb3J0IHsgVGV4dE9iamVjdCB9IGZyb20gXCIuLi9UZXh0T2JqZWN0L1RleHRPYmplY3RcIjtcclxuaW1wb3J0IHtSZW5kZXJlcn0gZnJvbSBcIi4uL1JlbmRlcmVyL1JlbmRlcmVyXCI7XHJcbmltcG9ydCB7R2FtZU9iamVjdH0gZnJvbSBcIi4uL0dhbWVPYmplY3QvR2FtZU9iamVjdFwiO1xyXG5leHBvcnQgY2xhc3MgU2NlbmV7XHJcbiAgICBpbWFnZU9iamVjdHM6IEltYWdlT2JqZWN0W107XHJcbiAgICBzcHJpdGVzOiBTcHJpdGVbXTtcclxuICAgIHRleHRPYmplY3RzOiBUZXh0T2JqZWN0W107IFxyXG4gICAgaW5wdXRLZXkgOiBTdHJpbmc7XHJcbiAgICBtb3VzZUV2ZW50IDogQXJyYXk8bnVtYmVyPiB8IG51bGw7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMuaW1hZ2VPYmplY3RzID0gW107XHJcbiAgICAgICAgdGhpcy5zcHJpdGVzID0gW107XHJcbiAgICAgICAgdGhpcy50ZXh0T2JqZWN0cyA9IFtdO1xyXG4gICAgICAgIHRoaXMuaW5wdXRLZXkgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMubW91c2VFdmVudCA9IG51bGw7XHJcbiAgICB9XHJcbiAgICByZXNldFNjZW5lKCl7XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHRoaXMuaW1hZ2VPYmplY3RzLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICB0aGlzLmltYWdlT2JqZWN0c1tpXS5yZXNldCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8dGhpcy5zcHJpdGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3ByaXRlc1tpXS5yZXNldCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmlucHV0S2V5ID0gXCJcIjtcclxuICAgIH1cclxuICAgIGFkZENoaWxkKGltYWdlT2JqZWN0czogSW1hZ2VPYmplY3RbXSxzcHJpdGVzOiBTcHJpdGVbXSwgdGV4dE9iamVjdHM6IFRleHRPYmplY3RbXSl7XHJcbiAgICAgICAgaW1hZ2VPYmplY3RzLm1hcChpbWFnZU9iamVjdCA9PiB0aGlzLmltYWdlT2JqZWN0cy5wdXNoKGltYWdlT2JqZWN0KSk7XHJcbiAgICAgICAgc3ByaXRlcy5tYXAoc3ByaXRlID0+IHRoaXMuc3ByaXRlcy5wdXNoKHNwcml0ZSkpO1xyXG4gICAgICAgIHRleHRPYmplY3RzLm1hcCh0ZXh0T2JqZWN0ID0+IHRoaXMudGV4dE9iamVjdHMucHVzaCh0ZXh0T2JqZWN0KSk7XHJcbiAgICB9XHJcbiAgICByZW1vdmVDaGlsZChpbWFnZU9iamVjdHM6IEltYWdlT2JqZWN0W10sc3ByaXRlczogU3ByaXRlW10pe1xyXG4gICAgICAgIGltYWdlT2JqZWN0cy5tYXAoaW1hZ2VPYmplY3QgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmltYWdlT2JqZWN0cyA9IHRoaXMuaW1hZ2VPYmplY3RzLmZpbHRlcigoaW1iKT0+e1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGltYiE9IGltYWdlT2JqZWN0O1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgc3ByaXRlcy5tYXAoc3ByaXRlID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zcHJpdGVzID0gdGhpcy5zcHJpdGVzLmZpbHRlcigoc3B0KT0+e1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNwdCE9IHNwcml0ZTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcihyZW5kZXI6IFJlbmRlcmVyKXtcclxuICAgICAgICB0aGlzLmltYWdlT2JqZWN0cy5tYXAoKGltYWdlT2JqZWN0KT0+e1xyXG4gICAgICAgICAgICBpZihpbWFnZU9iamVjdC5nZXRBY3RpdmUoKSlcclxuICAgICAgICAgICAgICAgIHJlbmRlci5kcmF3SW1hZ2UoaW1hZ2VPYmplY3QpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5zcHJpdGVzLm1hcCgoc3ByaXRlKT0+e1xyXG4gICAgICAgICAgICBpZihzcHJpdGUuZ2V0QWN0aXZlKCkpXHJcbiAgICAgICAgICAgICAgICByZW5kZXIuZHJhd1Nwcml0ZShzcHJpdGUpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy50ZXh0T2JqZWN0cy5tYXAoKHR4dCk9PntcclxuICAgICAgICAgICAgaWYodHh0LmdldEFjdGl2ZSgpKVxyXG4gICAgICAgICAgICAgICAgcmVuZGVyLmRyYXdUZXh0KHR4dCk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIC8vIHh1IGx5IGxvZ2ljXHJcbiAgICB1cGRhdGUodGltZTogbnVtYmVyLCBkZWx0YTogbnVtYmVyKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPHRoaXMuaW1hZ2VPYmplY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW1hZ2VPYmplY3RzW2ldLnVwZGF0ZSh0aW1lLCBkZWx0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDx0aGlzLnNwcml0ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5zcHJpdGVzW2ldLnVwZGF0ZSh0aW1lLCBkZWx0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAxO1xyXG4gICAgfVxyXG4gICAgb25LZXlEb3duKGU6IEtleWJvYXJkRXZlbnQpe1xyXG4gICAgICAgIHRoaXMuaW5wdXRLZXkgPSBlLmNvZGU7XHJcbiAgICB9XHJcbiAgICBvbktleVVwKCl7XHJcbiAgICAgICAgdGhpcy5pbnB1dEtleSA9IFwiXCI7XHJcbiAgICB9XHJcbiAgICBvbk1vdXNlRG93bihlOiBNb3VzZUV2ZW50LCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50KSB7XHJcbiAgICAgICAgdmFyIHJlY3QgPSBjYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgdmFyIG1vdXNlWCA9IGUuY2xpZW50WCAtIHJlY3QubGVmdDtcclxuICAgICAgICB2YXIgbW91c2VZID0gZS5jbGllbnRZIC0gcmVjdC50b3A7ICAgIFxyXG4gICAgICAgIHRoaXMubW91c2VFdmVudCA9IFttb3VzZVgsIG1vdXNlWV07XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5tb3VzZUV2ZW50KTtcclxuICAgIH1cclxuICAgIG9uTW91c2VVcCgpIHtcclxuICAgICAgICB0aGlzLm1vdXNlRXZlbnQgPSBudWxsO1xyXG4gICAgfVxyXG4gICAgQ29sbGlzaW9uKG9iajEgOiBHYW1lT2JqZWN0LCBvYmoyIDogR2FtZU9iamVjdCl7XHJcbiAgICAgICAgaWYob2JqMS54KyBvYmoxLndpZHRoPj1vYmoyLnggJiYgb2JqMS54IDw9IG9iajIueCArIG9iajIud2lkdGgpe1xyXG4gICAgICAgICAgICBpZihvYmoxLnkrIG9iajEuaGVpZ2h0Pj1vYmoyLnkgJiYgb2JqMS55IDw9IG9iajIueSArIG9iajIuaGVpZ2h0KXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IFNjZW5lIH0gZnJvbSBcIi4vU2NlbmVcIjtcclxuZXhwb3J0IGNsYXNzIFNjZW5lTWFuYWdlciB7XHJcbiAgICBzY2VuZXM6IFNjZW5lW107XHJcbiAgICBjdXJyZW50U2NlbmU6IG51bWJlcjtcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICB0aGlzLnNjZW5lcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFNjZW5lID0gMDtcclxuICAgIH1cclxuICAgIGFkZFNjZW5lKHNjZW5lOiBTY2VuZSl7XHJcbiAgICAgICAgdGhpcy5zY2VuZXMucHVzaChzY2VuZSlcclxuICAgIH1cclxuICAgIHVwZGF0ZSgpe31cclxuICAgIHJlbmRlcigpe31cclxufSIsImltcG9ydCB7R2FtZU9iamVjdH0gZnJvbSBcIi4uL0dhbWVPYmplY3QvR2FtZU9iamVjdFwiXHJcbmV4cG9ydCBjbGFzcyBTcHJpdGUgZXh0ZW5kcyBHYW1lT2JqZWN0e1xyXG4gICAgaW1hZ2VzOiBBcnJheTxzdHJpbmc+O1xyXG4gICAgZGVncmVlczogbnVtYmVyO1xyXG4gICAgZmFtZUN1cnJlbnQ6IG51bWJlcjtcclxuICAgIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgaW1hZ2VzOiBBcnJheTxzdHJpbmc+LGRlZ3JlZXM6IG51bWJlcixuYW1lOiBzdHJpbmcpe1xyXG4gICAgICAgIHN1cGVyKHgsIHksIHdpZHRoLCBoZWlnaHQsbmFtZSk7XHJcbiAgICAgICAgdGhpcy5pbWFnZXMgPSBpbWFnZXM7XHJcbiAgICAgICAgdGhpcy5kZWdyZWVzID0gZGVncmVlcztcclxuICAgICAgICB0aGlzLmZhbWVDdXJyZW50ID0gMDtcclxuICAgIH1cclxuICAgIHVwZGF0ZSh0aW1lOiBudW1iZXIsIGRlbHRhVGltZTpudW1iZXIpe31cclxufSIsImltcG9ydCB7R2FtZU9iamVjdH0gZnJvbSBcIi4uL0dhbWVPYmplY3QvR2FtZU9iamVjdFwiXHJcbmV4cG9ydCBjbGFzcyBUZXh0T2JqZWN0IGV4dGVuZHMgR2FtZU9iamVjdHtcclxuICAgIGNvbnRlbnQ6IHN0cmluZztcclxuICAgIGZvbnQ6IHN0cmluZztcclxuICAgIGNvbG9yOiBzdHJpbmc7XHJcbiAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlciwgbmFtZTogc3RyaW5nICwgY29udGVudDogc3RyaW5nLCBmb250OiBzdHJpbmcsIGNvbG9yID0gXCJibGFja1wiKSB7XHJcbiAgICAgICAgc3VwZXIoeCwgeSwgMCwgMCwgbmFtZSk7XHJcbiAgICAgICAgdGhpcy5jb250ZW50ID0gY29udGVudDtcclxuICAgICAgICB0aGlzLmZvbnQgPSBmb250O1xyXG4gICAgICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcclxuICAgIH1cclxuICAgIHNldENvbnRlbnQoY29udGVudDogc3RyaW5nKXtcclxuICAgICAgICB0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgU3ByaXRlIH0gZnJvbSBcIi4uL0VuZ2luZS9TcHJpdGUvU3ByaXRlXCI7XHJcbnZhciBhdWRpbyA9IG5ldyBBdWRpbyhcIi4uL2F1ZGlvL3N3b29zaC5tcDNcIik7XHJcbmNsYXNzIEJpcmQgZXh0ZW5kcyBTcHJpdGUge1xyXG4gICAgZ3Jhdml0eSA6IG51bWJlcjtcclxuICAgIHNwZWVkIDogbnVtYmVyO1xyXG4gICAgcGZzOiBudW1iZXI7XHJcbiAgICByYXRlOiBudW1iZXI7XHJcbiAgICBhZHQ6IG51bWJlcjsgIFxyXG4gICAgY29uc3RydWN0b3IoeDogbnVtYmVyLCB5OiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLGltYWdlczogQXJyYXk8c3RyaW5nPixkZWdyZWVzOiBudW1iZXIsZ3Jhdml0eTogbnVtYmVyLHNwZWVkOiBudW1iZXIpe1xyXG4gICAgICAgIHN1cGVyKHgsIHksIHdpZHRoLCBoZWlnaHQsaW1hZ2VzLGRlZ3JlZXMsXCJiaXJkXCIpO1xyXG4gICAgICAgIHRoaXMuZ3Jhdml0eSA9IGdyYXZpdHk7XHJcbiAgICAgICAgdGhpcy5zcGVlZCA9IHNwZWVkO1xyXG4gICAgICAgIHRoaXMucGZzID0gNjA7XHJcbiAgICAgICAgdGhpcy5yYXRlID0gMS4wL3RoaXMucGZzKjEwMDA7XHJcbiAgICAgICAgdGhpcy5hZHQgPSAwLjA7XHJcbiAgICB9XHJcbiAgICB1cGRhdGUodGltZTogbnVtYmVyLCBkZWx0YVRpbWU6bnVtYmVyKXtcclxuICAgICAgICB0aGlzLnkgKz0gdGhpcy5zcGVlZCArIDAuNSp0aGlzLmdyYXZpdHk7XHJcbiAgICAgICAgaWYodGhpcy55IDwgMClcclxuICAgICAgICAgICAgdGhpcy55ID0gMDtcclxuICAgICAgICB0aGlzLnNwZWVkICs9IHRoaXMuZ3Jhdml0eTtcclxuICAgICAgICB0aGlzLmFkdCArPSBkZWx0YVRpbWVcclxuICAgICAgICBpZih0aGlzLnNwZWVkPjApe1xyXG4gICAgICAgICAgICB0aGlzLmRlZ3JlZXMgKz0gMTtcclxuICAgICAgICAgICAgaWYodGhpcy5kZWdyZWVzPjIwKSB0aGlzLmRlZ3JlZXMgPSAyMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5kZWdyZWVzIC09IDE7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZGVncmVlczwtMjApIHRoaXMuZGVncmVlcyA9IC0yMDtcclxuICAgICAgICAgICAgaWYodGhpcy5hZHQ+PXRoaXMucmF0ZSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkdCAtPSB0aGlzLnJhdGU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZhbWVDdXJyZW50Kz0xO1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5mYW1lQ3VycmVudD50aGlzLmltYWdlcy5sZW5ndGgtMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mYW1lQ3VycmVudCA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYodGhpcy5mYW1lQ3VycmVudD50aGlzLmltYWdlcy5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mYW1lQ3VycmVudCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmbHkoKXtcclxuICAgICAgICBhdWRpby5wbGF5KCk7IFxyXG4gICAgICAgIGF1ZGlvLnBsYXliYWNrUmF0ZSA9IDI7XHJcbiAgICAgICAgdGhpcy5zcGVlZCA9IC01IDtcclxuICAgIH1cclxuICAgIHJlc2V0KCl7XHJcbiAgICAgICAgc3VwZXIucmVzZXQoKTtcclxuICAgICAgICB0aGlzLnNwZWVkID0gMDtcclxuICAgIH1cclxufVxyXG5jb25zdCBpbWdCaXJkID0gW1xyXG4gICAgXCIuLi9JbWFnZXMvYmlyZC9mcmFtZS0xLnBuZ1wiLFxyXG4gICAgXCIuLi9JbWFnZXMvYmlyZC9mcmFtZS0yLnBuZ1wiLFxyXG4gICAgXCIuLi9JbWFnZXMvYmlyZC9mcmFtZS0zLnBuZ1wiLFxyXG4gICAgXCIuLi9JbWFnZXMvYmlyZC9mcmFtZS00LnBuZ1wiLFxyXG4gICAgXCIuLi9JbWFnZXMvYmlyZC9mcmFtZS01LnBuZ1wiLFxyXG4gICAgXCIuLi9JbWFnZXMvYmlyZC9mcmFtZS02LnBuZ1wiLFxyXG4gICAgXCIuLi9JbWFnZXMvYmlyZC9mcmFtZS03LnBuZ1wiLFxyXG4gICAgXCIuLi9JbWFnZXMvYmlyZC9mcmFtZS04LnBuZ1wiLFxyXG5dO1xyXG52YXIgYmlyZCA9IG5ldyBCaXJkKDEwMCwzMCw1MCw1MCxpbWdCaXJkLDAsMC41LDAuMSk7XHJcbmV4cG9ydCBkZWZhdWx0IGJpcmQ7IiwiaW1wb3J0IHsgSW1hZ2VPYmplY3QgfSBmcm9tIFwiLi4vRW5naW5lL0ltYWdlT2JqZWN0L0ltYWdlT2JqZWN0XCI7XHJcblxyXG5jbGFzcyBHcm91bmR7XHJcbiAgICBpbWFnZXM6IEFycmF5PEltYWdlT2JqZWN0PjtcclxuICAgIHNwZWVkOiBudW1iZXI7XHJcbiAgICBjb25zdHJ1Y3RvcihzcGVlZDogbnVtYmVyKXtcclxuICAgICAgICB2YXIgaW1hZ2UxID0gbmV3IEltYWdlT2JqZWN0KDAsNjcwLDY1MCwxNTAsXCIuLi9JbWFnZXMvYmFzZS5wbmdcIiwwLFwiZ3JvdW5kXCIpO1xyXG4gICAgICAgIHZhciBpbWFnZTIgPSBuZXcgSW1hZ2VPYmplY3QoNjQ5LDY3MCw2NTAsMTUwLFwiLi4vSW1hZ2VzL2Jhc2UucG5nXCIsMCxcImdyb3VuZFwiKTtcclxuICAgICAgICB0aGlzLmltYWdlcyA9IFtpbWFnZTEsaW1hZ2UyXTtcclxuICAgICAgICB0aGlzLnNwZWVkID0gc3BlZWQ7XHJcbiAgICB9XHJcbiAgICB1cGRhdGUoKXtcclxuICAgICAgICBmb3IodmFyIGk9MDtpPHRoaXMuaW1hZ2VzLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICB0aGlzLmltYWdlc1tpXS54IC09IHRoaXMuc3BlZWQ7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuaW1hZ2VzW2ldLnggPCAtICg2NTArMjApKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2VzW2ldLnggPSB0aGlzLmltYWdlc1tNYXRoLmFicyhpLTEpXS54KzY0MDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gXHJcbiAgICB9XHJcbiAgICBnZXRDb21wb25lbnQoKXtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBcImltYWdlT2JqZWN0c1wiOiB0aGlzLmltYWdlcyxcclxuICAgICAgICAgICAgXCJzcHJpdGVzXCI6IFtdLFxyXG4gICAgICAgICAgICBcInRleHRPYmplY3RzXCI6IFtdXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHJlc2V0KCl7XHJcbiAgICAgICAgZm9yKHZhciBpPTA7aTx0aGlzLmltYWdlcy5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgdGhpcy5pbWFnZXNbaV0ucmVzZXQoKTtcclxuICAgICAgICB9IFxyXG4gICAgfVxyXG59XHJcblxyXG52YXIgZ3JvdW5kID0gbmV3IEdyb3VuZCgyKTtcclxuZXhwb3J0IHtHcm91bmQsZ3JvdW5kfTsiLCJpbXBvcnQgeyBJbWFnZU9iamVjdCB9IGZyb20gXCIuLi9FbmdpbmUvSW1hZ2VPYmplY3QvSW1hZ2VPYmplY3RcIjtcclxuXHJcbmNvbnN0IGJsYW5rcyA9IDIwMDtcclxuY29uc3QgcGlwZUhlaWdodCA9IDM1MDtcclxuY29uc3QgbnVtUGlwZSA9IDQ7XHJcbmNvbnN0IGRpc3RhbmNlID0gMjUwO1xyXG5jb25zdCBwaXBlV2lkdGggPSA4MDtcclxuY2xhc3MgUGFpck9mUGlwZXtcclxuICAgIFBpcGVzOiBBcnJheTxJbWFnZU9iamVjdD47XHJcbiAgICBwcml2YXRlIHNwZWVkOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoeDpudW1iZXIsIHk6bnVtYmVyLCBpbWFnZTogc3RyaW5nLHNwZWVkOiBudW1iZXIpe1xyXG4gICAgICAgIHZhciBQaXBlVXAgPSBuZXcgSW1hZ2VPYmplY3QoeCx5LHBpcGVXaWR0aCxwaXBlSGVpZ2h0LGltYWdlLDE4MCxcInBpcGVcIik7XHJcbiAgICAgICAgdmFyIFBpcGVEb3duID0gbmV3IEltYWdlT2JqZWN0KHgseStwaXBlSGVpZ2h0K2JsYW5rcyxwaXBlV2lkdGgscGlwZUhlaWdodCxpbWFnZSwwLFwicGlwZVwiKTtcclxuICAgICAgICB2YXIgY2hlY2tTY29yZSA9IG5ldyBJbWFnZU9iamVjdCh4K3BpcGVXaWR0aCx5K3BpcGVIZWlnaHQsMTAsYmxhbmtzLFwiXCIsMCxcImNoZWNrU2NvcmVcIik7XHJcbiAgICAgICAgdGhpcy5QaXBlcz0gW1BpcGVVcCxQaXBlRG93bixjaGVja1Njb3JlXTtcclxuICAgICAgICB0aGlzLnNwZWVkID0gc3BlZWQ7XHJcbiAgICB9XHJcbiAgICB1cGRhdGUoKXtcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwzO2krKyl7XHJcbiAgICAgICAgICAgIHRoaXMuUGlwZXNbaV0ueCAtPSB0aGlzLnNwZWVkO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJlc2V0KCl7XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8MztpKyspe1xyXG4gICAgICAgICAgICB0aGlzLlBpcGVzW2ldLnJlc2V0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0Q29tcG9uZW50KCl7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgXCJpbWFnZU9iamVjdHNcIjogdGhpcy5QaXBlcyxcclxuICAgICAgICAgICAgXCJzcHJpdGVzXCI6IFtdLFxyXG4gICAgICAgICAgICBcInRleHRPYmplY3RzXCI6IFtdXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBMaXN0UGFpck9mUGlwZXN7XHJcbiAgICBsaXN0UGlwZTogUGFpck9mUGlwZVtdO1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICB0aGlzLmxpc3RQaXBlID0gW107XHJcbiAgICAgICAgZm9yKHZhciBpPTA7aTxudW1QaXBlO2krKyl7XHJcbiAgICAgICAgICAgIHZhciB4ID0gaSpkaXN0YW5jZSArIHBpcGVXaWR0aCArIDQwMDtcclxuICAgICAgICAgICAgdmFyIHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKi0yMDApO1xyXG4gICAgICAgICAgICB2YXIgcGlwZSA9IG5ldyBQYWlyT2ZQaXBlKHgseSxcIi4uL0ltYWdlcy9waXBlLWdyZWVuLnBuZ1wiLDIpO1xyXG4gICAgICAgICAgICB0aGlzLmxpc3RQaXBlLnB1c2gocGlwZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdXBkYXRlKCl7XHJcbiAgICAgICAgdGhpcy5saXN0UGlwZS5tYXAoKHBpcGUsaW5kZXgpID0+e1xyXG4gICAgICAgICAgICBpZihwaXBlLlBpcGVzWzBdLng8LTEwMCl7XHJcbiAgICAgICAgICAgICAgICB2YXIgZnJvbnRJbmRleCA9IGluZGV4IC0xO1xyXG4gICAgICAgICAgICAgICAgaWYoZnJvbnRJbmRleDwwKSBmcm9udEluZGV4ID0gdGhpcy5saXN0UGlwZS5sZW5ndGgtMTtcclxuICAgICAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPHBpcGUuUGlwZXMubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgcGlwZS5QaXBlc1tpXS54ID0gdGhpcy5saXN0UGlwZVtmcm9udEluZGV4XS5QaXBlc1tpXS54ICsgZGlzdGFuY2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcbnZhciBsaXN0UGFpck9mUGlwZXMgPSBuZXcgTGlzdFBhaXJPZlBpcGVzKCk7XHJcbmV4cG9ydCB7UGFpck9mUGlwZSwgbGlzdFBhaXJPZlBpcGVzfTtcclxuIiwiaW1wb3J0IHsgVGV4dE9iamVjdCB9IGZyb20gJy4uL0VuZ2luZS9UZXh0T2JqZWN0L1RleHRPYmplY3QnO1xyXG5pbXBvcnQge0J1dHRvbk9iamVjdCB9IGZyb20gJy4uL0VuZ2luZS9CdXR0b25PYmplY3QvQnV0dG9uT2JqZWN0JztcclxuaW1wb3J0IHsgSW1hZ2VPYmplY3QgfSBmcm9tICcuLi9FbmdpbmUvSW1hZ2VPYmplY3QvSW1hZ2VPYmplY3QnO1xyXG5cclxuY2xhc3MgUGFuZWxHYW1lT3ZlciB7XHJcbiAgICBpbWdHYW1lT3ZlcjogSW1hZ2VPYmplY3Q7XHJcbiAgICBjdXJyZW50U2NvcmU6IFRleHRPYmplY3Q7XHJcbiAgICBoaWdoU2NvcmU6IFRleHRPYmplY3Q7XHJcbiAgICByZXBsYXlCdXR0b246IEJ1dHRvbk9iamVjdDtcclxuICAgIGNvbnN0cnVjdG9yKGltZ0dhbWVPdmVyOiBJbWFnZU9iamVjdCwgY3VycmVudFNjb3JlOiBUZXh0T2JqZWN0LCBoaWdoU2NvcmU6IFRleHRPYmplY3QsIHJlcGxheUJ1dHRvbjogQnV0dG9uT2JqZWN0KXtcclxuICAgICAgICB0aGlzLmltZ0dhbWVPdmVyID0gaW1nR2FtZU92ZXI7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50U2NvcmUgPSBjdXJyZW50U2NvcmU7XHJcbiAgICAgICAgdGhpcy5oaWdoU2NvcmUgPSBoaWdoU2NvcmU7XHJcbiAgICAgICAgdGhpcy5yZXBsYXlCdXR0b24gPSByZXBsYXlCdXR0b247XHJcbiAgICB9XHJcbiAgICBzZXRBY3RpdmUoYWN0aXZlOiBib29sZWFuKXtcclxuICAgICAgICB0aGlzLmltZ0dhbWVPdmVyLnNldEFjdGl2ZShhY3RpdmUpO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFNjb3JlLnNldEFjdGl2ZShhY3RpdmUpO1xyXG4gICAgICAgIHRoaXMuaGlnaFNjb3JlLnNldEFjdGl2ZShhY3RpdmUpO1xyXG4gICAgICAgIHRoaXMucmVwbGF5QnV0dG9uLnNldEFjdGl2ZShhY3RpdmUpO1xyXG4gICAgfVxyXG4gICAgZ2V0Q29tcG9uZW50KCl7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgXCJpbWFnZU9iamVjdHNcIjogW3RoaXMuaW1nR2FtZU92ZXIsIHRoaXMucmVwbGF5QnV0dG9uXSxcclxuICAgICAgICAgICAgXCJzcHJpdGVzXCI6W10sXHJcbiAgICAgICAgICAgIFwidGV4dE9iamVjdHNcIjpbdGhpcy5jdXJyZW50U2NvcmUsdGhpcy5oaWdoU2NvcmVdXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHVwZGF0ZShjdXJyZW50U2NvcmU6IG51bWJlciwgaGlnaFNjb3JlOiBudW1iZXIpe1xyXG4gICAgICAgIHRoaXMuY3VycmVudFNjb3JlLnNldENvbnRlbnQoXCJTY29yZTogXCIgKyBjdXJyZW50U2NvcmUpO1xyXG4gICAgICAgIHRoaXMuaGlnaFNjb3JlLnNldENvbnRlbnQoXCJIaWdoIFNjb3JlOiBcIiArIGhpZ2hTY29yZSlcclxuICAgIH1cclxufVxyXG52YXIgcmVwbGF5QnV0dG9uID0gbmV3IEJ1dHRvbk9iamVjdCgyMjUsNTAwLDE2MCw4MCxcIi4uL0ltYWdlcy9yZXBsYXktYnV0dG9uLnBuZ1wiLDAsXCJyZXBsYXlCdXR0b25cIik7XHJcbnZhciBpbWdHYW1lT3ZlciA9IG5ldyBJbWFnZU9iamVjdCg2MCwzMDAsNTAwLDEzMCxcIi4uL0ltYWdlcy9nYW1lb3Zlci5wbmdcIiwwLFwiZ2FtZU92ZXJcIik7XHJcbnZhciBjdXJyZW50U2NvcmUgPSBuZXcgVGV4dE9iamVjdCgxMTAsNDcwLFwic2hvd1Njb3JlXCIsXCJTY29yZTogMFwiLCBcIjMwcHggQXJpYWxcIixcIndoaXRlXCIpO1xyXG52YXIgaGlnaFNjb3JlID0gbmV3IFRleHRPYmplY3QoMzMwLDQ3MCxcImhpZ2hTY29yZVwiLFwiSGlnaCBTY29yZTogMFwiLCBcIjMwcHggQXJpYWxcIixcIndoaXRlXCIpO1xyXG5cclxudmFyIHBhbmVsR2FtZU92ZXIgPSBuZXcgUGFuZWxHYW1lT3ZlcihpbWdHYW1lT3ZlcixjdXJyZW50U2NvcmUsaGlnaFNjb3JlLHJlcGxheUJ1dHRvbik7XHJcbmV4cG9ydCB7cGFuZWxHYW1lT3Zlcn0iLCJpbXBvcnQge1NjZW5lfSBmcm9tICcuLi9FbmdpbmUvU2NlbmUvU2NlbmUnO1xyXG5pbXBvcnQgYmlyZCBmcm9tICcuL0JpcmQnO1xyXG5pbXBvcnQge2xpc3RQYWlyT2ZQaXBlc30gZnJvbSAnLi9QYWlyT2ZQaXBlJztcclxuaW1wb3J0IHsgVGV4dE9iamVjdCB9IGZyb20gJy4uL0VuZ2luZS9UZXh0T2JqZWN0L1RleHRPYmplY3QnO1xyXG5pbXBvcnQgeyBJbWFnZU9iamVjdCB9IGZyb20gJy4uL0VuZ2luZS9JbWFnZU9iamVjdC9JbWFnZU9iamVjdCc7XHJcbmltcG9ydCB7c2NvcmV9IGZyb20gXCIuL1Njb3JlXCI7XHJcbmltcG9ydCB7IGdyb3VuZCB9IGZyb20gJy4vR3JvdW5kJztcclxuaW1wb3J0IHtwYW5lbEdhbWVPdmVyfSBmcm9tICcuL1BhbmVsR2FtZU92ZXInXHJcblxyXG5jb25zdCBwb2ludCA9IG5ldyBBdWRpbyhcIi4uL2F1ZGlvL3BvaW50Lm1wM1wiKTtcclxuY29uc3QgZGllID0gbmV3IEF1ZGlvKFwiLi4vYXVkaW8vZGllLm1wM1wiKTtcclxuY29uc3QgaGl0ID0gbmV3IEF1ZGlvKFwiLi4vYXVkaW8vaGl0Lm1wM1wiKTtcclxuY29uc3QgYXVkaW9QbGF5ZXIgPSBuZXcgQXVkaW8oXCIuLi9hdWRpby9vcmNoZXN0cmF3YXYtMjYxNTgubXAzXCIpO1xyXG5cclxuY29uc3QgZnBzID0gNjA7XHJcbmV4cG9ydCBjbGFzcyBQbGF5U2NlbmUgZXh0ZW5kcyBTY2VuZSB7XHJcbiAgICByYXRlOiBudW1iZXI7XHJcbiAgICBhZHQ6IG51bWJlcjsgICAgLy9hY2N1bXVsYXRlZCBkZWx0YSB0aW1lXHJcbiAgICBiaXJkID0gYmlyZDtcclxuICAgIHBpcGVzID0gbGlzdFBhaXJPZlBpcGVzO1xyXG4gICAgZ3JvdW5kID0gZ3JvdW5kO1xyXG4gICAgY2hlY2tQaXBlOiBib29sZWFuO1xyXG4gICAgdGV4dFNjb3JlOiBUZXh0T2JqZWN0O1xyXG4gICAgYWRkU2NvcmU6IG51bWJlciB8IG51bGw7XHJcbiAgICBzY29yZSA9IHNjb3JlO1xyXG4gICAgZGVhZEJpcmQ6IGJvb2xlYW47XHJcbiAgICBwYW5lbEdhbWVPdmVyID0gcGFuZWxHYW1lT3ZlcjtcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAvLyBwbGF5IGF1ZGlvXHJcbiAgICAgICAgYXVkaW9QbGF5ZXIucGxheSgpO1xyXG4gICAgICAgIGF1ZGlvUGxheWVyLmxvb3AgPXRydWU7XHJcbiAgICAgICAgdGhpcy5yYXRlID0gMS4wL2ZwcyoxMDAwO1xyXG4gICAgICAgIHRoaXMuYWR0ID0gMC4wO1xyXG4gICAgICAgIHRoaXMuY2hlY2tQaXBlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5hZGRTY29yZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5kZWFkQmlyZCA9IGZhbHNlO1xyXG4gICAgICAgIC8vIHRoaXMuZ3JvdW5kID0gbmV3IEdyb3VuZCgyKTtcclxuXHJcbiAgICAgICAgdGhpcy50ZXh0U2NvcmUgPSBuZXcgVGV4dE9iamVjdCgxMCwzMCxcInNjb3JlXCIsXCJTY29yZTogXCIrIHRoaXMuc2NvcmUuZ2V0Q3VycmVudFNjb3JlKCksIFwiMThweCBBcmlhbFwiLCBcIndoaXRlXCIpO1xyXG4gICAgICAgIHZhciBiZyA9IG5ldyBJbWFnZU9iamVjdCgwLDAsNzAwLDgwMCxcIi4uL0ltYWdlcy9iYWNrZ3JvdW5kLW5pZ2h0LnBuZ1wiLDAsXCJiYWNrZ3JvdW5kXCIpO1xyXG5cclxuICAgICAgICB0aGlzLmFkZENoaWxkKFtiZ10sW3RoaXMuYmlyZF0sW3RoaXMudGV4dFNjb3JlXSk7XHJcbiAgICAgICAgZm9yKHZhciBpPTA7aTxsaXN0UGFpck9mUGlwZXMubGlzdFBpcGUubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIHZhciBwaXBlID0gbGlzdFBhaXJPZlBpcGVzLmxpc3RQaXBlW2ldO1xyXG4gICAgICAgICAgICB0aGlzLmFkZENoaWxkKFxyXG4gICAgICAgICAgICAgICAgcGlwZS5nZXRDb21wb25lbnQoKVtcImltYWdlT2JqZWN0c1wiXSxcclxuICAgICAgICAgICAgICAgIHBpcGUuZ2V0Q29tcG9uZW50KClbXCJzcHJpdGVzXCJdLFxyXG4gICAgICAgICAgICAgICAgcGlwZS5nZXRDb21wb25lbnQoKVtcInRleHRPYmplY3RzXCJdXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmFkZENoaWxkKFxyXG4gICAgICAgICAgICB0aGlzLmdyb3VuZC5nZXRDb21wb25lbnQoKVtcImltYWdlT2JqZWN0c1wiXSxcclxuICAgICAgICAgICAgdGhpcy5ncm91bmQuZ2V0Q29tcG9uZW50KClbXCJzcHJpdGVzXCJdLFxyXG4gICAgICAgICAgICB0aGlzLmdyb3VuZC5nZXRDb21wb25lbnQoKVtcInRleHRPYmplY3RzXCJdXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gaGlkZW4gcGFuZWxHYW1lT3ZlclxyXG4gICAgICAgIHRoaXMscGFuZWxHYW1lT3Zlci5zZXRBY3RpdmUoZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQoXHJcbiAgICAgICAgICAgIHRoaXMucGFuZWxHYW1lT3Zlci5nZXRDb21wb25lbnQoKVtcImltYWdlT2JqZWN0c1wiXSxcclxuICAgICAgICAgICAgdGhpcy5wYW5lbEdhbWVPdmVyLmdldENvbXBvbmVudCgpW1wic3ByaXRlc1wiXSxcclxuICAgICAgICAgICAgdGhpcy5wYW5lbEdhbWVPdmVyLmdldENvbXBvbmVudCgpW1widGV4dE9iamVjdHNcIl1cclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICB1cGRhdGUodGltZTogbnVtYmVyLCBkZWx0YVRpbWU6IG51bWJlcikge1xyXG4gICAgICAgIGlmKCAhdGhpcy5kZWFkQmlyZCl7XHJcbiAgICAgICAgICAgIHRoaXMuYWR0ICs9IGRlbHRhVGltZVxyXG4gICAgICAgICAgICB2YXIgZ3JvdW5kID0gdGhpcy5pbWFnZU9iamVjdHMuZmlsdGVyKChpbWIpPT57XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaW1iLm5hbWUgPT09IFwiZ3JvdW5kXCI7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBwaXBlcyA9IHRoaXMuaW1hZ2VPYmplY3RzLmZpbHRlcigoaW1iKT0+e1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGltYi5uYW1lID09PSBcInBpcGVcIjtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB2YXIgY2hlY2tTY29yZSA9IHRoaXMuaW1hZ2VPYmplY3RzLmZpbHRlcigoaW1iKT0+e1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGltYi5uYW1lID09PSBcImNoZWNrU2NvcmVcIjtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgaWYodGhpcy5hZHQ+PXRoaXMucmF0ZSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkdCAtPSB0aGlzLnJhdGU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdyb3VuZC51cGRhdGUoKTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDx0aGlzLmltYWdlT2JqZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2VPYmplY3RzW2ldLnVwZGF0ZSh0aW1lLCBkZWx0YVRpbWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPHRoaXMuc3ByaXRlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuc3ByaXRlc1tpXS5uYW1lID09PSBcImJpcmRcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcih2YXIgaiA9IDA7IGogPCBwaXBlcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5Db2xsaXNpb24ocGlwZXNbal0sdGhpcy5zcHJpdGVzW2ldKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja1BpcGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZ2FtZSBvdmVyIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IGNoZWNrU2NvcmUubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuQ29sbGlzaW9uKGNoZWNrU2NvcmVba10sdGhpcy5zcHJpdGVzW2ldKSYmIHRoaXMuYWRkU2NvcmUgIT0gayl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY29yZS5zZXRDdXJyZW50U2NvcmUodGhpcy5zY29yZS5nZXRDdXJyZW50U2NvcmUoKSsxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRleHRTY29yZS5jb250ZW50ID0gXCJTY29yZTogXCIgKyB0aGlzLnNjb3JlLmdldEN1cnJlbnRTY29yZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkU2NvcmUgPSBrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50LnBsYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBpcGVzLmxpc3RQaXBlLm1hcCgocGlwZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGlwZS51cGRhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlc1tpXS51cGRhdGUodGltZSxkZWx0YVRpbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmlucHV0S2V5PT09XCJTcGFjZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJpcmQuZmx5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzLmNoZWNrUGlwZSYmKCF0aGlzLkNvbGxpc2lvbihncm91bmRbMF0sIHRoaXMuc3ByaXRlc1tpXSkmJiF0aGlzLkNvbGxpc2lvbihncm91bmRbMV0sIHRoaXMuc3ByaXRlc1tpXSkpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVzW2ldLnVwZGF0ZSh0aW1lLGRlbHRhVGltZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidGVzdFwiLCBncm91bmQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuQ29sbGlzaW9uKGdyb3VuZFswXSwgdGhpcy5zcHJpdGVzW2ldKXx8dGhpcy5Db2xsaXNpb24oZ3JvdW5kWzFdLCB0aGlzLnNwcml0ZXNbaV0pfHx0aGlzLmNoZWNrUGlwZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnNjb3JlLmdldEN1cnJlbnRTY29yZSgpPiB0aGlzLnNjb3JlLmdldEhpZ2hTY29yZSgpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NvcmUuc2V0SGlnaFNjb3JlKHRoaXMuc2NvcmUuZ2V0Q3VycmVudFNjb3JlKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2hvdyBwYW5lbEdhbWVPdmVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBhbmVsR2FtZU92ZXIuc2V0QWN0aXZlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdXBkYXRlIHNjb3JlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBhbmVsR2FtZU92ZXIudXBkYXRlKHRoaXMuc2NvcmUuZ2V0Q3VycmVudFNjb3JlKCksIHRoaXMuc2NvcmUuZ2V0SGlnaFNjb3JlKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2V0IHN0YXRlIGJpcmQgaXMgZGllXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlYWRCaXJkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwbGF5IGF1ZGlvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdWRpb1BsYXllci5wYXVzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGl0LnBsYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGllLnBsYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgNTAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVzW2ldLnVwZGF0ZSh0aW1lLGRlbHRhVGltZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBpcGVzLnVwZGF0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodGhpcy5kZWFkQmlyZCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuaW5wdXRLZXkgPT09IFwiRW50ZXJcInx8KHRoaXMubW91c2VFdmVudCE9bnVsbCYmIHRoaXMucGFuZWxHYW1lT3Zlci5yZXBsYXlCdXR0b24uaXNJbnNpZGUodGhpcy5tb3VzZUV2ZW50KSkpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZWFkQmlyZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYW5lbEdhbWVPdmVyLnNldEFjdGl2ZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0U2NlbmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gMTtcclxuICAgIH1cclxuICAgIHJlc2V0U2NlbmUoKXtcclxuICAgICAgICBhdWRpb1BsYXllci5wbGF5KCk7XHJcbiAgICAgICAgYXVkaW9QbGF5ZXIubG9vcCA9dHJ1ZTtcclxuICAgICAgICB0aGlzLmNoZWNrUGlwZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYWRkU2NvcmUgPSBudWxsO1xyXG4gICAgICAgIHN1cGVyLnJlc2V0U2NlbmUoKTtcclxuICAgICAgICB0aGlzLnNjb3JlLnNldEN1cnJlbnRTY29yZSgwKTtcclxuICAgICAgICB0aGlzLmJpcmQucmVzZXQoKTtcclxuICAgICAgICB0aGlzLmdyb3VuZC5yZXNldCgpO1xyXG4gICAgICAgIHRoaXMudGV4dFNjb3JlLnNldENvbnRlbnQoXCJTY29yZTogMFwiKTtcclxuICAgICAgICBmb3IodmFyIGk9MDtpPHRoaXMucGlwZXMubGlzdFBpcGUubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIHRoaXMucGlwZXMubGlzdFBpcGVbaV0ucmVzZXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJyZW5kZXJpbmdcIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbnZhciBwbGF5U2NlbmUgPSBuZXcgUGxheVNjZW5lKCk7XHJcbmV4cG9ydCB7cGxheVNjZW5lfTsiLCJjbGFzcyBTY29yZXtcclxuICAgIHByaXZhdGUgaGlnaFNjb3JlOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIGN1cnJlbnRTY29yZTogbnVtYmVyO1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICB0aGlzLmhpZ2hTY29yZSA9IDA7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50U2NvcmUgPSAwO1xyXG4gICAgfVxyXG4gICAgc2V0Q3VycmVudFNjb3JlKHNjb3JlOiBudW1iZXIpe1xyXG4gICAgICAgIHRoaXMuY3VycmVudFNjb3JlID0gc2NvcmU7XHJcbiAgICB9XHJcbiAgICBnZXRDdXJyZW50U2NvcmUoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50U2NvcmU7XHJcbiAgICB9XHJcbiAgICBnZXRIaWdoU2NvcmUoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5oaWdoU2NvcmU7XHJcbiAgICB9XHJcbiAgICBzZXRIaWdoU2NvcmUoaGlnaFNjb3JlOiBudW1iZXIpe1xyXG4gICAgICAgIHRoaXMuaGlnaFNjb3JlID0gaGlnaFNjb3JlO1xyXG4gICAgfVxyXG59XHJcblxyXG52YXIgc2NvcmUgPSBuZXcgU2NvcmUoKTtcclxuZXhwb3J0IHtzY29yZSxTY29yZX07IiwiaW1wb3J0IHtTY2VuZX0gZnJvbSAnLi4vRW5naW5lL1NjZW5lL1NjZW5lJztcclxuaW1wb3J0IHsgSW1hZ2VPYmplY3QgfSBmcm9tICcuLi9FbmdpbmUvSW1hZ2VPYmplY3QvSW1hZ2VPYmplY3QnO1xyXG5pbXBvcnQgeyBCdXR0b25PYmplY3QgfSBmcm9tICcuLi9FbmdpbmUvQnV0dG9uT2JqZWN0L0J1dHRvbk9iamVjdCc7XHJcbmltcG9ydCB7Z3JvdW5kfSBmcm9tIFwiLi9Hcm91bmRcIlxyXG5jb25zdCBmcHMgPSA2MDtcclxuY2xhc3MgU3RhcnRTY2VuZSBleHRlbmRzIFNjZW5lIHtcclxuICAgIHJhdGU6IG51bWJlcjtcclxuICAgIGFkdDogbnVtYmVyOyAgICAvL2FjY3VtdWxhdGVkIGRlbHRhIHRpbWVcclxuICAgIGJhY2tncm91bmQ6IEltYWdlT2JqZWN0O1xyXG4gICAgZ3JvdW5kID0gZ3JvdW5kO1xyXG4gICAgaW1nU3RhcnQ6IEltYWdlT2JqZWN0O1xyXG4gICAgYnV0dG9uU3RhcnQ6IEJ1dHRvbk9iamVjdFxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMucmF0ZSA9IDEuMC9mcHMqMTAwMDtcclxuICAgICAgICB0aGlzLmFkdCA9IDAuMDtcclxuICAgICAgICB0aGlzLmJhY2tncm91bmQgPW5ldyBJbWFnZU9iamVjdCgwLDAsNzAwLDgwMCxcIi4uL0ltYWdlcy9iYWNrZ3JvdW5kLW5pZ2h0LnBuZ1wiLDAsXCJiYWNrZ3JvdW5kXCIpO1xyXG4gICAgICAgIHRoaXMuaW1nU3RhcnQgPSBuZXcgSW1hZ2VPYmplY3QoNTAsMjAsNTAwLDcwMCxcIi4uL0ltYWdlcy9tZXNzYWdlLnBuZ1wiLDAsXCJcIik7XHJcbiAgICAgICAgdGhpcy5idXR0b25TdGFydCA9IG5ldyBCdXR0b25PYmplY3QoMCwwLDcwMCw4MDAsXCJcIiwwLFwiYnV0dG9uU3RhcnRcIik7XHJcblxyXG4gICAgICAgIHZhciBpbWFnZU9iamVjdHMgPSBbdGhpcy5iYWNrZ3JvdW5kXS5jb25jYXQodGhpcy5ncm91bmQuZ2V0Q29tcG9uZW50KClbXCJpbWFnZU9iamVjdHNcIl0pO1xyXG4gICAgICAgIGltYWdlT2JqZWN0cy5wdXNoKHRoaXMuaW1nU3RhcnQpO1xyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQoaW1hZ2VPYmplY3RzLFtdLFtdKTtcclxuICAgIH1cclxuICAgIHVwZGF0ZSh0aW1lOiBudW1iZXIsIGRlbHRhVGltZTogbnVtYmVyKXtcclxuICAgICAgICB0aGlzLmFkdCArPSBkZWx0YVRpbWU7XHJcbiAgICAgICAgaWYodGhpcy5hZHQ+PXRoaXMucmF0ZSl7XHJcbiAgICAgICAgICAgIHRoaXMuYWR0IC09IHRoaXMucmF0ZTtcclxuICAgICAgICAgICAgdGhpcy5ncm91bmQudXBkYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuaW5wdXRLZXkgPT09IFwiRW50ZXJcInx8KHRoaXMubW91c2VFdmVudCE9bnVsbCAmJiB0aGlzLmJ1dHRvblN0YXJ0LmlzSW5zaWRlKHRoaXMubW91c2VFdmVudCkpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5wdXRLZXkgPSBcIlwiO1xyXG4gICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG59XHJcblxyXG52YXIgc3RhcnRTY2VuZSA9IG5ldyBTdGFydFNjZW5lKCk7XHJcbmV4cG9ydCB7c3RhcnRTY2VuZX07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBzdGFydFNjZW5lIH0gZnJvbSBcIi4vZ2FtZS9TdGFydFNjZW5lXCI7XHJcbmltcG9ydCB7IFJlbmRlcmVyIH0gZnJvbSBcIi4vRW5naW5lL1JlbmRlcmVyL1JlbmRlcmVyXCI7XHJcbmltcG9ydCB7IFNjZW5lTWFuYWdlciB9IGZyb20gXCIuL0VuZ2luZS9TY2VuZS9TY2VuZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgR2FtZSB9IGZyb20gXCIuL0VuZ2luZS9Db3JlL0dhbWVcIjsgIFxyXG5pbXBvcnQge3BsYXlTY2VuZX0gZnJvbSBcIi4vZ2FtZS9QbGF5U2NlbmVcIjtcclxuXHJcbnZhciBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbXlDYW52YXMnKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcclxudmFyIHJlbmRlciA9IG5ldyBSZW5kZXJlcihjYW52YXMpXHJcbnZhciBnYW1lU2NlbmUgPSBuZXcgU2NlbmVNYW5hZ2VyKCk7XHJcbmdhbWVTY2VuZS5hZGRTY2VuZShzdGFydFNjZW5lKTtcclxuZ2FtZVNjZW5lLmFkZFNjZW5lKHBsYXlTY2VuZSk7XHJcbnZhciBteUdhbWUgPSBuZXcgR2FtZShnYW1lU2NlbmUpO1xyXG5teUdhbWUuc3RhcnQocmVuZGVyKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=