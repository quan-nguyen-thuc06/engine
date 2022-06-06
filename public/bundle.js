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
        document.addEventListener('keydown', (e) => this.sceneManager.scenes[this.sceneManager.currentScene]._onKeyDown(e));
        document.addEventListener('keyup', (e) => this.sceneManager.scenes[this.sceneManager.currentScene]._onKeyUp(e));
        document.addEventListener('mousedown', (e) => this.sceneManager.scenes[this.sceneManager.currentScene]._onMouseDown(e, render.canvas));
        document.addEventListener('mouseup', (e) => this.sceneManager.scenes[this.sceneManager.currentScene]._onMouseUp(e));
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
    constructor(x, y, width, height, name) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.name = name;
        this.defaultPosition = [x, y];
    }
    reset() {
        this.x = this.defaultPosition[0];
        this.y = this.defaultPosition[1];
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
        this.imageObjects = [];
        this.sprites = [];
        this.textObjects = [];
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
            render.drawImage(imageObject);
        });
        this.sprites.map((sprite) => {
            render.drawSprite(sprite);
        });
        this.textObjects.map((txt) => {
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
    // handleInputEvent(e: KeyboardEvent){
    //     this.inputKey = e.code;
    //     console.log(this.inputKey);
    // }
    _onKeyDown(e) {
        this.inputKey = e.code;
    }
    _onKeyUp(e) {
        this.inputKey = "";
    }
    _onMouseDown(e, canvas) {
        var rect = canvas.getBoundingClientRect();
        var mouseX = e.clientX - rect.left;
        var mouseY = e.clientY - rect.top;
        this.mouseEvent = [mouseX, mouseY];
        console.log(this.mouseEvent);
    }
    _onMouseUp(event) {
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
    constructor(x, y, width, height, images, degrees, gravity, speed) {
        super(x, y, width, height, images, degrees, "bird");
        this.gravity = gravity;
        this.speed = speed;
        this.pfs = 80;
        this.rate = 1.0 / this.pfs * 1000;
        this.adt = 0.0;
    }
    update(time, deltaTime) {
        this.y += this.speed + 0.5 * this.gravity;
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
/* harmony export */   "PairOfPipe": () => (/* binding */ PairOfPipe)
/* harmony export */ });
/* harmony import */ var _Engine_ImageObject_ImageObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Engine/ImageObject/ImageObject */ "./src/Engine/ImageObject/ImageObject.ts");

var pipeWidth = 80;
var blanks = 200;
const pipeHeight = 350;
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
/* harmony import */ var _Engine_ButtonObject_ButtonObject__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Engine/ButtonObject/ButtonObject */ "./src/Engine/ButtonObject/ButtonObject.ts");
/* harmony import */ var _Engine_ImageObject_ImageObject__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Engine/ImageObject/ImageObject */ "./src/Engine/ImageObject/ImageObject.ts");
/* harmony import */ var _Score__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Score */ "./src/game/Score.ts");
/* harmony import */ var _Ground__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Ground */ "./src/game/Ground.ts");








var point = new Audio("../audio/point.mp3");
var die = new Audio("../audio/die.mp3");
var hit = new Audio("../audio/hit.mp3");
var audioPlayer = new Audio("../audio/orchestrawav-26158.mp3");
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
const numPipe = 4;
const distance = 250;
const pipeWidth = 80;
const fps = 60;
class PlayScene extends _Engine_Scene_Scene__WEBPACK_IMPORTED_MODULE_0__.Scene {
    constructor() {
        audioPlayer.play();
        audioPlayer.loop = true;
        super();
        this.buttonReplay = new _Engine_ButtonObject_ButtonObject__WEBPACK_IMPORTED_MODULE_4__.ButtonObject(225, 500, 160, 80, "../Images/replay-button.png", 0, "replayButton");
        this.fps = fps;
        this.rate = 1.0 / fps * 1000;
        this.adt = 0.0;
        this.checkPipe = false;
        this.addScore = null;
        this.deadBird = false;
        this.score = new _Score__WEBPACK_IMPORTED_MODULE_6__.Score();
        this.ground = new _Ground__WEBPACK_IMPORTED_MODULE_7__.Ground(2);
        this.textScore = new _Engine_TextObject_TextObject__WEBPACK_IMPORTED_MODULE_3__.TextObject(10, 30, "score", "Score: " + this.score.getCurrentScore(), "18px Arial", "white");
        var bird = new _Bird__WEBPACK_IMPORTED_MODULE_1__.Bird(100, 30, 50, 50, imgBird, 0, 0.5, 0.1);
        this.bird = bird;
        var bg = new _Engine_ImageObject_ImageObject__WEBPACK_IMPORTED_MODULE_5__.ImageObject(0, 0, 700, 800, "../Images/background-night.png", 0, "background");
        this.pipes = [];
        this.addChild([bg], [bird], [this.textScore]);
        for (var i = 0; i < numPipe; i++) {
            var x = i * distance + pipeWidth + 400;
            var y = Math.floor(Math.random() * -200);
            var pipe = new _PairOfPipe__WEBPACK_IMPORTED_MODULE_2__.PairOfPipe(x, y, "../Images/pipe-green.png", 2);
            this.pipes.push(pipe);
            this.addChild([pipe.Pipes[0], pipe.Pipes[1], pipe.Pipes[2]], [], []);
        }
        this.addChild([this.ground.images[0], this.ground.images[1]], [], []);
        console.log(this.sprites.length);
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
                        this.pipes.map((pipe) => {
                            pipe.update();
                        });
                        this.sprites[i].update(time, deltaTime);
                        if (this.inputKey === "Space") {
                            this.bird.fly();
                            // this.inputKey = "";
                        }
                        else if (this.checkPipe && (!this.Collision(ground[0], this.sprites[i]) && !this.Collision(ground[1], this.sprites[i])))
                            this.sprites[i].update(time, deltaTime);
                        if (this.Collision(ground[0], this.sprites[i]) || this.Collision(ground[1], this.sprites[i]) || this.checkPipe) {
                            if (this.score.getCurrentScore() > this.score.getHighScore())
                                this.score.setHighScore(this.score.getCurrentScore());
                            console.log("Score: " + this.score.getCurrentScore() + "High Score: " + this.score.getHighScore());
                            var imgGameOver = new _Engine_ImageObject_ImageObject__WEBPACK_IMPORTED_MODULE_5__.ImageObject(60, 300, 500, 130, "../Images/gameover.png", 0, "gameOver");
                            var Score = new _Engine_TextObject_TextObject__WEBPACK_IMPORTED_MODULE_3__.TextObject(110, 470, "showScore", "Score: " + this.score.getCurrentScore(), "30px Arial", "white");
                            var highScore = new _Engine_TextObject_TextObject__WEBPACK_IMPORTED_MODULE_3__.TextObject(330, 470, "highScore", "High Score: " + this.score.getHighScore(), "30px Arial", "white");
                            this.addChild([imgGameOver, this.buttonReplay], [], [Score, highScore]);
                            this.deadBird = true;
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
                this.pipes.map((pipe, index) => {
                    if (pipe.Pipes[0].x < -100) {
                        var frontIndex = index - 1;
                        if (frontIndex < 0)
                            frontIndex = this.pipes.length - 1;
                        for (var i = 0; i < pipe.Pipes.length; i++) {
                            pipe.Pipes[i].x = this.pipes[frontIndex].Pipes[i].x + distance;
                        }
                    }
                });
            }
        }
        else if (this.deadBird) {
            if (this.inputKey === "Enter" || (this.mouseEvent != null && this.buttonReplay.isInside(this.mouseEvent))) {
                this.deadBird = false;
                this.removeChild([this.buttonReplay], []);
                this.imageObjects.pop();
                this.imageObjects.pop();
                this.textObjects.pop();
                this.textObjects.pop();
                this.resetScene();
            }
        }
        return 1;
    }
    resetScene() {
        audioPlayer.play();
        audioPlayer.loop = true;
        // super.resetScene();
        this.checkPipe = false;
        this.addScore = null;
        this.score.setCurrentScore(0);
        this.bird.reset();
        this.ground.reset();
        this.deadBird = false;
        // this.ground = new Ground(2);
        // this.textScore = new TextObject(10,30,"score","Score: "+ this.score.getCurrentScore(), "18px Arial","white");
        // var bird = new Bird(100,30,50,50,
        //     imgBird,0,0.5,0.1
        //     );
        // this.bird = bird;
        // var bg = new ImageObject(0,0,700,800,"../Images/background-night.png",0,"background",);
        // this.pipes = []
        // this.addChild([bg],[bird],[this.textScore]);
        for (var i = 0; i < numPipe; i++) {
            // var x = i*distance + pipeWidth + 400;
            // var y = Math.floor(Math.random() *-200);
            // var pipe = new PairOfPipe(x,y,"../Images/pipe-green.png",2);
            // this.pipes.push(pipe);
            // this.addChild([pipe.Pipes[0],pipe.Pipes[1],pipe.Pipes[2]],[],[]);
            this.pipes[i].reset();
        }
        // this.addChild([this.ground.images[0],this.ground.images[1]],[],[]);
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
/* harmony export */   "StartScreen": () => (/* binding */ StartScreen)
/* harmony export */ });
/* harmony import */ var _Engine_Scene_Scene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Engine/Scene/Scene */ "./src/Engine/Scene/Scene.ts");
/* harmony import */ var _Engine_ImageObject_ImageObject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Engine/ImageObject/ImageObject */ "./src/Engine/ImageObject/ImageObject.ts");
/* harmony import */ var _Engine_ButtonObject_ButtonObject__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Engine/ButtonObject/ButtonObject */ "./src/Engine/ButtonObject/ButtonObject.ts");



