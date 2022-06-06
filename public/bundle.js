/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Engine.ts":
/*!***********************!*\
  !*** ./src/Engine.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ButtonObject": () => (/* binding */ ButtonObject),
/* harmony export */   "Game": () => (/* binding */ Game),
/* harmony export */   "GameObject": () => (/* binding */ GameObject),
/* harmony export */   "ImageObject": () => (/* binding */ ImageObject),
/* harmony export */   "Renderer": () => (/* binding */ Renderer),
/* harmony export */   "Scene": () => (/* binding */ Scene),
/* harmony export */   "SceneManager": () => (/* binding */ SceneManager),
/* harmony export */   "Sprite": () => (/* binding */ Sprite),
/* harmony export */   "TextObject": () => (/* binding */ TextObject)
/* harmony export */ });
class GameObject {
    constructor(x, y, width, height, name) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.name = name;
    }
}
class TextObject extends GameObject {
    constructor(x, y, name, content, font) {
        super(x, y, 0, 0, name);
        this.content = content;
        this.font = font;
    }
}
class ImageObject extends GameObject {
    constructor(x, y, width, height, image, degrees, name) {
        super(x, y, width, height, name);
        this.image = image;
        this.degrees = degrees;
    }
    update(time, deltaTime) { }
}
class ButtonObject extends ImageObject {
    constructor(x, y, width, height, image, degrees, name) {
        super(x, y, width, height, image, degrees, name);
    }
    isInside(pos) {
        if (pos.length < 2)
            return false;
        // console.log("inside", this.x, this.y);
        return pos[0] > this.x && pos[0] < this.x + this.width && pos[1] < this.y + this.height && pos[1] > this.y;
        return 1;
    }
}
class Sprite extends GameObject {
    constructor(x, y, width, height, images, degrees, name) {
        super(x, y, width, height, name);
        this.images = images;
        this.degrees = degrees;
        this.fameCurrent = 0;
    }
    update(time, deltaTime) { }
}
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
            ctx.fillText(text.content, text.x, text.y);
        }
    }
}
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
    handleInputEvent(e) {
        this.inputKey = e.code;
        console.log(this.inputKey);
    }
    handleMouseDown(e, canvas) {
        var rect = canvas.getBoundingClientRect();
        var mouseX = e.clientX - rect.left;
        var mouseY = e.clientY - rect.top;
        this.mouseEvent = [mouseX, mouseY];
        // this.mouseEvent.clientX = 3;
        console.log(this.mouseEvent);
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
class Game {
    constructor(sceneManager) {
        this.sceneManager = sceneManager;
        this.lastTime = null;
    }
    start(render) {
        document.addEventListener('keyup', (e) => this.sceneManager.scenes[this.sceneManager.currentScene].handleInputEvent(e));
        document.addEventListener('click', (e) => this.sceneManager.scenes[this.sceneManager.currentScene].handleMouseDown(e, render.canvas));
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
// function Collision(obj1 : GameObject, obj2 : GameObject){
//     if(obj1.x+ obj1.width>=obj2.x && obj1.x <= obj2.x + obj2.width){
//         if(obj1.y+ obj1.height>=obj2.y && obj1.y <= obj2.y + obj2.height){
//             return true;
//         }
//     }
//     return false;
// }



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
/* harmony import */ var _Engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Engine */ "./src/Engine.ts");

var numPipe = 4;
var distance = 250;
var pipeWidth = 80;
var blanks = 300;
const pipeHeight = 350;
const fps = 60;
class Bird extends _Engine__WEBPACK_IMPORTED_MODULE_0__.Sprite {
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
        this.speed += this.gravity;
        this.adt += deltaTime;
        if (this.speed > 0) {
            this.degrees = 20;
        }
        else {
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
        this.speed = -8;
    }
}
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
class PairOfPipe {
    constructor(x, y, image, speed) {
        var PipeUp = new _Engine__WEBPACK_IMPORTED_MODULE_0__.ImageObject(x, y, pipeWidth, pipeHeight, image, 180, "pipe");
        var PipeDown = new _Engine__WEBPACK_IMPORTED_MODULE_0__.ImageObject(x, y + pipeHeight + blanks, pipeWidth, pipeHeight, image, 0, "pipe");
        var checkScore = new _Engine__WEBPACK_IMPORTED_MODULE_0__.ImageObject(x + pipeWidth, y + pipeHeight, 10, blanks, " ", 0, "checkScore");
        this.Pipes = [PipeUp, PipeDown, checkScore];
        this.speed = speed;
    }
    update() {
        for (var i = 0; i < 3; i++) {
            this.Pipes[i].x -= this.speed;
        }
    }
}
var imgCharacter = [
    "../Images/Character/frame_02_delay-0.01s-removebg-preview.png",
    "../Images/Character/frame_04_delay-0.01s-removebg-preview.png",
    "../Images/Character/frame_06_delay-0.01s-removebg-preview.png",
    "../Images/Character/frame_08_delay-0.01s-removebg-preview.png",
    "../Images/Character/frame_10_delay-0.01s-removebg-preview.png",
    "../Images/Character/frame_12_delay-0.01s-removebg-preview.png",
    "../Images/Character/frame_14_delay-0.01s-removebg-preview.png",
    "../Images/Character/frame_16_delay-0.01s-removebg-preview.png",
    "../Images/Character/frame_18_delay-0.01s-removebg-preview.png",
];
var imgBird = [
    "../Images/bird/frame-1.png",
    "../Images/bird/frame-2.png",
    "../Images/bird/frame-3.png",
    "../Images/bird/frame-4.png",
    "../Images/bird/frame-5.png",
    "../Images/bird/frame-6.png",
    "../Images/bird/frame-7.png",
    "../Images/bird/frame-8.png",
];
class PlayScene extends _Engine__WEBPACK_IMPORTED_MODULE_0__.Scene {
    constructor() {
        super();
        this.buttonReplay = new _Engine__WEBPACK_IMPORTED_MODULE_0__.ButtonObject(225, 500, 160, 80, "../Images/replay-button.png", 0, "replayButton");
        this.fps = fps;
        this.rate = 1.0 / fps * 1000;
        this.adt = 0.0;
        this.checkPipe = false;
        this.addScore = null;
        this.deadBird = false;
        this.score = new Score();
        this.textScore = new _Engine__WEBPACK_IMPORTED_MODULE_0__.TextObject(10, 30, "score", "Score: " + this.score.getCurrentScore(), "18px Arial");
        var bird = new Bird(100, 30, 50, 50, imgBird, 0, 0.5, 0.1);
        this.bird = bird;
        var bg = new _Engine__WEBPACK_IMPORTED_MODULE_0__.ImageObject(0, 0, 700, 800, "../Images/background-night.png", 0, "background");
        var ground = new _Engine__WEBPACK_IMPORTED_MODULE_0__.ImageObject(0, 670, 700, 150, "../Images/base.png", 0, "ground");
        this.pipes = [];
        this.addChild([bg], [bird], [this.textScore]);
        for (var i = 0; i < numPipe; i++) {
            var x = i * distance + pipeWidth + 250;
            var y = Math.floor(Math.random() * -100);
            var pipe = new PairOfPipe(x, y, "../Images/pipe-green.png", 2);
            this.pipes.push(pipe);
            this.addChild([pipe.Pipes[0], pipe.Pipes[1], pipe.Pipes[2]], [], []);
        }
        this.addChild([ground], [], []);
        console.log(this.sprites.length);
    }
    update(time, deltaTime) {
        if (!this.deadBird) {
            this.adt += deltaTime;
            var ground = this.imageObjects.filter((imb) => {
                return imb.name === "ground";
            })[0];
            var pipes = this.imageObjects.filter((imb) => {
                return imb.name === "pipe";
            });
            var checkScore = this.imageObjects.filter((imb) => {
                return imb.name === "checkScore";
            });
            if (this.adt >= this.rate) {
                this.adt -= this.rate;
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
                                break;
                            }
                        }
                        // if(!Collision(ground, this.sprites[i])&&!this.checkPipe){ 
                        this.pipes.map((pipe) => {
                            pipe.update();
                        });
                        this.sprites[i].update(time, deltaTime);
                        if (this.inputKey === "Space") {
                            this.bird.fly();
                            this.inputKey = "";
                        }
                        // }
                        else if (this.checkPipe && !this.Collision(ground, this.sprites[i]))
                            this.sprites[i].update(time, deltaTime);
                        if (this.Collision(ground, this.sprites[i]) || this.checkPipe) {
                            if (this.score.getCurrentScore() > this.score.getHighScore())
                                this.score.setHighScore(this.score.getCurrentScore());
                            console.log("Score: " + this.score.getCurrentScore() + "High Score: " + this.score.getHighScore());
                            var imgGameOver = new _Engine__WEBPACK_IMPORTED_MODULE_0__.ImageObject(60, 300, 500, 130, "../Images/gameover.png", 0, "gameOver");
                            var Score = new _Engine__WEBPACK_IMPORTED_MODULE_0__.TextObject(110, 470, "showScore", "Score: " + this.score.getCurrentScore(), "30px Arial");
                            var highScore = new _Engine__WEBPACK_IMPORTED_MODULE_0__.TextObject(330, 470, "highScore", "High Score: " + this.score.getHighScore(), "30px Arial");
                            // var replayButton = new ImageObject(225,500,160,80,"../Images/replay-button.png",0,"replayButton");
                            this.addChild([imgGameOver, this.buttonReplay], [], [Score, highScore]);
                            this.deadBird = true;
                            // return 2;
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
                        for (var i = 0; i < 3; i++) {
                            pipe.Pipes[i].x = this.pipes[frontIndex].Pipes[0].x + distance;
                        }
                    }
                });
            }
        }
        else {
            if (this.inputKey === "Enter" || (this.mouseEvent != null && this.buttonReplay.isInside(this.mouseEvent))) {
                this.deadBird = false;
                this.removeChild([this.buttonReplay], []);
                this.imageObjects.pop();
                this.imageObjects.pop();
                this.textObjects.pop();
                this.textObjects.pop();
                this.mouseEvent = null;
                this.resetScene();
            }
        }
        return 1;
    }
    resetScene() {
        // this.imageObjects = [];
        // this.sprites = [];
        // this.textObjects = [];
        // this.inputKey = "";
        super.resetScene();
        this.fps = fps;
        this.rate = 1.0 / fps * 1000;
        this.adt = 0.0;
        this.checkPipe = false;
        this.addScore = null;
        this.score.setCurrentScore(0);
        this.textScore = new _Engine__WEBPACK_IMPORTED_MODULE_0__.TextObject(10, 30, "score", "Score: " + this.score.getCurrentScore(), "18px Arial");
        var bird = new Bird(100, 30, 50, 50, imgBird, 0, 0.5, 0.1);
        this.bird = bird;
        var bg = new _Engine__WEBPACK_IMPORTED_MODULE_0__.ImageObject(0, 0, 700, 800, "../Images/background-night.png", 0, "background");
        var ground = new _Engine__WEBPACK_IMPORTED_MODULE_0__.ImageObject(0, 670, 700, 150, "../Images/base.png", 0, "ground");
        this.pipes = [];
        this.addChild([bg], [bird], [this.textScore]);
        for (var i = 0; i < numPipe; i++) {
            var x = i * distance + pipeWidth + 250;
            var y = Math.floor(Math.random() * -100);
            var pipe = new PairOfPipe(x, y, "../Images/pipe-green.png", 2);
            this.pipes.push(pipe);
            this.addChild([pipe.Pipes[0], pipe.Pipes[1], pipe.Pipes[2]], [], []);
        }
        this.addChild([ground], [], []);
        console.log("rendering");
    }
}
var bg = new _Engine__WEBPACK_IMPORTED_MODULE_0__.ImageObject(0, 0, 700, 800, "../Images/background-night.png", 0, "background");
var ground = new _Engine__WEBPACK_IMPORTED_MODULE_0__.ImageObject(0, 670, 700, 150, "../Images/base.png", 0, "ground");
var imgStart = new _Engine__WEBPACK_IMPORTED_MODULE_0__.ImageObject(50, 20, 500, 700, "../Images/message.png", 0, "");
class StartScreen extends _Engine__WEBPACK_IMPORTED_MODULE_0__.Scene {
    update(time, delta) {
        if (this.inputKey === "Enter") {
            this.inputKey = "";
            return 1;
        }
        return 0;
    }
}
class GameOverScreen extends _Engine__WEBPACK_IMPORTED_MODULE_0__.Scene {
    update(time, delta) {
        if (this.inputKey === "Enter") {
            this.inputKey = "";
            // window.location.reload();
            return 1;
        }
        return 2;
    }
}
var startScreen = new StartScreen();
startScreen.addChild([bg, imgStart], [], []);
var gameOverScreen = new GameOverScreen();
gameOverScreen.addChild([bg, imgStart], [], []);
const canvas = document.getElementById('myCanvas');
var render = new _Engine__WEBPACK_IMPORTED_MODULE_0__.Renderer(canvas);
var gamePlay = new PlayScene();
var gameScene = new _Engine__WEBPACK_IMPORTED_MODULE_0__.SceneManager();
gameScene.addScene(startScreen);
gameScene.addScene(gamePlay);
gameScene.addScene(gameOverScreen);
var myGame = new _Engine__WEBPACK_IMPORTED_MODULE_0__.Game(gameScene);
myGame.start(render);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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U0FBUyxHQUFHLElBQUksaURBQVksRUFBRSxDQUFDO0FBQ25DLFNBQVMsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDaEMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUM3QixTQUFTLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQ25DLElBQUksTUFBTSxHQUFHLElBQUkseUNBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNqQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VlazEvLi9zcmMvRW5naW5lLnRzIiwid2VicGFjazovL3dlZWsxL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlZWsxL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWVrMS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlZWsxL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VlazEvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgR2FtZU9iamVjdHtcclxuICAgIHg6IG51bWJlcjtcclxuICAgIHk6IG51bWJlcjtcclxuICAgIHdpZHRoOiBudW1iZXI7XHJcbiAgICBoZWlnaHQ6IG51bWJlcjtcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgbmFtZTogc3RyaW5nKXtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICB9XHJcblxyXG59XHJcbmNsYXNzIFRleHRPYmplY3QgZXh0ZW5kcyBHYW1lT2JqZWN0e1xyXG4gICAgY29udGVudDogc3RyaW5nO1xyXG4gICAgZm9udDogc3RyaW5nO1xyXG4gICAgY29uc3RydWN0b3IoeDogbnVtYmVyLCB5OiBudW1iZXIsIG5hbWU6IHN0cmluZyAsIGNvbnRlbnQ6IHN0cmluZywgZm9udDogc3RyaW5nKXtcclxuICAgICAgICBzdXBlcih4LCB5LCAwLCAwLCBuYW1lKTtcclxuICAgICAgICB0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xyXG4gICAgICAgIHRoaXMuZm9udCA9IGZvbnQ7XHJcbiAgICB9XHJcbn1cclxuY2xhc3MgSW1hZ2VPYmplY3QgZXh0ZW5kcyBHYW1lT2JqZWN0e1xyXG4gICAgaW1hZ2U6IHN0cmluZztcclxuICAgIGRlZ3JlZXM6IG51bWJlcjtcclxuICAgIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcixpbWFnZTogc3RyaW5nLCBkZWdyZWVzOiBudW1iZXIsIG5hbWU6IHN0cmluZyl7XHJcbiAgICAgICAgc3VwZXIoeCwgeSwgd2lkdGgsIGhlaWdodCxuYW1lKTtcclxuICAgICAgICB0aGlzLmltYWdlID0gaW1hZ2U7XHJcbiAgICAgICAgdGhpcy5kZWdyZWVzID0gZGVncmVlcztcclxuICAgIH1cclxuICAgIHVwZGF0ZSh0aW1lOiBudW1iZXIsIGRlbHRhVGltZTpudW1iZXIpe31cclxufVxyXG5cclxuY2xhc3MgQnV0dG9uT2JqZWN0IGV4dGVuZHMgSW1hZ2VPYmplY3R7XHJcbiAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsaW1hZ2U6IHN0cmluZywgZGVncmVlczogbnVtYmVyLCBuYW1lOiBzdHJpbmcpe1xyXG4gICAgICAgIHN1cGVyKHgsIHksIHdpZHRoLCBoZWlnaHQsaW1hZ2UsIGRlZ3JlZXMsIG5hbWUpO1xyXG4gICAgfVxyXG4gICAgaXNJbnNpZGUocG9zOiBBcnJheTxudW1iZXI+KXtcclxuICAgICAgICBpZihwb3MubGVuZ3RoIDwgMikgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiaW5zaWRlXCIsIHRoaXMueCwgdGhpcy55KTtcclxuICAgICAgICByZXR1cm4gcG9zWzBdID4gdGhpcy54ICYmIHBvc1swXSA8IHRoaXMueCt0aGlzLndpZHRoICYmIHBvc1sxXSA8IHRoaXMueSt0aGlzLmhlaWdodCAmJiBwb3NbMV0gPiB0aGlzLnk7XHJcbiAgICAgICAgcmV0dXJuIDE7XHJcbiAgICB9ICAgIFxyXG4gICAgLy8gb25DbGljayhldmVudDogTW91c2VFdmVudCk6IHZvaWQge31cclxufVxyXG5jbGFzcyBTcHJpdGUgZXh0ZW5kcyBHYW1lT2JqZWN0e1xyXG4gICAgaW1hZ2VzOiBBcnJheTxzdHJpbmc+O1xyXG4gICAgZGVncmVlczogbnVtYmVyO1xyXG4gICAgZmFtZUN1cnJlbnQ6IG51bWJlcjtcclxuICAgIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgaW1hZ2VzOiBBcnJheTxzdHJpbmc+LGRlZ3JlZXM6IG51bWJlcixuYW1lOiBzdHJpbmcpe1xyXG4gICAgICAgIHN1cGVyKHgsIHksIHdpZHRoLCBoZWlnaHQsbmFtZSk7XHJcbiAgICAgICAgdGhpcy5pbWFnZXMgPSBpbWFnZXM7XHJcbiAgICAgICAgdGhpcy5kZWdyZWVzID0gZGVncmVlcztcclxuICAgICAgICB0aGlzLmZhbWVDdXJyZW50ID0gMDtcclxuICAgIH1cclxuICAgIHVwZGF0ZSh0aW1lOiBudW1iZXIsIGRlbHRhVGltZTpudW1iZXIpe31cclxufVxyXG5cclxuY2xhc3MgUmVuZGVyZXJ7XHJcbiAgICBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xyXG4gICAgY29uc3RydWN0b3IoY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCl7XHJcbiAgICAgICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XHJcbiAgICB9XHJcbiAgICBkcmF3SW1hZ2UoaW1hZ2VPYmplY3Q6IEltYWdlT2JqZWN0KXtcclxuICAgICAgICBjb25zdCBjdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgICAgIHZhciBpbWcgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICBpbWcuc3JjID0gaW1hZ2VPYmplY3QuaW1hZ2U7XHJcbiAgICAgICAgaWYoY3R4IT1udWxsKXtcclxuICAgICAgICAgICAgY3R4LnNhdmUoKTtcclxuICAgICAgICAgICAgY3R4LnRyYW5zbGF0ZShpbWFnZU9iamVjdC54ICsgaW1hZ2VPYmplY3Qud2lkdGgvMixpbWFnZU9iamVjdC55ICsgaW1hZ2VPYmplY3QuaGVpZ2h0LzIpXHJcbiAgICAgICAgICAgIGN0eC5yb3RhdGUoaW1hZ2VPYmplY3QuZGVncmVlcypNYXRoLlBJLzE4MCk7XHJcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoaW1nLC1pbWFnZU9iamVjdC53aWR0aC8yLCAtaW1hZ2VPYmplY3QuaGVpZ2h0LzIsaW1hZ2VPYmplY3Qud2lkdGgsaW1hZ2VPYmplY3QuaGVpZ2h0KTtcclxuICAgICAgICAgICAgY3R4LnJlc3RvcmUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBkcmF3U3ByaXRlKHNwcml0ZTogU3ByaXRlKXtcclxuICAgICAgICBjb25zdCBjdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgICAgIHZhciBpbWcgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICBpZihjdHghPW51bGwpe1xyXG4gICAgICAgICAgICBpbWcuc3JjID0gc3ByaXRlLmltYWdlc1tzcHJpdGUuZmFtZUN1cnJlbnRdO1xyXG4gICAgICAgICAgICAvLyBjdHguY2xlYXJSZWN0KDAsIDAsIHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xyXG4gICAgICAgICAgICBjdHguc2F2ZSgpO1xyXG4gICAgICAgICAgICBjdHgudHJhbnNsYXRlKHNwcml0ZS54ICsgc3ByaXRlLndpZHRoLzIsc3ByaXRlLnkgKyBzcHJpdGUuaGVpZ2h0LzIpXHJcbiAgICAgICAgICAgIGN0eC5yb3RhdGUoc3ByaXRlLmRlZ3JlZXMqTWF0aC5QSS8xODApO1xyXG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKGltZywtc3ByaXRlLndpZHRoLzIsIC1zcHJpdGUuaGVpZ2h0LzIsc3ByaXRlLndpZHRoLHNwcml0ZS5oZWlnaHQpO1xyXG4gICAgICAgICAgICBjdHgucmVzdG9yZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGRyYXdUZXh0KHRleHQ6IFRleHRPYmplY3Qpe1xyXG4gICAgICAgIGNvbnN0IGN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICAgICAgaWYoY3R4IT1udWxsKXtcclxuICAgICAgICAgICAgY3R4LmZvbnQgPSB0ZXh0LmZvbnQ7XHJcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dCh0ZXh0LmNvbnRlbnQsdGV4dC54LHRleHQueSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBTY2VuZXtcclxuICAgIGltYWdlT2JqZWN0czogSW1hZ2VPYmplY3RbXTtcclxuICAgIHNwcml0ZXM6IFNwcml0ZVtdO1xyXG4gICAgdGV4dE9iamVjdHM6IFRleHRPYmplY3RbXTsgXHJcbiAgICBpbnB1dEtleSA6IFN0cmluZztcclxuICAgIG1vdXNlRXZlbnQgOiBBcnJheTxudW1iZXI+IHwgbnVsbDtcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgdGhpcy5pbWFnZU9iamVjdHMgPSBbXTtcclxuICAgICAgICB0aGlzLnNwcml0ZXMgPSBbXTtcclxuICAgICAgICB0aGlzLnRleHRPYmplY3RzID0gW107XHJcbiAgICAgICAgdGhpcy5pbnB1dEtleSA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5tb3VzZUV2ZW50ID0gbnVsbDtcclxuICAgIH1cclxuICAgIHJlc2V0U2NlbmUoKXtcclxuICAgICAgICB0aGlzLmltYWdlT2JqZWN0cyA9IFtdO1xyXG4gICAgICAgIHRoaXMuc3ByaXRlcyA9IFtdO1xyXG4gICAgICAgIHRoaXMudGV4dE9iamVjdHMgPSBbXTtcclxuICAgICAgICB0aGlzLmlucHV0S2V5ID0gXCJcIjtcclxuICAgIH1cclxuICAgIGFkZENoaWxkKGltYWdlT2JqZWN0czogSW1hZ2VPYmplY3RbXSxzcHJpdGVzOiBTcHJpdGVbXSwgdGV4dE9iamVjdHM6IFRleHRPYmplY3RbXSl7XHJcbiAgICAgICAgaW1hZ2VPYmplY3RzLm1hcChpbWFnZU9iamVjdCA9PiB0aGlzLmltYWdlT2JqZWN0cy5wdXNoKGltYWdlT2JqZWN0KSk7XHJcbiAgICAgICAgc3ByaXRlcy5tYXAoc3ByaXRlID0+IHRoaXMuc3ByaXRlcy5wdXNoKHNwcml0ZSkpO1xyXG4gICAgICAgIHRleHRPYmplY3RzLm1hcCh0ZXh0T2JqZWN0ID0+IHRoaXMudGV4dE9iamVjdHMucHVzaCh0ZXh0T2JqZWN0KSk7XHJcbiAgICB9XHJcbiAgICByZW1vdmVDaGlsZChpbWFnZU9iamVjdHM6IEltYWdlT2JqZWN0W10sc3ByaXRlczogU3ByaXRlW10pe1xyXG4gICAgICAgIGltYWdlT2JqZWN0cy5tYXAoaW1hZ2VPYmplY3QgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmltYWdlT2JqZWN0cyA9IHRoaXMuaW1hZ2VPYmplY3RzLmZpbHRlcigoaW1iKT0+e1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGltYiE9IGltYWdlT2JqZWN0O1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgc3ByaXRlcy5tYXAoc3ByaXRlID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zcHJpdGVzID0gdGhpcy5zcHJpdGVzLmZpbHRlcigoc3B0KT0+e1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNwdCE9IHNwcml0ZTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcihyZW5kZXI6IFJlbmRlcmVyKXtcclxuICAgICAgICB0aGlzLmltYWdlT2JqZWN0cy5tYXAoKGltYWdlT2JqZWN0KT0+e1xyXG4gICAgICAgICAgICByZW5kZXIuZHJhd0ltYWdlKGltYWdlT2JqZWN0KTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMuc3ByaXRlcy5tYXAoKHNwcml0ZSk9PntcclxuICAgICAgICAgICAgcmVuZGVyLmRyYXdTcHJpdGUoc3ByaXRlKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMudGV4dE9iamVjdHMubWFwKCh0eHQpPT57XHJcbiAgICAgICAgICAgIHJlbmRlci5kcmF3VGV4dCh0eHQpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICAvLyB4dSBseSBsb2dpY1xyXG4gICAgdXBkYXRlKHRpbWU6IG51bWJlciwgZGVsdGE6IG51bWJlcikge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDx0aGlzLmltYWdlT2JqZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmltYWdlT2JqZWN0c1tpXS51cGRhdGUodGltZSwgZGVsdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8dGhpcy5zcHJpdGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3ByaXRlc1tpXS51cGRhdGUodGltZSwgZGVsdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gMTtcclxuICAgIH1cclxuICAgIGhhbmRsZUlucHV0RXZlbnQoZTogS2V5Ym9hcmRFdmVudCl7XHJcbiAgICAgICAgdGhpcy5pbnB1dEtleSA9IGUuY29kZTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmlucHV0S2V5KTtcclxuICAgIH1cclxuICAgIGhhbmRsZU1vdXNlRG93bihlOiBNb3VzZUV2ZW50LCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50KSB7XHJcbiAgICAgICAgdmFyIHJlY3QgPSBjYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgdmFyIG1vdXNlWCA9IGUuY2xpZW50WCAtIHJlY3QubGVmdDtcclxuICAgICAgICB2YXIgbW91c2VZID0gZS5jbGllbnRZIC0gcmVjdC50b3A7ICAgIFxyXG4gICAgICAgIHRoaXMubW91c2VFdmVudCA9IFttb3VzZVgsIG1vdXNlWV07XHJcbiAgICAgICAgLy8gdGhpcy5tb3VzZUV2ZW50LmNsaWVudFggPSAzO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMubW91c2VFdmVudCk7XHJcbiAgICB9XHJcbiAgICBDb2xsaXNpb24ob2JqMSA6IEdhbWVPYmplY3QsIG9iajIgOiBHYW1lT2JqZWN0KXtcclxuICAgICAgICBpZihvYmoxLngrIG9iajEud2lkdGg+PW9iajIueCAmJiBvYmoxLnggPD0gb2JqMi54ICsgb2JqMi53aWR0aCl7XHJcbiAgICAgICAgICAgIGlmKG9iajEueSsgb2JqMS5oZWlnaHQ+PW9iajIueSAmJiBvYmoxLnkgPD0gb2JqMi55ICsgb2JqMi5oZWlnaHQpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBTY2VuZU1hbmFnZXIge1xyXG4gICAgc2NlbmVzOiBTY2VuZVtdO1xyXG4gICAgY3VycmVudFNjZW5lOiBudW1iZXI7XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgdGhpcy5zY2VuZXMgPSBbXTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRTY2VuZSA9IDA7XHJcbiAgICB9XHJcbiAgICBhZGRTY2VuZShzY2VuZTogU2NlbmUpe1xyXG4gICAgICAgIHRoaXMuc2NlbmVzLnB1c2goc2NlbmUpXHJcbiAgICB9XHJcbiAgICB1cGRhdGUoKXt9XHJcbiAgICByZW5kZXIoKXt9XHJcbn1cclxuY2xhc3MgR2FtZXtcclxuICAgIHNjZW5lTWFuYWdlcjogU2NlbmVNYW5hZ2VyO1xyXG4gICAgbGFzdFRpbWU6IG51bWJlciB8IG51bGw7XHJcbiAgICBjb25zdHJ1Y3RvcihzY2VuZU1hbmFnZXI6IFNjZW5lTWFuYWdlcil7XHJcbiAgICAgICAgdGhpcy5zY2VuZU1hbmFnZXIgPSBzY2VuZU1hbmFnZXI7XHJcbiAgICAgICAgdGhpcy5sYXN0VGltZSA9IG51bGw7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHN0YXJ0KHJlbmRlcjogUmVuZGVyZXIpe1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywoZSk9PnRoaXMuc2NlbmVNYW5hZ2VyLnNjZW5lc1t0aGlzLnNjZW5lTWFuYWdlci5jdXJyZW50U2NlbmVdLmhhbmRsZUlucHV0RXZlbnQoZSkpO1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoZSk9PnRoaXMuc2NlbmVNYW5hZ2VyLnNjZW5lc1t0aGlzLnNjZW5lTWFuYWdlci5jdXJyZW50U2NlbmVdLmhhbmRsZU1vdXNlRG93bihlLHJlbmRlci5jYW52YXMpKTtcclxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCk9PnRoaXMubG9vcChyZW5kZXIpKTtcclxuICAgIH1cclxuICAgIGxvb3AocmVuZGVyOiBSZW5kZXJlcil7XHJcbiAgICAgICAgdmFyIGluZGV4U2NlbmUgPSB0aGlzLnNjZW5lTWFuYWdlci5jdXJyZW50U2NlbmU7XHJcbiAgICAgICAgY29uc3QgdGltZSA9IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKTtcclxuICAgICAgICBpZih0aGlzLmxhc3RUaW1lID09IG51bGwpe1xyXG4gICAgICAgICAgICBpbmRleFNjZW5lID0gdGhpcy5zY2VuZU1hbmFnZXIuc2NlbmVzW3RoaXMuc2NlbmVNYW5hZ2VyLmN1cnJlbnRTY2VuZV0udXBkYXRlKHRpbWUsIDApO1xyXG4gICAgICAgICAgICB0aGlzLnNjZW5lTWFuYWdlci5zY2VuZXNbdGhpcy5zY2VuZU1hbmFnZXIuY3VycmVudFNjZW5lXS5yZW5kZXIocmVuZGVyKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGNvbnN0IGRlbHRhID0gdGltZSAtIHRoaXMubGFzdFRpbWU7XHJcbiAgICAgICAgICAgIGluZGV4U2NlbmUgPSB0aGlzLnNjZW5lTWFuYWdlci5zY2VuZXNbdGhpcy5zY2VuZU1hbmFnZXIuY3VycmVudFNjZW5lXS51cGRhdGUodGltZSxkZWx0YSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2NlbmVNYW5hZ2VyLnNjZW5lc1t0aGlzLnNjZW5lTWFuYWdlci5jdXJyZW50U2NlbmVdLnJlbmRlcihyZW5kZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihpbmRleFNjZW5lIT10aGlzLnNjZW5lTWFuYWdlci5jdXJyZW50U2NlbmUpe1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTY2VuZShpbmRleFNjZW5lKTtcclxuICAgICAgICAgICAgdGhpcy5zY2VuZU1hbmFnZXIuc2NlbmVzW2luZGV4U2NlbmVdLnJlc2V0U2NlbmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sYXN0VGltZSA9IHRpbWU7XHJcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpPT50aGlzLmxvb3AocmVuZGVyKSk7XHJcbiAgICB9XHJcbiAgICBsb2FkU2NlbmUoaW5kZXhTY2VuZTogbnVtYmVyKXtcclxuICAgICAgICB0aGlzLnNjZW5lTWFuYWdlci5jdXJyZW50U2NlbmUgPSBpbmRleFNjZW5lO1xyXG4gICAgfVxyXG59XHJcbi8vIGZ1bmN0aW9uIENvbGxpc2lvbihvYmoxIDogR2FtZU9iamVjdCwgb2JqMiA6IEdhbWVPYmplY3Qpe1xyXG4vLyAgICAgaWYob2JqMS54KyBvYmoxLndpZHRoPj1vYmoyLnggJiYgb2JqMS54IDw9IG9iajIueCArIG9iajIud2lkdGgpe1xyXG4vLyAgICAgICAgIGlmKG9iajEueSsgb2JqMS5oZWlnaHQ+PW9iajIueSAmJiBvYmoxLnkgPD0gb2JqMi55ICsgb2JqMi5oZWlnaHQpe1xyXG4vLyAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICB9XHJcbi8vICAgICByZXR1cm4gZmFsc2U7XHJcbi8vIH1cclxuXHJcbmV4cG9ydCB7R2FtZU9iamVjdCxJbWFnZU9iamVjdCxSZW5kZXJlciwgU2NlbmVNYW5hZ2VyLCBTcHJpdGUsR2FtZSxTY2VuZSxUZXh0T2JqZWN0LEJ1dHRvbk9iamVjdH07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQge0dhbWVPYmplY3QsQnV0dG9uT2JqZWN0LCBTcHJpdGUsIFNjZW5lLCBJbWFnZU9iamVjdCxSZW5kZXJlciwgU2NlbmVNYW5hZ2VyLCBHYW1lLCBUZXh0T2JqZWN0fSBmcm9tIFwiLi9FbmdpbmVcIlxyXG52YXIgbnVtUGlwZSA9IDQ7XHJcbnZhciBkaXN0YW5jZSA9IDI1MDtcclxudmFyIHBpcGVXaWR0aCA9IDgwO1xyXG52YXIgYmxhbmtzID0gMzAwO1xyXG5jb25zdCBwaXBlSGVpZ2h0ID0gMzUwO1xyXG5jb25zdCBmcHMgPSA2MDtcclxuY2xhc3MgQmlyZCBleHRlbmRzIFNwcml0ZSB7XHJcbiAgICBncmF2aXR5IDogbnVtYmVyO1xyXG4gICAgc3BlZWQgOiBudW1iZXI7XHJcbiAgICBwZnM6IG51bWJlcjtcclxuICAgIHJhdGU6IG51bWJlcjtcclxuICAgIGFkdDogbnVtYmVyOyAgXHJcbiAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsaW1hZ2VzOiBBcnJheTxzdHJpbmc+LGRlZ3JlZXM6IG51bWJlcixncmF2aXR5OiBudW1iZXIsc3BlZWQ6IG51bWJlcil7XHJcbiAgICAgICAgc3VwZXIoeCwgeSwgd2lkdGgsIGhlaWdodCxpbWFnZXMsZGVncmVlcyxcImJpcmRcIik7XHJcbiAgICAgICAgdGhpcy5ncmF2aXR5ID0gZ3Jhdml0eTtcclxuICAgICAgICB0aGlzLnNwZWVkID0gc3BlZWQ7XHJcbiAgICAgICAgdGhpcy5wZnMgPSA2MDtcclxuICAgICAgICB0aGlzLnJhdGUgPSAxLjAvdGhpcy5wZnMqMTAwMDtcclxuICAgICAgICB0aGlzLmFkdCA9IDAuMDtcclxuICAgIH1cclxuICAgIHVwZGF0ZSh0aW1lOiBudW1iZXIsIGRlbHRhVGltZTpudW1iZXIpe1xyXG4gICAgICAgIHRoaXMueSArPSB0aGlzLnNwZWVkICsgMC41KnRoaXMuZ3Jhdml0eTtcclxuICAgICAgICB0aGlzLnNwZWVkICs9IHRoaXMuZ3Jhdml0eTtcclxuICAgICAgICB0aGlzLmFkdCArPSBkZWx0YVRpbWVcclxuICAgICAgICBpZih0aGlzLnNwZWVkPjApe1xyXG4gICAgICAgICAgICB0aGlzLmRlZ3JlZXMgPSAyMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5kZWdyZWVzID0gLTIwO1xyXG4gICAgICAgICAgICBpZih0aGlzLmFkdD49dGhpcy5yYXRlKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWR0IC09IHRoaXMucmF0ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmFtZUN1cnJlbnQrPTE7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmZhbWVDdXJyZW50PnRoaXMuaW1hZ2VzLmxlbmd0aC0xKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZhbWVDdXJyZW50ID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih0aGlzLmZhbWVDdXJyZW50PnRoaXMuaW1hZ2VzLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZhbWVDdXJyZW50ID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGZseSgpe1xyXG4gICAgICAgIHRoaXMuc3BlZWQgPSAtOCA7XHJcbiAgICB9XHJcbn1cclxuY2xhc3MgU2NvcmV7XHJcbiAgICBwcml2YXRlIGhpZ2hTY29yZTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBjdXJyZW50U2NvcmU6IG51bWJlcjtcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgdGhpcy5oaWdoU2NvcmUgPSAwO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFNjb3JlID0gMDtcclxuICAgIH1cclxuICAgIHNldEN1cnJlbnRTY29yZShzY29yZTogbnVtYmVyKXtcclxuICAgICAgICB0aGlzLmN1cnJlbnRTY29yZSA9IHNjb3JlO1xyXG4gICAgfVxyXG4gICAgZ2V0Q3VycmVudFNjb3JlKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudFNjb3JlO1xyXG4gICAgfVxyXG4gICAgZ2V0SGlnaFNjb3JlKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaGlnaFNjb3JlO1xyXG4gICAgfVxyXG4gICAgc2V0SGlnaFNjb3JlKGhpZ2hTY29yZTogbnVtYmVyKXtcclxuICAgICAgICB0aGlzLmhpZ2hTY29yZSA9IGhpZ2hTY29yZTtcclxuICAgIH1cclxuICAgIFxyXG59XHJcbmNsYXNzIFBhaXJPZlBpcGV7XHJcbiAgICBQaXBlczogQXJyYXk8SW1hZ2VPYmplY3Q+O1xyXG4gICAgcHJpdmF0ZSBzcGVlZDogbnVtYmVyO1xyXG4gICAgY29uc3RydWN0b3IoeDpudW1iZXIsIHk6bnVtYmVyLCBpbWFnZTogc3RyaW5nLHNwZWVkOiBudW1iZXIpe1xyXG4gICAgICAgIHZhciBQaXBlVXAgPSBuZXcgSW1hZ2VPYmplY3QoeCx5LHBpcGVXaWR0aCxwaXBlSGVpZ2h0LGltYWdlLDE4MCxcInBpcGVcIik7XHJcbiAgICAgICAgdmFyIFBpcGVEb3duID0gbmV3IEltYWdlT2JqZWN0KHgseStwaXBlSGVpZ2h0K2JsYW5rcyxwaXBlV2lkdGgscGlwZUhlaWdodCxpbWFnZSwwLFwicGlwZVwiKTtcclxuICAgICAgICB2YXIgY2hlY2tTY29yZSA9IG5ldyBJbWFnZU9iamVjdCh4K3BpcGVXaWR0aCx5K3BpcGVIZWlnaHQsMTAsYmxhbmtzLFwiIFwiLDAsXCJjaGVja1Njb3JlXCIpO1xyXG4gICAgICAgIHRoaXMuUGlwZXM9IFtQaXBlVXAsUGlwZURvd24sY2hlY2tTY29yZV07XHJcbiAgICAgICAgdGhpcy5zcGVlZCA9IHNwZWVkO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKCl7XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8MztpKyspe1xyXG4gICAgICAgICAgICB0aGlzLlBpcGVzW2ldLnggLT0gdGhpcy5zcGVlZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxudmFyIGltZ0NoYXJhY3RlciA9IFtcclxuICAgIFwiLi4vSW1hZ2VzL0NoYXJhY3Rlci9mcmFtZV8wMl9kZWxheS0wLjAxcy1yZW1vdmViZy1wcmV2aWV3LnBuZ1wiLFxyXG4gICAgXCIuLi9JbWFnZXMvQ2hhcmFjdGVyL2ZyYW1lXzA0X2RlbGF5LTAuMDFzLXJlbW92ZWJnLXByZXZpZXcucG5nXCIsXHJcbiAgICBcIi4uL0ltYWdlcy9DaGFyYWN0ZXIvZnJhbWVfMDZfZGVsYXktMC4wMXMtcmVtb3ZlYmctcHJldmlldy5wbmdcIixcclxuICAgIFwiLi4vSW1hZ2VzL0NoYXJhY3Rlci9mcmFtZV8wOF9kZWxheS0wLjAxcy1yZW1vdmViZy1wcmV2aWV3LnBuZ1wiLFxyXG4gICAgXCIuLi9JbWFnZXMvQ2hhcmFjdGVyL2ZyYW1lXzEwX2RlbGF5LTAuMDFzLXJlbW92ZWJnLXByZXZpZXcucG5nXCIsXHJcbiAgICBcIi4uL0ltYWdlcy9DaGFyYWN0ZXIvZnJhbWVfMTJfZGVsYXktMC4wMXMtcmVtb3ZlYmctcHJldmlldy5wbmdcIixcclxuICAgIFwiLi4vSW1hZ2VzL0NoYXJhY3Rlci9mcmFtZV8xNF9kZWxheS0wLjAxcy1yZW1vdmViZy1wcmV2aWV3LnBuZ1wiLFxyXG4gICAgXCIuLi9JbWFnZXMvQ2hhcmFjdGVyL2ZyYW1lXzE2X2RlbGF5LTAuMDFzLXJlbW92ZWJnLXByZXZpZXcucG5nXCIsXHJcbiAgICBcIi4uL0ltYWdlcy9DaGFyYWN0ZXIvZnJhbWVfMThfZGVsYXktMC4wMXMtcmVtb3ZlYmctcHJldmlldy5wbmdcIixcclxuXTtcclxudmFyIGltZ0JpcmQgPSBbXHJcbiAgICBcIi4uL0ltYWdlcy9iaXJkL2ZyYW1lLTEucG5nXCIsXHJcbiAgICBcIi4uL0ltYWdlcy9iaXJkL2ZyYW1lLTIucG5nXCIsXHJcbiAgICBcIi4uL0ltYWdlcy9iaXJkL2ZyYW1lLTMucG5nXCIsXHJcbiAgICBcIi4uL0ltYWdlcy9iaXJkL2ZyYW1lLTQucG5nXCIsXHJcbiAgICBcIi4uL0ltYWdlcy9iaXJkL2ZyYW1lLTUucG5nXCIsXHJcbiAgICBcIi4uL0ltYWdlcy9iaXJkL2ZyYW1lLTYucG5nXCIsXHJcbiAgICBcIi4uL0ltYWdlcy9iaXJkL2ZyYW1lLTcucG5nXCIsXHJcbiAgICBcIi4uL0ltYWdlcy9iaXJkL2ZyYW1lLTgucG5nXCIsXHJcbl07XHJcbmNsYXNzIFBsYXlTY2VuZSBleHRlbmRzIFNjZW5lIHtcclxuICAgIGZwczogbnVtYmVyO1xyXG4gICAgcmF0ZTogbnVtYmVyO1xyXG4gICAgYWR0OiBudW1iZXI7ICAgIC8vYWNjdW11bGF0ZWQgZGVsdGEgdGltZVxyXG4gICAgYmlyZDogQmlyZDtcclxuICAgIHBpcGVzOiBQYWlyT2ZQaXBlW107XHJcbiAgICBjaGVja1BpcGU6IGJvb2xlYW47XHJcbiAgICB0ZXh0U2NvcmU6IFRleHRPYmplY3Q7XHJcbiAgICBhZGRTY29yZTogbnVtYmVyIHwgbnVsbDtcclxuICAgIHNjb3JlOiBTY29yZTtcclxuICAgIGRlYWRCaXJkOiBib29sZWFuO1xyXG4gICAgYnV0dG9uUmVwbGF5OiBCdXR0b25PYmplY3Q7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5idXR0b25SZXBsYXkgPSBuZXcgQnV0dG9uT2JqZWN0KDIyNSw1MDAsMTYwLDgwLFwiLi4vSW1hZ2VzL3JlcGxheS1idXR0b24ucG5nXCIsMCxcInJlcGxheUJ1dHRvblwiKTtcclxuICAgICAgICB0aGlzLmZwcyA9IGZwcztcclxuICAgICAgICB0aGlzLnJhdGUgPSAxLjAvZnBzKjEwMDA7XHJcbiAgICAgICAgdGhpcy5hZHQgPSAwLjA7XHJcbiAgICAgICAgdGhpcy5jaGVja1BpcGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmFkZFNjb3JlID0gbnVsbDtcclxuICAgICAgICB0aGlzLmRlYWRCaXJkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zY29yZSA9IG5ldyBTY29yZSgpO1xyXG4gICAgICAgIHRoaXMudGV4dFNjb3JlID0gbmV3IFRleHRPYmplY3QoMTAsMzAsXCJzY29yZVwiLFwiU2NvcmU6IFwiKyB0aGlzLnNjb3JlLmdldEN1cnJlbnRTY29yZSgpLCBcIjE4cHggQXJpYWxcIik7XHJcbiAgICAgICAgdmFyIGJpcmQgPSBuZXcgQmlyZCgxMDAsMzAsNTAsNTAsXHJcbiAgICAgICAgICAgIGltZ0JpcmQsMCwwLjUsMC4xXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgdGhpcy5iaXJkID0gYmlyZDtcclxuICAgICAgICB2YXIgYmcgPSBuZXcgSW1hZ2VPYmplY3QoMCwwLDcwMCw4MDAsXCIuLi9JbWFnZXMvYmFja2dyb3VuZC1uaWdodC5wbmdcIiwwLFwiYmFja2dyb3VuZFwiKTtcclxuICAgICAgICB2YXIgZ3JvdW5kID0gbmV3IEltYWdlT2JqZWN0KDAsNjcwLDcwMCwxNTAsXCIuLi9JbWFnZXMvYmFzZS5wbmdcIiwwLFwiZ3JvdW5kXCIpO1xyXG4gICAgICAgIHRoaXMucGlwZXMgPSBbXVxyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQoW2JnXSxbYmlyZF0sW3RoaXMudGV4dFNjb3JlXSk7XHJcbiAgICAgICAgZm9yKHZhciBpPTA7aTxudW1QaXBlO2krKyl7XHJcbiAgICAgICAgICAgIHZhciB4ID0gaSpkaXN0YW5jZSArIHBpcGVXaWR0aCArIDI1MDtcclxuICAgICAgICAgICAgdmFyIHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKi0xMDApO1xyXG4gICAgICAgICAgICB2YXIgcGlwZSA9IG5ldyBQYWlyT2ZQaXBlKHgseSxcIi4uL0ltYWdlcy9waXBlLWdyZWVuLnBuZ1wiLDIpO1xyXG4gICAgICAgICAgICB0aGlzLnBpcGVzLnB1c2gocGlwZSk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkQ2hpbGQoW3BpcGUuUGlwZXNbMF0scGlwZS5QaXBlc1sxXSxwaXBlLlBpcGVzWzJdXSxbXSxbXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQoW2dyb3VuZF0sW10sW10pO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuc3ByaXRlcy5sZW5ndGgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICB1cGRhdGUodGltZTogbnVtYmVyLCBkZWx0YVRpbWU6IG51bWJlcikge1xyXG4gICAgICAgIGlmKCAhdGhpcy5kZWFkQmlyZCl7XHJcbiAgICAgICAgICAgIHRoaXMuYWR0ICs9IGRlbHRhVGltZVxyXG4gICAgICAgICAgICB2YXIgZ3JvdW5kID0gdGhpcy5pbWFnZU9iamVjdHMuZmlsdGVyKChpbWIpPT57XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaW1iLm5hbWUgPT09IFwiZ3JvdW5kXCI7XHJcbiAgICAgICAgICAgICAgICB9KVswXTtcclxuICAgICAgICAgICAgdmFyIHBpcGVzID0gdGhpcy5pbWFnZU9iamVjdHMuZmlsdGVyKChpbWIpPT57XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaW1iLm5hbWUgPT09IFwicGlwZVwiO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHZhciBjaGVja1Njb3JlID0gdGhpcy5pbWFnZU9iamVjdHMuZmlsdGVyKChpbWIpPT57XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaW1iLm5hbWUgPT09IFwiY2hlY2tTY29yZVwiO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBpZih0aGlzLmFkdD49dGhpcy5yYXRlKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWR0IC09IHRoaXMucmF0ZTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDx0aGlzLmltYWdlT2JqZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2VPYmplY3RzW2ldLnVwZGF0ZSh0aW1lLCBkZWx0YVRpbWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPHRoaXMuc3ByaXRlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuc3ByaXRlc1tpXS5uYW1lID09PSBcImJpcmRcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcih2YXIgaiA9IDA7IGogPCBwaXBlcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5Db2xsaXNpb24ocGlwZXNbal0sdGhpcy5zcHJpdGVzW2ldKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja1BpcGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZ2FtZSBvdmVyIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IGNoZWNrU2NvcmUubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuQ29sbGlzaW9uKGNoZWNrU2NvcmVba10sdGhpcy5zcHJpdGVzW2ldKSYmIHRoaXMuYWRkU2NvcmUgIT0gayl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY29yZS5zZXRDdXJyZW50U2NvcmUodGhpcy5zY29yZS5nZXRDdXJyZW50U2NvcmUoKSsxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRleHRTY29yZS5jb250ZW50ID0gXCJTY29yZTogXCIgKyB0aGlzLnNjb3JlLmdldEN1cnJlbnRTY29yZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkU2NvcmUgPSBrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmKCFDb2xsaXNpb24oZ3JvdW5kLCB0aGlzLnNwcml0ZXNbaV0pJiYhdGhpcy5jaGVja1BpcGUpeyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGlwZXMubWFwKChwaXBlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGlwZS51cGRhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVzW2ldLnVwZGF0ZSh0aW1lLGRlbHRhVGltZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmlucHV0S2V5PT09XCJTcGFjZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iaXJkLmZseSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5wdXRLZXkgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpcy5jaGVja1BpcGUmJiF0aGlzLkNvbGxpc2lvbihncm91bmQsIHRoaXMuc3ByaXRlc1tpXSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZXNbaV0udXBkYXRlKHRpbWUsZGVsdGFUaW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5Db2xsaXNpb24oZ3JvdW5kLCB0aGlzLnNwcml0ZXNbaV0pfHx0aGlzLmNoZWNrUGlwZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnNjb3JlLmdldEN1cnJlbnRTY29yZSgpPiB0aGlzLnNjb3JlLmdldEhpZ2hTY29yZSgpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NvcmUuc2V0SGlnaFNjb3JlKHRoaXMuc2NvcmUuZ2V0Q3VycmVudFNjb3JlKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTY29yZTogXCIgKyB0aGlzLnNjb3JlLmdldEN1cnJlbnRTY29yZSgpICsgXCJIaWdoIFNjb3JlOiBcIiArIHRoaXMuc2NvcmUuZ2V0SGlnaFNjb3JlKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGltZ0dhbWVPdmVyID0gbmV3IEltYWdlT2JqZWN0KDYwLDMwMCw1MDAsMTMwLFwiLi4vSW1hZ2VzL2dhbWVvdmVyLnBuZ1wiLDAsXCJnYW1lT3ZlclwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBTY29yZSA9IG5ldyBUZXh0T2JqZWN0KDExMCw0NzAsXCJzaG93U2NvcmVcIixcIlNjb3JlOiBcIisgdGhpcy5zY29yZS5nZXRDdXJyZW50U2NvcmUoKSwgXCIzMHB4IEFyaWFsXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGhpZ2hTY29yZSA9IG5ldyBUZXh0T2JqZWN0KDMzMCw0NzAsXCJoaWdoU2NvcmVcIixcIkhpZ2ggU2NvcmU6IFwiKyB0aGlzLnNjb3JlLmdldEhpZ2hTY29yZSgpLCBcIjMwcHggQXJpYWxcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB2YXIgcmVwbGF5QnV0dG9uID0gbmV3IEltYWdlT2JqZWN0KDIyNSw1MDAsMTYwLDgwLFwiLi4vSW1hZ2VzL3JlcGxheS1idXR0b24ucG5nXCIsMCxcInJlcGxheUJ1dHRvblwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZENoaWxkKFtpbWdHYW1lT3Zlcix0aGlzLmJ1dHRvblJlcGxheV0sW10sW1Njb3JlLGhpZ2hTY29yZV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWFkQmlyZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyByZXR1cm4gMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlc1tpXS51cGRhdGUodGltZSxkZWx0YVRpbWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBpcGVzLm1hcCgocGlwZSxpbmRleCkgPT57XHJcbiAgICAgICAgICAgICAgICAgICAgaWYocGlwZS5QaXBlc1swXS54PC0xMDApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZnJvbnRJbmRleCA9IGluZGV4IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihmcm9udEluZGV4PDApIGZyb250SW5kZXggPSB0aGlzLnBpcGVzLmxlbmd0aC0xO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwzO2krKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwaXBlLlBpcGVzW2ldLnggPSB0aGlzLnBpcGVzW2Zyb250SW5kZXhdLlBpcGVzWzBdLnggKyBkaXN0YW5jZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgaWYodGhpcy5pbnB1dEtleSA9PT0gXCJFbnRlclwifHwodGhpcy5tb3VzZUV2ZW50IT1udWxsJiYgdGhpcy5idXR0b25SZXBsYXkuaXNJbnNpZGUodGhpcy5tb3VzZUV2ZW50KSkpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZWFkQmlyZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVDaGlsZChbdGhpcy5idXR0b25SZXBsYXldLFtdKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2VPYmplY3RzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbWFnZU9iamVjdHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRleHRPYmplY3RzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0T2JqZWN0cy5wb3AoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubW91c2VFdmVudCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0U2NlbmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gMTtcclxuICAgIH1cclxuICAgIHJlc2V0U2NlbmUoKXtcclxuICAgICAgICAvLyB0aGlzLmltYWdlT2JqZWN0cyA9IFtdO1xyXG4gICAgICAgIC8vIHRoaXMuc3ByaXRlcyA9IFtdO1xyXG4gICAgICAgIC8vIHRoaXMudGV4dE9iamVjdHMgPSBbXTtcclxuICAgICAgICAvLyB0aGlzLmlucHV0S2V5ID0gXCJcIjtcclxuICAgICAgICBzdXBlci5yZXNldFNjZW5lKCk7XHJcbiAgICAgICAgdGhpcy5mcHMgPSBmcHM7XHJcbiAgICAgICAgdGhpcy5yYXRlID0gMS4wL2ZwcyoxMDAwO1xyXG4gICAgICAgIHRoaXMuYWR0ID0gMC4wO1xyXG4gICAgICAgIHRoaXMuY2hlY2tQaXBlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5hZGRTY29yZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5zY29yZS5zZXRDdXJyZW50U2NvcmUoMCk7XHJcbiAgICAgICAgdGhpcy50ZXh0U2NvcmUgPSBuZXcgVGV4dE9iamVjdCgxMCwzMCxcInNjb3JlXCIsXCJTY29yZTogXCIrIHRoaXMuc2NvcmUuZ2V0Q3VycmVudFNjb3JlKCksIFwiMThweCBBcmlhbFwiKTtcclxuICAgICAgICB2YXIgYmlyZCA9IG5ldyBCaXJkKDEwMCwzMCw1MCw1MCxcclxuICAgICAgICAgICAgaW1nQmlyZCwwLDAuNSwwLjFcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB0aGlzLmJpcmQgPSBiaXJkO1xyXG4gICAgICAgIHZhciBiZyA9IG5ldyBJbWFnZU9iamVjdCgwLDAsNzAwLDgwMCxcIi4uL0ltYWdlcy9iYWNrZ3JvdW5kLW5pZ2h0LnBuZ1wiLDAsXCJiYWNrZ3JvdW5kXCIpO1xyXG4gICAgICAgIHZhciBncm91bmQgPSBuZXcgSW1hZ2VPYmplY3QoMCw2NzAsNzAwLDE1MCxcIi4uL0ltYWdlcy9iYXNlLnBuZ1wiLDAsXCJncm91bmRcIik7XHJcbiAgICAgICAgdGhpcy5waXBlcyA9IFtdXHJcbiAgICAgICAgdGhpcy5hZGRDaGlsZChbYmddLFtiaXJkXSxbdGhpcy50ZXh0U2NvcmVdKTtcclxuICAgICAgICBmb3IodmFyIGk9MDtpPG51bVBpcGU7aSsrKXtcclxuICAgICAgICAgICAgdmFyIHggPSBpKmRpc3RhbmNlICsgcGlwZVdpZHRoICsgMjUwO1xyXG4gICAgICAgICAgICB2YXIgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqLTEwMCk7XHJcbiAgICAgICAgICAgIHZhciBwaXBlID0gbmV3IFBhaXJPZlBpcGUoeCx5LFwiLi4vSW1hZ2VzL3BpcGUtZ3JlZW4ucG5nXCIsMik7XHJcbiAgICAgICAgICAgIHRoaXMucGlwZXMucHVzaChwaXBlKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRDaGlsZChbcGlwZS5QaXBlc1swXSxwaXBlLlBpcGVzWzFdLHBpcGUuUGlwZXNbMl1dLFtdLFtdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5hZGRDaGlsZChbZ3JvdW5kXSxbXSxbXSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJyZW5kZXJpbmdcIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbnZhciBiZyA9IG5ldyBJbWFnZU9iamVjdCgwLDAsNzAwLDgwMCxcIi4uL0ltYWdlcy9iYWNrZ3JvdW5kLW5pZ2h0LnBuZ1wiLDAsXCJiYWNrZ3JvdW5kXCIpO1xyXG52YXIgZ3JvdW5kID0gbmV3IEltYWdlT2JqZWN0KDAsNjcwLDcwMCwxNTAsXCIuLi9JbWFnZXMvYmFzZS5wbmdcIiwwLFwiZ3JvdW5kXCIpO1xyXG52YXIgaW1nU3RhcnQgPSBuZXcgSW1hZ2VPYmplY3QoNTAsMjAsNTAwLDcwMCxcIi4uL0ltYWdlcy9tZXNzYWdlLnBuZ1wiLDAsXCJcIik7XHJcbmNsYXNzIFN0YXJ0U2NyZWVuIGV4dGVuZHMgU2NlbmUge1xyXG4gICAgdXBkYXRlKHRpbWU6IG51bWJlciwgZGVsdGE6IG51bWJlcil7XHJcbiAgICAgICAgaWYodGhpcy5pbnB1dEtleT09PVwiRW50ZXJcIikge1xyXG4gICAgICAgICAgICB0aGlzLmlucHV0S2V5ID0gXCJcIjtcclxuICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG59XHJcbmNsYXNzIEdhbWVPdmVyU2NyZWVuIGV4dGVuZHMgU2NlbmUge1xyXG4gICAgdXBkYXRlKHRpbWU6IG51bWJlciwgZGVsdGE6IG51bWJlcil7XHJcbiAgICAgICAgaWYodGhpcy5pbnB1dEtleT09PVwiRW50ZXJcIikge1xyXG4gICAgICAgICAgICB0aGlzLmlucHV0S2V5ID0gXCJcIjtcclxuICAgICAgICAgICAgLy8gd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIDI7XHJcbiAgICB9XHJcbn1cclxuXHJcbnZhciBzdGFydFNjcmVlbiA9IG5ldyBTdGFydFNjcmVlbigpO1xyXG5zdGFydFNjcmVlbi5hZGRDaGlsZChbYmcsaW1nU3RhcnRdLFtdLFtdKTtcclxudmFyIGdhbWVPdmVyU2NyZWVuID0gbmV3IEdhbWVPdmVyU2NyZWVuKCk7XHJcbmdhbWVPdmVyU2NyZWVuLmFkZENoaWxkKFtiZyxpbWdTdGFydF0sW10sW10pO1xyXG5jb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbXlDYW52YXMnKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcclxudmFyIHJlbmRlciA9IG5ldyBSZW5kZXJlcihjYW52YXMpXHJcbnZhciBnYW1lUGxheSA9IG5ldyBQbGF5U2NlbmUoKTtcclxudmFyIGdhbWVTY2VuZSA9IG5ldyBTY2VuZU1hbmFnZXIoKTtcclxuZ2FtZVNjZW5lLmFkZFNjZW5lKHN0YXJ0U2NyZWVuKTtcclxuZ2FtZVNjZW5lLmFkZFNjZW5lKGdhbWVQbGF5KTtcclxuZ2FtZVNjZW5lLmFkZFNjZW5lKGdhbWVPdmVyU2NyZWVuKTtcclxudmFyIG15R2FtZSA9IG5ldyBHYW1lKGdhbWVTY2VuZSk7XHJcbm15R2FtZS5zdGFydChyZW5kZXIpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==