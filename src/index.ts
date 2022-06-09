import { StartScene } from "./game/StartScene";
import { Renderer } from "./Engine/Renderer/Renderer";
import { SceneManager } from "./Engine/Scene/SceneManager";
import { Game } from "./Engine/Core/Game";  
import {PlayScene} from "./game/PlayScene";

var canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
var myGame = new Game();
var render = new Renderer(canvas)
var gameScene = new SceneManager(myGame);

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
]

const promises = imagesLoad.map((image) => myGame.loader.addImage(image["path"], image["key"]))
Promise.all(promises).then(()=> {
    var startScene = new StartScene(gameScene);
    var playScene = new PlayScene(gameScene);
    gameScene.addScene(startScene);
    gameScene.addScene(playScene);
    myGame.start(render, gameScene);
}).catch((error) => {console.log(error)})
