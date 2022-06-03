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
/* harmony export */   "Collision": () => (/* binding */ Collision),
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
    resetScene() { }
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
            // this.sceneManager.scenes[this.sceneManager.currentScene].resetScene();
            this.loadScene(indexScene);
        }
        this.lastTime = time;
        requestAnimationFrame(() => this.loop(render));
    }
    loadScene(indexScene) {
        this.sceneManager.currentScene = indexScene;
    }
}
function Collision(obj1, obj2) {
    if (obj1.x + obj1.width >= obj2.x && obj1.x <= obj2.x + obj2.width) {
        if (obj1.y + obj1.height >= obj2.y && obj1.y <= obj2.y + obj2.height) {
            return true;
        }
    }
    return false;
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
/* harmony import */ var _Engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Engine */ "./src/Engine.ts");

var numPipe = 4;
var distance = 250;
var pipeWidth = 80;
var blanks = 300;
const pipeHeight = 350;
class Bird extends _Engine__WEBPACK_IMPORTED_MODULE_0__.Sprite {
    constructor(x, y, width, height, images, degrees, gravity, speed) {
        super(x, y, width, height, images, degrees, "bird");
        this.gravity = gravity;
        this.speed = speed;
        this.pfs = 20;
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
        this.speed = -10;
    }
}
class Score {
    constructor() {
        this.highScore = 0;
        this.currentScore = 0;
    }
    incrementScore() {
        this.currentScore += 1;
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
var pipeImage = "../Images/pipe-green.png";
class PlayScene extends _Engine__WEBPACK_IMPORTED_MODULE_0__.Scene {
    constructor(pfs, bird, bg, ground) {
        super();
        this.pfs = pfs;
        this.rate = 1.0 / pfs * 1000;
        this.adt = 0.0;
        this.checkPipe = false;
        this.addScore = null;
        this.score = new Score();
        this.textScore = new _Engine__WEBPACK_IMPORTED_MODULE_0__.TextObject(10, 30, "score", "Score: " + this.score.getCurrentScore(), "18px Arial");
        this.bird = bird;
        this.pipes = [];
        this.addChild([bg], [bird], [this.textScore]);
        for (var i = 0; i < numPipe; i++) {
            var x = i * distance + pipeWidth + 250;
            var y = Math.floor(Math.random() * -100);
            var pipe = new PairOfPipe(x, y, "../Images/pipe-green.png", 1);
            this.pipes.push(pipe);
            this.addChild([pipe.Pipes[0], pipe.Pipes[1], pipe.Pipes[2]], [], []);
        }
        this.addChild([ground], [], []);
        console.log(this.sprites.length);
    }
    update(time, deltaTime) {
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
                        if ((0,_Engine__WEBPACK_IMPORTED_MODULE_0__.Collision)(pipes[j], this.sprites[i])) {
                            this.checkPipe = true;
                            console.log("game over!");
                            break;
                        }
                    }
                    for (var k = 0; k < checkScore.length; k++) {
                        if ((0,_Engine__WEBPACK_IMPORTED_MODULE_0__.Collision)(checkScore[k], this.sprites[i]) && this.addScore != k) {
                            this.score.incrementScore();
                            this.textScore.content = "Score: " + this.score.getCurrentScore();
                            this.addScore = k;
                            break;
                        }
                    }
                    if (!(0,_Engine__WEBPACK_IMPORTED_MODULE_0__.Collision)(ground, this.sprites[i]) && !this.checkPipe) {
                        this.pipes.map((pipe) => {
                            pipe.update();
                        });
                        this.sprites[i].update(time, deltaTime);
                        if (this.inputKey === "Space") {
                            this.bird.fly();
                            this.inputKey = "";
                        }
                    }
                    else if (this.checkPipe && !(0,_Engine__WEBPACK_IMPORTED_MODULE_0__.Collision)(ground, this.sprites[i]))
                        this.sprites[i].update(time, deltaTime);
                    if ((0,_Engine__WEBPACK_IMPORTED_MODULE_0__.Collision)(ground, this.sprites[i]) || this.checkPipe) {
                        if (this.score.getCurrentScore > this.score.getHighScore)
                            this.score.setHighScore(this.score.getCurrentScore());
                        return 2;
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
        return 1;
    }
    resetScene() {
        // super();
        this.pfs = 60;
        this.rate = 1.0 / 60 * 1000;
        this.adt = 0.0;
        this.checkPipe = false;
        this.addScore = null;
        this.score = new Score();
        this.textScore = new _Engine__WEBPACK_IMPORTED_MODULE_0__.TextObject(10, 30, "score", "Score: " + this.score.getCurrentScore(), "18px Arial");
        this.bird = bird;
        this.pipes = [];
        this.addChild([bg], [bird], [this.textScore]);
        for (var i = 0; i < numPipe; i++) {
            var x = i * distance + pipeWidth + 250;
            var y = Math.floor(Math.random() * -100);
            var pipe = new PairOfPipe(x, y, "../Images/pipe-green.png", 1);
            this.pipes.push(pipe);
            this.addChild([pipe.Pipes[0], pipe.Pipes[1], pipe.Pipes[2]], [], []);
        }
        this.addChild([ground], [], []);
        console.log(this.sprites.length);
    }
}
var bg = new _Engine__WEBPACK_IMPORTED_MODULE_0__.ImageObject(0, 0, 700, 800, "../Images/background-night.png", 0, "background");
var ground = new _Engine__WEBPACK_IMPORTED_MODULE_0__.ImageObject(0, 670, 700, 150, "../Images/base.png", 0, "ground");
var bird = new Bird(100, 30, 50, 50, [
    "../Images/bird/frame-1.png",
    "../Images/bird/frame-2.png",
    "../Images/bird/frame-3.png",
    "../Images/bird/frame-4.png",
    "../Images/bird/frame-5.png",
    "../Images/bird/frame-6.png",
    "../Images/bird/frame-7.png",
    "../Images/bird/frame-8.png",
], 0, 0.5, 0.1);
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
            window.location.reload();
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
var gamePlay = new PlayScene(60, bird, bg, ground);
var gameScene = new _Engine__WEBPACK_IMPORTED_MODULE_0__.SceneManager();
gameScene.addScene(startScreen);
gameScene.addScene(gamePlay);
gameScene.addScene(gameOverScreen);
var myGame = new _Engine__WEBPACK_IMPORTED_MODULE_0__.Game(gameScene);
myGame.start(render);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUM7QUFDeEUsSUFBSSxNQUFNLEdBQUcsSUFBSSw2Q0FBUSxDQUFDLE1BQU0sQ0FBQztBQUNqQyxJQUFJLFFBQVEsR0FBRyxJQUFJLFNBQVMsQ0FBQyxFQUFFLEVBQUMsSUFBSSxFQUFDLEVBQUUsRUFBQyxNQUFNLENBQUMsQ0FBQztBQUNoRCxJQUFJLFNBQVMsR0FBRyxJQUFJLGlEQUFZLEVBQUUsQ0FBQztBQUNuQyxTQUFTLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ2hDLFNBQVMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDN0IsU0FBUyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUNuQyxJQUFJLE1BQU0sR0FBRyxJQUFJLHlDQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDakMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3dlZWsxLy4vc3JjL0VuZ2luZS50cyIsIndlYnBhY2s6Ly93ZWVrMS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWVrMS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VlazEvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWVrMS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlZWsxLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEdhbWVPYmplY3R7XHJcbiAgICB4OiBudW1iZXI7XHJcbiAgICB5OiBudW1iZXI7XHJcbiAgICB3aWR0aDogbnVtYmVyO1xyXG4gICAgaGVpZ2h0OiBudW1iZXI7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIG5hbWU6IHN0cmluZyl7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcclxuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgfVxyXG5cclxufVxyXG5jbGFzcyBUZXh0T2JqZWN0IGV4dGVuZHMgR2FtZU9iamVjdHtcclxuICAgIGNvbnRlbnQ6IHN0cmluZztcclxuICAgIGZvbnQ6IHN0cmluZztcclxuICAgIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyLCBuYW1lOiBzdHJpbmcgLCBjb250ZW50OiBzdHJpbmcsIGZvbnQ6IHN0cmluZyl7XHJcbiAgICAgICAgc3VwZXIoeCwgeSwgMCwgMCwgbmFtZSk7XHJcbiAgICAgICAgdGhpcy5jb250ZW50ID0gY29udGVudDtcclxuICAgICAgICB0aGlzLmZvbnQgPSBmb250O1xyXG4gICAgfVxyXG59XHJcbmNsYXNzIEltYWdlT2JqZWN0IGV4dGVuZHMgR2FtZU9iamVjdHtcclxuICAgIGltYWdlOiBzdHJpbmc7XHJcbiAgICBkZWdyZWVzOiBudW1iZXI7XHJcbiAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsaW1hZ2U6IHN0cmluZywgZGVncmVlczogbnVtYmVyLCBuYW1lOiBzdHJpbmcpe1xyXG4gICAgICAgIHN1cGVyKHgsIHksIHdpZHRoLCBoZWlnaHQsbmFtZSk7XHJcbiAgICAgICAgdGhpcy5pbWFnZSA9IGltYWdlO1xyXG4gICAgICAgIHRoaXMuZGVncmVlcyA9IGRlZ3JlZXM7XHJcbiAgICB9XHJcbiAgICB1cGRhdGUodGltZTogbnVtYmVyLCBkZWx0YVRpbWU6bnVtYmVyKXt9XHJcbn1cclxuXHJcbmNsYXNzIFNwcml0ZSBleHRlbmRzIEdhbWVPYmplY3R7XHJcbiAgICBpbWFnZXM6IEFycmF5PHN0cmluZz47XHJcbiAgICBkZWdyZWVzOiBudW1iZXI7XHJcbiAgICBmYW1lQ3VycmVudDogbnVtYmVyO1xyXG4gICAgY29uc3RydWN0b3IoeDogbnVtYmVyLCB5OiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBpbWFnZXM6IEFycmF5PHN0cmluZz4sZGVncmVlczogbnVtYmVyLG5hbWU6IHN0cmluZyl7XHJcbiAgICAgICAgc3VwZXIoeCwgeSwgd2lkdGgsIGhlaWdodCxuYW1lKTtcclxuICAgICAgICB0aGlzLmltYWdlcyA9IGltYWdlcztcclxuICAgICAgICB0aGlzLmRlZ3JlZXMgPSBkZWdyZWVzO1xyXG4gICAgICAgIHRoaXMuZmFtZUN1cnJlbnQgPSAwO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKHRpbWU6IG51bWJlciwgZGVsdGFUaW1lOm51bWJlcil7fVxyXG59XHJcblxyXG5jbGFzcyBSZW5kZXJlcntcclxuICAgIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XHJcbiAgICBjb25zdHJ1Y3RvcihjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50KXtcclxuICAgICAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcztcclxuICAgIH1cclxuICAgIGRyYXdJbWFnZShpbWFnZU9iamVjdDogSW1hZ2VPYmplY3Qpe1xyXG4gICAgICAgIGNvbnN0IGN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICAgICAgdmFyIGltZyA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgIGltZy5zcmMgPSBpbWFnZU9iamVjdC5pbWFnZTtcclxuICAgICAgICBpZihjdHghPW51bGwpe1xyXG4gICAgICAgICAgICBjdHguc2F2ZSgpO1xyXG4gICAgICAgICAgICBjdHgudHJhbnNsYXRlKGltYWdlT2JqZWN0LnggKyBpbWFnZU9iamVjdC53aWR0aC8yLGltYWdlT2JqZWN0LnkgKyBpbWFnZU9iamVjdC5oZWlnaHQvMilcclxuICAgICAgICAgICAgY3R4LnJvdGF0ZShpbWFnZU9iamVjdC5kZWdyZWVzKk1hdGguUEkvMTgwKTtcclxuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShpbWcsLWltYWdlT2JqZWN0LndpZHRoLzIsIC1pbWFnZU9iamVjdC5oZWlnaHQvMixpbWFnZU9iamVjdC53aWR0aCxpbWFnZU9iamVjdC5oZWlnaHQpO1xyXG4gICAgICAgICAgICBjdHgucmVzdG9yZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGRyYXdTcHJpdGUoc3ByaXRlOiBTcHJpdGUpe1xyXG4gICAgICAgIGNvbnN0IGN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICAgICAgdmFyIGltZyA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgIGlmKGN0eCE9bnVsbCl7XHJcbiAgICAgICAgICAgIGltZy5zcmMgPSBzcHJpdGUuaW1hZ2VzW3Nwcml0ZS5mYW1lQ3VycmVudF07XHJcbiAgICAgICAgICAgIC8vIGN0eC5jbGVhclJlY3QoMCwgMCwgd2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7XHJcbiAgICAgICAgICAgIGN0eC5zYXZlKCk7XHJcbiAgICAgICAgICAgIGN0eC50cmFuc2xhdGUoc3ByaXRlLnggKyBzcHJpdGUud2lkdGgvMixzcHJpdGUueSArIHNwcml0ZS5oZWlnaHQvMilcclxuICAgICAgICAgICAgY3R4LnJvdGF0ZShzcHJpdGUuZGVncmVlcypNYXRoLlBJLzE4MCk7XHJcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoaW1nLC1zcHJpdGUud2lkdGgvMiwgLXNwcml0ZS5oZWlnaHQvMixzcHJpdGUud2lkdGgsc3ByaXRlLmhlaWdodCk7XHJcbiAgICAgICAgICAgIGN0eC5yZXN0b3JlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZHJhd1RleHQodGV4dDogVGV4dE9iamVjdCl7XHJcbiAgICAgICAgY29uc3QgY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgICAgICBpZihjdHghPW51bGwpe1xyXG4gICAgICAgICAgICBjdHguZm9udCA9IHRleHQuZm9udDtcclxuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KHRleHQuY29udGVudCx0ZXh0LngsdGV4dC55KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFNjZW5le1xyXG4gICAgaW1hZ2VPYmplY3RzOiBJbWFnZU9iamVjdFtdO1xyXG4gICAgc3ByaXRlczogU3ByaXRlW107XHJcbiAgICB0ZXh0T2JqZWN0czogVGV4dE9iamVjdFtdOyBcclxuICAgIGlucHV0S2V5IDogU3RyaW5nO1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICB0aGlzLmltYWdlT2JqZWN0cyA9IFtdO1xyXG4gICAgICAgIHRoaXMuc3ByaXRlcyA9IFtdO1xyXG4gICAgICAgIHRoaXMudGV4dE9iamVjdHMgPSBbXTtcclxuICAgICAgICB0aGlzLmlucHV0S2V5ID0gXCJcIjtcclxuICAgIH1cclxuICAgIGFkZENoaWxkKGltYWdlT2JqZWN0czogSW1hZ2VPYmplY3RbXSxzcHJpdGVzOiBTcHJpdGVbXSwgdGV4dE9iamVjdHM6IFRleHRPYmplY3RbXSl7XHJcbiAgICAgICAgaW1hZ2VPYmplY3RzLm1hcChpbWFnZU9iamVjdCA9PiB0aGlzLmltYWdlT2JqZWN0cy5wdXNoKGltYWdlT2JqZWN0KSk7XHJcbiAgICAgICAgc3ByaXRlcy5tYXAoc3ByaXRlID0+IHRoaXMuc3ByaXRlcy5wdXNoKHNwcml0ZSkpO1xyXG4gICAgICAgIHRleHRPYmplY3RzLm1hcCh0ZXh0T2JqZWN0ID0+IHRoaXMudGV4dE9iamVjdHMucHVzaCh0ZXh0T2JqZWN0KSk7XHJcbiAgICB9XHJcbiAgICByZW1vdmVDaGlsZChpbWFnZU9iamVjdHM6IEltYWdlT2JqZWN0W10sc3ByaXRlczogU3ByaXRlW10pe1xyXG4gICAgICAgIGltYWdlT2JqZWN0cy5tYXAoaW1hZ2VPYmplY3QgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmltYWdlT2JqZWN0cyA9IHRoaXMuaW1hZ2VPYmplY3RzLmZpbHRlcigoaW1iKT0+e1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGltYiE9IGltYWdlT2JqZWN0O1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgc3ByaXRlcy5tYXAoc3ByaXRlID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zcHJpdGVzID0gdGhpcy5zcHJpdGVzLmZpbHRlcigoc3B0KT0+e1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNwdCE9IHNwcml0ZTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcihyZW5kZXI6IFJlbmRlcmVyKXtcclxuICAgICAgICB0aGlzLmltYWdlT2JqZWN0cy5tYXAoKGltYWdlT2JqZWN0KT0+e1xyXG4gICAgICAgICAgICByZW5kZXIuZHJhd0ltYWdlKGltYWdlT2JqZWN0KTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMuc3ByaXRlcy5tYXAoKHNwcml0ZSk9PntcclxuICAgICAgICAgICAgcmVuZGVyLmRyYXdTcHJpdGUoc3ByaXRlKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMudGV4dE9iamVjdHMubWFwKCh0eHQpPT57XHJcbiAgICAgICAgICAgIHJlbmRlci5kcmF3VGV4dCh0eHQpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICAvLyB4dSBseSBsb2dpY1xyXG4gICAgdXBkYXRlKHRpbWU6IG51bWJlciwgZGVsdGE6IG51bWJlcikge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDx0aGlzLmltYWdlT2JqZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmltYWdlT2JqZWN0c1tpXS51cGRhdGUodGltZSwgZGVsdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8dGhpcy5zcHJpdGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3ByaXRlc1tpXS51cGRhdGUodGltZSwgZGVsdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gMTtcclxuICAgIH1cclxuICAgIGhhbmRsZUlucHV0RXZlbnQoZTogS2V5Ym9hcmRFdmVudCl7XHJcbiAgICAgICAgdGhpcy5pbnB1dEtleSA9IGUuY29kZTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmlucHV0S2V5KTtcclxuICAgIH1cclxuICAgIHJlc2V0U2NlbmUoKXt9XHJcbn1cclxuXHJcbmNsYXNzIFNjZW5lTWFuYWdlciB7XHJcbiAgICBzY2VuZXM6IFNjZW5lW107XHJcbiAgICBjdXJyZW50U2NlbmU6IG51bWJlcjtcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICB0aGlzLnNjZW5lcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFNjZW5lID0gMDtcclxuICAgIH1cclxuICAgIGFkZFNjZW5lKHNjZW5lOiBTY2VuZSl7XHJcbiAgICAgICAgdGhpcy5zY2VuZXMucHVzaChzY2VuZSlcclxuICAgIH1cclxuICAgIHVwZGF0ZSgpe31cclxuICAgIHJlbmRlcigpe31cclxufVxyXG5jbGFzcyBHYW1le1xyXG4gICAgc2NlbmVNYW5hZ2VyOiBTY2VuZU1hbmFnZXI7XHJcbiAgICBsYXN0VGltZTogbnVtYmVyIHwgbnVsbDtcclxuICAgIGNvbnN0cnVjdG9yKHNjZW5lTWFuYWdlcjogU2NlbmVNYW5hZ2VyKXtcclxuICAgICAgICB0aGlzLnNjZW5lTWFuYWdlciA9IHNjZW5lTWFuYWdlcjtcclxuICAgICAgICB0aGlzLmxhc3RUaW1lID0gbnVsbDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgc3RhcnQocmVuZGVyOiBSZW5kZXJlcil7XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLChlKT0+dGhpcy5zY2VuZU1hbmFnZXIuc2NlbmVzW3RoaXMuc2NlbmVNYW5hZ2VyLmN1cnJlbnRTY2VuZV0uaGFuZGxlSW5wdXRFdmVudChlKSk7XHJcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpPT50aGlzLmxvb3AocmVuZGVyKSk7XHJcbiAgICB9XHJcbiAgICBsb29wKHJlbmRlcjogUmVuZGVyZXIpe1xyXG4gICAgICAgIHZhciBpbmRleFNjZW5lID0gdGhpcy5zY2VuZU1hbmFnZXIuY3VycmVudFNjZW5lO1xyXG4gICAgICAgIGNvbnN0IHRpbWUgPSB3aW5kb3cucGVyZm9ybWFuY2Uubm93KCk7XHJcbiAgICAgICAgaWYodGhpcy5sYXN0VGltZSA9PSBudWxsKXtcclxuICAgICAgICAgICAgaW5kZXhTY2VuZSA9IHRoaXMuc2NlbmVNYW5hZ2VyLnNjZW5lc1t0aGlzLnNjZW5lTWFuYWdlci5jdXJyZW50U2NlbmVdLnVwZGF0ZSh0aW1lLCAwKTtcclxuICAgICAgICAgICAgdGhpcy5zY2VuZU1hbmFnZXIuc2NlbmVzW3RoaXMuc2NlbmVNYW5hZ2VyLmN1cnJlbnRTY2VuZV0ucmVuZGVyKHJlbmRlcik7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBjb25zdCBkZWx0YSA9IHRpbWUgLSB0aGlzLmxhc3RUaW1lO1xyXG4gICAgICAgICAgICBpbmRleFNjZW5lID0gdGhpcy5zY2VuZU1hbmFnZXIuc2NlbmVzW3RoaXMuc2NlbmVNYW5hZ2VyLmN1cnJlbnRTY2VuZV0udXBkYXRlKHRpbWUsZGVsdGEpO1xyXG4gICAgICAgICAgICB0aGlzLnNjZW5lTWFuYWdlci5zY2VuZXNbdGhpcy5zY2VuZU1hbmFnZXIuY3VycmVudFNjZW5lXS5yZW5kZXIocmVuZGVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoaW5kZXhTY2VuZSE9dGhpcy5zY2VuZU1hbmFnZXIuY3VycmVudFNjZW5lKXtcclxuICAgICAgICAgICAgLy8gdGhpcy5zY2VuZU1hbmFnZXIuc2NlbmVzW3RoaXMuc2NlbmVNYW5hZ2VyLmN1cnJlbnRTY2VuZV0ucmVzZXRTY2VuZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTY2VuZShpbmRleFNjZW5lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sYXN0VGltZSA9IHRpbWU7XHJcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpPT50aGlzLmxvb3AocmVuZGVyKSk7XHJcbiAgICB9XHJcbiAgICBsb2FkU2NlbmUoaW5kZXhTY2VuZTogbnVtYmVyKXtcclxuICAgICAgICB0aGlzLnNjZW5lTWFuYWdlci5jdXJyZW50U2NlbmUgPSBpbmRleFNjZW5lO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBDb2xsaXNpb24ob2JqMSA6IEdhbWVPYmplY3QsIG9iajIgOiBHYW1lT2JqZWN0KXtcclxuICAgIGlmKG9iajEueCsgb2JqMS53aWR0aD49b2JqMi54ICYmIG9iajEueCA8PSBvYmoyLnggKyBvYmoyLndpZHRoKXtcclxuICAgICAgICBpZihvYmoxLnkrIG9iajEuaGVpZ2h0Pj1vYmoyLnkgJiYgb2JqMS55IDw9IG9iajIueSArIG9iajIuaGVpZ2h0KXtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59XHJcbmV4cG9ydCB7R2FtZU9iamVjdCxJbWFnZU9iamVjdCxSZW5kZXJlciwgU2NlbmVNYW5hZ2VyLCBTcHJpdGUsR2FtZSxTY2VuZSxDb2xsaXNpb24sVGV4dE9iamVjdH07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQge0dhbWVPYmplY3QsIFNwcml0ZSwgU2NlbmUsIEltYWdlT2JqZWN0LFJlbmRlcmVyLCBTY2VuZU1hbmFnZXIsIEdhbWUsQ29sbGlzaW9uLCBUZXh0T2JqZWN0fSBmcm9tIFwiLi9FbmdpbmVcIlxyXG52YXIgbnVtUGlwZSA9IDQ7XHJcbnZhciBkaXN0YW5jZSA9IDI1MDtcclxudmFyIHBpcGVXaWR0aCA9IDgwO1xyXG52YXIgYmxhbmtzID0gMzAwO1xyXG5jb25zdCBwaXBlSGVpZ2h0ID0gMzUwO1xyXG5jbGFzcyBCaXJkIGV4dGVuZHMgU3ByaXRlIHtcclxuICAgIGdyYXZpdHkgOiBudW1iZXI7XHJcbiAgICBzcGVlZCA6IG51bWJlcjtcclxuICAgIHBmczogbnVtYmVyO1xyXG4gICAgcmF0ZTogbnVtYmVyO1xyXG4gICAgYWR0OiBudW1iZXI7ICBcclxuICAgIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcixpbWFnZXM6IEFycmF5PHN0cmluZz4sZGVncmVlczogbnVtYmVyLGdyYXZpdHk6IG51bWJlcixzcGVlZDogbnVtYmVyKXtcclxuICAgICAgICBzdXBlcih4LCB5LCB3aWR0aCwgaGVpZ2h0LGltYWdlcyxkZWdyZWVzLFwiYmlyZFwiKTtcclxuICAgICAgICB0aGlzLmdyYXZpdHkgPSBncmF2aXR5O1xyXG4gICAgICAgIHRoaXMuc3BlZWQgPSBzcGVlZDtcclxuICAgICAgICB0aGlzLnBmcyA9IDIwO1xyXG4gICAgICAgIHRoaXMucmF0ZSA9IDEuMC90aGlzLnBmcyoxMDAwO1xyXG4gICAgICAgIHRoaXMuYWR0ID0gMC4wO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKHRpbWU6IG51bWJlciwgZGVsdGFUaW1lOm51bWJlcil7XHJcbiAgICAgICAgdGhpcy55ICs9IHRoaXMuc3BlZWQgKyAwLjUqdGhpcy5ncmF2aXR5O1xyXG4gICAgICAgIHRoaXMuc3BlZWQgKz0gdGhpcy5ncmF2aXR5O1xyXG4gICAgICAgIHRoaXMuYWR0ICs9IGRlbHRhVGltZVxyXG4gICAgICAgIGlmKHRoaXMuc3BlZWQ+MCl7XHJcbiAgICAgICAgICAgIHRoaXMuZGVncmVlcyA9IDIwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLmRlZ3JlZXMgPSAtMjA7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuYWR0Pj10aGlzLnJhdGUpe1xyXG4gICAgICAgICAgICB0aGlzLmFkdCAtPSB0aGlzLnJhdGU7XHJcbiAgICAgICAgICAgIHRoaXMuZmFtZUN1cnJlbnQrPTE7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZmFtZUN1cnJlbnQ+dGhpcy5pbWFnZXMubGVuZ3RoLTEpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mYW1lQ3VycmVudCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih0aGlzLmZhbWVDdXJyZW50PnRoaXMuaW1hZ2VzLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZhbWVDdXJyZW50ID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGZseSgpe1xyXG4gICAgICAgIHRoaXMuc3BlZWQgPSAtMTAgO1xyXG4gICAgfVxyXG59XHJcbmNsYXNzIFNjb3Jle1xyXG4gICAgcHJpdmF0ZSBoaWdoU2NvcmU6IG51bWJlcjtcclxuICAgIHByaXZhdGUgY3VycmVudFNjb3JlOiBudW1iZXI7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMuaGlnaFNjb3JlID0gMDtcclxuICAgICAgICB0aGlzLmN1cnJlbnRTY29yZSA9IDA7XHJcbiAgICB9XHJcbiAgICBpbmNyZW1lbnRTY29yZSgpe1xyXG4gICAgICAgIHRoaXMuY3VycmVudFNjb3JlICs9MTtcclxuICAgIH1cclxuICAgIGdldEN1cnJlbnRTY29yZSgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRTY29yZTtcclxuICAgIH1cclxuICAgIGdldEhpZ2hTY29yZSgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmhpZ2hTY29yZTtcclxuICAgIH1cclxuICAgIHNldEhpZ2hTY29yZShoaWdoU2NvcmU6IG51bWJlcil7XHJcbiAgICAgICAgdGhpcy5oaWdoU2NvcmUgPSBoaWdoU2NvcmU7XHJcbiAgICB9XHJcbiAgICBcclxufVxyXG5jbGFzcyBQYWlyT2ZQaXBle1xyXG4gICAgUGlwZXM6IEFycmF5PEltYWdlT2JqZWN0PjtcclxuICAgIHByaXZhdGUgc3BlZWQ6IG51bWJlcjtcclxuICAgIGNvbnN0cnVjdG9yKHg6bnVtYmVyLCB5Om51bWJlciwgaW1hZ2U6IHN0cmluZyxzcGVlZDogbnVtYmVyKXtcclxuICAgICAgICB2YXIgUGlwZVVwID0gbmV3IEltYWdlT2JqZWN0KHgseSxwaXBlV2lkdGgscGlwZUhlaWdodCxpbWFnZSwxODAsXCJwaXBlXCIpO1xyXG4gICAgICAgIHZhciBQaXBlRG93biA9IG5ldyBJbWFnZU9iamVjdCh4LHkrcGlwZUhlaWdodCtibGFua3MscGlwZVdpZHRoLHBpcGVIZWlnaHQsaW1hZ2UsMCxcInBpcGVcIik7XHJcbiAgICAgICAgdmFyIGNoZWNrU2NvcmUgPSBuZXcgSW1hZ2VPYmplY3QoeCtwaXBlV2lkdGgseStwaXBlSGVpZ2h0LDEwLGJsYW5rcyxcIiBcIiwwLFwiY2hlY2tTY29yZVwiKTtcclxuICAgICAgICB0aGlzLlBpcGVzPSBbUGlwZVVwLFBpcGVEb3duLGNoZWNrU2NvcmVdO1xyXG4gICAgICAgIHRoaXMuc3BlZWQgPSBzcGVlZDtcclxuICAgIH1cclxuICAgIHVwZGF0ZSgpe1xyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPDM7aSsrKXtcclxuICAgICAgICAgICAgdGhpcy5QaXBlc1tpXS54IC09IHRoaXMuc3BlZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbnZhciBwaXBlSW1hZ2UgPSBcIi4uL0ltYWdlcy9waXBlLWdyZWVuLnBuZ1wiO1xyXG5jbGFzcyBQbGF5U2NlbmUgZXh0ZW5kcyBTY2VuZSB7XHJcbiAgICBwZnM6IG51bWJlcjtcclxuICAgIHJhdGU6IG51bWJlcjtcclxuICAgIGFkdDogbnVtYmVyOyAgICAvL2FjY3VtdWxhdGVkIGRlbHRhIHRpbWVcclxuICAgIGJpcmQ6IEJpcmQ7XHJcbiAgICBwaXBlczogUGFpck9mUGlwZVtdO1xyXG4gICAgY2hlY2tQaXBlOiBib29sZWFuO1xyXG4gICAgdGV4dFNjb3JlOiBUZXh0T2JqZWN0O1xyXG4gICAgYWRkU2NvcmU6IG51bWJlciB8IG51bGw7XHJcbiAgICBzY29yZTogU2NvcmU7XHJcbiAgICBjb25zdHJ1Y3RvcihwZnM6IG51bWJlciwgYmlyZDogQmlyZCwgYmc6IEltYWdlT2JqZWN0LGdyb3VuZDogSW1hZ2VPYmplY3Qpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5wZnMgPSBwZnM7XHJcbiAgICAgICAgdGhpcy5yYXRlID0gMS4wL3BmcyoxMDAwO1xyXG4gICAgICAgIHRoaXMuYWR0ID0gMC4wO1xyXG4gICAgICAgIHRoaXMuY2hlY2tQaXBlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5hZGRTY29yZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5zY29yZSA9IG5ldyBTY29yZSgpO1xyXG4gICAgICAgIHRoaXMudGV4dFNjb3JlID0gbmV3IFRleHRPYmplY3QoMTAsMzAsXCJzY29yZVwiLFwiU2NvcmU6IFwiKyB0aGlzLnNjb3JlLmdldEN1cnJlbnRTY29yZSgpLCBcIjE4cHggQXJpYWxcIik7XHJcbiAgICAgICAgdGhpcy5iaXJkID0gYmlyZDtcclxuICAgICAgICB0aGlzLnBpcGVzID0gW11cclxuICAgICAgICB0aGlzLmFkZENoaWxkKFtiZ10sW2JpcmRdLFt0aGlzLnRleHRTY29yZV0pO1xyXG4gICAgICAgIGZvcih2YXIgaT0wO2k8bnVtUGlwZTtpKyspe1xyXG4gICAgICAgICAgICB2YXIgeCA9IGkqZGlzdGFuY2UgKyBwaXBlV2lkdGggKyAyNTA7XHJcbiAgICAgICAgICAgIHZhciB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICotMTAwKTtcclxuICAgICAgICAgICAgdmFyIHBpcGUgPSBuZXcgUGFpck9mUGlwZSh4LHksXCIuLi9JbWFnZXMvcGlwZS1ncmVlbi5wbmdcIiwxKTtcclxuICAgICAgICAgICAgdGhpcy5waXBlcy5wdXNoKHBpcGUpO1xyXG4gICAgICAgICAgICB0aGlzLmFkZENoaWxkKFtwaXBlLlBpcGVzWzBdLHBpcGUuUGlwZXNbMV0scGlwZS5QaXBlc1syXV0sW10sW10pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFkZENoaWxkKFtncm91bmRdLFtdLFtdKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnNwcml0ZXMubGVuZ3RoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgdXBkYXRlKHRpbWU6IG51bWJlciwgZGVsdGFUaW1lOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmFkdCArPSBkZWx0YVRpbWVcclxuICAgICAgICB2YXIgZ3JvdW5kID0gdGhpcy5pbWFnZU9iamVjdHMuZmlsdGVyKChpbWIpPT57XHJcbiAgICAgICAgICAgIHJldHVybiBpbWIubmFtZSA9PT0gXCJncm91bmRcIjtcclxuICAgICAgICAgICAgfSlbMF07XHJcbiAgICAgICAgdmFyIHBpcGVzID0gdGhpcy5pbWFnZU9iamVjdHMuZmlsdGVyKChpbWIpPT57XHJcbiAgICAgICAgICAgIHJldHVybiBpbWIubmFtZSA9PT0gXCJwaXBlXCI7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIHZhciBjaGVja1Njb3JlID0gdGhpcy5pbWFnZU9iamVjdHMuZmlsdGVyKChpbWIpPT57XHJcbiAgICAgICAgICAgIHJldHVybiBpbWIubmFtZSA9PT0gXCJjaGVja1Njb3JlXCI7XHJcbiAgICAgICAgfSlcclxuICAgICAgICBpZih0aGlzLmFkdD49dGhpcy5yYXRlKXtcclxuICAgICAgICAgICAgdGhpcy5hZHQgLT0gdGhpcy5yYXRlO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8dGhpcy5pbWFnZU9iamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2VPYmplY3RzW2ldLnVwZGF0ZSh0aW1lLCBkZWx0YVRpbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDx0aGlzLnNwcml0ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuc3ByaXRlc1tpXS5uYW1lID09PSBcImJpcmRcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yKHZhciBqID0gMDsgaiA8IHBpcGVzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKENvbGxpc2lvbihwaXBlc1tqXSx0aGlzLnNwcml0ZXNbaV0pKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tQaXBlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZ2FtZSBvdmVyIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgY2hlY2tTY29yZS5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihDb2xsaXNpb24oY2hlY2tTY29yZVtrXSx0aGlzLnNwcml0ZXNbaV0pJiYgdGhpcy5hZGRTY29yZSAhPSBrKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NvcmUuaW5jcmVtZW50U2NvcmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGV4dFNjb3JlLmNvbnRlbnQgPSBcIlNjb3JlOiBcIiArIHRoaXMuc2NvcmUuZ2V0Q3VycmVudFNjb3JlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFNjb3JlID0gaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKCFDb2xsaXNpb24oZ3JvdW5kLCB0aGlzLnNwcml0ZXNbaV0pJiYhdGhpcy5jaGVja1BpcGUpeyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5waXBlcy5tYXAoKHBpcGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBpcGUudXBkYXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZXNbaV0udXBkYXRlKHRpbWUsZGVsdGFUaW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5pbnB1dEtleT09PVwiU3BhY2VcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iaXJkLmZseSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnB1dEtleSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzLmNoZWNrUGlwZSYmIUNvbGxpc2lvbihncm91bmQsIHRoaXMuc3ByaXRlc1tpXSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlc1tpXS51cGRhdGUodGltZSxkZWx0YVRpbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKENvbGxpc2lvbihncm91bmQsIHRoaXMuc3ByaXRlc1tpXSl8fHRoaXMuY2hlY2tQaXBlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5zY29yZS5nZXRDdXJyZW50U2NvcmU+IHRoaXMuc2NvcmUuZ2V0SGlnaFNjb3JlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY29yZS5zZXRIaWdoU2NvcmUodGhpcy5zY29yZS5nZXRDdXJyZW50U2NvcmUoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAyO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZXNbaV0udXBkYXRlKHRpbWUsZGVsdGFUaW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5waXBlcy5tYXAoKHBpcGUsaW5kZXgpID0+e1xyXG4gICAgICAgICAgICAgICAgaWYocGlwZS5QaXBlc1swXS54PC0xMDApe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBmcm9udEluZGV4ID0gaW5kZXggLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZnJvbnRJbmRleDwwKSBmcm9udEluZGV4ID0gdGhpcy5waXBlcy5sZW5ndGgtMTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwzO2krKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBpcGUuUGlwZXNbaV0ueCA9IHRoaXMucGlwZXNbZnJvbnRJbmRleF0uUGlwZXNbMF0ueCArIGRpc3RhbmNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIDE7XHJcbiAgICB9XHJcbiAgICByZXNldFNjZW5lKCl7XHJcbiAgICAgICAgLy8gc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnBmcyA9IDYwO1xyXG4gICAgICAgIHRoaXMucmF0ZSA9IDEuMC82MCoxMDAwO1xyXG4gICAgICAgIHRoaXMuYWR0ID0gMC4wO1xyXG4gICAgICAgIHRoaXMuY2hlY2tQaXBlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5hZGRTY29yZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5zY29yZSA9IG5ldyBTY29yZSgpO1xyXG4gICAgICAgIHRoaXMudGV4dFNjb3JlID0gbmV3IFRleHRPYmplY3QoMTAsMzAsXCJzY29yZVwiLFwiU2NvcmU6IFwiKyB0aGlzLnNjb3JlLmdldEN1cnJlbnRTY29yZSgpLCBcIjE4cHggQXJpYWxcIik7XHJcbiAgICAgICAgdGhpcy5iaXJkID0gYmlyZDtcclxuICAgICAgICB0aGlzLnBpcGVzID0gW11cclxuICAgICAgICB0aGlzLmFkZENoaWxkKFtiZ10sW2JpcmRdLFt0aGlzLnRleHRTY29yZV0pO1xyXG4gICAgICAgIGZvcih2YXIgaT0wO2k8bnVtUGlwZTtpKyspe1xyXG4gICAgICAgICAgICB2YXIgeCA9IGkqZGlzdGFuY2UgKyBwaXBlV2lkdGggKyAyNTA7XHJcbiAgICAgICAgICAgIHZhciB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICotMTAwKTtcclxuICAgICAgICAgICAgdmFyIHBpcGUgPSBuZXcgUGFpck9mUGlwZSh4LHksXCIuLi9JbWFnZXMvcGlwZS1ncmVlbi5wbmdcIiwxKTtcclxuICAgICAgICAgICAgdGhpcy5waXBlcy5wdXNoKHBpcGUpO1xyXG4gICAgICAgICAgICB0aGlzLmFkZENoaWxkKFtwaXBlLlBpcGVzWzBdLHBpcGUuUGlwZXNbMV0scGlwZS5QaXBlc1syXV0sW10sW10pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFkZENoaWxkKFtncm91bmRdLFtdLFtdKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnNwcml0ZXMubGVuZ3RoKTtcclxuICAgIH1cclxufVxyXG5cclxudmFyIGJnID0gbmV3IEltYWdlT2JqZWN0KDAsMCw3MDAsODAwLFwiLi4vSW1hZ2VzL2JhY2tncm91bmQtbmlnaHQucG5nXCIsMCxcImJhY2tncm91bmRcIik7XHJcbnZhciBncm91bmQgPSBuZXcgSW1hZ2VPYmplY3QoMCw2NzAsNzAwLDE1MCxcIi4uL0ltYWdlcy9iYXNlLnBuZ1wiLDAsXCJncm91bmRcIik7XHJcbnZhciBiaXJkID0gbmV3IEJpcmQoMTAwLDMwLDUwLDUwLFxyXG4gICAgW1xyXG4gICAgICAgIFwiLi4vSW1hZ2VzL2JpcmQvZnJhbWUtMS5wbmdcIixcclxuICAgICAgICBcIi4uL0ltYWdlcy9iaXJkL2ZyYW1lLTIucG5nXCIsXHJcbiAgICAgICAgXCIuLi9JbWFnZXMvYmlyZC9mcmFtZS0zLnBuZ1wiLFxyXG4gICAgICAgIFwiLi4vSW1hZ2VzL2JpcmQvZnJhbWUtNC5wbmdcIixcclxuICAgICAgICBcIi4uL0ltYWdlcy9iaXJkL2ZyYW1lLTUucG5nXCIsXHJcbiAgICAgICAgXCIuLi9JbWFnZXMvYmlyZC9mcmFtZS02LnBuZ1wiLFxyXG4gICAgICAgIFwiLi4vSW1hZ2VzL2JpcmQvZnJhbWUtNy5wbmdcIixcclxuICAgICAgICBcIi4uL0ltYWdlcy9iaXJkL2ZyYW1lLTgucG5nXCIsXHJcbiAgICBdLDAsMC41LDAuMVxyXG4gICAgKTtcclxudmFyIGltZ1N0YXJ0ID0gbmV3IEltYWdlT2JqZWN0KDUwLDIwLDUwMCw3MDAsXCIuLi9JbWFnZXMvbWVzc2FnZS5wbmdcIiwwLFwiXCIpO1xyXG5jbGFzcyBTdGFydFNjcmVlbiBleHRlbmRzIFNjZW5lIHtcclxuICAgIHVwZGF0ZSh0aW1lOiBudW1iZXIsIGRlbHRhOiBudW1iZXIpe1xyXG4gICAgICAgIGlmKHRoaXMuaW5wdXRLZXk9PT1cIkVudGVyXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5pbnB1dEtleSA9IFwiXCI7XHJcbiAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxufVxyXG5jbGFzcyBHYW1lT3ZlclNjcmVlbiBleHRlbmRzIFNjZW5lIHtcclxuICAgIHVwZGF0ZSh0aW1lOiBudW1iZXIsIGRlbHRhOiBudW1iZXIpe1xyXG4gICAgICAgIGlmKHRoaXMuaW5wdXRLZXk9PT1cIkVudGVyXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5pbnB1dEtleSA9IFwiXCI7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcclxuICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAyO1xyXG4gICAgfVxyXG59XHJcbnZhciBzdGFydFNjcmVlbiA9IG5ldyBTdGFydFNjcmVlbigpO1xyXG5zdGFydFNjcmVlbi5hZGRDaGlsZChbYmcsaW1nU3RhcnRdLFtdLFtdKTtcclxudmFyIGdhbWVPdmVyU2NyZWVuID0gbmV3IEdhbWVPdmVyU2NyZWVuKCk7XHJcbmdhbWVPdmVyU2NyZWVuLmFkZENoaWxkKFtiZyxpbWdTdGFydF0sW10sW10pO1xyXG5jb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbXlDYW52YXMnKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcclxudmFyIHJlbmRlciA9IG5ldyBSZW5kZXJlcihjYW52YXMpXHJcbnZhciBnYW1lUGxheSA9IG5ldyBQbGF5U2NlbmUoNjAsYmlyZCxiZyxncm91bmQpO1xyXG52YXIgZ2FtZVNjZW5lID0gbmV3IFNjZW5lTWFuYWdlcigpO1xyXG5nYW1lU2NlbmUuYWRkU2NlbmUoc3RhcnRTY3JlZW4pO1xyXG5nYW1lU2NlbmUuYWRkU2NlbmUoZ2FtZVBsYXkpO1xyXG5nYW1lU2NlbmUuYWRkU2NlbmUoZ2FtZU92ZXJTY3JlZW4pO1xyXG52YXIgbXlHYW1lID0gbmV3IEdhbWUoZ2FtZVNjZW5lKTtcclxubXlHYW1lLnN0YXJ0KHJlbmRlcik7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9