class StartScreen extends _Engine_Scene_Scene__WEBPACK_IMPORTED_MODULE_0__.Scene {
    constructor() {
        super();
        this.background = new _Engine_ImageObject_ImageObject__WEBPACK_IMPORTED_MODULE_1__.ImageObject(0, 0, 700, 800, "../Images/background-night.png", 0, "background");
        this.ground = new _Engine_ImageObject_ImageObject__WEBPACK_IMPORTED_MODULE_1__.ImageObject(0, 670, 700, 150, "../Images/base.png", 0, "ground");
        this.imgStart = new _Engine_ImageObject_ImageObject__WEBPACK_IMPORTED_MODULE_1__.ImageObject(50, 20, 500, 700, "../Images/message.png", 0, "");
        this.buttonStart = new _Engine_ButtonObject_ButtonObject__WEBPACK_IMPORTED_MODULE_2__.ButtonObject(0, 0, 700, 800, "", 0, "buttonStart");
        this.addChild([this.background, this.ground, this.imgStart], [], []);
    }
    update(time, delta) {
        if (this.inputKey === "Enter" || (this.mouseEvent != null && this.buttonStart.isInside(this.mouseEvent))) {
            this.inputKey = "";
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





var startScreen = new _game_StartScene__WEBPACK_IMPORTED_MODULE_0__.StartScreen();
const canvas = document.getElementById('myCanvas');
var render = new _Engine_Renderer_Renderer__WEBPACK_IMPORTED_MODULE_1__.Renderer(canvas);
var gamePlay = new _game_PlayScene__WEBPACK_IMPORTED_MODULE_4__.PlayScene();
var gameScene = new _Engine_Scene_SceneManager__WEBPACK_IMPORTED_MODULE_2__.SceneManager();
gameScene.addScene(startScreen);
gameScene.addScene(gamePlay);
// gameScene.addScene(gameOverScreen);
var myGame = new _Engine_Core_Game__WEBPACK_IMPORTED_MODULE_3__.Game(gameScene);
myGame.start(render);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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TSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFzQixDQUFDO0FBQ3hFLElBQUksTUFBTSxHQUFHLElBQUksK0RBQVEsQ0FBQyxNQUFNLENBQUM7QUFDakMsSUFBSSxRQUFRLEdBQUcsSUFBSSxzREFBUyxFQUFFLENBQUM7QUFDL0IsSUFBSSxTQUFTLEdBQUcsSUFBSSxvRUFBWSxFQUFFLENBQUM7QUFDbkMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNoQyxTQUFTLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzdCLHNDQUFzQztBQUN0QyxJQUFJLE1BQU0sR0FBRyxJQUFJLG1EQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDakMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3dlZWsxLy4vc3JjL0VuZ2luZS9CdXR0b25PYmplY3QvQnV0dG9uT2JqZWN0LnRzIiwid2VicGFjazovL3dlZWsxLy4vc3JjL0VuZ2luZS9Db3JlL0dhbWUudHMiLCJ3ZWJwYWNrOi8vd2VlazEvLi9zcmMvRW5naW5lL0dhbWVPYmplY3QvR2FtZU9iamVjdC50cyIsIndlYnBhY2s6Ly93ZWVrMS8uL3NyYy9FbmdpbmUvSW1hZ2VPYmplY3QvSW1hZ2VPYmplY3QudHMiLCJ3ZWJwYWNrOi8vd2VlazEvLi9zcmMvRW5naW5lL1JlbmRlcmVyL1JlbmRlcmVyLnRzIiwid2VicGFjazovL3dlZWsxLy4vc3JjL0VuZ2luZS9TY2VuZS9TY2VuZS50cyIsIndlYnBhY2s6Ly93ZWVrMS8uL3NyYy9FbmdpbmUvU2NlbmUvU2NlbmVNYW5hZ2VyLnRzIiwid2VicGFjazovL3dlZWsxLy4vc3JjL0VuZ2luZS9TcHJpdGUvU3ByaXRlLnRzIiwid2VicGFjazovL3dlZWsxLy4vc3JjL0VuZ2luZS9UZXh0T2JqZWN0L1RleHRPYmplY3QudHMiLCJ3ZWJwYWNrOi8vd2VlazEvLi9zcmMvZ2FtZS9CaXJkLnRzIiwid2VicGFjazovL3dlZWsxLy4vc3JjL2dhbWUvR3JvdW5kLnRzIiwid2VicGFjazovL3dlZWsxLy4vc3JjL2dhbWUvUGFpck9mUGlwZS50cyIsIndlYnBhY2s6Ly93ZWVrMS8uL3NyYy9nYW1lL1BsYXlTY2VuZS50cyIsIndlYnBhY2s6Ly93ZWVrMS8uL3NyYy9nYW1lL1Njb3JlLnRzIiwid2VicGFjazovL3dlZWsxLy4vc3JjL2dhbWUvU3RhcnRTY2VuZS50cyIsIndlYnBhY2s6Ly93ZWVrMS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWVrMS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VlazEvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWVrMS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlZWsxLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEltYWdlT2JqZWN0fSBmcm9tIFwiLi4vSW1hZ2VPYmplY3QvSW1hZ2VPYmplY3RcIjtcclxuZXhwb3J0IGNsYXNzIEJ1dHRvbk9iamVjdCBleHRlbmRzIEltYWdlT2JqZWN0e1xyXG4gICAgY29uc3RydWN0b3IoeDogbnVtYmVyLCB5OiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLGltYWdlOiBzdHJpbmcsIGRlZ3JlZXM6IG51bWJlciwgbmFtZTogc3RyaW5nKXtcclxuICAgICAgICBzdXBlcih4LCB5LCB3aWR0aCwgaGVpZ2h0LGltYWdlLCBkZWdyZWVzLCBuYW1lKTtcclxuICAgIH1cclxuICAgIGlzSW5zaWRlKHBvczogQXJyYXk8bnVtYmVyPil7XHJcbiAgICAgICAgaWYocG9zLmxlbmd0aCA8IDIpIHJldHVybiBmYWxzZTtcclxuICAgICAgICByZXR1cm4gcG9zWzBdID4gdGhpcy54ICYmIHBvc1swXSA8IHRoaXMueCt0aGlzLndpZHRoICYmIHBvc1sxXSA8IHRoaXMueSt0aGlzLmhlaWdodCAmJiBwb3NbMV0gPiB0aGlzLnk7XHJcbiAgICB9ICAgIFxyXG59IiwiaW1wb3J0IHsgU2NlbmVNYW5hZ2VyIH0gZnJvbSBcIi4uL1NjZW5lL1NjZW5lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBSZW5kZXJlciB9IGZyb20gXCIuLi9SZW5kZXJlci9SZW5kZXJlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEdhbWV7XHJcbiAgICBzY2VuZU1hbmFnZXI6IFNjZW5lTWFuYWdlcjtcclxuICAgIGxhc3RUaW1lOiBudW1iZXIgfCBudWxsO1xyXG4gICAgY29uc3RydWN0b3Ioc2NlbmVNYW5hZ2VyOiBTY2VuZU1hbmFnZXIpe1xyXG4gICAgICAgIHRoaXMuc2NlbmVNYW5hZ2VyID0gc2NlbmVNYW5hZ2VyO1xyXG4gICAgICAgIHRoaXMubGFzdFRpbWUgPSBudWxsO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBzdGFydChyZW5kZXI6IFJlbmRlcmVyKXtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywoZSk9PnRoaXMuc2NlbmVNYW5hZ2VyLnNjZW5lc1t0aGlzLnNjZW5lTWFuYWdlci5jdXJyZW50U2NlbmVdLl9vbktleURvd24oZSkpO1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywoZSk9PnRoaXMuc2NlbmVNYW5hZ2VyLnNjZW5lc1t0aGlzLnNjZW5lTWFuYWdlci5jdXJyZW50U2NlbmVdLl9vbktleVVwKGUpKTtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLChlKT0+dGhpcy5zY2VuZU1hbmFnZXIuc2NlbmVzW3RoaXMuc2NlbmVNYW5hZ2VyLmN1cnJlbnRTY2VuZV0uX29uTW91c2VEb3duKGUscmVuZGVyLmNhbnZhcykpO1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLChlKT0+dGhpcy5zY2VuZU1hbmFnZXIuc2NlbmVzW3RoaXMuc2NlbmVNYW5hZ2VyLmN1cnJlbnRTY2VuZV0uX29uTW91c2VVcChlKSk7XHJcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpPT50aGlzLmxvb3AocmVuZGVyKSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGxvb3AocmVuZGVyOiBSZW5kZXJlcil7XHJcbiAgICAgICAgdmFyIGluZGV4U2NlbmUgPSB0aGlzLnNjZW5lTWFuYWdlci5jdXJyZW50U2NlbmU7XHJcbiAgICAgICAgY29uc3QgdGltZSA9IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKTtcclxuICAgICAgICBpZih0aGlzLmxhc3RUaW1lID09IG51bGwpe1xyXG4gICAgICAgICAgICBpbmRleFNjZW5lID0gdGhpcy5zY2VuZU1hbmFnZXIuc2NlbmVzW3RoaXMuc2NlbmVNYW5hZ2VyLmN1cnJlbnRTY2VuZV0udXBkYXRlKHRpbWUsIDApO1xyXG4gICAgICAgICAgICB0aGlzLnNjZW5lTWFuYWdlci5zY2VuZXNbdGhpcy5zY2VuZU1hbmFnZXIuY3VycmVudFNjZW5lXS5yZW5kZXIocmVuZGVyKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGNvbnN0IGRlbHRhID0gdGltZSAtIHRoaXMubGFzdFRpbWU7XHJcbiAgICAgICAgICAgIGluZGV4U2NlbmUgPSB0aGlzLnNjZW5lTWFuYWdlci5zY2VuZXNbdGhpcy5zY2VuZU1hbmFnZXIuY3VycmVudFNjZW5lXS51cGRhdGUodGltZSxkZWx0YSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2NlbmVNYW5hZ2VyLnNjZW5lc1t0aGlzLnNjZW5lTWFuYWdlci5jdXJyZW50U2NlbmVdLnJlbmRlcihyZW5kZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihpbmRleFNjZW5lIT10aGlzLnNjZW5lTWFuYWdlci5jdXJyZW50U2NlbmUpe1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTY2VuZShpbmRleFNjZW5lKTtcclxuICAgICAgICAgICAgdGhpcy5zY2VuZU1hbmFnZXIuc2NlbmVzW2luZGV4U2NlbmVdLnJlc2V0U2NlbmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sYXN0VGltZSA9IHRpbWU7XHJcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpPT50aGlzLmxvb3AocmVuZGVyKSk7XHJcbiAgICB9XHJcbiAgICBsb2FkU2NlbmUoaW5kZXhTY2VuZTogbnVtYmVyKXtcclxuICAgICAgICB0aGlzLnNjZW5lTWFuYWdlci5jdXJyZW50U2NlbmUgPSBpbmRleFNjZW5lO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGNsYXNzIEdhbWVPYmplY3R7XHJcbiAgICB4OiBudW1iZXI7XHJcbiAgICB5OiBudW1iZXI7XHJcbiAgICB3aWR0aDogbnVtYmVyO1xyXG4gICAgaGVpZ2h0OiBudW1iZXI7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICBkZWZhdWx0UG9zaXRpb246IEFycmF5PG51bWJlcj47XHJcbiAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIG5hbWU6IHN0cmluZyl7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcclxuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMuZGVmYXVsdFBvc2l0aW9uID0gW3gseV07XHJcbiAgICB9XHJcbiAgICByZXNldCgpe1xyXG4gICAgICAgIHRoaXMueCA9IHRoaXMuZGVmYXVsdFBvc2l0aW9uWzBdO1xyXG4gICAgICAgIHRoaXMueSA9IHRoaXMuZGVmYXVsdFBvc2l0aW9uWzFdO1xyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCB7R2FtZU9iamVjdH0gZnJvbSBcIi4uL0dhbWVPYmplY3QvR2FtZU9iamVjdFwiXHJcbmV4cG9ydCBjbGFzcyBJbWFnZU9iamVjdCBleHRlbmRzIEdhbWVPYmplY3R7XHJcbiAgICBpbWFnZTogc3RyaW5nO1xyXG4gICAgZGVncmVlczogbnVtYmVyO1xyXG4gICAgY29uc3RydWN0b3IoeDogbnVtYmVyLCB5OiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLGltYWdlOiBzdHJpbmcsIGRlZ3JlZXM6IG51bWJlciwgbmFtZTogc3RyaW5nKXtcclxuICAgICAgICBzdXBlcih4LCB5LCB3aWR0aCwgaGVpZ2h0LG5hbWUpO1xyXG4gICAgICAgIHRoaXMuaW1hZ2UgPSBpbWFnZTtcclxuICAgICAgICB0aGlzLmRlZ3JlZXMgPSBkZWdyZWVzO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKHRpbWU6IG51bWJlciwgZGVsdGFUaW1lOm51bWJlcil7fVxyXG59IiwiaW1wb3J0IHsgSW1hZ2VPYmplY3QgfSBmcm9tIFwiLi4vSW1hZ2VPYmplY3QvSW1hZ2VPYmplY3RcIjtcclxuaW1wb3J0IHsgU3ByaXRlIH0gZnJvbSBcIi4uL1Nwcml0ZS9TcHJpdGVcIjtcclxuaW1wb3J0IHsgVGV4dE9iamVjdCB9IGZyb20gXCIuLi9UZXh0T2JqZWN0L1RleHRPYmplY3RcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBSZW5kZXJlcntcclxuICAgIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XHJcbiAgICBjb25zdHJ1Y3RvcihjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50KXtcclxuICAgICAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcztcclxuICAgIH1cclxuICAgIGRyYXdJbWFnZShpbWFnZU9iamVjdDogSW1hZ2VPYmplY3Qpe1xyXG4gICAgICAgIGNvbnN0IGN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICAgICAgdmFyIGltZyA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgIGltZy5zcmMgPSBpbWFnZU9iamVjdC5pbWFnZTtcclxuICAgICAgICBpZihjdHghPW51bGwpe1xyXG4gICAgICAgICAgICBjdHguc2F2ZSgpO1xyXG4gICAgICAgICAgICBjdHgudHJhbnNsYXRlKGltYWdlT2JqZWN0LnggKyBpbWFnZU9iamVjdC53aWR0aC8yLGltYWdlT2JqZWN0LnkgKyBpbWFnZU9iamVjdC5oZWlnaHQvMilcclxuICAgICAgICAgICAgY3R4LnJvdGF0ZShpbWFnZU9iamVjdC5kZWdyZWVzKk1hdGguUEkvMTgwKTtcclxuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShpbWcsLWltYWdlT2JqZWN0LndpZHRoLzIsIC1pbWFnZU9iamVjdC5oZWlnaHQvMixpbWFnZU9iamVjdC53aWR0aCxpbWFnZU9iamVjdC5oZWlnaHQpO1xyXG4gICAgICAgICAgICBjdHgucmVzdG9yZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGRyYXdTcHJpdGUoc3ByaXRlOiBTcHJpdGUpe1xyXG4gICAgICAgIGNvbnN0IGN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICAgICAgdmFyIGltZyA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgIGlmKGN0eCE9bnVsbCl7XHJcbiAgICAgICAgICAgIGltZy5zcmMgPSBzcHJpdGUuaW1hZ2VzW3Nwcml0ZS5mYW1lQ3VycmVudF07XHJcbiAgICAgICAgICAgIC8vIGN0eC5jbGVhclJlY3QoMCwgMCwgd2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7XHJcbiAgICAgICAgICAgIGN0eC5zYXZlKCk7XHJcbiAgICAgICAgICAgIGN0eC50cmFuc2xhdGUoc3ByaXRlLnggKyBzcHJpdGUud2lkdGgvMixzcHJpdGUueSArIHNwcml0ZS5oZWlnaHQvMilcclxuICAgICAgICAgICAgY3R4LnJvdGF0ZShzcHJpdGUuZGVncmVlcypNYXRoLlBJLzE4MCk7XHJcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoaW1nLC1zcHJpdGUud2lkdGgvMiwgLXNwcml0ZS5oZWlnaHQvMixzcHJpdGUud2lkdGgsc3ByaXRlLmhlaWdodCk7XHJcbiAgICAgICAgICAgIGN0eC5yZXN0b3JlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZHJhd1RleHQodGV4dDogVGV4dE9iamVjdCl7XHJcbiAgICAgICAgY29uc3QgY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgICAgICBpZihjdHghPW51bGwpe1xyXG4gICAgICAgICAgICBjdHguZm9udCA9IHRleHQuZm9udDtcclxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHRleHQuY29sb3I7XHJcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dCh0ZXh0LmNvbnRlbnQsdGV4dC54LHRleHQueSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgSW1hZ2VPYmplY3QgfSBmcm9tIFwiLi4vSW1hZ2VPYmplY3QvSW1hZ2VPYmplY3RcIjtcclxuaW1wb3J0IHsgU3ByaXRlIH0gZnJvbSBcIi4uL1Nwcml0ZS9TcHJpdGVcIjtcclxuaW1wb3J0IHsgVGV4dE9iamVjdCB9IGZyb20gXCIuLi9UZXh0T2JqZWN0L1RleHRPYmplY3RcIjtcclxuaW1wb3J0IHtSZW5kZXJlcn0gZnJvbSBcIi4uL1JlbmRlcmVyL1JlbmRlcmVyXCI7XHJcbmltcG9ydCB7R2FtZU9iamVjdH0gZnJvbSBcIi4uL0dhbWVPYmplY3QvR2FtZU9iamVjdFwiO1xyXG5leHBvcnQgY2xhc3MgU2NlbmV7XHJcbiAgICBpbWFnZU9iamVjdHM6IEltYWdlT2JqZWN0W107XHJcbiAgICBzcHJpdGVzOiBTcHJpdGVbXTtcclxuICAgIHRleHRPYmplY3RzOiBUZXh0T2JqZWN0W107IFxyXG4gICAgaW5wdXRLZXkgOiBTdHJpbmc7XHJcbiAgICBtb3VzZUV2ZW50IDogQXJyYXk8bnVtYmVyPiB8IG51bGw7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMuaW1hZ2VPYmplY3RzID0gW107XHJcbiAgICAgICAgdGhpcy5zcHJpdGVzID0gW107XHJcbiAgICAgICAgdGhpcy50ZXh0T2JqZWN0cyA9IFtdO1xyXG4gICAgICAgIHRoaXMuaW5wdXRLZXkgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMubW91c2VFdmVudCA9IG51bGw7XHJcbiAgICB9XHJcbiAgICByZXNldFNjZW5lKCl7XHJcbiAgICAgICAgdGhpcy5pbWFnZU9iamVjdHMgPSBbXTtcclxuICAgICAgICB0aGlzLnNwcml0ZXMgPSBbXTtcclxuICAgICAgICB0aGlzLnRleHRPYmplY3RzID0gW107XHJcbiAgICAgICAgdGhpcy5pbnB1dEtleSA9IFwiXCI7XHJcbiAgICB9XHJcbiAgICBhZGRDaGlsZChpbWFnZU9iamVjdHM6IEltYWdlT2JqZWN0W10sc3ByaXRlczogU3ByaXRlW10sIHRleHRPYmplY3RzOiBUZXh0T2JqZWN0W10pe1xyXG4gICAgICAgIGltYWdlT2JqZWN0cy5tYXAoaW1hZ2VPYmplY3QgPT4gdGhpcy5pbWFnZU9iamVjdHMucHVzaChpbWFnZU9iamVjdCkpO1xyXG4gICAgICAgIHNwcml0ZXMubWFwKHNwcml0ZSA9PiB0aGlzLnNwcml0ZXMucHVzaChzcHJpdGUpKTtcclxuICAgICAgICB0ZXh0T2JqZWN0cy5tYXAodGV4dE9iamVjdCA9PiB0aGlzLnRleHRPYmplY3RzLnB1c2godGV4dE9iamVjdCkpO1xyXG4gICAgfVxyXG4gICAgcmVtb3ZlQ2hpbGQoaW1hZ2VPYmplY3RzOiBJbWFnZU9iamVjdFtdLHNwcml0ZXM6IFNwcml0ZVtdKXtcclxuICAgICAgICBpbWFnZU9iamVjdHMubWFwKGltYWdlT2JqZWN0ID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pbWFnZU9iamVjdHMgPSB0aGlzLmltYWdlT2JqZWN0cy5maWx0ZXIoKGltYik9PntcclxuICAgICAgICAgICAgICAgIHJldHVybiBpbWIhPSBpbWFnZU9iamVjdDtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIHNwcml0ZXMubWFwKHNwcml0ZSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc3ByaXRlcyA9IHRoaXMuc3ByaXRlcy5maWx0ZXIoKHNwdCk9PntcclxuICAgICAgICAgICAgICAgIHJldHVybiBzcHQhPSBzcHJpdGU7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIocmVuZGVyOiBSZW5kZXJlcil7XHJcbiAgICAgICAgdGhpcy5pbWFnZU9iamVjdHMubWFwKChpbWFnZU9iamVjdCk9PntcclxuICAgICAgICAgICAgcmVuZGVyLmRyYXdJbWFnZShpbWFnZU9iamVjdCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLnNwcml0ZXMubWFwKChzcHJpdGUpPT57XHJcbiAgICAgICAgICAgIHJlbmRlci5kcmF3U3ByaXRlKHNwcml0ZSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLnRleHRPYmplY3RzLm1hcCgodHh0KT0+e1xyXG4gICAgICAgICAgICByZW5kZXIuZHJhd1RleHQodHh0KTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgLy8geHUgbHkgbG9naWNcclxuICAgIHVwZGF0ZSh0aW1lOiBudW1iZXIsIGRlbHRhOiBudW1iZXIpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8dGhpcy5pbWFnZU9iamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5pbWFnZU9iamVjdHNbaV0udXBkYXRlKHRpbWUsIGRlbHRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPHRoaXMuc3ByaXRlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLnNwcml0ZXNbaV0udXBkYXRlKHRpbWUsIGRlbHRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIDE7XHJcbiAgICB9XHJcbiAgICAvLyBoYW5kbGVJbnB1dEV2ZW50KGU6IEtleWJvYXJkRXZlbnQpe1xyXG4gICAgLy8gICAgIHRoaXMuaW5wdXRLZXkgPSBlLmNvZGU7XHJcbiAgICAvLyAgICAgY29uc29sZS5sb2codGhpcy5pbnB1dEtleSk7XHJcbiAgICAvLyB9XHJcbiAgICBfb25LZXlEb3duKGU6IEtleWJvYXJkRXZlbnQpe1xyXG4gICAgICAgIHRoaXMuaW5wdXRLZXkgPSBlLmNvZGU7XHJcbiAgICB9XHJcbiAgICBfb25LZXlVcChlOiBLZXlib2FyZEV2ZW50KXtcclxuICAgICAgICB0aGlzLmlucHV0S2V5ID0gXCJcIjtcclxuICAgIH1cclxuICAgIF9vbk1vdXNlRG93bihlOiBNb3VzZUV2ZW50LCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50KSB7XHJcbiAgICAgICAgdmFyIHJlY3QgPSBjYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgdmFyIG1vdXNlWCA9IGUuY2xpZW50WCAtIHJlY3QubGVmdDtcclxuICAgICAgICB2YXIgbW91c2VZID0gZS5jbGllbnRZIC0gcmVjdC50b3A7ICAgIFxyXG4gICAgICAgIHRoaXMubW91c2VFdmVudCA9IFttb3VzZVgsIG1vdXNlWV07XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5tb3VzZUV2ZW50KTtcclxuICAgIH1cclxuICAgIF9vbk1vdXNlVXAoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcclxuICAgICAgICB0aGlzLm1vdXNlRXZlbnQgPSBudWxsO1xyXG4gICAgfVxyXG4gICAgQ29sbGlzaW9uKG9iajEgOiBHYW1lT2JqZWN0LCBvYmoyIDogR2FtZU9iamVjdCl7XHJcbiAgICAgICAgaWYob2JqMS54KyBvYmoxLndpZHRoPj1vYmoyLnggJiYgb2JqMS54IDw9IG9iajIueCArIG9iajIud2lkdGgpe1xyXG4gICAgICAgICAgICBpZihvYmoxLnkrIG9iajEuaGVpZ2h0Pj1vYmoyLnkgJiYgb2JqMS55IDw9IG9iajIueSArIG9iajIuaGVpZ2h0KXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IFNjZW5lIH0gZnJvbSBcIi4vU2NlbmVcIjtcclxuZXhwb3J0IGNsYXNzIFNjZW5lTWFuYWdlciB7XHJcbiAgICBzY2VuZXM6IFNjZW5lW107XHJcbiAgICBjdXJyZW50U2NlbmU6IG51bWJlcjtcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICB0aGlzLnNjZW5lcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFNjZW5lID0gMDtcclxuICAgIH1cclxuICAgIGFkZFNjZW5lKHNjZW5lOiBTY2VuZSl7XHJcbiAgICAgICAgdGhpcy5zY2VuZXMucHVzaChzY2VuZSlcclxuICAgIH1cclxuICAgIHVwZGF0ZSgpe31cclxuICAgIHJlbmRlcigpe31cclxufSIsImltcG9ydCB7R2FtZU9iamVjdH0gZnJvbSBcIi4uL0dhbWVPYmplY3QvR2FtZU9iamVjdFwiXHJcbmV4cG9ydCBjbGFzcyBTcHJpdGUgZXh0ZW5kcyBHYW1lT2JqZWN0e1xyXG4gICAgaW1hZ2VzOiBBcnJheTxzdHJpbmc+O1xyXG4gICAgZGVncmVlczogbnVtYmVyO1xyXG4gICAgZmFtZUN1cnJlbnQ6IG51bWJlcjtcclxuICAgIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgaW1hZ2VzOiBBcnJheTxzdHJpbmc+LGRlZ3JlZXM6IG51bWJlcixuYW1lOiBzdHJpbmcpe1xyXG4gICAgICAgIHN1cGVyKHgsIHksIHdpZHRoLCBoZWlnaHQsbmFtZSk7XHJcbiAgICAgICAgdGhpcy5pbWFnZXMgPSBpbWFnZXM7XHJcbiAgICAgICAgdGhpcy5kZWdyZWVzID0gZGVncmVlcztcclxuICAgICAgICB0aGlzLmZhbWVDdXJyZW50ID0gMDtcclxuICAgIH1cclxuICAgIHVwZGF0ZSh0aW1lOiBudW1iZXIsIGRlbHRhVGltZTpudW1iZXIpe31cclxufSIsImltcG9ydCB7R2FtZU9iamVjdH0gZnJvbSBcIi4uL0dhbWVPYmplY3QvR2FtZU9iamVjdFwiXHJcbmV4cG9ydCBjbGFzcyBUZXh0T2JqZWN0IGV4dGVuZHMgR2FtZU9iamVjdHtcclxuICAgIGNvbnRlbnQ6IHN0cmluZztcclxuICAgIGZvbnQ6IHN0cmluZztcclxuICAgIGNvbG9yOiBzdHJpbmc7XHJcbiAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlciwgbmFtZTogc3RyaW5nICwgY29udGVudDogc3RyaW5nLCBmb250OiBzdHJpbmcsIGNvbG9yID0gXCJibGFja1wiKSB7XHJcbiAgICAgICAgc3VwZXIoeCwgeSwgMCwgMCwgbmFtZSk7XHJcbiAgICAgICAgdGhpcy5jb250ZW50ID0gY29udGVudDtcclxuICAgICAgICB0aGlzLmZvbnQgPSBmb250O1xyXG4gICAgICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcclxuICAgIH1cclxufSIsImltcG9ydCB7IFNwcml0ZSB9IGZyb20gXCIuLi9FbmdpbmUvU3ByaXRlL1Nwcml0ZVwiO1xyXG52YXIgYXVkaW8gPSBuZXcgQXVkaW8oXCIuLi9hdWRpby9zd29vc2gubXAzXCIpO1xyXG5leHBvcnQgY2xhc3MgQmlyZCBleHRlbmRzIFNwcml0ZSB7XHJcbiAgICBncmF2aXR5IDogbnVtYmVyO1xyXG4gICAgc3BlZWQgOiBudW1iZXI7XHJcbiAgICBwZnM6IG51bWJlcjtcclxuICAgIHJhdGU6IG51bWJlcjtcclxuICAgIGFkdDogbnVtYmVyOyAgXHJcbiAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsaW1hZ2VzOiBBcnJheTxzdHJpbmc+LGRlZ3JlZXM6IG51bWJlcixncmF2aXR5OiBudW1iZXIsc3BlZWQ6IG51bWJlcil7XHJcbiAgICAgICAgc3VwZXIoeCwgeSwgd2lkdGgsIGhlaWdodCxpbWFnZXMsZGVncmVlcyxcImJpcmRcIik7XHJcbiAgICAgICAgdGhpcy5ncmF2aXR5ID0gZ3Jhdml0eTtcclxuICAgICAgICB0aGlzLnNwZWVkID0gc3BlZWQ7XHJcbiAgICAgICAgdGhpcy5wZnMgPSA4MDtcclxuICAgICAgICB0aGlzLnJhdGUgPSAxLjAvdGhpcy5wZnMqMTAwMDtcclxuICAgICAgICB0aGlzLmFkdCA9IDAuMDtcclxuICAgIH1cclxuICAgIHVwZGF0ZSh0aW1lOiBudW1iZXIsIGRlbHRhVGltZTpudW1iZXIpe1xyXG4gICAgICAgIHRoaXMueSArPSB0aGlzLnNwZWVkICsgMC41KnRoaXMuZ3Jhdml0eTtcclxuICAgICAgICB0aGlzLnNwZWVkICs9IHRoaXMuZ3Jhdml0eTtcclxuICAgICAgICB0aGlzLmFkdCArPSBkZWx0YVRpbWVcclxuICAgICAgICBpZih0aGlzLnNwZWVkPjApe1xyXG4gICAgICAgICAgICB0aGlzLmRlZ3JlZXMgKz0gMTtcclxuICAgICAgICAgICAgaWYodGhpcy5kZWdyZWVzPjIwKSB0aGlzLmRlZ3JlZXMgPSAyMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5kZWdyZWVzIC09IDE7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZGVncmVlczwtMjApIHRoaXMuZGVncmVlcyA9IC0yMDtcclxuICAgICAgICAgICAgaWYodGhpcy5hZHQ+PXRoaXMucmF0ZSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkdCAtPSB0aGlzLnJhdGU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZhbWVDdXJyZW50Kz0xO1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5mYW1lQ3VycmVudD50aGlzLmltYWdlcy5sZW5ndGgtMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mYW1lQ3VycmVudCA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYodGhpcy5mYW1lQ3VycmVudD50aGlzLmltYWdlcy5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mYW1lQ3VycmVudCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmbHkoKXtcclxuICAgICAgICBhdWRpby5wbGF5KCk7IFxyXG4gICAgICAgIGF1ZGlvLnBsYXliYWNrUmF0ZSA9IDI7XHJcbiAgICAgICAgdGhpcy5zcGVlZCA9IC01IDtcclxuICAgIH1cclxufSIsImltcG9ydCB7IEltYWdlT2JqZWN0IH0gZnJvbSBcIi4uL0VuZ2luZS9JbWFnZU9iamVjdC9JbWFnZU9iamVjdFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEdyb3VuZHtcclxuICAgIGltYWdlczogQXJyYXk8SW1hZ2VPYmplY3Q+O1xyXG4gICAgc3BlZWQ6IG51bWJlcjtcclxuICAgIGNvbnN0cnVjdG9yKHNwZWVkOiBudW1iZXIpe1xyXG4gICAgICAgIHZhciBpbWFnZTEgPSBuZXcgSW1hZ2VPYmplY3QoMCw2NzAsNjUwLDE1MCxcIi4uL0ltYWdlcy9iYXNlLnBuZ1wiLDAsXCJncm91bmRcIik7XHJcbiAgICAgICAgdmFyIGltYWdlMiA9IG5ldyBJbWFnZU9iamVjdCg2NDksNjcwLDY1MCwxNTAsXCIuLi9JbWFnZXMvYmFzZS5wbmdcIiwwLFwiZ3JvdW5kXCIpO1xyXG4gICAgICAgIHRoaXMuaW1hZ2VzID0gW2ltYWdlMSxpbWFnZTJdO1xyXG4gICAgICAgIHRoaXMuc3BlZWQgPSBzcGVlZDtcclxuICAgIH1cclxuICAgIHVwZGF0ZSgpe1xyXG4gICAgICAgIGZvcih2YXIgaT0wO2k8dGhpcy5pbWFnZXMubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIHRoaXMuaW1hZ2VzW2ldLnggLT0gdGhpcy5zcGVlZDtcclxuICAgICAgICAgICAgaWYodGhpcy5pbWFnZXNbaV0ueCA8IC0gKDY1MCsyMCkpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbWFnZXNbaV0ueCA9IHRoaXMuaW1hZ2VzW01hdGguYWJzKGktMSldLngrNjQwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBcclxuICAgIH1cclxuICAgIHJlc2V0KCl7XHJcbiAgICAgICAgZm9yKHZhciBpPTA7aTx0aGlzLmltYWdlcy5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgdGhpcy5pbWFnZXNbaV0ucmVzZXQoKTtcclxuICAgICAgICB9IFxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgSW1hZ2VPYmplY3QgfSBmcm9tIFwiLi4vRW5naW5lL0ltYWdlT2JqZWN0L0ltYWdlT2JqZWN0XCI7XHJcbnZhciBwaXBlV2lkdGggPSA4MDtcclxudmFyIGJsYW5rcyA9IDIwMDtcclxuY29uc3QgcGlwZUhlaWdodCA9IDM1MDtcclxuZXhwb3J0IGNsYXNzIFBhaXJPZlBpcGV7XHJcbiAgICBQaXBlczogQXJyYXk8SW1hZ2VPYmplY3Q+O1xyXG4gICAgcHJpdmF0ZSBzcGVlZDogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHg6bnVtYmVyLCB5Om51bWJlciwgaW1hZ2U6IHN0cmluZyxzcGVlZDogbnVtYmVyKXtcclxuICAgICAgICB2YXIgUGlwZVVwID0gbmV3IEltYWdlT2JqZWN0KHgseSxwaXBlV2lkdGgscGlwZUhlaWdodCxpbWFnZSwxODAsXCJwaXBlXCIpO1xyXG4gICAgICAgIHZhciBQaXBlRG93biA9IG5ldyBJbWFnZU9iamVjdCh4LHkrcGlwZUhlaWdodCtibGFua3MscGlwZVdpZHRoLHBpcGVIZWlnaHQsaW1hZ2UsMCxcInBpcGVcIik7XHJcbiAgICAgICAgdmFyIGNoZWNrU2NvcmUgPSBuZXcgSW1hZ2VPYmplY3QoeCtwaXBlV2lkdGgseStwaXBlSGVpZ2h0LDEwLGJsYW5rcyxcIlwiLDAsXCJjaGVja1Njb3JlXCIpO1xyXG4gICAgICAgIHRoaXMuUGlwZXM9IFtQaXBlVXAsUGlwZURvd24sY2hlY2tTY29yZV07XHJcbiAgICAgICAgdGhpcy5zcGVlZCA9IHNwZWVkO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKCl7XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8MztpKyspe1xyXG4gICAgICAgICAgICB0aGlzLlBpcGVzW2ldLnggLT0gdGhpcy5zcGVlZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXNldCgpe1xyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPDM7aSsrKXtcclxuICAgICAgICAgICAgdGhpcy5QaXBlc1tpXS5yZXNldCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCB7U2NlbmV9IGZyb20gJy4uL0VuZ2luZS9TY2VuZS9TY2VuZSc7XHJcbmltcG9ydCB7IEJpcmQgfSBmcm9tICcuL0JpcmQnO1xyXG5pbXBvcnQge1BhaXJPZlBpcGV9IGZyb20gJy4vUGFpck9mUGlwZSc7XHJcbmltcG9ydCB7IFRleHRPYmplY3QgfSBmcm9tICcuLi9FbmdpbmUvVGV4dE9iamVjdC9UZXh0T2JqZWN0JztcclxuaW1wb3J0IHtCdXR0b25PYmplY3QgfSBmcm9tICcuLi9FbmdpbmUvQnV0dG9uT2JqZWN0L0J1dHRvbk9iamVjdCc7XHJcbmltcG9ydCB7IEltYWdlT2JqZWN0IH0gZnJvbSAnLi4vRW5naW5lL0ltYWdlT2JqZWN0L0ltYWdlT2JqZWN0JztcclxuaW1wb3J0IHtTY29yZX0gZnJvbSBcIi4vU2NvcmVcIjtcclxuaW1wb3J0IHsgR3JvdW5kIH0gZnJvbSAnLi9Hcm91bmQnO1xyXG5cclxudmFyIHBvaW50ID0gbmV3IEF1ZGlvKFwiLi4vYXVkaW8vcG9pbnQubXAzXCIpO1xyXG52YXIgZGllID0gbmV3IEF1ZGlvKFwiLi4vYXVkaW8vZGllLm1wM1wiKTtcclxudmFyIGhpdCA9IG5ldyBBdWRpbyhcIi4uL2F1ZGlvL2hpdC5tcDNcIik7XHJcbnZhciBhdWRpb1BsYXllciA9IG5ldyBBdWRpbyhcIi4uL2F1ZGlvL29yY2hlc3RyYXdhdi0yNjE1OC5tcDNcIik7XHJcbmNvbnN0IGltZ0JpcmQgPSBbXHJcbiAgICBcIi4uL0ltYWdlcy9iaXJkL2ZyYW1lLTEucG5nXCIsXHJcbiAgICBcIi4uL0ltYWdlcy9iaXJkL2ZyYW1lLTIucG5nXCIsXHJcbiAgICBcIi4uL0ltYWdlcy9iaXJkL2ZyYW1lLTMucG5nXCIsXHJcbiAgICBcIi4uL0ltYWdlcy9iaXJkL2ZyYW1lLTQucG5nXCIsXHJcbiAgICBcIi4uL0ltYWdlcy9iaXJkL2ZyYW1lLTUucG5nXCIsXHJcbiAgICBcIi4uL0ltYWdlcy9iaXJkL2ZyYW1lLTYucG5nXCIsXHJcbiAgICBcIi4uL0ltYWdlcy9iaXJkL2ZyYW1lLTcucG5nXCIsXHJcbiAgICBcIi4uL0ltYWdlcy9iaXJkL2ZyYW1lLTgucG5nXCIsXHJcbl07XHJcbmNvbnN0IG51bVBpcGUgPSA0O1xyXG5jb25zdCBkaXN0YW5jZSA9IDI1MDtcclxuY29uc3QgcGlwZVdpZHRoID0gODA7XHJcbmNvbnN0IGZwcyA9IDYwO1xyXG5leHBvcnQgY2xhc3MgUGxheVNjZW5lIGV4dGVuZHMgU2NlbmUge1xyXG4gICAgZnBzOiBudW1iZXI7XHJcbiAgICByYXRlOiBudW1iZXI7XHJcbiAgICBhZHQ6IG51bWJlcjsgICAgLy9hY2N1bXVsYXRlZCBkZWx0YSB0aW1lXHJcbiAgICBiaXJkOiBCaXJkO1xyXG4gICAgcGlwZXM6IFBhaXJPZlBpcGVbXTtcclxuICAgIGdyb3VuZDogR3JvdW5kO1xyXG4gICAgY2hlY2tQaXBlOiBib29sZWFuO1xyXG4gICAgdGV4dFNjb3JlOiBUZXh0T2JqZWN0O1xyXG4gICAgYWRkU2NvcmU6IG51bWJlciB8IG51bGw7XHJcbiAgICBzY29yZTogU2NvcmU7XHJcbiAgICBkZWFkQmlyZDogYm9vbGVhbjtcclxuICAgIGJ1dHRvblJlcGxheTogQnV0dG9uT2JqZWN0O1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBhdWRpb1BsYXllci5wbGF5KCk7XHJcbiAgICAgICAgYXVkaW9QbGF5ZXIubG9vcCA9dHJ1ZTtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuYnV0dG9uUmVwbGF5ID0gbmV3IEJ1dHRvbk9iamVjdCgyMjUsNTAwLDE2MCw4MCxcIi4uL0ltYWdlcy9yZXBsYXktYnV0dG9uLnBuZ1wiLDAsXCJyZXBsYXlCdXR0b25cIik7XHJcbiAgICAgICAgdGhpcy5mcHMgPSBmcHM7XHJcbiAgICAgICAgdGhpcy5yYXRlID0gMS4wL2ZwcyoxMDAwO1xyXG4gICAgICAgIHRoaXMuYWR0ID0gMC4wO1xyXG4gICAgICAgIHRoaXMuY2hlY2tQaXBlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5hZGRTY29yZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5kZWFkQmlyZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2NvcmUgPSBuZXcgU2NvcmUoKTtcclxuICAgICAgICB0aGlzLmdyb3VuZCA9IG5ldyBHcm91bmQoMik7XHJcbiAgICAgICAgdGhpcy50ZXh0U2NvcmUgPSBuZXcgVGV4dE9iamVjdCgxMCwzMCxcInNjb3JlXCIsXCJTY29yZTogXCIrIHRoaXMuc2NvcmUuZ2V0Q3VycmVudFNjb3JlKCksIFwiMThweCBBcmlhbFwiLCBcIndoaXRlXCIpO1xyXG4gICAgICAgIHZhciBiaXJkID0gbmV3IEJpcmQoMTAwLDMwLDUwLDUwLFxyXG4gICAgICAgICAgICBpbWdCaXJkLDAsMC41LDAuMVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIHRoaXMuYmlyZCA9IGJpcmQ7XHJcbiAgICAgICAgdmFyIGJnID0gbmV3IEltYWdlT2JqZWN0KDAsMCw3MDAsODAwLFwiLi4vSW1hZ2VzL2JhY2tncm91bmQtbmlnaHQucG5nXCIsMCxcImJhY2tncm91bmRcIik7XHJcbiAgICAgICAgdGhpcy5waXBlcyA9IFtdXHJcbiAgICAgICAgdGhpcy5hZGRDaGlsZChbYmddLFtiaXJkXSxbdGhpcy50ZXh0U2NvcmVdKTtcclxuICAgICAgICBmb3IodmFyIGk9MDtpPG51bVBpcGU7aSsrKXtcclxuICAgICAgICAgICAgdmFyIHggPSBpKmRpc3RhbmNlICsgcGlwZVdpZHRoICsgNDAwO1xyXG4gICAgICAgICAgICB2YXIgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqLTIwMCk7XHJcbiAgICAgICAgICAgIHZhciBwaXBlID0gbmV3IFBhaXJPZlBpcGUoeCx5LFwiLi4vSW1hZ2VzL3BpcGUtZ3JlZW4ucG5nXCIsMik7XHJcbiAgICAgICAgICAgIHRoaXMucGlwZXMucHVzaChwaXBlKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRDaGlsZChbcGlwZS5QaXBlc1swXSxwaXBlLlBpcGVzWzFdLHBpcGUuUGlwZXNbMl1dLFtdLFtdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5hZGRDaGlsZChbdGhpcy5ncm91bmQuaW1hZ2VzWzBdLHRoaXMuZ3JvdW5kLmltYWdlc1sxXV0sW10sW10pO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuc3ByaXRlcy5sZW5ndGgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICB1cGRhdGUodGltZTogbnVtYmVyLCBkZWx0YVRpbWU6IG51bWJlcikge1xyXG4gICAgICAgIGlmKCAhdGhpcy5kZWFkQmlyZCl7XHJcbiAgICAgICAgICAgIHRoaXMuYWR0ICs9IGRlbHRhVGltZVxyXG4gICAgICAgICAgICB2YXIgZ3JvdW5kID0gdGhpcy5pbWFnZU9iamVjdHMuZmlsdGVyKChpbWIpPT57XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaW1iLm5hbWUgPT09IFwiZ3JvdW5kXCI7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdmFyIHBpcGVzID0gdGhpcy5pbWFnZU9iamVjdHMuZmlsdGVyKChpbWIpPT57XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaW1iLm5hbWUgPT09IFwicGlwZVwiO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHZhciBjaGVja1Njb3JlID0gdGhpcy5pbWFnZU9iamVjdHMuZmlsdGVyKChpbWIpPT57XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaW1iLm5hbWUgPT09IFwiY2hlY2tTY29yZVwiO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBpZih0aGlzLmFkdD49dGhpcy5yYXRlKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWR0IC09IHRoaXMucmF0ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ3JvdW5kLnVwZGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPHRoaXMuaW1hZ2VPYmplY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbWFnZU9iamVjdHNbaV0udXBkYXRlKHRpbWUsIGRlbHRhVGltZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8dGhpcy5zcHJpdGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5zcHJpdGVzW2ldLm5hbWUgPT09IFwiYmlyZFwiKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yKHZhciBqID0gMDsgaiA8IHBpcGVzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLkNvbGxpc2lvbihwaXBlc1tqXSx0aGlzLnNwcml0ZXNbaV0pKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrUGlwZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJnYW1lIG92ZXIhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgY2hlY2tTY29yZS5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5Db2xsaXNpb24oY2hlY2tTY29yZVtrXSx0aGlzLnNwcml0ZXNbaV0pJiYgdGhpcy5hZGRTY29yZSAhPSBrKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjb3JlLnNldEN1cnJlbnRTY29yZSh0aGlzLnNjb3JlLmdldEN1cnJlbnRTY29yZSgpKzEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGV4dFNjb3JlLmNvbnRlbnQgPSBcIlNjb3JlOiBcIiArIHRoaXMuc2NvcmUuZ2V0Q3VycmVudFNjb3JlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRTY29yZSA9IGs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnQucGxheSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGlwZXMubWFwKChwaXBlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwaXBlLnVwZGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVzW2ldLnVwZGF0ZSh0aW1lLGRlbHRhVGltZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuaW5wdXRLZXk9PT1cIlNwYWNlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmlyZC5mbHkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuaW5wdXRLZXkgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpcy5jaGVja1BpcGUmJighdGhpcy5Db2xsaXNpb24oZ3JvdW5kWzBdLCB0aGlzLnNwcml0ZXNbaV0pJiYhdGhpcy5Db2xsaXNpb24oZ3JvdW5kWzFdLCB0aGlzLnNwcml0ZXNbaV0pKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlc1tpXS51cGRhdGUodGltZSxkZWx0YVRpbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLkNvbGxpc2lvbihncm91bmRbMF0sIHRoaXMuc3ByaXRlc1tpXSl8fHRoaXMuQ29sbGlzaW9uKGdyb3VuZFsxXSwgdGhpcy5zcHJpdGVzW2ldKXx8dGhpcy5jaGVja1BpcGUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5zY29yZS5nZXRDdXJyZW50U2NvcmUoKT4gdGhpcy5zY29yZS5nZXRIaWdoU2NvcmUoKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjb3JlLnNldEhpZ2hTY29yZSh0aGlzLnNjb3JlLmdldEN1cnJlbnRTY29yZSgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU2NvcmU6IFwiICsgdGhpcy5zY29yZS5nZXRDdXJyZW50U2NvcmUoKSArIFwiSGlnaCBTY29yZTogXCIgKyB0aGlzLnNjb3JlLmdldEhpZ2hTY29yZSgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbWdHYW1lT3ZlciA9IG5ldyBJbWFnZU9iamVjdCg2MCwzMDAsNTAwLDEzMCxcIi4uL0ltYWdlcy9nYW1lb3Zlci5wbmdcIiwwLFwiZ2FtZU92ZXJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgU2NvcmUgPSBuZXcgVGV4dE9iamVjdCgxMTAsNDcwLFwic2hvd1Njb3JlXCIsXCJTY29yZTogXCIrIHRoaXMuc2NvcmUuZ2V0Q3VycmVudFNjb3JlKCksIFwiMzBweCBBcmlhbFwiLFwid2hpdGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaGlnaFNjb3JlID0gbmV3IFRleHRPYmplY3QoMzMwLDQ3MCxcImhpZ2hTY29yZVwiLFwiSGlnaCBTY29yZTogXCIrIHRoaXMuc2NvcmUuZ2V0SGlnaFNjb3JlKCksIFwiMzBweCBBcmlhbFwiLFwid2hpdGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZENoaWxkKFtpbWdHYW1lT3Zlcix0aGlzLmJ1dHRvblJlcGxheV0sW10sW1Njb3JlLGhpZ2hTY29yZV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWFkQmlyZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdWRpb1BsYXllci5wYXVzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGl0LnBsYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGllLnBsYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgNTAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVzW2ldLnVwZGF0ZSh0aW1lLGRlbHRhVGltZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMucGlwZXMubWFwKChwaXBlLGluZGV4KSA9PntcclxuICAgICAgICAgICAgICAgICAgICBpZihwaXBlLlBpcGVzWzBdLng8LTEwMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmcm9udEluZGV4ID0gaW5kZXggLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGZyb250SW5kZXg8MCkgZnJvbnRJbmRleCA9IHRoaXMucGlwZXMubGVuZ3RoLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPHBpcGUuUGlwZXMubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwaXBlLlBpcGVzW2ldLnggPSB0aGlzLnBpcGVzW2Zyb250SW5kZXhdLlBpcGVzW2ldLnggKyBkaXN0YW5jZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih0aGlzLmRlYWRCaXJkKXtcclxuICAgICAgICAgICAgaWYodGhpcy5pbnB1dEtleSA9PT0gXCJFbnRlclwifHwodGhpcy5tb3VzZUV2ZW50IT1udWxsJiYgdGhpcy5idXR0b25SZXBsYXkuaXNJbnNpZGUodGhpcy5tb3VzZUV2ZW50KSkpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZWFkQmlyZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVDaGlsZChbdGhpcy5idXR0b25SZXBsYXldLFtdKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2VPYmplY3RzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbWFnZU9iamVjdHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRleHRPYmplY3RzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0T2JqZWN0cy5wb3AoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzZXRTY2VuZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAxO1xyXG4gICAgfVxyXG4gICAgcmVzZXRTY2VuZSgpe1xyXG4gICAgICAgIGF1ZGlvUGxheWVyLnBsYXkoKTtcclxuICAgICAgICBhdWRpb1BsYXllci5sb29wID10cnVlO1xyXG4gICAgICAgIC8vIHN1cGVyLnJlc2V0U2NlbmUoKTtcclxuICAgICAgICB0aGlzLmNoZWNrUGlwZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYWRkU2NvcmUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuc2NvcmUuc2V0Q3VycmVudFNjb3JlKDApO1xyXG4gICAgICAgIHRoaXMuYmlyZC5yZXNldCgpO1xyXG4gICAgICAgIHRoaXMuZ3JvdW5kLnJlc2V0KCk7XHJcbiAgICAgICAgdGhpcy5kZWFkQmlyZCA9IGZhbHNlO1xyXG4gICAgICAgIC8vIHRoaXMuZ3JvdW5kID0gbmV3IEdyb3VuZCgyKTtcclxuICAgICAgICAvLyB0aGlzLnRleHRTY29yZSA9IG5ldyBUZXh0T2JqZWN0KDEwLDMwLFwic2NvcmVcIixcIlNjb3JlOiBcIisgdGhpcy5zY29yZS5nZXRDdXJyZW50U2NvcmUoKSwgXCIxOHB4IEFyaWFsXCIsXCJ3aGl0ZVwiKTtcclxuICAgICAgICAvLyB2YXIgYmlyZCA9IG5ldyBCaXJkKDEwMCwzMCw1MCw1MCxcclxuICAgICAgICAvLyAgICAgaW1nQmlyZCwwLDAuNSwwLjFcclxuICAgICAgICAvLyAgICAgKTtcclxuICAgICAgICAvLyB0aGlzLmJpcmQgPSBiaXJkO1xyXG4gICAgICAgIC8vIHZhciBiZyA9IG5ldyBJbWFnZU9iamVjdCgwLDAsNzAwLDgwMCxcIi4uL0ltYWdlcy9iYWNrZ3JvdW5kLW5pZ2h0LnBuZ1wiLDAsXCJiYWNrZ3JvdW5kXCIsKTtcclxuICAgICAgICAvLyB0aGlzLnBpcGVzID0gW11cclxuICAgICAgICAvLyB0aGlzLmFkZENoaWxkKFtiZ10sW2JpcmRdLFt0aGlzLnRleHRTY29yZV0pO1xyXG4gICAgICAgIGZvcih2YXIgaT0wO2k8bnVtUGlwZTtpKyspe1xyXG4gICAgICAgICAgICAvLyB2YXIgeCA9IGkqZGlzdGFuY2UgKyBwaXBlV2lkdGggKyA0MDA7XHJcbiAgICAgICAgICAgIC8vIHZhciB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICotMjAwKTtcclxuICAgICAgICAgICAgLy8gdmFyIHBpcGUgPSBuZXcgUGFpck9mUGlwZSh4LHksXCIuLi9JbWFnZXMvcGlwZS1ncmVlbi5wbmdcIiwyKTtcclxuICAgICAgICAgICAgLy8gdGhpcy5waXBlcy5wdXNoKHBpcGUpO1xyXG4gICAgICAgICAgICAvLyB0aGlzLmFkZENoaWxkKFtwaXBlLlBpcGVzWzBdLHBpcGUuUGlwZXNbMV0scGlwZS5QaXBlc1syXV0sW10sW10pO1xyXG4gICAgICAgICAgICB0aGlzLnBpcGVzW2ldLnJlc2V0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHRoaXMuYWRkQ2hpbGQoW3RoaXMuZ3JvdW5kLmltYWdlc1swXSx0aGlzLmdyb3VuZC5pbWFnZXNbMV1dLFtdLFtdKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInJlbmRlcmluZ1wiKTtcclxuICAgIH1cclxufSIsImV4cG9ydCBjbGFzcyBTY29yZXtcclxuICAgIHByaXZhdGUgaGlnaFNjb3JlOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIGN1cnJlbnRTY29yZTogbnVtYmVyO1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICB0aGlzLmhpZ2hTY29yZSA9IDA7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50U2NvcmUgPSAwO1xyXG4gICAgfVxyXG4gICAgc2V0Q3VycmVudFNjb3JlKHNjb3JlOiBudW1iZXIpe1xyXG4gICAgICAgIHRoaXMuY3VycmVudFNjb3JlID0gc2NvcmU7XHJcbiAgICB9XHJcbiAgICBnZXRDdXJyZW50U2NvcmUoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50U2NvcmU7XHJcbiAgICB9XHJcbiAgICBnZXRIaWdoU2NvcmUoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5oaWdoU2NvcmU7XHJcbiAgICB9XHJcbiAgICBzZXRIaWdoU2NvcmUoaGlnaFNjb3JlOiBudW1iZXIpe1xyXG4gICAgICAgIHRoaXMuaGlnaFNjb3JlID0gaGlnaFNjb3JlO1xyXG4gICAgfVxyXG4gICAgXHJcbn0iLCJpbXBvcnQge1NjZW5lfSBmcm9tICcuLi9FbmdpbmUvU2NlbmUvU2NlbmUnO1xyXG5pbXBvcnQgeyBJbWFnZU9iamVjdCB9IGZyb20gJy4uL0VuZ2luZS9JbWFnZU9iamVjdC9JbWFnZU9iamVjdCc7XHJcbmltcG9ydCB7IEJ1dHRvbk9iamVjdCB9IGZyb20gJy4uL0VuZ2luZS9CdXR0b25PYmplY3QvQnV0dG9uT2JqZWN0JztcclxuXHJcbmV4cG9ydCBjbGFzcyBTdGFydFNjcmVlbiBleHRlbmRzIFNjZW5lIHtcclxuICAgIGJhY2tncm91bmQ6IEltYWdlT2JqZWN0O1xyXG4gICAgZ3JvdW5kOiBJbWFnZU9iamVjdDtcclxuICAgIGltZ1N0YXJ0OiBJbWFnZU9iamVjdDtcclxuICAgIGJ1dHRvblN0YXJ0OiBCdXR0b25PYmplY3RcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLmJhY2tncm91bmQgPW5ldyBJbWFnZU9iamVjdCgwLDAsNzAwLDgwMCxcIi4uL0ltYWdlcy9iYWNrZ3JvdW5kLW5pZ2h0LnBuZ1wiLDAsXCJiYWNrZ3JvdW5kXCIpO1xyXG4gICAgICAgIHRoaXMuZ3JvdW5kID0gbmV3IEltYWdlT2JqZWN0KDAsNjcwLDcwMCwxNTAsXCIuLi9JbWFnZXMvYmFzZS5wbmdcIiwwLFwiZ3JvdW5kXCIpO1xyXG4gICAgICAgIHRoaXMuaW1nU3RhcnQgPSBuZXcgSW1hZ2VPYmplY3QoNTAsMjAsNTAwLDcwMCxcIi4uL0ltYWdlcy9tZXNzYWdlLnBuZ1wiLDAsXCJcIik7XHJcbiAgICAgICAgdGhpcy5idXR0b25TdGFydCA9IG5ldyBCdXR0b25PYmplY3QoMCwwLDcwMCw4MDAsXCJcIiwwLFwiYnV0dG9uU3RhcnRcIik7XHJcbiAgICAgICAgdGhpcy5hZGRDaGlsZChbdGhpcy5iYWNrZ3JvdW5kLHRoaXMuZ3JvdW5kLHRoaXMuaW1nU3RhcnRdLFtdLFtdKTtcclxuICAgIH1cclxuICAgIHVwZGF0ZSh0aW1lOiBudW1iZXIsIGRlbHRhOiBudW1iZXIpe1xyXG4gICAgICAgIGlmKHRoaXMuaW5wdXRLZXkgPT09IFwiRW50ZXJcInx8KHRoaXMubW91c2VFdmVudCE9bnVsbCAmJiB0aGlzLmJ1dHRvblN0YXJ0LmlzSW5zaWRlKHRoaXMubW91c2VFdmVudCkpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5wdXRLZXkgPSBcIlwiO1xyXG4gICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IFN0YXJ0U2NyZWVuIH0gZnJvbSBcIi4vZ2FtZS9TdGFydFNjZW5lXCI7XHJcbmltcG9ydCB7IFJlbmRlcmVyIH0gZnJvbSBcIi4vRW5naW5lL1JlbmRlcmVyL1JlbmRlcmVyXCI7XHJcbmltcG9ydCB7IFNjZW5lTWFuYWdlciB9IGZyb20gXCIuL0VuZ2luZS9TY2VuZS9TY2VuZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgR2FtZSB9IGZyb20gXCIuL0VuZ2luZS9Db3JlL0dhbWVcIjsgIFxyXG5pbXBvcnQge1BsYXlTY2VuZX0gZnJvbSBcIi4vZ2FtZS9QbGF5U2NlbmVcIjtcclxuXHJcbnZhciBzdGFydFNjcmVlbiA9IG5ldyBTdGFydFNjcmVlbigpO1xyXG5cclxuY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ215Q2FudmFzJykgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XHJcbnZhciByZW5kZXIgPSBuZXcgUmVuZGVyZXIoY2FudmFzKVxyXG52YXIgZ2FtZVBsYXkgPSBuZXcgUGxheVNjZW5lKCk7XHJcbnZhciBnYW1lU2NlbmUgPSBuZXcgU2NlbmVNYW5hZ2VyKCk7XHJcbmdhbWVTY2VuZS5hZGRTY2VuZShzdGFydFNjcmVlbik7XHJcbmdhbWVTY2VuZS5hZGRTY2VuZShnYW1lUGxheSk7XHJcbi8vIGdhbWVTY2VuZS5hZGRTY2VuZShnYW1lT3ZlclNjcmVlbik7XHJcbnZhciBteUdhbWUgPSBuZXcgR2FtZShnYW1lU2NlbmUpO1xyXG5teUdhbWUuc3RhcnQocmVuZGVyKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=